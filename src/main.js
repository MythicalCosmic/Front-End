import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { abilitiesPlugin } from '@casl/vue';
import defineAbilitiesFor from '@/Spa/ablity';


import Login from './components/LoginComponent.vue'
import Product from './components/ProductComponent.vue'
import CreateCategory from "@/components/CreateCatigory.vue";
import ProductCreate from "@/CreateProduct.vue";
import Error from './ErrorComponent.vue'

const routes = [
    { path: '/', component: Login, name: 'login' },
    { path: '/products', component: Product, name: 'products', meta: { requiresAuth: true, role: 'admin' }  },
    {path: '/createCategory', component: CreateCategory, name: 'createCategory', meta: { requiresAuth: true, role: 'admin' }  },
    {path: '/createproduct', component: ProductCreate, name: 'createproduct', meta: { requiresAuth: true, role: 'admin' }  },
    { path: '/:pathMatch(.*)*', component: Error, name: 'Error 404' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'border-b border-blue-500 text-blue-700 hover:text-blue-700 focus:border-blue-500 ',
});
const isAuthenticated = () => true;
const getUserRole = () => 'admin' || 'guest';

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated()) {
            next({ path: '/' });
        } else {
            const userRole = getUserRole();
            const ability = defineAbilitiesFor(userRole);
            if (to.meta.role && !ability.can('access', to.meta.role) && userRole !== 'admin' && userRole !== 'kassa') {
                next({ path: '/Sorry_this_is_impossible_to_enter', props: { errorMessage: 'Sizda bu sahifaga kirish uchun ruxsat yo‘q!' } });
            } else {
                next();
            }
        }
    } else {
        next();
    }
});

const app = createApp(App);

app.use(router);
app.use(abilitiesPlugin, defineAbilitiesFor(getUserRole()));

app.mount('#app');

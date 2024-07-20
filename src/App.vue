<script setup>
import service from "@/servise";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = async (event) => {
  event.preventDefault();

  try {
    // eslint-disable-next-line no-unused-vars
    const response = await service.logout();
    localStorage.removeItem('accessToken');
    await router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
    alert('Logout failed, please try again.');
  }
};

function logut (){
  localStorage.removeItem('accessToken');
   router.push('/login');
}
</script>

<template>
  <div class="w-full">
    <nav v-if="$route.name !== 'Error 404' && $route.name !== 'login'" class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8  w-full top-0 z-10">
      <div class="container1 mx-auto flex justify-between items-center">
        <img src="/./favicon.ico" class="h-16 animate-bounce" alt="Logo">
        <div class="flex space-x-8">
          <RouterLink to="/products" class="nav-link">Products</RouterLink>
        </div>
        <a href="#" @click="logut" class="logout-button">Log Out</a>
      </div>
    </nav>
    <router-view class="animate-fade-in"></router-view>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.container1 {
  max-width: 1200px;
  margin: 0 auto;
}

.h-16 {
  height: 4rem; /* 4rem for better responsiveness */
}

.nav-link {
  color: white;
  font-size: 1.125rem; /* text-lg */
  font-weight: 600; /* font-semibold */
  transition: color 0.3s, transform 0.3s;
}

.nav-link:hover {
  color: #e0e7ff; /* lighter hover color */
  transform: translateY(-2px);
}

.logout-button {
  color: white;
  font-weight: 500; /* font-medium */
  padding: 0.5rem 1rem; /* py-2 px-4 */
  border-radius: 0.5rem; /* rounded-lg */
  transition: background-color 0.3s, transform 0.3s;
  cursor: pointer; /* Add cursor pointer for better UX */
}

.logout-button:hover {
  background-color: #dc2626;
  transform: scale(1.05);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.animate-fade-in {
  animation: fadeIn 0s ease-in-out;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>

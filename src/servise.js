import axios from 'axios';

// Create an instance of axios with default settings
const apiClient = axios.create({
    baseURL: 'https://back-end-kde2.onrender.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to set the Authorization header dynamically
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

apiClient.interceptors.request.use(config => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
        config.headers['Authorization'] = `Bearer ${refreshToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default {
    login(credentials) {
        return apiClient.post('api-auth/login/', credentials);
    },
    logout() {
        return apiClient.post('api-auth/logout/');
    },
    getAllProducts() {
        return apiClient.get('api/products/all');
    },
    createProduct(productData) {
        return apiClient.post('api/products/create', productData)
    },
    updateProduct(productId, updatedData) {
        return apiClient.put(`api/products/update/${productId}`, updatedData);
    },
    deleteProduct(productId) {
        return apiClient.delete(`api/products/delete/${productId}`);
    },
    getAllCategories() {
        return apiClient.get('api/category/all');
    },
    createCategory(categoryData) {
        return apiClient.post('api/category/create', categoryData);
    },
    updateCategory(categoryId, updatedData) {
        return apiClient.put(`api/category/update/${categoryId}`, updatedData);
    },
    deleteCategory(categoryId) {
        return apiClient.delete(`api/category/delete/${categoryId}`);
    },
};

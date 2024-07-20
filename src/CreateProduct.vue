<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/servise'; // Ensure the correct path to the service file

const productData = ref({
  name: '',
  description: '',
  category: '2'
});
const photo = ref(null);
const isLoading = ref(false);

const router = useRouter();

const handleFileChange = (event) => {
  photo.value = event.target.files[0];
};

const createProduct = async () => {
  try {
    if (productData.value.name && productData.value.description && productData.value.category && photo.value) {
      const formData = new FormData();
      formData.append('name', productData.value.name);
      formData.append('description', productData.value.description);
      formData.append('category', productData.value.category);
      formData.append('photo', photo.value);

      isLoading.value = true;

      console.log('Sending data:', formData); // Debugging

      await apiClient.createProduct(formData);
      await router.push('/products');
    } else {
      alert('Please fill in all fields and upload a photo.');
    }
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.response) {
      alert('Failed to create product: ' + JSON.stringify(error.response.data));
    } else {
      alert('Failed to create product. Please try again later.');
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <div class="bg-white py-6 shadow-md">
      <span class="py-12 px-48 font-bold text-2xl">Create Product</span>
    </div>
    <section id="create-product" class="flex justify-center min-h-52 py-36">
      <form @submit.prevent="createProduct" method="post"
            class="bg-white shadow-md border-black rounded-lg overflow-hidden items-center w-1/4 p-8">
        <label for="name" class="block text-base mb-2">Name</label>
        <input
            type="text"
            id="name"
            v-model="productData.name"
            class="border w-full text-base px-3 py-2 rounded shadow focus:outline-none focus:ring-0 focus:border-blue-300"
            placeholder="Name"
        />

        <label for="description" class="block text-base mb-2 mt-8">Description</label>
        <textarea
            id="description"
            v-model="productData.description"
            class="border w-full text-base px-3 py-2 rounded shadow focus:outline-none focus:ring-0 focus:border-blue-300"
            placeholder="Description"
        ></textarea>

        <label for="category" class="block text-base mb-2 mt-8">Category</label>
        <input
            type="text"
            id="category"
            v-model="productData.category"
            class="border w-full text-base px-3 py-2 rounded shadow focus:outline-none focus:ring-0 focus:border-blue-300"
            placeholder="Category"
        />

        <label for="photo" class="block text-base mb-2 mt-8">Photo</label>
        <input
            type="file"
            id="photo"
            @change="handleFileChange"
            class="border w-full text-base px-3 py-2 rounded shadow focus:outline-none focus:ring-0 focus:border-blue-300"
        />

        <div class="mt-16 flex justify-end items-center">
          <div class="flex justify-end">
            <button
                type="submit"
                :disabled="isLoading"
                class="bg-gray-900 border-yellow-50 border-x-2 border-y-2 rounded-full text-white font-bold px-3 py-2 shadow-inner hover:border-sky-400 hover:shadow-md transition-all ease-in-out duration-300"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

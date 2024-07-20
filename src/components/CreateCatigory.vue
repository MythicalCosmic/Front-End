<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import apiService from '@/servise';

const categoryData = ref({
  name: '',
  description: ''
});

const router = useRouter();

const createCategory = async () => {
  try {
    if (categoryData.value.name && categoryData.value.description) {
      console.log('Sending data:', categoryData.value); // Debugging
      await apiService.createCategory(categoryData.value);
      await router.push('/products');
    } else {
      alert('Please fill in all fields.');
    }
  } catch (error) {
    console.error('Error creating category:', error);
    if (error.response) {
      alert('Failed to create category: ' + JSON.stringify(error.response.data));
    } else {
      alert('Failed to create category. Please try again later.');
    }
  }
};
</script>

<template>
  <div>
    <div class="bg-white py-6 shadow-md">
      <span class="py-12 px-48 font-bold text-2xl">Katigoriya yaratish</span>
    </div>
    <section id="log-in" class="flex justify-center min-h-52 py-36">
      <form @submit.prevent="createCategory" method="post"
            class="bg-white shadow-md border-black rounded-lg overflow-hidden items-center w-1/4 p-8">
        <label for="name" class="block text-base mb-2">Nomi</label>
        <input
            type="text"
            id="name"
            v-model="categoryData.name"
            class="border w-full text-base px-3 py-2 rounded shadow focus:outline-none focus:ring-0 focus:border-blue-300"
            placeholder="Nomi"
        >

        <label for="description" class="block text-base mb-2 mt-8">Ma'lumot</label>
        <textarea
            id="description"
            v-model="categoryData.description"
            class="border w-full text-base px-3 py-2 rounded shadow focus:outline-none focus:ring-0 focus:border-blue-300"
            placeholder="Ma'lumoti"
        ></textarea>

        <div class="mt-16 flex justify-end items-center">
          <div class="flex justify-end">
            <button
                type="submit"
                class="bg-gray-900 border-yellow-50 border-x-2 border-y-2 rounded-full text-white font-bold px-3 py-2 shadow-inner hover:border-sky-400 hover:shadow-md transition-all ease-in-out duration-300"
            >
              Yaratish
            </button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

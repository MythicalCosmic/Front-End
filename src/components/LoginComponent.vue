<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const email = ref(null);
const password = ref(null);

const login = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.post("https://back-end-kde2.onrender.com/api-auth/login/", {
      email: email.value,
      password: password.value,
    });

    // Check if login was successful and store the tokens
    if (response.data && response.data.access && response.data.refresh) {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      await router.push('/products');
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Login failed:', error);
    alert('Invalid credentials, please try again.');
  }
};
</script>

<template>
  <div class="container">
    <div class="top"></div>
    <div class="bottom"></div>
    <div class="center">
      <form @submit="login">
        <h1 style="justify-content: center;font-size: 25px;padding: 10px ;display: flex">Please Sign In</h1>
        <div class="input-container">
          <i class="fa-solid fa-user input-icon"></i>
          <input type="text" v-model="email" placeholder="Username"/>
        </div>
        <div class="input-container">
          <i class="fa-solid fa-lock input-icon"></i>
          <input type="password" v-model="password" placeholder="password">
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

*, *:before, *:after {
  box-sizing: border-box;
  top: 0;
  left: 0;
}

body {
  min-height: 100vh;
  font-family: 'Raleway', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.container:hover .top:before,
.container:hover .top:after,
.container:hover .bottom:before,
.container:hover .bottom:after {
  margin-left: 200px;
  transform-origin: -200px 50%;
  transition-delay: 0s;
}

.container:hover .center {
  opacity: 1;
  transition-delay: 0.2s;
}

.top:before, .top:after, .bottom:before, .bottom:after {
  content: '';
  display: block;
  position: absolute;
  width: 200vmax;
  height: 200vmax;
  top: 50%;
  left: 50%;
  margin-top: -100vmax;
  transform-origin: 0 50%;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  z-index: 10;
  opacity: 0.65;
  transition-delay: 0.2s;
}

.top:before {
  transform: rotate(45deg);
  background: #e46569;
}

.top:after {
  transform: rotate(135deg);
  background: #ecaf81;
}

.bottom:before {
  transform: rotate(-45deg);
  background: #60b8d4;
}

.bottom:after {
  transform: rotate(-135deg);
  background: #3745b5;
}

.center {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 55%;
  left: 50%;
  margin-left: -200px;
  margin-top: -200px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  transition-delay: 0s;
  color: #333;
  animation: fadeIn 1s ease-in-out;
  z-index: 20;
}

.input-container {
  position: relative;
  width: 100%;
  margin-bottom: 10px;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  pointer-events: none;
}

input {
  width: 100%;
  padding: 15px 15px 15px 45px;
  border-radius: 1px;
  border: 1px solid #ccc;
  font-family: inherit;
}

button {
  display: block;
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #6200EE;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  z-index: 30;
}

button:hover {
  background-color: #3700B3;
  transform: scale(1.05);
}

button:active {
  background-color: #03DAC6;
  transform: scale(0.95);
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.container .center {
  animation: fadeIn 0 ease-in-out;
}
</style>

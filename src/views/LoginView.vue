<template>
    <div class="container py-5">
        <div class="container">
            <h1 class="text-center py-4">Fine Blog - Login</h1>
            <div class="card shadow-lg">
                <div class="row">
                    <div class="col-md-6">
                        <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                            alt="" class="img-fluid">
                    </div>
                    <div class="col-md-6 py-4">
                        <form @submit.prevent="onSubmit">
                            <div class="container">
                                <div class="form-floating mb-3">
                                    <input type="text" id="username" class="form-control border border-2"
                                        placeholder="username" v-model="user.username">
                                    <label for="username">Username</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="password" id="password" class="form-control border border-2"
                                        placeholder="password" v-model="user.password">
                                    <label for="password">Password</label>
                                </div>
                                <div class="d-grid">
                                    <button class="btn btn-outline-primary">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
// import axios from 'axios'
import swal from 'sweetalert2'
import router from '@/router'
import api from '@/api'

const user = ref({
    username: '',
    password: ''
});

const checkValidation = () => {
    if (user.value.username == '' || user.value.password == '') {
        swal.fire({
            title: 'Error',
            text: 'Please fill email and password fields',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return false;
    }
    return true;
}

// const authStore = useAuthStore()

const onSubmit = async () => {
    if (checkValidation()) {
        const response = await api.post('/Auth/Login', user.value);
        console.log(response);
        if (!response.data.success) {
            swal.fire({
                title: 'Error',
                text: response.data.errors,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }
        else {
            //set token to localstorage
            let user = {
                userId: response.data.userId,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                userName: response.data.username,
                email: response.data.email,
                role: response.data.role
            }
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/admin/post');
        }
    }
}



</script>
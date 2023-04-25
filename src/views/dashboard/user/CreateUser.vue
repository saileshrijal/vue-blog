<template>
    <form @submit.prevent="onSubmit">
        <div class="container my-5">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">
                        Create User
                    </h4>
                </div>
                <div class="card-body">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="firstName" placeholder="First Name"
                            v-model="user.firstName">
                        <label for="firstName">First Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="lastName" placeholder="Last Name"
                            v-model="user.lastName">
                        <label for="lastName">Last Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="email" placeholder="Email" v-model="user.email">
                        <label for="email">Email</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="username" placeholder="Username"
                            v-model="user.username">
                        <label for="username">Username</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="password" placeholder="Password"
                            v-model="user.password">
                        <label for="password">Password</label>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="d-grid">
                        <button class="btn btn-primary">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref } from "vue";
import swal from "sweetalert2"
import axiosTokenInstance from "@/services/AxiosTokenInstance";
import router from "@/router";

const user = ref({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
});

const checkValidation = () => {
    if (user.value.firstName === '' || user.value.lastName === '' || user.value.email === '' || user.value.username === '' || user.value.password === '') {
        swal.fire({
            title: 'Error!',
            text: 'Please fill all the required fields',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return false;
    }
    return true;
}

const onSubmit = async () => {
    if (checkValidation()) {
        const response = await axiosTokenInstance.post('/user/create', user.value);
        console.log(response);
        if (response.status === 200) {
            swal.fire({
                title: 'Success!',
                text: 'User created successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            router.push('/dashboard/user');
        }
    }
}

</script>
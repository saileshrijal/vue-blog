<template>
    <form @submit.prevent="onSubmit">
        <div class="container">
            <div class="py-5">
                <div class="card">
                    <div class="card-header bg-primary text-light">
                        <h2 class="card-title">Edit User</h2>
                    </div>
                    <div class="card-body">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="firstName" placeholder="First Name"
                                v-model="user.firstName" />
                            <label for="firstName">First Name</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="lastName" placeholder="Last Name"
                                v-model="user.lastName" />
                            <label for="lastName">Last Name</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="email" placeholder="Email" v-model="user.email"
                                disabled />
                            <label for="email">Email</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="username" placeholder="Username"
                                v-model="user.userName" disabled />
                            <label for="username">UserName</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="role" placeholder="Role" v-model="user.role"
                                disabled />
                            <label for="role">Role</label>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="d-grid">
                            <button class="btn btn-outline-success">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// import api from '@/api'
import swal from 'sweetalert2'
import axiosTokenInstance from '@/services/AxiosTokenInstance';
import router from '@/router';

const user = ref({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    role: ''
});


const checkValidation = () => {
    if (user.value.firstName == '' || user.value.lastName == '') {
        swal.fire({
            title: 'Error',
            text: 'Please fill all fields',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return false;
    }
    return true;
}
const id = router.currentRoute.value.params.id;

const onSubmit = async () => {
    if (checkValidation()) {
        const response = await axiosTokenInstance.put("/User/Edit/" + id, user.value);
        //update user from local storage
        console.log(response);
        swal.fire({
            title: 'Success',
            text: 'User updated successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    }
}

onMounted(async () => {
    const response = await axiosTokenInstance.get("/User/Get/" + id);
    console.log(response);
    user.value = response.data;
});


</script>
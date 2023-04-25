<template>
    <form @submit.prevent="onSubmit">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-6 py-5 mx-auto">
                    <div class="card">
                        <div class="card-header bg-primary text-light">
                            <h4 class="card-title text-center">Reset Password</h4>
                        </div>
                        <div class="card-body">
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="newPassword" placeholder="New Password"
                                    v-model="password" />
                                <label for="newPassword">New Password</label>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="d-grid">
                                <button class="btn btn-outline-success">Reset Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>

import { ref } from 'vue'
import axiosTokenInstance from '@/services/AxiosTokenInstance';
import Swal from 'sweetalert2';
import router from '@/router';

const password = ref();

const checkValidation = () => {
    if (password.value == '') {
        Swal.fire({
            title: 'Error',
            text: 'Password cannot be empty',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return false;
    }
    if (password.value.length < 8) {
        Swal.fire({
            title: 'Error',
            text: 'Password must be at least 8 characters',
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
        const respone = await axiosTokenInstance.put('/user/resetPassword/' + id, { password: password.value });
        console.log(respone)
        if (respone.status === 200) {
            Swal.fire({
                title: 'Success',
                text: respone.data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            password.value = '';
        }
    }
}
</script>
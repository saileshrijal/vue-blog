<template>
    <form @submit.prevent="onSubmit">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-6 py-5 mx-auto">
                    <div class="card">
                        <div class="card-header bg-primary text-light">
                            <h4 class="card-title text-center">Change Password</h4>
                        </div>
                        <div class="card-body">
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="currentPassword"
                                    placeholder="Current Password" v-model="password.oldPassword" />
                                <label for="currentPassword">Current Password</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="newPassword" placeholder="New Password"
                                    v-model="password.newPassword" />
                                <label for="newPassword">New Password</label>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="d-grid">
                                <button class="btn btn-outline-success">Change Password</button>
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
import swal from 'sweetalert2';

const password = ref({
    oldPassword: '',
    newPassword: ''
});

const onSubmit = async () => {
    try {
        const response = await axiosTokenInstance.put('/user/changePassword', password.value);
        console.log(response);
        if (response.status === 200) {
            swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            password.value = {
                oldPassword: '',
                newPassword: ''
            };
        }
    } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
            swal.fire({
                title: 'Error',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }
}

</script>
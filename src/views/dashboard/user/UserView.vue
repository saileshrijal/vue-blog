<template>
    <div class="container mt-4">
        <RouterLink to="/dashboard/user/create" class="btn btn-primary"> Create</RouterLink>
        <div class="card mt-2">
            <div class="card-header">
                <h4 class="card-title">List of Users</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-striped table-secondary table-hover">
                        <thead>
                            <tr>
                                <th class="fw-bold">#</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="user.id">
                                <td class="fw-bold">{{ index + 1 }}</td>
                                <td>{{ user.firstName }}</td>
                                <td>{{ user.lastName }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.userName }}</td>
                                <td>{{ user.role }}</td>
                                <td>{{ user.status ? "Active" : "Not Active" }}</td>
                                <td>
                                    <button @click="onEdit(user.id)" class="btn btn-sm btn-info">Edit</button>
                                    <button class="btn btn-sm btn-dark" @click="toggleStatus(user.id)">{{ user.status ?
                                        "Deactivate" : "Activate"
                                    }}</button>
                                    <button class="btn btn-sm btn-warning" @click="onResetPassword(user.id)">Reset
                                        Password</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axiosTokenInstance from "@/services/AxiosTokenInstance";
import router from "@/router";
import Swal from "sweetalert2";

const users = ref([]);

onMounted(async () => {
    const response = await axiosTokenInstance.get("/user/get");
    console.log(response);
    users.value = response.data;
});

const onEdit = (id) => {
    router.push("/dashboard/user/edit/" + id);
}

const toggleStatus = async (id) => {
    //confirmation swal
    Swal.fire({
        title: 'Are you sure?',
        text: "You want to change the status of this user?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Change Status'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await axiosTokenInstance.post("/user/toggleUserStatus/" + id);
            users.value = users.value.map(user => {
                if (user.id === id) {
                    user.status = !user.status;
                }
                return user;
            });
            console.log(response);
            if (response.status === 200) {
                Swal.fire(
                    'Changed!',
                    'User status has been changed.',
                    'success'
                )
            } else {
                Swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                )
            }

        }
    })
}

const onResetPassword = (id) => {
    router.push("/dashboard/user/resetPassword/" + id);
}


</script>
<template>
    <div class="container py-4">
        <RouterLink to="/dashboard/category/create" class="btn btn-primary">Create</RouterLink>
        <div class="card mt-2">
            <div class="card-header">
                <h4 class="card-title">List of Categories</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover table-striped">
                        <thead>
                            <tr>
                                <th class="fw-bold">#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Created Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(category, index) in categories" :key="category.id">
                                <td class="fw-bold">{{ index + 1 }}</td>
                                <td>{{ category.title }}</td>
                                <td>{{ category.description }}</td>
                                <td>{{ category.createdDate }}</td>
                                <td>
                                    <button class="btn btn-info" @click="onEdit(category.id)">Edit</button>
                                    <button class="btn btn-danger" @click="onDelete(category.id)">Delete</button>
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
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import axiosTokenInstance from '@/services/AxiosTokenInstance';
import router from '@/router';

const categories = ref([]);

onMounted(async () => {
    const response = await axiosTokenInstance.get("/category/get");
    console.log(response)
    categories.value = response.data;
});

const onEdit = (id) => {
    router.push("/dashboard/category/edit/" + id);
}

const onDelete = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const response = axiosTokenInstance.delete("/category/delete/" + id);
            console.log(response);
            if (response.status == 200) {
                categories.value = categories.value.filter((category) => category.id !== id)
                Swal.fire(
                    'Deleted!',
                    'category has been deleted.',
                    'success'
                );
            }
        }
    })
}

</script>
<template>
    <form @submit.prevent="onSubmit">
        <div class="container py-4">
            <div class="card mt-2">
                <div class="card-header">
                    <h4 class="card-title">Create Category</h4>
                </div>
                <div class="card-body">
                    <div class="form-floating mb-3">
                        <input type="text" id="title" class="form-control" placeholder="Title" v-model="category.title">
                        <label for="title">Title</label>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea type="text" id="description" aria-multiline="true" class="form-control"
                            placeholder="Description" rows="8" style="height: 200px;"
                            v-model="category.description"></textarea>
                        <label for="description">Description</label>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="d-grid">
                        <button class="btn btn-outline-primary">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2';
import router from '@/router';
import axiosTokenInstance from '@/services/AxiosTokenInstance';


const category = ref({
    title: '',
    description: '',
});

const id = router.currentRoute.value.params.id;

onMounted(async () => {
    const response = await axiosTokenInstance.get("/Category/Get/" + id);
    if (response.status === 200) {
        category.value = response.data;
    }
});

const checkValidation = () => {
    if (category.value.title === '') {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill all the required fields',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return false;
    }
    return true;
}

const onSubmit = async () => {
    if (checkValidation()) {
        const response = await axiosTokenInstance.put("/Category/Edit/" + id, category.value);
        if (response.status === 200) {
            Swal.fire({
                title: 'Success',
                text: 'Category updated successfully!',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            router.push("/dashboard/category");
        }
    }
}


</script>
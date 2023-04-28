<template>
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
        <div class="container py-4">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Create Post</h4>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8 col-sm-12">
                            <div class="form-floating mb-3">
                                <input type="text" id="title" placeholder="Title" class="form-control" v-model="post.title"
                                    required>
                                <label for="title">Title</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" id="shortDescription" placeholder="Short Description"
                                    class="form-control" v-model="post.shortDescription" required>
                                <label for="shortDescription">Short Description</label>
                            </div>
                            <div class="form-floating mb-3">
                                <Editor api-key="7qjkjvz7eegr5schf3b8iwvemcxjb82zvn5nvbm02u8l4xkb" :init="{
                                        plugins: 'lists link image table code help wordcount'
                                    }" id="description" placeholder="Description" class="form-control" v-model="post.description"
                                    style="height: 200px;"></Editor>
                                <label for="description">Short Description</label>
                            </div>
                            <div class="form-floating mb-3">
                                <select class="form-select" v-model="post.categoryIds" required multiple>
                                    <option value="">Select Category</option>
                                    <option :value="category.id" v-for="category in categories" :key="category.id">{{
                                        category.title }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <div class="form-floating mb-3">
                                <img :src="post.thumbnailUrl == '' ? defaultImage : post.thumbnailUrl" alt=""
                                    class="img-fluid">
                            </div>
                            <div class="mb-3">
                                <!-- //upload file  -->
                                <input type="file" id="thumbnail" placeholder="Thumbnail" class="form-control"
                                    @change="onThumbnailChange">
                            </div>
                            <div class="mb-3">
                                <input type="checkbox" class="form-check-inline" id="isPublished"
                                    v-model="post.isPublished">
                                <label for="isPublished">Publish</label>
                            </div>
                        </div>
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

import { ref, onMounted } from 'vue';
import axiosTokenInstance from '@/services/AxiosTokenInstance';
import router from '@/router';
import foreach from 'lodash/forEach';
import Editor from '@tinymce/tinymce-vue'

const defaultImage = 'https://images.unsplash.com/photo-1647891937869-bc31fe3f9836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80';

const post = ref({
    title: '',
    description: '',
    shortDescription: '',
    thumbnail: '',
    categoryIds: [],
    isPublished: false,
    thumbnailUrl: '',
});

const categories = ref([]);


onMounted(async () => {
    const response = await axiosTokenInstance.get('/category/get');
    categories.value = response.data;
});

const onSubmit = async () => {
    const formData = new FormData();
    formData.append('title', post.value.title);
    formData.append('description', post.value.description);
    formData.append('shortDescription', post.value.shortDescription);
    formData.append('thumbnail', post.value.thumbnail);
    foreach(post.value.categoryIds, (categoryId) => {
        formData.append('categoryIds[]', categoryId);
    });
    formData.append('isPublished', post.value.isPublished);

    const response = await axiosTokenInstance.post('/post/create', formData);
    console.log(response);
    if (response.status === 200) {
        router.push('/dashboard/post');
    }
}

const onThumbnailChange = (event) => {
    const file = event.target.files[0];
    post.value.thumbnail = file;
    post.value.thumbnailUrl = URL.createObjectURL(file);
}

</script>
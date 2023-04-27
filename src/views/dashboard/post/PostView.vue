<template>
    <div class="container py-4">
        <RouterLink to="/dashboard/post/create" class="btn btn-primary">Create</RouterLink>
        <div class="card mt-2">
            <div class="card-header">
                <h4 class="card-title">List of Posts</h4>
            </div>
            <div class="card-body">
                <div class="card shadow-lg mb-3" v-for="post in posts" :key="post.id">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-2">
                                <img :src="post.thumbnailUrl != null ? imageBaseUrl + post.thumbnailUrl : 'https://images.unsplash.com/photo-1647891937869-bc31fe3f9836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'"
                                    alt="" class="img-fluid" style="height: 100%; object-fit: cover;">
                            </div>
                            <div class="col-md-10">
                                <h3>{{ post.title }}</h3>
                                <p class="my-3">
                                    <span class="bg-primary text-light p-1 px-2 rounded-5 me-2"
                                        v-for="category in post.categories" :key="category.id">{{ category }}</span>
                                </p>
                                <p>
                                    <span class="bg-success text-light rounded-2 p-1">{{
                                        post.isPublished ? 'Published' : 'Draft' }}</span><span> On
                                        {{ post.createdDate }}</span><span> By {{ post.author }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axiosTokenInstance from '@/services/AxiosTokenInstance';

const posts = ref([]);

const imageBaseUrl = 'http://localhost:5008/uploads/post/';

onMounted(async () => {
    const response = await axiosTokenInstance.get('/post/get');
    posts.value = response.data;
    console.log(posts.value)
})

</script>
<template>
    <div class="container py-4">
        <div class="row">
            <div class="col-md-9 mx-auto col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">
                            {{ post.title }}
                        </h4>
                        <p class="card-subtitle">
                            {{ post.shortDescription }}
                        </p>
                    </div>
                    <div class="card-body">
                        <img :src="post.thumbnailUrl == null ? defaultImageUrl : baseImageUrl + post.thumbnailUrl"
                            :alt="post.title" class="card-img">
                        <div class="my-4">
                            <span class="badge bg-primary me-2" v-for="category in post.categories" :key="category.id">{{
                                category }}</span>
                        </div>
                        <div class="mb-4">Published By <span class="fw-bold text-primary">{{ post.author }}</span> at <span
                                class="fw-bold text-primary">
                                {{
                                    post.createdDate
                                }}</span></div>
                        <div class="card-text" v-html="post.description">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api';
import router from '@/router';
const defaultImageUrl = "https://images.unsplash.com/photo-1647891937869-bc31fe3f9836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
const baseImageUrl = "http://localhost:5008/uploads/post/";
const post = ref({
    title: '',
    shortDescription: '',
    description: '',
    categories: [],
    thumbnailUrl: '',
    author: '',
    createdDate: '',

});

const slug = router.currentRoute.value.params.slug;

onMounted(async () => {
    const response = await api.get("/post/GetPublishedPostBySlug/" + slug);
    post.value = response.data;
});

</script>
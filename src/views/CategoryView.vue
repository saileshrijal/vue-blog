<template>
    <div class="container py-4">
        <h1 class="bg-primary text-white p-2 fw-bold">{{ category.title }}</h1>
        <div class="row">
            <PostCard v-for="post in  posts " :key="post.id" :title="post.title" :shortDescription="post.shortDescription"
                :postLink="'/post/' + post.slug"
                :thumbnailUrl="post.thumbnailUrl == null ? defaultImageUrl : baseImageUrl + post.thumbnailUrl"
                postClass="col-md-4 col-sm-12 mb-3" />
        </div>
    </div>
</template>
  
<script setup>
import PostCard from '@/components/blog/PostCard.vue';
import api from '@/api';
import { ref, onMounted } from 'vue';
import router from '@/router';

const posts = ref([]);
const category = ref({
    title: ""
})

const baseImageUrl = "http://localhost:5008/uploads/post/";
const defaultImageUrl = "https://images.unsplash.com/photo-1647891937869-bc31fe3f9836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"

const id = router.currentRoute.value.params.id;

onMounted(async () => {
    const postResponse = await api.get("Post/GetPublishedPostsByCategoryId/" + id);
    posts.value = postResponse.data;
    const categoryResponse = await api.get("Category/Get/" + id);
    category.value = categoryResponse.data;
})

</script>
  
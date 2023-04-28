<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-md-9 col-sm-12">
        <h1 class="bg-primary text-white p-2 fw-bold">Blogs</h1>
        <div class="row">
          <PostCard v-for="post in  posts " :key="post.id" :title="post.title" :shortDescription="post.shortDescription"
            :postLink="'/post/' + post.slug"
            :thumbnailUrl="post.thumbnailUrl == null ? defaultImageUrl : baseImageUrl + post.thumbnailUrl" />
        </div>
      </div>
      <div class="col-md-3 col-sm-12">
        <h1 class="bg-primary text-white p-2 fw-bold">Categories</h1>
        <div class="mt-3">
          <RouterLink :to="'/category/' + category.id" v-for="category in categories" :key="category.id"
            class="bg-info text-white p-2 me-2 text-decoration-none">{{
              category.title }}</RouterLink>
        </div>
        <h1 class="bg-primary text-white p-2 fw-bold mt-5">Recent Posts</h1>
        <PostCard v-for="post in  recentPosts " :key="post.id" :title="post.title" :postLink="'/post/' + post.slug"
          :thumbnailUrl="post.thumbnailUrl == null ? defaultImageUrl : baseImageUrl + post.thumbnailUrl"
          postClass="col-12 mb-4" />
      </div>
    </div>
  </div>
</template>

<script setup>
import PostCard from '@/components/blog/PostCard.vue';
import api from '@/api';
import { ref, onMounted } from 'vue';

const posts = ref([]);

const recentPosts = ref([]);

const categories = ref([]);

const baseImageUrl = "http://localhost:5008/uploads/post/";
const defaultImageUrl = "https://images.unsplash.com/photo-1647891937869-bc31fe3f9836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"

onMounted(async () => {
  const postResponse = await api.get("/post/getPublishedPosts");
  posts.value = postResponse.data;
  const recentPostResponse = await api.get("/post/getRecentPublishedPosts");
  recentPosts.value = recentPostResponse.data;
  const categoryResponse = await api.get("/category/get");
  categories.value = categoryResponse.data;
})

</script>

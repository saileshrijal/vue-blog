<template>
  <NavBar />
  <div class="container py-4">
    <div class="row">

      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />


    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import PostCard from '@/components/PostCard.vue';
</script>

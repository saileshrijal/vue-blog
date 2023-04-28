<template>
    <div :class="postClass">
        <div class="card">
            <div class="card-header">
                <div class="card-body">
                    <img :src="props.thumbnailUrl" class="img-fluid" style="height: 200px; width: 100%; object-fit: cover;">
                </div>
            </div>
            <div class="card-footer">
                <h4 class="card-title text-primary">{{ props.title }}</h4>
                <p class="card-subtitle">{{ props.shortDescription }}</p>
                <RouterLink :to="props.postLink" class="btn btn-primary btn-sm mt-2">Read More</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    },
    postLink: {
        type: String,
        required: true
    },
    postClass: {
        type: String,
        required: false,
        default: "col-md-6 col-sm-12 mb-3"
    }
})

</script>
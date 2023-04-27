<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/dashboard/post">FineBlog - Admin Panel</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item" v-if="isAdmin">
                        <RouterLink to="/dashboard/user" class="nav-link">User</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/dashboard/category" class="nav-link">Category</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/dashboard/post" class="nav-link">Post</RouterLink>
                    </li>
                </ul>

                <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropstart btn btn-info active">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                            aria-haspopup="true" aria-expanded="false">Hi! {{ user.firstName + " " + user.lastName }} </a>
                        <div class="dropdown-menu">
                            <RouterLink class="dropdown-item" to="/dashboard/myProfile">My Profile</RouterLink>
                            <RouterLink class="dropdown-item" to="/dashboard/changePassword">Change Password</RouterLink>
                            <div class="dropdown-divider"></div>
                            <button class="dropdown-item" @click="logout">Logout</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import authService from '@/services/AuthService';
const isAdmin = authService.isAdmin();
const user = authService.getUser();

const logout = () => {
    authService.logout();
}
</script>
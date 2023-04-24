<template>
    <div class="container py-5">
        <div class="container">
            <h1 class="text-center py-4">Fine Blog - Login</h1>
            <div class="card shadow-lg">
                <div class="row">
                    <div class="col-md-6">
                        <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                            alt="" class="img-fluid">
                    </div>
                    <div class="col-md-6 py-4 d-flex justify-content-center align-items-center">
                        <div class="container">
                            <div class="form-floating mb-3">
                                <input type="text" id="username" class="form-control border border-2"
                                    placeholder="username">
                                <label for="username">Username</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" id="password" class="form-control border border-2"
                                    placeholder="password">
                                <label for="password">Password</label>
                            </div>
                            <div class="d-grid">
                                <button class="btn btn-outline-primary">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>
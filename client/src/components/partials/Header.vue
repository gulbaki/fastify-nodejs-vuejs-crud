<template>

<nav class="navbar navbar-expand navbar-dark bg-dark ">
      <div class="container-fluid">
        <div class="navbar-header ">
         
          <router-link to="/" class="navbar-brand ">BakiGul</router-link>
        </div>
          <ul class="nav navbar-nav">
            <li class="nav-item active">
              <router-link to="/blogs" class="nav-link">Blogs</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/add" class="nav-link">Add</router-link>
            </li>
          </ul>
      </div>
    </nav>

</template>

<script>
export default {
  name: "Header",
};
</script>
<template>
  <div class="list row">
    <div class="col-md-8">
      <!-- <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div> -->
    </div>
    <div class="col-md-6">
      <h4>Blog List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          style="cursor: pointer"
          :class="{ active: index == currentIndex }"
          v-for="(blog, index) in blogs"
          :key="index"
          @click="setActiveBlog(blog, index)"
        >
          {{ blog.title }}
        </li>
      </ul>

      <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllBlogs">
        Remove All
      </button> -->
    </div>
    <div class="col-md-6">
      <div v-if="currentBlog">
        <h4>Blog</h4>
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">{{ currentBlog.title }}</h5>
            <p class="card-text">{{ currentBlog.description }}</p>
            <p class="card-subtitle mb-2 text-muted">
              {{ format_date(currentBlog.created_at) }}
            </p>
          </div>
          <div class="card-footer text-muted">
            <router-link :to="'/blogs/' + currentBlog._id" class="btn btn-info"
              >Edit</router-link
            >
            <button
              class="btn btn-danger"
              @click="deleteBlog(currentBlog._id)"
              style="margin-left: 15px"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Blog title...</p>
      </div>
    </div>
  </div>
</template>

<script>
import BlogDataService from "../services/BlogDataService";
import moment from "moment";

export default {
  name: "blogs-list",
  data() {
    return {
      blogs: [],
      currentBlog: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    format_date(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY H:mm");
      }
    },
    retrieveBlogs() {
      BlogDataService.getAll()
        .then((response) => {
          this.blogs = response.data;
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveBlogs();
      this.currentBlog = null;
      this.currentIndex = -1;
    },

    setActiveBlog(blog, index) {
      this.currentBlog = blog;
      this.currentIndex = blog ? index : -1;
    },

    deleteBlog() {
      BlogDataService.delete(this.currentBlog._id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "blogs" });
           this.refreshList();  
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.retrieveBlogs();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
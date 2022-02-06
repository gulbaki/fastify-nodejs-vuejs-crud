<template>
  <div v-if="currentBlog" class="edit-form">
    <h4>Blog</h4>
    <form>
       <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li 
      v-for="error in errors"
      :key="error"
      >{{ error }}</li>
    </ul>
  </p>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentBlog.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentBlog.description"
        />
      </div>
    </form>

    <div style="margin-top: 5px">
      <button
        class="btn btn-danger"
        style="margin-right: 7px"
        @click="deleteBlog"
      >
        Delete
      </button>

      <button type="submit" class="btn btn-success" @click="updateBlog">
        Update
      </button>
      <p>{{ message }}</p>
    </div>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Blog...</p>
  </div>
</template>

<script>
import BlogDataService from "../services/BlogDataService";

export default {
  name: "blog",
  data() {
    return {
      currentBlog: null,
      message: "",
      errors: [],
    };
  },
  methods: {
    getBlog(id) {
      BlogDataService.get(id)
        .then((response) => {
          this.currentBlog = response.data;
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    checkForm() {
      this.errors = [];
      if (!this.currentBlog.title) {
        this.errors.push("title required.");
      }
      if (!this.currentBlog.description) {
        this.errors.push("description required.");
      }

      return this.errors.length > 0;
    },

    updateBlog() {
       if(this.checkForm() === true ) return false;
      BlogDataService.update(this.currentBlog._id, this.currentBlog)
        .then((response) => {
          console.log(response.data);
          this.message = "The Blog was updated successfully!";
          this.$router.push({ name: "blogs" });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteBlog() {
      BlogDataService.delete(this.currentBlog._id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "blogs" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getBlog(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
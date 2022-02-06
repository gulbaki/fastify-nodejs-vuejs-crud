<template>
  <div class="submit-form">
     <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li 
      v-for="error in errors"
      :key="error"
      >{{ error }}</li>
    </ul>
  </p>
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="blog.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="blog.description"
          name="description"
        />
      </div>

      <button @click="saveBlog" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newBlogs">Add</button>
    </div>
  </div>
</template>

<script>
import BlogDataService from "../services/BlogDataService";

export default {
  name: "add-blog",
  data() {
    return {
      blog: {
        id: null,
        title: "",
        description: "",
      },
      errors: [],
      submitted: false,
    };
  },
  methods: {
    checkForm() {
      this.errors = [];
      if (!this.blog.title) {
        this.errors.push("title required.");
      }
      if (!this.blog.description) {
        this.errors.push("description required.");
      }

      return this.errors.length > 0;
    },
    saveBlog() {
      if(this.checkForm() === true ) return false;
      var data = {
        title: this.blog.title,
        description: this.blog.description,
      };

      BlogDataService.create(data)
        .then((response) => {
          this.blog.id = response.data.id;
          this.submitted = true;
         this.errors = [];
        })
        .catch((e) => {
             this.errors = e.response.data.errors;
            if( this.errors.title !== "" ||  this.errors.description !== "") {  this.checkForm();}
       
        });
    },

    newBlogs() {
      this.submitted = false;
      this.blog = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
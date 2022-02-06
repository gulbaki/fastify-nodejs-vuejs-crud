// External Dependancies
const boom = require('boom')

// Get Data Models
const Blog = require('../models/Blog')

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { title: "", description: "" };

  //incorrect title or incorrect description
  if (err.message === 'Incorrect title and/or description') {
    errors.title = err.message;
    errors.description = err.message;
  }
  if (err.code === 11000) {
    errors.title = "that title is already registered";
  }

  // validation erros;
  if (err.message.includes("Blog validation failed")) {
    console.log(
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      })
    );
  }
  console.log(errors);
  return errors;
};

// Get all Blog
exports.getBlogs = async (req, reply) => {
  try {
    const blogs = await Blog.find()
    reply.code(200).send(blogs)
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single car by ID
exports.getSingleBlog = async (req, reply) => {
  try {
    const id = req.params.id
    const blog = await Blog.findById(id)
    reply.code(200).send(blog)
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new car
exports.addBlog = async (req, reply) => {
  const {title, description} = req.body
  try {
    const blog = await Blog.create({ title, description });
    
    reply.code(201).send({blog: blog._id});
  } catch (err) {
    const errors =  handleErrors(err);
    reply.code(409).send({errors});
  }
}

// Update an existing car
exports.updateBlog = async (req, reply) => {
  try {
    const id = req.params.id
    const blog = req.body
    const { ...updateData } = blog
    await Blog.findByIdAndUpdate(id, updateData, { new: true })

    reply.code(200).send({message:"OK"});
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a car
exports.deleteBlog = async (req, reply) => {
  try {
    const id = req.params.id
    const blog = await Blog.findByIdAndRemove(id)
    reply.code(200).send(blog)
  } catch (err) {
    throw boom.boomify(err)
  }
}
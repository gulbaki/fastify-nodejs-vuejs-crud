const blogController = require('../controllers/blogControllers')
const routes = [
  {
    method: 'GET',
    url: '/api/blog',
    handler: blogController.getBlogs
  },
  {
    method: 'GET',
    url: '/api/blog/:id',
    handler: blogController.getSingleBlog
  },
  {
    method: 'POST',
    url: '/api/blog',
    handler: blogController.addBlog,
    
  },
  {
    method: 'PUT',
    url: '/api/blog/:id',
    handler: blogController.updateBlog
  },
  {
    method: 'DELETE',
    url: '/api/blog/:id',
    handler: blogController.deleteBlog
  }
]

module.exports = routes
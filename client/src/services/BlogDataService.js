import http from "../http-common";

class BlogDataService {
  getAll() {
    return http.get("/blog");
  }

  get(id) {
    return http.get(`/blog/${id}`);
  }

  create(data) {
    return http.post("/blog", data);
  }

  update(id, data) {
    return http.put(`/blog/${id}`, data);
  }

  delete(id) {
    return http.delete(`/blog/${id}`);
  }

  deleteAll() {
    return http.delete(`/blog`);
  }

  findByTitle(title) {
    return http.get(`/blog?title=${title}`);
  }
}

export default new BlogDataService();
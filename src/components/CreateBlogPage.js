import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import { toast } from "react-hot-toast";
import axios from "axios";

function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
console.log("hello")
  const submitHandler = (e) => {
    e.preventDefault();
    
    const newBlog = {
      title: title,
      description: description,
    };
    axios
      .post("http://localhost:4000/api/v1/blogs/new", newBlog)
      .then((res) => {
        toast.success(res.data.message);
        setTitle("");
        setDescription("");
      });
  };

  return (
    <div>
    
      <Navbar />
      <div className="container">
        <form onSubmit={submitHandler} className="mt-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlogPage;

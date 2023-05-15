import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Context } from "../index";
import Navbar from "./Navbar";
import Spinner from "../utils/Spinner";

function CreateBlogPage() {
  // const { isAuthenticated, loading } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler =async (e) => {
    e.preventDefault();

    const newBlog = {
      title: title,
      description: description,
    };

   await axios
      .post("http://localhost:4000/api/v1/blogs/new", newBlog, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if (loading) {
  //   return <Spinner />;
  // }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

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

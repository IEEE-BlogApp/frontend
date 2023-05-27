import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Context } from "../index";
import Navbar from "./Navbar";
import Spinner from "../utils/Spinner";
import "../styles/CreateBlogPage.css"; // Import CSS file for styling

function CreateBlogPage() {
  const { isAuthenticated, loading } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
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

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <div className="cbp_container">
        <form onSubmit={submitHandler} className="cbp_blog-form">
          <div className="cbp_form-group">
            <label htmlFor="title" className="cbp_form-label">
              Title
            </label>
            <input
              type="text"
              className="cbp_form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="cbp_form-group">
            <label htmlFor="description" className="cbp_form-label">
              Description
            </label>
            <textarea
              className="cbp_form-control cbp_description-input"
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn cbp_btn-primary">
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlogPage;



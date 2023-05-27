import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../index.js";
import { Navigate } from "react-router-dom";
import "../styles/UpdateBlogPage.css";

function UpdateBlogsPage() {
  const { user } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/blogs/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setTitle(res.data.blog.title);
        setDescription(res.data.blog.description);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/blogs/${id}`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Blog updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update blog");
    }
  };

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/blogs/${id}`, {
        withCredentials: true,
      });
      toast.success("Blog deleted successfully");
      navigate("/home"); // Navigate to the home page using navigate function
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div>
        <Navbar />
        <div className="ubp_container">
          <form onSubmit={submitHandler} className="mt-4">
            <div className="mb-3">
              <label htmlFor="title" className="ubp_form-label">
                Title
              </label>
              <input
                type="text"
                className="ubp_form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="ubp_form-label">
                Description
              </label>
              <textarea
                className="ubp_form-control"
                id="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn ubp_btn-primary mr-2">
              Update Blog
            </button>
            <button
              type="button"
              className="btn ubp_btn-danger"
              onClick={deleteHandler}
            >
              Delete Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateBlogsPage;


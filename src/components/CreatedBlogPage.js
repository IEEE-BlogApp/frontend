import React, { useState, useContext, useEffect } from "react";
import { Context } from "../index.js";
import axios from "axios";
import Spinner from "../utils/Spinner.js";
import Navbar from "./Navbar.js";
import { Routes, Route, Link } from "react-router-dom";
import "../styles/CreatedBlogPage.css"; // Import CSS file for styling

function CreatedBlogPage() {
  const { user } = useContext(Context);
  const [data, setData] = useState([]);
  const [loading1, setLoading1] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user && user._id) {
        try {
          const res = await axios.get("http://localhost:4000/api/v1/blogs/all", {
            withCredentials: true,
          });
          const filtered = res.data.blogs.filter((blog) => blog.creator === user._id);
          setData(filtered);
          setLoading1(false);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchBlogs();
  }, [user, loading1]);

  if (loading1) {
    return <Spinner />;
  } else {
    return (
      <>
        <Navbar />
        <div className="chp_container">
          <h1 className="chp_page-title">Hello {user.name}, these are your created blogs</h1>
          <div className="chp_blog-list">
            {data.map((blog) => (
              <Link
                key={blog._id}
                to={`/blogs/update/${blog._id}`}
                className="chp_blog-item"
              >
                <div key={blog._id} className="chp_card">
                  <div className="chp_card-body">
                    <h2 className="chp_card-title">{blog.title}</h2>
                    <p className="chp_card-text">{blog.description}</p>
                    <h2 className="chp_card-title">Comments</h2>
                    {blog.comments.map((comment) => (
                      <div key={comment._id} className="chp_comment-card">
                        <div className="chp_card-body">
                          <p className="chp_card-text">{comment.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default CreatedBlogPage;



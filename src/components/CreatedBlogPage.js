import React, { useState, useContext, useEffect } from "react";
import { Context } from "../index.js";
import axios from "axios";
import Spinner from "../utils/Spinner.js";
import Navbar from "./Navbar.js";
function CreatedBlogPage() {
  const { user } = useContext(Context);
  const [data, setData] = useState([]);
  const [loading1, setLoading1] = useState(true);
const{loading}=useContext(Context);
  useEffect(() => {
    const id = user._id;
    console.log(loading)
    console.log(user)
    console.log(id)
    
    axios
      .get("http://localhost:4000/api/v1/blogs/all", {
        withCredentials: true,
      })
      .then(async (res) => {
        const filtered = await res.data.blogs.filter((blog) => {
          return blog.creator === id;
        });
        setData(filtered);
        setLoading1(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading1) {
    return <Spinner />;
  } else {
    return (
        <><Navbar />
      <div className="container" style={{margin:"10px"}}>
        <h1 className="mb-4">Hello {user.name}, these are your created blogs</h1>
        {data.map((blog) => (
          <div key={blog._id} className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              <p className="card-text">{blog.description}</p>
              <h2 className="card-title">Comments</h2>
              {blog.comments.map((comment) => (
                <div key={comment._id} className="card mb-2">
                  <div className="card-body">
                    {/* <h3 className="card-title">{comment.name}</h3> */}
                    <p className="card-text">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      </>
    );
  }
}

export default CreatedBlogPage;



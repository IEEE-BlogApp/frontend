import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import Spinner from "../utils/Spinner";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../index.js";
import "../styles/BlogDetailPage.css"; 
function BlogsDetailPage() {
  const { user } = useContext(Context);
console.log(user)
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [commentors, setCommentors] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/blogs/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.blog);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    const fetchCommentors = async () => {
      const promises = data.comments.map((c) =>
        axios.get(`http://localhost:4000/api/v1/users/${c.commentorId}`, {
          withCredentials: true,
        })
      );

      try {
        const responses = await Promise.all(promises);
        const users = responses.map((res) => res.data.user);
        setCommentors(users);
      } catch (error) {
        console.log(error);
      }
    };

    if (data) {
      fetchCommentors();
    }
  }, [data]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userId = user._id;
    const blogId = id;

    axios
      .put(
        `http://localhost:4000/api/v1/blogs/comment/${blogId}`,
        { comment: message },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // Handle any success actions
        toast.success(res.data.message);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Navbar />
        <div className="bdp_container" style={{ margin: "10px" }}>
          <div className="bdp_card">
            <div className="bdp_card-body">
              <h1 className="bdp_card-title">{data.title}</h1>
              <p className="bdp_card-text">{data.description}</p>
            </div>
          </div>

          <div className="mt-4">
            <h2>Comments</h2>
            {data.comments.map((c, index) => (
              <div className="bdp_card" key={index}>
                <div className="bdp_card-body">
                  <h5 className="bdp_card-title">
                    {commentors[index] && commentors[index].name}
                  </h5>
                  <p className="bdp_card-text">{c.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <form>
            <div className="bdp_form-group">
              <textarea
                className="bdp_form-control"
                rows="3"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              ></textarea>
            </div>
            <button
              className="btn bdp_btn-primary"
              onClick={submitHandler}
              type="submit"
            >
              Add Comment
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default BlogsDetailPage;




import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import { Context } from "../index.js";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Spinner from "../utils/Spinner.js";
import { Routes, Route, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../styles/HomePage.css";

function HomePage() {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
  } = useContext(Context);

  const [offset, setOffset] = useState(1);
  const [data, setData] = useState([]);
  const [perPage] = useState(6);
  const [pageCount, setPageCount] = useState(0);

  const getData = async () => {
    const res = await axios.get(`http://localhost:4000/api/v1/blogs/all`, {
      withCredentials: true,
    });
    const data = res.data.blogs;
    let x = (offset - 1) * perPage;
    let y = offset * perPage;
    const slice = data.slice(x, y);
    setData(slice);
    setPageCount(Math.ceil(data.length / perPage));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  useEffect(() => {
    getData();
  }, [offset]);

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length <= 25) {
      return description;
    } else {
      const truncatedWords = words.slice(0, 25);
      return `${truncatedWords.join(" ")}...`;
    }
  };

  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="container text-center">
          <h1 className="display-4 mt-5">Hello {user.name}</h1>
        </div>
        <div className="container">
          <div className="row">
            {data.map((blog) => (
              <Link
                key={blog._id}
                to={`/blogs/${blog._id}`}
                className="col-md-4 mb-4"
              >
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">{blog.title}</h2>
                    <p className="card-text">
                      {truncateDescription(blog.description)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={10}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </>
    );
  }
}

export default HomePage;

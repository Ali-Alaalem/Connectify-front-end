// src/components/Dashboard.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import postService from "../../services/postService";
import "./Dashboard.css";

const Dashboard = ({ user }) => {
  const [allpost, setallpost] = useState([]);

  useEffect(() => {
    const fetchposts = async ({ user }) => {
      try {
        const userData = await postService.allposts({ user });
        setallpost(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchposts({ user });
  }, []);

  return (
    <main className="dashboard-container">
      <Link to="/addPost" className="add-post-link">
        <ion-icon name="add-outline"></ion-icon>
      </Link>
      <div className="post-grid">
        {allpost?.map((post) => {
          return (
            <div key={post._id} className="post-card">
              <img className="post-image" src={post?.image} alt="Post" />
              <div className="post-content">
                <p>{post.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Dashboard;

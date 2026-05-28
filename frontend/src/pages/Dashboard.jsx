import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../services/api';
import '../styles/Dashboard.css';

export default function Dashboard({ onLogout }) {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedImage) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await postsAPI.createPost(selectedImage);
      
      if (result.post) {
        setPosts([result.post, ...posts]);
        setSuccess('Caption generated successfully!');
        setSelectedImage(null);
        setPreview(null);
        e.target.reset();
      } else {
        setError(result.message || 'Failed to create post');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Caption Generator</h1>
          <div className="user-info">
            <span>Welcome, <strong>{user?.username}</strong></span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="upload-section">
          <h2>Generate Caption for Your Image</h2>
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="file-input-wrapper">
              <input
                type="file"
                id="image-input"
                accept="image/*"
                onChange={handleImageSelect}
                disabled={loading}
              />
              <label htmlFor="image-input" className="file-label">
                Choose Image
              </label>
            </div>

            {preview && (
              <div className="preview-container">
                <img src={preview} alt="Preview" className="preview-image" />
              </div>
            )}

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button 
              type="submit" 
              disabled={loading || !selectedImage}
              className="generate-btn"
            >
              {loading ? 'Generating Caption...' : 'Generate Caption'}
            </button>
          </form>
        </section>

        {posts.length > 0 && (
          <section className="posts-section">
            <h2>Your Generated Captions</h2>
            <div className="posts-grid">
              {posts.map((post) => (
                <div key={post._id} className="post-card">
                  <div className="post-image-container">
                    <img src={post.image} alt="Post" className="post-image" />
                  </div>
                  <div className="post-caption">
                    <p>{post.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

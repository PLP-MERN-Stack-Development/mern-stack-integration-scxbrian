import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/posts', {
        title,
        content,
        category,
      });
      navigate(`/posts/${res.data._id}`);
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
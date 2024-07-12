import { Link } from 'react-router-dom';
import { getDocs, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';
import DeleteIcon from '../assets/delete.svg';
import UpdateIcon from '../assets/update.svg';
import CloseIcon from '../assets/close.svg'; // Import the close icon

// styles
import './Home.css';

export default function Home() {
  const [articles, setArticles] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', author: '', description: '' });

  useEffect(() => {
    const ref = collection(db, 'articles');

    onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setArticles(results);
    });

    getDocs(ref)
      .then((snapshot) => {
        let results = [];
        snapshot.docs.forEach(doc => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setArticles(results);
      });
  }, []);

  const handleDelete = async (id) => {
    const ref = doc(db, 'articles', id);
    await deleteDoc(ref);
  };

  const handleEdit = (article) => {
    setEditingArticle(article.id);
    setEditForm({ title: article.title, author: article.author, description: article.description });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const ref = doc(db, 'articles', editingArticle);
    await updateDoc(ref, { title: editForm.title, author: editForm.author, description: editForm.description });
    setEditingArticle(null);
  };

  const handleClose = () => {
    setEditingArticle(null);
  };

  return (
    <div className="home">
      <h2>Articles</h2>
      {articles && articles.map(article => (
        <div key={article.id} className="card">
          <h3>{article.title}</h3>
          <p>Written by {article.author}</p>
          <Link to={`/articles/${article.id}`}>Read More...</Link>
          <img
            className="icon"
            onClick={() => handleDelete(article.id)}
            src={DeleteIcon} alt="delete icon"
          />
          <img
            className="icon"
            onClick={() => handleEdit(article)}
            src={UpdateIcon} alt="update icon" // Use the update icon
          />
        </div>
      ))}
      {editingArticle && (
        <form onSubmit={handleUpdate} className="edit-form">
          <h3>Edit Article</h3>
          <img
            className="close-icon"
            onClick={handleClose}
            src={CloseIcon} alt="close icon" // Use the close icon
          />
          <label>
            Title:
            <input
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              value={editForm.author}
              onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
            />
          </label>
          <label>
            Description:
            <textarea
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            />
          </label>
          <button type="submit">Update Article</button>
        </form>
      )}
    </div>
  );
}

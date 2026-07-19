import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Clock, Tag, ExternalLink } from 'lucide-react';
import './Education.css';

const Education = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'Balanced Eating', 'Weight Management', 'Athletic Performance', 'Health Conditions', 'Dietary Restrictions'];

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory !== 'all') params.category = selectedCategory;
      if (searchTerm) params.search = searchTerm;

      const response = await axios.get('http://localhost:5000/api/education', { params });
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Educational Resources & Nutrition Guides</h1>
        <p>Evidence-based articles on balanced eating, athletic performance, health conditions, and dietary choices</p>
      </div>

      <div className="search-filters">
        <form onSubmit={handleSearchSubmit} className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
            placeholder="Search guides, topics (e.g. diabetes, protein, keto)..."
          />
        </form>

        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading educational resources...</div>
      ) : (
        <div className="articles-grid">
          {articles.length === 0 ? (
            <div className="empty-state">
              <p>No guides found matching your search.</p>
            </div>
          ) : (
            articles.map(article => (
              <div key={article.id || article.title} className="article-card" onClick={() => setSelectedArticle(article)}>
                <div className="article-category-badge">{article.category}</div>
                <h2 className="article-title">{article.title}</h2>
                <p className="article-summary">{article.summary}</p>
                
                <div className="article-meta">
                  <span className="meta-item"><Clock size={16} /> {article.readTime}</span>
                  <button className="read-more-btn">Read Article <ExternalLink size={14} /></button>
                </div>

                <div className="article-tags">
                  {article.tags.map((tag, idx) => (
                    <span key={idx} className="tag"><Tag size={12} /> {tag}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {selectedArticle && (
        <div className="article-modal" onClick={() => setSelectedArticle(null)}>
          <div className="article-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedArticle(null)}>×</button>
            <span className="modal-category">{selectedArticle.category} • {selectedArticle.readTime}</span>
            <h2>{selectedArticle.title}</h2>
            <hr />
            <div className="modal-body-text" style={{ whiteSpace: 'pre-line' }}>
              {selectedArticle.content}
            </div>
            
            <div className="disclaimer-callout">
              <strong>Medical Notice:</strong> Content provided here is for general health literacy and wellness education. It does not constitute medical diagnosis or dietary treatment. Always consult a licensed healthcare provider or Registered Dietitian for individualized medical therapy.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;

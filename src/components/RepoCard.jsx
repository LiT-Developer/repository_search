import React from 'react';
import './RepoCard.css';

function RepoCard({ repo }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="repo-card">
      <h3 className="repo-title">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          {repo.name}
        </a>
      </h3>
      {repo.description && <p className="repo-description">{repo.description}</p>}
      <div className="repo-details">
        <span className="repo-stars">⭐ {repo.stargazers_count}</span>
        <span className="repo-updated">
          Последнее обновление: {formatDate(repo.updated_at)}
        </span>
      </div>
    </div>
  );
}

export default RepoCard;
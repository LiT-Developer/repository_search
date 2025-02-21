import React from 'react';
import { Repository } from '../types/types';

interface Props {
  repository: Repository;
}

const RepositoryCard: React.FC<Props> = ({ repository }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU');
  };

  return (
    <div className="repository-card border rounded p-4 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-2">
        <a 
          href={repository.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          {repository.name}
        </a>
      </h2>
      
      {repository.description && (
        <p className="text-gray-600 mb-4">{repository.description}</p>
      )}
      
      <div className="flex justify-between text-sm text-gray-500">
        <span>⭐ {repository.stargazers_count}</span>
        <span>Обновлено: {formatDate(repository.updated_at)}</span>
      </div>
    </div>
  );
};

export default RepositoryCard;
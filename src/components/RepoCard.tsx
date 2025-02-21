import React from 'react';
import { Repository } from '../types/github';

interface RepoCardProps {
  repo: Repository;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg 
                    transition-shadow duration-200 flex flex-col">
      <h3 className="text-xl font-semibold mb-2">
        <a 
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-github-blue hover:underline"
        >
          {repo.name}
        </a>
      </h3>
      
      {repo.description && (
        <p className="text-github-gray text-sm mb-4 flex-grow">
          {repo.description}
        </p>
      )}
      
      <div className="flex justify-between items-center text-sm text-github-gray">
        <div className="flex items-center">
          <svg 
            className="w-4 h-4 mr-1 fill-current text-yellow-400" 
            viewBox="0 0 16 16"
          >
            <path d="M8 0l2.5 5.3 5.5.8-4 4.1.9 5.8L8 13.3 3.1 16l.9-5.8-4-4.1 5.5-.8z"/>
          </svg>
          <span>{repo.stargazers_count}</span>
        </div>
        <span>
          Обновлено: {formatDate(repo.updated_at)}
        </span>
      </div>
    </div>
  );
};

export default RepoCard;
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import SearchBar from './SearchBar';
import { Repository } from '../types/github';
import RepoCard from './RepoCard';

const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { repositories, error, loading } = useAppSelector(state => state.github);

  return (
    <div className="container mx-auto p-4">
      <SearchBar />
      
      {loading && (
        <div className="flex justify-center items-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center my-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {!loading && repositories.map((repo: Repository) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
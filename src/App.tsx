import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchUserRepos } from './store/githubSlice';
import { RootState } from './store/store';
import SearchBar from './components/SearchBar';
import RepoCard from './components/RepoCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { Repository } from './types/github';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    repositories, 
    loading, 
    error, 
    username, 
    page, 
    hasMore 
  } = useAppSelector((state: RootState) => state.github);

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrolledToBottom =
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 100;

    if (scrolledToBottom && username) {
      dispatch(fetchUserRepos({ username, page: page + 1 }));
    }
  }, [loading, hasMore, username, page, dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-6">
        <h1 className="text-2xl text-center text-github-gray font-semibold">
          Поиск репозиториев GitHub
        </h1>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SearchBar />
        
        {error && <ErrorMessage message={error} />}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {repositories.map((repo: Repository) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
        
        {loading && <LoadingSpinner />}
      </main>
    </div>
  );
};

export default App;
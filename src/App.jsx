import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import RepoCard from './components/RepoCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchRepos = async (user, pageNum) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.github.com/users/${user}/repos?page=${pageNum}&per_page=20&sort=updated`
      );
      
      if (!response.ok) {
        throw new Error(response.status === 404 
          ? 'Пользователь не найден' 
          : 'Произошла ошибка при получении данных');
      }

      const data = await response.json();
      if (data.length < 20) setHasMore(false);
      
      setRepos(prevRepos => pageNum === 1 ? data : [...prevRepos, ...data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchUsername) => {
    setUsername(searchUsername);
    setPage(1);
    setHasMore(true);
    setRepos([]);
    if (searchUsername) fetchRepos(searchUsername, 1);
  };

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;
    
    const scrolledToBottom =
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight;

    if (scrolledToBottom) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (page > 1 && username && hasMore) {
      fetchRepos(username, page);
    }
  }, [page, username, hasMore]);

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />
      
      {error && <ErrorMessage message={error} />}
      
      <div className="repos-grid">
        {repos.map(repo => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
      
      {loading && <LoadingSpinner />}
    </div>
  );
}

export default App; 
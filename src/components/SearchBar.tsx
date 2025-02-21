import React, { useState, useCallback } from 'react';
import { useAppDispatch } from '../hooks';
import { setUsername, fetchUserRepos } from '../store/githubSlice';
import { debounce } from 'lodash-es';

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  const debouncedSearch = useCallback(
    debounce((username: string) => {
      if (username.trim()) {
        dispatch(setUsername(username.trim()));
        dispatch(fetchUserRepos({ username: username.trim(), page: 1 }));
      }
    }, 500),
    [dispatch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Введите имя пользователя GitHub"
        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 
                   focus:border-github-blue focus:ring-0 
                   transition-colors duration-200"
      />
    </div>
  );
};

export default SearchBar;
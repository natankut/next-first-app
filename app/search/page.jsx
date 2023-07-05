'use client'
import React, { useState } from 'react';

const fetchUsers = async (searchText) => {
  try {
    const res = await fetch(`https://reqres.in/api/users?q=${searchText}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw new Error('Error occurred while fetching data.');
  }
};

const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setIsSearching(true);
      const users = await fetchUsers(searchText);
      const filteredResults = users.filter((user) => {
        const { id, first_name, last_name, email } = user;
        const searchValue = searchText.toLowerCase();
        return (
          id.toString().includes(searchValue) ||
          first_name.toLowerCase().includes(searchValue) ||
          last_name.toLowerCase().includes(searchValue) ||
          email.toLowerCase().includes(searchValue)
        );
      });
      setSearchResults(filteredResults);
      setError(false);
      setIsSearching(false);
    } catch (error) {
      setError(true);
      setIsSearching(false);
    }
  };

  return (
    <div className="mt-5">
      <h1>Search your human!</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Find your human"
          className="form-control"
          name="searchText"
          autoComplete="off"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="submit"
          className="btn m-1 btn-block btn-outline-primary"
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p>Error occurred while fetching data.</p>}

      {searchResults.length > 0 && (
        <ul className="list-group mt-4">
          {searchResults.map((user) => (
            <li className="list-group-item" key={user.id}>
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Name:</strong> {user.first_name} {user.last_name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </li>
          ))}
        </ul>
      )}

      {!error && searchResults.length === 0 && searchText && !isSearching && (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;


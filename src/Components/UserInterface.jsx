// src/components/UserInterface.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, getUserRepos } from "../features/gitUserSlice";

const UserInterface = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { user, repos, loading, error } = useSelector((state) => state.user);
  const [dataFetched, setDataFetched] = useState(false);

  const handleFetchUser = () => {
    dispatch(getUserData(username));
    dispatch(getUserRepos(username));
    setDataFetched(true);
  };

  const handleSearchAnother = () => {
    setDataFetched(false);
    setUsername("");
  };

  return (
    <div className="container mx-auto mt-10 p-5 max-w-2xl sm:max-w-full">
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
        GitHub User Fetcher
      </h1>

      {/* Input field and button for fetching user data */}
      {!dataFetched ? (
        <div className="flex flex-col sm:flex-row items-center sm:space-x-3 space-y-4 sm:space-y-0 mb-6 animate-fadeIn">
          <input
            type="text"
            className="w-full px-4 py-3 text-base sm:text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
          />
          <button
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg text-lg hover:scale-105 transform transition duration-300 focus:outline-none disabled:opacity-50"
            onClick={handleFetchUser}
            disabled={loading || username.trim() === ""}
          >
            {loading ? "Loading..." : "Fetch User"}
          </button>
        </div>
      ) : (
        <button
          className="w-full sm:w-auto bg-gradient-to-r from-gray-500 to-gray-700 text-white px-6 py-3 rounded-lg mb-4 hover:scale-105 transform transition duration-300 animate-fadeIn"
          onClick={handleSearchAnother}
        >
          Search Another User
        </button>
      )}

      {/* Error message */}
      {error && <p className="text-red-500 text-lg animate-fadeIn">{error}</p>}

      {/* User details displayed only after fetching data */}
      {dataFetched && user && (
        <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg shadow-xl rounded-lg p-6 mb-6 animate-fadeIn">
          <div className="flex flex-col items-center text-center">
            <img
              src={user.avatar_url}
              alt="Avatar"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full mb-5 shadow-lg border-4 border-indigo-500"
            />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {user.name || user.login}
            </h2>
            <p className="text-gray-500 mb-4">@{user.login}</p>
            <div className="grid grid-cols-2 gap-4 w-full text-sm sm:text-base text-gray-700">
              <div className="flex flex-col items-center">
                <p className="font-semibold">Followers</p>
                <p>{user.followers}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">Following</p>
                <p>{user.following}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">Repositories</p>
                <p>{user.public_repos}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">Bio</p>
                <p>{user.bio || "No bio available"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Repositories list displayed only after fetching data */}
      {dataFetched && repos.length > 0 && (
        <div className="animate-fadeIn">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">
            Repositories
          </h3>
          <ul className="space-y-3">
            {repos.map((repo) => (
              <li
                key={repo.id}
                className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md rounded-lg p-4 shadow-md"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline font-semibold"
                >
                  {repo.name}
                </a>
                <p className="text-gray-500 text-sm">
                  {repo.description || "No description"} ({" "}
                  {repo.stargazers_count}⭐)
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserInterface;

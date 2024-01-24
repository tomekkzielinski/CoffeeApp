import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Tutaj możesz dodać logikę uwierzytelniania
    console.log('Zalogowano:', { username, password });
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-main-color  w-96 p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Logowanie</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold">
              Login:
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold">
              Hasło:
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full  text-white p-2 rounded-md bg-buttons-color transition duration-300"
          >
            Zaloguj
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

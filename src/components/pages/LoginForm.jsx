import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const LoginForm = ( {onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: username,
        password: password
      })
    });
  
    const data = await response.json();
    if (response.ok) {
      console.log('Logged in successfully:', data);
      onLogin(data); // Przekazanie danych użytkownika do funkcji onLogin
        navigate('/menu');

    } else {
      alert('Failed to login:', data.error);
      // Możesz również wyświetlić informację o błędzie
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-main-color w-96 p-8 rounded shadow-md">
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
            className="w-full text-white p-2 rounded-md bg-buttons-color transition duration-300"
          >
            Zaloguj
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

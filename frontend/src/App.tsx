import { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Search from './components/Search';

function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="app-container">
      {token ? (
        <Search token={token} onLogout={handleLogout} />
      ) : (
        <Auth onLogin={(t: string) => {
          localStorage.setItem('token', t);
          setToken(t);
        }} />
      )}
    </div>
  );
}

export default App;

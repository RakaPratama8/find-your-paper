import { useState } from 'react';
import axios from 'axios';
import { Search as SearchIcon } from 'lucide-react';
import PaperCard from './PaperCard';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

interface SearchProps {
  token: string;
  onLogout: () => void;
}

export default function Search({ token, onLogout }: SearchProps) {
  const [query, setQuery] = useState('');
  const [years, setYears] = useState(5);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const res = await axios.get(`${API_URL}/api/v1/search`, {
        params: { q: query, years, limit: 10 },
        headers: { Authorization: `Bearer ${token}` }
      });
      setResults(res.data.results || []);
      setSearched(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch academic papers.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <nav className="search-nav">
          <div className="nav-logo">
            <h2>FYP</h2>
          </div>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </nav>
      </div>

      <div className="search-hero">
        <div className="container">
          <h1>Discover Academic Magic.</h1>
          <p>Find the exact papers you need using advanced semantic AI matching across millions of OpenAccess documents.</p>
        </div>
      </div>

      <div className="container">
        <form onSubmit={handleSearch} className="search-box-container">
          <input 
            type="text" 
            placeholder="e.g. transformer models for time series anomaly detection..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input 
            type="number" 
            className="date-filter"
            placeholder="Years back" 
            value={years}
            min={1}
            max={50}
            onChange={(e) => setYears(parseInt(e.target.value) || 5)}
            title="Years looking back"
          />
          <button type="submit" className="search-submit" disabled={loading}>
            <SearchIcon size={20} style={{marginRight: '0.5rem'}} />
            {loading ? 'Thinking...' : 'Search'}
          </button>
        </form>

        {error && <div className="error-message" style={{maxWidth: '700px', margin: '0 auto 2rem'}}>{error}</div>}

        {searched && !loading && results.length === 0 && (
          <div className="loading-indicator">
            <h3 style={{color: 'var(--text-primary)'}}>No semantic matches found.</h3>
            <p>Try refining your query or expanding the year range format.</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="results-container">
            {results.map((paper, index) => (
              <PaperCard key={paper.id || index} paper={paper} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { ResultCard } from './components/ResultCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorAlert } from './components/ErrorAlert';
import { IFSCService } from './services/api';
import { useDebounce } from './hooks/useDebounce';
import { IFSCCodeDetails } from './types';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<IFSCCodeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearch = async () => {
    if (!debouncedSearchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await IFSCService.getIFSCDetails(debouncedSearchTerm);
      
      if (response.error) {
        setError(response.error);
        setResults(null);
      } else if (response.data) {
        setResults(response.data);
        setError(null);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            IFSC Code Lookup
          </h1>
          <p className="text-gray-400 text-lg">
            Search for bank details using IFSC codes
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="mb-8">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onSubmit={handleSearch}
              loading={loading}
              placeholder="Enter IFSC code (e.g., HDFC0CAGSBK)"
            />
          </div>

          {error && (
            <div className="mb-6">
              <ErrorAlert message={error} onRetry={handleRetry} />
            </div>
          )}

          {loading && <LoadingSpinner />}

          {results && !loading && (
            <ResultCard data={results} />
          )}

          {!results && !loading && !error && (
            <div className="text-center text-gray-500 py-12">
              <div className="text-6xl mb-4">🏦</div>
              <p className="text-lg">Enter an IFSC code to get started</p>
              <p className="text-sm mt-2">Example: HDFC0CAGSBK</p>
            </div>
          )}
        </main>

        <footer className="text-center mt-16 text-gray-500 text-sm">
          <p>IFSC Code Lookup Service • Powered by Razorpay API</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
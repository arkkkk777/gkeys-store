import { useState, useEffect, useCallback } from 'react';
import { gamesApi } from '../services/gamesApi';
import type { SearchSuggestion } from '../types/search';

interface UseAutocompleteOptions {
  debounceMs?: number;
  minChars?: number;
  limit?: number;
}

interface UseAutocompleteReturn {
  suggestions: SearchSuggestion[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => void;
  clear: () => void;
}

/**
 * Hook for autocomplete search functionality
 * @param options - Configuration options
 * @returns Autocomplete state and methods
 */
export const useAutocomplete = (
  options: UseAutocompleteOptions = {}
): UseAutocompleteReturn => {
  const {
    debounceMs = 300,
    minChars = 2,
    limit = 10,
  } = options;

  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search function
  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
  }, []);

  useEffect(() => {
    // Clear suggestions if query is too short
    if (!query || query.trim().length < minChars) {
      setSuggestions([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    // Set loading state
    setIsLoading(true);
    setError(null);

    // Debounce the API call
    const timeoutId = setTimeout(async () => {
      try {
        const results = await gamesApi.getAutocomplete(query.trim(), limit);
        setSuggestions(results);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch suggestions');
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    // Cleanup timeout on unmount or query change
    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, minChars, limit, debounceMs]);

  const clear = useCallback(() => {
    setQuery('');
    setSuggestions([]);
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    suggestions,
    isLoading,
    error,
    search,
    clear,
  };
};

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutocomplete } from '../../hooks/useAutocomplete';
import { cn } from '../../lib/utils';
import type { SearchSuggestion } from '../../types/search';

interface SearchAutocompleteProps {
  value?: string;
  onSelect?: (suggestion: SearchSuggestion) => void;
  onSearch?: (query: string) => void;
  onChange?: (query: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
  minChars?: number;
}

/**
 * SearchAutocomplete component with dropdown suggestions
 * Supports keyboard navigation and ARIA labels for accessibility
 */
export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  value,
  onSelect,
  onSearch,
  onChange,
  placeholder = 'Search games...',
  className,
  debounceMs = 300,
  minChars = 2,
}) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>(value || '');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Sync with external value prop
  useEffect(() => {
    if (value !== undefined && value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  const { suggestions, isLoading, error, search, clear } = useAutocomplete({
    debounceMs,
    minChars,
  });

  // Update autocomplete when input changes
  useEffect(() => {
    if (inputValue.length >= minChars) {
      search(inputValue);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [inputValue, search, minChars]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setSelectedIndex(-1);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  const handleSelect = (suggestion: SearchSuggestion) => {
    setInputValue(suggestion.title);
    setIsOpen(false);
    setSelectedIndex(-1);

    if (onSelect) {
      onSelect(suggestion);
    }

    if (onSearch) {
      onSearch(suggestion.title);
    }

    // Navigate to game detail page
    navigate(`/game/${suggestion.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter' && inputValue.length >= minChars) {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelect(suggestions[selectedIndex]);
        } else if (inputValue.length >= minChars) {
          handleSearch();
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSearch = () => {
    if (inputValue.length >= minChars) {
      setIsOpen(false);
      if (onSearch) {
        onSearch(inputValue);
      }
    }
  };

  const handleClear = () => {
    setInputValue('');
    clear();
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedItem = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedItem) {
        selectedItem.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search games"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls="search-suggestions"
          aria-activedescendant={
            selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined
          }
          className={cn(
            'w-full h-10 px-4 pr-10 rounded-md',
            'bg-background border border-input',
            'text-foreground placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {isLoading && (
            <div
              className="w-4 h-4 border-2 border-muted-foreground border-t-foreground rounded-full animate-spin"
              aria-label="Loading suggestions"
            />
          )}
          {inputValue && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          id="search-suggestions"
          className={cn(
            'absolute z-50 w-full mt-1',
            'bg-popover border border-border rounded-md shadow-lg',
            'max-h-[400px] overflow-auto'
          )}
        >
          {error && (
            <div className="p-4 text-sm text-destructive" role="alert">
              {error}
            </div>
          )}

          {!error && suggestions.length === 0 && inputValue.length >= minChars && !isLoading && (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No games found
            </div>
          )}

          {!error && suggestions.length > 0 && (
            <ul ref={listRef} role="listbox" className="py-1">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  id={`suggestion-${index}`}
                  role="option"
                  aria-selected={selectedIndex === index}
                  tabIndex={selectedIndex === index ? 0 : -1}
                  onClick={() => handleSelect(suggestion)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(suggestion);
                    }
                  }}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 cursor-pointer',
                    'hover:bg-accent hover:text-accent-foreground',
                    'transition-colors focus:outline-none focus:ring-2 focus:ring-ring',
                    selectedIndex === index && 'bg-accent text-accent-foreground'
                  )}
                >
                  <img
                    src={suggestion.image}
                    alt={`${suggestion.title} cover`}
                    className="w-12 h-16 object-cover rounded"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{suggestion.title}</div>
                    <div className="text-xs text-muted-foreground">
                      Relevance: {Math.round(suggestion.relevanceScore * 100)}%
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

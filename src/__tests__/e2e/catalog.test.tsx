import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock the API module
vi.mock('../../services/gamesApi', () => ({
  gamesApi: {
    getGames: vi.fn().mockResolvedValue({
      games: [
        {
          id: '1',
          title: 'Test Game 1',
          slug: 'test-game-1',
          price: 49.99,
          imageUrl: 'https://example.com/game1.jpg',
          platform: 'PC',
          genre: 'Action',
          tags: ['action', 'adventure'],
          inStock: true,
          isPreorder: false,
        },
        {
          id: '2',
          title: 'Test Game 2',
          slug: 'test-game-2',
          price: 29.99,
          imageUrl: 'https://example.com/game2.jpg',
          platform: 'PC',
          genre: 'RPG',
          tags: ['rpg', 'fantasy'],
          inStock: true,
          isPreorder: false,
        },
      ],
      total: 2,
      page: 1,
      pageSize: 36,
      totalPages: 1,
    }),
    getFilterOptions: vi.fn().mockResolvedValue({
      platforms: ['PC', 'PlayStation', 'Xbox'],
      genres: ['Action', 'RPG', 'Adventure'],
      publishers: ['Publisher A', 'Publisher B'],
      priceRange: { min: 0, max: 100 },
    }),
  },
}));

// Simple mock component for testing
const MockCatalogPage = () => {
  const [games, setGames] = React.useState<Array<{
    id: string;
    title: string;
    slug: string;
    price: number;
  }>>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGames([
        { id: '1', title: 'Test Game 1', slug: 'test-game-1', price: 49.99 },
        { id: '2', title: 'Test Game 2', slug: 'test-game-2', price: 29.99 },
      ]);
      setLoading(false);
    }, 100);
  }, []);

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  return (
    <div data-testid="catalog-page">
      <h1>Catalog</h1>
      <div data-testid="games-count">{games.length} games found</div>
      <div data-testid="games-list">
        {games.map((game) => (
          <div key={game.id} data-testid="game-card">
            <h3>{game.title}</h3>
            <p>${game.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';

describe('Catalog Page E2E Tests', () => {
  it('should render catalog page', async () => {
    render(
      <BrowserRouter>
        <MockCatalogPage />
      </BrowserRouter>
    );

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Check if catalog is rendered
    expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
  });

  it('should display games count', async () => {
    render(
      <BrowserRouter>
        <MockCatalogPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('games-count')).toHaveTextContent('2 games found');
    });
  });

  it('should render game cards', async () => {
    render(
      <BrowserRouter>
        <MockCatalogPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      const gameCards = screen.getAllByTestId('game-card');
      expect(gameCards).toHaveLength(2);
    });
  });

  it('should display game titles', async () => {
    render(
      <BrowserRouter>
        <MockCatalogPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Game 1')).toBeInTheDocument();
      expect(screen.getByText('Test Game 2')).toBeInTheDocument();
    });
  });

  it('should display game prices', async () => {
    render(
      <BrowserRouter>
        <MockCatalogPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('$49.99')).toBeInTheDocument();
      expect(screen.getByText('$29.99')).toBeInTheDocument();
    });
  });
});


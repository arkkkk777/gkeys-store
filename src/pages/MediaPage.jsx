// Media Page - GKEYS Gaming Store
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogApi } from '../services/blogApi';

const theme = {
  colors: {
    primary: '#00FF66',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    text: '#FFFFFF',
    textSecondary: '#999999',
    textMuted: '#666666',
    border: '#333333',
  },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px' },
  borderRadius: { sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px' },
};

const Icons = {
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
};

const responsiveCSS = `
  @media (max-width: 768px) {
    .media-header { flex-direction: column !important; gap: 16px !important; }
    .media-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
    .media-title { font-size: 28px !important; }
    .media-subtitle { font-size: 14px !important; }
    .category-tabs { overflow-x: auto !important; padding-bottom: 8px !important; -webkit-overflow-scrolling: touch !important; }
    .category-tabs::-webkit-scrollbar { height: 4px !important; }
    .search-box { width: 100% !important; }
    .media-card { padding: 16px !important; }
    .media-card-image { padding-top: 50% !important; }
    .media-card-title { font-size: 16px !important; }
    .media-card-excerpt { font-size: 13px !important; }
  }
  @media (max-width: 1024px) and (min-width: 769px) {
    .media-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
  }
  @media (max-width: 480px) {
    .media-title { font-size: 24px !important; }
    .media-card { padding: 12px !important; }
    .category-tabs button { padding: 6px 12px !important; font-size: 13px !important; }
  }
  @media (orientation: landscape) and (max-height: 500px) {
    .media-card-image { padding-top: 40% !important; }
  }
`;

const categoryColors = {
  news: '#3B82F6',
  guides: '#22C55E',
  reviews: '#EAB308',
};

function MediaCard({ post, index }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const styles = {
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      paddingTop: '56.25%',
      overflow: 'hidden',
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
    },
    category: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      padding: '6px 12px',
      backgroundColor: categoryColors[post.category] || theme.colors.primary,
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'uppercase',
      color: '#fff',
    },
    content: {
      padding: '24px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '12px',
      lineHeight: '1.4',
      color: theme.colors.text,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    excerpt: {
      fontSize: '14px',
      color: theme.colors.textSecondary,
      marginBottom: '16px',
      lineHeight: '1.6',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      flex: 1,
    },
    meta: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      fontSize: '12px',
      color: theme.colors.textMuted,
      marginTop: 'auto',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    readMore: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      marginTop: '12px',
      color: theme.colors.primary,
      fontSize: '14px',
      fontWeight: '600',
      textDecoration: 'none',
    },
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
      style={styles.card}
      className="media-card"
    >
      <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={styles.imageContainer} className="media-card-image">
          <img src={post.image} alt={post.title} style={styles.image} loading="lazy" />
          <span style={styles.category}>{post.category}</span>
        </div>
        <div style={styles.content}>
          <h2 style={styles.title} className="media-card-title">{post.title}</h2>
          <p style={styles.excerpt} className="media-card-excerpt">{post.excerpt}</p>
          <div style={styles.meta}>
            <span style={styles.metaItem}>
              <Icons.Calendar />
              {formatDate(post.publishedAt)}
            </span>
            <span style={styles.metaItem}>
              <Icons.Clock />
              {post.readTime} min
            </span>
          </div>
          <span style={styles.readMore}>
            Read Article <Icons.ArrowRight />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function MediaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const activeCategory = searchParams.get('category') || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await blogApi.getCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const result = await blogApi.getPosts({
          category: activeCategory === 'all' ? undefined : activeCategory,
          search: search || undefined,
          page: currentPage,
          pageSize: 12,
        });
        setPosts(result.data);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [activeCategory, currentPage, search]);

  const handleCategoryChange = (slug) => {
    setSearchParams({ category: slug, page: '1' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ category: activeCategory, page: '1' });
  };

  const styles = {
    page: {
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '48px 24px',
    },
    header: {
      marginBottom: '48px',
    },
    title: {
      fontSize: '42px',
      fontWeight: '700',
      marginBottom: '16px',
      background: `linear-gradient(135deg, ${theme.colors.text} 0%, ${theme.colors.primary} 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subtitle: {
      fontSize: '18px',
      color: theme.colors.textSecondary,
      marginBottom: '32px',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '24px',
    },
    categoryTabs: {
      display: 'flex',
      gap: '8px',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'thin',
    },
    categoryTab: (isActive) => ({
      padding: '10px 20px',
      backgroundColor: isActive ? theme.colors.primary : theme.colors.surface,
      color: isActive ? '#000' : theme.colors.text,
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }),
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 20px',
      backgroundColor: theme.colors.surface,
      borderRadius: '10px',
      border: `1px solid ${theme.colors.border}`,
      minWidth: '280px',
    },
    searchInput: {
      flex: 1,
      background: 'none',
      border: 'none',
      color: theme.colors.text,
      fontSize: '15px',
      outline: 'none',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '32px',
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '64px',
      fontSize: '18px',
      color: theme.colors.textSecondary,
    },
    noResults: {
      textAlign: 'center',
      padding: '64px',
      color: theme.colors.textSecondary,
    },
  };

  return (
    <>
      <style>{responsiveCSS}</style>
      <div style={styles.page}>
        <div style={styles.container}>
          <header style={styles.header}>
            <h1 style={styles.title} className="media-title">Media</h1>
            <p style={styles.subtitle} className="media-subtitle">
              Latest gaming news, guides, and reviews from the GKEYS community
            </p>
            
            <div style={styles.controls} className="media-header">
              <div style={styles.categoryTabs} className="category-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    style={styles.categoryTab(activeCategory === cat.slug)}
                    onClick={() => handleCategoryChange(cat.slug)}
                  >
                    {cat.name} {cat.count > 0 && `(${cat.count})`}
                  </button>
                ))}
              </div>
              
              <form onSubmit={handleSearch} style={styles.searchBox} className="search-box">
                <Icons.Search />
                <input
                  type="text"
                  placeholder="Search articles..."
                  style={styles.searchInput}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            </div>
          </header>

          {loading ? (
            <div style={styles.loading}>Loading articles...</div>
          ) : posts.length === 0 ? (
            <div style={styles.noResults}>
              <h3>No articles found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div style={styles.grid} className="media-grid">
              {posts.map((post, index) => (
                <MediaCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}


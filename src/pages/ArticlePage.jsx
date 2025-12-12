// Article Page - GKEYS Gaming Store
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogApi } from '../services/blogApi';

const theme = {
  colors: {
    primary: '#00C8C2',
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
  ArrowLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Arrow Left</title>
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Clock</title>
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Calendar</title>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  User: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>User</title>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Share: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Share</title>
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
};

const categoryColors = {
  news: '#3B82F6',
  guides: '#22C55E',
  reviews: '#EAB308',
};

const responsiveCSS = `
  @media (max-width: 768px) {
    .article-container { padding: 24px 16px !important; }
    .article-title { font-size: 28px !important; }
    .article-content { font-size: 16px !important; }
    .article-meta { flex-wrap: wrap !important; }
  }
`;

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      try {
        const post = await blogApi.getPost(slug);
        if (!post) {
          navigate('/blog');
          return;
        }
        setArticle(post);
        
        // Load recent posts for sidebar
        const recent = await blogApi.getRecentPosts(5);
        setRecentPosts(recent.filter(p => p.slug !== slug).slice(0, 4));
      } catch (error) {
        console.error('Failed to load article:', error);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [slug, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const styles = {
    page: {
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
    },
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '48px 24px',
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      color: theme.colors.textSecondary,
      textDecoration: 'none',
      fontSize: '15px',
      marginBottom: '32px',
      transition: 'color 0.2s ease',
    },
    header: {
      marginBottom: '40px',
    },
    category: {
      display: 'inline-block',
      padding: '8px 16px',
      backgroundColor: categoryColors[article?.category] || theme.colors.primary,
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: '600',
      textTransform: 'uppercase',
      color: '#fff',
      marginBottom: '20px',
    },
    title: {
      fontSize: '42px',
      fontWeight: '700',
      lineHeight: '1.2',
      marginBottom: '24px',
    },
    meta: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      color: theme.colors.textSecondary,
      fontSize: '14px',
      marginBottom: '24px',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    shareButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      backgroundColor: theme.colors.surface,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '8px',
      color: theme.colors.text,
      fontSize: '14px',
      cursor: 'pointer',
      marginLeft: 'auto',
      transition: 'all 0.2s ease',
    },
    excerpt: {
      fontSize: '20px',
      color: theme.colors.textSecondary,
      lineHeight: '1.6',
      marginBottom: '32px',
      fontStyle: 'italic',
    },
    heroImage: {
      width: '100%',
      height: 'auto',
      maxHeight: '500px',
      objectFit: 'cover',
      borderRadius: '16px',
      marginBottom: '40px',
    },
    content: {
      fontSize: '17px',
      lineHeight: '1.8',
      color: theme.colors.text,
    },
    tags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '48px',
      paddingTop: '32px',
      borderTop: `1px solid ${theme.colors.border}`,
    },
    tag: {
      padding: '8px 16px',
      backgroundColor: theme.colors.surfaceLight,
      borderRadius: '20px',
      fontSize: '13px',
      color: theme.colors.textSecondary,
    },
    relatedSection: {
      marginTop: '64px',
      paddingTop: '48px',
      borderTop: `1px solid ${theme.colors.border}`,
    },
    relatedTitle: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '24px',
    },
    relatedGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
    },
    relatedCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: '12px',
      overflow: 'hidden',
      textDecoration: 'none',
      transition: 'transform 0.2s ease',
    },
    relatedImage: {
      width: '100%',
      height: '120px',
      objectFit: 'cover',
    },
    relatedContent: {
      padding: '16px',
    },
    relatedCardTitle: {
      fontSize: '15px',
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: '8px',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    relatedMeta: {
      fontSize: '12px',
      color: theme.colors.textMuted,
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '64px',
      fontSize: '18px',
      color: theme.colors.textSecondary,
    },
  };

  // Custom styles for article content
  const contentStyles = `
    .article-content h2 {
      font-size: 28px;
      font-weight: 600;
      margin-top: 40px;
      margin-bottom: 20px;
      color: ${theme.colors.text};
    }
    .article-content h3 {
      font-size: 22px;
      font-weight: 600;
      margin-top: 32px;
      margin-bottom: 16px;
      color: ${theme.colors.text};
    }
    .article-content p {
      margin-bottom: 20px;
    }
    .article-content ul, .article-content ol {
      margin-bottom: 20px;
      padding-left: 24px;
    }
    .article-content li {
      margin-bottom: 8px;
    }
    .article-content a {
      color: ${theme.colors.primary};
      text-decoration: none;
    }
    .article-content a:hover {
      text-decoration: underline;
    }
    .article-content blockquote {
      border-left: 4px solid ${theme.colors.primary};
      padding-left: 20px;
      margin: 24px 0;
      font-style: italic;
      color: ${theme.colors.textSecondary};
    }
    .article-content img {
      max-width: 100%;
      border-radius: 12px;
      margin: 24px 0;
    }
    .article-content code {
      background: ${theme.colors.surfaceLight};
      padding: 2px 8px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.9em;
    }
    .article-content pre {
      background: ${theme.colors.surfaceLight};
      padding: 20px;
      border-radius: 12px;
      overflow-x: auto;
      margin: 24px 0;
    }
    .article-content pre code {
      background: none;
      padding: 0;
    }
  `;

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.loading}>Loading article...</div>
        </div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <>
      <style>{responsiveCSS}</style>
      <style>{contentStyles}</style>
      <div style={styles.page}>
        <motion.div
          style={styles.container}
          className="article-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/blog" style={styles.backButton}>
            <Icons.ArrowLeft />
            Back to feed
          </Link>

          <header style={styles.header}>
            <span style={styles.category}>{article.category}</span>
            <h1 style={styles.title} className="article-title">{article.title}</h1>
            
            <div style={styles.meta} className="article-meta">
              <span style={styles.metaItem}>
                <Icons.User />
                {article.author}
              </span>
              <span style={styles.metaItem}>
                <Icons.Calendar />
                {formatDate(article.publishedAt)}
              </span>
              <span style={styles.metaItem}>
                <Icons.Clock />
                {article.readTime} min read
              </span>
              <button type="button" style={styles.shareButton} onClick={handleShare}>
                <Icons.Share />
                Share
              </button>
            </div>

            <p style={styles.excerpt}>{article.excerpt}</p>
          </header>

          {(article.image || article.coverImage) && (
            <img
              src={article.image || article.coverImage}
              alt={article.title}
              style={styles.heroImage}
            />
          )}

          <div
            style={styles.content}
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {article.tags && article.tags.length > 0 && (
            <div style={styles.tags}>
              {article.tags.map((tag) => (
                <span key={tag} style={styles.tag}>#{tag}</span>
              ))}
            </div>
          )}

          {recentPosts.length > 0 && (
            <section style={styles.relatedSection}>
              <h2 style={styles.relatedTitle}>More Articles</h2>
              <div style={styles.relatedGrid}>
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    style={styles.relatedCard}
                  >
                    {(post.image || post.coverImage) && (
                      <img
                        src={post.image || post.coverImage}
                        alt={post.title}
                        style={styles.relatedImage}
                      />
                    )}
                    <div style={styles.relatedContent}>
                      <h3 style={styles.relatedCardTitle}>{post.title}</h3>
                      <span style={styles.relatedMeta}>
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </div>
    </>
  );
}


// Media Page - GKEYS Gaming Store
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronDown, Home, FileStack, Zap, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/ui/article-card';
import { blogApi } from '../services/blogApi';

const theme = {
  colors: {
    primary: '#00C8C2',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    surfaceHover: '#333333',
    text: '#FFFFFF',
    textSecondary: '#999999',
    textMuted: '#666666',
    border: '#333333',
  },
};

const menuItems = [
  { label: 'Feed', slug: 'all', icon: Home },
  { label: 'News', slug: 'news', icon: FileStack },
  { label: 'Hot Updates', slug: 'guides', icon: Zap },
  { label: 'Articles', slug: 'reviews', icon: FileText },
];




export default function MediaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const activeCategory = searchParams.get('category') || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await blogApi.getCategories();
        setCategories(cats || []);
      } catch (error) {
        console.error('Failed to load categories:', error);
        setCategories([]);
      }
    };
    loadCategories();
  }, []);

  // Check if mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest('.mobile-blog-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

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
        setPosts(result?.data || []);
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
    setIsMobileMenuOpen(false);
  };

  // Get current active category label
  const getActiveCategoryLabel = () => {
    const activeCat = categories.find(cat => cat.slug === activeCategory);
    return activeCat ? `${activeCat.name}${activeCat.count > 0 ? ` (${activeCat.count})` : ''}` : 'All';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ category: activeCategory, page: '1' });
  };

  // Get active menu item label for mobile
  const getActiveMenuLabel = () => {
    const activeItem = menuItems.find(item => {
      if (item.slug === 'all') return activeCategory === 'all';
      return activeCategory === item.slug;
    });
    return activeItem ? activeItem.label : 'Feed';
  };

  return (
    <main className="min-h-screen bg-design-background text-design-text py-12">
      <Container>
        <div
          style={{
            display: 'flex',
            gap: '48px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
          className="blog-layout"
        >
          {/* Sidebar Menu - Desktop */}
          <aside
            style={{
              width: '240px',
              flexShrink: 0,
              display: isMobile ? 'none' : 'block',
            }}
            className="blog-sidebar"
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {menuItems.map((item) => {
                const active = item.slug === 'all' 
                  ? activeCategory === 'all' 
                  : activeCategory === item.slug;
                const IconComponent = item.icon;
                
                return (
                  <React.Fragment key={item.slug}>
                    <button
                      onClick={() => handleCategoryChange(item.slug)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px 20px',
                        backgroundColor: active ? theme.colors.surfaceLight : 'transparent',
                        borderRadius: '12px',
                        color: active ? theme.colors.text : theme.colors.textSecondary,
                        fontSize: '16px',
                        fontWeight: active ? '600' : '400',
                        transition: 'all 0.2s ease',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        width: '100%',
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.backgroundColor = theme.colors.surface;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <IconComponent 
                        size={20} 
                        style={{ 
                          fill: active && item.slug === 'all' ? theme.colors.text : 'none',
                          stroke: active ? theme.colors.text : theme.colors.textSecondary,
                          color: active ? theme.colors.text : theme.colors.textSecondary,
                        }} 
                      />
                      <span>{item.label}</span>
                    </button>
                    {active && (
                      <div
                        style={{
                          height: '1px',
                          backgroundColor: theme.colors.border,
                          margin: '8px 0',
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          </aside>

          {/* Mobile Dropdown Menu */}
          {isMobile && (
            <div
              className="mobile-blog-menu"
              style={{
                width: '100%',
                marginBottom: '24px',
                position: 'relative',
              }}
            >
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  backgroundColor: theme.colors.surface,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '12px',
                  color: theme.colors.text,
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                <span>{getActiveMenuLabel()}</span>
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      left: 0,
                      right: 0,
                      backgroundColor: theme.colors.surface,
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: '12px',
                      padding: '8px',
                      zIndex: 1000,
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {menuItems.map((item) => {
                      const active = item.slug === 'all' 
                        ? activeCategory === 'all' 
                        : activeCategory === item.slug;
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.slug}
                          onClick={() => handleCategoryChange(item.slug)}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            backgroundColor: active ? theme.colors.surfaceLight : 'transparent',
                            borderRadius: '8px',
                            color: active ? theme.colors.text : theme.colors.textSecondary,
                            fontSize: '16px',
                            fontWeight: active ? '600' : '400',
                            transition: 'background-color 0.2s ease',
                            marginBottom: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                          }}
                        >
                          <IconComponent 
                            size={20} 
                            style={{ 
                              fill: active && item.slug === 'all' ? theme.colors.text : 'none',
                              stroke: active ? theme.colors.text : theme.colors.textSecondary,
                              color: active ? theme.colors.text : theme.colors.textSecondary,
                            }} 
                          />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Main Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <Section>
              <header className="mb-12">
                <h1 className="text-4xl design-mobile:text-3xl font-bold mb-4 bg-gradient-to-r from-design-text to-design-primary bg-clip-text text-transparent">
                  Media
                </h1>
                <p className="text-lg text-design-text-secondary mb-8">
                  Latest gaming news, guides, and reviews from the GKEYS community
                </p>
                
                <form onSubmit={handleSearch} className="flex items-center gap-2 bg-design-surface border border-design-border rounded-design-lg px-4 py-2 min-w-[280px] design-mobile:w-full">
                  <Search className="w-5 h-5 text-design-text-muted" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-0 bg-transparent focus-visible:ring-0"
                    fullWidth={false}
                  />
                </form>
              </header>

          {loading ? (
            <div className="flex justify-center items-center py-16 text-lg text-design-text-secondary">
              Loading articles...
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 text-design-text-secondary">
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 design-tablet:grid-cols-2 design-desktop:grid-cols-3 gap-8 design-mobile:gap-5">
              {posts.map((post, index) => (
                <ArticleCard
                  key={post.id}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  image={post.image}
                  publishedAt={post.publishedAt}
                  readTime={post.readTime}
                  category={post.category}
                  index={index}
                />
              ))}
            </div>
          )}
            </Section>
          </div>
        </div>
      </Container>
      <style>
        {`
          @media (max-width: 768px) {
            .blog-layout {
              flex-direction: column !important;
              gap: 24px !important;
            }
            .blog-sidebar {
              display: none !important;
            }
            .mobile-blog-menu {
              display: block !important;
            }
          }
          @media (min-width: 769px) {
            .mobile-blog-menu {
              display: none !important;
            }
          }
        `}
      </style>
    </main>
  );
}


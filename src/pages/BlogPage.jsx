// Blog Page - GKEYS Gaming Store
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/ui/article-card';
import { blogApi } from '../services/blogApi';


export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 9,
    total: 0,
    totalPages: 0,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const activeCategory = searchParams.get('category') || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';

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
          pageSize: 9,
        });
        setPosts(result?.data || []);
        setPagination({
          page: result?.page || 1,
          pageSize: result?.pageSize || 9,
          total: result?.total || 0,
          totalPages: result?.totalPages || 0,
        });
      } catch (error) {
        console.error('Failed to load posts:', error);
        setPosts([]);
        setPagination({
          page: 1,
          pageSize: 9,
          total: 0,
          totalPages: 0,
        });
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
    const activeCat = categories.find(cat => cat.slug === activeCategory || (activeCategory === 'all' && cat.slug === 'all'));
    return activeCat ? `${activeCat.name}${activeCat.count !== undefined ? ` (${activeCat.count})` : ''}` : 'All';
  };

  const handlePageChange = (page) => {
    setSearchParams({ category: activeCategory, page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchValue = formData.get('search')?.toString().trim() || '';
    const params = { 
      category: activeCategory, 
      page: '1'
    };
    if (searchValue) {
      params.search = searchValue;
    }
    setSearchParams(params);
  };

  return (
    <main className="min-h-screen bg-design-background text-design-text py-12">
      <Container>
        <Section>
          <header className="mb-12">
            <h1 className="text-4xl design-mobile:text-3xl font-bold mb-4 bg-gradient-to-r from-design-text to-design-primary bg-clip-text text-transparent">
              Gaming Blog
            </h1>
            <p className="text-lg text-design-text-secondary mb-8">
              Stay updated with the latest gaming news, guides, and reviews
            </p>
            
            <div className="flex flex-col design-tablet:flex-row items-start design-tablet:items-center justify-between gap-6 design-mobile:gap-4">
              {/* Desktop Category Buttons */}
              <div className={`flex gap-2 overflow-x-auto pb-2 -webkit-overflow-scrolling-touch scrollbar-thin ${isMobile ? 'hidden' : ''}`}>
                {categories && categories.length > 0 ? (
                  categories.map((cat) => (
                    <Button
                      key={cat.slug}
                      variant={activeCategory === cat.slug || (activeCategory === 'all' && cat.slug === 'all') ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => handleCategoryChange(cat.slug)}
                      className="whitespace-nowrap"
                    >
                      {cat.name} {cat.count !== undefined && `(${cat.count})`}
                    </Button>
                  ))
                ) : (
                  <div className="text-sm text-design-text-muted">Loading categories...</div>
                )}
              </div>

              {/* Mobile Dropdown Menu */}
              {isMobile && (
                <div
                  className="mobile-blog-menu"
                  style={{
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 20px',
                      backgroundColor: '#1A1A1A',
                      border: '1px solid #333333',
                      borderRadius: '12px',
                      color: '#FFFFFF',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{getActiveCategoryLabel()}</span>
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
                          backgroundColor: '#1A1A1A',
                          border: '1px solid #333333',
                          borderRadius: '12px',
                          padding: '8px',
                          zIndex: 1000,
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        {categories && categories.length > 0 ? (
                          categories.map((cat) => {
                            const active = activeCategory === cat.slug || (activeCategory === 'all' && cat.slug === 'all');
                            return (
                              <button
                                type="button"
                                key={cat.slug}
                                onClick={() => handleCategoryChange(cat.slug)}
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '12px 16px',
                                  backgroundColor: active ? '#2A2A2A' : 'transparent',
                                  borderRadius: '8px',
                                  color: '#FFFFFF',
                                  fontSize: '16px',
                                  fontWeight: active ? '600' : '400',
                                  transition: 'background-color 0.2s ease',
                                  marginBottom: '4px',
                                  border: 'none',
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                }}
                              >
                                <span>{cat.name}{cat.count !== undefined ? ` (${cat.count})` : ''}</span>
                              </button>
                            );
                          })
                        ) : (
                          <div style={{ padding: '12px 16px', color: '#999999', fontSize: '14px' }}>
                            Loading categories...
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              
              <form onSubmit={handleSearch} className="flex items-center gap-2 bg-design-surface border border-design-border rounded-design-lg px-4 py-2 min-w-[280px] design-mobile:w-full">
                <Search className="w-5 h-5 text-design-text-muted" />
                <Input
                  type="text"
                  name="search"
                  placeholder="Search articles..."
                  defaultValue={search}
                  className="border-0 bg-transparent focus-visible:ring-0"
                  fullWidth={false}
                />
              </form>
            </div>
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
            <>
              <div className="grid grid-cols-1 design-tablet:grid-cols-2 design-desktop:grid-cols-3 gap-8 design-mobile:gap-5">
                {posts.map((post, index) => (
                  <ArticleCard
                    key={post.id}
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    image={post.image || post.coverImage || ''}
                    category={post.category}
                    publishedAt={post.publishedAt}
                    readTime={post.readTime}
                    index={index}
                  />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </>
          )}
        </Section>
      </Container>
    </main>
  );
}


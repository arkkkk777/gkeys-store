// Support/FAQ Page - GKEYS Gaming Store
import React, { useState, useEffect } from 'react';
import { faqApi } from '../services/faqApi';

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
};

const Icons = {
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Search</title>
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  ),
  Heart: ({ filled }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? theme.colors.primary : "none"} stroke={filled ? theme.colors.primary : "currentColor"} strokeWidth="2">
      <title>Heart</title>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Cart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Cart</title>
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  Grid: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Grid</title>
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Media: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Media</title>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Chevron Down</title>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  ChevronUp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Chevron Up</title>
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  ),
  Mail: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Mail</title>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  MessageCircle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Message Circle</title>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  ),
  Telegram: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <title>Telegram</title>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Instagram</title>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
};


const AccordionItem = ({ question, answer, isOpen, onToggle }) => (
  <div style={{
    background: theme.colors.surface,
    borderRadius: '10px',
    marginBottom: '8px',
    overflow: 'hidden',
  }}>
    <button
      type="button"
      onClick={onToggle}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 20px',
        background: 'none',
        border: 'none',
        color: theme.colors.text,
        fontSize: '15px',
        fontWeight: '500',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      {question}
      {isOpen ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
    </button>
    {isOpen && (
      <div style={{
        padding: '0 20px 20px',
        color: theme.colors.textSecondary,
        fontSize: '14px',
        lineHeight: '1.7',
      }}>
        {answer}
      </div>
    )}
  </div>
);

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [faqCategories, setFaqCategories] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [categoriesData, faqsData] = await Promise.all([
          faqApi.getCategories(),
          faqApi.getFAQs({ category: activeCategory }),
        ]);
        
        // Transform categories to match expected format
        const transformedCategories = categoriesData.map(cat => ({
          id: cat.slug,
          name: cat.name,
          count: cat.count,
        }));
        
        // Add "All" category at the beginning
        const allCount = faqsData.length;
        transformedCategories.unshift({
          id: 'all',
          name: 'All',
          count: allCount,
        });
        
        setFaqCategories(transformedCategories);
        setFaqs(faqsData);
      } catch (error) {
        console.error('Failed to load FAQ data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [activeCategory]);

  useEffect(() => {
    const loadSearchResults = async () => {
      if (!searchQuery) {
        // Reload current category when search is cleared
        const faqsData = await faqApi.getFAQs({ category: activeCategory });
        setFaqs(faqsData);
        return;
      }

      setLoading(true);
      try {
        const faqsData = await faqApi.getFAQs({ search: searchQuery });
        setFaqs(faqsData);
      } catch (error) {
        console.error('Failed to search FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(loadSearchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, activeCategory]);

  const filteredFaqs = faqs.map(faq => ({
    q: faq.question,
    a: faq.answer,
    id: faq.id,
  }));

  const responsiveCSS = `
    .support-layout { display: grid; grid-template-columns: 280px 1fr; gap: 32px; }
    .contact-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 48px; }
    @media (max-width: 1024px) {
      .contact-cards { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .support-layout { grid-template-columns: 1fr; }
      .category-sidebar { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
      .category-btn { padding: 10px 16px !important; }
      .contact-cards { grid-template-columns: 1fr; }
      .desktop-nav, .desktop-search, .desktop-login { display: none; }
    }
  `;

  const styles = {
    app: { minHeight: '100vh', background: theme.colors.background, color: theme.colors.text },
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: `1px solid ${theme.colors.border}`, position: 'sticky', top: 0, background: theme.colors.background, zIndex: 100 },
    logo: { fontSize: '24px', fontWeight: '800', textDecoration: 'none', color: theme.colors.text },
    nav: { display: 'flex', gap: '24px' },
    navLink: { display: 'flex', alignItems: 'center', gap: '6px', color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px', fontWeight: '500' },
    rightSection: { display: 'flex', alignItems: 'center', gap: '16px' },
    iconButton: { background: 'none', border: 'none', color: theme.colors.text, cursor: 'pointer', padding: '8px' },
    searchButton: { display: 'flex', alignItems: 'center', gap: '8px', background: theme.colors.surface, border: 'none', color: theme.colors.textSecondary, padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
    loginButton: { background: theme.colors.primary, color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' },
    main: { maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' },
    pageTitle: { fontSize: '28px', fontWeight: '700', marginBottom: '8px' },
    pageSubtitle: { color: theme.colors.textMuted, fontSize: '15px', marginBottom: '32px' },
    searchBox: { position: 'relative', marginBottom: '32px' },
    searchInput: { width: '100%', background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: '10px', padding: '14px 20px 14px 48px', color: theme.colors.text, fontSize: '15px', outline: 'none' },
    searchIcon: { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: theme.colors.textMuted },
    sidebar: { display: 'flex', flexDirection: 'column', gap: '4px' },
    categoryBtn: (isActive) => ({ width: '100%', textAlign: 'left', padding: '14px 18px', background: isActive ? theme.colors.surfaceLight : 'transparent', border: 'none', borderRadius: '8px', color: isActive ? theme.colors.primary : theme.colors.textSecondary, fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }),
    faqList: { display: 'flex', flexDirection: 'column' },
    contactCard: { background: theme.colors.surface, borderRadius: '12px', padding: '24px', textAlign: 'center' },
    contactIcon: { width: '48px', height: '48px', background: theme.colors.surfaceLight, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: theme.colors.primary },
    contactTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '8px' },
    contactText: { color: theme.colors.textMuted, fontSize: '13px', marginBottom: '16px' },
    contactLink: { color: theme.colors.primary, textDecoration: 'none', fontSize: '14px', fontWeight: '500' },
    footer: { borderTop: `1px solid ${theme.colors.border}`, padding: '48px 24px', marginTop: '64px' },
    footerTop: { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px', marginBottom: '32px', maxWidth: '1280px', margin: '0 auto 32px' },
    footerNav: { display: 'flex', flexWrap: 'wrap', gap: '24px' },
    footerLink: { color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' },
    footerSocial: { display: 'flex', gap: '16px' },
    footerBottom: { textAlign: 'center', paddingTop: '32px', borderTop: `1px solid ${theme.colors.border}`, maxWidth: '1280px', margin: '0 auto' },
    copyright: { color: theme.colors.textMuted, fontSize: '12px', lineHeight: '1.8' },
  };

  return (
    <>
      <style>{responsiveCSS}</style>
      {/* Main Content */}
        <main style={styles.main}>
          <h1 style={styles.pageTitle}>Support Center</h1>
          <p style={styles.pageSubtitle}>Find answers to frequently asked questions or contact our support team</p>

          {/* Search */}
          <div style={styles.searchBox}>
            <div style={styles.searchIcon}><Icons.Search /></div>
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* FAQ Layout */}
          <div className="support-layout">
            {/* Category Sidebar */}
            {!searchQuery && (
              <aside style={styles.sidebar} className="category-sidebar">
                {faqCategories.map(category => (
                  <button
                    type="button"
                    key={category.id}
                    onClick={() => { setActiveCategory(category.id); setOpenFaq(null); setSearchQuery(''); }}
                    style={styles.categoryBtn(activeCategory === category.id)}
                    className="category-btn"
                  >
                    {category.name} {category.count !== undefined ? `(${category.count})` : ''}
                  </button>
                ))}
              </aside>
            )}

            {/* FAQ List */}
            <div style={{ gridColumn: searchQuery ? '1 / -1' : 'auto' }}>
              {searchQuery && (
                <p style={{ color: theme.colors.textMuted, marginBottom: '16px', fontSize: '14px' }}>
                  {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} found
                </p>
              )}
              {loading ? (
                <div style={{ padding: '32px', textAlign: 'center', color: theme.colors.textSecondary }}>
                  Loading FAQs...
                </div>
              ) : filteredFaqs.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', color: theme.colors.textSecondary }}>
                  {searchQuery ? 'No FAQs found matching your search.' : 'No FAQs available in this category.'}
                </div>
              ) : (
                <div style={styles.faqList}>
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem
                      key={faq.id || index}
                      question={faq.q}
                      answer={faq.a}
                      isOpen={openFaq === index}
                      onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contact Cards */}
          <div className="contact-cards">
            <div style={styles.contactCard}>
              <div style={styles.contactIcon}><Icons.Mail /></div>
              <h3 style={styles.contactTitle}>Email Support</h3>
              <p style={styles.contactText}>Get help via email. We respond within 24 hours.</p>
              <a href="mailto:support@gkeys.com" style={styles.contactLink}>support@gkeys.com</a>
            </div>
            <div style={styles.contactCard}>
              <div style={styles.contactIcon}><Icons.Telegram /></div>
              <h3 style={styles.contactTitle}>Telegram</h3>
              <p style={styles.contactText}>Fast support via Telegram messenger.</p>
              <a href="https://t.me/gkeys_support" style={styles.contactLink}>@gkeys_support</a>
            </div>
            <div style={styles.contactCard}>
              <div style={styles.contactIcon}><Icons.MessageCircle /></div>
              <h3 style={styles.contactTitle}>Live Chat</h3>
              <p style={styles.contactText}>Chat with us in real-time during business hours.</p>
              <a href="mailto:support@gkeys.com" style={styles.contactLink}>Start Chat</a>
            </div>
          </div>
        </main>
    </>
  );
}


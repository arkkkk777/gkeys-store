// Support/FAQ Page - GKEYS Gaming Store
import React, { useState } from 'react';

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
};

const Icons = {
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  Heart: ({ filled }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? theme.colors.primary : "none"} stroke={filled ? theme.colors.primary : "currentColor"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Cart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  Grid: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Media: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  ChevronDown: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
  ChevronUp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>,
  Mail: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  MessageCircle: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Telegram: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  Instagram: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
};

const faqCategories = [
  {
    id: 'general',
    name: 'General Questions',
    faqs: [
      { q: 'What is GKEYS?', a: 'GKEYS is a licensed online store for video game activation keys. We sell official keys for Steam, Epic Games, Origin, Uplay, Battle.net, and other platforms. All our keys are purchased from official distributors and publishers.' },
      { q: 'Are the keys legal and official?', a: 'Yes, all keys sold on GKEYS are 100% legal and official. We work directly with publishers and authorized distributors. Each key is verified before being added to our inventory.' },
      { q: 'What platforms do you support?', a: 'We support all major gaming platforms including Steam, Epic Games Store, Origin (EA App), Uplay (Ubisoft Connect), Battle.net, GOG, Xbox, PlayStation, and Nintendo eShop.' },
      { q: 'Do you offer refunds?', a: 'Due to the digital nature of our products, we cannot offer refunds once a key has been revealed. However, if you experience any issues with key activation, our support team will help resolve the problem.' },
    ]
  },
  {
    id: 'buying',
    name: 'Buying a Game',
    faqs: [
      { q: 'How do I purchase a game?', a: 'Simply browse our catalog, add games to your cart, and proceed to checkout. You can pay using your account balance or credit/debit card. After payment, your keys will be delivered instantly to your account.' },
      { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, Apple Pay, Google Pay, and account balance top-ups via various payment methods. You can also use promo codes for additional discounts.' },
      { q: 'How quickly will I receive my key?', a: 'Keys are delivered instantly after successful payment. You can find your keys in your Profile under "My Orders". We also send an email confirmation with your activation keys.' },
      { q: 'Can I gift a game to someone?', a: 'Yes! During checkout, you can select the "Send as Gift" option. Enter the recipient\'s email address, and they will receive the key directly.' },
    ]
  },
  {
    id: 'preorder',
    name: 'Pre-orders',
    faqs: [
      { q: 'How do pre-orders work?', a: 'When you pre-order a game, payment is processed immediately. You will receive your activation key on or shortly before the game\'s official release date. We send email notifications when your key is ready.' },
      { q: 'Can I cancel a pre-order?', a: 'Pre-orders can be cancelled up to 14 days before the game\'s release date. After this period, cancellations are not possible. Contact our support team to request a cancellation.' },
      { q: 'Will I receive any bonuses with pre-orders?', a: 'Many pre-orders include exclusive bonuses, DLC, or early access. Check the game\'s product page for specific pre-order bonuses. All bonuses are delivered with your main game key.' },
    ]
  },
  {
    id: 'activation',
    name: 'Key Activation',
    faqs: [
      { q: 'How do I activate my key on Steam?', a: 'Open Steam → Click "Games" in the top menu → Select "Activate a Product on Steam" → Enter your key → Follow the prompts to complete activation. The game will then appear in your library.' },
      { q: 'My key is not working. What should I do?', a: 'First, ensure you\'re activating on the correct platform and region. If issues persist, contact our support with your order number. We\'ll verify the key and provide a replacement if necessary.' },
      { q: 'Are keys region-locked?', a: 'Some keys have regional restrictions. Each product page clearly indicates any region locks. Make sure to check the "Region" information before purchasing. Global keys work worldwide.' },
      { q: 'Can I use a key multiple times?', a: 'No, each key can only be activated once on a single account. Once activated, the key is permanently linked to that account and cannot be transferred or reused.' },
    ]
  },
  {
    id: 'account',
    name: 'Account & Balance',
    faqs: [
      { q: 'How do I top up my balance?', a: 'Go to your Profile → Balance page → Enter the amount → Choose a payment method → Complete the payment. Your balance will be updated instantly and can be used for future purchases.' },
      { q: 'Is there a minimum top-up amount?', a: 'The minimum top-up amount is $5. There is no maximum limit. Your balance never expires and can be used for any purchase on GKEYS.' },
      { q: 'Can I withdraw my balance?', a: 'Account balance cannot be withdrawn as cash. However, you can use it for any purchase on GKEYS, including pre-orders and gift purchases.' },
      { q: 'How do I change my password?', a: 'Go to your Profile → Edit Profile → Password section. Enter your current password, then your new password twice. Click "Save Changes" to update your password.' },
    ]
  },
];

const AccordionItem = ({ question, answer, isOpen, onToggle }) => (
  <div style={{
    background: theme.colors.surface,
    borderRadius: '10px',
    marginBottom: '8px',
    overflow: 'hidden',
  }}>
    <button
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

  const currentCategory = faqCategories.find(c => c.id === activeCategory);

  const filteredFaqs = searchQuery
    ? faqCategories.flatMap(c => c.faqs.filter(f => 
        f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.a.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    : currentCategory?.faqs || [];

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
                    key={category.id}
                    onClick={() => { setActiveCategory(category.id); setOpenFaq(null); }}
                    style={styles.categoryBtn(activeCategory === category.id)}
                    className="category-btn"
                  >
                    {category.name}
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
              <div style={styles.faqList}>
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    question={faq.q}
                    answer={faq.a}
                    isOpen={openFaq === index}
                    onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                  />
                ))}
              </div>
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
              <a href="#" style={styles.contactLink}>@gkeys_support</a>
            </div>
            <div style={styles.contactCard}>
              <div style={styles.contactIcon}><Icons.MessageCircle /></div>
              <h3 style={styles.contactTitle}>Live Chat</h3>
              <p style={styles.contactText}>Chat with us in real-time during business hours.</p>
              <a href="#" style={styles.contactLink}>Start Chat</a>
            </div>
          </div>
        </main>
    </>
  );
}


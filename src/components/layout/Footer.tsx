import { Link } from 'react-router-dom';

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
  Telegram: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
  Instagram: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: theme.colors.background,
        borderTop: `1px solid ${theme.colors.border}`,
        padding: '48px 24px',
        marginTop: 'auto',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center', fontSize: '24px', fontWeight: '700', textDecoration: 'none', color: theme.colors.text }}>
            <span style={{ color: theme.colors.primary }}>G</span>KEYS
          </Link>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
            <Link to="/catalog" style={{ color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>
              Catalog
            </Link>
            <Link to="/catalog?filter=new" style={{ color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>
              New
            </Link>
            <Link to="/media" style={{ color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>
              Media
            </Link>
            <Link to="/support" style={{ color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>
              Support
            </Link>
            <Link to="/blog" style={{ color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>
              Blog
            </Link>
          </nav>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://t.me/gkeys" target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.text }} aria-label="Telegram">
              <Icons.Telegram />
            </a>
            <a href="https://instagram.com/gkeys" target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.text }} aria-label="Instagram">
              <Icons.Instagram />
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', marginBottom: '24px' }}>
          <Link to="/terms" style={{ color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>
            User Agreement
          </Link>
          <Link to="/privacy" style={{ color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>
            Privacy Policy
          </Link>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '32px', borderTop: `1px solid ${theme.colors.border}` }}>
          <p style={{ color: theme.colors.textMuted, fontSize: '12px', lineHeight: '1.8' }}>
            © 2025 GKEYS. All rights reserved. Copying any materials from the site is prohibited!
            <br />
            All product and game names, company names and brands, logos, trademarks, and other materials are the property of their respective owners.
            <br />
            Only licensed keys for all gaming platforms: Steam, Uplay, Battle.net, Origin, and others.
            <br />
            All keys sold are purchased from official distributors and directly from publishers.
          </p>
        </div>
      </div>
    </footer>
  );
}

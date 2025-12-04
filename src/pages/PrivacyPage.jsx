// Privacy Policy Page - GKEYS Gaming Store
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  ArrowLeft: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  Shield: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
};

const responsiveCSS = `
  @media (max-width: 768px) {
    .legal-container { padding: 24px 16px !important; }
    .legal-title { font-size: 28px !important; }
  }
`;

export default function PrivacyPage() {
  const styles = {
    page: {
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
    },
    container: {
      maxWidth: '800px',
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
      textAlign: 'center',
      marginBottom: '48px',
    },
    icon: {
      width: '64px',
      height: '64px',
      backgroundColor: theme.colors.surface,
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      color: theme.colors.primary,
    },
    title: {
      fontSize: '42px',
      fontWeight: '700',
      marginBottom: '16px',
    },
    lastUpdated: {
      color: theme.colors.textMuted,
      fontSize: '14px',
    },
    content: {
      backgroundColor: theme.colors.surface,
      borderRadius: '16px',
      padding: '40px',
    },
    section: {
      marginBottom: '32px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '16px',
      color: theme.colors.primary,
    },
    paragraph: {
      fontSize: '15px',
      lineHeight: '1.8',
      color: theme.colors.textSecondary,
      marginBottom: '16px',
    },
    list: {
      paddingLeft: '24px',
      marginBottom: '16px',
    },
    listItem: {
      fontSize: '15px',
      lineHeight: '1.8',
      color: theme.colors.textSecondary,
      marginBottom: '8px',
    },
  };

  return (
    <>
      <style>{responsiveCSS}</style>
      <div style={styles.page}>
        <motion.div
          style={styles.container}
          className="legal-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/" style={styles.backButton}>
            <Icons.ArrowLeft />
            Back to Home
          </Link>

          <header style={styles.header}>
            <div style={styles.icon}>
              <Icons.Shield />
            </div>
            <h1 style={styles.title} className="legal-title">Privacy Policy</h1>
            <p style={styles.lastUpdated}>Last updated: January 1, 2025</p>
          </header>

          <div style={styles.content}>
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>1. Introduction</h2>
              <p style={styles.paragraph}>
                Welcome to GKEYS Store. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you visit our website 
                and use our services.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>2. Information We Collect</h2>
              <p style={styles.paragraph}>We collect information that you provide directly to us, including:</p>
              <ul style={styles.list}>
                <li style={styles.listItem}>Account information (email address, password, username)</li>
                <li style={styles.listItem}>Payment information (processed securely through our payment providers)</li>
                <li style={styles.listItem}>Purchase history and transaction records</li>
                <li style={styles.listItem}>Communication preferences</li>
                <li style={styles.listItem}>Support tickets and correspondence</li>
              </ul>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>3. How We Use Your Information</h2>
              <p style={styles.paragraph}>We use the information we collect to:</p>
              <ul style={styles.list}>
                <li style={styles.listItem}>Process your orders and deliver game keys</li>
                <li style={styles.listItem}>Send order confirmations and important updates</li>
                <li style={styles.listItem}>Provide customer support</li>
                <li style={styles.listItem}>Improve our services and user experience</li>
                <li style={styles.listItem}>Prevent fraud and ensure security</li>
                <li style={styles.listItem}>Send promotional communications (with your consent)</li>
              </ul>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>4. Data Security</h2>
              <p style={styles.paragraph}>
                We implement appropriate technical and organizational measures to protect your personal data against 
                unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted 
                using SSL technology.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>5. Data Retention</h2>
              <p style={styles.paragraph}>
                We retain your personal data for as long as necessary to fulfill the purposes for which it was collected, 
                including to satisfy legal, accounting, or reporting requirements.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>6. Your Rights</h2>
              <p style={styles.paragraph}>You have the right to:</p>
              <ul style={styles.list}>
                <li style={styles.listItem}>Access your personal data</li>
                <li style={styles.listItem}>Correct inaccurate data</li>
                <li style={styles.listItem}>Request deletion of your data</li>
                <li style={styles.listItem}>Object to data processing</li>
                <li style={styles.listItem}>Data portability</li>
                <li style={styles.listItem}>Withdraw consent at any time</li>
              </ul>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>7. Cookies</h2>
              <p style={styles.paragraph}>
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, 
                and personalize content. You can manage your cookie preferences through your browser settings.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>8. Third-Party Services</h2>
              <p style={styles.paragraph}>
                We may share your information with third-party service providers who assist us in operating our website, 
                processing payments, and delivering services. These providers are bound by confidentiality agreements.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>9. Contact Us</h2>
              <p style={styles.paragraph}>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p style={styles.paragraph}>
                Email: privacy@gkeys.store<br />
                Support: support@gkeys.store
              </p>
            </section>

            <section style={{ ...styles.section, marginBottom: 0 }}>
              <h2 style={styles.sectionTitle}>10. Changes to This Policy</h2>
              <p style={{ ...styles.paragraph, marginBottom: 0 }}>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
}


// Terms & Conditions Page - GKEYS Gaming Store
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  ArrowLeft: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  FileText: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
};

const responsiveCSS = `
  @media (max-width: 768px) {
    .legal-container { padding: 24px 16px !important; }
    .legal-title { font-size: 28px !important; }
  }
`;

export default function TermsPage() {
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
    highlight: {
      backgroundColor: theme.colors.surfaceLight,
      padding: '16px 20px',
      borderRadius: '8px',
      borderLeft: `4px solid ${theme.colors.primary}`,
      marginBottom: '16px',
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
              <Icons.FileText />
            </div>
            <h1 style={styles.title} className="legal-title">Terms & Conditions</h1>
            <p style={styles.lastUpdated}>Last updated: January 1, 2025</p>
          </header>

          <div style={styles.content}>
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>1. Agreement to Terms</h2>
              <p style={styles.paragraph}>
                By accessing and using GKEYS Store, you agree to be bound by these Terms and Conditions. 
                If you do not agree with any part of these terms, you may not use our services.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>2. Account Registration</h2>
              <p style={styles.paragraph}>To make purchases on GKEYS Store, you must:</p>
              <ul style={styles.list}>
                <li style={styles.listItem}>Be at least 18 years old or have parental consent</li>
                <li style={styles.listItem}>Provide accurate and complete registration information</li>
                <li style={styles.listItem}>Maintain the security of your account credentials</li>
                <li style={styles.listItem}>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>3. Products and Services</h2>
              <p style={styles.paragraph}>
                GKEYS Store sells digital game keys and activation codes. By purchasing from us:
              </p>
              <ul style={styles.list}>
                <li style={styles.listItem}>You acknowledge that all sales are for digital products</li>
                <li style={styles.listItem}>Game keys are delivered electronically to your account</li>
                <li style={styles.listItem}>Keys are subject to availability and may be region-locked</li>
                <li style={styles.listItem}>Product images and descriptions are for reference only</li>
              </ul>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>4. Pricing and Payment</h2>
              <p style={styles.paragraph}>
                All prices are displayed in EUR (€) unless otherwise specified. We accept various payment methods 
                including credit/debit cards and account balance.
              </p>
              <div style={styles.highlight}>
                <p style={{ ...styles.paragraph, marginBottom: 0 }}>
                  <strong>Important:</strong> All sales are final once a game key has been revealed or delivered. 
                  Please ensure you are purchasing the correct product before completing your order.
                </p>
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>5. Delivery of Products</h2>
              <p style={styles.paragraph}>
                Digital products are typically delivered instantly after payment confirmation. In rare cases, 
                delivery may take up to 24 hours. You can access your purchased keys in your account dashboard.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>6. Refund Policy</h2>
              <p style={styles.paragraph}>Due to the digital nature of our products:</p>
              <ul style={styles.list}>
                <li style={styles.listItem}>Refunds are generally not available once a key has been revealed</li>
                <li style={styles.listItem}>If you receive an invalid or already-used key, contact support immediately</li>
                <li style={styles.listItem}>Duplicate purchases may be eligible for refund within 24 hours</li>
                <li style={styles.listItem}>Account balance refunds are subject to review</li>
              </ul>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>7. Prohibited Activities</h2>
              <p style={styles.paragraph}>You agree not to:</p>
              <ul style={styles.list}>
                <li style={styles.listItem}>Use the service for any illegal purposes</li>
                <li style={styles.listItem}>Resell or redistribute purchased game keys</li>
                <li style={styles.listItem}>Attempt to circumvent security measures</li>
                <li style={styles.listItem}>Create multiple accounts to abuse promotions</li>
                <li style={styles.listItem}>Use automated tools to access the service</li>
                <li style={styles.listItem}>Engage in fraudulent payment activities</li>
              </ul>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>8. Intellectual Property</h2>
              <p style={styles.paragraph}>
                All content on GKEYS Store, including logos, designs, and text, is the property of GKEYS Store 
                or its licensors. Game keys are licensed products subject to the terms of the respective publishers.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>9. Limitation of Liability</h2>
              <p style={styles.paragraph}>
                GKEYS Store is not responsible for any issues arising from the activation or use of game keys on 
                third-party platforms. We are not liable for any indirect, incidental, or consequential damages.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>10. Account Termination</h2>
              <p style={styles.paragraph}>
                We reserve the right to suspend or terminate accounts that violate these terms, engage in 
                fraudulent activity, or abuse our services. Account balance may be forfeited in cases of 
                serious violations.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>11. Governing Law</h2>
              <p style={styles.paragraph}>
                These terms are governed by and construed in accordance with the laws of the European Union. 
                Any disputes shall be subject to the exclusive jurisdiction of the competent courts.
              </p>
            </section>

            <section style={{ ...styles.section, marginBottom: 0 }}>
              <h2 style={styles.sectionTitle}>12. Contact Information</h2>
              <p style={{ ...styles.paragraph, marginBottom: 0 }}>
                For questions about these Terms & Conditions, please contact us at:<br /><br />
                Email: legal@gkeys.store<br />
                Support: support@gkeys.store
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
}


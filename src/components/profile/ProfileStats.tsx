import React from 'react';
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

// Stats icons
const GamepadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <title>Gamepad</title>
    <rect x="4" y="10" width="24" height="14" rx="4" fill="#00C8C2" />
    <circle cx="10" cy="16" r="2" fill="#0D0D0D" />
    <circle cx="10" cy="16" r="1" fill="#00C8C2" />
    <rect x="18" y="14" width="2" height="4" rx="0.5" fill="#0D0D0D" />
    <rect x="20" y="15" width="2" height="2" rx="0.5" fill="#0D0D0D" />
    <rect x="16" y="15" width="2" height="2" rx="0.5" fill="#0D0D0D" />
    <rect x="7" y="15" width="2" height="1" fill="#0D0D0D" />
    <rect x="9.5" y="14" width="1" height="3" fill="#0D0D0D" />
  </svg>
);

const CoinIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <title>Coin</title>
    <circle cx="16" cy="16" r="12" fill="#00C8C2" />
    <circle cx="16" cy="16" r="9" stroke="#0D0D0D" strokeWidth="2" />
    <text x="16" y="20" textAnchor="middle" fill="#0D0D0D" fontSize="12" fontWeight="bold">€</text>
  </svg>
);

const RocketIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <title>Rocket</title>
    <path d="M16 4C16 4 22 8 22 18L18 22H14L10 18C10 8 16 4 16 4Z" fill="#FFD93D" />
    <circle cx="16" cy="14" r="2" fill="#0D0D0D" />
    <path d="M10 18L6 20L8 24L12 22" fill="#FF6B6B" />
    <path d="M22 18L26 20L24 24L20 22" fill="#FF6B6B" />
    <path d="M14 22H18V28L16 30L14 28V22Z" fill="#FF6B6B" />
  </svg>
);

interface ProfileStatsProps {
  gamesPurchased: number;
  totalSaved: number;
  daysSinceRegistration: number;
  loading?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  gamesPurchased,
  totalSaved,
  daysSinceRegistration,
  loading = false,
}) => {
  const statsData = [
    {
      icon: <GamepadIcon />,
      value: loading ? '...' : gamesPurchased.toString(),
      label: 'Games',
    },
    {
      icon: <CoinIcon />,
      value: loading ? '...' : `€${totalSaved.toFixed(2)}`,
      label: 'Saved',
    },
    {
      icon: <RocketIcon />,
      value: loading ? '...' : `${daysSinceRegistration} Days`,
      label: 'With us',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '48px',
        flexWrap: 'wrap',
      }}
    >
      {statsData.map((stat) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            minWidth: '100px',
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {stat.icon}
          </div>
          {/* Value */}
          <span
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: theme.colors.text,
            }}
          >
            {stat.value}
          </span>
          {/* Label */}
          <span
            style={{
              fontSize: '14px',
              color: theme.colors.textSecondary,
            }}
          >
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

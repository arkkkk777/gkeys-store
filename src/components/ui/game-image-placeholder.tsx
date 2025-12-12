import React from 'react';

interface GameImagePlaceholderProps {
  width?: string | number;
  height?: string | number;
  text?: string;
}

export function GameImagePlaceholder({ 
  width = '100%', 
  height = '100%',
  text = 'Game'
}: GameImagePlaceholderProps) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#1A1A1A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666666',
        fontSize: '14px',
        fontWeight: '500',
        border: '1px solid #333333',
        borderRadius: '8px',
      }}
    >
      {text}
    </div>
  );
}

import React from 'react';
import { Skeleton } from './skeleton';

export function GameCardSkeleton() {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#1A1A1A',
        aspectRatio: '3/4',
      }}
    >
      <Skeleton
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)',
        }}
      >
        <Skeleton style={{ width: '60%', height: '20px', marginBottom: '8px' }} />
        <Skeleton style={{ width: '40%', height: '16px' }} />
      </div>
    </div>
  );
}

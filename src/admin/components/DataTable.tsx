import React from 'react';

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

interface Column<T> {
  key: keyof T | string;
  label: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

function DataTable<T extends { id: string }>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data found',
  onRowClick,
}: DataTableProps<T>) {
  const styles = {
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: '12px',
      overflow: 'hidden',
      border: `1px solid ${theme.colors.border}`,
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
    },
    th: {
      padding: '16px',
      textAlign: 'left' as const,
      fontSize: '12px',
      fontWeight: '600',
      color: theme.colors.textMuted,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      backgroundColor: theme.colors.surfaceLight,
      borderBottom: `1px solid ${theme.colors.border}`,
    },
    td: {
      padding: '16px',
      fontSize: '14px',
      color: theme.colors.text,
      borderBottom: `1px solid ${theme.colors.border}`,
    },
    row: (clickable: boolean) => ({
      cursor: clickable ? 'pointer' : 'default',
      transition: 'background-color 0.2s ease',
    }),
    loading: {
      textAlign: 'center' as const,
      padding: '48px',
      color: theme.colors.textSecondary,
    },
    empty: {
      textAlign: 'center' as const,
      padding: '48px',
      color: theme.colors.textMuted,
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.empty}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} style={{ ...styles.th, width: col.width }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              style={styles.row(!!onRowClick)}
              onClick={() => onRowClick?.(row)}
              onMouseEnter={(e) => {
                if (onRowClick) {
                  e.currentTarget.style.backgroundColor = theme.colors.surfaceLight;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {columns.map((col) => (
                <td key={col.key as string} style={styles.td}>
                  {col.render
                    ? col.render(row)
                    : String(row[col.key as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;


import React from 'react';
import './LocalizedTable.scss';

interface Column {
  key: string;
  header: string;
}

interface LocalizedTableProps {
  columns: Column[];
  data: Record<string, any>[];
  emptyMessage?: string;
}

const LocalizedTable: React.FC<LocalizedTableProps> = ({
  columns,
  data,
  emptyMessage = 'No data available'
}) => {
  return (
    <div className="localized-table-wrapper">
      <table className="localized-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key} data-label={col.header}>
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LocalizedTable;

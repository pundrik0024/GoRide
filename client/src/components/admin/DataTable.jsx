import React from 'react';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';

export default function DataTable({ columns, data, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="bg-white border border-[#E6E6E1] rounded-xl p-6 space-y-4">
        {[...Array(5)].map((_, i) => <Skeleton key={i} height="h-12" />)}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState icon="table_chart" title="No data available" description="There are no records to display here." />;
  }

  return (
    <div className="bg-white border border-[#E6E6E1] rounded-xl overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#F7F7F5] border-b border-[#E6E6E1]">
            {columns.map((col, i) => (
              <th key={i} className="px-6 py-4 text-xs font-bold text-[#6B6B67] uppercase tracking-wider">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-4 text-xs font-bold text-[#6B6B67] uppercase tracking-wider text-right">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E6E6E1]">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-[#F7F7F5] transition-colors">
              {columns.map((col, j) => (
                <td key={j} className="px-6 py-4 text-sm text-[#171717]">
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {onEdit && (
                      <button onClick={() => onEdit(row)} className="w-8 h-8 rounded border border-[#E6E6E1] flex items-center justify-center text-[#6B6B67] hover:text-[#171717] hover:border-[#171717] transition-colors">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(row)} className="w-8 h-8 rounded border border-[#E6E6E1] flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

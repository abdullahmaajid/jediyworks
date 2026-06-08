import React from "react";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
}

interface DataTableProps<T> {
  title: string;
  description?: string;
  columns: Column<T>[];
  data: T[];
  createLink?: string;
  createLabel?: string;
  onDelete?: (id: string) => void;
  editLinkPrefix?: string;
  getId: (row: T) => string;
}

export function DataTable<T>({
  title,
  description,
  columns,
  data,
  createLink,
  createLabel = "Create New",
  onDelete,
  editLinkPrefix,
  getId,
}: DataTableProps<T>) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-serif text-[var(--near-black)]">{title}</h2>
          {description && (
            <p className="text-sm text-[rgba(13,13,13,0.5)] mt-1">{description}</p>
          )}
        </div>
        {createLink && (
          <Link
            href={createLink}
            className="inline-flex items-center gap-2 bg-[var(--near-black)] text-white px-4 py-2 font-sans text-xs uppercase tracking-wider hover:bg-[var(--crimson)] transition-colors"
          >
            <Plus size={16} />
            {createLabel}
          </Link>
        )}
      </div>

      {/* Table Container */}
      <div className="bg-white border border-[var(--warm-gray)] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--warm-gray)] bg-[#F8F6F3]">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-6 py-4 text-xs uppercase tracking-wider text-[rgba(13,13,13,0.5)] font-medium"
                >
                  {col.header}
                </th>
              ))}
              {(editLinkPrefix || onDelete) && (
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-[rgba(13,13,13,0.5)] font-medium text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--warm-gray)] text-[14px]">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (editLinkPrefix || onDelete ? 1 : 0)}
                  className="px-6 py-12 text-center text-[rgba(13,13,13,0.4)] font-serif italic"
                >
                  No data available.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={getId(row)}
                  className="hover:bg-[#F8F6F3] transition-colors group"
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 text-[var(--near-black)] whitespace-nowrap">
                      {typeof col.accessor === "function"
                        ? col.accessor(row)
                        : (row[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                  {(editLinkPrefix || onDelete) && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {editLinkPrefix && (
                          <Link
                            href={`${editLinkPrefix}/${getId(row)}/edit`}
                            className="text-[rgba(13,13,13,0.4)] hover:text-[var(--crimson)] transition-colors"
                          >
                            <Edit size={16} />
                          </Link>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this item?")) {
                                onDelete(getId(row));
                              }
                            }}
                            className="text-[rgba(13,13,13,0.4)] hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

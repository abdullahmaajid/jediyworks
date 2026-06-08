"use client";

import { useEffect, useState } from "react";
import { DataTable, Column } from "../../../components/admin/DataTable";

export default function NetworkAdminPage() {
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollaborators();
  }, []);

  const fetchCollaborators = async () => {
    try {
      const res = await fetch("/api/admin/collaborators");
      const data = await res.json();
      setCollaborators(data);
    } catch (error) {
      console.error("Failed to fetch collaborators:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/collaborators/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCollaborators(collaborators.filter((c: any) => c.id !== id));
      } else {
        alert("Failed to delete collaborator. You might not have permission.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns: Column<any>[] = [
    { header: "Name / Branding", accessor: (row) => (
      <div className="flex flex-col">
        <span className="font-serif text-[var(--near-black)]">{row.brandingName || row.fullName}</span>
        <span className="text-xs text-[rgba(13,13,13,0.5)]">{row.fullName} (@{row.slug})</span>
      </div>
    )},
    { header: "Role", accessor: "defaultRole" },
    { header: "Location", accessor: "location" },
    { header: "Visible", accessor: (row) => row.profileVisible ? "Yes" : "No" },
  ];

  if (loading) {
    return <div className="p-8 text-[var(--near-black)]">Loading The Circle...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <DataTable
        title="The Circle (Network)"
        description="Manage the profiles of your creative collaborators."
        columns={columns}
        data={collaborators}
        createLink="/admin/network/create"
        editLinkPrefix="/admin/network"
        onDelete={handleDelete}
        getId={(row) => row.id}
      />
    </div>
  );
}
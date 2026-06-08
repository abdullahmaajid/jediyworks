"use client";

import { useEffect, useState } from "react";
import { DataTable, Column } from "../../../components/admin/DataTable";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects(projects.filter((p: any) => p.id !== id));
      } else {
        alert("Failed to delete project. You might not have permission.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns: Column<any>[] = [
    { header: "Title", accessor: "title" },
    { header: "Category", accessor: "category" },
    { header: "Year", accessor: "year" },
    { header: "Status", accessor: (row) => (
      <span className={`px-2 py-1 text-xs ${row.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
        {row.status}
      </span>
    ) },
    { header: "Featured", accessor: (row) => row.featured ? "Yes" : "No" },
  ];

  if (loading) {
    return <div className="p-8 text-[var(--near-black)]">Loading projects...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <DataTable
        title="Projects Management"
        description="Manage the portfolio pieces visible to the public."
        columns={columns}
        data={projects}
        createLink="/admin/projects/create"
        editLinkPrefix="/admin/projects"
        onDelete={handleDelete}
        getId={(row) => row.id}
      />
    </div>
  );
}

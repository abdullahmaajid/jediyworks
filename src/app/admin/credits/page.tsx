import { prisma } from "../../../libs/prisma";
import { deleteCreditLink, createCreditLink } from "../../actions/admin";

export default async function AdminCreditsPage() {
  const [credits, projects, collaborators] = await Promise.all([
    prisma.creditLink.findMany({
      include: {
        project: true,
        collaborator: true,
      },
      orderBy: { project: { createdAt: "desc" } },
    }),
    prisma.project.findMany({ orderBy: { title: "asc" } }),
    prisma.collaborator.findMany({ orderBy: { brandingName: "asc" } }),
  ]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-3xl text-[var(--near-black)]">Credit Links</h1>
      </div>

      {/* Add New Credit Form */}
      <div className="bg-white p-6 rounded border border-[var(--warm-gray)] flex flex-col gap-4">
        <h2 className="font-sans text-[14px] font-medium text-[var(--near-black)]">Add New Credit</h2>
        <form action={createCreditLink} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col gap-1 md:col-span-1">
            <label className="text-[11px] uppercase tracking-wider text-gray-500">Project</label>
            <select name="projectId" required className="border border-gray-300 p-2 text-sm rounded">
              <option value="">Select Project...</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1 md:col-span-1">
            <label className="text-[11px] uppercase tracking-wider text-gray-500">Collaborator</label>
            <select name="collaboratorId" required className="border border-gray-300 p-2 text-sm rounded">
              <option value="">Select Collaborator...</option>
              {collaborators.map(c => <option key={c.id} value={c.id}>{c.brandingName}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1 md:col-span-1">
            <label className="text-[11px] uppercase tracking-wider text-gray-500">Role in Project</label>
            <input type="text" name="roleInProject" required placeholder="e.g. Lead Designer" className="border border-gray-300 p-2 text-sm rounded" />
          </div>
          <div className="md:col-span-1">
            <button type="submit" className="w-full bg-[var(--crimson)] text-[var(--bone)] p-2 text-sm rounded">Link</button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded border border-[var(--warm-gray)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8F6F3] border-b border-[var(--warm-gray)]">
              <th className="px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-[#6B6762]">Project</th>
              <th className="px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-[#6B6762]">Collaborator</th>
              <th className="px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-[#6B6762]">Role</th>
              <th className="px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-[#6B6762]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {credits.map((credit) => (
              <tr key={credit.id} className="border-b border-[var(--warm-gray)] last:border-0 hover:bg-[#F8F6F3]">
                <td className="px-6 py-4 font-sans text-[14px] font-medium text-[var(--near-black)]">
                  {credit.project.title}
                </td>
                <td className="px-6 py-4 font-sans text-[14px] text-[var(--near-black)]">
                  {credit.collaborator.brandingName}
                </td>
                <td className="px-6 py-4 font-sans text-[13px] text-[#6B6762]">
                  {credit.roleInProject}
                </td>
                <td className="px-6 py-4">
                  <form action={async () => {
                    "use server";
                    await deleteCreditLink(credit.id);
                  }}>
                    <button type="submit" className="text-red-600 text-[13px] hover:underline">Unlink</button>
                  </form>
                </td>
              </tr>
            ))}
            {credits.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500 italic">No credits linked yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  let projectCount = 0;
  let collabCount = 0;
  let inboxCount = 0;

  try {
    if (session?.user.role === "admin") {
      projectCount = await prisma.project.count();
      collabCount = await prisma.collaborator.count();
      try {
        inboxCount = await prisma.inbox.count({ where: { status: "new" } });
      } catch {
        inboxCount = 0;
      }
    } else if (session?.user.role === "collaborator" && session.user.collaboratorId) {
      projectCount = await prisma.creditLink.count({
        where: { collaboratorId: session.user.collaboratorId }
      });
    }
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[32px] md:text-[40px] text-[var(--near-black)] leading-tight">
          Welcome back, <span className="text-[var(--crimson)]">{session?.user.name}</span>.
        </h1>
        <p className="font-sans text-[15px] text-[rgba(13,13,13,0.5)]">
          {session?.user.role === "admin" 
            ? "Here is the overview of the JEDIYWORKS ecosystem."
            : "Here is your personal protocol overview."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white border border-[var(--warm-gray)] p-6 flex flex-col gap-4">
          <h3 className="font-sans text-[12px] uppercase tracking-[0.1em] text-[rgba(13,13,13,0.5)]">
            {session?.user.role === "admin" ? "Total Projects" : "Your Projects"}
          </h3>
          <p className="font-serif text-[48px] text-[var(--near-black)] leading-none">
            {projectCount}
          </p>
        </div>

        {session?.user.role === "admin" && (
          <>
            <div className="bg-white border border-[var(--warm-gray)] p-6 flex flex-col gap-4">
              <h3 className="font-sans text-[12px] uppercase tracking-[0.1em] text-[rgba(13,13,13,0.5)]">
                The Circle Members
              </h3>
              <p className="font-serif text-[48px] text-[var(--near-black)] leading-none">
                {collabCount}
              </p>
            </div>

            <div className="bg-white border border-[var(--crimson)] p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--crimson)] opacity-5 rounded-full blur-3xl" />
              <h3 className="font-sans text-[12px] uppercase tracking-[0.1em] text-[var(--crimson)]">
                New Inquiries
              </h3>
              <p className="font-serif text-[48px] text-[var(--near-black)] leading-none relative z-10">
                {inboxCount}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

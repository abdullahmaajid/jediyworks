"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  FolderGit2, 
  Users, 
  Inbox, 
  LogOut,
  ShieldAlert,
  Menu,
  X
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[var(--bone)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--crimson)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const isAdmin = session.user.role === "admin";

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
    { name: "The Circle", href: "/admin/network", icon: Users },
    ...(isAdmin ? [{ name: "Users & Access", href: "/admin/users", icon: ShieldAlert }] : []),
    ...(isAdmin ? [{ name: "Inbox", href: "/admin/inbox", icon: Inbox }] : []),
  ];

  return (
    <div className="min-h-screen bg-[var(--bone)] text-[var(--near-black)] font-sans flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[var(--warm-gray)]">
        <Link href="/" className="font-serif text-[20px] tracking-tight text-[var(--near-black)]">
          JEDIYWORKS
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-[var(--near-black)]">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full z-50 w-64 bg-white border-r border-[var(--warm-gray)] flex flex-col transition-transform duration-300
        md:relative md:translate-x-0 md:z-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-6 border-b border-[var(--warm-gray)]">
          <Link href="/" className="font-serif text-[24px] tracking-tight text-[var(--near-black)] hover:text-[var(--crimson)] transition-colors">
            JEDIYWORKS
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--crimson)]" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-[rgba(13,13,13,0.4)]">
              {isAdmin ? "Admin Protocol" : "Collab Protocol"}
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-[13px] uppercase tracking-[0.1em] transition-all rounded-sm ${
                  isActive 
                    ? "bg-[var(--near-black)] text-white font-medium" 
                    : "text-[rgba(13,13,13,0.6)] hover:bg-[rgba(13,13,13,0.05)] hover:text-[var(--near-black)]"
                }`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.5 : 1.5} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--warm-gray)]">
          <div className="px-4 mb-4">
            <p className="text-[12px] text-[var(--near-black)] font-medium truncate">
              {session.user.name}
            </p>
            <p className="text-[10px] uppercase tracking-[0.1em] text-[rgba(13,13,13,0.4)] mt-1">
              {isAdmin ? "Administrator" : "Collaborator"}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-3 px-4 py-3 text-[13px] uppercase tracking-[0.1em] text-[var(--crimson)] hover:bg-[rgba(82,1,0,0.05)] transition-all rounded-sm"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

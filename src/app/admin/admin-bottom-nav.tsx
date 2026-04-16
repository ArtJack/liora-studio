"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ExternalLink, LogOut } from "lucide-react";
import { logoutAction } from "./login/actions";

const tabs = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
];

export function AdminBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/70 bg-surface/90 backdrop-blur-xl lg:hidden">
      <div className="flex items-stretch">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-1 flex-col items-center gap-1 py-3 text-[10px] uppercase tracking-[0.14em] transition-colors ${
                isActive ? "text-accent" : "text-muted"
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </Link>
          );
        })}
        <Link
          href="/"
          className="flex flex-1 flex-col items-center gap-1 py-3 text-[10px] uppercase tracking-[0.14em] text-muted transition-colors"
        >
          <ExternalLink size={20} />
          Store
        </Link>
        <form action={logoutAction} className="flex flex-1">
          <button
            type="submit"
            className="flex flex-1 flex-col items-center gap-1 py-3 text-[10px] uppercase tracking-[0.14em] text-muted transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </form>
      </div>
    </nav>
  );
}

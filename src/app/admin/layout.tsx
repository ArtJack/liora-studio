import Link from "next/link";
import { LayoutDashboard, Package, Tags, MessageSquare } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden min-h-screen w-64 border-r border-border/70 bg-surface/70 p-6 backdrop-blur-xl lg:block">
          <Link href="/admin" className="block mb-10">
            <h2 className="text-sm tracking-[0.2em] uppercase text-muted">LIORA STUDIO</h2>
            <p className="text-xs text-muted/60 mt-1">Admin Panel</p>
          </Link>
          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
            >
              <Package size={16} />
              Products
            </Link>
            <Link
              href="/admin/offers"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
            >
              <MessageSquare size={16} />
              Offers
            </Link>
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors mt-8"
            >
              <Tags size={16} />
              View Store
            </Link>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}

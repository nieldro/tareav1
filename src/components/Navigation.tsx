import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, ArrowUpDown, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Inicio", icon: Home },
  { path: "/aprende", label: "Aprende", icon: BookOpen },
  { path: "/ordenar", label: "Ordenar", icon: ArrowUpDown },
  { path: "/complejidad", label: "Complejidad", icon: BarChart3 },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display font-bold text-xl gradient-text">
          HeapSort
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

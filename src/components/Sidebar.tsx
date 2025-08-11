import { 
  BarChart3, 
  Target, 
  Users, 
  TrendingUp, 
  Settings, 
  ShoppingCart,
  Brain,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";

export const navigation = [
  { name: "Dashboard", icon: BarChart3, href: "/", current: false },
  { name: "Produtos", icon: ShoppingCart, href: "/products", current: false },
  { name: "Estratégias", icon: Target, href: "/strategy", current: false },
  { name: "Concorrentes", icon: Users, href: "/competitors", current: false },
  { name: "IA Insights", icon: Brain, href: "/insights", current: false },
  { name: "Automações", icon: Zap, href: "/automations", current: false },
  { name: "Performance", icon: TrendingUp, href: "/performance", current: false },
  { name: "Integrações", icon: Zap, href: "/integrations", current: false },
  { name: "Configurações", icon: Settings, href: "/settings", current: false },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-card border-r border-border">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-6 mb-8">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                StrategiML
              </h1>
              <p className="text-xs text-muted-foreground">SaaS Estratégico</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  isActive
                    ? "bg-primary/10 text-primary border-r-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                    "mr-3 h-5 w-5 transition-colors"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

      </div>
    </div>
  );
};
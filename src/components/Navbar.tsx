import { Users, Camera, Shield, LayoutDashboard, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Camera, label: "Cameras" },
    { icon: Shield, label: "Scenes" },
    { icon: AlertTriangle, label: "Incidents" },
    { icon: Users, label: "Users" },
  ];

  return (
    <nav className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SECURESIGHT</span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant={item.active ? "default" : "ghost"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">Mohammed Alhas</div>
            <div className="text-xs text-muted-foreground">alhas@securesight.com</div>
          </div>
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
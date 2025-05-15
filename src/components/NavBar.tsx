
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import MobileMenu from "./ui/navbar/MobileMenu";
import Logo, { AlternativeLogo } from "./Logo";

const NavBar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path ? "text-solar-green-700 font-medium" : "";
    }
    return location.pathname.startsWith(path) ? "text-solar-green-700 font-medium" : "";
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "#solutions" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "About", href: "#about" }
  ];

  const ctaButton = { text: "Get Started", href: "/register" };
  const loginButton = { text: "Log In", href: "/login" };

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-base hover:text-solar-green-600 transition-colors ${isActive(link.href)}`}
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="outline">
              <Link to={loginButton.href}>{loginButton.text}</Link>
            </Button>
            <Button asChild className="bg-solar-green-600 hover:bg-solar-green-700">
              <Link to={ctaButton.href}>{ctaButton.text}</Link>
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <MobileMenu links={links} ctaButton={ctaButton} loginButton={loginButton} />
        </div>
      </div>
    </header>
  );
};

export default NavBar;

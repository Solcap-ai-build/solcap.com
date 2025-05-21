
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import MobileMenu from "./ui/navbar/MobileMenu";
import Logo from "./Logo";
import { useEffect } from "react";

const NavBar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path ? "text-solar-green-700 font-medium" : "";
    }
    return location.pathname.startsWith(path) ? "text-solar-green-700 font-medium" : "";
  };

  // Handle anchor link scrolling
  useEffect(() => {
    // Check if there's a hash in the URL when component mounts or location changes
    if (location.hash) {
      const id = location.hash.substring(1); // remove the # character
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // Handle click on same-page anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // Only handle if we're on the home page
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/#solutions", id: "solutions" },
    { name: "How It Works", href: "/#how-it-works", id: "how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/#about", id: "about" }
  ];

  const ctaButton = { text: "Get Started", href: "/register" };
  const loginButton = { text: "Log In", href: "/login" };

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo size={location.pathname === "/" ? "default" : "small"} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-base hover:text-solar-green-600 transition-colors ${location.hash === link.href ? "text-solar-green-700 font-medium" : ""}`}
                  onClick={(e) => handleAnchorClick(e, link.id || '')}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-base hover:text-solar-green-600 transition-colors ${isActive(link.href)}`}
                >
                  {link.name}
                </Link>
              )
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

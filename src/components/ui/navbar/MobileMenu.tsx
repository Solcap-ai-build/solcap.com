
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  links: Array<{
    name: string;
    href: string;
  }>;
  ctaButton: {
    text: string;
    href: string;
  };
  loginButton?: {
    text: string;
    href: string;
  };
}

const MobileMenu = ({ links, ctaButton, loginButton }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-lg font-medium text-gray-700 hover:text-solar-green-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          {loginButton && (
            <Button asChild variant="outline" className="w-full mt-2">
              <Link to={loginButton.href}>{loginButton.text}</Link>
            </Button>
          )}
          
          <Button asChild className="w-full mt-2 bg-solar-green-600 hover:bg-solar-green-700">
            <Link to={ctaButton.href}>{ctaButton.text}</Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

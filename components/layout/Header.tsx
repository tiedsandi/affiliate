import Link from 'next/link';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="font-bold text-xl">
              Deal<span className="text-primary">Finder</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link 
              href="/products" 
              className="transition-colors hover:text-primary"
            >
              Produk
            </Link>
            <Link 
              href="/categories" 
              className="transition-colors hover:text-primary"
            >
              Kategori
            </Link>
            <Link 
              href="/compare" 
              className="transition-colors hover:text-primary"
            >
              Bandingkan
            </Link>
            <Link 
              href="/blog" 
              className="transition-colors hover:text-primary"
            >
              Blog
            </Link>
          </nav>

          {/* Search & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="hidden md:flex"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

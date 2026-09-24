'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Menu,
  Search,
  Sparkles,
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/schemes', label: 'Browse Schemes', icon: BookOpen },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/chat', label: 'Scheme Assistant', icon: MessageSquare, badge: 'NEW' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-sm tracking-tight">SchemeSeva</span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">Scheme Finder</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon, badge }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
                {badge && (
                  <Badge className="h-4 text-[10px] px-1 bg-blue-500 text-white hover:bg-blue-500">
                    {badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/schemes" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
                <Search className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button size="sm" className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white btn-glow rounded-xl gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Get Started
              </Button>
            </Link>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden rounded-full w-9 h-9">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-0">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-bold text-sm">SchemeSeva</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-4 flex flex-col gap-1">
                  {navLinks.map(({ href, label, icon: Icon, badge }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                        pathname === href
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                      {badge && (
                        <Badge className="h-4 text-[10px] px-1 bg-blue-500 text-white hover:bg-blue-500 ml-auto">
                          {badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-border mt-2">
                    <Link href="/onboarding" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2">
                        <Sparkles className="w-4 h-4" />
                        Get Started Free
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

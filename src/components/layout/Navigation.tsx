import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Brain, ChevronDown, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useContact } from '@/hooks/useContact';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { scheduleConsultation } = useContact();

  useEffect(() => {
    // Get initial user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleBookDemo = async () => {
    const result = await scheduleConsultation('free_demo');
    if (result.requiresAuth) {
      window.location.href = '/auth';
    }
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'FAQ', href: '/faq' },
  ];

  const isActiveRoute = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <Brain className="h-8 w-8 text-accent animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary font-heading">PromptlyCoach</span>
              <span className="text-xs text-muted-foreground -mt-1">AI Training Experts</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group",
                  isActiveRoute(item.href)
                    ? "text-accent bg-accent/10"
                    : "text-foreground hover:text-accent hover:bg-accent/5"
                )}
              >
                {item.name}
                {isActiveRoute(item.href) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-accent rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.user_metadata?.full_name || user.email}
                </span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button variant="hero" size="sm" onClick={handleBookDemo}>
                  Book Demo
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActiveRoute(item.href)
                      ? "text-accent bg-accent/10"
                      : "text-foreground hover:text-accent hover:bg-accent/5"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 px-4 pt-4 border-t border-border">
                {user ? (
                  <>
                    <div className="text-sm text-muted-foreground px-4">
                      Welcome, {user.user_metadata?.full_name || user.email}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => { handleSignOut(); setIsOpen(false); }}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/auth" onClick={() => setIsOpen(false)}>Sign In</Link>
                    </Button>
                    <Button variant="hero" size="sm" onClick={() => { handleBookDemo(); setIsOpen(false); }}>
                      Book Demo
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
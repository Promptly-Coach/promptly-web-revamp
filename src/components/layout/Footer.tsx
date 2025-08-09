import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'AI Prompt Training', href: '/services' },
        { name: 'Business Consultation', href: '/services' },
        { name: 'Team Workshops', href: '/services' },
        { name: 'Custom Solutions', href: '/services' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Testimonials', href: '/testimonials' },
        { name: 'Case Studies', href: '/testimonials' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'FAQ', href: '/faq' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Blog', href: '#' },
        { name: 'Documentation', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'Data Protection', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="h-8 w-8 text-accent" />
              <div>
                <h3 className="text-xl font-bold font-heading">PromptlyCoach</h3>
                <p className="text-sm text-primary-foreground/70">AI Training Experts</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Empowering small businesses with personalized AI prompting guidance. 
              We train your prompts to behave and deliver exceptional results.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="border-primary-foreground/20 hover:bg-primary-foreground/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-primary-foreground/20 hover:bg-primary-foreground/10">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-primary-foreground/20 hover:bg-primary-foreground/10">
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold font-heading mb-4 text-accent">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-primary-foreground/20 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-accent flex-shrink-0" />
              <div>
                <p className="text-sm text-primary-foreground/70">Email us</p>
                <a href="mailto:info@promptlycoach.com" className="text-accent hover:text-accent-glow transition-colors">
                  info@promptlycoach.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-accent flex-shrink-0" />
              <div>
                <p className="text-sm text-primary-foreground/70">Call us</p>
                <a href="tel:+1234567890" className="text-accent hover:text-accent-glow transition-colors">
                  +1 (234) 567-8900
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-accent flex-shrink-0" />
              <div>
                <p className="text-sm text-primary-foreground/70">Visit us</p>
                <p className="text-primary-foreground/90">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} PromptlyCoach. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
            <span>Built with ❤️ for AI success</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, CheckCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

const HeroSection = () => {
  
  const features = [
    "Personalized AI guidance",
    "Proven business results", 
    "Expert-led training"
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 pt-20 pb-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent">
              <Sparkles className="h-4 w-4" />
              #1 AI Prompting Experts for Small Business
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                We Train Your 
                <span className="text-gradient"> AI Prompts</span> to Behave!
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Unlock the full potential of AI for your small business with personalized prompting guidance that delivers real results.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="hero" size="xl" asChild className="group">
                <Link to="/contact#consultation-form">
                  Book Your Free Demo Today
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="group">
                <Link to="/how-it-works">
                  <Play className="h-5 w-5" />
                  See How It Works
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">Trusted by 500+ small businesses</p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2.5x</div>
                  <div className="text-xs text-muted-foreground">ROI Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-xs text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="AI Coaching Excellence" 
                className="w-full h-auto animate-float"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-accent rounded-2xl shadow-glow animate-pulse opacity-80"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-hero rounded-full shadow-elegant animate-float opacity-60" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
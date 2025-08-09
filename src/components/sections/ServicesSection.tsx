import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Users, 
  Zap, 
  Target, 
  TrendingUp, 
  Shield,
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import servicesImage from '@/assets/services-image.jpg';

const ServicesSection = () => {
  const services = [
    {
      icon: Brain,
      title: "AI Prompt Engineering",
      description: "Master the art of crafting effective AI prompts that deliver consistent, high-quality results for your business needs.",
      features: ["Custom prompt templates", "Industry-specific guidance", "Performance optimization"],
    },
    {
      icon: Users,
      title: "Team Training Workshops",
      description: "Comprehensive training programs to get your entire team proficient with AI tools and prompting strategies.",
      features: ["Hands-on workshops", "Real-world exercises", "Ongoing support"],
    },
    {
      icon: Target,
      title: "Business Consultation",
      description: "Strategic AI implementation consulting to identify opportunities and develop customized solutions for your business.",
      features: ["AI strategy development", "ROI analysis", "Implementation roadmap"],
    },
    {
      icon: Zap,
      title: "Automation Solutions",
      description: "Streamline your workflows with AI-powered automation that saves time and increases productivity.",
      features: ["Process automation", "Workflow optimization", "Integration support"],
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Track and measure the impact of your AI implementations with detailed analytics and reporting.",
      features: ["Success metrics", "ROI tracking", "Performance insights"],
    },
    {
      icon: Shield,
      title: "Ongoing Support",
      description: "Continuous support and optimization to ensure your AI solutions continue to deliver maximum value.",
      features: ["24/7 assistance", "Regular check-ins", "Strategy updates"],
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
            Comprehensive AI Training <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            From prompt engineering to team training, we provide everything your business needs to succeed with AI.
          </p>
        </div>

        {/* Services Image */}
        <div className="mb-16">
          <div className="relative max-w-4xl mx-auto">
            <img 
              src={servicesImage} 
              alt="Professional AI Coaching Services" 
              className="w-full h-auto rounded-2xl shadow-elegant"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.title} className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-accent/30 bg-gradient-card">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <IconComponent className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl font-heading group-hover:text-accent transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-card rounded-2xl p-8 shadow-elegant">
          <h3 className="text-2xl font-bold font-heading mb-4">
            Ready to Transform Your Business with AI?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's discuss how our AI training services can be customized for your specific business needs and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild className="group">
              <Link to="/contact">
                Get Started Today
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
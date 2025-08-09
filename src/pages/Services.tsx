import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Users, 
  Zap, 
  Target, 
  TrendingUp, 
  Shield,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const mainServices = [
    {
      icon: Brain,
      title: "AI Prompt Engineering",
      description: "Master the art of crafting effective AI prompts that deliver consistent, high-quality results.",
      duration: "2-4 weeks",
      price: "Starting at $2,500",
      features: [
        "Custom prompt template library",
        "Industry-specific optimization",
        "Performance testing & refinement",
        "Documentation & best practices",
        "Ongoing optimization support"
      ],
      popular: false
    },
    {
      icon: Users,
      title: "Team Training Program",
      description: "Comprehensive training to get your entire team proficient with AI tools and strategies.",
      duration: "4-6 weeks",
      price: "Starting at $4,000",
      features: [
        "Interactive workshops & sessions",
        "Hands-on practical exercises",
        "Team collaboration frameworks",
        "Progress tracking & assessment",
        "Certificate of completion",
        "3 months follow-up support"
      ],
      popular: true
    },
    {
      icon: Target,
      title: "Business AI Strategy",
      description: "Strategic consultation to identify AI opportunities and develop implementation roadmaps.",
      duration: "1-2 weeks",
      price: "Starting at $1,500",
      features: [
        "Comprehensive AI audit",
        "ROI analysis & projections",
        "Implementation roadmap",
        "Technology recommendations",
        "Risk assessment & mitigation"
      ],
      popular: false
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "Streamline your business processes with intelligent AI-powered automation solutions.",
      duration: "3-5 weeks",
      price: "Starting at $3,500",
      features: [
        "Process mapping & analysis",
        "Custom automation design",
        "Integration with existing tools",
        "Testing & quality assurance",
        "Staff training & documentation"
      ],
      popular: false
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Track, measure, and optimize your AI implementations with detailed analytics.",
      duration: "Ongoing",
      price: "Starting at $800/month",
      features: [
        "Custom dashboard development",
        "KPI tracking & reporting",
        "Performance optimization",
        "Monthly strategy reviews",
        "Quarterly business reports"
      ],
      popular: false
    },
    {
      icon: Shield,
      title: "Enterprise Support",
      description: "Comprehensive ongoing support for large-scale AI implementations.",
      duration: "12 months",
      price: "Custom pricing",
      features: [
        "Dedicated account manager",
        "24/7 technical support",
        "Priority response times",
        "Quarterly strategy sessions",
        "Unlimited consultations",
        "Custom feature development"
      ],
      popular: false
    }
  ];

  const addOnServices = [
    {
      title: "Emergency Consultation",
      description: "Urgent AI problem-solving sessions",
      price: "$200/hour"
    },
    {
      title: "Custom Integration",
      description: "Specialized tool integrations",
      price: "Starting at $1,000"
    },
    {
      title: "Advanced Analytics",
      description: "Deep-dive performance analysis",
      price: "Starting at $500"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Our <span className="text-gradient">AI Training Services</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Comprehensive AI solutions designed to transform your business operations 
              and unlock unprecedented growth opportunities.
            </p>
            <Button variant="hero" size="lg" asChild className="group">
              <Link to="/contact">
                Get Custom Quote
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Complete AI Training Solutions
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From strategy to implementation, we provide end-to-end AI services 
              tailored to your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={service.title} 
                  className={`relative group hover:shadow-elegant transition-all duration-300 ${
                    service.popular 
                      ? 'border-accent shadow-glow bg-gradient-card' 
                      : 'border-border/50 hover:border-accent/30 bg-gradient-card'
                  }`}
                >
                  {service.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl font-heading group-hover:text-accent transition-colors">
                      {service.title}
                    </CardTitle>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Pricing & Duration */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{service.price}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button 
                      variant={service.popular ? "hero" : "outline"} 
                      className="w-full mt-6" 
                      asChild
                    >
                      <Link to="/contact">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-on Services */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Additional <span className="text-gradient">Support Services</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Enhance your AI journey with our specialized add-on services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {addOnServices.map((addon) => (
              <Card key={addon.title} className="hover:shadow-elegant transition-shadow bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-lg font-heading">{addon.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{addon.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-accent">{addon.price}</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/contact">Add On</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-card rounded-2xl p-12 shadow-elegant">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Not Sure Which Service Is Right for You?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Let's discuss your specific needs and create a customized solution that delivers maximum value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild className="group">
                <Link to="/contact">
                  Schedule Free Consultation
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/pricing">View Pricing Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
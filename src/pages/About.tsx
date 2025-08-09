import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Target, 
  Award, 
  Heart, 
  CheckCircle,
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Client-Centric Approach",
      description: "We put your business goals at the center of everything we do, ensuring personalized solutions that deliver real value."
    },
    {
      icon: Award,
      title: "Proven Expertise",
      description: "Our team of AI specialists brings years of experience in prompt engineering and business automation."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "We focus on measurable outcomes that directly impact your bottom line and business growth."
    },
    {
      icon: Users,
      title: "Collaborative Partnership",
      description: "We work closely with your team to ensure smooth implementation and knowledge transfer."
    }
  ];

  const stats = [
    { label: "Businesses Transformed", value: "500+" },
    { label: "AI Projects Completed", value: "1,200+" },
    { label: "Average ROI Increase", value: "250%" },
    { label: "Client Satisfaction", value: "98%" }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & Lead AI Strategist",
      bio: "Former Google AI researcher with 8+ years in machine learning and business automation."
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior Prompt Engineer",
      bio: "Expert in large language models with a track record of optimizing AI workflows for Fortune 500 companies."
    },
    {
      name: "Emily Watson",
      role: "Business Development Lead",
      bio: "Specializes in translating AI capabilities into practical business solutions for small and medium enterprises."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              About <span className="text-gradient">PromptlyCoach</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              We're passionate about empowering small businesses to harness the full potential of AI through 
              expert prompting guidance and personalized training solutions.
            </p>
            <Button variant="hero" size="lg" asChild className="group">
              <Link to="/contact">
                Work With Us
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Our Mission & Values
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We believe every small business deserves access to cutting-edge AI technology. 
              Our mission is to democratize AI through education, guidance, and hands-on support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={value.title} className="border-border/50 hover:border-accent/30 transition-colors bg-gradient-card">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl font-heading">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Meet Our <span className="text-gradient">Expert Team</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our diverse team of AI specialists, business strategists, and technology experts 
              is dedicated to your success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="text-center hover:shadow-elegant transition-shadow bg-gradient-card">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-heading">{member.name}</CardTitle>
                  <p className="text-accent font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join hundreds of successful businesses that have transformed their operations with our AI guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild className="group">
                <Link to="/contact">
                  Book Your Free Consultation
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
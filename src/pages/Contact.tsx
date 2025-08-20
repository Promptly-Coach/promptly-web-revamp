import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  Calendar,
  Users,
  Zap
} from 'lucide-react';
import { useContact } from '@/hooks/useContact';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    companySize: '',
    serviceInterest: '',
    budgetRange: '',
    projectTimeline: '',
    message: '',
  });

  const { submitContact, isSubmitting } = useContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submitContact(formData);
    
    if (result.success) {
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        companySize: '',
        serviceInterest: '',
        budgetRange: '',
        projectTimeline: '',
        message: '',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const benefits = [
    {
      icon: CheckCircle,
      title: "Free Consultation",
      description: "No cost, no obligation discussion about your AI needs"
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Book a time that works best for your schedule"
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Direct access to our AI specialists and strategists"
    },
    {
      icon: Zap,
      title: "Quick Response",
      description: "We respond to all inquiries within 4 business hours"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Let's <span className="text-gradient">Transform Your Business</span> Together
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Ready to unlock the power of AI for your business? Get in touch with our experts 
              for a personalized consultation and strategy session.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2" id="consultation-form">
              <Card className="border-border/50 shadow-elegant bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Get Your Free Consultation</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 4 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Smith"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Business Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company Inc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Business Details */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companySize">Company Size</Label>
                        <Select value={formData.companySize} onValueChange={(value) => setFormData({...formData, companySize: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select team size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-5">1-5 employees</SelectItem>
                            <SelectItem value="6-20">6-20 employees</SelectItem>
                            <SelectItem value="21-50">21-50 employees</SelectItem>
                            <SelectItem value="51-100">51-100 employees</SelectItem>
                            <SelectItem value="100+">100+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="serviceInterest">Primary Interest</Label>
                        <Select value={formData.serviceInterest} onValueChange={(value) => setFormData({...formData, serviceInterest: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prompt-engineering">AI Prompt Engineering</SelectItem>
                            <SelectItem value="team-training">Team Training Program</SelectItem>
                            <SelectItem value="strategy">Business AI Strategy</SelectItem>
                            <SelectItem value="automation">Workflow Automation</SelectItem>
                            <SelectItem value="analytics">Performance Analytics</SelectItem>
                            <SelectItem value="support">Enterprise Support</SelectItem>
                            <SelectItem value="not-sure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Budget & Timeline */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="budgetRange">Budget Range</Label>
                        <Select value={formData.budgetRange} onValueChange={(value) => setFormData({...formData, budgetRange: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-5k">Under $5,000</SelectItem>
                            <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                            <SelectItem value="15k-30k">$15,000 - $30,000</SelectItem>
                            <SelectItem value="30k-50k">$30,000 - $50,000</SelectItem>
                            <SelectItem value="50k+">$50,000+</SelectItem>
                            <SelectItem value="discuss">Let's discuss</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="projectTimeline">Timeline</Label>
                        <Select value={formData.projectTimeline} onValueChange={(value) => setFormData({...formData, projectTimeline: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="When do you want to start?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">ASAP</SelectItem>
                            <SelectItem value="1-month">Within 1 month</SelectItem>
                            <SelectItem value="2-3-months">2-3 months</SelectItem>
                            <SelectItem value="6-months">Within 6 months</SelectItem>
                            <SelectItem value="exploring">Just exploring</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Tell us about your goals</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your current challenges and what you hope to achieve with AI..."
                        className="min-h-[120px]"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" variant="hero" size="lg" className="w-full group" disabled={isSubmitting}>
                      <Send className="h-5 w-5 mr-2" />
                      {isSubmitting ? 'Sending...' : 'Send Message & Book Consultation'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Benefits */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card className="border-border/50 bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-xl font-heading">Get In Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:info@promptlycoach.com" className="text-muted-foreground hover:text-accent transition-colors">
                        info@promptlycoach.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+1234567890" className="text-muted-foreground hover:text-accent transition-colors">
                        +1 (234) 567-8900
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">San Francisco, CA</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-muted-foreground">
                        Mon-Fri: 9AM-6PM PST<br />
                        Sat: 10AM-2PM PST
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="border-border/50 bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-xl font-heading">Why Choose Us?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {benefits.map((benefit) => {
                      const IconComponent = benefit.icon;
                      return (
                        <div key={benefit.title} className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="h-4 w-4 text-accent" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{benefit.title}</p>
                            <p className="text-muted-foreground text-sm">{benefit.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
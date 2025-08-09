import React from 'react';
import Layout from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqs = [
    {
      question: "What exactly is AI prompt engineering?",
      answer: "AI prompt engineering is the practice of crafting specific instructions and queries to get optimal results from AI systems like ChatGPT, Claude, or other language models. It involves understanding how to communicate effectively with AI to achieve consistent, high-quality outputs for your business needs."
    },
    {
      question: "How long does it take to see results from AI implementation?",
      answer: "Most businesses start seeing improvements within 2-3 weeks of implementing our strategies. Significant productivity gains and ROI improvements typically become evident within 1-2 months. The timeline depends on your current AI familiarity and the complexity of your business processes."
    },
    {
      question: "Do I need technical expertise to benefit from your services?",
      answer: "Not at all! Our services are designed for business owners and teams with any level of technical background. We provide comprehensive training and support to ensure everyone on your team can effectively use AI tools, regardless of their technical expertise."
    },
    {
      question: "What types of businesses do you work with?",
      answer: "We specialize in small to medium-sized businesses across various industries including consulting, e-commerce, marketing agencies, professional services, healthcare practices, and more. Our approach is tailored to each business's unique needs and industry requirements."
    },
    {
      question: "How much can I expect to save with AI automation?",
      answer: "Our clients typically see 30-50% time savings on routine tasks and an average ROI of 250% within the first year. Specific savings depend on your current processes and the level of automation implemented. We provide detailed ROI projections during our initial consultation."
    },
    {
      question: "What if I'm already using AI tools but not getting good results?",
      answer: "This is exactly what we specialize in! Many businesses start using AI tools but struggle with inconsistent results. Our prompt engineering expertise helps you get reliable, high-quality outputs every time. We'll audit your current AI usage and optimize it for better performance."
    },
    {
      question: "Do you provide ongoing support after the initial training?",
      answer: "Yes! All our programs include follow-up support ranging from 30 days to 12 months depending on the service package. We also offer ongoing monthly support plans to ensure your AI implementations continue to evolve with your business needs."
    },
    {
      question: "Can you integrate AI with our existing business tools?",
      answer: "Absolutely! We have experience integrating AI solutions with popular business tools like CRM systems, project management platforms, email marketing tools, and more. We'll work with your existing tech stack to create seamless AI-powered workflows."
    },
    {
      question: "What's included in your free consultation?",
      answer: "Our free consultation includes an AI readiness assessment, identification of automation opportunities, discussion of your business goals, a preliminary ROI estimate, and a customized service recommendation. It's a no-pressure conversation focused on understanding how AI can benefit your specific situation."
    },
    {
      question: "How do you ensure data security and privacy?",
      answer: "We take data security seriously and follow industry best practices. We can work with your existing security protocols, recommend secure AI tools, and provide guidance on maintaining data privacy while leveraging AI capabilities. All our processes are designed with privacy-first principles."
    },
    {
      question: "What's the difference between your services and just using ChatGPT myself?",
      answer: "While ChatGPT is a powerful tool, knowing how to use it effectively for business requires expertise. We provide structured frameworks, proven prompting strategies, custom templates, and business-specific optimizations that ensure consistent results. Plus, we help you integrate multiple AI tools into comprehensive workflows."
    },
    {
      question: "Do you offer training for teams of different sizes?",
      answer: "Yes! We customize our training programs for teams of any size, from solo entrepreneurs to departments of 50+ people. Our training scales to accommodate different learning styles, technical backgrounds, and scheduling requirements within your organization."
    }
  ];

  const categories = [
    {
      title: "Getting Started",
      items: faqs.slice(0, 4)
    },
    {
      title: "Results & ROI",
      items: faqs.slice(4, 8)
    },
    {
      title: "Support & Security",
      items: faqs.slice(8, 12)
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent mb-6">
              <HelpCircle className="h-4 w-4" />
              Frequently Asked Questions
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Got Questions? <span className="text-gradient">We Have Answers</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Find answers to common questions about our AI training services, implementation process, 
              and what you can expect when working with PromptlyCoach.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="mb-12">
                <h2 className="text-2xl font-bold font-heading mb-8 text-center">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.items.map((faq, index) => (
                    <AccordionItem 
                      key={`${categoryIndex}-${index}`} 
                      value={`item-${categoryIndex}-${index}`}
                      className="border border-border/50 rounded-lg px-6 hover:border-accent/30 transition-colors bg-gradient-card"
                    >
                      <AccordionTrigger className="text-left hover:text-accent transition-colors py-6">
                        <span className="font-semibold">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
              Still Have Questions?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center hover:shadow-elegant transition-shadow bg-gradient-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg font-heading">Live Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Get instant answers to your questions through our live chat support.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-elegant transition-shadow bg-gradient-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg font-heading">Phone Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Speak directly with our AI experts for personalized guidance.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="tel:+1234567890">Call Us</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-elegant transition-shadow bg-gradient-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg font-heading">Email Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Send us detailed questions and get comprehensive responses.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="mailto:support@promptlycoach.com">Email Us</a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Final CTA */}
            <div className="text-center bg-gradient-card rounded-2xl p-8 shadow-elegant">
              <h3 className="text-2xl font-bold font-heading mb-4">
                Ready to Transform Your Business with AI?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Book a free consultation to discuss your specific needs and discover 
                how our AI training can benefit your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild className="group">
                  <Link to="/contact">
                    Book Free Consultation
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/services">View Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
    </Layout>
  );
};

export default Index;

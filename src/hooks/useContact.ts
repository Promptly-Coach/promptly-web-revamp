import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  companySize: string;
  serviceInterest: string;
  budgetRange: string;
  projectTimeline: string;
  message: string;
}

export const useContact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitContact = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('contacts')
        .insert({
          user_id: user?.id || null,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          company_size: formData.companySize,
          service_interest: formData.serviceInterest,
          budget_range: formData.budgetRange,
          project_timeline: formData.projectTimeline,
          message: formData.message,
        });

      if (error) throw error;

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your interest. We'll get back to you within 24 hours.",
      });

      return { success: true };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  const scheduleConsultation = async (consultationType: 'free_demo' | 'strategy_session' = 'free_demo') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please create an account to schedule a consultation.",
          variant: "destructive",
        });
        return { success: false, requiresAuth: true };
      }

      const { error } = await supabase
        .from('consultations')
        .insert({
          user_id: user.id,
          consultation_type: consultationType,
          status: 'requested',
        });

      if (error) throw error;

      toast({
        title: "Consultation Requested!",
        description: "We'll contact you within 24 hours to schedule your consultation.",
      });

      return { success: true };
    } catch (error) {
      console.error('Error scheduling consultation:', error);
      toast({
        title: "Error",
        description: "There was an error scheduling your consultation. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  return {
    submitContact,
    scheduleConsultation,
    isSubmitting,
  };
};
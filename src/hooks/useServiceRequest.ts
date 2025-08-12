import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface ServiceRequestData {
  serviceType: string;
  customRequirements?: string;
  estimatedBudget?: number;
  timelineRequirement?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export const useServiceRequest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitServiceRequest = async (requestData: ServiceRequestData, contactId?: string) => {
    setIsSubmitting(true);
    
    try {
      // If no contactId provided, we need to create a contact first or get current user contact
      let finalContactId = contactId;
      
      if (!finalContactId) {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Try to find existing contact for this user
          const { data: existingContact } = await supabase
            .from('contacts')
            .select('id')
            .eq('user_id', user.id)
            .single();
            
          if (existingContact) {
            finalContactId = existingContact.id;
          } else {
            // Create a basic contact record
            const { data: newContact, error: contactError } = await supabase
              .from('contacts')
              .insert({
                user_id: user.id,
                full_name: user.user_metadata?.full_name || 'Unknown',
                email: user.email || '',
              })
              .select('id')
              .single();
              
            if (contactError) throw contactError;
            finalContactId = newContact.id;
          }
        }
      }

      if (!finalContactId) {
        throw new Error('Contact information required');
      }

      const { error } = await supabase
        .from('service_requests')
        .insert({
          contact_id: finalContactId,
          service_type: requestData.serviceType,
          custom_requirements: requestData.customRequirements,
          estimated_budget: requestData.estimatedBudget,
          timeline_requirement: requestData.timelineRequirement,
          priority: requestData.priority || 'medium',
        });

      if (error) throw error;

      toast({
        title: "Service Request Submitted!",
        description: "We'll review your request and get back to you with a custom quote.",
      });

      return { success: true };
    } catch (error) {
      console.error('Error submitting service request:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitServiceRequest,
    isSubmitting,
  };
};
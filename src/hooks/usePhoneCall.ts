import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const usePhoneCall = () => {
  const [isInitiating, setIsInitiating] = useState(false);
  const { toast } = useToast();

  const initiateCall = async (phoneNumber: string) => {
    setIsInitiating(true);
    
    try {
      // Log the call attempt
      const { error } = await supabase
        .from('phone_calls')
        .insert({
          phone_number: phoneNumber,
          call_type: 'outbound',
          status: 'initiated',
        });

      if (error) throw error;

      // For now, just open the phone dialer
      const cleanNumber = phoneNumber.replace(/\D/g, '');
      window.location.href = `tel:${cleanNumber}`;
      
      toast({
        title: "Call Initiated",
        description: "Opening your phone dialer...",
      });

      return { success: true };
    } catch (error) {
      console.error('Error initiating call:', error);
      toast({
        title: "Error",
        description: "There was an error initiating the call. Please try dialing manually.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setIsInitiating(false);
    }
  };

  return {
    initiateCall,
    isInitiating,
  };
};
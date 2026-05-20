import { supabase } from "@/shared/api/supabase";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (password: string) => {
      const { data, error } = await supabase.auth.updateUser({
        password: password
      });
      if (error) throw error;
      return data;
    }
  });
};
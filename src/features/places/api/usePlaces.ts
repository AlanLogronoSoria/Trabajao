import { supabase } from "@/shared/api/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 1. Obtener los datos (READ)
export const useGetPlaces = () => {
  return useQuery({
    queryKey: ['places'],
    queryFn: async () => {
      const { data, error } = await supabase.from('places').select('*');
      if (error) throw error;
      return data;
    },
  });
};

// 2. Crear datos (CREATE)
export const useCreatePlace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('places')
        .insert({ name, user_id: user?.id });
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['places'] }),
  });
};

// 3. Borrar datos (DELETE)
export const useDeletePlace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('places').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['places'] }),
  });
};


// 4.- Actualizar datos (UPDATE) 

// En src/features/places/api/usePlaces.ts
export const useUpdatePlace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const { error } = await supabase.from('places').update({ name }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['places'] }),
  });
};
// src/pages/home/ui/HomeScreen.tsx
import { useCreatePlace, useDeletePlace, useGetPlaces, useUpdatePlace } from '@/features/places/api/usePlaces';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Button, Input, ScrollView, Spinner, Text, XStack, YStack } from 'tamagui';

// Añadimos onBack como prop
export default function HomeScreen({ onBack }: { onBack?: () => void }) {
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const { data: places, isLoading } = useGetPlaces();
  const create = useCreatePlace();
  const remove = useDeletePlace();
  const update = useUpdatePlace();

  const handleSave = async () => {
    if (!name) return;
    try {
      await create.mutateAsync(name);
      setName('');
    } catch (e: any) { Alert.alert("Error", e.message); }
  };

  const saveEdit = async (id: string) => {
    await update.mutateAsync({ id, name: editName });
    setEditingId(null);
  };

  return (
    <ScrollView padding="$4">
      <YStack gap="$4">
        {/* Botón para volver a la pantalla anterior (Bienvenida) */}
        <Button theme="gray" onPress={onBack}>← Volver</Button>
        
        <Input placeholder="Nuevo lugar..." value={name} onChangeText={setName} />
        <Button onPress={handleSave} disabled={create.isPending}>
          {create.isPending ? <Spinner /> : "Guardar Lugar"}
        </Button>

        {/* Navegación al perfil corregida */}
        <Button 
            onPress={() => {
                if (onBack) onBack(); // Limpiamos el estado del CRUD primero
                router.push('../profile');
            }} 
            theme="blue"
        >
            Ir a mi Perfil
        </Button>

        {isLoading ? <Spinner size="large" /> : (
          places?.map((item: any) => (
            <YStack key={item.id} padding="$3" borderWidth={1} borderColor="$gray5" borderRadius="$4">
              {editingId === item.id ? (
                <YStack gap="$2">
                  <Input value={editName} onChangeText={setEditName} />
                  <XStack gap="$2">
                    <Button flex={1} theme="green" onPress={() => saveEdit(item.id)}>Guardar</Button>
                    <Button flex={1} theme="gray" onPress={() => setEditingId(null)}>Cancelar</Button>
                  </XStack>
                </YStack>
              ) : (
                <XStack justifyContent="space-between" alignItems="center">
                  <Text>{item.name}</Text>
                  <XStack gap="$2">
                    <Button theme="blue" onPress={() => { setEditingId(item.id); setEditName(item.name); }}>Editar</Button>
                    <Button theme="red" onPress={() => remove.mutate(item.id)}>X</Button>
                  </XStack>
                </XStack>
              )}
            </YStack>
          ))
        )}
      </YStack>
    </ScrollView>
  );
}
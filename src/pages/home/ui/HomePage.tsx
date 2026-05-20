import { theme } from "@/core/styles/theme";
import { useSession } from "@/features/session/model/useSession";
import HomeScreen from "@/pages/home/ui/HomeScreen";
import { Button } from "@/shared/ui/Button";
import { PlaceCard } from "@/shared/ui/PlaceCard";
import { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

// Definimos la estructura del objeto para evitar errores de TypeScript
interface Place {
  id: string;
  name: string;
  desc: string;
}

export const HomePage = () => {
  const { user, signOut } = useSession();
  const [showCrud, setShowCrud] = useState(false);

  // 💡 PERSISTENCIA: El estado vive aquí en el padre. No se destruye al alternar pantallas.
  const [places, setPlaces] = useState<Place[]>([
    { id: "1", name: "Laboratorios de Software", desc: "Bloque C, nivel 2." },
    { id: "2", name: "Biblioteca Central", desc: "Zona de estudio y consulta." },
    { id: "3", name: "Cafetería ESFOT", desc: "Área de recreación." },
  ]);

  // Si showCrud es true, inyectamos la lista y su modificador mediante Props
  if (showCrud) {
    return (
      <HomeScreen 
        places={places} 
        setPlaces={setPlaces} 
        onBack={() => setShowCrud(false)} 
      />
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Cabecera */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Bienvenido de nuevo</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      {/* Lista de Lugares Dinámica */}
      <FlatList
        data={places}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Espacios del Campus</Text>}
        renderItem={({ item }) => (
          <PlaceCard 
            title={item.name} 
            description={item.desc} 
            onPress={() => {}} 
          />
        )}
      />

      {/* Panel de acciones fijo abajo */}
      <View style={styles.footerContainer}>
        <Button 
          label="Gestionar Lugares (CRUD)" 
          onPress={() => setShowCrud(true)} 
        />
        <View style={{ height: 12 }} />
        <Button 
          label="Cerrar sesión" 
          variant="ghost" 
          onPress={signOut} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.bg },
  header: { 
    padding: theme.spacing.lg, 
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border
  },
  greeting: { fontSize: 14, color: theme.colors.textMuted },
  userEmail: { fontSize: 18, fontWeight: "800", color: theme.colors.primary },
  list: { padding: theme.spacing.lg },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: theme.colors.text, 
    marginBottom: theme.spacing.md 
  },
  footerContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: 20,
  }
});
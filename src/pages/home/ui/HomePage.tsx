import { theme } from "@/core/styles/theme";
import { useSession } from "@/features/session/model/useSession";
import HomeScreen from "@/pages/home/ui/HomeScreen";
import { Button } from "@/shared/ui/Button";
import { PlaceCard } from "@/shared/ui/PlaceCard";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

interface Place {
  id: string;
  name: string;
  desc: string;
}

export const HomePage = () => {
  const { user, signOut } = useSession();
  const [showCrud, setShowCrud] = useState(false);

  // 💡 PERSISTENCIA: El estado vive aquí en el padre.
  const [places, setPlaces] = useState<Place[]>([
    { id: "1", name: "Laboratorios de Software", desc: "Bloque C, nivel 2." },
    { id: "2", name: "Biblioteca Central", desc: "Zona de estudio y consulta." },
    { id: "3", name: "Cafetería ESFOT", desc: "Área de recreación." },
  ]);

  if (showCrud) {
    return (
      <HomeScreen 
        places={places} 
        setPlaces={setPlaces} 
        onBack={() => setShowCrud(false)} 
      />
    );
  }

  // Componente extra: Tarjetas de estadísticas
  const QuickStats = () => (
    <View style={styles.statsSection}>
      <Text style={styles.sectionTitle}>Resumen Rápido</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsScroll}>
        
        {/* Tarjeta 1: Ubicaciones */}
        <View style={styles.glassCard}>
          <Text style={styles.statLabel}>TOTAL EDIFICIOS</Text>
          <View style={styles.statValueContainer}>
            <Text style={styles.statValue}>31</Text>
            <Text style={styles.statSubText}>+2 proximamente ...</Text>
          </View>
        </View>

        {/* Tarjeta 2: Aulas */}
        <View style={styles.glassCard}>
          <Text style={styles.statLabel}>AULAS EN USO</Text>
          <View style={styles.statValueContainer}>
            <Text style={styles.statValue}>78%</Text>
            <Text style={[styles.statSubText, { color: '#00eefc' }]}>Óptimo</Text>
          </View>
        </View>

        {/* Tarjeta 3: Alertas */}
     
      </ScrollView>
    </View>
  );

  // Componente extra: Timeline de actividad reciente
  const RecentActivity = () => (
    <View style={styles.activitySection}>
      
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      
      {/* Top Bar inspirada en el Dashboard Universitario */}
      <View style={styles.topAppBar}>
        <Text style={styles.appTitle}>Academic Management</Text>
      </View>

      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.greeting}>Bienvenido de nuevo</Text>
              <Text style={styles.userEmail}>{user?.email || "usuario@universidad.edu"}</Text>
            </View>
            
            <QuickStats />
            
            <Text style={[styles.sectionTitle, { paddingHorizontal: theme.spacing.lg, marginTop: 10 }]}>
              Ubicaciones Frecuentes
            </Text>
          </>
        }
        
        renderItem={({ item }) => (
          <View style={styles.placeWrapper}>
            <PlaceCard 
              title={item.name} 
              description={item.desc} 
              onPress={() => {}} 
            />
          </View>
        )}

        ListFooterComponent={<RecentActivity />}
      />

      {/* 🛠️ Panel de acciones optimizado visualmente abajo */}
      <View style={styles.footerContainer}>
        
        {/* Fila del Botón Primario Destacado */}
        <View style={styles.primaryActionRow}>
          <Button 
            label="Gestionar Lugares (CRUD)" 
            variant="primary" // Se añade variante primaria para el enfoque del sistema
            onPress={() => setShowCrud(true)} 
          />
        </View>
        
        {/* Fila de Botones Secundarios en Paralelo */}
        <View style={styles.secondaryActionRow}>
          <View style={styles.splitButtonWrapper}>
            <Button 
              label="Mi Perfil" 
              variant="primary"
              onPress={() => router.push("/profile")} 
            />
          </View>
          
          <View style={styles.splitButtonWrapper}>
            <Button 
              label="Cerrar sesión" 
              variant="ghost" 
              onPress={signOut} 
            />
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Estructura Base
  safe: { 
    flex: 1, 
    backgroundColor: '#032f3a' // Unificado al fondo oscuro premium del ecosistema
  },
  topAppBar: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 16,
    backgroundColor: 'rgba(29, 32, 34, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b6c4ff', 
  },
  header: { 
    paddingHorizontal: theme.spacing.lg, 
    paddingVertical: 24,
  },
  greeting: { 
    fontSize: 14, 
    color: '#c3c5d9' 
  },
  userEmail: { 
    fontSize: 24, 
    fontWeight: "800", 
    color: '#e0e3e5' 
  },
  
  // Listas
  listContent: { 
    paddingBottom: 180 // Incrementado para asegurar que las tarjetas suban limpiamente detrás del footer flotante
  },
  placeWrapper: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: 12,
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: '#0099ff',
    marginBottom: theme.spacing.md 
  },

  // Componentes Inyectados (Dashboard Design)
  statsSection: {
    marginBottom: 24,
    paddingLeft: theme.spacing.lg,
  },
  statsScroll: {
    paddingRight: theme.spacing.lg,
    gap: 16,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 12,
    padding: 16,
    width: 160,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'space-between',
    minHeight: 110,
    marginRight: 16,
  },
  glassCardLarge: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderTopWidth: 4,
    borderTopColor: '#0055ff',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#c3c5d9',
    letterSpacing: 1,
  },
  statValueContainer: {
    marginTop: 12,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#e0e3e5',
  },
  statSubText: {
    fontSize: 12,
    color: '#00eefc',
    marginTop: 4,
  },

  // Timeline
  activitySection: {
    padding: theme.spacing.lg,
    marginTop: 10,
  },
  timelineItem: {
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: '#323537',
    position: 'relative',
    marginBottom: 20,
  },
  timelineDot: {
    position: 'absolute',
    left: -5,
    top: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  timeText: {
    fontSize: 12,
    color: '#c3c5d9',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e0e3e5',
  },
  activityDesc: {
    fontSize: 14,
    color: '#8d90a2',
    marginTop: 4,
  },

  // 🛠️ Estilos del Footer Renovados (Coherencia Completa)
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.lg,
    backgroundColor: '#032f3a', // En consonancia exacta con el TopAppBar
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 32, // Espaciado extra ergonómico para terminales sin marcos inferiores
  },
  primaryActionRow: {
    width: '100%',
    marginBottom: 12,
  },
  secondaryActionRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  splitButtonWrapper: {
    flex: 1,
    marginHorizontal: 4, // Genera un canal de separación limpio entre los botones inferiores
  }
});
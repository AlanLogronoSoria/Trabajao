import { theme } from "@/core/styles/theme";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ManagePlaceCard } from "./components/ManagePlaceCard";

interface Place {
  id: string;
  name: string;
  desc: string;
}

// Tipamos las propiedades que entran desde HomePage
interface HomeScreenProps {
  places: Place[];
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
  onBack: () => void;
}

export default function HomeScreen({ places, setPlaces, onBack }: HomeScreenProps) {
  // --- ESTADOS LOCALES DE INTERFAZ (No rompen los datos al salir) ---
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = (place?: Place) => {
    if (place) {
      setEditingId(place.id);
      setFormName(place.name);
      setFormDesc(place.desc);
    } else {
      setEditingId(null);
      setFormName("");
      setFormDesc("");
    }
    setModalVisible(true);
  };

  // 💡 CREATE / UPDATE: Afecta directamente al estado persistido en el padre
  const handleSave = async () => {
    if (!formName.trim() || !formDesc.trim()) {
      return Alert.alert("Campos requeridos", "Por favor llena todos los campos.");
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        setPlaces(places.map(p => 
          p.id === editingId ? { ...p, name: formName, desc: formDesc } : p
        ));
      } else {
        const newPlace = { id: Date.now().toString(), name: formName, desc: formDesc };
        setPlaces([newPlace, ...places]);
      }
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "No se pudo procesar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 💡 DELETE: Remueve el elemento del estado del padre
  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmar Eliminación", 
      "¿Estás seguro de que deseas eliminar este lugar del sistema?", 
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive",
          onPress: () => {
            setPlaces(places.filter(p => p.id !== id));
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Gestión de Lugares</Text>
          <Text style={styles.headerSub}>{places.length} espacios activos</Text>
        </View>
      </View>

      {/* Lista Principal */}
      {places.length === 0 ? (
        <View style={styles.centerBox}>
          <Text style={styles.emptyText}>No hay lugares registrados aún.</Text>
        </View>
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ManagePlaceCard 
              title={item.name} 
              desc={item.desc} 
              onEdit={() => openModal(item)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      )}

      {/* Botón Flotante */}
      <TouchableOpacity style={styles.fab} onPress={() => openModal()}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Modal Reutilizable */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {editingId ? "Editar Lugar" : "Nuevo Lugar"}
            </Text>
            
            <View style={{ gap: 16, marginBottom: 24 }}>
              <Input 
                label="Nombre del lugar" 
                value={formName} 
                onChangeText={setFormName} 
                placeholder="Ej: Laboratorio 4" 
              />
              <Input 
                label="Ubicación / Descripción" 
                value={formDesc} 
                onChangeText={setFormDesc} 
                placeholder="Ej: Bloque B, Primer Piso" 
              />
            </View>

            <View style={styles.modalActions}>
              <Button 
                label="Cancelar" 
                variant="ghost" 
                onPress={() => setModalVisible(false)} 
                disabled={isSubmitting}
              />
              <View style={{ width: 12 }} />
              <Button 
                label={isSubmitting ? "Guardando..." : "Guardar"} 
                onPress={handleSave} 
                disabled={isSubmitting}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  centerBox: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: theme.colors.textMuted, fontSize: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    gap: 16,
    ...theme.shadow.card,
  },
  backBtn: {
    padding: 10,
    backgroundColor: theme.colors.bg,
    borderRadius: theme.radius.sm,
  },
  headerTitle: { fontSize: 22, fontWeight: "800", color: theme.colors.text },
  headerSub: { fontSize: 13, color: theme.colors.textMuted },
  listContent: { padding: theme.spacing.lg, paddingBottom: 100 },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: theme.colors.primary,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    ...theme.shadow.card,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: 20,
  },
  modalActions: { flexDirection: "row", justifyContent: "flex-end" },
});
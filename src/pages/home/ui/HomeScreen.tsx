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

// Interfaz de datos
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
    <SafeAreaView style={styles.safe}>
      {/* Header Premium (Glassmorphism) */}
      <View style={styles.topAppBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color="#b6c4ff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.appTitle}>Gestión de Lugares</Text>
          <Text style={styles.appSubTitle}>{places.length} espacios activos</Text>
        </View>
      </View>

      {/* Lista Principal */}
      {places.length === 0 ? (
        <View style={styles.centerBox}>
          <Ionicons name="folder-open-outline" size={48} color="#323537" style={{ marginBottom: 16 }} />
          <Text style={styles.emptyText}>No hay lugares registrados aún.</Text>
        </View>
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            /* Componente de tarjeta integrado visualmente para asegurar el modo oscuro */
            <View style={styles.glassCard}>
              <View style={styles.iconContainer}>
                <Ionicons name="business-outline" size={20} color="#b6c4ff" />
              </View>
              
              <View style={styles.infoContainer}>
                <Text style={styles.placeName}>{item.name}</Text>
                <Text style={styles.placeDesc} numberOfLines={1}>{item.desc}</Text>
              </View>

              <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => openModal(item)}>
                  <Ionicons name="pencil" size={16} color="#00eefc" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                  <Ionicons name="trash-outline" size={16} color="#ffb4ab" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Botón Flotante Modernizado */}
      <TouchableOpacity style={styles.fab} onPress={() => openModal()}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modal Reutilizable Adaptado al Tema Oscuro */}
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
  // Estructura Base
  safe: { 
    flex: 1, 
    backgroundColor: '#101415' // Fondo ultra oscuro
  },
  centerBox: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  emptyText: { 
    color: '#8d90a2', 
    fontSize: 16 
  },
  
  // Header
  topAppBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(29, 32, 34, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  backButton: {
    marginRight: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e0e3e5', 
  },
  appSubTitle: {
    fontSize: 13,
    color: '#c3c5d9',
    marginTop: 2,
  },
  
  // Lista y Tarjetas Glassmorphism
  listContent: { 
    padding: 24, 
    paddingBottom: 100 
  },
  glassCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e0e3e5',
  },
  placeDesc: {
    fontSize: 13,
    color: '#8d90a2',
    marginTop: 4,
  },
  
  // Botones dentro de la tarjeta
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 238, 252, 0.1)', // Tono cyan
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 238, 252, 0.2)',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 180, 171, 0.1)', // Tono rojo
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 180, 171, 0.2)',
  },

  // Botón Flotante (FAB)
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0055ff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00F0FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabText: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: '300',
    marginTop: -2,
  },

  // Modal Adaptado al Ecosistema
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)", // Oscurecido para mejor contraste
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: 'rgba(29, 32, 34, 0.98)', // Adaptado a modo oscuro
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: '#e0e3e5',
    marginBottom: 20,
  },
  modalActions: { 
    flexDirection: "row", 
    justifyContent: "flex-end" 
  },
});
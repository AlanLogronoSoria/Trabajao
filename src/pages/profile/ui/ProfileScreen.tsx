import { useSession } from "@/features/session/model/useSession";
import { Button } from "@/shared/ui/Button";
import { router } from "expo-router";
import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

export const ProfileScreen = () => {
  const { user } = useSession();
  const [newPassword, setNewPassword] = useState('');

  // Estados añadidos para dar funcionalidad real a los nuevos componentes de diseño (Toggles)
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleUpdatePassword = () => {
    if (!newPassword) {
      Alert.alert("Error", "Por favor ingresa una nueva contraseña.");
      return;
    }
    Alert.alert("Éxito", "Contraseña actualizada (simulado)");
    setNewPassword('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top App Bar inspirado en el diseño del Dashboard */}
      <View style={styles.topAppBar}>
        <Text style={styles.appTitle}>Academic Hub</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Avatar & Header Section */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarGradient}>
            <View style={styles.avatarInner}>
              <Text style={styles.avatarEmoji}>👤</Text>
            </View>
          </View>
          <Text style={styles.userName}>{user?.email ? user.email.split('@')[0] : "Estudiante EPN"}</Text>
          <Text style={styles.userRole}>System Administrator</Text>
          
      
        </View>

        {/* Account Information Card (Glassmorphism) */}
        <View style={styles.glassCard}>
          <Text style={styles.cardSectionTitle}>Account Information</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email Address</Text>
            <Text style={styles.infoValue}>{user?.email || "usuario@epn.edu.ec"}</Text>
          </View>
          
          <View style={styles.divider} />

          <Text style={styles.inputLabel}>Cambiar Contraseña:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nueva contraseña"
            placeholderTextColor="#8d90a2"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <View style={{ width: '100%', marginTop: 5 }}>
            <Button 
              label="Actualizar Contraseña" 
              variant="primary" 
              onPress={handleUpdatePassword}
            />
          </View>
        </View>

        {/* Preferences Card (Componente Extra de Diseño Inyectado) */}
      

        {/* Support Card (Componente Extra de Diseño Inyectado) */}
        

        {/* Footer Actions */}
        <View style={styles.footerContainer}>
          <Button 
            label="Volver al Inicio" 
            variant="ghost"
            onPress={() => router.replace('/home')} 
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: '#101415' // Fondo ultra oscuro de la plantilla HTML
  },
  topAppBar: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(29, 32, 34, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b6c4ff', // Primary token
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  
  // Header & Avatar
  profileHeader: {
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 8,
  },
  avatarGradient: {
    padding: 3,
    borderRadius: 999,
    backgroundColor: '#323537', // Borde estructural simulando gradiente discreto
    borderWidth: 2,
    borderColor: '#00eefc', // Color cyan secundario de la guía
    marginBottom: 16,
  },
  avatarInner: {
    width: 100,
    height: 100,
    borderRadius: 999,
    backgroundColor: '#1d2022',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 44,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e0e3e5',
    marginBottom: 4,
    textTransform: 'capitalize'
  },
  userRole: {
    fontSize: 14,
    color: '#c3c5d9',
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#00eefc',
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#b6c4ff',
    fontWeight: '600',
  },

  // Glassmorphism Cards
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 20,
  },
  cardSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#c3c5d9',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  infoRow: {
    width: '100%',
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'between',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e0e3e5',
  },
  infoSubLabel: {
    fontSize: 12,
    color: '#8d90a2',
    marginTop: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#8d90a2',
    marginTop: 4,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 14,
  },

  // Inputs & Form
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e0e3e5',
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: '#e0e3e5',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },

  // Footer
  footerContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
});
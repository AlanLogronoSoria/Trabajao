// src/pages/profile/ui/ProfileScreen.tsx
import { theme } from "@/core/styles/theme";
import { useSession } from "@/features/session/model/useSession";
import { Button } from "@/shared/ui/Button";
import { router } from "expo-router";
import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

// CAMBIADO AQUÍ: "export const" en lugar de "export default function"
export const ProfileScreen = () => {
  const { user } = useSession();
  const [newPassword, setNewPassword] = useState('');

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
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>
        
        <View style={styles.card}>
          <Text style={styles.avatar}>👤</Text>
          <Text style={styles.emailLabel}>Correo Electrónico:</Text>
          <Text style={styles.emailText}>{user?.email || "usuario@epn.edu.ec"}</Text>
          
          <View style={styles.divider} />

          <Text style={styles.inputLabel}>Cambiar Contraseña:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nueva contraseña"
            placeholderTextColor={theme.colors.textMuted}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <View style={{ width: '100%', marginTop: 10 }}>
            <Button 
              label="Actualizar Contraseña" 
              variant="primary" 
              onPress={handleUpdatePassword}
            />
          </View>
        </View>

        <View style={{ marginTop: 20, width: '100%' }}>
          <Button 
            label="Volver al Inicio" 
            variant="ghost"
            onPress={() => router.replace('/home')} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.bg },
  container: { flex: 1, padding: 24, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", color: theme.colors.primary, marginBottom: 20 },
  card: { backgroundColor: theme.colors.card, padding: 24, borderRadius: 16, alignItems: "center", width: "100%", ...theme.shadow.card },
  avatar: { fontSize: 50, marginBottom: 12 },
  emailLabel: { fontSize: 12, color: theme.colors.textMuted, fontWeight: "600", alignSelf: "flex-start" },
  emailText: { fontSize: 16, color: theme.colors.textMid, marginBottom: 15, alignSelf: "flex-start" },
  divider: { width: "100%", height: 1, backgroundColor: theme.colors.border, marginVertical: 10 },
  inputLabel: { fontSize: 12, color: theme.colors.textMuted, fontWeight: "600", alignSelf: "flex-start", marginBottom: 5 },
  input: { width: "100%", height: 45, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 8, paddingHorizontal: 12, marginBottom: 15, color: theme.colors.textMid },
});
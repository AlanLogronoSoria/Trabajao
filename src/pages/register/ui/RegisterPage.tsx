import { useRegister } from "@/features/auth/model/useRegister";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export const RegisterPage = () => {
  // Se agregó el estado de fullName basado en el diseño HTML
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [success, setSuccess] = useState(false);
  const register = useRegister();

  const handleRegister = async () => {
    if (!email || !password || !confirm) {
      Alert.alert("Campos requeridos", "Completa todos los campos.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Contraseña débil", "Mínimo 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
    try {
      // Se mantiene el payload original para no romper el backend, 
      // si tu API acepta fullName, agrégalo aquí: { email, password, fullName }
      await register.mutateAsync({ email, password });
      setSuccess(true);
    } catch (err: any) {
      Alert.alert("Error al registrarse", err.message);
    }
  };

  // Lógica para medir la fuerza de la contraseña (extraída de tu script JS)
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length > 5) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password) || /[^a-zA-Z\d]/.test(password)) score += 1;
    return score;
  };

  const strengthScore = getPasswordStrength();

  const renderStrengthMeter = () => {
    if (!password) return null;
    
    let color1 = "rgba(255,255,255,0.1)";
    let color2 = "rgba(255,255,255,0.1)";
    let color3 = "rgba(255,255,255,0.1)";
    let text = "Introduce una contraseña";
    let textColor = "rgba(255,255,255,0.5)";

    if (strengthScore === 1) {
      color1 = "#ffb4ab"; // Error
      text = "Débil";
      textColor = "#ffb4ab";
    } else if (strengthScore === 2) {
      color1 = "#eab308"; // Warning
      color2 = "#eab308";
      text = "Media";
      textColor = "#eab308";
    } else if (strengthScore >= 3) {
      color1 = "#00eefc"; // Secondary Container
      color2 = "#00eefc";
      color3 = "#00eefc";
      text = "Fuerte";
      textColor = "#00eefc";
    }

    return (
      <View style={styles.strengthContainer}>
        <View style={styles.barsRow}>
          <View style={[styles.strengthBar, { backgroundColor: color1 }]} />
          <View style={[styles.strengthBar, { backgroundColor: color2 }]} />
          <View style={[styles.strengthBar, { backgroundColor: color3 }]} />
        </View>
        <Text style={[styles.strengthText, { color: textColor }]}>{text}</Text>
      </View>
    );
  };

  const renderMatchIndicator = () => {
    if (confirm.length === 0) return null;
    const isMatch = password === confirm;
    return (
      <View style={styles.matchContainer}>
        <Ionicons 
          name={isMatch ? "checkmark-circle" : "close-circle"} 
          size={16} 
          color={isMatch ? "#00eefc" : "#ffb4ab"} 
        />
        <Text style={[styles.matchText, { color: isMatch ? "#00eefc" : "#ffb4ab" }]}>
          {isMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
        </Text>
      </View>
    );
  };

  if (success) {
    return (
      <ImageBackground style={styles.container} // Reemplaza con tu patrón local si tienes uno
      >
        <View style={styles.overlay} />
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>📬</Text>
          <Text style={styles.successTitle}>¡Revisa tu email!</Text>
          <Text style={styles.successText}>
            Te enviamos un link de confirmación a{" "}
            <Text style={{ fontWeight:"700", color: "#b6c4ff" }}>{email}</Text>.
            {"\n"}Confirma tu cuenta para poder iniciar sesión.
          </Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
             <Ionicons name="arrow-back" size={18} color="#00eefc" />
             <Text style={styles.link}>Volver al login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground 
      style={styles.container} 
      source={{ uri: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop' }} // Imagen de textura de fallback
    >
      <View style={styles.overlay} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior="height"
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.glassCard}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                 <Ionicons name="school" size={32} color="#b6c4ff" />
              </View>
              <Text style={styles.title}>Crear Cuenta</Text>
              <Text style={styles.subtitle}>Únete a la red académica tecnológica</Text>
            </View>
            
            <View style={styles.form}>
              <Input 
                label="Nombre completo" 
                value={fullName}
                onChangeText={setFullName} 
                placeholder="Ej. Juan Pérez" 
              />
              
              <Input 
                label="Correo electrónico" 
                value={email}
                onChangeText={setEmail} 
                keyboardType="email-address"
                placeholder="usuario@universidad.edu" 
              />
              
              <View style={styles.inputWrapper}>
                <Input 
                  label="Contraseña" 
                  value={password}
                  onChangeText={setPassword} 
                  secureTextEntry
                  placeholder="Mínimo 8 caracteres" 
                />
                {renderStrengthMeter()}
              </View>

              <View style={styles.inputWrapper}>
                <Input 
                  label="Confirmar contraseña" 
                  value={confirm}
                  onChangeText={setConfirm} 
                  secureTextEntry
                  placeholder="Repite tu contraseña" 
                />
                {renderMatchIndicator()}
              </View>

              <View style={styles.buttonWrapper}>
                <Button 
                  onPress={handleRegister}
                  isLoading={register.isPending}
                  label="Registrarse" 
                />
              </View>

              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.loginLinkContainer}
              >
                <Text style={styles.linkMuted}>
                  ¿Ya tienes una cuenta?{" "}
                  <Text style={styles.linkBold}>
                    Iniciar Sesión
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#101415" 
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(16, 20, 21, 0.85)", // Oscurece el fondo emulando bg-background/80
  },
  keyboardView: {
    flex: 1,
  },
  scroll: { 
    flexGrow: 1, 
    justifyContent: "center", 
    padding: 24 
  },
  glassCard: { 
    backgroundColor: "rgba(255, 255, 255, 0.08)", // Efecto glassmorphism
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden", 
    // Si usas ShadowProps específicos puedes incluirlos aquí, sino en Android usa elevation
    elevation: 10,
  },
  header: { 
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { 
    color: "#e0e3e5", 
    fontSize: 24, 
    fontWeight: "700", 
    marginBottom: 8 
  },
  subtitle: { 
    color: "#c3c5d9", 
    fontSize: 14 
  },
  form: { 
    gap: 16 
  },
  inputWrapper: {
    gap: 4,
  },
  strengthContainer: {
    marginTop: 4,
    gap: 6,
  },
  barsRow: {
    flexDirection: "row",
    gap: 4,
    height: 6,
    width: "100%",
  },
  strengthBar: {
    flex: 1,
    borderRadius: 4,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: "500",
  },
  matchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  matchText: {
    fontSize: 12,
    fontWeight: "500",
  },
  buttonWrapper: {
    marginTop: 8,
  },
  loginLinkContainer: { 
    alignItems: "center",
    marginTop: 16,
  },
  linkMuted: { 
    color: "#c3c5d9", 
    fontSize: 14 
  },
  linkBold: {
    color: "#00eefc",
    fontWeight: "700",
  },
  successContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 32,
    zIndex: 10,
  },
  successIcon: { 
    fontSize: 72, 
    marginBottom: 24 
  },
  successTitle: { 
    fontSize: 26, 
    fontWeight: "700",
    color: "#b6c4ff", 
    marginBottom: 16 
  },
  successText: { 
    fontSize: 16, 
    color: "#c3c5d9",
    textAlign: "center", 
    lineHeight: 24, 
    marginBottom: 32 
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  link: { 
    color: "#00eefc", 
    fontSize: 15,
    fontWeight: "600" 
  },
});
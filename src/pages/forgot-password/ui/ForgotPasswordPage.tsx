import { useForgotPassword } from "@/features/auth/model/useForgotPassword";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const forgotPassword = useForgotPassword();

  const isSubmitting = forgotPassword.isPending;

  const handleSend = async () => {
    if (!email) {
      Alert.alert("Campo requerido", "Ingresa tu correo electrónico.");
      return;
    }
    try {
      await forgotPassword.mutateAsync(email);
      setSuccess(true);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://lh3.googleusercontent.com/aida/ADBb0uhlJwjwuuFbnqzuS1FJUIulUZoRuURD-r5Un8AtEn5FXKPKBg8HSS8PCSy7ZJT6v89T45wSiZh0uEajrFhRNLhtdhwScUCUee0eN6YZT5U3oQzLSkPqLS5t0oDCMFhalzthbiqW6hY2OQ-wpVHJ2LITCv9gnkXJaEGK9zEB1bgqDEAyVXlBSu1wf2Tq2WEa7YZ1iCS_gdoziAtVKC95zibIbMpohUnr1tKIy5PLNu_PdUIi5GXMKxsKLXbh" }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} pointerEvents="none" />

      <KeyboardAvoidingView
        style={styles.container}
        // SOLUCIÓN 1: En Android DEBE ser undefined. Expo ya maneja el ajuste de pantalla por defecto.
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View style={styles.inner}>
            
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={{ uri: "https://lh3.googleusercontent.com/aida/ADBb0uh3v3miyQOezTC6oJ9DBwup7Hq4KkcPClV0HhhtCy0Gu0gLtK3dcM3lgYq0o5wFpkvwY70g-DcQRlQ5oJM5Z5yCB4-G62knRxX2TEKhH3xZvyV4sGz5mLzELp-T7ShFuI5eqYngHMivXorUImmHt--Im_-yVkSwalZvG_78YbjdBJkNsB6gZWxXYSsxy5uwpufBQWCw3qtfuq5pNLGDxm746UswB0BIi10UIkCLHmCws6c7Z8FYdackEzU" }}
                style={styles.logoImage}
              />
            </View>

            {/* Tarjeta Glassmorphism */}
            <View style={styles.glassCard}>
              {success ? (
                /* ESTADO: ÉXITO */
                <View style={styles.stateContainer}>
                  <View style={styles.successIconContainer}>
                    <MaterialIcons name="check-circle" size={40} color="#34d399" />
                  </View>
                  <Text style={styles.title}>¡Enlace enviado!</Text>
                  <Text style={styles.subtitleSuccess}>
                    Si existe una cuenta, se ha enviado un enlace para restablecer la contraseña a:{"\n"}
                    <Text style={{ fontWeight: "700", color: "#e0e3e5" }}>{email}</Text>
                  </Text>
                  <TouchableOpacity
                    style={styles.glassButton}
                    onPress={() => router.replace("/(auth)/login")}
                  >
                    <Text style={styles.glassButtonText}>Volver al inicio de sesión</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                /* ESTADO: FORMULARIO POR DEFECTO */
                <View style={styles.stateContainer}>
                  <View style={styles.header}>
                    <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
                    <Text style={styles.subtitle}>
                      Ingresa tu correo institucional para recibir un enlace de restablecimiento.
                    </Text>
                  </View>

                  <View style={styles.form}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
                      <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
                        <MaterialIcons name="mail" size={20} color="#8d90a2" style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          value={email}
                          onChangeText={setEmail}
                          keyboardType="email-address"
                          placeholder="admin@universidad.edu.ec"
                          placeholderTextColor="#434656"
                          autoCapitalize="none"
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          editable={!isSubmitting}
                        />
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.primaryButton}
                      onPress={handleSend}
                      disabled={isSubmitting}
                      activeOpacity={0.8}
                    >
                      {isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <>
                          <Text style={styles.primaryButtonText}>Enviar enlace</Text>
                          <MaterialIcons name="arrow-forward" size={18} color="#fff" />
                        </>
                      )}
                    </TouchableOpacity>
                  </View>

                  <View style={styles.footer}>
                    <TouchableOpacity
                      style={styles.backLink}
                      onPress={() => router.back()}
                    >
                      <MaterialIcons name="arrow-back" size={16} color="#00dbe9" />
                      <Text style={styles.backLinkText}>Volver al inicio de sesión</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#101415",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(16, 20, 21, 0.6)",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  logoContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  logoImage: {
    width: 96,
    height: 96,
    borderRadius: 16,
  },
  glassCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    overflow: "hidden",
  },
  stateContainer: {
    gap: 24,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#e0e3e5",
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    color: "#c3c5d9",
    lineHeight: 24,
  },
  form: {
    gap: 20,
    marginTop: 8,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#c3c5d9",
    letterSpacing: 0.8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#272a2c",
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputWrapperFocused: {
    // SOLUCIÓN 2: Solo cambiamos el color del borde. 
    // Quitar elevation y shadow dinámicos aquí previene el bug de pérdida de foco en Android.
    borderColor: "#00F0FF",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    color: "#e0e3e5",
    fontSize: 16,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0055ff",
    height: 52,
    borderRadius: 8,
    gap: 8,
    marginTop: 4,
    shadowColor: "#0055ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    marginTop: 16,
    alignItems: "center",
  },
  backLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 8,
  },
  backLinkText: {
    color: "#00dbe9",
    fontSize: 14,
    fontWeight: "500",
  },
  successIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(52, 211, 153, 0.2)",
    borderColor: "rgba(52, 211, 153, 0.3)",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 8,
  },
  subtitleSuccess: {
    fontSize: 16,
    color: "#c3c5d9",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 8,
  },
  glassButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  glassButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
});
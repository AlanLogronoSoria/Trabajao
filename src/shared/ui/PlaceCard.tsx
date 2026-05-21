import { theme } from "@/core/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PlaceCardProps {
  title: string;
  description: string;
  onPress: () => void;
  // Nuevas propiedades opcionales para integrar el diseño avanzado
  iconName?: keyof typeof Ionicons.glyphMap;
  status?: "Disponible" | "Ocupado" | "Mantenimiento";
  capacity?: number;
  extraInfoText?: string;
  extraInfoIcon?: keyof typeof Ionicons.glyphMap;
  onMorePress?: () => void;
}

export function PlaceCard({ 
  title, 
  description, 
  onPress,
  iconName = "map-outline",
  status,
  capacity,
  extraInfoText,
  extraInfoIcon,
  onMorePress
}: PlaceCardProps) {

  // Lógica para asignar los colores de los "badges" según el diseño HTML
  const getStatusStyles = () => {
    switch (status) {
      case "Disponible":
        return { bg: "rgba(0, 238, 252, 0.1)", text: "#00eefc", border: "rgba(0, 238, 252, 0.2)" };
      case "Ocupado":
        return { bg: "rgba(0, 85, 255, 0.2)", text: "#b6c4ff", border: "rgba(0, 85, 255, 0.3)" };
      case "Mantenimiento":
        return { bg: "#323537", text: "#e4e1e9", border: "rgba(255, 255, 255, 0.1)" };
      default:
        return { bg: theme.colors.inputBg, text: theme.colors.textMuted, border: theme.colors.border };
    }
  };

  const statusStyle = getStatusStyles();

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      {/* SECCIÓN SUPERIOR: Icono, Título, Descripción y Estado */}
      <View style={styles.topContainer}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <Ionicons name={iconName} size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.desc} numberOfLines={1}>{description}</Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          {status && (
            <View style={[styles.badge, { backgroundColor: statusStyle.bg, borderColor: statusStyle.border }]}>
              <Text style={[styles.badgeText, { color: statusStyle.text }]}>{status}</Text>
            </View>
          )}
          
          {/* Botón de opciones extra (3 puntos). Si no se pasa onMorePress, usa el onPress principal */}
          <TouchableOpacity 
            style={styles.moreButton} 
            onPress={onMorePress || onPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="ellipsis-vertical" size={20} color={theme.colors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>

      {/* SECCIÓN INFERIOR: Capacidad y Extras (Solo se renderiza si hay datos) */}
      {(capacity !== undefined || extraInfoText) && (
        <View style={styles.bottomContainer}>
          <View style={styles.infoWrapper}>
            {capacity !== undefined && (
              <View style={styles.infoItem}>
                <Ionicons name="people-outline" size={16} color={theme.colors.textMuted} />
                <Text style={styles.infoText}>Cap: {capacity}</Text>
              </View>
            )}
            {extraInfoText && (
              <View style={styles.infoItem}>
                <Ionicons name={extraInfoIcon || "information-circle-outline"} size={16} color={theme.colors.textMuted} />
                <Text style={styles.infoText}>{extraInfoText}</Text>
              </View>
            )}
          </View>
          {/* Mantenemos el chevron original al final para no perder la usabilidad visual */}
          <Ionicons name="chevron-forward" size={18} color={theme.colors.textMuted} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: "column", // Cambiado a columna para acomodar la sección inferior
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.inputBg,
    justifyContent: "center",
    alignItems: "center",
  },
  content: { 
    flex: 1, 
    marginLeft: theme.spacing.md 
  },
  title: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: theme.colors.text 
  },
  desc: { 
    fontSize: 13, 
    color: theme.colors.textMuted, 
    marginTop: 2 
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  moreButton: {
    padding: 2,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)", // Simula el border-white/5 del HTML
  },
  infoWrapper: {
    flexDirection: "row",
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: theme.colors.textMuted,
  }
});
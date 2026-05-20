import { theme } from "@/core/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ManagePlaceCardProps {
  title: string;
  desc: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function ManagePlaceCard({ title, desc, onEdit, onDelete }: ManagePlaceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name="business" size={24} color={theme.colors.primary} />
      </View>
      
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc} numberOfLines={1}>{desc}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnEdit} onPress={onEdit}>
          <Ionicons name="pencil" size={18} color={theme.colors.accent} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDelete} onPress={onDelete}>
          <Ionicons name="trash" size={18} color={theme.colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    ...theme.shadow.card,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)",
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.bg,
    justifyContent: "center",
    alignItems: "center",
  },
  info: { flex: 1, marginLeft: theme.spacing.md },
  title: { fontSize: 16, fontWeight: "700", color: theme.colors.text },
  desc: { fontSize: 13, color: theme.colors.textMuted, marginTop: 2 },
  actions: { flexDirection: "row", gap: 8 },
  btnEdit: {
    padding: 8,
    backgroundColor: "#EFF6FF",
    borderRadius: theme.radius.sm,
  },
  btnDelete: {
    padding: 8,
    backgroundColor: "#FEF2F2",
    borderRadius: theme.radius.sm,
  },
});
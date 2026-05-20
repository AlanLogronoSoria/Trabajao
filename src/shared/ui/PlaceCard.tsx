import { theme } from "@/core/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PlaceCardProps {
  title: string;
  description: string;
  onPress: () => void;
}

export function PlaceCard({ title, description, onPress }: PlaceCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name="map-outline" size={24} color={theme.colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={theme.colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.inputBg,
    justifyContent: "center",
    alignItems: "center",
  },
  content: { flex: 1, marginLeft: theme.spacing.md },
  title: { fontSize: 15, fontWeight: "700", color: theme.colors.text },
  desc: { fontSize: 12, color: theme.colors.textMuted, marginTop: 2 },
});
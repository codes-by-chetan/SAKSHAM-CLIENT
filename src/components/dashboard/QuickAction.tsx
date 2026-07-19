import { ReactNode } from "react";
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface QuickActionProps {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  onPress?: () => void;
}

export default function QuickAction({
  title,
  subtitle,
  icon,
  onPress,
}: QuickActionProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="mr-4 w-32 rounded-3xl bg-white p-4 shadow-sm"
      style={{
        elevation: 3,
      }}
    >
      <View className="h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
        {icon}
      </View>

      <Text className="mt-5 text-lg font-bold text-ink">
        {title}
      </Text>

      {subtitle && (
        <Text className="mt-1 text-sm text-stone-500">
          {subtitle}
        </Text>
      )}
    </TouchableOpacity>
  );
}

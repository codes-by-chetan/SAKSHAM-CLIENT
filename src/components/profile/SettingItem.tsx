import { ReactNode } from "react";
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronRight } from "lucide-react-native";

interface SettingItemProps {
  title: string;
  subtitle?: string;

  icon: ReactNode;

  danger?: boolean;

  onPress?: () => void;

  rightComponent?: ReactNode;
}

export default function SettingItem({
  title,
  subtitle,
  icon,
  danger = false,
  onPress,
  rightComponent,
}: SettingItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="mb-3 flex-row items-center rounded-3xl bg-white p-5"
      style={{
        elevation: 2,
      }}
    >
      <View className="mr-4">

        {icon}

      </View>

      <View className="flex-1">

        <Text
          className={`text-lg font-semibold ${
            danger
              ? "text-red-600"
              : "text-ink"
          }`}
        >
          {title}
        </Text>

        {subtitle && (
          <Text className="mt-1 text-sm text-stone-500">
            {subtitle}
          </Text>
        )}

      </View>

      {rightComponent ?? (
        <ChevronRight
          size={20}
          color="#999"
        />
      )}
    </TouchableOpacity>
  );
}
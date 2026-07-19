import { Text, TouchableOpacity, View } from "react-native";
import { ChevronRight } from "lucide-react-native";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;

  actionText?: string;
  onActionPress?: () => void;
}

export default function SectionHeader({
  title,
  subtitle,
  actionText,
  onActionPress,
}: SectionHeaderProps) {
  return (
    <View className="mb-4 flex-row items-end justify-between">

      <View className="flex-1">

        <Text className="text-2xl font-bold text-ink">
          {title}
        </Text>

        {subtitle ? (
          <Text className="mt-1 text-sm text-stone-500">
            {subtitle}
          </Text>
        ) : null}

      </View>

      {actionText && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onActionPress}
          className="ml-4 flex-row items-center"
        >
          <Text className="mr-1 font-semibold text-leaf">
            {actionText}
          </Text>

          <ChevronRight
            size={18}
            color="#2E7D32"
          />
        </TouchableOpacity>
      )}

    </View>
  );
}
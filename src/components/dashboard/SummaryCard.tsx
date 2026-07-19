import { ReactNode } from "react";
import { Text, View } from "react-native";

interface SummaryCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  subtitle?: string;
}

export default function SummaryCard({
  title,
  value,
  icon,
  subtitle,
}: SummaryCardProps) {
  return (
    <View
      className="
        flex-1
        rounded-3xl
        bg-white
        p-4
        shadow-sm
      "
      style={{
        elevation: 3,
      }}
    >
      <View className="flex-row items-center justify-between">

        <Text className="text-sm text-stone-500">
          {title}
        </Text>

        {icon}

      </View>

      <Text className="mt-4 text-3xl font-black text-ink">
        {value}
      </Text>

      {subtitle ? (
        <Text className="mt-2 text-xs text-stone-500">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

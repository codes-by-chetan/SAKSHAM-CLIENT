import { Text, View } from "react-native";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <View className="mt-8 mb-8 items-center px-4">
      <Text className="text-center text-3xl font-black text-ink">
        {title}
      </Text>

      {subtitle ? (
        <Text className="mt-3 text-center text-base leading-6 text-stone-500">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
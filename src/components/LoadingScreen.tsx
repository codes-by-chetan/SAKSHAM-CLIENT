import { ActivityIndicator, Text, View } from "react-native";
import Screen from "./Screen";
import Logo from "./Logo";

interface LoadingScreenProps {
  title?: string;
  subtitle?: string;
}

export default function LoadingScreen({
  title = "Loading...",
  subtitle = "Please wait while we prepare everything.",
}: LoadingScreenProps) {
  return (
    <Screen scroll={false}>
      <View className="flex-1 items-center justify-center">

        <Logo />

        <ActivityIndicator
          size="large"
          color="#2E7D32"
          className="mt-10"
        />

        <Text className="mt-8 text-2xl font-bold text-ink">
          {title}
        </Text>

        <Text className="mt-3 px-8 text-center text-base leading-6 text-stone-500">
          {subtitle}
        </Text>

      </View>
    </Screen>
  );
}
import { Check } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

import { Language } from "@/types/language";

interface LanguageCardProps {
  language: Language;
  selected: boolean;
  onPress: () => void;
}

export default function LanguageCard({
  language,
  selected,
  onPress,
}: LanguageCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`
        mb-4
        flex-row
        items-center
        justify-between
        rounded-2xl
        border
        px-5
        py-4
        ${selected ? "border-leaf bg-green-50" : "border-stone-200 bg-white"}
      `}
    >
      <View>
        <Text className="text-lg font-bold text-ink">
          {language.nativeName}
        </Text>

        <Text className="mt-1 text-sm text-stone-500">{language.name}</Text>
      </View>

      {selected && (
        <View className="h-8 w-8 items-center justify-center rounded-full bg-leaf">
          <Check size={18} color="#FFF" />
        </View>
      )}
    </TouchableOpacity>
  );
}

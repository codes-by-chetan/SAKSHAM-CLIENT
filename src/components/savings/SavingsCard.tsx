import { Text, TouchableOpacity, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { useLanguage } from "@/hooks/useLanguage";

export interface Savings {
  id: string;
  month: string;
  collected: number;
  pending: number;
  totalMembers: number;
}

interface SavingsCardProps {
  item: Savings;
  onPress?: () => void;
}

export default function SavingsCard({
  item,
  onPress,
}: SavingsCardProps) {
  const { t } = useLanguage();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="mb-4 rounded-3xl bg-white p-4"
      style={{ elevation: 2 }}
    >
      <View className="flex-row items-center justify-between">

        <Text className="text-xl font-bold text-ink">
          {item.month}
        </Text>

        <ChevronRight
          size={20}
          color="#999"
        />

      </View>

      <View className="mt-6 flex-row justify-between">

        <View>

          <Text className="text-xs text-stone-500">
            {t.collected}
          </Text>

          <Text className="mt-1 text-xl font-bold text-green-700">
            ₹{item.collected.toLocaleString()}
          </Text>

        </View>

        <View>

          <Text className="text-xs text-stone-500">
            {t.pending}
          </Text>

          <Text className="mt-1 text-xl font-bold text-red-600">
            ₹{item.pending.toLocaleString()}
          </Text>

        </View>

      </View>

      <View className="mt-6 h-3 overflow-hidden rounded-full bg-stone-200">

        <View
          className="h-full rounded-full bg-leaf"
          style={{
            width: `${
              (item.collected /
                (item.collected + item.pending)) *
              100
            }%`,
          }}
        />

      </View>

      <Text className="mt-3 text-sm text-stone-500">
        {item.totalMembers} {t.membersCount}
      </Text>

    </TouchableOpacity>
  );
}

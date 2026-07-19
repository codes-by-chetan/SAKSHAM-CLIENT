import { Text, View } from "react-native";
import {
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react-native";

export interface ActivityItem {
  id: string;

  title: string;

  description: string;

  amount: string;

  type: "credit" | "debit";
}

interface RecentActivityProps {
  item: ActivityItem;
}

export default function RecentActivity({
  item,
}: RecentActivityProps) {
  const isCredit =
    item.type === "credit";

  return (
    <View
      className="mb-4 flex-row items-center rounded-3xl bg-white p-4"
      style={{
        elevation: 2,
      }}
    >
      <View
        className={`mr-4 h-12 w-12 items-center justify-center rounded-full ${
          isCredit
            ? "bg-green-100"
            : "bg-red-100"
        }`}
      >
        {isCredit ? (
          <ArrowDownLeft
            size={22}
            color="#16A34A"
          />
        ) : (
          <ArrowUpRight
            size={22}
            color="#DC2626"
          />
        )}
      </View>

      <View className="flex-1">

        <Text className="text-base font-bold text-ink">
          {item.title}
        </Text>

        <Text className="mt-1 text-sm text-stone-500">
          {item.description}
        </Text>

      </View>

      <Text
        className={`text-lg font-bold ${
          isCredit
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {item.amount}
      </Text>
    </View>
  );
}
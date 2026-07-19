import { Text, TouchableOpacity, View } from "react-native";
import {
  CalendarDays,
  ChevronRight,
  Receipt,
} from "lucide-react-native";

export interface Expense {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
}

interface ExpenseCardProps {
  expense: Expense;
  onPress?: () => void;
}

export default function ExpenseCard({
  expense,
  onPress,
}: ExpenseCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="mb-4 rounded-3xl bg-white p-5"
      style={{ elevation: 2 }}
    >
      <View className="flex-row items-center justify-between">

        <View>

          <Text className="text-xl font-bold text-ink">
            {expense.title}
          </Text>

          <View className="mt-2 flex-row items-center">

            <Receipt
              size={16}
              color="#666"
            />

            <Text className="ml-2 text-stone-500">
              {expense.category}
            </Text>

          </View>

        </View>

        <ChevronRight
          size={20}
          color="#999"
        />

      </View>

      <View className="mt-6 flex-row items-center justify-between">

        <Text className="text-2xl font-bold text-red-600">
          ₹{expense.amount.toLocaleString()}
        </Text>

        <View className="flex-row items-center">

          <CalendarDays
            size={16}
            color="#666"
          />

          <Text className="ml-2 text-stone-500">
            {expense.date}
          </Text>

        </View>

      </View>

    </TouchableOpacity>
  );
}
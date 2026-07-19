import { Text, TouchableOpacity, View } from "react-native";
import {
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
} from "lucide-react-native";

export interface Loan {
  id: string;

  memberName: string;

  principal: number;

  outstanding: number;

  nextDueDate: string;

  status: "active" | "completed" | "overdue";
}

interface LoanCardProps {
  loan: Loan;
  onPress?: () => void;
}

export default function LoanCard({
  loan,
  onPress,
}: LoanCardProps) {
  const statusColor = {
    active: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      label: "Active",
    },

    completed: {
      bg: "bg-green-100",
      text: "text-green-700",
      label: "Completed",
    },

    overdue: {
      bg: "bg-red-100",
      text: "text-red-700",
      label: "Overdue",
    },
  }[loan.status];

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="mb-4 rounded-3xl bg-white p-5"
      style={{
        elevation: 2,
      }}
    >
      <View className="flex-row items-center justify-between">

        <View>

          <Text className="text-xl font-bold text-ink">
            {loan.memberName}
          </Text>

          <View className="mt-2 flex-row items-center">

            <CircleDollarSign
              size={16}
              color="#666"
            />

            <Text className="ml-2 text-stone-500">
              ₹{loan.principal.toLocaleString()}
            </Text>

          </View>

        </View>

        <ChevronRight
          size={20}
          color="#999"
        />

      </View>

      <View className="mt-6 flex-row justify-between">

        <View>

          <Text className="text-xs text-stone-500">
            Outstanding
          </Text>

          <Text className="mt-1 text-xl font-bold text-red-600">
            ₹{loan.outstanding.toLocaleString()}
          </Text>

        </View>

        <View>

          <Text className="text-xs text-stone-500">
            Next EMI
          </Text>

          <View className="mt-2 flex-row items-center">

            <CalendarDays
              size={15}
              color="#666"
            />

            <Text className="ml-2 font-semibold text-ink">
              {loan.nextDueDate}
            </Text>

          </View>

        </View>

      </View>

      <View
        className={`mt-6 self-start rounded-full px-4 py-2 ${statusColor.bg}`}
      >
        <Text
          className={`font-semibold ${statusColor.text}`}
        >
          {statusColor.label}
        </Text>
      </View>

    </TouchableOpacity>
  );
}
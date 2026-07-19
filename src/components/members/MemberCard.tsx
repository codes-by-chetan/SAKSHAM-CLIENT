import { Text, TouchableOpacity, View } from "react-native";
import {
  ChevronRight,
  Phone,
} from "lucide-react-native";

export interface Member {
  id: string;

  name: string;

  phone: string;

  savings: number;

  activeLoan: boolean;
}

interface MemberCardProps {
  member: Member;

  onPress?: () => void;
}

export default function MemberCard({
  member,
  onPress,
}: MemberCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="mb-4 rounded-3xl bg-white p-5"
      style={{
        elevation: 2,
      }}
    >
      <View className="flex-row items-center">

        <View className="mr-4 h-14 w-14 items-center justify-center rounded-full bg-leaf">

          <Text className="text-xl font-black text-white">
            {member.name.charAt(0)}
          </Text>

        </View>

        <View className="flex-1">

          <Text className="text-lg font-bold text-ink">
            {member.name}
          </Text>

          <View className="mt-2 flex-row items-center">

            <Phone
              size={15}
              color="#888"
            />

            <Text className="ml-2 text-stone-500">
              {member.phone}
            </Text>

          </View>

        </View>

        <ChevronRight
          size={20}
          color="#999"
        />

      </View>

      <View className="mt-5 flex-row justify-between">

        <View>

          <Text className="text-xs text-stone-500">
            Savings
          </Text>

          <Text className="mt-1 text-lg font-bold text-green-700">
            ₹{member.savings.toLocaleString()}
          </Text>

        </View>

        <View
          className={`rounded-full px-4 py-2 ${
            member.activeLoan
              ? "bg-red-100"
              : "bg-green-100"
          }`}
        >
          <Text
            className={`font-semibold ${
              member.activeLoan
                ? "text-red-600"
                : "text-green-700"
            }`}
          >
            {member.activeLoan
              ? "Loan Active"
              : "No Loan"}
          </Text>
        </View>

      </View>

    </TouchableOpacity>
  );
}
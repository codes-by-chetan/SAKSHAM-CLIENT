import { Text, View } from "react-native";
import { useLanguage } from "@/hooks/useLanguage";

interface WelcomeCardProps {
  userName: string;
  groupName: string;

  todayCollection?: string;
  membersPaidToday?: number;
}

export default function WelcomeCard({
  userName,
  groupName,
  todayCollection = "₹0",
  membersPaidToday = 0,
}: WelcomeCardProps) {
  const { t } = useLanguage();

  function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";

    if (hour < 17) return "Good Afternoon 🌤️";

    return "Good Evening 🌙";
  }

  return (
    <View
      className="rounded-[32px] bg-leaf p-5"
      style={{
        elevation: 5,
      }}
    >
      <Text className="text-base text-green-100">
        {getGreeting()}
      </Text>

      <Text className="mt-1 text-3xl font-black text-white">
        {userName}
      </Text>

      <Text className="mt-1 text-base text-green-100">
        {groupName}
      </Text>

      <View className="mt-8 flex-row">

        <View className="flex-1">

          <Text className="text-sm text-green-100">
            {t.todaysCollection}
          </Text>

          <Text className="mt-2 text-2xl font-black text-white">
            {todayCollection}
          </Text>

        </View>

        <View className="w-px bg-green-400" />

        <View className="flex-1 pl-5">

          <Text className="text-sm text-green-100">
            {t.membersPaid}
          </Text>

          <Text className="mt-2 text-2xl font-black text-white">
            {membersPaidToday}
          </Text>

        </View>

      </View>

    </View>
  );
}

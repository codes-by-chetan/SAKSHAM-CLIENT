import { FlatList } from "react-native";

import MainScreen from "@/components/MainScreen";
import { useLanguage } from "@/hooks/useLanguage";
import SectionHeader from "@/components/dashboard/SectionHeader";

import SavingsCard, {
  Savings,
} from "@/components/savings/SavingsCard";

const savings: Savings[] = [
  {
    id: "1",
    month: "July 2026",
    collected: 18500,
    pending: 1500,
    totalMembers: 24,
  },
  {
    id: "2",
    month: "June 2026",
    collected: 24000,
    pending: 0,
    totalMembers: 24,
  },
  {
    id: "3",
    month: "May 2026",
    collected: 22800,
    pending: 1200,
    totalMembers: 24,
  },
];

export default function SavingsScreen() {
  const { t } = useLanguage();

  return (
    <MainScreen>
      <FlatList
        data={savings}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListHeaderComponent={
          <SectionHeader
            title={t.savings}
            subtitle={t.monthlyCollection}
          />
        }
        renderItem={({ item }) => (
          <SavingsCard item={item} />
        )}
      />
    </MainScreen>
  );
}

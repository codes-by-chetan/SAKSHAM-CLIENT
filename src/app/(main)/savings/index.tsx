import { FlatList } from "react-native";

import Screen from "@/components/Screen";
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
  return (
    <Screen scroll={false}>
      <FlatList
        data={savings}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <SectionHeader
            title="Savings"
            subtitle="Monthly collection history"
          />
        }
        renderItem={({ item }) => (
          <SavingsCard item={item} />
        )}
      />
    </Screen>
  );
}
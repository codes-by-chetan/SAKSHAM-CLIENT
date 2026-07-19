import { FlatList } from "react-native";

import Screen from "@/components/Screen";
import SectionHeader from "@/components/dashboard/SectionHeader";

import ExpenseCard, {
  Expense,
} from "@/components/expenses/ExpenseCard";

const expenses: Expense[] = [
  {
    id: "1",
    title: "Stationery",
    category: "Office",
    amount: 1200,
    date: "15 Jul 2026",
  },
  {
    id: "2",
    title: "Meeting Snacks",
    category: "Food",
    amount: 850,
    date: "10 Jul 2026",
  },
  {
    id: "3",
    title: "Printer Ink",
    category: "Office",
    amount: 2300,
    date: "05 Jul 2026",
  },
  {
    id: "4",
    title: "Bank Charges",
    category: "Bank",
    amount: 250,
    date: "01 Jul 2026",
  },
];

export default function ExpensesScreen() {
  return (
    <Screen scroll={false}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <SectionHeader
            title="Expenses"
            subtitle="Track organization expenses"
          />
        }
        renderItem={({ item }) => (
          <ExpenseCard
            expense={item}
          />
        )}
      />
    </Screen>
  );
}
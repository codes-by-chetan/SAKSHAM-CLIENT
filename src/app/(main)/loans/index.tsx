import { FlatList } from "react-native";

import Screen from "@/components/Screen";
import SectionHeader from "@/components/dashboard/SectionHeader";

import LoanCard, {
  Loan,
} from "@/components/loans/LoanCard";

const loans: Loan[] = [
  {
    id: "1",
    memberName: "Aarti Patil",
    principal: 50000,
    outstanding: 32000,
    nextDueDate: "25 Jul",

    status: "active",
  },

  {
    id: "2",
    memberName: "Sunita More",
    principal: 25000,
    outstanding: 0,
    nextDueDate: "-",

    status: "completed",
  },

  {
    id: "3",
    memberName: "Pooja Jadhav",
    principal: 40000,
    outstanding: 28000,
    nextDueDate: "18 Jul",

    status: "overdue",
  },
];

export default function LoansScreen() {
  return (
    <Screen scroll={false}>
      <FlatList
        data={loans}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <SectionHeader
            title="Loans"
            subtitle="Manage issued loans"
          />
        }
        renderItem={({ item }) => (
          <LoanCard
            loan={item}
          />
        )}
      />
    </Screen>
  );
}
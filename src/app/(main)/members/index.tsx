import { FlatList } from "react-native";

import Screen from "@/components/Screen";
import SectionHeader from "@/components/dashboard/SectionHeader";

import MemberCard, {
  Member,
} from "@/components/members/MemberCard";

const members: Member[] = [
  {
    id: "1",
    name: "Aarti Patil",
    phone: "9876543210",
    savings: 12000,
    activeLoan: true,
  },
  {
    id: "2",
    name: "Sunita More",
    phone: "9876543211",
    savings: 18500,
    activeLoan: false,
  },
  {
    id: "3",
    name: "Kavita Shinde",
    phone: "9876543212",
    savings: 9500,
    activeLoan: false,
  },
  {
    id: "4",
    name: "Pooja Jadhav",
    phone: "9876543213",
    savings: 21000,
    activeLoan: true,
  },
];

export default function MembersScreen() {
  return (
    <Screen scroll={false}>
      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <SectionHeader
            title="Members"
            subtitle="Registered members of your Bachat Gat"
          />
        }
        renderItem={({ item }) => (
          <MemberCard
            member={item}
          />
        )}
      />
    </Screen>
  );
}
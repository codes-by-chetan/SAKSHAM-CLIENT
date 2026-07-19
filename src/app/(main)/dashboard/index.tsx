import { ScrollView, View } from "react-native";
import {
  Banknote,
  CircleDollarSign,
  Receipt,
  UserPlus,
  Users,
} from "lucide-react-native";

import Screen from "@/components/Screen";

import WelcomeCard from "@/components/dashboard/WelcomeCard";
import SummaryCard from "@/components/dashboard/SummaryCard";
import QuickAction from "@/components/dashboard/QuickAction";
import SectionHeader from "@/components/dashboard/SectionHeader";
import RecentActivity, {
  ActivityItem,
} from "@/components/dashboard/RecentActivity";

const recentActivities: ActivityItem[] = [
  {
    id: "1",
    title: "Monthly Savings",
    description: "Aarti Patil",
    amount: "₹500",
    type: "credit",
  },
  {
    id: "2",
    title: "Loan Issued",
    description: "Sunita More",
    amount: "₹10,000",
    type: "debit",
  },
  {
    id: "3",
    title: "Monthly Savings",
    description: "Kavita Shinde",
    amount: "₹500",
    type: "credit",
  },
];

export default function DashboardScreen() {
  return (
    <Screen scroll={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {/* Welcome Card */}

        <WelcomeCard
          userName="Chetan"
          groupName="Mahila Pragati Bachat Gat"
          todayCollection="₹18,500"
          membersPaidToday={14}
        />

        {/* Summary */}

        <View className="mt-6 flex-row">

          <SummaryCard
            title="Members"
            value="24"
            subtitle="Registered"
            icon={
              <Users
                size={22}
                color="#2E7D32"
              />
            }
          />

          <View className="w-4" />

          <SummaryCard
            title="Savings"
            value="₹2.35L"
            subtitle="Total"
            icon={
              <Banknote
                size={22}
                color="#2E7D32"
              />
            }
          />

        </View>

        <View className="mt-4 flex-row">

          <SummaryCard
            title="Loans"
            value="₹48K"
            subtitle="Outstanding"
            icon={
              <CircleDollarSign
                size={22}
                color="#2E7D32"
              />
            }
          />

          <View className="w-4" />

          <SummaryCard
            title="Expenses"
            value="₹8,900"
            subtitle="This Month"
            icon={
              <Receipt
                size={22}
                color="#2E7D32"
              />
            }
          />

        </View>

        {/* Quick Actions */}

        <View className="mt-8">

          <SectionHeader
            title="Quick Actions"
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <QuickAction
              title="Add Member"
              subtitle="Register"
              icon={
                <UserPlus
                  size={28}
                  color="#2E7D32"
                />
              }
            />

            <QuickAction
              title="Savings"
              subtitle="Deposit"
              icon={
                <Banknote
                  size={28}
                  color="#2E7D32"
                />
              }
            />

            <QuickAction
              title="Issue Loan"
              subtitle="New Loan"
              icon={
                <CircleDollarSign
                  size={28}
                  color="#2E7D32"
                />
              }
            />

            <QuickAction
              title="Expense"
              subtitle="Record"
              icon={
                <Receipt
                  size={28}
                  color="#2E7D32"
                />
              }
            />
          </ScrollView>

        </View>

        {/* Recent Activity */}

        <View className="mt-8">

          <SectionHeader
            title="Recent Activity"
            actionText="View All"
          />

          {recentActivities.map((activity) => (
            <RecentActivity
              key={activity.id}
              item={activity}
            />
          ))}

        </View>

      </ScrollView>
    </Screen>
  );
}
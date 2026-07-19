import { ScrollView, View } from "react-native";
import {
  Banknote,
  CircleDollarSign,
  Receipt,
  UserPlus,
  Users,
} from "lucide-react-native";

import MainScreen from "@/components/MainScreen";
import { useLanguage } from "@/hooks/useLanguage";

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
  const { t } = useLanguage();

  return (
    <MainScreen>
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
            title={t.members}
            value="24"
            subtitle={t.registered}
            icon={
              <Users
                size={22}
                color="#2E7D32"
              />
            }
          />

          <View className="w-4" />

          <SummaryCard
            title={t.savings}
            value="₹2.35L"
            subtitle={t.total}
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
            title={t.loans}
            value="₹48K"
            subtitle={t.outstanding}
            icon={
              <CircleDollarSign
                size={22}
                color="#2E7D32"
              />
            }
          />

          <View className="w-4" />

          <SummaryCard
            title={t.expenses}
            value="₹8,900"
            subtitle={t.thisMonth}
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
            title={t.quickActions}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 4,
              paddingVertical: 6,
            }}
          >
            <QuickAction
              title={t.addMember}
              subtitle={t.registered}
              icon={
                <UserPlus
                  size={28}
                  color="#2E7D32"
                />
              }
            />

            <QuickAction
              title={t.savings}
              subtitle={t.deposit}
              icon={
                <Banknote
                  size={28}
                  color="#2E7D32"
                />
              }
            />

            <QuickAction
              title={t.issueLoan}
              subtitle={t.loans}
              icon={
                <CircleDollarSign
                  size={28}
                  color="#2E7D32"
                />
              }
            />

            <QuickAction
              title={t.expenses}
              subtitle={t.expenses}
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
            title={t.recentActivity}
            actionText={t.viewAll}
          />

          {recentActivities.map((activity) => (
            <RecentActivity
              key={activity.id}
              item={activity}
            />
          ))}

        </View>

      </ScrollView>
    </MainScreen>
  );
}

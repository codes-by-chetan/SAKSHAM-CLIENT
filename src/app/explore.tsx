import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const modules = [
  {
    title: 'Members',
    description: 'Register bachatgat members, roles, contact details, and group position.',
    endpoint: '/api/community',
  },
  {
    title: 'Deposits',
    description: 'Track monthly savings deposits, unpaid dues, and next installment.',
    endpoint: '/api/financial/member/next-installment',
  },
  {
    title: 'Loans',
    description: 'Create loans, record repayments, and review member statements.',
    endpoint: '/api/financial/loans',
  },
  {
    title: 'Expenses',
    description: 'Ready space for daily expense tracking once the backend endpoint is added.',
    endpoint: 'Planned',
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-millet">
      <ScrollView contentContainerClassName="px-5 py-6 pb-28">
        <Text className="text-sm font-semibold uppercase text-leaf">Saksham modules</Text>
        <Text className="mt-2 text-3xl font-black text-ink">Management workspace</Text>
        <Text className="mt-3 text-base leading-6 text-stone-700">
          These are the next functional areas for the Mahila Bachatgat app based on the Saksham API.
        </Text>

        <View className="mt-6 gap-3">
          {modules.map((module) => (
            <View
              key={module.title}
              className="rounded-lg border border-stone-200 bg-white p-4">
              <View className="mb-3 h-10 w-10 items-center justify-center rounded-lg bg-leaf">
                <Text className="font-black text-white">{module.title.slice(0, 1)}</Text>
              </View>
              <Text className="text-xl font-black text-ink">{module.title}</Text>
              <Text className="mt-2 text-sm leading-5 text-stone-600">{module.description}</Text>
              <Text className="mt-3 text-xs font-semibold text-marigold">{module.endpoint}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

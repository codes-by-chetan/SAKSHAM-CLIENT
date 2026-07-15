import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { API_BASE_URL, AuthSession, signIn, signUp } from '@/services/saksham-api';

type LanguageCode = 'mr' | 'hi' | 'en' | 'gu' | 'kn' | 'ta' | 'te';
type AuthMode = 'signIn' | 'signUp';

const languages: { code: LanguageCode; name: string; nativeName: string }[] = [
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
];

const copy = {
  en: {
    chooseLanguage: 'Choose your language',
    subtitle: 'Manage savings group members, deposits, loans, and daily expenses.',
    continue: 'Continue',
    appName: 'Saksham Bachatgat',
    signIn: 'Sign in',
    signUp: 'Sign up',
    welcome: 'Welcome back',
    create: 'Create member account',
    identifier: 'Email or mobile number',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email (optional)',
    phone: 'Mobile number',
    countryCode: 'Country code',
    password: 'Password',
    mpin: '4 digit MPIN (optional)',
    submitSignIn: 'Sign in securely',
    submitSignUp: 'Create account',
    success: 'You are connected to Saksham.',
    api: 'Backend',
    switchToSignUp: 'New member? Create account',
    switchToSignIn: 'Already registered? Sign in',
  },
  mr: {
    chooseLanguage: 'तुमची भाषा निवडा',
    subtitle: 'बचतगट सदस्य, ठेवी, कर्ज आणि खर्च व्यवस्थापन.',
    continue: 'पुढे जा',
    appName: 'सक्षम बचतगट',
    signIn: 'लॉग इन',
    signUp: 'नोंदणी',
    welcome: 'पुन्हा स्वागत',
    create: 'सदस्य खाते तयार करा',
    identifier: 'ईमेल किंवा मोबाईल क्रमांक',
    firstName: 'पहिले नाव',
    lastName: 'आडनाव',
    email: 'ईमेल (ऐच्छिक)',
    phone: 'मोबाईल क्रमांक',
    countryCode: 'देश कोड',
    password: 'पासवर्ड',
    mpin: '4 अंकी MPIN (ऐच्छिक)',
    submitSignIn: 'सुरक्षित लॉग इन',
    submitSignUp: 'खाते तयार करा',
    success: 'तुम्ही सक्षमशी जोडले गेले आहात.',
    api: 'बॅकएंड',
    switchToSignUp: 'नवीन सदस्य? खाते तयार करा',
    switchToSignIn: 'आधीच नोंदणी केली आहे? लॉग इन',
  },
  hi: {
    chooseLanguage: 'अपनी भाषा चुनें',
    subtitle: 'बचत समूह के सदस्य, जमा, ऋण और खर्च प्रबंधन.',
    continue: 'आगे बढ़ें',
    appName: 'सक्षम बचतगट',
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    welcome: 'फिर से स्वागत है',
    create: 'सदस्य खाता बनाएं',
    identifier: 'ईमेल या मोबाइल नंबर',
    firstName: 'पहला नाम',
    lastName: 'अंतिम नाम',
    email: 'ईमेल (वैकल्पिक)',
    phone: 'मोबाइल नंबर',
    countryCode: 'देश कोड',
    password: 'पासवर्ड',
    mpin: '4 अंकों का MPIN (वैकल्पिक)',
    submitSignIn: 'सुरक्षित साइन इन',
    submitSignUp: 'खाता बनाएं',
    success: 'आप सक्षम से जुड़ गए हैं.',
    api: 'बैकएंड',
    switchToSignUp: 'नए सदस्य? खाता बनाएं',
    switchToSignIn: 'पहले से पंजीकृत? साइन इन',
  },
  gu: {
    chooseLanguage: 'તમારી ભાષા પસંદ કરો',
    subtitle: 'બચત જૂથના સભ્યો, જમા, લોન અને ખર્ચનું સંચાલન.',
    continue: 'ચાલુ રાખો',
    appName: 'સક્ષમ બચતગટ',
    signIn: 'સાઇન ઇન',
    signUp: 'સાઇન અપ',
    welcome: 'ફરી સ્વાગત છે',
    create: 'સભ્ય ખાતું બનાવો',
    identifier: 'ઈમેલ અથવા મોબાઇલ નંબર',
    firstName: 'પ્રથમ નામ',
    lastName: 'છેલ્લું નામ',
    email: 'ઈમેલ (વૈકલ્પિક)',
    phone: 'મોબાઇલ નંબર',
    countryCode: 'દેશ કોડ',
    password: 'પાસવર્ડ',
    mpin: '4 અંકનો MPIN (વૈકલ્પિક)',
    submitSignIn: 'સુરક્ષિત સાઇન ઇન',
    submitSignUp: 'ખાતું બનાવો',
    success: 'તમે સક્ષમ સાથે જોડાયા છો.',
    api: 'બેકએન્ડ',
    switchToSignUp: 'નવા સભ્ય? ખાતું બનાવો',
    switchToSignIn: 'પહેલેથી નોંધાયેલા? સાઇન ઇન',
  },
  kn: {
    chooseLanguage: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    subtitle: 'ಉಳಿತಾಯ ಗುಂಪಿನ ಸದಸ್ಯರು, ಠೇವಣಿ, ಸಾಲ ಮತ್ತು ಖರ್ಚು ನಿರ್ವಹಣೆ.',
    continue: 'ಮುಂದುವರಿಸಿ',
    appName: 'ಸಕ್ಷಮ್ ಬಚತ್‌ಗಟ್',
    signIn: 'ಸೈನ್ ಇನ್',
    signUp: 'ಸೈನ್ ಅಪ್',
    welcome: 'ಮತ್ತೆ ಸ್ವಾಗತ',
    create: 'ಸದಸ್ಯ ಖಾತೆ ರಚಿಸಿ',
    identifier: 'ಇಮೇಲ್ ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    firstName: 'ಮೊದಲ ಹೆಸರು',
    lastName: 'ಕೊನೆಯ ಹೆಸರು',
    email: 'ಇಮೇಲ್ (ಐಚ್ಛಿಕ)',
    phone: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    countryCode: 'ದೇಶ ಕೋಡ್',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    mpin: '4 ಅಂಕಿಯ MPIN (ಐಚ್ಛಿಕ)',
    submitSignIn: 'ಸುರಕ್ಷಿತ ಸೈನ್ ಇನ್',
    submitSignUp: 'ಖಾತೆ ರಚಿಸಿ',
    success: 'ನೀವು ಸಕ್ಷಮ್‌ಗೆ ಸಂಪರ್ಕಗೊಂಡಿದ್ದೀರಿ.',
    api: 'ಬ್ಯಾಕೆಂಡ್',
    switchToSignUp: 'ಹೊಸ ಸದಸ್ಯರಾ? ಖಾತೆ ರಚಿಸಿ',
    switchToSignIn: 'ಈಗಾಗಲೇ ನೋಂದಾಯಿತವೇ? ಸೈನ್ ಇನ್',
  },
  ta: {
    chooseLanguage: 'உங்கள் மொழியை தேர்வு செய்யவும்',
    subtitle: 'சேமிப்பு குழு உறுப்பினர்கள், வைப்பு, கடன் மற்றும் செலவு மேலாண்மை.',
    continue: 'தொடரவும்',
    appName: 'சக்ஷம் பசத்கட்',
    signIn: 'உள்நுழை',
    signUp: 'பதிவு செய்',
    welcome: 'மீண்டும் வரவேற்கிறோம்',
    create: 'உறுப்பினர் கணக்கு உருவாக்கவும்',
    identifier: 'மின்னஞ்சல் அல்லது மொபைல் எண்',
    firstName: 'முதல் பெயர்',
    lastName: 'கடைசி பெயர்',
    email: 'மின்னஞ்சல் (விருப்பம்)',
    phone: 'மொபைல் எண்',
    countryCode: 'நாட்டு குறியீடு',
    password: 'கடவுச்சொல்',
    mpin: '4 இலக்க MPIN (விருப்பம்)',
    submitSignIn: 'பாதுகாப்பாக உள்நுழை',
    submitSignUp: 'கணக்கு உருவாக்கவும்',
    success: 'நீங்கள் சக்ஷமுடன் இணைக்கப்பட்டுள்ளீர்கள்.',
    api: 'பின்தளம்',
    switchToSignUp: 'புதிய உறுப்பினரா? கணக்கு உருவாக்கவும்',
    switchToSignIn: 'ஏற்கனவே பதிவு செய்துள்ளீர்களா? உள்நுழை',
  },
  te: {
    chooseLanguage: 'మీ భాషను ఎంచుకోండి',
    subtitle: 'సేవింగ్స్ గ్రూప్ సభ్యులు, డిపాజిట్లు, రుణాలు మరియు ఖర్చుల నిర్వహణ.',
    continue: 'కొనసాగించండి',
    appName: 'సక్షమ్ బచత్‌గట్',
    signIn: 'సైన్ ఇన్',
    signUp: 'సైన్ అప్',
    welcome: 'మళ్లీ స్వాగతం',
    create: 'సభ్య ఖాతా సృష్టించండి',
    identifier: 'ఇమెయిల్ లేదా మొబైల్ నంబర్',
    firstName: 'మొదటి పేరు',
    lastName: 'చివరి పేరు',
    email: 'ఇమెయిల్ (ఐచ్ఛికం)',
    phone: 'మొబైల్ నంబర్',
    countryCode: 'దేశ కోడ్',
    password: 'పాస్‌వర్డ్',
    mpin: '4 అంకెల MPIN (ఐచ్ఛికం)',
    submitSignIn: 'సురక్షితంగా సైన్ ఇన్',
    submitSignUp: 'ఖాతా సృష్టించండి',
    success: 'మీరు సక్షమ్‌కు కనెక్ట్ అయ్యారు.',
    api: 'బ్యాకెండ్',
    switchToSignUp: 'కొత్త సభ్యులా? ఖాతా సృష్టించండి',
    switchToSignIn: 'ఇప్పటికే నమోదు అయ్యారా? సైన్ ఇన్',
  },
} satisfies Record<LanguageCode, Record<string, string>>;

const initialForm = {
  identifier: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  countryCode: '+91',
  password: '',
  mpin: '',
};

export default function HomeScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | null>(null);
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState('');
  const [session, setSession] = useState<AuthSession | null>(null);

  const t = useMemo(() => copy[selectedLanguage ?? 'en'], [selectedLanguage]);

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function showToast(nextMessage: string) {
    setToast(nextMessage);

    if (Platform.OS === 'android') {
      ToastAndroid.show(nextMessage, ToastAndroid.SHORT);
    }

    setTimeout(() => {
      setToast('');
    }, 3500);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setToast('');
    try {
      const response =
        mode === 'signIn'
          ? await signIn({
              identifier: form.identifier,
              password: form.password,
              countryCode: form.countryCode,
            })
          : await signUp({
              firstName: form.firstName,
              lastName: form.lastName,
              email: form.email,
              phone: form.phone,
              countryCode: form.countryCode,
              password: form.password,
              mpin: form.mpin,
            });
      setSession(response.data);
      showToast(`${t.success} ${response.message}`);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!selectedLanguage) {
    return (
      <SafeAreaView className="flex-1 bg-millet">
        <ScrollView
          className="flex-1"
          contentContainerClassName="grow justify-between gap-8 px-6 py-7"
          showsVerticalScrollIndicator={false}>
          <View>
            <View className="mb-7 h-14 w-14 items-center justify-center rounded-2xl bg-leaf">
              <Text className="text-2xl font-black text-white">S</Text>
            </View>
            <Text className="text-3xl font-black text-ink">{copy.en.chooseLanguage}</Text>
            <Text className="mt-3 text-base leading-6 text-stone-700">{copy.en.subtitle}</Text>
          </View>

          <View className="gap-3">
            {languages.map((language) => (
              <Pressable
                accessibilityRole="button"
                key={language.code}
                onPress={() => setSelectedLanguage(language.code)}
                className="flex-row items-center justify-between rounded-lg border border-stone-200 bg-white px-4 py-4">
                <View>
                  <Text className="text-lg font-bold text-ink">{language.nativeName}</Text>
                  <Text className="mt-1 text-sm text-stone-500">{language.name}</Text>
                </View>
                <Text className="text-xl text-leaf">›</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-millet">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1">
        <ScrollView contentContainerClassName="grow px-5 py-6" keyboardShouldPersistTaps="handled">
          <View className="mb-6 flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-semibold uppercase text-leaf">{t.appName}</Text>
              <Text className="mt-1 text-3xl font-black text-ink">
                {mode === 'signIn' ? t.welcome : t.create}
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => setSelectedLanguage(null)}
              className="rounded-lg border border-stone-200 bg-white px-3 py-2">
              <Text className="font-bold text-leaf">{selectedLanguage.toUpperCase()}</Text>
            </Pressable>
          </View>

          <View className="mb-5 flex-row rounded-lg bg-white p-1">
            {(['signIn', 'signUp'] as AuthMode[]).map((item) => (
              <Pressable
                accessibilityRole="tab"
                key={item}
                onPress={() => {
                  setMode(item);
                  setToast('');
                }}
                className={`flex-1 rounded-md py-3 ${mode === item ? 'bg-leaf' : 'bg-white'}`}>
                <Text
                  className={`text-center font-bold ${
                    mode === item ? 'text-white' : 'text-stone-500'
                  }`}>
                  {item === 'signIn' ? t.signIn : t.signUp}
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="gap-3 rounded-lg border border-stone-200 bg-white p-4">
            {mode === 'signUp' && (
              <View className="flex-row gap-3">
                <Field
                  className="flex-1"
                  label={t.firstName}
                  value={form.firstName}
                  onChangeText={(value) => updateField('firstName', value)}
                />
                <Field
                  className="flex-1"
                  label={t.lastName}
                  value={form.lastName}
                  onChangeText={(value) => updateField('lastName', value)}
                />
              </View>
            )}

            {mode === 'signIn' ? (
              <Field
                label={t.identifier}
                value={form.identifier}
                onChangeText={(value) => updateField('identifier', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <Field
                label={t.email}
                value={form.email}
                onChangeText={(value) => updateField('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}

            {mode === 'signUp' && (
              <View className="flex-row gap-3">
                <Field
                  className="w-24"
                  label={t.countryCode}
                  value={form.countryCode}
                  onChangeText={(value) => updateField('countryCode', value)}
                  keyboardType="phone-pad"
                />
                <Field
                  className="flex-1"
                  label={t.phone}
                  value={form.phone}
                  onChangeText={(value) => updateField('phone', value)}
                  keyboardType="phone-pad"
                />
              </View>
            )}

            <Field
              label={t.password}
              value={form.password}
              onChangeText={(value) => updateField('password', value)}
              secureTextEntry
            />

            {mode === 'signUp' && (
              <Field
                label={t.mpin}
                value={form.mpin}
                onChangeText={(value) => updateField('mpin', value)}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
              />
            )}

            <Pressable
              accessibilityRole="button"
              disabled={isSubmitting}
              onPress={handleSubmit}
              className={`mt-2 h-12 items-center justify-center rounded-lg ${
                isSubmitting ? 'bg-stone-400' : 'bg-leaf'
              }`}>
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="font-black text-white">
                  {mode === 'signIn' ? t.submitSignIn : t.submitSignUp}
                </Text>
              )}
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setMode(mode === 'signIn' ? 'signUp' : 'signIn');
                setToast('');
              }}
              className="items-center py-2">
              <Text className="font-semibold text-leaf">
                {mode === 'signIn' ? t.switchToSignUp : t.switchToSignIn}
              </Text>
            </Pressable>
          </View>

          <Text className="mt-5 text-center text-xs text-stone-500">
            {t.api}: {API_BASE_URL}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {!!toast && Platform.OS !== 'android' && (
        <View className="absolute bottom-24 left-5 right-5 rounded-lg bg-ink px-4 py-3 shadow-lg">
          <Text className="text-sm font-semibold text-white">{toast}</Text>
          {!!session?.expiryTime && (
            <Text className="mt-1 text-xs text-stone-300">Token expiry: {session.expiryTime}</Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

function Field({
  label,
  className = '',
  ...props
}: {
  label: string;
  className?: string;
} & React.ComponentProps<typeof TextInput>) {
  return (
    <View className={className}>
      <Text className="mb-2 text-xs font-bold uppercase text-stone-500">{label}</Text>
      <TextInput
        placeholderTextColor="#A8A29E"
        className="h-12 rounded-lg border border-stone-200 bg-stone-50 px-3 text-base text-ink"
        {...props}
      />
    </View>
  );
}

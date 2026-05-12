import { Stack } from 'expo-router';
import { colors } from '../constants/colors';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="relatorio"
        options={{
          headerShown: true,
          title: 'Relatório da Consulta',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack>
  );
}
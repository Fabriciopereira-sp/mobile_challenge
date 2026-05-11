import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#2ecc71', headerStyle: { backgroundColor: '#f8f9fa' } }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="meu-pet"
        options={{
          title: 'Cadastro',
          tabBarIcon: ({ color }) => <Text style={{ color }}>🐾</Text>,
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color }) => <Text style={{ color }}>📋</Text>,
        }}
      />
      <Tabs.Screen
        name="lembretes"
        options={{
          title: 'Lembretes',
          tabBarIcon: ({ color }) => <Text style={{ color }}>📅</Text>,
        }}
      />
    </Tabs>
  );
}
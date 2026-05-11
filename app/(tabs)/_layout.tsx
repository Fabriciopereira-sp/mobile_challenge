import { Tabs } from 'expo-router';
// @ts-ignore
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#2ecc71', headerStyle: { backgroundColor: '#f8f9fa' } }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="meu-pet"
        options={{
          title: 'Cadastro',
          tabBarIcon: ({ color }) => <Ionicons name="paw" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
        }}
      />
    </Tabs> 
  );
}
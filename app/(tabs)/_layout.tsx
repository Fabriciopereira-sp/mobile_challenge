import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { colors } from '../../constants/colors';

function Icone({ emoji, focado }: { emoji: string; focado: boolean }) {
  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: focado ? colors.primaryLight : 'transparent',
    }}>
      <Text style={{ fontSize: 20 }}>{emoji}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => <Icone emoji="🏠" focado={focused} />,
        }}
      />
      <Tabs.Screen
        name="meu-pet"
        options={{
          title: 'Meu Pet',
          tabBarIcon: ({ focused }) => <Icone emoji="🐾" focado={focused} />,
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ focused }) => <Icone emoji="📋" focado={focused} />,
        }}
      />
      <Tabs.Screen
        name="lembretes"
        options={{
          title: 'Lembretes',
          tabBarIcon: ({ focused }) => <Icone emoji="💉" focado={focused} />,
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ focused }) => <Icone emoji="ℹ️" focado={focused} />,
        }}
      />
    </Tabs>
  );
}
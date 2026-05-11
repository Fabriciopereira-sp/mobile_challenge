import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Lembretes() {
 // Dados mockados para demonstração
  const lembretes = [
    {
      id: 1,
      tipo: 'Vacina',
      titulo: 'Vacina Antirrábica',
      pet: 'Rex',
      data: '15/05/2025',
      status: 'pendente'
    },
    {
      id: 2,
      tipo: 'Consulta',
      titulo: 'Check-up Anual',
      pet: 'Mia',
      data: '20/05/2025',
      status: 'pendente'
    },
    {
      id: 3,
      tipo: 'Medicação',
      titulo: 'Vermífugo',
      pet: 'Totó',
      data: '25/05/2025',
      status: 'agendado'
    },
    {
      id: 4,
      tipo: 'Vacina',
      titulo: 'V10 - 2ª dose',
      pet: 'Luna',
      data: '30/05/2025',
      status: 'pendente'
    },
  ];

  const getIcone = (tipo) => {
    switch(tipo) {
      case 'Vacina': return '💉';
      case 'Consulta': return '🏥';
      case 'Medicação': return '💊';
      default: return '📅';
    }
  };

  const getCorStatus = (status) => {
    switch(status) {
      case 'pendente': return '#ef4444';
      case 'agendado': return '#f59e0b';
      case 'concluido': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📅 Próximos Compromissos</Text>
        <Text style={styles.subtitle}>
          Mantenha a saúde dos seus pets em dia!
        </Text>
      </View>

      {lembretes.map((lembrete) => (
        <View key={lembrete.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.icone}>{getIcone(lembrete.tipo)}</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitulo}>{lembrete.titulo}</Text>
              <Text style={styles.cardPet}>🐾 {lembrete.pet}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: getCorStatus(lembrete.status) }]}>
              <Text style={styles.badgeText}>{lembrete.status}</Text>
            </View>
          </View>
          <Text style={styles.cardData}>📆 {lembrete.data}</Text>
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 Dica: Configure notificações para não esquecer!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  header: {
    padding: 20,
    backgroundColor: '#10b981',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#d1fae5',
  },
  card: {
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icone: {
    fontSize: 32,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#065f46',
  },
  cardPet: {
    fontSize: 14,
    color: '#047857',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardData: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 5,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#047857',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
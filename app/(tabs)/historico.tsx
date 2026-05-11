import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

export default function Historico() {
  const [pet, setPet] = useState<any>(null);

  useFocusEffect(
    React.useCallback(() => {
      const carregar = async () => {
        const dados = await AsyncStorage.getItem('@pet_info');
        if (dados) setPet(JSON.parse(dados));
      };
      carregar();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Pet Cadastrado</Text>
      
      {pet ? (
        <View style={styles.card}>
          <Text style={styles.info}>**Nome:** {pet.nome}</Text>
          <Text style={styles.info}>**Raça:** {pet.raca}</Text>
          <Text style={styles.info}>**Idade:** {pet.idade}</Text>
          <View style={styles.divider} />
          <Text style={styles.subTitle}>Histórico Clínico:</Text>
          <Text style={styles.doencas}>{pet.doencas || "Nenhuma doença registrada."}</Text>
        </View>
      ) : (
        <Text style={styles.empty}>Nenhum animal cadastrado no sistema.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f7' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 4 },
  info: { fontSize: 18, marginBottom: 10, color: '#2c3e50' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  subTitle: { fontSize: 16, fontWeight: 'bold', color: '#e74c3c', marginBottom: 5 },
  doencas: { fontSize: 16, color: '#555', lineHeight: 22 },
  empty: { textAlign: 'center', marginTop: 50, color: '#95a5a6', fontSize: 16 }
});
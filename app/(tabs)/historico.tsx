import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

export default function Historico() {
  const [pet, setPet] = useState<any>(null);

  const carregar = async () => {
    const dados = await AsyncStorage.getItem('@pet_info');
    if (dados) setPet(JSON.parse(dados));
    else setPet(null);
  };

  useFocusEffect(React.useCallback(() => { carregar(); }, []));

  const apagarDados = () => {
    Alert.alert("Aviso", "Deseja apagar a ficha do pet?", [
      { text: "Cancelar" },
      { text: "Sim, apagar", onPress: async () => {
          await AsyncStorage.removeItem('@pet_info');
          carregar();
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      {pet ? (
        <View style={styles.card}>
          <Text style={styles.info}>🐾 {pet.nome}</Text>
          <Text>Espécie: {pet.especie}</Text>
          <Text>Nascimento/Idade: {pet.nascimento}</Text>
          <Text style={styles.doencasTitle}>Histórico:</Text>
          <Text>{pet.doencas || "Nenhum registro."}</Text>
          
          <TouchableOpacity style={styles.btnApagar} onPress={apagarDados}>
            <Text style={styles.btnText}>EXCLUIR FICHA</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.empty}>Nenhum pet cadastrado.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 3 },
  info: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  doencasTitle: { fontWeight: 'bold', marginTop: 15, color: '#e74c3c' },
  btnApagar: { marginTop: 20, backgroundColor: '#ffeded', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#e74c3c' },
  btnText: { color: '#e74c3c', textAlign: 'center', fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' }
});
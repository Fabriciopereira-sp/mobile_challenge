import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroPet() {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [doencas, setDoencas] = useState('');

  const salvarCadastro = async () => {
    if (!nome || !raca || !idade) {
      Alert.alert("Erro", "Preencha pelo menos Nome, Raça e Idade.");
      return;
    }

    const petData = { nome, raca, idade, doencas };

    try {
      await AsyncStorage.setItem('@pet_info', JSON.stringify(petData));
      Alert.alert("Sucesso", "Cadastro do pet realizado!");
    } catch (e) {
      Alert.alert("Erro", "Falha ao salvar os dados.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome do Pet:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Rex" />

      <Text style={styles.label}>Raça:</Text>
      <TextInput style={styles.input} value={raca} onChangeText={setRaca} placeholder="Ex: Labrador" />

      <Text style={styles.label}>Idade:</Text>
      <TextInput style={styles.input} value={idade} onChangeText={setIdade} placeholder="Ex: 3 anos" keyboardType="numeric" />

      <Text style={styles.label}>Histórico de Doenças:</Text>
      <TextInput 
        style={[styles.input, { height: 100 }]} 
        value={doencas} 
        onChangeText={setDoencas} 
        placeholder="Ex: Teve parvovirose em 2024..." 
        multiline 
      />

      <TouchableOpacity style={styles.button} onPress={salvarCadastro}>
        <Text style={styles.buttonText}>CADASTRAR PET</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 15, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginTop: 5, fontSize: 16 },
  button: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 8, marginTop: 30, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});
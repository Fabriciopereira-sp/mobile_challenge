import React, { useState } from 'react';
import { ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroPet() {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState(''); // Mudamos de raça para espécie/raça
  const [nascimento, setNascimento] = useState(''); // Pode ser data ou idade
  const [doencas, setDoencas] = useState('');

  const salvar = async () => {
    if (!nome) return Alert.alert("Erro", "Nome é obrigatório.");
    
    const pet = { nome, especie, nascimento, doencas };
    await AsyncStorage.setItem('@pet_info', JSON.stringify(pet));
    Alert.alert("Sucesso", "Dados do pet salvos!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome do Pet:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Rex" />

      <Text style={styles.label}>Espécie / Raça:</Text>
      <TextInput style={styles.input} value={especie} onChangeText={setEspecie} placeholder="Ex: Gato Persa ou Calopsita" />

      <Text style={styles.label}>Idade ou Data de Nascimento:</Text>
      <TextInput style={styles.input} value={nascimento} onChangeText={setNascimento} placeholder="Ex: 3 anos ou 10/05/2021" />

      <Text style={styles.label}>Histórico Clínico:</Text>
      <TextInput 
        style={[styles.input, { height: 80 }]} 
        value={doencas} 
        onChangeText={setDoencas} 
        multiline 
        placeholder="Descreva doenças ou alergias..."
      />

      <TouchableOpacity style={styles.btnSalvar} onPress={salvar}>
        <Text style={styles.btnText}>SALVAR CADASTRO</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginTop: 5 },
  btnSalvar: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 8, marginTop: 30, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});
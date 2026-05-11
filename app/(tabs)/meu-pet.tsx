import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MeuPet() {
  const [nome, setNome] = useState('');

  const salvarPet = async () => {
    if (!nome) return Alert.alert('Erro', 'Digite o nome do pet');
    try {
      await AsyncStorage.setItem('@pet_name', nome);
      Alert.alert('Sucesso', `O pet ${nome} foi cadastrado!`);
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cadastre seu Pet</Text>
      <TextInput 
        style={styles.input} 
        value={nome} 
        onChangeText={setNome} 
        placeholder="Nome do pet (ex: Luke)"
      />
      <TouchableOpacity style={styles.button} onPress={salvarPet}>
        <Text style={styles.buttonText}>Salvar no Dispositivo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  label: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, marginBottom: 20, borderRadius: 10 },
  button: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
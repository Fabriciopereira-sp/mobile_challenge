import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

export default function Lembretes() {
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [listaLembretes, setListaLembretes] = useState<any[]>([]);

  // Carrega os lembretes do banco toda vez que você abre a aba
  const carregarLembretes = async () => {
    try {
      const valor = await AsyncStorage.getItem('@lembretes_pet');
      if (valor !== null) {
        setListaLembretes(JSON.parse(valor));
      }
    } catch (e) {
      console.error("Erro ao carregar lembretes", e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarLembretes();
    }, [])
  );

  const adicionarLembrete = async () => {
    if (!titulo || !data) {
      return Alert.alert("Erro", "Preencha o nome da vacina e a data.");
    }

    const novoLembrete = {
      id: Math.random().toString(),
      titulo,
      data,
      status: 'pendente'
    };

    const novaLista = [...listaLembretes, novoLembrete];
    setListaLembretes(novaLista);
    await AsyncStorage.setItem('@lembretes_pet', JSON.stringify(novaLista));
    
    setTitulo('');
    setData('');
    Alert.alert("Sucesso", "Lembrete de vacina adicionado!");
  };

  const removerLembrete = async (id: string) => {
    const filtrados = listaLembretes.filter(item => item.id !== id);
    setListaLembretes(filtrados);
    await AsyncStorage.setItem('@lembretes_pet', JSON.stringify(filtrados));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Petrack 📅</Text>
        <Text style={styles.subtitle}>Agende vacinas e remédios</Text>
      </View>

      {/* Formulário de Adição */}
      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Nome da Vacina (ex: V10)" 
          value={titulo} 
          onChangeText={setTitulo} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Data (ex: 20/05)" 
          value={data} 
          onChangeText={setData} 
        />
        <TouchableOpacity style={styles.btnAdicionar} onPress={adicionarLembrete}>
          <Text style={styles.btnText}>+ ADICIONAR AGENDAMENTO</Text>
        </TouchableOpacity>
      </View>

      {/* Lista Funcional */}
      <View style={styles.listaContainer}>
        <Text style={styles.listaTitle}>Próximos Compromissos:</Text>
        {listaLembretes.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum lembrete agendado.</Text>
        ) : (
          listaLembretes.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitulo}>💉 {item.titulo}</Text>
                <Text style={styles.cardData}>Data: {item.data}</Text>
              </View>
              <TouchableOpacity onPress={() => removerLembrete(item.id)}>
                <Text style={styles.btnExcluir}>❌</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 25, backgroundColor: '#2ecc71' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  subtitle: { color: '#e8f5e9', fontSize: 14 },
  form: { padding: 20, backgroundColor: '#fff', margin: 15, borderRadius: 12, elevation: 3 },
  input: { borderBottomWidth: 1, borderColor: '#eee', padding: 10, marginBottom: 15, fontSize: 16 },
  btnAdicionar: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  listaContainer: { padding: 20 },
  listaTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#2c3e50' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 1 },
  cardInfo: { flex: 1 },
  cardTitulo: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  cardData: { color: '#7f8c8d', marginTop: 3 },
  btnExcluir: { padding: 10 },
  emptyText: { textAlign: 'center', color: '#95a5a6', marginTop: 20 }
});
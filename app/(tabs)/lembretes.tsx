import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TextInput, TouchableOpacity, Alert, SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { colors } from '../../constants/colors';

export default function Lembretes() {
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [lista, setLista] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      async function carregar() {
        const salvo = await AsyncStorage.getItem('@lembretes_pet');
        setLista(salvo ? JSON.parse(salvo) : []);
      }
      carregar();
    }, [])
  );

  async function adicionar() {
    if (!titulo.trim() || !data.trim()) {
      return Alert.alert('Atenção', 'Preencha o nome e a data do lembrete.');
    }
    const novo = { id: Date.now().toString(), titulo: titulo.trim(), data: data.trim() };
    const novaLista = [novo, ...lista];
    setLista(novaLista);
    await AsyncStorage.setItem('@lembretes_pet', JSON.stringify(novaLista));
    setTitulo('');
    setData('');
    Alert.alert('✅ Adicionado!', 'Lembrete salvo com sucesso.');
  }

  async function remover(id: string) {
    Alert.alert('Remover', 'Deseja remover este lembrete?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover', style: 'destructive',
        onPress: async () => {
          const nova = lista.filter(i => i.id !== id);
          setLista(nova);
          await AsyncStorage.setItem('@lembretes_pet', JSON.stringify(nova));
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>💉 Lembretes</Text>
        <Text style={styles.headerSub}>Vacinas, remédios e consultas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.formulario}>
          <Text style={styles.formularioTitulo}>Adicionar lembrete</Text>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ex: Vacina V10, Antipulgas..."
            placeholderTextColor={colors.textLight}
          />
          <Text style={styles.label}>Data</Text>
          <TextInput
            style={styles.input}
            value={data}
            onChangeText={setData}
            placeholder="Ex: 20/06/2025"
            placeholderTextColor={colors.textLight}
          />
          <TouchableOpacity style={styles.btnAdicionar} onPress={adicionar}>
            <Text style={styles.btnAdicionarText}>+ Adicionar Lembrete</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.secaoTitulo}>
          Agendamentos ({lista.length})
        </Text>

        {lista.length === 0 ? (
          <View style={styles.vazio}>
            <Text style={styles.vazioEmoji}>📅</Text>
            <Text style={styles.vazioTexto}>Nenhum lembrete cadastrado ainda.</Text>
          </View>
        ) : (
          lista.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardIcone}>
                <Text style={{ fontSize: 22 }}>💉</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitulo}>{item.titulo}</Text>
                <Text style={styles.cardData}>📅 {item.data}</Text>
              </View>
              <TouchableOpacity onPress={() => remover(item.id)} style={styles.btnRemover}>
                <Text style={styles.btnRemoverText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.primary, padding: 20, paddingTop: 50 },
  headerTitulo: { color: colors.white, fontSize: 22, fontWeight: 'bold' },
  headerSub: { color: '#94A3B8', fontSize: 13, marginTop: 4 },
  scroll: { padding: 16, paddingBottom: 30 },
  formulario: { backgroundColor: colors.white, borderRadius: 14, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: colors.border },
  formularioTitulo: { fontSize: 15, fontWeight: 'bold', color: colors.primary, marginBottom: 14, borderLeftWidth: 4, borderLeftColor: colors.primary, paddingLeft: 10 },
  label: { fontSize: 13, fontWeight: '600', color: colors.textLight, marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: colors.background, borderRadius: 10, borderWidth: 1, borderColor: colors.border, padding: 12, fontSize: 15, color: colors.text },
  btnAdicionar: { backgroundColor: colors.primary, borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 16 },
  btnAdicionarText: { color: colors.white, fontWeight: 'bold', fontSize: 15 },
  secaoTitulo: { fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 12 },
  vazio: { alignItems: 'center', paddingTop: 30 },
  vazioEmoji: { fontSize: 48, marginBottom: 10 },
  vazioTexto: { color: colors.textLight, fontSize: 15 },
  card: { backgroundColor: colors.white, borderRadius: 12, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: colors.border, elevation: 1 },
  cardIcone: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  cardTitulo: { fontSize: 15, fontWeight: '600', color: colors.text },
  cardData: { fontSize: 13, color: colors.textLight, marginTop: 3 },
  btnRemover: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.dangerLight, alignItems: 'center', justifyContent: 'center' },
  btnRemoverText: { color: colors.danger, fontWeight: 'bold', fontSize: 14 },
});
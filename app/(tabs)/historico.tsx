import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert, SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { colors } from '../../constants/colors';

export default function Historico() {
  const router = useRouter();
  const [lista, setLista] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      async function carregar() {
        const h = await AsyncStorage.getItem('@historico_consultas');
        setLista(h ? JSON.parse(h) : []);
      }
      carregar();
    }, [])
  );

  async function limpar() {
    Alert.alert('Limpar histórico', 'Deseja apagar todas as consultas?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Apagar tudo', style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('@historico_consultas');
          setLista([]);
        },
      },
    ]);
  }

  const statusInfo: Record<string, { cor: string; label: string; emoji: string }> = {
    pendente: { cor: colors.warning, label: 'Aguardando veterinário', emoji: '⏳' },
    respondido: { cor: colors.accent, label: 'Veterinário respondeu', emoji: '✅' },
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>📋 Histórico</Text>
        <Text style={styles.headerSub}>{lista.length} consulta(s) registrada(s)</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {lista.length === 0 ? (
          <View style={styles.vazio}>
            <Text style={styles.vazioEmoji}>📭</Text>
            <Text style={styles.vazioTitulo}>Nenhuma consulta ainda</Text>
            <Text style={styles.vazioDesc}>Vá em "Meu Pet" e gere seu primeiro relatório.</Text>
            <TouchableOpacity style={styles.btnIr} onPress={() => router.push('/(tabs)/meu-pet')}>
              <Text style={styles.btnIrText}>Ir para Meu Pet</Text>
            </TouchableOpacity>
          </View>
        ) : (
          lista.map((item) => {
            const st = statusInfo[item.status] || statusInfo.pendente;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, { borderLeftColor: st.cor }]}
                onPress={() => router.push({ pathname: '/relatorio', params: { data: JSON.stringify(item) } })}
                activeOpacity={0.8}
              >
                <View style={styles.cardTopo}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardNome}>🐾 {item.pet?.nome}</Text>
                    <Text style={styles.cardEspecie}>{item.pet?.especie}{item.pet?.raca ? ` · ${item.pet.raca}` : ''}</Text>
                    <Text style={styles.cardData}>{item.data}</Text>
                  </View>
                  <Text style={{ fontSize: 28 }}>{st.emoji}</Text>
                </View>
                <Text style={styles.cardSintomas} numberOfLines={2}>{item.sintomas}</Text>
                <View style={[styles.statusBadge, { backgroundColor: st.cor + '20', borderColor: st.cor }]}>
                  <Text style={[styles.statusTexto, { color: st.cor }]}>{st.label}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}

        {lista.length > 0 && (
          <TouchableOpacity style={styles.btnLimpar} onPress={limpar}>
            <Text style={styles.btnLimparText}>🗑 Limpar histórico</Text>
          </TouchableOpacity>
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
  vazio: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 30 },
  vazioEmoji: { fontSize: 56, marginBottom: 12 },
  vazioTitulo: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  vazioDesc: { fontSize: 14, color: colors.textLight, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  btnIr: { backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 24 },
  btnIrText: { color: colors.white, fontWeight: 'bold', fontSize: 15 },
  card: { backgroundColor: colors.white, borderRadius: 14, padding: 16, marginBottom: 12, borderLeftWidth: 4, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 } },
  cardTopo: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  cardNome: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  cardEspecie: { fontSize: 13, color: colors.textLight, marginTop: 2 },
  cardData: { fontSize: 12, color: colors.textLight, marginTop: 2 },
  cardSintomas: { fontSize: 13, color: colors.text, lineHeight: 18, marginBottom: 10 },
  statusBadge: { borderRadius: 6, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  statusTexto: { fontSize: 12, fontWeight: '600' },
  btnLimpar: { borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 8, borderWidth: 1, borderColor: colors.danger },
  btnLimparText: { color: colors.danger, fontWeight: '600', fontSize: 15 },
});
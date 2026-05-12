import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../constants/colors';

export default function Relatorio() {
  const router = useRouter();
  const { data } = useLocalSearchParams();
  const relatorio = JSON.parse(data as string);
  const { pet } = relatorio;

  const [modoVet, setModoVet] = useState(false);
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamento, setTratamento] = useState('');
  const [retorno, setRetorno] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function salvarResposta() {
    if (!diagnostico.trim() || !tratamento.trim()) {
      return Alert.alert('Atenção', 'Preencha o diagnóstico e o tratamento.');
    }
    setSalvando(true);
    const resposta = {
      diagnostico: diagnostico.trim(),
      tratamento: tratamento.trim(),
      retorno: retorno.trim(),
      data: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      }),
    };
    const hist = await AsyncStorage.getItem('@historico_consultas');
    const lista: any[] = hist ? JSON.parse(hist) : [];
    const atualizado = lista.map(i =>
      i.id === relatorio.id ? { ...i, status: 'respondido', respostaVet: resposta } : i
    );
    await AsyncStorage.setItem('@historico_consultas', JSON.stringify(atualizado));
    setSalvando(false);
    Alert.alert('✅ Resposta enviada!', 'O tutor pode ver o retorno no histórico.', [
      { text: 'OK', onPress: () => router.push('/(tabs)/historico') },
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>

      <View style={[styles.statusCard, {
        backgroundColor: relatorio.status === 'respondido' ? colors.accentLight : colors.warningLight,
        borderColor: relatorio.status === 'respondido' ? colors.accent : colors.warning,
      }]}>
        <Text style={styles.statusEmoji}>{relatorio.status === 'respondido' ? '✅' : '⏳'}</Text>
        <View>
          <Text style={[styles.statusLabel, { color: relatorio.status === 'respondido' ? colors.accent : colors.warning }]}>
            {relatorio.status === 'respondido' ? 'Veterinário respondeu' : 'Aguardando veterinário'}
          </Text>
          <Text style={styles.statusData}>{relatorio.data}</Text>
        </View>
      </View>

      <Secao titulo="🐾 Dados do Pet">
        <InfoLinha label="Nome" valor={pet.nome} />
        <InfoLinha label="Espécie" valor={pet.especie} />
        {pet.raca ? <InfoLinha label="Raça" valor={pet.raca} /> : null}
        {pet.idade ? <InfoLinha label="Idade" valor={`${pet.idade} anos`} /> : null}
        {pet.peso ? <InfoLinha label="Peso" valor={`${pet.peso} kg`} /> : null}
        <InfoLinha label="Castrado(a)" valor={pet.castrado ? 'Sim' : 'Não'} />
      </Secao>

      <Secao titulo="🏥 Histórico Médico">
        <InfoLinha label="Doenças" valor={pet.doencas || 'Nenhuma informada'} />
        <InfoLinha label="Medicamentos" valor={pet.medicamentos || 'Nenhum em uso'} />
        <InfoLinha label="Alergias" valor={pet.alergias || 'Nenhuma conhecida'} />
      </Secao>

      {pet.vacinas && pet.vacinas.length > 0 && (
        <Secao titulo="💉 Vacinas Aplicadas">
          {pet.vacinas.map((v: string) => (
            <Text key={v} style={styles.vacinaItem}>✅ {v}</Text>
          ))}
        </Secao>
      )}

      <Secao titulo="🩺 Motivo da Consulta">
        <Text style={styles.sintomasTexto}>{relatorio.sintomas}</Text>
        {relatorio.observacoes ? (
          <View style={styles.obsBox}>
            <Text style={styles.obsLabel}>Observações:</Text>
            <Text style={styles.obsTexto}>{relatorio.observacoes}</Text>
          </View>
        ) : null}
      </Secao>

      {relatorio.respostaVet ? (
        <Secao titulo="🩺 Resposta do Veterinário">
          <InfoLinha label="Diagnóstico" valor={relatorio.respostaVet.diagnostico} />
          <InfoLinha label="Tratamento" valor={relatorio.respostaVet.tratamento} />
          {relatorio.respostaVet.retorno ? <InfoLinha label="Retorno" valor={relatorio.respostaVet.retorno} /> : null}
          <Text style={styles.respostaData}>Respondido em: {relatorio.respostaVet.data}</Text>
        </Secao>
      ) : (
        <>
          {!modoVet ? (
            <TouchableOpacity style={styles.btnVet} onPress={() => setModoVet(true)}>
              <Text style={styles.btnVetText}>🩺 Sou veterinário — Responder</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.formularioVet}>
              <Text style={styles.formularioTitulo}>Resposta do Veterinário</Text>
              <Text style={styles.label}>Diagnóstico *</Text>
              <TextInput style={[styles.input, styles.area]} value={diagnostico} onChangeText={setDiagnostico}
                placeholder="Descreva o diagnóstico..." placeholderTextColor={colors.textLight} multiline numberOfLines={3} />
              <Text style={styles.label}>Tratamento / Prescrição *</Text>
              <TextInput style={[styles.input, styles.area]} value={tratamento} onChangeText={setTratamento}
                placeholder="Medicamentos, dosagens, cuidados..." placeholderTextColor={colors.textLight} multiline numberOfLines={3} />
              <Text style={styles.label}>Data de retorno</Text>
              <TextInput style={styles.input} value={retorno} onChangeText={setRetorno}
                placeholder="Ex: Em 15 dias..." placeholderTextColor={colors.textLight} />
              <TouchableOpacity style={[styles.btnEnviar, salvando && { opacity: 0.6 }]}
                onPress={salvarResposta} disabled={salvando}>
                <Text style={styles.btnEnviarText}>{salvando ? 'Enviando...' : '✅ Enviar Resposta'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModoVet(false)} style={{ marginTop: 10, alignItems: 'center' }}>
                <Text style={{ color: colors.textLight }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      <TouchableOpacity style={styles.btnVoltar} onPress={() => router.push('/(tabs)/historico')}>
        <Text style={styles.btnVoltarText}>← Voltar ao Histórico</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <View style={styles.secao}>
      <Text style={styles.secaoTitulo}>{titulo}</Text>
      {children}
    </View>
  );
}

function InfoLinha({ label, valor }: { label: string; valor: string }) {
  return (
    <View style={styles.infoLinha}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 16, paddingBottom: 40 },
  statusCard: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 14 },
  statusEmoji: { fontSize: 30 },
  statusLabel: { fontSize: 15, fontWeight: 'bold' },
  statusData: { fontSize: 12, color: colors.textLight, marginTop: 2 },
  secao: { backgroundColor: colors.white, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  secaoTitulo: { fontSize: 15, fontWeight: 'bold', color: colors.primary, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: colors.primary, paddingLeft: 10 },
  infoLinha: { marginBottom: 10 },
  infoLabel: { fontSize: 12, color: colors.textLight, fontWeight: '600', textTransform: 'uppercase' },
  infoValor: { fontSize: 15, color: colors.text, marginTop: 2 },
  vacinaItem: { fontSize: 14, color: colors.accent, marginBottom: 4 },
  sintomasTexto: { fontSize: 15, color: colors.text, lineHeight: 24 },
  obsBox: { backgroundColor: colors.background, borderRadius: 8, padding: 12, marginTop: 10 },
  obsLabel: { fontSize: 12, color: colors.textLight, fontWeight: '600', marginBottom: 4 },
  obsTexto: { fontSize: 14, color: colors.text },
  respostaData: { fontSize: 12, color: colors.textLight, marginTop: 8, fontStyle: 'italic' },
  btnVet: { backgroundColor: colors.accent, borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 12, elevation: 4 },
  btnVetText: { color: colors.white, fontWeight: 'bold', fontSize: 15 },
  formularioVet: { backgroundColor: colors.white, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  formularioTitulo: { fontSize: 15, fontWeight: 'bold', color: colors.primary, marginBottom: 14, borderLeftWidth: 4, borderLeftColor: colors.accent, paddingLeft: 10 },
  label: { fontSize: 13, fontWeight: '600', color: colors.textLight, marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: colors.background, borderRadius: 10, borderWidth: 1, borderColor: colors.border, padding: 12, fontSize: 15, color: colors.text },
  area: { height: 90, textAlignVertical: 'top', paddingTop: 12 },
  btnEnviar: { backgroundColor: colors.accent, borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 16 },
  btnEnviarText: { color: colors.white, fontWeight: 'bold', fontSize: 15 },
  btnVoltar: { padding: 14, alignItems: 'center' },
  btnVoltarText: { color: colors.textLight, fontSize: 15 },
});
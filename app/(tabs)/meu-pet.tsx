import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TextInput, TouchableOpacity, Alert, SafeAreaView, Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/colors';

const ESPECIES = ['Cão', 'Gato', 'Pássaro', 'Coelho', 'Outro'];
const VACINAS = ['Antirrábica', 'V8/V10', 'Gripe (Bordetella)', 'Tríplice Felina', 'Giardia', 'Leishmaniose'];

export default function MeuPet() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [doencas, setDoencas] = useState('');
  const [medicamentos, setMedicamentos] = useState('');
  const [alergias, setAlergias] = useState('');
  const [castrado, setCastrado] = useState(false);
  const [vacinas, setVacinas] = useState<string[]>([]);
  const [sintomas, setSintomas] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregar() {
      const salvo = await AsyncStorage.getItem('@pet_info');
      if (salvo) {
        const d = JSON.parse(salvo);
        setNome(d.nome || '');
        setEspecie(d.especie || '');
        setRaca(d.raca || '');
        setIdade(d.idade || '');
        setPeso(d.peso || '');
        setDoencas(d.doencas || '');
        setMedicamentos(d.medicamentos || '');
        setAlergias(d.alergias || '');
        setCastrado(d.castrado || false);
        setVacinas(d.vacinas || []);
      }
    }
    carregar();
  }, []);

  function toggleVacina(v: string) {
    setVacinas(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  }

  async function salvar() {
    if (!nome.trim() || !especie) {
      return Alert.alert('Atenção', 'Nome e espécie são obrigatórios.');
    }
    setSalvando(true);
    const dados = { nome: nome.trim(), especie, raca, idade, peso, doencas, medicamentos, alergias, castrado, vacinas };
    await AsyncStorage.setItem('@pet_info', JSON.stringify(dados));
    setSalvando(false);
    Alert.alert('✅ Salvo!', 'Dados do pet salvos com sucesso.');
  }

  async function gerarRelatorio() {
    if (!nome.trim()) return Alert.alert('Atenção', 'Salve os dados do pet primeiro.');
    if (!sintomas.trim()) return Alert.alert('Atenção', 'Descreva os sintomas ou motivo da consulta.');

    const pet = { nome, especie, raca, idade, peso, doencas, medicamentos, alergias, castrado, vacinas };
    const relatorio = {
      id: Date.now().toString(),
      pet,
      sintomas: sintomas.trim(),
      observacoes: observacoes.trim(),
      status: 'pendente',
      respostaVet: null,
      data: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      }),
    };

    const hist = await AsyncStorage.getItem('@historico_consultas');
    const lista = hist ? JSON.parse(hist) : [];
    lista.unshift(relatorio);
    await AsyncStorage.setItem('@historico_consultas', JSON.stringify(lista));

    setSintomas('');
    setObservacoes('');
    router.push({ pathname: '/relatorio', params: { data: JSON.stringify(relatorio) } });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.headerTitulo}>🐾 Meu Pet</Text>
          <Text style={styles.headerSub}>Cadastro e envio para o veterinário</Text>
        </View>

        <Secao titulo="📌 Identificação">
          <Campo label="Nome do pet *">
            <TextInput style={styles.input} value={nome} onChangeText={setNome}
              placeholder="Ex: Rex" placeholderTextColor={colors.textLight} />
          </Campo>

          <Campo label="Espécie *">
            <View style={styles.chips}>
              {ESPECIES.map(e => (
                <TouchableOpacity key={e} onPress={() => setEspecie(e)}
                  style={[styles.chip, especie === e && styles.chipAtivo]}>
                  <Text style={[styles.chipText, especie === e && styles.chipTextAtivo]}>{e}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Campo>

          <Campo label="Raça">
            <TextInput style={styles.input} value={raca} onChangeText={setRaca}
              placeholder="Ex: Golden Retriever, SRD" placeholderTextColor={colors.textLight} />
          </Campo>

          <View style={styles.linha}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Campo label="Idade (anos)">
                <TextInput style={styles.input} value={idade} onChangeText={setIdade}
                  placeholder="Ex: 3" keyboardType="numeric" placeholderTextColor={colors.textLight} />
              </Campo>
            </View>
            <View style={{ flex: 1 }}>
              <Campo label="Peso (kg)">
                <TextInput style={styles.input} value={peso} onChangeText={setPeso}
                  placeholder="Ex: 8.5" keyboardType="decimal-pad" placeholderTextColor={colors.textLight} />
              </Campo>
            </View>
          </View>

          <View style={styles.switchLinha}>
            <Text style={styles.switchLabel}>Castrado(a)?</Text>
            <Switch value={castrado} onValueChange={setCastrado}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor={colors.white} />
          </View>
        </Secao>

        <Secao titulo="🏥 Histórico Médico">
          <Campo label="Doenças anteriores ou crônicas">
            <TextInput style={[styles.input, styles.area]} value={doencas} onChangeText={setDoencas}
              placeholder="Ex: Diabetes, Displasia..." placeholderTextColor={colors.textLight}
              multiline numberOfLines={3} />
          </Campo>
          <Campo label="Medicamentos em uso">
            <TextInput style={[styles.input, styles.area]} value={medicamentos} onChangeText={setMedicamentos}
              placeholder="Ex: Insulina 2x/dia..." placeholderTextColor={colors.textLight}
              multiline numberOfLines={3} />
          </Campo>
          <Campo label="Alergias conhecidas">
            <TextInput style={styles.input} value={alergias} onChangeText={setAlergias}
              placeholder="Ex: Frango, Penicilina" placeholderTextColor={colors.textLight} />
          </Campo>
        </Secao>

        <Secao titulo="💉 Vacinas Aplicadas">
          <Text style={styles.dica}>Selecione as vacinas que já foram aplicadas:</Text>
          {VACINAS.map(v => (
            <TouchableOpacity key={v} onPress={() => toggleVacina(v)}
              style={[styles.vacinaItem, vacinas.includes(v) && styles.vacinaItemAtivo]}>
              <Text style={styles.vacinaCheck}>{vacinas.includes(v) ? '✅' : '⬜'}</Text>
              <Text style={[styles.vacinaTexto, vacinas.includes(v) && { color: colors.accent, fontWeight: '600' }]}>{v}</Text>
            </TouchableOpacity>
          ))}
        </Secao>

        <TouchableOpacity style={[styles.btnSalvar, salvando && { opacity: 0.6 }]}
          onPress={salvar} disabled={salvando}>
          <Text style={styles.btnSalvarText}>{salvando ? 'Salvando...' : '💾 Salvar dados do pet'}</Text>
        </TouchableOpacity>

        <Secao titulo="🩺 Consulta Atual">
          <Text style={styles.dica}>Descreva o motivo da consulta de hoje para enviar ao veterinário:</Text>
          <Campo label="Sintomas / Motivo *">
            <TextInput style={[styles.input, styles.areaGrande]} value={sintomas} onChangeText={setSintomas}
              placeholder="Descreva o que seu pet está sentindo, há quanto tempo..." placeholderTextColor={colors.textLight}
              multiline numberOfLines={4} />
          </Campo>
          <Campo label="Observações adicionais">
            <TextInput style={[styles.input, styles.area]} value={observacoes} onChangeText={setObservacoes}
              placeholder="Qualquer outra informação relevante..." placeholderTextColor={colors.textLight}
              multiline numberOfLines={3} />
          </Campo>
        </Secao>

        <TouchableOpacity style={styles.btnRelatorio} onPress={gerarRelatorio}>
          <Text style={styles.btnRelatorioText}>📋 Gerar Relatório para o Veterinário</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <View style={styles.secao}>
      <View style={styles.secaoHeader}>
        <Text style={styles.secaoTitulo}>{titulo}</Text>
      </View>
      {children}
    </View>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.campo}>
      <Text style={styles.campoLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20, paddingBottom: 40 },
  header: { backgroundColor: colors.primary, borderRadius: 16, padding: 20, marginBottom: 16 },
  headerTitulo: { color: colors.white, fontSize: 22, fontWeight: 'bold' },
  headerSub: { color: '#94A3B8', fontSize: 13, marginTop: 4 },
  secao: { backgroundColor: colors.white, borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: colors.border },
  secaoHeader: { borderLeftWidth: 4, borderLeftColor: colors.primary, paddingLeft: 10, marginBottom: 14 },
  secaoTitulo: { fontSize: 15, fontWeight: 'bold', color: colors.primary },
  campo: { marginBottom: 12 },
  campoLabel: { fontSize: 13, fontWeight: '600', color: colors.textLight, marginBottom: 6 },
  input: { backgroundColor: colors.background, borderRadius: 10, borderWidth: 1, borderColor: colors.border, padding: 12, fontSize: 15, color: colors.text },
  area: { height: 80, textAlignVertical: 'top', paddingTop: 12 },
  areaGrande: { height: 100, textAlignVertical: 'top', paddingTop: 12 },
  linha: { flexDirection: 'row' },
  switchLinha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  switchLabel: { fontSize: 15, color: colors.text, fontWeight: '600' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderRadius: 20, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 8, backgroundColor: colors.white },
  chipAtivo: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.textLight, fontSize: 14 },
  chipTextAtivo: { color: colors.white, fontWeight: '600' },
  dica: { fontSize: 13, color: colors.textLight, marginBottom: 10 },
  vacinaItem: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.background, borderRadius: 8, borderWidth: 1, borderColor: colors.border, padding: 12, marginBottom: 6 },
  vacinaItemAtivo: { borderColor: colors.accent, backgroundColor: colors.accentLight },
  vacinaCheck: { fontSize: 18 },
  vacinaTexto: { fontSize: 14, color: colors.textLight },
  btnSalvar: { backgroundColor: colors.accentLight, borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: colors.accent },
  btnSalvarText: { color: colors.accent, fontWeight: 'bold', fontSize: 15 },
  btnRelatorio: { backgroundColor: colors.primary, borderRadius: 14, padding: 16, alignItems: 'center', elevation: 4, shadowColor: colors.primary, shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 } },
  btnRelatorioText: { color: colors.white, fontWeight: 'bold', fontSize: 16 },
});
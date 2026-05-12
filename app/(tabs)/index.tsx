import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, TextInput, Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/colors';

export default function Home() {
  const router = useRouter();
  const [logado, setLogado] = useState(false);
  const [cadastrando, setCadastrando] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [petNome, setPetNome] = useState('');
  const [totalLembretes, setTotalLembretes] = useState(0);

  useEffect(() => {
    async function verificar() {
      const usuario = await AsyncStorage.getItem('@usuario');
      if (usuario) {
        const dados = JSON.parse(usuario);
        setNome(dados.nome);
        setLogado(true);
      }
      const pet = await AsyncStorage.getItem('@pet_info');
      if (pet) setPetNome(JSON.parse(pet).nome);
      const lemb = await AsyncStorage.getItem('@lembretes_pet');
      if (lemb) setTotalLembretes(JSON.parse(lemb).length);
    }
    verificar();
  }, []);

  async function entrar() {
    if (cadastrando && !nome.trim()) {
      return Alert.alert('Atenção', 'Digite seu nome.');
    }
    if (!email.includes('@') || senha.length < 6) {
      return Alert.alert('Atenção', 'E-mail válido e senha com mínimo 6 caracteres.');
    }
    await AsyncStorage.setItem('@usuario', JSON.stringify({ nome: nome.trim(), email }));
    setLogado(true);
  }

  async function sair() {
    await AsyncStorage.removeItem('@usuario');
    setNome('');
    setEmail('');
    setSenha('');
    setLogado(false);
  }

  if (!logado) {
    return (
      <SafeAreaView style={styles.safeLogin}>
        <ScrollView contentContainerStyle={styles.loginScroll}>
          <View style={styles.loginHeader}>
            <Text style={styles.loginLogo}>🐾</Text>
            <Text style={styles.loginTitulo}>CLYVO VET</Text>
            <Text style={styles.loginSub}>
              {cadastrando ? 'Crie sua conta' : 'Bem-vindo de volta'}
            </Text>
          </View>

          <View style={styles.loginCard}>
            {cadastrando && (
              <>
                <Text style={styles.inputLabel}>Nome completo</Text>
                <TextInput
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                  placeholder="Seu nome"
                  placeholderTextColor={colors.textLight}
                />
              </>
            )}
            <Text style={styles.inputLabel}>E-mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.textLight}
            />
            <Text style={styles.inputLabel}>Senha</Text>
            <TextInput
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
              placeholderTextColor={colors.textLight}
            />
            <TouchableOpacity style={styles.btnLogin} onPress={entrar}>
              <Text style={styles.btnLoginText}>
                {cadastrando ? 'Criar conta' : 'Entrar'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCadastrando(!cadastrando)}>
              <Text style={styles.switchText}>
                {cadastrando
                  ? 'Já tem conta? Entrar'
                  : 'Não tem conta? Cadastrar'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View>
            <Text style={styles.headerOla}>Olá, {nome.split(' ')[0]}! 👋</Text>
            <Text style={styles.headerSub}>Bem-vindo ao CLYVO VET</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarLetra}>{nome.charAt(0).toUpperCase()}</Text>
          </View>
        </View>

        {petNome ? (
          <View style={styles.petCard}>
            <Text style={styles.petCardIcon}>🐾</Text>
            <View>
              <Text style={styles.petCardLabel}>Pet cadastrado</Text>
              <Text style={styles.petCardNome}>{petNome}</Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.petCardVazio}
            onPress={() => router.push('/(tabs)/meu-pet')}
          >
            <Text style={styles.petCardVazioText}>➕ Cadastre seu pet para começar</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.secaoTitulo}>Acesso rápido</Text>

        <View style={styles.grade}>
          {[
            { emoji: '🐾', titulo: 'Cadastrar Pet', desc: 'Dados e histórico', rota: '/(tabs)/meu-pet', cor: colors.primary },
            { emoji: '📋', titulo: 'Histórico', desc: 'Consultas salvas', rota: '/(tabs)/historico', cor: colors.accent },
            { emoji: '💉', titulo: 'Lembretes', desc: `${totalLembretes} agendado(s)`, rota: '/(tabs)/lembretes', cor: colors.warning },
            { emoji: 'ℹ️', titulo: 'Sobre', desc: 'O app e a equipe', rota: '/(tabs)/sobre', cor: '#8E44AD' },
          ].map((item) => (
            <TouchableOpacity
              key={item.rota}
              style={[styles.gradeItem, { borderTopColor: item.cor }]}
              onPress={() => router.push(item.rota as any)}
              activeOpacity={0.8}
            >
              <Text style={styles.gradeEmoji}>{item.emoji}</Text>
              <Text style={styles.gradeTitulo}>{item.titulo}</Text>
              <Text style={styles.gradeDesc}>{item.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.avisoCard}>
          <Text style={styles.avisoTitulo}>⚠️ Aviso importante</Text>
          <Text style={styles.avisoTexto}>
            Em emergências, leve seu pet ao veterinário imediatamente.
            Este app facilita a comunicação, mas não substitui atendimento presencial.
          </Text>
        </View>

        <TouchableOpacity style={styles.btnSair} onPress={sair}>
          <Text style={styles.btnSairText}>Sair da conta</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeLogin: { flex: 1, backgroundColor: colors.primary },
  loginScroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  loginHeader: { alignItems: 'center', marginBottom: 32 },
  loginLogo: { fontSize: 56, marginBottom: 8 },
  loginTitulo: { fontSize: 32, fontWeight: 'bold', color: colors.white },
  loginSub: { fontSize: 15, color: '#CBD5E1', marginTop: 4 },
  loginCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
  },
  inputLabel: { fontSize: 13, fontWeight: '600', color: colors.textLight, marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: colors.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    fontSize: 15,
    color: colors.text,
  },
  btnLogin: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  btnLoginText: { color: colors.white, fontWeight: 'bold', fontSize: 16 },
  switchText: { textAlign: 'center', marginTop: 16, color: colors.primary, fontWeight: '600' },
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20, paddingBottom: 30 },
  header: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerOla: { color: colors.white, fontSize: 22, fontWeight: 'bold' },
  headerSub: { color: '#94A3B8', fontSize: 13, marginTop: 4 },
  avatarCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarLetra: { color: colors.white, fontSize: 22, fontWeight: 'bold' },
  petCard: {
    backgroundColor: colors.accentLight,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.accent,
    marginBottom: 20,
  },
  petCardIcon: { fontSize: 28 },
  petCardLabel: { fontSize: 12, color: colors.accent, fontWeight: '600' },
  petCardNome: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  petCardVazio: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  petCardVazioText: { color: colors.textLight, fontSize: 15 },
  secaoTitulo: { fontSize: 17, fontWeight: 'bold', color: colors.text, marginBottom: 12 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  gradeItem: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    width: '47%',
    borderTopWidth: 3,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  gradeEmoji: { fontSize: 26, marginBottom: 8 },
  gradeTitulo: { fontSize: 14, fontWeight: 'bold', color: colors.text },
  gradeDesc: { fontSize: 12, color: colors.textLight, marginTop: 2 },
  avisoCard: {
    backgroundColor: colors.warningLight,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.warning,
    marginBottom: 16,
  },
  avisoTitulo: { fontWeight: 'bold', color: '#7D6608', marginBottom: 6 },
  avisoTexto: { color: '#7D6608', fontSize: 13, lineHeight: 20 },
  btnSair: {
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.danger,
  },
  btnSairText: { color: colors.danger, fontWeight: '600', fontSize: 15 },
});
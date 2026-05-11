import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function Home() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [estaLogado, setEstaLogado] = useState(false);
  const [modoCadastro, setModoCadastro] = useState(true);

  const gerenciarAcesso = () => {
    if (modoCadastro && !nomeUsuario) {
      return Alert.alert("Erro", "Por favor, digite seu nome.");
    }
    if (!email.includes('@') || senha.length < 6) {
      return Alert.alert("Erro", "E-mail válido e senha de no mínimo 6 dígitos são obrigatórios.");
    }
    setEstaLogado(true);
  };

  if (estaLogado) {
    return (
      <View style={styles.containerLogado}>
        <View style={styles.content}>
          <Text style={styles.logoTipo}>Petrack 🐾</Text>
          
          <View style={styles.welcomeBox}>
            <Text style={styles.welcomeTitle}>Olá, {nomeUsuario}!</Text>
            <Text style={styles.headerSubtitle}>Seu painel Petrack está pronto.</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Navegue pelas abas abaixo para gerenciar a saúde e o histórico dos seus pets de forma simplificada.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btnSair} onPress={() => setEstaLogado(false)}>
          <Text style={styles.btnSairText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logoPrincipal}>Petrack 🐾</Text>
      <Text style={styles.subtitle}>{modoCadastro ? 'Crie sua conta' : 'Acesse seu perfil'}</Text>
      
      {modoCadastro && (
        <TextInput 
          style={styles.input} 
          placeholder="Seu Nome Completo" 
          value={nomeUsuario} 
          onChangeText={setNomeUsuario} 
        />
      )}
      
      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        value={senha} 
        onChangeText={setSenha} 
        secureTextEntry 
      />

      <TouchableOpacity style={styles.btnPrincipal} onPress={gerenciarAcesso}>
        <Text style={styles.btnText}>{modoCadastro ? 'CADASTRAR' : 'ENTRAR'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModoCadastro(!modoCadastro)}>
        <Text style={styles.switchText}>
          {modoCadastro ? 'Já possui conta? Entrar' : 'Novo por aqui? Cadastre-se'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Telas de Login/Cadastro
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#fff' },
  logoPrincipal: { fontSize: 42, fontWeight: 'bold', color: '#2ecc71', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#7f8c8d', marginBottom: 40, textAlign: 'center' },
  input: { backgroundColor: '#f8f9fa', padding: 18, borderRadius: 12, marginBottom: 15, fontSize: 16, borderWidth: 1, borderColor: '#eee' },
  btnPrincipal: { backgroundColor: '#2ecc71', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10, elevation: 2 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  switchText: { textAlign: 'center', marginTop: 25, color: '#3498db', fontWeight: '600' },

  // Tela Logada (Home Real)
  containerLogado: { flex: 1, backgroundColor: '#fcfcfc', padding: 25, justifyContent: 'space-between' },
  content: { marginTop: 60, alignItems: 'center' },
  logoTipo: { fontSize: 24, fontWeight: 'bold', color: '#2ecc71', marginBottom: 40 },
  welcomeBox: { width: '100%', alignItems: 'flex-start', marginBottom: 30 },
  welcomeTitle: { fontSize: 32, fontWeight: 'bold', color: '#2c3e50' },
  headerSubtitle: { fontSize: 18, color: '#95a5a6', marginTop: 8 },
  infoCard: { backgroundColor: '#fff', padding: 25, borderRadius: 20, width: '100%', elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, borderLeftWidth: 5, borderLeftColor: '#2ecc71' },
  infoText: { fontSize: 16, color: '#7f8c8d', lineHeight: 24, textAlign: 'left' },
  btnSair: { marginBottom: 40, padding: 18, alignItems: 'center', borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e74c3c' },
  btnSairText: { color: '#e74c3c', fontWeight: 'bold', fontSize: 16 }
});
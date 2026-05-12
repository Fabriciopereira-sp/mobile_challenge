import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { colors } from '../../constants/colors';

export default function Sobre() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>ℹ️ Sobre</Text>
        <Text style={styles.headerSub}>CLYVO VET · FIAP Challenge 2026</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.logoCard}>
          <Text style={styles.logoEmoji}>🐾</Text>
          <Text style={styles.logoNome}>CLYVO VET</Text>
          <Text style={styles.logoSub}>Conectando tutores e veterinários</Text>
          <Text style={styles.logoVersao}>v1.0.0 · FIAP ADS 2026</Text>
        </View>

        <Card titulo="💡 O que é o app?">
          Plataforma digital que conecta tutores de pets a veterinários.
          O tutor cadastra o pet com histórico completo, descreve os sintomas
          e gera um relatório. O veterinário visualiza e responde com diagnóstico
          e tratamento — tudo salvo localmente no aparelho.
        </Card>

        <Card titulo="📱 Funcionalidades">
          {`• Cadastro completo do pet\n• Histórico de vacinas e doenças\n• Lembretes de vacinas e remédios\n• Geração de relatório para o veterinário\n• Resposta do veterinário ao tutor\n• Histórico de consultas salvo localmente\n• Funciona sem internet`}
        </Card>

        <Card titulo="🔴 Quando ir ao veterinário imediatamente?">
          {`• Dificuldade respiratória grave\n• Convulsão ou desmaio\n• Sangramento intenso\n• Suspeita de envenenamento\n• Trauma por atropelamento\n\nNesses casos, vá direto ao pronto-atendimento veterinário.`}
        </Card>

        <Card titulo="⚠️ Aviso Legal">
          Este aplicativo é uma ferramenta de apoio à comunicação.
          Não substitui consulta presencial nem diagnóstico profissional.
        </Card>

        <View style={styles.equipeCard}>
          <Text style={styles.equipeTitulo}>🎓 Equipe</Text>
          {[
            { nome: 'Fabrício Henrique Pereira', rm: 'RM 563237' },
            { nome: 'Miguel Henrique Oliveira Dias', rm: 'RM 565492' },
            { nome: 'Pedro Henrique de Oliveira', rm: 'RM 562312' },
            { nome: 'Leonardo José Pereira', rm: 'RM 563065' },
          ].map((m) => (
            <View key={m.rm} style={styles.membroLinha}>
              <View style={styles.membroAvatar}>
                <Text style={styles.membroLetra}>{m.nome.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.membroNome}>{m.nome}</Text>
                <Text style={styles.membroRm}>{m.rm}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function Card({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitulo}>{titulo}</Text>
      <Text style={styles.cardTexto}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.primary, padding: 20, paddingTop: 50 },
  headerTitulo: { color: colors.white, fontSize: 22, fontWeight: 'bold' },
  headerSub: { color: '#94A3B8', fontSize: 13, marginTop: 4 },
  scroll: { padding: 16, paddingBottom: 40 },
  logoCard: { backgroundColor: colors.white, borderRadius: 16, padding: 24, alignItems: 'center', marginBottom: 14, borderWidth: 1, borderColor: colors.border },
  logoEmoji: { fontSize: 48, marginBottom: 8 },
  logoNome: { fontSize: 26, fontWeight: 'bold', color: colors.primary },
  logoSub: { fontSize: 14, color: colors.textLight, marginTop: 4 },
  logoVersao: { fontSize: 12, color: colors.textLight, marginTop: 8 },
  card: { backgroundColor: colors.white, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  cardTitulo: { fontSize: 15, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  cardTexto: { fontSize: 14, color: colors.textLight, lineHeight: 22 },
  equipeCard: { backgroundColor: colors.white, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  equipeTitulo: { fontSize: 15, fontWeight: 'bold', color: colors.text, marginBottom: 14 },
  membroLinha: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  membroAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  membroLetra: { color: colors.primary, fontWeight: 'bold', fontSize: 16 },
  membroNome: { fontSize: 14, fontWeight: '600', color: colors.text },
  membroRm: { fontSize: 12, color: colors.textLight },
});
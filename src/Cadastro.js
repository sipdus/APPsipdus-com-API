import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ImageBackground,
} from "react-native";
import CheckBox from "react-native-check-box";
import api from "../services/api"; // 🔹 import da API

const { width } = Dimensions.get("window");

export default function Cadastro({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [concordaTermos, setConcordaTermos] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Função para cadastrar usuário na API - CORRIGIDA
  const handleCadastro = async () => {
    if (!usuario || !email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    if (!concordaTermos) {
      Alert.alert("Erro", "Você deve concordar com os termos de uso.");
      return;
    }

    setLoading(true);

    try {
      console.log("🔄 Tentando cadastrar usuário...", { usuario, email });

      // ✅ USE A API CONFIGURADA em vez de fetch direto
      const response = await api.post("/users/register", {
        name: usuario,
        email: email,
        senha: senha,
      });

      console.log("✅ Usuário cadastrado:", response);
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      navigation.navigate("Login");

    } catch (error) {
      console.log("❌ Erro no cadastro:", error);
      Alert.alert("Erro", error.message || "Erro ao cadastrar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* TOPO */}
        <View style={styles.topContainer}>
          <ImageBackground
            source={require("../assets/sipdus_coracao.png")}
            style={styles.background}
            resizeMode="cover"
          />
          <Text style={styles.title}>Cadastro:</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome completo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={usuario}
            onChangeText={setUsuario}
          />

          <Text style={styles.label}>Data de nascimento:</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
            value={dataNascimento}
            onChangeText={setDataNascimento}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <Text style={styles.label}>Confirme sua senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />

          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <CheckBox
              isChecked={concordaTermos}
              onClick={() => setConcordaTermos(!concordaTermos)}
              checkBoxColor="#FF0000"
            />
            <Text style={styles.checkboxLabel}>
              Li e concordo com os termos de uso
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleCadastro}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  topContainer: {
    backgroundColor: "#fff",
    width: "100%",
    paddingTop: 60,
    paddingBottom: 1,
    alignItems: "center",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  background: {
    width: 195,
    height: 250,
    marginTop: -70,
    marginRight: 100,
  },
  title: {
    color: "#000000", 
    fontSize: 26,
    fontWeight: "bold",
    marginTop: -138,
    marginLeft: 25,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#00bcd4",
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 0,
    paddingTop: 60,
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  label: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 14,
    color: "#000",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: "#000000",
  },
  button: {
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: "center",
    backgroundColor: "#fff",
    alignSelf: "center",
    width: "100%",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
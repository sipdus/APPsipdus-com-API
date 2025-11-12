import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import api from "../services/api"; // 🔹 import da API

const windowWidth = Dimensions.get("window").width;

export default function Login({ navigation }) {
  const [Email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");

  // 🔹 Função para logar usuário
  const handleLogin = async () => {
    if (!Email || !Senha) {
      Alert.alert("Preencha email e senha!");
      return;
    }

    try {
      const response = await api.post("/users/login", {
        email: Email,
        senha: Senha,
      });

      console.log(response.data);
      Alert.alert("Login realizado com sucesso!");
      navigation.navigate("TelaInicial");
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Usuário ou senha incorretos!");
    }
  };

  return (
    <View style={styles.container}>
      {/* Topo com fundo branco e logo */}
      <View style={styles.topContainer}>
        <Image
          source={require("../assets/sipdus_logo.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Parte azul curva */}
      <View style={styles.bottomContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          placeholder="Digite seu email"
          keyboardType="email-address"
          value={Email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry
          value={Senha}
          onChangeText={setSenha}
          style={styles.input}
        />

        <TouchableOpacity>
          <Text style={styles.forgotText}>Esqueci minha senha...</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../assets/images.png")}
              style={styles.socialIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../assets/facebook_logo.jpg")}
              style={styles.socialIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../assets/instagram_logo.jpg")}
              style={styles.socialIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.registerText}>
            Não tem uma conta?{" "}
            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
              <Text style={styles.registerLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    topContainer: {
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start",
      height: 200,         
      paddingBottom: 30, 
    },
    logo: {
      width: 275,
      height: 3000,
      resizeMode: "contain",
      marginTop: -1380,
      alignItems: "center",
      marginLeft: 20,
    },
    bottomContainer: {
      flex: 1,
      backgroundColor: "#00bcd4",
      borderTopLeftRadius: 80,
      paddingTop: 60, 
      paddingHorizontal: 25,
    },
    label: {
      color: "#000",
      fontSize: 16,
      marginBottom: 5,
      marginTop: 15,
      fontWeight: "500",
    },
    input: {
      backgroundColor: "#fff",
      borderRadius: 25,
      padding: 12,
      fontSize: 15,
      paddingHorizontal: 20,
    },
    forgotText: {
      color: "#000",
      marginTop: 10,
      marginBottom: 20,
      textAlign: "right",
      fontSize: 13,
      textDecorationLine: "underline",
    },
    registerLink: {
      marginTop: 10,
    },
    button: {
      backgroundColor: "#fff",
      paddingVertical: 12,
      borderRadius: 25,
      alignItems: "center",
      marginBottom: 30,
      width: 280, 
      alignSelf: "center",
      marginTop: 30,
    },
    buttonText: {
      color: "#00bcd4",
      fontSize: 16,
      fontWeight: "bold",
    },
    socialContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 25,
      marginTop: 0,
    },
    socialButton: {
      backgroundColor: "#fff",
      borderRadius: 50,
      padding: 10,
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: "#ccc",
    },
    socialIcon: {
      width: 25,
      height: 25,
    },
    registerText: {
      color: "#000",
      textAlign: "center",
      fontSize: 14,
      marginTop: 10,
    },
    registerLink: {
      fontWeight: "bold",
      textDecorationLine: "underline",
    },
});
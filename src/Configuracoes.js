import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput, Switch, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const windowWidth = Dimensions.get("window").width;

export default function Configuracoes({ navigation }) {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [genero, setGenero] = useState("");
  const [receberNotificacao, setReceberNotificacao] = useState(false);
  const [remedio, setRemedio] = useState("");

  const escolherGenero = () => {
    Alert.alert(
      "Escolher gênero",
      "Selecione uma opção:",
      [
        { text: "Feminino", onPress: () => setGenero("Feminino") },
        { text: "Masculino", onPress: () => setGenero("Masculino") },
        { text: "Prefiro não informar", onPress: () => setGenero("Prefiro não informar") },
        { text: "Cancelar", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Deseja realmente sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: () => navigation.replace("Login") },
      ],
      { cancelable: true }
    );
  };

  const ativarNotificacao = (valor) => {
    setReceberNotificacao(valor);
    if (valor) {
      if (remedio.trim() === "") {
        Alert.alert(
          "Informe o nome do remédio",
          "Digite o nome do medicamento para que o lembrete seja personalizado."
        );
      } else {
        Alert.alert(
          "Notificações ativadas",
          `Você receberá lembretes para tomar ${remedio}.`
        );
      }
    } else {
      Alert.alert("Notificações desativadas");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/volta.png")} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.perfilText}>Configurações:</Text>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.textInput}
            placeholder="Nome de usuário"
            value={nome}
            onChangeText={setNome}
          />
          <Image source={require("../assets/user.png")} style={styles.inputIcon} />
        </View>

                <TouchableOpacity style={styles.inputBox} onPress={escolherGenero}>
          <Text style={styles.inputText}>
            {genero ? genero : "Gênero (Opcional)"}
          </Text>
          <Image source={require("../assets/user.png")} style={styles.inputIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputBox} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.inputText}>
            {dataNascimento
              ? dataNascimento.toLocaleDateString("pt-BR")
              : "Data de nascimento"}
          </Text>
          <Image source={require("../assets/calendario.png")} style={styles.inputIcon} />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dataNascimento || new Date(2000, 0, 1)}
            mode="date"
            display="spinner"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setDataNascimento(date);
            }}
          />
        )}
        
        <View style={styles.medicacaoBox}>
          <View style={styles.medicacaoHeader}>
            <View style={styles.medicacaoTitle}>
              <Text style={styles.inputText}>Medicação</Text>
              {remedio !== "" && (
                <Text style={styles.subTitulo}>Remédio: {remedio}</Text>
              )}
            </View>
            <View style={styles.medicacaoContainer}>
              <Switch
                value={receberNotificacao}
                onValueChange={ativarNotificacao}
              />
            </View>
          </View>

          <TextInput
            style={styles.remedioInput}
            placeholder="Digite o nome do remédio"
            value={remedio}
            onChangeText={setRemedio}
          />
        </View>     
         <View style={styles.inputBox}>
          <Text style={styles.inputText}>Sua conta</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigation.navigate("TelaInicial")}
        >
          <Image
            source={require("../assets/inicio.png")}
            style={styles.footerIconLarge}
          />
          <Text style={styles.footerText}>Início</Text>
        </TouchableOpacity>
      
              <TouchableOpacity style={styles.footerItem}>
                <Image
                  source={require("../assets/servicos.png")}
                  style={styles.footerIcon}
                />
                <Text style={styles.footerText}>Serviços</Text>
              </TouchableOpacity>
      
              <TouchableOpacity style={styles.footerItem}>
                <Image
                  source={require("../assets/configuracoes.png")}
                  style={styles.footerIcon}
                />
                <Text style={styles.footerText}>Config.</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  backIcon: {
    width: 160,
    height: 70,
    resizeMode: "contain",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#00BCD4",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    paddingTop: 15,
  },
  perfilText: {
    fontSize: 20,
    color: "#000",
    marginBottom: 10,
  },
  inputBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 8,
  },
  textInput: {
    fontSize: 15,
    color: "#000",
    flex: 1,
  },
  inputText: {
    fontSize: 15,
    color: "#000",
  },
  inputIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    marginLeft: 10,
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
  },
  medicacaoBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "85%",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 8,
  },
  medicacaoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  medicacaoTitle: {
    flexDirection: "column",
  },
  subTitulo: {
    fontSize: 13,
    color: "#555",
    marginTop: 3,
  },
  medicacaoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  remedioInput: {
    marginTop: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: "#000",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  footerItem: {
    alignItems: "center",
  },
  footerIcon: {
    width: 45,
    height: 38,
    marginBottom: 4,
    resizeMode: "contain",
  },
  footerIconLarge: {
    width: 52,
    height: 40,
    marginBottom: 4,
    resizeMode: "contain",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
});
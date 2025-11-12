import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import 'react-native-gesture-handler';



const DATA = [
  { id: "1", title: "Glicemia", image: require("../assets/glicemia.png") },
  { id: "2", title: "BPM", image: require("../assets/BPM.png") },
  { id: "3", title: "Oximetria", image: require("../assets/SP02.png") },
  //{ id: "4", title: "Colesterol", image: require("../assets/colesterol.png") },
  { id: "5", title: "Refeições", image: require("../assets/refeicao.png") },
  
];

export default function TelaInicial({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (item.title === "Glicemia") {
          navigation.navigate("GlicemiaScreen");
        } else if (item.title === "BPM") {
          navigation.navigate("BPMScreen");
        } else if (item.title === "Oximetria"){
          navigation.navigate("OximetriaScreen");
        } else if (item.title === "Refeições"){
          navigation.navigate("RefeicoesScreen");
        }
      }}
    >
        <Image source={item.image} style={styles.cardImage} />
        <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );
  
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const alternarNotificacoes = () => {
      const novoEstado = !notificacoesAtivas;
      setNotificacoesAtivas(novoEstado);
      Alert.alert(
        "Notificações",
        novoEstado ? "Notificações ativadas 🔔" : "Notificações silenciadas 🔕"
      );
    };

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require("../assets/menu.png")} style={styles.iconLarge} />
        </TouchableOpacity>
        <Text style={styles.logo}></Text>
        
        <TouchableOpacity onPress={alternarNotificacoes}>
          <Image
            source={
              notificacoesAtivas
                ? require("../assets/notificacao.png")
                : require("../assets/notificacao_silenciada.png")
            }
            style={
              notificacoesAtivas
                ? styles.socialIcon
                : styles.socialIconSilenciado
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.greetingWhite}>
        <Text style={styles.helloText}>Olá, <Text style={{ fontWeight: 'bold' }}>(User)</Text></Text>
      </View>

      <View style={styles.blueContainer}>
        <Text style={styles.subtitleText}>Suas informações:</Text>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
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

        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigation.navigate("ServicosScreen")}
        >
          <Image
            source={require("../assets/servicos.png")}
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>Serviços</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigation.navigate("ConfiguracoesScreen")}
        >
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00BCD4",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 50,
    borderRadius: 10,
  },
  iconLarge: {
    width: 150,
    height: 200,
    resizeMode: "contain",
    marginTop: -120,
  },
  socialIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginTop: -90,
  },
  socialIconSilenciado: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    marginTop: -80,
    marginRight: 10
  },
  greetingWhite: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: -15, // puxa o "Olá, User" um pouco mais para cima
    marginTop: -50, // reduz o espaço acima do "Olá, User"
  },
  helloText: {
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitleText: {
    color: "#000",
    fontSize: 20,
    marginLeft: 10,
    marginTop: 2,
  },
  blueContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: "#00BCD4",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 0,
    paddingTop: 20,
    marginTop: 30, // sobe a área azul (aproxima do Olá, User)
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    marginTop: 15, // espaço entre "Suas informações:" e o primeiro card
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 25,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    width: 55,
    height: 55,
    marginRight: 20,
    resizeMode: "contain",
  },
  cardText: {
    fontSize: 20,
    fontWeight: "600",
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
    position: "absolute",
    bottom: 0,
    width: "100%",
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
    color: "#000000",
  },
});
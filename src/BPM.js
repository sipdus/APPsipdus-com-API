import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { BLEContext } from "./hooks/BLEContext";
import api from "../APIsipdus/services/api";

export default function BPMScreen({ navigation }) {
  const { bpm } = useContext(BLEContext);

  // Envia o BPM para a API sempre que mudar
  useEffect(() => {
    if (bpm) {
      api.post("/medidas", {
        user_id: 1,
        bpm: bpm,
        spo2: null,
        glicose: null,
      }).catch(err => console.log("Erro ao salvar BPM:", err.message));
    }
  }, [bpm]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/volta.png")} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.greetingWhite}>
        <Text style={styles.helloText}>
          <Text style={{ fontWeight: "bold" }}>(User):</Text>
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Batimentos por minuto:</Text>

        <View style={styles.heartRow}>
          <View style={styles.dataBox}>
            <Text style={styles.dataTitle}>Última leitura:</Text>
            <Text style={styles.dataValue}>{bpm != null ? bpm : "---"}</Text>
            <Text style={styles.dataSubtitle}>BPM</Text>
          </View>

          <Image source={require("../assets/coracao.png")} style={styles.heartIcon} />
        </View>

        <Text style={styles.subtitle}>Frequência cardíaca:</Text>

        <View style={styles.box}><Text style={styles.boxText}>De 8 a 17 anos: <Text style={styles.highlight}>80 a 100 BPM</Text></Text></View>
        <View style={styles.box}><Text style={styles.boxText}>Mulheres 18-65 anos: <Text style={styles.highlight}>73 a 78 BPM</Text></Text></View>
        <View style={styles.box}><Text style={styles.boxText}>Homens 18-65 anos: <Text style={styles.highlight}>70 a 76 BPM</Text></Text></View>
        <View style={styles.box}><Text style={styles.boxText}>Idosos (mais de 65 anos): <Text style={styles.highlight}>50 a 60 BPM</Text></Text></View>
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
    width: 160, // ← aumentei bastante o tamanho
    height: 70,
    resizeMode: "contain",
  },

  // USER CENTRALIZADO
  greetingWhite: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 5,
    marginBottom: 15,
  },

  helloText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  iconVoltar: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  logo: {
    fontSize: 22,
    color: "#00BCD4",
    fontWeight: "bold",
    marginLeft: 15,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#00BCD4",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    paddingTop: 25,
  },
  title: {
    color: "#000",
    fontSize: 16,
    marginBottom: 10,
  },
  heartRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: 20,
  },
  heartIcon: {
    width: 150,
    height: 175,
    resizeMode: "contain",
  },
  dataBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dataTitle: {
    fontSize: 14,
    color: "#555",
  },
  dataValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E53935",
  },
  dataSubtitle: {
    fontSize: 14,
    color: "#E53935",
  },
  subtitle: {
    fontSize: 15,
    color: "#000",
    marginBottom: 10,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "85%",
    alignItems: "center",
    marginVertical: 5,
  },
  boxText: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
  highlight: {
    color: "#E53935",
    fontWeight: "bold",
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
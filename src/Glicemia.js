import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { BLEContext } from "./hooks/BLEContext";
import api from "../APIsipdus/services/api";

export default function GlicemiaScreen({ navigation }) {
  const { glucose } = useContext(BLEContext);

  useEffect(() => {
    if (glucose) {
      api.post("/medidas", {
        user_id: 1,
        glicose: glucose,
        bpm: null,
        spo2: null,
      }).catch(err => console.log("Erro ao salvar glicemia:", err.message));
    }
  }, [glucose]);

  return (
    <View style={styles.container}>
      {/* TOPO */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/volta.png")} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      {/* USER */}
      <View style={styles.greetingWhite}>
        <Text style={styles.helloText}>
          <Text style={{ fontWeight: "bold" }}>(User):</Text>
        </Text>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Glicemia:</Text>

        <View style={styles.glucoseRow}>
          <View style={styles.dataBox}>
            <Text style={styles.dataTitle}>Última leitura:</Text>
            <Text style={styles.dataValue}>{glucose != null ? glucose : "--"}</Text>
            <Text style={styles.dataSubtitle}>mg/dL</Text>
          </View>

          <Image source={require("../assets/acucar.png")} style={styles.glucoseIcon} />
        </View>

        <Text style={styles.subtitle}>Tabela de Classificação:</Text>
        <View style={styles.box}>
          <Image
            source={require("../assets/tabela-glicemia.png")}
            style={styles.tabelaImage}
          />
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
  glucoseRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: 20,
  },
  glucoseIcon: {
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
  tabelaImage: {
    width: "100%",
    height: 350,
    resizeMode: "contain",
    alignSelf: "center",
  },
});

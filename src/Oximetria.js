import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { BLEContext } from "./hooks/BLEContext";
import api from "../services/api";

export default function OximetriaScreen({ navigation }) {
  const { spo2 } = useContext(BLEContext);

  useEffect(() => {
    if (spo2) {
      api.post("/medidas", {
        user_id: 1,
        spo2: spo2,
        bpm: null,
        glicose: null,
      }).catch(err => console.log("Erro ao salvar SpO2:", err.message));
    }
  }, [spo2]);

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
        <Text style={styles.title}>Oximetria:</Text>

        <View style={styles.oximeterRow}>
          <View style={styles.dataBox}>
            <Text style={styles.dataTitle}>Última leitura:</Text>
            <Text style={styles.dataValue}>{spo2 != null ? spo2 : "--"}</Text>
            <Text style={styles.dataSubtitle}>SpO₂</Text>
          </View>

          <Image source={require("../assets/oximetro.png")} style={styles.oximeterIcon} />
        </View>

        <Text style={styles.subtitle}>Tabela de porcentagens:</Text>

        <View style={[styles.box, { borderColor: "#4CAF50", borderWidth: 2 }]}>
          <Text style={styles.boxText}>Normal: <Text style={styles.highlightGreen}>95% - 100%</Text></Text>
        </View>

        <View style={[styles.box, { borderColor: "#FFEB3B", borderWidth: 2 }]}>
          <Text style={styles.boxText}>Risco Moderado: <Text style={styles.highlightYellow}>93% - 94%</Text></Text>
        </View>

        <View style={[styles.box, { borderColor: "#E53935", borderWidth: 2 }]}>
          <Text style={styles.boxText}>Risco Gravíssimo: <Text style={styles.highlightRed}>Abaixo de 92%</Text></Text>
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
    paddingBottom: 15,
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
    paddingVertical: 10,
    marginBottom: 10,
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
  oximeterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: 20,
  },
  oximeterIcon: {
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
    paddingHorizontal: 25,
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
    paddingVertical: 20,
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
  highlightGreen: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  highlightYellow: {
    color: "#FFB300",
    fontWeight: "bold",
  },
  highlightRed: {
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
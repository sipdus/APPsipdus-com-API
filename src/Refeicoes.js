import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function RefeicaoScreen({ navigation }) {
  const [pesquisa, setPesquisa] = useState("");
  const [itens, setItens] = useState([]);

  const alimentos = [
    { id: "1", nome: "Arroz" },
    { id: "2", nome: "Feijão" },
    { id: "3", nome: "Macarrão" },
    { id: "4", nome: "Batata inglesa" },
    { id: "5", nome: "Frango grelhado" },
    { id: "6", nome: "Salada verde" },
  ];

  // Filtra conforme o texto digitado na busca
  const alimentosFiltrados = alimentos.filter((item) =>
    item.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  // Adiciona item se ainda não estiver na sacola
  const adicionarItem = (item) => {
    const jaExiste = itens.find((i) => i.id === item.id);
    if (!jaExiste) setItens([...itens, item]);
  };

  // Remove item da sacola
  const removerItem = (id) => {
    setItens(itens.filter((i) => i.id !== id));
  };

  // Função para salvar a refeição
  const salvarRefeicao = () => {
    if (itens.length === 0) {
      alert("Adicione pelo menos um alimento antes de salvar!");
      return;
    }

    axios.post("http://localhost:3000/api/refeicoes", {
      alimentos: itens.map((item) => item.id),
      data: new Date(), // data da refeição
    })
    .then((res) => {
      alert("Refeição salva com sucesso!");
      setItens([]); // limpa a sacola
    })
    .catch((err) => {
      console.error("Erro ao salvar refeição:", err.message);
      alert("Erro ao salvar a refeição.");
    });
  };

  return (
    <View style={styles.container}>
      {/* TOPO */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("TelaInicial")}>
          <Image
            source={require("../assets/volta.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.userText}>(User):</Text>

      <View style={styles.blueContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.subtitle}>Selecione a refeição:</Text>

          {/* Campo de pesquisa */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Procure por um alimento..."
              style={styles.input}
              value={pesquisa}
              onChangeText={setPesquisa}
            />
            <Image
              source={require("../assets/pesquisar.png")}
              style={styles.searchIcon}
            />
          </View>

          {/* Lista de alimentos filtrada */}
          {alimentosFiltrados.map((item) => (
            <View key={item.id} style={styles.cardItem}>
              <Text style={styles.itemText}>{item.nome}</Text>
              <TouchableOpacity onPress={() => adicionarItem(item)}>
                <Image
                  source={require("../assets/adicionar.png")}
                  style={styles.addIcon}
                />
              </TouchableOpacity>
            </View>
          ))}

          {/* SACOLA - aparece somente se houver itens */}
          {itens.length > 0 && (
            <View style={styles.sacolaContainer}>
              <View style={styles.sacolaHeader}>
                <Image
                  source={require("../assets/itens_adicionados.png")}
                  style={styles.itensIcon}
                />
                <Text style={styles.sacolaTitle}>
                  Itens adicionados ({itens.length})
                </Text>
              </View>

              {itens.map((item) => (
                <View key={item.id} style={styles.sacolaItem}>
                  <Text style={styles.sacolaItemText}>• {item.nome}</Text>
                  <TouchableOpacity onPress={() => removerItem(item.id)}>
                    <Image
                      source={require("../assets/remover.png")}
                      style={styles.removeIcon}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Botão Salvar Refeição */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => salvarRefeicao()}
          >
            <Text style={styles.saveButtonText}>Salvar Refeição</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* RODAPÉ */}
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
  container: { flex: 1, backgroundColor: "#fff" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingTop: 50,
    paddingBottom: 10,
  },
  backIcon: { width: 160, height: 70, resizeMode: "contain" },
  userText: {
    color: "#000",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  blueContainer: {
    flex: 1,
    backgroundColor: "#00BCD4",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  scrollContainer: { paddingBottom: 140 },
  subtitle: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: { flex: 1, paddingVertical: 8, paddingHorizontal: 12 },
  searchIcon: { width: 28, height: 28, tintColor: "#00BCD4" },
  cardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  itemText: { fontSize: 16, fontWeight: "600", color: "#000" },
  addIcon: { width: 25, height: 25 },

  // SACOLA
  sacolaContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },
  sacolaHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sacolaTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 8,
  },
  itensIcon: { width: 25, height: 25 },
  sacolaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  sacolaItemText: { fontSize: 16, color: "#000" },
  removeIcon: { width: 20, height: 20, resizeMode: "contain" },

  // Botão Salvar Refeição
  saveButton: {
    backgroundColor: "#00796B",
    paddingVertical: 12,
    borderRadius: 25,
    marginVertical: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // RODAPÉ
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
  footerItem: { alignItems: "center" },
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
  footerText: { fontSize: 14, fontWeight: "600", color: "#000" },
});
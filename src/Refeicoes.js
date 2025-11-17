import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../services/api";

export default function RefeicaoScreen({ navigation }) {
  const [pesquisa, setPesquisa] = useState("");
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ CARREGA O USUÁRIO LOGADO
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const userObj = JSON.parse(userData);
        setUser(userObj);
        console.log("👤 Usuário carregado:", userObj.id, userObj.name);
      } else {
        console.log("❌ Nenhum usuário no AsyncStorage");
      }
    } catch (error) {
      console.log("❌ Erro ao carregar usuário:", error);
    }
  };

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
    if (!jaExiste) {
      setItens([...itens, item]);
      Alert.alert("Sucesso", `${item.nome} adicionado à refeição!`);
    } else {
      Alert.alert("Aviso", `${item.nome} já está na refeição!`);
    }
  };

  // Remove item da sacola
  const removerItem = (id) => {
    const itemRemovido = itens.find(item => item.id === id);
    setItens(itens.filter((i) => i.id !== id));
    if (itemRemovido) {
      Alert.alert("Removido", `${itemRemovido.nome} removido da refeição!`);
    }
  };

  // 🔹 Função para salvar a refeição - CORRIGIDA
  // RefeicaoScreen.js - FUNÇÃO salvarRefeicao CORRIGIDA
const salvarRefeicao = async () => {
  if (itens.length === 0) {
    Alert.alert("Atenção", "Adicione pelo menos um alimento antes de salvar!");
    return;
  }

  if (!user) {
    Alert.alert("Erro", "Usuário não identificado. Recarregue a página.");
    return;
  }

  setLoading(true);

  try {
    console.log("🔄 Salvando refeição para usuário:", user.id);

    // ✅ ADICIONE A DESCRIÇÃO OBRIGATÓRIA
    const response = await api.post("/refeicoes", {
      user_id: user.id,
      descricao: `Refeição com ${itens.length} alimento(s)`, // ✅ DESCRIÇÃO OBRIGATÓRIA
      alimentos: itens.map((item) => ({
        id: item.id,
        nome: item.nome
      })),
      data: new Date().toISOString(),
    });

    console.log("✅ Refeição salva:", response);
    Alert.alert("Sucesso", "Refeição salva com sucesso!");
    setItens([]); // limpa a sacola
    
  } catch (error) {
    console.log("❌ Erro ao salvar refeição:", error);
    Alert.alert("Erro", error.message || "Erro ao salvar a refeição.");
  } finally {
    setLoading(false);
  }
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

      {/* ✅ MOSTRA O NOME REAL DO USUÁRIO */}
      <Text style={styles.userText}>
        {user ? `${user.name}:` : "Carregando..."}
      </Text>

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

              {/* Botão Salvar Refeição */}
              <TouchableOpacity
                style={[styles.saveButton, loading && styles.buttonDisabled]}
                onPress={salvarRefeicao}
                disabled={loading}
              >
                <Text style={styles.saveButtonText}>
                  {loading ? "Salvando..." : "Salvar Refeição"}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Mensagem quando não há itens */}
          {itens.length === 0 && (
            <View style={styles.emptyMessage}>
              <Text style={styles.emptyMessageText}>
                Nenhum alimento adicionado ainda.{"\n"}
                Pesquise e adicione alimentos à sua refeição!
              </Text>
            </View>
          )}
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
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: { 
    flex: 1, 
    paddingVertical: 8, 
    paddingHorizontal: 12,
    fontSize: 16,
  },
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
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemText: { fontSize: 16, fontWeight: "600", color: "#000" },
  addIcon: { width: 25, height: 25 },

  // SACOLA
  sacolaContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sacolaHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sacolaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 8,
  },
  itensIcon: { width: 25, height: 25 },
  sacolaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
    paddingVertical: 4,
  },
  sacolaItemText: { fontSize: 16, color: "#000", flex: 1 },
  removeIcon: { width: 20, height: 20, resizeMode: "contain" },

  // Botão Salvar Refeição
  saveButton: {
    backgroundColor: "#00796B",
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 15,
    alignItems: "center",
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Mensagem vazia
  emptyMessage: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    alignItems: "center",
  },
  emptyMessageText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
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
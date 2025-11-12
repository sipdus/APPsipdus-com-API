import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

export default function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.logo}>Sipdus</Text>
        <Text style={styles.userName}>(User)...</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => props.navigation.navigate('ConfiguracoesScreen')}
        >
          <Text style={styles.optionText}>Meu perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => props.navigation.navigate('ConfiguracoesScreen')}
        >
          <Text style={styles.optionText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => props.navigation.navigate('ConfiguracoesScreen')}
        >
          <Text style={styles.optionText}>Medicações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, { borderTopWidth: 1, borderColor: '#ccc', marginTop: 20 }]}
          onPress={() => props.navigation.navigate('LoginScreen')}
        >
          <Text style={[styles.optionText, { color: '#d32f2f' }]}>Sair</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BCD4',
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },
});
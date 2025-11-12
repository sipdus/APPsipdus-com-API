import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/Login";
import Cadastro from "./src/Cadastro";
import TelaInicial from "./src/TelaInicial";
import GlicemiaScreen from "./src/Glicemia";
import BPMScreen from "./src/BPM";
import OximetriaScreen from "./src/Oximetria";
import RefeicoesScreen from "./src/Refeicoes";
import CustomDrawer from './src/CustomDrawer';
import ConfiguracoesScreen from "./src/Configuracoes";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 260,
        },
      }}
    >
      
      <Drawer.Screen name="TelaInicial" component={TelaInicial} />
      <Drawer.Screen name="GlicemiaScreen" component={GlicemiaScreen} />
      <Drawer.Screen name="BPMScreen" component={BPMScreen} />
      <Drawer.Screen name="OximetriaScreen" component={OximetriaScreen} />
      <Drawer.Screen name="RefeicoesScreen" component={RefeicoesScreen} />
      <Drawer.Screen name="ConfiguracoesScreen" component={ConfiguracoesScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="TelaInicial" 
          component={DrawerRoutes} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="GlicemiaScreen" 
          component={GlicemiaScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="BPMScreen" 
          component={BPMScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="OximetriaScreen" 
          component={OximetriaScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="RefeicoesScreen" 
          component={RefeicoesScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
import { useEffect, useState, useRef } from "react";
import { BleManager } from "react-native-ble-plx";
import { PermissionsAndroid, Platform, Alert } from "react-native";
import { Buffer } from "buffer";

export default function useBLE() {
  const managerRef = useRef(new BleManager());
  const [device, setDevice] = useState(null);
  const [bpm, setBPM] = useState(null);
  const [spo2, setSpO2] = useState(null);
  const [glucose, setGlucose] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // 🧠 Seus UUIDs
  const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
  const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
  const DEVICE_NAME = "ESP32_MAX30102";

  // ======== PERMISSÕES BLE ========
  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if (Platform.Version >= 31) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        const allGranted = Object.values(result).every(
          (v) => v === PermissionsAndroid.RESULTS.GRANTED
        );
        if (!allGranted) {
          Alert.alert("Permissões BLE", "Permissões Bluetooth necessárias!");
          return false;
        }
      } else {
        const fine = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (fine !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permissões", "Localização necessária para BLE!");
          return false;
        }
      }
    }
    return true;
  };

  // ======== INICIALIZAÇÃO ========
  useEffect(() => {
    const startBLE = async () => {
      const ok = await requestPermissions();
      if (!ok) return;

      const manager = managerRef.current;

      const subscription = manager.onStateChange((state) => {
        if (state === "PoweredOn") {
          console.log("✅ Bluetooth ligado — iniciando scan...");
          scanAndConnect();
          subscription.remove();
        }
      }, true);

      return () => {
        subscription.remove();
        manager.destroy();
      };
    };

    startBLE();
  }, []);

  // ======== SCAN + CONEXÃO ========
  const scanAndConnect = () => {
    const manager = managerRef.current;

    manager.startDeviceScan(null, null, async (error, scannedDevice) => {
      if (error) {
        console.error("❌ Erro no scan:", error);
        return;
      }

      if (scannedDevice && scannedDevice.name === DEVICE_NAME) {
        console.log("🔍 Encontrado:", scannedDevice.name);
        manager.stopDeviceScan();

        try {
          const device = await scannedDevice.connect();
          console.log("✅ Conectado ao ESP32");
          setDevice(device);
          setIsConnected(true);

          await device.discoverAllServicesAndCharacteristics();
          monitorData(device);
        } catch (err) {
          console.error("Erro na conexão:", err);
          setTimeout(scanAndConnect, 3000);
        }
      }
    });
  };

  // ======== MONITORAR DADOS NOTIFY ========
  const monitorData = async (device) => {
    console.log("📡 Iniciando monitoramento BLE...");

    device.monitorCharacteristicForService(
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      (error, characteristic) => {
        if (error) {
          console.error("Erro na notificação:", error);
          return;
        }

        if (!characteristic?.value) return;

        const rawData = Buffer.from(characteristic.value, "base64").toString("utf-8").trim();

        if (rawData.length === 0) return;

        try {
          const [bpmStr, spo2Str, glucoseStr] = rawData.split(",");
          if (bpmStr && spo2Str && glucoseStr) {
            const newBpm = parseInt(bpmStr);
            const newSpo2 = parseFloat(spo2Str);
            const newGlucose = parseFloat(glucoseStr);

            setBPM(newBpm);
            setSpO2(newSpo2);
            setGlucose(newGlucose);

            console.log(`📶 Dados recebidos → BPM:${newBpm} | SpO2:${newSpo2} | GLC:${newGlucose}`);
          } else {
            console.warn("⚠️ Dados incompletos:", rawData);
          }
        } catch (err) {
          console.warn("⚠️ Erro ao processar:", rawData, err);
        }
      }
    );
  };

  return { device, bpm, spo2, glucose, isConnected };
}

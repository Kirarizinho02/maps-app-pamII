import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Keyboard
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { GOOGLE_API_KEY } from "@env";

export default function App() {
  const mapRef = useRef(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [marker, setMarker] = useState({
    latitude: -23.55052,
    longitude: -46.633308
  });


  // região inicial do marcador 
  const initialRegion = {
    latitude: marker.latitude,
    longitude: marker.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  // função para buscar o local usando a API do Google Geocoding
  const searchPlace = async () => {
    if (!query.trim()) return;
    Keyboard.dismiss();
    setLoading(true);
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        query
      )}&key=${GOOGLE_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.status !== "OK" || !data.results || data.results.length === 0) {
        Alert.alert("Erro", "Local não encontrado.");
        setLoading(false);
        return;
      }
      // atualiza a região do mapa e o marcador
      const loc = data.results[0].geometry.location;
      const newRegion = {
        latitude: loc.lat,
        longitude: loc.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      };
      // atualiza o estado do marcador, e anima o mapa para a nova região
      setMarker({ latitude: loc.lat, longitude: loc.lng });
      if (mapRef.current && mapRef.current.animateToRegion) {
        mapRef.current.animateToRegion(newRegion, 800);
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao buscar localização.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // estrutura principal do app, começa com uma SafeAreaView
    <SafeAreaView style={styles.safe}>
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Buscar local"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={searchPlace}
          editable={!loading}
        />
        <View style={styles.button}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button title="Ir" onPress={searchPlace} />
          )}
        </View>
      </View>

      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={"Local selecionado"}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff"
  },
  searchRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    gap: 8
  },
  input: {
    flex: 1,
    height: 42,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
  button: {
    marginLeft: 8,
    width: 60
  },
  container: {
    flex: 1
  },
  map: {
    width: "100%",
    height: "100%"
  }
});

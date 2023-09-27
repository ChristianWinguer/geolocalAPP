import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import {
  requestForegroundPermissionsAsync, //Pedir as permissões para o usuário
  getCurrentPositionAsync, //Pega a posição atual do GPS
  LocationObject
} from 'expo-location'; //Biblioteca usada para a implementação de Geolocalização


import { styles } from './styles'; 


export default function App() {
  const [location, setLocation] = useState<LocationObject | null>(null);

  // Função que pede a permissão do usuário
  async function requestLocationPermissions(){
    const { granted } = await requestForegroundPermissionsAsync();

    if(granted){
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);

      console.log(currentPosition);
    }
    
  }

  useEffect(() => {
    requestLocationPermissions();
  },[])



  return (
    <View style={styles.container}>

    {
      location &&
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        />
    </MapView>
    }

    </View>
  );  
}

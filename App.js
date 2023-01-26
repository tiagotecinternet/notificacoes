import { SafeAreaView, StyleSheet, Text, View, StatusBar, Button } from 'react-native';

import * as Notifications from "expo-notifications";
import { useEffect } from 'react';

export default function App() {

  useEffect( () => {

    /* Ouvinte de evento para as notificações recebidas */
    Notifications.addNotificationReceivedListener();
    
    /* Ouvinte de evento para as respostas dadas às notificações */
    Notifications.addNotificationResponseReceivedListener();
  
  }, []);


  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Text>Exemplo de sistema de notificação local</Text>
        <Button title='Disparar notificação' />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { SafeAreaView, StyleSheet, Text, View, StatusBar, Button } from 'react-native';

import * as Notifications from "expo-notifications";
import { useEffect } from 'react';

export default function App() {

  useEffect( () => {

    /* Ouvinte de evento para as notificações recebidas, ou seja,
    quando a notificação aparece no topo da tela do dispositivo. */
    Notifications.addNotificationReceivedListener(notificacao => {
      console.log(notificacao);
    });
    
    /* Ouvinte de evento para as respostas dadas às notificações, ou seja,
    quando o usuário interage (toca) na notificação. */
    Notifications.addNotificationResponseReceivedListener(resposta => {
      console.log(resposta);
    });
  
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

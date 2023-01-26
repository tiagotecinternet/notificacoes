import { SafeAreaView, StyleSheet, Text, View, StatusBar, Button, Platform } from 'react-native';

import * as Notifications from "expo-notifications";
import { useEffect, useState } from 'react';

/* Manipulador de eventos de notificação */
Notifications.setNotificationHandler({
  handleNotification: async() => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    }
  }
});

export default function App() {

  const [dados, setDados] = useState(null);

  useEffect( () => {

    /* Necessário para iOS */
    async function permissoesIos() {
      return await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowSound: true,
          allowBadge: true,
          allowAnnouncements: true
        }
      });
    }

    permissoesIos();


    
    /*** BRANCH 02: CÓDIGO PARA O EXEMPLO DE PUSH NOTIFICATION */

    /* Para testar as 'push notifications', entre no site https://expo.dev/notifications
    e preencha o campo "To (Expo push token from your app)" com o token do seu aparelho (veja no console/terminal), e coloque
    também um título ("Message title") e um texto ("Message body") para a mensagem.
    
    Em seguida, clique em "Send a notifications" */

    /* Obter as permissões atuais do dispositivo */
    Notifications.getPermissionsAsync().then(status => {
      if(status.granted){
        /* Permissões ok? Então vamos obter o token expo do aparelho.
        Este token é um código identificador único de cada aparelho que utilize um app através do Expo Go.
        É através dele que a notificação será enviada. */
        Notifications.getExpoPushTokenAsync().then(token => {
          console.log(token);
        })
      }
    })

    /*** BRANCH 02: FIM DO CÓDIGO PARA O EXEMPLO DE PUSH NOTIFICATION */




    /* Ouvinte de evento para as notificações recebidas, ou seja,
    quando a notificação aparece no topo da tela do dispositivo. */
    Notifications.addNotificationReceivedListener(notificacao => {
      console.log(notificacao);
    });
    
    /* Ouvinte de evento para as respostas dadas às notificações, ou seja,
    quando o usuário interage (toca) na notificação. */
    Notifications.addNotificationResponseReceivedListener(resposta => {
      console.log(resposta.notification.request.content.data);
      setDados(resposta.notification.request.content.data);
    });
  
  }, []);

  const enviarMensagem = async() => {
    const mensagem = {
      title: "Lembrete! 😀",
      body: "Não se esqueça de tomar água, senão você morre 💀!",
      data: { usuario: "Tiago 👽", cidade: "São Paulo" },
      sound: Platform.OS === 'ios' ? "default" : "", // necessário pro iOS
    };

    /* Função de agendamento de notificações */
    await Notifications.scheduleNotificationAsync({
      content: mensagem,
      trigger: { seconds: 5 }
    });
  }

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Text>Exemplo de sistema de notificação push</Text>
        <Button title='Disparar notificação' onPress={enviarMensagem} />

        { dados && 
          <View style={styles.conteudo}>
            <Text> {dados.usuario} </Text>
            <Text> {dados.cidade} </Text>
          </View>
        }

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
  conteudo: {
    marginVertical: 8,
    backgroundColor: "yellow",
    padding: 8
  }
});

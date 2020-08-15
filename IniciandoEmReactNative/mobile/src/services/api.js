import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333'
})

export default api

/**
 * adnroid com emulador: localhost (utilizando o adb reverse)
 * andorid com físico: Ip da máquina (server)
 * android com emulador: 10.0.2.2 (Android Studio)
 * android com emulador: 10.0.3.2 (Genymotion)
 * 
 * abd reverse tcp:3333 tcp:3333
 */
import axios from 'axios';

const api = axios.create({
    // ip para uso no android studio
    // ou fazer redirecinamento de porta
        // com o emulador aberto = adb reverse tcp:3333 tcp:3333
    baseURL: 'http://10.0.2.2:3333'
});

export default api;
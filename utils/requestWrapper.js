import axios from "axios";

const requestWrapper = async (options) => {
    let accessToken = localStorage['accessToken'];
    let refreshToken = localStorage['refreshToken'];
    let expired = isNaN(Number(localStorage['expired'])) ? 0 : Number(localStorage['expired']);

    if(Math.floor(Date.now() / 1000) >= expired) {
        try {
            const resp = await axios.post('/refresh-tokens', {refreshToken});
            accessToken = resp.data.accessToken;

            if(!resp.data.success) throw `Invalid refresh token`;

            delete resp.data.success;

            Object.keys(resp.data).forEach(key => localStorage[key] = resp.data[key]);
        } catch (e) {
            localStorage['accessToken'] = '';
            localStorage['refreshToken'] = '';
            localStorage['expired'] = '';
            // window.location.reload();

        }
    }

    return axios({...options, headers:{...options.headers, Authorization: `Bearer ${accessToken}`}});
};

export default requestWrapper;

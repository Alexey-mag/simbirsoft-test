import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

const cache = setupCache({
    maxAge: 1000 * 60 * 15 // 15 minutes
    // maxAge: 1000// 1 second
});

const axiosApi = axios.create({
    adapter: cache.adapter
});

axiosApi.interceptors.request.use(
    async(config) => {
        config.headers = {
            'X-Auth-Token': `${process.env.VUE_APP_FOOTBALL_DATA_API_TOKEN}`,
            Accept: 'application/json'
        };
        return config;
    }
);

export default axiosApi;

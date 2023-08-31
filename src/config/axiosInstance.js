/**
 * @description - This file contain axios instance for kusonime api endpoints
 * @description - This file is used by the scraper to fetch data from kusonime
 * @description - This file also contain configuration for axios instance
 * @author {Deo Sbrn}
 */

import axios from 'axios';
import tough from 'tough-cookie';

const KUSONIME_URL = 'https://kusonime.com';
const cookieJar = new tough.CookieJar();

const axiosInstance = axios.create({
    baseURL: KUSONIME_URL,
    jar: cookieJar,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': '*',
        Referer: 'https://kusonime.com/',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
        Connection: 'keep-alive',
        Host: 'kusonime.com',
        Origin: 'https://kusonime.com',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-User': '?1',
        'Sec-Fetch-Site': 'none'
    }
});

export default axiosInstance;

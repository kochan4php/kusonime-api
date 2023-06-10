import axios from "axios";
import tough from "tough-cookie";

const KUSONIME_URL = "https://kusonime.com";
const cookieJar = new tough.CookieJar();

const axiosInstance = axios.create({
    baseURL: KUSONIME_URL,
    jar: cookieJar,
    withCredentials: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; Redmi Note 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Mobile Safari/537.36",
        Referer: "https://kusonime.com/",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
        Connection: "keep-alive",
        Host: "kusonime.com",
        Origin: "https://kusonime.com",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
    },
});

export default axiosInstance;

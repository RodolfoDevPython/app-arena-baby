import axios from "axios";

const api = axios.create({
    baseURL : "https://arenababy.myvtex.com/api",
    headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "x-vtex-api-appkey": "vtexappkey-arenababy-FULFIZ",
        "x-vtex-api-apptoken": "GQYKBYZSWAQOERQVMVWBVAELYAPDXOUPXRCZHYHHDZFDPJOOAXEZFQXGMMMAJVUHGARNPQOOOOYWUAVPLACAKUJGTVNULGYHFYXPSBYKJQLQSBMLRWOITTXLRKTTCTCI"
    }
});

export default api;
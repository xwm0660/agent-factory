import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

const agent = new HttpsProxyAgent("http://127.0.0.1:7897");

const res = await axios.get("https://www.google.com", {
  httpsAgent: agent,
});

console.log(res.status);
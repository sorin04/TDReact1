import Mod_crypto from "../../models/crypto/mod_crypto.ts";

export const CreationWebSocket=(url_ws:string,onMessage:(data:Mod_crypto)=> void)=>{
    const wss=new WebSocket(url_ws)
    wss.onmessage=(event.MessageEvent)=>{
        const parsedData=JSON.parse(event.data)
        console.log(parsedData)
        onMessage(parsedData)

    }
    return wss

}
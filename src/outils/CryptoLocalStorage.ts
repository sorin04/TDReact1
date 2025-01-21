import parametres from "../../../public/parametres.json"
import CryptoJs from 'crypto-js'

const SECRET_KEY=parametres.URL_SERVEUR

export const encryptData=(data:string):string=>{
    return CryptoJs.AES.encrypt(data,SECRET_KEY)
}

export const decruptData=cypherText,string): string=>{
    const byte = CryptoJs*
        //arreter la

}
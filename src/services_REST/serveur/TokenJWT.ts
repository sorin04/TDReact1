import ModToken from "../../models/users/ModToken.ts";
import axios from "axios";
import parametres from "../../../public/parametres.json";

const URL_SERVEUR = parametres.URL_SERVEUR;
const URL_AUTH = parametres.URL_AUTH;

export default class TokenJWT {
    static async getTokenJWT(username: string, password: string): Promise<ModToken | null> {
        try {
            const response = await axios.post<ModToken>(`${URL_SERVEUR}${URL_AUTH}`, {
                username: username,
                password: password,
            });

            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération du token JWT :", error);
            return null;
        }
    }
}

export default class Mod_crypto{
    ethereum: string | null
    bitcoin: string | null

    constructor(ethereum: string | null, bitcoin: string | null) {
        this.ethereum = ethereum;
        this.bitcoin = bitcoin;
    }
}
export const ValidationConnexion = {
    login: {
        required: "Le login est requis",
        pattern: {
            value: /^[a-zA-Z0-9_-]{3,20}$/,
            message: "Le login doit contenir entre 3 et 20 caractères (lettres, chiffres, underscores ou tirets uniquement).",
        },
    },
    password: {
        required: "Le mot de passe est requis",
        minLength: {
            value: /^[a-zA-Z0-9_-]{3,20}$/,
            message: "Le mot de passe doit contenir au moins 8 caractères.",
        },
    },
};

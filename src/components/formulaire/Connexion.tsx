import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Typography, CircularProgress } from "@mui/material";
import { ValidationConnexion } from "./ValidationConnexion.ts";
import { useEffect, useState } from "react";
import { ServiceCheckServeurOnline } from "../../services_REST/serveur/ServiceCheckServeurOnline.ts";
import TokenJWT from "../../services_REST/serveur/TokenJWT.ts";


interface FormData {
    login: string;
    password: string;
}

export const Connexion = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [message, setMessage] = useState<string>("Connexion...");
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsLoading(true);
        try {
            const token = await TokenJWT.getTokenJWT(data.login, data.password); // Requête pour le token
            if (token) {
                console.log("Token récupéré :", token);
                setMessage("✅ Connexion réussie !");
            } else {
                setMessage("❌ Échec de la connexion. Vérifiez vos identifiants.");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setMessage("❌ Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        const intervalId = setInterval(() => {
            ServiceCheckServeurOnline()
                .then((etat: boolean) => {
                    if (etat) {
                        setMessage("⚙️ Serveur distant fonctionnel");
                    } else {
                        setMessage("⛓️‍💥 Le serveur distant ne répond pas. Veuillez réessayer plus tard.");
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de la vérification du serveur :", error);
                });
        }, 3500);

        return () => clearInterval(intervalId);
    }, []);


    const setMessageColor = (message: string) => {
        if (message.includes("⚙️")) {
            return "success";
        } else if (message.includes("⛓️‍💥") || message.includes("❌")) {
            return "error";
        } else if (message.includes("✅")) {
            return "primary";
        }
        return "text.secondary";
    };

    return (
        <div className="background"> {}
            <Container maxWidth="sm" sx={{ mt: 5 }}>
                <Box
                    sx={{
                        p: 4,
                        boxShadow: 16,
                        borderRadius: 2,
                        bgcolor: "background.paper",
                    }}
                >
                    <Typography variant="h4" gutterBottom align="center" sx={{ color: "black" }}>
                        Connexion
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", mb: 2 }}
                        color={setMessageColor(message)}
                    >
                        {message}
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register("login", ValidationConnexion.login)}
                            label="Login"
                            type="text"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.login}
                            helperText={errors.login?.message}
                        />
                        <TextField
                            {...register("password", ValidationConnexion.password)}
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isLoading} // Désactiver le bouton si en cours de chargement
                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null} // Animation de chargement
                        >
                            {isLoading ? "Connexion en cours..." : "Se Connecter"}
                        </Button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

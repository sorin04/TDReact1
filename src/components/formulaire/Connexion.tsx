import { useForm, SubmitHandler } from "react-hook-form";
import { Typography, Box, TextField, Button } from "@mui/material";

interface FormData {
    login: string;
    password: string;
}

export const Connexion = () => {
    const {register, handleSubmit, formState: { errors },} = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    };

    return (
            <Box
                sx={{
                    p: 4,
                    boxShadow: 16,
                    borderRadius: 2,
                    backgroundColor: "background.paper",
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Connexion
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            label="Identifiant"
                            fullWidth
                            {...register("login", { required: "L'identifiant est requis" })}
                            error={!!errors.login}
                            helperText={errors.login?.message}
                        />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            label="Mot de passe"
                            type="password"
                            fullWidth
                            {...register("password", { required: "Le mot de passe est requis" })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Box>
                    <Button variant="contained" color="primary" fullWidth type="submit">
                        Se connecter
                    </Button>
                </form>
            </Box>

    );
};

import { useState } from 'react';
import {
    Typography,
    Grid,
    Box,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { toast } from "react-toastify";
import { login } from '../../firebase/firebase';
import { Link } from "react-router-dom";
import { useAppDispatch } from '../../hooks/hook';
import { setUser } from '../../store/slices/userSlice';

const LoginPage = () => {
    const errorToast = () => toast.error("Почта или пароль был введен не верно!");
    const successToast = () => toast.success("Вы успешно вошли в систему!");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch();

    const submit = (event) => {
        event.preventDefault();
        login(email, password)
            .then(() => {
                dispatch(setUser({
                    email: email,
                    id: null,
                    token: null,
                }))
                window?.location?.reload()
                successToast();
            })
            .catch((error) => {
                errorToast();
                console.log(error)
            });
    };

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
                gap: '15%',
            }}
        >
            <Grid sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '80vh'
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    height: '55vh'
                }}>
                    <Typography
                        sx={{
                            textAlign: 'center',
                        }}
                        variant="h2"
                    >
                        Logo
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            fontSize: '25px'
                        }}
                        component="h3"
                    >
                        Welcome to CRM System <br /> Sign In To Tour Account
                    </Typography>
                    <Box>
                        <FormControl
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2, width: '100%' }}
                            variant="outlined"
                        >
                            <InputLabel>Login</InputLabel>
                            <OutlinedInput
                                label="Login"
                                type="email"
                                required
                                name="email"
                                autoComplete="email"
                            />
                        </FormControl>
                        <FormControl
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 4, width: '100%' }}
                            variant="outlined"
                        >
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                                label="Password"
                                type="email"
                                required
                                name="email"
                                autoComplete="email"
                            />
                        </FormControl>
                        <Link to='registration'>У тебя нет аккаунта?</Link>
                        {email && password.length > 5 ? (
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'rgb(32, 101, 209)',
                                    width: '100%',
                                    mt: 1,
                                }}
                                onClick={submit}
                            >
                                <Typography variant='p' sx={{
                                    width: '150px'
                                }}>
                                    Войти
                                </Typography>
                            </Button>
                        ) : (
                            <Button
                                disabled
                                variant="contained"
                                sx={{
                                    backgroundColor: 'rgb(32, 101, 209)',
                                    width: '100%',
                                    mt: 1,
                                }}
                            >
                                <Typography variant='p' sx={{
                                    width: '150px'
                                }}>
                                    Заполните поля
                                </Typography>
                            </Button>
                        )}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}


export default LoginPage;

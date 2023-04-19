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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useAppDispatch } from '../../hooks/hook';
import { setUser } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate()
    const errorToast = () => toast.error("Такой пользователь уже есть либо логин был введен не корректно");
    const successToast = () => toast.success("Вы успешно зарегистрировались!");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch();
    const data = {
        avatar: 'avatar',
        speciality: 'front end dev'
    }

    const submit = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((data) => {
                const user = {
                    email: data.email,
                    id: data.uid,
                    token: data.accessToken,
                }
                dispatch(setUser(user))
                localStorage.setItem('username', JSON.stringify(user));
                navigate('/')
                window.location.reload()
                successToast();
            })
            .catch(() => {
                errorToast();
            })
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
                        Sign Up
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
                                    Зарегистрироваться
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


export default RegisterPage;

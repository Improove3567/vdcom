import {
    Typography,
    Grid,
    Box,
} from '@mui/material';
import scss from "./SideBar.module.scss"
import { sideBarData } from '../../constants/sideBar';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from '../../hooks/hook';
import { setUser } from '../../store/slices/userSlice';

const SideBar = () => {
    const navigate = useNavigate();
    const path = window.location.pathname.split('/')[1];
    const formattedStr = path.replace(/%20/g, " ");
    const dispatch = useAppDispatch()

    const logOut = () => {
        dispatch(setUser({
            email: null,
            id: null,
            token: null,
        }))
        localStorage.removeItem('username');
        navigate('/')
        window.location.reload()
    }

    const searchParams = new URLSearchParams(window.location.search);
    const page = searchParams.get('page');

    const addQuery = (page) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', page);
        navigate({ search: searchParams.toString() });
    }

    return (
        <Grid sx={{
            paddingTop: '50px',
            height: '100vh',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column'
        }} >
            <Grid>
                <Typography variant='h2' sx={{
                    marginLeft: '20px'
                }}>LOGO</Typography>
                <Box sx={{
                    marginTop: '30px'
                }}>
                    {sideBarData.map((el) => (
                        <div className={page === el.title ? scss.activeCard : scss.card} onClick={() => addQuery(el.title)}>
                            <div className={scss.stick}></div>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                cursor: 'pointer',
                                marginLeft: '20px'
                            }}>
                                {el.icon}
                                <p>{el.title}</p>
                            </Box>
                        </div>
                    ))}
                </Box>
            </Grid>
            <Box sx={{
                borderTop: '1px solid black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginBottom: '50px'
            }}>
                <LogoutIcon />
                <Typography variant='p' sx={{
                    fontSize: '20px',
                    fontWeight: '600',
                    cursor: 'pointer'
                }} onClick={logOut}>Log out</Typography>
            </Box>
        </Grid>
    )
}


export default SideBar;

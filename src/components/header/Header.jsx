import { useState } from 'react';
import {
    Typography,
    Grid,
    Box,
    Button,
    IconButton,
} from '@mui/material';
import { Paper } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { useAppSelector } from '../../hooks/hook';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { isAuth } = useAppSelector((state) => state.auth)
    const [search, setSearch] = useState('')
    const navigate = useNavigate();
    const addQuery = () => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('search', search);
        navigate({ search: searchParams.toString() });
    }
    return (
        <Grid sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: '20px',
            paddingLeft: '40px',
            paddingTop: '20px'
        }}>
            <Box>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search by name"
                        inputProps={{ 'aria-label': 'search by name' }}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <Button variant="contained" onClick={addQuery}>Find</Button>
                    </IconButton>
                </Paper>
            </Box>
            <Box>
                <Typography variant='p'>{isAuth.email}</Typography>
            </Box>
        </Grid>
    )
}


export default Header;

import { useState, useMemo, useEffect } from 'react';
import {
    Typography,
    Grid,
    Box,
    Button,
} from '@mui/material';
import { TableRow, TableCell } from '@mui/material';
import ContactTable from '../tables/ContactTable';
import TableContainer from '../tables/TableContainer';
import { Link } from "react-router-dom";
import useContact from '../../hooks/useContact';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../../firebase/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Contacts = () => {
    const { getContacts, contacts, isLoading } = useContact();
    const [data, setData] = useState()
    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.get('search');

    //pagintaion
    const [currentPage, setCurrentPage] = useState(1)
    const [contactPerPage] = useState(5)

    useEffect(() => {
        getContacts();
        if (contacts && !search) {
            setData(contacts)
        }
    }, [contacts])

    const paginate = (event, value) => setCurrentPage(value)

    const lastContactIndex = currentPage * contactPerPage
    const firstContactIndex = lastContactIndex - contactPerPage
    const currentContact = data?.slice(firstContactIndex, lastContactIndex)
    const paginationCount = data?.length / contactPerPage

    const renderList = useMemo(
        () =>
            currentContact?.map((el) => (
                <ContactTable {...el} />
            )),
        [currentContact]
    );

    useMemo(async () => {
        if (search) {
            const q = query(collection(db, "contacts"), where("name", "==", search))
            const data = []
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let obj = {
                    tid: doc.id,
                    ...doc.data(),
                };
                data.push(obj);
            });
            setData(data);
        }
    }, [searchParams])

    const renderPreloader = (
        <Box sx={{
            position: 'absolute',
            top: '35%',
            left: '60%'
        }}>
            <CircularProgress />
        </Box>
    )


    return (
        <Grid sx={{
            backgroundColor: '#F1F1F1 ',
            marginLeft: '40px',
            padding: '20px'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',

            }}>
                <Typography variant='h3'>Total Contacts</Typography>
                <Link to="/create-user">
                    <Button variant="contained" sx={{
                        width: '100px',
                        height: '40px'
                    }}>Add +</Button>
                </Link>
            </Box>
            <TableContainer
                Header={
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>Client name</TableCell>
                        <TableCell>TRN/PPSN</TableCell>
                        <TableCell>Year end</TableCell>
                        <TableCell>ARD</TableCell>
                        <TableCell>Company number</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone number</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell align='right'></TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                }
                Body={isLoading ? renderPreloader : renderList}
            />
            <Stack spacing={2}>
                <Pagination count={Math.ceil(paginationCount)} page={currentPage} variant="outlined" shape="rounded" onChange={paginate} />
            </Stack>

        </Grid>
    )
}


export default Contacts;

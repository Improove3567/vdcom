import { TextField } from "@mui/material";
import {
    Grid,
    Button,
} from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import useContact from "../../hooks/useContact";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const EditUserPage = () => {
    const { getContactDetail, contactDetail, updateContact } = useContact();
    const navigate = useNavigate();
    const id = window.location.pathname.split('/')[2];
    useEffect(() => {
        if (id) {
            getContactDetail(id);
        }
    }, [])
    //states
    const [isSending, setSending] = useState(false)
    const [name, setName] = useState();
    const [trn, setTrn] = useState();
    const [companyNumber, setCompanyNumber] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState()
    const [address, setAddress] = useState();
    const [yearEnd, setYearEnd] = useState();
    const [ard, setArd] = useState()
    useEffect(() => {
        if (contactDetail) {
            setName(contactDetail.name)
            setTrn(contactDetail.trn)
            setCompanyNumber(contactDetail.companyNumber)
            setEmail(contactDetail?.email)
            setPhoneNumber(contactDetail?.phoneNumber)
            setAddress(contactDetail?.address)
            setYearEnd(contactDetail?.yearEnd)
            setArd(contactDetail?.ard)
        }
    }, contactDetail)


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSending) return null;
        updateContact(id, {
            name: name,
            trn: trn,
            companyNumber: companyNumber,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            yearEnd: yearEnd,
            ard: ard
        }).finally(() => {
            setSending(false);
        })
            .then(() => {
                toast.success("User has been updated successfuly!");
                navigate('/')
            }).catch((error) => {
                console.log(error)
                toast.error("Something went wrong")
            })
    };
    if (!contactDetail) return (
        <Box sx={{
            position: 'absolute',
            top: '35%',
            left: '60%'
        }}>
            <CircularProgress />
        </Box>
    )
    return (
        <form onSubmit={handleSubmit}>
            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <h1>Edit user</h1>
                <Grid sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    width: '100%',
                    gap: '20px'
                }}>
                    <TextField
                        sx={{ width: '40%' }}
                        id="outlined-basic"
                        label="Name"
                        type="string"
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        sx={{ width: '40%' }}
                        id="outlined-basic"
                        label="TRN/PSN"
                        type="number"
                        name='trn'
                        value={trn}
                        onChange={(e) => setTrn(e.target.value)}
                    />
                    <TextField
                        sx={{ width: '40%' }}
                        id="outlined-basic"
                        label="Company number"
                        type="number"
                        name='companyNumber'
                        value={companyNumber}
                        onChange={(e) => setCompanyNumber(e.target.value)}
                    />
                    <TextField
                        sx={{ width: '40%' }}
                        id="outlined-basic"
                        label="Email"
                        type="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        sx={{ width: '40%' }}
                        id="outlined-basic"
                        label="Phone number"
                        type="number"
                        name='phoneNumber'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <TextField
                        sx={{ width: '40%' }}
                        id="outlined-basic"
                        label="Company address"
                        type="string"
                        name='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                        id="date"
                        label="Year end"
                        type="date"
                        name="yearEnd"
                        value={yearEnd}
                        sx={{ width: '40%' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setYearEnd(e.target.value)}
                    />
                    <TextField
                        id="date"
                        label="ARD"
                        type="date"
                        name="ARD"
                        value={ard}
                        sx={{ width: '40%' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setArd(e.target.value)}
                    />
                </Grid>
                <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                        width: '15%',
                        display: 'flex',
                        justifyContent: 'center',
                        minHeight: '50px',
                        marginTop: '20px',
                        '@media(max-width: 425px)': {
                            fontSize: '12px',
                        },
                    }}
                >
                    Save
                </Button>
            </Grid>
        </form>
    )
};

export default EditUserPage;
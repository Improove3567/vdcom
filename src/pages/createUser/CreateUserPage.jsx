import { TextField } from "@mui/material";
import {
    Grid,
    Button,
} from '@mui/material';
import { inputsList } from "../../constants/createUser";
import { useMemo, useState } from "react";
import useContact from "../../hooks/useContact";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const CreateUserPage = () => {
    const [isSending, setSending] = useState(false);
    const [formData, setFormData] = useState(new FormData())
    const [newFormData, setNewFormData] = useState()
    const { addContact } = useContact();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        formData.append(name, value);
    };


    const renderList = useMemo(() => (
        inputsList.map((el) => (
            <TextField
                sx={{ width: '40%' }}
                id="outlined-basic"
                label={el.label}
                type={el.type}
                name={el.name}
                onChange={handleInputChange}
            />
        ))
    ), [inputsList])


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formObject = Object.fromEntries(formData.entries());
        setNewFormData(formObject)
        if (isSending) return null;
        if (formObject) {
            addContact({
                name: formObject.name,
                trn: formObject.trn,
                companyNumber: formObject.companyNumber,
                email: formObject.email,
                phoneNumber: formObject.phoneNumber,
                address: formObject.address,
                yearEnd: formObject.yearEnd,
                ard: formObject.ARD
            }).finally(() => {
                setSending(false);
            })
                .then(() => {
                    toast.success("User has been added successfuly!");
                    navigate('/')
                }).catch((error) => {
                    console.log(error)
                    toast.error("Something went wrong")
                })

        }
    };

    // if (isLoading) return (
    //     <Box sx={{
    //         position: 'absolute',
    //         top: '35%',
    //         left: '60%'
    //     }}>
    //         <CircularProgress />
    //     </Box>
    // );

    return (
        <form onSubmit={handleSubmit}>
            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <h1>Create user</h1>
                <Grid sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    width: '100%',
                    gap: '20px'
                }}>
                    {renderList}
                    <TextField
                        id="date"
                        label="Year end"
                        type="date"
                        name="yearEnd"
                        sx={{ width: '40%' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="date"
                        label="ARD"
                        type="date"
                        name="ARD"
                        sx={{ width: '40%' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleInputChange}
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

export default CreateUserPage;
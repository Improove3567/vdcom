import React from 'react';
import { TableCell } from '@mui/material';
import TableCellContainer from './TableCellContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { db } from '../../firebase/firebase';
import { deleteDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ContactTable = ({
    tid,
    name,
    phoneNumber,
    email,
    trn,
    yearEnd,
    ard,
    companyNumber,
    address
}) => {
    const navigate = useNavigate();
    const onDelete = async (e) => {
        e.stopPropagation();
        const res = window?.confirm("Вы действительно хотите удалить пользотвалея " + name + '?');
        if (res) {
            await deleteDoc(doc(db, "contacts", tid));
            window?.location?.reload()
        }
    };

    return (
        <TableCellContainer>
            <TableCell component="th" scope="row">
                {tid}
            </TableCell>
            <TableCell align="left">{name}</TableCell>
            <TableCell align="left">{trn}</TableCell>
            <TableCell align="left">{yearEnd}</TableCell>
            <TableCell align="left">{ard}</TableCell>
            <TableCell align="left">{companyNumber}</TableCell>
            <TableCell align="left">{email}</TableCell>
            <TableCell align="left">{phoneNumber}</TableCell>
            <TableCell align="left">{address}</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="right" sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <EditIcon sx={{
                    marginRight: '0px'
                }}
                    onClick={() => navigate(`contact/${tid}`)}
                />
                <DeleteIcon onClick={onDelete} sx={{
                    marginRight: '10px'
                }} />
            </TableCell>
        </TableCellContainer>
    );
}


export default ContactTable;

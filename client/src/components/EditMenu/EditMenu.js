import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Modal, Slide } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import Server from '../../Axios/ServerAPI';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const EditMenu = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const tableName = useSelector(state => state.tableName);
    const editModal = useSelector(state => state.editModal);

    // {Kode_Obat: "SRSCF1723", Nama_Obat: "SUCRALFATE", Bentuk_Obat: "Syrup", 
    // Tgl_Produksi: "2017-03-22T17:00:00.000Z", Tgl_Kadaluarsa: "2023-03-19T17:00:00.000Z", …}
    const defaultData = useSelector(state => state.defaultData);

    //[{"Field":"Kode_Obat","Type":"varchar(10)","Null":"NO","Key":"PRI","Default":null,"Extra":""},
    const [tableDesc, setTableDesc] = useState([{}]);

    const [editFields, setEditFields] = useState({});

    const saveChanges = (e) => {
        e.preventDefault();
        Server.editTableFields(tableName, editFields, defaultData)
            .then(res => {
                dispatch(actions.diasbleEditModal());
                return res
            });
    }

    const onOpenHandler = () => {
        setEditFields()
        Server.fetchTableDesc(tableName).then(response => {
            setTableDesc(response.data);
        })
    }

    const onCloseHandler = () => {
        dispatch(actions.diasbleEditModal());
    }


    let modalContent = (
        <form className={classes.paper}>
            <h2>Edit Value</h2>
            <table style={{ width: "100%" }}>
                <thead>
                    <tr>
                        {
                            tableDesc ?
                                Object.keys(tableDesc[0]).map((columnName, colId) => {
                                    return (
                                        <th key={colId}>
                                            {columnName}
                                        </th>
                                    )
                                }) : null
                        }
                        <th>
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        defaultData ?
                            Object.keys(defaultData).map((dataName, dataID) => {
                                return (
                                    tableDesc[dataID] ?
                                        <tr key={dataName}>
                                            {
                                                Object.keys(tableDesc[dataID]).map((descName, descId) => {
                                                    return (
                                                        <td key={descName}>{tableDesc[dataID][descName]}</td>
                                                    )
                                                })
                                            }
                                            <td>
                                                <input
                                                    defaultValue={defaultData[dataName]}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        setEditFields(prevValue => {
                                                            return {
                                                                ...prevValue,
                                                                [dataName]: value,
                                                            }
                                                        })
                                                    }}
                                                ></input>
                                            </td>
                                        </tr>
                                        : null
                                )
                            }) : null
                    }
                </tbody>
            </table>
            <button onClick={(e) => {
                e.preventDefault();
                onCloseHandler();
            }}>Cancel</button>
            <button onClick={(e) => saveChanges(e)}>Save Changes</button>
        </form>
    )

    return (
        <Dialog
            open={editModal}
            TransitionComponent={Transition} 
            onEnter={onOpenHandler}
            onClose={onCloseHandler}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Edit Table"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                {modalContent}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseHandler} color="primary">
                    Disagree
          </Button>
                <Button onClick={onCloseHandler} color="primary">
                    Agree
          </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditMenu;
import React, { useEffect, useState } from 'react';
import AddRowToTable from '../AddRowToTable/AddRowToTable';
import Server from '../../Axios/ServerAPI';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import Notification from '../Notification/Notification'
import { Button, Grid, makeStyles, Paper } from '@material-ui/core';
import OptionMenu from '../../container/AdminPage/Statistic/StatisticPage/OptionMenu';

const useStyles = makeStyles((theme) => ({
    spacer: theme.mixins.toolbar,
}))

const direction = ['Ascending', 'Descending'];

const Table = ({ tableName, editable, showHeader, table }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([{}]);
    const [sortedTableData, setSortedTableData] = useState([]);
    const [properties, setProperties] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElDir, setAnchorEDir] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedDirection, setSelectedDirection] = React.useState(0);

    // Start
    useEffect(() => {
        if (tableName) {
            update();
        }
        else {
            setTableData(table)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableName, table])

    useEffect(() => { 
        sortTable(); 
        if(tableData.length > 0){
            setProperties(Object.keys(tableData[0]).map((value) => { 
                return value;
            }));
        }
    }, [tableData]) 

    useEffect(() => {
        sortTable();  
    }, [selectedIndex, selectedDirection]) 

    const sortTable = () => { 
        let clone = [...tableData]; 
        clone.sort((a, b) => {
            if (a[properties[selectedIndex]] < b[properties[selectedIndex]]) {
                return direction[selectedDirection] === 'Ascending' ? -1 : 1;
            }
            if (a[properties[selectedIndex]] > b[properties[selectedIndex]]) {
                return direction[selectedDirection] === 'Ascending' ? 1 : -1;
            }
            return 0;
        })
        setSortedTableData(clone);
    }  

    const update = () => {
        Server.fetchTableData(tableName).then(res => { setTableData(res.data) })
    }

    const editHandler = (defaultData) => {
        dispatch(actions.setEditModal(true, defaultData, tableName, update));
    }

    const deleteHandler = (columnName, value) => {
        Server.deleteFromTable(tableName, columnName, value).then(res => {
            update();
        }) 
    }  
    
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClickListItemDir = (event) => {
        setAnchorEDir(event.currentTarget);
      }
    
      const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        handleClose();
      };

      const handleMenuItemClickDir = (event, index) => {
          setSelectedDirection(index);
          handleCloseDir();
      }

      const handleCloseDir = () => {
        setAnchorEDir(null);
      }
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    let actionHeader = <th>Action</th>;

    let addButton = <AddRowToTable
        tableName={tableName}
        onClick={update}
    ></AddRowToTable>

    if (tableData?.length <= 0) {
        actionHeader = <th>Empty Table</th>
    }

    if (!editable) {
        addButton = null;
        actionHeader = null;
    } 

    return (
        <div>
            {showHeader ? <h2>{tableName}</h2> : null}  
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Paper style={{marginBottom: '16px'}}>
                        <OptionMenu
                            title={'Sort By'}
                            options={properties ? properties : ['Nothing']}
                            selectedIndex={selectedIndex}
                            handleClickListItem={handleClickListItem}
                            handleClose={handleClose}
                            handleMenuItemClick={handleMenuItemClick}
                            anchorEl={anchorEl} 
                        />
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper style={{marginBottom: '16px'}}>
                        <OptionMenu
                            title={'Direction'}
                            options={direction}
                            selectedIndex={selectedDirection}
                            handleClickListItem={handleClickListItemDir}
                            handleClose={handleCloseDir}
                            handleMenuItemClick={handleMenuItemClickDir}
                            anchorEl={anchorElDir} 
                        />
                    </Paper>
                </Grid>
            </Grid>

            <table style={{ width: "100%", textAlign: 'center' }}>
                <thead>
                    <tr>
                        { // Render table column name 
                            sortedTableData?.[0] ?
                                Object.keys(sortedTableData[0]).map((columnName, index) => {
                                    return <th key={index}>{columnName}</th>
                                })
                                : null
                        }
                        {actionHeader}
                    </tr>
                </thead>
                <tbody>
                    {// Render table content  
                        sortedTableData?.length > 0 ?
                            sortedTableData.map((objectData, objId) => {
                                return (
                                    <tr key={objId}>
                                        {
                                            objectData ?
                                                Object.keys(objectData).map((keyName, index) => {
                                                    return (<td key={objId + " " + index}>{objectData[keyName]}</td>)
                                                })
                                                : null
                                        }
                                        {
                                            editable ?
                                                <td width='150px'>
                                                    <Button
                                                        color='primary'
                                                        style={{ width: '50%' }}
                                                        onClick={() => {
                                                            editHandler(objectData);
                                                        }}>Edit</Button>
                                                    <Button
                                                        color='primary'
                                                        style={{ width: '50%' }}
                                                        onClick={() => {
                                                            const columnName = Object.keys(objectData)[0];
                                                            deleteHandler(columnName, objectData[columnName]);
                                                        }
                                                        }>Delete</Button>
                                                </td>
                                                : null
                                        }
                                    </tr>
                                )
                            }) : <div> Tabel Kosong </div>
                    }
                </tbody>
            </table>
            {addButton}
            <div className={classes.spacer} />
        </div>
    )
}

export default Table;
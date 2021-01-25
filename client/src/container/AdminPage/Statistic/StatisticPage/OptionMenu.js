import { List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import React from 'react';

const OptionMenu = ({title, handleClickListItem, options, handleClose, selectedIndex, handleMenuItemClick, anchorEl}) => { 
    
    return (
        <div>
            <List component="nav" aria-label="Device settings">
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="Waktu Penjualan"
                    onClick={handleClickListItem}
                >
                    <ListItemText primary={title} secondary={options[selectedIndex]} />
                </ListItem>
            </List>

            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default OptionMenu;
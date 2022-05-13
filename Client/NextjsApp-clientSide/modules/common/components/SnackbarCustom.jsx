import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/material';
import { Alert } from '@mui/material';
const SnackbarCustom = (props) =>{
    const [open,setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );
    return (<>
    <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar 
        open={open}
        autoHideDuration={6000}
        message={props.title}
        action={action}
        severity={props.alert}
        ><Alert severity={props.alert}>{props.title}</Alert></Snackbar>
    </Stack></>
    )
}

export default React.memo(SnackbarCustom);
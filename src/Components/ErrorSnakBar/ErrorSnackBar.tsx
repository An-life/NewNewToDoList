import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {AppRootType} from '../../state/Store';
import {useDispatch, useSelector} from 'react-redux';
import {setAppErrorAC} from '../../state/appReducer';

//component
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//component
export function ErrorSnackbars() {
    // const [open, setOpen] = React.useState(false);
    const error = useSelector<AppRootType, string | null>(state => state.app.error)
    console.log('error', error)
    const dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
        // setOpen(false);
    };


    const isOpen = error !== null

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                Error message!
            </Alert>
        </Snackbar>
    );
}
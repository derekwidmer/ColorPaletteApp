import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function PaletteMetaForm({ palettes, handleSubmit }) {
    const [open, setOpen] = React.useState(true);
    const [newPaletteName, setPaletteName] = React.useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() =>
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
            return palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== newPaletteName.toLowerCase()
            );
        })
    );

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Name Your Palette</DialogTitle>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>

                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your new palette. Make sure it is unique!
                    </DialogContentText>
                    <TextValidator
                        label="Palette Name"
                        value={newPaletteName}
                        name="newPaletteName"
                        onChange={evt => { setPaletteName(evt.target.value) }}
                        validators={['required', 'isPaletteNameUnique']}
                        errorMessages={['Palette name required', 'Palette name must be unique']}
                        fullWidth
                        margin="normal"
                    />


                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    /> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Save
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}

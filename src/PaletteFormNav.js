import React from 'react'
import clsx from 'clsx';
import { Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

export default function PaletteFormNav({ classes, open, handleSubmit, palettes, handleDrawerOpen }) {

    const [newPaletteName, setPaletteName] = React.useState("")

    React.useEffect(() =>
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
            return palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== newPaletteName.toLowerCase()
            );
        }));

    return (
        <div>
            <CssBaseline />
            <AppBar
                position="fixed"
                color="default"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Persistent drawer
                    </Typography>
                    <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                        <TextValidator
                            label="Palette Name"
                            value={newPaletteName}
                            name="newPaletteName"
                            onChange={evt => { setPaletteName(evt.target.value) }}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={['Palette name required', 'Palette name must be unique']}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save Palette
                        </Button>
                        <Link to="/"><Button variant="contained" color="secondary">Go Back</Button></Link>
                    </ValidatorForm>
                </Toolbar>
            </AppBar>
        </div>
    )
}

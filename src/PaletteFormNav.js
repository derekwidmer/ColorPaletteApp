import React from 'react'
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const drawerWidth = 450;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        height: "64px"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    navBtns: {
        display: "flex"
    }
}));

export default function PaletteFormNav({ open, handleSubmit, palettes, handleDrawerOpen }) {
    const classes = useStyles();
    const [newPaletteName, setPaletteName] = React.useState("")

    React.useEffect(() =>
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
            return palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== newPaletteName.toLowerCase()
            );
        }));

    return (
        <div className={classes.root}>
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
                        Create a Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
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
                    </ValidatorForm>
                    <Link to="/"><Button variant="contained" color="secondary">Go Back</Button></Link>
                </div>

            </AppBar>
        </div>
    )
}

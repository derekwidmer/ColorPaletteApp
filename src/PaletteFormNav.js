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
import PaletteMetaForm from './PaletteMetaForm';

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
        alignItems: "center",
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
    navButtons: {
        marginRight: "1rem",
        alignItems: "center"
    },
    button: {
        margin: "0 0.5rem",
    },
    link: {
        textDecoration: "none"
    }
}));

export default function PaletteFormNav({ open, handleSubmit, palettes, handleDrawerOpen }) {
    const classes = useStyles();
    const [formShowing, updateFormShowing] = React.useState(false)

    const showForm = () => {
        updateFormShowing(!formShowing)
    }

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
                <div className={classes.navButtons}>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={showForm}
                    >
                        Save Palette
                    </Button>
                    <Link to="/" className={classes.link}><Button variant="contained" color="secondary" className={classes.button}>Go Back</Button></Link>
                </div>
            </AppBar>
            {!formShowing && <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} />}
        </div>
    )
}

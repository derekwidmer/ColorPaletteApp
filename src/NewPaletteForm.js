import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button'
import { ChromePicker } from 'react-color'
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
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
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        // padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));


export default function NewPaletteForm(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [currentColor, setColor] = React.useState("teal");
    const [colors, updateColors] = React.useState([])
    const [newColorName, setName] = React.useState("")
    const [newPaletteName, setPaletteName] = React.useState("")

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function addNewColor() {
        let newColor = { color: currentColor, name: newColorName }
        updateColors(oldColors => [...oldColors, newColor]);
        setName("");
    };

    function savePalette() {
        let newName = newPaletteName;
        const newPalette = { paletteName: newName, colors, id: newName.toLowerCase().replace(/ /g, "-") }
        props.savePalette(newPalette);
        props.history.push('/');
    }

    React.useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", value => {
            return colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule("isColorUnique", value => {
            return colors.every(
                ({ color }) =>
                    color.toLowerCase() !== currentColor.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
            return props.palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== newPaletteName.toLowerCase()
            );
        });
    });

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
                        Persistent drawer
                    </Typography>
                    <ValidatorForm onSubmit={savePalette}>
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
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Typography variant="h4">Design Your Palette</Typography>
                <div>
                    <Button variant="contained" color="secondary">Clear Palette</Button>
                    <Button variant="contained" color="primary">Random Color</Button>
                </div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={(newColor) => { setColor(newColor.hex) }}
                />
                <ValidatorForm onSubmit={addNewColor}>
                    <TextValidator
                        value={newColorName}
                        name={newColorName}
                        onChange={(evt) => setName(evt.target.value)}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['Color name required', 'Color name must be unique', 'Color must be unique']}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: currentColor }}
                        type="submit"
                    >Add Color
                    </Button>
                </ValidatorForm>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {colors.map(color => (<DraggableColorBox {...color} />))}
            </main>
        </div >
    );
}


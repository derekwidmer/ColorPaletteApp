import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button'
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

const drawerWidth = 450;

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
        padding: theme.spacing(3),
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


export default function NewPaletteForm(props, { maxColors = 20 }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [colors, updateColors] = React.useState([...props.palettes[0].colors])

    const paletteFull = colors.length >= maxColors;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };



    function handleSubmit(newPaletteName) {
        let newName = newPaletteName;
        const newPalette = { paletteName: newName, colors, id: newName.toLowerCase().replace(/ /g, "-") }
        props.savePalette(newPalette);
        props.history.push('/');
    }

    function deleteColor(deleteName) {
        updateColors(oldColors => [...oldColors.filter(color => color.name !== deleteName)])
    }

    function onSortEnd({ oldIndex, newIndex }) {
        updateColors(oldColors => arrayMove(oldColors, oldIndex, newIndex))
    }

    function clearColors() {
        updateColors([])
    }

    function addRandColor() {
        const allColors = props.palettes.map(p => p.colors).flat();
        let rand = Math.floor(Math.random() * allColors.length)
        const newColor = allColors[rand]
        updateColors(oldColors => [...oldColors, newColor])
    }

    return (
        <div className={classes.root}>
            <PaletteFormNav
                classes={classes}
                open={open}
                palettes={props.palettes}
                handleSubmit={handleSubmit}
                handleDrawerOpen={handleDrawerOpen}
            />
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
                    <Button variant="contained" color="secondary" onClick={clearColors}>Clear Palette</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addRandColor}
                        disabled={paletteFull}
                    >
                        {paletteFull ? 'Palette Full' : 'Random Color'}
                    </Button>
                </div>
                <ColorPickerForm paletteFull={paletteFull} updateColors={updateColors} colors={colors} />
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorList
                    colors={colors}
                    deleteColor={deleteColor}
                    axis="xy"
                    onSortEnd={onSortEnd}
                />
            </main>
        </div >
    );
}


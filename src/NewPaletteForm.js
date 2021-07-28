import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button'
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

const drawerWidth = 450;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
        display: "flex",
        alignItems: "center"
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
    container: {
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    buttons: {
        width: "100%"
    },
    button: {
        width: "50%"
    }
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
                <div className={classes.container}>
                    <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
                    <div className={classes.buttons}>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="secondary"
                            onClick={clearColors}
                        >
                            Clear Palette
                        </Button>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={addRandColor}
                            disabled={paletteFull}
                        >
                            {paletteFull ? 'Palette Full' : 'Random Color'}
                        </Button>
                    </div>
                    <ColorPickerForm paletteFull={paletteFull} updateColors={updateColors} colors={colors} />
                </div>
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


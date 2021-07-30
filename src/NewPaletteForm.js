import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
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
import styles from './styles/NewPaletteFormStyles'


function NewPaletteForm(props, { maxColors = 20 }) {
    const { classes } = props;
    const [open, setOpen] = React.useState(false);
    const [colors, updateColors] = React.useState([...props.palettes[0].colors])

    const paletteFull = colors.length >= maxColors;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function handleSubmit(newPalette) {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
        newPalette.colors = colors;
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

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
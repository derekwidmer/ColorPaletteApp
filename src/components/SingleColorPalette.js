import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ColorBox from './ColorBox'
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles'
import styles from '../styles/PaletteStyles'

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format: 'hex'
        }
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
        this.changeFormat = this.changeFormat.bind(this)
    }

    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;
        for (let level in allColors) {
            shades = shades.concat(allColors[level].filter(color => color.id === colorToFilterBy))
        }
        return shades.slice(1);
    }

    changeFormat(value) {
        this.setState({ format: value })
    }

    render() {
        const colorBoxes = this._shades.map(color => (
            <ColorBox
                key={color.name}
                name={color.name}
                background={color[this.state.format]}
                showingFullPalette={false}
            />));
        const { paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.changeFormat} />
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={`${classes.ColorBox} ${classes.back}`}>
                        <Link to={`/palette/${id}`}>Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);
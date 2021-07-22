import React, { Component } from 'react'
import ColorBox from './ColorBox'
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    colors: {
        height: "90%",
    },
    back: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
        opacity: "1",
        backgroundColor: "black",
        "& a": {
            width: "100px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            top: "50%",
            left: "50%",
            marginLeft: "-50px",
            marginTop: "-15px",
            textAlign: "center",
            outline: "none",
            background: "rgba(255,255,255,0.3)",
            fontSize: "1rem",
            lineHeight: "30px",
            textTransform: "uppercase",
            border: "none",
            transition: "0.5s opacity ease",
            textDecoration: "none",
            color: "white"
        }
    }
}

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
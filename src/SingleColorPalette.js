import React, { Component } from 'react'
import ColorBox from './ColorBox'
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

export default class SingleColorPalette extends Component {
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
                key={color.id}
                name={color.name}
                background={color[this.state.format]}
                showLink={false}
            />));
        const { paletteName, emoji } = this.props.palette;
        return (
            <div className="Palette">
                <Navbar handleChange={this.changeFormat} />
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

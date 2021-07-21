import React, { Component } from 'react'
import ColorBox from './ColorBox'

export default class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format: 'hex'
        }
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
    }
    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;
        for (let level in allColors) {
            shades = shades.concat(allColors[level].filter(color => color.id === colorToFilterBy))
        }
        return shades.slice(1);
    }
    render() {
        const colorBoxes = this._shades.map(color => (
            <ColorBox
                key={color.id}
                name={color.name}
                background={color.hex}
                showLink={false}
            />));
        return (
            <div className="Palette">
                <h1>Single Color Palette</h1>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

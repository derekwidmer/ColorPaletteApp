import './App.css';
import Palette from './Palette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'
import { Route, Switch } from 'react-router-dom'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import React from 'react';




function App() {

  const [palettes, updatePalettes] = React.useState(seedColors)

  const findPalette = (id) => {
    return palettes.find(function (palette) {
      return palette.id === id;
    });
  }

  const savePalette = (newPalette) => {
    updatePalettes(oldPalettes => ([...oldPalettes, newPalette]))
  }

  return (
    <Switch>
      <Route exact path="/" render={routeProps => (<PaletteList palettes={palettes} {...routeProps} />)} />
      <Route exact path="/palette/new" render={routeProps => (<NewPaletteForm {...routeProps} savePalette={savePalette} palettes={palettes} />)} />
      <Route
        exact path="/palette/:id"
        render={routeProps => <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} />}
      />
      <Route
        exact path="/palette/:paletteId/:colorId"
        render={routeProps => (
          <SingleColorPalette
            palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
            colorId={routeProps.match.params.colorId}
          />)
        }
      />
    </Switch>
    // <div className="App">
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

export default App;

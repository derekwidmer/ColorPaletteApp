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
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
  const [palettes, updatePalettes] = React.useState(savedPalettes || seedColors)

  const findPalette = (id) => {
    return palettes.find(function (palette) {
      return palette.id === id;
    });
  }

  const deletePalette = (id) => {
    updatePalettes(oldPalettes => (oldPalettes.filter(palette => palette.id !== id)))
  }

  const savePalette = (newPalette) => {
    updatePalettes(oldPalettes => ([...oldPalettes, newPalette]))
  }

  const syncLocalStorage = () => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes))
  }

  React.useEffect(() => {
    syncLocalStorage()
  });

  return (
    <Switch>
      <Route exact path="/" render={routeProps => (<PaletteList palettes={palettes} deletePalette={deletePalette} {...routeProps} />)} />
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

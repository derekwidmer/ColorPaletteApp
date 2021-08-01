import './App.css';
import Palette from './Palette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'
import { Route, Switch } from 'react-router-dom'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

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
    <Route render={({ location }) => (
      <TransitionGroup>
        <CSSTransition key={location.key} classNames='fade' timeout={500} >
          <Switch location={location}>
            <Route
              exact path="/"
              render={routeProps => (
                <div className="page">
                  <PaletteList
                    palettes={palettes}
                    deletePalette={deletePalette} {...routeProps} />
                </div>
              )}
            />
            <Route
              exact path="/palette/new"
              render={routeProps => (
                <div className="page">
                  <NewPaletteForm {...routeProps}
                    savePalette={savePalette}
                    palettes={palettes} />
                </div>
              )}
            />
            <Route
              exact path="/palette/:id"
              render={routeProps => (
                <div className="page">
                  <Palette
                    palette={generatePalette(findPalette(routeProps.match.params.id))}
                  />
                </div>
              )}
            />
            <Route
              exact path="/palette/:paletteId/:colorId"
              render={routeProps => (
                <div className="page">
                  <SingleColorPalette
                    palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
                    colorId={routeProps.match.params.colorId}
                  />
                </div>
              )}
            />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )}>
    </Route>
  );
}

export default App;

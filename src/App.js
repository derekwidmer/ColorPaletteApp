import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Page from './components/Page'
import Palette from './components/Palette'
import SingleColorPalette from './components/SingleColorPalette';
import PaletteList from './components/PaletteList'
import seedColors from './helpers/seedColors'
import NewPaletteForm from './components/NewPaletteForm';
import { generatePalette } from './helpers/colorHelpers'


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
        <CSSTransition key={location.key} classNames='page' timeout={250} >
          <Switch location={location}>
            <Route
              exact path="/"
              render={routeProps => (
                <Page>
                  <PaletteList
                    palettes={palettes}
                    deletePalette={deletePalette} {...routeProps} />
                </Page>
              )}
            />
            <Route
              exact path="/palette/new"
              render={routeProps => (
                <Page>
                  <NewPaletteForm {...routeProps}
                    savePalette={savePalette}
                    palettes={palettes} />
                </Page>
              )}
            />
            <Route
              exact path="/palette/:id"
              render={routeProps => (
                <Page>
                  <Palette
                    palette={generatePalette(findPalette(routeProps.match.params.id))}
                  />
                </Page>
              )}
            />
            <Route
              exact path="/palette/:paletteId/:colorId"
              render={routeProps => (
                <Page>
                  <SingleColorPalette
                    palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
                    colorId={routeProps.match.params.colorId}
                  />
                </Page>
              )}
            />
            <Route
              render={routeProps => (
                <Page>
                  <PaletteList
                    palettes={palettes}
                    deletePalette={deletePalette} {...routeProps} />
                </Page>
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

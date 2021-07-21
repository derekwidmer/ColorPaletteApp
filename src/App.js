import './App.css';
import Palette from './Palette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'
import { Route, Switch } from 'react-router-dom'
import PaletteList from './PaletteList'

function findPalette(id) {
  return seedColors.find(function (palette) {
    return palette.id === id;
  });
}

function App() {
  return (
    <Switch>
      <Route exact path="/" render={routeProps => (<PaletteList palettes={seedColors} {...routeProps} />)} />
      <Route
        exact path="/palette/:id"
        render={routeProps => <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} />}
      />
      <Route
        exact path="/palette/:paletteID/:colorID"
        render={() => <h1>Single Color Page</h1>}
      />
    </Switch>
    // <div className="App">
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

export default App;

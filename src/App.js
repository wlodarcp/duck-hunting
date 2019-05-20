import React from 'react';
import './App.css';
import Grid from "@material-ui/core/Grid";
import {GameTooltipContainer} from "./containers/GameTooltipContainer.js"
import {CanvasContainer} from "./containers/CanvasContainer.js"

function App() {
    return (
        <div className="App">
            <Grid container>
                <Grid item xs={12}>
                    <CanvasContainer/>
                </Grid>
                <Grid item xs={12}>
                    <GameTooltipContainer/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;

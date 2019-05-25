import React from 'react';
import './App.css';
import Grid from "@material-ui/core/Grid";
import {GameTooltipContainer} from "./containers/GameTooltipContainer.js"
import {CanvasContainer} from "./containers/CanvasContainer.js"
import {ScoreCounterContainer} from "./containers/ScoreCounterContainer.js"
import ArcherPicker from "./components/ArcherPicker";

function App() {
    return (
        <div className="App">
            <Grid container spacing={8}>
                <Grid item xs>
                    <CanvasContainer/>
                </Grid>
                <Grid item xs>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <ScoreCounterContainer/>
                        </Grid>
                        <Grid item xs={12}>
                            <ArcherPicker/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    <GameTooltipContainer/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;

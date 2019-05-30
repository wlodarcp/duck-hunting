import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import {GameWindowContainer} from "../../containers/GameWindowContainer";
import {GameTooltipContainer} from "../../containers/GameTooltipContainer";
import InformationGrid from "../informationgrid/InformationGrid";

function DuckHuntingGame() {
    return (
        <div className="App">
            <Grid container spacing={8}>
                <Grid item xs>
                    <GameWindowContainer/>
                </Grid>
                <Grid item xs>
                    <InformationGrid/>
                </Grid>
                <Grid item xs={8}>
                    <GameTooltipContainer/>
                </Grid>
            </Grid>
        </div>
    );
}

export default DuckHuntingGame;
import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import {ScoreCounterContainer} from "../../containers/ScoreCounterContainer";
import {ArchersPickerPanelContainer} from "../../containers/ArcherPickerPanelContainer";
import {LocationPickerPanelContainer} from "../../containers/LocationPickerPanelContainer";

function InformationGrid() {
    return (
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <ScoreCounterContainer/>
                </Grid>
                <Grid item xs={12}>
                    <ArchersPickerPanelContainer/>
                </Grid>
                <Grid item xs={12}>
                    <LocationPickerPanelContainer/>
                </Grid>
            </Grid>
    );
}

export default InformationGrid;
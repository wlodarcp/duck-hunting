import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import {ScoreCounterContainer} from "../../containers/ScoreCounterContainer";
import {ArchersPickerPanelContainer} from "../../containers/ArcherPickerPanelContainer";
import {LocationPickerPanelContainer} from "../../containers/LocationPickerPanelContainer";
import {ExtraTimeCardContainer} from "../../containers/ExtraTimeCardContainer";

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
            <Grid item xs={12}>
                <ExtraTimeCardContainer/>
            </Grid>
        </Grid>
    );
}

export default InformationGrid;
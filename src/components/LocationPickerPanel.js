import React from "react";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import archers from "./util/Archers";
import ArcherPicker from "./archerpicker/ArcherPicker";
import {withStyles} from "@material-ui/core";
import locations from "./util/Locations";

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class LocationPickerPanel extends React.Component {
    state = {
        boughtLocations: [this.props.selectedLocation]
    };

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Select location
                    </Typography>
                    <Grid container spacing={8}>
                        {this.createGrids()}
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    createGrids = () => {
        let grids = [];
        for (let key in locations) {
            if (locations.hasOwnProperty(key)) {
                grids.push(
                    (<Grid item xs>
                        <ArcherPicker image={locations[key]}
                                      isBought={this.checkIfLocationBought(locations[key])}
                                      onClick={() => this.handleLocationClicked(locations[key])}
                                      disabled={this.isDisabled(locations[key])}/>
                    </Grid>)
                )
            }
        }
        return grids;
    };

    handleLocationClicked = (location) => {
        if (!this.checkIfLocationBought(location)) {
            this.buyLocation(location);
        }
        this.props.locationSelected(location);
    };

    isDisabled = (location) => {
        return !(this.checkIfLocationBought(location) || this.props.points >= location.cost);
    };

    checkIfLocationBought = (location) => {
        return !(this.state.boughtLocations.filter(it => it === location).length === 0);
    };

    buyLocation(location) {
        this.props.locationBought(location.cost);
        this.state.boughtLocations.push(location);
    }
}

export default withStyles(styles)(LocationPickerPanel);
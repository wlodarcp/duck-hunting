import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import ArcherPicker from "../archerpicker/ArcherPicker";
import archers from "../util/Archers";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";

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

class ArcherPickersPanel extends React.Component {
    state = {
        boughtArchers: [this.props.selectedArcher]
    };

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Select archer
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
        for (let key in archers) {
            if (archers.hasOwnProperty(key)) {
                grids.push(
                    (<Grid item xs>
                        {() => this.handleMouseDown()}
                        <ArcherPicker image={archers[key]}
                                      isBought={this.checkIfArcherBought(archers[key])}
                                      onClick={() => this.handleArcherClicked(archers[key])}/>
                    </Grid>)
                )
            }
        }
        return grids;
    };

    handleArcherClicked = (archer) => {
        if (this.checkIfArcherBought(archer)) {
            this.props.archerSelected(archer);
        }
        console.log("BUY IT MUTHERFUCKER!");
        this.props.archerSelected(archer);
    };

    checkIfArcherBought = (archer) => {
        return (this.state.boughtArchers.filter(it => it === archer).length === 0);
    };
}

export default withStyles(styles)(ArcherPickersPanel);
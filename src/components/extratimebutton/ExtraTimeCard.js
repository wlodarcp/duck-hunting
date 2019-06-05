import {withStyles} from "@material-ui/core";
import React from "react";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
import Button from '@material-ui/core/Button';

export const EXTRA_TIME = {
    cost: 20,
    points: 10
};

const styles = {
    button: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    }
};

class ExtraTimeCard extends React.Component {
    render() {
        return (
            <Card>
                <CardContent>
                    <Button variant="contained" color="primary" size={"large"} fullWidth={true}
                            disabled={this.props.points < 20}
                            onClick={this.handleClick}>
                        Change {EXTRA_TIME.cost} points to {EXTRA_TIME.points}s extra time
                    </Button>
                </CardContent>
            </Card>
        );
    }

    handleClick = () => {
        if (this.props.points >= 20) {
            this.props.timeBought();
        }
    }
}

export default withStyles(styles)(ExtraTimeCard);
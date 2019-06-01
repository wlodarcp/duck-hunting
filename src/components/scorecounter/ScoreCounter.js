import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
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

function ScorePointer(props) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    YOUR SCORE: {props.points}
                </Typography>
                <Typography variant="h5" component="h2">
                    DUCK KILLED: {props.duckHitCount}
                </Typography>
                <Typography variant="h5" component="h2">
                    SHOOTS: {props.shootCount}
                </Typography>
                <Typography variant="h5" component="h2" style={{color: props.timeLeft < 20 ? "red" : "black"}}>
                    TIME LEFT: {props.timeLeft}s
                </Typography>
            </CardContent>
        </Card>
    );
}

export default withStyles(styles)(ScorePointer);
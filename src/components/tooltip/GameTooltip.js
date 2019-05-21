import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';
import StartIcon from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit * 2,
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
});


export const GAME_STATE = {
    NOT_STARTED: "not started",
    RUNNING: "running",
    PAUSED: "paused"
};

class GameTooltip extends React.Component {

    render() {
        return (
            <div>
                <Tooltip title="Pause">
                    <IconButton aria-label="Delete">
                        <PauseIcon onClick={this.handlePauseClicked}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Start" aria-label="Start">
                    <IconButton color="primary">
                        <StartIcon onClick={this.handleStartClicked}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Stop" aria-label="Stop">
                    <IconButton color="primary">
                        <StopIcon onClick={this.handleStopClicked}/>
                    </IconButton>
                </Tooltip>
            </div>
        );
    }

    handleStopClicked = () => {
        this.props.endGame();
    };

    handleStartClicked = () => {
        this.props.startGame();
    };

    handlePauseClicked = () => {
        this.props.pauseGame();
    }
}

export default withStyles(styles)(GameTooltip);
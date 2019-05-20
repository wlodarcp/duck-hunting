import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';
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
                <Tooltip title="Delete">
                    <IconButton aria-label="Delete">
                        <PauseIcon/>
                    </IconButton>
                </Tooltip>
                {(this.props.gameState === GAME_STATE.RUNNING) ? (
                    <Tooltip title="Stop" aria-label="Stop">
                        <IconButton color="primary">
                            <StopIcon onClick={this.handleStopClicked}/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Start" aria-label="Start">
                        <IconButton color="primary">
                            <PauseIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        );
    }

    handleStopClicked = () => {
        this.props.pauseGame();
        this.setState({gameState: GAME_STATE.PAUSED});
    }
}

export default withStyles(styles)(GameTooltip);
import {duckHit} from "../actions/CanvasActions";
import connect from "react-redux/es/connect/connect";
import {archerPicked} from "../actions/ArcherPickerActions";
import ArcherPickersPanel from "../components/archerspickerpanel/ArcherPickersPanel";

const mapStateToProps = (state) => ({
    points: state.scoreCounterReducer.points,
    selectedArcher: state.gameStateReducer.selectedArcher
});

const mapDispatchToProps = dispatch => {
    return {
        duckHit: (points) => {
            dispatch(duckHit(points));
        },
        archerSelected: (archer) => {
            dispatch(archerPicked(archer))
        }
    }
};

export const ArchersPickerPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArcherPickersPanel);
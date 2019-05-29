import {duckHit} from "../actions/CanvasActions";
import connect from "react-redux/es/connect/connect";
import {archerPicked, archerBought} from "../actions/ArcherPickerActions";
import ArcherPickersPanel from "../components/archerspickerpanel/ArcherPickersPanel";

const mapStateToProps = (state) => ({
    points: state.gameStateReducer.points,
    selectedArcher: state.gameStateReducer.selectedArcher
});

const mapDispatchToProps = dispatch => {
    return {
        duckHit: (points) => {
            dispatch(duckHit(points));
        },
        archerSelected: (archer) => {
            dispatch(archerPicked(archer))
        },
        archerBought: (cost) => {
            dispatch(archerBought(cost))
        }
    }
};

export const ArchersPickerPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArcherPickersPanel);
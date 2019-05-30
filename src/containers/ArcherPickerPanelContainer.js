import connect from "react-redux/es/connect/connect";
import {archerBought, archerPicked} from "../actions/ArcherPickerPanelActions";
import ArcherPickersPanel from "../components/archerspickerpanel/ArcherPickersPanel";

const mapStateToProps = (state) => ({
    points: state.gameStateReducer.points,
    selectedArcher: state.gameStateReducer.selectedArcher
});

const mapDispatchToProps = dispatch => {
    return {
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
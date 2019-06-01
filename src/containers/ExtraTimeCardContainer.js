import {connect} from "react-redux";
import ExtraTimeCard from "../components/extratimebutton/ExtraTimeCard";
import {timeBought} from "../actions/ExtraTimeCardActions";

const mapStateToProps = (state) => ({
    points: state.gameStateReducer.points,
});

const mapDispatchToProps = dispatch => {
    return {
        timeBought: () => {
            dispatch(timeBought());
        }
    }
};

export const ExtraTimeCardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExtraTimeCard);
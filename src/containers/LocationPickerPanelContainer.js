import connect from "react-redux/es/connect/connect";
import LocationPickerPanel from "../components/LocationPickerPanel";
import {locationPicked, locationBought} from "../actions/LocationPickerPanelActions";

const mapStateToProps = (state) => ({
    points: state.gameStateReducer.points,
    selectedLocation: state.gameStateReducer.selectedLocation
});

const mapDispatchToProps = dispatch => {
    return {
        locationSelected: (location) => {
            dispatch(locationPicked(location))
        },
        locationBought: (cost) => {
            dispatch(locationBought(cost))
        }
    }
};

export const LocationPickerPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationPickerPanel);
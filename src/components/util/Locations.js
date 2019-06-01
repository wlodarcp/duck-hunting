import windows from "../../images/location/windows.jpg";
import grovestreet from "../../images/location/grovestreet.jpg";
import club from "../../images/location/club.jpg";
import duck from "../../images/ducks/duck1.png";
import gangsta from "../../images/ducks/gangsta.png";
import discoduck from "../../images/ducks/discoduck.png";
import explosion1 from "../../images/explosion/explosion.png";
import explosion2 from "../../images/explosion/explosion2.png";
import explosion3 from "../../images/explosion/explosion3.png";

const locations = {
    windows: {
        url: windows,
        title: 'Saint field',
        cost: 0,
        duck: duck,
        explosion: explosion1
    },
    grovestreet: {
        url: grovestreet,
        title: 'Grove Street',
        cost: 50,
        duck: gangsta,
        explosion: explosion2
    },
    club: {
        url: club,
        title: 'Party',
        cost: 100,
        duck: discoduck,
        explosion: explosion3
    },
};

export default locations;
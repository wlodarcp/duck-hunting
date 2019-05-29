import archer1 from "../../images/archer/archer.png";
import rambo from "../../images/archer/rambo.png";
import bogus from "../../images/archer/Boguslaw.png";
import stone from "../../images/ammo/stone.png";
import fireball from "../../images/ammo/fireball.png";
import bomb from "../../images/ammo/bomb.png";

const archers = {
    archer1: {
        url: archer1,
        title: 'Poor Archer',
        cost: 0,
        ammo: stone
    },
    rambo: {
        url: rambo,
        title: 'Rambo',
        cost: 50,
        ammo: fireball
    },
    boguslaw: {
        url: bogus,
        title: 'Bogusław',
        cost: 200,
        ammo: bomb
    },
};

export default archers;
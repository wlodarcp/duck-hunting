import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
    image: {
        position: 'relative',
        height: 200,
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    button: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: '#ffffff'
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.4,
    },
    imageMarked: {
        height: 3,
        width: 18,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
    }
};

function ObjectPicker(props) {
    const image = props.image;
    const isBought = props.isBought;
    const isDisabled = props.disabled;
    console.log(image);
    return (
        <div>
        <Button onClick={props.onClick} disabled={isDisabled} >
            <img src={image.url} height={120} width={120} />
        </Button>
            {image.title}
            <p/>
            <text style={{color: isBought ? "green" : "black"}}>
                {isBought ? 'BOUGHT' : ' cost: ' + image.cost}
            </text>
        </div>
    );
}

export default withStyles(styles)(ObjectPicker);
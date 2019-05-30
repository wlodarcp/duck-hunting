import React from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
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
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.4,
    },
    imageTitle: {
        position: 'relative',
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
        <button onClick={props.onClick} disabled={isDisabled}>
            <img src={image.url} height={120} width={120}/>
            {image.title}
            <p/>
            {isBought ? 'BOUGHT' : ' cost: ' + image.cost}
        </button>
    );
}

export default withStyles(styles)(ObjectPicker);
import React from 'react';
import {makeStyles} from '@material-ui/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import archer1 from "../images/archer/archer.png"
import rambo from "../images/archer/rambo.png"


const images = [
    {
        url: archer1,
        title: 'Archer',
        width: '40%',
    },
    {
        url: rambo,
        title: 'Rambo',
        width: '30%',
    },
    {
        url: '/static/images/grid-list/camera.jpg',
        title: 'Rambo',
        width: '30%',
    },
];

const useStyles = makeStyles(theme => ({
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
        position: 'absolute',
        left: 0,
        right: 0,
        top: 200,
        bottom: 0,
    },
    imageMarked: {
        height: 3,
        width: 18,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
    },
}));

function ArcherPicker() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {images.map(image => (
                <ButtonBase
                    focusRipple
                    key={image.title}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: image.width,
                    }}
                >
          <span
              className={classes.imageSrc}
              style={{
                  backgroundImage: `url(${image.url})`,
              }}
          />
                    <span className={classes.imageBackdrop}/>
                    <span className={classes.imageButton}>
            <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
            >
              {image.title}
                <span className={classes.imageMarked}/>
            </Typography>
          </span>
                </ButtonBase>
            ))}
        </div>
    );
}

export default ArcherPicker;
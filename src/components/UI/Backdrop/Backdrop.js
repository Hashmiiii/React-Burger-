import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => {
    //console.log(props.show);
    return (
        props.show ? <div className={classes.Backdrop} onClick={props.purchasBackDropHandler}></div> : null
    );
};

export default backdrop;
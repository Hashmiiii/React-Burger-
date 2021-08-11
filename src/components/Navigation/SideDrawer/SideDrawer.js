import React from 'react';
import Logo from '../../Logo/Logo';
import Navigationitems from '../NavigationItems/Navigationitems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/ReactAux';

const sideDrawer = (props) => {
    //...
    let initialClasses = [classes.SideDrawer, classes.Close];
    if(props.show){
        initialClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.show} purchasBackDropHandler={props.closeBackdropHandler}></Backdrop>
            <div className={initialClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo></Logo>
                </div>
                <nav>
                    <Navigationitems isAuthenticated={props.isAuthenticated}></Navigationitems>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;
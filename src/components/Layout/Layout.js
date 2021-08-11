import React, {Component} from 'react';
import Aux from '../../hoc/ReactAux'
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    state={
        showBackdrop: false
    }
    closeBackdrop=()=>{
        this.setState({showBackdrop: false})
    }

    drawerToggleHandler =() => {
        this.setState((prevState)=>
        { 
            return {showBackdrop: !prevState.showBackdrop}
        });
    }

    render(){
        return(<Aux>
            <Toolbar drawerToggleHandler={this.drawerToggleHandler} isAuthenticated={this.props.isAuthenticated}></Toolbar>
            <SideDrawer show={this.state.showBackdrop} closeBackdropHandler={this.closeBackdrop} isAuthenticated={this.props.isAuthenticated}></SideDrawer>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>);
    }
    

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);
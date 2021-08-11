import React, {Component} from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Checkout extends Component{
    // state = {
    //     ingredients : null,
    //     totalPrice : 0
    // }

    // componentWillMount(){
    //     const queryString = require('query-string');

    //     const parsed = queryString.parse(this.props.location.search);
    //     let ingredient = {};
    //     let totalPrice = 0;
    //     //console.log(parsed);
    //     //let queryParams = new URLSearchParams(this.props.location.search);
    //     //console.log(queryParams)
    //     for(let param in parsed){
    //         if(param === 'price'){
    //             totalPrice = +parsed[param];
    //         }
    //         else{
    //             ingredient[param] = +parsed[param];
    //         }
    //     }
    //     console.log(totalPrice);
    //     this.setState({ingredients: ingredient, totalPrice: totalPrice});
    // } 

    checkOutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkOutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }



    render(){
        let summary = <Redirect to="/"></Redirect>

        console.log("purchased", this.props.purchased);

        if(this.props.ingredients){
            const purchased = this.props.purchased ? <Redirect to="/"></Redirect> : null;
            summary = (
                <div>
                    {purchased}
                    <CheckoutSummary 
                        ingredients={this.props.ingredients}
                        onCancelled={this.checkOutCancelledHandler}
                        onContinued={this.checkOutContinuedHandler}>
                    </CheckoutSummary>
                {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData}></Route> */}
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}></Route>
                </div>
            );
        }
        return summary;
    }

    // render(){
    //     return (
    //         <div>
    //             <CheckoutSummary 
    //                 ingredients={this.state.ingredients}
    //                 onCancelled={this.checkOutCancelledHandler}
    //                 onContinued={this.checkOutContinuedHandler}></CheckoutSummary>
    //             {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData}></Route> */}
    //             <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}></ContactData>)}></Route>
    //         </div>
            
    //     );
    // }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        purchased: state.orderReducer.purchased,
    }
}

export default connect(mapStateToProps)(Checkout); 
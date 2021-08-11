import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';

class Orders extends Component{
    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId);
        // axios.get('/orders.json')
        //     .then(res => {
        //         let fetchedOrders = [];
        //         for(let key in res.data){
        //             fetchedOrders.push({
        //                 id: key,
        //                 ...res.data[key]
        //             });
        //         }
        //         this.setState({loading: false, orders: fetchedOrders});
        //         console.log(res.data);
        //     })
        //     .catch(err => {
        //         this.setState({loading: false});
        //     })
    }

    render(){
        let orders = (<Spinner></Spinner>);

        if(this.props.loading === false){
            orders = (
                <div>
                    {this.props.orders.map(order => (
                        <Order key={order.id}
                            ingredients={order.ingredients}
                            price={+order.price}></Order>
                    ))}
                </div>
            );
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actionTypes.fetchOrders(token, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
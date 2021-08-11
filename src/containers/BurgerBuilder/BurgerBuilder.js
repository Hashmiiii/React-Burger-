import React, {Component} from 'react'
import Aux from '../../hoc/ReactAux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/index';

// const INGREDIENT_PRICES = {
//     salad : 0.5,
//     cheese : 0.4,
//     meat : 1.3,
//     bacon : 0.7
// };

export class BurgerBuilder extends Component{
    state = {
        ingredients : null,
        totalPrice : 4,
        purchasable : true,
        purchasing : false,
        loading: false,
    }

    componentDidMount(){
        this.props.onInitBurgerBuilder();
        this.props.setRedirectUrl('/');
        // axios.get('ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients : response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
        // axios.get('ingredients.json')
        //     .then(response => {
        //         this.props.onInitBurgerBuilder(response.data);
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
    }

    // updatePurchaseState(){
    //     const ingredients = {...this.state.ingredients}
    //     const sum = Object.keys(ingredients).map(igKey => {
    //         console.log(ingredients[igKey]);
    //         return ingredients[igKey];
    //     })
    //     .reduce((sum,el) => {
    //         return sum+el;
    //     },0);
    //     console.log(sum);
    //     this.setState({purchasable: sum <= 0});
    // }

    updatePurchaseState(){
        const ingredients = {...this.props.ingredients}
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el) => {
            return sum+el;
        },0);
        return sum <= 0;
    }

    // updatePurchaseState(ingredients){
    //     //const ingredients = {...this.state.ingredients}
    //     const sum = Object.keys(ingredients).map(igKey => {
    //         console.log(ingredients[igKey]);
    //         return ingredients[igKey];
    //     })
    //     .reduce((sum,el) => {
    //         return sum+el;
    //     },0);
    //     console.log(sum);
    //     this.setState({purchasable: sum <= 0});
    // }

    purchasingHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }
        else{
            this.props.onInitPurchase();
            this.props.setRedirectUrl('/checkout');
            this.props.history.push("/auth");
        }
        
    }

    purchasBackDropHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinued = () => {
        //alert("You Continue!");
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Rehan Baber',
        //         address: {
        //             street: 'Test street',
        //             zipCode: '54700',
        //             country: 'Pakistan'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //     });
        //this.props.history.push("/checkout");
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push(encodeURIComponent('price') + '=' + encodeURIComponent(this.state.totalPrice));
        // const searchParams = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + searchParams
        // });
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout',
        });
    }

    // addIngredientHandler = (type) => {
    //     const updatedIngredientsCount = this.state.ingredients[type] + 1;
    //     const updateedIngredients = {...this.state.ingredients};
    //     updateedIngredients[type] = updatedIngredientsCount;
    //     const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    //     this.setState({totalPrice:newPrice, ingredients: updateedIngredients}, () => this.updatePurchaseState());
    //     console.log(updateedIngredients);
    //     //this.updatePurchaseState(updateedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     if(this.state.ingredients[type] <= 0)
    //         return;
    //     const updatedIngredientsCount = this.state.ingredients[type] - 1;
    //     const updateedIngredients = {...this.state.ingredients};
    //     updateedIngredients[type] = updatedIngredientsCount;
    //     const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    //     this.setState({totalPrice:newPrice, ingredients: updateedIngredients}, () => this.updatePurchaseState());
    //     //this.updatePurchaseState(updateedIngredients);
    // }

    render(){

        const disabledInfo = {...this.props.ingredients};
        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burgerControls = this.props.error ? <p>Cannot load ingredients</p> : <Spinner></Spinner>;
        let orderSummary = null;
        if(this.props.ingredients){
            burgerControls = (<Aux>
                <Burger ingredients={this.props.ingredients}></Burger>
                <BuildControls ingredientAdded={this.props.onAddIngredient}
                               ingredientRemoved={this.props.onRemoveIngredient}
                               disabledInfo={disabledInfo}
                               price={this.props.totalPrice}
                               purchasable={this.updatePurchaseState()}
                               ordered={this.purchasingHandler}
                               isAuthenticated={this.props.isAuthenticated}></BuildControls>
            </Aux>);
            orderSummary = <OrderSummary ingredients={this.props.ingredients}
                                purchaseCancelled={this.purchasBackDropHandler}
                                purchaseContinued={this.purchaseContinued}
                                price={this.props.totalPrice}>
                            </OrderSummary>
        }
        // if(this.state.loading){
        //     orderSummary = <Spinner></Spinner>
        // }
        return (
            <Aux>
                <Modal show={this.state.purchasing} purchasBackDropHandler={this.purchasBackDropHandler}>
                    {orderSummary}
                </Modal>
                {burgerControls}
            </Aux>
        );
    }

    // render(){

    //     const disabledInfo = {...this.state.ingredients};
    //     for(let key in disabledInfo)
    //     {
    //         disabledInfo[key] = disabledInfo[key] <= 0;
    //     }

    //     let burgerControls = this.state.error ? <p>Cannot load ingredients</p> : <Spinner></Spinner>;
    //     let orderSummary = null;
    //     if(this.state.ingredients){
    //         burgerControls = (<Aux>
    //             <Burger ingredients={this.state.ingredients}></Burger>
    //             <BuildControls ingredientAdded={this.addIngredientHandler}
    //                            ingredientRemoved={this.removeIngredientHandler}
    //                            disabledInfo={disabledInfo}
    //                            price={this.state.totalPrice}
    //                            purchasable={this.state.purchasable}
    //                            ordered={this.purchasingHandler}></BuildControls>
    //         </Aux>);
    //         orderSummary = <OrderSummary ingredients={this.state.ingredients}
    //                             purchaseCancelled={this.purchasBackDropHandler}
    //                             purchaseContinued={this.purchaseContinued}
    //                             price={this.state.totalPrice}>
    //                         </OrderSummary>
    //     }
    //     if(this.state.loading){
    //         orderSummary = <Spinner></Spinner>
    //     }
    //     console.log(this.state.purchasing);
    //     return (
    //         <Aux>
    //             <Modal show={this.state.purchasing} purchasBackDropHandler={this.purchasBackDropHandler}>
    //                 {orderSummary}
    //             </Modal>
    //             {burgerControls}
    //         </Aux>
    //     );
    // }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice,
        error: state.burgerReducer.error,
        isAuthenticated: state.authReducer.token !== null,
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onAddIngredient: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
//         onRemoveIngredient: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName}),
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientName) => dispatch(actionCreators.addIngredient(ingredientName)),
        onRemoveIngredient: (ingredientName) => dispatch(actionCreators.removeIngredient(ingredientName)),
        onInitBurgerBuilder: () => dispatch(actionCreators.onInitIngredients()),
        onInitPurchase: () => dispatch(actionCreators.initPurchased()),
        setRedirectUrl: (url) => dispatch(actionCreators.setRedirectUrl(url)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
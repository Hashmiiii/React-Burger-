import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';

class ContactData extends Component{
    state={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Name',
                },
                value: '',
                validationRules: {
                    required: true,
                },
                isValid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Street Address',
                },
                value: '',
                validationRules: {
                    required: true,
                },
                isValid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your ZipCode',
                },
                value: '',
                validationRules: {
                    required: true,
                    maxLength: 10,
                    minLength: 5,
                },
                isValid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Country',
                },
                value: '',
                validationRules: {
                    required: true,
                },
                isValid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Your Email',
                },
                value: '',
                validationRules: {
                    required: true,
                },
                isValid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ],
                },
                value: 'fastest',
                validationRules: {},
                isValid: true,
                touched: false,
            }
        },
        //loading: false,
        isFormValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.totalPrice);

        //this.setState({loading: true});
        let formData = {};
        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId,
        }
        console.log("asd")
        console.log(this.props.token);
        this.props.onOrderBurger(order, this.props.token);
        console.log("asd")
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //     });
    }
    
    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validationRules);
        updatedFormElement.touched = true;
        console.log(updatedFormElement);
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let isFormValid = true;
        for(let key in updatedOrderForm){
            isFormValid = updatedOrderForm[key].isValid && isFormValid;
        }
        
        this.setState({orderForm: updatedOrderForm, isFormValid: isFormValid});

        //The below code works but its not good to update the real reference of state
        //const updatedOrderForm = this.state.orderForm;
        //updatedOrderForm[inputIdentifier].value = event.target.value;
        //this.setState({orderForm: updatedOrderForm});
    }

    inputBlurHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.touched = true;
        
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({orderForm: updatedOrderForm})
    }
    
    render(){
        let formElements = [];
        for(let key in this.state.orderForm){
            formElements.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        let form = (<form onSubmit={this.orderHandler}>
            {/* <Input inputtype="input" type="text" name="name" placeholder="Enter your name" /> */}
            {/* <Input elementType="..." elementConfig="..." value="..." />
            <Input inputtype="input" type="email" name="email" placeholder="Enter your email" />
            <Input inputtype="input" type="text" name="street" placeholder="Enter your Street Address" />
            <Input inputtype="input" type="text" name="postalCode" placeholder="Enter your Postal Code" /> */}
            {
                formElements.map(formElement => (
                    <Input elementConfig={formElement.config.elementConfig}
                        elementType={formElement.config.elementType}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangeHandler(event,formElement.id)}
                        invalid={!formElement.config.isValid}
                        istouched={formElement.config.touched}
                        blured={(event) => this.inputBlurHandler(event,formElement.id)}
                        key={formElement.id}/>
                ))
            }
            <Button btnType="Success" disabled={!this.state.isFormValid}>ORDER</Button>
        </form>);

        if(this.props.loading){
            form = (<Spinner></Spinner>);
        }

        return (<div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData, token) => dispatch(actionCreators.purchaseBurgerStart(orderData, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
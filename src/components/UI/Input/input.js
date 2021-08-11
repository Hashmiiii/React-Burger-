import React from 'react';
import classes from './input.module.css';

const input = (props) => {
    const inputClasses = [classes.InputElement];
    if(props.invalid && props.istouched){
        inputClasses.push(classes.Invalid);
    }

    let inputElement = null;
    
    switch(props.elementType){
        case('input'): 
            inputElement = <input className={inputClasses.join(' ')} 
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed}
                                onBlur={props.blured}/>;
            break;
        case('textarea'): 
            inputElement = <textarea className={inputClasses.join(' ')} 
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed}
                                onBlur={props.blured}></textarea>;
            break;
        case('select'): 
            inputElement = (
                            <select className={inputClasses.join(' ')} 
                                value={props.value}
                                onChange={props.changed}
                                onBlur={props.blured}>
                                {props.elementConfig.options.map(option => (
                                    <option value={option.value} key={option.value}>
                                        {option.displayValue}
                                    </option>
                                ))}
                            </select>);
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} 
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed}
                                onBlur={props.blured}/>;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;
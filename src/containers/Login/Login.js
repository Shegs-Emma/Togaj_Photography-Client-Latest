import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Login.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Layout from '../Layout/Layout';
import { Redirect } from 'react-router';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from 'axios';

const Login = (props) => {
    //This part of the code creates the Input Elements. I am running three at the moment.
    const [ dataForm, setDataForm ] = useState({
        adminData: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Input your Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Input your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 16
                },
                valid: false,
                touched: false
            },
            adminCode: {
                elementType: 'password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Admin Passcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
        }
    });

    const [ formIsValid, setFormIsValid ] = useState(false);
    //The isSignUp is used to check if its a Signup or Signin request.
    const [ isSignUp, setIsSignUp ] = useState(true);

//========================================================================================================
//The function will check if the input is present and valid
    const checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedDataForm = {
            ...dataForm.adminData
        }

        const updatedFormElement = {
            ...updatedDataForm[inputIdentifier]
        };


        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        updatedDataForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for(let formIdentifier in updatedDataForm) {
            formIdentifier = updatedDataForm[formIdentifier].valid && formIsValid;
        }

        setDataForm({adminData: updatedDataForm});
        setFormIsValid(formIsValid);
    }


    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(dataForm.adminData.email.value, dataForm.adminData.password.value, dataForm.adminData.adminCode.value, isSignUp);
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    }

    //===============================================================================================
    let redirect = null;
    let errorMessage = null;

    if(props.loading){
        redirect = <Spinner />
    }

    if(props.submitted){
        redirect = <Redirect to='/gallery' />;
    }

    if(props.error){
        errorMessage = (
            <p>{props.error}</p>
        )
    }


//===================================================================================================

    const adminElementsArray = [];

    for(let key in dataForm.adminData){
        adminElementsArray.push({
            id: key,
            config: dataForm.adminData[key]
        });
    };
//====================================================================================================


    return(
        <div className={classes.Gallery}>
            <Layout uploading header='LOGIN'>
                <div className={classes.ContactData}>
                    {errorMessage}
                    <form onSubmit={submitHandler}>
                        {adminElementsArray.map(adminElement => (
                            <Input 
                                key={adminElement.id}
                                elementType={adminElement.config.elementType} 
                                elementConfig={adminElement.config.elementConfig} 
                                value={adminElement.config.value}
                                inValid={!adminElement.config.valid}
                                shouldValidate={adminElement.config.validation}
                                touched={adminElement.config.touched}
                                changed={(event)=> inputChangedHandler(event, adminElement.id)} />
                        ))}

                        <Button btnType="Success" disabled={!formIsValid}>SUBMIT</Button>
                    </form>
                    <Button
                        clicked={switchAuthModeHandler} 
                        btnType="Danger">SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
                </div>
            </Layout>
            {redirect}
        </div>
    )
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        submitted: state.auth.submitted,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, adminCode, isSignUp) => dispatch(actions.auth(email, password, adminCode, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Login, axios));
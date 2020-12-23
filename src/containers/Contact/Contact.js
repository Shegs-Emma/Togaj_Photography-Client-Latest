import React, { useState } from 'react';
import { Redirect } from 'react-router';

import Aux from '../../hoc/Auxilliary';
import Layout from '../Layout/Layout';
import classes from './Contact.module.css';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

//The fontawesome embedded helps me select the icons i want to add
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

const Contact = (props) => {
    //The state below will monitor the form inputs
    const [ contactForm, setContactForm ] = useState({
        contactData: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            phoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Your Phone Number'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            message: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Message'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        }
    });

    const [ formIsValid, setFormIsValid ] = useState(false);

    //======================================================================================================
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
    };

    //This function monitors the form as characters are pressed.
    const inputChangedHandler = (event, inputIdentifier) => {
        //This will copy the the contact data objects, ie the name, phone number, email, message
        const updatedContactForm = {
            ...contactForm.contactData
        }

        //This will target the individual keys with their corresponding items. ie name: valid, validity etc
        const updatedFormElement = {
            ...updatedContactForm[inputIdentifier]
        };


        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        updatedContactForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for(let formIdentifier in updatedContactForm) {
            formIdentifier = updatedContactForm[formIdentifier].valid && formIsValid;
        }

        setContactForm({contactData: updatedContactForm});
        setFormIsValid(formIsValid);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const userDatails = {
            name: contactForm.contactData.name.value,
            phoneNumber: contactForm.contactData.phoneNumber.value,
            email: contactForm.contactData.email.value,
            message: contactForm.contactData.message.value
        }
        
        props.onContact(userDatails);
    }

    let redirect = null;
    let message = null;

    if(props.loading){
        redirect = <Spinner />
    }

    if(props.submitted){
        message = `Your message with Id of ${props.userId} has been submitted successfully`;
        redirect = <Redirect to='/gallery' />
    }

    //=======================================================================================================
    //The array below will rearrange the contactForm into a object easy to manipulate. It is the second step
    const contactElementsArray = [];

    for(let key in contactForm.contactData){
        contactElementsArray.push({
            id: key,
            config: contactForm.contactData[key]
        });
    };

    return (
        <Aux>
            <Layout contact header='Please Contact Us'>
                <div className={classes.Contact}>
                    <div>
                        <p>Ogun, Nigeria</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faPhoneAlt} /> (+234) 80 998 239 86 <br />
                        <FontAwesomeIcon icon={faEnvelope} /> Togajphotography21@gmail.com <br />
                        <FontAwesomeIcon icon={faClock} />  Always Open
                    </div>

                    <div className={classes.Form}>
                        {message}
                        <form onSubmit={submitHandler}>
                            {contactElementsArray.map(contactElement => (
                                <Input 
                                    key={contactElement.id}
                                    elementType={contactElement.config.elementType} 
                                    elementConfig={contactElement.config.elementConfig} 
                                    value={contactElement.config.value}
                                    inValid={!contactElement.config.valid}
                                    shouldValidate={contactElement.config.validation}
                                    touched={contactElement.config.touched}
                                    changed={(event)=> inputChangedHandler(event, contactElement.id)} />
                            ))}

                            <Button btnType="Success" disabled={!formIsValid}>Contact US</Button>
                        </form>
                        {redirect}
                    </div>
                </div>
                
            </Layout>
            
        </Aux>
    )
};

const mapStateToProps = state => {
    return{
        userId: state.contact.userId,
        loading: state.contact.loading,
        submitted: state.contact.submitted
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onContact: (userDatails) => dispatch(actions.contact(userDatails))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
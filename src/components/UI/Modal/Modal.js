import React from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxilliary';
import Backdrop from '../Backdrop/Backdrop';

// //The fontawesome embedded helps me select the icons i want to add
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                {/* <FontAwesomeIcon icon={faChevronCircleLeft} /> */}
                {props.children}
                {/* <FontAwesomeIcon icon={faChevronCircleRight} /> */}
        </div>
    </Aux>
)

export default modal;
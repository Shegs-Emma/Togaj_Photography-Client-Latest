import React from 'react';
import togajLogo from '../../assets/Images/togaj_w.png';
import classes from './Footer.module.css';

const Footer = () => (
    <footer>
        <div>
            <div className={classes.Footer}>
                <div className={classes.TextSide}>
                    <h6><b>TOGAJ PHOTOGRAPHY</b></h6>
                    <p>
                        View sample pictures from my recent contracts.
                        We are sure to provide professional coverage, no
                        matter the event and location.
                        Give us a ring.
                    </p>
                </div>
                <div>
                    <img src={togajLogo} className={classes.Togaj} alt="togajlogo" id="myLogoFooter" />
                </div>
                <div className={classes.Socials}>
                    <span>
                        <a href="https://web.facebook.com/shegs.emma/" target="_blank" rel="noopener noreferrer"><img
                            className={classes.Logos}
                            src='https://cdn.svgporn.com/logos/facebook.svg'
                            alt="facebook_logo" /></a>
                        <a href="https://www.linkedin.com/in/emmanuel-oderemi-6bb497170/" target="_blank" rel="noopener noreferrer"><img className={classes.Linkedin}
                            src='https://cdn.svgporn.com/logos/linkedin.svg' alt="linkedin_logo" /></a>
                        <a href="https://twitter.com/mightymilan04" target="_blank" rel="noopener noreferrer"><img src='https://cdn.svgporn.com/logos/twitter.svg'
                            className={classes.Logos} alt="twitter_logo" /></a>
                    </span>
                </div>

            </div>
        </div>
    </footer>
)

export default Footer;
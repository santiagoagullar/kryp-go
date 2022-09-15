import React from 'react'
import './Services.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake, faUserShield, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

const Services = () => {
	return (
		<div className='services'>
			<div className='services__description'>
				<h1>Which services do you get with <strong>KRYP-GO?</strong></h1>
			</div>
			<div className='services__list'>
				<ul>
					<li>
						<div><FontAwesomeIcon icon={faHandshake} /></div>
						<p>Unmatched trustworthy quality when it comes to our products.</p>
					</li>
					<li>
						<div><FontAwesomeIcon icon={faUserShield} /></div>
						<p>Guaranteed security. We always maintain the privacy and quality of our products.</p>
					</li>
					<li>
						<div><FontAwesomeIcon icon={faHandHoldingDollar} /></div>
						<p>Our products are developed to make sure you don't have to pay unnecessary fees. Saving your money!</p>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Services
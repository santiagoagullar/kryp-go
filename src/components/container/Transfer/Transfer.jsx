import React, { useContext, useEffect } from 'react'
import './Transfer.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/fontawesome-free-brands'
import { TransactionContext } from '../../../context/TransactionContext'
import { heroes } from '../../../utils/constants'

const Input = ({ placeholder, name, type, value, handleChange }) => (
	<input
		placeholder={placeholder}
		type={type}
		step="0.0001"
		value={value}
		onChange={(e) => handleChange(e, name)}
	>
	</input>
)

const Transfer = () => {
	const { connectWallet, wallet, checkIfWalletIsConnected, handleChange, formData, sendTransaction, currentAccount, loading } = useContext(TransactionContext)

	useEffect(() => {
		checkIfWalletIsConnected()
		//eslint-disable-next-line
	}, [])

	const handleSubmit = (e) => {
		const { addressTo, amount, keyword, message } = formData

		e.preventDefault()

		if (!addressTo || !amount || !keyword || !message) {
			return
		}
		sendTransaction()
	}

	return (
		<main className='header'>
			<div className='header__info'>
				<h1 className='header__title'>
					Send.
					<br />
					<span>Crypto.</span>
					<br />
					Now.
					<br />
				</h1>
				<div className='hero_explanation_container'>
					<div className='hero_intro'>
						<h3>
							What makes Kryp-go so different and interactive?
						</h3>
						<p>
							What is this <code>hero</code> that you're requesting in my transaction?
						</p>
					</div>
					<div className='hero_detail'>
						<div className='hero_detail_text'>
							<p>
								<strong>KRYP-GO </strong>
								allows you to assign a <span>Marvel hero </span> on top of your ETH transfer
								<br />
								That way, when you go look at your transaction history, <span> you will see an image from the comics for the hero you selected!</span>
								<br />
								Have a go at sending <span>any of the heroes below</span>
							</p>
						</div>
					</div>
					<div className='heroes_list'>
						<div className='heroes_container'>
							{heroes.map((hero) => {
								return (
									<p onClick={() => { navigator.clipboard.writeText(hero.name) }} className='hero_name' data-tooltip={`Click to transfer ${hero.name}!`}>
										<strong>{hero.name}</strong>
									</p>
								)
							})}
						</div>
					</div>
				</div>
				<div className='header__button_container'>
					<button className={wallet == 'connected' ? 'connected' : ''} onClick={() => {
						connectWallet()
					}
					}>
						<p>
							{wallet == 'midway' ?
								'Connecting...' :
								wallet == 'connected' ?
									'Connected!' :
									'Connect Wallet'
							}
						</p>
					</button>
				</div>
			</div>
			<div className='input_container'>
				<div className='eth_card'>
					<div className='header__icons_container'>
						<div className='header__eth_icon_border'>
							<FontAwesomeIcon className='header__eth_icon' icon={faEthereum} />
						</div>
						<div className='header__info_icon_border'>
							<FontAwesomeIcon className='header__info_icon' icon={faInfo} />
						</div>
					</div>
					<div className='header__info_container'>
						<p className='header__direction'>{currentAccount.substr(0, 4)}...{currentAccount.substr(currentAccount.length - 4)}</p>
						<p className='header__ethereum-tag'>Ethereum</p>
					</div>
				</div>
				<div className='input_data'>
					{loading != '' ? (
						<div className="header__loading_container">
							<div className={`circle-loader ${loading}`}>
								<div className="status draw"></div>
							</div>
						</div>
					) : (
						<div className='input_data_container' >
							<Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
							<Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
							<Input placeholder="Hero" name="keyword" type="text" handleChange={handleChange} />
							<Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
							<div className='line_break' />
							{wallet == 'connected' ?
								<button
									type="button"
									onClick={handleSubmit}
								>
									Send Now
								</button> :
								<button onClick={connectWallet}>
									Send Now
								</button>
							}
						</div>
					)}
				</div>
			</div>
		</main >
	)
}

export default Transfer

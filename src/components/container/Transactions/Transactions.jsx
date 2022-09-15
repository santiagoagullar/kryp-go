import React, { useContext, useEffect, useState } from 'react'
import './Transactions.scss'
import { TransactionContext } from '../../../context/TransactionContext'
import axios from 'axios'
import md5 from 'js-md5';
import useFetch from '../../../hooks/useFetch';

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount }) => {
	const image = useFetch({ keyword })
	if (message.length > 10) message = message.substring(0, 10);

	return (
		<div className='transaction_card'>
			<p>From: <strong>{addressFrom}</strong></p>
			<p>To: <strong>{addressTo}</strong></p>
			<p>Amount: <strong>{amount} ETH</strong></p>
			<p>Date: <strong>{timestamp}</strong></p>
			<img src={image} alt={keyword} />
			<p>Message: <strong>{message}</strong></p>
		</div>)
}

const Transactions = () => {

	const { currentAccount, transactions } = useContext(TransactionContext)

	return (
		<div className='transactions'>
			{currentAccount ? (
				<>
					<div className='transactions__header-connected'>
						<h3>
							Latest Transactions
						</h3>
					</div>
					<div className='transactions_container'>
						{[...transactions].reverse().slice(0, 9).map((transaction, i) => (
							<TransactionCard key={i} {...transaction} />
						))}
					</div>
				</>

			) : (
				<div className='transactions__header'>
					<h3>
						Connect to view your latest transactions
					</h3>
				</div>
			)
			}
		</div>
	)
}

export default Transactions
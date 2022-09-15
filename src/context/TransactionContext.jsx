import React, { useState } from 'react'
import { ethers } from "ethers";
import { contract_abi, contract_address } from '../utils/constants'

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum)
	const signer = provider.getSigner()
	const transactionsContract = new ethers.Contract(contract_address, contract_abi, signer)

	return transactionsContract
}

export const TransactionsProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState("")
	const [wallet, setWallet] = useState("connected")
	const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" })
	const [loading, setLoading] = useState('')
	const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"))
	const [transactions, setTransactions] = useState([])

	const handleChange = (e, name) => {
		setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
	};

	const sendTransaction = async () => {
		try {
			if (ethereum) {
				setLoading('sending');
				const { addressTo, amount, keyword, message } = formData
				const transactionsContract = createContract()
				const parsedAmount = ethers.utils.parseEther(amount)

				await ethereum.request({
					method: "eth_sendTransaction",
					params: [{
						from: currentAccount,
						to: addressTo,
						value: parsedAmount._hex,
					}],
				})

				const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

				await transactionHash.wait()
				setLoading('sent')
				setTimeout(() => {
					setLoading('')
				}, 3000)

				const transactionsCount = await transactionsContract.getTransactionCount();

				setTransactionCount(transactionsCount.toNumber());
			} else {
				console.log("Install metamask!")
			}
		} catch (error) {
			setLoading('failure')
			setTimeout(() => {
				setLoading('')
			}, 3000)

			throw new Error("No ethereum object");
		}
	}

	const getAllTransactions = async () => {
		try {
			if (ethereum) {
				const transactionsContract = createContract();

				const availableTransactions = await transactionsContract.getAllTransactions()

				const structuredTransactions = availableTransactions.map((transaction) => ({
					addressTo: transaction.receiver,
					addressFrom: transaction.sender,
					timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
					message: transaction.message,
					keyword: transaction.keyword,
					amount: parseInt(transaction.amount._hex) / (10 ** 18)
				}))

				setTransactions(structuredTransactions);
			} else {
				console.log("Ethereum is not present");
			}
		} catch (error) {
			console.error(error);
		}
	}

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask.")

			const accounts = await ethereum.request({ method: "eth_accounts" })

			if (accounts.length) {
				setCurrentAccount(accounts[0])
				setWallet('connected')
				getAllTransactions()
			} else {
				setWallet('')
			}
		} catch (error) {
			console.log(error)
		}
	}

	const connectWallet = async () => {
		setWallet('midway')
		try {
			if (!ethereum) return alert("Please install MetaMask.");

			const accounts = await ethereum.request({ method: "eth_requestAccounts", });

			setCurrentAccount(accounts[0]);
			setWallet('connected')
		} catch (error) {
			setWallet("")

			throw new Error("No ethereum object");
		}
	}

	return (
		<TransactionContext.Provider value={{
			connectWallet,
			wallet,
			checkIfWalletIsConnected,
			handleChange,
			formData,
			sendTransaction,
			loading,
			currentAccount,
			transactions
		}}>
			{children}
		</TransactionContext.Provider>
	)
}
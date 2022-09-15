import abi from './Transactions.json'

const contract_abi = abi.abi

const contract_address = '0x032C2A2AdbD0EA3a6a424859A630FaD1Ac52E74d'

const marvel_public_key = 'e5569edccc194aa7b671354c22430666'
const marvel_private_key = '507b1e98f4ccbe0dec065c6423b64a8180bf2f31'

const heroes = [
	{ id: 1010801, name: "Ant-Man" },
	{ id: 1009187, name: "Black Panther" },
	{ id: 1017109, name: "Black Widow" },
	{ id: 1017105, name: "Captain America" },
	{ id: 1010338, name: "Captain Marvel" },
	{ id: 1017300, name: "Dr. Strange" },
	{ id: 1010735, name: "Drax" },
	{ id: 1017324, name: "Gamora" },
	{ id: 1010743, name: "Groot" },
	{ id: 1017108, name: "Hawkeye" },
	{ id: 1017107, name: "Hulk" },
	{ id: 1017104, name: "Iron Man" },
	{ id: 1009407, name: "Loki" },
	{ id: 1009452, name: "Moon Knight" },
	{ id: 1010365, name: "Nebula" },
	{ id: 1011007, name: "Nick Fury" },
	{ id: 1010971, name: "Scarlet Witch" },
	{ id: 1009583, name: "She-Hulk" },
	{ id: 1009610, name: "Spider Man" },
	{ id: 1010733, name: "Star-Lord" },
	{ id: 1017106, name: "Thor" },
	{ id: 1011239, name: "Valkyrie" },
	{ id: 1009697, name: "Vision" },
]

export { contract_abi, contract_address, marvel_public_key, marvel_private_key, heroes }
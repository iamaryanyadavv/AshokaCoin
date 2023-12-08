# AshokaCoin
https://ashokacoin.netlify.app/

## CS-2361 Blockchain & Cryptocurrencies Project
Our project is to implement a blockchain-based project that encompasses the deployment
and management of an Initial Coin Offering (ICO) on the Ethereum network by the name - AshokaCoin

## Smart Contracts
We essentially code up two contracts, an ERC20 token contract, and a sale contract, which
reference each other. The ERC20 token contract mints an initial supply of 5 million tokens
upon deployment (we have taken 5 million just as a placeholder amount), holding them
within the contract. The sale contract facilitates the conversion of payable ETH to tokens
directly for users, forwarding the received ETH to a specified wallet designated to hold ICO
funds.

## Dependencies
1. Truffle v5.11.5 (core: 5.11.5)
2. Ganache v7.9.1
3. Solidity v0.5.16 (solc-js)
4. Node v18.13.0
5. Web3.js v1.10.0
6. ReactJS v18.2.0
7. ExpressJS v4.18.2
8. Nodemon v3.0.2


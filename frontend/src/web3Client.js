import Web3 from 'web3'
import AshokaCoin_Build from 'contracts/AshokaCoin.json'
import AshokaCoinSale_Build from 'contracts/AshokaCoinSale.json'
import { ethers } from 'ethers'

let selectedAccount
let AshokaCoin_Contract
let AshokaCoin_Address
let AshokaCoinSale_Contract
let AshokaCoinSale_Address

export const init = async () => {
    let provider = new ethers.BrowserProvider(window.ethereum)
    let provider0 = window.ethereum

    if (typeof provider0 !== 'undefined') {
        // metamask is installed
        provider0
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                selectedAccount = accounts[0]
                console.log(`Selected account is ${selectedAccount}`)
            })
            .catch((error) => {
                console.log(error)
            })

        window.ethereum.on('accountsChanged', function (accounts) {
            selectedAccount = accounts[0]
            console.log(`Selected account changed to ${selectedAccount}`)
        })
    }
    else {
        console.log('Metamask not there dog')
        return Promise.resolve(false)
    }

    const web3 = new Web3(provider0)

    const networkID = await web3.eth.net.getId()

    console.log(networkID)

    AshokaCoin_Address = AshokaCoin_Build.networks[networkID].address
    let AshokaCoin_ABI = AshokaCoin_Build.abi

    // AshokaCoin_Contract = new ethers.Contract(AshokaCoin_Address, AshokaCoin_ABI, provider)

    // AshokaCoinSale_Address = AshokaCoinSale_Build.networks[networkID].address
    // let AshokaCoinSale_ABI = AshokaCoinSale_Build.abi

    // AshokaCoinSale_Contract = new ethers.Contract(AshokaCoinSale_Address, AshokaCoinSale_ABI, provider)
    // Now we have the contract as an object in our react.js files 
    // and so we can access the method and variables from that contract here like name() or symbol() for example

    // let tokenName = await AshokaCoin_Contract.name()
    // console.log(tokenName)

    // let balance = await AshokaCoin_Contract.balanceOf(selectedAccount)
    // console.log(balance)

    return Promise.resolve([selectedAccount, AshokaCoin_Contract])
}

export const getUserACBalance = () => {
    return Promise.resolve(AshokaCoin_Contract.balanceOf(selectedAccount))
}

export const buyToken = async (no_of_tokens) => {
    console.log(AshokaCoin_Address)
    let bal1 = await Promise.resolve(AshokaCoin_Contract.balanceOf(AshokaCoinSale_Address))
    let bal2 = await Promise.resolve(AshokaCoin_Contract.balanceOf(AshokaCoin_Address))
    console.log('ashokacoinsale contract address', bal1)
    console.log('ashokacoin contract address', bal2)
    // AshokaCoinSale_Contract.buyTokens(no_of_tokens, {
    //     from: selectedAccount,
    //     value: no_of_tokens * AshokaCoinSale_Contract.tokenPrice(),
    //     gas: 500000 // Gas limit
    // })

    return Promise.resolve(AshokaCoin_Contract.balanceOf(selectedAccount))
}
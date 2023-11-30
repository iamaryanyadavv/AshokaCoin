import Web3 from 'web3'
import AshokaCoin_Build from 'contracts/AshokaCoin.json'
import { ethers } from 'ethers'

let selectedAccount
let AshokaCoin_Contract

export const init = async () => {
    let provider = new ethers.BrowserProvider(window.ethereum)
    let provider0 = window.ethereum

    if (typeof provider0 !== 'undefined') {
        // metamask is installed

        provider0
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                selectedAccount=accounts[0]
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

    const web3 = new Web3(provider0)

    const networkID = await web3.eth.net.getId()

    let AshokaCoin_Address = AshokaCoin_Build.networks[networkID].address
    let AshokaCoin_ABI = AshokaCoin_Build.abi

    AshokaCoin_Contract = new ethers.Contract(AshokaCoin_Address, AshokaCoin_ABI, provider)
    // Now we have the contract as an object in our react.js files 
    // and so we can access the method and variables from that contract here like name() or symbol() for example

    let tokenName = await AshokaCoin_Contract.name()
    console.log(tokenName)

}
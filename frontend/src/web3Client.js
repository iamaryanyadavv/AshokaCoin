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

    AshokaCoin_Address = AshokaCoin_Build.networks[networkID].address
    let AshokaCoin_ABI = AshokaCoin_Build.abi

    // AshokaCoin_Contract = new ethers.Contract(AshokaCoin_Address, AshokaCoin_ABI, provider)

    AshokaCoin_Contract = new web3.eth.Contract(
        AshokaCoin_ABI,
        AshokaCoin_Address
    )

    AshokaCoinSale_Address = AshokaCoinSale_Build.networks[networkID].address
    let AshokaCoinSale_ABI = AshokaCoinSale_Build.abi

    // AshokaCoinSale_Contract = new ethers.Contract(AshokaCoinSale_Address, AshokaCoinSale_ABI, provider)

    AshokaCoinSale_Contract = new web3.eth.Contract(
        AshokaCoinSale_ABI,
        AshokaCoinSale_Address
    )
    // Now we have the contract as an object in our react.js files 
    // and so we can access the method and variables from that contract here like name() or symbol() for example

    let userBalance = await Promise.resolve(web3.eth.getBalance(selectedAccount))
    // console.log('balance: ', userBalance, 'wei')
    // console.log('balance: ', web3.utils.fromWei(userBalance, 'ether'), 'ether')
    let userBalanceETH = web3.utils.fromWei(userBalance, 'ether')

    let userBalanceASHONK = await Promise.resolve(AshokaCoin_Contract.methods.balanceOf(selectedAccount).call())

    // let tokenName = await AshokaCoin_Contract.name()
    // console.log(tokenName)

    // let balance = await AshokaCoin_Contract.balanceOf(selectedAccount)
    // console.log(balance)

    return Promise.resolve([selectedAccount, userBalanceETH, userBalanceASHONK])
}


export const buyToken = async (no_of_tokens) => {
    // console.log(AshokaCoinSale_Address)
    // let bal1 = await Promise.resolve(AshokaCoin_Contract.methods.balanceOf(AshokaCoinSale_Address).call())
    // let bal2 = await Promise.resolve(AshokaCoin_Contract.methods.balanceOf(AshokaCoin_Address).call())
    // console.log('ashokacoinsale contract address BALANCE', bal1)
    // console.log('ashokacoin contract address BALANCE', bal2)

    const web3 = new Web3(window.ethereum)

    const tokensToBuy = web3.utils.toBigInt(parseInt(no_of_tokens)); // Convert to BigNumber
    const tokenPrice = await AshokaCoinSale_Contract.methods.tokenPrice().call();
    const tokenPriceBN = web3.utils.toBigInt(tokenPrice)
    const priceInWei = tokenPriceBN*tokensToBuy

    AshokaCoinSale_Contract.methods.buyTokens(tokensToBuy.toString(), {
        from: selectedAccount,
        value: priceInWei.toString(), // Ensure it's passed as a string
        gas: 500000 // Gas limit
    })

    window.addEventListener('')


    let bal3 = await Promise.resolve(AshokaCoin_Contract.methods.balanceOf(AshokaCoinSale_Address).call())
    let bal4 = await Promise.resolve(AshokaCoin_Contract.methods.balanceOf(selectedAccount).call())
    console.log('sale balance', bal3)
    console.log('my balance', bal4)

    return Promise.resolve(AshokaCoin_Contract.methods.balanceOf(selectedAccount).call())
}
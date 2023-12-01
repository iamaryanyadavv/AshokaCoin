import './App.css';
import React, { useEffect, useState } from 'react';
import { init } from './web3Client';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import BuyToken from './pages/buyToken';
import Raffle from './pages/raffle';
import ConnectWallet from './pages/connectWallet';

function App() {
    const [walletInitRes, setWalletInitRes] = useState()

    useEffect(() => {
        const fetchWalletData = async () => {
            let initRes 
            initRes = await init()//initialising web3client
            setWalletInitRes(initRes)
        }
        fetchWalletData()
    },[])

    const theme = createTheme({
        type: 'dark',
        theme: {
            colors: {
                white: '#ffffff',
                black: '#22092C',
            }
        }
    })

    return (
        <NextUIProvider theme={theme}>
            {walletInitRes === false ?
                <>
                    <ConnectWallet/>
                </>
                :
                <>
                    <Header />
                    <div className='container'>
                        <Router>
                            <Routes>
                                <Route exact path="/" element={<BuyToken />} />
                                <Route exact path="/ashonkraffle" element={<Raffle />} />
                            </Routes>
                        </Router>
                    </div>
                </>
            }
        </NextUIProvider>
    );
}

export default App;

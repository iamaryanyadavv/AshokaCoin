import React, { useEffect, useState } from "react";
import './buyToken.css'
import { Grid, Text, Loading, Col, Row, Input, Button, Modal, Tooltip } from "@nextui-org/react";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { FaWallet } from "react-icons/fa";
import { buyToken } from "../web3Client";
import { BsFillQuestionDiamondFill } from "react-icons/bs";

export default function BuyToken(props) {
    const [userBalanceETH, setUserBalanceETH] = useState();
    const [userBalanceASHONK, setUserBalanceASHONK] = useState();
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [word, setWord] = useState('Wherever');
    const [no_of_tokens, setNo_Of_Tokens] = useState('')
    const [ETH_inputStatus, setETH_inputStatus] = useState('default')
    const [showFaucetModal, setShowFaucetModal] = useState(false)
    const [enableFaucetBTN, setEnableFaucetBTN] = useState(false)

    useEffect(() => {
        if (typeof props.initData !== 'undefined') {
            setSelectedAccount(props.initData[0])
            // setUserBalanceETH(props.initData[1])
            console.log('userBalanceETH: ', props.initData[1])
            setUserBalanceETH(props.initData[1] == '0.' ? 0 : props.initData[1])
            setUserBalanceASHONK(props.initData[2])
        }
    }, [props.initData])

    const invokeBuyToken = async (no_of_tokens) => {
        let balance = await buyToken(no_of_tokens)
        console.log(balance)
    }

    useEffect(() => {
        const wordArray = [' Wherever', ' Whoever', ' Whenever'];
        let i = 0;

        const interval = setInterval(() => {
            setWord(wordArray[i]);
            i = (i + 1) % wordArray.length;
        }, 2000);

        return () => clearInterval(interval);
    }, []); // Empty dependency array ensures this effect runs only once



    return (
        <>
            {(typeof props.initData === 'undefined' && selectedAccount === null) ? (
                <Grid.Container css={{
                    jc: 'center',
                    alignItems: 'center',
                    width: '100vw',
                    height: '80vh'
                }}>
                    <Col css={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Loading size="md" color="error" />
                        <Text css={{
                            fontSize: '$2xl',
                            fontWeight: '$semibold',
                            color: '#BE3144',
                            marginTop: '12px'
                        }}>
                            Getting your balance from your connected wallet
                        </Text>
                    </Col>
                </Grid.Container>
            ) : (
                <>
                    <Col css={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: 'max-content'
                    }}>
                        <Text css={{
                            fontWeight: '$medium',
                            fontSize: '$md',
                            color: '#872341',
                            paddingTop: '48px'
                        }}>
                            Connected Account
                        </Text>
                        <Text css={{
                            fontWeight: '$semibold',
                            fontSize: '$xl',
                            color: '#F05941',
                        }}>
                            {selectedAccount}
                        </Text>
                        {userBalanceETH == 0 ?
                            <Button flat color={'error'} css={{
                                background: 'rgba(240, 89, 65, 0.25)',
                                color: 'rgba(240, 89, 65, 1)',
                                margin: '8px 0px 48px 0px'
                            }}
                                onClick={() => {
                                    setShowFaucetModal(true)
                                }}>
                                ETH Faucet
                            </Button>
                            :
                            <Row css={{
                                width: 'max-content',
                                alignItems: 'start'
                            }}>
                                <Button flat color={'error'} css={{
                                    margin: '8px 8px 48px 0px'
                                }}
                                    disabled>
                                    ETH Faucet
                                </Button>
                                <Tooltip
                                    content="You already have some ETH in your account to be able to exchange for some ASHONK"
                                >
                                    <BsFillQuestionDiamondFill color="#872341" size={'16px'} />
                                </Tooltip>
                            </Row>
                        }

                        <Modal
                            closeButton
                            blur
                            aria-labelledby="faucet-modal"
                            open={showFaucetModal}
                            onClose={() => {
                                setShowFaucetModal(false)
                            }}
                        >
                            <Modal.Header>
                                <Text css={{
                                    fontSize: '$2xl',
                                    fontWeight: '$semibold',
                                    color: '#BE3144',
                                    borderWidth: '0px 0px 2px 0px',
                                    borderStyle: 'solid',
                                    borderColor: '#872341'
                                }}>
                                    ETH Faucet
                                </Text>
                            </Modal.Header>
                            <Modal.Body>
                                <Text css={{
                                    fontSize: '$md',
                                    fontWeight: '$medium',
                                    color: '#fff',
                                }}>
                                    We noticed you do not have any ETH in this account
                                    (<span style={{ color: '#BE3144' }}>
                                        {selectedAccount}
                                    </span>),
                                    so we decided to give you some free ETH for you to be able to exchange it for some ASHONK.
                                </Text>
                                <Text css={{
                                    fontSize: '$xs',
                                    fontWeight: '$medium',
                                    color: '#fff',
                                }}>
                                    Paste your public key below for the exchange.
                                </Text>
                                <Input
                                    aria-label='faucet-input'
                                    underlined
                                    labelLeft="Pkey"
                                    placeholder="0x00"
                                    css={{
                                        minWidth: '300px'
                                    }}
                                    onChange={(event) => {
                                        setEnableFaucetBTN(
                                            event.target.value == selectedAccount ? true : false
                                        )
                                    }}
                                />
                                {enableFaucetBTN == false ?
                                    <Button flat color={'error'} css={{
                                        marginTop: '12px'
                                    }}
                                        disabled>
                                        Get 0.1 ETH
                                    </Button>
                                    :
                                    <Button flat color={'error'} css={{
                                        marginTop: '12px',
                                        background: 'rgba(240, 89, 65, 0.25)',
                                        color: 'rgba(240, 89, 65, 1)'
                                    }}
                                        onClick={() => {
                                            // transfer some eth from one of our accounts to this account
                                        }}>
                                        Get 0.1 ETH
                                    </Button>
                                }
                            </Modal.Body>
                        </Modal>

                        <Grid.Container css={{
                            width: '100vw',
                            jc: 'space-evenly',
                            alignItems: 'start',
                            paddingBottom: '48px'
                        }}>

                            {/* Left Side Text */}
                            <Grid css={{
                                maxW: '500px',
                                minWidth: '300px'
                            }}>
                                <Text css={{
                                    fontSize: '$3xl',
                                    fontWeight: '$bold',
                                    lineHeight: '1.25'
                                }}>
                                    Buy And Sell Ashoka University's Cryptocurrency Instantly.
                                    <span style={{ color: '#F05941' }}>{word}</span>
                                </Text>

                                <Text css={{
                                    paddingTop: '20px',
                                    paddingRight: '8px',
                                    fontWeight: '$semibold',
                                    fontSize: '$lg',
                                    color: '$gray600'
                                }}>
                                    Unlock the world of cryptocurrency trading.<br></br>
                                    Where better to start then in your own university? Get AshokaCoin for insane rewards all around campus.
                                </Text>
                            </Grid>

                            {/* Right Side Text */}
                            <Grid css={{
                                maxW: '500px',
                                minWidth: '300px'
                            }}>
                                {/* Add content here if needed */}
                                <Col css={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>

                                    <Text css={{
                                        fontSize: '$4xl',
                                        fontWeight: '$bold',
                                        lineHeight: '1.3'
                                    }}>
                                        Trade
                                    </Text>
                                    <Row css={{
                                        alignItems: 'center'
                                    }}>
                                        <HiArrowTrendingUp color="#F05941" size={'20px'} />
                                        <Text css={{
                                            color: '#F05941',
                                            fontWeight: '$bold',
                                            paddingLeft: '8px',
                                            fontSize: '$sm'
                                        }}>
                                            1 ASHONK = 0.001 ETH
                                        </Text>
                                    </Row>

                                    <Col css={{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <Row css={{
                                            padding: '12px 0px'
                                        }}>
                                            <Input
                                                aria-label='eth input'
                                                underlined
                                                labelLeft="ETH"
                                                placeholder="0.00"
                                                css={{
                                                    minWidth: '300px'
                                                }}
                                                status={ETH_inputStatus}
                                                onChange={(event) => {
                                                    if (event.target.value < userBalanceETH) {
                                                        setETH_inputStatus('default')
                                                    }
                                                    else {
                                                        setETH_inputStatus('error')
                                                    }
                                                    setNo_Of_Tokens(event.target.value)
                                                }}
                                            />
                                        </Row>
                                        <Col css={{
                                            minWidth: '276px',
                                            maxW: '500px',
                                            padding: '0px 12px',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}>
                                            <Row css={{
                                                alignItems: 'center',
                                            }}>
                                                <Text css={{
                                                    fontWeight: '$semibold',
                                                    paddingRight: '4px',
                                                    color: '#F05941'
                                                }}>
                                                    ETH in your wallet:
                                                </Text>
                                                <Text css={{
                                                    fontWeight: '$semibold',
                                                }}>
                                                    {userBalanceETH}
                                                </Text>
                                                <FaWallet color="#fff" size={'16px'} style={{ margin: '0px 8px' }} />
                                            </Row>

                                        </Col>

                                        <Text css={{
                                            padding: '12px 0px 0px 0px',
                                            fontWeight: '$semibold',
                                            fontSize: '$xs'
                                        }}>
                                            You will receive...
                                        </Text>

                                        <Row css={{
                                            padding: '0px 0px 12px 0px'
                                        }}>
                                            <Input
                                                aria-label="ashonk rate"
                                                disabled
                                                underlined
                                                labelLeft="ASHONK"
                                                placeholder={no_of_tokens === '' ? '0.00' : no_of_tokens * 1000} //dynamically update based on the amount of ETH they have entered
                                                css={{
                                                    minWidth: '300px'
                                                }}
                                            />
                                        </Row>
                                        <Col css={{
                                            minWidth: '276px',
                                            maxW: '500px',
                                            padding: '0px 12px',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}>
                                            <Row css={{
                                                alignItems: 'center',
                                            }}>
                                                <Text css={{
                                                    fontWeight: '$semibold',
                                                    paddingRight: '4px',
                                                    color: '#F05941'
                                                }}>
                                                    ASHONK in your wallet:
                                                </Text>
                                                <Text css={{
                                                    fontWeight: '$semibold',
                                                }}>
                                                    {/* {console.log('ba;ance her: ', String(userBalanceASHONK))} */}
                                                    {String(userBalanceASHONK)}
                                                </Text>
                                                <FaWallet color="#fff" size={'16px'} style={{ margin: '0px 8px' }} />
                                            </Row>

                                        </Col>
                                    </Col>

                                    {(no_of_tokens === '' || ETH_inputStatus === 'error' || (no_of_tokens * 1000) === '0') ?
                                        <Button flat color={'error'} css={{
                                            marginTop: '24px'
                                        }}
                                            disabled>
                                            Buy
                                        </Button>
                                        :
                                        <Button flat color={'error'} css={{
                                            marginTop: '24px',
                                            background: 'rgba(240, 89, 65, 0.25)',
                                            color: 'rgba(240, 89, 65, 1)'
                                        }}
                                            onClick={() => {
                                                invokeBuyToken(no_of_tokens)
                                            }}>
                                            Buy
                                        </Button>
                                    }


                                </Col>
                            </Grid>
                        </Grid.Container>

                        <Grid.Container css={{
                            width: '100vw',
                            jc: 'space-evenly',
                            alignItems: 'start',
                            paddingTop: '24px',
                            paddingBottom: '64px'
                        }}>

                            <Grid>
                                <Col css={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    jc: 'center'
                                }}>
                                    <Text css={{
                                        fontSize: '$xl',
                                        fontWeight: '$semibold',
                                        color: '#F05941',
                                        lineHeight: '0.75'
                                    }}>
                                        $XX.X m
                                    </Text>
                                    <Text css={{
                                        fontSize: '$sm',
                                        fontWeight: '$semibold',
                                        color: '$gray600'
                                    }}>
                                        TOTAL VOLUME
                                    </Text>
                                </Col>
                            </Grid>

                            <Grid>
                                <Col css={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    jc: 'center'
                                }}>
                                    <Text css={{
                                        fontSize: '$xl',
                                        fontWeight: '$semibold',
                                        color: '#F05941',
                                        lineHeight: '0.75'
                                    }}>
                                        $XX.X
                                    </Text>
                                    <Text css={{
                                        fontSize: '$sm',
                                        fontWeight: '$semibold',
                                        color: '$gray600'
                                    }}>
                                        PRICE
                                    </Text>
                                </Col>
                            </Grid>

                            <Grid>
                                <Col css={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    jc: 'center'
                                }}>
                                    <Text css={{
                                        fontSize: '$xl',
                                        fontWeight: '$semibold',
                                        color: '#F05941',
                                        lineHeight: '0.75'
                                    }}>
                                        $XX.X m
                                    </Text>
                                    <Text css={{
                                        fontSize: '$sm',
                                        fontWeight: '$semibold',
                                        color: '$gray600'
                                    }}>
                                        TOTAL LIQUIDITY
                                    </Text>
                                </Col>
                            </Grid>
                        </Grid.Container>
                    </Col>
                </>
            )}
        </>
    );
}

import React, { useEffect, useState } from "react";
import { Grid, Text, Loading, Col, Row, Input, Button } from "@nextui-org/react";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { FaWallet } from "react-icons/fa";
import { getUserACBalance, buyToken } from "../web3Client";

export default function BuyToken(props) {
    const [AshokaCoin_Contract, setContract] = useState();
    const [selectedAccount, setSelectedAccount] = useState();
    const [word, setWord] = useState('Wherever');
    const [no_of_tokens, setNo_Of_Tokens] = useState(0)

    useEffect(() => {
        if (typeof props.initData !== 'undefined') {
            setContract(props.initData[1]);
            setSelectedAccount(props.initData[0]);
        }
    }, [props.initData]);

    const invokeUserACBalance = async () => {
        let userWalletData = await getUserACBalance()
        console.log(userWalletData)
    }

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
            {typeof props.initData === 'undefined' ? (
                <Loading size="md" color="error" />
            ) : (
                <Grid.Container css={{
                    width: '100vw',
                    jc: 'space-evenly',
                    alignItems: 'center',
                    height: '80vh'
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
                                    1 ASHONK = 0.0001 ETH
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
                                        onChange={(event)=>{
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
                                            0.
                                            <span style={{ fontSize: '0.75rem' }}>
                                                00
                                            </span>
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
                                        placeholder="0.00" //dynamically update based on the amount of ETH they have entered
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
                                            0.
                                            <span style={{ fontSize: '0.75rem' }}>
                                                00
                                            </span>
                                        </Text>
                                        <FaWallet color="#fff" size={'16px'} style={{ margin: '0px 8px' }} />
                                    </Row>

                                </Col>
                            </Col>

                            <Button flat color={'error'} css={{
                                marginTop: '16px'
                            }}
                            onClick={()=>{
                                invokeBuyToken(no_of_tokens)
                            }}>
                                Buy
                            </Button>

                        </Col>
                    </Grid>
                </Grid.Container>
            )}
        </>
    );
}

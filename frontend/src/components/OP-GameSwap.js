import React from 'react'
import Select from 'react-select'

import { fetchBalance, readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'

import { ethers } from 'ethers'

import OpSwap from './Op-GameSwap-Swap'

const options = [
    {value: 0, label: 'WETH'},
    {value: 1, label: 'CMD'},
]

const wethToken = "0x4200000000000000000000000000000000000006"
const cmdToken = "0x399fe73bb0ee60670430fd92fe25a0fdd308e142"
const cmdethExchange = "0xA41F70B283b8f097112ca3Bb63cB2718EE662e49"

const providerBKC = new ethers.getDefaultProvider('https://rpc.bitkubchain.io')

const inputStyle = {
    control: (styles, state) => ({
        ...styles,
        width: 95,
        background: 'transparent',
        borderColor: state.isFocused ? 'transparent' : 'transparent',
        fontSize: 16,
    }),
    option: (styles) => ({
        ...styles,
        height: '100%',
        fontSize: 12,
    }),
    indicatorSeparator: (styles) => ({
        ...styles,
        width: 0,
    }),
    placeholder: (styles) => ({
        ...styles,
    }),
    noOptionsMessage: (styles) => ({
        ...styles,
        fontSize: 12,
    }),
    input: (styles) => ({
        ...styles,
        width: 55,
        height: 25,
    }),
    valueContainer: (styles) => ({
        ...styles,
        display: 'block',
        overflow: 'visible',
        width: '50%',
        height: 25,
    }),
    singleValue: (styles) => ({
        ...styles,
        overflow: 'visible',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 800,
    }),
    menu: (styles) => ({
        ...styles,
        border: 'rgb(0 0 0 / 4%) 0px 0px 10px, rgb(46 44 53) 0px 0px 0px 1px',
    }),
}
   
const OpGameSwap = ({ setisLoading, txupdate, setTxupdate, erc20ABI, veloPoolABI, bkcOracleABI }) => {
    const { address } = useAccount()

    const [mode, setMode] = React.useState(0)

    const [cmdBalance, setCmdBalance] = React.useState(<>0.000</>)
    const [wethBalance, setWethBalance] = React.useState(<>0.000</>)

    const [cmdReserv, setCmdReserv] = React.useState(0)
    const [wethReserv, setWethReserv] = React.useState(0)

    const [priceTHB, setPriceTHB] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)

        const thefetch = async () => {
            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: cmdToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: wethToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: cmdethExchange,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                ],
            }) : [{result: 0}, {result: 0}, {result: 0}, ]
            
            const cmdBal = data[0]
            const wethBal = data[1]
            const cmdWethBal = data[2]

            const data2 = await readContracts({
                contracts: [
                    {
                        address: cmdethExchange,
                        abi: veloPoolABI,
                        functionName: 'getReserves',
                    },
                ],
            })

            const CmdWethReserv = data2[0]

            const oracleTHB = new ethers.Contract("0x4A6947323A1c14Cf69Dd128A2cf854364239d044", bkcOracleABI, providerBKC)
            const oracleETH = new ethers.Contract("0xC5D51DF217dDAeCf902BF706687ecA6277c3a936", bkcOracleABI, providerBKC)
            const ethToUSD = await oracleETH.latestAnswer()
            const usdtToTHB = await oracleTHB.latestAnswer()
            
            return [
                cmdBal, wethBal, CmdWethReserv,
                ((ethToUSD / 1e8) * (usdtToTHB / 1e8)),
            ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setCmdBalance(Number(Math.floor(ethers.utils.formatEther(result[0].result) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3}))
            
            const _jusdtbalance = ethers.utils.formatEther(result[1].result)
            setWethBalance(Number(Math.floor(_jusdtbalance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3}))

            setWethReserv(ethers.utils.formatEther(result[2].result[1]))
            setCmdReserv(ethers.utils.formatEther(result[2].result[0]))

            setPriceTHB(result[3])
        })
    }, [address, txupdate, erc20ABI, veloPoolABI, bkcOracleABI])

    console.log(cmdBalance, wethBalance)
    console.log(wethReserv, cmdReserv)
    console.log(priceTHB)

    return (
        <div style={{flexDirection: "column", alignItems: "center", justifyContent: "flex-start", background: "#e6e4f6"}} className="collection">
            <div style={{marginTop: "80px", height: "25px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", background: "#fff", padding: "7.5px 10px", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}}>
                {mode === 0 ? 
                    <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", borderBottom: "5px solid #61dafb", cursor: "pointer"}} className="bold">Swap</div> :
                    <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", color: "#b8add2", borderBottom: "5px solid transparent", cursor: "pointer"}} className="bold" onClick={() => {setMode(0)}}>Swap</div>
                }
                {false && mode === 1 ?
                    <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", borderBottom: "5px solid #61dafb", cursor: "pointer"}} className="bold">Liquidity</div> :
                    <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", color: "#b8add2", borderBottom: "5px solid transparent", cursor: "pointer"}} className="bold" onClick={() => {setMode(1)}}>Liquidity</div>
                }
                {false && mode === 2 ?
                    <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", borderBottom: "5px solid #61dafb", cursor: "pointer"}} className="bold">Farms</div> :
                    <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", color: "#b8add2", borderBottom: "5px solid transparent", cursor: "pointer"}} className="bold" onClick={() => {setMode(2)}}>Farms</div>
                }
                {false && mode === 3 ?
                    <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", borderBottom: "5px solid #61dafb", cursor: "pointer"}} className="bold">DeFi</div> :
                    <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", color: "#b8add2", borderBottom: "5px solid transparent", cursor: "pointer"}} className="bold" onClick={() => {setMode(3)}}>DeFi</div>
                }
            </div>
            {mode === 0 && 
                <>
                    <OpSwap
                        address={address}
                        setisLoading={setisLoading}
                        setTxupdate={setTxupdate}
                        options={options}
                        inputStyle={inputStyle}
                        cmdethExchange={cmdethExchange}
                        veloPoolABI={veloPoolABI}
                        cmdToken={cmdToken}
                        wethToken={wethToken}
                        erc20ABI={erc20ABI}
                        cmdBalance={cmdBalance}
                        wethBalance={wethBalance}
                        wethReserv={wethReserv}
                        cmdReserv={cmdReserv}
                        priceTHB={priceTHB}
                    />
                </>
            }
        </div>
    )
}

export default OpGameSwap
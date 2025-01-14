import React from 'react'
import Select from 'react-select'
import { getBalance, readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { ethers } from 'ethers'
import OpSwap from './OP-GameSwap-Swap'
import OpGameSwapFarm from './OP-GameSwap-Farm'

const wethToken = "0x4200000000000000000000000000000000000006"
const cmdToken = "0x399fe73bb0ee60670430fd92fe25a0fdd308e142"
const cmdethExchange = "0xA41F70B283b8f097112ca3Bb63cB2718EE662e49"
const router = '0xa062aE8A9c5e11aaA026fc2670B0D65cCc8B2858'
const factory = "0xF1046053aa5682b4F9a81b5481394DA16BE5FF5a"
const providerBKC = new ethers.getDefaultProvider('https://rpc.bitkubchain.io')
const options = [ {value: 0, label: 'ETH'}, {value: 1, label: 'CMD'}, ]
const inputStyle = { 
    control: (styles, state) => ({ ...styles, width: 95, background: 'transparent', borderColor: state.isFocused ? 'transparent' : 'transparent', fontSize: 16, }),
    option: (styles) => ({ ...styles, height: '100%', fontSize: 12, }),
    indicatorSeparator: (styles) => ({ ...styles, width: 0, }),
    placeholder: (styles) => ({ ...styles, }),
    noOptionsMessage: (styles) => ({ ...styles, fontSize: 12, }),
    input: (styles) => ({ ...styles, width: 55, height: 25, }),
    valueContainer: (styles) => ({ ...styles, display: 'block', overflow: 'visible', width: '50%', height: 25, }),
    singleValue: (styles) => ({ ...styles, overflow: 'visible', fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 800, }),
    menu: (styles) => ({ ...styles, border: 'rgb(0 0 0 / 4%) 0px 0px 10px, rgb(46 44 53) 0px 0px 0px 1px', }),
}
   
const OpGameSwap = ({ config, setisLoading, callMode, navigate, txupdate, setTxupdate, setisError, setErrMsg, erc20Abi, veloPoolABI, velodromeRouterABI, velodromeCallerABI, bkcOracleABI, stcmdABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const { open } = useAppKit()
    const [mode, setMode] = React.useState(0)
    const [cmdBalance, setCmdBalance] = React.useState(<>0.000</>)
    const [ethBalance, setEthBalance] = React.useState(<>0.000</>)
    const [cmdReserv, setCmdReserv] = React.useState(0)
    const [ethReserv, setEthReserv] = React.useState(0)
    const [priceTHB, setPriceTHB] = React.useState(0)
    const [cmdwethLpBalance, setCmdwethLpBalance] = React.useState(null)
    const [lpShare, setLpShare] = React.useState(0)
    const [ethPooled, setEthPooled] = React.useState(null)
    const [cmdPooled, setCmdPooled] = React.useState(null)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)

        const thefetch = async () => {
            const ethBal = address !== null ?
                await getBalance(config, { address: address, }) :
                {formatted: 0}
            const data = address !== null ? await readContracts(config, {
                contracts: [
                    {
                        address: cmdToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 10
                    },
                    {
                        address: cmdethExchange,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 10
                    },
                ],
            }) : [{result: 0}, {result: 0}, ]
            const cmdBal = data[0]
            const cmdWethBal = data[1]

            const data2 = await readContracts(config, {
                contracts: [
                    {
                        address: cmdethExchange,
                        abi: veloPoolABI,
                        functionName: 'getReserves',
                        chainId: 10
                    },
                    {
                        address: cmdethExchange,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 10
                    },
                ],
            })
            const CmdWethReserv = data2[0]
            const CmdWethTotal = data2[1]
            const oracleTHB = new ethers.Contract("0x4A6947323A1c14Cf69Dd128A2cf854364239d044", bkcOracleABI, providerBKC)
            const oracleETH = new ethers.Contract("0xC5D51DF217dDAeCf902BF706687ecA6277c3a936", bkcOracleABI, providerBKC)
            const ethToUSD = await oracleETH.latestAnswer()
            const usdtToTHB = await oracleTHB.latestAnswer()
            
            return [
                cmdBal, ethBal, CmdWethReserv, cmdWethBal, CmdWethTotal, 
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
            setCmdBalance(ethers.utils.formatEther(result[0].result))
            setEthBalance(result[1].formatted)
            setEthReserv(ethers.utils.formatEther(result[2].result[1]))
            setCmdReserv(ethers.utils.formatEther(result[2].result[0]))
            setCmdwethLpBalance(ethers.utils.formatEther(result[3].result))
            setPriceTHB(result[5])
            setEthPooled((ethers.utils.formatEther(result[2].result[1]) * ethers.utils.formatEther(result[3].result) / ethers.utils.formatEther(result[4].result)))
            setCmdPooled((ethers.utils.formatEther(result[2].result[0]) * ethers.utils.formatEther(result[3].result) / ethers.utils.formatEther(result[4].result)))
            setLpShare(Number(((ethers.utils.formatEther(result[3].result) / ethers.utils.formatEther(result[4].result))) * 100).toFixed(4))
        })
    }, [config, address, txupdate, erc20Abi, veloPoolABI, bkcOracleABI])

    const [liquidMode, setLiquidMode] = React.useState(0)
    const liquidModeSelect = async (option) => {
        if (liquidMode === 0 && option.value === 1) { setLiquidMode(0) }
        if (liquidMode === 1 && option.value === 1) { setLiquidMode(0) }
    }

    const [ethAdd, setEthAdd] = React.useState("")
    const [cmdAdd, setCmdAdd] = React.useState("")

    const handleAdd = async (event) => {
        try {
            setEthAdd(event.target.value)
            const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
            const bigValue = ethers.BigNumber.from(_value)
            const _reserveCmd = await readContract(config, {
                address: cmdethExchange,
                abi: veloPoolABI,
                functionName: 'getReserves',
            })
            const bigCmdReserv = ethers.BigNumber.from(_reserveCmd[0])
            const bigEthReserv = ethers.BigNumber.from(_reserveCmd[1])
            event.target.value !== "" ? setCmdAdd(ethers.utils.formatEther(((bigValue.mul(bigCmdReserv)).div(bigEthReserv)))) : setCmdAdd("")
        } catch {
            setEthAdd(ethAdd)
        }
    }
    const maxLiqHandle1 = async () => {
        const _max = address !== null ? await getBalance(config, { address: address, }) : {formatted: 0}
        const maxSubGas = Number(Number(_max.formatted) - 0.00009).toFixed(18)
        setEthAdd(String(maxSubGas))
        const _value = maxSubGas >= 0 ? ethers.utils.parseEther(String(maxSubGas)) : 0
        const bigValue = ethers.BigNumber.from(_value)        
        const _reserveCmd = await readContract(config, {
            address: cmdethExchange,
            abi: veloPoolABI,
            functionName: 'getReserves',
        })
        const bigCmdReserv = ethers.BigNumber.from(_reserveCmd[0])
        const bigEthReserv = ethers.BigNumber.from(_reserveCmd[1])
        maxSubGas >= 0 ? setCmdAdd(ethers.utils.formatEther(((bigValue.mul(bigCmdReserv)).div(bigEthReserv)))) : setCmdAdd("")
    }
    const handleAdd2 = async (event) => {
        try {
            setCmdAdd(event.target.value)
            const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
            const bigValue = ethers.BigNumber.from(_value)
            const _reserveCmd = await readContract(config, {
                address: cmdethExchange,
                abi: veloPoolABI,
                functionName: 'getReserves',
            })
            const bigCmdReserv = ethers.BigNumber.from(_reserveCmd[0])
            const bigEthReserv = ethers.BigNumber.from(_reserveCmd[1])
            event.target.value !== "" ? setEthAdd(ethers.utils.formatEther(((bigValue.mul(bigEthReserv)).div(bigCmdReserv)))) : setEthAdd("")
        } catch {
            setCmdAdd(cmdAdd)
        }
    }
    const maxLiqHandle2 = async () => {
        const _max = address !== null ? await readContract(config, {
            address: cmdToken,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [address],
        }) : 0
        setCmdAdd(ethers.utils.formatEther(_max))
        const _value = _max >= 0 ? _max : 0
        const bigValue = ethers.BigNumber.from(_value)
        const _reserveCmd = await readContract(config, {
            address: cmdethExchange,
            abi: veloPoolABI,
            functionName: 'getReserves',
        })
        const bigCmdReserv = ethers.BigNumber.from(_reserveCmd[0])
        const bigEthReserv = ethers.BigNumber.from(_reserveCmd[1])
        _max >= 0 ? setEthAdd(ethers.utils.formatEther(((bigValue.mul(bigEthReserv)).div(bigCmdReserv)))) : setEthAdd("")
    }
    const addliqHandle = async () => {
        setisLoading(true)
        const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now
        try {
            const cmdAllow = await readContract(config, {
                address: cmdToken,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, router],
            })
            if (Number(ethers.utils.formatEther(String(cmdAllow))) < Number(cmdAdd)) {
                let { request } = await simulateContract(config, {
                    address: cmdToken,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [router, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: router,
                abi: velodromeRouterABI,
                functionName: 'addLiquidityETH',
                args: [cmdToken, false, ethers.utils.parseEther(cmdAdd), ethers.utils.parseEther(cmdAdd) , ethers.utils.parseEther(ethAdd), address, deadline],
                value: ethers.utils.parseEther(ethAdd),
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const [lpSell, setLpSell] = React.useState("")
    const removeliqHandle = async () => {
        setisLoading(true)
        const qouteRemove = await readContract(config, {
            address: router,
            abi: velodromeRouterABI,
            functionName: 'quoteRemoveLiquidity',
            args: [cmdToken, wethToken, false, factory, ethers.utils.parseEther(lpSell)],
        })
        const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now
        try {
            const cmdwethAllow = await readContract(config, {
                address: cmdethExchange,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, router],
            })
            if (Number(ethers.utils.formatEther(String(cmdwethAllow))) < Number(lpSell)) {
                let { request } = await simulateContract(config, {
                    address: cmdethExchange,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [router, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: router,
                abi: velodromeRouterABI,
                functionName: 'removeLiquidityETH',
                args: [cmdToken, false, ethers.utils.parseEther(lpSell), qouteRemove[0], qouteRemove[1], address, deadline],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    return (
        <>
            {address !== null && chain !== undefined && chain.id !== 10 ?
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                        <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "fit-content", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
                            <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">MISMATCH CHAIN!</div>
                            <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to OP Mainnet.</div>
                            <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => open({ view: 'Networks' })}>SWITCH NETWORK</div>
                            <div className="button" style={{marginTop: "10px", width: "50%", background: "gray"}} onClick={() => {callMode(0); navigate('/');}}>BACK TO HOME</div>
                        </div>
                    </div>
                </div> :
                <div style={{flexDirection: "column", alignItems: "center", justifyContent: "flex-start", background: "#e6e4f6"}} className="collection">
                    <div style={{marginTop: "80px", height: "25px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", background: "#fff", padding: "7.5px 10px", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}}>
                        {mode === 0 ? 
                            <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", borderBottom: "5px solid #61dafb", cursor: "pointer"}} className="bold">Swap</div> :
                            <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", color: "#b8add2", borderBottom: "5px solid transparent", cursor: "pointer"}} className="bold" onClick={() => {setMode(0)}}>Swap</div>
                        }
                        {mode === 1 ?
                            <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", borderBottom: "5px solid #61dafb", cursor: "pointer"}} className="bold">Liquidity</div> :
                            <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", color: "#b8add2", borderBottom: "5px solid transparent", cursor: "pointer"}} className="bold" onClick={() => {setMode(1)}}>Liquidity</div>
                        }
                        {mode === 2 ?
                            <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", borderBottom: "5px solid #61dafb", cursor: "pointer"}} className="bold">Gov</div> :
                            <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", color: "#b8add2", borderBottom: "5px solid transparent", cursor: "pointer"}} className="bold" onClick={() => {setMode(2)}}>Gov</div>
                        }
                    </div>
                    {mode === 0 && <OpSwap config={config} address={address} setisLoading={setisLoading} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} options={options} inputStyle={inputStyle} cmdethExchange={cmdethExchange} veloPoolABI={veloPoolABI} cmdToken={cmdToken} wethToken={wethToken} erc20Abi={erc20Abi} cmdBalance={cmdBalance} ethBalance={ethBalance} ethReserv={ethReserv} cmdReserv={cmdReserv} priceTHB={priceTHB} velodromeCallerABI={velodromeCallerABI} />}
                    {mode === 1 &&
                        <div style={{margin: "20px 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                            <div style={{margin: "20px", padding: "20px 0", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                                <div style={{width: "85%", textAlign: "left", fontSize: "20px"}} className="bold">Add LP</div>
                                <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                                    <div style={{display: "flex"}}>
                                        <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/10/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo.svg" alt="$ETH" />
                                        <Select
                                            options={[]}
                                            value={options[0]}
                                            styles={inputStyle}
                                            isSearchable={false}
                                        />
                                    </div>
                                    <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {Number(ethBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                </div>
                                {liquidMode === 0 &&
                                    <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                                        <input
                                            placeholder="0.0"
                                            style={{alignSelf: "flex-start", marginTop: 0, width: "190px", height: "40px", padding: "5px 20px", border: "1px solid #dddade"}}
                                            onChange={handleAdd}
                                            value={ethAdd}
                                        />
                                        <div style={{padding: "15px 10px", border: "1px solid #dddade", cursor: "pointer"}} className="bold" onClick={maxLiqHandle1}>Max</div>
                                    </div>
                                }
                                <div className="fa fa-plus"></div>
                                <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                                    <div style={{display: "flex"}}>
                                        {liquidMode === 0 && <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://gateway.commudao.xyz/ipfs/bafkreidm3tpt3xpcmypzeaqicyxvihmygzu5mw3v74o6b2wve6ar5pdbs4" alt="$CMD" />}
                                        {liquidMode === 0 &&
                                            <Select
                                                onChange={liquidModeSelect}
                                                options={options.filter(option => option.value !== 0)}
                                                value={options[1]}
                                                styles={inputStyle}
                                                isSearchable={false}
                                            />
                                        }
                                    </div>
                                    {liquidMode === 0 && <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {Number(cmdBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>}
                                </div>
                                {liquidMode === 0 &&
                                    <>
                                        <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                                            <input
                                                placeholder="0.0"
                                                style={{alignSelf: "flex-start", marginTop: 0, width: "190px", height: "40px", padding: "5px 20px", border: "1px solid #dddade"}}
                                                onChange={handleAdd2}
                                                value={cmdAdd}
                                            />
                                            <div style={{padding: "15px 10px", border: "1px solid #dddade", cursor: "pointer"}} className="bold" onClick={maxLiqHandle2}>Max</div>
                                        </div>
                                        {address !== null ?
                                            <div style={{letterSpacing: "1px", width: "240px", padding: "15px 30px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "18px"}} className="bold" onClick={addliqHandle}>Add</div> :
                                            <div style={{letterSpacing: "1px", width: "240px", padding: "15px 30px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "18px"}} className="bold">Add</div>
                                        }
                                    </>
                                }
                            </div>
                            <div style={{margin: "20px", padding: "20px 0", height: "450px", boxShadow: "6px 6px 0 #00000040", fontSize: "14px"}} className="nftCard">
                                <div style={{width: "85%", textAlign: "left", fontSize: "20px"}} className="bold">Remove LP</div>
                                {liquidMode === 0 &&
                                    <>
                                        <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                                            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                                <div style={{height: "25px", lineHeight: 1.75}}>POOLED</div>
                                                <img style={{width: "28px", height: "28px", marginLeft: "7.5px"}} src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/10/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo.svg" alt="$ETH" />
                                            </div>
                                            <div style={{marginLeft: "5px", height: "25px", lineHeight: 1.75}} className='bold'>
                                                {ethPooled !== null ? <>{ethPooled.toLocaleString('en-US', {minimumFractionDigits:3})}</> : <>0.000</>}
                                            </div>
                                        </div>
                                        <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                                            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                                <div style={{height: "25px", lineHeight: 1.75}}>POOLED</div>
                                                <img style={{width: "28px", height: "28px", marginLeft: "7.5px"}} src="https://gateway.commudao.xyz/ipfs/bafkreidm3tpt3xpcmypzeaqicyxvihmygzu5mw3v74o6b2wve6ar5pdbs4" alt="$CMD" />
                                            </div>
                                            <div style={{marginLeft: "5px", height: "25px", lineHeight: 1.75}} className='bold'>
                                                {cmdPooled !== null ? <>{cmdPooled.toLocaleString('en-US', {minimumFractionDigits:3})}</> : <>0.000</>}
                                            </div>
                                        </div>
                                    </>
                                }
                                <div style={{width: "85%", display: "flex", justifyContent: "space-between", fontSize: "14px"}}>
                                    <div style={{height: "25px", lineHeight: 1.75}}>LP VALUE:</div>
                                    <div className="bold" style={{marginLeft: "5px", height: "25px", lineHeight: 1.75}}>
                                        {ethReserv !== 0 ?
                                            <>
                                                {liquidMode === 0 ? <>~{(Math.floor((ethPooled + (cmdPooled * (ethReserv/cmdReserv))) * priceTHB * 100) / 100).toLocaleString('en-US', {minimumFractionDigits:2})} THB</> : <></>}
                                            </> :
                                            <>0.000</>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "85%", display: "flex", justifyContent: "space-between", fontSize: "14px"}}>
                                    <div style={{height: "25px", lineHeight: 1.75}}>LP SHARE:</div>
                                    <div className="bold" style={{marginLeft: "5px", height: "25px", lineHeight: 1.75}}>
                                        {lpShare !== 0 ?
                                            <>
                                                {liquidMode === 0 ? <>{lpShare}%</> : <></>}
                                            </> :
                                            <>0.000</>
                                        }
                                    </div>
                                </div>
                                {liquidMode === 0 &&
                                    <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                                        <div style={{marginLeft: "5px", height: "25px"}}>
                                            <img style={{width: "28px", height: "28px"}} src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/10/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo.svg" alt="$ETH" />
                                            <img style={{width: "28px", height: "28px", marginLeft: "7.5px"}} src="https://gateway.commudao.xyz/ipfs/bafkreidm3tpt3xpcmypzeaqicyxvihmygzu5mw3v74o6b2wve6ar5pdbs4" alt="$CMD" />
                                        </div>
                                        <div className='bold' style={{marginLeft: "5px", height: "25px", lineHeight: 2.5}}>
                                            {cmdwethLpBalance !== null ? <>Balance: {Number(cmdwethLpBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</> : <>0.000</>}
                                        </div>
                                    </div>
                                }
                                {liquidMode === 0 &&
                                    <>
                                        <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                                            <input
                                                placeholder="0.0"
                                                style={{alignSelf: "flex-start", marginTop: 0, width: "190px", height: "40px", padding: "5px 20px", border: "1px solid #dddade"}}
                                                onChange={(event) => setLpSell(event.target.value)}
                                                value={lpSell}
                                            />
                                            <div style={{padding: "15px 10px", border: "1px solid #dddade", cursor: "pointer"}} className="bold" onClick={(() => setLpSell(cmdwethLpBalance))}>Max</div>
                                        </div>
                                        {address !== null ?
                                            <div style={{letterSpacing: "1px", width: "240px", padding: "15px 30px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "18px"}} className="bold" onClick={removeliqHandle}>Remove</div> :
                                            <div style={{letterSpacing: "1px", width: "240px", padding: "15px 30px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "18px"}} className="bold">Remove</div>
                                        }
                                    </>
                                }
                            </div>
                        </div>            
                    }
                    {mode === 2 && <OpGameSwapFarm config={config} address={address} setisLoading={setisLoading} setTxupdate={setTxupdate} txupdate={txupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} stcmdABI={stcmdABI} />}
                </div>
            }
        </>
    )
}

export default OpGameSwap
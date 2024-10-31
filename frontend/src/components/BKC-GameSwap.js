import React from 'react'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { ethers } from 'ethers'
const { ethereum } = window

const cmmkkubToken = "0x5Cced24E580586841f326d5088D288e6Ddd201dA"
const cmosToken = "0x8b062b96Bb689833D7870a0133650FA22302496d"
const farmCMOS = "0xe5B764566CB5b26fE7568e59370368ACf9c7c5c3"

const BKCGameSwap = ({ config, setisLoading, callMode, navigate, setTxupdate, txupdate, setisError, setErrMsg, erc20Abi, diamonLpABI, farmCmosABI, bkcOracleABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const { open } = useAppKit()
    const [cmmKkubBalance, setCmmKkubBalance] = React.useState(0)
    const [cmmKkubStakedBalance, setCmmKkubStakedBalance] = React.useState(0)
    const [cmosPending, setCmosPending] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)

        const thefetch = async () => {
            const data = address !== null ? await readContracts(config, {
                contracts: [
                    {
                        address: cmmkkubToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 96,
                    },
                    {
                        address: cmmkkubToken,
                        abi: diamonLpABI,
                        functionName: 'getReserves',
                        chainId: 96,
                    },
                    {
                        address: '0x4A6947323A1c14Cf69Dd128A2cf854364239d044',
                        abi: bkcOracleABI,
                        functionName: 'latestAnswer',
                        chainId: 96,
                    },
                    {
                        address: '0x775eeFF3f80f110C2f7ac9127041915489c275f4',
                        abi: bkcOracleABI,
                        functionName: 'latestAnswer',
                        chainId: 96,
                    },
                    {
                        address: '0x67ebd850304c70d983b2d1b93ea79c7cd6c3f6b5',
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [cmmkkubToken],
                        chainId: 96,
                    },
                    {
                        address: '0x9b005000a10ac871947d99001345b01c1cef2790',
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [cmmkkubToken],
                        chainId: 96,
                    },
                    {
                        address: cmmkkubToken,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 96,
                    },
                    {
                        address: cmmkkubToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmCMOS],
                        chainId: 96,
                    },
                    {
                        address: farmCMOS,
                        abi: farmCmosABI,
                        functionName: 'userInfo',
                        args: [1, address],
                        chainId: 96,
                    },
                    {
                        address: farmCMOS,
                        abi: farmCmosABI,
                        functionName: 'pendingReward',
                        args: [1, address],
                        chainId: 96,
                    },
                ],
            }) : [{result: 0}, {result: 0}, {result: 0}, {result: [0, 0, 0]}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: [0]}, {result: 0}]

            const _cmmKkubBal = data[0].result 
            const _cmmKkubBalStaked = data[8].result[0]
            const _cmosPending = data[9].result

            return [
                _cmmKkubBal, _cmmKkubBalStaked, _cmosPending,
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
            setCmmKkubBalance(ethers.utils.formatEther(result[0]))
            setCmmKkubStakedBalance(ethers.utils.formatEther(result[1]))
            setCmosPending(ethers.utils.formatEther(result[2]))
        })

    }, [config, address, txupdate, erc20Abi, diamonLpABI, farmCmosABI, bkcOracleABI])

    const [lp1Stake, setLp1Stake] = React.useState("")
    const [lp1StakeWei, setLp1StakeWei] = React.useState(0)
    const [lp1Withdraw, setLp1Withdraw] = React.useState("")

    const addstakeHandle = async () => {
        setisLoading(true)
        try {
            const lpAllow = await readContract(config, {
                address: cmmkkubToken,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, farmCMOS],
            })
            if (Number(lpAllow) < Number(lp1Stake)) {
                let { request } = await simulateContract(config, {
                    address: cmmkkubToken,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [farmCMOS, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: farmCMOS,
                abi: farmCmosABI,
                functionName: 'deposit',
                args: [1, lp1StakeWei],
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

    const withdrawstakeHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: farmCMOS,
                abi: farmCmosABI,
                functionName: 'withdraw',
                args: [1, ethers.utils.parseEther(String(lp1Withdraw))],
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

    const harvestHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: farmCMOS,
                abi: farmCmosABI,
                functionName: 'withdraw',
                args: [1, 0],
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
            {address !== null && chain !== undefined && chain.id !== 96 ?
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                        <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "fit-content", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
                            <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">MISMATCH CHAIN!</div>
                            <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to Bitkub Chain.</div>
                            <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => open({ view: 'Networks' })}>SWITCH NETWORK</div>
                            <div className="button" style={{marginTop: "10px", width: "50%", background: "gray"}} onClick={() => {callMode(0); navigate('/');}}>BACK TO HOME</div>
                        </div>
                    </div>
                </div> :
                <div style={{flexDirection: "column", alignItems: "center", justifyContent: "flex-start", background: "#e6e4f6"}} className="collection">
                    <div style={{marginTop: "80px", height: "25px", width: "100px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", background: "#fff", padding: "7.5px 10px", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}}>
                        <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", borderBottom: "5px solid #61dafb", cursor: "pointer"}} className="bold">Farms</div>
                    </div>
                    <div style={{margin: "20px 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                        <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                            <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                                <div 
                                    style={{cursor: "crosshair"}}
                                    onClick={async () => {
                                        await ethereum.request({
                                            method: 'wallet_watchAsset',
                                            params: {
                                                type: 'ERC20',
                                                options: {
                                                    address: cmmkkubToken,
                                                    symbol: 'CMM-KKUB-LP',
                                                    decimals: 18,
                                                },
                                            },
                                        })
                                    }}
                                >
                                    <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://storage.googleapis.com/static.bitkubnext.com/bitkub-next/token-icons/kub.png" alt="$KUB" />
                                    <img style={{width: "38px", height: "38px", marginLeft: "-10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiaayvrql643lox66vkdfv6uzaoq2c5aa5mq3jjp3c7v4asaxvvzla" alt="$CMM" />
                                </div>
                                <div
                                    style={{cursor: "crosshair"}}
                                    onClick={async () => {
                                        await ethereum.request({
                                            method: 'wallet_watchAsset',
                                            params: {
                                                type: 'ERC20',
                                                options: {
                                                    address: cmosToken,
                                                    symbol: 'CMOS',
                                                    decimals: 18,
                                                    image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidcxukia62wzaaes6wpsdgpw3yjshrjm7nwijwldxdthkepsebumq',
                                                },
                                            },
                                        })
                                    }}
                                >
                                    <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidcxukia62wzaaes6wpsdgpw3yjshrjm7nwijwldxdthkepsebumq" alt="$CMOS" />
                                </div>
                            </div>
                            <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                                <div>Total Daily Yield:</div>
                                <div className="bold">{Number(2 * (86400/5) * (10/13)).toLocaleString('en-US', {maximumFractionDigits:0})} CMOS + 0.3% SWAP REV</div>
                            </div>
                            <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", boxShadow: "inset -2px -2px 0px 0.25px #00000040", padding: "15px"}}>
                                <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                                    <div>CMOS EARNED:</div>
                                    <div className="bold">{Number(cmosPending).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                </div>
                                {address !== null ?
                                    <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={harvestHandle}>Harvest</div> :
                                    <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                                }
                            </div>
                            <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", boxShadow: "inset -2px -2px 0px 0.25px #00000040", padding: "15px"}}>
                                <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                                    <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                                    <div style={{textAlign: "left", fontSize: "14px"}} className="bold">{Number(cmmKkubStakedBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                </div>
                                <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                                    <input
                                        placeholder="0.0"
                                        style={{width: "60px", padding: "5px 20px", border: "1px solid #dddade"}}
                                        onChange={(event) => setLp1Withdraw(event.target.value)}
                                        value={lp1Withdraw}
                                    />
                                    <div
                                        style={{padding: "10px 10px", border: "1px solid #dddade", cursor: "pointer"}}
                                        className="bold"
                                        onClick={() => setLp1Withdraw(cmmKkubStakedBalance)}
                                    >
                                        Max
                                    </div>
                                    {address !== null ?
                                        <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={withdrawstakeHandle}>Withdraw</div> :
                                        <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                                    }
                                </div>
                            </div>
                            <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", boxShadow: "inset -2px -2px 0px 0.25px #00000040", padding: "15px"}}>
                                <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                                    <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                                    <div style={{textAlign: "left", fontSize: "14px"}} className="bold">{Number(cmmKkubBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                </div>
                                <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                                    <input
                                        placeholder="0.0"
                                        style={{width: "60px", padding: "5px 20px", border: "1px solid #dddade"}}
                                        onChange={(event) => {setLp1Stake(event.target.value); event.target.value !== "" ? setLp1StakeWei(ethers.utils.parseEther(event.target.value)) : setLp1StakeWei(0);}}
                                        value={lp1Stake}
                                    />
                                    <div
                                        style={{padding: "10px 10px", border: "1px solid #dddade", cursor: "pointer"}}
                                        className="bold"
                                        onClick={() => {setLp1Stake(cmmKkubBalance); setLp1StakeWei(ethers.utils.parseEther(cmmKkubBalance));}}
                                    >
                                        Max
                                    </div>
                                    {address !== null ?
                                        <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={addstakeHandle}>Stake</div> :
                                        <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default BKCGameSwap
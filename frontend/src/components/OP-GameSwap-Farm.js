import React from 'react'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { ethers } from 'ethers'

const cmdethlp = '0xA41F70B283b8f097112ca3Bb63cB2718EE662e49'
const stcmdlp = '0x51f97E67B2fF5eD064Dc2B27b7A745E0d4C47Ee0'
const epoch = 9
   
const OpGameSwapFarm = ({ config, address, setisLoading, setTxupdate, txupdate, setisError, setErrMsg, erc20Abi, stcmdABI }) => {
    const [lpBalance, setLpBalance] = React.useState(null)
    const [stLpBalance, setStLpBalance] = React.useState(null)
    const [lpStake, setLpStake] = React.useState("")
    const [timetoWithdraw, setTimeToWithdraw] = React.useState("")
    const [reward1, setReward1] = React.useState("")
    const [reward2, setReward2] = React.useState("")
    const [reward3, setReward3] = React.useState("")

    React.useEffect(() => {
        console.log("Connected to " + address)

        const thefetch = async () => {
            const data = address !== null ? await readContracts(config, {
                contracts: [
                    {
                        address: cmdethlp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 10
                    },
                    {
                        address: stcmdlp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 10
                    },
                    {
                        address: stcmdlp,
                        abi: stcmdABI,
                        functionName: 'lpStake',
                        args: [address],
                        chainId: 10
                    },
                    {
                        address: stcmdlp,
                        abi: stcmdABI,
                        functionName: 'stakedRewards',
                        args: [address, epoch, 1],
                        chainId: 10
                    },
                    {
                        address: stcmdlp,
                        abi: stcmdABI,
                        functionName: 'stakedRewards',
                        args: [address, epoch, 2],
                        chainId: 10
                    },
                    {
                        address: stcmdlp,
                        abi: stcmdABI,
                        functionName: 'stakedRewards',
                        args: [address, epoch, 3],
                        chainId: 10
                    },
                ],
            }) : [{result: [0]}, {result: [0]}, {result: [null, 0]}, {result: [0]}, {result: [0]}, {result: [0]}]

            return [
                data[0].result, data[1].result, data[2].result, data[3].result, data[4].result, data[5].result,
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
            setLpBalance(ethers.utils.formatEther(result[0]))
            setStLpBalance(ethers.utils.formatEther(result[1]))
            const nextWithdraw = new Date((Number(result[2][1]) * 1000) + (86400 * 28 * 1000))
            result[2][2] ? setTimeToWithdraw(nextWithdraw.toLocaleString('es-CL')) : setTimeToWithdraw("Not Stake")
            setReward1(ethers.utils.formatEther(result[3]))
            setReward2(ethers.utils.formatEther(result[4]))
            setReward3(ethers.utils.formatUnits(result[5], 'mwei'))
        })
    }, [config, address, txupdate, erc20Abi, stcmdABI])

    const addstakeHandle = async () => {
        setisLoading(true)
        try {
            const lpAllow = await readContract(config, {
                address: cmdethlp,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, stcmdlp],
            })
            if (Number(ethers.utils.formatEther(String(lpAllow))) < Number(lpStake)) {
                let { request } = await simulateContract(config, {
                    address: cmdethlp,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [stcmdlp, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: stcmdlp,
                abi: stcmdABI,
                functionName: 'stake',
                args: [ethers.utils.parseEther(lpStake)],
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

    const withdrawHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: stcmdlp,
                abi: stcmdABI,
                functionName: 'unstake',
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
                address: stcmdlp,
                abi: stcmdABI,
                functionName: 'claimReward',
                args: [1, epoch],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            let { request: request2 } = await simulateContract(config, {
                address: stcmdlp,
                abi: stcmdABI,
                functionName: 'claimReward',
                args: [2, epoch],
            })
            let h2 = await writeContract(config, request2)
            await waitForTransactionReceipt(config, { hash: h2 })
            let { request: request3 } = await simulateContract(config, {
                address: stcmdlp,
                abi: stcmdABI,
                functionName: 'claimReward',
                args: [3, epoch],
            })
            let h3 = await writeContract(config, request3)
            await waitForTransactionReceipt(config, { hash: h3 })
            setTxupdate(h3)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    return (
        <>
            <div style={{margin: "20px 0 80px 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://optimistic.etherscan.io/token/0xa41f70b283b8f097112ca3bb63cb2718ee662e49" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://gateway.commudao.xyz/ipfs/bafkreidm3tpt3xpcmypzeaqicyxvihmygzu5mw3v74o6b2wve6ar5pdbs4" alt="$CMD" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/10/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo.svg" alt="$ETH" />
                        </a>
                        <div></div>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>EPOCH:</div>
                        <div style={{textAlign: "right"}}>9</div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Reward distribution on:</div>
                        <div style={{textAlign: "right"}}>8-10 May 2025</div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div></div>
                        <a style={{display: "flex", textAlign: "right"}} href="https://vote.commudao.xyz/#/proposal/0x8ab7461bc8bf5a0a6cee9681755a3457aa3cf7e9c68ca593e1bc02a438109aa6" target="_blank" rel="noreferrer">Cast vote on Snapshot latest proposal to qualify</a>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div></div>
                        <div style={{textAlign: "right"}}>Terminated on 11.59 PM. May 7, 2025.</div>
                    </div>
                    <div style={{width: "75%", height: "80px", display: "flex", justifyContent: "space-between", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div style={{textAlign: "left"}}>REVENUE SHARED EPOCH {epoch}:</div>
                            <div className="bold">{Number(reward1).toLocaleString('en-US', {maximumFractionDigits:2})} $CMD</div>
                            <div className="bold">{Number(reward2).toLocaleString('en-US', {maximumFractionDigits:6})} $WETH</div>
                            <div className="bold">{Number(reward3).toLocaleString('en-US', {maximumFractionDigits:2})} $USDT</div>
                        </div>
                        {Number(reward1) > 0 || Number(reward2) > 0 || Number(reward3) > 0 ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={harvestHandle}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(206, 208, 207)", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {stLpBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold">{(Math.floor(Number(stLpBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div className='bold' style={{textAlign: "left", fontSize: "12px"}}>
                                Unlock date:
                                <br></br>{timetoWithdraw}
                            </div>
                            {timetoWithdraw !== 'Not Stake' ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={withdrawHandle}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(206, 208, 207)", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {lpBalance !== null ? <div style={{textAlign: "left", fontSize: "14px", cursor: "pointer"}} onClick={() => setLpStake(lpBalance)}><span className="bold">{(Math.floor(Number(lpBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpStake}
                                onChange={(event) => setLpStake(event.target.value)}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={addstakeHandle}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OpGameSwapFarm
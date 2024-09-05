import React from 'react'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { ethers } from 'ethers'

const cmdethlp = '0xA41F70B283b8f097112ca3Bb63cB2718EE662e49'
const stcmdlp = '0x51f97E67B2fF5eD064Dc2B27b7A745E0d4C47Ee0'
   
const OpGameSwapFarm = ({ address, setisLoading, setTxupdate, txupdate, erc20ABI, stcmdABI }) => {
    const [lpBalance, setLpBalance] = React.useState(null)
    const [stLpBalance, setStLpBalance] = React.useState(null)
    const [lpStake, setLpStake] = React.useState("")
    const [timetoWithdraw, setTimeToWithdraw] = React.useState("")

    React.useEffect(() => {
        console.log("Connected to " + address)

        const thefetch = async () => {
            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: cmdethlp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: stcmdlp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: stcmdlp,
                        abi: stcmdABI,
                        functionName: 'lpStake',
                        args: [address],
                    },
                ],
            }) : [{result: [0]}, {result: [0]}, {result: null}]
            
            return [
                data[0].result, data[1].result, data[2].result,
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
        })
    }, [address, txupdate, erc20ABI, stcmdABI])

    const addstakeHandle = async (_index) => {
        setisLoading(true)
        try {
            const lpAllow = await readContract({
                address: cmdethlp,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, stcmdlp],
            })
            const bigValue = lpStake !== "" ? ethers.BigNumber.from(ethers.utils.parseEther(lpStake)) : ethers.BigNumber.from(0)
            const Hex = ethers.BigNumber.from(10**8)
            const bigApprove = bigValue.mul(Hex)
            if (Number(lpStake) > Number(lpAllow) / (10**18)) {
                const config = await prepareWriteContract({
                    address: cmdethlp,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [stcmdlp, bigApprove],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: stcmdlp,
                abi: stcmdABI,
                functionName: 'stake',
                args: [ethers.utils.parseEther(lpStake)],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    return (
        <>
            <div style={{margin: "20px 0 80px 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://optimistic.etherscan.io/token/0xa41f70b283b8f097112ca3bb63cb2718ee662e49" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidm3tpt3xpcmypzeaqicyxvihmygzu5mw3v74o6b2wve6ar5pdbs4" alt="$CMD" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/10/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo.svg" alt="$ETH" />
                        </a>
                        <div></div>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>EPOCH:</div>
                        <div style={{textAlign: "right"}}>1</div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Reward distribution on:</div>
                        <div style={{textAlign: "right"}}>8-10 Sep 2024</div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div></div>
                        <a style={{display: "flex", textAlign: "right"}} href="https://snapshot.org/#/commudao.eth/proposal/0xee97eff68a04ade873fa51324f2bfca5e6b0863954fde133e080042796df6f5c" target="_blank" rel="noreferrer">Cast vote on Snapshot latest proposal to qualify</a>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div></div>
                        <div style={{textAlign: "right"}}>Terminated on 11.59 PM. Sep 7, 2024.</div>
                    </div>
                    <div style={{width: "75%", height: "80px", display: "flex", justifyContent: "space-between", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>REVENUE SHARED:</div>
                            <div className="bold">TBD $USDT</div>
                            <div className="bold">TBD $WETH</div>
                            <div className="bold">TBD $CMD</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(206, 208, 207)", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
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
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(206, 208, 207)", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
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
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={addstakeHandle}>Stake</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OpGameSwapFarm
import React from 'react'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { ethers } from 'ethers'

const cmdethlp = '0xA41F70B283b8f097112ca3Bb63cB2718EE662e49'
   
const OpGameSwapFarm = ({ address, setisLoading, setTxupdate, txupdate, erc20ABI }) => {
    const [lpBalance, setLpBalance] = React.useState(null)

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
                ],
            }) : [{result: [0]}]
            
            return [
                data[0].result, 
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
        })
    }, [address, txupdate, erc20ABI])

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
                        <div style={{textAlign: "right"}}>0</div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Last reward distribution:</div>
                        <div style={{textAlign: "right"}}>Not yet</div>
                    </div>
                    <div style={{width: "75%", height: "100px", display: "flex", justifyContent: "space-between", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>REVENUE SHARED:</div>
                            <div className="bold">TBD $USDT</div>
                            <div className="bold">TBD $WETH</div>
                            <div className="bold">TBD $CMD</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold">Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div className='bold' style={{textAlign: "left", fontSize: "12px"}}>
                                Unlock date:
                                <br></br>Not open to stake yet
                            </div>
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold">Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {lpBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold">{(Math.floor(Number(lpBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold">Stake</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OpGameSwapFarm
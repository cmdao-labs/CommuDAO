import React from 'react'
import { ethers } from 'ethers'
import { readContracts } from '@wagmi/core'
import { useAccount } from 'wagmi'

import BBQAmmmerchant3 from  './BBQ-Mall-Degeno.js'
const { ethereum } = window

const cmmToken = '0x45ed41ED4E0F48317f787Dc268779260b1Ca81f1'
const gemToken = "0x222B20bCBBa261DfaaEEe6395f672F15c4d7e88F"

const BBQMall = ({ setisLoading, txupdate, setTxupdate, cmdaoAmmNpcABI, erc20ABI }) => {
    const { address } = useAccount()

    const [cmmBalance, setCmmBalance] = React.useState(0)
    const [gemBalance, setGemBalance] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)

        const thefetch = async () => {
            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: cmmToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: gemToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                ],
            }) : [{result: 0}, {result: 0},]
            
            const cmmBal = data[0].result
            const gemBal = data[1].result

            return [
                cmmBal, gemBal,
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
            setCmmBalance(ethers.utils.formatEther(String(result[0])))
            setGemBalance(ethers.utils.formatEther(String(result[1])))
        })
    }, [address, txupdate, erc20ABI])

    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div style={{fontSize: "75px", width: "fit-content"}} className="pixel">Mall</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px", letterSpacing: "1px"}} className="pixel">Automated Buy & Sell</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="../background/malllogo.png" width="150" alt="Mall_Logo" />
            </div>
        </div>

        <div className="collection">
            <div style={{textAlign: "left", height: "fit-content", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                <div style={{width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Cryptocurrency</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img 
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmWM9sbGBWM3yai8nsDsSXhE9tJZNwSwoE8XG835dJkHco"
                            width="20"
                            alt="$CMM"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: cmmToken,
                                            symbol: 'CMM',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmWM9sbGBWM3yai8nsDsSXhE9tJZNwSwoE8XG835dJkHco',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(cmmBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "0px 10px 20px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV"
                            width="20"
                            alt="$HRM-GEM"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: gemToken,
                                            symbol: 'HRM-GEM',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(gemBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                </div>

                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Automated Market Maker NPC</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <BBQAmmmerchant3 setisLoading={setisLoading} setTxupdate={setTxupdate} cmdaoAmmNpcABI={cmdaoAmmNpcABI} erc20ABI={erc20ABI} cmmBalance={cmmBalance} gemBalance={gemBalance} />
                </div>     
            </div>
        </div>
    </>
    )
}

export default BBQMall
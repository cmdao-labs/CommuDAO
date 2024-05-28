import React from 'react'
import { ethers } from 'ethers'
import { readContracts, readContract, } from '@wagmi/core'

const cmj = '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b'
const wood = '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd'
const jdao = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'

const BigBroAnalytica = ({ erc20ABI }) => {

    const [cmjLocked, setCmjLocked] = React.useState(0)
    const [cmjReward, setCmjReward] = React.useState(0)
    const [cmjBurn, setCmjBurn] = React.useState(0)
    const [cmjCirculation, setCmjCirculation] = React.useState(0)

    const [woodSupply, setWoodSupply] = React.useState(0)
    const [woodBurn, setWoodBurn] = React.useState(0)
    const [woodCirculation, setWoodCirculation] = React.useState(0)

    const [jdaoSupply, setJdaoSupply] = React.useState(0)
    const [jdaoBurn, setJdaoBurn] = React.useState(0)
    const [jdaoCirculation, setJdaoCirculation] = React.useState(0)

    React.useEffect(() => {  
        window.scrollTo(0, 0)
              
        const thefetch = async () => {
            const dataCMJ = await readContracts({
                contracts: [
                    {
                        address: cmj,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xA6d974BD59F97e49465c6995a11022CA044c001A'],
                    },
                    {
                        address: cmj,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x94EaDb7e678Ba7A78CADe66A1ABfa5c12dc8Cd7b'],
                    },
                    {
                        address: cmj,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x0000000000000000000000000000000000000042'],
                    },
                    {
                        address: cmj,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xFF19990569739e79aFF8549d8dE087Ab79De8dc7'],
                    },
                ],
            })

            const dataWOOD = await readContracts({
                contracts: [
                    {
                        address: wood,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: wood,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x0000000000000000000000000000000000000001'],
                    },
                    {
                        address: wood,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x000000000000000000000000000000000000dEaD'],
                    },
                ],
            })

            const dataJDAO = await readContracts({
                contracts: [
                    {
                        address: jdao,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: jdao,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x0000000000000000000000000000000000000001'],
                    },
                ],
            })

            return [dataCMJ, dataWOOD, dataJDAO]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setCmjLocked(ethers.utils.formatEther(String(result[0][0].result)))
            setCmjReward(ethers.utils.formatEther(String(result[0][1].result)))
            setCmjBurn(Number(ethers.utils.formatEther(String(result[0][2].result))) + Number(ethers.utils.formatEther(String(result[0][3].result))))
            setCmjCirculation(1000000 - (Number(ethers.utils.formatEther(String(result[0][0].result))) + Number(ethers.utils.formatEther(String(result[0][1].result))) + Number(ethers.utils.formatEther(String(result[0][2].result))) + Number(ethers.utils.formatEther(String(result[0][3].result)))))

            setWoodSupply(ethers.utils.formatEther(String(result[1][0].result)))
            setWoodBurn(Number(ethers.utils.formatEther(String(result[1][1].result))) + Number(ethers.utils.formatEther(String(result[1][2].result))))
            setWoodCirculation(Number(ethers.utils.formatEther(String(result[1][0].result))) - (Number(ethers.utils.formatEther(String(result[1][1].result))) + Number(ethers.utils.formatEther(String(result[1][2].result)))))
            
            setJdaoSupply(ethers.utils.formatEther(String(result[2][0].result)))
            setJdaoBurn(Number(ethers.utils.formatEther(String(result[2][1].result))))
            setJdaoCirculation(Number(ethers.utils.formatEther(String(result[2][0].result))) - Number(ethers.utils.formatEther(String(result[2][1].result))))
        })

    }, [erc20ABI])

    return (
        <>
            <div className="fieldBanner" style={{background: "#2b2268", borderBottom: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}} className="pixel">
                    <div style={{fontSize: "75px", width: "fit-content"}}>BigBro Analytica</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}}></div>
                </div>
                <div style={{margin: "30px 100px"}}>
                </div>
            </div>

            <div style={{background: "rgb(0, 19, 33", width: "100%", margin: "0", padding: "75px 0", minHeight: "inherit", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", overflow: "scroll"}} className="collection noscroll">
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "0 15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$CMJ Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Max Supply:</div>
                                <div style={{color: "#fff"}}>{Number(1000000).toLocaleString('en-US', {maximumFractionDigits:2})} (100%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Burn:</div>
                                <div style={{color: "#fff"}}>{Number(cmjBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(cmjBurn/10000).toFixed(2)}%)</div>
                            </div>
                            
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Leaderboard Reward:</div>
                                <div style={{color: "#fff"}}>{Number(cmjReward).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(cmjReward/10000).toFixed(2)}%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Locked:</div>
                                <div style={{color: "#fff"}}>{Number(cmjLocked).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(cmjLocked/10000).toFixed(2)}%)</div>
                            </div>

                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Circulation Supply:</div>
                                <div style={{color: "#fff"}}>{Number(cmjCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(cmjCirculation/10000).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "0 15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$JDAO Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Supply:</div>
                                <div style={{color: "#fff"}}>{Number(jdaoSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Burn:</div>
                                <div style={{color: "#fff"}}>{Number(jdaoBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((jdaoBurn/jdaoSupply)*100).toFixed(2)}%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Circulation Supply:</div>
                                <div style={{color: "#fff"}}>{Number(jdaoCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((jdaoCirculation/jdaoSupply)*100).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "0 15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$WOOD Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Supply:</div>
                                <div style={{color: "#fff"}}>{Number(woodSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Burn:</div>
                                <div style={{color: "#fff"}}>{Number(woodBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((woodBurn/woodSupply)*100).toFixed(2)}%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Circulation Supply:</div>
                                <div style={{color: "#fff"}}>{Number(woodCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((woodCirculation/woodSupply)*100).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BigBroAnalytica
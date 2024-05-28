import React from 'react'
import { ethers } from 'ethers'
import { readContracts } from '@wagmi/core'

const cmj = '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b'
const wood = '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd'
const bbq = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const pza = '0x09DcdCFc6C48803681a3422997c679E773656763'
const ctuna = '0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0'
const sx31 = '0xd431d826d7a4380b9259612176f00528b88840a7'
const cu = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'
const sil = '0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f'
const gold = '0x7d5346E33889580528e6F79f48BdEE94D8A9E144'
const plat = '0x3Bd00B6cd18281E3Ef13Ba348ad2783794dcb2bD'
const jasp = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const os = '0xAc5299D92373E9352636559cca497d7683A47655'
const jdao = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'

const BigBroAnalytica = ({ erc20ABI }) => {

    const [cmjLocked, setCmjLocked] = React.useState(0)
    const [cmjReward, setCmjReward] = React.useState(0)
    const [cmjBurn, setCmjBurn] = React.useState(0)
    const [cmjCirculation, setCmjCirculation] = React.useState(0)

    const [woodSupply, setWoodSupply] = React.useState(0)
    const [woodBurn, setWoodBurn] = React.useState(0)
    const [woodCirculation, setWoodCirculation] = React.useState(0)

    const [bbqSupply, setBbqSupply] = React.useState(0)
    const [bbqBurn, setBbqBurn] = React.useState(0)
    const [bbqCirculation, setBbqCirculation] = React.useState(0)

    const [pzaSupply, setPzaSupply] = React.useState(0)
    const [pzaBurn, setPzaBurn] = React.useState(0)
    const [pzaCirculation, setPzaCirculation] = React.useState(0)

    const [ctunaSupply, setCtunaSupply] = React.useState(0)
    const [ctunaBurn, setCtunaBurn] = React.useState(0)
    const [ctunaCirculation, setCtunaCirculation] = React.useState(0)

    const [sx31Supply, setSx31Supply] = React.useState(0)
    const [sx31Burn, setSx31Burn] = React.useState(0)
    const [sx31Circulation, setSx31Circulation] = React.useState(0)

    const [cuSupply, setCuSupply] = React.useState(0)
    const [cuBurn, setCuBurn] = React.useState(0)
    const [cuCirculation, setCuCirculation] = React.useState(0)

    const [silSupply, setSilSupply] = React.useState(0)
    const [silBurn, setSilBurn] = React.useState(0)
    const [silCirculation, setSilCirculation] = React.useState(0)

    const [goldSupply, setGoldSupply] = React.useState(0)
    const [goldBurn, setGoldBurn] = React.useState(0)
    const [goldCirculation, setGoldCirculation] = React.useState(0)

    const [platSupply, setPlatSupply] = React.useState(0)
    const [platLocked, setPlatLocked] = React.useState(0)
    const [platBurn, setPlatBurn] = React.useState(0)
    const [platCirculation, setPlatCirculation] = React.useState(0)

    const [jaspSupply, setJaspSupply] = React.useState(0)
    const [jaspBurn, setJaspBurn] = React.useState(0)
    const [jaspCirculation, setJaspCirculation] = React.useState(0)

    const [osSupply, setOsSupply] = React.useState(0)
    const [osLocked, setOsLocked] = React.useState(0)
    const [osBurn, setOsBurn] = React.useState(0)
    const [osCirculation, setOsCirculation] = React.useState(0)

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
                    {
                        address: wood,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
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
                    {
                        address: jdao,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                    },
                    {
                        address: jdao,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xABd4127c8058498A53E690b06a75aFAf0F1d4e86'],
                    },
                ],
            })

            const dataBBQ = await readContracts({
                contracts: [
                    {
                        address: bbq,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: bbq,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x0000000000000000000000000000000000000001'],
                    },
                    {
                        address: bbq,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                    },
                    {
                        address: bbq,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'],
                    },
                ],
            })

            const dataPZA = await readContracts({
                contracts: [
                    {
                        address: pza,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: pza,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x0000000000000000000000000000000000000001'],
                    },
                    {
                        address: pza,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                    },
                    {
                        address: pza,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'],
                    },
                    {
                        address: pza,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xABd4127c8058498A53E690b06a75aFAf0F1d4e86'],
                    },
                ],
            })

            const dataCTUNA = await readContracts({
                contracts: [
                    {
                        address: ctuna,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: ctuna,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x0000000000000000000000000000000000000001'],
                    },
                    {
                        address: ctuna,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                    },
                ],
            })

            const dataSX31 = await readContracts({
                contracts: [
                    {
                        address: sx31,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: sx31,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x0000000000000000000000000000000000000001'],
                    },
                    {
                        address: sx31,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                    }
                ],
            })

            const dataCU = await readContracts({
                contracts: [
                    {
                        address: cu,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: cu,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x0000000000000000000000000000000000000001'],
                    },
                    {
                        address: cu,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                    }
                ],
            })

            const dataSIL = await readContracts({
                contracts: [
                    {
                        address: sil,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: sil,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x0000000000000000000000000000000000000001'],
                    },
                    {
                        address: sil,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                    }
                ],
            })

            const dataGOLD = await readContracts({
                contracts: [
                    {
                        address: gold,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: gold,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x0000000000000000000000000000000000000001'],
                    },
                    {
                        address: gold,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                    }
                ],
            })

            const dataPLAT = await readContracts({
                contracts: [
                    {
                        address: plat,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: plat,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x0000000000000000000000000000000000000001'],
                    },
                    {
                        address: plat,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                    },
                    {
                        address: plat,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xABd4127c8058498A53E690b06a75aFAf0F1d4e86'],
                    },
                ],
            })

            const dataJASP = await readContracts({
                contracts: [
                    {
                        address: jasp,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: jasp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x0000000000000000000000000000000000000001'],
                    },
                    {
                        address: jasp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                    },
                ],
            })

            const dataOS = await readContracts({
                contracts: [
                    {
                        address: os,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: os,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x0000000000000000000000000000000000000001'],
                    },
                    {
                        address: os,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                    },
                    {
                        address: os,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xABd4127c8058498A53E690b06a75aFAf0F1d4e86'],
                    },
                    {
                        address: os,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x2eF9d702c42BC0F8B9D7305C34B4f63526502255'],
                    },
                ],
            })
            

            return [dataCMJ, dataWOOD, dataJDAO, dataBBQ, dataPZA, dataCTUNA, dataSX31, dataCU, dataSIL, dataGOLD, dataPLAT, dataJASP, dataOS, ]
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
            setWoodBurn(Number(ethers.utils.formatEther(String(result[1][1].result))) + Number(ethers.utils.formatEther(String(result[1][2].result))) + Number(ethers.utils.formatEther(String(result[1][3].result))))
            setWoodCirculation(Number(ethers.utils.formatEther(String(result[1][0].result))) - (Number(ethers.utils.formatEther(String(result[1][1].result))) + Number(ethers.utils.formatEther(String(result[1][2].result))) + Number(ethers.utils.formatEther(String(result[1][3].result)))))
            
            setJdaoSupply(ethers.utils.formatEther(String(result[2][0].result)))
            setJdaoBurn(Number(ethers.utils.formatEther(String(result[2][1].result))) + Number(ethers.utils.formatEther(String(result[2][2].result))) + Number(ethers.utils.formatEther(String(result[2][3].result))))
            setJdaoCirculation(Number(ethers.utils.formatEther(String(result[2][0].result))) - (Number(ethers.utils.formatEther(String(result[2][1].result))) + Number(ethers.utils.formatEther(String(result[2][2].result))) + Number(ethers.utils.formatEther(String(result[2][3].result)))))

            setBbqSupply(ethers.utils.formatEther(String(result[3][0].result)))
            setBbqBurn(Number(ethers.utils.formatEther(String(result[3][1].result))) + Number(ethers.utils.formatEther(String(result[3][2].result)))  + Number(ethers.utils.formatEther(String(result[3][3].result))))
            setBbqCirculation(Number(ethers.utils.formatEther(String(result[3][0].result))) - (Number(ethers.utils.formatEther(String(result[3][1].result))) + Number(ethers.utils.formatEther(String(result[3][2].result))) + Number(ethers.utils.formatEther(String(result[3][3].result)))))

            setPzaSupply(ethers.utils.formatEther(String(result[4][0].result)))
            setPzaBurn(Number(ethers.utils.formatEther(String(result[4][1].result))) + Number(ethers.utils.formatEther(String(result[4][2].result))) + Number(ethers.utils.formatEther(String(result[4][3].result))) + Number(ethers.utils.formatEther(String(result[4][4].result))))
            setPzaCirculation(Number(ethers.utils.formatEther(String(result[4][0].result))) - (Number(ethers.utils.formatEther(String(result[4][1].result))) + Number(ethers.utils.formatEther(String(result[4][2].result))) + Number(ethers.utils.formatEther(String(result[4][3].result))) + Number(ethers.utils.formatEther(String(result[4][4].result)))))

            setCtunaSupply(ethers.utils.formatEther(String(result[5][0].result)))
            setCtunaBurn(Number(ethers.utils.formatEther(String(result[5][1].result))) + Number(ethers.utils.formatEther(String(result[5][2].result))))
            setCtunaCirculation(Number(ethers.utils.formatEther(String(result[5][0].result))) - (Number(ethers.utils.formatEther(String(result[5][1].result))) + Number(ethers.utils.formatEther(String(result[5][2].result)))))

            setSx31Supply(ethers.utils.formatEther(String(result[6][0].result)))
            setSx31Burn(Number(ethers.utils.formatEther(String(result[6][1].result))) + Number(ethers.utils.formatEther(String(result[6][2].result))))
            setSx31Circulation(Number(ethers.utils.formatEther(String(result[6][0].result))) - (Number(ethers.utils.formatEther(String(result[6][1].result))) + Number(ethers.utils.formatEther(String(result[6][2].result)))))

            setCuSupply(ethers.utils.formatEther(String(result[7][0].result)))
            setCuBurn(Number(ethers.utils.formatEther(String(result[7][1].result))) + Number(ethers.utils.formatEther(String(result[7][2].result))))
            setCuCirculation(Number(ethers.utils.formatEther(String(result[7][0].result))) - (Number(ethers.utils.formatEther(String(result[7][1].result)))  + Number(ethers.utils.formatEther(String(result[7][2].result)))))

            setSilSupply(ethers.utils.formatEther(String(result[8][0].result)))
            setSilBurn(Number(ethers.utils.formatEther(String(result[8][1].result))) + Number(ethers.utils.formatEther(String(result[8][2].result))))
            setSilCirculation(Number(ethers.utils.formatEther(String(result[8][0].result))) - (Number(ethers.utils.formatEther(String(result[8][1].result))) + Number(ethers.utils.formatEther(String(result[8][2].result)))))

            setGoldSupply(ethers.utils.formatEther(String(result[9][0].result)))
            setGoldBurn(Number(ethers.utils.formatEther(String(result[9][1].result))) + Number(ethers.utils.formatEther(String(result[9][2].result))))
            setGoldCirculation(Number(ethers.utils.formatEther(String(result[9][0].result))) - (Number(ethers.utils.formatEther(String(result[9][1].result))) + Number(ethers.utils.formatEther(String(result[9][2].result)))))
            
            setPlatSupply(ethers.utils.formatEther(String(result[10][0].result)))
            setPlatLocked(ethers.utils.formatEther(String(result[10][3].result)))
            setPlatBurn(Number(ethers.utils.formatEther(String(result[10][1].result))) + Number(ethers.utils.formatEther(String(result[10][2].result))))
            setPlatCirculation(Number(ethers.utils.formatEther(String(result[10][0].result))) - (Number(ethers.utils.formatEther(String(result[10][1].result))) + Number(ethers.utils.formatEther(String(result[10][2].result))) + Number(ethers.utils.formatEther(String(result[10][3].result)))))

            setJaspSupply(ethers.utils.formatUnits(String(result[11][0].result), "gwei"))
            setJaspBurn(Number(ethers.utils.formatUnits(String(result[11][1].result), "gwei")) + Number(ethers.utils.formatUnits(String(result[11][2].result), "gwei")))
            setJaspCirculation(Number(ethers.utils.formatUnits(String(result[11][0].result), "gwei")) - (Number(ethers.utils.formatUnits(String(result[11][1].result), "gwei")) + Number(ethers.utils.formatUnits(String(result[11][2].result), "gwei"))))

            setOsSupply(ethers.utils.formatEther(String(result[12][0].result)))
            setOsLocked(ethers.utils.formatEther(String(result[12][4].result)))
            setOsBurn(Number(ethers.utils.formatEther(String(result[12][1].result))) + Number(ethers.utils.formatEther(String(result[12][2].result))) + Number(ethers.utils.formatEther(String(result[12][3].result))))
            setOsCirculation(Number(ethers.utils.formatEther(String(result[12][0].result))) - (Number(ethers.utils.formatEther(String(result[12][1].result))) + Number(ethers.utils.formatEther(String(result[12][2].result))) + Number(ethers.utils.formatEther(String(result[12][3].result))) + Number(ethers.utils.formatEther(String(result[12][4].result)))))
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

            <div style={{background: "rgb(0, 19, 33", width: "100%", margin: "0", padding: "75px 0", minHeight: "fit-content", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "row wrap", overflow: "scroll"}} className="collection noscroll">
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
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
                                <div>Circulating Supply:</div>
                                <div style={{color: "#fff"}}>{Number(cmjCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(cmjCirculation/10000).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
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
                                <div>Circulating Supply:</div>
                                <div style={{color: "#fff"}}>{Number(jdaoCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((jdaoCirculation/jdaoSupply)*100).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$OS Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Supply:</div>
                                <div style={{color: "#fff"}}>{Number(osSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Burn:</div>
                                <div style={{color: "#fff"}}>{Number(osBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((osBurn/osSupply)*100).toFixed(2)}%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Reward Locked:</div>
                                <div style={{color: "#fff"}}>{Number(osLocked).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((osLocked/osSupply)*100).toFixed(2)}%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Circulating Supply:</div>
                                <div style={{color: "#fff"}}>{Number(osCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((osCirculation/osSupply)*100).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
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
                                <div>Circulating Supply:</div>
                                <div style={{color: "#fff"}}>{Number(woodCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((woodCirculation/woodSupply)*100).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$BBQ Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Supply:</div>
                                <div style={{color: "#fff"}}>{Number(bbqSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Burn:</div>
                                <div style={{color: "#fff"}}>{Number(bbqBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((bbqBurn/bbqSupply)*100).toFixed(2)}%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Circulating Supply:</div>
                                <div style={{color: "#fff"}}>{Number(bbqCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((bbqCirculation/bbqSupply)*100).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$PZA Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Supply:</div>
                                <div style={{color: "#fff"}}>{Number(pzaSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Burn:</div>
                                <div style={{color: "#fff"}}>{Number(pzaBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((pzaBurn/pzaSupply)*100).toFixed(2)}%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Circulating Supply:</div>
                                <div style={{color: "#fff"}}>{Number(pzaCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((pzaCirculation/pzaSupply)*100).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$CTUNA Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Supply:</div>
                                <div style={{color: "#fff"}}>{Number(ctunaSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Burn:</div>
                                <div style={{color: "#fff"}}>{Number(ctunaBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((ctunaBurn/ctunaSupply)*100).toFixed(2)}%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Circulating Supply:</div>
                                <div style={{color: "#fff"}}>{Number(ctunaCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((ctunaCirculation/ctunaSupply)*100).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$SX31 Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Supply:</div>
                                <div style={{color: "#fff"}}>{Number(sx31Supply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Burn:</div>
                                <div style={{color: "#fff"}}>{Number(sx31Burn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((sx31Burn/sx31Supply)*100).toFixed(2)}%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Circulating Supply:</div>
                                <div style={{color: "#fff"}}>{Number(sx31Circulation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((sx31Circulation/sx31Supply)*100).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$CU Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Supply:</div>
                                <div style={{color: "#fff"}}>{Number(cuSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Burn:</div>
                                <div style={{color: "#fff"}}>{Number(cuBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((cuBurn/cuSupply)*100).toFixed(2)}%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Circulating Supply:</div>
                                <div style={{color: "#fff"}}>{Number(cuCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((cuCirculation/cuSupply)*100).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$SIL Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Supply:</div>
                                <div style={{color: "#fff"}}>{Number(silSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Burn:</div>
                                <div style={{color: "#fff"}}>{Number(silBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((silBurn/silSupply)*100).toFixed(2)}%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Circulating Supply:</div>
                                <div style={{color: "#fff"}}>{Number(silCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((silCirculation/silSupply)*100).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$GOLD Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Supply:</div>
                                <div style={{color: "#fff"}}>{Number(goldSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Burn:</div>
                                <div style={{color: "#fff"}}>{Number(goldBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((goldBurn/goldSupply)*100).toFixed(2)}%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Circulating Supply:</div>
                                <div style={{color: "#fff"}}>{Number(goldCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((goldCirculation/goldSupply)*100).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$PLAT Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Supply:</div>
                                <div style={{color: "#fff"}}>{Number(platSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Burn:</div>
                                <div style={{color: "#fff"}}>{Number(platBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((platBurn/platSupply)*100).toFixed(2)}%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Reward Locked:</div>
                                <div style={{color: "#fff"}}>{Number(platLocked).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((platLocked/platSupply)*100).toFixed(2)}%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Circulating Supply:</div>
                                <div style={{color: "#fff"}}>{Number(platCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((platCirculation/platSupply)*100).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$JASP Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Supply:</div>
                                <div style={{color: "#fff"}}>{Number(jaspSupply).toLocaleString('en-US', {maximumFractionDigits:0})} GWEI (100%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Total Burn:</div>
                                <div style={{color: "#fff"}}>{Number(jaspBurn).toLocaleString('en-US', {maximumFractionDigits:0})} GWEI ({Number((jaspBurn/jaspSupply)*100).toFixed(2)}%)</div>
                            </div>
                            <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                <div>Circulating Supply:</div>
                                <div style={{color: "#fff"}}>{Number(jaspCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} GWEI ({Number((jaspCirculation/jaspSupply)*100).toFixed(2)}%)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BigBroAnalytica
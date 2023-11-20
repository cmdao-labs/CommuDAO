import React from 'react'
import { ethers } from 'ethers'
import { readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount, useNetwork } from 'wagmi'

const jusdt = '0x24599b658b57f91E7643f4F154B16bcd2884f9ac'
const kusdt = '0x7d984C24d2499D840eB3b7016077164e15E5faA6'

const TBridge = ({ setisLoading, txupdate, setTxupdate, erc20ABI }) => {
    const { address } = useAccount()
    const { chain } = useNetwork()
    const [mode, setMode] = React.useState(1)

    const [reserve, setReserve] = React.useState(0)
    const [supply, setSupply] = React.useState(0)

    const [kusdtBalance, setKusdtBalance] = React.useState(0)
    const [jusdtBalance, setJusdtBalance] = React.useState(0)

    const [depositValue, setDepositValue] = React.useState(null)
    const [withdrawValue, setWithdrawValue] = React.useState(null)

    React.useEffect(() => {
        const fetch = async () => {
            const data1 = await readContracts({
                contracts: [
                    {
                        address: kusdt,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x8622049edEcC20ADA5aDEeaf2Caa53447e68Ae63'],
                        chainId: 96,
                    },
                    {
                        address: jusdt,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0xBb7A653509CDd8C4Ccd34D5834c817Ed3DFD6Fc7'],
                        chainId: 8899,
                    },
                ],
            })

            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: kusdt,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 96,
                    },
                    {
                        address: jusdt,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899,
                    },
                ],
            }) : [0, 0]

            const Balance = data1[0]
            const Balance2 = data1[1]

            const kusdtBal = data2[0]
            const jusdtBal = data2[1]

            return [Balance, Balance2, kusdtBal, jusdtBal]
        }

        const promise = fetch()
    
        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            const balance = result[0] / 10**18
            setReserve(balance)
            const balance2 = ethers.utils.formatEther(result[1])
            setSupply(balance2)
            
            const kusdtbalance = ethers.utils.formatEther(result[2])
            setKusdtBalance(Math.floor(kusdtbalance * 10000) / 10000)
            const jusdtbalance = ethers.utils.formatEther(result[3])
            setJusdtBalance(Math.floor(jusdtbalance * 10000) / 10000)
        })
    }, [address, txupdate, erc20ABI])

    const handleDeposit = (event) => {
        const _value  = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const bigDepositValue = ethers.BigNumber.from(_value)
        setDepositValue(bigDepositValue)
    }
    const depositHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: kusdt,
                abi: erc20ABI,
                functionName: 'transfer',
                args: ["0x8622049edEcC20ADA5aDEeaf2Caa53447e68Ae63", depositValue],
                chainId: 96,
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const handleWithdraw = (event) => {
        const _value  = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const bigWithdrawValue = ethers.BigNumber.from(_value)
        setWithdrawValue(bigWithdrawValue)
    }
    const withdrawHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: jusdt,
                abi: erc20ABI,
                functionName: 'transfer',
                args: ["0xBb7A653509CDd8C4Ccd34D5834c817Ed3DFD6Fc7", withdrawValue],
                chainId: 8899,
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    return (
        <div style={{position: "relative", background: "rgb(0, 19, 33)", width: "100%", height: "100%", minHeight: "100vh"}}>
            <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexWrap: "wrap", color: "#fff", overflow: "scroll"}} className="noscroll pixel">
                <div style={{marginTop: "120px", width: "70%", display: "flex", flexDirection: "column", textAlign: "left"}}>
                    <div>CHOOSE TOKEN TO BRIDGE</div>
                    <div style={{width: "100%", padding: "20px 0", display: "flex", flexFlow: "row wrap", fontSize: "16px", borderBottom: "1px solid #2e2c35"}}>
                        <div className='hashtag' onClick={() => setMode(1)}>USDT</div>
                        <div className='hashtag' style={{marginLeft: "20px"}} onClick={() => setMode(2)}>CMJ</div>
                    </div>
                    {mode === 1 &&
                        <>
                            <div style={{width: "100%", marginTop: "30px", fontSize: "45px", letterSpacing: "2.5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <img style={{marginRight: "20px"}} height="45px" src="https://nftstorage.link/ipfs/bafkreiepfzqlifoasaykbhrhmd35a2uidczzgvwflf22ktnxdababchbta" alt="$JUSDT" />
                                JUSDT, #1 wrapped stablecoin on JBC.
                            </div>
                            <div style={{width: "100%", marginTop: "35px", fontSize: "16px", letterSpacing: "1px"}}>[JUSDT : KUSDT] Cross-chain bridging is now on service 24/7!</div>
                        </>
                    }
                    {mode === 2 &&
                        <>
                            <div style={{width: "100%", marginTop: "30px", fontSize: "45px", letterSpacing: "2.5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <img style={{marginRight: "20px"}} height="45px" src="https://nftstorage.link/ipfs/bafkreibizkouoitypq64ynygiclarbenejrtvsrfzeuezwh2b75fffyrzi" alt="$CMJ" />
                                CMJ, the currency token of CommuDAO.
                            </div>
                            <div style={{width: "100%", marginTop: "35px", fontSize: "16px", letterSpacing: "1px"}}>[JUSDT : KUSDT] Cross-chain bridging is coming soon!</div>
                        </>
                    }
                </div>
                {mode === 1 &&
                    <>
                        <div style={{width: "70%", padding: "40px 45px 40px 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", fontSize: "16px"}}>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "15px", textAlign: "initial"}}>
                                    JBC Bridge Contract
                                    <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href="https://exp-l1.jibchain.net/address/0xBb7A653509CDd8C4Ccd34D5834c817Ed3DFD6Fc7" target="_blank" rel="noreferrer"><div className="fa fa-external-link"></div></a>
                                </div>
                                <div style={{fontSize: "30px"}}>{Number(supply).toLocaleString('en-US', {maximumFractionDigits:2})} JUSDT</div>
                            </div>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "20px", textAlign: "initial"}}>
                                    BKC Bridge Contract
                                    <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href="https://www.bkcscan.com/address/0x8622049edEcC20ADA5aDEeaf2Caa53447e68Ae63" target="_blank" rel="noreferrer"><div className="fa fa-external-link"></div></a>
                                </div>
                                <div style={{fontSize: "30px"}}>{Number(reserve).toLocaleString('en-US', {maximumFractionDigits:2})} KUSDT</div>
                            </div>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "20px", textAlign: "initial"}}>Bridging Fee</div>
                                <div style={{fontSize: "30px"}}>0.10 USDT/TX</div>
                            </div>
                        </div>
                        <div style={{height: "140px", marginBottom: "200px", width: "1200px", maxWidth: "90%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", fontSize: "16px"}}>
                            <div style={{width: "40%", padding: "40px 10px", boxShadow: "0 0 10px rgb(0 0 0 / 4%), 0 0 0 1px #2e2c35", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "#000", color: "#fff", border: "1px solid #2e2c35"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 KUSDT"
                                    onChange={handleDeposit}
                                ></input>
                                {chain.id === 96 && address !== undefined ? 
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "#ff007a"}} className="button" onClick={depositHandle}>BRIDGE TO JBC</div> : 
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">BRIDGE TO JBC</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", textAlign: "left"}}>Balance: {Number(kusdtBalance).toFixed(4)} KUSDT</div>
                            </div>
                            <div style={{width: "40%", padding: "40px 10px", boxShadow: "0 0 10px rgb(0 0 0 / 4%), 0 0 0 1px #2e2c35", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "#000", color: "#fff", border: "1px solid #2e2c35"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 JUSDT"
                                    onChange={handleWithdraw}
                                ></input>
                                {chain.id === 8899 && address !== undefined ?
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "#ff007a"}} className="button" onClick={withdrawHandle}>BRIDGE TO BKC</div> :
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">BRIDGE TO BKC</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", textAlign: "left"}}>Balance: {Number(jusdtBalance).toFixed(4)} JUSDT</div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
    
export default TBridge
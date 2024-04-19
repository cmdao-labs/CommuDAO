import React from 'react'
import { ethers } from 'ethers'
import { readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount, useNetwork } from 'wagmi'

import TBridgeTAODUM from  './tBridge-TAODUM'

const jusdt = '0x24599b658b57f91E7643f4F154B16bcd2884f9ac'
const kusdt = '0x7d984C24d2499D840eB3b7016077164e15E5faA6'
const usdtBsc = '0x55d398326f99059ff775485246999027b3197955' 
const cmj = '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b'
const cmjb = '0xc5815d3ECA0AFBecB6687ffA9E6040D977a76F6D'
const tao = '0x6527d3D38a7Ff4E62f98fE27dd9242a36227FE23'
const jtao = '0xdbCCc9F8920e7274eeC62e695084D3bCe443c3dd'

const TBridge = ({ setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc20ABI, erc721ABI, tbridgeNFTABI }) => {
    const { address } = useAccount()
    const { chain } = useNetwork()
    const [mode, setMode] = React.useState(1)

    const [reserve, setReserve] = React.useState(0)
    const [supply, setSupply] = React.useState(0)
    const [reserve2, setReserve2] = React.useState(0)
    const [supply2, setSupply2] = React.useState(0)

    const [kusdtBalance, setKusdtBalance] = React.useState(0)
    const [jusdtBalance, setJusdtBalance] = React.useState(0)
    const [usdtBscBalance, setUsdtBscBalance] = React.useState(0)
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [cmjbBalance, setCmjbBalance] = React.useState(0)
    const [taoBalance, setTaoBalance] = React.useState(0)
    const [jtaoBalance, setJtaoBalance] = React.useState(0)

    const [depositValue, setDepositValue] = React.useState(null)
    const [depositValueDis, setDepositValueDis] = React.useState('')
    const [withdrawValue, setWithdrawValue] = React.useState(null)
    const [withdrawValueDis, setWithdrawValueDis] = React.useState('')

    const [depositCMJ, setDepositCMJ] = React.useState('')
    const [withdrawCMJ, setWithdrawCMJ] = React.useState('')

    const [depositTAO, setDepositTAO] = React.useState('')
    const [withdrawTAO, setWithdrawTAO] = React.useState('')

    const [depositValue2, setDepositValue2] = React.useState('')
    const [withdrawValue2, setWithdrawValue2] = React.useState('')

    React.useEffect(() => {
        window.scrollTo(0, 0)
        
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
                    {
                        address: usdtBsc,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x92E2fB6B899E715B6D392B7b1b851a9f7aae2dc3'],
                        chainId: 56,
                    },
                    {
                        address: jusdt,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: ['0x9E1baBFC65DA0eBFE11934b1277755Eb3A7d3063'],
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
                    {
                        address: cmj,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899,
                    },
                    {
                        address: cmjb,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 96,
                    },
                    {
                        address: usdtBsc,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 56,
                    },
                    {
                        address: tao,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 96,
                    },
                    {
                        address: jtao,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899,
                    },
                ],
            }) : [0, 0, 0, 0, 0, 0, 0, ]
            
            const Balance = data1[0]
            const Balance2 = data1[1]
            const Balance_2 = data1[2]
            const Balance2_2 = data1[3]

            const kusdtBal = data2[0]
            const jusdtBal = data2[1]
            const cmjBal = data2[2]
            const cmjbBal = data2[3]
            const usdtBscBal = data2[4]
            const taoBal = data2[5]
            const jtaoBal = data2[6]

            return [Balance, Balance2, kusdtBal, jusdtBal, cmjBal, cmjbBal, usdtBscBal, Balance_2, Balance2_2, taoBal, jtaoBal ]
        }

        const promise = fetch()
    
        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            const balance = ethers.utils.formatEther(result[0].result)
            setReserve(balance)
            const balance2 = ethers.utils.formatEther(result[1].result)
            setSupply(balance2)
            
            const kusdtbalance = ethers.utils.formatEther(result[2].result)
            setKusdtBalance(Math.floor(kusdtbalance * 10000) / 10000)
            const jusdtbalance = ethers.utils.formatEther(result[3].result)
            setJusdtBalance(Math.floor(jusdtbalance * 10000) / 10000)

            const cmjbalance = ethers.utils.formatEther(result[4].result)
            setCmjBalance(Math.floor(cmjbalance * 10000) / 10000)
            const cmjbbalance = ethers.utils.formatEther(result[5].result)
            setCmjbBalance(Math.floor(cmjbbalance * 10000) / 10000)

            const usdtBscbalance = ethers.utils.formatEther(result[6].result)
            setUsdtBscBalance(Math.floor(usdtBscbalance * 10000) / 10000)

            const balance_2 = ethers.utils.formatEther(result[7].result)
            setReserve2(balance_2)
            const balance2_2 = ethers.utils.formatEther(result[8].result)
            setSupply2(balance2_2)

            const taobalance = ethers.utils.formatEther(result[9].result)
            setTaoBalance(Math.floor(taobalance * 10000) / 10000)
            const jtaobbalance = ethers.utils.formatEther(result[10].result)
            setJtaoBalance(Math.floor(jtaobbalance * 10000) / 10000)
        })
    }, [address, txupdate, erc20ABI])

    const handleDeposit = (event) => {
        setDepositValueDis(event.target.value)
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
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const handleWithdraw = (event) => {
        setWithdrawValueDis(event.target.value)
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
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const depositCmjHandle = async () => {
        setisLoading(true)
        try {/*
            const config = await prepareWriteContract({
                address: cmj,
                abi: erc20ABI,
                functionName: 'transfer',
                args: ["0x553819505D984EeE91aDD1DdCD60C82618d0CD5d", ethers.utils.parseEther(String(depositCMJ))],
                chainId: 8899,
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
            */
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const depositTaoHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: tao,
                abi: erc20ABI,
                functionName: 'transfer',
                args: ["0x4dBf2aB8a10329d59238220ddB829F4F1555B263", ethers.utils.parseEther(String(depositTAO))],
                chainId: 96,
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }
    const withdrawTaoHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: jtao,
                abi: erc20ABI,
                functionName: 'transfer',
                args: ["0xc5F389ba93CF37F3Eed6C3C7107e0f869FCb27aB", ethers.utils.parseEther(String(withdrawTAO))],
                chainId: 8899,
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const depositHandle2 = async () => {
        setisLoading(true)
        if (Number(depositValue2) <= Number(supply2)) {
            try {
                const config = await prepareWriteContract({
                    address: usdtBsc,
                    abi: erc20ABI,
                    functionName: 'transfer',
                    args: ["0x92E2fB6B899E715B6D392B7b1b851a9f7aae2dc3", ethers.utils.parseEther(String(depositValue2))],
                    chainId: 56,
                })
                const { hash: hash1 } = await writeContract(config)
                await waitForTransaction({ hash: hash1 })
                setTxupdate(hash1)
            } catch (e) {
                setisError(true)
                setErrMsg(String(e))
            }
        }
        setisLoading(false)
    }
    const withdrawHandle2 = async () => {
        setisLoading(true)
        if (Number(withdrawValue2) <= Number(reserve2)) {
            try {
                const config = await prepareWriteContract({
                    address: jusdt,
                    abi: erc20ABI,
                    functionName: 'transfer',
                    args: ["0x9E1baBFC65DA0eBFE11934b1277755Eb3A7d3063", ethers.utils.parseEther(String(withdrawValue2))],
                    chainId: 8899,
                })
                const { hash: hash1 } = await writeContract(config)
                await waitForTransaction({ hash: hash1 })
                setTxupdate(hash1)
            } catch (e) {
                setisError(true)
                setErrMsg(String(e))
            }
        }
        setisLoading(false)
    }

    return (
        <div style={{position: "relative", background: "#1a1919", width: "100%", height: "100%", minHeight: "100vh"}}>
            <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexWrap: "wrap", color: "#fff", overflow: "scroll"}} className="noscroll pixel">
                <div style={{marginTop: "120px", width: "70%", display: "flex", flexDirection: "column", textAlign: "left"}}>
                    <div style={{color: "#bdc2c4"}}>CHOOSE TOKEN/NFTs TO BRIDGE</div>
                    <div style={{width: "100%", padding: "20px 0", display: "flex", flexFlow: "row wrap", fontSize: "16px", borderBottom: "1px solid #2e2c35"}}>
                        <div className='hashtag' style={{color: "#fff"}} onClick={() => setMode(1)}>USDT</div>
                        <div className='hashtag' style={{marginLeft: "10px", color: "#fff"}} onClick={() => setMode(2)}>CMD</div>
                        <div className='hashtag' style={{marginLeft: "10px", color: "#fff"}} onClick={() => setMode(3)}>TAO</div>
                        <div className='hashtag' style={{marginLeft: "10px", color: "#fff"}} onClick={() => setMode(4)}>TAODUM NFT</div>
                    </div>
                    {(mode === 1 || mode === 12) &&
                        <>
                            <div style={{width: "100%", marginTop: "30px", fontSize: "45px", letterSpacing: "2.5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <img style={{marginRight: "20px"}} height="45px" src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" alt="$JUSDT" />
                                JUSDT, #1 stablecoin on JBC.
                            </div>
                            <div style={{width: "100%", marginTop: "35px", color: "#bdc2c4", fontSize: "16px", letterSpacing: "1px"}}>[USDT : JUSDT] Cross-chain bridging is now on service 24/7!</div>
                            <div style={{width: "100%", padding: "20px 0", display: "flex", flexFlow: "row wrap", fontSize: "16px", borderBottom: "1px solid #2e2c35"}}>
                                <div className='hashtag' style={{padding: "10px", border: "1px solid rgb(189, 194, 196)", borderRadius: "10px"}} onClick={() => setMode(1)}><img src="https://nftstorage.link/ipfs/bafkreien2xny3ki3a4qqfem74vvucreppp6rpe7biozr4jiaom7shmv47a" width="25" alt="BKC" /></div>
                                <div className='hashtag' style={{marginLeft: "10px", padding: "10px", border: "1px solid rgb(189, 194, 196)", borderRadius: "10px"}} onClick={() => setMode(12)}><img src="https://nftstorage.link/ipfs/bafkreibujxj6b6i3n4xtdywo3dp33hhdf6yilwkx42cmm4goxpduy5mvte" width="25" alt="BSC" /></div>
                            </div>
                        </>
                    }
                    {mode === 2 &&
                        <>
                            <div style={{width: "100%", marginTop: "30px", fontSize: "45px", letterSpacing: "2.5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                CMD, the governance token of CommuDAO.
                            </div>
                            <div style={{width: "100%", marginTop: "35px", color: "#bdc2c4", fontSize: "16px", letterSpacing: "1px"}}>[1 CMJ to 80 CMD] Cross-chain bridging is now on service 24/7!</div>
                            <div style={{width: "100%", padding: "20px 0", display: "flex", flexFlow: "row wrap", fontSize: "16px", borderBottom: "1px solid #2e2c35"}}>
                            <div className='hashtag' style={{padding: "10px", border: "1px solid rgb(189, 194, 196)", borderRadius: "10px"}} onClick={() => setMode(2)}><img src="https://bafkreid53xlgsjlqosyyyxzbozfavoi2f4i6vnqxjwdxq32y7jsly3ckly.ipfs.nftstorage.link" width="25" alt="OP" /></div>
                                <div className='hashtag' style={{marginLeft: "10px", padding: "10px", border: "1px solid rgb(189, 194, 196)", borderRadius: "10px", cursor: "not-allowed"}}><img src="https://bafkreibohxkmaxa3h2pln37pasuppobhqoilncvtxnk7k7oaid7fqyg5ce.ipfs.nftstorage.link" width="25" alt="BBQ" /></div>
                            </div>
                        </>
                    }
                    {mode === 3 &&
                        <>
                            <div style={{width: "100%", marginTop: "30px", fontSize: "45px", letterSpacing: "2.5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <img style={{marginRight: "20px"}} height="45px" src="https://nftstorage.link/ipfs/bafkreifydb6vy2dysudcg6x64p42enym3bhfneal62ctf33oapsmk6qjlm" alt="$TAO" />
                                JTAO
                            </div>
                            <div style={{width: "100%", marginTop: "35px", color: "#bdc2c4", fontSize: "16px", letterSpacing: "1px"}}>[TAO : JTAO] Cross-chain bridging is coming soon!</div>
                            <div style={{width: "100%", padding: "20px 0", display: "flex", flexFlow: "row wrap", fontSize: "16px", borderBottom: "1px solid #2e2c35"}}>
                                <div className='hashtag' style={{padding: "10px", border: "1px solid rgb(189, 194, 196)", borderRadius: "10px"}} onClick={() => setMode(3)}><img src="https://nftstorage.link/ipfs/bafkreien2xny3ki3a4qqfem74vvucreppp6rpe7biozr4jiaom7shmv47a" width="25" alt="BKC" /></div>
                            </div>
                        </>
                    }
                    {mode === 4 &&
                        <>
                            <div style={{width: "100%", marginTop: "30px", fontSize: "45px", letterSpacing: "2.5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                TAODUM NFT
                            </div>
                            <div style={{width: "100%", marginTop: "35px", color: "#bdc2c4", fontSize: "16px", letterSpacing: "1px"}}>TAODUM NFT Cross-chain bridging is coming soon!</div>
                            <div style={{width: "100%", padding: "20px 0", display: "flex", flexFlow: "row wrap", fontSize: "16px", borderBottom: "1px solid #2e2c35"}}>
                                <div className='hashtag' style={{padding: "10px", border: "1px solid rgb(189, 194, 196)", borderRadius: "10px"}} onClick={() => setMode(4)}><img src="https://nftstorage.link/ipfs/bafkreien2xny3ki3a4qqfem74vvucreppp6rpe7biozr4jiaom7shmv47a" width="25" alt="BKC" /></div>
                            </div>
                        </>
                    }
                </div>
                {mode === 1 && chain !== undefined &&
                    <>
                        <div style={{width: "70%", padding: "40px 45px 40px 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", fontSize: "16px"}}>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "15px", textAlign: "initial", color: "#bdc2c4"}}>
                                    JBC Bridge Contract
                                    <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href="https://exp-l1.jibchain.net/address/0xBb7A653509CDd8C4Ccd34D5834c817Ed3DFD6Fc7" target="_blank" rel="noreferrer"><div className="fa fa-external-link"></div></a>
                                </div>
                                <div style={{fontSize: "30px"}}>{Number(supply).toLocaleString('en-US', {maximumFractionDigits:2})} JUSDT</div>
                            </div>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "20px", textAlign: "initial", color: "#bdc2c4"}}>
                                    BKC Bridge Contract
                                    <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href="https://www.bkcscan.com/address/0x8622049edEcC20ADA5aDEeaf2Caa53447e68Ae63" target="_blank" rel="noreferrer"><div className="fa fa-external-link"></div></a>
                                </div>
                                <div style={{fontSize: "30px"}}>{Number(reserve).toLocaleString('en-US', {maximumFractionDigits:2})} KUSDT</div>
                            </div>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "20px", textAlign: "initial", color: "#bdc2c4"}}>Bridging Fee</div>
                                <div style={{fontSize: "30px"}}>0.10 USDT/TX</div>
                            </div>
                        </div>
                        <div style={{height: "140px", marginBottom: "200px", width: "1200px", maxWidth: "90%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", fontSize: "16px", background: "rgb(29 28 28)"}}>
                            <div style={{width: "40%", padding: "40px 10px", boxShadow: "0 0 10px rgb(0 0 0 / 4%), 0 0 0 1px #2e2c35", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "rgb(29 28 28)", color: "#fff", border: "1px solid rgb(52 52 52)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 KUSDT"
                                    onChange={handleDeposit}
                                    value={depositValueDis}
                                ></input>
                                {chain.id === 96 && address !== null && address !== undefined ? 
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(37 99 235)"}} className="button" onClick={depositHandle}>BRIDGE TO JBC</div> : 
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(41 41 41)", color: "#bdc2c4", cursor: "not-allowed"}} className="button">BRIDGE TO JBC</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", textAlign: "left", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(kusdtBalance)}}; handleDeposit(bal);}}>Balance: {Number(kusdtBalance).toFixed(4)} KUSDT</div>
                            </div>
                            <div style={{width: "40%", padding: "40px 10px", boxShadow: "0 0 10px rgb(0 0 0 / 4%), 0 0 0 1px #2e2c35", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "rgb(29 28 28)", color: "#fff", border: "1px solid rgb(52 52 52)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 JUSDT"
                                    onChange={handleWithdraw}
                                    value={withdrawValueDis}
                                ></input>
                                {chain.id === 8899 && address !== null && address !== undefined ?
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(37 99 235)"}} className="button" onClick={withdrawHandle}>BRIDGE TO BKC</div> :
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(41 41 41)", color: "#bdc2c4", cursor: "not-allowed"}} className="button">BRIDGE TO BKC</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", textAlign: "left", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(jusdtBalance)}}; handleWithdraw(bal);}}>Balance: {Number(jusdtBalance).toFixed(4)} JUSDT</div>
                            </div>
                        </div>
                    </>
                }
                {mode === 12 && chain !== undefined &&
                    <>
                        <div style={{width: "70%", padding: "40px 45px 40px 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", fontSize: "16px"}}>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "15px", textAlign: "initial", color: "#bdc2c4"}}>
                                    JBC Bridge Contract
                                    <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href="https://exp-l1.jibchain.net/address/0x9E1baBFC65DA0eBFE11934b1277755Eb3A7d3063" target="_blank" rel="noreferrer"><div className="fa fa-external-link"></div></a>
                                </div>
                                <div style={{fontSize: "30px"}}>{Number(supply2).toLocaleString('en-US', {maximumFractionDigits:2})} JUSDT</div>
                            </div>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "20px", textAlign: "initial", color: "#bdc2c4"}}>
                                    BSC Bridge Contract
                                    <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href="https://bscscan.com/address/0x92e2fb6b899e715b6d392b7b1b851a9f7aae2dc3" target="_blank" rel="noreferrer"><div className="fa fa-external-link"></div></a>
                                </div>
                                <div style={{fontSize: "30px"}}>{Number(reserve2).toLocaleString('en-US', {maximumFractionDigits:2})} USDT</div>
                            </div>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "20px", textAlign: "initial", color: "#bdc2c4"}}>Bridging Fee</div>
                                <div style={{fontSize: "30px"}}>0.50 USDT/TX</div>
                            </div>
                        </div>
                        <div style={{height: "140px", marginBottom: "200px", width: "1200px", maxWidth: "90%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", fontSize: "16px"}}>
                            <div style={{width: "40%", padding: "40px 10px", boxShadow: "0 0 10px rgb(0 0 0 / 4%), 0 0 0 1px #2e2c35", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "rgb(29 28 28)", color: "#fff", border: "1px solid rgb(52 52 52)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 USDT [BSC]"
                                    value={depositValue2}
                                    onChange={(event) => setDepositValue2(event.target.value)}
                                ></input>
                                {chain.id === 56 && address !== null && address !== undefined ? 
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(37 99 235)"}} className="button" onClick={depositHandle2}>BRIDGE TO JBC</div> : 
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(41 41 41)", color: "#bdc2c4", cursor: "not-allowed"}} className="button">BRIDGE TO JBC</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", textAlign: "left", cursor: "pointer"}} onClick={() => setDepositValue2(usdtBscBalance)}>Balance: {Number(usdtBscBalance).toFixed(4)} USDT [BSC]</div>
                            </div>
                            <div style={{width: "40%", padding: "40px 10px", boxShadow: "0 0 10px rgb(0 0 0 / 4%), 0 0 0 1px #2e2c35", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "rgb(29 28 28)", color: "#fff", border: "1px solid rgb(52 52 52)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 JUSDT"
                                    value={withdrawValue2}
                                    onChange={(event) => setWithdrawValue2(event.target.value)}
                                ></input>
                                {chain.id === 8899 && address !== null && address !== undefined ?
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(37 99 235)"}} className="button" onClick={withdrawHandle2}>BRIDGE TO BSC</div> :
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(41 41 41)", color: "#bdc2c4", cursor: "not-allowed"}} className="button">BRIDGE TO BSC</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", textAlign: "left", cursor: "pointer"}} onClick={() => setWithdrawValue2(jusdtBalance)}>Balance: {Number(jusdtBalance).toFixed(4)} JUSDT</div>
                            </div>
                        </div>
                    </>
                }
                {mode === 2 && chain !== undefined &&
                    <>
                        <div style={{width: "70%", padding: "40px 45px 40px 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", fontSize: "16px"}}>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "20px", textAlign: "initial", color: "#bdc2c4"}}>Bridging Fee</div>
                                <div style={{fontSize: "30px"}}>80 CMD/TX</div>
                            </div>
                        </div>
                        <div style={{height: "140px", marginBottom: "200px", width: "1200px", maxWidth: "90%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", fontSize: "16px"}}>
                            <div style={{width: "40%", padding: "40px 10px", boxShadow: "0 0 10px rgb(0 0 0 / 4%), 0 0 0 1px #2e2c35", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "rgb(29 28 28)", color: "#fff", border: "1px solid rgb(52 52 52)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 CMJ"
                                    value={depositCMJ}
                                    onChange={(event) => setDepositCMJ(event.target.value)}
                                ></input>
                                {chain.id === 10 && address !== null && address !== undefined ? 
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(37 99 235)", fontSize: "12px"}} className="button" onClick={depositCmjHandle}>BRIDGE TO OP MAINNET</div> : 
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(41 41 41)", color: "#bdc2c4", cursor: "not-allowed", fontSize: "12px"}} className="button">BRIDGE TO OP MAINNET</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", textAlign: "left", cursor: "pointer"}} onClick={() => setDepositCMJ(cmjBalance)}>Balance: {Number(cmjBalance).toFixed(4)} CMJ</div>
                                <div style={{width: "92%", margin: "10px 0", textAlign: "left"}}>Will receive: {Number(depositCMJ * 80).toFixed(3)} CMD</div>
                                <div style={{width: "92%", margin: "10px 0 20px 0", textAlign: "left", color: "red"}}>WARN: This operation is one-way bridging!</div>
                            </div>
                        </div>
                    </>
                }
                {mode === 3 && chain !== undefined &&
                    <>
                        <div style={{width: "70%", padding: "40px 45px 40px 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", fontSize: "16px"}}>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "20px", textAlign: "initial", color: "#bdc2c4"}}>Bridging Fee</div>
                                <div style={{fontSize: "30px"}}>888 TAO/TX</div>
                            </div>
                        </div>
                        <div style={{height: "140px", marginBottom: "200px", width: "1200px", maxWidth: "90%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", fontSize: "16px"}}>
                            <div style={{width: "40%", padding: "40px 10px", boxShadow: "0 0 10px rgb(0 0 0 / 4%), 0 0 0 1px #2e2c35", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "rgb(29 28 28)", color: "#fff", border: "1px solid rgb(52 52 52)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 TAO"
                                    value={depositTAO}
                                    onChange={(event) => setDepositTAO(event.target.value)}
                                ></input>
                                {chain.id === 96 && address !== null && address !== undefined ? 
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(37 99 235)"}} className="button" onClick={depositTaoHandle}>BRIDGE TO JBC</div> : 
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(41 41 41)", color: "#bdc2c4", cursor: "not-allowed"}} className="button">BRIDGE TO JBC</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", textAlign: "left", cursor: "pointer"}} onClick={() => setDepositTAO(taoBalance)}>Balance: {Number(taoBalance).toFixed(4)} TAO</div>
                            </div>
                            <div style={{width: "40%", padding: "40px 10px", boxShadow: "0 0 10px rgb(0 0 0 / 4%), 0 0 0 1px #2e2c35", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "rgb(29 28 28)", color: "#fff", border: "1px solid rgb(52 52 52)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 JTAO"
                                    value={withdrawTAO}
                                    onChange={(event) => setWithdrawTAO(event.target.value)}
                                ></input>
                                {chain.id === 8899 && address !== null && address !== undefined ?
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(37 99 235)"}} className="button" onClick={withdrawTaoHandle}>BRIDGE TO BKC</div> :
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(41 41 41)", color: "#bdc2c4", cursor: "not-allowed"}} className="button">BRIDGE TO BKC</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", textAlign: "left", cursor: "pointer"}} onClick={() => setWithdrawTAO(jtaoBalance)}>Balance: {Number(jtaoBalance).toFixed(4)} JTAO</div>
                            </div>
                        </div>
                    </>
                }
                {mode === 4 && chain !== undefined &&
                    <TBridgeTAODUM setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc721ABI={erc721ABI} tbridgeNFTABI={tbridgeNFTABI} />
                }
                {chain === undefined && 
                    <div style={{width: "70%", padding: "40px 45px 40px 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", fontSize: "24px"}}>
                        Please connect wallet!
                    </div>
                }
            </div>
        </div>
    )
}
    
export default TBridge
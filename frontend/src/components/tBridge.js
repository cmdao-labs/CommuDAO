import React from 'react'
import { ethers } from 'ethers'
import { getBalance, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'

import TBridgeTAODUM from  './tBridge-TAODUM'
import TBridgeHRM from  './tBridge-HRM'
import TBridgeCMDAONFT from  './tBridge-CMDAONFT'
import TBridgeCMDAONFT2 from  './tBridge-CMDAONFT-2'

const jusdt = '0x24599b658b57f91E7643f4F154B16bcd2884f9ac'
const kusdt = '0x7d984C24d2499D840eB3b7016077164e15E5faA6'
const usdtBsc = '0x55d398326f99059ff775485246999027b3197955' 
const cmj = '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b'
const tao = '0x6527d3D38a7Ff4E62f98fE27dd9242a36227FE23'
const jtao = '0xdbCCc9F8920e7274eeC62e695084D3bCe443c3dd'
const cmd = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142'
const cmdBbq = '0x05F5B8f0089bDfDf04F64f11D532Ea103b758031'
const salmBKC = '0xBc57A8D5456c145a09557e0aD0C5959948e0cf7E'
const aguaBKC = '0x024C5bbF60b3d89AB64aC49936e9FE384f781c4b'
const cosmosBKC = '0x8b062b96Bb689833D7870a0133650FA22302496d'
const engyBBQ = '0xBF389F85E4F71a78850Cca36c01430bC5b20e802'
const infpowOP = '0x1391a538985f2F897375219573c7F5D61EA33Cdf'
const infpowJBC = '0xCCbb477D6c28892d6311ebb729b4c242C92f70FD'

const TBridge = ({ config, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc20Abi, erc721Abi, tbridgeNFTABI, nativeBridgeABI, uniTokensBridgeABI, uniNftBridgeABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const [mode, setMode] = React.useState(1)
    const [reserve, setReserve] = React.useState(0)
    const [supply, setSupply] = React.useState(0)
    const [reserve2, setReserve2] = React.useState(0)
    const [supply2, setSupply2] = React.useState(0)
    const [burnedCmj, setBurnedCmj] = React.useState(0)
    const [kusdtBalance, setKusdtBalance] = React.useState(0)
    const [jusdtBalance, setJusdtBalance] = React.useState(0)
    const [usdtBscBalance, setUsdtBscBalance] = React.useState(0)
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [cmdBalance, setCmdBalance] = React.useState(0)
    const [cmdBbqBalance, setCmdBbqBalance] = React.useState(0)
    const [taoBalance, setTaoBalance] = React.useState(0)
    const [jtaoBalance, setJtaoBalance] = React.useState(0)
    const [salmBalance, setSalmBalance] = React.useState(0)
    const [aguaBalance, setAguaBalance] = React.useState(0)
    const [cosmosBalance, setCosmosBalance] = React.useState(0)
    const [engyBalance, setEngyBalance] = React.useState(0)
    const [infpowBalance, setInfpowBalance] = React.useState(0)
    const [infpowJBCBalance, setInfpowJBCBalance] = React.useState(0)
    const [depositValue, setDepositValue] = React.useState(null)
    const [depositValueDis, setDepositValueDis] = React.useState('')
    const [withdrawValue, setWithdrawValue] = React.useState(null)
    const [withdrawValueDis, setWithdrawValueDis] = React.useState('')
    const [depositCMJ, setDepositCMJ] = React.useState('')
    const [depositTAO, setDepositTAO] = React.useState('')
    const [withdrawTAO, setWithdrawTAO] = React.useState('')
    const [depositValue2, setDepositValue2] = React.useState('')
    const [withdrawValue2, setWithdrawValue2] = React.useState('')
    const [depositValue22, setDepositValue22] = React.useState('')
    const [withdrawValue22, setWithdrawValue22] = React.useState('')

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        
        const fetch = async () => {
            const cmdBbqBal = address !== null ?
                await getBalance(config, { address: address, chainId: 190, }) :
                {formatted: 0}
            const data1 = await readContracts(config, {
                contracts: [
                    {
                        address: kusdt,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0x8622049edEcC20ADA5aDEeaf2Caa53447e68Ae63'],
                        chainId: 96,
                    },
                    {
                        address: jusdt,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xBb7A653509CDd8C4Ccd34D5834c817Ed3DFD6Fc7'],
                        chainId: 8899,
                    },
                    {
                        address: usdtBsc,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0x92E2fB6B899E715B6D392B7b1b851a9f7aae2dc3'],
                        chainId: 56,
                    },
                    {
                        address: jusdt,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0x9E1baBFC65DA0eBFE11934b1277755Eb3A7d3063'],
                        chainId: 8899,
                    },
                    {
                        address: cmj,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0x0000000000000000000000000000000000000042'],
                        chainId: 8899,
                    },
                ],
            })
            const data2 = address !== null ? await readContracts(config, {
                contracts: [
                    {
                        address: kusdt,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 96,
                    },
                    {
                        address: jusdt,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899,
                    },
                    {
                        address: cmj,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899,
                    },
                    {
                        address: cmd,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 10,
                    },
                    {
                        address: usdtBsc,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 56,
                    },
                    {
                        address: tao,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 96,
                    },
                    {
                        address: jtao,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899,
                    },
                    {
                        address: salmBKC,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 96,
                    },
                    {
                        address: aguaBKC,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 96,
                    },
                    {
                        address: cosmosBKC,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 96,
                    },
                    {
                        address: engyBBQ,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 190,
                    },
                    {
                        address: infpowOP,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 10,
                    },
                    {
                        address: infpowJBC,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899,
                    },
                ],
            }) : [{result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, ]
            const Balance = data1[0]
            const Balance2 = data1[1]
            const Balance_2 = data1[2]
            const Balance2_2 = data1[3]
            const _burnedCmj = data1[4]
            const kusdtBal = data2[0]
            const jusdtBal = data2[1]
            const cmjBal = data2[2]
            const cmdBal = data2[3]
            const usdtBscBal = data2[4]
            const taoBal = data2[5]
            const jtaoBal = data2[6]
            const salmBal = data2[7]
            const aguaBal = data2[8]
            const cosmosBal = data2[9]
            const engyBal = data2[10]
            const infpowOPBal = data2[11]
            const infpowJBCBal = data2[12]

            return [
                Balance, Balance2, kusdtBal, jusdtBal, cmjBal, cmdBal, usdtBscBal, Balance_2, Balance2_2, taoBal, jtaoBal, cmdBbqBal, _burnedCmj, 
                salmBal, aguaBal, cosmosBal, engyBal, infpowOPBal, infpowJBCBal,
            ]
        }

        const promise = fetch()
    
        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setReserve(ethers.utils.formatEther(result[0].result))
            setSupply(ethers.utils.formatEther(result[1].result))
            setKusdtBalance(Math.floor((ethers.utils.formatEther(result[2].result)) * 10000) / 10000)
            setJusdtBalance(Math.floor((ethers.utils.formatEther(result[3].result)) * 10000) / 10000)
            setCmjBalance(Math.floor((ethers.utils.formatEther(result[4].result)) * 10000) / 10000)
            setCmdBalance(Math.floor((ethers.utils.formatEther(result[5].result)) * 10000) / 10000)
            setUsdtBscBalance(Math.floor((ethers.utils.formatEther(result[6].result)) * 10000) / 10000)
            setReserve2(ethers.utils.formatEther(result[7].result))
            setSupply2(ethers.utils.formatEther(result[8].result))
            setTaoBalance(Math.floor((ethers.utils.formatEther(result[9].result)) * 10000) / 10000)
            setJtaoBalance(Math.floor((ethers.utils.formatEther(result[10].result)) * 10000) / 10000)
            setCmdBbqBalance(Math.floor((result[11].formatted) * 10000) / 10000)
            setBurnedCmj(ethers.utils.formatEther(result[12].result))
            setSalmBalance(ethers.utils.formatEther(result[13].result))
            setAguaBalance(String(result[14].result))
            setCosmosBalance(ethers.utils.formatEther(result[15].result))
            setEngyBalance(ethers.utils.formatEther(result[16].result))
            setInfpowBalance(ethers.utils.formatEther(result[17].result))
            setInfpowJBCBalance(ethers.utils.formatEther(result[18].result))
        })
    }, [config, address, txupdate, erc20Abi])

    const handleDeposit = (event) => {
        setDepositValueDis(event.target.value)
        const _value  = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const bigDepositValue = ethers.BigNumber.from(_value)
        setDepositValue(bigDepositValue)
    }
    const depositHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: kusdt,
                abi: erc20Abi,
                functionName: 'transfer',
                args: ["0x8622049edEcC20ADA5aDEeaf2Caa53447e68Ae63", depositValue],
                chainId: 96,
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

    const handleWithdraw = (event) => {
        setWithdrawValueDis(event.target.value)
        const _value  = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const bigWithdrawValue = ethers.BigNumber.from(_value)
        setWithdrawValue(bigWithdrawValue)
    }
    const withdrawHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: jusdt,
                abi: erc20Abi,
                functionName: 'transfer',
                args: ["0xBb7A653509CDd8C4Ccd34D5834c817Ed3DFD6Fc7", withdrawValue],
                chainId: 8899,
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

    const depositCmjHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: cmj,
                abi: erc20Abi,
                functionName: 'transfer',
                args: ["0x0000000000000000000000000000000000000042", ethers.utils.parseEther(String(depositCMJ))],
                chainId: 8899,
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
    const depositCmdHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: cmd,
                abi: erc20Abi,
                functionName: 'transfer',
                args: ["0xaa3caad9e335a133d96ea3d5d73df2dcf9e360d4", ethers.utils.parseEther(String(depositValue22))],
                chainId: 10,
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
    const withdrawCmdHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: cmdBbq,
                abi: nativeBridgeABI,
                functionName: 'recieveTokens',
                value: ethers.utils.parseEther(String(withdrawValue22)),
                chainId: 190,
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

    const depositTaoHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: tao,
                abi: erc20Abi,
                functionName: 'transfer',
                args: ["0x4dBf2aB8a10329d59238220ddB829F4F1555B263", ethers.utils.parseEther(String(depositTAO))],
                chainId: 96,
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
    const withdrawTaoHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: jtao,
                abi: erc20Abi,
                functionName: 'transfer',
                args: ["0xc5F389ba93CF37F3Eed6C3C7107e0f869FCb27aB", ethers.utils.parseEther(String(withdrawTAO))],
                chainId: 8899,
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

    const depositHandle2 = async () => {
        setisLoading(true)
        if (Number(depositValue2) <= Number(supply2)) {
            try {
                let { request } = await simulateContract(config, {
                    address: usdtBsc,
                    abi: erc20Abi,
                    functionName: 'transfer',
                    args: ["0x92E2fB6B899E715B6D392B7b1b851a9f7aae2dc3", ethers.utils.parseEther(String(depositValue2))],
                    chainId: 56,
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
                setTxupdate(h)
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
                let { request } = await simulateContract(config, {
                    address: jusdt,
                    abi: erc20Abi,
                    functionName: 'transfer',
                    args: ["0x9E1baBFC65DA0eBFE11934b1277755Eb3A7d3063", ethers.utils.parseEther(String(withdrawValue2))],
                    chainId: 8899,
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
                setTxupdate(h)
            } catch (e) {
                setisError(true)
                setErrMsg(String(e))
            }
        }
        setisLoading(false)
    }

    return (
        <div style={{position: "relative", background: "#3a6ea5", width: "100%", height: "100%", minHeight: "100vh"}}>
            <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexWrap: "wrap", color: "#fff", overflow: "scroll"}} className="noscroll pixel">
                <div style={{marginTop: "120px", width: "70%", display: "flex", flexDirection: "column", textAlign: "left"}}>
                    <div style={{color: "#bdc2c4", fontSize: "18px"}}>{'// CHOOSE TOKEN/NFTs TO BRIDGE'}</div>
                    <div style={{width: "100%", padding: "20px 0", display: "flex", flexDirection: "row", fontSize: "16px", borderBottom: "2px solid #fff", overflow: "scroll"}} className='noscroll'>
                        <div className='hashtag' style={{margin: "10px 10px 10px 0", color: "#fff"}} onClick={() => setMode(1)}>$USDT</div>
                        <div className='hashtag' style={{color: "#fff"}} onClick={() => setMode(2)}>$CMD</div>
                        <div className='hashtag' style={{color: "#fff"}} onClick={() => setMode(6)}>CMDAO NFT</div>
                        <div className='hashtag' style={{color: "#fff"}} onClick={() => setMode(3)}>$TAOMEME</div>
                        <div className='hashtag' style={{color: "#fff"}} onClick={() => setMode(4)}>TAODUM NFT</div>
                        <div className='hashtag' style={{color: "#fff"}} onClick={() => setMode(5)}>HRM SYSTEM</div>
                    </div>
                    {(mode === 1 || mode === 12) &&
                        <>
                            <div style={{width: "100%", marginTop: "30px", fontSize: "40px", letterSpacing: "2.5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <img style={{marginRight: "20px"}} height="40px" src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" alt="$JUSDT" />
                                JUSDT
                            </div>
                            <div style={{width: "100%", padding: "20px 0", display: "flex", flexFlow: "row wrap", fontSize: "16px", borderBottom: "2px solid #fff"}}>
                                <div className='hashtag' style={{padding: "10px", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px"}} onClick={() => setMode(1)}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreien2xny3ki3a4qqfem74vvucreppp6rpe7biozr4jiaom7shmv47a" width="25" alt="BKC" /></div>
                                <div className='hashtag' style={{marginLeft: "10px", padding: "10px", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px"}} onClick={() => setMode(12)}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibujxj6b6i3n4xtdywo3dp33hhdf6yilwkx42cmm4goxpduy5mvte" width="25" alt="BSC" /></div>
                            </div>
                        </>
                    }
                    {(mode === 2 || mode === 22) &&
                        <>
                            <div style={{width: "100%", marginTop: "30px", fontSize: "40px", letterSpacing: "2.5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <img style={{marginRight: "20px"}} height="40px" src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidm3tpt3xpcmypzeaqicyxvihmygzu5mw3v74o6b2wve6ar5pdbs4" alt="$CMD" />
                                CMD
                            </div>
                            <div style={{width: "100%", padding: "20px 0", display: "flex", flexFlow: "row wrap", fontSize: "16px", borderBottom: "2px solid #fff"}}>
                                <div className='hashtag' style={{padding: "10px", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px"}} onClick={() => setMode(2)}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreid53xlgsjlqosyyyxzbozfavoi2f4i6vnqxjwdxq32y7jsly3ckly" width="25" alt="OP" /></div>
                                <div className='hashtag' style={{marginLeft: "10px", padding: "10px", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px"}} onClick={() => setMode(22)}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibohxkmaxa3h2pln37pasuppobhqoilncvtxnk7k7oaid7fqyg5ce" width="25" alt="BBQ" /></div>
                            </div>
                        </>
                    }
                    {mode === 3 &&
                        <>
                            <div style={{width: "100%", marginTop: "30px", fontSize: "40px", letterSpacing: "2.5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <img style={{marginRight: "20px"}} height="40px" src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreifydb6vy2dysudcg6x64p42enym3bhfneal62ctf33oapsmk6qjlm" alt="$TAO" />
                                JTAO
                            </div>
                            <div style={{width: "100%", padding: "20px 0", display: "flex", flexFlow: "row wrap", fontSize: "16px", borderBottom: "2px solid #fff"}}>
                                <div className='hashtag' style={{padding: "10px", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px"}} onClick={() => setMode(3)}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreien2xny3ki3a4qqfem74vvucreppp6rpe7biozr4jiaom7shmv47a" width="25" alt="BKC" /></div>
                            </div>
                        </>
                    }
                    {mode === 4 &&
                        <>
                            <div style={{width: "100%", marginTop: "30px", fontSize: "40px", letterSpacing: "2.5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <img style={{marginRight: "20px"}} height="40px" src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidzl5nc4rlh3kwa57jhnepqe5slnqcwsz5fcewaegoind4fnp4ogq" alt="TAODUM" />
                                TAODUM NFT
                            </div>
                            <div style={{width: "100%", padding: "20px 0", display: "flex", flexFlow: "row wrap", fontSize: "16px", borderBottom: "2px solid #fff"}}>
                                <div className='hashtag' style={{padding: "10px", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px"}} onClick={() => setMode(4)}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreien2xny3ki3a4qqfem74vvucreppp6rpe7biozr4jiaom7shmv47a" width="25" alt="BKC" /></div>
                            </div>
                        </>
                    }
                    {mode === 5 &&
                        <>
                            <div style={{width: "100%", marginTop: "30px", fontSize: "40px", letterSpacing: "2.5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                HRM SYSTEM
                            </div>
                            <div style={{width: "100%", padding: "20px 0", display: "flex", flexFlow: "row wrap", fontSize: "16px", borderBottom: "2px solid #fff"}}>
                                <div className='hashtag' style={{padding: "10px", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px"}} onClick={() => setMode(5)}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreien2xny3ki3a4qqfem74vvucreppp6rpe7biozr4jiaom7shmv47a" width="25" alt="BKC" /></div>
                            </div>
                        </>
                    }
                    {(mode === 6 || mode === 60) &&
                        <>
                            <div style={{width: "100%", marginTop: "30px", fontSize: "40px", letterSpacing: "2.5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                CommuDAO NFT
                            </div>
                            <div style={{width: "100%", padding: "20px 0", display: "flex", flexFlow: "row wrap", fontSize: "16px", borderBottom: "2px solid #fff"}}>
                                <div className='hashtag' style={{padding: "10px", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px"}} onClick={() => setMode(6)}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreihdmsnmmzhepcfxuvoflht2iqv5w73hg5kbgrc33jrhk7il5ddpgu" width="25" alt="JBC" /></div>
                                <div className='hashtag' style={{padding: "10px", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px"}} onClick={() => setMode(60)}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreid53xlgsjlqosyyyxzbozfavoi2f4i6vnqxjwdxq32y7jsly3ckly" width="25" alt="OP" /></div>
                            </div>
                        </>
                    }
                </div>
                {mode === 1 &&
                    <>
                        <div style={{width: "70%", padding: "40px 45px 40px 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", overflow: "scroll", fontSize: "16px"}} className='noscroll'>
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
                        <div style={{height: "290px", width: "1200px", maxWidth: "90%", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", overflow: "scroll", fontSize: "16px"}} className='noscroll'>
                            <div style={{minWidth: "500px", maxWidth: "500px", padding: "40px 10px", background: "rgb(206, 208, 207)", boxShadow: "rgba(0, 0, 0, 0.35) 4px 4px 10px 0px, rgb(255, 255, 255) 1px 1px 0px 1px inset, rgb(136, 140, 143) -1px -1px 0px 1px inset", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "#fff", color: "#000", border: "2px solid", borderColor: "rgb(136, 140, 143) rgb(255, 255, 255) rgb(255, 255, 255) rgb(136, 140, 143)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 KUSDT"
                                    onChange={handleDeposit}
                                    value={depositValueDis}
                                ></input>
                                {(chain !== undefined && address !== null) ? 
                                    <>
                                        {chain.id === 96 ?
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", borderRadius: "0"}} className="button" onClick={depositHandle}>BRIDGE TO JBC</div> : 
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed"}} className="button">BRIDGE TO JBC</div>
                                        }
                                    </> :
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed"}} className="button">BRIDGE TO JBC</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", textAlign: "left", color: "#000", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(kusdtBalance)}}; handleDeposit(bal);}}>Balance: {Number(kusdtBalance).toFixed(4)} KUSDT</div>
                            </div>
                            <div style={{minWidth: "500px", maxWidth: "500px", padding: "40px 10px", background: "rgb(206, 208, 207)", boxShadow: "rgba(0, 0, 0, 0.35) 4px 4px 10px 0px, rgb(255, 255, 255) 1px 1px 0px 1px inset, rgb(136, 140, 143) -1px -1px 0px 1px inset", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "#fff", color: "#000", border: "2px solid", borderColor: "rgb(136, 140, 143) rgb(255, 255, 255) rgb(255, 255, 255) rgb(136, 140, 143)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 JUSDT"
                                    onChange={handleWithdraw}
                                    value={withdrawValueDis}
                                ></input>
                                {(chain !== undefined && address !== null) ? 
                                    <>
                                        {chain.id === 8899 ?
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", borderRadius: "0"}} className="button" onClick={withdrawHandle}>BRIDGE TO BKC</div> :
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed"}} className="button">BRIDGE TO BKC</div>
                                        }
                                    </> :
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed"}} className="button">BRIDGE TO BKC</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", textAlign: "left", color: "#000", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(jusdtBalance)}}; handleWithdraw(bal);}}>Balance: {Number(jusdtBalance).toFixed(4)} JUSDT</div>
                            </div>
                        </div>
                    </>
                }
                {mode === 12 &&
                    <>
                        <div style={{width: "70%", padding: "40px 45px 40px 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", overflow: "scroll", fontSize: "16px"}} className='noscroll'>
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
                        <div style={{height: "290px", width: "1200px", maxWidth: "90%", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", overflow: "scroll", fontSize: "16px"}} className='noscroll'>
                            <div style={{minWidth: "500px", maxWidth: "500px", padding: "40px 10px", background: "rgb(206, 208, 207)", boxShadow: "rgba(0, 0, 0, 0.35) 4px 4px 10px 0px, rgb(255, 255, 255) 1px 1px 0px 1px inset, rgb(136, 140, 143) -1px -1px 0px 1px inset", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "#fff", color: "#000", border: "2px solid", borderColor: "rgb(136, 140, 143) rgb(255, 255, 255) rgb(255, 255, 255) rgb(136, 140, 143)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 USDT [BSC]"
                                    value={depositValue2}
                                    onChange={(event) => setDepositValue2(event.target.value)}
                                ></input>
                                {(chain !== undefined && address !== null) ? 
                                    <>
                                        {chain.id === 56 ? 
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", borderRadius: "0"}} className="button" onClick={depositHandle2}>BRIDGE TO JBC</div> : 
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed"}} className="button">BRIDGE TO JBC</div>
                                        }
                                    </> :
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed"}} className="button">BRIDGE TO JBC</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", color: "#000", textAlign: "left", cursor: "pointer"}} onClick={() => setDepositValue2(usdtBscBalance)}>Balance: {Number(usdtBscBalance).toFixed(4)} USDT [BSC]</div>
                            </div>
                            <div style={{minWidth: "500px", maxWidth: "500px", padding: "40px 10px", background: "rgb(206, 208, 207)", boxShadow: "rgba(0, 0, 0, 0.35) 4px 4px 10px 0px, rgb(255, 255, 255) 1px 1px 0px 1px inset, rgb(136, 140, 143) -1px -1px 0px 1px inset", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "#fff", color: "#000", border: "2px solid", borderColor: "rgb(136, 140, 143) rgb(255, 255, 255) rgb(255, 255, 255) rgb(136, 140, 143)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 JUSDT"
                                    value={withdrawValue2}
                                    onChange={(event) => setWithdrawValue2(event.target.value)}
                                ></input>
                                {(chain !== undefined && address !== null) ? 
                                    <>
                                        {chain.id === 8899 ?
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", borderRadius: "0"}} className="button" onClick={withdrawHandle2}>BRIDGE TO BSC</div> :
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed"}} className="button">BRIDGE TO BSC</div>
                                        }
                                    </> :
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed"}} className="button">BRIDGE TO BSC</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", color: "#000", textAlign: "left", cursor: "pointer"}} onClick={() => setWithdrawValue2(jusdtBalance)}>Balance: {Number(jusdtBalance).toFixed(4)} JUSDT</div>
                            </div>
                        </div>
                    </>
                }
                {mode === 2 &&
                    <>
                        <div style={{width: "70%", padding: "40px 45px 40px 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", overflow: "scroll", fontSize: "16px"}} className='noscroll'>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "15px", textAlign: "initial", color: "#bdc2c4"}}>
                                    Burned CMJ
                                </div>
                                <div style={{fontSize: "30px", textAlign: "left"}}>{Number(burnedCmj).toLocaleString('en-US', {maximumFractionDigits:2})} CMJ ({Number((burnedCmj*100)/1000000).toFixed(2)}%)</div>
                            </div>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "15px", textAlign: "initial", color: "#bdc2c4"}}>
                                    Burned JDAO
                                </div>
                                <div style={{fontSize: "30px"}}>Not Open Yet</div>
                            </div>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "20px", textAlign: "initial", color: "#bdc2c4"}}>Bridging Fee</div>
                                <div style={{fontSize: "30px"}}>80 CMD/TX</div>
                            </div>
                        </div>
                        <div style={{height: "420px", marginBottom: "20px", width: "1200px", maxWidth: "90%", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", overflow: "scroll", fontSize: "16px"}} className='noscroll'>
                            <div style={{minWidth: "500px", maxWidth: "500px", padding: "40px 10px", background: "rgb(206, 208, 207)", boxShadow: "rgba(0, 0, 0, 0.35) 4px 4px 10px 0px, rgb(255, 255, 255) 1px 1px 0px 1px inset, rgb(136, 140, 143) -1px -1px 0px 1px inset", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "#fff", color: "#000", border: "2px solid", borderColor: "rgb(136, 140, 143) rgb(255, 255, 255) rgb(255, 255, 255) rgb(136, 140, 143)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 CMJ"
                                    value={depositCMJ}
                                    onChange={(event) => setDepositCMJ(event.target.value)}
                                ></input>
                                {(chain !== undefined && address !== null) ? 
                                    <>
                                        {chain.id === 8899 ? 
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", borderRadius: "0", fontSize: "12px"}} className="button" onClick={depositCmjHandle}>BRIDGE TO OP MAINNET</div> : 
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed", fontSize: "12px"}} className="button">BRIDGE TO OP MAINNET</div>
                                        }
                                    </> :
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed", fontSize: "12px"}} className="button">BRIDGE TO OP MAINNET</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", color: "#000", textAlign: "left", cursor: "pointer"}} onClick={() => setDepositCMJ(cmjBalance)}>Balance: {Number(cmjBalance).toFixed(4)} CMJ</div>
                                <div style={{width: "92%", margin: "10px 0", color: "gray", textAlign: "left", paddingBottom: "5px", borderBottom: "1px dotted gray"}}>Will receive: {depositCMJ >= 80 ? Number((depositCMJ * 80 - 80)).toFixed(3) : 0} CMD</div>
                                <div style={{width: "92%", margin: "10px 0", color: "gray", textAlign: "left", paddingBottom: "5px", borderBottom: "1px dotted gray"}}>OP Mainnet Balance: {cmdBalance} CMD</div>
                                <div style={{width: "92%", margin: "10px 0 20px 0", textAlign: "left", color: "red"}}>⚠️ WARN: This operation is one-way bridging!</div>
                            </div>
                            <div style={{minWidth: "500px", maxWidth: "500px", padding: "40px 10px", background: "rgb(206, 208, 207)", boxShadow: "rgba(0, 0, 0, 0.35) 4px 4px 10px 0px, rgb(255, 255, 255) 1px 1px 0px 1px inset, rgb(136, 140, 143) -1px -1px 0px 1px inset", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "#fff", color: "#000", border: "2px solid", borderColor: "rgb(136, 140, 143) rgb(255, 255, 255) rgb(255, 255, 255) rgb(136, 140, 143)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 JDAO"
                                    disabled
                                ></input>
                                {(chain !== undefined && address !== null) ? 
                                    <>
                                        {(false && chain.id === 8899) ?
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", borderRadius: "0", fontSize: "12px"}} className="button" onClick={depositCmjHandle}>BRIDGE TO OP MAINNET</div> : 
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed", fontSize: "12px"}} className="button">BRIDGE TO OP MAINNET</div>
                                        }
                                    </> :
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed", fontSize: "12px"}} className="button">BRIDGE TO OP MAINNET</div>
                                }
                                <div style={{width: "92%", margin: "17.5px 0", color: "gray", textAlign: "left", paddingBottom: "5px", borderBottom: "1px dotted gray"}}>Not open yet</div>
                                <div style={{width: "92%", margin: "10px 0", color: "gray", textAlign: "left", paddingBottom: "5px", borderBottom: "1px dotted gray"}}>Will receive: {0} CMD</div>
                                <div style={{width: "92%", margin: "10px 0", color: "gray", textAlign: "left", paddingBottom: "5px", borderBottom: "1px dotted gray"}}>OP Mainnet Balance: {cmdBalance} CMD</div>
                                <div style={{width: "92%", margin: "10px 0 20px 0", textAlign: "left", color: "red"}}>⚠️ WARN: This operation is one-way bridging!</div>
                            </div>
                        </div>
                    </>
                }
                {mode === 22 &&
                    <>
                        <div style={{width: "70%", padding: "40px 45px 40px 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", overflow: "scroll", fontSize: "16px"}} className='noscroll'>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "20px", textAlign: "initial", color: "#bdc2c4"}}>Bridging Fee</div>
                                <div style={{fontSize: "30px"}}>80 CMD/TX</div>
                            </div>
                        </div>
                        <div style={{height: "290px", width: "1200px", maxWidth: "90%", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", overflow: "scroll", fontSize: "16px"}} className='noscroll'>
                            <div style={{minWidth: "500px", maxWidth: "500px", padding: "40px 10px", background: "rgb(206, 208, 207)", boxShadow: "rgba(0, 0, 0, 0.35) 4px 4px 10px 0px, rgb(255, 255, 255) 1px 1px 0px 1px inset, rgb(136, 140, 143) -1px -1px 0px 1px inset", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "#fff", color: "#000", border: "2px solid", borderColor: "rgb(136, 140, 143) rgb(255, 255, 255) rgb(255, 255, 255) rgb(136, 140, 143)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 CMD [OP MAINNET]"
                                    value={depositValue22}
                                    onChange={(event) => setDepositValue22(event.target.value)}
                                ></input>
                                {(chain !== undefined && address !== null) ? 
                                    <>
                                        {chain.id === 10 ? 
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", borderRadius: "0", fontSize: "12px"}} className="button" onClick={depositCmdHandle}>BRIDGE TO BBQ CHAIN</div> : 
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed", fontSize: "12px"}} className="button">BRIDGE TO BBQ CHAIN</div>
                                        }
                                    </> :
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed", fontSize: "12px"}} className="button">BRIDGE TO BBQ CHAIN</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", color: "#000", textAlign: "left", cursor: "pointer"}} onClick={() => setDepositValue22(cmdBalance)}>Balance: {Number(cmdBalance).toFixed(4)} CMD [OP MAINNET]</div>
                            </div>
                            <div style={{minWidth: "500px", maxWidth: "500px", padding: "40px 10px", background: "rgb(206, 208, 207)", boxShadow: "rgba(0, 0, 0, 0.35) 4px 4px 10px 0px, rgb(255, 255, 255) 1px 1px 0px 1px inset, rgb(136, 140, 143) -1px -1px 0px 1px inset", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "#fff", color: "#000", border: "2px solid", borderColor: "rgb(136, 140, 143) rgb(255, 255, 255) rgb(255, 255, 255) rgb(136, 140, 143)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 CMD [BBQ CHAIN]"
                                    value={withdrawValue22}
                                    onChange={(event) => setWithdrawValue22(event.target.value)}
                                ></input>
                                {(chain !== undefined && address !== null) ? 
                                    <>
                                        {chain.id === 190 ? 
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", borderRadius: "0", fontSize: "12px"}} className="button" onClick={withdrawCmdHandle}>BRIDGE TO OP MAINNET</div> : 
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed", fontSize: "12px"}} className="button">BRIDGE TO OP MAINNET</div>
                                        }
                                    </> :
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed", fontSize: "12px"}} className="button">BRIDGE TO OP MAINNET</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", color: "#000", textAlign: "left", cursor: "pointer"}} onClick={() => setWithdrawValue22(cmdBbqBalance)}>Balance: {Number(cmdBbqBalance).toFixed(4)} CMD [BBQ CHAIN]</div>
                            </div>
                        </div>
                    </>
                }
                {mode === 3 &&
                    <>
                        <div style={{width: "70%", padding: "40px 45px 40px 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", overflow: "scroll", fontSize: "16px"}} className='noscroll'>
                            <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                                <div style={{width: "300px", marginBottom: "20px", textAlign: "initial", color: "#bdc2c4"}}>Bridging Fee</div>
                                <div style={{fontSize: "30px"}}>888 TAO/TX</div>
                            </div>
                        </div>
                        <div style={{height: "290px", width: "1200px", maxWidth: "90%", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", overflow: "scroll", fontSize: "16px"}} className='noscroll'>
                            <div style={{minWidth: "500px", maxWidth: "500px", padding: "40px 10px",  background: "rgb(206, 208, 207)", boxShadow: "rgba(0, 0, 0, 0.35) 4px 4px 10px 0px, rgb(255, 255, 255) 1px 1px 0px 1px inset, rgb(136, 140, 143) -1px -1px 0px 1px inset", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "#fff", color: "#000", border: "2px solid", borderColor: "rgb(136, 140, 143) rgb(255, 255, 255) rgb(255, 255, 255) rgb(136, 140, 143)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 TAO"
                                    value={depositTAO}
                                    onChange={(event) => setDepositTAO(event.target.value)}
                                ></input>
                                {(chain !== undefined && address !== null) ? 
                                    <>
                                        {chain.id === 96 ? 
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", borderRadius: "0"}} className="button" onClick={depositTaoHandle}>BRIDGE TO JBC</div> : 
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start",background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed"}} className="button">BRIDGE TO JBC</div>
                                        }
                                    </> :
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start",background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed"}} className="button">BRIDGE TO JBC</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", color: "#000", textAlign: "left", cursor: "pointer"}} onClick={() => setDepositTAO(taoBalance)}>Balance: {Number(taoBalance).toFixed(4)} TAO</div>
                            </div>
                            <div style={{minWidth: "500px", maxWidth: "500px", padding: "40px 10px", background: "rgb(206, 208, 207)", boxShadow: "rgba(0, 0, 0, 0.35) 4px 4px 10px 0px, rgb(255, 255, 255) 1px 1px 0px 1px inset, rgb(136, 140, 143) -1px -1px 0px 1px inset", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                                <input
                                    style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "#fff", color: "#000", border: "2px solid", borderColor: "rgb(136, 140, 143) rgb(255, 255, 255) rgb(255, 255, 255) rgb(136, 140, 143)"}}
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.0 JTAO"
                                    value={withdrawTAO}
                                    onChange={(event) => setWithdrawTAO(event.target.value)}
                                ></input>
                                {(chain !== undefined && address !== null) ? 
                                    <>
                                        {chain.id === 8899 ?
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", borderRadius: "0"}} className="button" onClick={withdrawTaoHandle}>BRIDGE TO BKC</div> :
                                            <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed"}} className="button">BRIDGE TO BKC</div>
                                        }
                                    </> :
                                    <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed"}} className="button">BRIDGE TO BKC</div>
                                }
                                <div style={{width: "92%", margin: "20px 0", color: "#000", textAlign: "left", cursor: "pointer"}} onClick={() => setWithdrawTAO(jtaoBalance)}>Balance: {Number(jtaoBalance).toFixed(4)} JTAO</div>
                            </div>
                        </div>
                    </>
                }
                {mode === 4 && <TBridgeTAODUM config={config} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} tbridgeNFTABI={tbridgeNFTABI} />}
                {mode === 5 && <TBridgeHRM config={config} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} tbridgeNFTABI={tbridgeNFTABI} salmBalance={salmBalance} aguaBalance={aguaBalance} cosmosBalance={cosmosBalance} engyBalance={engyBalance} infpowBalance={infpowBalance} infpowJBCBalance={infpowJBCBalance} erc20Abi={erc20Abi} uniTokensBridgeABI={uniTokensBridgeABI} />}
                {mode === 6 && <TBridgeCMDAONFT config={config} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} tbridgeNFTABI={tbridgeNFTABI} />}
                {mode === 60 && <TBridgeCMDAONFT2 config={config} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} tbridgeNFTABI={tbridgeNFTABI} uniNftBridgeABI={uniNftBridgeABI} />}
                <div style={{width: "1200px", maxWidth: "90%", textAlign: "left", fontSize: "18px", letterSpacing: "1px", marginBottom: "200px"}}>🛟 <a style={{textDecoration: "underline", color: "#fff"}} href="https://discord.com/invite/k92ReT5EYy" target="_blank" rel="noreferrer">Get Help in CommuDAO Discord</a></div>
            </div>
        </div>
    )
}
    
export default TBridge
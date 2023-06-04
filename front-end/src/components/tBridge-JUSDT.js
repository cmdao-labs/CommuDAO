import React from 'react'
import { ethers } from 'ethers'
import erc20ABI from './jsons/erc20ABI.json'
const { ethereum } = window

const provider = ethereum !== undefined ? new ethers.providers.Web3Provider(ethereum) : new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')
const providerBKC = new ethers.getDefaultProvider('https://rpc.bitkubchain.io')
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const jusdt = new ethers.Contract("0x24599b658b57f91E7643f4F154B16bcd2884f9ac", erc20ABI, providerJBC)
const kusdt = new ethers.Contract("0x7d984C24d2499D840eB3b7016077164e15E5faA6", erc20ABI, providerBKC)

const Jusdt = () => {
    document.title = "tBridge | JUSDT"
    const [isLoading, setisLoading] = React.useState(false)

    const [reserve, setReserve] = React.useState(0)
    const [supply, setSupply] = React.useState(0)

    const [chainId, setChainId] = React.useState(0)
    const [defaultAccount, setDefaultAccount] = React.useState("")
    const [signer, setSigner] = React.useState(null)
    const [kusdtBalance, setKusdtBalance] = React.useState(0)
    const [jusdtBalance, setJusdtBalance] = React.useState(0)

    const [depositValue, setDepositValue] = React.useState(null)
    const [withdrawValue, setWithdrawValue] = React.useState(null)

    const connectwalletHandler = async () => {
        try {
            const addrs = await ethereum.request({ method: 'eth_requestAccounts' })
            setDefaultAccount(addrs[0])
            setSigner(provider.getSigner())
        } catch {
            window.open("https://metamask.io/download/")
        }
    }

    React.useEffect(() => {
        const fetch = async () => {
            const chainId = await provider.getNetwork()

            const Balance = await kusdt.balanceOf("0x8622049edEcC20ADA5aDEeaf2Caa53447e68Ae63")
            const Balance2 = await jusdt.balanceOf("0xBb7A653509CDd8C4Ccd34D5834c817Ed3DFD6Fc7")

            const kusdtBal = defaultAccount !== "" ? await kusdt.balanceOf(defaultAccount) : 0
            const jusdtBal = defaultAccount !== "" ? await jusdt.balanceOf(defaultAccount) : 0

            return [chainId, Balance, Balance2, kusdtBal, jusdtBal]
        }

        const promise = fetch()
    
        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setChainId(result[0].chainId)
            const balance = result[1] / 10**18
            setReserve(balance)
            const balance2 = ethers.utils.formatEther(result[2])
            setSupply(balance2)

            ethereum !== undefined ? setDefaultAccount(ethereum.selectedAddress) : setDefaultAccount("")
            setSigner(provider.getSigner())
            
            const kusdtbalance = ethers.utils.formatEther(result[3])
            setKusdtBalance(Math.floor(kusdtbalance * 10000) / 10000)
            const jusdtbalance = ethers.utils.formatEther(result[4])
            setJusdtBalance(Math.floor(jusdtbalance * 10000) / 10000)
        })
    }, [defaultAccount, chainId, isLoading])

    const handleDeposit = (event) => {
        const _value  = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const bigDepositValue = ethers.BigNumber.from(_value)
        setDepositValue(bigDepositValue)
    }
    const depositHandle = async () => {
        setisLoading(true)
        const kusdtContract = kusdt.connect(signer)
        try {
            const tx = await kusdtContract.transfer("0x8622049edEcC20ADA5aDEeaf2Caa53447e68Ae63", depositValue)
            await tx.wait()
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
        const jusdtContract = jusdt.connect(signer)
        try {
            const tx = await jusdtContract.transfer("0xBb7A653509CDd8C4Ccd34D5834c817Ed3DFD6Fc7", withdrawValue)
            await tx.wait()
        } catch {}
        setisLoading(false)
    }

    return (
        <div style={{position: "relative", background: "rgb(0, 19, 33)", width: "100%", height: "100%", minHeight: "100vh"}}>
            {isLoading === true ?
                <div className="centermodal">
                    <div className="inCentermodal">
                        <div className="wrapper"></div>
                    </div>
                </div> :
                <></>
            }
            <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexWrap: "wrap", color: "#fff", overflow: "scroll"}} className="noscroll">
                {defaultAccount !== "" ?
                    <div style={{width: "fit-content", height: "27px", background: "#001a2c", boxShadow: "0 0 10px rgb(0 0 0 / 4%), 0 0 0 1px #2e2c35", border: "1px solid transparent", borderRadius: "20px", color: "#fff", fontSize: "16px", padding: "10px 25px", position: "absolute", top: "30px", right: "40px", letterSpacing: "0.5px"}} className="bold">
                        <div style={{width: "fit-content", lineHeight: "28px"}}>{defaultAccount.slice(0, 4) + "..." + defaultAccount.slice(-4)} {chainId === 96 ? "[BKC]" : ""} {chainId === 8899 ? "[JBC]" : ""}</div>
                    </div> :
                    <div style={{width: "fit-content", height: "27px", background: "linear-gradient(73.28deg, #495BFC 6.51%, #114188 88.45%)", boxShadow: "0 0 10px rgb(0 0 0 / 4%), 0 0 0 1px #2e2c35", border: "1px solid transparent", borderRadius: "20px", color: "#fff", fontSize: "16px", padding: "10px 25px", position: "absolute", top: "30px", right: "40px", letterSpacing: "0.5px", cursor: "pointer"}} className="bold" onClick={connectwalletHandler}>
                        <div style={{width: "fit-content", lineHeight: "28px"}}>CONNECT WALLET</div>
                    </div>
                }
                <div style={{marginTop: "150px", width: "70%", display: "flex", flexDirection: "column", textAlign: "left"}} className="bold">
                    <div style={{width: "100%", fontSize: "50px", letterSpacing: "2.5px"}}>
                        <img style={{marginRight: "20px"}} height="45px" src="../tokens/jusdt.png" alt="$JUSDT"></img>
                        JUSDT, #1 wrapped stablecoin on JBC.
                    </div>
                    <div style={{width: "100%", margin: "35px 0", fontSize: "20px", letterSpacing: "1px"}}>[JUSDT : KUSDT] Cross-chain bridging now on service 24/7!</div>
                </div>
                <div style={{width: "70%", padding: "50px 45px", margin: "25px 0 60px 0", background: "transparent", boxShadow: "0 0 10px rgb(0 0 0 / 4%), 0 0 0 1px #2e2c35", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", fontSize: "25px"}}>
                    <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                        <div style={{width: "300px", marginBottom: "20px", textAlign: "initial"}} className="bold">
                            JBC Bridge Contract
                            <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href="https://exp-l1.jibchain.net/address/0xBb7A653509CDd8C4Ccd34D5834c817Ed3DFD6Fc7" target="_blank" rel="noreferrer"><div className="fa fa-external-link"></div></a>
                        </div>
                        <div style={{fontSize: "20px"}} className="light">{Number(supply).toLocaleString('en-US', {maximumFractionDigits:2})} JUSDT</div>
                    </div>
                    <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                        <div style={{width: "300px", marginBottom: "20px", textAlign: "initial"}} className="bold">
                            BKC Bridge Contract
                            <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href="https://www.bkcscan.com/address/0x8622049edEcC20ADA5aDEeaf2Caa53447e68Ae63" target="_blank" rel="noreferrer"><div className="fa fa-external-link"></div></a>
                        </div>
                        <div style={{fontSize: "20px"}} className="light">{Number(reserve).toLocaleString('en-US', {maximumFractionDigits:2})} KUSDT</div>
                    </div>
                    <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                        <div style={{width: "300px", marginBottom: "20px", textAlign: "initial"}} className="bold">Bridging Fee</div>
                        <div style={{fontSize: "20px"}} className="light">0.10 USDT/TX</div>
                    </div>
                </div>
                <div style={{height: "140px", marginBottom: "200px", width: "1200px", maxWidth: "90%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap"}}>
                    <div style={{width: "45%", padding: "50px 10px", boxShadow: "0 0 10px rgb(0 0 0 / 4%), 0 0 0 1px #2e2c35", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                        <input
                            style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", border: "1px solid #dddade", fontSize: "18px"}}
                            className="bold"
                            type="number"
                            step="1"
                            min="1"
                            placeholder="0.0 KUSDT"
                            onChange={handleDeposit}
                        ></input>
                        {chainId === 96 && ethereum !== undefined ? 
                            <div style={{maxHeight: "47px", maxWidth: "fit-content", margin: "10px 0", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "linear-gradient(73.28deg, #495BFC 6.51%, #114188 88.45%)", fontSize: "18px"}} className="bold button" onClick={depositHandle}>BRIDGE TO JBC</div> : 
                            <div style={{maxHeight: "47px", maxWidth: "fit-content", margin: "10px 0", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed", fontSize: "18px"}} className="bold button">BRIDGE TO JBC</div>
                        }
                        <div style={{width: "92%", margin: "20px 0", fontSize: "16px", textAlign: "left"}} className="bold">Balance: {Number(kusdtBalance).toFixed(4)} KUSDT</div>
                    </div>
                    <div style={{width: "45%", padding: "50px 10px", boxShadow: "0 0 10px rgb(0 0 0 / 4%), 0 0 0 1px #2e2c35", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                        <input
                            style={{width: "250px", maxWidth: "70%", padding: "10px", margin: "10px 0", border: "1px solid #dddade", fontSize: "18px"}}
                            className="bold"
                            type="number"
                            step="1"
                            min="1"
                            placeholder="0.0 JUSDT"
                            onChange={handleWithdraw}
                        ></input>
                        {chainId === 8899 && ethereum !== undefined ?
                            <div style={{maxHeight: "47px", maxWidth: "fit-content", margin: "10px 0", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "linear-gradient(73.28deg, #495BFC 6.51%, #114188 88.45%)", fontSize: "18px"}} className="bold button" onClick={withdrawHandle}>BRIDGE TO BKC</div> :
                            <div style={{maxHeight: "47px", maxWidth: "fit-content", margin: "10px 0", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed", fontSize: "18px"}} className="bold button">BRIDGE TO BKC</div>
                        }
                        <div style={{width: "92%", margin: "20px 0", fontSize: "16px", textAlign: "left"}} className="bold">Balance: {Number(jusdtBalance).toFixed(4)} JUSDT</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
    
export default Jusdt
import React from 'react'
import { ethers } from 'ethers'
import { readContract,  prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'

import Ammmerchant from  './Mall-Ammy'
import Ammmerchant2 from  './Mall-Jazzi'

const jusdtToken = "0x24599b658b57f91E7643f4F154B16bcd2884f9ac"
const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const ctunaLab = "0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0"
const sx31Lab = '0xd431d826d7a4380b9259612176f00528b88840a7'
const bbqToken = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const dunCopper = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'
const dunJasper = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const cmdaoMerchant = "0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D"
const cmdaoGasha = "0x39C623C4B3f11D38f06Adca9B794CFb2d37581e3"
const cmdaoGasha02 = '0x87A612709b36b575103C65a90cB3B16Cac2BC898'

const Mall = ({ setisLoading, txupdate, setTxupdate, ctunaLabABI, cmdaoMerchantABI, cmdaoGashaABI, cmdaoGasha02ABI, ammyABI, ammyStdABI, erc20ABI }) => {
    const { address } = useAccount()

    const [sell1Remain, setSell1Remain] = React.useState(37)
    const [canbuy1, setCanBuy1] = React.useState(false)
    const [sell2Remain, setSell2Remain] = React.useState(100)
    const [canbuy2, setCanBuy2] = React.useState(false)
    const [sell3Remain, setSell3Remain] = React.useState(500)
    const [canbuy3, setCanBuy3] = React.useState(false)

    const [roll1Remain, setRoll1Remain] = React.useState(107)
    const [canroll1, setCanRoll1] = React.useState(false)
    const [roll2Remain, setRoll2Remain] = React.useState(107)

    const [ctunaBalance, setCTunaBalance] = React.useState(0)
    const [sx31Balance, setSx31Balance] = React.useState(0)
    const [bbqBalance, setBbqBalance] = React.useState(0)
    const [cuBalance, setCuBalance] = React.useState(0)
    const [jaspBalance, setJaspBalance] = React.useState(0)
    const [jusdtBalance, setJusdtBalance] = React.useState(0)
    const [cmjBalance, setCmjBalance] = React.useState(0)

    React.useEffect(() => {        
        const thefetch = async () => {
            const resBal = address !== null && address !== undefined ? await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "` + address + `") {
                            ERC20balances {
                                id
                                valueExact
                            }
                        }
                    }`
                })
            })).json() : null
            const _resBal = resBal !== null && resBal.data.account !== null ? resBal.data.account.ERC20balances : []

            let cmjBal = 0
            let jusdtBal = 0
            let ctunaBal = 0
            let sx31Bal = 0
            let bbqBal = 0
            let cuBal = 0
            let jaspBal = 0
            for (let i = 0; i <= _resBal.length - 1; i++) {
                if (_resBal[i].id.slice(0, 42).toUpperCase() === cmjToken.toUpperCase()) {
                    cmjBal = _resBal[i].valueExact
                } else if (_resBal[i].id.slice(0, 42).toUpperCase() === jusdtToken.toUpperCase()) {
                    jusdtBal = _resBal[i].valueExact
                } else if (_resBal[i].id.slice(0, 42).toUpperCase() === ctunaLab.toUpperCase()) {
                    ctunaBal = _resBal[i].valueExact
                } else if (_resBal[i].id.slice(0, 42).toUpperCase() === sx31Lab.toUpperCase()) {
                    sx31Bal = _resBal[i].valueExact
                } else if (_resBal[i].id.slice(0, 42).toUpperCase() === bbqToken.toUpperCase()) {
                    bbqBal = _resBal[i].valueExact
                } else if (_resBal[i].id.slice(0, 42).toUpperCase() === dunCopper.toUpperCase()) {
                    cuBal = _resBal[i].valueExact
                } else if (_resBal[i].id.slice(0, 42).toUpperCase() === dunJasper.toUpperCase()) {
                    jaspBal = _resBal[i].valueExact
                }
            }

            const sell1Id = await readContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'sellList',
                args: [1],
            })
            const sell1remain = (410003800000 - (Number(sell1Id.sellId) - 150)) / 100000
            const _canBuy1 = Number(ethers.utils.formatEther(String(ctunaBal))) >= 2500 ? true : false

            const sell2Id = await readContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'sellList',
                args: [2],
            })
            const sell2remain = (100140100000 - (Number(sell2Id.sellId) - 100)) / 100000
            const _canBuy2 = Number(ethers.utils.formatEther(String(bbqBal))) >= 2250 ? true : false

            const sell3Id = await readContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'sellList',
                args: [3],
            })
            const sell3remain = (210050100000 - (Number(sell3Id.sellId) - 250)) / 100000
            const _canBuy3 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 3 ? true : false

            const res = await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        erc721Contract(id: "0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A") {
                            transfers(where: {from: "0x39C623C4B3f11D38f06Adca9B794CFb2d37581e3"}) {
                                from {
                                    id
                                }
                                to {
                                    id
                                }
                            }
                        }
                    }`
                })
            })).json()
            const _res = res.data.erc721Contract.transfers
            const roll1remain = 107 - _res.length

            const roll2 = await readContract({
                address: cmdaoGasha02,
                abi: cmdaoGasha02ABI,
                functionName: 'colList',
                args: [2],
            })
            const roll2remain = Number(roll2.nftCount)
            const _canRoll1 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 10 ? true : false

            return [
                sell1remain, _canBuy1, sell2remain, _canBuy2, sell3remain, _canBuy3, roll1remain, _canRoll1, roll2remain,
                ctunaBal, sx31Bal, jusdtBal, cmjBal, bbqBal, cuBal, jaspBal
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
            setSell1Remain(result[0])
            setCanBuy1(result[1])
            setSell2Remain(result[2])
            setCanBuy2(result[3])
            setSell3Remain(result[4])
            setCanBuy3(result[5])

            setRoll1Remain(result[6])
            setCanRoll1(result[7])
            setRoll2Remain(result[8])

            setCTunaBalance(ethers.utils.formatEther(String(result[9])))
            setSx31Balance(ethers.utils.formatEther(String(result[10])))
            setJusdtBalance(ethers.utils.formatEther(String(result[11])))
            setCmjBalance(ethers.utils.formatEther(String(result[12])))
            setBbqBalance(ethers.utils.formatEther(String(result[13])))
            setCuBalance(ethers.utils.formatEther(String(result[14])))
            setJaspBalance(ethers.utils.formatUnits(String(result[15]), "gwei"))
        })

    }, [address, txupdate, ctunaLabABI, cmdaoMerchantABI, cmdaoGasha02ABI, erc20ABI])

    const buyHandle = async () => {
        setisLoading(true)
        const ctunaAllow = await readContract({
            address: ctunaLab,
            abi: ctunaLabABI,
            functionName: 'allowance',
            args: [address, cmdaoMerchant],
        })
        if (ctunaAllow < (2500 * 10**18)) {
            try {
                const config = await prepareWriteContract({
                    address: ctunaLab,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [1]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const buyHandle2 = async () => {
        setisLoading(true)
        try {
            const bbqAllow = await readContract({
                address: bbqToken,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (bbqAllow < (2250 * 10**18)) {
                const config = await prepareWriteContract({
                    address: bbqToken,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [2]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const buyHandle3 = async () => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (jusdtAllow < (3 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [3]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const rollHandle = async () => {
        setisLoading(true)
        const jusdtAllow = await readContract({
            address: jusdtToken,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, cmdaoGasha],
        })
        if (jusdtAllow < (10 * 10**18)) {
            try {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoGasha, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: cmdaoGasha,
                abi: cmdaoGashaABI,
                functionName: 'roll',
                args: [1]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const rollHandle2 = async (_colIndex) => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoGasha02],
            })
            if (jusdtAllow < (10 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoGasha02, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: cmdaoGasha02,
                abi: cmdaoGasha02ABI,
                functionName: 'roll',
                args: [_colIndex]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div style={{fontSize: "95px", width: "fit-content"}} className="pixel">Mall</div>
                <div style={{fontSize: "22.5px", width: "fit-content", marginTop: "30px"}} className="pixel">Buy & Sell items with NPC.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="./background/malllogo.png" width="175" alt="Mall_Logo" />
            </div>
        </div>

        <div className="collection">
            <div style={{textAlign: "left", height: "fit-content", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                <div style={{width: "100%", textIndent: "20px", fontSize: "18px"}} className="bold">Your Tokens</div>
                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "20px"}}></div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{minWidth: "250px", margin: "20px", boxShadow: "none", background: "#fff"}} className="items bold">
                        <img src="./items/cannedtuna.png" width="22" alt="$CTUNA"/>
                        <div style={{marginLeft: "5px"}}>{Number(ctunaBalance).toFixed(3)}</div>
                    </div>
                    <div style={{minWidth: "250px", margin: "20px", boxShadow: "none", background: "#fff"}} className="items bold">
                        <img src="./items/sx31.png" width="22" alt="$SX31"/>
                        <div style={{marginLeft: "5px"}}>{Number(sx31Balance).toFixed(3)}</div>
                    </div>
                    <div style={{minWidth: "250px", margin: "20px", boxShadow: "none", background: "#fff"}} className="items bold">
                        <img src="./items/bbq.png" width="22" alt="$BBQ"/>
                        <div style={{marginLeft: "5px"}}>{Number(bbqBalance).toFixed(3)}</div>
                    </div>
                    <div style={{minWidth: "250px", margin: "20px", boxShadow: "none", background: "#fff"}} className="items bold">
                        <img src="./items/copper.png" width="22" alt="$COPPER"/>
                        <div style={{marginLeft: "5px"}}>{Number(cuBalance).toFixed(3)}</div>
                    </div>
                </div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{minWidth: "250px", margin: "20px", boxShadow: "none", background: "#fff"}} className="items bold">
                        <img src="./items/jasper.png" width="22" alt="$JASPER"/>
                        <div style={{marginLeft: "5px"}}>{Number(jaspBalance).toFixed(3)}</div>
                    </div>
                    <div style={{minWidth: "250px", margin: "20px", boxShadow: "none", background: "#fff"}} className="items bold">
                        <img src="./tokens/cmj.png" width="22" alt="$CMJ"/>
                        <div style={{marginLeft: "5px"}}>{Number(cmjBalance).toFixed(3)}</div>
                    </div>
                    <div style={{minWidth: "250px", margin: "20px", boxShadow: "none", background: "#fff"}} className="items bold">
                        <img src="./tokens/jusdt.png" width="22" alt="$JUSDT"/>
                        <div style={{marginLeft: "5px"}}>{Number(jusdtBalance).toFixed(3)}</div>
                    </div>
                </div>

                <div style={{width: "100%", marginTop: "35px", textIndent: "20px", fontSize: "18px"}} className="bold">Automated Market Maker</div>
                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "20px"}}></div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <Ammmerchant setisLoading={setisLoading} setTxupdate={setTxupdate} ammyABI={ammyABI} ammyStdABI={ammyStdABI} erc20ABI={erc20ABI} />
                    <Ammmerchant2 setisLoading={setisLoading} setTxupdate={setTxupdate} ammyStdABI={ammyStdABI} erc20ABI={erc20ABI} />
                </div>

                <div style={{width: "100%", marginTop: "35px", textIndent: "20px", fontSize: "18px"}} className="bold">NFTs Premium Mall</div>
                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "20px"}}></div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}}>
                        <img src="https://nftstorage.link/ipfs/bafkreigvjgu7tmyhkydyaoujsjqs7ui2wdcci2snuya7u6cd7cdid7z6gq" height="150" alt="CLAYMORE_GASHA"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", fontSize: "20px", width: "380px"}}className="emp pixel">The Blacksmith Claymore [Gashapon]</div>
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                        <div style={{alignSelf: "flex-start", height: "200px"}}>
                            <div style={{marginTop: "20px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div className="bold">Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">
                                    <div className="emp bold">{roll1Remain}</div>
                                    <div>/107 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div className="bold">Status</div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">+250 CMPOW [N Rarity]</div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">+550 CMPOW [R Rarity]</div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">+1050 CMPOW [SR Rarity]</div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">+2550 CMPOW [SSR Rarity]</div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div className="bold">Price</div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">
                                    <div style={{margin: "0 7.5px"}}>10</div>
                                    <img src="./tokens/jusdt.png" height="18" alt="jusdt"/>
                                    <div style={{margin: "0 2.5px"}}>JUSDT</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll1Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={rollHandle}>ROLL NOW</div> :
                                            <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}}>
                        <img src="https://bafkreiftpkycalwvudetraf3p6rn4jkz6avoy5ogefrjm5dvwemojnfqna.ipfs.nftstorage.link/" height="150" alt="VALKYRIAN_GASHA"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", fontSize: "20px", width: "380px"}}className="emp pixel">Full Plate Valkyrian Armor [Gashapon]</div>
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                        <div style={{alignSelf: "flex-start", height: "200px"}}>
                            <div style={{marginTop: "20px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div className="bold">Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">
                                    <div className="emp bold">{roll2Remain}</div>
                                    <div>/107 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div className="bold">Status</div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">+250 CMPOW [N Rarity]</div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">+550 CMPOW [R Rarity]</div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">+1050 CMPOW [SR Rarity]</div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">+2550 CMPOW [SSR Rarity]</div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div className="bold">Price</div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">
                                    <div style={{margin: "0 7.5px"}}>10</div>
                                    <img src="./tokens/jusdt.png" height="18" alt="jusdt"/>
                                    <div style={{margin: "0 2.5px"}}>JUSDT</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll2Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(2)}>ROLL NOW</div> :
                                            <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}}>
                        <img src="https://nftstorage.link/ipfs/bafkreiexymrt2jpbbgiwfzsvxjgty5fdd3j5qh3yqqmm7dbzqudkwfcyna" height="150" alt="Floki_Helmet_N"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", fontSize: "20px", width: "380px"}}className="emp pixel">Floki's Viking Helmet N</div>
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                        <div style={{alignSelf: "flex-start", height: "200px"}}>
                            <div style={{marginTop: "20px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div className="bold">Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">
                                    <div className="emp bold">{sell3Remain}</div>
                                    /500 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div className="bold">Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}  className="light">250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div className="bold">Price</div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">
                                    <div style={{margin: "0 7.5px"}}>3</div>
                                    <img src="./tokens/jusdt.png" height="18" alt="$JUSDT"/>
                                    <div style={{margin: "0 2.5px"}}>JUSDT</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell3Remain > 0 ?
                                    <>
                                        {canbuy3 ?
                                            <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle3}>BUY NOW</div> :
                                            <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", marginTop: "35px", textIndent: "20px", fontSize: "18px"}} className="bold">NFTs Redemption Mall</div>
                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "20px"}}></div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}}>
                        <img src="https://nftstorage.link/ipfs/bafkreibbwhcbvmiqibpoqtxrlwso22ukumimk26clm3syrvflvd7hkp6ye" height="150" alt="PEPE_JA_4"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", fontSize: "20px", width: "380px"}}className="emp pixel">PEPE JA Vol.4</div>
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                        <div style={{alignSelf: "flex-start", height: "200px"}}>
                            <div style={{marginTop: "20px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div className="bold">Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">
                                    <div className="emp bold">{sell2Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div className="bold">Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}  className="light">100 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div className="bold">Price</div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">
                                    <div style={{margin: "0 7.5px"}}>2250</div>
                                    <img src="./items/bbq.png" height="18" alt="$BBQ"/>
                                    <div style={{margin: "0 2.5px"}}>BBQ</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell2Remain > 0 ?
                                    <>
                                        {canbuy2 ?
                                            <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle2}>BUY NOW</div> :
                                            <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}}>
                        <img src="https://nftstorage.link/ipfs/bafkreiacm6fn5rjctuxyiirlmr7awp6ckesgffamingak4pif3kp6vgbri" height="160" alt="valentineringpic"/>
                        <div style={{alignSelf: "flex-start", fontSize: "20px", width: "380px"}}className="emp pixel">TSW Valentine Ring</div>
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                        <div style={{alignSelf: "flex-start", height: "200px"}}>
                            <div style={{marginTop: "20px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div className="bold">Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">
                                    <div className="emp bold">{sell1Remain}</div>
                                    /107 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div className="bold">Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}  className="light">+150 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                <div className="bold">Price</div>
                                <div style={{display: "flex", flexDirection: "row"}} className="light">
                                    <div style={{margin: "0 7.5px"}}>2500</div>
                                    <img src="./items/cannedtuna.png" height="18" alt="cannedtunapic"/>
                                    <div style={{margin: "0 2.5px"}}>CTUNA</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell1Remain > 0 ?
                                    <>
                                        {canbuy1 ?
                                            <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle}>BUY NOW</div> :
                                            <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", padding: "15px 40px", marginTop: "20px", width: "200px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>
                <div style={{height: "40px"}}></div>
            </div>
        </div>
    </>
    )
}

export default Mall
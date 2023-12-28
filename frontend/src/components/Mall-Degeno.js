import React from 'react'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const meowToken = '0x04052384166fC30D03929eE328805eC084776843'
const cmjToken = '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b'
const degenoMeow = '0xdB16eCc5d2c27F67B4a4dc1e25f1e6e20BAcAFD0'

const Ammmerchant3 = ({ setisLoading, setTxupdate, ammyStdABI, erc20ABI }) => {
    const { address } = useAccount()

    const [mode, setMode] = React.useState(1)
    const [gasselected, setGasselected] = React.useState("MEOW")

    const [inputSwap, setInputSwap] = React.useState("")
    const [inputSwap2, setInputSwap2] = React.useState("")

    const [reserveCmjMeow, setReserveCmjMeow] = React.useState("")
    const [reserveMeow, setReserveMeow] = React.useState("")

    const [cmjBoughtMEOW, setCmjBoughtMEOW] = React.useState("0.000")
    const [tokenBoughtMEOW, setTokenBoughtMEOW] = React.useState("0.000")
    const [priceMEOW, setPriceMEOW] = React.useState("0.000")
    const [meowBalance, setMeowBalance] = React.useState("0")
    const [meowLpBalance, setMeowLpBalance] = React.useState("0")

    const [meowLpSell, setMeowLpSell] = React.useState("")
    const [meowAdd, setMeowAdd] = React.useState("")
    const [cmjAdd, setCmjAdd] = React.useState("")

    const handleSwapMEOW = async (event) => {
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: degenoMeow,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: degenoMeow,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                },
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
        const tokensBoughttokenTOcmj = await readContract({
            address: degenoMeow,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveToken), String(_reserveCmj)],
        })
        event.target.value !== "" ? setCmjBoughtMEOW(ethers.utils.formatEther(tokensBoughttokenTOcmj)) : setCmjBoughtMEOW("0.000")
    }
    const handleSwapMEOW_2 = async (event) => {
        setInputSwap2(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: degenoMeow,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: degenoMeow,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                },
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
        const tokensBoughtcmjTOtoken = await readContract({
            address: degenoMeow,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCmj), String(_reserveToken)],
        })
        event.target.value !== "" ? setTokenBoughtMEOW(ethers.utils.formatEther(tokensBoughtcmjTOtoken)) : setTokenBoughtMEOW("0.000")
    }

    const swapTokenHandleMEOW = async (_sell) => {
        setisLoading(true)
        try {
            if (_sell) {
                const tokenAllow = await readContract({
                    address: meowToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, degenoMeow],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(inputSwap) > Number(tokenAllow) / (10**18)) {
                    const config = await prepareWriteContract({
                        address: meowToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [degenoMeow, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config = await prepareWriteContract({
                    address: degenoMeow,
                    abi: ammyStdABI,
                    functionName: 'tokenTOcmj',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(cmjBoughtMEOW)],
                })
                const tx = await writeContract(config)
                await tx.wait()
                setTxupdate(tx)
            } else {
                const cmjAllow = await readContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, degenoMeow],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap2))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(ethers.utils.parseEther(inputSwap2)) > Number(cmjAllow)) {
                    const config = await prepareWriteContract({
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [degenoMeow, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config2 = await prepareWriteContract({
                    address: degenoMeow,
                    abi: ammyStdABI,
                    functionName: 'cmjTOtoken',
                    args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseEther(tokenBoughtMEOW)],
                })
                const tx = await writeContract(config2)
                await tx.wait()
                setTxupdate(tx)
            }
        } catch {}
        setisLoading(false)
    }

    const removeMeowLp = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: degenoMeow,
                abi: ammyStdABI,
                functionName: 'removeLiquidity',
                args: [ethers.utils.parseEther(meowLpSell)],
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const handleAddMeow = async (event) => {
        setMeowAdd(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const bigValue = ethers.BigNumber.from(_value)
        const _reserveMeow = await readContract({
            address: degenoMeow,
            abi: ammyStdABI,
            functionName: 'getReserveToken',
        })
        const bigMeowReserv = ethers.BigNumber.from(_reserveMeow)
        const _reserveCmj = await readContract({
            address: degenoMeow,
            abi: ammyStdABI,
            functionName: 'getReserveCMJ',
        })
        const bigCmjReserv = ethers.BigNumber.from(_reserveCmj)
        event.target.value !== "" ? setCmjAdd(ethers.utils.formatEther(((bigValue.mul(bigCmjReserv)).div(bigMeowReserv)))) : setCmjAdd("")
    }
    const handleAddMeow2 = async (event) => {
        setCmjAdd(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const bigValue = ethers.BigNumber.from(_value)
        const _reserveMeow = await readContract({
            address: degenoMeow,
            abi: ammyStdABI,
            functionName: 'getReserveToken',
        })
        const bigMeowReserv = ethers.BigNumber.from(_reserveMeow)
        const _reserveCmj = await readContract({
            address: degenoMeow,
            abi: ammyStdABI,
            functionName: 'getReserveCMJ',
        })
        const bigCmjReserv = ethers.BigNumber.from(_reserveCmj)
        event.target.value !== "" ? setMeowAdd(ethers.utils.formatEther(((bigValue.mul(bigMeowReserv)).div(bigCmjReserv)))) : setMeowAdd("")
    }
    const addMeowLpHandle = async () => {
        setisLoading(true)
        try {
            const cmjAllow = await readContract({
                address: cmjToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, degenoMeow],
            })
            const bigValue = cmjAllow !== "" ? ethers.BigNumber.from(ethers.utils.parseEther(cmjAdd)) : ethers.BigNumber.from(0)
            const Hex = ethers.BigNumber.from(10**8)
            const bigApprove = bigValue.mul(Hex)
            if (Number(cmjAdd) > Number(cmjAllow) / (10**18)) {
                const config = await prepareWriteContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [degenoMeow, bigApprove],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const meowAllow = await readContract({
                address: meowToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, degenoMeow],
            })
            if (Number(meowAdd) > Number(meowAllow) / (10**18)) {
                const config2 = await prepareWriteContract({
                    address: meowToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [degenoMeow, bigApprove],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const config3 = await prepareWriteContract({
                address: degenoMeow,
                abi: ammyStdABI,
                functionName: 'addLiquidity',
                args: [ethers.utils.parseEther(meowAdd), ethers.utils.parseEther(cmjAdd)],
            })
            const tx = await writeContract(config3)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    React.useEffect(() => {        
        const thefetch = async () => {
            const data = await readContracts({
                contracts: [
                    {
                        address: degenoMeow,
                        abi: ammyStdABI,
                        functionName: 'getReserveCMJ',
                    },
                    {
                        address: degenoMeow,
                        abi: ammyStdABI,
                        functionName: 'getReserveToken',
                    },
                ],
            })

            const _reserveCmjMEOW = data[0]
            const _reserveMEOW = data[1]

            const data2 = await readContracts({
                contracts: [
                    {
                        address: degenoMeow,
                        abi: ammyStdABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveMEOW), String(_reserveCmjMEOW)],
                    },
                ],
            })

            const tokensBoughtbbqTOcmj = data2[0]

            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: meowToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: degenoMeow,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },                    
                ],
            }) : [0]

            const meowBal = data3[0]
            const meowlpBal = data3[1]

            return [tokensBoughtbbqTOcmj, meowBal, meowlpBal, _reserveCmjMEOW, _reserveMEOW]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setPriceMEOW(Number(ethers.utils.formatEther(result[0])).toFixed(3))
            const _meowbalance = ethers.utils.formatEther(result[1])
            setMeowBalance(Math.floor(_meowbalance * 100000) / 100000)
            const _meowlpbalance = ethers.utils.formatEther(result[2])
            setMeowLpBalance(Math.floor(_meowlpbalance * 100000) / 100000)

            setReserveCmjMeow(ethers.utils.formatEther(result[3]))
            setReserveMeow(ethers.utils.formatEther(result[4]))
        })

    }, [address, erc20ABI, ammyStdABI])

    return (
        <div className="nftCard" style={{alignItems: "center", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
            <div style={{marginTop: "10px", height: "160px", width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                <img src="https://nftstorage.link/ipfs/bafkreiewvtce4l7hqx5aivvwdjpl2hbka7i2vpfwpa73idiqzckmum4mxq" width="260" alt="NPC_Degeno" />
            </div>
            {mode === 1 ?
                <div style={{width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                    <div style={{maxHeight: "75px"}}>
                        <div style={{fontSize: "20px", width: "380px"}} className="pixel">DEGENO, THE CRYPTO TRADER</div>
                        <div style={{fontSize: "10px"}} className="light">"BUY/SELL ${gasselected} - 5% TAX"</div>
                        <div style={{fontSize: "14px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}} className="pixel">
                            <img src="https://nftstorage.link/ipfs/bafkreictvxugfipr3awpjv7kugj6i2xpmifmh6wp33ljcmwnvvw56zigdy" width="12" alt="$MEOW"/>
                            <div style={{marginLeft: "5px"}}>{gasselected === "MEOW" ? Number(meowBalance).toFixed(4) : ""}</div>
                        </div>
                        <div style={{marginTop: "5px", width: "90%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{width: "70%", display: "flex", flexDirection: "row"}}>
                                <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                    <option value="MEOW">MEOW</option>
                                </select>
                                <div style={{fontSize: "16px", marginLeft: "5px", display: "flex", alignItems: "center", letterSpacing: "1px"}} className="pixel">
                                    &nbsp;1
                                    {gasselected === "MEOW" ? <>&nbsp; <img src="https://nftstorage.link/ipfs/bafkreictvxugfipr3awpjv7kugj6i2xpmifmh6wp33ljcmwnvvw56zigdy" width="22" alt="$MEOW"/> &nbsp;=&nbsp; <div className="emp">{priceMEOW}</div></> : ''}
                                    &nbsp;<img src="https://nftstorage.link/ipfs/bafkreibizkouoitypq64ynygiclarbenejrtvsrfzeuezwh2b75fffyrzi" width="22" alt="$CMJ"/>
                                </div>
                            </div>
                            <div style={{width: "80px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={() => setMode(2)}>MANAGE LP</div>
                        </div>
                    </div>
                    <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                    <input
                        style={{width: "90%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "18px"}}
                        className="bold"
                        type="number"
                        step="1"
                        min="1"
                        placeholder={"0 $" + gasselected}
                        onChange={(event) => {
                            if (gasselected === "MEOW") {
                                handleSwapMEOW(event)
                            }
                        }}
                        value={inputSwap}
                    ></input>
                    <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                        {address !== null && address !== undefined ?
                            <div style={{width: "30px"}} className="pixel button" onClick={
                                () => {
                                    if (gasselected === "MEOW") {
                                        swapTokenHandleMEOW(true)
                                    }
                                }
                            }>SELL</div> :
                            <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">SELL</div>
                        }
                        <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                            <div className="emp">
                                {gasselected === "MEOW" ? cmjBoughtMEOW : ''}
                            </div>
                            $CMJ (
                                {gasselected === "MEOW" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjMeow) - ((Number(reserveCmjMeow) * Number(reserveMeow)) / (Number(reserveMeow) + Number(inputSwap))))) - (Number(reserveMeow/reserveCmjMeow))) / (Number(reserveMeow/reserveCmjMeow))) * 100)).toFixed(2)}%</>}
                                {Number(inputSwap) === 0 && <>0.00%</>}
                            )
                        </div>
                    </div>
                    <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "10px 0"}}></div>
                    <input
                        style={{width: "90%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "18px"}}
                        className="bold"
                        type="number"
                        step="1"
                        min="1"
                        placeholder="0 $CMJ"
                        onChange={(event) => {
                            if (gasselected === "MEOW") {
                                handleSwapMEOW_2(event)
                            }
                        }}
                        value={inputSwap2}
                    ></input>
                    <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                        {address !== null && address !== undefined ?
                            <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                                () => {
                                    if (gasselected === "MEOW") {
                                        swapTokenHandleMEOW(false)
                                    }
                                }
                            }>BUY</div> :
                            <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BUY</div>
                        }
                        <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                            <div style={{color: "#67BAA7"}}>
                                {gasselected === "MEOW" ? tokenBoughtMEOW : ''}
                            </div>
                            ${gasselected} ( 
                                {gasselected === "MEOW" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveMeow) - ((Number(reserveMeow) * Number(reserveCmjMeow)) / (Number(reserveCmjMeow) + Number(inputSwap2))))) - (Number(reserveCmjMeow/reserveMeow))) / (Number(reserveCmjMeow/reserveMeow))) * 100)).toFixed(2)}%</>}
                                {Number(inputSwap2) === 0 && <>0.00%</>}
                            )
                        </div>
                    </div>
                </div> :
                <></>
            }
            {mode === 2 ?
                <div style={{width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                    <div style={{maxHeight: "75px"}}>
                        <div style={{fontSize: "20px", width: "380px"}} className="pixel">DEGENO, THE CRYPTO TRADER</div>
                        <div style={{fontSize: "10px"}} className="light">"ADD/REMOVE {gasselected}-CMJ LP"</div>
                        <div style={{fontSize: "14px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}} className="pixel">
                            <img src="https://nftstorage.link/ipfs/bafkreictvxugfipr3awpjv7kugj6i2xpmifmh6wp33ljcmwnvvw56zigdy" width="12" alt="$MEOW"/>
                            <div style={{marginLeft: "5px"}}>{gasselected === "MEOW" ? Number(meowBalance).toFixed(4) : ""}</div>
                        </div>
                        <div style={{marginTop: "5px", width: "90%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{width: "70%", display: "flex", flexDirection: "row"}}>
                                <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                    <option value="MEOW">MEOW</option>
                                </select>
                                <div style={{fontSize: "14px", marginLeft: "5px", display: "flex", alignItems: "center"}} className="pixel">
                                    {gasselected === "MEOW" ? <>&nbsp;LP BALANCE:&nbsp; <div className='emp'>{Number(meowLpBalance).toFixed(4)}</div></> : ''}
                                </div>
                            </div>
                            <div style={{width: "80px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={() => setMode(1)}>SWAP NOW</div>
                        </div>
                    </div>
                    <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                    <div style={{marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <input style={{width: "255px", padding: "5px", border: "1px solid #dddade", fontSize: "14px"}} type="number" placeholder={"0 " + gasselected + "-CMJ LP"} className="bold" onChange={(event) => setMeowLpSell(event.target.value)} value={meowLpSell}></input>
                        <div style={{width: "60px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "#ff007a", color: "#fff", border: "none", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={removeMeowLp}>REMOVE</div>
                    </div>
                    <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                    <input
                        style={{width: "90%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "14px"}}
                        className="bold"
                        type="number"
                        step="1"
                        min="1"
                        placeholder={"0 $" + gasselected}
                        onChange={(event) => {
                            if (gasselected === "MEOW") {
                                handleAddMeow(event)
                            }
                        }}
                        value={meowAdd}
                    ></input>
                    <div style={{width: "100%", margin: "5px", fontSize: "14px"}} className="fa fa-plus"></div>
                    <input
                        style={{width: "90%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "14px"}}
                        className="bold"
                        type="number"
                        step="1"
                        min="1"
                        placeholder="0 $CMJ"
                        onChange={(event) => {
                            if (gasselected === "MEOW") {
                                handleAddMeow2(event)
                            }
                        }}
                        value={cmjAdd}
                    ></input>
                    <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                        {address !== null && address !== undefined ?
                            <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                                () => {
                                    if (gasselected === "MEOW") {
                                        addMeowLpHandle()
                                    }
                                }
                            }>ADD</div> :
                            <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">ADD</div>
                        }
                        <div style={{height: "55px", textAlign: "left", marginLeft: "20px", fontSize: "16px"}} className="pixel bold">
                        </div>
                    </div>
                </div> :
                <></>
            }
        </div>
    )
}

export default Ammmerchant3
import React from 'react'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const iiToken = '0x523AA3aB2371A6360BeC4fEea7bE1293adb32241'
const jtaoToken = '0xdbCCc9F8920e7274eeC62e695084D3bCe443c3dd'
const angeloII = '0xbd5bff1fbbd83fecd749a328d98f860f7f343c10'

const Ammmerchant5 = ({ setisLoading, setTxupdate, cmdaoAmmNpcABI, erc20ABI, iiBalance, jtaoBalance }) => {
    const { address } = useAccount()

    const [mode, setMode] = React.useState(1)
    const [gasselected, setGasselected] = React.useState("II")

    const [inputSwap, setInputSwap] = React.useState("")
    const [inputSwap2, setInputSwap2] = React.useState("")

    const [jtaoBoughtII, setJtaoBoughtII] = React.useState("0.000")
    const [tokenBoughtII, setTokenBoughtII] = React.useState("0.000")
    const [priceII, setPriceII] = React.useState("0.000")
    const [reserveJtaoIi, setReserveJtaoIi] = React.useState("")
    const [reserveII, setReserveII] = React.useState("")

    const [iiLpBalance, setIiLpBalance] = React.useState("0")

    const [lpSell, setLpSell] = React.useState("")
    const [tokenAdd, setTokenAdd] = React.useState("")
    const [currAdd, setCurrAdd] = React.useState("")

    const handleSwapUni = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = angeloII
        }
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: addr,
                    abi: cmdaoAmmNpcABI,
                    functionName: 'getReserveCurrency',
                },
                {
                    address: addr,
                    abi: cmdaoAmmNpcABI,
                    functionName: 'getReserveToken',
                }
            ],
        })
        const _reserveCurr = data[0]
        const _reserveToken = data[1]
        const tokensBoughttokenTOcurr = await readContract({
            address: addr,
            abi: cmdaoAmmNpcABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveToken), String(_reserveCurr)],
        })
        if (index === 1) {
            event.target.value !== "" ? setJtaoBoughtII(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setJtaoBoughtII("0.000")
        }
    }
    const handleSwapUni_2 = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = angeloII
        }
        setInputSwap2(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: addr,
                    abi: cmdaoAmmNpcABI,
                    functionName: 'getReserveCurrency',
                },
                {
                    address: addr,
                    abi: cmdaoAmmNpcABI,
                    functionName: 'getReserveToken',
                }
            ],
        })
        const _reserveCurr = data[0]
        const _reserveToken = data[1]
        const tokensBoughtcurrTOtoken = await readContract({
            address: addr,
            abi: cmdaoAmmNpcABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCurr), String(_reserveToken)],
        })
        if (index === 1) {
            event.target.value !== "" ? setTokenBoughtII(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setTokenBoughtII("0.000")
        }
    }

    const swapTokenHandleUni = async (index, _sell) => {
        let lp = '0x0000000000000000000000000000000000000000'
        let token = '0x0000000000000000000000000000000000000000'
        let curr = '0x0000000000000000000000000000000000000000'
        let currBoughtToken = '0'
        let tokenBoughtCurr = '0'
        if (index === 1) {
            lp = angeloII
            token = iiToken
            curr = jtaoToken
            currBoughtToken = jtaoBoughtII
            tokenBoughtCurr = tokenBoughtII
        }
        setisLoading(true)
        try {
            if (_sell) {
                const tokenAllow = await readContract({
                    address: token,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, lp],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(inputSwap) > Number(tokenAllow) / (10**18)) {
                    const config = await prepareWriteContract({
                        address: token,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [lp, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config = await prepareWriteContract({
                    address: lp,
                    abi: cmdaoAmmNpcABI,
                    functionName: 'tokenTOcurrency',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(currBoughtToken)],
                })
                const tx = await writeContract(config)
                await tx.wait()
                setTxupdate(tx)
            } else {
                const currAllow = await readContract({
                    address: curr,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, lp],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap2))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(ethers.utils.parseEther(inputSwap2)) > Number(currAllow)) {
                    const config = await prepareWriteContract({
                        address: curr,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [lp, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config2 = await prepareWriteContract({
                    address: lp,
                    abi: cmdaoAmmNpcABI,
                    functionName: 'currencyTOtoken',
                    args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseEther(tokenBoughtCurr)],
                })
                const tx = await writeContract(config2)
                await tx.wait()
                setTxupdate(tx)
            }
        } catch {}
        setisLoading(false)
    }

    const removeLpUni = async (index) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = angeloII
        }
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: addr,
                abi: cmdaoAmmNpcABI,
                functionName: 'removeLiquidity',
                args: [ethers.utils.parseEther(lpSell)],
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const handleAddUni = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = angeloII
        }
        setTokenAdd(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const bigValue = ethers.BigNumber.from(_value)
        const _reserveToken = await readContract({
            address: addr,
            abi: cmdaoAmmNpcABI,
            functionName: 'getReserveToken',
        })
        const bigTokenReserv = ethers.BigNumber.from(_reserveToken)
        const _reserveCurr = await readContract({
            address: addr,
            abi: cmdaoAmmNpcABI,
            functionName: 'getReserveCurrency',
        })
        const bigCurrReserv = ethers.BigNumber.from(_reserveCurr)
        event.target.value !== "" ? setCurrAdd(ethers.utils.formatEther(((bigValue.mul(bigCurrReserv)).div(bigTokenReserv)))) : setCurrAdd("")
    }
    const handleAddUni_2 = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = angeloII
        }
        setCurrAdd(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const bigValue = ethers.BigNumber.from(_value)
        const _reserveToken = await readContract({
            address: addr,
            abi: cmdaoAmmNpcABI,
            functionName: 'getReserveToken',
        })
        const bigTokenReserv = ethers.BigNumber.from(_reserveToken)
        const _reserveCurr = await readContract({
            address: addr,
            abi: cmdaoAmmNpcABI,
            functionName: 'getReserveCurrency',
        })
        const bigCurrReserv = ethers.BigNumber.from(_reserveCurr)
        event.target.value !== "" ? setTokenAdd(ethers.utils.formatEther(((bigValue.mul(bigTokenReserv)).div(bigCurrReserv)))) : setTokenAdd("")
    }
    const addLpHandleUni = async (index) => {
        let lp = '0x0000000000000000000000000000000000000000'
        let token = '0x0000000000000000000000000000000000000000'
        let curr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            lp = angeloII
            token = iiToken
            curr = jtaoToken
        }
        setisLoading(true)
        try {
            const currAllow = await readContract({
                address: curr,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, lp],
            })
            const bigValue = currAllow !== "" ? ethers.BigNumber.from(ethers.utils.parseEther(currAdd)) : ethers.BigNumber.from(0)
            const Hex = ethers.BigNumber.from(10**8)
            const bigApprove = bigValue.mul(Hex)
            if (Number(currAdd) > Number(currAllow) / (10**18)) {
                const config = await prepareWriteContract({
                    address: curr,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [lp, bigApprove],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const tokenAllow = await readContract({
                address: token,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, lp],
            })
            if (Number(tokenAdd) > Number(tokenAllow) / (10**18)) {
                const config2 = await prepareWriteContract({
                    address: token,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [lp, bigApprove],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const config3 = await prepareWriteContract({
                address: lp,
                abi: cmdaoAmmNpcABI,
                functionName: 'addLiquidity',
                args: [ethers.utils.parseEther(tokenAdd), ethers.utils.parseEther(currAdd)],
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
                        address: angeloII,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: angeloII,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    }
                ],
            })

            const _reserveJtaoII = data[0]
            const _reserveII = data[1]

            const data2 = await readContracts({
                contracts: [
                    {
                        address: angeloII,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveII), String(_reserveJtaoII)],
                    },
                ],
            })

            const tokensBoughtiiTOjtao = data2[0]

            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: angeloII,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },                  
                ],
            }) : [0, 0, ]

            const iilpBal = data3[0]

            return [
                tokensBoughtiiTOjtao, _reserveJtaoII, _reserveII, iilpBal,
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
            result[0] !== null && setPriceII(Number(ethers.utils.formatEther(result[0])).toFixed(3))
            setReserveJtaoIi(ethers.utils.formatEther(result[1]))
            setReserveII(ethers.utils.formatEther(result[2]))
            const _iilpbalance = ethers.utils.formatEther(result[3])
            setIiLpBalance(Math.floor(_iilpbalance * 100000) / 100000)    
        })

    }, [address, erc20ABI, cmdaoAmmNpcABI])

    return (
        <div className="nftCard" style={{alignItems: "center", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
            <div style={{marginTop: "10px", width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                <div style={{height: "160px", width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                    <div style={{height: "250px"}}></div>
                </div>
                {mode === 1 &&
                    <>
                        <div style={{maxHeight: "75px"}}>
                            <div style={{fontSize: "20px", width: "380px"}} className="pixel">TAO UNCLE, TAOMEME TRADER</div>
                            <div style={{fontSize: "10px", marginTop: "5px"}} className="light">"BUY/SELL ${gasselected}</div>
                            <div style={{fontSize: "10px"}} className="light">5% TAX"</div>
                            <div style={{marginTop: "5px", width: "90%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                <div style={{width: "70%", display: "flex", flexDirection: "row"}}>
                                    <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="II">II</option>
                                    </select>
                                    <div style={{fontSize: "16px", marginLeft: "5px", display: "flex", alignItems: "center", letterSpacing: "1px"}} className="pixel">
                                        &nbsp;1
                                        {gasselected === "II" && <>&nbsp;<img src="https://nftstorage.link/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q" width="22" alt="$II"/> &nbsp;=&nbsp; <div className="emp">{priceII}</div></>}
                                        &nbsp;<img src="https://nftstorage.link/ipfs/bafkreifydb6vy2dysudcg6x64p42enym3bhfneal62ctf33oapsmk6qjlm" width="22" alt="$JTAO"/>
                                    </div>
                                </div>
                                <div style={{width: "80px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={() => setMode(2)}>MANAGE LP</div>
                            </div>
                        </div>
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                        <div style={{width: "98%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <input
                                style={{width: "55%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "18px"}}
                                className="bold"
                                type="number"
                                step="1"
                                min="1"
                                placeholder={"0 $" + gasselected}
                                onChange={(event) => {
                                    if (gasselected === "II") {
                                        handleSwapUni(1, event)
                                    }
                                }}
                                value={inputSwap}
                            ></input>
                            {gasselected === "II" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: iiBalance}}; handleSwapUni(1, bal);}}>
                                    <img src="https://nftstorage.link/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q" width="22" alt="$II"/>
                                    <div style={{marginLeft: "5px"}}>{Number(iiBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                        </div>
                        <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            {address !== null && address !== undefined ?
                                <div style={{width: "30px"}} className="pixel button" onClick={
                                    () => {
                                        if (gasselected === "II") {
                                            swapTokenHandleUni(1, true)
                                        }
                                    }
                                }>SELL</div> :
                                <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">SELL</div>
                            }
                            <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                                <div className="emp">
                                    {gasselected === "II" && Number(jtaoBoughtII).toLocaleString('en-US', {maximumFractionDigits:3})}
                                </div>
                                $JTAO (
                                    {gasselected === "II" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveJtaoIi) - ((Number(reserveJtaoIi) * Number(reserveII)) / (Number(reserveII) + Number(inputSwap))))) - (Number(reserveII/reserveJtaoIi))) / (Number(reserveII/reserveJtaoIi))) * 100)).toFixed(2)}%</>}
                                    {Number(inputSwap) === 0 && <>0.00%</>}
                                )
                            </div>
                        </div>
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "10px 0"}}></div>
                        <div style={{width: "98%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <input
                                style={{width: "55%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "18px"}}
                                className="bold"
                                type="number"
                                step="1"
                                min="1"
                                placeholder="0 $JTAO"
                                onChange={(event) => {
                                    if (gasselected === "II") {
                                        handleSwapUni_2(1, event)
                                    }
                                }}
                                value={inputSwap2}
                            ></input>
                            <div
                                style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}}
                                onClick={() => {
                                    const bal = {target: {value: jtaoBalance}}
                                    if (gasselected === "II") {
                                        handleSwapUni_2(1, bal)
                                    }
                                }}
                            >
                                <img src="https://nftstorage.link/ipfs/bafkreifydb6vy2dysudcg6x64p42enym3bhfneal62ctf33oapsmk6qjlm" width="22" alt="$JTAO"/>
                                <div style={{marginLeft: "5px"}}>{Number(jtaoBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                            </div>
                        </div>
                        <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            {address !== null && address !== undefined ?
                                <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                                    () => {
                                        if (gasselected === "II") {
                                            swapTokenHandleUni(1, false)
                                        }
                                    }
                                }>BUY</div> :
                                <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BUY</div>
                            }
                            <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                                <div style={{color: "#67BAA7"}}>
                                    {gasselected === "II" && Number(tokenBoughtII).toLocaleString('en-US', {maximumFractionDigits:3})}
                                </div>
                                ${gasselected} ( 
                                    {gasselected === "II" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveII) - ((Number(reserveII) * Number(reserveJtaoIi)) / (Number(reserveJtaoIi) + Number(inputSwap2))))) - (Number(reserveJtaoIi/reserveII))) / (Number(reserveJtaoIi/reserveII))) * 100)).toFixed(2)}%</>}
                                    {Number(inputSwap2) === 0 && <>0.00%</>}
                                )
                            </div>
                        </div>
                    </>
                }
                {mode === 2 &&
                    <div style={{width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                        <div style={{maxHeight: "75px"}}>
                            <div style={{fontSize: "20px", width: "380px"}} className="pixel">TAO UNCLE, TAOMEME TRADER</div>
                            <div style={{fontSize: "10px", marginTop: "5px"}} className="light">"ADD/REMOVE {gasselected}-JTAO LP</div>
                            <div style={{fontSize: "10px"}} className="light">READY TO JOIN MY BUSINESS?"</div>
                            <div style={{marginTop: "5px", width: "90%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                <div style={{width: "70%", display: "flex", flexDirection: "row"}}>
                                    <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="II">II</option>
                                    </select>
                                    <div
                                        style={{fontSize: "14px", marginLeft: "5px", display: "flex", alignItems: "center", cursor: "pointer"}}
                                        className="pixel"
                                        onClick={() => {
                                            if (gasselected === "II") {
                                                setLpSell(iiBalance)
                                            }
                                        }}
                                    >
                                        {gasselected === "II" && <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(iiLpBalance).toFixed(4)}</div></>}
                                    </div>
                                </div>
                                <div style={{width: "80px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={() => setMode(1)}>SWAP NOW</div>
                            </div>
                        </div>
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                        <div style={{marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <input style={{width: "255px", padding: "5px", border: "1px solid #dddade", fontSize: "14px"}} type="number" placeholder={"0 " + gasselected + "-II LP"} className="bold" onChange={(event) => {setLpSell(event.target.value)}} value={lpSell}></input>
                            <div 
                                style={{width: "60px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "#ff007a", color: "#fff", border: "none", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}}
                                className="button pixel"
                                onClick={() => {
                                    if (gasselected === "II") {
                                        removeLpUni(1)
                                    }
                                }}
                            >
                                REMOVE
                            </div>
                        </div>
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                        <div style={{width: "98%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <input
                                style={{width: "55%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "14px"}}
                                className="bold"
                                type="number"
                                step="1"
                                min="1"
                                placeholder={"0 $" + gasselected}
                                onChange={(event) => {
                                    if (gasselected === "II") {
                                        handleAddUni(1, event)
                                    }
                                }}
                                value={tokenAdd}
                            ></input>
                            {gasselected === "II" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(iiBalance)}}; handleAddUni(1, bal);}}>
                                    <img src="https://nftstorage.link/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q" width="22" alt="$II"/>
                                    <div style={{marginLeft: "5px"}}>{Number(iiBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                        </div>
                        <div style={{width: "100%", margin: "5px", fontSize: "14px"}} className="fa fa-plus"></div>
                        <div style={{width: "98%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <input
                                style={{width: "55%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "14px"}}
                                className="bold"
                                type="number"
                                step="1"
                                min="1"
                                placeholder="0 $II"
                                onChange={(event) => {
                                    if (gasselected === "II") {
                                        handleAddUni_2(1, event)
                                    }
                                }}
                                value={currAdd}
                            ></input>
                            <div
                                style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}}
                                onClick={() => {
                                    const bal = {target: {value: jtaoBalance}}
                                    if (gasselected === "II") {
                                        handleAddUni_2(1, bal)
                                    }
                                    
                                }}>
                                <img src="https://nftstorage.link/ipfs/bafkreifydb6vy2dysudcg6x64p42enym3bhfneal62ctf33oapsmk6qjlm" width="22" alt="$JTAO"/>
                                <div style={{marginLeft: "5px"}}>{Number(jtaoBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                            </div>
                        </div>
                        <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            {address !== null && address !== undefined ?
                                <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                                    () => {
                                        if (gasselected === "II") {
                                            addLpHandleUni(1)
                                        }
                                    }
                                }>ADD</div> :
                                <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">ADD</div>
                            }
                            <div style={{height: "55px", textAlign: "left", marginLeft: "20px", fontSize: "16px"}} className="pixel bold">
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Ammmerchant5
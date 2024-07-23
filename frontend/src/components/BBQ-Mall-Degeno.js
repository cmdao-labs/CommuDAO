import React from 'react'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const cmmToken = '0x45ed41ED4E0F48317f787Dc268779260b1Ca81f1'
const gemToken = "0x222B20bCBBa261DfaaEEe6395f672F15c4d7e88F"
const degenoCmmGem = '0xcd73B2268109c9984E9b62AAEEC7Fc65a8e4A277'

const BBQAmmmerchant3 = ({ setisLoading, setTxupdate, cmdaoAmmNpcABI, erc20ABI, cmmBalance, gemBalance }) => {
    const { address } = useAccount()

    const [mode, setMode] = React.useState(1)
    const [gasselected, setGasselected] = React.useState("CMM-GEM")

    const [inputSwap, setInputSwap] = React.useState("")
    const [inputSwap2, setInputSwap2] = React.useState("")

    const [lpSell, setLpSell] = React.useState("")
    const [tokenAdd, setTokenAdd] = React.useState("")
    const [currAdd, setCurrAdd] = React.useState("")

    const [gemBoughtCMM, setGemBoughtCMM] = React.useState("0.000")
    const [tokenBoughtGemCMM, setTokenBoughtGemCMM] = React.useState("0.000")
    const [priceGemCMM, setPriceGemCMM] = React.useState("0.000")
    const [reserveGemCMM, setReserveGemCMM] = React.useState("")
    const [reserveCMMGem, setReserveCMMGem] = React.useState("")
    const [gemCmmLpBalance, setGemCMMLpBalance] = React.useState("0")

    const handleSwapUni = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = degenoCmmGem
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
        const _reserveCurr = data[0].result
        const _reserveToken = data[1].result
        const tokensBoughttokenTOcurr = await readContract({
            address: addr,
            abi: cmdaoAmmNpcABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveToken), String(_reserveCurr)],
        })
        if (index === 1) {
            event.target.value !== "" ? setGemBoughtCMM(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setGemBoughtCMM("0.000")
        }
    }
    const handleSwapUni_2 = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = degenoCmmGem
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
        const _reserveCurr = data[0].result
        const _reserveToken = data[1].result
        const tokensBoughtcurrTOtoken = await readContract({
            address: addr,
            abi: cmdaoAmmNpcABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCurr), String(_reserveToken)],
        })
        if (index === 1) {
            event.target.value !== "" ? setTokenBoughtGemCMM(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setTokenBoughtGemCMM("0.000")
        }
    }

    const swapTokenHandleUni = async (index, _sell) => {
        let lp = '0x0000000000000000000000000000000000000000'
        let token = '0x0000000000000000000000000000000000000000'
        let curr = '0x0000000000000000000000000000000000000000'
        let currBoughtToken = '0'
        let tokenBoughtCurr = '0'
        if (index === 1) {
            lp = degenoCmmGem
            curr = cmmToken
            token = gemToken
            currBoughtToken = gemBoughtCMM
            tokenBoughtCurr = tokenBoughtGemCMM
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
                    const { hash: hash0 } = await writeContract(config)
                    await waitForTransaction({ hash: hash0 })
                }
                const config = await prepareWriteContract({
                    address: lp,
                    abi: cmdaoAmmNpcABI,
                    functionName: 'tokenTOcurrency',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(currBoughtToken)],
                })
                const { hash: hash1 } = await writeContract(config)
                await waitForTransaction({ hash: hash1 })
                setTxupdate(hash1)
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
                    const { hash: hash0 } = await writeContract(config)
                    await waitForTransaction({ hash: hash0 })
                }
                const config2 = await prepareWriteContract({
                    address: lp,
                    abi: cmdaoAmmNpcABI,
                    functionName: 'currencyTOtoken',
                    args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseEther(tokenBoughtCurr)],
                })
                const { hash: hash1 } = await writeContract(config2)
                await waitForTransaction({ hash: hash1 })
                setTxupdate(hash1)
            }
        } catch {}
        setisLoading(false)
    }

    const removeLpUni = async (index) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = degenoCmmGem
        }
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: addr,
                abi: cmdaoAmmNpcABI,
                functionName: 'removeLiquidity',
                args: [ethers.utils.parseEther(lpSell)],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const handleAddUni = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = degenoCmmGem
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
            addr = degenoCmmGem
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
        const curr = cmmToken
        if (index === 1) {
            lp = degenoCmmGem
            token = gemToken
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
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
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
                const { hash: hash02 } = await writeContract(config2)
                await waitForTransaction({ hash: hash02 })
            }
            const config3 = await prepareWriteContract({
                address: lp,
                abi: cmdaoAmmNpcABI,
                functionName: 'addLiquidity',
                args: [ethers.utils.parseEther(tokenAdd), ethers.utils.parseEther(currAdd)],
            })
            const { hash: hash1 } = await writeContract(config3)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    React.useEffect(() => {        
        const thefetch = async () => {
            const data = await readContracts({
                contracts: [
                    {
                        address: degenoCmmGem,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: degenoCmmGem,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                ],
            })

            const _reserveCmmGem = data[0].result
            const _reserveGemCMM = data[1].result

            const data2 = await readContracts({
                contracts: [
                    {
                        address: degenoCmmGem,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveGemCMM), String(_reserveCmmGem)],
                    }
                ],
            })

            const tokensBoughtgemTOcmm = data2[0].result

            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: degenoCmmGem,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },            
                ],
            }) : [{result: 0},]

            const gemCMMlpBal = data3[0].result

            return [
                tokensBoughtgemTOcmm, gemCMMlpBal, _reserveCmmGem, _reserveGemCMM,
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
            setPriceGemCMM(Number(ethers.utils.formatEther(result[0])).toFixed(3))
            setGemCMMLpBalance(Math.floor(ethers.utils.formatEther(result[1]) * 100000) / 100000)
            setReserveGemCMM(ethers.utils.formatEther(result[2]))
            setReserveCMMGem(ethers.utils.formatEther(result[3]))
        })

    }, [address, erc20ABI, cmdaoAmmNpcABI])

    return (
        <div className="nftCard" style={{alignItems: "center", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
            <div style={{marginTop: "10px", height: "160px", width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiewvtce4l7hqx5aivvwdjpl2hbka7i2vpfwpa73idiqzckmum4mxq" width="260" alt="NPC_Degeno" />
            </div>
            {mode === 1 ?
                <div style={{width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                    <div style={{maxHeight: "75px"}}>
                        <div style={{fontSize: "20px", width: "380px"}} className="pixel">DEGENO, THE CRYPTO TRADER</div>
                        <div style={{fontSize: "10px"}} className="light">"ARE YOU DEGEN ENOUGH?</div>
                        <div style={{fontSize: "10px"}} className="light">BUY/SELL ${gasselected} - 5% TAX"</div>
                        <div style={{marginTop: "5px", width: "95%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{width: "70%", display: "flex", flexDirection: "row"}}>
                                <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "12px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                    <option value="CMM-GEM">CMM-GEM</option>
                                </select>
                                <div style={{fontSize: "16px", marginLeft: "5px", display: "flex", alignItems: "center", letterSpacing: "1px"}} className="pixel">
                                    &nbsp;1
                                    {gasselected === "CMM-GEM" && <>&nbsp; <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" width="22" alt="$HRM-GEM"/> &nbsp;=&nbsp; <div className="emp">{priceGemCMM}</div>&nbsp;<img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmWM9sbGBWM3yai8nsDsSXhE9tJZNwSwoE8XG835dJkHco" width="22" alt="$CMM"/></>}
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
                            placeholder="0.00"
                            onChange={(event) => {
                                if (gasselected === "CMM-GEM") {
                                    handleSwapUni(1, event)
                                }
                            }}
                            value={inputSwap}
                        ></input>
                        {gasselected === "CMM-GEM" && 
                            <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(gemBalance)}}; handleSwapUni(1, bal);}}>
                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" width="22" alt="$HRM-GEM"/>
                                <div style={{marginLeft: "5px"}}>{Number(gemBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                            </div>
                        }
                    </div>
                    <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                        {address !== null && address !== undefined ?
                            <div style={{width: "30px"}} className="pixel button" onClick={
                                () => {
                                    if (gasselected === "CMM-GEM") {
                                        swapTokenHandleUni(1, true)
                                    }
                                }
                            }>SELL</div> :
                            <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">SELL</div>
                        }
                        <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                            {gasselected === "CMM-GEM" && 
                                <>
                                    <div className="emp">
                                        {Number(gemBoughtCMM).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    </div>
                                    $CMM (
                                        {Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCMMGem) - ((Number(reserveCMMGem) * Number(reserveGemCMM)) / (Number(reserveGemCMM) + Number(inputSwap))))) - (Number(reserveGemCMM/reserveCMMGem))) / (Number(reserveGemCMM/reserveCMMGem))) * 100)).toFixed(2)}%</>}
                                        {Number(inputSwap) === 0 && <>0.00%</>}
                                    )
                                </>
                            }
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
                            placeholder="0.00"
                            onChange={(event) => {
                                if (gasselected === "CMM-GEM") {
                                    handleSwapUni_2(1, event)
                                }
                            }}
                            value={inputSwap2}
                        ></input>
                        {gasselected === "CMM-GEM" && 
                            <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: cmmBalance}}; handleSwapUni_2(1, bal);}}>
                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmWM9sbGBWM3yai8nsDsSXhE9tJZNwSwoE8XG835dJkHco" width="22" alt="$CMM"/>
                                <div style={{marginLeft: "5px"}}>{Number(cmmBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                            </div>
                        }
                    </div>
                    <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                        {address !== null && address !== undefined ?
                            <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                                () => {
                                    if (gasselected === "CMM-GEM") {
                                        swapTokenHandleUni(1, false)
                                    }
                                }
                            }>BUY</div> :
                            <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BUY</div>
                        }
                        <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                            {gasselected === "CMM-GEM" && 
                                <>
                                    <div style={{color: "#67BAA7"}}>
                                        {Number(tokenBoughtGemCMM).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    </div>
                                    $GEM ( 
                                        {Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveGemCMM) - ((Number(reserveGemCMM) * Number(reserveCMMGem)) / (Number(reserveCMMGem) + Number(inputSwap2))))) - (Number(reserveCMMGem/reserveGemCMM))) / (Number(reserveCMMGem/reserveGemCMM))) * 100)).toFixed(2)}%</>}
                                        {Number(inputSwap2) === 0 && <>0.00%</>}
                                    )
                                </>
                            }
                        </div>
                    </div>
                </div> :
                <></>
            }
            {mode === 2 ?
                <div style={{width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                    <div style={{maxHeight: "75px"}}>
                        <div style={{fontSize: "20px", width: "380px"}} className="pixel">DEGENO, THE CRYPTO TRADER</div>
                        <div style={{fontSize: "10px"}} className="light">"ARE YOU DEGEN ENOUGH?</div>
                        <div style={{fontSize: "10px"}} className="light">ADD/REMOVE {gasselected}-CMJ LP"</div>
                        <div style={{marginTop: "5px", width: "95%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{width: "70%", display: "flex", flexDirection: "row"}}>
                                <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "12px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                    <option value="CMM-GEM">CMM-GEM</option>
                                </select>
                                <div 
                                    style={{fontSize: "14px", marginLeft: "5px", display: "flex", alignItems: "center", cursor: "pointer"}} 
                                    className="pixel" 
                                    onClick={
                                        () => {
                                            if (gasselected === "CMM-GEM") {
                                                setLpSell(String(gemCmmLpBalance))
                                            }
                                        }
                                    }
                                >
                                    {gasselected === "CMM-GEM" && <>&nbsp;LP BALANCE:&nbsp; <div className='emp'>{Number(gemCmmLpBalance).toFixed(4)}</div></>}
                                </div>
                            </div>
                            <div style={{width: "80px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={() => setMode(1)}>SWAP NOW</div>
                        </div>
                    </div>
                    <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                    <div style={{marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                        {gasselected === "CMM-GEM" && 
                            <input 
                                style={{width: "255px", padding: "5px", border: "1px solid #dddade", fontSize: "14px"}} 
                                type="number" 
                                placeholder={"0 CMM-GEM LP"} 
                                className="bold" 
                                onChange={(event) => setLpSell(event.target.value)}
                                value={lpSell}
                            >
                            </input>
                        }
                        <div
                            style={{width: "60px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "#ff007a", color: "#fff", border: "none", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}}
                            className="button pixel"
                            onClick={() => {
                                if (gasselected === "CMM-GEM") {
                                    removeLpUni(1)
                                }
                            }}
                        >REMOVE</div>
                    </div>
                    <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                    <div style={{width: "98%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        {gasselected === "CMM-GEM" && 
                            <>
                                <input
                                    style={{width: "55%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "14px"}}
                                    className="bold"
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0 $GEM"
                                    onChange={(event) =>  handleAddUni(1, event)}
                                    value={tokenAdd}
                                ></input>
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(gemBalance)}}; handleAddUni(1, bal);}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" width="22" alt="$HRM-GEM"/>
                                    <div style={{marginLeft: "5px"}}>{Number(gemBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            </>
                        }
                    </div>
                    <div style={{width: "100%", margin: "5px", fontSize: "14px"}} className="fa fa-plus"></div>
                    <div style={{width: "98%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        {gasselected === "CMM-GEM" && 
                            <>
                                <input
                                    style={{width: "55%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "14px"}}
                                    className="bold"
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0 $CMM"
                                    onChange={(event) => handleAddUni_2(1, event)}
                                    value={currAdd}
                                ></input>
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: cmmBalance}}; handleAddUni_2(1, bal);}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmWM9sbGBWM3yai8nsDsSXhE9tJZNwSwoE8XG835dJkHco" width="22" alt="$CMM"/>
                                    <div style={{marginLeft: "5px"}}>{Number(cmmBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            </>
                        }
                    </div>
                    <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                        {address !== null && address !== undefined ?
                            <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                                () => {
                                    if (gasselected === "CMM-GEM") {
                                        addLpHandleUni(1)
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

export default BBQAmmmerchant3
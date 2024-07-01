import React from 'react'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

// const cmjToken = '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b'
const doijibToken = '0x7414e2D8Fb8466AfA4F85A240c57CB8615901FFB'
const wjbcToken = '0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747'
const woodToken = '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd'
const degenoDoijibWJBC = '0xF2c2A60F3Fcf8017fED0655F694B91a785fc170b'
const degenoDoijibWood = '0xD50855b6AdA0a796785D1a8FB08CC6F0A4662463'

const Ammmerchant3 = ({ setisLoading, setTxupdate, cmdaoAmmNpcABI, ammyStdABI, erc20ABI, cmjBalance, doijibBalance, wjbcBalance, woodBalance }) => {
    const { address } = useAccount()

    const [mode, setMode] = React.useState(1)
    const [gasselected, setGasselected] = React.useState("DOIJIB.wjbc")

    const [inputSwap, setInputSwap] = React.useState("")
    const [inputSwap2, setInputSwap2] = React.useState("")

    const [lpSell, setLpSell] = React.useState("")
    const [meowAdd, setMeowAdd] = React.useState("")
    const [cmjAdd, setCmjAdd] = React.useState("")

    const [doijibBoughtWJBC, setDoijibBoughtWJBC] = React.useState("0.000")
    const [tokenBoughtDoijibWJBC, setTokenBoughtDoijibWJBC] = React.useState("0.000")
    const [priceDoijibWJBC, setPriceDoijibWJBC] = React.useState("0.000")
    const [reserveDoijibWJBC, setReserveDoijibWJBC] = React.useState("")
    const [reserveWjbcDoijib, setReserveWjbcDoijib] = React.useState("")
    const [doijibWJBCLpBalance, setDoijibWJBCLpBalance] = React.useState("0")

    const [doijibBoughtWOOD, setDoijibBoughtWOOD] = React.useState("0.000")
    const [tokenBoughtDoijibWOOD, setTokenBoughtDoijibWOOD] = React.useState("0.000")
    const [priceDoijibWOOD, setPriceDoijibWOOD] = React.useState("0.000")
    const [reserveDoijibWOOD, setReserveDoijibWOOD] = React.useState("")
    const [reserveWoodDoijib, setReserveWoodDoijib] = React.useState("")
    const [doijibWOODLpBalance, setDoijibWOODLpBalance] = React.useState("0")

    const handleSwapUni = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = degenoDoijibWJBC
        } else if (index === 2) {
            addr = degenoDoijibWood
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
            event.target.value !== "" ? setDoijibBoughtWJBC(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setDoijibBoughtWJBC("0.000")
        } else if (index === 2) {
            event.target.value !== "" ? setDoijibBoughtWOOD(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setDoijibBoughtWOOD("0.000")
        }
    }
    const handleSwapUni_2 = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = degenoDoijibWJBC
        } else if (index === 2) {
            addr = degenoDoijibWood
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
            event.target.value !== "" ? setTokenBoughtDoijibWJBC(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setTokenBoughtDoijibWJBC("0.000")
        } else if (index === 2) {
            event.target.value !== "" ? setTokenBoughtDoijibWOOD(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setTokenBoughtDoijibWOOD("0.000")
        }
    }

    const swapTokenHandleUni = async (index, _sell) => {
        let lp = '0x0000000000000000000000000000000000000000'
        let token = '0x0000000000000000000000000000000000000000'
        let curr = '0x0000000000000000000000000000000000000000'
        let currBoughtToken = '0'
        let tokenBoughtCurr = '0'
        if (index === 1) {
            lp = degenoDoijibWJBC
            curr = wjbcToken
            token = doijibToken
            currBoughtToken = doijibBoughtWJBC
            tokenBoughtCurr = tokenBoughtDoijibWJBC
        } else if (index === 2) {
            lp = degenoDoijibWood
            curr = woodToken
            token = doijibToken
            currBoughtToken = doijibBoughtWOOD
            tokenBoughtCurr = tokenBoughtDoijibWOOD
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
            addr = degenoDoijibWJBC
        } else if (index === 2) {
            addr = degenoDoijibWood
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
            addr = degenoDoijibWJBC
        } else if (index === 2) {
            addr = degenoDoijibWood
        }
        setMeowAdd(event.target.value)
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
        event.target.value !== "" ? setCmjAdd(ethers.utils.formatEther(((bigValue.mul(bigCurrReserv)).div(bigTokenReserv)))) : setCmjAdd("")
    }
    const handleAddUni_2 = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = degenoDoijibWJBC
        } else if (index === 2) {
            addr = degenoDoijibWood
        }
        setCmjAdd(event.target.value)
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
        event.target.value !== "" ? setMeowAdd(ethers.utils.formatEther(((bigValue.mul(bigTokenReserv)).div(bigCurrReserv)))) : setMeowAdd("")
    }
    const addLpHandleUni = async (index) => {
        let lp = '0x0000000000000000000000000000000000000000'
        let token = '0x0000000000000000000000000000000000000000'
        const curr = doijibToken
        if (index === 1) {
            lp = degenoDoijibWJBC
            token = wjbcToken
        } else if (index === 2) {
            lp = degenoDoijibWood
            token = woodToken
        }
        setisLoading(true)
        try {
            const currAllow = await readContract({
                address: curr,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, lp],
            })
            const bigValue = currAllow !== "" ? ethers.BigNumber.from(ethers.utils.parseEther(cmjAdd)) : ethers.BigNumber.from(0)
            const Hex = ethers.BigNumber.from(10**8)
            const bigApprove = bigValue.mul(Hex)
            if (Number(cmjAdd) > Number(currAllow) / (10**18)) {
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
            if (Number(meowAdd) > Number(tokenAllow) / (10**18)) {
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
                args: [ethers.utils.parseEther(meowAdd), ethers.utils.parseEther(cmjAdd)],
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
                        address: degenoDoijibWJBC,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: degenoDoijibWJBC,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: degenoDoijibWood,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: degenoDoijibWood,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                ],
            })

            const _reserveCmjMEOW = 0
            const _reserveMEOW = 0
            const _reserveWjbcDoijib = data[0].result
            const _reserveDoijibWJBC = data[1].result
            const _reserveWoodDoijib = data[2].result
            const _reserveDoijibWOOD = data[3].result

            const data2 = await readContracts({
                contracts: [
                    {
                        address: degenoDoijibWJBC,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveDoijibWJBC), String(_reserveWjbcDoijib)],
                    },
                    {
                        address: degenoDoijibWood,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveDoijibWOOD), String(_reserveWoodDoijib)],
                    },
                ],
            })

            const tokensBoughtbbqTOcmj = 0
            const tokensBoughtdoijibTOwjbc = data2[0].result
            const tokensBoughtdoijibTOwood = data2[1].result

            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: degenoDoijibWJBC,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },    
                    {
                        address: degenoDoijibWood,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },                    
                ],
            }) : [{result: 0}, {result: 0}, {result: 0}, {result: 0},]

            const meowBal = 0
            const meowlpBal = 0
            const doijibWjbclpBal = data3[0].result
            const doijibWoodlpBal = data3[1].result

            return [
                tokensBoughtbbqTOcmj, meowBal, meowlpBal, _reserveCmjMEOW, _reserveMEOW,
                tokensBoughtdoijibTOwjbc, doijibWjbclpBal, _reserveWjbcDoijib, _reserveDoijibWJBC,
                tokensBoughtdoijibTOwood, doijibWoodlpBal, _reserveWoodDoijib, _reserveDoijibWOOD,
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


            setPriceDoijibWJBC(Number(ethers.utils.formatEther(result[5])).toFixed(5))
            setDoijibWJBCLpBalance(Math.floor(ethers.utils.formatEther(result[6]) * 100000) / 100000)
            setReserveWjbcDoijib(ethers.utils.formatEther(result[7]))
            setReserveDoijibWJBC(ethers.utils.formatEther(result[8]))
            
            setPriceDoijibWOOD(Number(ethers.utils.formatEther(result[9])).toFixed(0))
            setDoijibWOODLpBalance(Math.floor(ethers.utils.formatEther(result[10]) * 100000) / 100000)
            setReserveWoodDoijib(ethers.utils.formatEther(result[11]))
            setReserveDoijibWOOD(ethers.utils.formatEther(result[12]))
        })

    }, [address, erc20ABI, ammyStdABI, cmdaoAmmNpcABI])

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
                                    <option value="DOIJIB.wjbc">DOIJIB-WJBC</option>
                                    <option value="DOIJIB.wood">DOIJIB-WOOD</option>
                                </select>
                                <div style={{fontSize: "16px", marginLeft: "5px", display: "flex", alignItems: "center", letterSpacing: "1px"}} className="pixel">
                                    &nbsp;1
                                    {gasselected === "DOIJIB.wjbc" && <>&nbsp; <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="22" alt="$DOIJIB"/> &nbsp;=&nbsp; <div className="emp">{priceDoijibWJBC}</div>&nbsp;<img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" width="22" alt="$WJBC"/></>}
                                    {gasselected === "DOIJIB.wood" && <>&nbsp; <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="22" alt="$DOIJIB"/> &nbsp;=&nbsp; <div className="emp">{priceDoijibWOOD}</div>&nbsp;<img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" width="22" alt="$WOOD"/></>}
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
                                if (gasselected === "DOIJIB.wjbc") {
                                    handleSwapUni(1, event)
                                } else if (gasselected === "DOIJIB.wood") {
                                    handleSwapUni(2, event)
                                }
                            }}
                            value={inputSwap}
                        ></input>
                        {gasselected === "DOIJIB.wjbc" && 
                            <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(doijibBalance)}}; handleSwapUni(1, bal);}}>
                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="22" alt="$DOIJIB"/>
                                <div style={{marginLeft: "5px"}}>{Number(doijibBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                            </div>
                        }
                        {gasselected === "DOIJIB.wood" && 
                            <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(doijibBalance)}}; handleSwapUni(2, bal);}}>
                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="22" alt="$DOIJIB"/>
                                <div style={{marginLeft: "5px"}}>{Number(doijibBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                            </div>
                        }
                    </div>
                    <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                        {address !== null && address !== undefined ?
                            <div style={{width: "30px"}} className="pixel button" onClick={
                                () => {
                                    if (gasselected === "DOIJIB.wjbc") {
                                        swapTokenHandleUni(1, true)
                                    } else if (gasselected === "DOIJIB.wood") {
                                        swapTokenHandleUni(2, true)
                                    }
                                }
                            }>SELL</div> :
                            <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">SELL</div>
                        }
                        <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                            {gasselected === "DOIJIB.wjbc" && 
                                <>
                                    <div className="emp">
                                        {Number(doijibBoughtWJBC).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    </div>
                                    $WJBC (
                                        {Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveWjbcDoijib) - ((Number(reserveWjbcDoijib) * Number(reserveDoijibWJBC)) / (Number(reserveDoijibWJBC) + Number(inputSwap))))) - (Number(reserveDoijibWJBC/reserveWjbcDoijib))) / (Number(reserveDoijibWJBC/reserveWjbcDoijib))) * 100)).toFixed(2)}%</>}
                                        {Number(inputSwap) === 0 && <>0.00%</>}
                                    )
                                </>
                            }
                            {gasselected === "DOIJIB.wood" && 
                                <>
                                    <div className="emp">
                                        {Number(doijibBoughtWOOD).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    </div>
                                    $WOOD (
                                        {Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveWoodDoijib) - ((Number(reserveWoodDoijib) * Number(reserveDoijibWOOD)) / (Number(reserveDoijibWOOD) + Number(inputSwap))))) - (Number(reserveDoijibWOOD/reserveWoodDoijib))) / (Number(reserveDoijibWOOD/reserveWoodDoijib))) * 100)).toFixed(2)}%</>}
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
                                if (gasselected === "DOIJIB.wjbc") {
                                    handleSwapUni_2(1, event)
                                } else if (gasselected === "DOIJIB.wood") {
                                    handleSwapUni_2(2, event)
                                }
                            }}
                            value={inputSwap2}
                        ></input>
                        {gasselected === "DOIJIB.wjbc" && 
                            <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: wjbcBalance}}; handleSwapUni_2(1, bal);}}>
                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" width="22" alt="$WJBC"/>
                                <div style={{marginLeft: "5px"}}>{Number(wjbcBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                            </div>
                        }
                        {gasselected === "DOIJIB.wood" && 
                            <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: woodBalance}}; handleSwapUni_2(2, bal);}}>
                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" width="22" alt="$WOOD"/>
                                <div style={{marginLeft: "5px"}}>{Number(woodBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                            </div>
                        }
                    </div>
                    <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                        {address !== null && address !== undefined ?
                            <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                                () => {
                                    if (gasselected === "DOIJIB.wjbc") {
                                        swapTokenHandleUni(1, false)
                                    } else if (gasselected === "DOIJIB.wood") {
                                        swapTokenHandleUni(2, false)
                                    }
                                }
                            }>BUY</div> :
                            <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BUY</div>
                        }
                        <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                            {gasselected === "DOIJIB.wjbc" && 
                                <>
                                    <div style={{color: "#67BAA7"}}>
                                        {Number(tokenBoughtDoijibWJBC).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    </div>
                                    $DOIJIB ( 
                                        {Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveDoijibWJBC) - ((Number(reserveDoijibWJBC) * Number(reserveWjbcDoijib)) / (Number(reserveWjbcDoijib) + Number(inputSwap2))))) - (Number(reserveWjbcDoijib/reserveDoijibWJBC))) / (Number(reserveWjbcDoijib/reserveDoijibWJBC))) * 100)).toFixed(2)}%</>}
                                        {Number(inputSwap2) === 0 && <>0.00%</>}
                                    )
                                </>
                            }
                            {gasselected === "DOIJIB.wood" && 
                                <>
                                    <div style={{color: "#67BAA7"}}>
                                        {Number(tokenBoughtDoijibWOOD).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    </div>
                                    $DOIJIB ( 
                                        {Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveDoijibWOOD) - ((Number(reserveDoijibWOOD) * Number(reserveWoodDoijib)) / (Number(reserveWoodDoijib) + Number(inputSwap2))))) - (Number(reserveWoodDoijib/reserveDoijibWOOD))) / (Number(reserveWoodDoijib/reserveDoijibWOOD))) * 100)).toFixed(2)}%</>}
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
                                    <option value="DOIJIB.wjbc">DOIJIB-WJBC</option>
                                    <option value="DOIJIB.wood">DOIJIB-WOOD</option>
                                </select>
                                <div 
                                    style={{fontSize: "14px", marginLeft: "5px", display: "flex", alignItems: "center", cursor: "pointer"}} 
                                    className="pixel" 
                                    onClick={
                                        () => {
                                            if (gasselected === "DOIJIB.wjbc") {
                                                setLpSell(String(doijibWJBCLpBalance))
                                            } else if (gasselected === "DOIJIB.wood") {
                                                setLpSell(String(doijibWOODLpBalance))
                                            }
                                        }
                                    }
                                >
                                    {gasselected === "DOIJIB.wjbc" && <>&nbsp;LP BALANCE:&nbsp; <div className='emp'>{Number(doijibWJBCLpBalance).toFixed(4)}</div></>}
                                    {gasselected === "DOIJIB.wood" && <>&nbsp;LP BALANCE:&nbsp; <div className='emp'>{Number(doijibWOODLpBalance).toFixed(4)}</div></>}
                                </div>
                            </div>
                            <div style={{width: "80px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={() => setMode(1)}>SWAP NOW</div>
                        </div>
                    </div>
                    <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                    <div style={{marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                        {gasselected === "DOIJIB.wjbc" && 
                            <input 
                                style={{width: "255px", padding: "5px", border: "1px solid #dddade", fontSize: "14px"}} 
                                type="number" 
                                placeholder={"0 DOIJIB-WJBC LP"} 
                                className="bold" 
                                onChange={(event) => setLpSell(event.target.value)}
                                value={lpSell}
                            >
                            </input>
                        }
                        {gasselected === "DOIJIB.wood" && 
                            <input 
                                style={{width: "255px", padding: "5px", border: "1px solid #dddade", fontSize: "14px"}} 
                                type="number" 
                                placeholder={"0 DOIJIB-WOOD LP"} 
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
                                if (gasselected === "DOIJIB.wjbc") {
                                    removeLpUni(1)
                                } else if (gasselected === "DOIJIB.wood") {
                                    removeLpUni(2)
                                }
                            }}
                        >REMOVE</div>
                    </div>
                    <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                    <div style={{width: "98%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        {gasselected === "DOIJIB.wjbc" && 
                            <>
                                <input
                                    style={{width: "55%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "14px"}}
                                    className="bold"
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0 $DOIJIB"
                                    onChange={(event) =>  handleAddUni(1, event)}
                                    value={meowAdd}
                                ></input>
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(doijibBalance)}}; handleAddUni(1, bal);}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="22" alt="$DOIJIB"/>
                                    <div style={{marginLeft: "5px"}}>{Number(doijibBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            </>
                        }
                        {gasselected === "DOIJIB.wood" && 
                            <>
                                <input
                                    style={{width: "55%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "14px"}}
                                    className="bold"
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0 $DOIJIB"
                                    onChange={(event) => handleAddUni(2, event)}
                                    value={meowAdd}
                                ></input>
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(doijibBalance)}}; handleAddUni(2, bal);}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="22" alt="$DOIJIB"/>
                                    <div style={{marginLeft: "5px"}}>{Number(doijibBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            </>
                        }
                    </div>
                    <div style={{width: "100%", margin: "5px", fontSize: "14px"}} className="fa fa-plus"></div>
                    <div style={{width: "98%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        {gasselected === "DOIJIB.wjbc" && 
                            <>
                                <input
                                    style={{width: "55%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "14px"}}
                                    className="bold"
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0 $WJBC"
                                    onChange={(event) => handleAddUni_2(1, event)}
                                    value={cmjAdd}
                                ></input>
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: wjbcBalance}}; handleAddUni_2(1, bal);}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" width="22" alt="$WJBC"/>
                                    <div style={{marginLeft: "5px"}}>{Number(wjbcBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            </>
                        }
                        {gasselected === "DOIJIB.wood" && 
                            <>
                                <input
                                    style={{width: "55%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "14px"}}
                                    className="bold"
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0 $WJBC"
                                    onChange={(event) => handleAddUni_2(2, event)}
                                    value={cmjAdd}
                                ></input>
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: woodBalance}}; handleAddUni_2(2, bal);}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" width="22" alt="$WOOD"/>
                                    <div style={{marginLeft: "5px"}}>{Number(woodBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                            </>
                        }
                    </div>
                    <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                        {address !== null && address !== undefined ?
                            <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                                () => {
                                    if (gasselected === "DOIJIB.wjbc") {
                                        addLpHandleUni(1)
                                    } else if (gasselected === "DOIJIB.wood") {
                                        addLpHandleUni(2)
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
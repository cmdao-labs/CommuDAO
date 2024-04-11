import React from 'react'

import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const ctunaLab = "0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0"
const sx31Lab = '0xd431d826d7a4380b9259612176f00528b88840a7'
const bbqToken = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const pzaToken = '0x09DcdCFc6C48803681a3422997c679E773656763'
const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"

const ammyCTUNA = "0x7801F8cdBABE6999331d1Bf37d74aAf713C3722F"
const ammySX31 = '0xda558EE93B466aEb4F59fBf95D25d410318be43A'
const ammyBBQ = '0x6F93F16cF86205C5BB9145078d584c354758D6DB'
const ammyPZA = '0x3161EE630bF36d2AB6333a9CfD22ebaa3e2D7C70'

const Ammmerchant = ({ setisLoading, setTxupdate, cmdaoAmmNpcABI, erc20ABI, ctunaBalance, sx31Balance, bbqBalance, pzaBalance, cmjBalance }) => {
    const { address } = useAccount()

    const [gasselected, setGasselected] = React.useState("BBQ");

    const [inputSwap, setInputSwap] = React.useState("")
    const [inputSwap2, setInputSwap2] = React.useState("")

    const [cmjBought, setCmjBought] = React.useState("0.000")
    const [ctunaBought, setCtunaBought] = React.useState("0.000")
    const [priceCTUNA, setPriceCTUNA] = React.useState("0.000")
    const [reserveCmjCTUNA, setReserveCmjCTUNA] = React.useState("")
    const [reserveCTUNA, setReserveCTUNA] = React.useState("")

    const [cmjBought2, setCmjBought2] = React.useState("0.000")
    const [tokenBought, setTokenBought] = React.useState("0.000")
    const [priceSX31, setPriceSX31] = React.useState("0.000")
    const [reserveCmjSX31, setReserveCmjSX31] = React.useState("")
    const [reserveSX31, setReserveSX31] = React.useState("")

    const [cmjBought3, setCmjBought3] = React.useState("0.000")
    const [tokenBought3, setTokenBought3] = React.useState("0.000")
    const [priceBBQ, setPriceBBQ] = React.useState("0.000")
    const [reserveCmjBBQ, setReserveCmjBBQ] = React.useState("")
    const [reserveBBQ, setReserveBBQ] = React.useState("")

    const [cmjBoughtPZA, setCmjBoughtPZA] = React.useState("0.000")
    const [tokenBoughtPZA, setTokenBoughtPZA] = React.useState("0.000")
    const [pricePZA, setPricePZA] = React.useState("0.000")
    const [reserveCmjPZA, setReserveCmjPZA] = React.useState("")
    const [reservePZA, setReservePZA] = React.useState("")

    const handleSwapUni = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = ammyBBQ
        } else if (index === 2) {
            addr = ammyCTUNA
        } else if (index === 3) {
            addr = ammySX31
        } else if (index === 4) {
            addr = ammyPZA
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
            event.target.value !== "" ? setCmjBought3(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setCmjBought3("0.000")
        } else if (index === 2) {
            event.target.value !== "" ? setCmjBought(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setCmjBought("0.000")
        } else if (index === 3) {
            event.target.value !== "" ? setCmjBought2(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setCmjBought2("0.000")
        } else if (index === 4) {
            event.target.value !== "" ? setCmjBoughtPZA(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setCmjBoughtPZA("0.000")
        }
    }
    const handleSwapUni_2 = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = ammyBBQ
        } else if (index === 2) {
            addr = ammyCTUNA
        } else if (index === 3) {
            addr = ammySX31
        } else if (index === 4) {
            addr = ammyPZA
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
            event.target.value !== "" ? setTokenBought3(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setTokenBought3("0.000")
        } else if (index === 2) {
            event.target.value !== "" ? setCtunaBought(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setCtunaBought("0.000")
        } else if (index === 3) {
            event.target.value !== "" ? setTokenBought(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setTokenBought("0.000")
        } else if (index === 4) {
            event.target.value !== "" ? setTokenBoughtPZA(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setTokenBoughtPZA("0.000")
        }
    }

    const swapTokenHandleUni = async (index, _sell) => {
        let lp = '0x0000000000000000000000000000000000000000'
        let token = '0x0000000000000000000000000000000000000000'
        let curr = cmjToken
        let currBoughtToken = '0'
        let tokenBoughtCurr = '0'
        if (index === 1) {
            lp = ammyBBQ
            token = bbqToken
            currBoughtToken = cmjBought3
            tokenBoughtCurr = tokenBought3
        } else if (index === 2) {
            lp = ammyCTUNA
            token = ctunaLab
            currBoughtToken = cmjBought
            tokenBoughtCurr = ctunaBought
        } else if (index === 3) {
            lp = ammySX31
            token = sx31Lab
            currBoughtToken = cmjBought2
            tokenBoughtCurr = tokenBought
        } else if (index === 4) {
            lp = ammyPZA
            token = pzaToken
            currBoughtToken = cmjBoughtPZA
            tokenBoughtCurr = tokenBoughtPZA
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

    React.useEffect(() => {        
        const thefetch = async () => {
            const data = await readContracts({
                contracts: [
                    {
                        address: ammyCTUNA,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: ammyCTUNA,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: ammySX31,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: ammySX31,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: ammyBBQ,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: ammyBBQ,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: ammyPZA,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: ammyPZA,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    }
                ],
            })

            const _reserveCmj = data[0].result
            const _reserveCtuna = data[1].result
            const _reserveCmj2 = data[2].result
            const _reserveSX31 = data[3].result
            const _reserveCmj3 = data[4].result
            const _reserveBBQ = data[5].result
            const _reserveCmj4 = data[6].result
            const _reservePZA = data[7].result

            const data2 = await readContracts({
                contracts: [
                    {
                        address: ammyCTUNA,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveCtuna), String(_reserveCmj)],
                    },
                    {
                        address: ammySX31,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveSX31), String(_reserveCmj2)],
                    },
                    {
                        address: ammyBBQ,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveBBQ), String(_reserveCmj3)],
                    },
                    {
                        address: ammyPZA,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reservePZA), String(_reserveCmj4)],
                    }
                ],
            })

            const tokensBoughtctunaTOcmj = data2[0].result
            const tokensBoughtsx31TOcmj = data2[1].result
            const tokensBoughtbbqTOcmj = data2[2].result
            const tokensBoughtpzaTOcmj = data2[3].result

            return [tokensBoughtctunaTOcmj, tokensBoughtsx31TOcmj, tokensBoughtbbqTOcmj, tokensBoughtpzaTOcmj, _reserveCmj, _reserveCtuna, _reserveCmj2, _reserveSX31, _reserveCmj3, _reserveBBQ, _reserveCmj4, _reservePZA, ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setPriceCTUNA(Number(ethers.utils.formatEther(result[0])).toFixed(3))
            setPriceSX31(Number(ethers.utils.formatEther(result[1])).toFixed(3))
            setPriceBBQ(Number(ethers.utils.formatEther(result[2])).toFixed(8))
            setPricePZA(Number(ethers.utils.formatEther(result[3])).toFixed(8))

            setReserveCmjCTUNA(ethers.utils.formatEther(result[4]))
            setReserveCTUNA(ethers.utils.formatEther(result[5]))
            setReserveCmjSX31(ethers.utils.formatEther(result[6]))
            setReserveSX31(ethers.utils.formatEther(result[7]))
            setReserveCmjBBQ(ethers.utils.formatEther(result[8]))
            setReserveBBQ(ethers.utils.formatEther(result[9]))
            setReserveCmjPZA(ethers.utils.formatEther(result[10]))
            setReservePZA(ethers.utils.formatEther(result[11]))
        })

    }, [address, erc20ABI, cmdaoAmmNpcABI])

    return (
        <div className="nftCard" style={{alignItems: "center", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
            <div style={{marginTop: "10px", width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                <div style={{height: "160px", width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                    <img src="https://nftstorage.link/ipfs/bafybeihcyrsclfqjwflnaf4jtaylpvevgzhe5wwf2bqrih4vm3r2kyhmh4" width="260" alt="NPC_Ammy" />
                </div>
                <div style={{maxHeight: "75px"}}>
                    <div style={{fontSize: "20px", width: "380px"}} className="pixel">AMMY, THE GAS MERCHANT</div>
                    <div style={{fontSize: "10px", marginTop: "5px"}} className="light">"HI! DO YOU HAVE SOME ${gasselected} FOR ME ?</div>
                    <div style={{fontSize: "10px"}} className="light">AHHH, I WILL GET [5% MERCHANT FEE] FOR ANY TRADE."</div>
                    <div style={{marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                            <option value="CTUNA">CTUNA</option>
                            <option value="SX31">SX31</option>
                            <option value="BBQ">BBQ</option>
                            <option value="PZA">PZA</option>
                        </select>
                        <div style={{fontSize: "16px", marginLeft: "5px", display: "flex", alignItems: "center", letterSpacing: "1px"}} className="pixel">
                            &nbsp;1
                            {gasselected === "CTUNA" ? <>&nbsp;<img src="https://nftstorage.link/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i" width="22" alt="$CTUNA"/> &nbsp;=&nbsp; <div className="emp">{priceCTUNA}</div></> : ''}
                            {gasselected === "SX31" ? <>&nbsp;<img src="https://nftstorage.link/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4" width="22" alt="$SX31"/> &nbsp;=&nbsp; <div className="emp">{priceSX31}</div></> : ''}
                            {gasselected === "BBQ" ? <>&nbsp;<img src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" width="22" alt="$BBQ"/> &nbsp;=&nbsp; <div className="emp">{priceBBQ}</div></> : ''}
                            {gasselected === "PZA" ? <>&nbsp;<img src="https://nftstorage.link/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu" width="22" alt="$PZA"/> &nbsp;=&nbsp; <div className="emp">{pricePZA}</div></> : ''}
                            &nbsp;<img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="22" alt="$CMJ"/>
                        </div>
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
                            if (gasselected === "CTUNA") {
                                handleSwapUni(2, event)
                            } else if (gasselected === "SX31") {
                                handleSwapUni(3, event)
                            } else if (gasselected === "BBQ") {
                                handleSwapUni(1, event)
                            } else if (gasselected === "PZA") {
                                handleSwapUni(4, event)
                            }
                        }}
                        value={inputSwap}
                    ></input>
                    {gasselected === "CTUNA" && 
                        <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: ctunaBalance}}; handleSwapUni(2, bal);}}>
                            <img src="https://nftstorage.link/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i" width="22" alt="$CTUNA"/>
                            <div style={{marginLeft: "5px"}}>{Number(ctunaBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                        </div>
                    }
                    {gasselected === "SX31" && 
                        <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: sx31Balance}}; handleSwapUni(3, bal);}}>
                            <img src="https://nftstorage.link/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4" width="22" alt="$SX31"/>
                            <div style={{marginLeft: "5px"}}>{Number(sx31Balance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                        </div>
                    }
                    {gasselected === "BBQ" && 
                        <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: bbqBalance}}; handleSwapUni(1, bal);}}>
                            <img src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" width="22" alt="$BBQ"/>
                            <div style={{marginLeft: "5px"}}>{Number(bbqBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                        </div>
                    }
                    {gasselected === "PZA" && 
                        <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: pzaBalance}}; handleSwapUni(4, bal);}}>
                            <img src="https://nftstorage.link/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu" width="22" alt="$PZA"/>
                            <div style={{marginLeft: "5px"}}>{Number(pzaBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                        </div>
                    }
                </div>
                <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                    {address !== null && address !== undefined ?
                        <div style={{width: "30px"}} className="pixel button" onClick={
                            () => {
                                if (gasselected === "CTUNA") {
                                    swapTokenHandleUni(2, true)
                                } else if (gasselected === "SX31") {
                                    swapTokenHandleUni(3, true)
                                } else if (gasselected === "BBQ") {
                                    swapTokenHandleUni(1, true)
                                } else if (gasselected === "PZA") {
                                    swapTokenHandleUni(4, true)
                                }
                            }
                        }>SELL</div> :
                        <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">SELL</div>
                    }
                    <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                        <div className="emp">
                            {gasselected === "CTUNA" && Number(cmjBought).toLocaleString('en-US', {maximumFractionDigits:3})}
                            {gasselected === "SX31" && Number(cmjBought2).toLocaleString('en-US', {maximumFractionDigits:3})}
                            {gasselected === "BBQ" && Number(cmjBought3).toLocaleString('en-US', {maximumFractionDigits:3})}
                            {gasselected === "PZA" && Number(cmjBoughtPZA).toLocaleString('en-US', {maximumFractionDigits:3})}
                        </div>
                        $CMJ (
                            {gasselected === "CTUNA" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjCTUNA) - ((Number(reserveCmjCTUNA) * Number(reserveCTUNA)) / (Number(reserveCTUNA) + Number(inputSwap))))) - (Number(reserveCTUNA/reserveCmjCTUNA))) / (Number(reserveCTUNA/reserveCmjCTUNA))) * 100)).toFixed(2)}%</>}
                            {gasselected === "SX31" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjSX31) - ((Number(reserveCmjSX31) * Number(reserveSX31)) / (Number(reserveSX31) + Number(inputSwap))))) - (Number(reserveSX31/reserveCmjSX31))) / (Number(reserveSX31/reserveCmjSX31))) * 100)).toFixed(2)}%</>}
                            {gasselected === "BBQ" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjBBQ) - ((Number(reserveCmjBBQ) * Number(reserveBBQ)) / (Number(reserveBBQ) + Number(inputSwap))))) - (Number(reserveBBQ/reserveCmjBBQ))) / (Number(reserveBBQ/reserveCmjBBQ))) * 100)).toFixed(2)}%</>}
                            {gasselected === "PZA" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjPZA) - ((Number(reserveCmjPZA) * Number(reservePZA)) / (Number(reservePZA) + Number(inputSwap))))) - (Number(reservePZA/reserveCmjPZA))) / (Number(reservePZA/reserveCmjPZA))) * 100)).toFixed(2)}%</>}
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
                        placeholder="0 $CMJ"
                        onChange={(event) => {
                            if (gasselected === "CTUNA") {
                                handleSwapUni_2(2, event)
                            } else if (gasselected === "SX31") {
                                handleSwapUni_2(3, event)
                            } else if (gasselected === "BBQ") {
                                handleSwapUni_2(1, event)
                            } else if (gasselected === "PZA") {
                                handleSwapUni_2(4, event)
                            }
                        }}
                        value={inputSwap2}
                    ></input>
                    <div
                        style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}}
                        onClick={() => {
                            const bal = {target: {value: cmjBalance}};
                            if (gasselected === "CTUNA") {
                                handleSwapUni_2(2, bal)
                            } else if (gasselected === "SX31") {
                                handleSwapUni_2(3, bal)
                            } else if (gasselected === "BBQ") {
                                handleSwapUni_2(1, bal)
                            } else if (gasselected === "PZA") {
                                handleSwapUni_2(4, bal)
                            }
                        }}
                    >
                        <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="22" alt="$CMJ"/>
                        <div style={{marginLeft: "5px"}}>{Number(cmjBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                    </div>
                </div>
                <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                    {address !== null && address !== undefined ?
                        <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                            () => {
                                if (gasselected === "CTUNA") {
                                    swapTokenHandleUni(2, false)
                                } else if (gasselected === "SX31") {
                                    swapTokenHandleUni(3, false)
                                } else if (gasselected === "BBQ") {
                                    swapTokenHandleUni(1, false)
                                } else if (gasselected === "PZA") {
                                    swapTokenHandleUni(4, false)
                                }
                            }
                        }>BUY</div> :
                        <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BUY</div>
                    }
                    <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                        <div style={{color: "#67BAA7"}}>
                            {gasselected === "CTUNA" && Number(ctunaBought).toLocaleString('en-US', {maximumFractionDigits:3})}
                            {gasselected === "SX31" && Number(tokenBought).toLocaleString('en-US', {maximumFractionDigits:3})}
                            {gasselected === "BBQ" && Number(tokenBought3).toLocaleString('en-US', {maximumFractionDigits:3})}
                            {gasselected === "PZA" && Number(tokenBoughtPZA).toLocaleString('en-US', {maximumFractionDigits:3})}
                        </div>
                        ${gasselected} (
                            {gasselected === "CTUNA" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveCTUNA) - ((Number(reserveCTUNA) * Number(reserveCmjCTUNA)) / (Number(reserveCmjCTUNA) + Number(inputSwap2))))) - (Number(reserveCmjCTUNA/reserveCTUNA))) / (Number(reserveCmjCTUNA/reserveCTUNA))) * 100)).toFixed(2)}%</>}
                            {gasselected === "SX31" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveSX31) - ((Number(reserveSX31) * Number(reserveCmjSX31)) / (Number(reserveCmjSX31) + Number(inputSwap2))))) - (Number(reserveCmjSX31/reserveSX31))) / (Number(reserveCmjSX31/reserveSX31))) * 100)).toFixed(2)}%</>}
                            {gasselected === "BBQ" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveBBQ) - ((Number(reserveBBQ) * Number(reserveCmjBBQ)) / (Number(reserveCmjBBQ) + Number(inputSwap2))))) - (Number(reserveCmjBBQ/reserveBBQ))) / (Number(reserveCmjBBQ/reserveBBQ))) * 100)).toFixed(2)}%</>}
                            {gasselected === "PZA" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reservePZA) - ((Number(reservePZA) * Number(reserveCmjPZA)) / (Number(reserveCmjPZA) + Number(inputSwap2))))) - (Number(reserveCmjPZA/reservePZA))) / (Number(reserveCmjPZA/reservePZA))) * 100)).toFixed(2)}%</>}
                            {Number(inputSwap2) === 0 && <>0.00%</>}
                        )
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ammmerchant
import React from 'react'

import { readContract, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const ctunaLab = "0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0"
const sx31Lab = '0xd431d826d7a4380b9259612176f00528b88840a7'
const bbqToken = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const ammyCTUNA = "0x0C576Fe27F024C498695e73279412C837D9Ea773"
const ammySX31 = '0x7B022df5b181b720BE5706B2ECCdC3c26C8322e5'
const ammyBBQ = '0x01E856D31a7fdb2405c20c493C172A6AD6f1Bcaa'

const Ammmerchant = ({ setisLoading, setTxupdate, ammyABI, ammyStdABI, erc20ABI }) => {
    const { address } = useAccount()

    const [gasselected, setGasselected] = React.useState("BBQ");

    const [inputSwap, setInputSwap] = React.useState("")
    const [inputSwap2, setInputSwap2] = React.useState("")

    const [cmjBought, setCmjBought] = React.useState("0.000")
    const [ctunaBought, setCtunaBought] = React.useState("0.000")
    const [priceCTUNA, setPriceCTUNA] = React.useState("0.000")

    const [cmjBought2, setCmjBought2] = React.useState("0.000")
    const [tokenBought, setTokenBought] = React.useState("0.000")
    const [priceSX31, setPriceSX31] = React.useState("0.000")

    const [cmjBought3, setCmjBought3] = React.useState("0.000")
    const [tokenBought3, setTokenBought3] = React.useState("0.000")
    const [priceBBQ, setPriceBBQ] = React.useState("0.000")

    const handleSwap = async (event) => {
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const _reserveCmj = await readContract({
            address: ammyCTUNA,
            abi: ammyABI,
            functionName: 'getReserveCMJ',
        })
        const _reserveCtuna = await readContract({
            address: ammyCTUNA,
            abi: ammyABI,
            functionName: 'getReserveCTUNA',
        })
        const tokensBoughtctunaTOcmj = await readContract({
            address: ammyCTUNA,
            abi: ammyABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCtuna), String(_reserveCmj)],
        })
        event.target.value !== "" ? setCmjBought(ethers.utils.formatEther(tokensBoughtctunaTOcmj)) : setCmjBought("0.000")
    }

    const handleSwap2 = async (event) => {
        setInputSwap2(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const _reserveCmj = await readContract({
            address: ammyCTUNA,
            abi: ammyABI,
            functionName: 'getReserveCMJ',
        })
        const _reserveCtuna = await readContract({
            address: ammyCTUNA,
            abi: ammyABI,
            functionName: 'getReserveCTUNA',
        })
        const tokensBoughtcmjTOctuna = await readContract({
            address: ammyCTUNA,
            abi: ammyABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCmj), String(_reserveCtuna)],
        })
        event.target.value !== "" ? setCtunaBought(ethers.utils.formatEther(tokensBoughtcmjTOctuna)) : setCtunaBought("0.000")
    }

    const handleSwapSX31 = async (event) => {
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const _reserveCmj = await readContract({
            address: ammySX31,
            abi: ammyStdABI,
            functionName: 'getReserveCMJ',
        })
        const _reserveToken = await readContract({
            address: ammySX31,
            abi: ammyStdABI,
            functionName: 'getReserveToken',
        })
        const tokensBoughttokenTOcmj = await readContract({
            address: ammySX31,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveToken), String(_reserveCmj)],
        })
        event.target.value !== "" ? setCmjBought2(ethers.utils.formatEther(tokensBoughttokenTOcmj)) : setCmjBought2("0.000")
    }
    const handleSwapSX31_2 = async (event) => {
        setInputSwap2(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const _reserveCmj = await readContract({
            address: ammySX31,
            abi: ammyStdABI,
            functionName: 'getReserveCMJ',
        })
        const _reserveToken = await readContract({
            address: ammySX31,
            abi: ammyStdABI,
            functionName: 'getReserveToken',
        })
        const tokensBoughtcmjTOtoken = await readContract({
            address: ammySX31,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCmj), String(_reserveToken)],
        })
        event.target.value !== "" ? setTokenBought(ethers.utils.formatEther(tokensBoughtcmjTOtoken)) : setTokenBought("0.000")
    }

    const handleSwapBBQ = async (event) => {
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const _reserveCmj = await readContract({
            address: ammyBBQ,
            abi: ammyStdABI,
            functionName: 'getReserveCMJ',
        })
        const _reserveToken = await readContract({
            address: ammyBBQ,
            abi: ammyStdABI,
            functionName: 'getReserveToken',
        })
        const tokensBoughttokenTOcmj = await readContract({
            address: ammyBBQ,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveToken), String(_reserveCmj)],
        })
        event.target.value !== "" ? setCmjBought3(ethers.utils.formatEther(tokensBoughttokenTOcmj)) : setCmjBought3("0.000")
    }
    const handleSwapBBQ_2 = async (event) => {
        setInputSwap2(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const _reserveCmj = await readContract({
            address: ammyBBQ,
            abi: ammyStdABI,
            functionName: 'getReserveCMJ',
        })
        const _reserveToken = await readContract({
            address: ammyBBQ,
            abi: ammyStdABI,
            functionName: 'getReserveToken',
        })
        const tokensBoughtcmjTOtoken = await readContract({
            address: ammyBBQ,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCmj), String(_reserveToken)],
        })
        event.target.value !== "" ? setTokenBought3(ethers.utils.formatEther(tokensBoughtcmjTOtoken)) : setTokenBought3("0.000")
    }

    const swapTokenHandle = async (_sell) => {
        setisLoading(true)
        if (_sell) {
            const ctunaAllow = await readContract({
                address: ctunaLab,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, ammyCTUNA],
            })
            const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap))
            const Hex = ethers.BigNumber.from(10**8)
            const bigApprove = bigValue.mul(Hex)
            if (Number(inputSwap) > Number(ctunaAllow) / (10**18)) {
                try {
                    const config = await prepareWriteContract({
                        address: ctunaLab,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [ammyCTUNA, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                } catch {}
            }
            try {
                const config = await prepareWriteContract({
                    address: ammyCTUNA,
                    abi: ammyABI,
                    functionName: 'ctunaTOcmj',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(cmjBought)],
                })
                const tx = await writeContract(config)
                await tx.wait()
                setTxupdate(tx)
            } catch {}
        } else {
            const cmjAllow = await readContract({
                address: cmjToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, ammyCTUNA],
            })
            const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap2))
            const Hex = ethers.BigNumber.from(10**8)
            const bigApprove = bigValue.mul(Hex)
            if (Number(ethers.utils.parseEther(inputSwap2)) > Number(cmjAllow)) {
                try {
                    const config = await prepareWriteContract({
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [ammyCTUNA, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                } catch {}
            }
            try {
                const config2 = await prepareWriteContract({
                    address: ammyCTUNA,
                    abi: ammyABI,
                    functionName: 'cmjTOctuna',
                    args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseEther(ctunaBought)],
                })
                const tx = await writeContract(config2)
                await tx.wait()
                setTxupdate(tx)
            } catch {}
        }
        setisLoading(false)
    }

    const swapTokenHandle2 = async (_sell) => {
        setisLoading(true)
        try {
            if (_sell) {
                const tokenAllow = await readContract({
                    address: sx31Lab,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, ammySX31],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(inputSwap) > Number(tokenAllow) / (10**18)) {
                    const config = await prepareWriteContract({
                        address: sx31Lab,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [ammySX31, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config = await prepareWriteContract({
                    address: ammySX31,
                    abi: ammyStdABI,
                    functionName: 'tokenTOcmj',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(cmjBought2)],
                })
                const tx = await writeContract(config)
                await tx.wait()
                setTxupdate(tx)
            } else {
                const cmjAllow = await readContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, ammySX31],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap2))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(ethers.utils.parseEther(inputSwap2)) > Number(cmjAllow)) {
                    const config = await prepareWriteContract({
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [ammySX31, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config2 = await prepareWriteContract({
                    address: ammySX31,
                    abi: ammyStdABI,
                    functionName: 'cmjTOtoken',
                    args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseEther(tokenBought)],
                })
                const tx = await writeContract(config2)
                await tx.wait()
                setTxupdate(tx)
            }
        } catch {}
        setisLoading(false)
    }

    const swapTokenHandle3 = async (_sell) => {
        setisLoading(true)
        try {
            if (_sell) {
                const tokenAllow = await readContract({
                    address: bbqToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, ammyBBQ],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(inputSwap) > Number(tokenAllow) / (10**18)) {
                    const config = await prepareWriteContract({
                        address: bbqToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [ammyBBQ, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config = await prepareWriteContract({
                    address: ammyBBQ,
                    abi: ammyStdABI,
                    functionName: 'tokenTOcmj',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(cmjBought3)],
                })
                const tx = await writeContract(config)
                await tx.wait()
                setTxupdate(tx)
            } else {
                const cmjAllow = await readContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, ammyBBQ],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap2))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(ethers.utils.parseEther(inputSwap2)) > Number(cmjAllow)) {
                    const config = await prepareWriteContract({
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [ammyBBQ, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config2 = await prepareWriteContract({
                    address: ammyBBQ,
                    abi: ammyStdABI,
                    functionName: 'cmjTOtoken',
                    args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseEther(tokenBought3)],
                })
                const tx = await writeContract(config2)
                await tx.wait()
                setTxupdate(tx)
            }
        } catch {}
        setisLoading(false)
    }

    React.useEffect(() => {        
        const thefetch = async () => {
            const _reserveCmj = await readContract({
                address: ammyCTUNA,
                abi: ammyABI,
                functionName: 'getReserveCMJ',
            })
            const _reserveCtuna = await readContract({
                address: ammyCTUNA,
                abi: ammyABI,
                functionName: 'getReserveCTUNA',
            })
            const tokensBoughtctunaTOcmj = await readContract({
                address: ammyCTUNA,
                abi: ammyABI,
                functionName: 'getAmountOfTokens',
                args: [String(10**18), String(_reserveCtuna), String(_reserveCmj)],
            })

            const _reserveCmj2 = await readContract({
                address: ammySX31,
                abi: ammyStdABI,
                functionName: 'getReserveCMJ',
            })
            const _reserveSX31 = await readContract({
                address: ammySX31,
                abi: ammyStdABI,
                functionName: 'getReserveToken',
            })
            const tokensBoughtsx31TOcmj = await readContract({
                address: ammySX31,
                abi: ammyStdABI,
                functionName: 'getAmountOfTokens',
                args: [String(10**18), String(_reserveSX31), String(_reserveCmj2)],
            })

            const _reserveCmj3 = await readContract({
                address: ammyBBQ,
                abi: ammyStdABI,
                functionName: 'getReserveCMJ',
            })
            const _reserveBBQ = await readContract({
                address: ammyBBQ,
                abi: ammyStdABI,
                functionName: 'getReserveToken',
            })
            const tokensBoughtbbqTOcmj = await readContract({
                address: ammyBBQ,
                abi: ammyStdABI,
                functionName: 'getAmountOfTokens',
                args: [String(10**18), String(_reserveBBQ), String(_reserveCmj3)],
            })

            return [tokensBoughtctunaTOcmj, tokensBoughtsx31TOcmj, tokensBoughtbbqTOcmj]
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
            setPriceBBQ(Number(ethers.utils.formatEther(result[2])).toFixed(3))
        })

    }, [address, erc20ABI, ammyABI, ammyStdABI])

    return (
        <div className="nftCard" style={{alignItems: "center", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}}>
            <img src="../elements/ammy.png" height="160" alt="NPC_Ammy"/>
                <div style={{marginTop: "10px", width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                    <div style={{maxHeight: "75px"}}>
                        <div style={{fontSize: "20px", width: "380px"}} className="pixel emp">NPC AMMY THE GAS MERCHANT</div>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <select style={{padding: "1px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                <option value="CTUNA">$CTUNA</option>
                                <option value="SX31">$SX31</option>
                                <option value="BBQ">$BBQ</option>
                            </select>
                            <div style={{fontSize: "16px", marginLeft: "5px"}} className="pixel">
                                (Price:&nbsp;
                                {gasselected === "CTUNA" ? priceCTUNA : ''}
                                {gasselected === "SX31" ? priceSX31 : ''}
                                {gasselected === "BBQ" ? priceBBQ : ''}
                                &nbsp;$CMJ)
                            </div>
                        </div>
                        <div style={{fontSize: "10px", marginTop: "5px"}} className="light">"YO! DO YOU HAVE SOME ${gasselected} FOR ME ?</div>
                        <div style={{fontSize: "10px"}} className="light">AHHH, I WILL GET [5% MERCHANT FEE] FOR ANY TRADE."</div>
                    </div>
                    <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "10px 0"}}></div>
                    <input
                        style={{width: "90%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "18px"}}
                        className="bold"
                        type="number"
                        step="1"
                        min="1"
                        placeholder={"$" + gasselected + " Amount to Sell"}
                        onChange={(event) => {
                            if (gasselected === "CTUNA") {
                                handleSwap(event)
                            } else if (gasselected === "SX31") {
                                handleSwapSX31(event)
                            } else if (gasselected === "BBQ") {
                                handleSwapBBQ(event)
                            }
                        }}
                        value={inputSwap}
                    ></input>
                    <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                        {address !== null && address !== undefined ?
                            <div style={{width: "30px"}} className="pixel button" onClick={
                                () => {
                                    if (gasselected === "CTUNA") {
                                        swapTokenHandle(true)
                                    } else if (gasselected === "SX31") {
                                        swapTokenHandle2(true)
                                    } else if (gasselected === "BBQ") {
                                        swapTokenHandle3(true)
                                    }
                                }
                            }>SELL</div> :
                            <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">SELL</div>
                        }
                        <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px"}} className="pixel bold">Will get 
                            <div className="emp">
                                {gasselected === "CTUNA" ? cmjBought : ''}
                                {gasselected === "SX31" ? cmjBought2 : ''}
                                {gasselected === "BBQ" ? cmjBought3 : ''}
                            </div>
                            $CMJ
                        </div>
                    </div>
                    <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "10px 0"}}></div>
                    <input
                        style={{width: "90%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "18px"}}
                        className="bold"
                        type="number"
                        step="1"
                        min="1"
                        placeholder="$CMJ Amount to Buy"
                        onChange={(event) => {
                            if (gasselected === "CTUNA") {
                                handleSwap2(event)
                            } else if (gasselected === "SX31") {
                                handleSwapSX31_2(event)
                            } else if (gasselected === "BBQ") {
                                handleSwapBBQ_2(event)
                            }
                        }}
                        value={inputSwap2}
                    ></input>
                    <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                        {address !== null && address !== undefined ?
                            <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                                () => {
                                    if (gasselected === "CTUNA") {
                                        swapTokenHandle(false)
                                    } else if (gasselected === "SX31") {
                                        swapTokenHandle2(false)
                                    } else if (gasselected === "BBQ") {
                                        swapTokenHandle3(false)
                                    }
                                }
                            }>BUY</div> :
                            <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BUY</div>
                        }
                        <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px"}} className="pixel bold">Will get 
                            <div style={{color: "#67BAA7"}}>
                                {gasselected === "CTUNA" ? ctunaBought : ''}
                                {gasselected === "SX31" ? tokenBought : ''}
                                {gasselected === "BBQ" ? tokenBought3 : ''}
                            </div>
                            ${gasselected}
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Ammmerchant
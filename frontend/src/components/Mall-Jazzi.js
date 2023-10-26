import React from 'react'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const jdaoToken = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'
const cuToken = '0x42f5213c7b6281fc6fb2d6f10576f70db0a4c841'
const jaspToken = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const cmjToken = '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b'
const jazziJDAO = '0x359237A0315D12A6eaA65d8887a2e12e1D56BBe1'
const jazziCU = '0x91bF9b7a8F042C8aDc487200aD7Bc6Bd0b08A787'
const jazziJasp = '0xe5Dc4040f94f10AE0107AC25034d489fb588cC5F'

const Ammmerchant2 = ({ setisLoading, setTxupdate, ammyStdABI, erc20ABI }) => {
    const { address } = useAccount()

    const [gasselected, setGasselected] = React.useState("JDAO");

    const [inputSwap, setInputSwap] = React.useState("")
    const [inputSwap2, setInputSwap2] = React.useState("")

    const [cmjBoughtJDAO, setCmjBoughtJDAO] = React.useState("0.000")
    const [tokenBoughtJDAO, setTokenBoughtJDAO] = React.useState("0.000")
    const [priceJDAO, setPriceJDAO] = React.useState("0.000")

    const [cmjBoughtCU, setCmjBoughtCU] = React.useState("0.000")
    const [tokenBoughtCU, setTokenBoughtCU] = React.useState("0.000")
    const [priceCU, setPriceCU] = React.useState("0.000")

    const [cmjBoughtJASP, setCmjBoughtJASP] = React.useState("0.000")
    const [tokenBoughtJASP, setTokenBoughtJASP] = React.useState("0.000")
    const [priceJASP, setPriceJASP] = React.useState("0.000")

    const handleSwapJDAO = async (event) => {
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: jazziJDAO,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: jazziJDAO,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                }
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
        const tokensBoughttokenTOcmj = await readContract({
            address: jazziJDAO,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveToken), String(_reserveCmj)],
        })
        event.target.value !== "" ? setCmjBoughtJDAO(ethers.utils.formatEther(tokensBoughttokenTOcmj)) : setCmjBoughtJDAO("0.000")
    }
    const handleSwapJDAO_2 = async (event) => {
        setInputSwap2(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: jazziJDAO,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: jazziJDAO,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                }
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
        const tokensBoughtcmjTOtoken = await readContract({
            address: jazziJDAO,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCmj), String(_reserveToken)],
        })
        event.target.value !== "" ? setTokenBoughtJDAO(ethers.utils.formatEther(tokensBoughtcmjTOtoken)) : setTokenBoughtJDAO("0.000")
    }

    const swapTokenHandleJDAO = async (_sell) => {
        setisLoading(true)
        try {
            if (_sell) {
                const tokenAllow = await readContract({
                    address: jdaoToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, jazziJDAO],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(inputSwap) > Number(tokenAllow) / (10**18)) {
                    const config = await prepareWriteContract({
                        address: jdaoToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [jazziJDAO, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config = await prepareWriteContract({
                    address: jazziJDAO,
                    abi: ammyStdABI,
                    functionName: 'tokenTOcmj',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(cmjBoughtJDAO)],
                })
                const tx = await writeContract(config)
                await tx.wait()
                setTxupdate(tx)
            } else {
                const cmjAllow = await readContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, jazziJDAO],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap2))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(ethers.utils.parseEther(inputSwap2)) > Number(cmjAllow)) {
                    const config = await prepareWriteContract({
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [jazziJDAO, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config2 = await prepareWriteContract({
                    address: jazziJDAO,
                    abi: ammyStdABI,
                    functionName: 'cmjTOtoken',
                    args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseEther(tokenBoughtJDAO)],
                })
                const tx = await writeContract(config2)
                await tx.wait()
                setTxupdate(tx)
            }
        } catch {}
        setisLoading(false)
    }

    const handleSwapCU = async (event) => {
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: jazziCU,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: jazziCU,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                },
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
        const tokensBoughttokenTOcmj = await readContract({
            address: jazziCU,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveToken), String(_reserveCmj)],
        })
        event.target.value !== "" ? setCmjBoughtCU(ethers.utils.formatEther(tokensBoughttokenTOcmj)) : setCmjBoughtCU("0.000")
    }
    const handleSwapCU_2 = async (event) => {
        setInputSwap2(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: jazziCU,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: jazziCU,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                },
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
        const tokensBoughtcmjTOtoken = await readContract({
            address: jazziCU,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCmj), String(_reserveToken)],
        })
        event.target.value !== "" ? setTokenBoughtCU(ethers.utils.formatEther(tokensBoughtcmjTOtoken)) : setTokenBoughtCU("0.000")
    }

    const swapTokenHandleCU = async (_sell) => {
        setisLoading(true)
        try {
            if (_sell) {
                const tokenAllow = await readContract({
                    address: cuToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, jazziCU],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(inputSwap) > Number(tokenAllow) / (10**18)) {
                    const config = await prepareWriteContract({
                        address: cuToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [jazziCU, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config = await prepareWriteContract({
                    address: jazziCU,
                    abi: ammyStdABI,
                    functionName: 'tokenTOcmj',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(cmjBoughtCU)],
                })
                const tx = await writeContract(config)
                await tx.wait()
                setTxupdate(tx)
            } else {
                const cmjAllow = await readContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, jazziCU],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap2))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(ethers.utils.parseEther(inputSwap2)) > Number(cmjAllow)) {
                    const config = await prepareWriteContract({
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [jazziCU, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config2 = await prepareWriteContract({
                    address: jazziCU,
                    abi: ammyStdABI,
                    functionName: 'cmjTOtoken',
                    args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseEther(tokenBoughtCU)],
                })
                const tx = await writeContract(config2)
                await tx.wait()
                setTxupdate(tx)
            }
        } catch {}
        setisLoading(false)
    }

    const handleSwapJASP = async (event) => {
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseUnits(event.target.value, "gwei") : 0
        const data = await readContracts({
            contracts: [
                {
                    address: jazziJasp,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: jazziJasp,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                }
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
        const tokensBoughttokenTOcmj = await readContract({
            address: jazziJasp,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveToken), String(_reserveCmj)],
        })
        event.target.value !== "" ? setCmjBoughtJASP(ethers.utils.formatEther(tokensBoughttokenTOcmj)) : setCmjBoughtJASP("0.000")
    }
    const handleSwapJASP_2 = async (event) => {
        setInputSwap2(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: jazziJasp,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: jazziJasp,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                }
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
        const tokensBoughtcmjTOtoken = await readContract({
            address: jazziJasp,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCmj), String(_reserveToken)],
        })
        event.target.value !== "" ? setTokenBoughtJASP(ethers.utils.formatUnits(String(tokensBoughtcmjTOtoken), "gwei")) : setTokenBoughtJASP("0.000")
    }

    const swapTokenHandleJASP = async (_sell) => {
        setisLoading(true)
        try {
            if (_sell) {
                const tokenAllow = await readContract({
                    address: jaspToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, jazziJasp],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(inputSwap) > Number(tokenAllow) / (10**18)) {
                    const config = await prepareWriteContract({
                        address: jaspToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [jazziJasp, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config = await prepareWriteContract({
                    address: jazziJasp,
                    abi: ammyStdABI,
                    functionName: 'tokenTOcmj',
                    args: [ethers.utils.parseUnits(inputSwap, "gwei"), ethers.utils.parseEther(cmjBoughtJASP)],
                })
                const tx = await writeContract(config)
                await tx.wait()
                setTxupdate(tx)
            } else {
                const cmjAllow = await readContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, jazziJasp],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap2))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(ethers.utils.parseEther(inputSwap2)) > Number(cmjAllow)) {
                    const config = await prepareWriteContract({
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [jazziJasp, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config2 = await prepareWriteContract({
                    address: jazziJasp,
                    abi: ammyStdABI,
                    functionName: 'cmjTOtoken',
                    args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseUnits(String(tokenBoughtJASP), "gwei")],
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
            const data = await readContracts({
                contracts: [
                    {
                        address: jazziJDAO,
                        abi: ammyStdABI,
                        functionName: 'getReserveCMJ',
                    },
                    {
                        address: jazziJDAO,
                        abi: ammyStdABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: jazziCU,
                        abi: ammyStdABI,
                        functionName: 'getReserveCMJ',
                    },
                    {
                        address: jazziCU,
                        abi: ammyStdABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: jazziJasp,
                        abi: ammyStdABI,
                        functionName: 'getReserveCMJ',
                    },
                    {
                        address: jazziJasp,
                        abi: ammyStdABI,
                        functionName: 'getReserveToken',
                    }
                ],
            })

            const _reserveCmjJDAO = data[0]
            const _reserveJDAO = data[1]
            const _reserveCmjCU = data[2]
            const _reserveCU = data[3]
            const _reserveCmjJASP = data[4]
            const _reserveJASP = data[5]

            const data2 = await readContracts({
                contracts: [
                    {
                        address: jazziJDAO,
                        abi: ammyStdABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveJDAO), String(_reserveCmjJDAO)],
                    },
                    {
                        address: jazziCU,
                        abi: ammyStdABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveCU), String(_reserveCmjCU)],
                    },
                    {
                        address: jazziJasp,
                        abi: ammyStdABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**9), String(_reserveJASP), String(_reserveCmjJASP)],
                    }
                ],
            })

            const tokensBoughtbbqTOcmj = data2[0]
            const tokensBoughtcuTOcmj = data2[1]
            const tokensBoughtjaspTOcmj = data2[2]

            return [tokensBoughtbbqTOcmj, tokensBoughtcuTOcmj, tokensBoughtjaspTOcmj]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setPriceJDAO(Number(ethers.utils.formatEther(result[0])).toFixed(3))
            setPriceCU(Number(ethers.utils.formatEther(result[1])).toFixed(5))
            setPriceJASP(Number(ethers.utils.formatEther(result[2])).toFixed(3))
        })

    }, [address, erc20ABI, ammyStdABI])

    return (
        <div className="nftCard" style={{alignItems: "center", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
            <div style={{marginTop: "10px", width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                <div style={{height: "160px", width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                    <img src="https://nftstorage.link/ipfs/bafybeifwrprsashfhjrlbwnyvw4cb6pquyokfs3xm3wl6rt6bdzynpzhkm" width="260" alt="NPC_Jazzi" />
                </div>
                <div style={{maxHeight: "75px"}}>
                    <div style={{fontSize: "20px", width: "380px"}} className="pixel">JAZZI, THE LUXURY COLLECTOR</div>
                    <div style={{fontSize: "10px", marginTop: "5px"}} className="light">"BUY/SELL ${gasselected}</div>
                    <div style={{fontSize: "10px"}} className="light">5% TAX"</div>
                    <div style={{marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <select style={{padding: "1px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                            <option value="JDAO">JDAO</option>
                            <option value="CU">CU</option>
                            <option value="JASP">JASP</option>
                        </select>
                        <div style={{fontSize: "16px", marginLeft: "5px", display: "flex", alignItems: "center", letterSpacing: "1px"}} className="pixel">
                            &nbsp;1
                            {gasselected === "JDAO" ? <>&nbsp;<img src="./tokens/jdao.png" width="22" alt="$JDAO"/> &nbsp;=&nbsp; <div className="emp">{priceJDAO}</div></> : ''}
                            {gasselected === "CU" ? <>&nbsp;<img src="./items/copper.png" width="22" alt="$CU"/> &nbsp;=&nbsp; <div className="emp">{priceCU}</div></> : ''}
                            {gasselected === "JASP" ? <>&nbsp;GWEI&nbsp;<img src="./items/jasper.png" width="22" alt="$JASP"/> &nbsp;=&nbsp; <div className="emp">{priceJASP}</div></> : ''}
                            &nbsp;<img src="./tokens/cmj.png" width="22" alt="$CMJ"/>
                        </div>
                    </div>
                </div>
                <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                <input
                    style={{width: "90%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "18px"}}
                    className="bold"
                    type="number"
                    step="1"
                    min="1"
                    placeholder={"$" + gasselected + " Amount to Sell"}
                    onChange={(event) => {
                        if (gasselected === "JDAO") {
                            handleSwapJDAO(event)
                        } else if (gasselected === "CU") {
                            handleSwapCU(event)
                        } else if (gasselected === "JASP") {
                            handleSwapJASP(event)
                        }
                    }}
                    value={inputSwap}
                ></input>
                <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                    {address !== null && address !== undefined ?
                        <div style={{width: "30px"}} className="pixel button" onClick={
                            () => {
                                if (gasselected === "JDAO") {
                                    swapTokenHandleJDAO(true)
                                } else if (gasselected === "CU") {
                                    swapTokenHandleCU(true)
                                } else if (gasselected === "JASP") {
                                    swapTokenHandleJASP(true)
                                }
                            }
                        }>SELL</div> :
                        <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">SELL</div>
                    }
                    <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px"}} className="pixel bold">Will get 
                        <div className="emp">
                            {gasselected === "JDAO" ? cmjBoughtJDAO : ''}
                            {gasselected === "CU" ? cmjBoughtCU : ''}
                            {gasselected === "JASP" ? cmjBoughtJASP : ''}
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
                        if (gasselected === "JDAO") {
                            handleSwapJDAO_2(event)
                        } else if (gasselected === "CU") {
                            handleSwapCU_2(event)
                        } else if (gasselected === "JASP") {
                            handleSwapJASP_2(event)
                        }
                    }}
                    value={inputSwap2}
                ></input>
                <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                    {address !== null && address !== undefined ?
                        <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                            () => {
                                if (gasselected === "JDAO") {
                                    swapTokenHandleJDAO(false)
                                } else if (gasselected === "CU") {
                                    swapTokenHandleCU(false)
                                } else if (gasselected === "JASP") {
                                    swapTokenHandleJASP(false)
                                }
                            }
                        }>BUY</div> :
                        <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BUY</div>
                    }
                    <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px"}} className="pixel bold">Will get 
                        <div style={{color: "#67BAA7"}}>
                            {gasselected === "JDAO" ? tokenBoughtJDAO : ''}
                            {gasselected === "CU" ? tokenBoughtCU : ''}
                            {gasselected === "JASP" ? tokenBoughtJASP : ''}
                        </div>
                        ${gasselected}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ammmerchant2
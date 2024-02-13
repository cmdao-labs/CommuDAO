import React from 'react'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const swarToken = '0x5e18a8B78d5395371308C54719fead810Ce2aCd2'
const wjbcToken = '0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747'
const angeloSWAR = '0x5a9E35fC4Afc21B9Fc74bE18015D4D3B002A83A3'

const Ammmerchant4 = ({ setisLoading, setTxupdate, angeloStdABI, erc20ABI }) => {
    const { address } = useAccount()

    const [mode, setMode] = React.useState(1)
    const [gasselected, setGasselected] = React.useState("SWAR");

    const [inputSwap, setInputSwap] = React.useState("")
    const [inputSwap2, setInputSwap2] = React.useState("")

    const [wjbcBoughtSWAR, setWjbcBoughtSWAR] = React.useState("0.000")
    const [tokenBoughtSWAR, setTokenBoughtSWAR] = React.useState("0.000")
    const [priceSWAR, setPriceSWAR] = React.useState("0.000")
    const [reserveWjbcSwar, setReserveWjbcSwar] = React.useState("")
    const [reserveSwar, setReserveSwar] = React.useState("")

    const [swarLpBalance, setSwarLpBalance] = React.useState("0")

    const [swarLpSell, setSwarLpSell] = React.useState("")
    const [swarAdd, setSwarAdd] = React.useState("")
    const [wjbcSwarAdd, setWjbcSwarAdd] = React.useState("")


    const handleSwapSWAR = async (event) => {
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: angeloSWAR,
                    abi: angeloStdABI,
                    functionName: 'getReserveWJBC',
                },
                {
                    address: angeloSWAR,
                    abi: angeloStdABI,
                    functionName: 'getReserveToken',
                }
            ],
        })
        const _reserveWjbc = data[0]
        const _reserveToken = data[1]
        const tokensBoughttokenTOwjbc = await readContract({
            address: angeloSWAR,
            abi: angeloStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveToken), String(_reserveWjbc)],
        })
        event.target.value !== "" ? setWjbcBoughtSWAR(ethers.utils.formatEther(tokensBoughttokenTOwjbc)) : setWjbcBoughtSWAR("0.000")
    }
    const handleSwapSWAR_2 = async (event) => {
        setInputSwap2(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: angeloSWAR,
                    abi: angeloStdABI,
                    functionName: 'getReserveWJBC',
                },
                {
                    address: angeloSWAR,
                    abi: angeloStdABI,
                    functionName: 'getReserveToken',
                }
            ],
        })
        const _reserveWjbc = data[0]
        const _reserveToken = data[1]
        const tokensBoughtwjbcTOtoken = await readContract({
            address: angeloSWAR,
            abi: angeloStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveWjbc), String(_reserveToken)],
        })
        event.target.value !== "" ? setTokenBoughtSWAR(ethers.utils.formatEther(tokensBoughtwjbcTOtoken)) : setTokenBoughtSWAR("0.000")
    }

    const swapTokenHandleSWAR = async (_sell) => {
        setisLoading(true)
        try {
            if (_sell) {
                const tokenAllow = await readContract({
                    address: swarToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, angeloSWAR],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(inputSwap) > Number(tokenAllow) / (10**18)) {
                    const config = await prepareWriteContract({
                        address: swarToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [angeloSWAR, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config = await prepareWriteContract({
                    address: angeloSWAR,
                    abi: angeloStdABI,
                    functionName: 'tokenTOwjbc',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(wjbcBoughtSWAR)],
                })
                const tx = await writeContract(config)
                await tx.wait()
                setTxupdate(tx)
            } else {
                const wjbcAllow = await readContract({
                    address: wjbcToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, angeloSWAR],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap2))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(ethers.utils.parseEther(inputSwap2)) > Number(wjbcAllow)) {
                    const config = await prepareWriteContract({
                        address: wjbcToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [angeloSWAR, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config2 = await prepareWriteContract({
                    address: angeloSWAR,
                    abi: angeloStdABI,
                    functionName: 'wjbcTOtoken',
                    args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseEther(tokenBoughtSWAR)],
                })
                const tx = await writeContract(config2)
                await tx.wait()
                setTxupdate(tx)
            }
        } catch {}
        setisLoading(false)
    }

    const removeSwarLp = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: angeloSWAR,
                abi: angeloStdABI,
                functionName: 'removeLiquidity',
                args: [ethers.utils.parseEther(swarLpSell)],
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const handleAddSwar = async (event) => {
        setSwarAdd(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const bigValue = ethers.BigNumber.from(_value)
        const _reserveSwar = await readContract({
            address: angeloSWAR,
            abi: angeloStdABI,
            functionName: 'getReserveToken',
        })
        const bigSwarReserv = ethers.BigNumber.from(_reserveSwar)
        const _reserveWjbc = await readContract({
            address: angeloSWAR,
            abi: angeloStdABI,
            functionName: 'getReserveWJBC',
        })
        const bigWjbcReserv = ethers.BigNumber.from(_reserveWjbc)
        event.target.value !== "" ? setWjbcSwarAdd(ethers.utils.formatEther(((bigValue.mul(bigWjbcReserv)).div(bigSwarReserv)))) : setWjbcSwarAdd("")
    }
    const handleAddSwar2 = async (event) => {
        setWjbcSwarAdd(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const bigValue = ethers.BigNumber.from(_value)
        const _reserveSwar = await readContract({
            address: angeloSWAR,
            abi: angeloStdABI,
            functionName: 'getReserveToken',
        })
        const bigSwarReserv = ethers.BigNumber.from(_reserveSwar)
        const _reserveWjbc = await readContract({
            address: angeloSWAR,
            abi: angeloStdABI,
            functionName: 'getReserveWJBC',
        })
        const bigWjbcReserv = ethers.BigNumber.from(_reserveWjbc)
        event.target.value !== "" ? setSwarAdd(ethers.utils.formatEther(((bigValue.mul(bigSwarReserv)).div(bigWjbcReserv)))) : setSwarAdd("")
    }
    const addSwarLpHandle = async () => {
        setisLoading(true)
        try {
            const wjbcAllow = await readContract({
                address: wjbcToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, angeloSWAR],
            })
            const bigValue = wjbcAllow !== "" ? ethers.BigNumber.from(ethers.utils.parseEther(wjbcSwarAdd)) : ethers.BigNumber.from(0)
            const Hex = ethers.BigNumber.from(10**8)
            const bigApprove = bigValue.mul(Hex)
            if (Number(wjbcSwarAdd) > Number(wjbcAllow) / (10**18)) {
                const config = await prepareWriteContract({
                    address: wjbcAllow,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [angeloSWAR, bigApprove],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const swarAllow = await readContract({
                address: swarToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, angeloSWAR],
            })
            if (Number(swarAdd) > Number(swarAllow) / (10**18)) {
                const config2 = await prepareWriteContract({
                    address: swarToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [angeloSWAR, bigApprove],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const config3 = await prepareWriteContract({
                address: angeloSWAR,
                abi: angeloStdABI,
                functionName: 'addLiquidity',
                args: [ethers.utils.parseEther(swarAdd), ethers.utils.parseEther(wjbcSwarAdd)],
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
                        address: angeloSWAR,
                        abi: angeloStdABI,
                        functionName: 'getReserveWJBC',
                    },
                    {
                        address: angeloSWAR,
                        abi: angeloStdABI,
                        functionName: 'getReserveToken',
                    }
                ],
            })

            const _reserveWjbcSWAR = data[0]
            const _reserveSWAR = data[1]

            const data2 = await readContracts({
                contracts: [
                    {
                        address: angeloSWAR,
                        abi: angeloStdABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveSWAR), String(_reserveWjbcSWAR)],
                    },
                ],
            })

            const tokensBoughtswarTOwjbc = data2[0]

            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: angeloSWAR,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },                 
                ],
            }) : [0]

            const swarlpBal = data3[0]

            return [
                tokensBoughtswarTOwjbc, _reserveWjbcSWAR, _reserveSWAR,
                swarlpBal,
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
            result[0] !== null && setPriceSWAR(Number(ethers.utils.formatEther(result[0])).toFixed(3))

            setReserveWjbcSwar(ethers.utils.formatEther(result[1]))
            setReserveSwar(ethers.utils.formatEther(result[2]))

            const _swarlpbalance = ethers.utils.formatEther(result[3])
            setSwarLpBalance(Math.floor(_swarlpbalance * 100000) / 100000)
        })

    }, [address, erc20ABI, angeloStdABI])

    return (
        <div className="nftCard" style={{alignItems: "center", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
            <div style={{marginTop: "10px", width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                <div style={{height: "160px", width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                    <div style={{height: "260px"}}></div>
                </div>
                {mode === 1 &&
                    <>
                        <div style={{maxHeight: "75px"}}>
                            <div style={{fontSize: "20px", width: "380px"}} className="pixel">ANGELO, THE NATIVE COIN TRADER</div>
                            <div style={{fontSize: "10px", marginTop: "5px"}} className="light">"BUY/SELL ${gasselected}</div>
                            <div style={{fontSize: "10px"}} className="light">5% TAX"</div>
                            <div style={{marginTop: "5px", width: "90%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                <div style={{width: "70%", display: "flex", flexDirection: "row"}}>
                                    <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="SWAR">SWAR</option>
                                    </select>
                                    <div style={{fontSize: "16px", marginLeft: "5px", display: "flex", alignItems: "center", letterSpacing: "1px"}} className="pixel">
                                        &nbsp;1
                                        {gasselected === "SWAR" ? <>&nbsp;<img src="https://nftstorage.link/ipfs/bafkreib4zlmwnydgolgzkfldaz2zsxh6pg3k4wemiigura7gbnj7i36ygi" width="22" alt="$SWAR"/> &nbsp;=&nbsp; <div className="emp">{priceSWAR}</div></> : ''}
                                        &nbsp;<img src="https://nftstorage.link/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" width="22" alt="$WJBC"/>
                                    </div>
                                </div>
                                {gasselected === "SWAR" && <div style={{width: "80px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={() => setMode(2)}>MANAGE LP</div>}
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
                                if (gasselected === "SWAR") {
                                    handleSwapSWAR(event)
                                }
                            }}
                            value={inputSwap}
                        ></input>
                        <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            {address !== null && address !== undefined ?
                                <div style={{width: "30px"}} className="pixel button" onClick={
                                    () => {
                                        if (gasselected === "SWAR") {
                                            swapTokenHandleSWAR(true)
                                        }
                                    }
                                }>SELL</div> :
                                <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">SELL</div>
                            }
                            <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                                <div className="emp">
                                    {gasselected === "SWAR" ? wjbcBoughtSWAR : ''}
                                </div>
                                $WJBC (
                                    {gasselected === "SWAR" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveWjbcSwar) - ((Number(reserveWjbcSwar) * Number(reserveSwar)) / (Number(reserveSwar) + Number(inputSwap))))) - (Number(reserveSwar/reserveWjbcSwar))) / (Number(reserveSwar/reserveWjbcSwar))) * 100)).toFixed(2)}%</>}
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
                            placeholder="0 $WJBC"
                            onChange={(event) => {
                                if (gasselected === "SWAR") {
                                    handleSwapSWAR_2(event)
                                }
                            }}
                            value={inputSwap2}
                        ></input>
                        <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            {address !== null && address !== undefined ?
                                <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                                    () => {
                                        if (gasselected === "SWAR") {
                                            swapTokenHandleSWAR(false)
                                        }
                                    }
                                }>BUY</div> :
                                <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BUY</div>
                            }
                            <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                                <div style={{color: "#67BAA7"}}>
                                    {gasselected === "SWAR" ? tokenBoughtSWAR : ''}
                                </div>
                                ${gasselected} ( 
                                    {gasselected === "SWAR" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveSwar) - ((Number(reserveSwar) * Number(reserveWjbcSwar)) / (Number(reserveWjbcSwar) + Number(inputSwap2))))) - (Number(reserveWjbcSwar/reserveSwar))) / (Number(reserveWjbcSwar/reserveSwar))) * 100)).toFixed(2)}%</>}
                                    {Number(inputSwap2) === 0 && <>0.00%</>}
                                )
                            </div>
                        </div>
                    </>
                }
                {mode === 2 ?
                    <div style={{width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                        <div style={{maxHeight: "75px"}}>
                            <div style={{fontSize: "20px", width: "380px"}} className="pixel">ANGELO, THE NATIVE COIN TRADER</div>
                            <div style={{fontSize: "10px", marginTop: "5px"}} className="light">"ADD/REMOVE {gasselected}-WJBC LP</div>
                            <div style={{fontSize: "10px"}} className="light">READY TO JOIN MY BUSINESS?"</div>
                            <div style={{marginTop: "5px", width: "90%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                <div style={{width: "70%", display: "flex", flexDirection: "row"}}>
                                    <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="SWAR">SWAR</option>
                                    </select>
                                    <div style={{fontSize: "14px", marginLeft: "5px", display: "flex", alignItems: "center"}} className="pixel">
                                        {gasselected === "SWAR" ? <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(swarLpBalance).toFixed(4)}</div></> : ''}
                                    </div>
                                </div>
                                <div style={{width: "80px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={() => setMode(1)}>SWAP NOW</div>
                            </div>
                        </div>
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                        <div style={{marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <input style={{width: "255px", padding: "5px", border: "1px solid #dddade", fontSize: "14px"}} type="number" placeholder={"0 " + gasselected + "-WJBC LP"} className="bold" onChange={(event) => setSwarLpSell(event.target.value)} value={swarLpSell}></input>
                            <div style={{width: "60px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "#ff007a", color: "#fff", border: "none", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={removeSwarLp}>REMOVE</div>
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
                                if (gasselected === "SWAR") {
                                    handleAddSwar(event)
                                }
                            }}
                            value={swarAdd}
                        ></input>
                        <div style={{width: "100%", margin: "5px", fontSize: "14px"}} className="fa fa-plus"></div>
                        <input
                            style={{width: "90%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "14px"}}
                            className="bold"
                            type="number"
                            step="1"
                            min="1"
                            placeholder="0 $WJBC"
                            onChange={(event) => {
                                if (gasselected === "SWAR") {
                                    handleAddSwar2(event)
                                }
                            }}
                            value={wjbcSwarAdd}
                        ></input>
                        <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            {address !== null && address !== undefined ?
                                <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                                    () => {
                                        if (gasselected === "SWAR") {
                                            addSwarLpHandle()
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
        </div>
    )
}

export default Ammmerchant4
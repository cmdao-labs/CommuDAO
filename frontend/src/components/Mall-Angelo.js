import React from 'react'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const swarToken = '0x5e18a8B78d5395371308C54719fead810Ce2aCd2'
const wjbcToken = '0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747'
const angeloSWAR = '0x5a9E35fC4Afc21B9Fc74bE18015D4D3B002A83A3'
const angbToken = '0x59c1c2f5fa76db933b97b7c54223129e2a398534'
const angeloANGB = '0xDd35db1a731CD86C01d74A8a4bA4354ca1CDE24d'

const Ammmerchant4 = ({ setisLoading, setTxupdate, angeloStdABI, cmdaoAmmNpcABI, erc20ABI, angbBalance, swarBalance, wjbcBalance }) => {
    const { address } = useAccount()

    const [mode, setMode] = React.useState(1)
    const [gasselected, setGasselected] = React.useState("SWAR")

    const [inputSwap, setInputSwap] = React.useState("")
    const [inputSwap2, setInputSwap2] = React.useState("")

    const [wjbcBoughtSWAR, setWjbcBoughtSWAR] = React.useState("0.000")
    const [tokenBoughtSWAR, setTokenBoughtSWAR] = React.useState("0.000")
    const [priceSWAR, setPriceSWAR] = React.useState("0.000")
    const [reserveWjbcSwar, setReserveWjbcSwar] = React.useState("")
    const [reserveSwar, setReserveSwar] = React.useState("")

    const [swarLpBalance, setSwarLpBalance] = React.useState("0")

    const [wjbcBoughtANGB, setWjbcBoughtANGB] = React.useState("0.000")
    const [tokenBoughtANGB, setTokenBoughtANGB] = React.useState("0.000")
    const [priceANGB, setPriceANGB] = React.useState("0.000")
    const [reserveWjbcAngb, setReserveWjbcAngb] = React.useState("")
    const [reserveAngb, setReserveAngb] = React.useState("")

    const [angbLpBalance, setAngbLpBalance] = React.useState("0")

    const [lpSell, setLpSell] = React.useState("")
    const [tokenAdd, setTokenAdd] = React.useState("")
    const [currAdd, setCurrAdd] = React.useState("")


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
        const _reserveWjbc = data[0].result
        const _reserveToken = data[1].result
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
        const _reserveWjbc = data[0].result
        const _reserveToken = data[1].result
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
                    const { hash0 } = await writeContract(config)
                    await waitForTransaction({ hash0, })
                }
                const config = await prepareWriteContract({
                    address: angeloSWAR,
                    abi: angeloStdABI,
                    functionName: 'tokenTOwjbc',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(wjbcBoughtSWAR)],
                })
                const { hash1 } = await writeContract(config)
                await waitForTransaction({ hash1, })
                setTxupdate(hash1)
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
                    const { hash0 } = await writeContract(config)
                    await waitForTransaction({ hash0, })
                }
                const config2 = await prepareWriteContract({
                    address: angeloSWAR,
                    abi: angeloStdABI,
                    functionName: 'wjbcTOtoken',
                    args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseEther(tokenBoughtSWAR)],
                })
                const { hash1 } = await writeContract(config2)
                await waitForTransaction({ hash1, })
                setTxupdate(hash1)
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
                args: [ethers.utils.parseEther(lpSell)],
            })
            const { hash1 } = await writeContract(config)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const handleAddSwar = async (event) => {
        setTokenAdd(event.target.value)
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
        event.target.value !== "" ? setCurrAdd(ethers.utils.formatEther(((bigValue.mul(bigWjbcReserv)).div(bigSwarReserv)))) : setCurrAdd("")
    }
    const handleAddSwar2 = async (event) => {
        setCurrAdd(event.target.value)
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
        event.target.value !== "" ? setTokenAdd(ethers.utils.formatEther(((bigValue.mul(bigSwarReserv)).div(bigWjbcReserv)))) : setTokenAdd("")
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
            const bigValue = wjbcAllow !== "" ? ethers.BigNumber.from(ethers.utils.parseEther(currAdd)) : ethers.BigNumber.from(0)
            const Hex = ethers.BigNumber.from(10**8)
            const bigApprove = bigValue.mul(Hex)
            if (Number(currAdd) > Number(wjbcAllow) / (10**18)) {
                const config = await prepareWriteContract({
                    address: wjbcAllow,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [angeloSWAR, bigApprove],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const swarAllow = await readContract({
                address: swarToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, angeloSWAR],
            })
            if (Number(tokenAdd) > Number(swarAllow) / (10**18)) {
                const config2 = await prepareWriteContract({
                    address: swarToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [angeloSWAR, bigApprove],
                })
                const { hash02 } = await writeContract(config2)
                await waitForTransaction({ hash02, })
            }
            const config3 = await prepareWriteContract({
                address: angeloSWAR,
                abi: angeloStdABI,
                functionName: 'addLiquidity',
                args: [ethers.utils.parseEther(tokenAdd), ethers.utils.parseEther(currAdd)],
            })
            const { hash1 } = await writeContract(config3)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const handleSwapUni = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = angeloANGB
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
            event.target.value !== "" ? setWjbcBoughtANGB(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setWjbcBoughtANGB("0.000")
        }
    }
    const handleSwapUni_2 = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = angeloANGB
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
            event.target.value !== "" ? setTokenBoughtANGB(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setTokenBoughtANGB("0.000")
        }
    }

    const swapTokenHandleUni = async (index, _sell) => {
        let lp = '0x0000000000000000000000000000000000000000'
        let token = '0x0000000000000000000000000000000000000000'
        let curr = '0x0000000000000000000000000000000000000000'
        let currBoughtToken = '0'
        let tokenBoughtCurr = '0'
        if (index === 1) {
            lp = angeloANGB
            token = angbToken
            curr = wjbcToken
            currBoughtToken = wjbcBoughtANGB
            tokenBoughtCurr = tokenBoughtANGB
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
                    const { hash0 } = await writeContract(config)
                    await waitForTransaction({ hash0, })
                }
                const config = await prepareWriteContract({
                    address: lp,
                    abi: cmdaoAmmNpcABI,
                    functionName: 'tokenTOcurrency',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(currBoughtToken)],
                })
                const { hash1 } = await writeContract(config)
                await waitForTransaction({ hash1, })
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
                    const { hash0 } = await writeContract(config)
                    await waitForTransaction({ hash0, })
                }
                const config2 = await prepareWriteContract({
                    address: lp,
                    abi: cmdaoAmmNpcABI,
                    functionName: 'currencyTOtoken',
                    args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseEther(tokenBoughtCurr)],
                })
                const { hash1 } = await writeContract(config2)
                await waitForTransaction({ hash1, })
                setTxupdate(hash1)
            }
        } catch {}
        setisLoading(false)
    }

    const removeLpUni = async (index) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = angeloANGB
        }
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: addr,
                abi: cmdaoAmmNpcABI,
                functionName: 'removeLiquidity',
                args: [ethers.utils.parseEther(lpSell)],
            })
            const { hash1 } = await writeContract(config)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const handleAddUni = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = angeloANGB
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
            addr = angeloANGB
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
            lp = angeloANGB
            token = angbToken
            curr = wjbcToken
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
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
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
                const { hash02 } = await writeContract(config2)
                await waitForTransaction({ hash02, })
            }
            const config3 = await prepareWriteContract({
                address: lp,
                abi: cmdaoAmmNpcABI,
                functionName: 'addLiquidity',
                args: [ethers.utils.parseEther(tokenAdd), ethers.utils.parseEther(currAdd)],
            })
            const { hash1 } = await writeContract(config3)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
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
                    },
                    {
                        address: angeloANGB,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: angeloANGB,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    }
                ],
            })

            const _reserveWjbcSWAR = data[0].result
            const _reserveSWAR = data[1].result
            const _reserveWjbcANGB = data[2].result
            const _reserveANGB = data[3].result

            const data2 = await readContracts({
                contracts: [
                    {
                        address: angeloSWAR,
                        abi: angeloStdABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveSWAR), String(_reserveWjbcSWAR)],
                    },
                    {
                        address: angeloANGB,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveANGB), String(_reserveWjbcANGB)],
                    },
                ],
            })

            const tokensBoughtswarTOwjbc = data2[0].result
            const tokensBoughtangbTOwjbc = data2[1].result

            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: angeloSWAR,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },     
                    {
                        address: angeloANGB,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },                 
                ],
            }) : [0, 0, ]

            const swarlpBal = data3[0].result
            const angblpBal = data3[1].result

            return [
                tokensBoughtswarTOwjbc, _reserveWjbcSWAR, _reserveSWAR, swarlpBal,
                tokensBoughtangbTOwjbc, _reserveWjbcANGB, _reserveANGB, angblpBal,
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

            result[4] !== null && setPriceANGB(Number(ethers.utils.formatEther(result[4])).toFixed(3))
            setReserveWjbcAngb(ethers.utils.formatEther(result[5]))
            setReserveAngb(ethers.utils.formatEther(result[6]))
            const _angblpbalance = ethers.utils.formatEther(result[7])
            setAngbLpBalance(Math.floor(_angblpbalance * 100000) / 100000)            
        })

    }, [address, erc20ABI, angeloStdABI, cmdaoAmmNpcABI])

    return (
        <div className="nftCard" style={{alignItems: "center", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
            <div style={{marginTop: "10px", width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                <div style={{height: "160px", width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                    <img src="https://nftstorage.link/ipfs/bafybeiacnhg5fsdlywlxfatj6y6aapbzcmroqvrler3mvlta6fappoe3um" width="230" alt="NPC_Angelo" />
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
                                        <option value="ANGB">ANGB</option>
                                    </select>
                                    <div style={{fontSize: "16px", marginLeft: "5px", display: "flex", alignItems: "center", letterSpacing: "1px"}} className="pixel">
                                        &nbsp;1
                                        {gasselected === "SWAR" && <>&nbsp;<img src="https://nftstorage.link/ipfs/bafkreib4zlmwnydgolgzkfldaz2zsxh6pg3k4wemiigura7gbnj7i36ygi" width="22" alt="$SWAR"/> &nbsp;=&nbsp; <div className="emp">{priceSWAR}</div></>}
                                        {gasselected === "ANGB" && <>&nbsp;<img src="https://nftstorage.link/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m" width="22" alt="$ANGB"/> &nbsp;=&nbsp; <div className="emp">{priceANGB}</div></>}
                                        &nbsp;<img src="https://nftstorage.link/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" width="22" alt="$WJBC"/>
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
                                    if (gasselected === "SWAR") {
                                        handleSwapSWAR(event)
                                    } else if (gasselected === "ANGB") {
                                        handleSwapUni(1, event)
                                    }
                                }}
                                value={inputSwap}
                            ></input>
                            {gasselected === "SWAR" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: swarBalance}}; handleSwapSWAR(bal);}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreib4zlmwnydgolgzkfldaz2zsxh6pg3k4wemiigura7gbnj7i36ygi" width="22" alt="$SWAR"/>
                                    <div style={{marginLeft: "5px"}}>{Number(swarBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "ANGB" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: angbBalance}}; handleSwapUni(1, bal);}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m" width="22" alt="$ANGB"/>
                                    <div style={{marginLeft: "5px"}}>{Number(angbBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                        </div>
                        <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            {address !== null && address !== undefined ?
                                <div style={{width: "30px"}} className="pixel button" onClick={
                                    () => {
                                        if (gasselected === "SWAR") {
                                            swapTokenHandleSWAR(true)
                                        } else if (gasselected === "ANGB") {
                                            swapTokenHandleUni(1, true)
                                        }
                                    }
                                }>SELL</div> :
                                <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">SELL</div>
                            }
                            <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                                <div className="emp">
                                    {gasselected === "SWAR" && Number(wjbcBoughtSWAR).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    {gasselected === "ANGB" && Number(wjbcBoughtANGB).toLocaleString('en-US', {maximumFractionDigits:3})}
                                </div>
                                $WJBC (
                                    {gasselected === "SWAR" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveWjbcSwar) - ((Number(reserveWjbcSwar) * Number(reserveSwar)) / (Number(reserveSwar) + Number(inputSwap))))) - (Number(reserveSwar/reserveWjbcSwar))) / (Number(reserveSwar/reserveWjbcSwar))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "ANGB" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveWjbcAngb) - ((Number(reserveWjbcAngb) * Number(reserveAngb)) / (Number(reserveAngb) + Number(inputSwap))))) - (Number(reserveAngb/reserveWjbcAngb))) / (Number(reserveAngb/reserveWjbcAngb))) * 100)).toFixed(2)}%</>}
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
                                placeholder="0 $WJBC"
                                onChange={(event) => {
                                    if (gasselected === "SWAR") {
                                        handleSwapSWAR_2(event)
                                    } else if (gasselected === "ANGB") {
                                        handleSwapUni_2(1, event)
                                    }
                                }}
                                value={inputSwap2}
                            ></input>
                            <div
                                style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}}
                                onClick={() => {
                                    const bal = {target: {value: wjbcBalance}}
                                    if (gasselected === "SWAR") {
                                        handleSwapSWAR_2(bal)
                                    } else if (gasselected === "ANGB") {
                                        handleSwapUni_2(1, bal)
                                    }
                                }}
                            >
                                <img src="https://nftstorage.link/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" width="22" alt="$WJBC"/>
                                <div style={{marginLeft: "5px"}}>{Number(wjbcBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                            </div>
                        </div>
                        <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            {address !== null && address !== undefined ?
                                <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                                    () => {
                                        if (gasselected === "SWAR") {
                                            swapTokenHandleSWAR(false)
                                        } else if (gasselected === "ANGB") {
                                            swapTokenHandleUni(1, false)
                                        }
                                    }
                                }>BUY</div> :
                                <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BUY</div>
                            }
                            <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                                <div style={{color: "#67BAA7"}}>
                                    {gasselected === "SWAR" && Number(tokenBoughtSWAR).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    {gasselected === "ANGB" && Number(tokenBoughtANGB).toLocaleString('en-US', {maximumFractionDigits:3})}
                                </div>
                                ${gasselected} ( 
                                    {gasselected === "SWAR" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveSwar) - ((Number(reserveSwar) * Number(reserveWjbcSwar)) / (Number(reserveWjbcSwar) + Number(inputSwap2))))) - (Number(reserveWjbcSwar/reserveSwar))) / (Number(reserveWjbcSwar/reserveSwar))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "ANGB" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveAngb) - ((Number(reserveAngb) * Number(reserveWjbcAngb)) / (Number(reserveWjbcAngb) + Number(inputSwap2))))) - (Number(reserveWjbcAngb/reserveAngb))) / (Number(reserveWjbcAngb/reserveAngb))) * 100)).toFixed(2)}%</>}
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
                                        <option value="ANGB">ANGB</option>
                                    </select>
                                    <div
                                        style={{fontSize: "14px", marginLeft: "5px", display: "flex", alignItems: "center", cursor: "pointer"}}
                                        className="pixel"
                                        onClick={() => {
                                            if (gasselected === "SWAR") {
                                                setLpSell(String(swarLpBalance))
                                            } else if (gasselected === "ANGB") {
                                                setLpSell(String(angbLpBalance))
                                            }
                                        }}
                                    >
                                        {gasselected === "SWAR" && <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(swarLpBalance).toFixed(4)}</div></>}
                                        {gasselected === "ANGB" && <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(angbLpBalance).toFixed(4)}</div></>}
                                    </div>
                                </div>
                                <div style={{width: "80px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={() => setMode(1)}>SWAP NOW</div>
                            </div>
                        </div>
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                        <div style={{marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <input style={{width: "255px", padding: "5px", border: "1px solid #dddade", fontSize: "14px"}} type="number" placeholder={"0 " + gasselected + "-WJBC LP"} className="bold" onChange={(event) => {setLpSell(event.target.value)}} value={lpSell}></input>
                            <div 
                                style={{width: "60px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "#ff007a", color: "#fff", border: "none", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}}
                                className="button pixel"
                                onClick={() => {
                                    if (gasselected === "SWAR") {
                                        removeSwarLp()
                                    } else if (gasselected === "ANGB") {
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
                                    if (gasselected === "SWAR") {
                                        handleAddSwar(event)
                                    } else if (gasselected === "ANGB") {
                                        handleAddUni(1, event)
                                    }
                                }}
                                value={tokenAdd}
                            ></input>
                            {gasselected === "SWAR" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(swarBalance)}}; handleAddSwar(bal);}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreib4zlmwnydgolgzkfldaz2zsxh6pg3k4wemiigura7gbnj7i36ygi" width="22" alt="$SWAR"/>
                                    <div style={{marginLeft: "5px"}}>{Number(swarBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "ANGB" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(angbBalance)}}; handleAddUni(1, bal);}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m" width="22" alt="$ANGB"/>
                                    <div style={{marginLeft: "5px"}}>{Number(angbBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
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
                                placeholder="0 $WJBC"
                                onChange={(event) => {
                                    if (gasselected === "SWAR") {
                                        handleAddSwar2(event)
                                    } else if (gasselected === "ANGB") {
                                        handleAddUni_2(1, event)
                                    }
                                }}
                                value={currAdd}
                            ></input>
                            <div
                                style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}}
                                onClick={() => {
                                    const bal = {target: {value: wjbcBalance}}
                                    if (gasselected === "SWAR") {
                                        handleAddSwar2(bal)
                                    } else if (gasselected === "ANGB") {
                                        handleAddUni_2(1, bal)
                                    }
                                    
                                }}>
                                <img src="https://nftstorage.link/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" width="22" alt="$WJBC"/>
                                <div style={{marginLeft: "5px"}}>{Number(wjbcBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                            </div>
                        </div>
                        <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            {address !== null && address !== undefined ?
                                <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                                    () => {
                                        if (gasselected === "SWAR") {
                                            addSwarLpHandle()
                                        } else if (gasselected === "ANGB") {
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
        </div>
    )
}

export default Ammmerchant4
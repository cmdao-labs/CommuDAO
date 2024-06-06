import React from 'react'

import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const ctunaLab = "0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0"
const sx31Lab = '0xd431d826d7a4380b9259612176f00528b88840a7'
const bbqToken = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const pzaToken = '0x09DcdCFc6C48803681a3422997c679E773656763'
const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const woodToken = '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd'

const ammyCTUNA = "0x7801F8cdBABE6999331d1Bf37d74aAf713C3722F"
const ammySX31 = '0xda558EE93B466aEb4F59fBf95D25d410318be43A'
const ammyBBQ = '0x6F93F16cF86205C5BB9145078d584c354758D6DB'
const ammyPZA = '0x3161EE630bF36d2AB6333a9CfD22ebaa3e2D7C70'
const ammyWOOD = '0x466C3b32538eB0DB9f6c88ee2Fa9c72C495cE08F'

const Ammmerchant = ({ setisLoading, setTxupdate, cmdaoAmmNpcABI, erc20ABI, ctunaBalance, sx31Balance, bbqBalance, pzaBalance, woodBalance, cmjBalance }) => {
    const { address } = useAccount()
    const [mode, setMode] = React.useState(1)
    const [gasselected, setGasselected] = React.useState("BBQ");

    const [inputSwap, setInputSwap] = React.useState("")
    const [inputSwap2, setInputSwap2] = React.useState("")

    const [lpSell, setLpSell] = React.useState("")
    const [tokenAdd, setTokenAdd] = React.useState("")
    const [currAdd, setCurrAdd] = React.useState("")

    const [cmjBought, setCmjBought] = React.useState("0.000")
    const [ctunaBought, setCtunaBought] = React.useState("0.000")
    const [priceCTUNA, setPriceCTUNA] = React.useState("0.000")
    const [reserveCmjCTUNA, setReserveCmjCTUNA] = React.useState("")
    const [reserveCTUNA, setReserveCTUNA] = React.useState("")
    const [ctunaLpBalance, setCtunaLpBalance] = React.useState("0")

    const [cmjBought2, setCmjBought2] = React.useState("0.000")
    const [tokenBought, setTokenBought] = React.useState("0.000")
    const [priceSX31, setPriceSX31] = React.useState("0.000")
    const [reserveCmjSX31, setReserveCmjSX31] = React.useState("")
    const [reserveSX31, setReserveSX31] = React.useState("")
    const [sx31LpBalance, setSx31LpBalance] = React.useState("0")

    const [cmjBought3, setCmjBought3] = React.useState("0.000")
    const [tokenBought3, setTokenBought3] = React.useState("0.000")
    const [priceBBQ, setPriceBBQ] = React.useState("0.000")
    const [reserveCmjBBQ, setReserveCmjBBQ] = React.useState("")
    const [reserveBBQ, setReserveBBQ] = React.useState("")
    const [bbqLpBalance, setBbqLpBalance] = React.useState("0")

    const [cmjBoughtPZA, setCmjBoughtPZA] = React.useState("0.000")
    const [tokenBoughtPZA, setTokenBoughtPZA] = React.useState("0.000")
    const [pricePZA, setPricePZA] = React.useState("0.000")
    const [reserveCmjPZA, setReserveCmjPZA] = React.useState("")
    const [reservePZA, setReservePZA] = React.useState("")
    const [pzaLpBalance, setPzaLpBalance] = React.useState("0")

    const [cmjBoughtWOOD, setCmjBoughtWOOD] = React.useState("0.000")
    const [tokenBoughtWOOD, setTokenBoughtWOOD] = React.useState("0.000")
    const [priceWOOD, setPriceWOOD] = React.useState("0.000")
    const [reserveCmjWOOD, setReserveCmjWOOD] = React.useState("")
    const [reserveWOOD, setReserveWOOD] = React.useState("")
    const [woodLpBalance, setWoodLpBalance] = React.useState("0")

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
        } else if (index === 5) {
            addr = ammyWOOD
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
        } else if (index === 5) {
            event.target.value !== "" ? setCmjBoughtWOOD(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setCmjBoughtWOOD("0.000")
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
        } else if (index === 5) {
            addr = ammyWOOD
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
        } else if (index === 5) {
            event.target.value !== "" ? setTokenBoughtWOOD(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setTokenBoughtWOOD("0.000")
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
        } else if (index === 5) {
            lp = ammyWOOD
            token = woodToken
            currBoughtToken = cmjBoughtWOOD
            tokenBoughtCurr = tokenBoughtWOOD
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
            addr = ammyBBQ
        } else if (index === 2) {
            addr = ammyCTUNA
        } else if (index === 3) {
            addr = ammySX31
        } else if (index === 4) {
            addr = ammyPZA
        } else if (index === 5) {
            addr = ammyWOOD
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
            addr = ammyBBQ
        } else if (index === 2) {
            addr = ammyCTUNA
        } else if (index === 3) {
            addr = ammySX31
        } else if (index === 4) {
            addr = ammyPZA
        } else if (index === 5) {
            addr = ammyWOOD
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
            addr = ammyBBQ
        } else if (index === 2) {
            addr = ammyCTUNA
        } else if (index === 3) {
            addr = ammySX31
        } else if (index === 4) {
            addr = ammyPZA
        } else if (index === 5) {
            addr = ammyWOOD
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
        let curr = cmjToken
        if (index === 1) {
            lp = ammyBBQ
            token = bbqToken
        } else if (index === 2) {
            lp = ammyCTUNA
            token = ctunaLab
        } else if (index === 3) {
            lp = ammySX31
            token = sx31Lab
        } else if (index === 4) {
            lp = ammyPZA
            token = pzaToken
        } else if (index === 5) {
            lp = ammyWOOD
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
                    },
                    {
                        address: ammyWOOD,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: ammyWOOD,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
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
            const _reserveCmj5 = data[8].result
            const _reserveWOOD = data[9].result

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
                    },
                    {
                        address: ammyWOOD,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveWOOD), String(_reserveCmj5)],
                    }
                ],
            })

            const tokensBoughtctunaTOcmj = data2[0].result
            const tokensBoughtsx31TOcmj = data2[1].result
            const tokensBoughtbbqTOcmj = data2[2].result
            const tokensBoughtpzaTOcmj = data2[3].result
            const tokensBoughtwoodTOcmj = data2[4].result

            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: ammyCTUNA,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: ammySX31,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: ammyBBQ,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: ammyPZA,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: ammyWOOD,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                ],
            }) : [{result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0},]
            
            const ctunalpBal = data3[0].result
            const sx31lpBal = data3[1].result
            const bbqlpBal = data3[2].result
            const pzalpBal = data3[3].result
            const woodlpBal = data3[4].result

            return [
                tokensBoughtctunaTOcmj, tokensBoughtsx31TOcmj, tokensBoughtbbqTOcmj, tokensBoughtpzaTOcmj, _reserveCmj, _reserveCtuna, _reserveCmj2, _reserveSX31, _reserveCmj3, _reserveBBQ, _reserveCmj4, _reservePZA, 
                ctunalpBal, sx31lpBal, bbqlpBal, pzalpBal,
                tokensBoughtwoodTOcmj, _reserveCmj5, _reserveWOOD, woodlpBal,
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
            setPriceCTUNA(Number(ethers.utils.formatEther(result[0])).toFixed(3))
            setPriceSX31(Number(ethers.utils.formatEther(result[1])).toFixed(3))
            setPriceBBQ(Number(ethers.utils.formatEther(result[2])).toFixed(7))
            setPricePZA(Number(ethers.utils.formatEther(result[3])).toFixed(7))

            setReserveCmjCTUNA(ethers.utils.formatEther(result[4]))
            setReserveCTUNA(ethers.utils.formatEther(result[5]))
            setReserveCmjSX31(ethers.utils.formatEther(result[6]))
            setReserveSX31(ethers.utils.formatEther(result[7]))
            setReserveCmjBBQ(ethers.utils.formatEther(result[8]))
            setReserveBBQ(ethers.utils.formatEther(result[9]))
            setReserveCmjPZA(ethers.utils.formatEther(result[10]))
            setReservePZA(ethers.utils.formatEther(result[11]))

            const _ctunalpbalance = ethers.utils.formatEther(result[12])
            setCtunaLpBalance(Math.floor(_ctunalpbalance * 100000) / 100000)
            const _sx31lpbalance = ethers.utils.formatEther(result[13])
            setSx31LpBalance(Math.floor(_sx31lpbalance * 100000) / 100000)
            const _bbqlpbalance = ethers.utils.formatEther(result[14])
            setBbqLpBalance(Math.floor(_bbqlpbalance * 100000) / 100000)
            const _pzalpbalance = ethers.utils.formatEther(result[15])
            setPzaLpBalance(Math.floor(_pzalpbalance * 100000) / 100000)

            setPriceWOOD(Number(ethers.utils.formatEther(result[16])).toFixed(10))
            setReserveCmjWOOD(ethers.utils.formatEther(result[17]))
            setReserveWOOD(ethers.utils.formatEther(result[18]))
            const _woodlpbalance = ethers.utils.formatEther(result[19])
            setWoodLpBalance(Math.floor(_woodlpbalance * 100000) / 100000)
        })

    }, [address, erc20ABI, cmdaoAmmNpcABI])

    return (
        <div className="nftCard" style={{alignItems: "center", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
            <div style={{marginTop: "10px", width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                <div style={{height: "160px", width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                    <img src="https://gateway.pinata.cloud/ipfs/bafybeihcyrsclfqjwflnaf4jtaylpvevgzhe5wwf2bqrih4vm3r2kyhmh4" width="260" alt="NPC_Ammy" />
                </div>
                {mode === 1 &&
                    <>
                        <div style={{maxHeight: "75px"}}>
                            <div style={{fontSize: "20px", width: "380px"}} className="pixel">AMMY, THE GAS MERCHANT</div>
                            <div style={{fontSize: "10px", marginTop: "5px"}} className="light">"HI! DO YOU HAVE SOME ${gasselected} FOR ME ?</div>
                            <div style={{fontSize: "10px"}} className="light">AHHH, I WILL GET [5% MERCHANT FEE] FOR ANY TRADE."</div>
                            <div style={{marginTop: "5px", width: "100%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <div style={{width: "70%", display: "flex", flexDirection: "row"}}>
                                    <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="CTUNA">CTUNA</option>
                                        <option value="SX31">SX31</option>
                                        <option value="WOOD">WOOD</option>
                                        <option value="BBQ">BBQ</option>
                                        <option value="PZA">PZA</option>
                                    </select>
                                    <div style={{fontSize: "16px", marginLeft: "5px", display: "flex", alignItems: "center", letterSpacing: "1px"}} className="pixel">
                                        &nbsp;1
                                        {gasselected === "CTUNA" ? <>&nbsp;<img src="https://gateway.pinata.cloud/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i" width="22" alt="$CTUNA"/> &nbsp;=&nbsp; <div className="emp">{priceCTUNA}</div></> : ''}
                                        {gasselected === "SX31" ? <>&nbsp;<img src="https://gateway.pinata.cloud/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4" width="22" alt="$SX31"/> &nbsp;=&nbsp; <div className="emp">{priceSX31}</div></> : ''}
                                        {gasselected === "WOOD" && <>&nbsp;<img src="https://gateway.pinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" width="22" alt="$WOOD"/> &nbsp;=&nbsp; <div style={{letterSpacing: '-1.25px'}} className="emp">{priceWOOD}</div></>}
                                        {gasselected === "BBQ" ? <>&nbsp;<img src="https://gateway.pinata.cloud/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" width="22" alt="$BBQ"/> &nbsp;=&nbsp; <div className="emp">{priceBBQ}</div></> : ''}
                                        {gasselected === "PZA" ? <>&nbsp;<img src="https://gateway.pinata.cloud/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu" width="22" alt="$PZA"/> &nbsp;=&nbsp; <div className="emp">{pricePZA}</div></> : ''}
                                        &nbsp;<img src="https://gateway.pinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="22" alt="$CMJ"/>
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
                                    if (gasselected === "CTUNA") {
                                        handleSwapUni(2, event)
                                    } else if (gasselected === "SX31") {
                                        handleSwapUni(3, event)
                                    } else if (gasselected === "BBQ") {
                                        handleSwapUni(1, event)
                                    } else if (gasselected === "PZA") {
                                        handleSwapUni(4, event)
                                    } else if (gasselected === "WOOD") {
                                        handleSwapUni(5, event)
                                    }
                                }}
                                value={inputSwap}
                            ></input>
                            {gasselected === "CTUNA" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: ctunaBalance}}; handleSwapUni(2, bal);}}>
                                    <img src="https://gateway.pinata.cloud/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i" width="22" alt="$CTUNA"/>
                                    <div style={{marginLeft: "5px"}}>{Number(ctunaBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "SX31" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: sx31Balance}}; handleSwapUni(3, bal);}}>
                                    <img src="https://gateway.pinata.cloud/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4" width="22" alt="$SX31"/>
                                    <div style={{marginLeft: "5px"}}>{Number(sx31Balance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "BBQ" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: bbqBalance}}; handleSwapUni(1, bal);}}>
                                    <img src="https://gateway.pinata.cloud/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" width="22" alt="$BBQ"/>
                                    <div style={{marginLeft: "5px"}}>{Number(bbqBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "PZA" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: pzaBalance}}; handleSwapUni(4, bal);}}>
                                    <img src="https://gateway.pinata.cloud/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu" width="22" alt="$PZA"/>
                                    <div style={{marginLeft: "5px"}}>{Number(pzaBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "WOOD" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: woodBalance}}; handleSwapUni(5, bal);}}>
                                    <img src="https://gateway.pinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" width="22" alt="$WOOD"/>
                                    <div style={{marginLeft: "5px"}}>{Number(woodBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
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
                                        } else if (gasselected === "WOOD") {
                                            swapTokenHandleUni(5, true)
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
                                    {gasselected === "WOOD" && Number(cmjBoughtWOOD).toLocaleString('en-US', {maximumFractionDigits:3})}
                                </div>
                                $CMJ (
                                    {gasselected === "CTUNA" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjCTUNA) - ((Number(reserveCmjCTUNA) * Number(reserveCTUNA)) / (Number(reserveCTUNA) + Number(inputSwap))))) - (Number(reserveCTUNA/reserveCmjCTUNA))) / (Number(reserveCTUNA/reserveCmjCTUNA))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "SX31" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjSX31) - ((Number(reserveCmjSX31) * Number(reserveSX31)) / (Number(reserveSX31) + Number(inputSwap))))) - (Number(reserveSX31/reserveCmjSX31))) / (Number(reserveSX31/reserveCmjSX31))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "BBQ" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjBBQ) - ((Number(reserveCmjBBQ) * Number(reserveBBQ)) / (Number(reserveBBQ) + Number(inputSwap))))) - (Number(reserveBBQ/reserveCmjBBQ))) / (Number(reserveBBQ/reserveCmjBBQ))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "PZA" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjPZA) - ((Number(reserveCmjPZA) * Number(reservePZA)) / (Number(reservePZA) + Number(inputSwap))))) - (Number(reservePZA/reserveCmjPZA))) / (Number(reservePZA/reserveCmjPZA))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "WOOD" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjWOOD) - ((Number(reserveCmjWOOD) * Number(reserveWOOD)) / (Number(reserveWOOD) + Number(inputSwap))))) - (Number(reserveWOOD/reserveCmjWOOD))) / (Number(reserveWOOD/reserveCmjWOOD))) * 100)).toFixed(2)}%</>}
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
                                    } else if (gasselected === "WOOD") {
                                        handleSwapUni_2(5, event)
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
                                    } else if (gasselected === "WOOD") {
                                        handleSwapUni_2(5, bal)
                                    }
                                }}
                            >
                                <img src="https://gateway.pinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="22" alt="$CMJ"/>
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
                                        } else if (gasselected === "WOOD") {
                                            swapTokenHandleUni(5, false)
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
                                    {gasselected === "WOOD" && Number(tokenBoughtWOOD).toLocaleString('en-US', {maximumFractionDigits:3})}
                                </div>
                                ${gasselected} (
                                    {gasselected === "CTUNA" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveCTUNA) - ((Number(reserveCTUNA) * Number(reserveCmjCTUNA)) / (Number(reserveCmjCTUNA) + Number(inputSwap2))))) - (Number(reserveCmjCTUNA/reserveCTUNA))) / (Number(reserveCmjCTUNA/reserveCTUNA))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "SX31" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveSX31) - ((Number(reserveSX31) * Number(reserveCmjSX31)) / (Number(reserveCmjSX31) + Number(inputSwap2))))) - (Number(reserveCmjSX31/reserveSX31))) / (Number(reserveCmjSX31/reserveSX31))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "BBQ" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveBBQ) - ((Number(reserveBBQ) * Number(reserveCmjBBQ)) / (Number(reserveCmjBBQ) + Number(inputSwap2))))) - (Number(reserveCmjBBQ/reserveBBQ))) / (Number(reserveCmjBBQ/reserveBBQ))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "PZA" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reservePZA) - ((Number(reservePZA) * Number(reserveCmjPZA)) / (Number(reserveCmjPZA) + Number(inputSwap2))))) - (Number(reserveCmjPZA/reservePZA))) / (Number(reserveCmjPZA/reservePZA))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "WOOD" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveWOOD) - ((Number(reserveWOOD) * Number(reserveCmjWOOD)) / (Number(reserveCmjWOOD) + Number(inputSwap2))))) - (Number(reserveCmjWOOD/reserveWOOD))) / (Number(reserveCmjWOOD/reserveWOOD))) * 100)).toFixed(2)}%</>}
                                    {Number(inputSwap2) === 0 && <>0.00%</>}
                                )
                            </div>
                        </div>
                    </>
                }
                {mode === 2 &&
                    <div style={{width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                        <div style={{maxHeight: "75px"}}>
                            <div style={{fontSize: "20px", width: "380px"}} className="pixel">AMMY, THE GAS MERCHANT</div>
                            <div style={{fontSize: "10px", marginTop: "5px"}} className="light">"ADD/REMOVE {gasselected}-CMJ LP</div>
                            <div style={{fontSize: "10px"}} className="light">READY TO JOIN MY BUSINESS?"</div>
                            <div style={{marginTop: "5px", width: "90%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                <div style={{width: "70%", display: "flex", flexDirection: "row"}}>
                                    <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="CTUNA">CTUNA</option>
                                        <option value="SX31">SX31</option>
                                        <option value="WOOD">WOOD</option>
                                        <option value="BBQ">BBQ</option>
                                        <option value="PZA">PZA</option>
                                    </select>
                                    <div
                                        style={{fontSize: "14px", marginLeft: "5px", display: "flex", alignItems: "center", cursor: "pointer"}}
                                        className="pixel"
                                        onClick={
                                            () => {
                                                if (gasselected === "CTUNA") {
                                                    setLpSell(String(ctunaLpBalance))
                                                } else if (gasselected === "SX31") {
                                                    setLpSell(String(sx31LpBalance))
                                                } else if (gasselected === "BBQ") {
                                                    setLpSell(String(bbqLpBalance))
                                                } else if (gasselected === "PZA") {
                                                    setLpSell(String(pzaLpBalance))
                                                } else if (gasselected === "WOOD") {
                                                    setLpSell(String(woodLpBalance))
                                                }
                                            }
                                        }
                                    >
                                        {gasselected === "CTUNA" && <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(ctunaLpBalance).toFixed(4)}</div></>}
                                        {gasselected === "SX31" && <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(sx31LpBalance).toFixed(4)}</div></>}
                                        {gasselected === "BBQ" && <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(bbqLpBalance).toFixed(4)}</div></>}
                                        {gasselected === "PZA" && <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(pzaLpBalance).toFixed(4)}</div></>}
                                        {gasselected === "WOOD" && <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(woodLpBalance).toFixed(4)}</div></>}
                                    </div>
                                </div>
                                <div style={{width: "80px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={() => setMode(1)}>SWAP NOW</div>
                            </div>
                        </div>
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                        <div style={{marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <input style={{width: "255px", padding: "5px", border: "1px solid #dddade", fontSize: "14px"}} type="number" placeholder={"0 " + gasselected + "-CMJ LP"} className="bold" onChange={(event) => setLpSell(event.target.value)} value={lpSell}></input>
                            <div
                                style={{width: "60px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "#ff007a", color: "#fff", border: "none", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}}
                                className="button pixel"
                                onClick={
                                    () => {
                                        if (gasselected === "CTUNA") {
                                            removeLpUni(2)
                                        } else if (gasselected === "SX31") {
                                            removeLpUni(3)
                                        } else if (gasselected === "BBQ") {
                                            removeLpUni(1)
                                        } else if (gasselected === "PZA") {
                                            removeLpUni(4)
                                        } else if (gasselected === "WOOD") {
                                            removeLpUni(5)
                                        }
                                    }
                                }
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
                                    if (gasselected === "CTUNA") {
                                        handleAddUni(2, event)
                                    } else if (gasselected === "SX31") {
                                        handleAddUni(3, event)
                                    } else if (gasselected === "BBQ") {
                                        handleAddUni(1, event)
                                    } else if (gasselected === "PZA") {
                                        handleAddUni(4, event)
                                    } else if (gasselected === "WOOD") {
                                        handleAddUni(5, event)
                                    }
                                }}
                                value={tokenAdd}
                            ></input>
                            {gasselected === "CTUNA" &&
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(ctunaBalance)}}; handleAddUni(2, bal);}}>
                                    <img src="https://gateway.pinata.cloud/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i" width="22" alt="$CTUNA"/>
                                    <div style={{marginLeft: "5px"}}>{Number(ctunaBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "SX31" &&
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(sx31Balance)}}; handleAddUni(3, bal);}}>
                                    <img src="https://gateway.pinata.cloud/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4" width="22" alt="$SX31"/>
                                    <div style={{marginLeft: "5px"}}>{Number(sx31Balance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "BBQ" &&
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(bbqBalance)}}; handleAddUni(1, bal);}}>
                                    <img src="https://gateway.pinata.cloud/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" width="22" alt="$BBQ"/>
                                    <div style={{marginLeft: "5px"}}>{Number(bbqBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "PZA" &&
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(pzaBalance)}}; handleAddUni(4, bal);}}>
                                    <img src="https://gateway.pinata.cloud/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu" width="22" alt="$PZA"/>
                                    <div style={{marginLeft: "5px"}}>{Number(pzaBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "WOOD" &&
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(woodBalance)}}; handleAddUni(5, bal);}}>
                                    <img src="https://gateway.pinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" width="22" alt="$WOOD"/>
                                    <div style={{marginLeft: "5px"}}>{Number(woodBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
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
                                placeholder="0 $CMJ"
                                onChange={(event) => {
                                    if (gasselected === "CTUNA") {
                                        handleAddUni_2(2, event)
                                    } else if (gasselected === "SX31") {
                                        handleAddUni_2(3, event)
                                    } else if (gasselected === "BBQ") {
                                        handleAddUni_2(1, event)
                                    } else if (gasselected === "PZA") {
                                        handleAddUni_2(4, event)
                                    } else if (gasselected === "WOOD") {
                                        handleAddUni_2(5, event)
                                    }
                                }}
                                value={currAdd}
                            ></input>
                            <div
                                style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}}
                                onClick={
                                    () => {
                                        const bal = {target: {value: cmjBalance}}
                                        if (gasselected === "CTUNA") {
                                            handleAddUni_2(2, bal)
                                        } else if (gasselected === "SX31") {
                                            handleAddUni_2(3, bal)
                                        } else if (gasselected === "BBQ") {
                                            handleAddUni_2(1, bal)
                                        } else if (gasselected === "PZA") {
                                            handleAddUni_2(4, bal)
                                        } else if (gasselected === "WOOD") {
                                            handleAddUni_2(5, bal)
                                        }
                                    }
                                }
                            >
                                <img src="https://gateway.pinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="22" alt="$CMJ"/>
                                <div style={{marginLeft: "5px"}}>{Number(cmjBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                            </div>
                        </div>
                        <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            {address !== null && address !== undefined ?
                                <div 
                                    style={{width: "30px", background: "#67BAA7"}}
                                    className="pixel button"
                                    onClick={
                                        () => {
                                            if (gasselected === "CTUNA") {
                                                addLpHandleUni(2)
                                            } else if (gasselected === "SX31") {
                                                addLpHandleUni(3)
                                            } else if (gasselected === "BBQ") {
                                                addLpHandleUni(1)
                                            } else if (gasselected === "PZA") {
                                                addLpHandleUni(4)
                                            } else if (gasselected === "WOOD") {
                                                addLpHandleUni(5)
                                            }
                                        }
                                    }
                                >
                                    ADD
                                </div> :
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

export default Ammmerchant
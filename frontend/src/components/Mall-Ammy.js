import React from 'react'

import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const ctunaLab = "0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0"
const sx31Lab = '0xd431d826d7a4380b9259612176f00528b88840a7'
const bbqToken = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const pzaToken = '0x09DcdCFc6C48803681a3422997c679E773656763'
const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"

const ammyCTUNA = "0x0C576Fe27F024C498695e73279412C837D9Ea773"
const ammySX31 = '0x7B022df5b181b720BE5706B2ECCdC3c26C8322e5'
const ammyBBQ = '0x01E856D31a7fdb2405c20c493C172A6AD6f1Bcaa'
const ammyPZA = '0x5Ca958C9c7DC07BB2A0326cf6C8b8cf344C414a1'

const Ammmerchant = ({ setisLoading, setTxupdate, ammyABI, ammyStdABI, erc20ABI }) => {
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

    const handleSwap = async (event) => {
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: ammyCTUNA,
                    abi: ammyABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: ammyCTUNA,
                    abi: ammyABI,
                    functionName: 'getReserveCTUNA',
                }
            ],
        })
        const _reserveCmj = data[0]
        const _reserveCtuna = data[1]
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
        const data = await readContracts({
            contracts: [
                {
                    address: ammyCTUNA,
                    abi: ammyABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: ammyCTUNA,
                    abi: ammyABI,
                    functionName: 'getReserveCTUNA',
                }
            ],
        })
        const _reserveCmj = data[0]
        const _reserveCtuna = data[1]
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
        const data = await readContracts({
            contracts: [
                {
                    address: ammySX31,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: ammySX31,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                }
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
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
        const data = await readContracts({
            contracts: [
                {
                    address: ammySX31,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: ammySX31,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                }
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
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
        const data = await readContracts({
            contracts: [
                {
                    address: ammyBBQ,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: ammyBBQ,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                }
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
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
        const data = await readContracts({
            contracts: [
                {
                    address: ammyBBQ,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: ammyBBQ,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                }
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
        const tokensBoughtcmjTOtoken = await readContract({
            address: ammyBBQ,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCmj), String(_reserveToken)],
        })
        event.target.value !== "" ? setTokenBought3(ethers.utils.formatEther(tokensBoughtcmjTOtoken)) : setTokenBought3("0.000")
    }

    const handleSwapPZA = async (event) => {
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: ammyPZA,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: ammyPZA,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                }
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
        const tokensBoughttokenTOcmj = await readContract({
            address: ammyPZA,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveToken), String(_reserveCmj)],
        })
        event.target.value !== "" ? setCmjBoughtPZA(ethers.utils.formatEther(tokensBoughttokenTOcmj)) : setCmjBoughtPZA("0.000")
    }
    const handleSwapPZA_2 = async (event) => {
        setInputSwap2(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: ammyPZA,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: ammyPZA,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                }
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
        const tokensBoughtcmjTOtoken = await readContract({
            address: ammyPZA,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCmj), String(_reserveToken)],
        })
        event.target.value !== "" ? setTokenBoughtPZA(ethers.utils.formatEther(tokensBoughtcmjTOtoken)) : setTokenBoughtPZA("0.000")
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

    const swapTokenHandlePZA = async (_sell) => {
        setisLoading(true)
        try {
            if (_sell) {
                const tokenAllow = await readContract({
                    address: pzaToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, ammyPZA],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(inputSwap) > Number(tokenAllow) / (10**18)) {
                    const config = await prepareWriteContract({
                        address: pzaToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [ammyPZA, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config = await prepareWriteContract({
                    address: ammyPZA,
                    abi: ammyStdABI,
                    functionName: 'tokenTOcmj',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(cmjBoughtPZA)],
                })
                const tx = await writeContract(config)
                await tx.wait()
                setTxupdate(tx)
            } else {
                const cmjAllow = await readContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, ammyPZA],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap2))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(ethers.utils.parseEther(inputSwap2)) > Number(cmjAllow)) {
                    const config = await prepareWriteContract({
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [ammyPZA, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config2 = await prepareWriteContract({
                    address: ammyPZA,
                    abi: ammyStdABI,
                    functionName: 'cmjTOtoken',
                    args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseEther(tokenBoughtPZA)],
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
                        address: ammyCTUNA,
                        abi: ammyABI,
                        functionName: 'getReserveCMJ',
                    },
                    {
                        address: ammyCTUNA,
                        abi: ammyABI,
                        functionName: 'getReserveCTUNA',
                    },
                    {
                        address: ammySX31,
                        abi: ammyStdABI,
                        functionName: 'getReserveCMJ',
                    },
                    {
                        address: ammySX31,
                        abi: ammyStdABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: ammyBBQ,
                        abi: ammyStdABI,
                        functionName: 'getReserveCMJ',
                    },
                    {
                        address: ammyBBQ,
                        abi: ammyStdABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: ammyPZA,
                        abi: ammyStdABI,
                        functionName: 'getReserveCMJ',
                    },
                    {
                        address: ammyPZA,
                        abi: ammyStdABI,
                        functionName: 'getReserveToken',
                    }
                ],
            })

            const _reserveCmj = data[0]
            const _reserveCtuna = data[1]
            const _reserveCmj2 = data[2]
            const _reserveSX31 = data[3]
            const _reserveCmj3 = data[4]
            const _reserveBBQ = data[5]
            const _reserveCmj4 = data[6]
            const _reservePZA = data[7]

            const data2 = await readContracts({
                contracts: [
                    {
                        address: ammyCTUNA,
                        abi: ammyABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveCtuna), String(_reserveCmj)],
                    },
                    {
                        address: ammySX31,
                        abi: ammyStdABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveSX31), String(_reserveCmj2)],
                    },
                    {
                        address: ammyBBQ,
                        abi: ammyStdABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveBBQ), String(_reserveCmj3)],
                    },
                    {
                        address: ammyPZA,
                        abi: ammyStdABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reservePZA), String(_reserveCmj4)],
                    }
                ],
            })

            const tokensBoughtctunaTOcmj = data2[0]
            const tokensBoughtsx31TOcmj = data2[1]
            const tokensBoughtbbqTOcmj = data2[2]
            const tokensBoughtpzaTOcmj = data2[3]

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
            setPriceBBQ(Number(ethers.utils.formatEther(result[2])).toFixed(5))
            setPricePZA(Number(ethers.utils.formatEther(result[3])).toFixed(3))

            setReserveCmjCTUNA(ethers.utils.formatEther(result[4]))
            setReserveCTUNA(ethers.utils.formatEther(result[5]))
            setReserveCmjSX31(ethers.utils.formatEther(result[6]))
            setReserveSX31(ethers.utils.formatEther(result[7]))
            setReserveCmjBBQ(ethers.utils.formatEther(result[8]))
            setReserveBBQ(ethers.utils.formatEther(result[9]))
            setReserveCmjPZA(ethers.utils.formatEther(result[10]))
            setReservePZA(ethers.utils.formatEther(result[11]))
        })

    }, [address, erc20ABI, ammyABI, ammyStdABI])

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
                <input
                    style={{width: "90%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "18px"}}
                    className="bold"
                    type="number"
                    step="1"
                    min="1"
                    placeholder={"0 $" + gasselected}
                    onChange={(event) => {
                        if (gasselected === "CTUNA") {
                            handleSwap(event)
                        } else if (gasselected === "SX31") {
                            handleSwapSX31(event)
                        } else if (gasselected === "BBQ") {
                            handleSwapBBQ(event)
                        } else if (gasselected === "PZA") {
                            handleSwapPZA(event)
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
                                } else if (gasselected === "PZA") {
                                    swapTokenHandlePZA(true)
                                }
                            }
                        }>SELL</div> :
                        <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">SELL</div>
                    }
                    <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                        <div className="emp">
                            {gasselected === "CTUNA" ? cmjBought : ''}
                            {gasselected === "SX31" ? cmjBought2 : ''}
                            {gasselected === "BBQ" ? cmjBought3 : ''}
                            {gasselected === "PZA" ? cmjBoughtPZA : ''}
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
                <input
                    style={{width: "90%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "18px"}}
                    className="bold"
                    type="number"
                    step="1"
                    min="1"
                    placeholder="0 $CMJ"
                    onChange={(event) => {
                        if (gasselected === "CTUNA") {
                            handleSwap2(event)
                        } else if (gasselected === "SX31") {
                            handleSwapSX31_2(event)
                        } else if (gasselected === "BBQ") {
                            handleSwapBBQ_2(event)
                        } else if (gasselected === "PZA") {
                            handleSwapPZA_2(event)
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
                                } else if (gasselected === "PZA") {
                                    swapTokenHandlePZA(false)
                                }
                            }
                        }>BUY</div> :
                        <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BUY</div>
                    }
                    <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                        <div style={{color: "#67BAA7"}}>
                            {gasselected === "CTUNA" ? ctunaBought : ''}
                            {gasselected === "SX31" ? tokenBought : ''}
                            {gasselected === "BBQ" ? tokenBought3 : ''}
                            {gasselected === "PZA" ? tokenBoughtPZA : ''}
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
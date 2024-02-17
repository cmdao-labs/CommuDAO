import React from 'react'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const jdaoToken = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'
const cuToken = '0x42f5213c7b6281fc6fb2d6f10576f70db0a4c841'
const goldToken = '0x7d5346E33889580528e6F79f48BdEE94D8A9E144'
const jaspToken = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const osToken = '0xAc5299D92373E9352636559cca497d7683A47655'
const cmjToken = '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b'
const jazziJDAO = '0x359237A0315D12A6eaA65d8887a2e12e1D56BBe1'
const jazziCU = '0x91bF9b7a8F042C8aDc487200aD7Bc6Bd0b08A787'
const jazziGOLD = '0xa47D84b88d504C7D2a034Cb8C028eB5914FE7ea7'
const jazziJasp = '0xe5Dc4040f94f10AE0107AC25034d489fb588cC5F'
const jazziOS = '0x6E2Be67383219656a08172446d595727313ffEB5'

const Ammmerchant2 = ({ setisLoading, setTxupdate, ammyStdABI, erc20ABI }) => {
    const { address } = useAccount()

    const [mode, setMode] = React.useState(1)
    const [gasselected, setGasselected] = React.useState("JDAO");

    const [inputSwap, setInputSwap] = React.useState("")
    const [inputSwap2, setInputSwap2] = React.useState("")

    const [cmjBoughtJDAO, setCmjBoughtJDAO] = React.useState("0.000")
    const [tokenBoughtJDAO, setTokenBoughtJDAO] = React.useState("0.000")
    const [priceJDAO, setPriceJDAO] = React.useState("0.000")
    const [reserveCmjJdao, setReserveCmjJdao] = React.useState("")
    const [reserveJdao, setReserveJdao] = React.useState("")

    const [jdaoLpBalance, setJdaoLpBalance] = React.useState("0")

    const [jdaoLpSell, setJdaoLpSell] = React.useState("")
    const [jdaoAdd, setJdaoAdd] = React.useState("")
    const [cmjAdd, setCmjAdd] = React.useState("")

    const [cmjBoughtCU, setCmjBoughtCU] = React.useState("0.000")
    const [tokenBoughtCU, setTokenBoughtCU] = React.useState("0.000")
    const [priceCU, setPriceCU] = React.useState("0.000")
    const [reserveCmjCU, setReserveCmjCU] = React.useState("")
    const [reserveCU, setReserveCU] = React.useState("")

    const [cmjBoughtGOLD, setCmjBoughtGOLD] = React.useState("0.000")
    const [tokenBoughtGOLD, setTokenBoughtGOLD] = React.useState("0.000")
    const [priceGOLD, setPriceGOLD] = React.useState("0.000")
    const [reserveCmjGOLD, setReserveCmjGOLD] = React.useState("")
    const [reserveGOLD, setReserveGOLD] = React.useState("")

    const [cmjBoughtJASP, setCmjBoughtJASP] = React.useState("0.000")
    const [tokenBoughtJASP, setTokenBoughtJASP] = React.useState("0.000")
    const [priceJASP, setPriceJASP] = React.useState("0.000")
    const [reserveCmjJASP, setReserveCmjJASP] = React.useState("")
    const [reserveJASP, setReserveJASP] = React.useState("")

    const [cmjBoughtOS, setCmjBoughtOS] = React.useState("0.000")
    const [tokenBoughtOS, setTokenBoughtOS] = React.useState("0.000")
    const [priceOS, setPriceOS] = React.useState("0.000")
    const [reserveCmjOS, setReserveCmjOS] = React.useState("")
    const [reserveOS, setReserveOS] = React.useState("")


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

    const removeJdaoLp = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: jazziJDAO,
                abi: ammyStdABI,
                functionName: 'removeLiquidity',
                args: [ethers.utils.parseEther(jdaoLpSell)],
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const handleAddJdao = async (event) => {
        setJdaoAdd(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const bigValue = ethers.BigNumber.from(_value)
        const _reserveJdao = await readContract({
            address: jazziJDAO,
            abi: ammyStdABI,
            functionName: 'getReserveToken',
        })
        const bigJdaoReserv = ethers.BigNumber.from(_reserveJdao)
        const _reserveCmj = await readContract({
            address: jazziJDAO,
            abi: ammyStdABI,
            functionName: 'getReserveCMJ',
        })
        const bigCmjReserv = ethers.BigNumber.from(_reserveCmj)
        event.target.value !== "" ? setCmjAdd(ethers.utils.formatEther(((bigValue.mul(bigCmjReserv)).div(bigJdaoReserv)))) : setCmjAdd("")
    }
    const handleAddJdao2 = async (event) => {
        setCmjAdd(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const bigValue = ethers.BigNumber.from(_value)
        const _reserveJdao = await readContract({
            address: jazziJDAO,
            abi: ammyStdABI,
            functionName: 'getReserveToken',
        })
        const bigJdaoReserv = ethers.BigNumber.from(_reserveJdao)
        const _reserveCmj = await readContract({
            address: jazziJDAO,
            abi: ammyStdABI,
            functionName: 'getReserveCMJ',
        })
        const bigCmjReserv = ethers.BigNumber.from(_reserveCmj)
        event.target.value !== "" ? setJdaoAdd(ethers.utils.formatEther(((bigValue.mul(bigJdaoReserv)).div(bigCmjReserv)))) : setJdaoAdd("")
    }
    const addJdaoLpHandle = async () => {
        setisLoading(true)
        try {
            const cmjAllow = await readContract({
                address: cmjToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, jazziJDAO],
            })
            const bigValue = cmjAllow !== "" ? ethers.BigNumber.from(ethers.utils.parseEther(cmjAdd)) : ethers.BigNumber.from(0)
            const Hex = ethers.BigNumber.from(10**8)
            const bigApprove = bigValue.mul(Hex)
            if (Number(cmjAdd) > Number(cmjAllow) / (10**18)) {
                const config = await prepareWriteContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [jazziJDAO, bigApprove],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const jdaoAllow = await readContract({
                address: jdaoToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, jazziJDAO],
            })
            if (Number(jdaoAdd) > Number(jdaoAllow) / (10**18)) {
                const config2 = await prepareWriteContract({
                    address: jdaoToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [jazziJDAO, bigApprove],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const config3 = await prepareWriteContract({
                address: jazziJDAO,
                abi: ammyStdABI,
                functionName: 'addLiquidity',
                args: [ethers.utils.parseEther(jdaoAdd), ethers.utils.parseEther(cmjAdd)],
            })
            const tx = await writeContract(config3)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const handleSwapOS = async (event) => {
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: jazziOS,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: jazziOS,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                },
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
        const tokensBoughttokenTOcmj = await readContract({
            address: jazziOS,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveToken), String(_reserveCmj)],
        })
        event.target.value !== "" ? setCmjBoughtOS(ethers.utils.formatEther(tokensBoughttokenTOcmj)) : setCmjBoughtOS("0.000")
    }
    const handleSwapOS_2 = async (event) => {
        setInputSwap2(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: jazziOS,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: jazziOS,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                },
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
        const tokensBoughtcmjTOtoken = await readContract({
            address: jazziOS,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCmj), String(_reserveToken)],
        })
        event.target.value !== "" ? setTokenBoughtOS(ethers.utils.formatEther(tokensBoughtcmjTOtoken)) : setTokenBoughtOS("0.000")
    }

    const swapTokenHandleOS = async (_sell) => {
        setisLoading(true)
        try {
            if (_sell) {
                const tokenAllow = await readContract({
                    address: osToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, jazziOS],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(inputSwap) > Number(tokenAllow) / (10**18)) {
                    const config = await prepareWriteContract({
                        address: osToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [jazziOS, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config = await prepareWriteContract({
                    address: jazziOS,
                    abi: ammyStdABI,
                    functionName: 'tokenTOcmj',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(cmjBoughtOS)],
                })
                const tx = await writeContract(config)
                await tx.wait()
                setTxupdate(tx)
            } else {
                const cmjAllow = await readContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, jazziOS],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap2))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(ethers.utils.parseEther(inputSwap2)) > Number(cmjAllow)) {
                    const config = await prepareWriteContract({
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [jazziOS, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config2 = await prepareWriteContract({
                    address: jazziOS,
                    abi: ammyStdABI,
                    functionName: 'cmjTOtoken',
                    args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseEther(tokenBoughtOS)],
                })
                const tx = await writeContract(config2)
                await tx.wait()
                setTxupdate(tx)
            }
        } catch {}
        setisLoading(false)
    }

    const handleSwapGOLD = async (event) => {
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: jazziGOLD,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: jazziGOLD,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                },
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
        const tokensBoughttokenTOcmj = await readContract({
            address: jazziGOLD,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveToken), String(_reserveCmj)],
        })
        event.target.value !== "" ? setCmjBoughtGOLD(ethers.utils.formatEther(tokensBoughttokenTOcmj)) : setCmjBoughtGOLD("0.000")
    }
    const handleSwapGOLD_2 = async (event) => {
        setInputSwap2(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const data = await readContracts({
            contracts: [
                {
                    address: jazziGOLD,
                    abi: ammyStdABI,
                    functionName: 'getReserveCMJ',
                },
                {
                    address: jazziGOLD,
                    abi: ammyStdABI,
                    functionName: 'getReserveToken',
                },
            ],
        })
        const _reserveCmj = data[0]
        const _reserveToken = data[1]
        const tokensBoughtcmjTOtoken = await readContract({
            address: jazziGOLD,
            abi: ammyStdABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCmj), String(_reserveToken)],
        })
        event.target.value !== "" ? setTokenBoughtGOLD(ethers.utils.formatEther(tokensBoughtcmjTOtoken)) : setTokenBoughtGOLD("0.000")
    }

    const swapTokenHandleGOLD = async (_sell) => {
        setisLoading(true)
        try {
            if (_sell) {
                const tokenAllow = await readContract({
                    address: goldToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, jazziGOLD],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(inputSwap) > Number(tokenAllow) / (10**18)) {
                    const config = await prepareWriteContract({
                        address: goldToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [jazziGOLD, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config = await prepareWriteContract({
                    address: jazziGOLD,
                    abi: ammyStdABI,
                    functionName: 'tokenTOcmj',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(cmjBoughtGOLD)],
                })
                const tx = await writeContract(config)
                await tx.wait()
                setTxupdate(tx)
            } else {
                const cmjAllow = await readContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, jazziGOLD],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap2))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (Number(ethers.utils.parseEther(inputSwap2)) > Number(cmjAllow)) {
                    const config = await prepareWriteContract({
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [jazziGOLD, bigApprove],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const config2 = await prepareWriteContract({
                    address: jazziGOLD,
                    abi: ammyStdABI,
                    functionName: 'cmjTOtoken',
                    args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseEther(tokenBoughtGOLD)],
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
                    },
                    {
                        address: jazziOS,
                        abi: ammyStdABI,
                        functionName: 'getReserveCMJ',
                    },
                    {
                        address: jazziOS,
                        abi: ammyStdABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: jazziGOLD,
                        abi: ammyStdABI,
                        functionName: 'getReserveCMJ',
                    },
                    {
                        address: jazziGOLD,
                        abi: ammyStdABI,
                        functionName: 'getReserveToken',
                    },
                ],
            })

            const _reserveCmjJDAO = data[0]
            const _reserveJDAO = data[1]
            const _reserveCmjCU = data[2]
            const _reserveCU = data[3]
            const _reserveCmjJASP = data[4]
            const _reserveJASP = data[5]
            const _reserveCmjOS = data[6]
            const _reserveOS = data[7]
            const _reserveCmjGOLD = data[8]
            const _reserveGOLD = data[9]

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
                    },
                    {
                        address: jazziOS,
                        abi: ammyStdABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveOS), String(_reserveCmjOS)],
                    },
                    {
                        address: jazziGOLD,
                        abi: ammyStdABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveGOLD), String(_reserveCmjGOLD)],
                    },
                ],
            })

            const tokensBoughtbbqTOcmj = data2[0]
            const tokensBoughtcuTOcmj = data2[1]
            const tokensBoughtjaspTOcmj = data2[2]
            const tokensBoughtosTOcmj = data2[3]
            const tokensBoughtgoldTOcmj = data2[4]

            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: jazziJDAO,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },                 
                ],
            }) : [0]

            const jdaolpBal = data3[0]

            return [
                tokensBoughtbbqTOcmj, tokensBoughtcuTOcmj, tokensBoughtjaspTOcmj, _reserveCmjJDAO, _reserveJDAO, _reserveCmjCU, _reserveCU, _reserveCmjJASP, _reserveJASP, 
                jdaolpBal, _reserveCmjOS, _reserveOS, tokensBoughtosTOcmj, _reserveCmjGOLD, _reserveGOLD, tokensBoughtgoldTOcmj,
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
            setPriceJDAO(Number(ethers.utils.formatEther(result[0])).toFixed(3))
            setPriceCU(Number(ethers.utils.formatEther(result[1])).toFixed(5))
            setPriceJASP(Number(ethers.utils.formatEther(result[2])).toFixed(3))

            setReserveCmjJdao(ethers.utils.formatEther(result[3]))
            setReserveJdao(ethers.utils.formatEther(result[4]))
            setReserveCmjCU(ethers.utils.formatEther(result[5]))
            setReserveCU(ethers.utils.formatEther(result[6]))
            setReserveCmjJASP(ethers.utils.formatEther(result[7]))
            setReserveJASP(ethers.utils.formatEther(result[8]))

            const _jdaolpbalance = ethers.utils.formatEther(result[9])
            setJdaoLpBalance(Math.floor(_jdaolpbalance * 100000) / 100000)

            setReserveCmjOS(ethers.utils.formatEther(result[10]))
            setReserveOS(ethers.utils.formatEther(result[11]))
            setPriceOS(Number(ethers.utils.formatEther(result[12])).toFixed(3))

            setReserveCmjGOLD(ethers.utils.formatEther(result[13]))
            setReserveGOLD(ethers.utils.formatEther(result[14]))
            setPriceGOLD(Number(ethers.utils.formatEther(result[15])).toFixed(3))
        })

    }, [address, erc20ABI, ammyStdABI])

    return (
        <div className="nftCard" style={{alignItems: "center", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
            <div style={{marginTop: "10px", width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                <div style={{height: "160px", width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                    <img src="https://nftstorage.link/ipfs/bafybeifwrprsashfhjrlbwnyvw4cb6pquyokfs3xm3wl6rt6bdzynpzhkm" width="260" alt="NPC_Jazzi" />
                </div>
                {mode === 1 &&
                    <>
                        <div style={{maxHeight: "75px"}}>
                            <div style={{fontSize: "20px", width: "380px"}} className="pixel">JAZZI, THE LUXURY COLLECTOR</div>
                            <div style={{fontSize: "10px", marginTop: "5px"}} className="light">"BUY/SELL ${gasselected}</div>
                            <div style={{fontSize: "10px"}} className="light">5% TAX"</div>
                            <div style={{marginTop: "5px", width: "90%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                <div style={{width: "70%", display: "flex", flexDirection: "row"}}>
                                    <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="JDAO">JDAO</option>
                                        <option value="CU">CU</option>
                                        <option value="GOLD">GOLD</option>
                                        <option value="JASP">JASP</option>
                                        <option value="OS">OS</option>
                                    </select>
                                    <div style={{fontSize: "16px", marginLeft: "5px", display: "flex", alignItems: "center", letterSpacing: "1px"}} className="pixel">
                                        &nbsp;1
                                        {gasselected === "JDAO" && <>&nbsp;<img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" width="22" alt="$JDAO"/> &nbsp;=&nbsp; <div className="emp">{priceJDAO}</div></>}
                                        {gasselected === "CU" && <>&nbsp;<img src="https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" width="22" alt="$CU"/> &nbsp;=&nbsp; <div className="emp">{priceCU}</div></>}
                                        {gasselected === "GOLD" && <>&nbsp;<img src="https://nftstorage.link/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm" width="22" alt="$GOLD"/> &nbsp;=&nbsp; <div className="emp">{priceGOLD}</div></>}
                                        {gasselected === "JASP" && <>&nbsp;GWEI&nbsp;<img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" width="22" alt="$JASP"/> &nbsp;=&nbsp; <div className="emp">{priceJASP}</div></>}
                                        {gasselected === "OS" && <>&nbsp;<img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" width="22" alt="$OS"/> &nbsp;=&nbsp; <div className="emp">{priceOS}</div></>}
                                        &nbsp;<img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="22" alt="$CMJ"/>
                                    </div>
                                </div>
                                {gasselected === "JDAO" && <div style={{width: "80px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={() => setMode(2)}>MANAGE LP</div>}
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
                                if (gasselected === "JDAO") {
                                    handleSwapJDAO(event)
                                } else if (gasselected === "CU") {
                                    handleSwapCU(event)
                                } else if (gasselected === "GOLD") {
                                    handleSwapGOLD(event)
                                } else if (gasselected === "JASP") {
                                    handleSwapJASP(event)
                                } else if (gasselected === "OS") {
                                    handleSwapOS(event)
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
                                        } else if (gasselected === "GOLD") {
                                            swapTokenHandleGOLD(true)
                                        } else if (gasselected === "JASP") {
                                            swapTokenHandleJASP(true)
                                        } else if (gasselected === "OS") {
                                            swapTokenHandleOS(true)
                                        }
                                    }
                                }>SELL</div> :
                                <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">SELL</div>
                            }
                            <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                                <div className="emp">
                                    {gasselected === "JDAO" && cmjBoughtJDAO}
                                    {gasselected === "CU" && cmjBoughtCU}
                                    {gasselected === "GOLD" && cmjBoughtGOLD}
                                    {gasselected === "JASP" && cmjBoughtJASP}
                                    {gasselected === "OS" && cmjBoughtOS}
                                </div>
                                $CMJ (
                                    {gasselected === "JDAO" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjJdao) - ((Number(reserveCmjJdao) * Number(reserveJdao)) / (Number(reserveJdao) + Number(inputSwap))))) - (Number(reserveJdao/reserveCmjJdao))) / (Number(reserveJdao/reserveCmjJdao))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "CU" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjCU) - ((Number(reserveCmjCU) * Number(reserveCU)) / (Number(reserveCU) + Number(inputSwap))))) - (Number(reserveCU/reserveCmjCU))) / (Number(reserveCU/reserveCmjCU))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "GOLD" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjGOLD) - ((Number(reserveCmjGOLD) * Number(reserveGOLD)) / (Number(reserveGOLD) + Number(inputSwap))))) - (Number(reserveGOLD/reserveCmjGOLD))) / (Number(reserveGOLD/reserveCmjGOLD))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "JASP" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap/10**9) / (Number(reserveCmjJASP) - ((Number(reserveCmjJASP) * Number(reserveJASP)) / (Number(reserveJASP) + Number(inputSwap/10**9))))) - (Number(reserveJASP/reserveCmjJASP))) / (Number(reserveJASP/reserveCmjJASP))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "OS" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjOS) - ((Number(reserveCmjOS) * Number(reserveOS)) / (Number(reserveOS) + Number(inputSwap))))) - (Number(reserveOS/reserveCmjOS))) / (Number(reserveOS/reserveCmjOS))) * 100)).toFixed(2)}%</>}
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
                                if (gasselected === "JDAO") {
                                    handleSwapJDAO_2(event)
                                } else if (gasselected === "CU") {
                                    handleSwapCU_2(event)
                                } else if (gasselected === "GOLD") {
                                    handleSwapGOLD_2(event)
                                } else if (gasselected === "JASP") {
                                    handleSwapJASP_2(event)
                                } else if (gasselected === "OS") {
                                    handleSwapOS_2(event)
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
                                        } else if (gasselected === "GOLD") {
                                            swapTokenHandleGOLD(false)
                                        } else if (gasselected === "JASP") {
                                            swapTokenHandleJASP(false)
                                        } else if (gasselected === "OS") {
                                            swapTokenHandleOS(false)
                                        }
                                    }
                                }>BUY</div> :
                                <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BUY</div>
                            }
                            <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                                <div style={{color: "#67BAA7"}}>
                                    {gasselected === "JDAO" && tokenBoughtJDAO}
                                    {gasselected === "CU" && tokenBoughtCU}
                                    {gasselected === "GOLD" && tokenBoughtGOLD}
                                    {gasselected === "JASP" && tokenBoughtJASP}
                                    {gasselected === "OS" && tokenBoughtOS}
                                </div>
                                ${gasselected} ( 
                                    {gasselected === "JDAO" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveJdao) - ((Number(reserveJdao) * Number(reserveCmjJdao)) / (Number(reserveCmjJdao) + Number(inputSwap2))))) - (Number(reserveCmjJdao/reserveJdao))) / (Number(reserveCmjJdao/reserveJdao))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "CU" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveCU) - ((Number(reserveCU) * Number(reserveCmjCU)) / (Number(reserveCmjCU) + Number(inputSwap2))))) - (Number(reserveCmjCU/reserveCU))) / (Number(reserveCmjCU/reserveCU))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "GOLD" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveGOLD) - ((Number(reserveGOLD) * Number(reserveCmjGOLD)) / (Number(reserveCmjGOLD) + Number(inputSwap2))))) - (Number(reserveCmjGOLD/reserveGOLD))) / (Number(reserveCmjGOLD/reserveGOLD))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "JASP" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveJASP) - ((Number(reserveJASP) * Number(reserveCmjJASP)) / (Number(reserveCmjJASP) + Number(inputSwap2))))) - (Number(reserveCmjJASP/reserveJASP))) / (Number(reserveCmjJASP/reserveJASP))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "OS" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveOS) - ((Number(reserveOS) * Number(reserveCmjOS)) / (Number(reserveCmjOS) + Number(inputSwap2))))) - (Number(reserveCmjOS/reserveOS))) / (Number(reserveCmjOS/reserveOS))) * 100)).toFixed(2)}%</>}
                                    {Number(inputSwap2) === 0 && <>0.00%</>}
                                )
                            </div>
                        </div>
                    </>
                }
                {mode === 2 ?
                    <div style={{width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                        <div style={{maxHeight: "75px"}}>
                            <div style={{fontSize: "20px", width: "380px"}} className="pixel">JAZZI, THE LUXURY COLLECTOR</div>
                            <div style={{fontSize: "10px", marginTop: "5px"}} className="light">"ADD/REMOVE {gasselected}-CMJ LP</div>
                            <div style={{fontSize: "10px"}} className="light">READY TO JOIN MY BUSINESS?"</div>
                            <div style={{marginTop: "5px", width: "90%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                <div style={{width: "70%", display: "flex", flexDirection: "row"}}>
                                    <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="JDAO">JDAO</option>
                                    </select>
                                    <div style={{fontSize: "14px", marginLeft: "5px", display: "flex", alignItems: "center"}} className="pixel">
                                        {gasselected === "JDAO" ? <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(jdaoLpBalance).toFixed(4)}</div></> : ''}
                                    </div>
                                </div>
                                <div style={{width: "80px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={() => setMode(1)}>SWAP NOW</div>
                            </div>
                        </div>
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                        <div style={{marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <input style={{width: "255px", padding: "5px", border: "1px solid #dddade", fontSize: "14px"}} type="number" placeholder={"0 " + gasselected + "-CMJ LP"} className="bold" onChange={(event) => setJdaoLpSell(event.target.value)} value={jdaoLpSell}></input>
                            <div style={{width: "60px", textAlign: "center", fontSize: "16px", padding: "5px", marginLeft: "5px", background: "#ff007a", color: "#fff", border: "none", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={removeJdaoLp}>REMOVE</div>
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
                                if (gasselected === "JDAO") {
                                    handleAddJdao(event)
                                }
                            }}
                            value={jdaoAdd}
                        ></input>
                        <div style={{width: "100%", margin: "5px", fontSize: "14px"}} className="fa fa-plus"></div>
                        <input
                            style={{width: "90%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "14px"}}
                            className="bold"
                            type="number"
                            step="1"
                            min="1"
                            placeholder="0 $CMJ"
                            onChange={(event) => {
                                if (gasselected === "JDAO") {
                                    handleAddJdao2(event)
                                }
                            }}
                            value={cmjAdd}
                        ></input>
                        <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            {address !== null && address !== undefined ?
                                <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                                    () => {
                                        if (gasselected === "JDAO") {
                                            addJdaoLpHandle()
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

export default Ammmerchant2
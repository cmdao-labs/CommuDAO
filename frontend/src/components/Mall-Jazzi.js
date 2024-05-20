import React from 'react'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const jdaoToken = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'
const cuToken = '0x42f5213c7b6281fc6fb2d6f10576f70db0a4c841'
const silToken = '0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f'
const goldToken = '0x7d5346E33889580528e6F79f48BdEE94D8A9E144'
const platToken = '0x3Bd00B6cd18281E3Ef13Ba348ad2783794dcb2bD'
const jaspToken = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const osToken = '0xAc5299D92373E9352636559cca497d7683A47655'
const cmjToken = '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b'
const jazziJDAO = '0x3C061eEce15C539CaE99FbE75B3044236Fa2eff0'
const jazziCU = '0x1b70c95fD4EbF8920A624bd2ce22b6905eFBdF60'
const jazziSIL = '0xf189c5B03694b70e5DFD8e8CAE84118Ed7616F19'
const jazziGOLD = '0x7086EC7ED5D94ef503bE324B0aE8A3748A15fAE5'
const jazziPLAT = '0x78Ff63F4f91Ce56f72882ef9dbE3Be79fBF15044'
const jazziJasp = '0xc19DE37d5e14b387BCda8e62aB4934591315901D'
const jazziOS = '0x329889325A555b217C41A4c2EADD529a0CfA4231'

const providerIPFS = "https://w3storag.lazyplayerone.xyz/ipfs/"

const Ammmerchant2 = ({ setisLoading, setTxupdate, cmdaoAmmNpcABI, erc20ABI, jdaoBalance, cuBalance, silBalance, goldBalance, jaspBalance, osBalance, platBalance, cmjBalance }) => {
    const { address } = useAccount()
    const [mode, setMode] = React.useState(1)
    const [gasselected, setGasselected] = React.useState("JDAO");

    const [inputSwap, setInputSwap] = React.useState("")
    const [inputSwap2, setInputSwap2] = React.useState("")

    const [lpSell, setLpSell] = React.useState("")
    const [tokenAdd, setTokenAdd] = React.useState("")
    const [currAdd, setCurrAdd] = React.useState("")

    const [cmjBoughtJDAO, setCmjBoughtJDAO] = React.useState("0.000")
    const [tokenBoughtJDAO, setTokenBoughtJDAO] = React.useState("0.000")
    const [priceJDAO, setPriceJDAO] = React.useState("0.000")
    const [reserveCmjJdao, setReserveCmjJdao] = React.useState("")
    const [reserveJdao, setReserveJdao] = React.useState("")
    const [jdaoLpBalance, setJdaoLpBalance] = React.useState("0")

    const [cmjBoughtCU, setCmjBoughtCU] = React.useState("0.000")
    const [tokenBoughtCU, setTokenBoughtCU] = React.useState("0.000")
    const [priceCU, setPriceCU] = React.useState("0.000")
    const [reserveCmjCU, setReserveCmjCU] = React.useState("")
    const [reserveCU, setReserveCU] = React.useState("")
    const [cuLpBalance, setCuLpBalance] = React.useState("0")

    const [cmjBoughtSIL, setCmjBoughtSIL] = React.useState("0.000")
    const [tokenBoughtSIL, setTokenBoughtSIL] = React.useState("0.000")
    const [priceSIL, setPriceSIL] = React.useState("0.000")
    const [reserveCmjSIL, setReserveCmjSIL] = React.useState("")
    const [reserveSIL, setReserveSIL] = React.useState("")
    const [silLpBalance, setSilLpBalance] = React.useState("0")

    const [cmjBoughtGOLD, setCmjBoughtGOLD] = React.useState("0.000")
    const [tokenBoughtGOLD, setTokenBoughtGOLD] = React.useState("0.000")
    const [priceGOLD, setPriceGOLD] = React.useState("0.000")
    const [reserveCmjGOLD, setReserveCmjGOLD] = React.useState("")
    const [reserveGOLD, setReserveGOLD] = React.useState("")
    const [goldLpBalance, setGoldLpBalance] = React.useState("0")

    const [cmjBoughtPLAT, setCmjBoughtPLAT] = React.useState("0.000")
    const [tokenBoughtPLAT, setTokenBoughtPLAT] = React.useState("0.000")
    const [pricePLAT, setPricePLAT] = React.useState("0.000")
    const [reserveCmjPLAT, setReserveCmjPLAT] = React.useState("")
    const [reservePLAT, setReservePLAT] = React.useState("")
    const [platLpBalance, setPlatLpBalance] = React.useState("0")

    const [cmjBoughtJASP, setCmjBoughtJASP] = React.useState("0.000")
    const [tokenBoughtJASP, setTokenBoughtJASP] = React.useState("0.000")
    const [priceJASP, setPriceJASP] = React.useState("0.000")
    const [reserveCmjJASP, setReserveCmjJASP] = React.useState("")
    const [reserveJASP, setReserveJASP] = React.useState("")
    const [jaspLpBalance, setJaspLpBalance] = React.useState("0")

    const [cmjBoughtOS, setCmjBoughtOS] = React.useState("0.000")
    const [tokenBoughtOS, setTokenBoughtOS] = React.useState("0.000")
    const [priceOS, setPriceOS] = React.useState("0.000")
    const [reserveCmjOS, setReserveCmjOS] = React.useState("")
    const [reserveOS, setReserveOS] = React.useState("")
    const [osLpBalance, setOsLpBalance] = React.useState("0")

    const handleSwapUni = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = jazziSIL
        } else if (index === 2) {
            addr = jazziGOLD
        } else if (index === 3) {
            addr = jazziJasp
        } else if (index === 4) {
            addr = jazziJDAO
        } else if (index === 5) {
            addr = jazziCU
        } else if (index === 6) {
            addr = jazziOS
        } else if (index === 7) {
            addr = jazziPLAT
        }
        setInputSwap(event.target.value)
        let _value = 0
        if (index === 3) {
            _value = event.target.value !== "" ? ethers.utils.parseUnits(event.target.value, "gwei") : 0
        } else {
            _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        }
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
            event.target.value !== "" ? setCmjBoughtSIL(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setCmjBoughtSIL("0.000")
        } else if (index === 2) {
            event.target.value !== "" ? setCmjBoughtGOLD(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setCmjBoughtGOLD("0.000")
        } else if (index === 3) {
            event.target.value !== "" ? setCmjBoughtJASP(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setCmjBoughtJASP("0.000")
        } else if (index === 4) {
            event.target.value !== "" ? setCmjBoughtJDAO(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setCmjBoughtJDAO("0.000")
        } else if (index === 5) {
            event.target.value !== "" ? setCmjBoughtCU(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setCmjBoughtCU("0.000")
        } else if (index === 6) {
            event.target.value !== "" ? setCmjBoughtOS(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setCmjBoughtOS("0.000")
        } else if (index === 7) {
            event.target.value !== "" ? setCmjBoughtPLAT(ethers.utils.formatEther(tokensBoughttokenTOcurr)) : setCmjBoughtPLAT("0.000")
        }
    }
    const handleSwapUni_2 = async (index, event) => {
        let addr = '0x0000000000000000000000000000000000000000'
        if (index === 1) {
            addr = jazziSIL
        } else if (index === 2) {
            addr = jazziGOLD
        } else if (index === 3) {
            addr = jazziJasp
        } else if (index === 4) {
            addr = jazziJDAO
        } else if (index === 5) {
            addr = jazziCU
        } else if (index === 6) {
            addr = jazziOS
        } else if (index === 7) {
            addr = jazziPLAT
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
            event.target.value !== "" ? setTokenBoughtSIL(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setTokenBoughtSIL("0.000")
        } else if (index === 2) {
            event.target.value !== "" ? setTokenBoughtGOLD(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setTokenBoughtGOLD("0.000")
        } else if (index === 3) {
            event.target.value !== "" ? setTokenBoughtJASP(ethers.utils.formatUnits(String(tokensBoughtcurrTOtoken), "gwei")) : setTokenBoughtJASP("0.000")
        } else if (index === 4) {
            event.target.value !== "" ? setTokenBoughtJDAO(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setTokenBoughtJDAO("0.000")
        } else if (index === 5) {
            event.target.value !== "" ? setTokenBoughtCU(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setTokenBoughtCU("0.000")
        } else if (index === 6) {
            event.target.value !== "" ? setTokenBoughtOS(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setTokenBoughtOS("0.000")
        } else if (index === 7) {
            event.target.value !== "" ? setTokenBoughtPLAT(ethers.utils.formatEther(tokensBoughtcurrTOtoken)) : setTokenBoughtPLAT("0.000")
        }
    }

    const swapTokenHandleUni = async (index, _sell) => {
        let lp = '0x0000000000000000000000000000000000000000'
        let token = '0x0000000000000000000000000000000000000000'
        let curr = cmjToken
        let currBoughtToken = '0'
        let tokenBoughtCurr = '0'
        if (index === 1) {
            lp = jazziSIL
            token = silToken
            currBoughtToken = cmjBoughtSIL
            tokenBoughtCurr = tokenBoughtSIL
        } else if (index === 2) {
            lp = jazziGOLD
            token = goldToken
            currBoughtToken = cmjBoughtGOLD
            tokenBoughtCurr = tokenBoughtGOLD
        } else if (index === 3) {
            lp = jazziJasp
            token = jaspToken
            currBoughtToken = cmjBoughtJASP
            tokenBoughtCurr = tokenBoughtJASP
        } else if (index === 4) {
            lp = jazziJDAO
            token = jdaoToken
            currBoughtToken = cmjBoughtJDAO
            tokenBoughtCurr = tokenBoughtJDAO
        } else if (index === 5) {
            lp = jazziCU
            token = cuToken
            currBoughtToken = cmjBoughtCU
            tokenBoughtCurr = tokenBoughtCU
        } else if (index === 6) {
            lp = jazziOS
            token = osToken
            currBoughtToken = cmjBoughtOS
            tokenBoughtCurr = tokenBoughtOS
        } else if (index === 7) {
            lp = jazziPLAT
            token = platToken
            currBoughtToken = cmjBoughtPLAT
            tokenBoughtCurr = tokenBoughtPLAT
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
                let config = null
                if (index === 3) {
                    config = await prepareWriteContract({
                        address: lp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'tokenTOcurrency',
                        args: [ethers.utils.parseUnits(inputSwap, "gwei"), ethers.utils.parseEther(currBoughtToken)],
                    })
                } else {
                    config = await prepareWriteContract({
                        address: lp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'tokenTOcurrency',
                        args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(currBoughtToken)],
                    })
                }
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
                let config2 = null
                if (index === 3) {
                    config2 = await prepareWriteContract({
                        address: lp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'currencyTOtoken',
                        args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseUnits(String(tokenBoughtCurr), "gwei")],
                    })
                } else {
                    config2 = await prepareWriteContract({
                        address: lp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'currencyTOtoken',
                        args: [ethers.utils.parseEther(inputSwap2), ethers.utils.parseEther(tokenBoughtCurr)],
                    })
                }
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
            addr = jazziSIL
        } else if (index === 2) {
            addr = jazziGOLD
        } else if (index === 3) {
            addr = jazziJasp
        } else if (index === 4) {
            addr = jazziJDAO
        } else if (index === 5) {
            addr = jazziCU
        } else if (index === 6) {
            addr = jazziOS
        } else if (index === 7) {
            addr = jazziPLAT
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
            addr = jazziSIL
        } else if (index === 2) {
            addr = jazziGOLD
        } else if (index === 3) {
            addr = jazziJasp
        } else if (index === 4) {
            addr = jazziJDAO
        } else if (index === 5) {
            addr = jazziCU
        } else if (index === 6) {
            addr = jazziOS
        } else if (index === 7) {
            addr = jazziPLAT
        }
        setTokenAdd(event.target.value)
        let _value = 0
        if (index === 3) {
            _value = event.target.value !== "" ? ethers.utils.parseUnits(event.target.value, "gwei") : 0
        } else {
            _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        }
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
            addr = jazziSIL
        } else if (index === 2) {
            addr = jazziGOLD
        } else if (index === 3) {
            addr = jazziJasp
        } else if (index === 4) {
            addr = jazziJDAO
        } else if (index === 5) {
            addr = jazziCU
        } else if (index === 6) {
            addr = jazziOS
        } else if (index === 7) {
            addr = jazziPLAT
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
        if (index === 3) {
            event.target.value !== "" ? setTokenAdd(ethers.utils.formatUnits(((bigValue.mul(bigTokenReserv)).div(bigCurrReserv)), "gwei")) : setTokenAdd("")
        } else {
            event.target.value !== "" ? setTokenAdd(ethers.utils.formatEther(((bigValue.mul(bigTokenReserv)).div(bigCurrReserv)))) : setTokenAdd("")
        }
    }
    const addLpHandleUni = async (index) => {
        let lp = '0x0000000000000000000000000000000000000000'
        let token = '0x0000000000000000000000000000000000000000'
        let curr = cmjToken
        if (index === 1) {
            lp = jazziSIL
            token = silToken
        } else if (index === 2) {
            lp = jazziGOLD
            token = goldToken
        } else if (index === 3) {
            lp = jazziJasp
            token = jaspToken
        } else if (index === 4) {
            lp = jazziJDAO
            token = jdaoToken
        } else if (index === 5) {
            lp = jazziCU
            token = cuToken
        } else if (index === 6) {
            lp = jazziOS
            token = osToken
        } else if (index === 7) {
            lp = jazziPLAT
            token = platToken
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
            let config3 = null
            if (index === 3) {
                config3 = await prepareWriteContract({
                    address: lp,
                    abi: cmdaoAmmNpcABI,
                    functionName: 'addLiquidity',
                    args: [ethers.utils.parseUnits(tokenAdd, "gwei"), ethers.utils.parseEther(currAdd)],
                })
            } else {
                config3 = await prepareWriteContract({
                    address: lp,
                    abi: cmdaoAmmNpcABI,
                    functionName: 'addLiquidity',
                    args: [ethers.utils.parseEther(tokenAdd), ethers.utils.parseEther(currAdd)],
                })
            }
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
                        address: jazziJDAO,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: jazziJDAO,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: jazziCU,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: jazziCU,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: jazziJasp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: jazziJasp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: jazziOS,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: jazziOS,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: jazziGOLD,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: jazziGOLD,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: jazziSIL,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: jazziSIL,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: jazziPLAT,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: jazziPLAT,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                ],
            })

            const _reserveCmjJDAO = data[0].result
            const _reserveJDAO = data[1].result
            const _reserveCmjCU = data[2].result
            const _reserveCU = data[3].result
            const _reserveCmjJASP = data[4].result
            const _reserveJASP = data[5].result
            const _reserveCmjOS = data[6].result
            const _reserveOS = data[7].result
            const _reserveCmjGOLD = data[8].result
            const _reserveGOLD = data[9].result
            const _reserveCmjSIL = data[10].result
            const _reserveSIL = data[11].result
            const _reserveCmjPLAT = data[12].result
            const _reservePLAT = data[13].result

            const data2 = await readContracts({
                contracts: [
                    {
                        address: jazziJDAO,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveJDAO), String(_reserveCmjJDAO)],
                    },
                    {
                        address: jazziCU,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveCU), String(_reserveCmjCU)],
                    },
                    {
                        address: jazziJasp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**9), String(_reserveJASP), String(_reserveCmjJASP)],
                    },
                    {
                        address: jazziOS,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveOS), String(_reserveCmjOS)],
                    },
                    {
                        address: jazziGOLD,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveGOLD), String(_reserveCmjGOLD)],
                    },
                    {
                        address: jazziSIL,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reserveSIL), String(_reserveCmjSIL)],
                    },
                    {
                        address: jazziPLAT,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getAmountOfTokens',
                        args: [String(10**18), String(_reservePLAT), String(_reserveCmjPLAT)],
                    },
                ],
            })

            const tokensBoughtbbqTOcmj = data2[0].result
            const tokensBoughtcuTOcmj = data2[1].result
            const tokensBoughtjaspTOcmj = data2[2].result
            const tokensBoughtosTOcmj = data2[3].result
            const tokensBoughtgoldTOcmj = data2[4].result
            const tokensBoughtsilTOcmj = data2[5].result
            const tokensBoughtplatTOcmj = data2[6].result

            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: jazziJDAO,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: jazziCU,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: jazziSIL,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: jazziGOLD,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: jazziJasp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: jazziOS,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: jazziPLAT,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                ],
            }) : [{result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0},]

            const jdaolpBal = data3[0].result
            const culpBal = data3[1].result
            const sillpBal = data3[2].result
            const goldlpBal = data3[3].result
            const jasplpBal = data3[4].result
            const oslpBal = data3[5].result
            const platlpBal = data3[6].result

            return [
                tokensBoughtbbqTOcmj, tokensBoughtcuTOcmj, tokensBoughtjaspTOcmj, 
                _reserveCmjJDAO, _reserveJDAO, _reserveCmjCU, 
                _reserveCU, _reserveCmjJASP, _reserveJASP, 
                jdaolpBal, culpBal,
                _reserveCmjOS, _reserveOS, tokensBoughtosTOcmj,
                _reserveCmjGOLD, _reserveGOLD, tokensBoughtgoldTOcmj,
                _reserveCmjSIL, _reserveSIL, tokensBoughtsilTOcmj,
                sillpBal, goldlpBal, jasplpBal, oslpBal,
                _reserveCmjPLAT, _reservePLAT, tokensBoughtplatTOcmj, platlpBal,
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
            setPriceCU(Number(ethers.utils.formatEther(result[1])).toFixed(8))
            setPriceJASP(Number(ethers.utils.formatEther(result[2])).toFixed(3))

            setReserveCmjJdao(ethers.utils.formatEther(result[3]))
            setReserveJdao(ethers.utils.formatEther(result[4]))

            setReserveCmjCU(ethers.utils.formatEther(result[5]))
            setReserveCU(ethers.utils.formatEther(result[6]))

            setReserveCmjJASP(ethers.utils.formatEther(result[7]))
            setReserveJASP(ethers.utils.formatEther(result[8]))

            const _jdaolpbalance = ethers.utils.formatEther(result[9])
            setJdaoLpBalance(Math.floor(_jdaolpbalance * 100000) / 100000)
            const _culpbalance = ethers.utils.formatEther(result[10])
            setCuLpBalance(Math.floor(_culpbalance * 100000) / 100000)

            setReserveCmjOS(ethers.utils.formatEther(result[11]))
            setReserveOS(ethers.utils.formatEther(result[12]))
            setPriceOS(Number(ethers.utils.formatEther(result[13])).toFixed(3))

            setReserveCmjGOLD(ethers.utils.formatEther(result[14]))
            setReserveGOLD(ethers.utils.formatEther(result[15]))
            setPriceGOLD(Number(ethers.utils.formatEther(result[16])).toFixed(3))

            setReserveCmjSIL(ethers.utils.formatEther(result[17]))
            setReserveSIL(ethers.utils.formatEther(result[18]))
            result[19] !== null && setPriceSIL(Number(ethers.utils.formatEther(result[19])).toFixed(8))

            const _sillpbalance = ethers.utils.formatEther(result[20])
            setSilLpBalance(Math.floor(_sillpbalance * 100000) / 100000)
            const _goldlpbalance = ethers.utils.formatEther(result[21])
            setGoldLpBalance(Math.floor(_goldlpbalance * 100000) / 100000)
            const _jasplpbalance = ethers.utils.formatEther(result[22])
            setJaspLpBalance(Math.floor(_jasplpbalance * 100000) / 100000)
            const _oslpbalance = ethers.utils.formatEther(result[23])
            setOsLpBalance(Math.floor(_oslpbalance * 100000) / 100000)

            setReserveCmjPLAT(ethers.utils.formatEther(result[24]))
            setReservePLAT(ethers.utils.formatEther(result[25]))
            result[26] !== null && setPricePLAT(Number(ethers.utils.formatEther(result[26])).toFixed(3))
            const _platlpbalance = ethers.utils.formatEther(result[27])
            setPlatLpBalance(Math.floor(_platlpbalance * 100000) / 100000)
        })

    }, [address, erc20ABI, cmdaoAmmNpcABI])

    return (
        <div className="nftCard" style={{alignItems: "center", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
            <div style={{marginTop: "10px", width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                <div style={{height: "160px", width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                    <img src={providerIPFS + "bafybeifwrprsashfhjrlbwnyvw4cb6pquyokfs3xm3wl6rt6bdzynpzhkm"} width="260" alt="NPC_Jazzi" />
                </div>
                {mode === 1 &&
                    <>
                        <div style={{maxHeight: "75px"}}>
                            <div style={{fontSize: "20px", width: "380px"}} className="pixel">JAZZI, THE LUXURY COLLECTOR</div>
                            <div style={{fontSize: "10px", marginTop: "5px"}} className="light">"BUY/SELL ${gasselected}</div>
                            <div style={{fontSize: "10px"}} className="light">5% TAX"</div>
                            <div style={{marginTop: "5px", width: "95%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                <div style={{width: "70%", display: "flex", flexDirection: "row"}}>
                                    <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="JDAO">JDAO</option>
                                        <option value="OS">OS</option>
                                        <option value="CU">CU</option>
                                        <option value="SIL">SIL</option>
                                        <option value="GOLD">GOLD</option>
                                        <option value="PLAT">PLAT</option>
                                        <option value="JASP">JASP</option>
                                    </select>
                                    <div style={{fontSize: "16px", marginLeft: "1px", display: "flex", alignItems: "center", letterSpacing: "1px"}} className="pixel">
                                        &nbsp;1
                                        {gasselected === "JDAO" && <>&nbsp;<img src={providerIPFS + "bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq"} width="22" alt="$JDAO"/> &nbsp;=&nbsp; <div className="emp">{priceJDAO}</div></>}
                                        {gasselected === "CU" && <>&nbsp;<img src={providerIPFS + "bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq"} width="22" alt="$CU"/> &nbsp;=&nbsp; <div className="emp">{priceCU}</div></>}
                                        {gasselected === "SIL" && <>&nbsp;<img src={providerIPFS + "bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde"} width="22" alt="$SIL"/> &nbsp;=&nbsp; <div className="emp">{priceSIL}</div></>}
                                        {gasselected === "GOLD" && <>&nbsp;<img src={providerIPFS + "bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm"} width="22" alt="$GOLD"/> &nbsp;=&nbsp; <div className="emp">{priceGOLD}</div></>}
                                        {gasselected === "JASP" && <>&nbsp;GWEI&nbsp;<img src={providerIPFS + "bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy"} width="22" alt="$JASP"/> &nbsp;=&nbsp; <div className="emp">{priceJASP}</div></>}
                                        {gasselected === "OS" && <>&nbsp;<img src={providerIPFS + "bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e"} width="22" alt="$OS"/> &nbsp;=&nbsp; <div className="emp">{priceOS}</div></>}
                                        {gasselected === "PLAT" && <>&nbsp;<img src={providerIPFS + "bafkreibf7vowyqjrcaeyslflrxxchel3b4qdpwxcxb34js2otg35vjkcaa"} width="22" alt="$PLAT"/> &nbsp;=&nbsp; <div className="emp">{pricePLAT}</div></>}
                                        &nbsp;<img src={providerIPFS + "bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u"} width="22" alt="$CMJ"/>
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
                                    if (gasselected === "JDAO") {
                                        handleSwapUni(4, event)
                                    } else if (gasselected === "CU") {
                                        handleSwapUni(5, event)
                                    } else if (gasselected === "SIL") {
                                        handleSwapUni(1, event)
                                    } else if (gasselected === "GOLD") {
                                        handleSwapUni(2, event)
                                    } else if (gasselected === "JASP") {
                                        handleSwapUni(3, event)
                                    } else if (gasselected === "OS") {
                                        handleSwapUni(6, event)
                                    } else if (gasselected === "PLAT") {
                                        handleSwapUni(7, event)
                                    }
                                }}
                                value={inputSwap}
                            ></input>
                            {gasselected === "JDAO" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: jdaoBalance}}; handleSwapUni(4, bal);}}>
                                    <img src={providerIPFS + "bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq"} width="22" alt="$JDAO"/>
                                    <div style={{marginLeft: "5px"}}>{Number(jdaoBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "CU" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: cuBalance}}; handleSwapUni(5, bal);}}>
                                    <img src={providerIPFS + "bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq"} width="22" alt="$CU"/>
                                    <div style={{marginLeft: "5px"}}>{Number(cuBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "SIL" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: silBalance}}; handleSwapUni(1, bal);}}>
                                    <img src={providerIPFS + "bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde"} width="22" alt="$SIL"/>
                                    <div style={{marginLeft: "5px"}}>{Number(silBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "GOLD" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: goldBalance}}; handleSwapUni(2, bal);}}>
                                    <img src={providerIPFS + "bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm"} width="22" alt="$GOLD"/>
                                    <div style={{marginLeft: "5px"}}>{Number(goldBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "JASP" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: jaspBalance}}; handleSwapUni(3, bal);}}>
                                    <img src={providerIPFS + "bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy"} width="22" alt="$JASP"/>
                                    <div style={{marginLeft: "5px"}}>{Number(jaspBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "OS" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: osBalance}}; handleSwapUni(6, bal);}}>
                                    <img src={providerIPFS + "bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e"} width="22" alt="$OS"/>
                                    <div style={{marginLeft: "5px"}}>{Number(osBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "PLAT" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: platBalance}}; handleSwapUni(7, bal);}}>
                                    <img src={providerIPFS + "bafkreibf7vowyqjrcaeyslflrxxchel3b4qdpwxcxb34js2otg35vjkcaa"} width="22" alt="$PLAT"/>
                                    <div style={{marginLeft: "5px"}}>{Number(platBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                        </div>
                        <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            {address !== null && address !== undefined ?
                                <div style={{width: "30px"}} className="pixel button" onClick={
                                    () => {
                                        if (gasselected === "JDAO") {
                                            swapTokenHandleUni(4, true)
                                        } else if (gasselected === "CU") {
                                            swapTokenHandleUni(5, true)
                                        } else if (gasselected === "SIL") {
                                            swapTokenHandleUni(1, true)
                                        } else if (gasselected === "GOLD") {
                                            swapTokenHandleUni(2, true)
                                        } else if (gasselected === "JASP") {
                                            swapTokenHandleUni(3, true)
                                        } else if (gasselected === "OS") {
                                            swapTokenHandleUni(6, true)
                                        } else if (gasselected === "PLAT") {
                                            swapTokenHandleUni(7, true)
                                        }
                                    }
                                }>SELL</div> :
                                <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">SELL</div>
                            }
                            <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                                <div className="emp">
                                    {gasselected === "JDAO" && Number(cmjBoughtJDAO).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    {gasselected === "CU" && Number(cmjBoughtCU).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    {gasselected === "SIL" && Number(cmjBoughtSIL).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    {gasselected === "GOLD" && Number(cmjBoughtGOLD).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    {gasselected === "JASP" && Number(cmjBoughtJASP).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    {gasselected === "OS" && Number(cmjBoughtOS).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    {gasselected === "PLAT" && Number(cmjBoughtPLAT).toLocaleString('en-US', {maximumFractionDigits:3})}
                                </div>
                                $CMJ (
                                    {gasselected === "JDAO" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjJdao) - ((Number(reserveCmjJdao) * Number(reserveJdao)) / (Number(reserveJdao) + Number(inputSwap))))) - (Number(reserveJdao/reserveCmjJdao))) / (Number(reserveJdao/reserveCmjJdao))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "CU" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjCU) - ((Number(reserveCmjCU) * Number(reserveCU)) / (Number(reserveCU) + Number(inputSwap))))) - (Number(reserveCU/reserveCmjCU))) / (Number(reserveCU/reserveCmjCU))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "SIL" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjSIL) - ((Number(reserveCmjSIL) * Number(reserveSIL)) / (Number(reserveSIL) + Number(inputSwap))))) - (Number(reserveSIL/reserveCmjSIL))) / (Number(reserveSIL/reserveCmjSIL))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "GOLD" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjGOLD) - ((Number(reserveCmjGOLD) * Number(reserveGOLD)) / (Number(reserveGOLD) + Number(inputSwap))))) - (Number(reserveGOLD/reserveCmjGOLD))) / (Number(reserveGOLD/reserveCmjGOLD))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "JASP" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap/10**9) / (Number(reserveCmjJASP) - ((Number(reserveCmjJASP) * Number(reserveJASP)) / (Number(reserveJASP) + Number(inputSwap/10**9))))) - (Number(reserveJASP/reserveCmjJASP))) / (Number(reserveJASP/reserveCmjJASP))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "OS" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjOS) - ((Number(reserveCmjOS) * Number(reserveOS)) / (Number(reserveOS) + Number(inputSwap))))) - (Number(reserveOS/reserveCmjOS))) / (Number(reserveOS/reserveCmjOS))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "PLAT" && Number(inputSwap) !== 0 && <>{Number(((((Number(inputSwap) / (Number(reserveCmjPLAT) - ((Number(reserveCmjPLAT) * Number(reservePLAT)) / (Number(reservePLAT) + Number(inputSwap))))) - (Number(reservePLAT/reserveCmjPLAT))) / (Number(reservePLAT/reserveCmjPLAT))) * 100)).toFixed(2)}%</>}
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
                                    if (gasselected === "JDAO") {
                                        handleSwapUni_2(4, event)
                                    } else if (gasselected === "CU") {
                                        handleSwapUni_2(5, event)
                                    } else if (gasselected === "SIL") {
                                        handleSwapUni_2(1, event)
                                    } else if (gasselected === "GOLD") {
                                        handleSwapUni_2(2, event)
                                    } else if (gasselected === "JASP") {
                                        handleSwapUni_2(3, event)
                                    } else if (gasselected === "OS") {
                                        handleSwapUni_2(6, event)
                                    } else if (gasselected === "PLAT") {
                                        handleSwapUni_2(7, event)
                                    }
                                }}
                                value={inputSwap2}
                            ></input>
                            <div
                                style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}}
                                onClick={() => {
                                    const bal = {target: {value: cmjBalance}};
                                    if (gasselected === "JDAO") {
                                        handleSwapUni_2(4, bal)
                                    } else if (gasselected === "CU") {
                                        handleSwapUni_2(5, bal)
                                    } else if (gasselected === "SIL") {
                                        handleSwapUni_2(1, bal)
                                    } else if (gasselected === "GOLD") {
                                        handleSwapUni_2(2, bal)
                                    } else if (gasselected === "JASP") {
                                        handleSwapUni_2(3, bal)
                                    } else if (gasselected === "OS") {
                                        handleSwapUni_2(6, bal)
                                    } else if (gasselected === "PLAT") {
                                        handleSwapUni_2(7, bal)
                                    }
                                }}
                            >
                                <img src={providerIPFS + "bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u"} width="22" alt="$CMJ"/>
                                <div style={{marginLeft: "5px"}}>{Number(cmjBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                            </div>
                        </div>
                        <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            {address !== null && address !== undefined ?
                                <div style={{width: "30px", background: "#67BAA7"}} className="pixel button" onClick={
                                    () => {
                                        if (gasselected === "JDAO") {
                                            swapTokenHandleUni(4, false)
                                        } else if (gasselected === "CU") {
                                            swapTokenHandleUni(5, false)
                                        } else if (gasselected === "SIL") {
                                            swapTokenHandleUni(1, false)
                                        } else if (gasselected === "GOLD") {
                                            swapTokenHandleUni(2, false)
                                        } else if (gasselected === "JASP") {
                                            swapTokenHandleUni(3, false)
                                        } else if (gasselected === "OS") {
                                            swapTokenHandleUni(6, false)
                                        } else if (gasselected === "PLAT") {
                                            swapTokenHandleUni(7, false)
                                        }
                                    }
                                }>BUY</div> :
                                <div style={{width: "30px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BUY</div>
                            }
                            <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                                <div style={{color: "#67BAA7"}}>
                                    {gasselected === "JDAO" && Number(tokenBoughtJDAO).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    {gasselected === "CU" && Number(tokenBoughtCU).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    {gasselected === "SIL" && Number(tokenBoughtSIL).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    {gasselected === "GOLD" && Number(tokenBoughtGOLD).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    {gasselected === "JASP" && Number(tokenBoughtJASP).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    {gasselected === "OS" && Number(tokenBoughtOS).toLocaleString('en-US', {maximumFractionDigits:3})}
                                    {gasselected === "PLAT" && Number(tokenBoughtPLAT).toLocaleString('en-US', {maximumFractionDigits:3})}
                                </div>
                                ${gasselected} ( 
                                    {gasselected === "JDAO" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveJdao) - ((Number(reserveJdao) * Number(reserveCmjJdao)) / (Number(reserveCmjJdao) + Number(inputSwap2))))) - (Number(reserveCmjJdao/reserveJdao))) / (Number(reserveCmjJdao/reserveJdao))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "CU" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveCU) - ((Number(reserveCU) * Number(reserveCmjCU)) / (Number(reserveCmjCU) + Number(inputSwap2))))) - (Number(reserveCmjCU/reserveCU))) / (Number(reserveCmjCU/reserveCU))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "SIL" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveSIL) - ((Number(reserveSIL) * Number(reserveCmjSIL)) / (Number(reserveCmjSIL) + Number(inputSwap2))))) - (Number(reserveCmjSIL/reserveSIL))) / (Number(reserveCmjSIL/reserveSIL))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "GOLD" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveGOLD) - ((Number(reserveGOLD) * Number(reserveCmjGOLD)) / (Number(reserveCmjGOLD) + Number(inputSwap2))))) - (Number(reserveCmjGOLD/reserveGOLD))) / (Number(reserveCmjGOLD/reserveGOLD))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "JASP" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveJASP) - ((Number(reserveJASP) * Number(reserveCmjJASP)) / (Number(reserveCmjJASP) + Number(inputSwap2))))) - (Number(reserveCmjJASP/reserveJASP))) / (Number(reserveCmjJASP/reserveJASP))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "OS" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reserveOS) - ((Number(reserveOS) * Number(reserveCmjOS)) / (Number(reserveCmjOS) + Number(inputSwap2))))) - (Number(reserveCmjOS/reserveOS))) / (Number(reserveCmjOS/reserveOS))) * 100)).toFixed(2)}%</>}
                                    {gasselected === "PLAT" && Number(inputSwap2) !== 0 && <>{Number(((((Number(inputSwap2) / (Number(reservePLAT) - ((Number(reservePLAT) * Number(reserveCmjPLAT)) / (Number(reserveCmjPLAT) + Number(inputSwap2))))) - (Number(reserveCmjPLAT/reservePLAT))) / (Number(reserveCmjPLAT/reservePLAT))) * 100)).toFixed(2)}%</>}
                                    {Number(inputSwap2) === 0 && <>0.00%</>}
                                )
                            </div>
                        </div>
                    </>
                }
                {mode === 2 &&
                    <div style={{width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                        <div style={{maxHeight: "75px"}}>
                            <div style={{fontSize: "20px", width: "380px"}} className="pixel">JAZZI, THE LUXURY COLLECTOR</div>
                            <div style={{fontSize: "10px", marginTop: "5px"}} className="light">"ADD/REMOVE {gasselected}-CMJ LP</div>
                            <div style={{fontSize: "10px"}} className="light">READY TO JOIN MY BUSINESS?"</div>
                            <div style={{marginTop: "5px", width: "90%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                <div style={{width: "70%", display: "flex", flexDirection: "row"}}>
                                    <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="JDAO">JDAO</option>
                                        <option value="OS">OS</option>
                                        <option value="CU">CU</option>
                                        <option value="SIL">SIL</option>
                                        <option value="GOLD">GOLD</option>
                                        <option value="PLAT">PLAT</option>
                                        <option value="JASP">JASP</option>
                                    </select>
                                    <div
                                        style={{fontSize: "14px", marginLeft: "5px", display: "flex", alignItems: "center", cursor: "pointer"}}
                                        className="pixel"
                                        onClick={
                                            () => {
                                                if (gasselected === "JDAO") {
                                                    setLpSell(String(jdaoLpBalance))
                                                } else if (gasselected === "CU") {
                                                    setLpSell(String(cuLpBalance))
                                                } else if (gasselected === "SIL") {
                                                    setLpSell(String(silLpBalance))
                                                } else if (gasselected === "GOLD") {
                                                    setLpSell(String(goldLpBalance))
                                                } else if (gasselected === "JASP") {
                                                    setLpSell(String(jaspLpBalance))
                                                } else if (gasselected === "OS") {
                                                    setLpSell(String(osLpBalance))
                                                } else if (gasselected === "PLAT") {
                                                    setLpSell(String(platLpBalance))
                                                }
                                            }
                                        }
                                    >
                                        {gasselected === "JDAO" && <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(jdaoLpBalance).toFixed(4)}</div></>}
                                        {gasselected === "CU" && <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(cuLpBalance).toFixed(4)}</div></>}
                                        {gasselected === "SIL" && <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(silLpBalance).toFixed(4)}</div></>}
                                        {gasselected === "GOLD" && <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(goldLpBalance).toFixed(4)}</div></>}
                                        {gasselected === "JASP" && <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(jaspLpBalance).toFixed(4)}</div></>}
                                        {gasselected === "OS" && <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(osLpBalance).toFixed(4)}</div></>}
                                        {gasselected === "PLAT" && <>&nbsp;LP BALANCE:&nbsp; <div className="emp">{Number(platLpBalance).toFixed(4)}</div></>}
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
                                        if (gasselected === "JDAO") {
                                            removeLpUni(4)
                                        } else if (gasselected === "CU") {
                                            removeLpUni(5)
                                        } else if (gasselected === "SIL") {
                                            removeLpUni(1)
                                        } else if (gasselected === "GOLD") {
                                            removeLpUni(2)
                                        } else if (gasselected === "JASP") {
                                            removeLpUni(3)
                                        } else if (gasselected === "OS") {
                                            removeLpUni(6)
                                        } else if (gasselected === "PLAT") {
                                            removeLpUni(7)
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
                                    if (gasselected === "JDAO") {
                                        handleAddUni(4, event)
                                    } else if (gasselected === "CU") {
                                        handleAddUni(5, event)
                                    } else if (gasselected === "SIL") {
                                        handleAddUni(1, event)
                                    } else if (gasselected === "GOLD") {
                                        handleAddUni(2, event)
                                    } else if (gasselected === "JASP") {
                                        handleAddUni(3, event)
                                    } else if (gasselected === "OS") {
                                        handleAddUni(6, event)
                                    } else if (gasselected === "PLAT") {
                                        handleAddUni(7, event)
                                    }
                                }}
                                value={tokenAdd}
                            ></input>
                            {gasselected === "JDAO" &&
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(jdaoBalance)}}; handleAddUni(4, bal);}}>
                                    <img src={providerIPFS + "bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq"} width="22" alt="$JDAO"/>
                                    <div style={{marginLeft: "5px"}}>{Number(jdaoBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "CU" &&
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(cuBalance)}}; handleAddUni(5, bal);}}>
                                    <img src={providerIPFS + "bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq"} width="22" alt="$CU"/>
                                    <div style={{marginLeft: "5px"}}>{Number(cuBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                            }
                            {gasselected === "SIL" &&
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(silBalance)}}; handleAddUni(1, bal);}}>
                                    <img src={providerIPFS + "bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde"} width="22" alt="$SIL"/>
                                    <div style={{marginLeft: "5px"}}>{Number(silBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                            }
                            {gasselected === "GOLD" &&
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(goldBalance)}}; handleAddUni(2, bal);}}>
                                    <img src={providerIPFS + "bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm"} width="22" alt="$GOLD"/>
                                    <div style={{marginLeft: "5px"}}>{Number(goldBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                            }
                            {gasselected === "JASP" &&
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(jaspBalance)}}; handleAddUni(3, bal);}}>
                                    <img src={providerIPFS + "bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy"} width="22" alt="$JASP"/>
                                    <div style={{marginLeft: "5px"}}>{Number(jaspBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "OS" &&
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(osBalance)}}; handleAddUni(6, bal);}}>
                                    <img src={providerIPFS + "bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e"} width="22" alt="$OS"/>
                                    <div style={{marginLeft: "5px"}}>{Number(osBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                            {gasselected === "PLAT" &&
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => {const bal = {target: {value: String(platBalance)}}; handleAddUni(7, bal);}}>
                                    <img src={providerIPFS + "bafkreibf7vowyqjrcaeyslflrxxchel3b4qdpwxcxb34js2otg35vjkcaa"} width="22" alt="$PLAT"/>
                                    <div style={{marginLeft: "5px"}}>{Number(platBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
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
                                    if (gasselected === "JDAO") {
                                        handleAddUni_2(4, event)
                                    } else if (gasselected === "CU") {
                                        handleAddUni_2(5, event)
                                    } else if (gasselected === "SIL") {
                                        handleAddUni_2(1, event)
                                    } else if (gasselected === "GOLD") {
                                        handleAddUni_2(2, event)
                                    } else if (gasselected === "JASP") {
                                        handleAddUni_2(3, event)
                                    } else if (gasselected === "OS") {
                                        handleAddUni_2(6, event)
                                    } else if (gasselected === "PLAT") {
                                        handleAddUni_2(7, event)
                                    }
                                }}
                                value={currAdd}
                            ></input>
                            <div
                                style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}}
                                onClick={
                                    () => {
                                        const bal = {target: {value: cmjBalance}}
                                        if (gasselected === "JDAO") {
                                            handleAddUni_2(4, bal)
                                        } else if (gasselected === "CU") {
                                            handleAddUni_2(5, bal)
                                        } else if (gasselected === "SIL") {
                                            handleAddUni_2(1, bal)
                                        } else if (gasselected === "GOLD") {
                                            handleAddUni_2(2, bal)
                                        } else if (gasselected === "JASP") {
                                            handleAddUni_2(3, bal)
                                        } else if (gasselected === "OS") {
                                            handleAddUni_2(6, bal)
                                        } else if (gasselected === "PLAT") {
                                            handleAddUni_2(7, bal)
                                        }
                                    }
                                }
                            >
                                <img src={providerIPFS + "bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u"} width="22" alt="$CMJ"/>
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
                                            if (gasselected === "JDAO") {
                                                addLpHandleUni(4)
                                            } else if (gasselected === "CU") {
                                                addLpHandleUni(5)
                                            } else if (gasselected === "SIL") {
                                                addLpHandleUni(1)
                                            } else if (gasselected === "GOLD") {
                                                addLpHandleUni(2)
                                            } else if (gasselected === "JASP") {
                                                addLpHandleUni(3)
                                            } else if (gasselected === "OS") {
                                                addLpHandleUni(6)
                                            } else if (gasselected === "PLAT") {
                                                addLpHandleUni(7)
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

export default Ammmerchant2
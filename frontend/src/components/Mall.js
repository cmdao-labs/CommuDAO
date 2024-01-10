import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'

import Ammmerchant from  './Mall-Ammy'
import Ammmerchant2 from  './Mall-Jazzi'
import Ammmerchant3 from  './Mall-Degeno'
const { ethereum } = window

const jusdtToken = "0x24599b658b57f91E7643f4F154B16bcd2884f9ac"
const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const jdaoToken = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'
const ctunaLab = "0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0"
const sx31Lab = '0xd431d826d7a4380b9259612176f00528b88840a7'
const bbqToken = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const pzaLab = '0x09DcdCFc6C48803681a3422997c679E773656763'
const dunCopper = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'
const dunJasper = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const cmdaoMerchant = "0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D"
const cmdaoMerchantV2 = "0x87BAC0BCBaadF9B7d24385b1AaaEbeDEb60a1A0a"
const cmdaoMerchantKYC = "0xF67761e0E72fea7bD176686a242f1535879be8aB"
const cmdaoGasha02 = '0x87A612709b36b575103C65a90cB3B16Cac2BC898'

const kyc = '0xfB046CF7dBA4519e997f1eF3e634224a9BFf5A2E'

const Mall = ({ setisLoading, txupdate, setTxupdate, kycABI, ctunaLabABI, cmdaoMerchantABI, cmdaoMerchantKYCABI, cmdaoMerchantV2ABI, cmdaoGasha02ABI, ammyABI, ammyStdABI, erc20ABI }) => {
    const { address } = useAccount()

    const [sell1Remain, setSell1Remain] = React.useState(37)
    const [canbuy1, setCanBuy1] = React.useState(false)
    const [sell2Remain, setSell2Remain] = React.useState(22)
    const [canbuy2, setCanBuy2] = React.useState(false)
    const [sell3Remain, setSell3Remain] = React.useState(500)
    const [canbuy3, setCanBuy3] = React.useState(false)
    const [sell4Remain, setSell4Remain] = React.useState(100)
    const [sell5Remain, setSell5Remain] = React.useState(100)
    const [canbuy5, setCanBuy5] = React.useState(false)
    const [sell6Remain, setSell6Remain] = React.useState(100)
    const [canbuy6, setCanBuy6] = React.useState(false)
    const [sell7Remain, setSell7Remain] = React.useState(100)
    const [canbuy7, setCanBuy7] = React.useState(false)
    const [sell8Remain, setSell8Remain] = React.useState(333)
    const [canbuy8, setCanBuy8] = React.useState(false)
    const [sell9Remain, setSell9Remain] = React.useState(333)
    const [canbuy9, setCanBuy9] = React.useState(false)

    const [roll1Remain, setRoll1Remain] = React.useState(107)
    const [canroll1, setCanRoll1] = React.useState(false)
    const [roll2Remain, setRoll2Remain] = React.useState(107)
    const [roll3Remain, setRoll3Remain] = React.useState(107)
    const [roll4Remain, setRoll4Remain] = React.useState(107)
    const [canroll2, setCanRoll2] = React.useState(false)
    const [roll5Remain, setRoll5Remain] = React.useState(1000)

    const [ctunaBalance, setCTunaBalance] = React.useState(0)
    const [sx31Balance, setSx31Balance] = React.useState(0)
    const [bbqBalance, setBbqBalance] = React.useState(0)
    const [pzaBalance, setPzaBalance] = React.useState(0)
    const [cuBalance, setCuBalance] = React.useState(0)
    const [jaspBalance, setJaspBalance] = React.useState(0)
    const [jusdtBalance, setJusdtBalance] = React.useState(0)
    const [cmjBalance, setCmjBalance] = React.useState(0)

    React.useEffect(() => {
        console.log("Connected to " + address)

        const thefetch = async () => {
            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: kyc,
                        abi: kycABI,
                        functionName: 'kyc',
                        args: [0, address],
                    },
                    {
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: jusdtToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: ctunaLab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: sx31Lab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: bbqToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunCopper,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunJasper,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: pzaLab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: jdaoToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: cmdaoMerchantKYC,
                        abi: cmdaoMerchantKYCABI,
                        functionName: 'bought',
                        args: [address, 1],
                    },
                ],
            }) : [false, 0, 0, 0, 0, 0, 0, 0, 0, 0, true, ]
            
            const _isKYC = data[0]
            const cmjBal = data[1]
            const jusdtBal = data[2]
            const ctunaBal = data[3]
            const sx31Bal = data[4]
            const bbqBal = data[5]
            const cuBal = data[6]
            const jaspBal = data[7]
            const pzaBal = data[8]
            const jdaoBal = data[9]
            const isBought5 = data[10]

            const data2 = await readContracts({
                contracts: [
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [1],
                    },
                    {
                        address: cmdaoMerchantV2,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [1],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [3],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [4],
                    },
                    {
                        address: cmdaoMerchantKYC,
                        abi: cmdaoMerchantKYCABI,
                        functionName: 'sellList',
                        args: [1],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [5],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [1],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [2],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [3],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [4],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [5],
                    },
                    {
                        address: cmdaoMerchantV2,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [2],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [6],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [7],
                    },
                ],
            })
            
            const sell1Id = data2[0]
            const sell2Id = data2[1]
            const sell3Id = data2[2]
            const sell4Id = data2[3]
            const sell5Id = data2[4]
            const sell6Id = data2[5]
            const sell7Id = data2[11]
            const sell8Id = data2[12]
            const roll1 = data2[6]
            const roll2 = data2[7]
            const roll3 = data2[8]
            const roll4 = data2[9]
            const roll5 = data2[10]

            const sell1remain = (410003800000 - (Number(sell1Id.sellId) - 150)) / 100000
            const _canBuy1 = Number(ethers.utils.formatEther(String(ctunaBal))) >= 2500 ? true : false
            const sell2remain = 100000000023 - Number(sell2Id.sellId)
            const _canBuy2 = Number(ethers.utils.formatEther(String(pzaBal))) >= 49000 ? true : false
            const sell3remain = (210050100000 - (Number(sell3Id.sellId) - 250)) / 100000
            const _canBuy3 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 3 ? true : false
            const sell4remain = (130010100000 - (Number(sell4Id.sellId) - 500)) / 100000
            const sell5remain = (100520100000 - (Number(sell5Id.sellId) - 100)) / 100000
            const _canBuy5 = _isKYC && !isBought5 && Number(ethers.utils.formatEther(String(bbqBal))) >= 10000 ? true : false
            const sell6remain = (1000010200000 - (Number(sell6Id.sellId) - 100)) / 100000
            const _canBuy6 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 1 ? true : false
            const sell7remain = 101000200 - Number(sell7Id.sellId)
            const _canBuy7 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 10 ? true : false
            const sell8remain = (102033400000 - (Number(sell8Id.sellId) - 8000)) / 100000
            const _canBuy8 = Number(ethers.utils.formatEther(String(jdaoBal))) >= 1000 ? true : false
            const sell9remain = (102066400000 - (Number(sell8Id.sellId) - 19000)) / 100000
            const _canBuy9 = Number(ethers.utils.formatUnits(String(jaspBal), "gwei")) >= 100 ? true : false

            const roll1remain = Number(roll1.nftCount)
            const roll2remain = Number(roll2.nftCount)
            const roll3remain = Number(roll3.nftCount)
            const roll4remain = Number(roll4.nftCount)
            const roll5remain = Number(roll5.nftCount)

            const _canRoll1 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 10 ? true : false
            const _canRoll2 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 20 ? true : false

            return [
                sell1remain, _canBuy1, sell2remain, _canBuy2, sell3remain, _canBuy3, sell4remain, sell5remain, _canBuy5, sell6remain, _canBuy6, roll1remain, _canRoll1, roll2remain, roll3remain, roll4remain, roll5remain, _canRoll2, sell7remain, _canBuy7, sell8remain, _canBuy8, sell9remain, _canBuy9, 
                ctunaBal, sx31Bal, jusdtBal, cmjBal, bbqBal, pzaBal, cuBal, jaspBal, 
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
            setSell1Remain(result[0])
            setCanBuy1(result[1])
            setSell2Remain(result[2])
            setCanBuy2(result[3])
            setSell3Remain(result[4])
            setCanBuy3(result[5])
            setSell4Remain(result[6])
            setSell5Remain(result[7])
            setCanBuy5(result[8])
            setSell6Remain(result[9])
            setCanBuy6(result[10])
            setSell7Remain(result[18])
            setCanBuy7(result[19])
            setSell8Remain(result[20])
            setCanBuy8(result[21])
            setSell9Remain(result[22])
            setCanBuy9(result[23])

            setRoll1Remain(result[11])
            setCanRoll1(result[12])
            setRoll2Remain(result[13])
            setRoll3Remain(result[14])
            setRoll4Remain(result[15])
            setRoll5Remain(result[16])
            setCanRoll2(result[17])

            setCTunaBalance(ethers.utils.formatEther(String(result[24])))
            setSx31Balance(ethers.utils.formatEther(String(result[25])))
            setJusdtBalance(ethers.utils.formatEther(String(result[26])))
            setCmjBalance(ethers.utils.formatEther(String(result[27])))
            setBbqBalance(ethers.utils.formatEther(String(result[28])))
            setPzaBalance(ethers.utils.formatEther(String(result[29])))
            setCuBalance(ethers.utils.formatEther(String(result[30])))
            setJaspBalance(ethers.utils.formatUnits(String(result[31]), "gwei"))
        })

    }, [address, txupdate, kycABI, ctunaLabABI, cmdaoMerchantABI, cmdaoMerchantV2ABI, cmdaoMerchantKYCABI, cmdaoGasha02ABI, erc20ABI])

    const buyHandle = async () => {
        setisLoading(true)
        const ctunaAllow = await readContract({
            address: ctunaLab,
            abi: ctunaLabABI,
            functionName: 'allowance',
            args: [address, cmdaoMerchant],
        })
        if (ctunaAllow < (2500 * 10**18)) {
            try {
                const config = await prepareWriteContract({
                    address: ctunaLab,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [1]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const buyHandle2 = async () => {
        setisLoading(true)
        try {
            const pzaAllow = await readContract({
                address: pzaLab,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantV2],
            })
            if (pzaAllow < (49000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: pzaLab,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantV2, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantV2,
                abi: cmdaoMerchantV2ABI,
                functionName: 'buy',
                args: [1]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const buyHandle3 = async (_index) => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (jusdtAllow < (10 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [_index]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const buyHandle4 = async (_index) => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantV2],
            })
            if (jusdtAllow < (10 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantV2, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantV2,
                abi: cmdaoMerchantV2ABI,
                functionName: 'buy',
                args: [_index]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }


    const buyHandle5 = async () => {
        setisLoading(true)
        try {
            const bbqAllow = await readContract({
                address: bbqToken,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantKYC],
            })
            if (bbqAllow < (500 * 10**18)) {
                const config = await prepareWriteContract({
                    address: bbqToken,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantKYC, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantKYC,
                abi: cmdaoMerchantKYCABI,
                functionName: 'buy',
                args: [1]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const buyHandle6 = async () => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (jusdtAllow < (49000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [5]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const buyHandle8 = async () => {
        setisLoading(true)
        try {
            const jdaoAllow = await readContract({
                address: jdaoToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (jdaoAllow < (1000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jdaoToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [6]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const buyHandle9 = async () => {
        setisLoading(true)
        try {
            const jaspAllow = await readContract({
                address: dunJasper,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (jaspAllow < (100 * 10**9)) {
                const config = await prepareWriteContract({
                    address: dunJasper,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [7]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const rollHandle2 = async (_colIndex) => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoGasha02],
            })
            if (jusdtAllow < (10 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoGasha02, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: cmdaoGasha02,
                abi: cmdaoGasha02ABI,
                functionName: 'roll',
                args: [_colIndex]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const rollHandle3 = async (_colIndex) => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoGasha02],
            })
            if (jusdtAllow < (20 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoGasha02, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: cmdaoGasha02,
                abi: cmdaoGasha02ABI,
                functionName: 'roll',
                args: [_colIndex]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div style={{fontSize: "75px", width: "fit-content"}} className="pixel">Mall</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px", letterSpacing: "1px"}} className="pixel">Automated Buy & Sell</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="./background/malllogo.png" width="150" alt="Mall_Logo" />
            </div>
        </div>

        <div className="collection">
            <div style={{textAlign: "left", height: "fit-content", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                <div style={{width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Tokens</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u"
                            width="20"
                            alt="$CMJ"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: cmjToken,
                                            symbol: 'CMJ',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(cmjBalance).toFixed(3)}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi"
                            width="20"
                            alt="$JUSDT"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: jusdtToken,
                                            symbol: 'JUSDT',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(jusdtBalance).toFixed(3)}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i"
                            width="20"
                            alt="$CTUNA"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: ctunaLab,
                                            symbol: 'CTUNA',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(ctunaBalance).toFixed(3)}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4"
                            width="20"
                            alt="$SX31"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: sx31Lab,
                                            symbol: 'SX31',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(sx31Balance).toFixed(3)}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq"
                            width="20"
                            alt="$BBQ"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: bbqToken,
                                            symbol: 'BBQ',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(bbqBalance).toFixed(3)}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu"
                            width="20"
                            alt="$PZA"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: pzaLab,
                                            symbol: 'PZA',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(pzaBalance).toFixed(3)}</div>
                    </div>
                </div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "10px 10px 20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq"
                            width="20"
                            alt="$CU"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: dunCopper,
                                            symbol: 'CU',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(cuBalance).toFixed(3)}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "10px 10px 20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy"
                            width="20"
                            alt="$JASP"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: dunJasper,
                                            symbol: 'JASP',
                                            decimals: 9,
                                            image: 'https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(jaspBalance).toFixed(3)}</div>
                    </div>
                </div>

                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Automated Market Maker</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <Ammmerchant setisLoading={setisLoading} setTxupdate={setTxupdate} ammyABI={ammyABI} ammyStdABI={ammyStdABI} erc20ABI={erc20ABI} />
                    <Ammmerchant2 setisLoading={setisLoading} setTxupdate={setTxupdate} ammyStdABI={ammyStdABI} erc20ABI={erc20ABI} />
                    <Ammmerchant3 setisLoading={setisLoading} setTxupdate={setTxupdate} ammyStdABI={ammyStdABI} erc20ABI={erc20ABI} />
                </div>

                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Ecosystem NFTs Premium Store</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Angel Plus - Adventurer Card D +0 Vol.2</div>
                        <video autoPlay muted loop width="175" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                            <source src="https://nftstorage.link/ipfs/bafybeia2c5qcwshxdqw6gvvezehsnn5r7u5d2oxkduwzydbzxxu3hfzzze" type="video/mp4" />
                        </video>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell7Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>Staking in Fields: Eastern Front</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell7Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle4(2)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">The Mythical Guardians</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafybeihwqqsf4hfcdxyrqlepn6mwxzkxfiv2tkzhzl663asp4lz4ebvfda" height="150" alt="MG"/>
                        <div style={{alignSelf: "flex-start", height: "200px", fontSize: "15px", marginTop: "10px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll5Remain}</div>
                                    <div>/1000 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>Staking in Fields: The Heaven Land</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll5Remain > 0 ?
                                    <>
                                        {canroll2 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle3(5)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>                
                </div>

                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">CommmuDAO NFTs Premium Store</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Treasure Tide Flintlock</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://bafkreia45343q6jrvbfd6bjwam7de53w7utdth6ljnt2izpia4uthvzfke.ipfs.nftstorage.link" height="150" alt="TT_FLINTLOCK"/>
                        <div style={{alignSelf: "flex-start", height: "200px", fontSize: "15px", marginTop: "10px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll1Remain}</div>
                                    <div>/107 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>N : 250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R : 550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR : 1050 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR : 2550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll1Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(1)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Full Plate Valkyrian Armor</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://bafkreiftpkycalwvudetraf3p6rn4jkz6avoy5ogefrjm5dvwemojnfqna.ipfs.nftstorage.link/" height="150" alt="VALKYRIAN_GASHA"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", height: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll2Remain}</div>
                                    <div>/107 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>N : 250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R : 550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR : 1050 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR : 2550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll2Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(2)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>   

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">MVT's Backpack</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreiao65xaujwrqwsdyicyew4gutcsqtwtxmy3fpjudrwnoyf5zq3zey" height="150" alt="MULTIVERSE_BACKPACK"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", height: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll3Remain}</div>
                                    <div>/107 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>N : 250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R : 550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR : 1050 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR : 2550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll3Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(3)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>                 
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Bloodstaned Boots</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreif6q5huzhxshrgr2gb4hxpo6vbchfxc3tohbv37jf22pcm5q353oe" height="150" alt="BLOODSTAINED_BOOTS"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", height: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll4Remain}</div>
                                    <div>/107 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>N : 250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R : 550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR : 1050 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR : 2550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll4Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(4)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Floki's Viking Helmet N</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreiexymrt2jpbbgiwfzsvxjgty5fdd3j5qh3yqqmm7dbzqudkwfcyna" height="150" alt="Floki_Helmet_N"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell3Remain}</div>
                                    /500 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="$JUSDT"/>
                                    <div style={{marginLeft: "7.5px"}}>3</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell3Remain > 0 ?
                                    <>
                                        {canbuy3 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle3(3)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">SAPIENS #01</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" height="150" alt="Sapiens_01"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                <div className="emp">{sell4Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>500 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="$JUSDT"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell4Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle3(4)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Chō-Senjiryakketsu Vol.1</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreifgwtom3va2wm4wdur4eupbnoxjfvxr3765ebkpisron73ydmq3sa" height="150" alt="CS"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                <div className="emp">{sell6Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>100 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="$JUSDT"/>
                                    <div style={{marginLeft: "7.5px"}}>1</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell6Remain > 0 ?
                                    <>
                                        {canbuy6 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle6}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>
                
                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">CommuDAO NFTs Redemption Store</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll", marginBottom: "40px"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">KYC Shop</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Multiverse Traveller Vol.2</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreigc4ivgjqocp7dh7bh3upl4tidhpe2w76muckmzyvulevbkoxdnce" height="150" alt="MT_1_Max"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell5Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>100 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="18" alt="$BBQ"/>
                                    <div style={{marginLeft: "7.5px"}}>10,000</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell5Remain > 0 ?
                                    <>
                                        {canbuy5 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle5}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">NOT ELIGIBLE TO REDEEM</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Pizza Day!</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreies3tc5xzaph5lpjgka35qduucejronjb37nd5zuaztwhovnzkllm" height="150" alt="PZA-DAY-SALON-BG"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell2Remain}</div>
                                    /22 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>Salon NFT - BG Type</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu" height="18" alt="$PZA"/>
                                    <div style={{marginLeft: "7.5px"}}>49,000</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell2Remain > 0 ?
                                    <>
                                        {canbuy2 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle2}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">TSW Valentine Ring</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreiacm6fn5rjctuxyiirlmr7awp6ckesgffamingak4pif3kp6vgbri" height="160" alt="valentineringpic"/>
                        <div style={{alignSelf: "flex-start", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell1Remain}</div>
                                    /107 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>150 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i" height="18" alt="$CTUNA"/>
                                    <div style={{marginLeft: "7.5px"}}>2500</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell1Remain > 0 ?
                                    <>
                                        {canbuy1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll", marginBottom: "40px"}} className="noscroll">
                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Prophet of JBC</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreieoamtkrbgj3kd3cqrdcvwzoj7swmwegmoyvcs5gqv22psyzzhvre" height="150" alt="PROPHET-OF-JBC"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell8Remain}</div>
                                    /333 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>8,000 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                    <div style={{marginLeft: "7.5px"}}>1,000</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell8Remain > 0 ?
                                    <>
                                        {canbuy8 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle8}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Supreme God of JBC</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreiayhubngbbxov2lyhxfziy7tr7pvdr5cwbi4fgn6rcdykpgnv3c4a" height="150" alt="SUPREME-GOD-OF-JBC"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{/*sell9Remain*/'333'}</div>
                                    /333 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>19,000 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                    <div style={{marginLeft: "7.5px"}}>100</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {false && sell9Remain > 0 ?
                                    <>
                                        {canbuy9 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle9}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">ON STOCK AT 10PM, 10.01</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>
                <div style={{height: "40px"}}></div>
            </div>
        </div>
    </>
    )
}

export default Mall
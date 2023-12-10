import React from 'react'
import { ethers } from 'ethers'
import { fetchBalance, readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
const { ethereum } = window

const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const jdaoToken = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'
const woodField = '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd'
const bbqToken = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const bbqLab = '0x9D73C97edC9489935B2dF250a097917d4860C60e'
const globalBbqLab = '0x93104865DAD97b038Eea8874E3a1AFE7C52F9d57'
const stOPT = '0x435BeAF4B83A6dc57927E9dB194a3Ccf54100F7a'
const pzaLab = '0x09DcdCFc6C48803681a3422997c679E773656763'
const cuToken = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'
const silToken = '0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f'
const silLab = '0xfEe9af37FBee37DbA1A830080b20Caa99b41741A'
const goldToken = '0x7d5346E33889580528e6F79f48BdEE94D8A9E144'
const goldLab = '0xc69F46334a86F4617Fa17432F430c641c2e10139'
const goldMine = '0x28d8c3c2C0199Ff6E73eb7c4321F43E0e7F80ad8'

const tunaField = "0x09676315DC0c85F6bd5e866C5f1363A00Eec4381"
const ctunaLab = "0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0"

const fieldMice = '0x09DE640ecd50e1c81bCB266279e3ffC2719873df'
const sx31Lab = '0xd431d826d7a4380b9259612176f00528b88840a7'

const kyc = '0xfB046CF7dBA4519e997f1eF3e634224a9BFf5A2E'

const Labs = ({ setisLoading, txupdate, setTxupdate, ctunaLabABI, sx31LabABI, bbqLab01ABI, bbqLab02ABI, pzaLabABI, goldMineABI, erc20ABI, kycABI }) => {
    const { address } = useAccount()

    const [jbcBalance, setJbcBalance] = React.useState(0)
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [woodBalance, setWoodBalance] = React.useState(0)
    const [bbqBalance, setBbqBalance] = React.useState(0)
    const [tunaBalance, setTunaBalance] = React.useState(0)
    const [ctunaBalance, setCTunaBalance] = React.useState(0)
    const [miceBalance, setMiceBalance] = React.useState(0)
    const [sx31Balance, setSx31Balance] = React.useState(0)
    const [pzaBalance, setPzaBalance] = React.useState(0)
    const [copperBalance, setCopperBalance] = React.useState(0)
    const [silverBalance, setSilverBalance] = React.useState(0)
    const [goldBalance, setGoldBalance] = React.useState(0)
    const [stOPTBalance, setStOPTBalance] = React.useState(0)

    const [levelCraftBBQ, setLevelCraftBBQ] = React.useState(0)
    const [isCraftBBQ, setIsCraftBBQ] = React.useState(null)
    const [timetoClaimBBQ, setTimeToClaimBBQ] = React.useState(0)
    const [canCraftBBQ, setCanCraftBBQ] = React.useState(false)

    const [dataCraftBBQ_G, setDataCraftBBQ_G] = React.useState({addr: "0x0000000000000000000000000000000000000000", totalQuota: 0, lastStamp: 0})
    const [dataCraftBBQ_G_Next, setDataCraftBBQ_G_Next] = React.useState({addr: "0x0000000000000000000000000000000000000000", totalQuota: 0, lastStamp: 0})
    const [timetoClaimBBQ_G, setTimeToClaimBBQ_G] = React.useState(null)
    const [canCraftBBQ_G, setCanCraftBBQ_G] = React.useState(false)

    const [isCraftPZA, setIsCraftPZA] = React.useState(null)
    const [timetoClaimPZA, setTimeToClaimPZA] = React.useState(0)
    const [canCraftPZA, setCanCraftPZA] = React.useState(false)

    const [isCraftSIL, setIsCraftSIL] = React.useState(null)
    const [timetoClaimSIL, setTimeToClaimSIL] = React.useState(0)
    const [canCraftSIL, setCanCraftSIL] = React.useState(false)

    const [isCraftGOLD, setIsCraftGOLD] = React.useState(null)
    const [timetoClaimGOLD, setTimeToClaimGOLD] = React.useState(0)
    const [canCraftGOLD, setCanCraftGOLD] = React.useState(false)

    const [isCraft1, setIsCraft1] = React.useState(null)
    const [timetoClaim1, setTimeToClaim1] = React.useState(0)
    const [canCraft1, setCanCraft1] = React.useState(false)

    const [isCraft2, setIsCraft2] = React.useState(null)
    const [craft2machine, setCraft2machine] = React.useState(0)
    const [timetoClaim2, setTimeToClaim2] = React.useState(0)
    const [timetoClaim2_2, setTimeToClaim2_2] = React.useState(0)
    const [canCraft2, setCanCraft2] = React.useState(false)
    const [canCraft2_2, setCanCraft2_2] = React.useState(false)

    const [isMineGold, setIsMineGold] = React.useState(null)
    const [timetoClaimMineGold, setTimeToClaimMineGold] = React.useState(0)
    const [canMineGold, setCanMineGold] = React.useState(false)

    const [isKYC, setIsKYC] = React.useState(null)

    React.useEffect(() => {      
        console.log("Connected to " + address)
        
        const thefetch = async () => {
            const jbcBal = address !== null && address !== undefined ?
                await fetchBalance({ address: address, }) :
                {formatted: 0}
            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: woodField,
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
                        address: tunaField,
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
                        address: fieldMice,
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
                        address: stOPT,
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
                        address: cuToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: silToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: goldToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: kyc,
                        abi: kycABI,
                        functionName: 'kyc',
                        args: [1, address],
                    },
                    {
                        address: ctunaLab,
                        abi: ctunaLabABI,
                        functionName: 'tunaSupplier',
                        args: [address],
                    },
                    {
                        address: sx31Lab,
                        abi: sx31LabABI,
                        functionName: 'supplier',
                        args: [address],
                    },
                    {
                        address: bbqLab,
                        abi: bbqLab01ABI,
                        functionName: 'supplier',
                        args: [address],
                    },
                    {
                        address: pzaLab,
                        abi: pzaLabABI,
                        functionName: 'supplier',
                        args: [address],
                    },
                    {
                        address: silLab,
                        abi: pzaLabABI,
                        functionName: 'supplier',
                        args: [address],
                    },
                    {
                        address: goldLab,
                        abi: pzaLabABI,
                        functionName: 'supplier',
                        args: [address],
                    },
                    {
                        address: goldMine,
                        abi: goldMineABI,
                        functionName: 'supplier',
                        args: [address],
                    },
                ],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, {isCraft: false, laststamp: 0}, {isCraft: false, machineIndex: 0, laststamp: 0}, {isCraft: false, machineIndex: 0, laststamp: 0}, {isCraft: false, laststamp: 0}, {isCraft: false, laststamp: 0}, {isCraft: false, laststamp: 0}, {isCraft: false, laststamp: 0}, ]
            
            const cmjBal = data[0]
            const woodBal = data[1]
            const bbqBal = data[2]
            const tunaBal = data[3]
            const ctunaBal = data[4]
            const miceBal = data[5]
            const sx31Bal = data[6]
            const stOPTBal = data[7]
            const pzaBal = data[8]
            const cuBal = data[9]
            const silBal = data[10]
            const goldBal = data[11]
            const isDionysus = data[12]
            const labLog = data[13]
            const labLog2 = data[14]
            const labLogBBQ = data[15]
            const labLogPZA = data[16]
            const labLogSIL = data[17]
            const labLogGOLD = data[18]
            const mineGold = data[19]

            const _canCraft1 = Number(ethers.utils.formatEther(String(tunaBal))) >= 50 && Number(ethers.utils.formatEther(String(cmjBal))) >= 10 ? true : false
            const _canCraft2 = Number(ethers.utils.formatEther(String(miceBal))) >= 50 && Number(ethers.utils.formatEther(String(cmjBal))) >= 9 ? true : false
            const _canCraft2_2 = Number(ethers.utils.formatEther(String(miceBal))) >= 500 && Number(ethers.utils.formatEther(String(cmjBal))) >= 90 ? true : false
            const _canCraftBBQ = Number(ethers.utils.formatEther(String(woodBal))) >= 100 && Number(jbcBal.formatted) >= 0.01 ? true : false
            const _canCraftBBQ_G = Number(ethers.utils.formatEther(String(woodBal))) >= 600000 && Number(cmjBal) >= 1 ? true : false
            const _canCraftPZA = Number(ethers.utils.formatEther(String(stOPTBal))) >= 1 && Number(ethers.utils.formatEther(String(bbqBal))) >= 10000 ? true : false
            const _canCraftSIL = Number(ethers.utils.formatEther(String(cmjBal))) >= 10 && Number(ethers.utils.formatEther(String(cuBal))) >= 50000 ? true : false
            const _canCraftGOLD = Number(ethers.utils.formatEther(String(sx31Bal))) >= 200 && Number(ethers.utils.formatEther(String(silBal))) >= 2000 ? true : false
            const _canMineGold = Number(ethers.utils.formatEther(String(bbqBal))) >= 200 && Number(jbcBal.formatted) >= 10 ? true : false

            const currentQueue = await readContract({
                address: globalBbqLab,
                abi: bbqLab02ABI,
                functionName: 'currentQueue',
            })

            const data2 = await readContracts({
                contracts: [
                    {
                        address: globalBbqLab,
                        abi: bbqLab02ABI,
                        functionName: 'supplier',
                        args: [currentQueue],
                    },
                    {
                        address: globalBbqLab,
                        abi: bbqLab02ABI,
                        functionName: 'supplier',
                        args: [Number(currentQueue) + 1],
                    },
                ],
            })
            
            const labLogBBQ_G = data2[0]
            const labLogBBQ_G_Next = data2[1]

            return [
                isDionysus, jbcBal, cmjBal, woodBal, bbqBal, tunaBal, ctunaBal, miceBal, sx31Bal, stOPTBal, pzaBal, cuBal, silBal, goldBal,
                labLog, _canCraft1, labLog2, _canCraft2, _canCraft2_2, labLogBBQ, _canCraftBBQ,
                labLogBBQ_G, labLogBBQ_G_Next, _canCraftBBQ_G, labLogPZA, _canCraftPZA, labLogSIL, _canCraftSIL, labLogGOLD, _canCraftGOLD, mineGold, _canMineGold,
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
            setIsKYC(result[0])
            setJbcBalance(result[1].formatted)
            setCmjBalance(ethers.utils.formatEther(result[2]))
            setWoodBalance(ethers.utils.formatEther(result[3]))
            setBbqBalance(ethers.utils.formatEther(result[4]))
            setTunaBalance(ethers.utils.formatEther(result[5]))
            setCTunaBalance(ethers.utils.formatEther(result[6]))
            setMiceBalance(ethers.utils.formatEther(result[7]))
            setSx31Balance(ethers.utils.formatEther(result[8]))
            setStOPTBalance(ethers.utils.formatEther(result[9]))
            setPzaBalance(ethers.utils.formatEther(result[10]))
            setCopperBalance(ethers.utils.formatEther(result[11]))
            setSilverBalance(ethers.utils.formatEther(result[12]))
            setGoldBalance(ethers.utils.formatEther(result[13]))

            setIsCraft1(result[14].isCraft)
            const nextHour = new Date((result[14].laststamp * 1000) + (3600 * 1000))
            Date.now() - (result[14].laststamp * 1000) <= (3600 * 1000) ?
                setTimeToClaim1(nextHour.toLocaleString('es-CL')) :
                setTimeToClaim1(0)
            setCanCraft1(result[15])

            setIsCraft2(result[16].isCraft)
            setCraft2machine(Number(result[16].machineIndex))
            let nextHour2 = 0
            if (Number(result[16].machineIndex) === 1) {
                nextHour2 = new Date((result[16].laststamp * 1000) + (3600 * 1 * 1000))
                Date.now() - (result[16].laststamp * 1000) <= (3600 * 1 * 1000) ?
                    setTimeToClaim2(nextHour2.toLocaleString('es-CL')) :
                    setTimeToClaim2(0)
            } else if (Number(result[16].machineIndex) === 431826) {
                nextHour2 = new Date((result[16].laststamp * 1000) + (3600 * 8 * 1000))
                Date.now() - (result[16].laststamp * 1000) <= (3600 * 8 * 1000) ?
                    setTimeToClaim2_2(nextHour2.toLocaleString('es-CL')) :
                    setTimeToClaim2_2(0)
            }
            setCanCraft2(result[17])
            setCanCraft2_2(result[18])

            setLevelCraftBBQ(Number(result[19].craftLevel))
            setIsCraftBBQ(Number(result[19].machineRun) > 0)
            const nextObtainBBQ = new Date((result[19].laststamp * 1000) + (300 * 1000))
            Date.now() - (result[19].laststamp * 1000) <= (300 * 1000) ?
                setTimeToClaimBBQ(nextObtainBBQ.toLocaleString('es-CL')) :
                setTimeToClaimBBQ(0)
            setCanCraftBBQ(result[20])

            setDataCraftBBQ_G(result[21])
            const nextObtainBBQ_G = new Date((result[21].laststamp * 1000) + (60 * 1000))
            Date.now() - (result[21].laststamp * 1000) <= (60 * 1000) ?
                setTimeToClaimBBQ_G(nextObtainBBQ_G.toLocaleString('es-CL')) :
                setTimeToClaimBBQ_G(0)
            setDataCraftBBQ_G_Next(result[22])
            setCanCraftBBQ_G(result[23])

            setIsCraftPZA(Number(result[24].machineRun) > 0)
            const nextHourPZA = new Date((result[24].laststamp * 1000) + (3600 * 24 * 1000))
            Date.now() - (result[24].laststamp * 1000) <= (3600 * 24 * 1000) ?
                setTimeToClaimPZA(nextHourPZA.toLocaleString('es-CL')) :
                setTimeToClaimPZA(0)
            setCanCraftPZA(result[25])
            
            setIsCraftSIL(Number(result[26].machineRun) > 0)
            const nextHourSIL = new Date((result[26].laststamp * 1000) + (3600 * 2 * 1000))
            Date.now() - (result[26].laststamp * 1000) <= (3600 * 2 * 1000) ?
                setTimeToClaimSIL(nextHourSIL.toLocaleString('es-CL')) :
                setTimeToClaimSIL(0)
            setCanCraftSIL(result[27])

            setIsCraftGOLD(Number(result[28].machineRun) > 0)
            const nextHourGOLD = new Date((result[28].laststamp * 1000) + (3600 * 4 * 1000))
            Date.now() - (result[28].laststamp * 1000) <= (3600 * 4 * 1000) ?
                setTimeToClaimGOLD(nextHourGOLD.toLocaleString('es-CL')) :
                setTimeToClaimGOLD(0)
            setCanCraftGOLD(result[29])

            setIsMineGold(Number(result[30].machineRun) > 0)
            const nextMineGOLD = new Date((result[30].laststamp * 1000) + (60 * 15 * 1000))
            Date.now() - (result[30].laststamp * 1000) <= (60 * 15 * 1000) ?
                setTimeToClaimMineGold(nextMineGOLD.toLocaleString('es-CL')) :
                setTimeToClaimMineGold(0)
            setCanMineGold(result[31])
        })

    }, [address, txupdate, erc20ABI, ctunaLabABI, sx31LabABI, bbqLab01ABI, bbqLab02ABI, pzaLabABI, goldMineABI, kycABI])

    const craft1Handle = async () => {
        setisLoading(true)
        const tunaAllow = await readContract({
            address: tunaField,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, ctunaLab],
        })
        if (tunaAllow < (50 * 10**18)) {
            try {
                const config = await prepareWriteContract({
                    address: tunaField,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [ctunaLab, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            } catch {}
        }
        const cmjAllow = await readContract({
            address: cmjToken,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, ctunaLab],
        })
        if (cmjAllow < (50 * 10**18)) {
            try {
                const config2 = await prepareWriteContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [ctunaLab, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            } catch {}
        }
        try {
            const config3 = await prepareWriteContract({
                address: ctunaLab,
                abi: ctunaLabABI,
                functionName: 'craft',
            })
            const tx = await writeContract(config3)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const claim1Handle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: ctunaLab,
                abi: ctunaLabABI,
                functionName: 'claim',
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const craft2Handle = async (_machine) => {
        setisLoading(true)
        try {
            const miceAllow = await readContract({
                address: fieldMice,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, sx31Lab],
            })
            if (miceAllow < (500 * 10**18)) {
                const config = await prepareWriteContract({
                    address: fieldMice,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [sx31Lab, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const cmjAllow = await readContract({
                address: cmjToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, sx31Lab],
            })
            if (cmjAllow < (100 * 10**18)) {
                const config2 = await prepareWriteContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [sx31Lab, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const config3 = await prepareWriteContract({
                address: sx31Lab,
                abi: sx31LabABI,
                functionName: 'craft',
                args: [_machine],
            })
            const tx = await writeContract(config3)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const obtain2Handle = async (_machine) => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: sx31Lab,
                abi: sx31LabABI,
                functionName: 'obtain',
                args: [_machine],
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const craftBBQHandle = async (_machine) => {
        setisLoading(true)
        try {
            const woodAllow = await readContract({
                address: woodField,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, bbqLab],
            })
            if (woodAllow < (100 * 10**18)) {
                const config = await prepareWriteContract({
                    address: woodField,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [bbqLab, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: bbqLab,
                abi: bbqLab01ABI,
                functionName: 'craft',
                args: [_machine],
                overrides: {
                    value: ethers.utils.parseEther('0.01'),
                },
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const obtainBBQHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: bbqLab,
                abi: bbqLab01ABI,
                functionName: 'obtain',
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const upgradeBBQHandle = async (_level) => {
        setisLoading(true)
        try {
            const woodAllow = await readContract({
                address: woodField,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, bbqLab],
            })
            let woodUsage = 0
            if (_level === 1) {
                woodUsage = 6000
            } else if (_level === 2) {
                woodUsage = 60000
            } else if (_level === 3) {
                woodUsage = 600000
            }
            if (woodAllow < (woodUsage * 10**18)) {
                const config = await prepareWriteContract({
                    address: woodField,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [bbqLab, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: bbqLab,
                abi: bbqLab01ABI,
                functionName: 'upgrade',
                args: [_level]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const craftBBQHandle_G = async () => {
        setisLoading(true)
        try {
            const woodAllow = await readContract({
                address: woodField,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, globalBbqLab],
            })
            if (woodAllow < (600000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: woodField,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [globalBbqLab, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const jdaoAllow = await readContract({
                address: jdaoToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, globalBbqLab],
            })
            if (jdaoAllow < (10 * 10**18)) {
                const config2 = await prepareWriteContract({
                    address: jdaoToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [globalBbqLab, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const config3 = await prepareWriteContract({
                address: globalBbqLab,
                abi: bbqLab02ABI,
                functionName: 'craft',
            })
            const tx = await writeContract(config3)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const obtainBBQHandle_G = async () => {
        setisLoading(true)
        try {
            const cmjAllow = await readContract({
                address: cmjToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, globalBbqLab],
            })
            if (cmjAllow < (1 * 10**18)) {
                const config = await prepareWriteContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [globalBbqLab, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: globalBbqLab,
                abi: bbqLab02ABI,
                functionName: 'obtain',
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const craftPzaHandle = async (_index) => {
        setisLoading(true)
        try {
            const bbqAllow = await readContract({
                address: bbqToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, pzaLab],
            })
            console.log(bbqAllow)
            if (bbqAllow < (10000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: bbqToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [pzaLab, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const stOPTAllow = await readContract({
                address: stOPT,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, pzaLab],
            })
            if (stOPTAllow < (1 * 10**18)) {
                const config2 = await prepareWriteContract({
                    address: stOPT,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [pzaLab, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const config3 = await prepareWriteContract({
                address: pzaLab,
                abi: pzaLabABI,
                functionName: 'craft',
                args: [_index],
            })
            const tx = await writeContract(config3)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const obtainPzaHandle = async (_index) => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: pzaLab,
                abi: pzaLabABI,
                functionName: 'obtain',
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const craftSILHandle = async (_machine) => {
        setisLoading(true)
        try {
            const cuAllow = await readContract({
                address: cuToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, silLab],
            })
            if (cuAllow < (50000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: cuToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [silLab, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const cmjAllow = await readContract({
                address: cmjToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, silLab],
            })
            if (cmjAllow < (10 * 10**18)) {
                const config2 = await prepareWriteContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [silLab, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const config3 = await prepareWriteContract({
                address: silLab,
                abi: pzaLabABI,
                functionName: 'craft',
                args: [_machine],
            })
            const tx = await writeContract(config3)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const obtainSILHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: silLab,
                abi: pzaLabABI,
                functionName: 'obtain',
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const craftGOLDHandle = async (_machine) => {
        setisLoading(true)
        try {
            const silAllow = await readContract({
                address: silToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, goldLab],
            })
            if (silAllow < (2000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: silToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [goldLab, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const sx31Allow = await readContract({
                address: sx31Lab,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, goldLab],
            })
            if (sx31Allow < (200 * 10**18)) {
                const config2 = await prepareWriteContract({
                    address: sx31Lab,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [goldLab, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const config3 = await prepareWriteContract({
                address: goldLab,
                abi: pzaLabABI,
                functionName: 'craft',
                args: [_machine],
            })
            const tx = await writeContract(config3)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const obtainGOLDHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: goldLab,
                abi: pzaLabABI,
                functionName: 'obtain',
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const mineGOLDHandle = async (_machine) => {
        setisLoading(true)
        try {
            const bbqAllow = await readContract({
                address: bbqToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, goldMine],
            })
            if (bbqAllow < (200 * 10**18)) {
                const config = await prepareWriteContract({
                    address: bbqToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [goldMine, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: goldMine,
                abi: goldMineABI,
                functionName: 'mine',
                args: [_machine],
                overrides: {
                    value: ethers.utils.parseEther('10'),
                },
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const obtainMineGOLDHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: goldMine,
                abi: goldMineABI,
                functionName: 'obtain',
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}} className="pixel">
                <div style={{fontSize: "75px", width: "fit-content"}}>Labs</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px", letterSpacing: "1px"}}>Craft, Await and Obtain!</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="./background/labslogo.png" width="150" alt="Labs_Logo" />
            </div>
        </div>

        <div className="collection">
            <div style={{textAlign: "left", height: "fit-content", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                <div style={{width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Cryptocurrency</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img src="./tokens/jbc.png" width="20" alt="$JBC"/>
                        <div style={{marginLeft: "5px"}}>{Number(jbcBalance).toFixed(3)}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img 
                            src="https://nftstorage.link/ipfs/bafkreibizkouoitypq64ynygiclarbenejrtvsrfzeuezwh2b75fffyrzi"
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
                                            image: 'https://nftstorage.link/ipfs/bafkreibizkouoitypq64ynygiclarbenejrtvsrfzeuezwh2b75fffyrzi',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(cmjBalance).toFixed(3)}</div>
                    </div>
                </div>

                <div style={{width: "100%", textIndent: "20px", fontSize: "15px", marginTop: "20px", letterSpacing: "1px"}} className="bold">Resources</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4"
                            width="20"
                            alt="$WOOD"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: woodField,
                                            symbol: 'WOOD',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(woodBalance).toFixed(0)}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreibtp4almzmdovhvygxeyykw5fa6pqe76cbdum4quispehlddqgp2e"
                            width="20"
                            alt="$stOPT"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: stOPT,
                                            symbol: 'stOPT',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreibtp4almzmdovhvygxeyykw5fa6pqe76cbdum4quispehlddqgp2e',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(stOPTBalance).toFixed(2)}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreifqroahbmxgnmsqdot5bzu3xbsa7y27mnlo6k45efgidmqxqrstbe"
                            width="20"
                            alt="$TUNA"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: tunaField,
                                            symbol: 'TUNA',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreifqroahbmxgnmsqdot5bzu3xbsa7y27mnlo6k45efgidmqxqrstbe',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(tunaBalance).toFixed(3)}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i"
                            width="20"
                            alt="$MICE"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: fieldMice,
                                            symbol: 'MICE',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(miceBalance).toFixed(3)}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
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
                                            address: cuToken,
                                            symbol: 'CU',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(copperBalance).toFixed(3)}</div>
                    </div>
                </div>

                <div style={{width: "100%", textIndent: "20px", fontSize: "15px", marginTop: "20px", letterSpacing: "1px"}} className="bold">Craft Products</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
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
                        <div style={{marginLeft: "5px"}}>{Number(bbqBalance).toFixed(0)}</div>
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
                            src="https://nftstorage.link/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde"
                            width="20"
                            alt="$SIL"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: silToken,
                                            symbol: 'SIL',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(silverBalance).toFixed(3)}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm"
                            width="20"
                            alt="$GOLD"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: goldToken,
                                            symbol: 'GOLD',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(goldBalance).toFixed(3)}</div>
                    </div>
                </div>

                <div style={{marginTop: "40px", width: "97.5%", borderBottom: "1px solid #dddade"}}></div>
                <div style={{marginTop: "20px", width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Labs & Factories</div>
                <div style={{width: "100%", marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                        {levelCraftBBQ >= 0 ? <div style={{position: "absolute", top: 15, right: 15, padding: "10px 20px", letterSpacing: 1, background: "transparent", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="bold">LEVEL {levelCraftBBQ}</div> : <></>}
                        <div style={{width: "200px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            {isCraftBBQ !== null || levelCraftBBQ < 4 ? <img src="./elements/BBQ_factory01_lv0.png" width="200" alt="$BBQ_Factory_lv0"/> : <></>}
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i></div>
                            <div style={{display: "flex", flexDirection: "row", fontSize: "15px"}}>
                                <img src="https://nftstorage.link/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="18" alt="$WOOD"/>
                                <div style={{margin: "0 5px"}}>100</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                <img src="./tokens/jbc.png" height="18" alt="$JBC"/>
                                <div style={{margin: "0 5px"}}>0.01</div>
                                <i style={{fontSize: "16px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="18" alt="$BBQ"/>
                                <div style={{margin: "0 5px"}}>
                                    {isCraftBBQ !== null ?
                                        <>
                                            {levelCraftBBQ === 0 ? "5" : ""}
                                            {levelCraftBBQ === 1 ? "10" : ""}
                                            {levelCraftBBQ === 2 ? "20" : ""}
                                            {levelCraftBBQ === 3 ? "40" : ""}
                                        </> :
                                        "..."
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i></div>
                            <div>5 minutes</div>
                        </div>
                        {isCraftBBQ ?
                            <>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                    <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i></div>
                                    <div>{timetoClaimBBQ === 0 ? "now" : timetoClaimBBQ}</div>
                                </div>
                                {timetoClaimBBQ === 0 ?
                                    <div style={{background: "#67BAA7", display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={obtainBBQHandle}>Obtain</div> :
                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Obtain</div>
                                }
                            </> :
                            <>
                                {address !== null && address !== undefined ?
                                    <>
                                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i></div>
                                            <div style={{display: "flex", flexDirection: "row"}}>
                                                <img src="https://nftstorage.link/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="18" alt="$WOOD"/>
                                                <div style={{margin: "0 5px"}}>
                                                    {isCraftBBQ !== null ?
                                                        <>
                                                            {levelCraftBBQ === 0 ? "6,000" : ""}
                                                            {levelCraftBBQ === 1 ? "60,000" : ""}
                                                            {levelCraftBBQ === 2 ? "600,000" : ""}
                                                            {levelCraftBBQ === 3 ? "Upgradable soon!" : ""}
                                                        </> :
                                                        "Loading..."
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {isCraftBBQ !== null ?
                                            <div style={{width: "100%", marginTop: "20px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                                {canCraftBBQ ?
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px"}} className="pixel button" onClick={() => craftBBQHandle(levelCraftBBQ + 1)}>Craft Barbeque</div> :
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Lack of Raw Mat...</div>
                                                }
                                                {(levelCraftBBQ === 0 && woodBalance >= 6000) || (levelCraftBBQ === 1 && woodBalance >= 60000) || (levelCraftBBQ === 2 && woodBalance >= 600000) ?
                                                    <div style={{background: "#67BAA7", display: "flex", justifyContent: "center", width: "100px", borderRadius: "12px", padding: "15px"}} className="pixel button" onClick={() => upgradeBBQHandle(levelCraftBBQ + 1)}>UPGRADE</div> :
                                                    <div style={{display: "flex", justifyContent: "center", width: "100px", borderRadius: "12px", padding: "15px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">UPGRADE</div>
                                                }
                                            </div> :
                                            <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "20px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Craft Barbeque</div>
                                        }
                                    </> :
                                    <div style={{display: "flex", justifyContent: "center", width: "185px", marginTop: "20px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                                }
                            </>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                        <div style={{position: "absolute", top: 15, right: 15, padding: "10px 20px", fontSize: "14px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">
                            [{Number(dataCraftBBQ_G.totalQuota)}/60] {dataCraftBBQ_G.addr.slice(0, 4) + "..." + dataCraftBBQ_G.addr.slice(-4)}<br></br>
                            [Next] {dataCraftBBQ_G_Next.addr.slice(0, 4) + "..." + dataCraftBBQ_G_Next.addr.slice(-4)}
                        </div>
                        <div style={{width: "200px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            <img src="https://nftstorage.link/ipfs/bafkreidgivpl6pkbnimqngnyq7ovwnzrzbqnjwkclvcpzr4ypcfyxirwbu" width="290" alt="Large_BBQ_Factory"/>
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i></div>
                            <div style={{display: "flex", flexDirection: "row", fontSize: "15px"}}>
                                <img src="https://nftstorage.link/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="18" alt="$WOOD"/>
                                <div style={{margin: "0 5px"}}>600k</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                <div style={{margin: "0 5px"}}>10</div>
                                <i style={{fontSize: "16px", margin: "2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="18" alt="$BBQ"/>
                                <div style={{margin: "0 5px"}}>6,000</div>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i></div>
                            <div>1 minutes x 60 quota</div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                    {Number(dataCraftBBQ_G.totalQuota) !== 0 ?
                                        <>
                                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i></div>
                                            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>{timetoClaimBBQ_G === 0 ? <>now (Obtain cost = <img style={{margin: "0 5px"}} src="https://nftstorage.link/ipfs/bafkreibizkouoitypq64ynygiclarbenejrtvsrfzeuezwh2b75fffyrzi" height="18" alt="$CMJ"/> 1)</> : timetoClaimBBQ_G}</div>
                                        </> :
                                        <>
                                            <div style={{width: "100px"}}></div>
                                            <div>The machine was stopped!</div>
                                        </>
                                    }
                                </div>
                                <div style={{width: "100%", marginTop: "20px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                    {Number(dataCraftBBQ_G.totalQuota) !== 0 && timetoClaimBBQ_G === 0 ?
                                        <div style={{background: "#67BAA7", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px"}} className="pixel button" onClick={obtainBBQHandle_G}>Obtain 100 BBQ</div> :
                                        <div style={{display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Obtain 100 BBQ</div>
                                    }
                                    {dataCraftBBQ_G_Next.addr === "0x0000000000000000000000000000000000000000" ?
                                        <>
                                            {canCraftBBQ_G ?
                                                <div style={{display: "flex", justifyContent: "center", width: "100px", borderRadius: "12px", padding: "15px"}} className="pixel button" onClick={craftBBQHandle_G}>Craft</div> :
                                                <div style={{display: "flex", justifyContent: "center", width: "100px", borderRadius: "12px", padding: "15px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Lack Mat...</div>
                                            }
                                        </> :
                                        <div style={{display: "flex", justifyContent: "center", width: "100px", borderRadius: "12px", padding: "15px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Craft</div>
                                    }
                                </div>
                            </> :
                            <div style={{display: "flex", justifyContent: "center", width: "185px", marginTop: "20px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                        <div style={{width: "200px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            <img src="https://nftstorage.link/ipfs/bafkreihbzubgndsg3y6j666b7i6mxky7fp7os5xtefrszzyslequkrnvta" width="280" alt="Pizza_Factory"/>
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i></div>
                            <div style={{display: "flex", flexDirection: "row", fontSize: "15px"}}>
                                <img src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="18" alt="$BBQ"/>
                                <div style={{margin: "0 5px"}}>10,000</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreibtp4almzmdovhvygxeyykw5fa6pqe76cbdum4quispehlddqgp2e" height="18" alt="$stOPT"/>
                                <div style={{margin: "0 5px"}}>1</div>
                                <i style={{fontSize: "16px", margin: "2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu" height="18" alt="$PZA"/>
                                <div style={{margin: "0 5px"}}>500</div>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i></div>
                            <div>24 hour</div>
                        </div>
                        {isCraftPZA ?
                            <>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                    <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i></div>
                                    <div>{timetoClaimPZA === 0 ? "now" : timetoClaimPZA}</div>
                                </div>
                                {timetoClaimPZA === 0 ?
                                    <div style={{background: "#67BAA7", display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={() => obtainPzaHandle(1)}>Obtain</div> :
                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Obtain</div>
                                }
                            </> :
                            <>
                                {address !== null && address !== undefined ?
                                    <>
                                        {isCraftPZA !== null ?
                                            <>
                                                {canCraftPZA ?
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={() => craftPzaHandle(1)}>Craft Pizza</div> :
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Lack of Raw Mat...</div>
                                                }
                                            </> :
                                            <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Craft Pizza</div>
                                        }
                                    </> :
                                    <div style={{display: "flex", justifyContent: "center", width: "185px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px",  background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                                }
                            </>
                        }
                    </div>
                </div>
                
                <div style={{width: "100%", margin: "10px 0", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                        <div style={{width: "200px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            <img src="./elements/ctunafactory.png" width="200" alt="$CTUNA_Factory"/>
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i></div>
                            <div style={{display: "flex", flexDirection: "row", fontSize: "15px"}}>
                                <img src="https://nftstorage.link/ipfs/bafkreifqroahbmxgnmsqdot5bzu3xbsa7y27mnlo6k45efgidmqxqrstbe" height="18" alt="$TUNA"/>
                                <div style={{margin: "0 5px"}}>50</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreibizkouoitypq64ynygiclarbenejrtvsrfzeuezwh2b75fffyrzi" height="18" alt="$CMJ"/>
                                <div style={{margin: "0 5px"}}>10</div>
                                <i style={{fontSize: "16px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i" height="18" alt="$CTUNA"/>
                                <div style={{margin: "0 5px"}}>50</div>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i></div>
                            <div>1 hour</div>
                        </div>
                        {isCraft1 ?
                            <>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                    <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i></div>
                                    <div>{timetoClaim1 === 0 ? "now" : timetoClaim1}</div>
                                </div>
                                {timetoClaim1 === 0 ?
                                    <div style={{background: "#67BAA7", display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={claim1Handle}>Obtain</div> :
                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Obtain</div>
                                }
                            </> :
                            <>
                                {address !== null && address !== undefined ?
                                    <>
                                        {isCraft1 !== null ?
                                            <>
                                                {canCraft1 ?
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={craft1Handle}>Craft Canned Tuna</div> :
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Lack of Raw Mat...</div>
                                                }
                                            </> :
                                            <div style={{display: "flex", justifyContent: "center", width: "170px",marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Craft Canned Tuna</div>
                                        }
                                    </> :
                                    <div style={{display: "flex", justifyContent: "center", width: "185px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px",  background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                                }
                            </>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                        <div style={{width: "200px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            <img src="./elements/sx31factory.png" width="200" alt="$SX31_Factory"/>
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i></div>
                            <div style={{display: "flex", flexDirection: "row", fontSize: "15px"}}>
                                <img src="https://nftstorage.link/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" height="18" alt="$MICE"/>
                                <div style={{margin: "0 5px"}}>50</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreibizkouoitypq64ynygiclarbenejrtvsrfzeuezwh2b75fffyrzi" height="18" alt="$CMJ"/>
                                <div style={{margin: "0 5px"}}>9</div>
                                <i style={{fontSize: "16px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4" height="18" alt="$SX31"/>
                                <div style={{margin: "0 5px"}}>50</div>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i></div>
                            <div>1 hour</div>
                        </div>
                        {isCraft2 && craft2machine === 1 ?
                            <>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                    <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i></div>
                                    <div>{timetoClaim2 === 0 ? "now" : timetoClaim2}</div>
                                </div>
                                {timetoClaim2 === 0 ?
                                    <div style={{background: "#67BAA7", display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={() => obtain2Handle(1)}>Obtain</div> :
                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Obtain</div>
                                }
                            </> :
                            <>
                                {address !== null && address !== undefined ?
                                    <>
                                        {isCraft2 === false ?
                                            <>
                                                {canCraft2 ?
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={() => craft2Handle(1)}>Craft Sphinx31</div> :
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Lack of Raw Mat...</div>
                                                }
                                            </> :
                                            <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Craft Sphinx31</div>
                                        }
                                    </> :
                                    <div style={{display: "flex", justifyContent: "center", width: "185px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px",  background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                                }
                            </>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                        <div style={{width: "200px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            <img src="https://nftstorage.link/ipfs/bafkreibmo7hlkn73ltjvkrvjrjkztx74qosbzszsd2rjq42dgsrggvhy5i" width="310" alt="Large_SX31_Factory"/>
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i></div>
                            <div style={{display: "flex", flexDirection: "row", fontSize: "15px"}}>
                                <img src="https://nftstorage.link/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" height="18" alt="$MICE"/>
                                <div style={{margin: "0 5px"}}>500</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreibizkouoitypq64ynygiclarbenejrtvsrfzeuezwh2b75fffyrzi" height="18" alt="$CMJ"/>
                                <div style={{margin: "0 5px"}}>90</div>
                                <i style={{fontSize: "16px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4" height="18" alt="$SX31"/>
                                <div style={{margin: "0 5px"}}>500</div>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i></div>
                            <div>8 hour</div>
                        </div>
                        {isKYC ?
                            <>
                            {isCraft2 && craft2machine === 431826 ?
                                <>
                                    <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                        <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i></div>
                                        <div>{timetoClaim2_2 === 0 ? "now" : timetoClaim2_2}</div>
                                    </div>
                                    {timetoClaim2_2 === 0 ?
                                        <div style={{background: "#67BAA7", display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={() => obtain2Handle(431826)}>Obtain</div> :
                                        <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Obtain</div>
                                    }
                                </> :
                                <>
                                    {isCraft2 === false ?
                                        <>
                                            {canCraft2_2 ?
                                                <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={() => craft2Handle(431826)}>Craft Sphinx31</div> :
                                                <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Lack of Raw Mat...</div>
                                            }
                                        </> :
                                        <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Craft Sphinx31</div>
                                    }
                                </>
                            }
                            </> :
                            <div style={{display: "flex", justifyContent: "center", width: "195px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px",  background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Reserved for Dionysus</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", margin: "10px 0", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                        <div style={{width: "200px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            <img src="https://nftstorage.link/ipfs/bafkreidy3wavoltdphdhinuv5lpdevx7yao545xuzngiwqbtyyohr7jzuy" width="250" alt="$SIL_Factory"/>
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i></div>
                            <div style={{display: "flex", flexDirection: "row", fontSize: "15px"}}>
                                <img src="https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" height="18" alt="$CU"/>
                                <div style={{margin: "0 5px"}}>50,000</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreibizkouoitypq64ynygiclarbenejrtvsrfzeuezwh2b75fffyrzi" height="18" alt="$CMJ"/>
                                <div style={{margin: "0 5px"}}>10</div>
                                <i style={{fontSize: "16px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde" height="18" alt="$SIL"/>
                                <div style={{margin: "0 5px"}}>5,000</div>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i></div>
                            <div>2 hour</div>
                        </div>
                        {isCraftSIL ?
                            <>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                    <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i></div>
                                    <div>{timetoClaimSIL === 0 ? "now" : timetoClaimSIL}</div>
                                </div>
                                {timetoClaimSIL === 0 ?
                                    <div style={{background: "#67BAA7", display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={obtainSILHandle}>Obtain</div> :
                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Obtain</div>
                                }
                            </> :
                            <>
                                {address !== null && address !== undefined ?
                                    <>
                                        {isCraftSIL !== null ?
                                            <>
                                                {canCraftSIL ?
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={() => craftSILHandle(1)}>Craft Silver</div> :
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Lack of Raw Mat...</div>
                                                }
                                            </> :
                                            <div style={{display: "flex", justifyContent: "center", width: "170px",marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Craft Silver</div>
                                        }
                                    </> :
                                    <div style={{display: "flex", justifyContent: "center", width: "185px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px",  background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                                }
                            </>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px 20px 80px 20px"}}>
                        <div style={{width: "350px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "visible"}}>
                            <img src="https://nftstorage.link/ipfs/bafkreicrxd4ah7pmi2gaemx73rd6msspxyzg5aglqf3iez4mkyocdh3nta" width="330" alt="$GOLD_Factory"/>
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i></div>
                            <div style={{display: "flex", flexDirection: "row", fontSize: "15px"}}>
                                <img src="https://nftstorage.link/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde" height="18" alt="$SIL"/>
                                <div style={{margin: "0 5px"}}>2,000</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4" height="18" alt="$SX31"/>
                                <div style={{margin: "0 5px"}}>200</div>
                                <i style={{fontSize: "16px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm" height="18" alt="$GOLD"/>
                                <div style={{margin: "0 5px"}}>500</div>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i></div>
                            <div>4 hour</div>
                        </div>
                        {isCraftGOLD ?
                            <>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                    <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i></div>
                                    <div>{timetoClaimGOLD === 0 ? "now" : timetoClaimGOLD}</div>
                                </div>
                                {timetoClaimGOLD === 0 ?
                                    <div style={{background: "#67BAA7", display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={obtainGOLDHandle}>Obtain</div> :
                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Obtain</div>
                                }
                            </> :
                            <>
                                {address !== null && address !== undefined ?
                                    <>
                                        {isCraftGOLD !== null ?
                                            <>
                                                {canCraftGOLD ?
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={() => craftGOLDHandle(1)}>Craft Gold</div> :
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Lack of Raw Mat...</div>
                                                }
                                            </> :
                                            <div style={{display: "flex", justifyContent: "center", width: "170px",marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Craft Gold</div>
                                        }
                                    </> :
                                    <div style={{display: "flex", justifyContent: "center", width: "185px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px",  background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                                }
                            </>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px 20px 80px 20px"}}>
                        <div style={{width: "200px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            <img src="https://nftstorage.link/ipfs/bafybeidn2yecujkgvkuroqg6oh2nirgbd7xyhj3nfgqda7zas7hc5qmchy" width="300" alt="$GOLD_Mine"/>
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i></div>
                            <div style={{display: "flex", flexDirection: "row", fontSize: "15px"}}>
                                <img src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="18" alt="$BBQ"/>
                                <div style={{margin: "0 5px"}}>200</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                <img src="./tokens/jbc.png" height="18" alt="$JBC"/>
                                <div style={{margin: "0 5px"}}>10</div>
                                <i style={{fontSize: "16px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm" height="18" alt="$GOLD"/>
                                <div style={{margin: "0 5px"}}>6.25</div>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i></div>
                            <div>15 minutes</div>
                        </div>
                        {isMineGold ?
                            <>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                    <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i></div>
                                    <div>{timetoClaimMineGold === 0 ? "now" : timetoClaimMineGold}</div>
                                </div>
                                {timetoClaimMineGold === 0 ?
                                    <div style={{background: "#67BAA7", display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={obtainMineGOLDHandle}>Obtain</div> :
                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Obtain</div>
                                }
                            </> :
                            <>
                                {address !== null && address !== undefined ?
                                    <>
                                        {isMineGold !== null ?
                                            <>
                                                {canMineGold ?
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={() => mineGOLDHandle(1)}>Mine Gold</div> :
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Lack of Raw Mat...</div>
                                                }
                                            </> :
                                            <div style={{display: "flex", justifyContent: "center", width: "170px",marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Mine Gold</div>
                                        }
                                    </> :
                                    <div style={{display: "flex", justifyContent: "center", width: "185px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px",  background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                                }
                            </>
                        }
                    </div>
                </div>

                <div style={{width: "100%", margin: "10px 0", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px 20px 80px 20px"}}>
                        <div style={{width: "350px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "visible"}}>
                            
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i></div>
                            <div style={{display: "flex", flexDirection: "row", fontSize: "15px"}}>
                                <img src="https://nftstorage.link/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="18" alt="$WOOD"/>
                                <div style={{margin: "0 5px"}}>100M</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                <div style={{margin: "0 5px"}}>$MT 500</div>
                                <i style={{fontSize: "16px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="https://nftstorage.link/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm" height="18" alt="$GOLD"/>
                                <div style={{margin: "0 5px"}}>10,000</div>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i></div>
                            <div>1 hour</div>
                        </div>
                        {false && isCraftGOLD ?
                            <>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                    <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i></div>
                                    <div>{timetoClaimGOLD === 0 ? "now" : timetoClaimGOLD}</div>
                                </div>
                                {timetoClaimGOLD === 0 ?
                                    <div style={{background: "#67BAA7", display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={obtainGOLDHandle}>Obtain</div> :
                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Obtain</div>
                                }
                            </> :
                            <>
                                {address !== null && address !== undefined ?
                                    <>
                                        {false && isCraftGOLD !== null ?
                                            <>
                                                {canCraftGOLD ?
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={() => craftGOLDHandle(1)}>Craft Gold</div> :
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Lack of Raw Mat...</div>
                                                }
                                            </> :
                                            <div style={{display: "flex", justifyContent: "center", width: "170px",marginTop: "40px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Craft Gold</div>
                                        }
                                    </> :
                                    <div style={{display: "flex", justifyContent: "center", width: "185px", marginTop: "40px", borderRadius: "12px", padding: "15px 40px",  background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
    )

}

export default Labs

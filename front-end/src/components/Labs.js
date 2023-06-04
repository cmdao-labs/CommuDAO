import React from 'react'
import { ethers } from 'ethers'
import { fetchBalance, readContract, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'

const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const jdaoToken = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'
const woodField = '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd'
const bbqToken = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const bbqLab = '0x9D73C97edC9489935B2dF250a097917d4860C60e'
const globalBbqLab = '0x93104865DAD97b038Eea8874E3a1AFE7C52F9d57'

const tunaField = "0x09676315DC0c85F6bd5e866C5f1363A00Eec4381"
const ctunaLab = "0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0"

const fieldMice = '0x09DE640ecd50e1c81bCB266279e3ffC2719873df'
const sx31Lab = '0xd431d826d7a4380b9259612176f00528b88840a7'

const dionysus = '0xEb87113c128158673e07E283046bB29A3603F71b'

const Labs = ({ setisLoading, txupdate, setTxupdate, ctunaLabABI, sx31LabABI, bbqLab01ABI, bbqLab02ABI, erc20ABI, dionysusABI }) => {
    const { address } = useAccount()

    const [jbcBalance, setJbcBalance] = React.useState(0)
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [woodBalance, setWoodBalance] = React.useState(0)
    const [bbqBalance, setBbqBalance] = React.useState(0)
    const [tunaBalance, setTunaBalance] = React.useState(0)
    const [ctunaBalance, setCTunaBalance] = React.useState(0)
    const [miceBalance, setMiceBalance] = React.useState(0)
    const [sx31Balance, setSx31Balance] = React.useState(0)

    const [levelCraftBBQ, setLevelCraftBBQ] = React.useState(0)
    const [isCraftBBQ, setIsCraftBBQ] = React.useState(null)
    const [timetoClaimBBQ, setTimeToClaimBBQ] = React.useState(0)
    const [canCraftBBQ, setCanCraftBBQ] = React.useState(false)

    const [dataCraftBBQ_G, setDataCraftBBQ_G] = React.useState({addr: "0x0000000000000000000000000000000000000000", totalQuota: 0, lastStamp: 0})
    const [dataCraftBBQ_G_Next, setDataCraftBBQ_G_Next] = React.useState({addr: "0x0000000000000000000000000000000000000000", totalQuota: 0, lastStamp: 0})
    const [timetoClaimBBQ_G, setTimeToClaimBBQ_G] = React.useState(null)
    const [canCraftBBQ_G, setCanCraftBBQ_G] = React.useState(false)

    const [isCraft1, setIsCraft1] = React.useState(null)
    const [timetoClaim1, setTimeToClaim1] = React.useState(0)
    const [canCraft1, setCanCraft1] = React.useState(false)

    const [isCraft2, setIsCraft2] = React.useState(null)
    const [craft2machine, setCraft2machine] = React.useState(0)
    const [timetoClaim2, setTimeToClaim2] = React.useState(0)
    const [timetoClaim2_2, setTimeToClaim2_2] = React.useState(0)
    const [canCraft2, setCanCraft2] = React.useState(false)
    const [canCraft2_2, setCanCraft2_2] = React.useState(false)

    const [isKYC, setIsKYC] = React.useState(null)

    React.useEffect(() => {        
        const thefetch = async () => {
            const isDionysus = address !== null && address !== undefined ? await readContract({
                address: dionysus,
                abi: dionysusABI,
                functionName: 'isKYC',
                args: [address],
            }) : false

            const jbcBal = address !== null && address !== undefined ?
                await fetchBalance({ address: address, }) :
                {formatted: 0}
            const res = address !== null && address !== undefined ? await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "` + address + `") {
                            ERC20balances {
                                id
                                valueExact
                            }
                        }
                    }`
                })
            })).json() : null
            const _res = res !== null && res.data.account !== null ? res.data.account.ERC20balances : []

            let cmjBal = 0
            let woodBal = 0 
            let bbqBal = 0
            let tunaBal = 0
            let ctunaBal = 0
            let miceBal = 0
            let sx31Bal = 0
            for (let i = 0; i <= _res.length - 1; i++) {
                if (_res[i].id.slice(0, 42).toUpperCase() === cmjToken.toUpperCase()) {
                    cmjBal = _res[i].valueExact
                } else if (_res[i].id.slice(0, 42).toUpperCase() === woodField.toUpperCase()) {
                    woodBal = _res[i].valueExact
                } else if (_res[i].id.slice(0, 42).toUpperCase() === bbqToken.toUpperCase()) {
                    bbqBal = _res[i].valueExact
                } else if (_res[i].id.slice(0, 42).toUpperCase() === tunaField.toUpperCase()) {
                    tunaBal = _res[i].valueExact
                } else if (_res[i].id.slice(0, 42).toUpperCase() === ctunaLab.toUpperCase()) {
                    ctunaBal = _res[i].valueExact
                } else if (_res[i].id.slice(0, 42).toUpperCase() === fieldMice.toUpperCase()) {
                    miceBal = _res[i].valueExact
                } else if (_res[i].id.slice(0, 42).toUpperCase() === sx31Lab.toUpperCase()) {
                    sx31Bal = _res[i].valueExact
                }
            }

            const labLog = address !== null && address !== undefined ? await readContract({
                address: ctunaLab,
                abi: ctunaLabABI,
                functionName: 'tunaSupplier',
                args: [address],
            }) : {isCraft: false, laststamp: 0}
            const _canCraft1 = Number(ethers.utils.formatEther(String(tunaBal))) >= 50 && Number(ethers.utils.formatEther(String(cmjBal))) >= 10 ? true : false

            const labLog2 = address !== null && address !== undefined ? await readContract({
                address: sx31Lab,
                abi: sx31LabABI,
                functionName: 'supplier',
                args: [address],
            }) : {isCraft: false, machineIndex: 0, laststamp: 0}
            const _canCraft2 = Number(ethers.utils.formatEther(String(miceBal))) >= 50 && Number(ethers.utils.formatEther(String(cmjBal))) >= 9 ? true : false
            const _canCraft2_2 = Number(ethers.utils.formatEther(String(miceBal))) >= 500 && Number(ethers.utils.formatEther(String(cmjBal))) >= 90 ? true : false

            const labLogBBQ = address !== null && address !== undefined ? await readContract({
                address: bbqLab,
                abi: bbqLab01ABI,
                functionName: 'supplier',
                args: [address],
            }) : {isCraft: false, machineIndex: 0, laststamp: 0}
            const _canCraftBBQ = Number(ethers.utils.formatEther(String(woodBal))) >= 100 && Number(jbcBal.formatted) >= 0.01 ? true : false

            const currentQueue = await readContract({
                address: globalBbqLab,
                abi: bbqLab02ABI,
                functionName: 'currentQueue',
            })
            const labLogBBQ_G = await readContract({
                address: globalBbqLab,
                abi: bbqLab02ABI,
                functionName: 'supplier',
                args: [currentQueue],
            })
            const labLogBBQ_G_Next = await readContract({
                address: globalBbqLab,
                abi: bbqLab02ABI,
                functionName: 'supplier',
                args: [Number(currentQueue) + 1],
            })
            const _canCraftBBQ_G = Number(ethers.utils.formatEther(String(woodBal))) >= 600000 && Number(cmjBal) >= 1 ? true : false

            return [
                isDionysus, jbcBal, cmjBal, woodBal, bbqBal, tunaBal, ctunaBal, miceBal, sx31Bal,
                labLog, _canCraft1, labLog2, _canCraft2, _canCraft2_2, labLogBBQ, _canCraftBBQ,
                labLogBBQ_G, labLogBBQ_G_Next, _canCraftBBQ_G,
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

            setIsCraft1(result[9].isCraft)
            const nextHour = new Date((result[9].laststamp * 1000) + (3600 * 1000))
            Date.now() - (result[9].laststamp * 1000) <= (3600 * 1000) ?
                setTimeToClaim1(nextHour.toLocaleString('es-CL')) :
                setTimeToClaim1(0)
            setCanCraft1(result[10])

            setIsCraft2(result[11].isCraft)
            setCraft2machine(Number(result[11].machineIndex))
            let nextHour2 = 0
            if (Number(result[11].machineIndex) === 1) {
                nextHour2 = new Date((result[11].laststamp * 1000) + (3600 * 1 * 1000))
                Date.now() - (result[11].laststamp * 1000) <= (3600 * 1 * 1000) ?
                    setTimeToClaim2(nextHour2.toLocaleString('es-CL')) :
                    setTimeToClaim2(0)
            } else if (Number(result[11].machineIndex) === 431826) {
                nextHour2 = new Date((result[11].laststamp * 1000) + (3600 * 8 * 1000))
                Date.now() - (result[11].laststamp * 1000) <= (3600 * 8 * 1000) ?
                    setTimeToClaim2_2(nextHour2.toLocaleString('es-CL')) :
                    setTimeToClaim2_2(0)
            }
            setCanCraft2(result[12])
            setCanCraft2_2(result[13])

            setLevelCraftBBQ(Number(result[14].craftLevel))
            setIsCraftBBQ(Number(result[14].machineRun) > 0)
            const nextObtainBBQ = new Date((result[14].laststamp * 1000) + (300 * 1000))
            Date.now() - (result[14].laststamp * 1000) <= (300 * 1000) ?
                setTimeToClaimBBQ(nextObtainBBQ.toLocaleString('es-CL')) :
                setTimeToClaimBBQ(0)
            setCanCraftBBQ(result[15])

            setDataCraftBBQ_G(result[16])
            const nextObtainBBQ_G = new Date((result[16].laststamp * 1000) + (60 * 1000))
            Date.now() - (result[16].laststamp * 1000) <= (60 * 1000) ?
                setTimeToClaimBBQ_G(nextObtainBBQ_G.toLocaleString('es-CL')) :
                setTimeToClaimBBQ_G(0)
            setDataCraftBBQ_G_Next(result[17])
            setCanCraftBBQ_G(result[18])
        })

    }, [address, txupdate, erc20ABI, ctunaLabABI, sx31LabABI, bbqLab01ABI, bbqLab02ABI, dionysusABI])

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

    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div style={{fontSize: "95px", width: "fit-content"}} className="pixel">Labs</div>
                <div style={{fontSize: "22.5px", width: "fit-content", marginTop: "30px"}} className="pixel">Craft resources from fields for more valuable items.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="./background/labslogo.png" width="175" alt="Labs_Logo" />
            </div>
        </div>

        <div className="collection">
            <div style={{textAlign: "left", height: "fit-content", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                <div style={{width: "100%", textIndent: "20px", fontSize: "18px"}} className="bold">Your Tokens</div>
                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "20px"}}></div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll bold">
                    <div style={{minWidth: "250px", margin: "20px"}} className="items">
                        <img src="./tokens/jbc.png" width="22" alt="$JBC"/>
                        <div style={{marginLeft: "5px"}}>{Number(jbcBalance).toFixed(3)}</div>
                    </div>
                    <div style={{minWidth: "250px", margin: "20px"}} className="items">
                        <img src="./tokens/cmj.png" width="22" alt="$CMJ"/>
                        <div style={{marginLeft: "5px"}}>{Number(cmjBalance).toFixed(3)}</div>
                    </div>
                    <div style={{minWidth: "250px", margin: "20px"}} className="items">
                        <img src="./items/wood.png" width="22" alt="$WOOD"/>
                        <div style={{marginLeft: "5px"}}>{Number(woodBalance).toFixed(0)}</div>
                    </div>
                    <div style={{minWidth: "250px", margin: "20px"}} className="items">
                        <img src="./items/bbq.png" width="22" alt="$BBQ"/>
                        <div style={{marginLeft: "5px"}}>{Number(bbqBalance).toFixed(0)}</div>
                    </div>
                </div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll bold">
                    <div style={{minWidth: "250px", margin: "20px"}} className="items">
                        <img src="./items/tuna.png" width="22" alt="$TUNA"/>
                        <div style={{marginLeft: "5px"}}>{Number(tunaBalance).toFixed(3)}</div>
                    </div>
                    <div style={{minWidth: "250px", margin: "20px"}} className="items">
                        <img src="./items/cannedtuna.png" width="22" alt="$CTUNA"/>
                        <div style={{marginLeft: "5px"}}>{Number(ctunaBalance).toFixed(3)}</div>
                    </div>
                    <div style={{minWidth: "250px", margin: "20px"}} className="items">
                        <img src="./items/mice.png" width="22" alt="$MICE"/>
                        <div style={{marginLeft: "5px"}}>{Number(miceBalance).toFixed(3)}</div>
                    </div>
                    <div style={{minWidth: "250px", margin: "20px"}} className="items">
                        <img src="./items/sx31.png" width="22" alt="$SX31"/>
                        <div style={{marginLeft: "5px"}}>{Number(sx31Balance).toFixed(3)}</div>
                    </div>
                </div>

                <div style={{width: "100%", marginTop: "35px", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}}>
                        {address !== null && address !== undefined ? <div style={{position: "absolute", top: 15, left: 15, padding: "10px 20px", letterSpacing: 1, fontSize: "12px"}} className="light">SN: {address.slice(2, 4) + "." + address.slice(-4)}</div> : <></>}
                        {levelCraftBBQ >= 0 ? <div style={{position: "absolute", top: 15, right: 15, padding: "10px 20px", borderRadius: 25, background: "#67BAA7", color: "#fff", letterSpacing: 1}} className="bold">LEVEL {levelCraftBBQ}</div> : <></>}
                        <div style={{width: "200px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            {isCraftBBQ !== null || levelCraftBBQ < 4 ? <img src="./elements/BBQ_factory01_lv0.png" width="200" alt="$BBQ_Factory_lv0"/> : <></>}
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>Craft Recipe</div>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="./items/wood.png" height="18" alt="$WOOD"/>
                                <div style={{margin: "0 2.5px"}}>100</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                <img src="./tokens/jbc.png" height="18" alt="$JBC"/>
                                <div style={{margin: "0 2.5px"}}>0.01</div>
                                <i style={{fontSize: "16px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="./items/bbq.png" height="18" alt="$BBQ"/>
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
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i>Craft Duration</div>
                            <div>5 minutes</div>
                        </div>
                        {isCraftBBQ ?
                            <>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                                    <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i>Ready at</div>
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
                                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>Upgrade cost</div>
                                            <div style={{display: "flex", flexDirection: "row"}}>
                                                <img src="./items/wood.png" height="18" alt="$WOOD"/>
                                                <div style={{margin: "0 2.5px"}}>
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

                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)", background: "rgb(245, 246, 252)"}}>
                        <div style={{position: "absolute", top: 15, left: 15, padding: "10px 20px", fontSize: "12px"}} className="bold">
                            Supplier: {dataCraftBBQ_G.addr.slice(0, 4) + "..." + dataCraftBBQ_G.addr.slice(-4)}<br></br>
                            Remain Quota: {Number(dataCraftBBQ_G.totalQuota)}<br></br>
                            Next Queue: {dataCraftBBQ_G_Next.addr.slice(0, 4) + "..." + dataCraftBBQ_G_Next.addr.slice(-4)}
                        </div>
                        <div style={{position: "absolute", top: 15, right: 15, padding: "10px 20px", borderRadius: 25, background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", letterSpacing: 1}} className="bold">GLOBAL MACHINE</div>
                        <div style={{width: "200px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            <img src="./elements/BBQ_factory01_lv0.png" width="200" alt="$BBQ_Factory_lv0"/>
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>Craft Recipe</div>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="./items/wood.png" height="18" alt="$WOOD"/>
                                <div style={{margin: "0 2.5px"}}>600k</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                <img src="./tokens/jdao.png" height="18" alt="$JDAO"/>
                                <div style={{margin: "0 2.5px"}}>10</div>
                                <i style={{fontSize: "16px", margin: "2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="./items/bbq.png" height="18" alt="$BBQ"/>
                                <div style={{margin: "0 1px"}}>6,000</div>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i>Craft Duration</div>
                            <div>1 minutes x 60 quota</div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                                    {Number(dataCraftBBQ_G.totalQuota) !== 0 ?
                                        <>
                                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i>Ready at</div>
                                            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>{timetoClaimBBQ_G === 0 ? <>now | Obtain Cost <img style={{margin: "0 2.5px"}} src="./tokens/cmj.png" height="18" alt="$CMJ"/> 1</> : timetoClaimBBQ_G}</div>
                                        </> :
                                        <>
                                            <div style={{width: "100px"}}></div>
                                            <div className="emp">The machine was stopped!</div>
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
                </div>
                
                <div style={{width: "100%", margin: "35px 0", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}}>
                        {address !== null && address !== undefined ? <div style={{position: "absolute", top: 15, left: 15, padding: "10px 20px", letterSpacing: 1, fontSize: "12px"}} className="light">SN: {address.slice(2, 4) + "." + address.slice(-4)}</div> : <></>}
                        <div style={{width: "200px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            <img src="./elements/ctunafactory.png" width="200" alt="$CTUNA_Factory"/>
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>Craft Recipe</div>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="./items/tuna.png" height="18" alt="$TUNA"/>
                                <div style={{margin: "0 5px"}}>50</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                <img src="./tokens/cmj.png" height="18" alt="$CMJ"/>
                                <div style={{margin: "0 5px"}}>10</div>
                                <i style={{fontSize: "16px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="./items/cannedtuna.png" height="18" alt="$CTUNA"/>
                                <div style={{margin: "0 5px"}}>50</div>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i>Craft Duration</div>
                            <div>1 hour</div>
                        </div>
                        {isCraft1 ?
                            <>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                                    <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i>Ready at</div>
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

                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}}>
                        {address !== null && address !== undefined ? <div style={{position: "absolute", top: 15, left: 15, padding: "10px 20px", letterSpacing: 1, fontSize: "12px"}} className="light">SN: {address.slice(2, 4) + "." + address.slice(-4)}</div> : <></>}
                        <div style={{width: "200px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            <img src="./elements/sx31factory.png" width="200" alt="$SX31_Factory"/>
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>Craft Recipe</div>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="./items/mice.png" height="18" alt="$MICE"/>
                                <div style={{margin: "0 5px"}}>50</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                <img src="./tokens/cmj.png" height="18" alt="$CMJ"/>
                                <div style={{margin: "0 5px"}}>9</div>
                                <i style={{fontSize: "16px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="./items/sx31.png" height="18" alt="$SX31"/>
                                <div style={{margin: "0 5px"}}>50</div>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i>Craft Duration</div>
                            <div>1 hour</div>
                        </div>
                        {isCraft2 && craft2machine === 1 ?
                            <>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                                    <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i>Ready at</div>
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

                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px", background: "linear-gradient(180deg,#e2c9fb,#cdb8fa)", boxShadow: "none"}}>
                        {address !== null && address !== undefined ? <div style={{position: "absolute", top: 15, left: 15, padding: "10px 20px", letterSpacing: 1, fontSize: "12px"}} className="light">SN: {address.slice(2, 4) + "." + address.slice(-4)}</div> : <></>}
                        <div style={{width: "200px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            <img src="./elements/sx31factory.png" width="200" alt="$SX31_Factory"/>
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>Craft Recipe</div>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="./items/mice.png" height="18" alt="$MICE"/>
                                <div style={{margin: "0 2px"}}>500</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                <img src="./tokens/cmj.png" height="18" alt="$CMJ"/>
                                <div style={{margin: "0 2px"}}>90</div>
                                <i style={{fontSize: "16px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="./items/sx31.png" height="18" alt="$SX31"/>
                                <div style={{margin: "0 2px"}}>500</div>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i>Craft Duration</div>
                            <div>8 hour</div>
                        </div>
                        {isKYC ?
                            <>
                            {isCraft2 && craft2machine === 431826 ?
                                <>
                                    <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="pixel">
                                        <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i>Ready at</div>
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
            </div>
        </div>
    </>
    )

}

export default Labs

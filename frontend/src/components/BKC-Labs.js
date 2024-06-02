import React from 'react'
import { ethers } from 'ethers'
import { useAccount } from 'wagmi'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
const { ethereum } = window

const bstToken = "0xded5c3F32bC01C0F451A4FC79a11619eB78bAF5e"
const trashToken = '0x7AfaA40E9421F69D6F3fb927Cf50fc0Bc6d6AF59'
const bstMachine = '0x5d9FF795Eef8A6b31a4fe634bFf9807CDeb4eb00'

const salmToken = '0xBc57A8D5456c145a09557e0aD0C5959948e0cf7E'
const cmmToken = '0x9B005000A10Ac871947D99001345b01C1cEf2790'
const salmMachine = '0x43e4550A5c8E690511A5503eE030B552C582B74F'

const tierToken = '0x6d01445CB38F252516C0F0cFf43F2bF490ccD702'
const aguaToken = '0x024C5bbF60b3d89AB64aC49936e9FE384f781c4b'

const BKCLabs = ({ setisLoading, setTxupdate, txupdate, setisError, setErrMsg, erc20ABI, stakerMachineABI }) => {
    const { address } = useAccount()

    const [bstBalance, setBstBalance] = React.useState(0)
    const [trashBalance, setTrashBalance] = React.useState(0)
    const [tierBalance, setTierBalance] = React.useState(0)
    const [salmBalance, setSalmBalance] = React.useState(0)
    const [cmmBalance, setCmmBalance] = React.useState(0)
    const [aguaBalance, setAguaBalance] = React.useState(0)

    const [bstLabStake, setBstLabStake] = React.useState(0)
    const [bstLabLog, setBstLabLog] = React.useState([0, 0, 0])

    const [salmLabStake, setSalmLabStake] = React.useState(0)
    const [salmLabLog, setSalmLabLog] = React.useState([0, 0, 0])

    React.useEffect(() => {
        window.scrollTo(0, 0)

        const thefetch = async () => {
            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: bstToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: trashToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: bstMachine,
                        abi: stakerMachineABI,
                        functionName: 'staker',
                        args: [address],
                    },
                    {
                        address: bstMachine,
                        abi: stakerMachineABI,
                        functionName: 'supplier',
                        args: [address],
                    },
                    {
                        address: tierToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: salmToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: cmmToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: salmMachine,
                        abi: stakerMachineABI,
                        functionName: 'staker',
                        args: [address],
                    },
                    {
                        address: salmMachine,
                        abi: stakerMachineABI,
                        functionName: 'supplier',
                        args: [address],
                    },
                    {
                        address: aguaToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                ],
            }) : [{result: 0}, {result: 0}, {result: 0}, {result: [0, 0, 0]}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: [0, 0, 0]}, {result: 0}]

            const _bstBal = data[0].result 
            const _trashBal = data[1].result
            const _labBstStaker = data[2].result 
            const _labBstLog = data[3].result 
            const _tierBal = data[4].result 
            const _salmBal = data[5].result 
            const _cmmBal = data[6].result 
            const _labSalmStaker = data[7].result 
            const _labSalmLog = data[8].result 
            const _aguaBal = data[9].result 

            return [
                _bstBal, _trashBal, _tierBal, _salmBal, _cmmBal, _aguaBal,
                _labBstStaker, _labBstLog, _labSalmStaker, _labSalmLog,
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
            setBstBalance(ethers.utils.formatEther(result[0]))
            setTrashBalance(ethers.utils.formatEther(result[1]))
            setTierBalance(result[2])
            setSalmBalance(ethers.utils.formatEther(result[3]))
            setCmmBalance(ethers.utils.formatEther(result[4]))
            setAguaBalance(result[5])

            setBstLabStake(ethers.utils.formatEther(result[6]))
            setBstLabLog(result[7])

            setSalmLabStake(ethers.utils.formatEther(result[8]))
            setSalmLabLog(result[9])
        })

    }, [address, txupdate, erc20ABI, stakerMachineABI])

    const [inputTrash, setInputTrash] = React.useState('')
    const [inputStakedTrash, setInputStakeTrash] = React.useState('')
    const [inputCMM, setInputCMM] = React.useState('')
    const [inputStakedCMM, setInputStakeCMM] = React.useState('')

    const stakeTrash = async () => {
        setisLoading(true)
        try {
            const allowed = await readContract({
                address: trashToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, bstMachine],
            })
            if (Number(ethers.utils.parseEther(String(inputTrash))) > Number(allowed)) {
                const config = await prepareWriteContract({
                    address: trashToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [bstMachine, ethers.constants.MaxUint256],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: bstMachine,
                abi: stakerMachineABI,
                functionName: 'stake',
                args: [ethers.utils.parseEther(String(inputTrash))],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const unstakeTrash = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: bstMachine,
                abi: stakerMachineABI,
                functionName: 'unstake',
                args: [ethers.utils.parseEther(String(inputStakedTrash))],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const craftfromBST = async (_index) => {
        setisLoading(true)
        try {
            const allowed = await readContract({
                address: bstToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, bstMachine],
            })
            if (Number(ethers.utils.parseEther('10')) > Number(allowed)) {
                const config = await prepareWriteContract({
                    address: bstToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [bstMachine, ethers.constants.MaxUint256],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: bstMachine,
                abi: stakerMachineABI,
                functionName: 'craft',
                args: [_index],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const obtainfromBST = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: bstMachine,
                abi: stakerMachineABI,
                functionName: 'obtain',
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const stakeCMM = async () => {
        setisLoading(true)
        try {
            const allowed = await readContract({
                address: cmmToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, salmMachine],
            })
            if (Number(ethers.utils.parseEther(String(inputCMM))) > Number(allowed)) {
                const config = await prepareWriteContract({
                    address: cmmToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [salmMachine, ethers.constants.MaxUint256],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: salmMachine,
                abi: stakerMachineABI,
                functionName: 'stake',
                args: [ethers.utils.parseEther(String(inputCMM))],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const unstakeCMM = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: salmMachine,
                abi: stakerMachineABI,
                functionName: 'unstake',
                args: [ethers.utils.parseEther(String(inputStakedCMM))],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const craftfromSALM = async (_index) => {
        setisLoading(true)
        try {
            const allowed = await readContract({
                address: salmToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, salmMachine],
            })
            if (Number(ethers.utils.parseEther('10')) > Number(allowed)) {
                const config = await prepareWriteContract({
                    address: salmToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [salmMachine, ethers.constants.MaxUint256],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: salmMachine,
                abi: stakerMachineABI,
                functionName: 'craft',
                args: [_index],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const obtainfromSALM = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: salmMachine,
                abi: stakerMachineABI,
                functionName: 'obtain',
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
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
                    <img src="../background/labslogo.png" width="150" alt="Labs_Logo" />
                </div>
            </div>

            <div className="collection">
                <div style={{textAlign: "left", height: "fit-content", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                    <div style={{width: "100%", textIndent: "20px", fontSize: "15px", marginTop: "20px", letterSpacing: "1px"}} className="bold">Resources</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img
                                src="https://cloudflare-ipfs.com/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm"
                                width="20"
                                alt="$BST"
                                style={{cursor: "crosshair"}}
                                onClick={async () => {
                                    await ethereum.request({
                                        method: 'wallet_watchAsset',
                                        params: {
                                            type: 'ERC20',
                                            options: {
                                                address: bstToken,
                                                symbol: 'BST',
                                                decimals: 18,
                                                image: 'https://cloudflare-ipfs.com/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm',
                                            },
                                        },
                                    })
                                }}
                            />
                            <div style={{marginLeft: "5px"}}>{Number(bstBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                        </div>

                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img
                                src="https://cloudflare-ipfs.com/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34"
                                width="20"
                                alt="$SALM"
                                style={{cursor: "crosshair"}}
                                onClick={async () => {
                                    await ethereum.request({
                                        method: 'wallet_watchAsset',
                                        params: {
                                            type: 'ERC20',
                                            options: {
                                                address: salmToken,
                                                symbol: 'SALM',
                                                decimals: 18,
                                                image: 'https://cloudflare-ipfs.com/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34',
                                            },
                                        },
                                    })
                                }}
                            />
                            <div style={{marginLeft: "5px"}}>{Number(salmBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                        </div>

                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img
                                src="https://cloudflare-ipfs.com/ipfs/bafkreih75ehweqjdk6u6xowwdxs5hmdohib7sen2vlnuekzttzo2jk64iy"
                                width="20"
                                alt="$TIER"
                                style={{cursor: "crosshair"}}
                                onClick={async () => {
                                    await ethereum.request({
                                        method: 'wallet_watchAsset',
                                        params: {
                                            type: 'ERC20',
                                            options: {
                                                address: tierToken,
                                                symbol: 'TIER',
                                                decimals: 0,
                                                image: 'https://cloudflare-ipfs.com/ipfs/bafkreih75ehweqjdk6u6xowwdxs5hmdohib7sen2vlnuekzttzo2jk64iy',
                                            },
                                        },
                                    })
                                }}
                            />
                            <div style={{marginLeft: "5px"}}>{Number(tierBalance) + ' Wei'}</div>
                        </div>

                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img
                                src="https://cloudflare-ipfs.com/ipfs/bafkreibueyqenddliwzqeoafwtlktmnm33xqhfkxknucigj7ovpr7y5qeq"
                                width="20"
                                alt="$AGUA"
                                style={{cursor: "crosshair"}}
                                onClick={async () => {
                                    await ethereum.request({
                                        method: 'wallet_watchAsset',
                                        params: {
                                            type: 'ERC20',
                                            options: {
                                                address: aguaToken,
                                                symbol: 'AGUA',
                                                decimals: 0,
                                                image: 'https://cloudflare-ipfs.com/ipfs/bafkreibueyqenddliwzqeoafwtlktmnm33xqhfkxknucigj7ovpr7y5qeq',
                                            },
                                        },
                                    })
                                }}
                            />
                            <div style={{marginLeft: "5px"}}>{Number(aguaBalance) + ' Wei'}</div>
                        </div>
                    </div>
                    
                    <div style={{marginTop: "40px", width: "97.5%", borderBottom: "1px solid #dddade"}}></div>
                    <div style={{marginTop: "20px", width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Labs & Factories</div>
                    <div style={{width: "100%", margin: "10px 0 80px 0", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                        <div className="nftCard" style={{position: "relative", justifyContent: "space-around", margin: "20px", paddingTop: "60px"}}>
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                                <div>Total Staking Power:</div>
                                <div className="bold">{Number(bstLabStake).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                            </div>
                            <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", boxShadow: "inset -2px -2px 0px 0.25px #00000040", padding: "15px"}}>
                                <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px", textAlign: "left", fontSize: "14px"}}>
                                    <div>$TRASH STAKED</div>
                                    <div className="bold">{Number(bstLabStake).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                </div>
                                <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                                    <input
                                        placeholder="0.0"
                                        style={{width: "150px", padding: "5px 20px", border: "1px solid #dddade"}}
                                        value={inputStakedTrash}
                                        onChange={(event) => setInputStakeTrash(event.target.value)}
                                    />
                                    <div
                                        style={{padding: "10px 10px", border: "1px solid #dddade", cursor: "pointer"}}
                                        className="bold"
                                        onClick={() => setInputStakeTrash(bstLabStake)}
                                    >
                                        Max
                                    </div>
                                    <div style={{letterSpacing: "1px", width: "70px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={unstakeTrash}>Unstake</div>
                                </div>
                            </div>
                            <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", boxShadow: "inset -2px -2px 0px 0.25px #00000040", padding: "15px"}}>
                                <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px", textAlign: "left", fontSize: "14px"}}>
                                    <div>$TRASH BALANCE</div>
                                    <div className="bold">{Number(trashBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                </div>
                                <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                                    <input
                                        placeholder="0.0"
                                        style={{width: "150px", padding: "5px 20px", border: "1px solid #dddade"}}
                                        value={inputTrash}
                                        onChange={(event) => setInputTrash(event.target.value)}
                                    />
                                    <div
                                        style={{padding: "10px 10px", border: "1px solid #dddade", cursor: "pointer"}}
                                        className="bold"
                                        onClick={() => setInputTrash(trashBalance)}
                                    >
                                        Max
                                    </div>
                                    <div style={{letterSpacing: "1px", width: "50px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={stakeTrash}>Stake</div>
                                </div>
                            </div>
                            <div style={{marginTop: "5px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i></div>
                                <div style={{display: "flex", flexDirection: "row", fontSize: "15px"}}>
                                    <img src="https://cloudflare-ipfs.com/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm" height="18" alt="$BST"/>
                                    <div style={{margin: "0 5px"}}>10</div>
                                    <i style={{fontSize: "16px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                    <img src="https://cloudflare-ipfs.com/ipfs/bafkreih75ehweqjdk6u6xowwdxs5hmdohib7sen2vlnuekzttzo2jk64iy" height="18" alt="$TIER"/>
                                    <div style={{margin: "0 5px"}}>{Number(bstLabStake).toLocaleString('en-US', {maximumFractionDigits:0}) + ' Wei'}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "5px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i></div>
                                <div>1 hour</div>
                            </div>
                            <div style={{marginTop: "5px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                {Number(bstLabLog[1]) !== 0 ?
                                    <>
                                        <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i></div>
                                        <div>{Date.now() - (Number(bstLabLog[2]) * 1000) > (3600 * 1000) ? "now" : (new Date((Number(bstLabLog[2]) + 3600) * 1000).toLocaleString('es-CL'))}</div>
                                    </> :
                                    <div style={{height: "20.5px"}}></div>
                                }
                            </div>
                            <div style={{width: "100%", marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                {Number(bstLabLog[1]) === 0 && 
                                    <>
                                        {Number(bstLabStake) > 0 && Number(bstBalance) > 10 ?
                                            <div style={{display: "flex", justifyContent: "center", width: "340px", borderRadius: "12px", padding: "15px"}} className="pixel button" onClick={() => craftfromBST(1)}>Craft TIERRA</div> :
                                            <div style={{display: "flex", justifyContent: "center", width: "340px", borderRadius: "12px", padding: "15px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Craft TIERRA</div>
                                        }
                                    </>
                                }
                                {Number(bstLabLog[1]) !== 0 && 
                                    <>
                                        {Date.now() - (Number(bstLabLog[2]) * 1000) > (3600 * 1000) ?
                                            <div style={{display: "flex", justifyContent: "center", width: "340px", borderRadius: "12px", padding: "15px"}} className="pixel button" onClick={obtainfromBST}>Obtain TIERRA</div> :
                                            <div style={{display: "flex", justifyContent: "center", width: "340px", borderRadius: "12px", padding: "15px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Obtain TIERRA</div>
                                        }
                                    </>
                                }
                            </div>
                        </div>                    
                    
                        <div className="nftCard" style={{position: "relative", justifyContent: "space-around", margin: "20px", paddingTop: "60px"}}>
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                                <div>Total Staking Power:</div>
                                <div className="bold">{Number(salmLabStake).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                            </div>
                            <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", boxShadow: "inset -2px -2px 0px 0.25px #00000040", padding: "15px"}}>
                                <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px", textAlign: "left", fontSize: "14px"}}>
                                    <div>$CMM STAKED</div>
                                    <div className="bold">{Number(salmLabStake).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                </div>
                                <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                                    <input
                                        placeholder="0.0"
                                        style={{width: "150px", padding: "5px 20px", border: "1px solid #dddade"}}
                                        value={inputStakedCMM}
                                        onChange={(event) => setInputStakeCMM(event.target.value)}
                                    />
                                    <div
                                        style={{padding: "10px 10px", border: "1px solid #dddade", cursor: "pointer"}}
                                        className="bold"
                                        onClick={() => setInputStakeCMM(salmLabStake)}
                                    >
                                        Max
                                    </div>
                                    <div style={{letterSpacing: "1px", width: "70px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={unstakeCMM}>Unstake</div>
                                </div>
                            </div>
                            <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", boxShadow: "inset -2px -2px 0px 0.25px #00000040", padding: "15px"}}>
                                <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px", textAlign: "left", fontSize: "14px"}}>
                                    <div>$CMM BALANCE</div>
                                    <div className="bold">{Number(cmmBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                </div>
                                <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                                    <input
                                        placeholder="0.0"
                                        style={{width: "150px", padding: "5px 20px", border: "1px solid #dddade"}}
                                        value={inputCMM}
                                        onChange={(event) => setInputCMM(event.target.value)}
                                    />
                                    <div
                                        style={{padding: "10px 10px", border: "1px solid #dddade", cursor: "pointer"}}
                                        className="bold"
                                        onClick={() => setInputCMM(cmmBalance)}
                                    >
                                        Max
                                    </div>
                                    <div style={{letterSpacing: "1px", width: "50px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={stakeCMM}>Stake</div>
                                </div>
                            </div>
                            <div style={{marginTop: "5px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i></div>
                                <div style={{display: "flex", flexDirection: "row", fontSize: "15px"}}>
                                    <img src="https://cloudflare-ipfs.com/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34" height="18" alt="$SALM"/>
                                    <div style={{margin: "0 5px"}}>10</div>
                                    <i style={{fontSize: "16px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                    <img src="https://cloudflare-ipfs.com/ipfs/bafkreibueyqenddliwzqeoafwtlktmnm33xqhfkxknucigj7ovpr7y5qeq" height="18" alt="$AGUA"/>
                                    <div style={{margin: "0 5px"}}>{Number(salmLabStake).toLocaleString('en-US', {maximumFractionDigits:0}) + ' Wei'}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "5px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i></div>
                                <div>1 hour</div>
                            </div>
                            <div style={{marginTop: "5px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                {Number(salmLabLog[1]) !== 0 ?
                                    <>
                                        <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i></div>
                                        <div>{Date.now() - (Number(salmLabLog[2]) * 1000) > (3600 * 1000) ? "now" : (new Date((Number(salmLabLog[2]) + 3600) * 1000).toLocaleString('es-CL'))}</div>
                                    </> :
                                    <div style={{height: "20.5px"}}></div>
                                }
                            </div>
                            <div style={{width: "100%", marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                {Number(salmLabLog[1]) === 0 && 
                                    <>
                                        {Number(salmLabStake) > 0 && Number(salmBalance) > 10 ?
                                            <div style={{display: "flex", justifyContent: "center", width: "340px", borderRadius: "12px", padding: "15px"}} className="pixel button" onClick={() => craftfromSALM(1)}>Craft AGUA</div> :
                                            <div style={{display: "flex", justifyContent: "center", width: "340px", borderRadius: "12px", padding: "15px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Craft AGUA</div>
                                        }
                                    </>
                                }
                                {Number(salmLabLog[1]) !== 0 && 
                                    <>
                                        {Date.now() - (Number(salmLabLog[2]) * 1000) > (3600 * 1000) ?
                                            <div style={{display: "flex", justifyContent: "center", width: "340px", borderRadius: "12px", padding: "15px"}} className="pixel button" onClick={obtainfromSALM}>Obtain AGUA</div> :
                                            <div style={{display: "flex", justifyContent: "center", width: "340px", borderRadius: "12px", padding: "15px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Obtain AGUA</div>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    <div style={{width: "97.5%", borderBottom: "1px solid #dddade"}}></div>
                    <div style={{marginTop: "20px", width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">NFT Crafting</div>
                    <div style={{width: "100%", margin: "10px 0 80px 0", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                        <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                            <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">TONO from Bitkub Chain</div>
                            <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreigifnk2mvo75xqrds4c3zbc4odgo2og2jidat46vr55xx4ug7rtqu" height="150" alt="Can not load metadata."/>
                            <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px"}} className="pixel">
                                <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                    <div>Limited</div>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{250}</div>
                                        /250 EA
                                    </div>
                                </div>
                                <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                    <div>Status</div>
                                    <div style={{display: "flex", flexDirection: "row"}}>9900 CMPOW</div>
                                </div>
                                <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                    <div>Price</div>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://cloudflare-ipfs.com/ipfs/bafkreih75ehweqjdk6u6xowwdxs5hmdohib7sen2vlnuekzttzo2jk64iy" height="18" alt="$TIER"/>
                                        <div style={{marginLeft: "7.5px"}}>700,000 WEI +</div>
                                        &nbsp;<img src="https://cloudflare-ipfs.com/ipfs/bafkreidcxukia62wzaaes6wpsdgpw3yjshrjm7nwijwldxdthkepsebumq" height="18" alt="$CMOS"/>
                                        <div style={{marginLeft: "7.5px"}}>7,000</div>
                                    </div>
                                </div>
                            </div>
                            {false && address !== null && address !== undefined ?
                                <>
                                    {/*sell4Remain > 0 ?
                                        <>
                                            {canbuy4 ?
                                                <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle3(4)}>BUY</div> :
                                                <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                            }
                                        </> :
                                        <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                        */}
                                </> :
                                <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">On Redeem 05/06</div>
                            }
                        </div>

                        <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                            <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">KAI of Bitkub Chain</div>
                            <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreibxqb6evipcsgrb5cddgd7hyi73cgjj3mxkxt3dvcmrxkvqllxftq" height="150" alt="Can not load metadata."/>
                            <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px"}} className="pixel">
                                <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                    <div>Limited</div>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{250}</div>
                                        /250 EA
                                    </div>
                                </div>
                                <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                    <div>Status</div>
                                    <div style={{display: "flex", flexDirection: "row"}}>9900 CMPOW</div>
                                </div>
                                <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                    <div>Price</div>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://cloudflare-ipfs.com/ipfs/bafkreibueyqenddliwzqeoafwtlktmnm33xqhfkxknucigj7ovpr7y5qeq" height="18" alt="$AGUA"/>
                                        <div style={{marginLeft: "7.5px"}}>700,000 WEI + </div>
                                        &nbsp;<img src="https://cloudflare-ipfs.com/ipfs/bafkreidcxukia62wzaaes6wpsdgpw3yjshrjm7nwijwldxdthkepsebumq" height="18" alt="$CMOS"/>
                                        <div style={{marginLeft: "7.5px"}}>7,000</div>
                                    </div>
                                </div>
                            </div>
                            {false && address !== null && address !== undefined ?
                                <>
                                    {/*sell4Remain > 0 ?
                                        <>
                                            {canbuy4 ?
                                                <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle3(4)}>BUY</div> :
                                                <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                            }
                                        </> :
                                        <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                        */}
                                </> :
                                <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">On Redeem 05/06</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BKCLabs

import React from 'react'
import { readContract, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount, useContractReads } from 'wagmi'
import { ethers } from 'ethers'
const { ethereum } = window

const cmmkkubToken = "0x5Cced24E580586841f326d5088D288e6Ddd201dA"
const cmosToken = "0x8b062b96Bb689833D7870a0133650FA22302496d"
const farmCMOS = "0xe5B764566CB5b26fE7568e59370368ACf9c7c5c3"

const BKCGameSwap = ({ setisLoading, setTxupdate, setisError, setErrMsg, erc20ABI, diamonLpABI, farmCmosABI, bkcOracleABI }) => {
    const { address } = useAccount()

    const { data: data_Token, isLoading: isLoading_Token, refetch } = useContractReads({
        contracts: [
            {
                address: cmmkkubToken,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address],
                chainId: 96,
            },
            {
                address: cmmkkubToken,
                abi: diamonLpABI,
                functionName: 'getReserves',
                chainId: 96,
            },
            {
                address: '0x4A6947323A1c14Cf69Dd128A2cf854364239d044',
                abi: bkcOracleABI,
                functionName: 'latestAnswer',
                chainId: 96,
            },
            {
                address: '0x775eeFF3f80f110C2f7ac9127041915489c275f4',
                abi: bkcOracleABI,
                functionName: 'latestAnswer',
                chainId: 96,
            },
            {
                address: '0x67ebd850304c70d983b2d1b93ea79c7cd6c3f6b5',
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [cmmkkubToken],
                chainId: 96,
            },
            {
                address: '0x9b005000a10ac871947d99001345b01c1cef2790',
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [cmmkkubToken],
                chainId: 96,
            },
            {
                address: cmmkkubToken,
                abi: erc20ABI,
                functionName: 'totalSupply',
                chainId: 96,
            },
            {
                address: cmmkkubToken,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [farmCMOS],
                chainId: 96,
            },
            {
                address: farmCMOS,
                abi: farmCmosABI,
                functionName: 'userInfo',
                args: [1, address],
                chainId: 96,
            },
            {
                address: farmCMOS,
                abi: farmCmosABI,
                functionName: 'pendingReward',
                args: [1, address],
                chainId: 96,
            },
        ],
    })

    const [lp1Stake, setLp1Stake] = React.useState("")
    const [lp1StakeWei, setLp1StakeWei] = React.useState(0)
    const [lp1Withdraw, setLp1Withdraw] = React.useState("")

    const addstakeHandle = async () => {
        setisLoading(true)
        try {
            const lpAllow = await readContract({
                address: cmmkkubToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, farmCMOS],
            })
            if (Number(lp1Stake) > Number(lpAllow)) {
                const config = await prepareWriteContract({
                    address: cmmkkubToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [farmCMOS, ethers.constants.MaxUint256],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: farmCMOS,
                abi: farmCmosABI,
                functionName: 'deposit',
                args: [1, lp1StakeWei],
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
            refetch()
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const withdrawstakeHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: farmCMOS,
                abi: farmCmosABI,
                functionName: 'withdraw',
                args: [1, ethers.utils.parseEther(String(lp1Withdraw))],
            })
            const { hash } = await writeContract(config)
            await waitForTransaction({ hash, })
            setTxupdate(hash)
            refetch()
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const harvestHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: farmCMOS,
                abi: farmCmosABI,
                functionName: 'withdraw',
                args: [1, 0],
            })
            const { hash } = await writeContract(config)
            await waitForTransaction({ hash, })
            setTxupdate(hash)
            refetch()
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    return (
        <div style={{flexDirection: "column", alignItems: "center", justifyContent: "flex-start", background: "#e6e4f6"}} className="collection">
            <div style={{marginTop: "80px", height: "25px", width: "100px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", background: "#fff", padding: "7.5px 10px", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}}>
                <div style={{margin: "0 10px", width: "fit-content", border: "transparent", background: "transparent", fontSize: "20px", borderBottom: "5px solid #61dafb", cursor: "pointer"}} className="bold">Farms</div>
            </div>
            <div style={{margin: "20px 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <div 
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: cmmkkubToken,
                                            symbol: 'CMM-KKUB-LP',
                                            decimals: 18,
                                        },
                                    },
                                })
                            }}
                        >
                            <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://storage.googleapis.com/static.bitkubnext.com/bitkub-next/token-icons/kub.png" alt="$KUB" />
                            <img style={{width: "38px", height: "38px", marginLeft: "-10px"}} src="https://nftstorage.link/ipfs/bafkreiaayvrql643lox66vkdfv6uzaoq2c5aa5mq3jjp3c7v4asaxvvzla" alt="$CMM" />
                        </div>
                        <div
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: cmosToken,
                                            symbol: 'CMOS',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreidcxukia62wzaaes6wpsdgpw3yjshrjm7nwijwldxdthkepsebumq',
                                        },
                                    },
                                })
                            }}
                        >
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://nftstorage.link/ipfs/bafkreidcxukia62wzaaes6wpsdgpw3yjshrjm7nwijwldxdthkepsebumq" alt="$CMOS" />
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div className="bold">{Number(2 * (86400/5) * (10/13)).toLocaleString('en-US', {maximumFractionDigits:0})} CMOS + 0.3% SWAP REV</div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity:</div>
                        {!isLoading_Token ?
                            <div className="bold">~฿{((ethers.utils.formatEther(data_Token[7].result) / ethers.utils.formatEther(data_Token[6].result)) * ( Number(ethers.utils.formatEther(data_Token[4].result)) + Number(ethers.utils.formatEther(data_Token[5].result) * (ethers.utils.formatEther(data_Token[1].result[0]) / ethers.utils.formatEther(data_Token[1].result[1]))) ) * (Number(data_Token[2].result) / 1e8) * (Number(data_Token[3].result) / 1e8)).toLocaleString('en-US', {minimumFractionDigits:0})}</div> :
                            <>0.000</>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", boxShadow: "inset -2px -2px 0px 0.25px #00000040", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>CMOS EARNED:</div>
                            <div className="bold">{address !== undefined && !isLoading_Token ? Number(ethers.utils.formatEther(data_Token[9].result)).toFixed(3) : <>0.0</>}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={harvestHandle}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", boxShadow: "inset -2px -2px 0px 0.25px #00000040", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {address !== undefined && !isLoading_Token ? 
                                <div style={{textAlign: "left", fontSize: "14px"}} className="bold">{Number(Math.floor(ethers.utils.formatEther(data_Token[8].result[0]) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</div> :
                                <>0.000</>
                            }
                            {/*<span> (~฿{Number(Math.floor(((ethers.utils.formatEther(data_Token[8].amount) / ethers.utils.formatEther(data_Token[6])) * ( Number(ethers.utils.formatEther(data_Token[4])) + (ethers.utils.formatEther(data_Token[5].result) * (ethers.utils.formatEther(data_Token[1].result[0])/ethers.utils.formatEther(data_Token[1].result[1]))) ) * (data_Token[2] / 1e8) * (data_Token[3] / 1e8) * 1) / 1)).toLocaleString('en-US', {minimumFractionDigits:0})})</span>*/}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                style={{width: "60px", padding: "5px 20px", border: "1px solid #dddade"}}
                                onChange={(event) => setLp1Withdraw(event.target.value)}
                                value={lp1Withdraw}
                            />
                            <div
                                style={{padding: "10px 10px", border: "1px solid #dddade", cursor: "pointer"}}
                                className="bold"
                                onClick={() => setLp1Withdraw(ethers.utils.formatEther(data_Token[8].result[0]))}
                            >
                                Max
                            </div>
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={withdrawstakeHandle}>Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", boxShadow: "inset -2px -2px 0px 0.25px #00000040", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {address !== undefined && !isLoading_Token ?
                                <div style={{textAlign: "left", fontSize: "14px"}} className="bold">{Number(Math.floor(ethers.utils.formatEther(data_Token[0].result) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</div> :
                                <>0.000</>
                            }
                            {/*<span> (~฿{Number(Math.floor(((ethers.utils.formatEther(data_Token[0].result) / ethers.utils.formatEther(data_Token[6].result)) * ( Number(ethers.utils.formatEther(data_Token[4].result)) + (ethers.utils.formatEther(data_Token[5].result) * (ethers.utils.formatEther(data_Token[1].result.reserve0)/ethers.utils.formatEther(data_Token[1].result.reserve1))) ) * (data_Token[2].result / 1e8) * (data_Token[3].result / 1e8) * 1) / 1)).toLocaleString('en-US', {minimumFractionDigits:0})})</span>*/}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                            <input
                                placeholder="0.0"
                                style={{width: "60px", padding: "5px 20px", border: "1px solid #dddade"}}
                                onChange={(event) => {setLp1Stake(event.target.value); event.target.value !== "" ? setLp1StakeWei(ethers.utils.parseEther(event.target.value)) : setLp1StakeWei(0);}}
                                value={lp1Stake}
                            />
                            <div
                                style={{padding: "10px 10px", border: "1px solid #dddade", cursor: "pointer"}}
                                className="bold"
                                onClick={() => {setLp1Stake(ethers.utils.formatEther(data_Token[0].result)); setLp1StakeWei(data_Token[0].result);}}
                            >
                                Max
                            </div>
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={addstakeHandle}>Stake</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BKCGameSwap
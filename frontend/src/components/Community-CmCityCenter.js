import React from 'react'
import { ethers } from 'ethers'
import { fetchBalance, readContract, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount, usePrepareSendTransaction, useSendTransaction } from 'wagmi'

const sx31Vote = '0x9787c30309103A7df118C7440E7C9b817eB60952'
const sx31Lab = '0xd431d826d7a4380b9259612176f00528b88840a7'
const meritFaucet = '0x169816800f1eA9C5735937388aeb9C2A3bAca11F'

const CmCityCenter = ({ setisLoading, txupdate, setTxupdate, erc20ABI, sx31voteABI, faucetABI }) => {
    const { address } = useAccount()

    const [sx31Voting1, setSx31Voting1] = React.useState(['Loading...', 'Loading...', 0, 'Loading...'])
    const [sx31Voting1All, setSx31Voting1All] = React.useState(0)
    const [voteAmount, setVoteAmount] = React.useState("")

    const [jbconFaucet, setJbconFaucet] = React.useState(0)
    const [delegateAmount, setDelegateAmount] = React.useState("")
    const [allowClaimJBC, setAllowClaimJBC] = React.useState(false)

    const { config } = usePrepareSendTransaction({
        request: {
            to: meritFaucet,
            value: delegateAmount !== "" ? ethers.utils.parseEther(delegateAmount) : undefined,
        },
    })
    const { sendTransaction } = useSendTransaction(config)

    React.useEffect(() => {        
        const thefetch = async () => {
            const sx31Proposal1 = await readContract({
                address: sx31Vote,
                abi: sx31voteABI,
                functionName: 'proposals',
                args: [1],
            })
            const sx31Proposal1All = await readContract({
                address: sx31Vote,
                abi: sx31voteABI,
                functionName: 'votes',
                args: [1],
            })

            const jbcFaucet = await fetchBalance({ address: meritFaucet, })
            const allowtoClaim = address !== undefined && address !== null ? await readContract({
                address: meritFaucet,
                abi: faucetABI,
                functionName: 'allowedToWithdraw',
                args: [address],
            }) : false

            return [sx31Proposal1, sx31Proposal1All, jbcFaucet, allowtoClaim]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setSx31Voting1(result[0])
            setSx31Voting1All(ethers.utils.formatEther(String(result[1])))
            setJbconFaucet(result[2].formatted)
            setAllowClaimJBC(result[3])
        })

    }, [address, txupdate, erc20ABI, sx31voteABI, faucetABI])

    const voteHandle = async (_proposal) => {
        setisLoading(true)
        const tokenAllow = await readContract({
            address: sx31Lab,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, sx31Vote],
        })
        try {
            if (Number(tokenAllow) < Number(ethers.utils.parseEther(voteAmount))) {
                const config = await prepareWriteContract({
                    address: sx31Lab,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [sx31Vote, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: sx31Vote,
                abi: sx31voteABI,
                functionName: 'vote',
                args: [_proposal, ethers.utils.parseEther(voteAmount)]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const claimJBCHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: meritFaucet,
                abi: faucetABI,
                functionName: 'requestTokens',
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    return (
        <div style={{background: "rgb(0, 19, 33", width: "100%", margin: "20px 0 0 0", padding: "75px 0", minHeight: "inherit", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", overflow: "scroll"}} className="collection noscroll">
            <div style={{width: "100%", margin: "40px 10px", textAlign: "center", fontSize: "22.5px", color: "rgb(0, 227, 180)"}} className="pixel emp">CM CITY - City Center [Level 0]</div>
            <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", border: "1px solid rgb(54, 77, 94)", minWidth: "880px", width: "55%", height: "420px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "22px"}} className="bold">CMDAO Charity - $JBC delegation for newcomers</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <div style={{width: "100%", height: "320px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                        <div>
                            <div className="bold">JBC DELEGATED</div>
                            <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "28px"}} className="bold">
                                <div style={{marginRight: "10px", color: "#fff"}}>{Number(jbconFaucet).toFixed(2)}</div>
                                <img src="../tokens/jbc.png" height="30px" alt="$JBC"/>
                            </div>
                        </div>
                        <div>
                            <div className="bold">PROPOSAL DETAIL</div>
                            <div style={{marginTop: "10px", color: "#fff", fontSize: "12px"}} className="bold">องค์กรการกุศล CMDAO Charity เปิดรับยอดบริจาคจำนวนมากจากสุลต่านใจบุญ จาก CM-City โดยทุกการบริจาค 1 JBC จะได้รับเหรียญแต้มบุญ 1 Merit Token<br></br>ในส่วนของผู้รับเคลม JBC เพื่อใช้เป็น Gas ฟรี จะมีสิทธิ์รับได้เพียง 1 JBC ต่อสัปดาห์<br></br>*** สำหรับผู้ที่ไม่มี Gas เริ่มต้นสำหรับ Claim สามารถขุดได้ที่ <a style={{textDecoration: "none"}} className="emp" href="https://faucet.jibchain.net/" target="_blank" rel="noreferrer">JBC PoW Faucet</a> (ขั้นต่ำในการ Claim : 0.025 JBC)</div>
                        </div>
                        <div style={{width: "65%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <input style={{width: "250px", padding: "10px 40px", fontSize: "18px"}} className="bold" type="number" placeholder="Enter $JBC Amount" value={delegateAmount} onChange={(event) => {setDelegateAmount(event.target.value)}}></input>
                            <div style={{display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)"}} className="bold button" onClick={sendTransaction}>DELEGATE</div>
                        </div>
                        <div style={{width: "65%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            {allowClaimJBC ?
                                <>
                                    <div style={{color: "rgb(0, 227, 180)"}} className="bold">YOU'RE ELIGIBLE (LIMIT : 1 claim/week)</div>
                                    <div style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)"}} className="bold button" onClick={claimJBCHandle}>CLAIM 1 JBC</div>
                                </> :
                                <div style={{color: "rgb(0, 227, 180)"}} className="bold">YOU'RE NOT ELIGIBLE (LIMIT : 1 claim/week)</div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", border: "1px solid rgb(54, 77, 94)", minWidth: "880px", width: "55%", height: "420px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "22px"}} className="bold">{sx31Voting1[0]}</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <div style={{width: "30%", height: "320px"}}>
                        <img src="../elements/sx31factory.png" height="200" alt="$SX31_Factory"/>
                    </div>
                    <div style={{width: "65%", height: "320px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                        <div>
                            <div className="bold">SX31 DELEGATED</div>
                            <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "28px"}} className="emp bold">
                                <div style={{marginRight: "10px"}}>{Number(sx31Voting1All).toFixed(2)} / 12,500 ({((Number(sx31Voting1All) * 100) / 12500).toFixed(3)}%)</div>
                                <img src="../items/sx31.png" height="30px" alt="$SX31"/>
                            </div>
                        </div>
                        <div>
                            <div className="bold">PROPOSAL DETAIL</div>
                            <div style={{marginTop: "10px", color: "#fff", fontSize: "12px"}} className="bold" dangerouslySetInnerHTML={{__html: sx31Voting1[1]}}></div>
                            {sx31Voting1[3].toUpperCase() === "0x0Da584E836542Fc58E7c09725cF6dbDfeA22f427".toUpperCase() ?
                                <div style={{marginTop: "20px", fontSize: "12px"}} className="bold">ผู้เสนอ Proposal : zkCoshi | CMDAO DEV [{sx31Voting1[3]}]</div> :
                                <div style={{marginTop: "20px", fontSize: "12px"}} className="bold">ผู้เสนอ Proposal : {sx31Voting1[3]}</div>
                            }
                        </div>
                        {Number(sx31Voting1All) !== 0 && Number(sx31Voting1All) < 12500 ?
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <input style={{width: "250px", padding: "10px 40px", fontSize: "18px"}} className="bold" type="number" placeholder="Enter $SX31 Amount" value={voteAmount} onChange={(event) => {setVoteAmount(event.target.value)}}></input>
                                <div style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)"}} className="bold button" onClick={() => {voteHandle(1)}}>VOTE WITH SX31</div>
                            </div> :
                            <>
                                {Number(sx31Voting1All) === 0 ?
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", color: "rgb(0, 227, 180)"}} className="bold">Loading...</div> :
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", color: "rgb(0, 227, 180)"}} className="bold">DELEGATION COMPLETE, PROPOSAL TERMINATED.</div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CmCityCenter
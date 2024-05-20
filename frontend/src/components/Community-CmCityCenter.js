import React from 'react'
import { ethers } from 'ethers'
import { /*fetchBalance,*/ readContract, prepareWriteContract, waitForTransaction, writeContract, /*sendTransaction*/ } from '@wagmi/core'
import { useAccount } from 'wagmi'

const cmcityPoints = '0xDEf1B2C59E116E5A63227af25CeED359EB489463'
const sx31Vote = '0x9787c30309103A7df118C7440E7C9b817eB60952'
const sx31Lab = '0xd431d826d7a4380b9259612176f00528b88840a7'
// const meritFaucet = '0x169816800f1eA9C5735937388aeb9C2A3bAca11F'
const cmdaoName = '0x9f3adB20430778f52C2f99c4FBed9637a49509F2'
const cmj = '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b'
const providerIPFS = "https://w3storag.lazyplayerone.xyz/ipfs/"

const CmCityCenter = ({ setisLoading, txupdate, setTxupdate, erc20ABI, cmcityPointsABI, sx31voteABI, faucetABI, cmdaoNameABI }) => {
    const { address } = useAccount()

    const [sx31Voting1, setSx31Voting1] = React.useState(['Loading...', 'Loading...', 0, 'Loading...'])
    const [sx31Voting1All, setSx31Voting1All] = React.useState(0)
    const [voteAmount, setVoteAmount] = React.useState("")

    const [cmVoting1, setCmVoting1] = React.useState(['Loading...', 'Loading...', 0, 'Loading...'])
    const [cmVoting1All, setCmVoting1All] = React.useState(0)
    const [vote2Amount, setVote2Amount] = React.useState("")

    // const [jbconFaucet, setJbconFaucet] = React.useState(0)
    // const [delegateAmount, setDelegateAmount] = React.useState("")
    // const [allowClaimJBC, setAllowClaimJBC] = React.useState(false)

    const [name, setName] = React.useState("")
    const [avaiName, setAvaiName] = React.useState(null)
    const [yourName, setYourName] = React.useState(null)

    /*const sendHandle = async () => {
        setisLoading(true)
        try {
            const { hash: hash1 } = await sendTransaction({
                to: meritFaucet,
                value: delegateAmount !== '' ? ethers.utils.parseEther(delegateAmount) : undefined,
            })
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }*/

    React.useEffect(() => {  
        window.scrollTo(0, 0)
              
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

            const cmcityProposal1 = await readContract({
                address: cmcityPoints,
                abi: cmcityPointsABI,
                functionName: 'proposals',
                args: [1],
            })
            const cmcityProposal1All = await readContract({
                address: cmcityPoints,
                abi: cmcityPointsABI,
                functionName: 'votes',
                args: [1],
            })

            /*const jbcFaucet = await fetchBalance({ address: meritFaucet, })
            const allowtoClaim = address !== undefined && address !== null ? await readContract({
                address: meritFaucet,
                abi: faucetABI,
                functionName: 'allowedToWithdraw',
                args: [address],
            }) : false*/

            const id = await readContract({
                address: cmdaoName,
                abi: cmdaoNameABI,
                functionName: 'yourName',
                args: [address]
            })
            const name = await readContract({
                address: cmdaoName,
                abi: cmdaoNameABI,
                functionName: 'tokenURI',
                args: [id]
            })

            return [sx31Proposal1, sx31Proposal1All, /*jbcFaucet, allowtoClaim,*/ name, cmcityProposal1, cmcityProposal1All]
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
            // setJbconFaucet(result[2].formatted)
            // setAllowClaimJBC(result[3])
            setYourName(String(result[2]))
            setCmVoting1(result[3])
            setCmVoting1All(ethers.utils.formatEther(String(result[4])))
        })

    }, [address, txupdate, erc20ABI, cmcityPointsABI, sx31voteABI, faucetABI, cmdaoNameABI])

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
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: sx31Vote,
                abi: sx31voteABI,
                functionName: 'vote',
                args: [_proposal, ethers.utils.parseEther(voteAmount)]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const voteUniHandle = async (_proposal) => {
        setisLoading(true)
        let addr = '0x0000000000000000000000000000000000000000'
        let vote = 0
        if (_proposal === 1) {
            addr = '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd'
            vote = vote2Amount
        }
        try {
            const tokenAllow = await readContract({
                address: addr,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmcityPoints],
            })
            if (Number(tokenAllow) < Number(ethers.utils.parseEther(vote))) {
                const config = await prepareWriteContract({
                    address: addr,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmcityPoints, ethers.utils.parseEther(String(10**10))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmcityPoints,
                abi: cmcityPointsABI,
                functionName: 'vote',
                args: [_proposal, ethers.utils.parseEther(vote2Amount)]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    /*const claimJBCHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: meritFaucet,
                abi: faucetABI,
                functionName: 'requestTokens',
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }*/

    const checkName = async () => {
        setisLoading(true)
        try {
            const avai = await readContract({
                address: cmdaoName,
                abi: cmdaoNameABI,
                functionName: 'availability',
                args: [name]
            })
            avai === '0x0000000000000000000000000000000000000000' ? setAvaiName(true) : setAvaiName(false)
        } catch {}
        setisLoading(false)
    }

    const registName = async () => {
        setisLoading(true)
        try {
            const tokenAllow = await readContract({
                address: cmj,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoName],
            })
            if (Number(tokenAllow) < 250 * 10**18) {
                const config = await prepareWriteContract({
                    address: cmj,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoName, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config = await prepareWriteContract({
                address: cmdaoName,
                abi: cmdaoNameABI,
                functionName: 'idMint',
                args: [name]
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    return (
        <>
            <div className="fieldBanner" style={{background: "#2b2268", borderBottom: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}} className="pixel">
                    <div style={{fontSize: "75px", width: "fit-content"}}>City Center</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}}></div>
                </div>
                <div style={{margin: "30px 100px"}}>
                </div>
            </div>

            <div style={{background: "rgb(0, 19, 33", width: "100%", margin: "0", padding: "75px 0", minHeight: "inherit", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", overflow: "scroll"}} className="collection noscroll">
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", border: "1px solid rgb(54, 77, 94)", minWidth: "880px", width: "55%", height: "420px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">CMDAO Name Service [ALPHA]</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{width: "30%", height: "320px"}}>
                            <img src={providerIPFS + "bafybeib5zwxjwwuyxjvs36j4s3giauppwehqyzthk4vob6egnpylm5obwm"} height="200" alt="Can not load metadata."/>
                        </div>
                        <div style={{width: "65%", height: "320px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <div>
                                <div className="bold">PROPOSAL DETAIL</div>
                                <div style={{marginTop: "10px", color: "#fff", fontSize: "12px"}} className="bold">ลงทะเบียนชื่อสำหรับใช้งานใน CommuDAO Ecosystem ค่าธรรมเนียม: ชื่อใหม่ (250 CMJ), เปลี่ยนชื่อ (500 cmj/ครั้ง)</div>
                            </div>
                            <div>
                                <div className="bold">YOUR NAME</div>
                                <div style={{marginTop: "10px", color: "#fff"}} className="bold">{yourName}</div>
                            </div>
                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <input style={{width: "250px", padding: "10px 40px", fontSize: "18px"}} className="bold" type="string" placeholder="Input Name (max 128 bytes)" value={name} onChange={(event) => {setAvaiName(null); if (new Blob([event.target.value]).size <= 128) {setName(event.target.value)};}}></input>
                                <div style={{display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)"}} className="bold button" onClick={checkName}>CHECK</div>
                            </div>
                            <div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                {avaiName !== null ?
                                    <>
                                        {avaiName ?
                                            <>
                                                <div style={{color: "rgb(0, 227, 180)"}} className="bold">'{name}' IS AVAILABLE.</div>
                                                <div style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)"}} className="bold button" onClick={registName}>REGISTER</div>
                                            </> :
                                            <div style={{height: "52px"}} className="emp bold">'{name}' IS UNAVAILABLE.</div>
                                        }
                                    </> :
                                    <div style={{height: "52px"}}></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/*
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", border: "1px solid rgb(54, 77, 94)", minWidth: "880px", width: "55%", height: "420px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">CMDAO Charity - $JBC delegation for newcomers</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{width: "100%", height: "320px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <div>
                                <div className="bold">JBC DELEGATED</div>
                                <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "28px"}} className="bold">
                                    <div style={{marginRight: "10px", color: "#fff"}}>{Number(jbconFaucet).toFixed(2)}</div>
                                    <img src={providerIPFS + "bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" height="30px" alt="$JBC"/>
                                </div>
                            </div>
                            <div>
                                <div className="bold">PROPOSAL DETAIL</div>
                                <div style={{marginTop: "10px", color: "#fff", fontSize: "12px"}} className="bold">องค์กรการกุศล CMDAO Charity เปิดรับยอดบริจาคจำนวนมากจากสุลต่านใจบุญ จาก CM-City โดยทุกการบริจาค 1 JBC จะได้รับเหรียญแต้มบุญ 1 Merit Token<br></br>ในส่วนของผู้รับเคลม JBC เพื่อใช้เป็น Gas ฟรี จะมีสิทธิ์รับได้เพียง 1 JBC ต่อสัปดาห์<br></br>*** สำหรับผู้ที่ไม่มี Gas เริ่มต้นสำหรับ Claim สามารถขุดได้ที่ <a style={{textDecoration: "none"}} className="emp" href="https://faucet.jibchain.net/" target="_blank" rel="noreferrer">JBC PoW Faucet</a> (ขั้นต่ำในการ Claim : 0.025 JBC)</div>
                            </div>
                            <div style={{width: "65%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <input style={{width: "250px", padding: "10px 40px", fontSize: "18px"}} className="bold" type="number" placeholder="Enter $JBC Amount" value={delegateAmount} onChange={(event) => {setDelegateAmount(event.target.value)}}></input>
                                <div style={{display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)"}} className="bold button" onClick={sendHandle}>DELEGATE</div>
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
                */}

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", border: "1px solid rgb(54, 77, 94)", minWidth: "880px", width: "55%", height: "420px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">{cmVoting1[0]}</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{width: "30%", height: "320px"}}>
                            <img src={providerIPFS + "bafybeiddh23ppumqcikjfskf7egy4ffbqbfpyi2wz3lglu47box35rfalm"} height="200" alt="Can not load metadata."/>
                        </div>
                        <div style={{width: "65%", height: "320px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <div>
                                <div className="bold">WOOD DELEGATED</div>
                                <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "28px"}} className="emp bold">
                                    <div style={{marginRight: "10px"}}>{Number(cmVoting1All).toFixed(0)} / 10B ({((Number(cmVoting1All) * 100) / 10000000000).toFixed(3)}%)</div>
                                    <img src={providerIPFS + "bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4"} height="30px" alt="$WOOD"/>
                                </div>
                            </div>
                            <div>
                                <div className="bold">PROPOSAL DETAIL</div>
                                <div style={{marginTop: "10px", color: "#fff", fontSize: "12px"}} className="bold" dangerouslySetInnerHTML={{__html: cmVoting1[1]}}></div>
                                <div style={{marginTop: "20px", fontSize: "12px"}} className="bold">ผู้เสนอ Proposal: {cmVoting1[5]}</div>
                            </div>
                            {Number(cmVoting1All) < 10000000000 ?
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                    <input style={{width: "250px", padding: "10px 40px", fontSize: "18px"}} className="bold" type="number" placeholder="Enter $WOOD Amount" value={vote2Amount} onChange={(event) => {setVote2Amount(event.target.value)}}></input>
                                    <div style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)"}} className="bold button" onClick={() => {voteUniHandle(1)}}>VOTE WITH WOOD</div>
                                </div> :
                                <>
                                    {Number(cmVoting1All) === 0 ?
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", color: "rgb(0, 227, 180)"}} className="bold">Loading...</div> :
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", color: "rgb(0, 227, 180)"}} className="bold">DELEGATION COMPLETE, PROPOSAL TERMINATED.</div>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", marginBottom: "80px", padding: "25px 50px", border: "1px solid rgb(54, 77, 94)", minWidth: "880px", width: "55%", height: "420px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">{sx31Voting1[0]}</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{width: "30%", height: "320px"}}>
                            <img src="../elements/sx31factory.png" height="200" alt="$SX31_Factory"/>
                        </div>
                        <div style={{width: "65%", height: "320px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <div>
                                <div className="bold">SX31 DELEGATED</div>
                                <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "28px"}} className="emp bold">
                                    <div style={{marginRight: "10px"}}>{Number(sx31Voting1All).toFixed(2)} / 12,500 ({((Number(sx31Voting1All) * 100) / 12500).toFixed(3)}%)</div>
                                    <img src={providerIPFS + "bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4"} height="30px" alt="$SX31"/>
                                </div>
                            </div>
                            <div>
                                <div className="bold">PROPOSAL DETAIL</div>
                                <div style={{marginTop: "10px", color: "#fff", fontSize: "12px"}} className="bold" dangerouslySetInnerHTML={{__html: sx31Voting1[1]}}></div>
                                <div style={{marginTop: "20px", fontSize: "12px"}} className="bold">ผู้เสนอ Proposal : {sx31Voting1[3]}</div>
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
        </>
    )
}

export default CmCityCenter
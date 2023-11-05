import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const jibjib = '0xb6aaD2B2f9fD5eA0356F49c60Ee599De56206251'
const tunaField = '0x09676315DC0c85F6bd5e866C5f1363A00Eec4381'

const FishingField = ({ setisLoading, txupdate, setTxupdate, aurora721ABI, tunaFieldABI }) => {
    const { address } = useAccount()

    const [nft, setNft] = React.useState([])

    React.useEffect(() => {
        console.log("Connected to " + address)
        setNft([])
        
        const thefetch = async () => {
            const balanceofstake = await readContract({
                address: jibjib,
                abi: aurora721ABI,
                functionName: 'walletOfOwner',
                args: [tunaField],
            })
            const data = address !== null && address !== undefined ? await readContracts({
                contracts: balanceofstake.map((item) => (
                    {
                        address: tunaField,
                        abi: tunaFieldABI,
                        functionName: 'nftStake',
                        args: [String(item)],
                    }
                ))
            }) : [Array(balanceofstake.length).fill('')]

            let nfts = []
            let yournftstake = []

            for (let i = 0; i <= balanceofstake.length - 1; i++) {
                if (data[i].tokenOwnerOf.toUpperCase() === address.toUpperCase()) {
                    yournftstake.push({Id: String(balanceofstake[i])})
                }
            }
            console.log(yournftstake)

            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftstake.map((item) => (
                    {
                        address: tunaField,
                        abi: tunaFieldABI,
                        functionName: 'calculateRewards',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftstake.length).fill(0)]

            for (let i = 0; i <= yournftstake.length - 1; i++) {
                const response = await fetch("https://bafybeih4u5b5kkmc2mms5z3frywy77c4jr45u5wu67h22cdz45vlvaoqiy.ipfs.nftstorage.link/" + yournftstake[i].Id + ".json/")
                const _nft = await response.json()

                let bonus;
                if (Number(yournftstake[i].Id) >= 61) {
                    bonus = 2;
                } else if (Number(yournftstake[i].Id) >= 31 && Number(yournftstake[i].Id) <= 59) {
                    bonus = 5;
                } else if (Number(yournftstake[i].Id) >= 11 && Number(yournftstake[i].Id) <= 29) {
                    bonus = 10;
                } else if (Number(yournftstake[i].Id) <= 10) {
                    bonus = 25;
                }

                nfts.push({
                    Id: Number(yournftstake[i].Id),
                    Name: _nft.name,
                    Image: "https://bafybeidmedlvbae3t7gffvgakbulid4zpr7eqenx2rdsbbvkb6ol3xplpq.ipfs.nftstorage.link/" + yournftstake[i].Id + ".png/",
                    Attribute: _nft.attributes,
                    RewardPerSec: bonus,
                    isStaked: true,
                    Reward: String(data2[i])
                })
            }

            const balanceofyou = address !== null && address !== undefined ? await readContract({
                address: jibjib,
                abi: aurora721ABI,
                functionName: 'walletOfOwner',
                args: [address],
            }) : []
            for (let i = 0; i <= balanceofyou.length - 1; i++) {
                const response = await fetch("https://bafybeih4u5b5kkmc2mms5z3frywy77c4jr45u5wu67h22cdz45vlvaoqiy.ipfs.nftstorage.link/" + balanceofyou[i] + ".json/")
                const _nft = await response.json()

                let bonus;
                if (Number(balanceofyou[i]) >= 61) {
                    bonus = 2;
                } else if (Number(balanceofyou[i]) >= 31 && Number(balanceofyou[i]) <= 59) {
                    bonus = 5;
                } else if (Number(balanceofyou[i]) >= 11 && Number(balanceofyou[i]) <= 29) {
                    bonus = 10;
                } else if (Number(balanceofyou[i]) <= 10) {
                    bonus = 25;
                }

                nfts.push({
                    Id: Number(balanceofyou[i]),
                    Name: _nft.name,
                    Image: "https://bafybeidmedlvbae3t7gffvgakbulid4zpr7eqenx2rdsbbvkb6ol3xplpq.ipfs.nftstorage.link/" + balanceofyou[i] + ".png/",
                    Attribute: _nft.attributes,
                    RewardPerSec: bonus,
                    isStaked: false,
                    Reward: 0
                })
            }

            return [nfts, balanceofstake.length, ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            result[1] > 0 && result[0].length > 0 && address !== undefined ? setNft(result[0]) : setNft([null])
        })

    }, [address, txupdate, aurora721ABI, tunaFieldABI])

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract({
                address: jibjib,
                abi: aurora721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== tunaField.toUpperCase()) {
                const config = await prepareWriteContract({
                    address: jibjib,
                    abi: aurora721ABI,
                    functionName: 'approve',
                    args: [tunaField, _nftid],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }        
            const config2 = await prepareWriteContract({
                address: tunaField,
                abi: tunaFieldABI,
                functionName: 'stake',
                args: [_nftid],
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const unstakeNft = async (_nftid, _unstake) => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: tunaField,
                abi: tunaFieldABI,
                functionName: 'unstake',
                args: [_nftid, _unstake],
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }


    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('https://nftstorage.link/ipfs/bafkreib4lsq5nxdq2srf3rb6n7ksm4ykkz2twldneu6k46fimij3iq4zye')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "75px", color: "#fff", width: "fit-content", padding: "0 10px"}}>Tuna Lake</div>
                <div style={{fontSize: "17px", color: "#fff", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake Cat Meaw JIB JIB to earn $TUNA.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img
                    src="https://nftstorage.link/ipfs/bafkreifqroahbmxgnmsqdot5bzu3xbsa7y27mnlo6k45efgidmqxqrstbe"
                    width="150"
                    alt="tunapic"
                />
            </div>
        </div>

        <div style={{margin: "0", paddingTop: "75px", minHeight: "inherit", alignItems: "flex-start", fontSize: "14px"}} className="collection pixel">
            {nft.length > 0 ?
                <>
                {nft[0] !== null ?
                    <>
                    {nft.map((item, index) => (
                        <div className="nftCard" key={index}>
                            <img
                                src={item.Image}
                                width="150"
                                alt="nftpic"
                            />
                            <div>{item.Name}</div>
                            <div style={{width: 300, display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                {item.isStaked ?
                                    <>
                                        <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                        <div style={{color: "black"}}>On Staking</div>
                                    </> :
                                    <>
                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                        <div style={{color: "black"}}>Available for stake</div>
                                    </>
                                }
                            </div>
                            <div>
                                Earn: {ethers.utils.formatEther(String(item.RewardPerSec * 86400 * 10**14))}
                                &nbsp;
                                <img src="https://nftstorage.link/ipfs/bafkreifqroahbmxgnmsqdot5bzu3xbsa7y27mnlo6k45efgidmqxqrstbe" width="12" alt="tunapic"/>
                                TUNA/DAY
                            </div>
                            <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                <div style={{lineHeight: 2, fontSize: "12px", textAlign: "left"}}>
                                    Pending Rewards<br></br>
                                    <img src="https://nftstorage.link/ipfs/bafkreifqroahbmxgnmsqdot5bzu3xbsa7y27mnlo6k45efgidmqxqrstbe" width="12" alt="tunapic"/>
                                    {ethers.utils.formatEther(String(item.Reward))}
                                </div>
                                {item.Reward > 0 ?
                                    <div style={{lineHeight: 2}} className="button" onClick={() => {unstakeNft(item.Id, false)}}>HARVEST</div> :
                                    <div style={{lineHeight: 2, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                                }
                            </div>
                            {item.isStaked ?
                                <div style={{background: "gray"}} className="button" onClick={() => {unstakeNft(item.Id, true)}}>UNSTAKE</div> :
                                <div className="button" onClick={() => {stakeNft(item.Id)}}>STAKE</div>
                            }
                        </div>
                    ))}
                    </> :
                    <div className="nftCard" style={{justifyContent: "center"}}>
                        {address !== undefined ?
                            <>
                                <img src="https://l3img.b-cdn.net/ipfs/QmUmf3MEZg99qqLJ6GsewESVum8sm72gfH3wyiVPZGH6HA" width="150" alt="No_NFTs" />
                                <div style={{marginTop: "30px"}} className="bold">This wallet doesn't have NFTs.</div>
                            </> :
                            <>
                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                <div className="bold">Please connect wallet to view your NFTs.</div>
                            </>
                        }
                    </div>
                }
                </> :
                <div className="nftCard" style={{justifyContent: "center"}}>
                    <ThreeDots fill="#5f6476" />
                    <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                </div>
            }
        </div>
    </>
    )
}

export default FishingField
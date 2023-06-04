import React from 'react'
import { ethers } from 'ethers'
import { readContract, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'

const jibjib = '0xb6aaD2B2f9fD5eA0356F49c60Ee599De56206251'
const tunaField = '0x09676315DC0c85F6bd5e866C5f1363A00Eec4381'

const FishingField = ({ setisLoading, txupdate, setTxupdate, aurora721ABI, tunaFieldABI }) => {
    const { address } = useAccount()

    const [nft, setNft] = React.useState([])

    React.useEffect(() => {
        setNft([])
        
        const thefetch = async () => {
            let nfts = []

            const res = await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "0x09676315DC0c85F6bd5e866C5f1363A00Eec4381") {
                        ERC721tokens(id: "0x09676315DC0c85F6bd5e866C5f1363A00Eec4381") {
                            id
                            uri
                            transfers(orderBy: timestamp, orderDirection: desc, first: 2) {
                            to {
                                id
                            }
                            }
                        }
                        }
                    }`
                })
            })).json()
            const _res = res.data.account.ERC721tokens
            let yournftstake = []
            for (let i = 0; i <= _res.length - 1 && address !== null && address !== undefined ; i++) {
                if ((_res[i].transfers[0].to.id).toUpperCase() === ("0x09676315DC0c85F6bd5e866C5f1363A00Eec4381").toUpperCase()) {
                    if ((_res[i].transfers[1].to.id).toUpperCase() === address.toUpperCase()) {
                        yournftstake.push({Id: Number((_res[i].id).slice(43)), URI: _res[i].uri})
                    }
                }
            }

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

                const reward = await readContract({
                    address: tunaField,
                    abi: tunaFieldABI,
                    functionName: 'calculateRewards',
                    args: [yournftstake[i].Id],
                })

                nfts.push({
                    Id: Number(yournftstake[i].Id),
                    Name: _nft.name,
                    Image: "https://bafybeidmedlvbae3t7gffvgakbulid4zpr7eqenx2rdsbbvkb6ol3xplpq.ipfs.nftstorage.link/" + yournftstake[i].Id + ".png/",
                    Attribute: _nft.attributes,
                    RewardPerSec: bonus,
                    isStaked: true,
                    Reward: String(reward)
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

                const nftStake = await readContract({
                    address: tunaField,
                    abi: tunaFieldABI,
                    functionName: 'nftStake',
                    args: [balanceofyou[i]],
                })

                nfts.push({Id: Number(balanceofyou[i]), Name: _nft.name, Image: "https://bafybeidmedlvbae3t7gffvgakbulid4zpr7eqenx2rdsbbvkb6ol3xplpq.ipfs.nftstorage.link/" + balanceofyou[i] + ".png/", Attribute: _nft.attributes, RewardPerSec: bonus, isStaked: nftStake.isStaked, Reward: 0})
            }

            return [nfts, _res.length, ]
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
        const nftAllow = await readContract({
            address: jibjib,
            abi: aurora721ABI,
            functionName: 'getApproved',
            args: [_nftid],
        })
        if (nftAllow.toUpperCase() !== tunaField.toUpperCase()) {
            try {
                const config = await prepareWriteContract({
                    address: jibjib,
                    abi: aurora721ABI,
                    functionName: 'approve',
                    args: [tunaField, _nftid],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            } catch {}
        }
        try {
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
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('../background/field1bg.png')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "95px", color: "#fff", width: "fit-content", padding: "0 10px"}}>Tuna Lake</div>
                <div style={{fontSize: "22.5px", color: "#fff", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake Cat Meaw JIB JIB to earn $TUNA.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img
                    src="../items/tuna.png"
                    width="175"
                    alt="tunapic"
                />
            </div>
        </div>

        <div style={{background: "#53A7E5", margin: "0", paddingTop: "75px", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
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
                            <div className="pixel">{item.Name}</div>
                            <div style={{width: 300, display: "flex", flexDirection: "row", justifyContent: "center"}} className="pixel">
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
                            <div className="emp pixel">
                                Earn: {ethers.utils.formatEther(String(item.RewardPerSec * 86400 * 10**14))}
                                &nbsp;
                                <img src="../items/tuna.png" width="12" alt="tunapic"/>
                                TUNA/DAY
                            </div>
                            <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                <div style={{lineHeight: 2, fontSize: "12px", textAlign: "left",}} className="bold">
                                    Pending Rewards<br></br>
                                    <img src="../items/tuna.png" width="12" alt="tunapic"/>
                                    {ethers.utils.formatEther(String(item.Reward))}
                                </div>
                                {item.Reward > 0 ?
                                    <div style={{lineHeight: 1.5}} className="pixel button" onClick={() => {unstakeNft(item.Id, false)}}>HARVEST</div> :
                                    <div style={{lineHeight: 1.5, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">HARVEST</div>
                                }
                            </div>
                            {item.isStaked ?
                                <div style={{background: "gray"}} className="pixel button" onClick={() => {unstakeNft(item.Id, true)}}>UNSTAKE</div> :
                                <div className="pixel button" onClick={() => {stakeNft(item.Id)}}>STAKE</div>
                            }
                        </div>
                    ))}
                    </> :
                    <>
                    {address !== undefined ?
                        <div className="nftCard" style={{justifyContent: "center"}}>
                            <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-file-image-o"></i>
                            <div className="emp bold">This wallet doesn't have NFTs.</div>
                        </div> :
                        <div className="nftCard" style={{justifyContent: "center"}}>
                            <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                            <div className="emp bold">Please connect wallet to view your NFTs.</div>
                        </div>
                    }
                    </>
                }
                </> :
                <div className="nftCard" style={{justifyContent: "center"}}>
                    <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-spinner"></i>
                    <div className="emp bold">Loading NFTs...</div>
                </div>
            }
        </div>
    </>
    )
}

export default FishingField
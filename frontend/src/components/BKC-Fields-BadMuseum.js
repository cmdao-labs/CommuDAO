import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const bkga = '0x99a763eCBd64fdcCfE06143D405D5DFaf5828ce2'
const badField = ''
const providerBKC = new ethers.getDefaultProvider('https://rpc.bitkubchain.io')

const BadMuseum = ({ setisLoading, txupdate, setTxupdate, erc721ABI }) => {
    const { address } = useAccount()

    const [nft, setNft] = React.useState([])

    React.useEffect(() => {
        console.log("Connected to " + address)
        const bkgaSC = new ethers.Contract(bkga, erc721ABI, providerBKC)
        setNft([])
        
        const thefetch = async () => {
            /*
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
            */           
            const balanceofstake = []
            let nfts = []

            const walletFilter = await bkgaSC.filters.Transfer(null, address, null)
            const walletEvent = await bkgaSC.queryFilter(walletFilter, 12767368, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj, index) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: bkga,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                    }
                ))
            }) : [Array(walletRemoveDup.length).fill('')]

            let yournftwallet = []
            for (let i = 0; i <= walletRemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data2[i].toUpperCase() === address.toUpperCase()) {
                    yournftwallet.push({Id: String(walletRemoveDup[i])})
                }
            }
            console.log(yournftwallet)

            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet.map((item) => (
                    {
                        address: bkga,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet.length).fill('')]

            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data3[i]
                const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                const nft = await response.json()

                nfts.push({
                    Id: yournftwallet[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 1,
                    isStaked: false,
                    Reward: 0
                })
            }

            if (nfts.length === 0) { nfts.push(null) }

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
            (result[1] > 0 || true) && result[0].length > 0 && address !== undefined ? setNft(result[0]) : setNft([null])
        })

    }, [address, txupdate, erc721ABI])
    /*
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
    */

    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px"}}>
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content", padding: "0 10px"}}>Bad Museum</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake BKGA to earn $BST.</div>
                </div>
                <div style={{margin: "30px 100px"}}>
                    <img
                        src="https://nftstorage.link/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm"
                        width="150"
                        alt="$BST"
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
                                    <img src="https://nftstorage.link/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm" width="12" style={{marginRight: "5px"}} alt="$BST"/>
                                    BST/DAY
                                </div>
                                <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                    <div style={{lineHeight: 2, fontSize: "12px", textAlign: "left"}}>
                                        Pending Rewards<br></br>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <img src="https://nftstorage.link/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm" width="12" style={{marginRight: "5px"}} alt="$BST"/>
                                            {ethers.utils.formatEther(String(item.Reward))}
                                        </div>
                                    </div>
                                    {item.Reward > 0 ?
                                        <div style={{lineHeight: 2}} className="button" onClick={() => {/*unstakeNft(item.Id, false)*/}}>HARVEST</div> :
                                        <div style={{lineHeight: 2, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                                    }
                                </div>
                                {item.isStaked ?
                                    <div style={{background: "gray"}} className="button" onClick={() => {/*unstakeNft(item.Id, true)*/}}>UNSTAKE</div> :
                                    <div style={{background: "gray"}} className="button" onClick={() => {/*stakeNft(item.Id)*/}}>STAKE</div>
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

export default BadMuseum
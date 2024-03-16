import React from 'react'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { ThreeDots } from 'react-loading-icons'

const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const dunANGB = '0x59c1C2f5FA76DB933B97b7c54223129e2A398534'
const starLab = '0x7A7Bc613e93aD729141D4BbB94375b5aD19d0Cbf'

const acNft = '0x526A70be985EB234c3f2c4933aCB59F6EB595Ed7'
const acUpgrade = '0x58AE9c64F0367cAcE006438af2E9E889F69051c4'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const ApInn = ({ setisLoading, txupdate, setTxupdate, acUpgradeABI, erc721ABI, erc20ABI }) => {
    const { address } = useAccount()

    const [nft, setNft] = React.useState([])
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [angbBalance, setAngbBalance] = React.useState(0)
    const [starBalance, setStarBalance] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)    
        const acnftSC = new ethers.Contract(acNft, erc721ABI, providerJBC)

        const thefetch = async () => {
            const walletFilter = await acnftSC.filters.Transfer(null, address, null)
            const walletEvent = await acnftSC.queryFilter(walletFilter, 2337707, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)

            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: acNft,
                        abi: erc721ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunANGB,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: starLab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                ],
            }) : [0, 0, 0, 0, ]

            const cmjBal = data[1]
            const angbBal = data[2]
            const starBal = data[3]

            const nftbal = data[0]
            let count = 0
            let nfts = []
            let yournft = []

            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: acNft,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [item],
                    }
                ))
            }) : [Array(walletRemoveDup.length).fill('')]

            for (let i = 0; i <= walletRemoveDup.length - 1 && count < nftbal; i++) {
                if (data2[i].toUpperCase() === address.toUpperCase()) {
                    yournft.push({Id: String(walletRemoveDup[i])})
                    count++
                }
            }

            console.log(yournft)
            for (let i = 0; i <= yournft.length - 1; i++) {
                const nftipfs = await readContract({
                    address: acNft,
                    abi: erc721ABI,
                    functionName: 'tokenURI',
                    args: [yournft[i].Id],
                })
                const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                const nft = await response.json()


                nfts.push({
                    Col: 1,
                    Id: Number(yournft[i].Id),
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: null,
                    Onsell: false,
                    Count: null
                })
            }
            if (nfts.length === 0) { nfts.push(null) }

            return [nfts, cmjBal, angbBal, starBal]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setNft(result[0])
            setCmjBalance(ethers.utils.formatEther(String(result[1])))
            setAngbBalance(ethers.utils.formatEther(String(result[2])))
            setStarBalance(ethers.utils.formatEther(String(result[3])))
        })

    }, [address, erc20ABI, erc721ABI, txupdate])

    const enchantAcHandle = async (_nftid, _enchantindex) => {
        setisLoading(true)
        try {
            const starAllow = await readContract({
                address: starLab,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, acUpgrade],
            })
            if (starAllow < 10**18) {
                const config = await prepareWriteContract({
                    address: starLab,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [acUpgrade, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const nftAllow = await readContract({
                address: acNft,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== acUpgrade.toUpperCase()) {
                const config4 = await prepareWriteContract({
                    address: acNft,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [acUpgrade, _nftid],
                })
                const approvetx4 = await writeContract(config4)
                await approvetx4.wait()
            }
            const config5 = await prepareWriteContract({
                address: acUpgrade,
                abi: acUpgradeABI,
                functionName: 'enchant',
                args: [_enchantindex, _nftid],
            })
            const tx = await writeContract(config5)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px"}}>
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content"}}>AP INN</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}} className="pixel"></div>
                </div>
                <div style={{margin: "30px 100px"}}>
                    <img src="https://nftstorage.link/ipfs/bafybeifrqslsoes7swzc3bnjl72x6sgsewcnx2w3zjsm5pzma7ku2onr6a" height="200" alt="AP-INN" />
                </div>
            </div>

            <div style={{width: "90%", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                <div style={{textAlign: "left", marginTop: "50px", minHeight: "600px", width: "250px", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <div style={{width: "250px", fontSize: "16px", letterSpacing: "1px"}} className="bold">Tokens</div>
                    <div className="pixel">
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="22" alt="$CMJ"/>
                            <div style={{marginLeft: "10px"}}>{Number(cmjBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                        </div>
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m" width="22" alt="$ANGB"/>
                            <div style={{marginLeft: "10px"}}>{Number(angbBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                        </div>
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafybeideve73vg6mtnwzjjmrol66idxoe3orfxrjbdairhwbumyj3a46eu" width="22" alt="$STAR"/>
                            <div style={{marginLeft: "10px"}}>{Number(starBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                        </div>
                    </div>
                </div>

                <div style={{textAlign: "left", margin: "50px 0 80px 0", minHeight: "600px", width: "70%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <div style={{padding: "50px", margin: "50px 0", backdropFilter: "blur(20px)", border: "none", minWidth: "940px", width: "80%", height: "300px", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", fontSize: "14px"}} className="nftCard">
                        <div style={{fontSize: "40px"}}>March 2024 Prize Pool 🎁</div>
                        <div style={{width: "98%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                            <div style={{width: "220px", marginRight: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                <div>Top $ANGB Holder</div>
                                <div>5 STAR</div>
                            </div>
                            <div style={{width: "220px", marginRight: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                <div>Top $ANGB Farmer</div>
                                <div>5 STAR</div>
                            </div>
                            <div style={{width: "220px", marginRight: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                <div>Top $VABAG Burner</div>
                                <div>5 STAR</div>
                            </div>
                            <div style={{width: "220px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                <div>Top Spender</div>
                                <div>5 STAR</div>
                            </div>
                        </div>
                        <div>Snapshot on the last block of the month before 0.00 AM.<br></br>Rewards will allocated to top 20 for each leaderboard.</div>
                        <div style={{width: "98%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                            <div style={{width: "300px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                <div>Become Top 1-5</div>
                                <div>To win prize pool</div>
                            </div>
                        </div>
                    </div>

                    <div style={{width: "98%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                        <div style={{padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "420px", width: "25%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top $ANGB Holder</div>
                            {false ?
                                <>
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>
                                    
                                </div>
                            }
                        </div>

                        <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "420px", width: "25%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top $ANGB Farmer</div>
                            {false ?
                                <>
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>

                                </div>
                            }
                        </div>

                        <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "420px", width: "25%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top $VABAG Buner</div>
                            {false ?
                                <>
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>

                                </div>
                            }
                        </div>

                        <div style={{padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "420px", width: "25%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top Spender</div>
                            {false ?
                                <>
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>

                                </div>
                            }
                        </div>
                    </div>

                    <div style={{marginTop: "20px", fontSize: "16px", letterSpacing: "1px"}} className="bold">Upgradable NFTs <a className="emp" style={{textDecoration: "underline", marginLeft: "20px"}} href="https://nft-angel-plus.gitbook.io/nft-angel-plus/nft-blockchain-project/gamefi-nft-angel-plus-the-dungeon/nft-upgrade-mining-power" target="_blank" rel="noreferrer">📖 The Angel Plus NFTs Guidebook</a></div>
                    {nft !== undefined && nft.length > 0 ?
                        <>
                            {nft[0] !== null ?
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                    {nft.map((item, index) => (
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}} key={index}>
                                            {

                                            }
                                            {String(item.Id).slice(0, 3) !== "401" &&
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                    <div className="emp pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                <source src={item.Image} type="video/mp4" />
                                                            </video>
                                                            <div style={{width: "150px"}}>{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        {String(item.Id).slice(0, 3) === "101" &&
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src='https://bafybeifsfdjwelvtzg6nurhgterfyfw6fyvoessptriej4yip4vq3xt6ze.ipfs.nftstorage.link/' type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}1</div>
                                                            </div>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "102" &&
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src='https://nftstorage.link/ipfs/bafybeig6nfhwxb6apgwjpina3w3ltlfss2vgmn7e6loguf3db7z6yp6ofe' type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                            </div>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "103" &&
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src='https://nftstorage.link/ipfs/bafybeidvfdvw6mc2pln5wo7hstyl2pa6mwkvpdqi2onuam3uht6fnt23ui' type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "104" &&
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src='https://bafybeiesy2tb3rk2xfnhe6sxpeoerwqfpelrjmeypisgr23ci7ifokjm5q.ipfs.nftstorage.link/' type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                            </div>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "105" &&
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src='https://nftstorage.link/ipfs/bafybeifqigkbjup3auor6puownvf2myhsxgogvp2rypacgpwi75juvqsae' type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -4)}C +0</div>
                                                            </div>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "201" &&
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src='https://nftstorage.link/ipfs/bafybeigso6gthqx37ok66bhtn4iwva5a3dvfummbdgfj5kjfosusqohfpu' type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}1</div>
                                                            </div>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "202" &&
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src='https://nftstorage.link/ipfs/bafybeidfn7btigokkuont2mjbwk377hp3ipgdffkqwp7etwhghvb7opspq' type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                            </div>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "203" &&
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src='https://nftstorage.link/ipfs/bafybeid37zvuwqumg45v4saisweceuxo7ukw4pa7rineghonfcndaa3yju' type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "204" &&
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src='https://nftstorage.link/ipfs/bafybeig3ilnnbbu5leurojtvtj44md6vt7paubqcgzddggmvnrj2qs7pzy' type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                            </div>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "205" &&
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src='https://nftstorage.link/ipfs/bafybeia22spf73265h7zwq3rlydayzhmksbmhpjn2ppncnpbuswigadj2e' type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -4)}B +0</div>
                                                            </div>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "301" &&
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src='https://nftstorage.link/ipfs/bafybeihs2ydvod22xncp3264pvybcxi6njid7ncqbrz2e4qkl6mresb6yq' type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}1</div>
                                                            </div>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "302" &&
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src='https://nftstorage.link/ipfs/bafybeifc7ffb7n2ytc7lfohcy3k6qgkfsz5t5jwbwpd552pkztamm7uuli' type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                            </div>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "303" &&
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src='https://nftstorage.link/ipfs/bafybeid2jukb33diwjv4p6ia4sg6zkdrd6rhbcy6nemlvnqhel3zesoqni' type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "304" &&
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src='https://nftstorage.link/ipfs/bafybeigvvbgvxsluftnkedcw2vwfaw5rarbhyonrwsvqh2rr3du7ndxzwa' type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                            </div>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "305" &&
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src='https://nftstorage.link/ipfs/bafybeigvqwas5ph2qwfmlo5riqvnul7stnw5fbg2igqto55fgkqijciezi' type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -4)}A +0</div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        {String(item.Id).slice(0, 3) === "101" &&
                                                            <>
                                                                <div>
                                                                    <div>D0</div>
                                                                    <div style={{width: "150px"}}>100 pow</div>
                                                                </div>
                                                                <div>
                                                                    <div>D1</div>
                                                                    <div style={{width: "150px"}}>1000 pow</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "102" &&
                                                            <>
                                                                <div>
                                                                    <div>D1</div>
                                                                    <div style={{width: "150px"}}>1000 pow</div>
                                                                </div>
                                                                <div>
                                                                    <div>D2</div>
                                                                    <div style={{width: "150px"}}>2000 pow</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "103" &&
                                                            <>
                                                                <div>
                                                                    <div>D2</div>
                                                                    <div style={{width: "150px"}}>2000 pow</div>
                                                                </div>
                                                                <div>
                                                                    <div>D3</div>
                                                                    <div style={{width: "150px"}}>3000 pow</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "104" &&
                                                            <>
                                                                <div>
                                                                    <div>D3</div>
                                                                    <div style={{width: "150px"}}>3000 pow</div>
                                                                </div>
                                                                <div>
                                                                    <div>D4</div>
                                                                    <div style={{width: "150px"}}>4000 pow</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "105" &&
                                                            <>
                                                                <div>
                                                                    <div>D4</div>
                                                                    <div style={{width: "150px"}}>4000 pow</div>
                                                                </div>
                                                                <div>
                                                                    <div>C0</div>
                                                                    <div style={{width: "150px"}}>5000 pow</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "201" &&
                                                            <>
                                                                <div>
                                                                    <div>C0</div>
                                                                    <div style={{width: "150px"}}>5000 pow</div>
                                                                </div>
                                                                <div>
                                                                    <div>C1</div>
                                                                    <div style={{width: "150px"}}>6000 pow</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "202" &&
                                                            <>
                                                                <div>
                                                                    <div>C1</div>
                                                                    <div style={{width: "150px"}}>6000 pow</div>
                                                                </div>
                                                                <div>
                                                                    <div>C2</div>
                                                                    <div style={{width: "150px"}}>7000 pow</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "203" &&
                                                            <>
                                                                <div>
                                                                    <div>C2</div>
                                                                    <div style={{width: "150px"}}>7000 pow</div>
                                                                </div>
                                                                <div>
                                                                    <div>C3</div>
                                                                    <div style={{width: "150px"}}>8000 pow</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "204" &&
                                                            <>
                                                                <div>
                                                                    <div>C3</div>
                                                                    <div style={{width: "150px"}}>8000 pow</div>
                                                                </div>
                                                                <div>
                                                                    <div>C4</div>
                                                                    <div style={{width: "150px"}}>9000 pow</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "205" &&
                                                            <>
                                                                <div>
                                                                    <div>C4</div>
                                                                    <div style={{width: "150px"}}>9000 pow</div>
                                                                </div>
                                                                <div>
                                                                    <div>B0</div>
                                                                    <div style={{width: "150px"}}>10000 pow</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "301" &&
                                                            <>
                                                                <div>
                                                                    <div>B0</div>
                                                                    <div style={{width: "150px"}}>10000 pow</div>
                                                                </div>
                                                                <div>
                                                                    <div>B1</div>
                                                                    <div style={{width: "150px"}}>11000 pow</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "302" &&
                                                            <>
                                                                <div>
                                                                    <div>B1</div>
                                                                    <div style={{width: "150px"}}>11000 pow</div>
                                                                </div>
                                                                <div>
                                                                    <div>B2</div>
                                                                    <div style={{width: "150px"}}>12000 pow</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "303" &&
                                                            <>
                                                                <div>
                                                                    <div>B2</div>
                                                                    <div style={{width: "150px"}}>12000 pow</div>
                                                                </div>
                                                                <div>
                                                                    <div>B3</div>
                                                                    <div style={{width: "150px"}}>13000 pow</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "304" &&
                                                            <>
                                                                <div>
                                                                    <div>B3</div>
                                                                    <div style={{width: "150px"}}>13000 pow</div>
                                                                </div>
                                                                <div>
                                                                    <div>B4</div>
                                                                    <div style={{width: "150px"}}>14000 pow</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {String(item.Id).slice(0, 3) === "305" &&
                                                            <>
                                                                <div>
                                                                    <div>B4</div>
                                                                    <div style={{width: "150px"}}>14000 pow</div>
                                                                </div>
                                                                <div>
                                                                    <div>A0</div>
                                                                    <div style={{width: "150px"}}>15000 pow</div>
                                                                </div>
                                                            </>
                                                        }
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="https://nftstorage.link/ipfs/bafybeideve73vg6mtnwzjjmrol66idxoe3orfxrjbdairhwbumyj3a46eu" height="18" alt="$STAR"/>
                                                            <div style={{margin: "0 5px"}}>1</div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{background: "#67BAA7", textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                        className="pixel button"
                                                        onClick={() => {
                                                            let arg = 0
                                                            if (String(item.Id).slice(0, 3) === "101") {
                                                                arg = 1
                                                            } else if (String(item.Id).slice(0, 3) === "102") {
                                                                arg = 2
                                                            } else if (String(item.Id).slice(0, 3) === "103") {
                                                                arg = 3
                                                            } else if (String(item.Id).slice(0, 3) === "104") {
                                                                arg = 4
                                                            } else if (String(item.Id).slice(0, 3) === "105") {
                                                                arg = 5
                                                            } else if (String(item.Id).slice(0, 3) === "201") {
                                                                arg = 6
                                                            } else if (String(item.Id).slice(0, 3) === "202") {
                                                                arg = 7
                                                            } else if (String(item.Id).slice(0, 3) === "203") {
                                                                arg = 8
                                                            } else if (String(item.Id).slice(0, 3) === "204") {
                                                                arg = 9
                                                            } else if (String(item.Id).slice(0, 3) === "205") {
                                                                arg = 10
                                                            } else if (String(item.Id).slice(0, 3) === "301") {
                                                                arg = 11
                                                            } else if (String(item.Id).slice(0, 3) === "302") {
                                                                arg = 12
                                                            } else if (String(item.Id).slice(0, 3) === "303") {
                                                                arg = 13
                                                            } else if (String(item.Id).slice(0, 3) === "304") {
                                                                arg = 14
                                                            } else if (String(item.Id).slice(0, 3) === "305") {
                                                                arg = 15
                                                            }
                                                            enchantAcHandle(item.Id, arg)
                                                        }}
                                                    >
                                                        UPGRADE
                                                    </div>
                                                </div>
                                            }
                                            
                                        </div>
                                    ))}
                                </div> :
                                <>
                                    {address !== undefined ?
                                        <div className="nftCard" style={{justifyContent: "center"}}>
                                            <i style={{fontSize: "150px", marginBottom: "30px"}} className="fas fa-scroll"></i>
                                            <div className="bold">No NFTs equipment to upgrade.</div>
                                        </div> :
                                        <div className="nftCard" style={{justifyContent: "center"}}>
                                            <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                            <div className="bold">Please connect wallet to view your NFTs.</div>
                                        </div>
                                    }
                                </>
                            }
                        </> :
                        <div style={{width: "300px", padding: "20px", margin: "20px"}}>
                            <ThreeDots fill="#5f6476" />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ApInn
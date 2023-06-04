import React from 'react'
import { readContract } from '@wagmi/core'
import { useAccount } from 'wagmi'

const dunJasper = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const challenger = ['0x20781aB9AFFa7a654215A819C517C2F693348F48', '0x77464A935A30f83Bf000C4277ec5d75Efa292c6A', '0xCd2c874bfE087549Be38925F5F5fEeF748e6f18b', '0x1d1A0c58Aa2bb2919ae74697b4a4a391b64f3d85', '0x8B9C26D596997420089ceb7681A8faEF4486B8F0', '0xAFb9cA64a3aFcC2d2581637E6E1B6d3176d53d93', '0x5b91837fdA4aE66637fCeca10328E04cB31f08dE', '0x354d5fF3e5c1a3daAA9e628624Eb08d132865E2C', '0x428915914746540E6f577b267a737008Ca7ae365', '0xd1a58d3c347baE9ead214B9981b7a6d65b62B43b']

const DungeonArena = ({ navigate, setisLoading, txupdate, setTxupdate, erc20ABI, dunJasperABI }) => {
    const { address } = useAccount()

    const [characterSlot, setCharacterSlot] = React.useState(null)
    const [hatSlot, setHatSlot] = React.useState(null)
    const [hatSlotLevel, setHatSlotLevel] = React.useState(null)
    const [clothSlot, setClothSlot] = React.useState(null)
    const [clothSlotLevel, setClothSlotLevel] = React.useState(null)
    const [accSlot, setAccSlot] = React.useState(null)
    const [accSlotLevel, setAccSlotLevel] = React.useState(null)
    const [backSlot, setBackSlot] = React.useState(null)
    const [shoesSlot, setShoesSlot] = React.useState(null)
    const [weaponSlot, setWeaponSlot] = React.useState(null)
    const [wpSlotLevel, setWpSlotLevel] = React.useState(null)

    const [allPower, setAllPower] = React.useState(0)
    const [isStakeNow, setIsStakeNow] = React.useState(null)

    const [challengerSlot, setChallengerSlot] = React.useState(0)

    const [characterSlotC, setCharacterSlotC] = React.useState(null)
    const [hatSlotC, setHatSlotC] = React.useState(null)
    const [hatSlotLevelC, setHatSlotLevelC] = React.useState(null)
    const [clothSlotC, setClothSlotC] = React.useState(null)
    const [clothSlotLevelC, setClothSlotLevelC] = React.useState(null)
    const [accSlotC, setAccSlotC] = React.useState(null)
    const [accSlotLevelC, setAccSlotLevelC] = React.useState(null)
    const [backSlotC, setBackSlotC] = React.useState(null)
    const [shoesSlotC, setShoesSlotC] = React.useState(null)
    const [weaponSlotC, setWeaponSlotC] = React.useState(null)
    const [wpSlotLevelC, setWpSlotLevelC] = React.useState(null)

    const [allPowerC, setAllPowerC] = React.useState(0)
    const [isStakeNowC, setIsStakeNowC] = React.useState(null)

    const [yourDamage, setYourDamage] = React.useState(0)
    const [peerDamage, setPeerDamage] = React.useState(0)
    const [isWin, setIsWin] = React.useState(null)
    const [yourWin, setYourWin] = React.useState(0)
    const [peerWin, setPeerWin] = React.useState(0)

    React.useEffect(() => {
        setPeerWin(0)
        setAllPowerC(0)
        setIsStakeNowC(null)
        setCharacterSlotC(null)
        setHatSlotC(null)
        setHatSlotLevelC(null)
        setClothSlotC(null)
        setClothSlotLevelC(null)
        setAccSlotC(null)
        setAccSlotLevelC(null)
        setBackSlotC(null)
        setShoesSlotC(null)
        setWeaponSlotC(null)
        setWpSlotLevelC(null)

        const thefetch = async () => {
            let nfts = []

            const res = await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "` + dunJasper + `") {
                            ERC721tokens(first: 1000) {
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
            const _res = res !== null ? res.data.account.ERC721tokens : []
            let yournftstake = []
            let challengerstake = []
            for (let i = 0; i <= _res.length - 1 && address !== null && address !== undefined ; i++) {
                if ((_res[i].transfers[0].to.id).toUpperCase() === dunJasper.toUpperCase()) {
                    if ((_res[i].transfers[1].to.id).toUpperCase() === address.toUpperCase()) {
                        yournftstake.push({Id: Number((_res[i].id).slice(43)), URI: _res[i].uri})
                    }
                    if ((_res[i].transfers[1].to.id).toUpperCase() === challenger[challengerSlot].toUpperCase()) {
                        challengerstake.push({Id: Number((_res[i].id).slice(43)), URI: _res[i].uri})
                    }
                }
            }

            for (let i = 0; i <= yournftstake.length - 1; i++) {
                const nftipfs = yournftstake[i].URI
                const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                const nft = await response.json()

                const bonus = Number(String(yournftstake[i].Id).slice(-4))

                nfts.push({
                    Col: 1,
                    Id: Number(yournftstake[i].Id),
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: bonus,
                    isStaked: true
                })
            }
            for (let i = 0; i <= challengerstake.length - 1; i++) {
                const nftipfs = challengerstake[i].URI
                const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                const nft = await response.json()

                const bonus = Number(String(challengerstake[i].Id).slice(-4))

                nfts.push({
                    Col: 1,
                    Id: Number(challengerstake[i].Id),
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: bonus,
                    isStaked: true
                })
            }

            if (nfts.length === 0) { nfts.push(null) }

            const nftEQ = address !== null && address !== undefined ? await readContract({
                address: dunJasper,
                abi: dunJasperABI,
                functionName: 'nftEquip',
                args: [address],
            }) : 0

            let nftEQ_1 = null
            let nftEQ_2_Img = null
            let nftEQ_2_Name = null
            let nftEQ_3 = null
            let nftEQ_4 = null
            let nftEQ_5 = null
            let nftEQ_5_Name = null
            let nftEQ_6 = null
            let nftEQ_6_Name = null
            let nftEQ_7 = null
            let nftEQ_7_Name = null
            for (let i = 0; i <= nfts.length - 1; i++) {
                if (yournftstake.length > 0) {
                    if (nfts[i].Id === Number(nftEQ.characterId)) {
                        nftEQ_1 = nfts[i].Image
                    } else if (nfts[i].Id === Number(nftEQ.accessoriesId)) {
                        nftEQ_2_Img = nfts[i].Image
                        nftEQ_2_Name = nfts[i].Name
                    } else if (nfts[i].Id === Number(nftEQ.backId)) {
                        nftEQ_3 = nfts[i].Image
                    } else if (nfts[i].Id === Number(nftEQ.shoesId)) {
                        nftEQ_4 = nfts[i].Image
                    } else if (nfts[i].Id === Number(nftEQ.weaponId)) {
                        nftEQ_5 = nfts[i].Image
                        nftEQ_5_Name = nfts[i].Name
                    } else if (nfts[i].Id === Number(nftEQ.clothId)) {
                        nftEQ_6 = nfts[i].Image
                        nftEQ_6_Name = nfts[i].Name
                    } else if (nfts[i].Id === Number(nftEQ.hatId)) {
                        nftEQ_7 = nfts[i].Image
                        nftEQ_7_Name = nfts[i].Name
                    }
                }
            }

            const allPow = address !== null && address !== undefined ? Number(nftEQ.allPow) : 0
            const isStaked = address !== null && address !== undefined ? nftEQ.isStaked : null

            const c_nftEQ = await readContract({
                address: dunJasper,
                abi: dunJasperABI,
                functionName: 'nftEquip',
                args: [challenger[challengerSlot]],
            })

            let c_nftEQ_1 = null
            let c_nftEQ_2_Img = null
            let c_nftEQ_2_Name = null
            let c_nftEQ_3 = null
            let c_nftEQ_4 = null
            let c_nftEQ_5 = null
            let c_nftEQ_5_Name = null
            let c_nftEQ_6 = null
            let c_nftEQ_6_Name = null
            let c_nftEQ_7 = null
            let c_nftEQ_7_Name = null
            for (let i = 0; i <= nfts.length - 1; i++) {
                if (challengerstake.length > 0) {
                    if (nfts[i].Id === Number(c_nftEQ.characterId)) {
                        c_nftEQ_1 = nfts[i].Image
                    } else if (nfts[i].Id === Number(c_nftEQ.accessoriesId)) {
                        c_nftEQ_2_Img = nfts[i].Image
                        c_nftEQ_2_Name = nfts[i].Name
                    } else if (nfts[i].Id === Number(c_nftEQ.backId)) {
                        c_nftEQ_3 = nfts[i].Image
                    } else if (nfts[i].Id === Number(c_nftEQ.shoesId)) {
                        c_nftEQ_4 = nfts[i].Image
                    } else if (nfts[i].Id === Number(c_nftEQ.weaponId)) {
                        c_nftEQ_5 = nfts[i].Image
                        c_nftEQ_5_Name = nfts[i].Name
                    } else if (nfts[i].Id === Number(c_nftEQ.clothId)) {
                        c_nftEQ_6 = nfts[i].Image
                        c_nftEQ_6_Name = nfts[i].Name
                    } else if (nfts[i].Id === Number(c_nftEQ.hatId)) {
                        c_nftEQ_7 = nfts[i].Image
                        c_nftEQ_7_Name = nfts[i].Name
                    }
                }
            }

            const c_allPow = Number(c_nftEQ.allPow)
            const c_isStaked = c_nftEQ.isStaked

            return [
                nftEQ_1, nftEQ_2_Img, nftEQ_2_Name, nftEQ_3, nftEQ_4, nftEQ_5, nftEQ_5_Name, nftEQ_6, nftEQ_6_Name, nftEQ_7, nftEQ_7_Name, allPow, isStaked,
                c_nftEQ_1, c_nftEQ_2_Img, c_nftEQ_2_Name, c_nftEQ_3, c_nftEQ_4, c_nftEQ_5, c_nftEQ_5_Name, c_nftEQ_6, c_nftEQ_6_Name, c_nftEQ_7, c_nftEQ_7_Name, c_allPow, c_isStaked,
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
            setCharacterSlot(result[0])
            setAccSlot(result[1])
            result[2] !== null && Number(result[2].slice(-1)) > 0 ? setAccSlotLevel(result[2].slice(-1)) : setAccSlotLevel(null)
            setBackSlot(result[3])
            setShoesSlot(result[4])
            setWeaponSlot(result[5])
            result[6] !== null && Number(result[6].slice(-1)) > 0 ? setWpSlotLevel(result[6].slice(-1)) : setWpSlotLevel(null)
            setClothSlot(result[7])
            result[8] !== null && Number(result[8].slice(-1)) > 0 ? setClothSlotLevel(result[8].slice(-1)) : setClothSlotLevel(null)
            setHatSlot(result[9])
            result[10] !== null && Number(result[10].slice(-1)) > 0 ? setHatSlotLevel(result[10].slice(-1)) : setHatSlotLevel(null)
            setAllPower(result[11])
            setIsStakeNow(result[12])

            setCharacterSlotC(result[13])
            setAccSlotC(result[14])
            result[15] !== null && Number(result[15].slice(-1)) > 0 ? setAccSlotLevelC(result[15].slice(-1)) : setAccSlotLevelC(null)
            setBackSlotC(result[16])
            setShoesSlotC(result[17])
            setWeaponSlotC(result[18])
            result[19] !== null && Number(result[19].slice(-1)) > 0 ? setWpSlotLevelC(result[19].slice(-1)) : setWpSlotLevelC(null)
            setClothSlotC(result[20])
            result[21] !== null && Number(result[21].slice(-1)) > 0 ? setClothSlotLevelC(result[21].slice(-1)) : setClothSlotLevelC(null)
            setHatSlotC(result[22])
            result[23] !== null && Number(result[23].slice(-1)) > 0 ? setHatSlotLevelC(result[23].slice(-1)) : setHatSlotLevelC(null)
            setAllPowerC(result[24])
            setIsStakeNowC(result[25])
        })

    }, [address, txupdate, challengerSlot, erc20ABI, dunJasperABI])

    const oneHit = () => {
        const random1 = Math.floor(Math.random() * 10)
        const random2 = Math.floor(Math.random() * 10)
        setYourDamage(allPower * random1)
        setPeerDamage(allPowerC * random2)
        if (allPower * random1 > allPowerC * random2) {
            console.log("You win", allPower * random1, "vs.",  allPowerC * random2)
            setIsWin("You win 🎉")
            setYourWin(yourWin + 1)
        } else if (allPower * random1 < allPowerC * random2) {
            console.log("Opponent win", allPowerC * random2, "vs.",  allPower * random1)
            setIsWin("You lose 😂")
            setPeerWin(peerWin + 1)
        } else if (allPower * random1 === allPowerC * random2) {
            console.log("TIE", allPowerC * random2, "vs.",  allPower * random1)
            setIsWin("Tie 🤝")
        }
    }

    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('/../background/dungeonbg.png')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "95px", color: "#fff", width: "fit-content"}}>Dungeon Arena</div>
                <div style={{fontSize: "22.5px", color: "#fff", width: "fit-content", marginTop: "30px"}} className="pixel">PVP mode is now in Dungeon!</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="../background/dungeonlogo.png" width="200" alt="Dungeon_Logo" />
            </div>
        </div>

        <div style={{margin: "0", padding: "75px 0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
            <div style={{width: "40%", display: "flex", flexDirection: "column", justifyContent: "flex-start", overflow: "scroll"}} className="pixel mainprofile">
                <div className="pixel" style={{fontSize: "22.5px", width: "fit-content", marginBottom: "20px"}}>Challengers In Dungeon [Display only Hermes role+]</div>
                <div style={{backgroundColor: "rgb(39, 56, 82)", justifyContent: "space-around", padding: "20px 0", width: "600px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">                    
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {hatSlotC !== null ?
                            <img src={hatSlotC} width="100px" alt="Can not load metadata."></img> :
                            <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                        {hatSlotLevelC !== null ?
                            <div style={{position: "absolute", top: "85px", right: "30px", padding: "2px", fontSize: "25px"}}>+{hatSlotLevelC}</div> :
                            <></>
                        }
                        {clothSlotC !== null ?
                            <img src={clothSlotC} width="100px" alt="Can not load metadata."></img> :
                            <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                        {clothSlotLevelC !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "30px", padding: "2px", fontSize: "25px"}}>+{clothSlotLevelC}</div> :
                            <></>
                        }
                        {shoesSlotC !== null ?
                            <img src={shoesSlotC} width="100px" alt="Can not load metadata."></img> :
                            <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                    </div>
                    <div style={{color: "#fff", width: "300px", height: "fit-content", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                        <div style={{width: "100%", marginBottom: "10px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>{challenger[challengerSlot].slice(0, 4) + "..." + challenger[challengerSlot].slice(-4)}</div>
                            {isStakeNowC ?
                                <div style={{display: "flex", flexDirection: "row"}} >
                                    <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                    <div>Ready to Fight</div>
                                </div> :
                                <div style={{display: "flex", flexDirection: "row"}} className="emp">
                                    <div style={{backgroundColor: "red", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                    <div>Sleeping zZZ</div>
                                </div>
                            }
                        </div>
                        {characterSlotC !== null ?
                            <img src={characterSlotC} width="250px" alt="Can not load metadata."></img> :
                            <div style={{width: "250px", height: "250px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                        <div style={{width: "80%", margin: "10px 0 5px 0", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>WIN: <div>{peerWin}</div></div>
                        <div style={{width: "80%", margin: "5px 0", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>ATK: <div>{allPowerC * 1} - {allPowerC * 9}</div></div>
                        <div style={{width: "80%", margin: "5px 0", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>BOUNTY: <div>Testing</div></div>
                        <div style={{width: "80%", margin: "5px 0 10px 0", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>AVAILABLE CHALLENGE: <div>Testing</div></div>
                        {isStakeNow && isStakeNowC ?
                            <div style={{alignSelf: "center", background: "#007aff"}} className="button" onClick={oneHit}>ONE-HIT CHALLENGE!</div> :
                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">ONE-HIT CHALLENGE!</div>
                        }
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {accSlotC !== null ?
                            <img src={accSlotC} width="100px" alt="Can not load metadata."></img> :
                            <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                        {accSlotLevelC !== null ?
                            <div style={{position: "absolute", top: "85px", right: "30px", padding: "2px", fontSize: "25px"}}>+{accSlotLevelC}</div> :
                            <></>
                        }
                        {backSlotC !== null ?
                            <img src={backSlotC} width="100px" alt="Can not load metadata."></img> :
                            <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                        {weaponSlotC !== null ?
                            <img src={weaponSlotC} width="100px" alt="Can not load metadata."></img> :
                            <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                        {wpSlotLevelC !== null ?
                            <div style={{position: "absolute", top: "385px", right: "30px", padding: "2px", fontSize: "25px"}}>+{wpSlotLevelC}</div> :
                            <></>
                        }
                    </div>
                </div>
                <div style={{justifyContent: "space-around", padding: "10px 0", width: "600px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap", boxShadow: "none"}} className="nftCard">
                    <div className="emp">Lasted Battle</div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div>Your Damage</div>
                        <div style={{fontSize: "24px"}}>{yourDamage}</div>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div>Opponent Damage</div>
                        <div style={{fontSize: "24px"}}>{peerDamage}</div>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div>Result</div>
                        <div style={{fontSize: "24px"}}>{isWin === null ? "-" : isWin}</div>
                    </div>
                </div>
                <div style={{alignSelf: "flex-start", marginTop: "20px"}} className="button" onClick={() => {challengerSlot !== 9 ? setChallengerSlot(challengerSlot + 1) : setChallengerSlot(0)}}>NEXT CHALLENGER</div>
            </div>
            
            <div style={{width: "40%", display: "flex", flexDirection: "column", justifyContent: "flex-start", overflow: "scroll"}} className="pixel mainprofile">
                <div className="pixel" style={{fontSize: "22.5px", width: "fit-content", marginBottom: "20px"}}>Your Challenger</div>
                <div style={{justifyContent: "space-around", padding: "20px 0", width: "600px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap", boxShadow: "none"}} className="nftCard">                    
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {hatSlot !== null ?
                            <img src={hatSlot} width="100px" alt="Can not load metadata."></img> :
                            <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                        {hatSlotLevel !== null ?
                            <div style={{position: "absolute", top: "85px", right: "30px", padding: "2px", fontSize: "25px"}}>+{hatSlotLevel}</div> :
                            <></>
                        }
                        {clothSlot !== null ?
                            <img src={clothSlot} width="100px" alt="Can not load metadata."></img> :
                            <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                        {clothSlotLevel !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "30px", padding: "2px", fontSize: "25px"}}>+{clothSlotLevel}</div> :
                            <></>
                        }
                        {shoesSlot !== null ?
                            <img src={shoesSlot} width="100px" alt="Can not load metadata."></img> :
                            <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                    </div>
                    <div style={{width: "300px", height: "fit-content", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                        <div style={{width: "100%", marginBottom: "10px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div>
                            {isStakeNow ?
                                <div style={{display: "flex", flexDirection: "row"}} >
                                    <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                    <div>Ready to Fight</div>
                                </div> :
                                <div style={{display: "flex", flexDirection: "row"}} className="emp">
                                    <div style={{backgroundColor: "red", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                    <div>Sleeping zZZ</div>
                                </div>
                            }
                        </div>
                        {characterSlot !== null ?
                            <img src={characterSlot} width="250px" alt="Can not load metadata."></img> :
                            <div style={{width: "250px", height: "250px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                        <div style={{width: "80%", margin: "10px 0 5px 0", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>WIN: <div>{yourWin}</div></div>
                        <div style={{width: "80%", marginTop: "5px 0 10px 0", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>ATK: <div>{allPower * 1} - {allPower * 9}</div></div>
                        <div style={{width: "80%", height: "100px"}}></div>
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {accSlot !== null ?
                            <img src={accSlot} width="100px" alt="Can not load metadata."></img> :
                            <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                        {accSlotLevel !== null ?
                            <div style={{position: "absolute", top: "85px", right: "30px", padding: "2px", fontSize: "25px"}}>+{accSlotLevel}</div> :
                            <></>
                        }
                        {backSlot !== null ?
                            <img src={backSlot} width="100px" alt="Can not load metadata."></img> :
                            <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                        {weaponSlot !== null ?
                            <img src={weaponSlot} width="100px" alt="Can not load metadata."></img> :
                            <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                        {wpSlotLevel !== null ?
                            <div style={{position: "absolute", top: "385px", right: "30px", padding: "2px", fontSize: "25px"}}>+{wpSlotLevel}</div> :
                            <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default DungeonArena
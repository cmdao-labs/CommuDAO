import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useContractEvent, useAccount } from 'wagmi'
import { Oval, ThreeDots } from 'react-loading-icons'

const hexajibjib = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const dunJasper = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const jdao = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'
const questAmbass = '0x467eF538C90434D4F69cF8A8F40cd71a96e8424e'
const pvp01 = '0x11af8eD1783Be1a0Eb6Da5C3Bc11Fb5Cc29C9463'

const salonRouter = '0x76B6B24BA53042A0e02Cc0e84c875d74EAeFb74a'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const DungeonArena = ({ navigate, setisLoading, txupdate, setTxupdate, erc20ABI, erc721ABI, questAmbassABI, dunJasperABI, pvp01ABI, salonABI }) => {    
    const { address } = useAccount()
    useContractEvent({
        address: pvp01,
        abi: pvp01ABI,
        eventName: 'Fight',
        listener(cha1, cha2, cmpow1, cmpow2, rand1, rand2) {
            console.log("CHA1:" + cha1, "CHA2:" + cha2, "CMPOW1:" + Number(cmpow1), "CMPOW2:" + Number(cmpow2), "RAND1:" + Number(rand1), "RAND2:" + Number(rand2))
            if (cha1.toUpperCase() === address.toUpperCase()) {
                setYourDamage((Number(cmpow1) * rand1) + " (" + rand1 + "x)")
                setPeerDamage((Number(cmpow2) * rand2) + " (" + rand2 + "x)")
                if (Number(cmpow1) * rand1 > Number(cmpow2) * rand2) {
                    setIsWin("You win 🎉")
                    setYourWin(yourWin + 1)
                } else if (Number(cmpow1) * rand1 < Number(cmpow2) * rand2) {
                    setIsWin("You lose 😂")
                    setPeerWin(peerWin + 1)
                } else if (Number(cmpow1) * rand1 === Number(cmpow2) * rand2) {
                    setIsWin("Tie 🤝")
                }
            }
        },
    })

    const [characterSlot, setCharacterSlot] = React.useState(null)
    const [charSlotLevel, setCharSlotLevel] = React.useState(null)
    const [skinSlot1, setSkinSlot1] = React.useState(null)
    const [hatSlot, setHatSlot] = React.useState(null)
    const [hatSlotLevel, setHatSlotLevel] = React.useState(null)
    const [clothSlot, setClothSlot] = React.useState(null)
    const [clothSlotLevel, setClothSlotLevel] = React.useState(null)
    const [accSlot, setAccSlot] = React.useState(null)
    const [accSlotLevel, setAccSlotLevel] = React.useState(null)
    const [backSlot, setBackSlot] = React.useState(null)
    const [backSlotLevel, setBackSlotLevel] = React.useState(null)
    const [shoesSlot, setShoesSlot] = React.useState(null)
    const [shoesSlotLevel, setShoesSlotLevel] = React.useState(null)
    const [weaponSlot, setWeaponSlot] = React.useState(null)
    const [wpSlotLevel, setWpSlotLevel] = React.useState(null)

    const [allPower, setAllPower] = React.useState(0)
    const [isStakeNow, setIsStakeNow] = React.useState(null)

    const [challenger, setChallenger] = React.useState([])
    const [challengerSlot, setChallengerSlot] = React.useState(0)

    const [characterSlotC, setCharacterSlotC] = React.useState(null)
    const [charSlotLevelC, setCharSlotLevelC] = React.useState(null)
    const [skinSlot1C, setSkinSlot1C] = React.useState(null)
    const [hatSlotC, setHatSlotC] = React.useState(null)
    const [hatSlotLevelC, setHatSlotLevelC] = React.useState(null)
    const [clothSlotC, setClothSlotC] = React.useState(null)
    const [clothSlotLevelC, setClothSlotLevelC] = React.useState(null)
    const [accSlotC, setAccSlotC] = React.useState(null)
    const [accSlotLevelC, setAccSlotLevelC] = React.useState(null)
    const [backSlotC, setBackSlotC] = React.useState(null)
    const [backSlotLevelC, setBackSlotLevelC] = React.useState(null)
    const [shoesSlotC, setShoesSlotC] = React.useState(null)
    const [shoesSlotLevelC, setShoesSlotLevelC] = React.useState(null)
    const [weaponSlotC, setWeaponSlotC] = React.useState(null)
    const [wpSlotLevelC, setWpSlotLevelC] = React.useState(null)

    const [allPowerC, setAllPowerC] = React.useState(0)
    const [isStakeNowC, setIsStakeNowC] = React.useState(null)

    const [bounty, setBounty] = React.useState(0)
    const [bountyC, setBountyC] = React.useState(0)

    const [yourDamage, setYourDamage] = React.useState(0)
    const [peerDamage, setPeerDamage] = React.useState(0)
    const [isWin, setIsWin] = React.useState(null)
    const [yourWin, setYourWin] = React.useState(0)
    const [peerWin, setPeerWin] = React.useState(0)

    const [jdaoBalance, setJdaoBalance] = React.useState(0)
    const [battleHx, setBattleHx] = React.useState([])

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const pvpSC = new ethers.Contract(pvp01, pvp01ABI, providerJBC)

        const thefetch = async () => {
            const data0 = await readContract({
                address: questAmbass,
                abi: questAmbassABI,
                functionName: 'registCount',
            })
            const rankerDummy = []
            for (let i = 1; i <= Number(data0); i++) {
                rankerDummy.push(null)
            }
            const data00 = await readContracts({
                contracts: rankerDummy.map((item, i) => (
                    {
                        address: questAmbass,
                        abi: questAmbassABI,
                        functionName: 'referalData',
                        args: [i+1]
                    }
                ))
            })
            let _challenger = []
            for (let i = 0; i <= data00.length - 1; i++) {
                _challenger.push(data00[i].result[0])
            }

            for (let i = _challenger.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = _challenger[i];
                _challenger[i] = _challenger[j];
                _challenger[j] = temp;
            }

            const block = await providerJBC.getBlockNumber()
            const pvpFilter = await pvpSC.filters.Fight(null, null, null, null, null, null)
            const pvpEvent = await pvpSC.queryFilter(pvpFilter, block - 17280, "latest")
            const pvpMap = await Promise.all(pvpEvent.map(async (obj) => {
                return {blockNum: Number(obj.blockNumber), cha1: String(obj.args.challenger1), cha2: String(obj.args.challenger2), cmpow1: Number(obj.args.cmpow1), cmpow2: Number(obj.args.cmpow2), rand1: Number(obj.args.random1), rand2: Number(obj.args.random2)}
            }))
            const pvpRemove = pvpMap.filter((obj) => {return String(obj.cha1).toUpperCase() !== String(obj.cha2).toUpperCase()})
            if (pvpRemove.length === 0) { pvpRemove.push(null) }

            const nftEQ = address !== null && address !== undefined ? await readContract({
                address: dunJasper,
                abi: dunJasperABI,
                functionName: 'nftEquip',
                args: [address],
            }) : [{characterId: 0, hatId: 0, clothId: 0, accessoriesId: 0, backId: 0, shoesId: 0, weaponId: 0, allPow: 0, refuelAt: 0, isStaked: null}]

            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[0])],
                    },
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[3])],
                    },
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[4])],
                    },
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[5])],
                    },
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[6])],
                    },
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[2])],
                    },
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[1])],
                    },
                    {
                        address: jdao,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: pvp01,
                        abi: pvp01ABI,
                        functionName: 'userInfo',
                        args: [address],
                    },
                    {
                        address: salonRouter,
                        abi: salonABI,
                        functionName: 'skin',
                        args: [address, 1],
                    }, 
                ],
            }) : [null, null, null, null, null, null, null, 0, {bountyAmount: 0, win: 0}, null, ]

            const response1 = data[0].status === 'success' ? await fetch(data[0].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            const nft1 = response1 !== null ? await response1.json() : {image: null, name: null}
            const nftEQ_1 = nft1.image !== null ? nft1.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_1_Name = nft1.name

            const response2 = data[1].status === 'success' ? await fetch(data[1].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            const nft2 = response2 !== null ? await response2.json() : {image: null, name: null}
            const nftEQ_2_Img = nft2.image !== null ? nft2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_2_Name = nft2.name
            
            const response3 = data[2].status === 'success' ? await fetch(data[2].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            const nft3 = response3 !== null ? await response3.json() : {image: null, name: null}
            const nftEQ_3 = nft3.image !== null ? nft3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_3_Name = nft3.name

            const response4 = data[3].status === 'success' ? await fetch(data[3].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            const nft4 = response4 !== null ? await response4.json() : {image: null, name: null}
            const nftEQ_4 = nft4.image !== null ? nft4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_4_Name = nft4.name

            const response5 = data[4].status === 'success' ? await fetch(data[4].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            const nft5 = response5 !== null ? await response5.json() : {image: null, name: null}
            const nftEQ_5 = nft5.image !== null ? nft5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_5_Name = nft5.name

            const response6 = data[5].status === 'success' ? await fetch(data[5].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            const nft6 = response6 !== null ? await response6.json() : {image: null, name: null}
            const nftEQ_6 = nft6.image !== null ? nft6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_6_Name = nft6.name

            const response7 = data[6].status === 'success' ? await fetch(data[6].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            const nft7 = response7 !== null ? await response7.json() : {image: null, name: null}
            const nftEQ_7 = nft7.image !== null ? nft7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_7_Name = nft7.name

            const pvpStat = data[8].result
            const allPow = Number(nftEQ[7])
            const isStaked = nftEQ[9]
            const jdaoBal = data[7].result
            const skin1 = data[9].result

            return [
                nftEQ_1, nftEQ_1_Name, nftEQ_2_Img, nftEQ_2_Name, nftEQ_3, nftEQ_3_Name, nftEQ_4, nftEQ_4_Name, nftEQ_5, nftEQ_5_Name, nftEQ_6, nftEQ_6_Name, nftEQ_7, nftEQ_7_Name, pvpStat, allPow, isStaked,
                _challenger, jdaoBal, pvpRemove.slice(-15, ).reverse(), skin1, 
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
            if (result[1] !== null && result[1].slice(-1) === "]" && result[1].slice(-3, -2) === ".") {
                setCharSlotLevel(result[1].slice(-2, -1))
            } else if (result[1] !== null && result[1].slice(-1) === "]" && result[1].slice(-4, -3) === ".") {
                setCharSlotLevel(result[1].slice(-3, -1))
            } else {
                setCharSlotLevel(null)
            }
            setAccSlot(result[2])
            result[3] !== null && result[3].slice(-2, -1) === "+" ? setAccSlotLevel(result[3].slice(-1)) : setAccSlotLevel(null)
            setBackSlot(result[4])
            result[5] !== null && result[5].slice(-2, -1) === "+" ? setBackSlotLevel(result[5].slice(-1)) : setBackSlotLevel(null)
            setShoesSlot(result[6])
            result[7] !== null && result[7].slice(-2, -1) === "+" ? setShoesSlotLevel(result[7].slice(-1)) : setShoesSlotLevel(null)
            setWeaponSlot(result[8])
            result[9] !== null && result[9].slice(-2, -1) === "+" ? setWpSlotLevel(result[9].slice(-1)) : setWpSlotLevel(null)
            setClothSlot(result[10])
            result[11] !== null && result[11].slice(-2, -1) === "+" ? setClothSlotLevel(result[11].slice(-1)) : setClothSlotLevel(null)
            setHatSlot(result[12])
            result[13] !== null && result[13].slice(-2, -1) === "+" ? setHatSlotLevel(result[13].slice(-1)) : setHatSlotLevel(null)
            setBounty(Number(result[14][0]))
            setYourWin(Number(result[14][1]))
            setAllPower(result[15])
            setIsStakeNow(result[16])

            setChallenger(result[17])

            setJdaoBalance(ethers.utils.formatEther(String(result[18])))
            setBattleHx(result[19])
            setSkinSlot1(result[20])
        })

    }, [address, txupdate, erc20ABI, erc721ABI, questAmbassABI, dunJasperABI, pvp01ABI, salonABI])

    React.useEffect(() => {
        if (challenger[0] !== undefined) {
            setPeerWin(0)
            setAllPowerC(0)
            setIsStakeNowC(null)
            setCharacterSlotC(null)
            setCharSlotLevelC(null)
            setSkinSlot1C(null)
            setHatSlotC(null)
            setHatSlotLevelC(null)
            setClothSlotC(null)
            setClothSlotLevelC(null)
            setAccSlotC(null)
            setAccSlotLevelC(null)
            setBackSlotC(null)
            setBackSlotLevelC(null)
            setShoesSlotC(null)
            setShoesSlotLevelC(null)
            setWeaponSlotC(null)
            setWpSlotLevelC(null)

            const thefetch = async () => {
                const data2 = await readContracts({
                    contracts: [
                        {
                            address: dunJasper,
                            abi: dunJasperABI,
                            functionName: 'nftEquip',
                            args: [challenger[challengerSlot]],
                        },
                        {
                            address: pvp01,
                            abi: pvp01ABI,
                            functionName: 'userInfo',
                            args: [challenger[challengerSlot]],
                        },
                        {
                            address: salonRouter,
                            abi: salonABI,
                            functionName: 'skin',
                            args: [challenger[challengerSlot], 1],
                        }, 
                    ],
                })

                const c_nftEQ = data2[0].result
                const c_pvpStat = data2[1].result
                const c_skin1 = data2[2].result

                const data3 = await readContracts({
                    contracts: [
                        {
                            address: hexajibjib,
                            abi: erc721ABI,
                            functionName: 'tokenURI',
                            args: [Number(c_nftEQ[0])],
                        },
                        {
                            address: hexajibjib,
                            abi: erc721ABI,
                            functionName: 'tokenURI',
                            args: [Number(c_nftEQ[3])],
                        },
                        {
                            address: hexajibjib,
                            abi: erc721ABI,
                            functionName: 'tokenURI',
                            args: [Number(c_nftEQ[4])],
                        },
                        {
                            address: hexajibjib,
                            abi: erc721ABI,
                            functionName: 'tokenURI',
                            args: [Number(c_nftEQ[5])],
                        },
                        {
                            address: hexajibjib,
                            abi: erc721ABI,
                            functionName: 'tokenURI',
                            args: [Number(c_nftEQ[6])],
                        },
                        {
                            address: hexajibjib,
                            abi: erc721ABI,
                            functionName: 'tokenURI',
                            args: [Number(c_nftEQ[2])],
                        },
                        {
                            address: hexajibjib,
                            abi: erc721ABI,
                            functionName: 'tokenURI',
                            args: [Number(c_nftEQ[1])],
                        }
                    ],
                })
                
                const c_response1 = data3[0].status === 'success' ? await fetch(data3[0].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
                const c_nft1 = c_response1 !== null ? await c_response1.json() : {image: null, name: null}
                const c_nftEQ_1 = c_nft1.image !== null ? c_nft1.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
                const c_nftEQ_1_Name = c_nft1.name

                const c_response2 = data3[1].status === 'success' ? await fetch(data3[1].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
                const c_nft2 = c_response2 !== null ? await c_response2.json() : {image: null, name: null}
                const c_nftEQ_2_Img = c_nft2.image !== null ? c_nft2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
                const c_nftEQ_2_Name = c_nft2.name
                
                const c_response3 = data3[2].status === 'success' ? await fetch(data3[2].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
                const c_nft3 = c_response3 !== null ? await c_response3.json() : {image: null, name: null}
                const c_nftEQ_3 = c_nft3.image !== null ? c_nft3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
                const c_nftEQ_3_Name = c_nft3.name

                const c_response4 = data3[3].status === 'success' ? await fetch(data3[3].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
                const c_nft4 = c_response4 !== null ? await c_response4.json() : {image: null, name: null}
                const c_nftEQ_4 = c_nft4.image !== null ? c_nft4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
                const c_nftEQ_4_Name = c_nft4.name

                const c_response5 = data3[4].status === 'success' ? await fetch(data3[4].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
                const c_nft5 = c_response5 !== null ? await c_response5.json() : {image: null, name: null}
                const c_nftEQ_5 = c_nft5.image !== null ? c_nft5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
                const c_nftEQ_5_Name = c_nft5.name

                const c_response6 = data3[5].status === 'success' ? await fetch(data3[5].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
                const c_nft6 = c_response6 !== null ? await c_response6.json() : {image: null, name: null}
                const c_nftEQ_6 = c_nft6.image !== null ? c_nft6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
                const c_nftEQ_6_Name = c_nft6.name

                const c_response7 = data3[6].status === 'success' ? await fetch(data3[6].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
                const c_nft7 = c_response7 !== null ? await c_response7.json() : {image: null, name: null}
                const c_nftEQ_7 = c_nft7.image !== null ? c_nft7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
                const c_nftEQ_7_Name = c_nft7.name

                const c_allPow = Number(c_nftEQ[7])
                const c_isStaked = c_nftEQ[9]

                return [
                    c_nftEQ_1, c_nftEQ_1_Name, c_nftEQ_2_Img, c_nftEQ_2_Name, c_nftEQ_3, c_nftEQ_3_Name, c_nftEQ_4, c_nftEQ_4_Name, c_nftEQ_5, c_nftEQ_5_Name, c_nftEQ_6, c_nftEQ_6_Name, c_nftEQ_7, c_nftEQ_7_Name, c_allPow, c_isStaked,
                    c_pvpStat, c_skin1, 
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
                setCharacterSlotC(result[0])
                if (result[1] !== null && result[1].slice(-1) === "]" && result[1].slice(-3, -2) === ".") {
                    setCharSlotLevelC(result[1].slice(-2, -1))
                } else if (result[1] !== null && result[1].slice(-1) === "]" && result[1].slice(-4, -3) === ".") {
                    setCharSlotLevelC(result[1].slice(-3, -1))
                } else {
                    setCharSlotLevelC(null)
                }
                setAccSlotC(result[2])
                result[3] !== null && result[3].slice(-2, -1) === "+" ? setAccSlotLevelC(result[3].slice(-1)) : setAccSlotLevelC(null)
                setBackSlotC(result[4])
                result[5] !== null && result[5].slice(-2, -1) === "+" ? setBackSlotLevelC(result[5].slice(-1)) : setBackSlotLevelC(null)
                setShoesSlotC(result[6])
                result[7] !== null && result[7].slice(-2, -1) === "+" ? setShoesSlotLevelC(result[7].slice(-1)) : setShoesSlotLevelC(null)
                setWeaponSlotC(result[8])
                result[9] !== null && result[9].slice(-2, -1) === "+" ? setWpSlotLevelC(result[9].slice(-1)) : setWpSlotLevelC(null)
                setClothSlotC(result[10])
                result[11] !== null && result[11].slice(-2, -1) === "+" ? setClothSlotLevelC(result[11].slice(-1)) : setClothSlotLevelC(null)
                setHatSlotC(result[12])
                result[13] !== null && result[13].slice(-2, -1) === "+" ? setHatSlotLevelC(result[13].slice(-1)) : setHatSlotLevelC(null)
                setAllPowerC(result[14])
                setIsStakeNowC(result[15])

                setBountyC(Number(result[16][0]))
                setPeerWin(Number(result[16][1]))

                setSkinSlot1C(result[17])
            })
        }
    }, [address, txupdate, challenger, challengerSlot, erc721ABI, dunJasperABI, pvp01ABI, salonABI])

    const oneHit = async () => {
        setisLoading(true)
        try {
            const bountyAllow = await readContract({
                address: jdao,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, pvp01],
            })
            if (bountyAllow < (10 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jdao,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [pvp01, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: pvp01,
                abi: pvp01ABI,
                functionName: 'fight',
                args: [challenger[challengerSlot]],
                gas: 3000000,
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const addBounty = async () => {
        setisLoading(true)
        try {
            const bountyAllow = await readContract({
                address: jdao,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, pvp01],
            })
            if (bountyAllow < (10 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jdao,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [pvp01, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: pvp01,
                abi: pvp01ABI,
                functionName: 'challenge',
                args: [1]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }
    const withdrawBounty = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: pvp01,
                abi: pvp01ABI,
                functionName: 'fight',
                args: [address],
                gas: 3000000,
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const nextChallenger = async (_index) => {
        setisLoading(true)
        for (let i = _index; i <= challenger.length; i++) {
            if (i === challenger.length) {
                setChallengerSlot(0)
                break
            } else {
                setChallengerSlot(i)
                const data = await readContracts({
                    contracts: [
                        {
                            address: dunJasper,
                            abi: dunJasperABI,
                            functionName: 'nftEquip',
                            args: [challenger[i]],
                        },
                        {
                            address: pvp01,
                            abi: pvp01ABI,
                            functionName: 'userInfo',
                            args: [challenger[i]],
                        }
                    ],
                })
                const c_nftEQ = data[0].result
                const c_pvpStat = data[1].result

                if (c_nftEQ[9] && Number(c_pvpStat[0]) !== 0) {
                    setChallengerSlot(i)
                    break
                }
            }
        }
        setisLoading(false)
    }

    return (
    <>
        <div className="fieldBanner" style={{background: "#2b2268", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "75px", color: "#fff", width: "fit-content"}}>Dungeon Arena</div>
                <div style={{fontSize: "17px", color: "#fff", width: "fit-content", marginTop: "30px"}} className="pixel"></div>
            </div>
            <div style={{margin: "30px 100px"}}>
            </div>
        </div>

        <div style={{background: "rgb(0, 19, 33)", margin: "0", padding: "75px 0", minHeight: "inherit", flexFlow: "row wrap", alignItems: "flex-start", justifyContent: "flex-start", overflow: "scroll"}} className="collection noscroll">
            <div style={{background: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(20px)", margin: "50px", padding: "25px 50px", border: "none", minWidth: "880px", width: "55%", height: "400px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                <div style={{fontSize: "22.5px", color: "#fff", marginBottom: "30px"}} className="pixel">Battle Logs [3 days ago]</div>
                {battleHx.length > 0 ?
                    <>
                        {battleHx[0] !== null &&
                            <>
                                {battleHx.map((item, index) => (
                                    <div style={{width: "750px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}} key={index}>
                                        <div style={{width: "700px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                            <div>Block.{item.blockNum}</div>
                                            <div style={{width: "240px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                                <a style={{textDecoration: "none", color: "#fff"}} href={"https://commudao.xyz/dungeon/jasper-cave/" + item.cha1} target="_blank" rel="noreferrer"><div className="bold">{(item.cmpow1 * item.rand1) > (item.cmpow2 * item.rand2) ? <>👑</> : <></>} {item.cha1.slice(0, 4) + "..." + item.cha1.slice(-4)}</div></a>
                                                <div className="emp bold">{item.cmpow1 * item.rand1} (X{item.rand1})</div>
                                            </div>
                                            <div>VS.</div>
                                            <div style={{width: "240px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                                <a style={{textDecoration: "none", color: "#fff"}} href={"https://commudao.xyz/dungeon/jasper-cave/" + item.cha2} target="_blank" rel="noreferrer"><div className="bold">{(item.cmpow2 * item.rand2) > (item.cmpow1 * item.rand1) ? <>👑</> : <></>} {item.cha2.slice(0, 4) + "..." + item.cha2.slice(-4)}</div></a>
                                                <div className="emp bold">{item.cmpow2 * item.rand2} (X{item.rand2})</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    </> :
                    <Oval stroke="#ff007a" strokeWidth="5px" />
                }
            </div>

            <div style={{width: "800px", marginLeft: "50px", display: "flex", flexDirection: "column", justifyContent: "flex-start", overflow: "scroll"}} className="pixel mainprofile">
                <div className="pixel" style={{fontSize: "22.5px", width: "fit-content", marginBottom: "20px"}}>KYC Challengers In Dungeon</div>
                <div style={{backgroundColor: "rgb(39, 56, 82)", border: "none", justifyContent: "space-around", padding: "20px 0", width: "600px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">                    
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {hatSlotC !== null ?
                            <img src={hatSlotC} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/hat.png" width="100px" alt="Hat_slot" />
                        }
                        {hatSlotLevelC !== null ?
                            <div style={{position: "absolute", top: "85px", right: "30px", padding: "2px", fontSize: "25px"}}>+{hatSlotLevelC}</div> :
                            <></>
                        }
                        {clothSlotC !== null ?
                            <img src={clothSlotC} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/cloth.png" width="100px" alt="Cloth_slot" />
                        }
                        {clothSlotLevelC !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "30px", padding: "2px", fontSize: "25px"}}>+{clothSlotLevelC}</div> :
                            <></>
                        }
                        {shoesSlotC !== null ?
                            <img src={shoesSlotC} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/shoes.png" width="100px" alt="Shoes_slot" />
                        }
                        {shoesSlotLevelC !== null ?
                            <div style={{position: "absolute", top: "385px", right: "30px", padding: "2px", fontSize: "25px"}}>+{shoesSlotLevelC}</div> :
                            <></>
                        }
                    </div>
                    <div style={{position: "relative", color: "#fff", width: "300px", height: "fit-content", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                        <div style={{width: "100%", marginBottom: "10px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>{challenger[0] !== undefined ? challenger[challengerSlot].slice(0, 4) + "..." + challenger[challengerSlot].slice(-4) : ""}</div>
                            {isStakeNowC !== null ?
                                <>
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
                                </> :
                                <div style={{width: "130px"}}></div>
                            }
                        </div>
                        {isStakeNowC !== null ?
                            <>
                                {characterSlotC !== null ?
                                    <>
                                        {Number(skinSlot1C) === 0 || (characterSlotC !== "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" && characterSlotC !== "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidr4uq5voosuz6v4hqhiempf4a36x5aq6i4uceym2xbje65o5mwia") ?
                                            <img src={characterSlotC} width="250px" alt="Can not load metadata." /> :
                                            <></>
                                        }
                                        {characterSlotC === "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" && Number(String(skinSlot1C).slice(0, 1)) === 1 ?
                                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibynd6gqsb7idmhy7xk5qx5cdzmayvns7gfj7dsvpfymg2kjjajtm" width="250px" alt="Can not load metadata." /> :
                                            <></>
                                        }
                                        {characterSlotC === "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidr4uq5voosuz6v4hqhiempf4a36x5aq6i4uceym2xbje65o5mwia" && Number(String(skinSlot1C).slice(0, 1)) === 1 ?
                                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif5fecf5rqrlixcxtpzplo7frtftt3yh2cmx6oca4l2jxuryjju2m" width="250px" alt="Can not load metadata." /> :
                                            <></>
                                        }
                                    </> :
                                    <div style={{width: "250px", height: "250px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                }
                            </> :
                            <div style={{width: "250px", height: "250px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <ThreeDots fill="#5f6476" />
                            </div>
                        }
                        {charSlotLevelC !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "40px", padding: "2px", fontSize: "25px"}} className="emp">Lv.{charSlotLevelC}</div> :
                            <></>
                        }
                        <div style={{width: "80%", margin: "10px 0 5px 0", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>WIN: <div>{peerWin}</div></div>
                        <div style={{width: "80%", margin: "5px 0", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>ATK: <div>{allPowerC * 1} - {allPowerC * 9}</div></div>
                        <div style={{width: "80%", margin: "5px 0", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>BOUNTY: <div style={{display: "flex", alignItems: "center"}}><img style={{marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/> {bountyC * 10}</div></div>
                        <div style={{width: "80%", margin: "5px 0 10px 0", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>AVAILABLE CHALLENGE: <div>{bountyC}</div></div>
                        {isStakeNow && isStakeNowC && bountyC !== 0 && Number(jdaoBalance) >= 10 && challenger[challengerSlot].toUpperCase() !== address.toUpperCase() ?
                            <div style={{alignSelf: "center", background: "#007aff"}} className="button" onClick={oneHit}>ONE-HIT CHALLENGE!</div> :
                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">ONE-HIT CHALLENGE!</div>
                        }
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {accSlotC !== null ?
                            <img src={accSlotC} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/accessories.png" width="100px" alt="Accessories_slot" />
                        }
                        {accSlotLevelC !== null ?
                            <div style={{position: "absolute", top: "85px", right: "30px", padding: "2px", fontSize: "25px"}}>+{accSlotLevelC}</div> :
                            <></>
                        }
                        {backSlotC !== null ?
                            <img src={backSlotC} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/back.png" width="100px" alt="Back_slot" />
                        }
                        {backSlotLevelC !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "30px", padding: "2px", fontSize: "25px"}}>+{backSlotLevelC}</div> :
                            <></>
                        }
                        {weaponSlotC !== null ?
                            <img src={weaponSlotC} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/weapon.png" width="100px" alt="Weapon_slot" />
                        }
                        {wpSlotLevelC !== null ?
                            <div style={{position: "absolute", top: "385px", right: "30px", padding: "2px", fontSize: "25px"}}>+{wpSlotLevelC}</div> :
                            <></>
                        }
                    </div>
                </div>
                <div style={{backgroundColor: "#1C2024", border: "none", color: "#fff", justifyContent: "space-around", padding: "10px 0", width: "600px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
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
                <div style={{width: "400px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <div style={{alignSelf: "flex-start", marginTop: "20px", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "#1C2024", border: "none", color: "#fff"}} className="button" onClick={() => {challengerSlot !== 0 ? setChallengerSlot(challengerSlot - 1) : setChallengerSlot(15)}}>BACK</div>
                    <div style={{alignSelf: "flex-start", marginTop: "20px", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "#1C2024", border: "none", color: "#fff"}} className="button" onClick={() => {challengerSlot !== challenger.length - 1 ? setChallengerSlot(challengerSlot + 1) : setChallengerSlot(0)}}>NEXT</div>
                    <div style={{alignSelf: "flex-start", marginTop: "20px", boxShadow: "inset -2px -2px 0px 0.25px #00000040"}} className="button" onClick={() => {challengerSlot !== challenger.length - 1 ? nextChallenger(challengerSlot + 1) : nextChallenger(0)}}>SEARCH-to-FIGHT</div>
                </div>
            </div>
            
            <div style={{width: "800px", marginLeft: "50px", display: "flex", flexDirection: "column", justifyContent: "flex-start", overflow: "scroll"}} className="pixel mainprofile">
                <div style={{marginTop: "65px", backgroundColor: "#1C2024", border: "none", color: "#fff", justifyContent: "space-around", padding: "20px 0", width: "600px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">                    
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {hatSlot !== null ?
                            <img src={hatSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/hat.png" width="100px" alt="Hat_slot" />
                        }
                        {hatSlotLevel !== null ?
                            <div style={{position: "absolute", top: "85px", right: "30px", padding: "2px", fontSize: "25px"}}>+{hatSlotLevel}</div> :
                            <></>
                        }
                        {clothSlot !== null ?
                            <img src={clothSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/cloth.png" width="100px" alt="Cloth_slot" />
                        }
                        {clothSlotLevel !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "30px", padding: "2px", fontSize: "25px"}}>+{clothSlotLevel}</div> :
                            <></>
                        }
                        {shoesSlot !== null ?
                            <img src={shoesSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/shoes.png" width="100px" alt="Shoes_slot" />
                        }
                        {shoesSlotLevel !== null ?
                            <div style={{position: "absolute", top: "385px", right: "30px", padding: "2px", fontSize: "25px"}}>+{shoesSlotLevel}</div> :
                            <></>
                        }
                    </div>
                    <div style={{position: "relative", width: "300px", height: "fit-content", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                        <div style={{width: "100%", marginBottom: "10px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>{address !== null && address !== undefined ? address.slice(0, 4) + "..." + address.slice(-4) : ""}</div>
                            {isStakeNow !== null ?
                                <>
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
                                </> :
                                <div style={{width: "130px"}}></div>
                            }
                        </div>
                        {isStakeNow !== null ?
                            <>
                                {characterSlot !== null ?
                                    <>
                                        {Number(skinSlot1) === 0 || (characterSlot !== "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" && characterSlot !== "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidr4uq5voosuz6v4hqhiempf4a36x5aq6i4uceym2xbje65o5mwia") ?
                                            <img src={characterSlot} width="250px" alt="Can not load metadata." /> :
                                            <></>
                                        }
                                        {characterSlot === "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" && Number(String(skinSlot1).slice(0, 1)) === 1 ?
                                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibynd6gqsb7idmhy7xk5qx5cdzmayvns7gfj7dsvpfymg2kjjajtm" width="250px" alt="Can not load metadata." /> :
                                            <></>
                                        }
                                        {characterSlot === "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidr4uq5voosuz6v4hqhiempf4a36x5aq6i4uceym2xbje65o5mwia" && Number(String(skinSlot1).slice(0, 1)) === 1 ?
                                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif5fecf5rqrlixcxtpzplo7frtftt3yh2cmx6oca4l2jxuryjju2m" width="250px" alt="Can not load metadata." /> :
                                            <></>
                                        }
                                    </> :
                                    <div style={{width: "250px", height: "250px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                }
                            </> :
                            <div style={{width: "250px", height: "250px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <ThreeDots fill="#5f6476" />
                            </div>
                        }
                        {charSlotLevel !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "40px", padding: "2px", fontSize: "25px"}} className="emp">Lv.{charSlotLevel}</div> :
                            <></>
                        }
                        <div style={{width: "80%", margin: "10px 0 5px 0", display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between"}}>WIN: <div>{yourWin}</div></div>
                        <div style={{width: "80%", marginTop: "5px 0 10px 0", display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between"}}>ATK: <div>{allPower * 1} - {allPower * 9}</div></div>
                        <div style={{width: "80%", margin: "5px 0", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>BOUNTY: <div style={{display: "flex", alignItems: "center"}}><img style={{marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/> {bounty * 10}</div></div>
                        <div style={{width: "80%", margin: "5px 0 10px 0", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>AVAILABLE CHALLENGE: <div>{bounty}</div></div>
                        {isStakeNow && Number(jdaoBalance) >= 10 && challenger.indexOf(address) > -1 ?
                                <div style={{alignSelf: "center", background: "#67BAA7", width: "220px"}} className="button" onClick={addBounty}>ADD 10 BOUNTY JDAO</div> :
                                <div style={{alignSelf: "center", background: "#e9eaeb", width: "220px", color: "#bdc2c4", cursor: "not-allowed"}} className="button">ADD 10 BOUNTY JDAO</div>
                        }     
                        {isStakeNow && bounty !== 0 && Number(jdaoBalance) >= 10 && challenger.indexOf(address) > -1 ?
                                <div style={{alignSelf: "center", margin: "10px 0", width: "220px"}} className="button" onClick={withdrawBounty}>SUICIDE (WITHDRAW JDAO)</div> :
                                <div style={{alignSelf: "center", margin: "10px 0", background: "#e9eaeb", width: "220px", color: "#bdc2c4", cursor: "not-allowed"}} className="button">SUICIDE (WITHDRAW JDAO)</div>
                        }             
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {accSlot !== null ?
                            <img src={accSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/accessories.png" width="100px" alt="Accessories_slot" />
                        }
                        {accSlotLevel !== null ?
                            <div style={{position: "absolute", top: "85px", right: "30px", padding: "2px", fontSize: "25px"}}>+{accSlotLevel}</div> :
                            <></>
                        }
                        {backSlot !== null ?
                            <img src={backSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/back.png" width="100px" alt="Back_slot" />
                        }
                        {backSlotLevel !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "30px", padding: "2px", fontSize: "25px"}}>+{backSlotLevel}</div> :
                            <></>
                        }
                        {weaponSlot !== null ?
                            <img src={weaponSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/weapon.png" width="100px" alt="Weapon_slot" />
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
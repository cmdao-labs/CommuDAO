import React from 'react'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { ThreeDots, Oval } from 'react-loading-icons'

const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const dunANGB = '0x59c1C2f5FA76DB933B97b7c54223129e2A398534'
const starLab = '0x7A7Bc613e93aD729141D4BbB94375b5aD19d0Cbf'

const acNft = '0x526A70be985EB234c3f2c4933aCB59F6EB595Ed7'
const acUpgrade = '0x58AE9c64F0367cAcE006438af2E9E889F69051c4'

const apDunNft = '0x853beB37aBAfA021818B9f66e5333E657Ceb29d0'
const uniEnchanter = '0x2A7F88d4eACD6dbE8C255B54F8015eF40F5cfDE2'

const cmdaoName = '0x9f3adB20430778f52C2f99c4FBed9637a49509F2'
const questAmbass = '0x467eF538C90434D4F69cF8A8F40cd71a96e8424e'
const vabagToken = '0x495d66c9Fd7c63807114d06802A48BdAA60a0426'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const ApInn = ({ setisLoading, txupdate, setTxupdate, acUpgradeABI, uniEnchanterABI, erc721ABI, erc20ABI, questAmbassABI, cmdaoNameABI, dunAngbABI }) => {
    const { address } = useAccount()

    const [nft, setNft] = React.useState([])
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [angbBalance, setAngbBalance] = React.useState(0)
    const [starBalance, setStarBalance] = React.useState(0)

    const [rank, setRank] = React.useState([])
    const [rank2, setRank2] = React.useState([])
    const [rank3, setRank3] = React.useState([])
    const [rank4, setRank4] = React.useState([])

    React.useEffect(() => {
        window.scrollTo(0, 0)    
        const acnftSC = new ethers.Contract(acNft, erc721ABI, providerJBC)
        const apDunSC = new ethers.Contract(apDunNft, erc721ABI, providerJBC)
        const angbFarmSC = new ethers.Contract(dunANGB, dunAngbABI, providerJBC)
        const vabagUsageSC = new ethers.Contract(vabagToken, erc20ABI, providerJBC)

        const thefetch = async () => {
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
                    {
                        address: apDunNft,
                        abi: erc721ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                ],
            }) : [0, 0, 0, 0, 0, ]

            const cmjBal = data[1].result
            const angbBal = data[2].result
            const starBal = data[3].result

            const nftbal = data[0].result
            let count = 0
            let nfts = []
            let yournft = []

            const walletFilter = await acnftSC.filters.Transfer(null, address, null)
            const walletEvent = await acnftSC.queryFilter(walletFilter, 3004475, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)

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
                if (data2[i].result.toUpperCase() === address.toUpperCase()) {
                    yournft.push({Id: String(walletRemoveDup[i])})
                    count++
                }
            }

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

            const nftbal2 = data[4].result
            let yournft2 = []
            let count2 = 0
            const walletFilter2 = await apDunSC.filters.Transfer(null, address, null)
            const walletEvent2 = await apDunSC.queryFilter(walletFilter2, 3004475, "latest")
            const walletMap2 = await Promise.all(walletEvent2.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup2 = walletMap2.filter((obj, index) => walletMap2.indexOf(obj) === index)
            
            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup2.map((item) => (
                    {
                        address: apDunNft,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [item],
                    }
                ))
            }) : [Array(walletRemoveDup2.length).fill('')]

            for (let i = 0; i <= walletRemoveDup2.length - 1 && count2 < nftbal2; i++) {
                if (data3[i].result.toUpperCase() === address.toUpperCase()) {
                    yournft2.push({Id: String(walletRemoveDup2[i])})
                    count2++
                }
            }

            for (let i = 0; i <= yournft2.length - 1; i++) {
                const nftipfs = await readContract({
                    address: apDunNft,
                    abi: erc721ABI,
                    functionName: 'tokenURI',
                    args: [yournft2[i].Id],
                })
                const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                const nft = await response.json()


                nfts.push({
                    Col: 2,
                    Id: Number(yournft2[i].Id),
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

            const data2_0 = await readContract({
                address: questAmbass,
                abi: questAmbassABI,
                functionName: 'registCount',
            })
            const rankerDummy = []
            for (let i = 1; i <= Number(data2_0); i++) {
                rankerDummy.push(null)
            }
            const data2_00 = await readContracts({
                contracts: rankerDummy.map((item, i) => (
                    {
                        address: questAmbass,
                        abi: questAmbassABI,
                        functionName: 'referalData',
                        args: [i+1]
                    }
                ))
            })
            const nameArr = []
            for (let i = 0; i <= Number(data2_00.length - 1); i++) {
                nameArr.push(data2_00[i].result[0])
            }
            const data2_001 = await readContracts({
                contracts: nameArr.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [item]
                    }
                ))
            })
            const nameArr2 = []
            for (let i = 0; i <= Number(nameArr.length - 1); i++) {
                nameArr2.push(Number(data2_001[i].result))
            }
            const data2_0011 = await readContracts({
                contracts: nameArr2.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [item]
                    }
                ))
            })
            const nameArr3 = []
            for (let i = 0; i <= Number(nameArr.length - 1); i++) {
                nameArr3.push(data2_0011[i].result)
            }
            const data2_1 = await readContracts({
                contracts: nameArr.map((item) => (
                    {
                        address: dunANGB,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [item],
                    }
                )),
            })
            const angbtotal = []
            for (let i = 0; i <= Number(nameArr.length - 1); i++) {
                angbtotal.push(data2_1[i].result)
            }
            const dataANGB = nameArr.map((item, i) => {
                return {
                    addr: item,
                    name: nameArr3[i] !== undefined ? nameArr3[i] : item.slice(0, 4) + "..." + item.slice(-4),
                    apxp: Number(ethers.utils.formatEther(angbtotal[i])).toFixed(3)
                }
            })

            const spend1Filter = await angbFarmSC.filters.Claimed(null, null, null)
            const spend1Event = await angbFarmSC.queryFilter(spend1Filter, 3004475, 'latest')
            const spend1Map = await Promise.all(spend1Event.map(async (obj) => {return {from: String(obj.args.staker), value: Number(ethers.utils.formatEther(obj.args.rewardAmount))}}))
            const spend1Merged = spend1Map.reduce((prev, curr) => {
                if (prev[curr.from.toUpperCase()]) {
                   prev[curr.from.toUpperCase()].value += curr.value
                } else {
                   prev[curr.from.toUpperCase()] = curr
                }
                return prev
            }, {})

            const spend1RemoveDup = []
            for (let i = 0; i <= nameArr.length -1; i++) {
                for (let i2 = 0; i2 <= Object.values(spend1Merged).length -1; i2++) {
                    if (nameArr[i].toUpperCase() === Object.values(spend1Merged)[i2].from.toUpperCase()) {
                        Object.values(spend1Merged)[i2].name = nameArr3[i] !== undefined ? nameArr3[i] : Object.values(spend1Merged)[i2].from.slice(0, 4) + "..." + Object.values(spend1Merged)[i2].from.slice(-4)
                        spend1RemoveDup.push(Object.values(spend1Merged)[i2])
                    }
                }
            }

            const spend2Filter = await vabagUsageSC.filters.Transfer(null, '0x0000000000000000000000000000000000000001', null)
            const spend2Event = await vabagUsageSC.queryFilter(spend2Filter, 3004475, 'latest')
            const spend2Map = await Promise.all(spend2Event.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value))}}))
            const spend2Merged = spend2Map.reduce((prev, curr) => {
                if (prev[curr.from.toUpperCase()]) {
                   prev[curr.from.toUpperCase()].value += curr.value
                } else {
                   prev[curr.from.toUpperCase()] = curr
                }
                return prev
            }, {})

            const spend2RemoveDup = []
            for (let i = 0; i <= nameArr.length -1; i++) {
                for (let i2 = 0; i2 <= Object.values(spend2Merged).length -1; i2++) {
                    if (nameArr[i].toUpperCase() === Object.values(spend2Merged)[i2].from.toUpperCase() && Object.values(spend2Merged)[i2].from.toUpperCase() !== ('0x0Da584E836542Fc58E7c09725cF6dbDfeA22f427').toUpperCase()) {
                        Object.values(spend2Merged)[i2].name = nameArr3[i] !== undefined ? nameArr3[i] : Object.values(spend2Merged)[i2].from.slice(0, 4) + "..." + Object.values(spend2Merged)[i2].from.slice(-4)
                        spend2RemoveDup.push(Object.values(spend2Merged)[i2])
                    }
                }
            }

            const spend31Filter = await acnftSC.filters.Transfer('0x87BAC0BCBaadF9B7d24385b1AaaEbeDEb60a1A0a', null, null)
            const spend31Event = await acnftSC.queryFilter(spend31Filter, 3004475, 'latest')
            const spend31Map = await Promise.all(spend31Event.map(async (obj) => {return {from: String(obj.args.to), value: 10}}))

            const spend32Filter = await apDunSC.filters.Transfer('0x09e6a0A03afa27438c3f507de82b5f6061Ae1643', null, null)
            const spend32Event = await apDunSC.queryFilter(spend32Filter, 3004475, 'latest')
            const spend32Map = await Promise.all(spend32Event.map(async (obj) => {return {from: String(obj.args.to), value: 10}}))

            const spend3Merged = spend31Map.concat(spend32Map).reduce((prev, curr) => {
                if (prev[curr.from.toUpperCase()]) {
                   prev[curr.from.toUpperCase()].value += curr.value
                } else {
                   prev[curr.from.toUpperCase()] = curr
                }
                return prev
            }, {})

            const spend3RemoveDup = []
            for (let i = 0; i <= nameArr.length -1; i++) {
                for (let i2 = 0; i2 <= Object.values(spend3Merged).length -1; i2++) {
                    if (nameArr[i].toUpperCase() === Object.values(spend3Merged)[i2].from.toUpperCase()) {
                        Object.values(spend3Merged)[i2].name = nameArr3[i] !== undefined ? nameArr3[i] : Object.values(spend3Merged)[i2].from.slice(0, 4) + "..." + Object.values(spend3Merged)[i2].from.slice(-4)
                        spend3RemoveDup.push(Object.values(spend3Merged)[i2])
                    }
                }
            }

            if (dataANGB.length === 0) { dataANGB.push(null) }
            if (spend1RemoveDup.length === 0) { spend1RemoveDup.push(null) }
            if (spend2RemoveDup.length === 0) { spend2RemoveDup.push(null) }
            if (spend3RemoveDup.length === 0) { spend3RemoveDup.push(null) }

            return [nfts, cmjBal, angbBal, starBal, dataANGB, spend1RemoveDup, spend2RemoveDup, spend3RemoveDup ]
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

            setRank(result[4])
            setRank2(result[5])
            setRank3(result[6])
            setRank4(result[7])
        })

    }, [address, erc20ABI, erc721ABI, questAmbassABI, cmdaoNameABI, dunAngbABI, txupdate])

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
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
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
                const { hash: hash04 } = await writeContract(config4)
                await waitForTransaction({ hash: hash04 })
            }
            const config5 = await prepareWriteContract({
                address: acUpgrade,
                abi: acUpgradeABI,
                functionName: 'enchant',
                args: [_enchantindex, _nftid],
            })
            const { hash: hash1 } = await writeContract(config5)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const enchantHandle = async (_nftid, _enchantindex) => {
        setisLoading(true)
        let token1 = '0x0000000000000000000000000000000000000000'
        let token2 = '0x0000000000000000000000000000000000000000'
        let token1Amount = 0
        let token2Amount = 0
        if (_enchantindex >= 100000 && _enchantindex <= 100009) {
            token1 = dunANGB
            token1Amount = 1
        } else {
            token1 = dunANGB
            token1Amount = 0.25
        }
        try {
            const cmjAllow = await readContract({
                address: cmjToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, uniEnchanter],
            })
            if (cmjAllow < (1 * 10**18)) {
                const config = await prepareWriteContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [uniEnchanter, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const token1Allow = await readContract({
                address: token1,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, uniEnchanter],
            })
            if (token1Allow < (token1Amount * 10**18)) {
                const config2 = await prepareWriteContract({
                    address: token1,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [uniEnchanter, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash02 } = await writeContract(config2)
                await waitForTransaction({ hash: hash02 })
            }
            if (token2Amount !== 0) {
                const token2Allow = await readContract({
                    address: token2,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, uniEnchanter],
                })
                if (token2Allow < (token2Amount * 10**18)) {
                    const config3 = await prepareWriteContract({
                        address: token2,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [uniEnchanter, ethers.utils.parseEther(String(10**8))],
                    })
                    const { hash: hash03 } = await writeContract(config3)
                    await waitForTransaction({ hash: hash03 })
                }
            }
            const nftAllow = await readContract({
                address: apDunNft,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== uniEnchanter.toUpperCase()) {
                const config4 = await prepareWriteContract({
                    address: apDunNft,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [uniEnchanter, _nftid],
                })
                const { hash: hash04 } = await writeContract(config4)
                await waitForTransaction({ hash: hash04 })
            }
            const config5 = await prepareWriteContract({
                address: uniEnchanter,
                abi: uniEnchanterABI,
                functionName: 'enchant',
                args: [_enchantindex, _nftid],
                gasLimit: 3000000,
            })
            const { hash: hash1 } = await writeContract(config5)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
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
                        <div style={{fontSize: "40px"}}>April 2024 Prize Pool 🎁</div>
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
                        <div>Snapshot on the last block of the month before 0.00 AM.<br></br>Rewards will allocated to top 5 for each leaderboard.</div>
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
                            {rank.length > 0 ?
                                <>
                                    {rank[0] !== null ?
                                        <div style={{width: "100%", minHeight: "550px"}}>
                                            {rank.slice(0).sort((a, b) => {return b.apxp-a.apxp}).map((item, index) => (
                                                <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}} key={index}>
                                                    <div style={{width: "200px", display: "flex", flexDirection: "row"}}>
                                                        <div>{index+1}</div>
                                                        <a style={{textDecoration: "none", color: "#000", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/daemon-world/" + item.addr} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                    </div>
                                                    <div>{item.apxp} $ANGB</div>
                                                </div>
                                            ))}
                                        </div> :
                                        <></>
                                    } 
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>
                                    <Oval stroke="#ff007a" strokeWidth="5px" />
                                </div>
                            }
                        </div>

                        <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "420px", width: "25%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top $ANGB Farmer of the month</div>
                            {rank2.length > 0 ?
                                <>
                                    {rank2[0] !== null ?
                                        <div style={{width: "100%", minHeight: "550px"}}>
                                            {rank2.slice(0).sort((a, b) => {return b.value-a.value}).map((item, index) => (
                                                <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}} key={index}>
                                                    <div style={{width: "200px", display: "flex", flexDirection: "row"}}>
                                                        <div>{index+1}</div>
                                                        <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/daemon-world/" + item.from} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                    </div>
                                                    <div>{Number(item.value).toFixed(3)} $ANGB</div>
                                                </div>
                                            ))}
                                        </div> :
                                        <></>
                                    }
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>
                                    <Oval stroke="#ff007a" strokeWidth="5px" />
                                </div>
                            }
                        </div>

                        <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "420px", width: "25%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top $VABAG Burner</div>
                            {rank3.length > 0 ?
                                <>
                                    {rank3[0] !== null ?
                                        <div style={{width: "100%", minHeight: "550px"}}>
                                            {rank3.slice(0).sort((a, b) => {return b.value-a.value}).map((item, index) => (
                                                <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}} key={index}>
                                                    <div style={{width: "200px", display: "flex", flexDirection: "row"}}>
                                                        <div>{index+1}</div>
                                                        <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/daemon-world/" + item.from} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                    </div>
                                                    <div>{Number(item.value).toFixed(3)} $VABAG</div>
                                                </div>
                                            ))}
                                        </div> :
                                        <></>
                                    }
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>
                                    <Oval stroke="#ff007a" strokeWidth="5px" />
                                </div>
                            }
                        </div>

                        <div style={{padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "420px", width: "25%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top Spender</div>
                            {rank4.length > 0 ?
                                <>
                                    {rank4[0] !== null ?
                                        <div style={{width: "100%", minHeight: "550px"}}>
                                            {rank4.slice(0).sort((a, b) => {return b.value-a.value}).map((item, index) => (
                                                <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}} key={index}>
                                                    <div style={{width: "200px", display: "flex", flexDirection: "row"}}>
                                                        <div>{index+1}</div>
                                                        <a style={{textDecoration: "none", color: "#000", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/daemon-world/" + item.from} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                    </div>
                                                    <div>{Number(item.value).toFixed(2)} $JUSDT</div>
                                                </div>
                                            ))}
                                        </div> :
                                        <></>
                                    }
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>
                                    <Oval stroke="#ff007a" strokeWidth="5px" />
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
                                            {/*
                                            ░█████╗░░█████╗░
                                            ██╔══██╗██╔══██╗
                                            ███████║██║░░╚═╝
                                            ██╔══██║██║░░██╗
                                            ██║░░██║╚█████╔╝
                                            ╚═╝░░╚═╝░╚════╝░
                                            */}
                                            {item.Col === 1 && String(item.Id).slice(0, 3) !== "401" &&
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

                                            {/*
                                            ██╗░░██╗███████╗██████╗░░█████╗░
                                            ██║░░██║██╔════╝██╔══██╗██╔══██╗
                                            ███████║█████╗░░██████╔╝██║░░██║
                                            ██╔══██║██╔══╝░░██╔══██╗██║░░██║
                                            ██║░░██║███████╗██║░░██║╚█████╔╝
                                            ╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝░╚════╝░
                                            */}
                                            {item.Col === 2 && String(item.Id).slice(0, 3) === "100" && Number(item.Id) % 100000 !== 1100 &&
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                    <div className="emp pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}}>{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        {Number(item.Id) % 100000 === 100 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name} +1</div>
                                                            </div>
                                                        }
                                                        {(Number(item.Id) % 100000 === 200 || Number(item.Id) % 100000 === 400 || Number(item.Id) % 100000 === 600 || Number(item.Id) % 100000 === 800 || Number(item.Id) % 100000 === 1000) &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}{(Number(item.Id) % 100000) / 100}</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 300 &&
                                                            <div>
                                                                <img src='https://nftstorage.link/ipfs/bafybeia5odwzbuvz2obwvrau5jasz4vdalveei4vjypohy6hghy3i5py6i' width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 500 &&
                                                            <div>
                                                                <img src='https://nftstorage.link/ipfs/bafybeiaoaneuefkfhvx4rhn4dclohrwettfn2amuedykhuc5o2t4dtpohu' width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}5</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 700 &&
                                                            <div>
                                                                <img src='https://nftstorage.link/ipfs/bafybeiej4wn5irshklfurszij65hwzquap7xh2lzvx46fxkkjhcryz6zua' width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}7</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 900 &&
                                                            <div>
                                                                <img src='https://nftstorage.link/ipfs/bafybeift6v2ao2t4uyj6lghhnjh4xb7glphvmloyqdkeie2nu3hisf2pf4' width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}9</div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div>+{((Number(item.Id) % 100000) / 100) - 1}</div>
                                                            <div style={{width: "150px"}}>{Number(item.Id) % 100000} power</div>
                                                        </div>
                                                        <div>
                                                            <div>+{(Number(item.Id) % 100000) / 100}</div>
                                                            <div style={{width: "150px"}}>{(Number(item.Id) % 100000) + 100} power</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="https://nftstorage.link/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m" height="18" alt="$ANGB"/>
                                                            <div style={{margin: "0 5px"}}>{(Number(item.Id) % 100000) / 1000}</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>1</div>
                                                        </div>
                                                    </div>
                                                    <div className="pixel" style={{margin: "10px 0", width: "350px"}}>
                                                        <div className="emp">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                            Success rate : 1/1
                                                        </div>
                                                        <div>(depend on parent blockhash calculation)</div>
                                                    </div>
                                                    <div
                                                        style={{background: "#67BAA7", textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                        className="pixel button"
                                                        onClick={() => {
                                                            let arg = null
                                                            if (Number(item.Id) % 100000 === 100) {
                                                                arg = 0
                                                            } else if (Number(item.Id) % 100000 === 200) {
                                                                arg = 1
                                                            } else if (Number(item.Id) % 100000 === 300) {
                                                                arg = 2
                                                            } else if (Number(item.Id) % 100000 === 400) {
                                                                arg = 3
                                                            } else if (Number(item.Id) % 100000 === 500) {
                                                                arg = 4
                                                            } else if (Number(item.Id) % 100000 === 600) {
                                                                arg = 5
                                                            } else if (Number(item.Id) % 100000 === 700) {
                                                                arg = 6
                                                            } else if (Number(item.Id) % 100000 === 800) {
                                                                arg = 7
                                                            } else if (Number(item.Id) % 100000 === 900) {
                                                                arg = 8
                                                            } else if (Number(item.Id) % 100000 === 1000) {
                                                                arg = 9
                                                            }
                                                            enchantHandle(item.Id, 100000 + arg)
                                                        }}
                                                    >
                                                        UPGRADE
                                                    </div>
                                                </div>         
                                            }

                                            {/*
                                            ░█████╗░██████╗░  ████████╗██╗░░██╗███████╗  ██████╗░██╗░░░██╗███╗░░██╗░██████╗░███████╗░█████╗░███╗░░██╗
                                            ██╔══██╗██╔══██╗  ╚══██╔══╝██║░░██║██╔════╝  ██╔══██╗██║░░░██║████╗░██║██╔════╝░██╔════╝██╔══██╗████╗░██║
                                            ███████║██████╔╝  ░░░██║░░░███████║█████╗░░  ██║░░██║██║░░░██║██╔██╗██║██║░░██╗░█████╗░░██║░░██║██╔██╗██║
                                            ██╔══██║██╔═══╝░  ░░░██║░░░██╔══██║██╔══╝░░  ██║░░██║██║░░░██║██║╚████║██║░░╚██╗██╔══╝░░██║░░██║██║╚████║
                                            ██║░░██║██║░░░░░  ░░░██║░░░██║░░██║███████╗  ██████╔╝╚██████╔╝██║░╚███║╚██████╔╝███████╗╚█████╔╝██║░╚███║
                                            ╚═╝░░╚═╝╚═╝░░░░░  ░░░╚═╝░░░╚═╝░░╚═╝╚══════╝  ╚═════╝░░╚═════╝░╚═╝░░╚══╝░╚═════╝░╚══════╝░╚════╝░╚═╝░░╚══╝
                                            */}
                                            {item.Col === 2 && (String(item.Id).slice(0, 3) === "700" || String(item.Id).slice(0, 3) === "500" || String(item.Id).slice(0, 3) === "300" || String(item.Id).slice(0, 3) === "600" || String(item.Id).slice(0, 3) === "200" || String(item.Id).slice(0, 3) === "400") && Number(item.Id) % 100000 !== 1100 &&
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                    <div className="emp pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}}>{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        {Number(item.Id) % 100000 === 250 &&
                                                            <div>
                                                                {String(item.Id).slice(0, 3) === "700" && <img src='https://nftstorage.link/ipfs/bafybeidxnerdssvoads33qf5klz2gxx6c5f3pjkwleyyasxkr4d2fhddo4' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "500" && <img src='https://nftstorage.link/ipfs/bafybeiavljudr364wnbra3glwvxx63emaawoti7o7uvdkfq6byre33k3by' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "300" && <img src='https://nftstorage.link/ipfs/bafybeifo6h2grxkhkhezqjpqj72dmwjwjumpglb75epnhkg5kmukkaegxa' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "200" && <img src='https://nftstorage.link/ipfs/bafybeidkwd67x7cuggzykl2s7az7adadu657hjq3rthvkb7wtjqyno4sxq' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "600" && <img src='https://nftstorage.link/ipfs/bafybeibwn7pyxxduc54giiujmc2lm2kv7twwcbxkmyrtm24d74wz4auryu' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "400" && <img src='https://nftstorage.link/ipfs/bafybeigzllo7efbaroebrlp6uyi7j6xobyolgreimecdz2zumk5ft5scjy' width="120" alt="Can not load metadata." />}
                                                                <div style={{width: "150px"}}>{item.Name} +1</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 300 &&
                                                            <div>
                                                                {String(item.Id).slice(0, 3) === "700" && <img src='https://nftstorage.link/ipfs/bafkreib5o6ewz4uyjs4tnnwrwmc65phsro6iqkjo5zfny56huw76ew4jwu' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "500" && <img src='https://nftstorage.link/ipfs/bafybeid57rinqklnxolfiro5yq2izqgr43k7tpo5trmewstp6h7aurp3ma' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "300" && <img src='https://nftstorage.link/ipfs/bafybeidex5aijsbmwidybwzjpbbnyxwmdpebehgmp2r5wlw3brg3c7zoeq' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "200" && <img src='https://nftstorage.link/ipfs/bafybeihal22c662yiosvtnrh7fsoqpie3jusfsqmpeo4jhwthineclx7q4' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "600" && <img src='https://nftstorage.link/ipfs/bafybeieh2jb2d527n4uummwxe7t36vjfhspv2opoxoqfrmxvzhziiukbs4' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "400" && <img src='https://nftstorage.link/ipfs/bafybeihnkzlzlddkvsdgbcq2umejivaznqmdohng3vccvauwyc2bu7vt4q' width="120" alt="Can not load metadata." />}
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 400 &&
                                                            <div>
                                                                {String(item.Id).slice(0, 3) === "700" && <img src='https://nftstorage.link/ipfs/bafkreicfuyvprncafvvus4e7mpuqcmkqujznohke222tz5vzdqsnlqdvdu' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "500" && <img src='https://nftstorage.link/ipfs/bafkreifd45rhblhwe5qvkvpctaamqjdviijt4olae3266gosuw4mqgx7su' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "300" && <img src='https://nftstorage.link/ipfs/bafybeidwsyrf52coy3xxqlpw5thnqaaztsx7cdrwr2lwogzkp4gd4cbuwi' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "200" && <img src='https://nftstorage.link/ipfs/bafkreia4n6c2srsjbqv555tewpo5hjt575fw2l4cjfwk64sqcwcvpdrebe' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "600" && <img src='https://nftstorage.link/ipfs/bafkreieo765chiflk5msgydn5wxcmtqlf2sjfw5cuwpegnzzllyqhzcyci' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "400" && <img src='https://nftstorage.link/ipfs/bafkreiftgfwgvdmbluidz5umixhvx5epxqpprtx3tq2dr2qh3gouoscgku' width="120" alt="Can not load metadata." />}
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 500 &&
                                                            <div>
                                                                {String(item.Id).slice(0, 3) === "700" && <img src='https://nftstorage.link/ipfs/bafkreictz33nfdbozdf67456m6ulo2mrcmsldpree744tyj7gsary42mge' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "500" && <img src='https://nftstorage.link/ipfs/bafkreihezeecmvuj6cgse2rnc2tbzqrzeadxliuc3zzy2wxpfog5yv3cau' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "300" && <img src='https://nftstorage.link/ipfs/bafybeicjghxuvreknriwduid7zw6zfsxj6px7te6m3ybpxhjglktldh5q4' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "200" && <img src='https://nftstorage.link/ipfs/bafkreiedkyysocf56q2ykmmkismzvmlsp73b3e4wnxn2usmpislxvbfdue' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "600" && <img src='https://nftstorage.link/ipfs/bafkreigutlmirjgjy6nwgluv3sk4y6noqmxkqbmf5qk4zoh4tayz42rqzq' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "400" && <img src='https://nftstorage.link/ipfs/bafkreiepekxjkzsd3xg425mcgnktf4m3y2d7xcqenzhkh7quawxhjnycxi' width="120" alt="Can not load metadata." />}
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 600 &&
                                                            <div>
                                                                {String(item.Id).slice(0, 3) === "700" && <img src='https://nftstorage.link/ipfs/bafybeia52i47ftizdlnx77ekw7a3ncs2ahxiegxrlmci37a75vqcyyru6a' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "500" && <img src='https://nftstorage.link/ipfs/bafybeibbakqgfnshw3jyyvbmymkuf5pylzrzseksfoo2rdhry6p7rrcbaq' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "300" && <img src='https://nftstorage.link/ipfs/bafybeiglsjsqn6bibwx6s2ehtawhqwroxsmasguayvdl7tlujmvkvgks2q' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "200" && <img src='https://nftstorage.link/ipfs/bafybeiho3m6yi3t45ljtufnlmq6xnkeeb4oz5lwjt5okwt5xkgwegb36v4' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "600" && <img src='https://nftstorage.link/ipfs/bafybeidmncmt75ansjbsrkvk3ujhquemej5nlime3cn2rmpsdwb7zrzi3e' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "400" && <img src='https://nftstorage.link/ipfs/bafybeibg7nlydlf6wv5ar7fzxuevqxwnzt3m7hzh3bta3z5khfz34wna3e' width="120" alt="Can not load metadata." />}
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}5</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 700 &&
                                                            <div>
                                                                {String(item.Id).slice(0, 3) === "700" && <img src='https://nftstorage.link/ipfs/bafybeibvhepypdky2enzjzlbqozpmwiq7wvuda2hah5g2umhefxudmn5iu' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "500" && <img src='https://nftstorage.link/ipfs/bafybeiercameocvi6xiw5yuwvbhagk2ut7xa4pr3delbqg2fpfhsnwxwgu' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "300" && <img src='https://nftstorage.link/ipfs/bafybeidgpxrzly3nqltvc4j6u4erni444th65szq2wsjrv66mas5qmcm34' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "200" && <img src='https://nftstorage.link/ipfs/bafybeigk3yjgpmtlbwrj7wwd6wnaamzym6lzmbogorb7wpgfkhxvr3auw4' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "600" && <img src='https://nftstorage.link/ipfs/bafybeic25z3kgp4qkqnkuyohof5vwj5hmdace5d2acqfk5tcw3qt2wtfiq' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "400" && <img src='https://nftstorage.link/ipfs/bafybeigsluheodrvsyvrdwqpuyhabyicazpr5cb3zjrv3k4twj6awxnl2y' width="120" alt="Can not load metadata." />}
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}6</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 800 &&
                                                            <div>
                                                                {String(item.Id).slice(0, 3) === "700" && <img src='https://nftstorage.link/ipfs/bafybeif7siidbof5pzqmnpd337sksfaqhxd3f5iazcvne2nxv6rsoh2zum' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "500" && <img src='https://nftstorage.link/ipfs/bafybeihzcpnug3w4jpqmoznarvxbpdjdpnzibj7a2bzvh2af3js3lk4ani' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "300" && <img src='https://nftstorage.link/ipfs/bafybeifjnuyqckv6aalnd6mocxx6537gfrfixx2cswdq5oyqnyflm6qyuu' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "200" && <img src='https://nftstorage.link/ipfs/bafybeibo5f5ceohspkwbgflpwcas5qfemgqtknpf4msuktkyaq7cxgvtji' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "600" && <img src='https://nftstorage.link/ipfs/bafybeifvnvbsb5ou7b2tijqag2hxbfyrum6kdywe4hq7eea3cx34vr5j34' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "400" && <img src='https://nftstorage.link/ipfs/bafybeigtt4qt7q2v4fyp6slkrl547aucsitljj6rpwcub5bhv237tp6zhu' width="120" alt="Can not load metadata." />}
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}7</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 900 &&
                                                            <div>
                                                                {String(item.Id).slice(0, 3) === "700" && <img src='https://nftstorage.link/ipfs/bafybeiaxzem2d65p43oy2l53jkmcycwmdrqerglw2qvu2otmzmkve2uw3a' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "500" && <img src='https://nftstorage.link/ipfs/bafybeiacng6l2biwvphdlz3dqh6rknnjppanxdx2srvbrgfv67do3mi7wq' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "300" && <img src='https://nftstorage.link/ipfs/bafybeihmyw5fcjxcwv3afaefsv4twlkgmovozluiqiq3xvdr2tod6cztbi' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "200" && <img src='https://nftstorage.link/ipfs/bafybeicxcwrqutvfyjegcextgfq67txs7sg7dx33ck3huffeuq4x5ktmou' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "600" && <img src='https://nftstorage.link/ipfs/bafybeigevydzpebgfubwxoitzii5kfn64zma7npqd55j3cwnjp6w3hbm64' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "400" && <img src='https://nftstorage.link/ipfs/bafybeibwk3ijxpynuu2lar6vea2xf2ixh6nj2knbf5v62xqelak4k4hbxu' width="120" alt="Can not load metadata." />}
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}8</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 1000 &&
                                                            <div>
                                                                {String(item.Id).slice(0, 3) === "700" && <img src='https://nftstorage.link/ipfs/bafybeicqf3zmvxmazfgmgcxyuv64t2mckpgfzz6pc4mnplltb2pvv7ez7u' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "500" && <img src='https://nftstorage.link/ipfs/bafybeifkfw2p65zmr3gop3p2uegldghj6vk455ezg33pelyl7jc3kuca3y' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "300" && <img src='https://nftstorage.link/ipfs/bafybeic7c6pjxrge36iwwsvhiw4rdzy6z3exlea3mnnsjkupzfvcqojdk4' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "200" && <img src='https://nftstorage.link/ipfs/bafybeib5wpqecdu2s65k4gktw7gdqgyxgrlpv44pszxxzyo65knnjwbwqi' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "600" && <img src='https://nftstorage.link/ipfs/bafybeieg2gz5jgwjqpbihfy4pns6mwkjajcxiy3paxsciriz7wduzghhdq' width="120" alt="Can not load metadata." />}
                                                                {String(item.Id).slice(0, 3) === "400" && <img src='https://nftstorage.link/ipfs/bafybeiaxljxw5nxp4gay4k3wtyra2axtird36gap6ekadxd2o5zaeqhx6i' width="120" alt="Can not load metadata." />}
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}9</div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        {Number(item.Id) % 100000 === 250 &&
                                                            <>
                                                                <div>
                                                                    <div>+0</div>
                                                                    <div style={{width: "150px"}}>250 power</div>
                                                                </div>
                                                                <div>
                                                                    <div>+1</div>
                                                                    <div style={{width: "150px"}}>300 power</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 >= 300 &&
                                                            <>
                                                                <div>
                                                                    <div>+{((Number(item.Id) % 100000) / 100) - 2}</div>
                                                                    <div style={{width: "150px"}}>{Number(item.Id) % 100000} power</div>
                                                                </div>
                                                                <div>
                                                                    <div>+{((Number(item.Id) % 100000) / 100) - 1}</div>
                                                                    <div style={{width: "150px"}}>{(Number(item.Id) % 100000) + 100} power</div>
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
                                                            <img src="https://nftstorage.link/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m" height="18" alt="$ANGB"/>
                                                            <div style={{margin: "0 5px"}}>
                                                                {(Number(item.Id) % 100000 === 250 || Number(item.Id) % 100000 === 300) && '0.05'}
                                                                {(Number(item.Id) % 100000 === 400 || Number(item.Id) % 100000 === 500) && '0.10'}
                                                                {(Number(item.Id) % 100000 === 600 || Number(item.Id) % 100000 === 700) && '0.15'}
                                                                {(Number(item.Id) % 100000 === 800 || Number(item.Id) % 100000 === 900) && '0.20'}
                                                                {(Number(item.Id) % 100000 === 1000) && '0.25'}
                                                            </div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>1</div>
                                                        </div>
                                                    </div>
                                                    <div className="pixel" style={{margin: "10px 0", width: "350px"}}>
                                                        <div className="emp">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                            Success rate :&nbsp;
                                                            {(Number(item.Id) % 100000 === 250 || Number(item.Id) % 100000 === 300 || Number(item.Id) % 100000 === 400) && '1/1'}
                                                            {(Number(item.Id) % 100000 === 500 || Number(item.Id) % 100000 === 600 || Number(item.Id) % 100000 === 700) && '1/2'}
                                                            {(Number(item.Id) % 100000 === 800 || Number(item.Id) % 100000 === 900) && '1/3'}
                                                            {(Number(item.Id) % 100000 === 1000) && '1/4'}
                                                        </div>
                                                        <div>(depend on parent blockhash calculation)</div>
                                                    </div>
                                                    <div
                                                        style={{background: "#67BAA7", textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                        className="pixel button"
                                                        onClick={() => {
                                                            let arg = null
                                                            if (Number(item.Id) % 100000 === 250) {
                                                                arg = 0
                                                            } else if (Number(item.Id) % 100000 === 300) {
                                                                arg = 1
                                                            } else if (Number(item.Id) % 100000 === 400) {
                                                                arg = 2
                                                            } else if (Number(item.Id) % 100000 === 500) {
                                                                arg = 3
                                                            } else if (Number(item.Id) % 100000 === 600) {
                                                                arg = 4
                                                            } else if (Number(item.Id) % 100000 === 700) {
                                                                arg = 5
                                                            } else if (Number(item.Id) % 100000 === 800) {
                                                                arg = 6
                                                            } else if (Number(item.Id) % 100000 === 900) {
                                                                arg = 7
                                                            } else if (Number(item.Id) % 100000 === 1000) {
                                                                arg = 8
                                                            }
                                                            let ind = null
                                                            if (String(item.Id).slice(0, 3) === "700") {
                                                                ind = 0
                                                            } else if (String(item.Id).slice(0, 3) === "500") {
                                                                ind = 100
                                                            } else if (String(item.Id).slice(0, 3) === "200") {
                                                                ind = 200
                                                            } else if (String(item.Id).slice(0, 3) === "300") {
                                                                ind = 300
                                                            } else if (String(item.Id).slice(0, 3) === "600") {
                                                                ind = 400
                                                            } else if (String(item.Id).slice(0, 3) === "400") {
                                                                ind = 500
                                                            }
                                                            enchantHandle(item.Id, 101000 + ind + arg)
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
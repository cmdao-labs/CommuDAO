import React from 'react'
import { ethers } from 'ethers'
import { readContract,  prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'

const cmdaomkp = "0xb8Cc909AD8245eD551bC359b721f3748dA814A33"
const hexajibjib = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const ory = '0xD492E20Ecf3Ae85Fe3E3159BB064442b86D6DC02'
const beast = '0x999999999AB9BC4F6EaA79a980Ba9c5AaD4FB868'
const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const jusdtToken = "0x24599b658b57f91E7643f4F154B16bcd2884f9ac"

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const Mkp = ({ setisLoading, txupdate, setTxupdate, hexa721ABI, erc20ABI, cmdaoMkpABI }) => {
    const { address } = useAccount()

    const [mkpnft, setMkpnft] = React.useState([])
    const [nft, setNft] = React.useState([])
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [jusdtBalance, setJusdtBalance] = React.useState(0)

    const [isSellModal, setIsSellModal] = React.useState(false)
    const [sellNftCol, setSellNftCol] = React.useState(null)
    const [sellNftid, setSellNftid] = React.useState(null)
    const [sellName, setSellName] = React.useState("")
    const [sellImage, setSellImage] = React.useState("")
    const [sellPrice, setSellPrice] = React.useState("")
    const [currencyselected, setCurrencyselected] = React.useState("CMJ");

    React.useEffect(() => {      
        const cmdaoMkpSC = new ethers.Contract(cmdaomkp, cmdaoMkpABI, providerJBC)

        const thefetch = async () => {
            const addItemFilter = await cmdaoMkpSC.filters.AddItem(null, null, null, null, null, null)
            const addItemEvent = await cmdaoMkpSC.queryFilter(addItemFilter, 510000, "latest")
            const addItemMap = await Promise.all(addItemEvent.map(async (obj, index) => {
                return {
                    Seller: obj.args.seller.slice(0, 4) + "..." + obj.args.seller.slice(-4),
                    NftId: obj.args.nftId,
                    CurrencyIndex: Number(obj.args.currencyIndex),
                    Price: ethers.utils.formatEther(String(obj.args.price)),
                    Itemcount: index + 1,
                }
            }))

            let nfts = []

            // YOUR NFTS BAG

            const res1 = address !== null && address !== undefined ? await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "` + address + `") {
                            ERC721tokens(where: {contract: "` + hexajibjib + `"}, first: 1000) {
                                id
                                uri
                            }
                        }
                    }`
                })
            })).json() : null
            const _res1 = res1 !== null && res1.data.account !== null ? res1.data.account.ERC721tokens : []
            let yournft1 = []
            for (let i = 0; i <= _res1.length - 1 && address !== null && address !== undefined ; i++) {
                yournft1.push({Id: Number((_res1[i].id).slice(43)), URI: _res1[i].uri})
            }

            for (let i = 0; i <= yournft1.length - 1; i++) {
                const nftipfs = yournft1[i].URI
                const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                const nft = await response.json()

                const bonus = Number(String(yournft1[i].Id).slice(-4))

                nfts.push({
                    Col: 1,
                    Id: Number(yournft1[i].Id),
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: bonus,
                    Onsell: false,
                    Count: null
                })
            }

            const res2 = address !== null && address !== undefined ? await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "` + address + `") {
                            ERC721tokens(where: {contract: "` + ory + `"}, first: 1000) {
                                id
                                uri
                            }
                        }
                    }`
                })
            })).json() : null
            const _res2 = res2 !== null && res2.data.account !== null ? res2.data.account.ERC721tokens : []
            let yournft2 = []
            for (let i = 0; i <= _res2.length - 1 && address !== null && address !== undefined ; i++) {
                yournft2.push({Id: Number((_res2[i].id).slice(43)), URI: _res2[i].uri})
            }

            for (let i = 0; i <= yournft2.length - 1; i++) {
                const nftid = yournft2[i].Id

                let bonus;
                if (nftid >= 400) {
                    bonus = 4;
                } else if (nftid >= 180 && nftid < 400) {
                    bonus = 10;
                } else if (nftid >= 60 && nftid < 180) {
                    bonus = 20;
                } else if (nftid >= 20 && nftid < 60) {
                    bonus = 50;
                } else if (nftid >= 2 && nftid < 20) {
                    bonus = 100;
                } else if (nftid === 1) {
                    bonus = 400;
                }

                nfts.push({
                    Col: 2,
                    Id: nftid,
                    Name: "CM Cat Meaw Ory JIBJIB #" + nftid,
                    Image: "https://bafybeid7j5by6pensqrh3v353cwnw7kdcbenf4rqwjrktvy2qodbxqrbuu.ipfs.nftstorage.link/" + nftid + ".png",
                    Description: "",
                    Attribute: [],
                    RewardPerSec: bonus,
                    Onsell: false,
                    Count: null
                })
            }

            const res3 = address !== null && address !== undefined ? await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "` + address + `") {
                            ERC721tokens(where: {contract: "` + beast + `"}, first: 1000) {
                                id
                                uri
                            }
                        }
                    }`
                })
            })).json() : null
            const _res3 = res3 !== null && res3.data.account !== null ? res3.data.account.ERC721tokens : []
            let yournft3 = []
            for (let i = 0; i <= _res3.length - 1 && address !== null && address !== undefined ; i++) {
                yournft3.push({Id: Number((_res3[i].id).slice(43)), URI: _res3[i].uri})
            }

            for (let i = 0; i <= yournft3.length - 1; i++) {
                const nftid = yournft3[i].Id
                const nftipfs = yournft3[i].URI
                const response = await fetch(nftipfs.replace("ipfs://", "https://ipfs.8api.sh/ipfs/"))
                const nft = await response.json()

                nfts.push({
                    Col: 3,
                    Id: nftid,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://ipfs.8api.sh/ipfs/"),
                    Description: nft.description,
                    Attribute: [],
                    RewardPerSec: 0,
                    Onsell: false,
                    Count: null
                })
            }

            // MKP NFTS

            const resmkp1 = await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "` + cmdaomkp + `") {
                            ERC721tokens(where: {contract: "` + hexajibjib + `"}, first: 1000) {
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
            const _resmkp1 = resmkp1 !== undefined ? resmkp1.data.account.ERC721tokens : []

            let nftsell = []
            let yournftsell1 = []
            for (let i = 0; i <= _resmkp1.length - 1; i++) {
                const nftid = Number((_resmkp1[i].id).slice(43))
                const nftipfs = _resmkp1[i].uri
                const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                const nft = await response.json()

                const bonus = Number(String(Number((_resmkp1[i].id).slice(43))).slice(-4))

                let count = null
                let currencyindex = null
                let price = null
                let seller = null
                for (let a = 0; a <= addItemMap.length - 1; a++) {
                    if (Number(addItemMap[a].NftId) === nftid) {
                        count = addItemMap[a].Itemcount
                        currencyindex = addItemMap[a].CurrencyIndex
                        price = addItemMap[a].Price
                        seller =  addItemMap[a].Seller
                    }
                }

                nftsell.push({
                    Col: 1,
                    Id: nftid,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: bonus,
                    Count: count,
                    Currencyindex: currencyindex,
                    Price: price,
                    Seller: seller
                })

                if ((_resmkp1[i].transfers[0].to.id).toUpperCase() === cmdaomkp.toUpperCase() && address !== null && address !== undefined) {
                    if ((_resmkp1[i].transfers[1].to.id).toUpperCase() === address.toUpperCase()) {
                        yournftsell1.push({Id: nftid, URI: _resmkp1[i].uri, Count: count})
                    }
                }
            }

            for (let i = 0; i <= yournftsell1.length - 1; i++) {
                const nftipfs = yournftsell1[i].URI
                const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                const nft = await response.json()

                const bonus = Number(String(yournftsell1[i].Id).slice(-4))

                nfts.push({
                    Col: 1,
                    Id: Number(yournftsell1[i].Id),
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: bonus,
                    Onsell: true,
                    Count: yournftsell1[i].Count
                })
            }

            const resmkp2 = await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "` + cmdaomkp + `") {
                            ERC721tokens(where: {contract: "` + ory + `"}, first: 1000) {
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
            const _resmkp2 = resmkp2 !== undefined ? resmkp2.data.account.ERC721tokens : []

            let yournftsell2 = []
            for (let i = 0; i <= _resmkp2.length - 1; i++) {
                const nftid = Number((_resmkp2[i].id).slice(43))

                let bonus;
                if (nftid >= 400) {
                    bonus = 4;
                } else if (nftid >= 180 && nftid < 400) {
                    bonus = 10;
                } else if (nftid >= 60 && nftid < 180) {
                    bonus = 20;
                } else if (nftid >= 20 && nftid < 60) {
                    bonus = 50;
                } else if (nftid >= 2 && nftid < 20) {
                    bonus = 100;
                } else if (nftid === 1) {
                    bonus = 400;
                }

                let count = null
                let currencyindex = null
                let price = null
                let seller = null
                for (let a = 0; a <= addItemMap.length - 1; a++) {
                    if (Number(addItemMap[a].NftId) === nftid) {
                        count = addItemMap[a].Itemcount
                        currencyindex = addItemMap[a].CurrencyIndex
                        price = addItemMap[a].Price
                        seller =  addItemMap[a].Seller
                    }
                }

                nftsell.push({
                    Col: 2,
                    Id: nftid,
                    Name: "CM Cat Meaw Ory JIBJIB #" + nftid,
                    Image: "https://bafybeid7j5by6pensqrh3v353cwnw7kdcbenf4rqwjrktvy2qodbxqrbuu.ipfs.nftstorage.link/" + nftid + ".png",
                    Description: "",
                    Attribute: [],
                    RewardPerSec: bonus,
                    Count: count,
                    Currencyindex: currencyindex,
                    Price: price,
                    Seller: seller
                })

                if ((_resmkp2[i].transfers[0].to.id).toUpperCase() === cmdaomkp.toUpperCase() && address !== null && address !== undefined) {
                    if ((_resmkp2[i].transfers[1].to.id).toUpperCase() === address.toUpperCase()) {
                        yournftsell2.push({Id: nftid, URI: _resmkp2[i].uri, Count: count})
                    }
                }
            }

            for (let i = 0; i <= yournftsell2.length - 1; i++) {
                const nftid = Number(yournftsell2[i].Id)

                let bonus;
                if (nftid >= 400) {
                    bonus = 4;
                } else if (nftid >= 180 && nftid < 400) {
                    bonus = 10;
                } else if (nftid >= 60 && nftid < 180) {
                    bonus = 20;
                } else if (nftid >= 20 && nftid < 60) {
                    bonus = 50;
                } else if (nftid >= 2 && nftid < 20) {
                    bonus = 100;
                } else if (nftid === 1) {
                    bonus = 400;
                }

                nfts.push({
                    Col: 2,
                    Id: nftid,
                    Name: "CM Cat Meaw Ory JIBJIB #" + nftid,
                    Image: "https://bafybeid7j5by6pensqrh3v353cwnw7kdcbenf4rqwjrktvy2qodbxqrbuu.ipfs.nftstorage.link/" + nftid + ".png",
                    Description: "",
                    Attribute: [],
                    RewardPerSec: bonus,
                    Onsell: true,
                    Count: yournftsell2[i].Count
                })
            }

            const resmkp3 = await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "` + cmdaomkp + `") {
                            ERC721tokens(where: {contract: "` + beast + `"}, first: 1000) {
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
            const _resmkp3 = resmkp3 !== undefined ? resmkp3.data.account.ERC721tokens : []

            let yournftsell3 = []
            for (let i = 0; i <= _resmkp3.length - 1; i++) {
                const nftid = Number((_resmkp3[i].id).slice(43))
                const nftipfs = _resmkp3[i].uri
                const response = await fetch(nftipfs.replace("ipfs://", "https://ipfs.8api.sh/ipfs/"))
                const nft = await response.json()

                let count = null
                let currencyindex = null
                let price = null
                let seller = null
                for (let a = 0; a <= addItemMap.length - 1; a++) {
                    if (Number(addItemMap[a].NftId) === nftid) {
                        count = addItemMap[a].Itemcount
                        currencyindex = addItemMap[a].CurrencyIndex
                        price = addItemMap[a].Price
                        seller =  addItemMap[a].Seller
                    }
                }

                nftsell.push({
                    Col: 3,
                    Id: nftid,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://ipfs.8api.sh/ipfs/"),
                    Description: nft.description,
                    Attribute: [],
                    RewardPerSec: 0,
                    Count: count,
                    Currencyindex: currencyindex,
                    Price: price,
                    Seller: seller
                })

                if ((_resmkp3[i].transfers[0].to.id).toUpperCase() === cmdaomkp.toUpperCase() && address !== null && address !== undefined) {
                    if ((_resmkp3[i].transfers[1].to.id).toUpperCase() === address.toUpperCase()) {
                        yournftsell3.push({Id: nftid, URI: _resmkp3[i].uri, Count: count})
                    }
                }
            }

            for (let i = 0; i <= yournftsell3.length - 1; i++) {
                const nftid = Number(yournftsell3[i].Id)
                const nftipfs = yournftsell3[i].URI
                const response = await fetch(nftipfs.replace("ipfs://", "https://ipfs.8api.sh/ipfs/"))
                const nft = await response.json()

                nfts.push({
                    Col: 3,
                    Id: nftid,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://ipfs.8api.sh/ipfs/"),
                    Description: nft.description,
                    Attribute: [],
                    RewardPerSec: 0,
                    Onsell: true,
                    Count: yournftsell3[i].Count
                })
            }

            if (nfts.length === 0) { nfts.push(null) }
            if (nftsell.length === 0) { nftsell.push(null) }

            const cmjBal = address !== null && address !== undefined ? await readContract({
                address: cmjToken,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address],
            }) : 0

            const jusdtBal = address !== null && address !== undefined ? await readContract({
                address: jusdtToken,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address],
            }) : 0

            return [nftsell, nfts, cmjBal, jusdtBal]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setMkpnft(result[0])
            setNft(result[1])
            setCmjBalance(ethers.utils.formatEther(String(result[2])))
            setJusdtBalance(ethers.utils.formatEther(String(result[3])))
        })

    }, [address, txupdate, erc20ABI, cmdaoMkpABI])

    const sellPriceHandle = (event) => { setSellPrice(event.target.value) }
    const sell = (_nftcol, _nftid, _nftname, _nftimage) => {
        setIsSellModal(true)
        setSellNftCol(_nftcol)
        setSellNftid(_nftid)
        setSellName(_nftname)
        setSellImage(_nftimage)
    }

    const sellHandle = async () => {
        setisLoading(true)
        let nftAddr = ""
        if (sellNftCol === 1) {
            nftAddr = hexajibjib
        } else if (sellNftCol === 2) {
            nftAddr = ory
        } else if (sellNftCol === 3) {
            nftAddr = beast
        }
        const nftAllow = await readContract({
            address: nftAddr,
            abi: hexa721ABI,
            functionName: 'getApproved',
            args: [sellNftid],
        })
        if (nftAllow.toUpperCase() !== cmdaomkp.toUpperCase()) {
            try {
                const config = await prepareWriteContract({
                    address: nftAddr,
                    abi: hexa721ABI,
                    functionName: 'approve',
                    args: [cmdaomkp, sellNftid],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            } catch {}
        }
        let currencyIndex = 0
        if (currencyselected === "CMJ") {
            currencyIndex = 1
        } else if (currencyselected === "JUSDT") {
            currencyIndex = 2
        }
        try {
            const config2 = await prepareWriteContract({
                address: cmdaomkp,
                abi: cmdaoMkpABI,
                functionName: 'addItem',
                args: [sellNftCol, sellNftid, currencyIndex, ethers.utils.parseUnits(String(sellPrice, "wei"))]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setIsSellModal(false)
        setisLoading(false)
    }

    const remove = async (_count) => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: cmdaomkp,
                abi: cmdaoMkpABI,
                functionName: 'removeItem',
                args: [_count]
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const buyHandle = async (_count, _currencyindex, _price) => {
        setisLoading(true)
        let currencyAddr = null
        if (_currencyindex === 1) {
            currencyAddr = cmjToken
        } else if (_currencyindex === 2) {
            currencyAddr = jusdtToken
        }
        const currencyAllow = await readContract({
            address: currencyAddr,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, cmdaomkp],
        })
        if (currencyAllow < (_price * 10**18)) {
            try {
                const config = await prepareWriteContract({
                    address: currencyAddr,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaomkp, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: cmdaomkp,
                abi: cmdaoMkpABI,
                functionName: 'buyItem',
                args: [_count]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    return (
    <>
        {isSellModal ?
            <div style={{zIndex: "999"}} className="centermodal">
                <div className="wrapper">
                    <div className="bold" style={{width: "500px", height: "400px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", fontSize: "40px", letterSpacing: "3px"}}>
                        <img src={sellImage} width="120px" alt="sellnftpic"></img>
                        <div style={{fontSize: "20px"}}>{sellName}</div>
                        <div style={{width: "80%", fontSize: "12px", textAlign: "left"}}>
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{height: "30px", padding: "0 5px", marginRight: "10px", lineHeight: "32px"}} className="bold">SELL AS</div>
                                <div style={{width: "fit-content", height: "30px", margin: 0, padding: "5px", border: "1px solid", borderRadius: "10px", fontSize: "12px"}} className="items bold">
                                    {currencyselected === "CMJ" ? <img src="./tokens/cmj.png" width="20" alt="$CMJ"/> : <img src="./tokens/jusdt.png" width="20" alt="$JUSDT"/>}
                                    <select style={{padding: "5px", margin: "5px", fontSize: "16px", letterSpacing: "1px", border: "none"}} className="pixel" value={currencyselected} onChange={(event) => {setCurrencyselected(event.target.value)}}>
                                        <option value="CMJ">CMJ</option>
                                        <option value="JUSDT">JUSDT</option>
                                    </select>
                                </div>
                            </div>
                            <input style={{marginTop: "10px", width: "90%", padding: "10px"}} className="bold" type="number" min="0" step="0.1" placeholder="Enter Price" value={sellPrice} onChange={sellPriceHandle}></input>
                        </div>
                        {sellNftCol === 3 ?
                            <div style={{width: "78%", textAlign: "left", fontSize: "12px"}} className="bold">10% Platform fee (No Royalty fee!)</div> :
                            <div style={{width: "78%", textAlign: "left", fontSize: "12px"}} className="bold">10% Platform fee & 2.5% Royalty fee</div>
                        }
                        <div className="button" style={{width: "50%"}} onClick={sellHandle}>SELL</div>
                        <div className="button" style={{width: "50%", background: "gray"}} onClick={() => setIsSellModal(false)}>CLOSE</div>
                    </div>
                </div>
            </div> :
            <></>
        }
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div style={{fontSize: "95px", width: "fit-content"}} className="pixel">Marketplace</div>
                <div style={{fontSize: "22.5px", width: "fit-content", marginTop: "30px"}} className="pixel">NFTs Second-hand marketplace provided In DApp.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="./background/mkplogo.png" width="175" alt="MKP_Logo" />
            </div>
        </div>

        <div style={{textAlign: "left", marginTop: "50px", minHeight: "600px", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
            <div style={{fontSize: "18px"}} className="bold">NFTs Marketplace</div>
            <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "20px 0"}}></div>
            {mkpnft !== undefined && mkpnft.length > 0 ?
            <>
                {mkpnft[0] !== null ?
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                        {mkpnft.map((item, index) => (
                            <div style={{justifyContent: "space-between", padding: "20px", margin: "10px 28px 15px 0", width: "300px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard" key={index}>
                                <div style={{width: "95%", overflow: "hidden", display: "flex", justifyContent: "center"}}>
                                    <img src={item.Image} height="250" alt="Can not load metadata." />
                                </div>
                                <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                <div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <div style={{height: "100px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                                        <div className="pixel emp">{item.Name}</div>
                                        <div className="pixel">{item.RewardPerSec} {item.Col === 1 || item.Col === 3 ? <>cmpow per sec</> : <>bonus per sec</>}</div>
                                        <div style={{display: "flex", flexDirection: "row"}} className="pixel">
                                            {item.Currencyindex === 1 ? <img src="./tokens/cmj.png" width="20" alt="$CMJ"/> : <img src="./tokens/jusdt.png" width="20" alt="$JUSDT"/>}
                                            <div style={{marginLeft: "5px"}}>{item.Price}</div>
                                        </div>
                                        <div style={{fontSize: "12px"}} className="light">[Seller : {item.Seller}]</div>
                                    </div>
                                    {address !== null && address !== undefined ?
                                        <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "fit-content", height: "fit-content", background: "#67BAA7"}} className="pixel button" onClick={() => {buyHandle(item.Count, item.Currencyindex, item.Price)}}>BUY</div> :
                                        <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "fit-content", height: "fit-content", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BUY</div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div> :
                    <>
                        <div style={{padding: "20px", width: "300px", justifyContent: "center", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                            <i style={{fontSize: "250px", marginBottom: "30px"}} className="fa fa-file-image-o"></i>
                            <div className="bold">No items in Marketplace.</div>
                        </div>
                    </>
                }
            </> :
            <div style={{padding: "20px", width: "300px"}}>
                <i style={{fontSize: "250px", marginBottom: "30px"}} className="fa fa-spinner"></i>
            </div>
        }
        </div>
        <div style={{width: "90%", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
            <div style={{textAlign: "left", marginTop: "50px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                <div style={{fontSize: "18px"}} className="bold">Your Tokens</div>
                <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "20px"}}></div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "250px", padding: "0 40px", margin: "20px", boxShadow: "none", background: "#fff"}} className="items bold">
                        <img src="./tokens/cmj.png" width="22" alt="$CMJ"/>
                        <div style={{marginLeft: "5px"}}>{Number(cmjBalance).toFixed(3)}</div>
                    </div>
                    <div style={{width: "250px", padding: "0 40px", margin: "20px", boxShadow: "none", background: "#fff"}} className="items bold">
                        <img src="./tokens/jusdt.png" width="22" alt="$JUSDT"/>
                        <div style={{marginLeft: "5px"}}>{Number(jusdtBalance).toFixed(3)}</div>
                    </div>
                </div>
            </div>
            <div style={{textAlign: "left", marginTop: "50px", minHeight: "600px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                <div style={{fontSize: "18px"}} className="bold">Your NFTs</div>
                <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "20px 0"}}></div>
                {nft !== undefined && nft.length > 0 ?
                    <>
                    {nft[0] !== null ?
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                            {nft.map((item, index) => (
                                <div style={{justifyContent: "space-around", padding: "20px", width: "300px", margin: "20px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard" key={index}>
                                    <img src={item.Image} height="200" alt="Can not load metadata." />
                                    <div className="emp bold">{item.Name}</div>
                                    <div className="bold">
                                        {item.Col === 1 || item.Col === 3 ? <>{item.RewardPerSec} cmpow per sec</> : <>{item.RewardPerSec} bonus per sec</>}   
                                    </div>
                                    {!item.Onsell ?
                                        <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {sell(item.Col, item.Id, item.Name, item.Image)}}>SELL NFT</div> :
                                        <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "120px", background: "gray"}} className="pixel button" onClick={() => {remove(item.Count)}}>REMOVE SELL</div>
                                    }
                                </div>
                            ))}
                        </div> :
                        <>
                        {address !== undefined ?
                            <div style={{justifyContent: "center", padding: "20px", margin: "20px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fas fa-images"></i>
                                <div className="bold">This wallet doesn't have NFTs.</div>
                            </div> :
                            <div style={{justifyContent: "center", padding: "20px", margin: "20px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                <div className="bold">Please connect wallet to view your NFTs.</div>
                            </div>
                        }
                        </>
                    }
                    </> :
                    <div style={{padding: "20px", margin: "20px", width: "300px"}}>
                        <i style={{fontSize: "200px", marginBottom: "30px"}} className="fa fa-spinner"></i>
                    </div>
                }
            </div>
        </div>
    </>
    )
}

export default Mkp
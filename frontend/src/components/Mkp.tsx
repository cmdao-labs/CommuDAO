import React from 'react'
import { ethers } from 'ethers'
import { createPublicClient, http } from 'viem'
import { jbc } from 'viem/chains' 
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { Oval } from 'react-loading-icons'

const cmdaomkp = "0xb8Cc909AD8245eD551bC359b721f3748dA814A33"
const hexajibjib = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const ory = '0xD492E20Ecf3Ae85Fe3E3159BB064442b86D6DC02'
const cm_ogjibjib = '0xb6aaD2B2f9fD5eA0356F49c60Ee599De56206251'
const cmdao_ti = '0x90B3a1F21D1C0BE9A8B6a6AA129066951AF63B72'
const cmdao_ti_helper = '0xedB737Cde19f0Db1852261C24b182bA6551863bD'
const cmdao_house_staking = '0xc4dB6374EeCa3743F8044ae995892827B62b14fe'
const mgnft = '0xA6f8cE1425E0fC4b74f3b1c2f9804e9968f90e17'
const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const jusdtToken = "0x24599b658b57f91E7643f4F154B16bcd2884f9ac"
const publicClient = createPublicClient({ chain: jbc, transport: http() })

const Mkp = ({ config, subModeText, callMode, navigate, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc721Abi, erc20Abi, aurora721ABI, cmdaoMkpABI, houseStakingABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const { open } = useAppKit()
    const [selleraddr, setSelleraddr] = React.useState(null)   
    const [colselect, setColselect] = React.useState("ALL")
    const [selectedCol, setSelectedCol] = React.useState([])
    const [loadingText, setLoadingText] = React.useState("00.00%")
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
    const [currencyselected, setCurrencyselected] = React.useState("CMJ")

    React.useEffect(() => {     
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        if (subModeText === undefined) {
        } else if (subModeText.length === 42) {
            setSelleraddr(subModeText)
            navigate('/marketplace/' + subModeText)
        }

        const thefetch = async () => {
            setLoadingText("00.00%")
            const data = address !== null ? await readContracts(config, {
                contracts: [
                    {
                        address: cmjToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: jusdtToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    }
                ],
            }) : [{result: 0}, {result: 0}, ]
            const cmjBal = data[0].result
            const jusdtBal = data[1].result
            setLoadingText("10.00%")
            const addItemfilter = await publicClient.createContractEventFilter({ abi: cmdaoMkpABI, address: cmdaomkp, eventName: 'AddItem', fromBlock: 510000n, toBlock: "latest" })
            const addItemlog = publicClient.getFilterLogs({ filter: addItemfilter })
            let walletlog = promise
            let walletlog2 = promise
            let walletlog3 = promise
            let walletlog4 = promise
            if (address !== null) {
                const walletfilter = await publicClient.createContractEventFilter({ abi: erc721Abi, address: hexajibjib, eventName: 'Transfer', args: { to: address }, fromBlock: 335000n, toBlock: "latest" })
                walletlog = publicClient.getFilterLogs({ filter: walletfilter })
                const walletfilter2 = await publicClient.createContractEventFilter({ abi: erc721Abi, address: ory, eventName: 'Transfer', args: { to: address }, fromBlock: 515000n, toBlock: "latest" })
                walletlog2 = publicClient.getFilterLogs({ filter: walletfilter2 })
                const walletfilter3 = await publicClient.createContractEventFilter({ abi: erc721Abi, address: cmdao_ti, eventName: 'Transfer', args: { to: address }, fromBlock: 2506258n, toBlock: "latest" })
                walletlog3 = publicClient.getFilterLogs({ filter: walletfilter3 })
                const walletfilter4 = await publicClient.createContractEventFilter({ abi: erc721Abi, address: mgnft, eventName: 'Transfer', args: { to: address }, fromBlock: 2260250n, toBlock: "latest" })
                walletlog4 = publicClient.getFilterLogs({ filter: walletfilter4 })
            }
            setLoadingText("20.00%")
            const mkpfilter = await publicClient.createContractEventFilter({ abi: erc721Abi, address: hexajibjib, eventName: 'Transfer', args: { to: cmdaomkp }, fromBlock: 515000n, toBlock: "latest" })
            const mkplog = publicClient.getFilterLogs({ filter: mkpfilter })
            const mkpfilter2 = await publicClient.createContractEventFilter({ abi: erc721Abi, address: ory, eventName: 'Transfer', args: { to: cmdaomkp }, fromBlock: 652000n, toBlock: "latest" })
            const mkplog2 = publicClient.getFilterLogs({ filter: mkpfilter2 })
            const mkpfilter3 = await publicClient.createContractEventFilter({ abi: erc721Abi, address: cm_ogjibjib, eventName: 'Transfer', args: { to: cmdaomkp }, fromBlock: 2430000n, toBlock: "latest" })
            const mkplog3 = publicClient.getFilterLogs({ filter: mkpfilter3 })
            const mkpfilter4 = await publicClient.createContractEventFilter({ abi: erc721Abi, address: cmdao_ti, eventName: 'Transfer', args: { to: cmdaomkp }, fromBlock: 2506258n, toBlock: "latest" })
            const mkplog4 = publicClient.getFilterLogs({ filter: mkpfilter4 })
            const mkpfilter5 = await publicClient.createContractEventFilter({ abi: erc721Abi, address: mgnft, eventName: 'Transfer', args: { to: cmdaomkp }, fromBlock: 2560000n, toBlock: "latest" })
            const mkplog5 = publicClient.getFilterLogs({ filter: mkpfilter5 })
            setLoadingText("30.00%")
            const addItemdata = await addItemlog
            const addItemMap = await Promise.all(addItemdata.map(async (obj, index) => {
                return {
                    AddrSeller: obj.args.seller,
                    Seller: obj.args.seller.slice(0, 4) + "..." + obj.args.seller.slice(-4),
                    FullSeller: obj.args.seller,
                    NftId: obj.args.nftId,
                    CurrencyIndex: Number(obj.args.currencyIndex),
                    Price: ethers.utils.formatEther(String(obj.args.price)),
                    Itemcount: index + 1,
                }
            }))
            setLoadingText("40.00%")
            let nfts = []
            if (selleraddr === null) { 
                let walletRemoveDup: string[] = []
                if (address !== null) {
                    const walletdata = await walletlog
                    const walletmap = await Promise.all(walletdata.map(async (obj) => String(obj.args.tokenId)))
                    walletRemoveDup = walletmap.filter((obj, index) => walletmap.indexOf(obj) === index)
                }
                const data2 = address !== null ? await readContracts(config, {
                    contracts: walletRemoveDup.map((item) => (
                        {
                            address: hexajibjib,
                            abi: erc721Abi,
                            functionName: 'ownerOf',
                            args: [String(item)],
                            chainId: 8899
                        }
                    ))
                }) : null
                let yournftwallet = []
                for (let i = 0; i <= walletRemoveDup.length - 1 && address !== null; i++) {
                    if (data2[i].result.toUpperCase() === address.toUpperCase()) {
                        yournftwallet.push({Id: String(walletRemoveDup[i])})
                    }
                }
                const data3 = address !== null ? await readContracts(config, {
                    contracts: yournftwallet.map((item) => (
                        {
                            address: hexajibjib,
                            abi: erc721Abi,
                            functionName: 'tokenURI',
                            args: [String(item.Id)],
                            chainId: 8899
                        }
                    ))
                }) : null
                for (let i = 0; i <= yournftwallet.length - 1; i++) {
                    const nftipfs = data3[i].result
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    const nft = await response.json()
                    nfts.push({
                        Col: 1,
                        Id: yournftwallet[i].Id,
                        Name: nft.name + " #" + yournftwallet[i].Id,
                        Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                        Description: nft.description,
                        Attribute: nft.attributes,
                        RewardPerSec: Number(yournftwallet[i].Id.slice(-5)),
                        Onsell: false,
                        Count: null
                    })
                }
                let wallet2RemoveDup: string[] = []
                if (address !== null) {
                    const walletdata2 = await walletlog2
                    const wallet2map = await Promise.all(walletdata2.map(async (obj) => String(obj.args.tokenId)))
                    wallet2RemoveDup = wallet2map.filter((obj, index) => wallet2map.indexOf(obj) === index)
                }
                const data4 = address !== null ? await readContracts(config, {
                    contracts: wallet2RemoveDup.map((item) => (
                        {
                            address: ory,
                            abi: erc721Abi,
                            functionName: 'ownerOf',
                            args: [String(item)],
                            chainId: 8899
                        }
                    ))
                }) : null
                let yournftwallet2 = []
                for (let i = 0; i <= wallet2RemoveDup.length - 1 && address !== null; i++) {
                    if (data4[i].result.toUpperCase() === address.toUpperCase()) {
                        yournftwallet2.push({Id: String(wallet2RemoveDup[i])})
                    }
                }
                for (let i = 0; i <= yournftwallet2.length - 1; i++) {
                    let bonus;
                    if (Number(yournftwallet2[i].Id) >= 400) {
                        bonus = 4;
                    } else if (Number(yournftwallet2[i].Id) >= 180 && Number(yournftwallet2[i].Id) < 400) {
                        bonus = 10;
                    } else if (Number(yournftwallet2[i].Id) >= 60 && Number(yournftwallet2[i].Id) < 180) {
                        bonus = 20;
                    } else if (Number(yournftwallet2[i].Id) >= 20 && Number(yournftwallet2[i].Id) < 60) {
                        bonus = 50;
                    } else if (Number(yournftwallet2[i].Id) >= 2 && Number(yournftwallet2[i].Id) < 20) {
                        bonus = 100;
                    } else if (Number(yournftwallet2[i].Id) === 1) {
                        bonus = 400;
                    }
                    nfts.push({
                        Col: 2,
                        Id: yournftwallet2[i].Id,
                        Name: "CM Cat Meaw Ory JIBJIB #" + yournftwallet2[i].Id,
                        Image: "https://gateway.commudao.xyz/ipfs/bafybeid7j5by6pensqrh3v353cwnw7kdcbenf4rqwjrktvy2qodbxqrbuu/" + yournftwallet2[i].Id + ".png",
                        Description: "",
                        Attribute: [],
                        RewardPerSec: bonus,
                        Onsell: false,
                        Count: null
                    })
                }
                const wallet4RemoveDup = address !== null ? await readContract(config, {
                    address: cm_ogjibjib,
                    abi: aurora721ABI,
                    functionName: 'walletOfOwner',
                    args: [address],
                }) : []
                let yournftwallet4 = []
                for (let i = 0; i <= wallet4RemoveDup.length - 1 && address !== null; i++) {
                    yournftwallet4.push({Id: String(wallet4RemoveDup[i])})
                }
                for (let i = 0; i <= yournftwallet4.length - 1; i++) {
                    const response = await fetch("https://gateway.pinata.cloud/ipfs/bafybeih4u5b5kkmc2mms5z3frywy77c4jr45u5wu67h22cdz45vlvaoqiy/" + yournftwallet4[i].Id + ".json")
                    const nft = await response.json()
                    let bonus;
                    if (Number(yournftwallet4[i].Id) >= 61) {
                        bonus = 2;
                    } else if (Number(yournftwallet4[i].Id) >= 31 && Number(yournftwallet4[i].Id) <= 59) {
                        bonus = 5;
                    } else if (Number(yournftwallet4[i].Id) >= 11 && Number(yournftwallet4[i].Id) <= 29) {
                        bonus = 10;
                    } else if (Number(yournftwallet4[i].Id) <= 10) {
                        bonus = 25;
                    }
                    nfts.push({
                        Col: 4,
                        Id: yournftwallet4[i].Id,
                        Name: nft.name + " #" + yournftwallet4[i].Id,
                        Image: "https://gateway.pinata.cloud/ipfs/bafybeidmedlvbae3t7gffvgakbulid4zpr7eqenx2rdsbbvkb6ol3xplpq/" + yournftwallet4[i].Id + ".png",
                        Description: nft.description,
                        Attribute: [],
                        RewardPerSec: bonus,
                        Onsell: false,
                        Count: null
                    })
                }
                let wallet5RemoveDup: string[] = []
                if (address !== null) {
                    const walletdata3 = await walletlog3
                    const wallet5map = await Promise.all(walletdata3.map(async (obj) => String(obj.args.tokenId)))
                    wallet5RemoveDup = wallet5map.filter((obj, index) => wallet5map.indexOf(obj) === index)
                }
                const data7 = address !== null ? await readContracts(config, {
                    contracts: wallet5RemoveDup.map((item) => (
                        {
                            address: cmdao_ti,
                            abi: erc721Abi,
                            functionName: 'ownerOf',
                            args: [String(item)],
                            chainId: 8899
                        }
                    ))
                }) : null
                let yournftwallet5 = []
                for (let i = 0; i <= wallet5RemoveDup.length - 1 && address !== null; i++) {
                    if (data7[i].result.toUpperCase() === address.toUpperCase()) {
                        // Prevent sell while staking
                        const slotUsage = await readContract(config, {
                            address: cmdao_house_staking,
                            abi: houseStakingABI,
                            functionName: 'slotUsage',
                            args: [1, wallet5RemoveDup[i]],
                        })
                        if (slotUsage === 0) {                            
                            yournftwallet5.push({Id: String(wallet5RemoveDup[i])})
                        }
                    }
                }
                const data8 = address !== null ? await readContracts(config, {
                    contracts: yournftwallet5.map((item) => (
                        {
                            address: cmdao_ti,
                            abi: erc721Abi,
                            functionName: 'tokenURI',
                            args: [String(item.Id)],
                            chainId: 8899
                        }
                    ))
                }) : null
                for (let i = 0; i <= yournftwallet5.length - 1; i++) {
                    const nftipfs = data8[i].result
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    const nft = await response.json()
                    let letter = ''
                    if (yournftwallet5[i].Id.slice(0, 5) === '10026') {
                        letter = 'Z'
                    } else if (yournftwallet5[i].Id.slice(0, 5) === '10001') {
                        letter = 'A'
                    } else if (yournftwallet5[i].Id.slice(0, 5) === '10002') {
                        letter = 'B'
                    } else if (yournftwallet5[i].Id.slice(0, 5) === '10003') {
                        letter = 'C'
                    }
                    nfts.push({
                        Col: 5,
                        Id: yournftwallet5[i].Id,
                        Name: nft.name + ' #' + letter + (yournftwallet5[i].Id % 1000),
                        Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                        Description: nft.description,
                        Attribute: [],
                        RewardPerSec: 0,
                        Onsell: false,
                        Count: null
                    })
                }
                let wallet6RemoveDup: string[] = []
                if (address !== null) {
                    const walletdata4 = await walletlog4
                    const wallet6map = await Promise.all(walletdata4.map(async (obj) => String(obj.args.tokenId)))
                    wallet6RemoveDup = wallet6map.filter((obj, index) => wallet6map.indexOf(obj) === index)
                }
                const data9 = address !== null ? await readContracts(config, {
                    contracts: wallet6RemoveDup.map((item) => (
                        {
                            address: mgnft,
                            abi: erc721Abi,
                            functionName: 'ownerOf',
                            args: [String(item)],
                            chainId: 8899
                        }
                    ))
                }) : null
                let yournftwallet6 = []
                for (let i = 0; i <= wallet6RemoveDup.length - 1 && address !== null; i++) {
                    if (data9[i].result.toUpperCase() === address.toUpperCase()) {
                        yournftwallet6.push({Id: String(wallet6RemoveDup[i])})
                    }
                }
                const data10 = address !== null ? await readContracts(config, {
                    contracts: yournftwallet6.map((item) => (
                        {
                            address: mgnft,
                            abi: erc721Abi,
                            functionName: 'tokenURI',
                            args: [String(item.Id)],
                            chainId: 8899
                        }
                    ))
                }) : null
                for (let i = 0; i <= yournftwallet6.length - 1; i++) {
                    const nftipfs = data10[i].result
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    const nft = await response.json()
                    nfts.push({
                        Col: 6,
                        Id: yournftwallet6[i].Id,
                        Name: nft.name + " #" + yournftwallet6[i].Id,
                        Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                        Description: nft.description,
                        Attribute: nft.attributes,
                        RewardPerSec: 0,
                        Onsell: false,
                        Count: null
                    })
                }
            }
            const mkpdata = await mkplog
            const mkpmap = await Promise.all(mkpdata.map(async (obj) => String(obj.args.tokenId)))
            const mkpRemoveDup = mkpmap.filter((obj, index) => mkpmap.indexOf(obj) === index)
            const mkp_data2 = await readContracts(config, {
                contracts: mkpRemoveDup.map((item) => (
                    {
                        address: hexajibjib,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 8899
                    }
                ))
            })
            setLoadingText("50.00%")
            let mkpwallet = []
            for (let i = 0; i <= mkpRemoveDup.length - 1; i++) {
                if (mkp_data2[i].result.toUpperCase() === cmdaomkp.toUpperCase()) {
                    mkpwallet.push({Id: String(mkpRemoveDup[i])})
                }
            }
            const mkp_data3 = await readContracts(config, {
                contracts: mkpwallet.map((item) => (
                    {
                        address: hexajibjib,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 8899
                    }
                ))
            })
            let nftsell = []
            let yournftsell1 = []
            for (let i = 0; i <= mkpwallet.length - 1; i++) {
                const nftipfs = mkp_data3[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    nft = await response.json()
                } catch {}
                const image = nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")
                let count = null
                let currencyindex = null
                let price = null
                let seller = null
                let fullSeller = null
                let addrseller = null
                for (let a = 0; a <= addItemMap.length - 1; a++) {
                    if (Number(addItemMap[a].NftId) === Number(mkpwallet[i].Id)) {
                        count = addItemMap[a].Itemcount
                        currencyindex = addItemMap[a].CurrencyIndex
                        price = addItemMap[a].Price
                        seller = addItemMap[a].Seller
                        fullSeller = addItemMap[a].FullSeller
                        addrseller = addItemMap[a].AddrSeller
                    }
                }
                nftsell.push({
                    Col: 1,
                    Id: Number(mkpwallet[i].Id),
                    Name: nft.name + " #" + mkpwallet[i].Id,
                    Image: image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(mkpwallet[i].Id.slice(-5)),
                    Count: count,
                    Currencyindex: currencyindex,
                    Price: price,
                    Seller: seller,
                    FullSeller: fullSeller
                })
                if (addrseller !== null && address !== null) {
                    if (addrseller.toUpperCase() === address.toUpperCase()) {
                        yournftsell1.push({Id: mkpwallet[i].Id, URI: nft, Count: count, Image: image})
                    }
                }
            }
            for (let i = 0; i <= yournftsell1.length - 1; i++) {
                const nft = yournftsell1[i].URI
                nfts.push({
                    Col: 1,
                    Id: yournftsell1[i].Id,
                    Name: nft.name + " #" + yournftsell1[i].Id,
                    Image: yournftsell1[i].Image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(String(yournftsell1[i].Id).slice(-5)),
                    Onsell: true,
                    Count: yournftsell1[i].Count
                })
            }
            const mkpdata2 = await mkplog2
            const mkp2map = await Promise.all(mkpdata2.map(async (obj) => String(obj.args.tokenId)))
            const mkp2RemoveDup = mkp2map.filter((obj, index) => mkp2map.indexOf(obj) === index)
            const mkp_data4 = await readContracts(config, {
                contracts: mkp2RemoveDup.map((item) => (
                    {
                        address: ory,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 8899
                    }
                ))
            })
            setLoadingText("60.00%")
            let mkp2wallet = []
            for (let i = 0; i <= mkp2RemoveDup.length - 1; i++) {
                if (mkp_data4[i].result.toUpperCase() === cmdaomkp.toUpperCase()) {
                    mkp2wallet.push({Id: String(mkp2RemoveDup[i])})
                }
            }
            let yournftsell2 = []
            for (let i = 0; i <= mkp2wallet.length - 1; i++) {
                let bonus;
                if (Number(mkp2wallet[i].Id) >= 400) {
                    bonus = 4;
                } else if (Number(mkp2wallet[i].Id) >= 180 && Number(mkp2wallet[i].Id) < 400) {
                    bonus = 10;
                } else if (Number(mkp2wallet[i].Id) >= 60 && Number(mkp2wallet[i].Id) < 180) {
                    bonus = 20;
                } else if (Number(mkp2wallet[i].Id) >= 20 && Number(mkp2wallet[i].Id) < 60) {
                    bonus = 50;
                } else if (Number(mkp2wallet[i].Id) >= 2 && Number(mkp2wallet[i].Id) < 20) {
                    bonus = 100;
                } else if (Number(mkp2wallet[i].Id) === 1) {
                    bonus = 400;
                }
                let count = null
                let currencyindex = null
                let price = null
                let seller = null
                let fullSeller = null
                let addrseller = null
                for (let a = 0; a <= addItemMap.length - 1; a++) {
                    if (Number(addItemMap[a].NftId) === Number(mkp2wallet[i].Id)) {
                        count = addItemMap[a].Itemcount
                        currencyindex = addItemMap[a].CurrencyIndex
                        price = addItemMap[a].Price
                        seller =  addItemMap[a].Seller
                        fullSeller = addItemMap[a].FullSeller
                        addrseller = addItemMap[a].AddrSeller
                    }
                }
                nftsell.push({
                    Col: 2,
                    Id: Number(mkp2wallet[i].Id),
                    Name: "CM Cat Meaw Ory JIBJIB #" + mkp2wallet[i].Id,
                    Image: "https://gateway.commudao.xyz/ipfs/bafybeid7j5by6pensqrh3v353cwnw7kdcbenf4rqwjrktvy2qodbxqrbuu/" + mkp2wallet[i].Id + ".png",
                    Description: "",
                    Attribute: [],
                    RewardPerSec: bonus,
                    Count: count,
                    Currencyindex: currencyindex,
                    Price: price,
                    Seller: seller,
                    FullSeller: fullSeller
                })
                if (addrseller !== null && address !== null) {
                    if (addrseller.toUpperCase() === address.toUpperCase()) {
                        yournftsell2.push({Id: mkp2wallet[i].Id, URI: null, Count: count})
                    }
                }
            }
            for (let i = 0; i <= yournftsell2.length - 1; i++) {
                let bonus;
                if (Number(yournftsell2[i].Id) >= 400) {
                    bonus = 4;
                } else if (Number(yournftsell2[i].Id) >= 180 && Number(yournftsell2[i].Id) < 400) {
                    bonus = 10;
                } else if (Number(yournftsell2[i].Id) >= 60 && Number(yournftsell2[i].Id) < 180) {
                    bonus = 20;
                } else if (Number(yournftsell2[i].Id) >= 20 && Number(yournftsell2[i].Id) < 60) {
                    bonus = 50;
                } else if (Number(yournftsell2[i].Id) >= 2 && Number(yournftsell2[i].Id) < 20) {
                    bonus = 100;
                } else if (Number(yournftsell2[i].Id) === 1) {
                    bonus = 400;
                }
                nfts.push({
                    Col: 2,
                    Id: yournftsell2[i].Id,
                    Name: "CM Cat Meaw Ory JIBJIB #" + yournftsell2[i].Id,
                    Image: "https://gateway.commudao.xyz/ipfs/bafybeid7j5by6pensqrh3v353cwnw7kdcbenf4rqwjrktvy2qodbxqrbuu/" + yournftsell2[i].Id + ".png",
                    Description: "",
                    Attribute: [],
                    RewardPerSec: bonus,
                    Onsell: true,
                    Count: yournftsell2[i].Count
                })
            }
            const mkpdata3 = await mkplog3
            const mkp4map = await Promise.all(mkpdata3.map(async (obj) => String(obj.args.tokenId)))
            const mkp4RemoveDup = mkp4map.filter((obj, index) => mkp4map.indexOf(obj) === index)
            const mkp_data7 = await readContracts(config, {
                contracts: mkp4RemoveDup.map((item) => (
                    {
                        address: cm_ogjibjib,
                        abi: aurora721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 8899
                    }
                ))
            })
            setLoadingText("70.00%")
            let mkp4wallet = []
            for (let i = 0; i <= mkp4RemoveDup.length - 1; i++) {
                if (mkp_data7[i].result.toUpperCase() === cmdaomkp.toUpperCase()) {
                    mkp4wallet.push({Id: String(mkp4RemoveDup[i])})
                }
            }
            let yournftsell4 = []
            for (let i = 0; i <= mkp4wallet.length - 1; i++) {
                let bonus;
                if (Number(mkp4wallet[i].Id) >= 61) {
                    bonus = 2;
                } else if (Number(mkp4wallet[i].Id) >= 31 && Number(mkp4wallet[i].Id) <= 59) {
                    bonus = 5;
                } else if (Number(mkp4wallet[i].Id) >= 11 && Number(mkp4wallet[i].Id) <= 29) {
                    bonus = 10;
                } else if (Number(mkp4wallet[i].Id) <= 10) {
                    bonus = 25;
                }
                let count = null
                let currencyindex = null
                let price = null
                let seller = null
                let fullSeller = null
                let addrseller = null
                for (let a = 0; a <= addItemMap.length - 1; a++) {
                    if (Number(addItemMap[a].NftId) === Number(mkp4wallet[i].Id)) {
                        count = addItemMap[a].Itemcount
                        currencyindex = addItemMap[a].CurrencyIndex
                        price = addItemMap[a].Price
                        seller = addItemMap[a].Seller
                        fullSeller = addItemMap[a].FullSeller
                        addrseller = addItemMap[a].AddrSeller
                    }
                }
                nftsell.push({
                    Col: 4,
                    Id: Number(mkp4wallet[i].Id),
                    Name: "CM Hexa Cat Meaw JIB JIB #" + mkp4wallet[i].Id,
                    Image: "https://gateway.pinata.cloud/ipfs/bafybeidmedlvbae3t7gffvgakbulid4zpr7eqenx2rdsbbvkb6ol3xplpq/" + mkp4wallet[i].Id + ".png",
                    Description: "",
                    Attribute: [],
                    RewardPerSec: bonus,
                    Count: count,
                    Currencyindex: currencyindex,
                    Price: price,
                    Seller: seller,
                    FullSeller: fullSeller
                })
                if (addrseller !== null && address !== null) {
                    if (addrseller.toUpperCase() === address.toUpperCase()) {
                        yournftsell4.push({Id: mkp4wallet[i].Id, URI: "", Count: count})
                    }
                }
            }
            for (let i = 0; i <= yournftsell4.length - 1; i++) {
                let bonus;
                if (Number(yournftsell4[i].Id) >= 61) {
                    bonus = 2;
                } else if (Number(yournftsell4[i].Id) >= 31 && Number(yournftsell4[i].Id) <= 59) {
                    bonus = 5;
                } else if (Number(yournftsell4[i].Id) >= 11 && Number(yournftsell4[i].Id) <= 29) {
                    bonus = 10;
                } else if (Number(yournftsell4[i].Id) <= 10) {
                    bonus = 25;
                }
                nfts.push({
                    Col: 4,
                    Id: yournftsell4[i].Id,
                    Name: "CM Hexa Cat Meaw JIB JIB #" + yournftsell4[i].Id,
                    Image: "https://gateway.commudao.xyz/ipfs/bafybeidmedlvbae3t7gffvgakbulid4zpr7eqenx2rdsbbvkb6ol3xplpq/" + yournftsell4[i].Id + ".png",
                    Description: "",
                    Attribute: [],
                    RewardPerSec: bonus,
                    Onsell: true,
                    Count: yournftsell4[i].Count
                })
            }
            const mkpdata4 = await mkplog4
            const mkp5map = await Promise.all(mkpdata4.map(async (obj) => String(obj.args.tokenId)))
            const mkp5RemoveDup = mkp5map.filter((obj, index) => mkp5map.indexOf(obj) === index)
            const mkp_data8 = await readContracts(config, {
                contracts: mkp5RemoveDup.map((item) => (
                    {
                        address: cmdao_ti,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 8899
                    }
                ))
            })
            setLoadingText("80.00%")
            let mkp5wallet = []
            for (let i = 0; i <= mkp5RemoveDup.length - 1; i++) {
                if (mkp_data8[i].result.toUpperCase() === cmdaomkp.toUpperCase()) {
                    mkp5wallet.push({Id: String(mkp5RemoveDup[i])})
                }
            }
            const mkp_data9 = await readContracts(config, {
                contracts: mkp5wallet.map((item) => (
                    {
                        address: cmdao_ti,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 8899
                    }
                ))
            })
            let yournftsell5 = []
            for (let i = 0; i <= mkp5wallet.length - 1; i++) {
                const nftipfs = mkp_data9[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    nft = await response.json()
                } catch {}
                let count = null
                let currencyindex = null
                let price = null
                let seller = null
                let fullSeller = null
                let addrseller = null
                for (let a = 0; a <= addItemMap.length - 1; a++) {
                    if (Number(addItemMap[a].NftId) === Number(mkp5wallet[i].Id)) {
                        count = addItemMap[a].Itemcount
                        currencyindex = addItemMap[a].CurrencyIndex
                        price = addItemMap[a].Price
                        seller =  addItemMap[a].Seller
                        fullSeller = addItemMap[a].FullSeller
                        addrseller = addItemMap[a].AddrSeller
                    }
                }
                let letter = ''
                if (mkp5wallet[i].Id.slice(0, 5) === '10026') {
                    letter = 'Z'
                } else if (mkp5wallet[i].Id.slice(0, 5) === '10001') {
                    letter = 'A'
                } else if (mkp5wallet[i].Id.slice(0, 5) === '10002') {
                    letter = 'B'
                } else if (mkp5wallet[i].Id.slice(0, 5) === '10003') {
                    letter = 'C'
                }
                nftsell.push({
                    Col: 5,
                    Id: Number(mkp5wallet[i].Id),
                    Name: nft.name + ' #' + letter + (mkp5wallet[i].Id % 1000),
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 0,
                    Count: count,
                    Currencyindex: currencyindex,
                    Price: price,
                    Seller: seller,
                    FullSeller: fullSeller
                })
                if (addrseller !== null && address !== null) {
                    if (addrseller.toUpperCase() === address.toUpperCase()) {
                        yournftsell5.push({Id: mkp5wallet[i].Id, URI: nft, Count: count})
                    }
                }
            }
            for (let i = 0; i <= yournftsell5.length - 1; i++) {
                const nft = yournftsell5[i].URI
                let letter = ''
                if (yournftsell5[i].Id.slice(0, 5) === '10026') {
                    letter = 'Z'
                } else if (yournftsell5[i].Id.slice(0, 5) === '10001') {
                    letter = 'A'
                } else if (yournftsell5[i].Id.slice(0, 5) === '10002') {
                    letter = 'B'
                } else if (yournftsell5[i].Id.slice(0, 5) === '10003') {
                    letter = 'C'
                }
                nfts.push({
                    Col: 5,
                    Id: yournftsell5[i].Id,
                    Name: nft.name + ' #' + letter + (yournftsell5[i].Id % 1000),
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 0,
                    Onsell: true,
                    Count: yournftsell5[i].Count
                })
            }
            const mkpdata5 = await mkplog5
            const mkp6map = await Promise.all(mkpdata5.map(async (obj) => String(obj.args.tokenId)))
            const mkp6RemoveDup = mkp6map.filter((obj, index) => mkp6map.indexOf(obj) === index)
            const mkp_data10 = await readContracts(config, {
                contracts: mkp6RemoveDup.map((item) => (
                    {
                        address: mgnft,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 8899
                    }
                ))
            })
            setLoadingText("90.00%")
            let mkp6wallet = []
            for (let i = 0; i <= mkp6RemoveDup.length - 1; i++) {
                if (mkp_data10[i].result.toUpperCase() === cmdaomkp.toUpperCase()) {
                    mkp6wallet.push({Id: String(mkp6RemoveDup[i])})
                }
            }
            const mkp_data11 = await readContracts(config, {
                contracts: mkp6wallet.map((item) => (
                    {
                        address: mgnft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 8899
                    }
                ))
            })
            let yournftsell6 = []
            for (let i = 0; i <= mkp6wallet.length - 1; i++) {
                const nftipfs = mkp_data11[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    nft = await response.json()
                } catch {}
                let count = null
                let currencyindex = null
                let price = null
                let seller = null
                let fullSeller = null
                let addrseller = null
                for (let a = 0; a <= addItemMap.length - 1; a++) {
                    if (Number(addItemMap[a].NftId) === Number(mkp6wallet[i].Id)) {
                        count = addItemMap[a].Itemcount
                        currencyindex = addItemMap[a].CurrencyIndex
                        price = addItemMap[a].Price
                        seller =  addItemMap[a].Seller
                        fullSeller = addItemMap[a].FullSeller
                        addrseller = addItemMap[a].AddrSeller
                    }
                }
                nftsell.push({
                    Col: 6,
                    Id: Number(mkp6wallet[i].Id),
                    Name: nft.name + " #" + mkp6wallet[i].Id,
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 0,
                    Count: count,
                    Currencyindex: currencyindex,
                    Price: price,
                    Seller: seller,
                    FullSeller: fullSeller
                })
                if (addrseller !== null && address !== null) {
                    if (addrseller.toUpperCase() === address.toUpperCase()) {
                        yournftsell6.push({Id: mkp6wallet[i].Id, URI: nft, Count: count})
                    }
                }
            }
            for (let i = 0; i <= yournftsell6.length - 1; i++) {
                const nft = yournftsell6[i].URI
                nfts.push({
                    Col: 6,
                    Id: yournftsell6[i].Id,
                    Name: nft.name + " #" + yournftsell6[i].Id,
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 0,
                    Onsell: true,
                    Count: yournftsell6[i].Count
                })
            }
            if (nfts.length === 0) { nfts.push(null) }
            if (nftsell.length === 0) { nftsell.push(null) }
            setLoadingText("100.00%")

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
            if (selleraddr !== null && result[0][0] !== null) {
                const filternft = result[0].filter((res) => res.FullSeller.toUpperCase() === selleraddr.toUpperCase())
                filternft[0] !== undefined ? setSelectedCol(filternft) : setSelectedCol([null]) 
            }
        })

    }, [config, address, txupdate, subModeText, navigate, erc20Abi, erc721Abi, aurora721ABI, cmdaoMkpABI, selleraddr, houseStakingABI])

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
        } else if (sellNftCol === 4) {
            nftAddr = cm_ogjibjib
        } else if (sellNftCol === 5) {
            nftAddr = cmdao_ti_helper
        } else if (sellNftCol === 6) {
            nftAddr = mgnft
        }
        try {
            if (sellNftCol !== 5) {
                const nftAllow = await readContract(config, {
                    address: nftAddr,
                    abi: erc721Abi,
                    functionName: 'getApproved',
                    args: [sellNftid],
                })
                if (nftAllow.toUpperCase() !== cmdaomkp.toUpperCase()) {
                    let { request } = await simulateContract(config, {
                        address: nftAddr,
                        abi: erc721Abi,
                        functionName: 'approve',
                        args: [cmdaomkp, sellNftid],
                    })
                    let h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                }
            }
            let currencyIndex = 0
            if (currencyselected === "CMJ") {
                currencyIndex = 1
            } else if (currencyselected === "JUSDT") {
                currencyIndex = 2
            }
            let { request } = await simulateContract(config, {
                address: cmdaomkp,
                abi: cmdaoMkpABI,
                functionName: 'addItem',
                args: [sellNftCol, sellNftid, currencyIndex, ethers.utils.parseUnits(String(sellPrice, "wei"))]
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setIsSellModal(false)
        setisLoading(false)
    }

    const remove = async (_count) => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: cmdaomkp,
                abi: cmdaoMkpABI,
                functionName: 'removeItem',
                args: [_count]
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const buyHandle = async (_count, _currencyindex, _price) => {
        setisLoading(true)
        try {
            let currencyAddr = null
            if (_currencyindex === 1) {
                currencyAddr = cmjToken
            } else if (_currencyindex === 2) {
                currencyAddr = jusdtToken
            }
            const currencyAllow = await readContract(config, {
                address: currencyAddr,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, cmdaomkp],
            })
            if (Number(ethers.utils.formatEther(currencyAllow)) < Number(_price)) {
                let { request } = await simulateContract(config, {
                    address: currencyAddr,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [cmdaomkp, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: cmdaomkp,
                abi: cmdaoMkpABI,
                functionName: 'buyItem',
                args: [_count]
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    return (
        <>
            {isSellModal &&
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                        <div className="bold" style={{width: "500px", height: "400px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", fontSize: "40px", letterSpacing: "3px"}}>
                            <img src={sellImage} width="120px" alt="sellnftpic" />
                            <div style={{fontSize: "20px"}}>{sellName}</div>
                            <div style={{width: "80%", fontSize: "12px", textAlign: "left"}}>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                                    <div style={{height: "30px", padding: "0 5px", marginRight: "10px", lineHeight: "32px"}} className="bold">SELL AS</div>
                                    <div style={{width: "fit-content", height: "30px", margin: 0, padding: "5px", border: "1px solid", borderRadius: "10px", fontSize: "12px"}} className="items bold">
                                        {currencyselected === "CMJ" ? <img src="https://gateway.commudao.xyz/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="20" alt="$CMJ"/> : <img src="https://gateway.commudao.xyz/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" width="20" alt="$JUSDT"/>}
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
                </div>
            }
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div className="SubfieldBanner" style={{flexDirection: "column"}}>
                    <div style={{fontSize: "75px", width: "fit-content"}} className="pixel">Marketplace</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}} className="pixel">NFTs Second-hand marketplace provided In DApp.</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="https://gateway.commudao.xyz/ipfs/QmcsFn3ZKhZTM7PvRLdCCuPERi1vDdHzQowsHWFSLcBCsr" width="150" alt="MKP_Logo" />
                </div>
            </div>

            {address !== null && chain !== undefined && chain.id !== 8899 ?
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                        <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "fit-content", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">MISMATCH CHAIN!</div>
                        <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to JIBCHAIN.</div>
                        <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => open({ view: 'Networks' })}>SWITCH NETWORK</div>
                        <div className="button" style={{marginTop: "10px", width: "50%", background: "gray"}} onClick={() => {callMode(0); navigate('/');}}>BACK TO HOME</div>
                        </div>
                    </div>
                </div> :
                <div style={{textAlign: "left", marginTop: "50px", minHeight: "600px", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    {mkpnft !== undefined && mkpnft.length > 0 ?
                        <>
                            {selleraddr === null &&
                                <>
                                    <div style={{display: "flex", alignItems: "center", flexFlow: "row wrap"}} className="pixel">
                                        <div style={{fontSize: "18px"}}>Search by CMDAO NFT Category : </div>&nbsp;
                                        <select
                                            style={{padding: "0 5px", fontSize: "20px", width: "300px"}}
                                            className="pixel"
                                            value={colselect}
                                            onChange={(event) => {
                                                if (event.target.value === "ALL") {
                                                    setSelectedCol(mkpnft)
                                                } else if (event.target.value === "MAIN-CHAR") {
                                                    setSelectedCol(mkpnft.filter((result) => String(result.Id).length === 12 && String(result.Id).slice(0, 1) === "1"))
                                                } else if (event.target.value === "HAT") {
                                                    const filternft = mkpnft.filter((result) => String(result.Id).length === 12 && String(result.Id).slice(0, 1) === "2")
                                                    filternft[0] !== undefined ? setSelectedCol(filternft) : setSelectedCol([null]) 
                                                } else if (event.target.value === "CLOTH") {
                                                    setSelectedCol(mkpnft.filter((result) => String(result.Id).length === 12 && String(result.Id).slice(0, 1) === "3"))
                                                } else if (event.target.value === "ACCESSORIES") {
                                                    setSelectedCol(mkpnft.filter((result) => String(result.Id).length === 12 && String(result.Id).slice(0, 1) === "4"))
                                                } else if (event.target.value === "BACK") {
                                                    setSelectedCol(mkpnft.filter((result) => String(result.Id).length === 12 && String(result.Id).slice(0, 1) === "5"))
                                                } else if (event.target.value === "SHOES") {
                                                    setSelectedCol(mkpnft.filter((result) => String(result.Id).length === 12 && String(result.Id).slice(0, 1) === "6"))
                                                } else if (event.target.value === "WEAPONS") {
                                                    setSelectedCol(mkpnft.filter((result) => String(result.Id).length === 12 && String(result.Id).slice(0, 1) === "7"))
                                                }
                                                setColselect(event.target.value)
                                            }}
                                        >
                                            <option value="ALL">ALL</option>
                                            <option value="MAIN-CHAR">Main Character</option>
                                            <option value="HAT">Hat</option>
                                            <option value="CLOTH">Cloth</option>
                                            <option value="SHOES">Shoes</option>
                                            <option value="ACCESSORIES">Accessories</option>
                                            <option value="BACK">Back</option>
                                            <option value="WEAPONS">Weapons</option>
                                        </select>
                                    </div>
                                    <div style={{marginTop: "20px", display: "flex", alignItems: "center", flexFlow: "row wrap"}} className="pixel">
                                        <div style={{fontSize: "18px"}}>Search by All Collections : </div>&nbsp;
                                        <select
                                            style={{padding: "0 5px", fontSize: "20px", width: "300px"}}
                                            className="pixel"
                                            value={colselect}
                                            onChange={(event) => {
                                                if (event.target.value === "ALL") {
                                                    setSelectedCol(mkpnft)
                                                } else if (event.target.value === "OP") {
                                                    const filternft = mkpnft.filter((result) => String(result.Id).length === 12 && (Number(String(result.Id).slice(0, 4)) === 1300))
                                                    filternft[0] !== undefined ? setSelectedCol(filternft) : setSelectedCol([null]) 
                                                } else if (event.target.value === "MVT") {
                                                    const filternft = mkpnft.filter((result) => String(result.Id).length === 12 && (Number(String(result.Id).slice(0, 4)) >= 1005 && Number(String(result.Id).slice(0, 4)) <= 1009))
                                                    filternft[0] !== undefined ? setSelectedCol(filternft) : setSelectedCol([null]) 
                                                } else if (event.target.value === "ORY") {
                                                    setSelectedCol(mkpnft.filter((result) => result.Col === 2))
                                                } else if (event.target.value === "PIXEL") {
                                                    setSelectedCol(mkpnft.filter((result) => String(result.Id).length === 12 && String(result.Id).slice(0, 4) === "1200"))
                                                } else if (event.target.value === "MEOW-NEON") {
                                                    const filternft = mkpnft.filter((result) => String(result.Id).length === 12 && String(result.Id).slice(0, 4) === "1202")
                                                    filternft[0] !== undefined ? setSelectedCol(filternft) : setSelectedCol([null]) 
                                                } else if (event.target.value === "PEPE_JA") {
                                                    setSelectedCol(mkpnft.filter((result) => String(result.Id).length === 12 && (Number(String(result.Id).slice(0, 4)) <= 1004 || Number(String(result.Id).slice(0, 4)) === 1014 || (Number(String(result.Id).slice(0, 7)) >= 1102001 && Number(String(result.Id).slice(0, 7)) <= 1102009))))
                                                } else if (event.target.value === "ETHER_BEAST") {
                                                    setSelectedCol(mkpnft.filter((result) => result.Col === 3))
                                                } else if (event.target.value === "OG_JIBJIB") {
                                                    const filternft = mkpnft.filter((result) => result.Col === 4)
                                                    filternft[0] !== undefined ? setSelectedCol(filternft) : setSelectedCol([null]) 
                                                } else if (event.target.value === "TI") {
                                                    const filternft = mkpnft.filter((result) => result.Col === 5)
                                                    filternft[0] !== undefined ? setSelectedCol(filternft) : setSelectedCol([null]) 
                                                } else if (event.target.value === "MG") {
                                                    const filternft = mkpnft.filter((result) => result.Col === 6)
                                                    filternft[0] !== undefined ? setSelectedCol(filternft) : setSelectedCol([null]) 
                                                }
                                                setColselect(event.target.value)
                                            }}
                                        >
                                            <option value="ALL">ALL</option>
                                            <option value="TI">Title Indeed</option>
                                            <option value="OP">OPTIMIST</option>
                                            <option value="MVT">Multiverse Traveller</option>
                                            <option value="PEPE_JA">PEPE JA</option>
                                            <option value="PIXEL">CMDAO NFT x CM Hexa</option>
                                            <option value="MEOW-NEON">CMDAO NFT x Meow Neon</option>
                                            <option value="OG_JIBJIB">CM Hexa - JIB JIB</option>
                                            <option value="ORY">CM Token - Ory</option>
                                            <option value="MG">Mythical Guardians (MG)</option>
                                            <option value="ETHER_BEAST">ThaiChain - Ethereal Beasts</option>
                                        </select>
                                    </div>
                                </>
                            }
                            <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "20px 0"}}></div>
                            {mkpnft[0] !== null && selectedCol[0] !== null ?
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                    {selectedCol[0] === undefined ?
                                        <>
                                            {mkpnft.map((item, index) => (
                                                <div style={{justifyContent: "space-between", padding: "20px", margin: "35px 28px 15px 0", width: "300px"}} className="nftCard" key={index}>
                                                    <div style={{width: "95%", overflow: "hidden", display: "flex", justifyContent: "center"}}>
                                                        <img src={item.Image} height="250" alt="Can not load metadata." />
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div style={{height: "100px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                                                            <div className="pixel emp">{item.Name}</div>
                                                            <div className="pixel">{item.RewardPerSec} {item.Col === 1 || item.Col === 3 ? <>cmpow per sec</> : <>bonus per sec</>}</div>
                                                            <div style={{display: "flex", flexDirection: "row"}} className="pixel">
                                                                {item.Currencyindex === 1 ? <img src="https://gateway.commudao.xyz/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="20" alt="$CMJ"/> : <img src="https://gateway.commudao.xyz/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" width="20" alt="$JUSDT"/>}
                                                                <div style={{marginLeft: "5px"}}>{item.Price}</div>
                                                            </div>
                                                            <div style={{fontSize: "12px"}} className="light">[Seller : {item.Seller}]</div>
                                                        </div>
                                                        {address !== null ?
                                                            <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "fit-content", height: "fit-content", background: "#67BAA7"}} className="pixel button" onClick={() => {buyHandle(item.Count, item.Currencyindex, item.Price)}}>BUY</div> :
                                                            <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "fit-content", height: "fit-content", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BUY</div>
                                                        }
                                                    </div>
                                                </div>
                                            ))}
                                        </> :
                                        <>
                                            {selectedCol.map((item, index) => (
                                                <div style={{justifyContent: "space-between", padding: "20px", margin: "10px 28px 15px 0", width: "300px"}} className="nftCard" key={index}>
                                                    <div style={{width: "95%", overflow: "hidden", display: "flex", justifyContent: "center"}}>
                                                        <img src={item.Image} height="250" alt="Can not load metadata." />
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div style={{height: "100px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                                                            <div className="pixel emp">{item.Name}</div>
                                                            <div className="pixel">{item.RewardPerSec} {item.Col === 1 || item.Col === 3 ? <>cmpow per sec</> : <>bonus per sec</>}</div>
                                                            <div style={{display: "flex", flexDirection: "row"}} className="pixel">
                                                                {item.Currencyindex === 1 ? <img src="https://gateway.commudao.xyz/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="20" alt="$CMJ"/> : <img src="https://gateway.commudao.xyz/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" width="20" alt="$JUSDT"/>}
                                                                <div style={{marginLeft: "5px"}}>{item.Price}</div>
                                                            </div>
                                                            <div style={{fontSize: "12px"}} className="light">[Seller : {item.Seller}]</div>
                                                        </div>
                                                        {address !== null ?
                                                            <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "fit-content", height: "fit-content", background: "#67BAA7"}} className="pixel button" onClick={() => {buyHandle(item.Count, item.Currencyindex, item.Price)}}>BUY</div> :
                                                            <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "fit-content", height: "fit-content", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BUY</div>
                                                        }
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    }
                                </div> :
                                <>
                                    <div style={{padding: "20px", width: "300px", justifyContent: "center"}} className="nftCard">
                                        <img src="https://l3img.b-cdn.net/ipfs/QmUmf3MEZg99qqLJ6GsewESVum8sm72gfH3wyiVPZGH6HA" width="150" alt="No_NFTs" />
                                        <div style={{marginTop: "30px"}} className="bold">No items in Marketplace.</div>
                                    </div>
                                </>
                            }
                            <div style={{width: "90%", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                                <div style={{textAlign: "left", margin: 0, width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                                    <div style={{marginTop: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Tokens</div>
                                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll pixel">
                                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                                            <img src="https://gateway.commudao.xyz/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="20" alt="$CMJ"/>
                                            <div style={{marginLeft: "5px"}}>{Number(cmjBalance).toFixed(3)}</div>
                                        </div>
                                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                                            <img src="https://gateway.commudao.xyz/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" width="20" alt="$JUSDT"/>
                                            <div style={{marginLeft: "5px"}}>{Number(jusdtBalance).toFixed(3)}</div>
                                        </div>
                                    </div>
                                </div>
                                {selleraddr === null ?
                                    <div style={{textAlign: "left", margin: "0 0 80px 0", minHeight: "600px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                                        <div style={{margin: "20px 0", fontSize: "15px", letterSpacing: "1px"}} className="bold">NFTs</div>
                                        {nft[0] !== null ?
                                            <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                                {nft.map((item, index) => (
                                                    <div style={{justifyContent: "space-around", padding: "20px", margin: "10px 5px 10px 10px"}} className="nftCard" key={index}>
                                                        <div style={{width: "95%", overflow: "hidden", display: "flex", justifyContent: "center"}}>
                                                            <img src={item.Image} height="200" alt="Can not load metadata." />
                                                        </div>
                                                        <div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            <div style={{height: "100px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                                                                <div style={{fontSize: "14px"}} className="emp bold">{item.Name}</div>
                                                                <div style={{fontSize: "16px", margin: "5px 0 12px 0"}} className="pixel">
                                                                    {item.Col === 1 || item.Col === 3 ? <>{item.RewardPerSec} cmpow per sec</> : <>{item.RewardPerSec} bonus per sec</>}   
                                                                </div>
                                                                {!item.Onsell ?
                                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {sell(item.Col, item.Id, item.Name, item.Image)}}>SELL NFT</div> :
                                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "120px", background: "gray"}} className="pixel button" onClick={() => {remove(item.Count)}}>REMOVE SELL</div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div> :
                                            <>
                                                {address !== null ?
                                                    <div style={{justifyContent: "center", padding: "20px", margin: "35px 28px 15px 0px"}} className="nftCard">
                                                        <img src="https://l3img.b-cdn.net/ipfs/QmUmf3MEZg99qqLJ6GsewESVum8sm72gfH3wyiVPZGH6HA" width="150" alt="No_NFTs" />
                                                        <div style={{marginTop: "30px"}} className="bold">This wallet doesn't have NFTs.</div>
                                                    </div> :
                                                    <div style={{justifyContent: "center", padding: "20px", margin: "35px 28px 15px 0px"}} className="nftCard">
                                                        <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                                        <div className="bold">Please connect wallet to view your NFTs.</div>
                                                    </div>
                                                }
                                            </>
                                        }
                                    </div> :
                                    <div style={{width: "80px", height: "80px"}}></div>
                                }
                            </div>
                        </> :
                        <div style={{padding: "20px", width: "800px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}} className="pixel">
                            <Oval stroke="#ff007a" strokeWidth="5px" />
                            <div className='blink' style={{marginLeft: "25px", fontSize: "20px"}}>{loadingText}</div>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Mkp
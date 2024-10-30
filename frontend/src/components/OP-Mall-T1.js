import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { Oval } from 'react-loading-icons'

const t1BKC = '0xc6Ce0974DDC4cE4B76d9190dd8d48866A9976DE9'
const bridgeBKC = '0x78c6a5E606eaF3cC4f341965b3BEa44Fa1c76E2E'
const t1MALL = '0x224dFcCC4e6bFc2c25B0c5ee46D580f3Be77E3B4'
const providerOP = new ethers.getDefaultProvider('https://opt-mainnet.g.alchemy.com/v2/0shzCCUF1JEPvKjqoEuftQcYrgIufNzE')
const providerBKC = new ethers.getDefaultProvider('https://rpc.bitkubchain.io')

const OPMallT1 = ({ config, setisLoading, callMode, navigate, txupdate, setTxupdate, setisError, setErrMsg, erc721Abi, uniNftBridgeABI, multichainMallABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const { open } = useAppKit()
    const [bkcNft, setBkcNft] = React.useState([])
    const [opNft, setOpNft] = React.useState([])
    const [mintNft, setMintNft] = React.useState([])
    const [mkpNft, setMkpNft] = React.useState([])
    const [isSellModal, setIsSellModal] = React.useState(false)
    const [sellName, setSellName] = React.useState("")
    const [sellImage, setSellImage] = React.useState("")
    const [sellPrice, setSellPrice] = React.useState("")
    const [sellCount, setSellCount] = React.useState("")

    React.useEffect(() => {     
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        const bkcnftSC = new ethers.Contract(t1BKC, erc721Abi, providerBKC)
        const mkpnftSC = new ethers.Contract(t1MALL, multichainMallABI, providerOP)

        const thefetch = async () => {
            let nfts = []
            let walletRemoveDup = []
            if (address !== null) {
                const walletFilter = await bkcnftSC.filters.Transfer(null, address, null)
                const walletEvent = await bkcnftSC.queryFilter(walletFilter, 4843357, "latest")
                const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            }
            const data2 = address !== null ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: t1BKC,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 96
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
                        address: t1BKC,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 96
                    }
                ))
            }) : null
            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data3[i].result
                const response = await fetch(nftipfs)
                const nft = await response.json()
                let cmpow = 0 
                if (nft.attributes[0].value === "Normal") {
                    cmpow = 1000
                } else if (nft.attributes[0].value === "Rare") {
                    cmpow = 1200
                } else if (nft.attributes[0].value === "Super Rare") {
                    cmpow = 1800
                } else if (nft.attributes[0].value === "Ultra Rare") {
                    cmpow = 2500
                }
                nfts.push({
                    Id: yournftwallet[i].Id,
                    Name: nft.name + " #" + yournftwallet[i].Id,
                    Image: nft.image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: cmpow,
                    Onsell: false,
                    Count: null
                })
            }
            if (nfts.length === 0) { nfts.push(null) }

            let opnfts = []
            let opwalletRemoveDup = []
            if (address !== null) {
                const opwalletFilter = await mkpnftSC.filters.Transfer(null, address, null)
                const opwalletEvent = await mkpnftSC.queryFilter(opwalletFilter, 125216008, "latest")
                const opwalletMap = await Promise.all(opwalletEvent.map(async (obj) => String(obj.args.tokenId)))
                opwalletRemoveDup = opwalletMap.filter((obj, index) => opwalletMap.indexOf(obj) === index)
            }
            const data4 = address !== null ? await readContracts(config, {
                contracts: opwalletRemoveDup.map((item) => (
                    {
                        address: t1MALL,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 10
                    }
                ))
            }) : null
            let youropnftwallet = []
            for (let i = 0; i <= opwalletRemoveDup.length - 1 && address !== null; i++) {
                if (data4[i].result.toUpperCase() === address.toUpperCase()) {
                    youropnftwallet.push({Id: String(opwalletRemoveDup[i])})
                }
            }
            const data5 = address !== null ? await readContracts(config, {
                contracts: youropnftwallet.map((item) => (
                    {
                        address: t1MALL,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 10
                    }
                ))
            }) : null

            for (let i = 0; i <= youropnftwallet.length - 1; i++) {
                const nftipfs = data5[i].result
                const response = await fetch(nftipfs)
                const nft = await response.json()
                opnfts.push({
                    Id: youropnftwallet[i].Id,
                    Name: nft.name + " #" + youropnftwallet[i].Id,
                    Image: nft.image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(youropnftwallet[i].Id.slice(-5)),
                    Onsell: false,
                    Count: null
                })
            }
            if (opnfts.length === 0) { opnfts.push(null) }

            const mintItemFilter = await mkpnftSC.filters.MintItem(null, null, address)
            const mintItemEvent = await mkpnftSC.queryFilter(mintItemFilter, 125216008, "latest")
            const mintItemMap = await Promise.all(mintItemEvent.map(async (obj) => {return {NftId: String(obj.args.nftId), Count: String(obj.args.itemCount)}}))
            const mint_data = await readContracts(config, {
                contracts: mintItemMap.map((item) => (
                    {
                        address: t1MALL,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.NftId)],
                        chainId: 10
                    }
                ))
            })
            const mint_data2 = await readContracts(config, {
                contracts: mintItemMap.map((item) => (
                    {
                        address: t1MALL,
                        abi: multichainMallABI,
                        functionName: 'items',
                        args: [String(item.Count)],
                        chainId: 10
                    }
                ))
            })
            let yournftminter = []
            for (let i = 0; i <= mintItemMap.length - 1; i++) {
                const nftipfs = mint_data[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs)
                    nft = await response.json()
                } catch {}
                const image = nft.image
                yournftminter.push({
                    Id: mintItemMap[i].NftId, 
                    Name: nft.name + " #" + mintItemMap[i].NftId,
                    Image: image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(mintItemMap[i].NftId.slice(-5)),
                    Onsell: mint_data2[i].result[4],
                    Count: mintItemMap[i].Count,
                    Price: Number(ethers.utils.formatEther(mint_data2[i].result[3])),
                })
            }
            if (yournftminter.length === 0) { yournftminter.push(null) }

            const mkpCount = await readContract(config, {
                address: t1MALL,
                abi: multichainMallABI,
                functionName: 'itemCount',
                chainId: 10
            })
            let mkpdata = []
            for (let i = 1; i <= Number(mkpCount); i++) {
                const mkp_data = await readContract(config, {
                    address: t1MALL,
                    abi: multichainMallABI,
                    functionName: 'items',
                    args: [i],
                    chainId: 10
                })
                if (!mkp_data[4] && String(mkp_data[3]) !== '999999999000000000000000000' && String(mkp_data[3]) !== '0') {
                    mkpdata.push(mkp_data)
                }
            }
            const mkp_data2 = await readContracts(config, {
                contracts: mkpdata.map((item) => (
                    {
                        address: t1MALL,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item[2])],
                        chainId: 10
                    }
                ))
            })
            let mkpnft = []
            for (let i = 0; i <= mkpdata.length - 1; i++) {
                const nftipfs = mkp_data2[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs)
                    nft = await response.json()
                } catch {}
                const image = nft.image
                mkpnft.push({
                    Id: String(mkpdata[i][2]), 
                    Name: nft.name + " #" + String(mkpdata[i][2]),
                    Image: image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(String(mkpdata[i][2]).slice(-5)),
                    Onsell: true,
                    Count: i + 1,
                    Seller: mkpdata[i][0].slice(0, 4) + "..." + mkpdata[i][0].slice(-4),
                    Buyer: mkpdata[i][1].slice(0, 4) + "..." + mkpdata[i][1].slice(-4),
                    Price: Number(ethers.utils.formatEther(mkpdata[i][3])),
                    Sold: mkpdata[i][4]
                })
            }
            if (mkpnft.length === 0) { mkpnft.push(null) }

            return [nfts, opnfts, yournftminter, mkpnft, ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setBkcNft(result[0])
            setOpNft(result[1])
            setMintNft(result[2])
            setMkpNft(result[3])
        })

    }, [config, address, txupdate, erc721Abi, multichainMallABI])

    const depositHandle = async (_nftId) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract(config, {
                address: t1BKC,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftId],
            })
            if (nftAllow.toUpperCase() !== bridgeBKC.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: t1BKC,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [bridgeBKC, _nftId],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }        
            let { request } = await simulateContract(config, {
                address: bridgeBKC,
                abi: uniNftBridgeABI,
                functionName: 'receiveNfts',
                args: [1, _nftId],
                value: ethers.utils.parseEther('1'),
                chainId: 96,
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

    const sellPriceHandle = (event) => { setSellPrice(event.target.value) }
    const sell = (_nftname, _nftimage, _itemCount) => {
        setIsSellModal(true)
        setSellName(_nftname)
        setSellImage(_nftimage)
        setSellCount(_itemCount)
    }
    const sellHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: t1MALL,
                abi: multichainMallABI,
                functionName: 'listItem',
                args: [sellCount, ethers.utils.parseUnits(String(sellPrice, "wei"))]
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
                address: t1MALL,
                abi: multichainMallABI,
                functionName: 'removeItem',
                args: [_count],
                value: ethers.utils.parseEther('0.0003'),
                chainId: 10,
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

    const buyHandle = async (_count, _price) => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: t1MALL,
                abi: multichainMallABI,
                functionName: 'buyItem',
                args: [_count],
                value: ethers.utils.parseEther(String(_price)),
                chainId: 10,
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
                        <div className="bold" style={{width: "500px", height: "400px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", fontSize: "40px", letterSpacing: "3px"}}>
                            <img src={sellImage} width="120px" alt="sellnftpic" />
                            <div style={{fontSize: "14px"}}>{sellName}</div>
                            <div style={{width: "80%", fontSize: "12px", textAlign: "left"}}>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                                    <div style={{height: "30px", padding: "0 5px", marginRight: "10px", lineHeight: "32px"}} className="bold">SELL AS</div>
                                    <div style={{width: "fit-content", height: "30px", margin: 0, padding: "5px", border: "1px solid", borderRadius: "10px", fontSize: "12px"}} className="items bold">
                                        <img src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/10/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo.svg" width="20" alt="$ETH"/>
                                    </div>
                                </div>
                                <input style={{marginTop: "10px", width: "90%", padding: "10px"}} className="bold" type="number" min="0" step="0.1" placeholder="Enter Price" value={sellPrice} onChange={sellPriceHandle}></input>
                            </div>
                            <div style={{width: "78%", textAlign: "left", fontSize: "12px"}} className="bold">20% Platform fee (No Royalty fee!)</div>
                            <div className="button" style={{width: "50%"}} onClick={sellHandle}>SELL</div>
                            <div className="button" style={{width: "50%", background: "gray"}} onClick={() => setIsSellModal(false)}>CLOSE</div>
                        </div>
                    </div>
                </div>
            }
            {address !== null && chain !== undefined && (chain.id !== 10 && chain.id !== 96) ?
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                        <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "fit-content", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">MISMATCH CHAIN!</div>
                        <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to OP mainnet/Bitkub chain.</div>
                        <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => open({ view: 'Networks' })}>SWITCH NETWORK</div>
                        <div className="button" style={{marginTop: "10px", width: "50%", background: "gray"}} onClick={() => {callMode(0); navigate('/');}}>BACK TO HOME</div>
                        </div>
                    </div>
                </div> :
                <>
                    <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                    <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "20px", letterSpacing: "1px"}} className="bold">Thai League - Multichain Mall</div>
                    <div style={{width: "100%", padding: "0 45px 0 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", flexWrap: "wrap", fontSize: "16px"}}>
                        <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                            <div style={{width: "300px", marginBottom: "10px", textAlign: "initial", color: "#bdc2c4"}}>Bridging Fee</div>
                            <div style={{fontSize: "22px"}}>1 KUB/TX (BITKUB CHAIN)</div>
                            <div style={{fontSize: "22px"}}>0.0003 ETH/TX (OP MAINNET)</div>
                        </div>
                        <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                            <div style={{width: "300px", marginBottom: "10px", textAlign: "initial", color: "#bdc2c4"}}>Mall Fee</div>
                            <div style={{fontSize: "22px"}}>20% FEE (SOLD ON MALL)</div>
                            <div style={{fontSize: "22px"}}>0.0003 ETH (REDEEM TO YOURSELF)</div>
                        </div>
                    </div>
                    <div style={{textAlign: "left", height: "fit-content", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                        <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                        <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Listing On Mall</div>
                        {mkpNft.length > 0 ?
                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                                <div style={{textAlign: "left", marginTop: "20px", minHeight: "400px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                                    {mkpNft[0] !== null ?
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                            {mkpNft.map((item, index) => (
                                                <div style={{height: "450px", justifyContent: "flex-start", padding: "20px", margin: "20px 28px 15px 0px"}} className="nftCard" key={index}>
                                                    <div style={{marginTop: "20px", width: "95%", overflow: "hidden", display: "flex", justifyContent: "center"}}>
                                                        <img src={item.Image} height="200" alt="Can not load metadata." />
                                                    </div>
                                                    <div style={{marginTop: "40px", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div style={{height: "120px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                                                            <div style={{fontSize: "14px"}} className="emp bold">{item.Name}</div>
                                                            <div style={{fontSize: "16px", margin: "5px 0 12px 0"}} className="pixel">
                                                                {item.RewardPerSec} cmpow 
                                                            </div>
                                                            <div style={{display: "flex", flexDirection: "row"}} className="pixel">
                                                                <img src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/10/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo.svg" width="20" alt="$ETH"/>
                                                                <div style={{marginLeft: "5px"}}>{item.Price}</div>
                                                            </div>
                                                            <div style={{fontSize: "12px", marginBottom: "10px"}} className="light">[Seller : {item.Seller}]</div>
                                                            {!item.Sold ?
                                                                <>
                                                                    {chain !== undefined && chain.id === 10 ?
                                                                        <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "110px"}} className="pixel button" onClick={() => buyHandle(item.Count, item.Price)}>BUY NFT</div> :
                                                                        <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "110px", background: "gray"}} className="pixel button">BUY NFT</div>
                                                                    }
                                                                </> :
                                                                <div style={{fontSize: "12px", marginBottom: "10px"}} className="light">[Bought by : {item.Buyer}]</div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div> :
                                        <>
                                            {address !== null ?
                                                <div style={{justifyContent: "center", padding: "20px", margin: "10px 28px 15px 0px"}} className="nftCard">
                                                    <img src="https://l3img.b-cdn.net/ipfs/QmUmf3MEZg99qqLJ6GsewESVum8sm72gfH3wyiVPZGH6HA" width="150" alt="No_NFTs" />
                                                    <div style={{marginTop: "30px"}} className="bold">This wallet doesn't have NFTs.</div>
                                                </div> :
                                                <div style={{justifyContent: "center", padding: "20px", margin: "10px 28px 15px 0px"}} className="nftCard">
                                                    <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                                    <div className="bold">Please connect wallet to view your NFTs.</div>
                                                </div>
                                            }
                                        </>
                                    }
                                </div>
                            </div> :
                            <div style={{padding: "20px", width: "800px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}} className="pixel">
                                <Oval stroke="#ff007a" strokeWidth="5px" />
                            </div>
                        }
                        <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                        <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Your Mall</div>
                        {mintNft.length > 0 ?
                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                                <div style={{textAlign: "left", marginTop: "20px", minHeight: "400px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                                    {mintNft[0] !== null ?
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                            {mintNft.map((item, index) => (
                                                <div style={{height: "450px", justifyContent: "flex-start", padding: "20px", margin: "20px 28px 15px 0px"}} className="nftCard" key={index}>
                                                    <div style={{marginTop: "20px", width: "95%", overflow: "hidden", display: "flex", justifyContent: "center"}}>
                                                        <img src={item.Image} height="200" alt="Can not load metadata." />
                                                    </div>
                                                    <div style={{marginTop: "40px", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div style={{width: "100%", height: "100px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                                                            <div style={{fontSize: "14px"}} className="emp bold">{item.Name}</div>
                                                            <div style={{fontSize: "16px", margin: "5px 0 12px 0"}} className="pixel">
                                                                {item.RewardPerSec} cmpow 
                                                            </div>
                                                            {item.Price !== 999999999 &&
                                                                <div style={{display: "flex", flexDirection: "row"}} className="pixel">
                                                                    <img src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/10/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo.svg" width="20" alt="$ETH"/>
                                                                    <div style={{marginLeft: "5px"}}>{item.Price}</div>
                                                                </div>
                                                            }
                                                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", marginTop: "10px"}}>
                                                                {chain !== undefined && chain.id === 10 ?
                                                                    <>
                                                                        <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "110px"}} className="pixel button" onClick={() => sell(item.Name, item.Image, item.Count)}>LIST NFT</div>
                                                                        <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "110px", marginLeft: "10px"}} className="pixel button" onClick={() => remove(item.Count)}>REDEEM NFT</div>
                                                                    </> :
                                                                    <>
                                                                        <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "110px", background: "gray"}} className="pixel button">LIST NFT</div>
                                                                        <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "110px", background: "gray", marginLeft: "10px"}} className="pixel button">REDEEM NFT</div>
                                                                    </>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div> :
                                        <>
                                            {address !== null ?
                                                <div style={{justifyContent: "center", padding: "20px", margin: "10px 28px 15px 0px"}} className="nftCard">
                                                    <img src="https://l3img.b-cdn.net/ipfs/QmUmf3MEZg99qqLJ6GsewESVum8sm72gfH3wyiVPZGH6HA" width="150" alt="No_NFTs" />
                                                    <div style={{marginTop: "30px"}} className="bold">This wallet doesn't have NFTs.</div>
                                                </div> :
                                                <div style={{justifyContent: "center", padding: "20px", margin: "10px 28px 15px 0px"}} className="nftCard">
                                                    <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                                    <div className="bold">Please connect wallet to view your NFTs.</div>
                                                </div>
                                            }
                                        </>
                                    }
                                </div>
                            </div> :
                            <div style={{padding: "20px", width: "800px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}} className="pixel">
                                <Oval stroke="#ff007a" strokeWidth="5px" />
                            </div>
                        }
                        <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                        <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Your OP Mainnet Wallet</div>
                        {opNft.length > 0 ?
                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                                <div style={{textAlign: "left", marginTop: "20px", minHeight: "400px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                                    {opNft[0] !== null ?
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                            {opNft.map((item, index) => (
                                                <div style={{justifyContent: "flex-start", padding: "20px", margin: "20px 28px 15px 0px"}} className="nftCard" key={index}>
                                                    <div style={{marginTop: "20px", width: "95%", overflow: "hidden", display: "flex", justifyContent: "center"}}>
                                                        <img src={item.Image} height="200" alt="Can not load metadata." />
                                                    </div>
                                                    <div style={{marginTop: "40px", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div style={{height: "100px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                                                            <div style={{fontSize: "14px"}} className="emp bold">{item.Name}</div>
                                                            <div style={{fontSize: "16px", margin: "5px 0 12px 0"}} className="pixel">
                                                                {item.RewardPerSec} cmpow 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div> :
                                        <>
                                            {address !== null ?
                                                <div style={{justifyContent: "center", padding: "20px", margin: "10px 28px 15px 0px"}} className="nftCard">
                                                    <img src="https://l3img.b-cdn.net/ipfs/QmUmf3MEZg99qqLJ6GsewESVum8sm72gfH3wyiVPZGH6HA" width="150" alt="No_NFTs" />
                                                    <div style={{marginTop: "30px"}} className="bold">This wallet doesn't have NFTs.</div>
                                                </div> :
                                                <div style={{justifyContent: "center", padding: "20px", margin: "10px 28px 15px 0px"}} className="nftCard">
                                                    <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                                    <div className="bold">Please connect wallet to view your NFTs.</div>
                                                </div>
                                            }
                                        </>
                                    }
                                </div>
                            </div> :
                            <div style={{padding: "20px", width: "800px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}} className="pixel">
                                <Oval stroke="#ff007a" strokeWidth="5px" />
                            </div>
                        }
                        <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                        <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Your Bitkub Chain Wallet</div>
                        {bkcNft.length > 0 ?
                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                                <div style={{textAlign: "left", margin: "20px 0 80px 0", minHeight: "400px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                                    {bkcNft[0] !== null ?
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                            {bkcNft.map((item, index) => (
                                                <div style={{justifyContent: "flex-start", padding: "20px", margin: "20px 28px 15px 0px"}} className="nftCard" key={index}>
                                                    <div style={{marginTop: "20px", width: "95%", overflow: "hidden", display: "flex", justifyContent: "center"}}>
                                                        <img src={item.Image} height="200" alt="Can not load metadata." />
                                                    </div>
                                                    <div style={{marginTop: "40px", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div style={{height: "100px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                                                            <div style={{fontSize: "14px"}} className="emp bold">{item.Name}</div>
                                                            <div style={{fontSize: "16px", margin: "5px 0 12px 0"}} className="pixel">
                                                                {item.RewardPerSec} cmpow 
                                                            </div>
                                                            {chain !== undefined && chain.id === 96 ?
                                                                <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "120px"}} className="pixel button" onClick={() => depositHandle(item.Id)}>BRIDGE NFT</div> :
                                                                <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "120px", background: "gray"}} className="pixel button">BRIDGE NFT</div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div> :
                                        <>
                                            {address !== null ?
                                                <div style={{justifyContent: "center", padding: "20px", margin: "10px 28px 15px 0px"}} className="nftCard">
                                                    <img src="https://l3img.b-cdn.net/ipfs/QmUmf3MEZg99qqLJ6GsewESVum8sm72gfH3wyiVPZGH6HA" width="150" alt="No_NFTs" />
                                                    <div style={{marginTop: "30px"}} className="bold">This wallet doesn't have NFTs.</div>
                                                </div> :
                                                <div style={{justifyContent: "center", padding: "20px", margin: "10px 28px 15px 0px"}} className="nftCard">
                                                    <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                                    <div className="bold">Please connect wallet to view your NFTs.</div>
                                                </div>
                                            }
                                        </>
                                    }
                                </div>
                            </div> :
                            <div style={{marginBottom: "80px", padding: "20px", width: "800px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}} className="pixel">
                                <Oval stroke="#ff007a" strokeWidth="5px" />
                            </div>
                        }
                    </div>
                </>
            }
        </>
    )
}

export default OPMallT1
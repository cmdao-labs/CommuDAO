import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'

const wood = '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd'
const cu = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'

const land = '0x90B3a1F21D1C0BE9A8B6a6AA129066951AF63B72'
const cmdaoName = '0x9f3adB20430778f52C2f99c4FBed9637a49509F2'
const slot1 = '0x171b341FD1B8a2aDc1299f34961e19B552238cb5'
const house = '0xCb3AD565b9c08C4340A7Fe857c38595587843139'

const CmCityLand = ({ setisLoading, txupdate, setTxupdate, navigate, intrasubModetext, erc20ABI, erc721ABI, cmdaoNameABI, slot1ABI, houseABI }) => {
    const { address } = useAccount()
    
    let code = ''
    if (intrasubModetext.slice(0, 1).toUpperCase() === 'Z') {
        code = '26'
    } else if (intrasubModetext.slice(0, 1).toUpperCase() === 'A') {
        code = '01'
    } else if (intrasubModetext.slice(0, 1).toUpperCase() === 'B') {
        code = '02'
    } else if (intrasubModetext.slice(0, 1).toUpperCase() === 'C') {
        code = '03'
    }
    const tokenId = '100' + code + '0' + intrasubModetext.slice(1, 3)
    const [llAddr, setLlAddr] = React.useState(null)
    const [llName, setLlName] = React.useState('...')
    const [slot1Owner, setSlot1Owner] = React.useState('...')
    const [slot1Lv, setSlot1Lv] = React.useState(0)

    React.useEffect(() => {        
        window.scrollTo(0, 0)
        
        const thefetch = async () => {
            
            const data = await readContract({
                address: land,
                abi: erc721ABI,
                functionName: 'ownerOf',
                args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
            })
            const slot1owner = await readContract({
                address: slot1,
                abi: slot1ABI,
                functionName: 'slotOwner',
                args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
            })
            const slot1level = await readContract({
                address: slot1,
                abi: slot1ABI,
                functionName: 'slotLevel',
                args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
            })
            const id = await readContracts({
                contracts: [
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [data],
                    },
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [slot1owner],
                    }
                ],
            })
            const landlordname = await readContracts({
                contracts: [
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [id[0]],
                    },
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [id[1]],
                    }
                ],
            })

            return [data, landlordname, slot1level, ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setLlAddr(result[0])
            result[1] !== undefined && result[1][0] !== null ? setLlName(result[1][0]) : setLlName('Unknown')
            result[1] !== undefined && result[1][1] !== null ? setSlot1Owner(result[1][1]) : setSlot1Owner('Unknown')
            setSlot1Lv(Number(result[2]))
        })

    }, [code, intrasubModetext, erc721ABI, cmdaoNameABI, slot1ABI])

    const upgradeHouseHandle = async (_level) => {
        setisLoading(true)
        try {
            let woodUsage = 0
            let cuUsage = 0
            if (_level === 1) {
                woodUsage = 100000000
                cuUsage = 50000
            }
            const woodAllow = await readContract({
                address: wood,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, house],
            })
            if (woodAllow < (woodUsage * 10**18)) {
                const config = await prepareWriteContract({
                    address: wood,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [house, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const cuAllow = await readContract({
                address: cu,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, house],
            })
            if (cuAllow < (cuUsage * 10**18)) {
                const config2 = await prepareWriteContract({
                    address: cu,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [house, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const config3 = await prepareWriteContract({
                address: house,
                abi: houseABI,
                functionName: 'upgrade',
                args: [_level, tokenId]
            })
            const tx = await writeContract(config3)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    return (
        <>
            <div className="fieldBanner" style={{background: "#2b2268", borderBottom: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}} className="pixel">
                    <div style={{fontSize: "75px", width: "fit-content"}}>Land {intrasubModetext.toUpperCase()} of {llName}</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}}></div>
                </div>
                <div style={{margin: "30px 100px"}}>
                </div>
            </div>

            <div style={{background: "rgb(0, 19, 33", width: "100%", margin: "0", padding: "75px 0", minHeight: "inherit", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", overflow: "scroll"}} className="collection noscroll">
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", border: "1px solid rgb(54, 77, 94)", minWidth: "880px", width: "55%", height: "420px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">{slot1Owner}'S HOUSE LV.{slot1Lv}</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{width: "30%", height: "320px"}}>
                            {slot1Lv === 0 && <img src="https://nftstorage.link/ipfs/bafybeielpogfiry6r54yhzalsu2wmrp37oergq7v7r4w2qoljsesy6eoom" style={{filter: "grayscale(1)"}} height="200" alt="HOUSE.LV.1" />}
                            {slot1Lv === 1 && <img src="https://nftstorage.link/ipfs/bafybeielpogfiry6r54yhzalsu2wmrp37oergq7v7r4w2qoljsesy6eoom" height="200" alt="HOUSE.LV.1" />}
                        </div>
                        <div style={{width: "65%", height: "320px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <div>
                                <div className="bold">COSTS</div>
                                <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "28px"}} className="bold">
                                    <img src="https://nftstorage.link/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="30px" alt="$WOOD"/>
                                    <div style={{margin: "0 30px 0 10px"}}>100M</div>
                                    <img src="https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" height="30px" alt="$CU"/>
                                    <div style={{marginLeft: "10px"}}>50,000</div>
                                    
                                </div>
                            </div>
                            <div>
                                <div style={{margin: "20px 0", color: "#fff", fontSize: "12px"}} className="bold">SLEEP TO EARN!... STAKE COMMUDAO NFT TO EARN $OS</div>
                                {llAddr !== null && String(llAddr).toUpperCase() === address.toUpperCase() &&
                                    <>
                                        {slot1Lv !== 1 ?
                                            <div 
                                                style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)"}}
                                                className="bold button" 
                                                onClick={
                                                    () => {
                                                        if (slot1Lv === 0) {
                                                            upgradeHouseHandle(1)
                                                        }
                                                    }
                                                }
                                            >
                                                CONSTRUCT
                                            </div> :
                                            <div className="bold">COMING SOON...</div>
                                        }
                                    </>                                   
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CmCityLand
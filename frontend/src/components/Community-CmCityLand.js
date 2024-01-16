import React from 'react'
import { ethers } from 'ethers'
import { readContract, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount, usePrepareSendTransaction, useSendTransaction } from 'wagmi'

const land = '0x90B3a1F21D1C0BE9A8B6a6AA129066951AF63B72'
const cmdaoName = '0x9f3adB20430778f52C2f99c4FBed9637a49509F2'
const slot1 = '0x171b341FD1B8a2aDc1299f34961e19B552238cb5'

const CmCityLand = ({ setisLoading, txupdate, setTxupdate, navigate, intrasubModetext, erc721ABI, cmdaoNameABI, slot1ABI }) => {
    const { address } = useAccount()
    const [llAddr, setLlAddr] = React.useState(null)
    const [llName, setLlName] = React.useState('...')
    const [slot1Owner, setSlot1Owner] = React.useState('...')
    const [slot1Lv, setSlot1Lv] = React.useState(0)

    React.useEffect(() => {        
        window.scrollTo(0, 0)
        
        const thefetch = async () => {
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
            const data = await readContract({
                address: land,
                abi: erc721ABI,
                functionName: 'ownerOf',
                args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
            })
            const id = await readContract({
                address: cmdaoName,
                abi: cmdaoNameABI,
                functionName: 'yourName',
                args: [data],
            })
            const landlordname = Number(id) !== 0 ? await readContract({
                address: cmdaoName,
                abi: cmdaoNameABI,
                functionName: 'tokenURI',
                args: [id],
            }) : 'Unknown'
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

            return [data, landlordname, slot1owner, slot1level, ]
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
            setLlName(result[1])
            result[2] !== null && result[2].toUpperCase() !== '0X0000000000000000000000000000000000000000' ? setSlot1Owner(result[2]) : setSlot1Owner('Unknown')
            setSlot1Lv(Number(result[3]))
        })

    }, [erc721ABI, cmdaoNameABI, slot1ABI])

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
                            <img src="https://nftstorage.link/ipfs/bafybeielpogfiry6r54yhzalsu2wmrp37oergq7v7r4w2qoljsesy6eoom" height="200" alt="HOUSE.LV.1"/>
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
                                        {false ?
                                            <div style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)"}} className="bold button" onClick={console.log('yo')}>CONSTRUCT</div> :
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
import React from 'react'
import { readContracts } from '@wagmi/core'

const land = '0x90B3a1F21D1C0BE9A8B6a6AA129066951AF63B72'
const slot1 = '0x171b341FD1B8a2aDc1299f34961e19B552238cb5'
const cmdaoName = '0x9f3adB20430778f52C2f99c4FBed9637a49509F2'

const Community = ({ callMode, navigate, erc721ABI, cmdaoNameABI, slot1ABI }) => {
    const [yourName, setYourName] = React.useState(null)
    const [slot1Lv, setSlot1Lv] = React.useState(null)

    React.useEffect(() => {        
        window.scrollTo(0, 0)
        
        const thefetch = async () => {
            const data = await readContracts({
                contracts: [
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10001001'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10001002'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10001003'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10001004'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10001005'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10001006'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10001007'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10001008'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10001009'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10001010'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10001011'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10002001'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10002002'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10002003'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10002004'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10002005'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10002006'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10002007'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10002008'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10002009'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10026010'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10002010'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10002011'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003001'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003002'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003003'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003004'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003005'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003006'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003007'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003008'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003009'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003010'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003011'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003012'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003013'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003014'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003015'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003016'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003017'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003018'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003019'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003020'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003021'],
                    },
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['10003022'],
                    },
                ],
            })
            const id = await readContracts({
                contracts: data.map((item) => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [item],
                    }
                )),
            })
            const name = await readContracts({
                contracts: id.map((item) => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [item],
                    }
                )),
            })
            const data2 = await readContracts({
                contracts: [
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001001'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001002'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001003'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001004'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001005'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001006'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001007'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001008'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001009'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001010'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10001011'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002001'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002002'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002003'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002004'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002005'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002006'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002007'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002008'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002009'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10026010'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002010'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10002011'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003001'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003002'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003003'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003004'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003005'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003006'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003007'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003008'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003009'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003010'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003011'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003012'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003013'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003014'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003015'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003016'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003017'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003018'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003019'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003020'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003021'],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['10003022'],
                    },
                ],
            })

            return [name, data2]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setYourName(result[0])
            setSlot1Lv(result[1])
        })

    }, [erc721ABI, cmdaoNameABI, slot1ABI])

    return (
    <>
        <div className="fieldBanner" style={{background: "#2b2268", borderBottom: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}} className="pixel">
                <div style={{fontSize: "75px", width: "fit-content"}}>Community</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}}>Build our decentralized community with DAO token.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="../background/commulogo.png" width="150" alt="Community_Logo" />
            </div>
        </div>

        <div style={{background: "rgb(0, 19, 33)", margin: "0", padding: "75px 0", minHeight: "inherit"}} className="collection pixel">
            <div style={{width: "1216px", maxWidth: "78%", marginBottom: "30px", textAlign: "left", fontSize: "22.5px", color: "#fff"}}>CM CITY - Urban District</div>
            <div style={{padding: 0, borderRadius: 0, border: "none", background: "transparent", boxShadow: "none", width: "1216px", maxWidth: "78%", height: "1216px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                <div id="tile1" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a01');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[0]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[0]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[0] !== null ? <span>{String(yourName[0]) + "'s Land [A01]"}</span> : 'Land A01'}</div>
                </div>
                <div id="tile2" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a02');}}>
                <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[1]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[1]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[1] !== null ? <span>{String(yourName[1]) + "'s Land [A02]"}</span> : 'Land A02'}</div>
                </div>
                <div id="tile3" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(41); navigate('/community/cmcity-citycenter');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeidtpeph5ix5phlf2et2i665lesc76pidjxiazlamumn6ncidpumle" width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>City Center</div>
                </div>
                <div id="tile4" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z02 (Reserved)</div>
                </div>
                <div id="tile5" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z03 (Reserved)</div>
                </div>
                <div id="tile6" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z04 (Reserved)</div>
                </div>
                <div id="tile7" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a03');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[2]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[2]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[2] !== null ? <span>{String(yourName[2]) + "'s Land [A03]"}</span> : 'Land A03'}</div>
                </div>
                <div id="tile8" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a04');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[3]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[3]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[3] !== null ? <span>{String(yourName[3]) + "'s Land [A04]"}</span> : 'Land A04'}</div>
                </div>
                <div id="tile9" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a05');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[4]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[4]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[4] !== null ? <span>{String(yourName[4]) + "'s Land [A05]"}</span> : 'Land A05'}</div>
                </div>
                <div id="tile10" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a06');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[5]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[5]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[5] !== null ? <span>{String(yourName[5]) + "'s Land [A06]"}</span> : 'Land A06'}</div>
                </div>
                <div id="tile11" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z05 (Reserved)</div>
                </div>
                <div id="tile12" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a07');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[6]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[6]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[6] !== null ? <span>{String(yourName[6]) + "'s Land [A07]"}</span> : 'Land A07'}</div>
                </div>
                <div id="tile13" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a08');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[7]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[7]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[7] !== null ? <span>{String(yourName[7]) + "'s Land [A08]"}</span> : 'Land A08'}</div>
                </div>
                <div id="tile14" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a09');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[8]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[8]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[8] !== null ? <span>{String(yourName[8]) + "'s Land [A09]"}</span> : 'Land A09'}</div>
                </div>
                <div id="tile15" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a10');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[9]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[9]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[9] !== null ? <span>{String(yourName[9]) + "'s Land [A10]"}</span> : 'Land A10'}</div>
                </div>
                <div id="tile16" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a11');}}>
                <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[10]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[10]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[10] !== null ? <span>{String(yourName[10]) + "'s Land [A11]"}</span> : 'Land A11'}</div>
                </div>
                <div id="tile17" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b01');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[11]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[11]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[11] !== null ? <span>{String(yourName[11]) + "'s Land [B01]"}</span> : 'Land B01'}</div>
                </div>
                <div id="tile18" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b02');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[12]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[12]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[12] !== null ? <span>{String(yourName[12]) + "'s Land [B02]"}</span> : 'Land B02'}</div>
                </div>
                <div id="tile19" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z06 (Reserved)</div>
                </div>
                <div id="tile20" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b03');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[13]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[13]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[13] !== null ? <span>{String(yourName[13]) + "'s Land [B03]"}</span> : 'Land B03'}</div>
                </div>
                <div id="tile21" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b04');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[14]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[14]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[14] !== null ? <span>{String(yourName[14]) + "'s Land [B04]"}</span> : 'Land B04'}</div>
                </div>
                <div id="tile22" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b05');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[15]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[15]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[15] !== null ? <span>{String(yourName[15]) + "'s Land [B05]"}</span> : 'Land B05'}</div>
                </div>
                <div id="tile23" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b06');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[16]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[16]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[16] !== null ? <span>{String(yourName[16]) + "'s Land [B06]"}</span> : 'Land B06'}</div>
                </div>
                <div id="tile24" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b07');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[17]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[17]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[17] !== null ? <span>{String(yourName[17]) + "'s Land [B07]"}</span> : 'Land B07'}</div>
                </div>
                <div id="tile25" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b08');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[18]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[18]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[18] !== null ? <span>{String(yourName[18]) + "'s Land [B08]"}</span> : 'Land B08'}</div>
                </div>
                <div id="tile26" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b09');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[19]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[19]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[19] !== null ? <span>{String(yourName[19]) + "'s Land [B09]"}</span> : 'Land B09'}</div>
                </div>
                <div id="tile27" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z07 (Reserved)</div>
                </div>
                <div id="tile28" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z08 (Reserved)</div>
                </div>
                <div id="tile29" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z09 (Reserved)</div>
                </div>
                <div id="tile30" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(45); navigate('/community/cm-city/z10');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[20]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[20]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[20] !== null ? <span style={{color: "rgb(0, 227, 180)"}}>{String(yourName[20]) + "'s Land [Z10]"}</span> : 'Land Z10 (Reserved)'}</div>
                </div>
                <div id="tile31" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b10');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[21]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[21]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[21] !== null ? <span>{String(yourName[21]) + "'s Land [B10]"}</span> : 'Land B10'}</div>
                </div>
                <div id="tile32" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b11');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[22]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[22]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[22] !== null ? <span>{String(yourName[22]) + "'s Land [B11]"}</span> : 'Land B11'}</div>
                </div>
                <div id="tile33" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c01');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[23]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[23]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[23] !== null ? <span>{String(yourName[23]) + "'s Land [C01]"}</span> : 'Land C01'}</div>
                </div>
                <div id="tile34" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c02');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[24]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[24]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[24] !== null ? <span>{String(yourName[24]) + "'s Land [C02]"}</span> : 'Land C02'}</div>
                </div>
                <div id="tile35" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c03');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[25]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[25]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[25] !== null ? <span>{String(yourName[25]) + "'s Land [C03]"}</span> : 'Land C03'}</div>
                </div>
                <div id="tile36" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c04');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[26]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[26]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[26] !== null ? <span>{String(yourName[26]) + "'s Land [C04]"}</span> : 'Land C04'}</div>
                </div>
                <div id="tile37" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c05');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[27]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[27]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[27] !== null ? <span>{String(yourName[27]) + "'s Land [C05]"}</span> : 'Land C05'}</div>
                </div>
                <div id="tile38" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c06');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[28]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[28]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[28] !== null ? <span>{String(yourName[28]) + "'s Land [C06]"}</span> : 'Land C06'}</div>
                </div>
                <div id="tile39" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c07');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[29]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[29]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[29] !== null ? <span>{String(yourName[29]) + "'s Land [C07]"}</span> : 'Land C07'}</div>
                </div>
                <div id="tile40" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c08');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[30]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[30]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[30] !== null ? <span>{String(yourName[30]) + "'s Land [C08]"}</span> : 'Land C08'}</div>
                </div>
                <div id="tile41" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c09');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[31]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[31]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[31] !== null ? <span>{String(yourName[31]) + "'s Land [C09]"}</span> : 'Land C09'}</div>
                </div>
                <div id="tile42" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c10');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[32]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[32]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[32] !== null ? <span>{String(yourName[32]) + "'s Land [C10]"}</span> : 'Land C10'}</div>
                </div>
                <div id="tile43" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z11 (Reserved)</div>
                </div>
                <div id="tile44" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(44); navigate('/community/quester-oasis');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeib2y7ckngdnsilvvgdix65v3l3bfejwc7zf4g5l46rsr7cgpalghy" width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Quester Oasis</div>
                </div>
                <div id="tile45" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z13 (Reserved)</div>
                </div>
                <div id="tile46" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z14 (Reserved)</div>
                </div>
                <div id="tile47" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z15 (Reserved)</div>
                </div>
                <div id="tile48" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c11');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[33]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[33]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[33] !== null ? <span>{String(yourName[33]) + "'s Land [C11]"}</span> : 'Land C11'}</div>
                </div>
                <div id="tile49" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c12');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[34]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[34]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[34] !== null ? <span>{String(yourName[34]) + "'s Land [C12]"}</span> : 'Land C12'}</div>
                </div>
                <div id="tile50" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c13');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[35]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[35]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[35] !== null ? <span>{String(yourName[35]) + "'s Land [C13]"}</span> : 'Land C13'}</div>
                </div>
                <div id="tile51" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z16 (Reserved)</div>
                </div>
                <div id="tile52" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c14');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[36]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[36]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[36] !== null ? <span>{String(yourName[36]) + "'s Land [C14]"}</span> : 'Land C14'}</div>
                </div>
                <div id="tile53" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(42); navigate('/community/dungeon-arena');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibbhvrdk32e6locxnyi2twe7wmryouulbl6ehvprtzqtum24kxvae" width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Dungeon Arena</div>
                </div>
                <div id="tile54" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c15');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[37]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[37]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[37] !== null ? <span>{String(yourName[37]) + "'s Land [C15]"}</span> : 'Land C15'}</div>
                </div>
                <div id="tile55" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z18 (Reserved)</div>
                </div>
                <div id="tile56" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c16');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[38]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[38]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[38] !== null ? <span>{String(yourName[38]) + "'s Land [C16]"}</span> : 'Land C16'}</div>
                </div>
                <div id="tile57" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c17');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[39]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[39]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[39] !== null ? <span>{String(yourName[39]) + "'s Land [C17]"}</span> : 'Land C17'}</div>
                </div>
                <div id="tile58" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c18');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[40]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[40]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[40] !== null ? <span>{String(yourName[40]) + "'s Land [C18]"}</span> : 'Land C18'}</div>
                </div>
                <div id="tile59" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z19 (Reserved)</div>
                </div>
                <div id="tile60" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c19');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[41]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[41]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[41] !== null ? <span>{String(yourName[41]) + "'s Land [C19]"}</span> : 'Land C19'}</div>
                </div>
                <div id="tile61" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c20');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[42]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[42]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[42] !== null ? <span>{String(yourName[42]) + "'s Land [C20]"}</span> : 'Land C20'}</div>
                </div>
                <div id="tile62" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c21');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[43]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[43]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[43] !== null ? <span>{String(yourName[43]) + "'s Land [C21]"}</span> : 'Land C21'}</div>
                </div>
                <div id="tile63" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(43); navigate('/community/dumpster-hill');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeia7e5mzmszg7heigxfzthkmhnnk555hw35jygufvpomiolp5lab3i" width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Dumpster Hill</div>
                </div>
                <div id="tile64" className='emp tile' style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c22');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[44]) === 0) && <img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[44]) >= 1) && <img src="https://nftstorage.link/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye" width="120" alt="Can't load metadata" />}
                    </div>
                    <div style={{marginTop: "10px"}}>{yourName !== null && yourName[44] !== null ? <span>{String(yourName[44]) + "'s Land [C22]"}</span> : 'Land C22'}</div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Community
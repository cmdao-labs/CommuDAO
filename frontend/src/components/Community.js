import React from 'react'
import { readContracts } from '@wagmi/core'

const land = '0x90B3a1F21D1C0BE9A8B6a6AA129066951AF63B72'
const slot1 = '0x171b341FD1B8a2aDc1299f34961e19B552238cb5'
const cmdaoName = '0x9f3adB20430778f52C2f99c4FBed9637a49509F2'

const Community = ({ config, callMode, navigate, erc721Abi, cmdaoNameABI, slot1ABI }) => {
    const [yourName, setYourName] = React.useState(null)
    const [slot1Lv, setSlot1Lv] = React.useState(null)

    React.useEffect(() => {        
        window.scrollTo(0, 0)
        
        const thefetch = async () => {
            const data = await readContracts(config, {
                contracts: [
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10001001'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10001002'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10001003'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10001004'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10001005'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10001006'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10001007'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10001008'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10001009'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10001010'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10001011'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10002001'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10002002'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10002003'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10002004'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10002005'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10002006'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10002007'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10002008'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10002009'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10026010'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10002010'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10002011'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003001'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003002'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003003'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003004'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003005'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003006'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003007'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003008'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003009'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003010'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003011'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003012'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003013'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003014'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003015'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003016'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003017'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003018'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003019'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003020'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003021'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10003022'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10026002'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10026006'], chainId: 8899 },
                    { address: land, abi: erc721Abi, functionName: 'ownerOf', args: ['10026011'], chainId: 8899 },
                ],
            })
            const dataArr = []
            for (let i = 0; i <= Number(data.length - 1); i++) {
                dataArr.push(data[i].result)
            }
            const id = await readContracts(config, {
                contracts: dataArr.map((item) => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [item],
                    }
                )),
            })
            const idArr = []
            for (let i = 0; i <= Number(id.length - 1); i++) {
                idArr.push(Number(id[i].result))
            }
            const name = await readContracts(config, {
                contracts: idArr.map((item) => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [item],
                    }
                )),
            })
            const nameArr = []
            for (let i = 0; i <= Number(name.length - 1); i++) {
                nameArr.push(name[i].result)
            }
            const data2 = await readContracts(config, {
                contracts: [
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001001'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001002'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001003'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001004'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001005'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001006'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001007'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001008'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001009'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001010'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001011'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002001'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002002'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002003'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002004'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002005'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002006'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002007'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002008'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002009'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10026010'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002010'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002011'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003001'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003002'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003003'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003004'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003005'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003006'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003007'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003008'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003009'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003010'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003011'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003012'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003013'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003014'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003015'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003016'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003017'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003018'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003019'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003020'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003021'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003022'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10026002'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10026006'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10026011'], chainId: 8899 },
                ],
            })
            const data2Arr = []
            for (let i = 0; i <= Number(data2.length - 1); i++) {
                data2Arr.push(data2[i].result)
            }

            return [nameArr, data2Arr]
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

    }, [config, erc721Abi, cmdaoNameABI, slot1ABI])

    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div className="SubfieldBanner pixel" style={{flexDirection: "column"}}>
                <div style={{fontSize: "75px", width: "fit-content"}}>Community</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}}>Build our decentralized community with DAO token.</div>
            </div>
            <div className="SubfieldBanner">
                <img src="../background/commulogo.png" width="150" alt="Community_Logo" />
            </div>
        </div>

        <div style={{margin: "0", padding: "75px 0", minHeight: "inherit"}} className="collection pixel">
            <div style={{width: "1216px", margin: "0 20px 60px 20px", textAlign: "left", fontSize: "22.5px"}}>CM CITY - Urban District</div>
            <div style={{padding: 0, margin: "0 20px", borderRadius: 0, border: "none", background: "transparent", boxShadow: "none", width: "1216px", height: "1216px", display: "flex", flexFlow: "column wrap", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                {/*col1*/}
                <div id="tile1" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a01');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[0]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[0]) >= 1 && Number(slot1Lv[0]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[0]) >= 6 && Number(slot1Lv[0]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[0])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[0] !== undefined ? <span>{String(yourName[0]) + "'s Land [A01]"}</span> : 'Land A01'}</div>
                </div>
                <div id="tile9" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a05');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[4]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[4]) >= 1 && Number(slot1Lv[4]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[4]) >= 6 && Number(slot1Lv[4]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[4])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[4] !== undefined ? <span>{String(yourName[4]) + "'s Land [A05]"}</span> : 'Land A05'}</div>
                </div>
                <div id="tile17" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b01');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[11]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[11]) >= 1 && Number(slot1Lv[11]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[11]) >= 6 && Number(slot1Lv[11]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[11])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[11] !== undefined ? <span>{String(yourName[11]) + "'s Land [B01]"}</span> : 'Land B01'}</div>
                </div>
                <div id="tile25" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b08');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[18]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[18]) >= 1 && Number(slot1Lv[18]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[18]) >= 6 && Number(slot1Lv[18]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[18])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[18] !== undefined ? <span>{String(yourName[18]) + "'s Land [B08]"}</span> : 'Land B08'}</div>
                </div>
                <div id="tile33" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c01');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[23]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[23]) >= 1 && Number(slot1Lv[23]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[23]) >= 6 && Number(slot1Lv[23]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[23])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[23] !== undefined ? <span>{String(yourName[23]) + "'s Land [C01]"}</span> : 'Land C01'}</div>
                </div>
                <div id="tile41" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c09');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[31]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[31]) >= 1 && Number(slot1Lv[31]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[31]) >= 6 && Number(slot1Lv[31]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[31])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[31] !== undefined ? <span>{String(yourName[31]) + "'s Land [C09]"}</span> : 'Land C09'}</div>
                </div>
                <div id="tile49" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c12');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[34]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[34]) >= 1 && Number(slot1Lv[34]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[34]) >= 6 && Number(slot1Lv[34]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[34])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[34] !== undefined ? <span>{String(yourName[34]) + "'s Land [C12]"}</span> : 'Land C12'}</div>
                </div>
                <div id="tile57" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c17');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[39]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[39]) >= 1 && Number(slot1Lv[39]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[39]) >= 6 && Number(slot1Lv[39]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[39])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[39] !== undefined ? <span>{String(yourName[39]) + "'s Land [C17]"}</span> : 'Land C17'}</div>
                </div>
                {/*col2*/}
                <div id="tile2" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a02');}}>
                <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[1]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[1]) >= 1 && Number(slot1Lv[1]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[1]) >= 6 && Number(slot1Lv[1]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[1])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[1] !== undefined ? <span>{String(yourName[1]) + "'s Land [A02]"}</span> : 'Land A02'}</div>
                </div>
                <div id="tile10" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a06');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[5]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[5]) >= 1 && Number(slot1Lv[5]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[5]) >= 6 && Number(slot1Lv[5]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[5])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[5] !== undefined ? <span>{String(yourName[5]) + "'s Land [A06]"}</span> : 'Land A06'}</div>
                </div>
                <div id="tile18" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b02');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[12]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[12]) >= 1 && Number(slot1Lv[12]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[12]) >= 6 && Number(slot1Lv[12]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[12])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[12] !== undefined ? <span>{String(yourName[12]) + "'s Land [B02]"}</span> : 'Land B02'}</div>
                </div>
                <div id="tile26" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b09');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[19]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[19]) >= 1 && Number(slot1Lv[19]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[19]) >= 6 && Number(slot1Lv[19]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[19])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[19] !== undefined ? <span>{String(yourName[19]) + "'s Land [B09]"}</span> : 'Land B09'}</div>
                </div>
                <div id="tile34" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c02');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[24]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[24]) >= 1 && Number(slot1Lv[24]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[24]) >= 6 && Number(slot1Lv[24]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[24])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[24] !== undefined ? <span>{String(yourName[24]) + "'s Land [C02]"}</span> : 'Land C02'}</div>
                </div>
                <div id="tile42" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c10');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[32]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[32]) >= 1 && Number(slot1Lv[32]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[32]) >= 6 && Number(slot1Lv[32]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[32])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[32] !== undefined ? <span>{String(yourName[32]) + "'s Land [C10]"}</span> : 'Land C10'}</div>
                </div>
                <div id="tile50" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c13');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[35]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[35]) >= 1 && Number(slot1Lv[35]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[35]) >= 6 && Number(slot1Lv[35]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[35])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[35] !== undefined ? <span>{String(yourName[35]) + "'s Land [C13]"}</span> : 'Land C13'}</div>
                </div>
                <div id="tile58" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c18');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[40]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[40]) >= 1 && Number(slot1Lv[40]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[40]) >= 6 && Number(slot1Lv[40]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[40])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[40] !== undefined ? <span>{String(yourName[40]) + "'s Land [C18]"}</span> : 'Land C18'}</div>
                </div>
                {/*col3*/}
                <div id="tile3" className="emp tile" style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(41); navigate('/community/cmcity-citycenter');}}>
                    <div style={{height: "100px", display: "flex", alignItems: "flex-end", overflow: "visible"}}>
                        {/*<img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeidtpeph5ix5phlf2et2i665lesc76pidjxiazlamumn6ncidpumle?img-width=400&img-height=400" width="120" alt="Can't load metadata" />*/}
                        {/*<img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiddh23ppumqcikjfskf7egy4ffbqbfpyi2wz3lglu47box35rfalm?img-width=400&img-height=400" width="120" alt="Can't load metadata" />*/}
                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmURSfHpQCMYbBBHGbzqkjGh8edPa7z2rVQhNVZHecXxfX?img-width=400&img-height=400" width="120" alt="Can't load metadata" />
                    </div>
                    <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.3</div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>City Center</div>
                </div>
                <div id="tile11" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>Land Z05 (Reserved)</div>
                </div>
                <div id="tile19" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(45); navigate('/community/cm-city/z06');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[46]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[46]) >= 1 && Number(slot1Lv[46]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[46]) >= 6 && Number(slot1Lv[46]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[46])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[46] !== undefined ? <span style={{color: "rgb(0, 227, 180)"}}>{String(yourName[46]) + "'s Land [Z06]"}</span> : 'Land Z06 (Reserved)'}</div>
                </div>
                <div id="tile27" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>Land Z07 (Reserved)</div>
                </div>
                <div id="tile35" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c03');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[25]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[25]) >= 1 && Number(slot1Lv[25]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[25]) >= 6 && Number(slot1Lv[25]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[25])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[25] !== undefined ? <span>{String(yourName[25]) + "'s Land [C03]"}</span> : 'Land C03'}</div>
                </div>
                <div id="tile43" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(45); navigate('/community/cm-city/z11');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[47]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[47]) >= 1 && Number(slot1Lv[47]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[47]) >= 6 && Number(slot1Lv[47]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[47])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[47] !== undefined ? <span style={{color: "rgb(0, 227, 180)"}}>{String(yourName[47]) + "'s Land [Z11]"}</span> : 'Land Z11 (Reserved)'}</div>
                </div>
                <div id="tile51" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>Land Z16 (Reserved)</div>
                </div>
                <div id="tile59" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>Land Z19 (Reserved)</div>
                </div>
                {/*col4*/}
                <div id="tile4" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(45); navigate('/community/cm-city/z02');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[45]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[45]) >= 1 && Number(slot1Lv[45]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[45]) >= 6 && Number(slot1Lv[45]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[45])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[45] !== undefined ? <span style={{color: "rgb(0, 227, 180)"}}>{String(yourName[45]) + "'s Land [Z02]"}</span> : 'Land Z02 (Reserved)'}</div>
                </div>
                <div id="tile12" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a07');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[6]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[6]) >= 1 && Number(slot1Lv[6]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[6]) >= 6 && Number(slot1Lv[6]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[6])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[6] !== undefined ? <span>{String(yourName[6]) + "'s Land [A07]"}</span> : 'Land A07'}</div>
                </div>
                <div id="tile20" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b03');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[13]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[13]) >= 1 && Number(slot1Lv[13]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[13]) >= 6 && Number(slot1Lv[13]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[13])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[13] !== undefined ? <span>{String(yourName[13]) + "'s Land [B03]"}</span> : 'Land B03'}</div>
                </div>
                <div id="tile28" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>Land Z08 (Reserved)</div>
                </div>
                <div id="tile36" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c04');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[26]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[26]) >= 1 && Number(slot1Lv[26]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[26]) >= 6 && Number(slot1Lv[26]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[26])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[26] !== undefined ? <span>{String(yourName[26]) + "'s Land [C04]"}</span> : 'Land C04'}</div>
                </div>
                <div id="tile44" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(44); navigate('/community/quester-oasis');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeib2y7ckngdnsilvvgdix65v3l3bfejwc7zf4g5l46rsr7cgpalghy?img-width=400&img-height=400" width="120" alt="Can't load metadata" /></div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>Quester Oasis</div>
                </div>
                <div id="tile52" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c14');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[36]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[36]) >= 1 && Number(slot1Lv[36]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[36]) >= 6 && Number(slot1Lv[36]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[36])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[36] !== undefined ? <span>{String(yourName[36]) + "'s Land [C14]"}</span> : 'Land C14'}</div>
                </div>
                <div id="tile60" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c19');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[41]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[41]) >= 1 && Number(slot1Lv[41]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[41]) >= 6 && Number(slot1Lv[41]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[41])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[41] !== undefined ? <span>{String(yourName[41]) + "'s Land [C19]"}</span> : 'Land C19'}</div>
                </div>
                {/*col5*/}
                <div id="tile5" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(46); navigate('/community/bigbro-analytica');}}>
                    <div style={{height: "100px", display: "flex", alignItems: "flex-end"}}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeigbpmyjxigrzff356fq7pxv2755772trrky3tnxzh7zqyjiiv4qvi?img-width=400&img-height=400" width="120" alt="Can't load metadata" /></div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>BigBro Analytica</div>
                </div>
                <div id="tile13" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a08');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[7]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[7]) >= 1 && Number(slot1Lv[7]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[7]) >= 6 && Number(slot1Lv[7]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[7])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[7] !== undefined ? <span>{String(yourName[7]) + "'s Land [A08]"}</span> : 'Land A08'}</div>
                </div>
                <div id="tile21" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b04');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[14]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[14]) >= 1 && Number(slot1Lv[14]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[14]) >= 6 && Number(slot1Lv[14]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[14])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[14] !== undefined ? <span>{String(yourName[14]) + "'s Land [B04]"}</span> : 'Land B04'}</div>
                </div>
                <div id="tile29" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>Land Z09 (Reserved)</div>
                </div>
                <div id="tile37" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c05');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[27]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[27]) >= 1 && Number(slot1Lv[27]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[27]) >= 6 && Number(slot1Lv[27]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[27])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[27] !== undefined ? <span>{String(yourName[27]) + "'s Land [C05]"}</span> : 'Land C05'}</div>
                </div>
                <div id="tile45" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>Land Z13 (Reserved)</div>
                </div>
                <div id="tile53" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(42); navigate('/community/dungeon-arena');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibbhvrdk32e6locxnyi2twe7wmryouulbl6ehvprtzqtum24kxvae?img-width=400&img-height=400" width="120" alt="Can't load metadata" /></div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>Dungeon Arena</div>
                </div>
                <div id="tile61" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c20');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[42]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[42]) >= 1 && Number(slot1Lv[42]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[42]) >= 6 && Number(slot1Lv[42]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[42])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[42] !== undefined ? <span>{String(yourName[42]) + "'s Land [C20]"}</span> : 'Land C20'}</div>
                </div>
                {/*col6*/}
                <div id="tile6" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>Land Z04 (Reserved)</div>
                </div>
                <div id="tile14" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a09');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[8]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[8]) >= 1 && Number(slot1Lv[8]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[8]) >= 6 && Number(slot1Lv[8]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[8])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[8] !== undefined ? <span>{String(yourName[8]) + "'s Land [A09]"}</span> : 'Land A09'}</div>
                </div>
                <div id="tile22" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b05');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[15]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[15]) >= 1 && Number(slot1Lv[15]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[15]) >= 6 && Number(slot1Lv[15]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[15])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[15] !== undefined ? <span>{String(yourName[15]) + "'s Land [B05]"}</span> : 'Land B05'}</div>
                </div>
                <div id="tile30" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(45); navigate('/community/cm-city/z10');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[20]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[20]) >= 1 && Number(slot1Lv[20]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[20]) >= 6 && Number(slot1Lv[20]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[20])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[20] !== undefined ? <span style={{color: "rgb(0, 227, 180)"}}>{String(yourName[20]) + "'s Land [Z10]"}</span> : 'Land Z10 (Reserved)'}</div>
                </div>
                <div id="tile38" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c06');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[28]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[28]) >= 1 && Number(slot1Lv[28]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[28]) >= 6 && Number(slot1Lv[28]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[28])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[28] !== undefined ? <span>{String(yourName[28]) + "'s Land [C06]"}</span> : 'Land C06'}</div>
                </div>
                <div id="tile46" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>Land Z14 (Reserved)</div>
                </div>
                <div id="tile54" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c15');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[37]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[37]) >= 1 && Number(slot1Lv[37]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[37]) >= 6 && Number(slot1Lv[37]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[37])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[37] !== undefined ? <span>{String(yourName[37]) + "'s Land [C15]"}</span> : 'Land C15'}</div>
                </div>
                <div id="tile62" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c21');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[43]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[43]) >= 1 && Number(slot1Lv[43]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[43]) >= 6 && Number(slot1Lv[43]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[43])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[43] !== undefined ? <span>{String(yourName[43]) + "'s Land [C21]"}</span> : 'Land C21'}</div>
                </div>
                {/*col7*/}
                <div id="tile7" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a03');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[2]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[2]) >= 1 && Number(slot1Lv[2]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[2]) >= 6 && Number(slot1Lv[2]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[2])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[2] !== undefined ? <span>{String(yourName[2]) + "'s Land [A03]"}</span> : 'Land A03'}</div>
                </div>
                <div id="tile15" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a10');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[9]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[9]) >= 1 && Number(slot1Lv[9]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[9]) >= 6 && Number(slot1Lv[9]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[9])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[9] !== undefined ? <span>{String(yourName[9]) + "'s Land [A10]"}</span> : 'Land A10'}</div>
                </div>
                <div id="tile23" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b06');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[16]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[16]) >= 1 && Number(slot1Lv[16]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[16]) >= 6 && Number(slot1Lv[16]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[16])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[16] !== undefined ? <span>{String(yourName[16]) + "'s Land [B06]"}</span> : 'Land B06'}</div>
                </div>
                <div id="tile31" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b10');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[21]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[21]) >= 1 && Number(slot1Lv[21]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[21]) >= 6 && Number(slot1Lv[21]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[21])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[21] !== undefined ? <span>{String(yourName[21]) + "'s Land [B10]"}</span> : 'Land B10'}</div>
                </div>
                <div id="tile39" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c07');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[29]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[29]) >= 1 && Number(slot1Lv[29]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[29]) >= 6 && Number(slot1Lv[29]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[29])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[29] !== undefined ? <span>{String(yourName[29]) + "'s Land [C07]"}</span> : 'Land C07'}</div>
                </div>
                <div id="tile47" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>Land Z15 (Reserved)</div>
                </div>
                <div id="tile55" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>Land Z18 (Reserved)</div>
                </div>
                <div id="tile63" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(43); navigate('/community/dumpster-hill');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeia7e5mzmszg7heigxfzthkmhnnk555hw35jygufvpomiolp5lab3i?img-width=400&img-height=400" width="120" alt="Can't load metadata" /></div>
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>Dumpster Hill</div>
                </div>
                {/*col8*/}
                <div id="tile8" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a04');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[3]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[3]) >= 1 && Number(slot1Lv[3]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[3]) >= 6 && Number(slot1Lv[3]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[3])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[3] !== undefined ? <span>{String(yourName[3]) + "'s Land [A04]"}</span> : 'Land A04'}</div>
                </div>
                <div id="tile16" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/a11');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[10]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[10]) >= 1 && Number(slot1Lv[10]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[10]) >= 6 && Number(slot1Lv[10]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[10])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[10] !== undefined ? <span>{String(yourName[10]) + "'s Land [A11]"}</span> : 'Land A11'}</div>
                </div>
                <div id="tile24" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b07');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[17]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[17]) >= 1 && Number(slot1Lv[17]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[17]) >= 6 && Number(slot1Lv[17]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[17])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[17] !== undefined ? <span>{String(yourName[17]) + "'s Land [B07]"}</span> : 'Land B07'}</div>
                </div>
                <div id="tile32" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/b11');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[22]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[22]) >= 1 && Number(slot1Lv[22]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[22]) >= 6 && Number(slot1Lv[22]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[22])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[22] !== undefined ? <span>{String(yourName[22]) + "'s Land [B11]"}</span> : 'Land B11'}</div>
                </div>
                <div id="tile40" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c08');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[30]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[30]) >= 1 && Number(slot1Lv[30]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[30]) >= 6 && Number(slot1Lv[30]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[30])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[30] !== undefined ? <span>{String(yourName[30]) + "'s Land [C08]"}</span> : 'Land C08'}</div>
                </div>
                <div id="tile48" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c11');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[33]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[33]) >= 1 && Number(slot1Lv[33]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[33]) >= 6 && Number(slot1Lv[3]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[33])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[33] !== undefined ? <span>{String(yourName[33]) + "'s Land [C11]"}</span> : 'Land C11'}</div>
                </div>
                <div id="tile56" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c16');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[38]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[38]) >= 1 && Number(slot1Lv[38]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[38]) >= 6 && Number(slot1Lv[38]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[38])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[38] !== undefined ? <span>{String(yourName[38]) + "'s Land [C16]"}</span> : 'Land C16'}</div>
                </div>
                <div id="tile64" className='emp tile' style={{position: "relative", width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "flex-end", alignItems: "center", cursor: "pointer", color: "#fff"}} onClick={() => {callMode(45); navigate('/community/cm-city/c22');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}>
                        {(slot1Lv !== null && Number(slot1Lv[44]) === 0) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[44]) >= 1 && Number(slot1Lv[44]) <= 5) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeig2mzbeg2kt3jzlqjwbhso42kok37nmckm67ndtexjjl5abatigye?img-width=400&img-height=400" width="120" alt="Can't load metadata" />}
                        {(slot1Lv !== null && Number(slot1Lv[44]) >= 6 && Number(slot1Lv[44]) <= 10) && <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX?img-width=400&img-height=400" width="120" alt="HOUSE.LV.6" />}
                    </div>
                    {slot1Lv !== null && <div style={{position: "absolute", top: "5px", right: "5px", padding: "2px", fontSize: "16px"}}>lv.{Number(slot1Lv[44])}</div>}
                    <div style={{margin: "5px 0 10px 0", fontSize: "12px"}}>{yourName !== null && yourName[44] !== undefined ? <span>{String(yourName[44]) + "'s Land [C22]"}</span> : 'Land C22'}</div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Community
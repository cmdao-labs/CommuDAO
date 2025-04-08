import React from 'react'
import { ethers } from 'ethers'
import { readContracts, } from '@wagmi/core'
import { useAccount } from 'wagmi'
import OPMallT1 from  './OP-Mall-T1'
const { ethereum } = window
const cmdToken = "0x399fe73bb0ee60670430fd92fe25a0fdd308e142"

const OPMall = ({ config, setisLoading, callMode, navigate, txupdate, setTxupdate, setisError, setErrMsg, cmdaoAmmNpcABI, erc20Abi, erc721Abi, uniNftBridgeABI, multichainMallABI }) => {
    const [mode, setMode] = React.useState(0)
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const [cmdBalance, setCmdBalance] = React.useState(false)

    React.useEffect(() => {    
        window.scrollTo(0, 0)  
        console.log("Connected to " + address)
        
        const thefetch = async () => {
            
            const data = chain !== undefined && chain.id === 10 && address !== null ? await readContracts(config, {
                contracts: [
                    {
                        address: cmdToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 10,
                    },
                ],
            }) : [
                {result: 0},
            ]
            const cmdBal = data[0].result

            return [
                cmdBal,
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
            setCmdBalance(ethers.utils.formatEther(result[0]))
        })

    }, [config, chain, address, erc20Abi])

    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div className="SubfieldBanner" style={{flexDirection: "column"}}>
                    <div style={{fontSize: "75px", width: "fit-content"}} className="pixel">Mall</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px", letterSpacing: "1px"}} className="pixel">Automated Buy & Sell</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="../background/malllogo.png" width="150" alt="Mall_Logo" />
                </div>
            </div>

            <div className="collection" style={{minHeight: '50px'}}>
                <div style={{textAlign: "left", height: "fit-content", width: "95%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                    <div style={{width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Cryptocurrency</div>
                        <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                            <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                                <img 
                                    src="https://gateway.commudao.xyz/ipfs/bafkreidm3tpt3xpcmypzeaqicyxvihmygzu5mw3v74o6b2wve6ar5pdbs4"
                                    width="20"
                                    alt="$CMD"
                                    style={{cursor: "crosshair"}}
                                    onClick={async () => {
                                        await ethereum.request({
                                            method: 'wallet_watchAsset',
                                            params: {
                                                type: 'ERC20',
                                                options: {
                                                    address: cmdToken,
                                                    symbol: 'CMD',
                                                    decimals: 18,
                                                    image: 'https://gateway.commudao.xyz/ipfs/bafkreidm3tpt3xpcmypzeaqicyxvihmygzu5mw3v74o6b2wve6ar5pdbs4',
                                                },
                                            },
                                        })
                                    }}
                                />
                                <div style={{marginLeft: "5px"}}>{Number(cmdBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                    </div>
                </div>
            </div>

            <div style={{width: "92.5%", borderBottom: "1px solid #dddade", marginTop: "60px"}}></div>
            <div style={{width: "95%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", textAlign: "left"}} className="bold">Multichain Labs</div>
            <div className="collection">
                {mode === 0 &&
                    <div style={{textAlign: "left", height: "fit-content", width: "94%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                        <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                            <div className="nftCard" style={{justifyContent: "center", margin: "10px"}}>
                                <img src="https://gateway.commudao.xyz/ipfs/QmYzsLujATTRCW59ByddhxubEDXPtAb2fdtNvGYXutL2RC" height="230" alt="T1_BKC" />
                                <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                    <div className="pixel">
                                        NFT Collection
                                    </div>
                                    <div className="emp pixel">Thai League</div>
                                </div>
                                <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                    <div className="pixel">
                                        Source Chain
                                    </div>
                                    <div style={{display: "flex", flexDirection: "row"}} className="emp pixel">
                                        Bitkub Chain
                                    </div>                    
                                </div>
                                <div style={{width: "220px", margin: "40px 130px 0 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => setMode(1)}>Go to The T1 Mall</div>
                            </div>
                        </div>     
                    </div>
                }
                {mode === 1 && 
                    <div style={{textAlign: "left", height: "fit-content", width: "94%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                        <div className='hashtag' onClick={() => setMode(0)}>BACK</div>
                        <OPMallT1 config={config} setisLoading={setisLoading} callMode={callMode} navigate={navigate} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} uniNftBridgeABI={uniNftBridgeABI} multichainMallABI={multichainMallABI} />
                    </div>
                }
            </div>
        </>
    )
}

export default OPMall
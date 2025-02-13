import React from 'react'
import { ethers } from 'ethers'
import { readContracts, } from '@wagmi/core'
import { useAccount } from 'wagmi'
const { ethereum } = window
const cmdToken = "0x399fe73bb0ee60670430fd92fe25a0fdd308e142"

const OPLabs = ({ config, erc20Abi }) => {
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
                <div className="SubfieldBanner pixel" style={{flexDirection: "column"}}>
                    <div style={{fontSize: "75px", width: "fit-content"}}>Labs</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px", letterSpacing: "1px"}}>Craft, Await and Obtain!</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="../background/labslogo.png" width="150" alt="Labs_Logo" />
                </div>
            </div>

            <div className="collection" style={{minHeight: '50px'}}>
                <div style={{width: "95%", textAlign: "left", height: "fit-content", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
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

            <div style={{width: "87.5%", borderBottom: "1px solid #dddade", marginTop: "60px"}}></div>
            <div style={{width: "90%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", textAlign: "left"}} className="bold">Multichain Labs</div>
            <div style={{width: "90%", minHeight: 0,  marginBottom: "240px", justifyContent: "flex-start", flexWrap: "nowrap", overflow: "scroll"}} className="collection noscroll">
                <a style={{width: "380px", border: "1px solid #4637a9", padding: "20px 50px", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f", textDecoration: "none"}} className="pixel hashtag" href="https://form.typeform.com/to/KLWfiSWa" target="_blank" rel="noreferrer">✏️&nbsp;Permissionless create your labs</a> 
            </div>
        </>
    )
}

export default OPLabs

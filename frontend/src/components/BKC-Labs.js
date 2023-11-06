import React from 'react'
import { ethers } from 'ethers'
import { useAccount, useBalance, useContractReads } from 'wagmi'
const { ethereum } = window

const bstToken = "0xded5c3F32bC01C0F451A4FC79a11619eB78bAF5e"

const BKCLabs = ({ setisLoading, erc20ABI }) => {
    const { address } = useAccount()

    const { data: data_KUB, isLoading: isLoading_KUB } = useBalance({
        address: address,
        chainId: 96,
        watch: true,
    })

    const { data: data_Token, isLoading: isLoading_Token } = useContractReads({
        contracts: [
            {
                address: bstToken,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address],
            },
        ],
        chainId: 96,
        watch: true,
    })

    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}} className="pixel">
                <div style={{fontSize: "75px", width: "fit-content"}}>Labs</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px", letterSpacing: "1px"}}>Craft, Await and Obtain!</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="../background/labslogo.png" width="150" alt="Labs_Logo" />
            </div>
        </div>

        <div className="collection">
            <div style={{textAlign: "left", height: "fit-content", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                <div style={{width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Cryptocurrency</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img src="https://storage.googleapis.com/static.bitkubnext.com/bitkub-next/token-icons/kub.png" width="20" alt="$KUB"/>
                        <div style={{marginLeft: "5px"}}>{isLoading_KUB ? "..." : Number(data_KUB.formatted).toFixed(3)}</div>
                    </div>
                </div>

                <div style={{width: "100%", textIndent: "20px", fontSize: "15px", marginTop: "20px", letterSpacing: "1px"}} className="bold">Resources</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm"
                            width="20"
                            alt="$BST"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: bstToken,
                                            symbol: 'BST',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{isLoading_Token ? "..." : Number(ethers.utils.formatEther(data_Token[0])).toFixed(3)}</div>
                    </div>
                </div>

                <div style={{marginTop: "40px", width: "97.5%", borderBottom: "1px solid #dddade"}}></div>
                <div style={{marginTop: "20px", width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Labs & Factories</div>
            </div>
        </div>
    </>
    )

}

export default BKCLabs

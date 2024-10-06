import React from 'react'
import { ethers } from 'ethers'
import { fetchBalance, readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
const { ethereum } = window

const OPLabs = ({ setisLoading, txupdate, setTxupdate }) => {
    const { address } = useAccount()

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
                    <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                    <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Multichain Labs</div>
                    <a style={{width: "380px", margin: "40px 20px 20px 20px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f", textDecoration: "none"}} className="pixel hashtag" href="https://form.typeform.com/to/KLWfiSWa" target="_blank" rel="noreferrer">✏️&nbsp;Permissionless create your labs</a> 
                </div>
            </div>
        </>
    )
}

export default OPLabs

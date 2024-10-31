import React from 'react'
import { ethers } from 'ethers'
import { readContract, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
const { ethereum } = window

const salmBKC = '0xBc57A8D5456c145a09557e0aD0C5959948e0cf7E'
const aguaBKC = '0x024C5bbF60b3d89AB64aC49936e9FE384f781c4b'
const cosmosBKC = '0x8b062b96Bb689833D7870a0133650FA22302496d'
const engyBBQ = '0xBF389F85E4F71a78850Cca36c01430bC5b20e802'
const infpowOP = '0x1391a538985f2F897375219573c7F5D61EA33Cdf'
const infpowJBC = '0xCCbb477D6c28892d6311ebb729b4c242C92f70FD'
const opTokensBridge = '0xafb2a3a553574191cc6214d0aad7864c9b5efef7'
const bkcTokensBridge = '0x2Ce7d537A30FAd10cB0E460604e45D9D2460D66A'

const TBridgeHRM = ({ config, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc721Abi, tbridgeNFTABI, salmBalance, aguaBalance, cosmosBalance, engyBalance, infpowBalance, infpowJBCBalance, erc20Abi, uniTokensBridgeABI }) => {
    const { address, chain } = useAccount()
    const [substanceSelected, setSubstanceSelected] = React.useState("SALM")
    const [depositGas, setDepositGas] = React.useState('')
    const [depositProduct, setDepositProduct] = React.useState('')

    const depositTokensFromBKCHandle = async (_index) => {
        setisLoading(true)
        let tokenAddr = null
        let depositAmount = null
        if (_index === 1) { // to token 1, ENGY BBQ
            tokenAddr = salmBKC
            depositAmount = ethers.utils.parseEther(String(depositGas))
        } else if (_index === 2) { // to token 1, ENGY BBQ
            tokenAddr = aguaBKC
            depositAmount = depositGas
        } else if (_index === 3) { // to token 1, ENGY BBQ
            tokenAddr = cosmosBKC
            depositAmount = ethers.utils.parseEther(String(depositGas))
        }
        try {
            const tokenAllow = await readContract(config, {
                address: tokenAddr,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, bkcTokensBridge],
            })
            if (tokenAllow < Number(depositAmount)) {
                let { request } = await simulateContract(config, {
                    address: tokenAddr,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [bkcTokensBridge, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: bkcTokensBridge,
                abi: uniTokensBridgeABI,
                functionName: 'receiveTokens',
                args: [_index, depositAmount],
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
    const depositTokensFromOPHandle = async (_index) => {
        setisLoading(true)
        let tokenAddr = null
        let depositAmount = null
        if (_index === 1) {
            tokenAddr = infpowOP
            depositAmount = ethers.utils.parseEther(String(depositProduct))
        }
        try {
            const tokenAllow = await readContract(config, {
                address: tokenAddr,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, opTokensBridge],
            })
            if (tokenAllow < Number(depositAmount)) {
                let { request } = await simulateContract(config, {
                    address: tokenAddr,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [opTokensBridge, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: opTokensBridge,
                abi: uniTokensBridgeABI,
                functionName: 'receiveTokens',
                args: [_index, depositAmount],
                value: ethers.utils.parseEther('800'),
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
            <div style={{width: "70%", padding: "40px 45px 40px 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", overflow: "scroll", fontSize: "16px"}} className='noscroll'>
                <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                    <div style={{width: "300px", marginBottom: "20px", textAlign: "initial", color: "#bdc2c4"}}>Bridging Fee</div>
                    <div style={{fontSize: "22px"}}>1 KUB/TX (BITKUB CHAIN)</div>
                    <div style={{fontSize: "22px"}}>0.0003 ETH/TX (OP MAINNET)</div>
                </div>
            </div>
            <div style={{height: "560px", marginBottom: "20px", width: "1200px", maxWidth: "90%", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", overflow: "scroll", fontSize: "16px"}} className='noscroll'>
                <div style={{minWidth: "500px", maxWidth: "500px", height: "460px", padding: "40px 10px", background: "rgb(206, 208, 207)", boxShadow: "rgba(0, 0, 0, 0.35) 4px 4px 10px 0px, rgb(255, 255, 255) 1px 1px 0px 1px inset, rgb(136, 140, 143) -1px -1px 0px 1px inset", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                    <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "16px"}} className="pixel" value={substanceSelected} onChange={(event) => {setSubstanceSelected(event.target.value)}}>
                        <option value="SALM">SALMON</option>
                        <option value="AGUA">AGUA</option>
                        <option value="COSMOS">COSMOS</option>
                    </select>
                    <input
                        style={{width: "175px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "#fff", color: "#000", border: "2px solid", borderColor: "rgb(136, 140, 143) rgb(255, 255, 255) rgb(255, 255, 255) rgb(136, 140, 143)"}}
                        type="number"
                        step="1"
                        min="1"
                        placeholder={"0.0 " + substanceSelected}
                        value={depositGas}
                        onChange={(event) => setDepositGas(event.target.value)}
                    ></input>
                    {(chain !== undefined && address !== null) ? 
                        <>
                            {chain.id === 96 ? 
                                <div 
                                    style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", borderRadius: "0", fontSize: "12px"}} 
                                    className="button" 
                                    onClick={() => {
                                        if (substanceSelected === "SALM") {
                                            depositTokensFromBKCHandle(1)
                                        } else if (substanceSelected === "AGUA") {
                                            depositTokensFromBKCHandle(2)
                                        } else if (substanceSelected === "COSMOS") {
                                            depositTokensFromBKCHandle(3)
                                        }
                                    }}
                                >
                                    BRIDGE TO BBQ CHAIN
                                </div> : 
                                <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed", fontSize: "12px"}} className="button">BRIDGE TO BBQ CHAIN</div>
                            }
                        </> :
                        <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed", fontSize: "12px"}} className="button">BRIDGE TO BBQ CHAIN</div>
                    }
                    <div style={{width: "92%", margin: "20px 0", color: "#000", textAlign: "left", cursor: "pointer"}}>Balance: {Number(0).toFixed(4)} {substanceSelected}</div>
                    <div style={{width: "92%", margin: "10px 0", color: "gray", textAlign: "left", paddingBottom: "5px", borderBottom: "1px dotted gray"}}>Will receive: {substanceSelected === "SALM" && Math.floor(depositGas / 100)}{substanceSelected === "AGUA" && Math.floor(depositGas / 100000)}{substanceSelected === "COSMOS" && Math.floor(depositGas / 1000)} ENGY</div>
                    <div style={{width: "92%", margin: "10px 0", color: "gray", textAlign: "left", paddingBottom: "5px", borderBottom: "1px dotted gray",  display: "flex", alignItems: "center"}}>
                        <div>BITKUB CHAIN Balance: {substanceSelected === "SALM" && Number(salmBalance).toLocaleString('en-US', {maximumFractionDigits:2})}{substanceSelected === "AGUA" && Number(aguaBalance).toLocaleString('en-US', {maximumFractionDigits:2})}{substanceSelected === "COSMOS" && Number(cosmosBalance).toLocaleString('en-US', {maximumFractionDigits:2})} {substanceSelected}</div>
                        {substanceSelected === "SALM" &&
                            <img 
                                src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34"
                                width="20"
                                alt="$SALM"
                                style={{cursor: "crosshair", marginLeft: "5px"}}
                                onClick={async () => {
                                    await ethereum.request({
                                        method: 'wallet_watchAsset',
                                        params: {
                                            type: 'ERC20',
                                            options: {
                                                address: salmBKC,
                                                symbol: 'SALM',
                                                decimals: 18,
                                                image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34',
                                            },
                                        },
                                    })
                                }}
                            />
                        }
                        {substanceSelected === "AGUA" &&
                            <img 
                                src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibueyqenddliwzqeoafwtlktmnm33xqhfkxknucigj7ovpr7y5qeq"
                                width="20"
                                alt="$AGUA"
                                style={{cursor: "crosshair", marginLeft: "5px"}}
                                onClick={async () => {
                                    await ethereum.request({
                                        method: 'wallet_watchAsset',
                                        params: {
                                            type: 'ERC20',
                                            options: {
                                                address: aguaBKC,
                                                symbol: 'AGUA',
                                                decimals: 0,
                                                image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibueyqenddliwzqeoafwtlktmnm33xqhfkxknucigj7ovpr7y5qeq',
                                            },
                                        },
                                    })
                                }}
                            />
                        }
                        {substanceSelected === "COSMOS" &&
                            <img 
                                src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidcxukia62wzaaes6wpsdgpw3yjshrjm7nwijwldxdthkepsebumq"
                                width="20"
                                alt="$CMOS"
                                style={{cursor: "crosshair", marginLeft: "5px"}}
                                onClick={async () => {
                                    await ethereum.request({
                                        method: 'wallet_watchAsset',
                                        params: {
                                            type: 'ERC20',
                                            options: {
                                                address: cosmosBKC,
                                                symbol: 'CMOS',
                                                decimals: 18,
                                                image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidcxukia62wzaaes6wpsdgpw3yjshrjm7nwijwldxdthkepsebumq',
                                            },
                                        },
                                    })
                                }}
                            />
                        }
                    </div>
                    <div style={{width: "92%", margin: "10px 0", color: "gray", textAlign: "left", paddingBottom: "5px", borderBottom: "1px dotted gray", display: "flex", alignItems: "center"}}>
                        <div>BBQ CHAIN Balance: {Number(engyBalance).toLocaleString('en-US', {maximumFractionDigits:2})} ENGY</div>
                        <img 
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYyCnpA39K7F7iu9BR9YdPJTfXfzzFVhQuu4RT1y7XffB"
                            width="20"
                            alt="$HRM-ENGY"
                            style={{cursor: "crosshair", marginLeft: "5px"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: engyBBQ,
                                            symbol: 'HRM-ENGY',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYyCnpA39K7F7iu9BR9YdPJTfXfzzFVhQuu4RT1y7XffB',
                                        },
                                    },
                                })
                            }}
                        />
                    </div>
                    <div style={{width: "92%", margin: "10px 0 20px 0", textAlign: "left", color: "red"}}>⚠️ WARN: This operation is one-way bridging!</div>
                </div>

                <div style={{minWidth: "500px", maxWidth: "500px", height: "460px", padding: "40px 10px", background: "rgb(206, 208, 207)", boxShadow: "rgba(0, 0, 0, 0.35) 4px 4px 10px 0px, rgb(255, 255, 255) 1px 1px 0px 1px inset, rgb(136, 140, 143) -1px -1px 0px 1px inset", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap"}}>
                    <input
                        style={{width: "175px", maxWidth: "70%", padding: "10px", margin: "10px 0", backgroundColor: "#fff", color: "#000", border: "2px solid", borderColor: "rgb(136, 140, 143) rgb(255, 255, 255) rgb(255, 255, 255) rgb(136, 140, 143)"}}
                        type="number"
                        step="1"
                        min="1"
                        placeholder={"0.0 $INF.POW"}
                        value={depositProduct}
                        onChange={(event) => setDepositProduct(event.target.value)}
                    ></input>
                    {(chain !== undefined && address !== null) ? 
                        <>
                            {chain.id === 10 ? 
                                <div 
                                    style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", borderRadius: "0", fontSize: "12px"}} 
                                    className="button" 
                                    onClick={() => { depositTokensFromOPHandle(1) }}
                                >
                                    BRIDGE TO JIBCHAIN
                                </div> : 
                                <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed", fontSize: "12px"}} className="button">BRIDGE TO JIBCHAIN</div>
                            }
                        </> :
                        <div style={{maxHeight: "47px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed", fontSize: "12px"}} className="button">BRIDGE TO JIBCHAIN</div>
                    }
                    <div style={{width: "92%", margin: "20px 0", color: "#000", textAlign: "left", cursor: "pointer"}}>Balance: {Number(depositProduct).toFixed(4)} INF.POW (OP MAINNET)</div>
                    <div style={{width: "92%", margin: "10px 0", color: "gray", textAlign: "left", paddingBottom: "5px", borderBottom: "1px dotted gray"}}>Will receive: {Math.floor(depositProduct)} INF.POW (JIBCHAIN)</div>
                    <div style={{width: "92%", margin: "10px 0", color: "gray", textAlign: "left", paddingBottom: "5px", borderBottom: "1px dotted gray",  display: "flex", alignItems: "center"}}>
                        <div>OP MAINNET Balance: {Number(infpowBalance).toLocaleString('en-US', {maximumFractionDigits:2})} INF.POW</div>
                        <img 
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmbEWVgF3ZRvmDEF3RLKf7XDFr4SE5q4VEWR7taCqNnbU6"
                            width="20"
                            alt="$INF.POW"
                            style={{cursor: "crosshair", marginLeft: "5px"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: infpowOP,
                                            symbol: 'INF.POW',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmbEWVgF3ZRvmDEF3RLKf7XDFr4SE5q4VEWR7taCqNnbU6',
                                        },
                                    },
                                })
                            }}
                        />
                    </div>
                    <div style={{width: "92%", margin: "10px 0", color: "gray", textAlign: "left", paddingBottom: "5px", borderBottom: "1px dotted gray", display: "flex", alignItems: "center"}}>
                        <div>JIBCHAIN Balance: {Number(infpowJBCBalance).toLocaleString('en-US', {maximumFractionDigits:2})} INF.POW</div>
                        <img 
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmbEWVgF3ZRvmDEF3RLKf7XDFr4SE5q4VEWR7taCqNnbU6"
                            width="20"
                            alt="$INF.POW.JBC"
                            style={{cursor: "crosshair", marginLeft: "5px"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: infpowJBC,
                                            symbol: 'INF-POW-JBC',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmbEWVgF3ZRvmDEF3RLKf7XDFr4SE5q4VEWR7taCqNnbU6',
                                        },
                                    },
                                })
                            }}
                        />
                    </div>
                    <div style={{width: "92%", margin: "10px 0 20px 0", textAlign: "left", color: "red"}}>⚠️ WARN: This operation is one-way bridging!</div>
                </div>
            </div>
        </>
    )
}
    
export default TBridgeHRM
import React from 'react'
import { ethers } from 'ethers'
import { readContract } from '@wagmi/core'
import { useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi'

const jdao = "0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88"

const Headbar = ({ callMode, navigate, txupdate, erc20ABI }) => {
    const { address, isConnected } = useAccount()
    const { connect, connectors, error } = useConnect()
    const { chain } = useNetwork()
    const { switchNetwork } = useSwitchNetwork()
    const { disconnect } = useDisconnect()

    const [isChainInvalid, setIsChainInvalid] = React.useState(false)
    const [jdaoBalance, setJdaoBalance] = React.useState(0)

    React.useEffect(() => {
      if (chain !== undefined) {
        chain.id !== 8899 ? setIsChainInvalid(true) : setIsChainInvalid(false)
      }

      const thefetch = async () => {
        const jdaoBal = address !== null && address !== undefined ? await readContract({
            address: jdao,
            abi: erc20ABI,
            functionName: 'balanceOf',
            args: [address],
        }) : 0

        return [jdaoBal]
    }

    const promise = thefetch()

    const getAsync = () =>
        new Promise((resolve) => 
            setTimeout(
                () => resolve(promise), 1000
            )
        )

    getAsync().then(result => {
        setJdaoBalance(ethers.utils.formatEther(String(result[0])))
    })
    }, [chain, address, txupdate, erc20ABI])

    return (
      <>
        {isChainInvalid ?
          <div style={{zIndex: "999"}} className="centermodal">
            <div className="wrapper">
              <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "150px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
                <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">UNSUPPORT CHAIN!</div>
                <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to JBC L1.</div>
                <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => switchNetwork(8899)}>SWITCH NETWORK</div>
              </div>
            </div>
          </div> :
          <></>
        }
        <header>
          <div style={{display: "flex", flexDirection: "row"}} className="pixel">
            <div className="projectTitle" style={{display: "flex", flexDirection: "row"}} onClick={() => {callMode(0); navigate('/');}}>
              <img src="/../favicon.png" height="20" alt="CommuDAO_Logo" />
            </div>
            <div className="funcList" onClick={() => {callMode(1); navigate('/fields');}}>Fields</div>
            <div className="funcList" onClick={() => {callMode(2); navigate('/labs');}}>Labs</div>
            <div className="funcList" onClick={() => {callMode(3); navigate('/dungeon');}}>Dungeon</div>
            <div className="funcList" onClick={() => {callMode(4); navigate('/community');}}>Community</div>
            <div className="funcList" onClick={() => {callMode(5); navigate('/mall');}}>Mall</div>
            <div className="funcList" onClick={() => {callMode(6); navigate('/marketplace');}}>Marketplace</div>
            <div className="funcList" onClick={() => {callMode(7); navigate('/gameswap');}}>GameSwap</div>
            <a style={{textDecoration: "none", color: "#5f6476"}} href="https://commudao.xyz/tbridge-jusdt" target="_blank" rel="noreferrer"><div className="funcList">tBridge</div></a>
          </div>
          <div style={{fontSize: "16px"}} className="navButton pixel">
            {address !== null && address !== undefined ?
              <div id="jdaoBal" style={{width: "fit-content", height: "18px", border: "1px solid #5f6476", marginRight: "5px", color: "rgb(70, 55, 169)", padding: "7px 14px", display: "flex", flexDirection: "row", textAlign: "center", justifyContent: "center", letterSpacing: "1px", textDecoration: "none"}}>
                <div style={{display: "flex", flexDirection: "row"}}>
                  <img src="/../tokens/jdao.png" height="18" alt="$JDAO"/>
                  <div style={{marginLeft: "7.5px"}}>{Number(jdaoBalance).toFixed(3)}</div>
                </div>
              </div> :
              <></>
            }
            {isConnected ?
              <div id="walletDiv" style={{border: "1px solid", display: "flex", justifyContent: "center"}} className="wallet">{
                address.slice(0, 4) + "..." + address.slice(-4)}
                <i style={{fontSize: "16px", marginLeft: "15px", color: "#ff007a", cursor: "pointer"}} className="fa fa-sign-out" onClick={disconnect}></i>
              </div> :
              <>
                {connectors.map((connector) => (
                    <div 
                        id="walletDiv"
                        className="button wallet"
                        key={connector.id}
                        onClick={() => connect({ chainId: 8899, connector })}
                    >
                        <div style={{letterSpacing: 0}} className="pixel">
                          {error ?
                            <div style={{width: "115px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                              {error.message === "Connector not found" ?
                                <div>No Metamask</div> :
                                <div>{error.message}</div>
                              }
                            </div> :
                            <div>CONNECT WALLET</div>
                          }
                        </div>
                    </div>
                ))}
              </>
            }
          </div>
        </header>
      </>
    )
  }
  
  export default Headbar
  
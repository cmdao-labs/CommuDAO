import React from 'react'
import { ethers } from 'ethers'
import { readContract } from '@wagmi/core'
import { useAccount, useNetwork } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
const { ethereum } = window

const jdao = "0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88"
const cmos = '0x8b062b96Bb689833D7870a0133650FA22302496d'

const Headbar = ({ callMode, navigate, txupdate, erc20ABI }) => {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()

  const [isChainInvalid, setIsChainInvalid] = React.useState(false)
  const [jdaoBalance, setJdaoBalance] = React.useState(0)
  const [cmosBalance, setCmosBalance] = React.useState(0)

  React.useEffect(() => {
    if (chain !== undefined) {
      chain.id !== 8899 && chain.id !== 96 && chain.id !== 56 && chain.id !== 190 && chain.id !== 10 ? setIsChainInvalid(true) : setIsChainInvalid(false)
    }

    const thefetch = async () => {
      const jdaoBal = address !== null && address !== undefined ? await readContract({
        address: jdao,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [address],
        chainId: 8899,
      }) : 0
      const cmosBal = address !== null && address !== undefined ? await readContract({
        address: cmos,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [address],
        chainId: 96,
      }) : 0

      return [jdaoBal, cmosBal]
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
      setCmosBalance(ethers.utils.formatEther(String(result[1])))
    })
  }, [chain, address, txupdate, erc20ABI])

  return (
    <>
      {isChainInvalid &&
        <div style={{zIndex: "999"}} className="centermodal">
          <div className="wrapper">
            <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "fit-content", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
              <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">UNSUPPORT CHAIN!</div>
              <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to supported network.</div>
              <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => open({ view: 'Networks' })}>SWITCH NETWORK</div>
            </div>
          </div>
        </div>
      }
      <header>
        <div style={{display: "flex", flexDirection: "row"}} className="pixel">
          <div className="projectTitle" style={{display: "flex", flexDirection: "row"}} onClick={() => {callMode(0); navigate('/');}}>
            <img src="/../favicon.png" height="20" alt="CommuDAO_Logo" />
          </div>
          {chain !== undefined && chain.id === 8899 &&
            <> 
              <div className="funcList" onClick={() => {callMode(1); navigate('/fields');}}>Fields</div>
              <div className="funcList" onClick={() => {callMode(2); navigate('/labs');}}>Labs</div>
              <div className="funcList" onClick={() => {callMode(3); navigate('/dungeon');}}>Dungeon</div>
              <div className="funcList" onClick={() => {callMode(4); navigate('/community');}}>Community</div>
              <div className="funcList" onClick={() => {callMode(5); navigate('/mall');}}>Mall</div>
              <div className="funcList" onClick={() => {callMode(6); navigate('/marketplace');}}>Marketplace</div>
              <div className="funcList" onClick={() => {callMode(7); navigate('/gameswap');}}>GameSwap</div>
              <div className="funcList" onClick={() => {callMode(8); navigate('/tbridge');}}>tBridge</div>
            </>
          }
          {chain !== undefined && chain.id === 96 &&
            <> 
              <div className="funcList" onClick={() => {callMode(14); navigate('/fields/bkc');}}>Fields</div>
              <div className="funcList" onClick={() => {callMode(200); navigate('/labs/bkc');}}>Labs</div>
              <div className="funcList" onClick={() => {callMode(700); navigate('/gameswap/bkc');}}>GameSwap</div>
              <div className="funcList" onClick={() => {callMode(8); navigate('/tbridge');}}>tBridge</div>
            </>
          }
          {chain !== undefined && (chain.id === 56) &&
            <> 
              <div className="funcList" onClick={() => {callMode(8); navigate('/tbridge');}}>tBridge</div>
            </>
          }
          {chain !== undefined && (chain.id === 10) &&
            <> 
              <div className="funcList" style={{cursor: "not-allowed"}}>Fields</div>
              <div className="funcList" style={{cursor: "not-allowed"}}>Labs</div>
              <div className="funcList" onClick={() => {callMode(31001); navigate('/dungeon/abandoned-temple-vault');}}>Dungeon</div>
              <div className="funcList" onClick={() => {callMode(9); navigate('/guild/profile');}}>Guild</div>
              <div className="funcList" style={{cursor: "not-allowed"}}>Community</div>
              <div className="funcList" onClick={() => {callMode(52); navigate('/mall/op');}}>Mall</div>
              <div className="funcList" onClick={() => {callMode(701); navigate('/gameswap/op');}}>GameSwap</div>
              <div className="funcList" onClick={() => {callMode(8); navigate('/tbridge');}}>tBridge</div>
            </>
          }
          {chain !== undefined && chain.id === 190 &&
            <> 
              <div className="funcList" onClick={() => {callMode(9); navigate('/guild/profile');}}>Guild</div>
              <div className="funcList" onClick={() => {callMode(10000); navigate('/fields/bbqchain');}}>Fields</div>
              <div className="funcList" onClick={() => {callMode(20000); navigate('/labs/bbqchain');}}>Labs</div>
              <div className="funcList" onClick={() => {callMode(30000); navigate('/dungeon/bbqchain');}}>Dungeon</div>
              <div className="funcList" onClick={() => {callMode(51); navigate('/mall/bbqchain');}}>Mall</div>
              <div className="funcList" onClick={() => {callMode(8); navigate('/tbridge');}}>tBridge</div>
            </>
          }
        </div>
        <div style={{fontSize: "16px", marginRight: "10px"}} className="navButton pixel">
          {address !== null && address !== undefined && chain.id === 8899 &&
            <div id="jdaoBal" style={{width: "fit-content", height: "18px", background: "rgba(255, 255, 255, 0.4)", border: "0 solid #e2e8f0", marginRight: "5px", color: "rgb(70, 55, 169)", padding: "7px 14px", display: "flex", flexDirection: "row", textAlign: "center", justifyContent: "center", letterSpacing: "1px", textDecoration: "none"}}>
              <div style={{display: "flex", flexDirection: "row"}}>
                <img
                  src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq"
                  height="18"
                  alt="$JDAO"
                  style={{cursor: "crosshair"}}
                  onClick={async () => {
                    await ethereum.request({
                      method: 'wallet_watchAsset',
                      params: {
                        type: 'ERC20',
                        options: {
                          address: jdao,
                          symbol: 'JDAO',
                          decimals: 18,
                          image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq',
                        },
                      },
                    })
                  }}
                />
                <div style={{marginLeft: "7.5px"}}>{Number(jdaoBalance).toFixed(3)}</div>
              </div>
            </div>
          }
          {address !== null && address !== undefined && chain.id === 96 &&
            <div id="jdaoBal" style={{width: "fit-content", height: "18px", background: "rgba(255, 255, 255, 0.4)", border: "0 solid #e2e8f0", marginRight: "5px", color: "rgb(70, 55, 169)", padding: "7px 14px", display: "flex", flexDirection: "row", textAlign: "center", justifyContent: "center", letterSpacing: "1px", textDecoration: "none"}}>
              <div style={{display: "flex", flexDirection: "row"}}>
                <img
                  src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidcxukia62wzaaes6wpsdgpw3yjshrjm7nwijwldxdthkepsebumq"
                  height="18"
                  alt="$CMOS"
                  style={{cursor: "crosshair"}}
                  onClick={async () => {
                      await ethereum.request({
                          method: 'wallet_watchAsset',
                          params: {
                              type: 'ERC20',
                              options: {
                                address: cmos,
                                symbol: 'CMOS',
                                decimals: 18,
                                image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidcxukia62wzaaes6wpsdgpw3yjshrjm7nwijwldxdthkepsebumq',
                              },
                          },
                      })
                  }}
                />
                <div style={{marginLeft: "7.5px"}}>{Number(cmosBalance).toFixed(3)}</div>
              </div>
            </div>
          }
          {isConnected ?
            <w3m-account-button /> :
            <div 
              id="walletDiv"
              className="button wallet"
              onClick={() => {
                  try {
                    open()
                  } catch (e) {
                    console.log(e)
                    open()
                  }
                }
              }
            >
              <div style={{letterSpacing: 0}} className="pixel">
                CONNECT WALLET
              </div>
            </div>
          }
        </div>
      </header>
    </>
  )
}
  
export default Headbar
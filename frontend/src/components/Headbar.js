import React from 'react'
import { ethers } from 'ethers'
import { readContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
const { ethereum } = window

const jdao = "0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88"
const cmos = '0x8b062b96Bb689833D7870a0133650FA22302496d'

const Headbar = ({ config, callMode, navigate, txupdate, erc20Abi }) => {
  const { open } = useAppKit()
  const { address, isConnected, chain } = useAccount()
  const [jdaoBalance, setJdaoBalance] = React.useState(0)
  const [cmosBalance, setCmosBalance] = React.useState(0)

  React.useEffect(() => {
    const thefetch = async () => {
      const jdaoBal = address !== null && address !== undefined ? await readContract(config, {
        address: jdao,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address],
        chainId: 8899,
      }) : 0
      const cmosBal = address !== null && address !== undefined ? await readContract(config, {
        address: cmos,
        abi: erc20Abi,
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
  }, [config, address, txupdate, erc20Abi])

  return (
    <>
      {address !== undefined && chain === undefined ?
        <div style={{zIndex: "999"}} className="centermodal">
          <div className="wrapper">
            <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "fit-content", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
              <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">UNSUPPORT CHAIN!</div>
              <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to supported network.</div>
              <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => open({ view: 'Networks' })}>SWITCH NETWORK</div>
            </div>
          </div>
        </div> :
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
                <div className="funcList" onClick={() => {callMode(31001); navigate('/dungeon/abandoned-temple-vault');}}>Dungeon</div>
                <div className="funcList" onClick={() => {callMode(52); navigate('/mall/op');}}>Mall</div>
                <div className="funcList" onClick={() => {callMode(701); navigate('/gameswap/op');}}>GameSwap</div>
                <div className="funcList" onClick={() => {callMode(8); navigate('/tbridge');}}>tBridge</div>
              </>
            }
          </div>
          <div style={{fontSize: "12px", marginRight: "10px"}} className="navButton bold">
            {address !== null && address !== undefined && chain.id === 8899 &&
              <div id="jdaoBal" style={{width: "fit-content", height: "18px", background: "rgba(0, 0, 0, 0.02)", border: "1px solid rgba(0, 0, 0, 0.05)", borderRadius: "80px", marginRight: "5px", color: "rgb(70, 55, 169)", padding: "10px 20px", display: "flex", flexDirection: "row", textAlign: "center", justifyContent: "center", letterSpacing: "1px", textDecoration: "none"}}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                  <img
                    src="https://gateway.commudao.xyz/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq?img-width=100&img-height=100"
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
                            image: 'https://gateway.commudao.xyz/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq',
                          },
                        },
                      })
                    }}
                  />
                  <div style={{marginLeft: "7px"}}>{Number(jdaoBalance).toFixed(3)}</div>
                </div>
              </div>
            }
            {address !== null && address !== undefined && chain.id === 96 &&
              <div id="jdaoBal" style={{width: "fit-content", height: "18px", background: "rgba(0, 0, 0, 0.02)", border: "1px solid rgba(0, 0, 0, 0.05)", borderRadius: "80px", marginRight: "5px", color: "rgb(70, 55, 169)", padding: "10px 20px", display: "flex", flexDirection: "row", textAlign: "center", justifyContent: "center", letterSpacing: "1px", textDecoration: "none"}}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                  <img
                    src="https://gateway.commudao.xyz/ipfs/bafkreidcxukia62wzaaes6wpsdgpw3yjshrjm7nwijwldxdthkepsebumq?img-width=100&img-height=100"
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
                                  image: 'https://gateway.commudao.xyz/ipfs/bafkreidcxukia62wzaaes6wpsdgpw3yjshrjm7nwijwldxdthkepsebumq',
                                },
                            },
                        })
                    }}
                  />
                  <div style={{marginLeft: "7px"}}>{Number(cmosBalance).toFixed(3)}</div>
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
      }
    </>
  )
}
  
export default Headbar
import React from 'react'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { ThreeDots } from 'react-loading-icons'

const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const bbqToken = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const jdaoToken = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'
const cuToken = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'
const silToken = '0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f'
const goldToken = '0x7d5346E33889580528e6F79f48BdEE94D8A9E144'
const platToken = '0xFFBADf348b97055cA8E60a848718cAEf29df50A7'
const pzaToken = '0x09DcdCFc6C48803681a3422997c679E773656763'
const osToken = '0xAc5299D92373E9352636559cca497d7683A47655'

const hexajibjib = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const evolutionaryV2 = '0xEDad050528b5E0F351c9D3150B8C3Eb3da1E7b08'
const evolutionary = '0x99dfECfB91CC6C37C16a6D95A0A8935eb05A33fb'
const fusion = '0x2Ef03b5613758529fF057E8883ABe6AAA1528844'

const salon = '0x1Bc2Ad00F721b365C5d7C3BF19159C16e03c703e'
const salonRouter = '0x76B6B24BA53042A0e02Cc0e84c875d74EAeFb74a'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const NpcEvolutionary = ({ setisLoading, txupdate, setTxupdate, evolutionaryABI, fusionABI, salonABI, erc721ABI, erc20ABI }) => {
    const { address } = useAccount()

    const [nft, setNft] = React.useState([])
    const [salonNft, setSalonNft] = React.useState([])
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [bbqBalance, setBbqBalance] = React.useState(0)
    const [cuBalance, setCuBalance] = React.useState(0)
    const [pzaBalance, setPzaBalance] = React.useState(0)
    const [silBalance, setSilBalance] = React.useState(0)
    const [goldBalance, setGoldBalance] = React.useState(0)
    const [osBalance, setOsBalance] = React.useState(0)

    const [skinSlot1, setSkinSlot1] = React.useState(null)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const cmdaonftSC = new ethers.Contract(hexajibjib, erc721ABI, providerJBC)
        const salonnftSC = new ethers.Contract(salon, erc721ABI, providerJBC)

        const thefetch = async () => {
            const walletFilter = await cmdaonftSC.filters.Transfer(null, address, null)
            const walletEvent = await cmdaonftSC.queryFilter(walletFilter, 335000, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj, index) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)

            const walletSalonFilter = await salonnftSC.filters.Transfer(null, address, null)
            const walletSalonEvent = await salonnftSC.queryFilter(walletSalonFilter, 1815632, "latest")
            const walletSalonMap = await Promise.all(walletSalonEvent.map(async (obj, index) => String(obj.args.tokenId)))
            const walletSalonRemoveDup = walletSalonMap.filter((obj, index) => walletSalonMap.indexOf(obj) === index)

            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: bbqToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: cuToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: pzaToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: silToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: goldToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: osToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: salon,
                        abi: erc721ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: salonRouter,
                        abi: salonABI,
                        functionName: 'skin',
                        args: [address, 1],
                    },
                ],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]

            const cmjBal = data[1]
            const bbqBal = data[2]
            const cuBal = data[3]
            const pzaBal = data[4]
            const silBal = data[5]
            const goldBal = data[6]
            const osBal = data[7]

            const nftbal = data[0]
            let count = 0
            let nfts = []
            let yournft = []

            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [item],
                    }
                ))
            }) : [Array(walletRemoveDup.length).fill('')]

            for (let i = 0; i <= walletRemoveDup.length - 1 && count < nftbal; i++) {
                if (data2[i].toUpperCase() === address.toUpperCase()) {
                    yournft.push({Id: String(walletRemoveDup[i])})
                    count++
                }
            }

            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: yournft.map((item) => (
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [item.Id],
                    }
                ))
            }) : [Array(yournft.length).fill('')]

            console.log(yournft)
            for (let i = 0; i <= yournft.length - 1; i++) {
                const response = await fetch(data3[i].replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                const nft = await response.json()

                const bonus = Number(String(yournft[i].Id).slice(-5))

                nfts.push({Id: Number(yournft[i].Id), Name: nft.name, Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"), Description: nft.description, Attribute: nft.attributes, RewardPerSec: bonus, Onsell: false, Count: null})
            }
            if (nfts.length === 0) { nfts.push(null) }


            const salonNftbal = data[8]
            const skinslot1 = data[9]
            let salonCount = 0
            let salonNfts = []
            let yoursalonnft = []

            const data4 = address !== null && address !== undefined ? await readContracts({
                contracts: walletSalonRemoveDup.map((item) => (
                    {
                        address: salon,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [item],
                    }
                ))
            }) : [Array(walletSalonRemoveDup.length).fill('')]

            for (let i = 0; i <= walletSalonRemoveDup.length - 1 && salonCount < salonNftbal; i++) {
                if (data4[i].toUpperCase() === address.toUpperCase()) {
                    yoursalonnft.push({Id: String(walletSalonRemoveDup[i])})
                    salonCount++
                }
            }

            const data5 = address !== null && address !== undefined ? await readContracts({
                contracts: yoursalonnft.map((item) => (
                    {
                        address: salon,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [item.Id],
                    }
                ))
            }) : [Array(yoursalonnft.length).fill('')]

            console.log(yoursalonnft)
            for (let i = 0; i <= yoursalonnft.length - 1; i++) {
                const response = await fetch(data5[i].replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                const nft = await response.json()

                const bonus = Number(String(yoursalonnft[i].Id).slice(-5))

                salonNfts.push({Id: Number(yoursalonnft[i].Id), Name: nft.name, Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"), Description: nft.description, Attribute: nft.attributes, RewardPerSec: bonus, Onsell: false, Count: null})
            }
            if (salonNfts.length === 0) { salonNfts.push(null) }

            return [nfts, cmjBal, bbqBal, cuBal, pzaBal, silBal, goldBal, osBal, salonNfts, skinslot1, ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setNft(result[0])
            setCmjBalance(ethers.utils.formatEther(String(result[1])))
            setBbqBalance(ethers.utils.formatEther(String(result[2])))
            setCuBalance(ethers.utils.formatEther(String(result[3])))
            setPzaBalance(ethers.utils.formatEther(String(result[4])))
            setSilBalance(ethers.utils.formatEther(String(result[5])))
            setGoldBalance(ethers.utils.formatEther(String(result[6])))
            setOsBalance(ethers.utils.formatEther(String(result[7])))
            setSalonNft(result[8])
            setSkinSlot1(result[9])
        })

    }, [address, erc20ABI, erc721ABI, txupdate, salonABI])

    const evolutionV2Handle = async (_nftid, _enchantindex) => {
        setisLoading(true)
        try {
            if (Number(_enchantindex) <= 9) {
                const bbqAllow = await readContract({
                    address: bbqToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (bbqAllow < (1280000 * 10**18)) {
                    const config = await prepareWriteContract({
                        address: bbqToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const cuAllow = await readContract({
                    address: cuToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (cuAllow < (128000 * 10**18)) {
                    const config2 = await prepareWriteContract({
                        address: cuToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx2 = await writeContract(config2)
                    await approvetx2.wait()
                }
            } else if (Number(_enchantindex) === 10) {
                const bbqAllow = await readContract({
                    address: bbqToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (bbqAllow < (2560000 * 10**18)) {
                    const config = await prepareWriteContract({
                        address: bbqToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const jdaoAllow = await readContract({
                    address: jdaoToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (jdaoAllow < (10 * 10**18)) {
                    const config2 = await prepareWriteContract({
                        address: jdaoToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx2 = await writeContract(config2)
                    await approvetx2.wait()
                }
            } else if (Number(_enchantindex) >= 11 && Number(_enchantindex) <= 19) {
                const bbqAllow = await readContract({
                    address: bbqToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (bbqAllow < (1310720000 * 10**18)) {
                    const config = await prepareWriteContract({
                        address: bbqToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const silAllow = await readContract({
                    address: silToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (silAllow < (384000 * 10**18)) {
                    const config2 = await prepareWriteContract({
                        address: silToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx2 = await writeContract(config2)
                    await approvetx2.wait()
                }
            } else if (Number(_enchantindex) <= 1009 || (Number(_enchantindex) >= 2001 && Number(_enchantindex) <= 2009) || (Number(_enchantindex) >= 3001 && Number(_enchantindex) <= 3009) || (Number(_enchantindex) >= 4001 && Number(_enchantindex) <= 4009)) {
                const pzaAllow = await readContract({
                    address: pzaToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (pzaAllow < (1074 * 10**18)) {
                    const config = await prepareWriteContract({
                        address: pzaToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const cuAllow = await readContract({
                    address: cuToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (cuAllow < (64000 * 10**18)) {
                    const config2 = await prepareWriteContract({
                        address: cuToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx2 = await writeContract(config2)
                    await approvetx2.wait()
                }
            } else if (Number(_enchantindex) === 1010 || Number(_enchantindex) === 1020 || Number(_enchantindex) === 1030 || Number(_enchantindex) === 2010 || Number(_enchantindex) === 2020 || Number(_enchantindex) === 2030 || Number(_enchantindex) === 3010 || Number(_enchantindex) === 3020 || Number(_enchantindex) === 3030 || Number(_enchantindex) === 4010 || Number(_enchantindex) === 4020 || Number(_enchantindex) === 4030) {
                const pzaAllow = await readContract({
                    address: pzaToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (pzaAllow < (593440 * 10**18)) {
                    const config = await prepareWriteContract({
                        address: pzaToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const jdaoAllow = await readContract({
                    address: jdaoToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (jdaoAllow < (450 * 10**18)) {
                    const config2 = await prepareWriteContract({
                        address: jdaoToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx2 = await writeContract(config2)
                    await approvetx2.wait()
                }
            } else if (Number(_enchantindex) <= 1019 || (Number(_enchantindex) >= 2011 && Number(_enchantindex) <= 2019) || (Number(_enchantindex) >= 3011 && Number(_enchantindex) <= 3019) || (Number(_enchantindex) >= 4011 && Number(_enchantindex) <= 4019)) {
                const pzaAllow = await readContract({
                    address: pzaToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (pzaAllow < (6655 * 10**18)) {
                    const config = await prepareWriteContract({
                        address: pzaToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const silAllow = await readContract({
                    address: silToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (silAllow < (384000 * 10**18)) {
                    const config2 = await prepareWriteContract({
                        address: silToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx2 = await writeContract(config2)
                    await approvetx2.wait()
                }
            } else if (Number(_enchantindex) <= 1029 || (Number(_enchantindex) >= 2021 && Number(_enchantindex) <= 2029) || (Number(_enchantindex) >= 3021 && Number(_enchantindex) <= 3029) || (Number(_enchantindex) >= 4021 && Number(_enchantindex) <= 4029)) {
                const pzaAllow = await readContract({
                    address: pzaToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (pzaAllow < (49453 * 10**18)) {
                    const config = await prepareWriteContract({
                        address: pzaToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const goldAllow = await readContract({
                    address: goldToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (goldAllow < (492075 * 10**18)) {
                    const config2 = await prepareWriteContract({
                        address: goldToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx2 = await writeContract(config2)
                    await approvetx2.wait()
                }
            } else if (Number(_enchantindex) <= 1039 || (Number(_enchantindex) >= 2031 && Number(_enchantindex) <= 2039) || (Number(_enchantindex) >= 3031 && Number(_enchantindex) <= 3039) || (Number(_enchantindex) >= 4031 && Number(_enchantindex) <= 4039)) {
                const pzaAllow = await readContract({
                    address: pzaToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (pzaAllow < (306202 * 10**18)) {
                    const config = await prepareWriteContract({
                        address: pzaToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const platAllow = await readContract({
                    address: platToken,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    args: [address, evolutionaryV2],
                })
                if (platAllow < (6150937 * 10**18)) {
                    const config2 = await prepareWriteContract({
                        address: platToken,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [evolutionaryV2, ethers.utils.parseEther(String(10**8))],
                    })
                    const approvetx2 = await writeContract(config2)
                    await approvetx2.wait()
                }
            }
            const nftAllow = await readContract({
                address: hexajibjib,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== evolutionaryV2.toUpperCase()) {
                const config3 = await prepareWriteContract({
                    address: hexajibjib,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [evolutionaryV2, _nftid],
                })
                const approvetxNFT = await writeContract(config3)
                await approvetxNFT.wait()
            }
            const config4 = await prepareWriteContract({
                address: evolutionaryV2,
                abi: evolutionaryABI,
                functionName: 'enchant',
                args: [_enchantindex, _nftid]
            })
            const tx = await writeContract(config4)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }


    const evolutionHandle = async (_nftid, _enchantindex) => {
        setisLoading(true)
        const cmjAllow = await readContract({
            address: cmjToken,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, evolutionary],
        })
        try {
            if (cmjAllow < (30 * 10**18)) {
                const config = await prepareWriteContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [evolutionary, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const jdaoAllow = await readContract({
                address: jdaoToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, evolutionary],
            })
            if (jdaoAllow < (3 * 10**18)) {
                const config2 = await prepareWriteContract({
                    address: jdaoToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [evolutionary, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const bbqAllow = await readContract({
                address: bbqToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, evolutionary],
            })
            if (bbqAllow < (25000 * 10**18)) {
                const config3 = await prepareWriteContract({
                    address: bbqToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [evolutionary, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx3 = await writeContract(config3)
                await approvetx3.wait()
            }
            const nftAllow = await readContract({
                address: hexajibjib,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== evolutionary.toUpperCase()) {
                const config4 = await prepareWriteContract({
                    address: hexajibjib,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [evolutionary, _nftid],
                })
                const approvetx4 = await writeContract(config4)
                await approvetx4.wait()
            }
            const config5 = await prepareWriteContract({
                address: evolutionary,
                abi: evolutionaryABI,
                functionName: 'enchant',
                args: [_enchantindex, _nftid]
            })
            const tx = await writeContract(config5)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const fusionHandle = async (_nftid, _fusionindex) => {
        setisLoading(true)        
        try {
            const cmjAllow = await readContract({
                address: cmjToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, fusion],
            })
            if (cmjAllow < (150 * 10**18)) {
                const config = await prepareWriteContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [fusion, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const jdaoAllow = await readContract({
                address: jdaoToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, fusion],
            })
            if (jdaoAllow < (15 * 10**18)) {
                const config2 = await prepareWriteContract({
                    address: jdaoToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [fusion, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const nftAllow = await readContract({
                address: hexajibjib,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== fusion.toUpperCase()) {
                const config4 = await prepareWriteContract({
                    address: hexajibjib,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [fusion, _nftid],
                })
                const approvetx4 = await writeContract(config4)
                await approvetx4.wait()
            }
            let _nftId2 = nft.filter((item) => item.Id >= 100410100400 && item.Id <= 100420000400)
            const nftAllow2 = await readContract({
                address: hexajibjib,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftId2[0].Id],
            })
            if (nftAllow2.toUpperCase() !== fusion.toUpperCase()) {
                const config5 = await prepareWriteContract({
                    address: hexajibjib,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [fusion, _nftId2[0].Id],
                })
                const approvetx5 = await writeContract(config5)
                await approvetx5.wait()
            }
            let _nftId3 = nft.filter((item) => item.Id >= 100420100400 && item.Id <= 100430000400)
            const nftAllow3 = await readContract({
                address: hexajibjib,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftId3[0].Id],
            })
            if (nftAllow3.toUpperCase() !== fusion.toUpperCase()) {
                const config6 = await prepareWriteContract({
                    address: hexajibjib,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [fusion, _nftId3[0].Id],
                })
                const approvetx6 = await writeContract(config6)
                await approvetx6.wait()
            }
            let _nftId4 = nft.filter((item) => item.Id >= 100430100400 && item.Id <= 100440000400)
            const nftAllow4 = await readContract({
                address: hexajibjib,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftId4[0].Id],
            })
            if (nftAllow4.toUpperCase() !== fusion.toUpperCase()) {
                const config7 = await prepareWriteContract({
                    address: hexajibjib,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [fusion, _nftId4[0].Id],
                })
                const approvetx7 = await writeContract(config7)
                await approvetx7.wait()
            }
            const config8 = await prepareWriteContract({
                address: fusion,
                abi: fusionABI,
                functionName: 'enchant',
                args: [_fusionindex, _nftid, _nftId2[0].Id, _nftId3[0].Id, _nftId4[0].Id, 0],
                overrides: {
                    gasLimit: 1000000,
                },
            })
            const tx = await writeContract(config8)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const changeHandle = async (_salonid) => {
        setisLoading(true)        
        try {
            const cmjAllow = await readContract({
                address: cmjToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, salonRouter],
            })
            if (cmjAllow < (10 * 10**18)) {
                const config = await prepareWriteContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [salonRouter, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const salonAllow = await readContract({
                address: salon,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_salonid],
            })
            if (salonAllow.toUpperCase() !== salonRouter.toUpperCase()) {
                const config2 = await prepareWriteContract({
                    address: salon,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [salonRouter, _salonid],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const config3 = await prepareWriteContract({
                address: salonRouter,
                abi: salonABI,
                functionName: 'change',
                args: [_salonid],
            })
            const tx = await writeContract(config3)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const unchangeHandle = async (_salontype) => {
        setisLoading(true)        
        try {
            const osAllow = await readContract({
                address: osToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, salonRouter],
            })
            if (osAllow < (10 * 10**18)) {
                const config = await prepareWriteContract({
                    address: osToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [salonRouter, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: salonRouter,
                abi: salonABI,
                functionName: 'unchange',
                args: [_salontype],
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px"}}>
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content"}}>Evotionary Planet</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}} className="pixel"></div>
                </div>
                <div style={{margin: "30px 100px"}}>
                    <img src="https://nftstorage.link/ipfs/bafybeibb6sv46fa4as36s5pvb5lihvgdhry7jlsifnzca4qbgbvkej3cae" height="200" alt="Evo_Planet" />
                </div>
            </div>

            <div style={{width: "90%", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                <div style={{textAlign: "left", marginTop: "50px", minHeight: "600px", width: "250px", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <div style={{width: "250px", fontSize: "16px", letterSpacing: "1px"}} className="bold">Tokens</div>
                    <div className="pixel">
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="22" alt="$CMJ"/>
                            <div style={{marginLeft: "10px"}}>{Number(cmjBalance).toFixed(3)}</div>
                        </div>
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" width="22" alt="$BBQ"/>
                            <div style={{marginLeft: "10px"}}>{Number(bbqBalance).toFixed(3)}</div>
                        </div>
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu" width="22" alt="$PZA"/>
                            <div style={{marginLeft: "10px"}}>{Number(pzaBalance).toFixed(3)}</div>
                        </div>
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" width="22" alt="$CU"/>
                            <div style={{marginLeft: "10px"}}>{Number(cuBalance).toFixed(3)}</div>
                        </div>
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde" width="22" alt="$SIL"/>
                            <div style={{marginLeft: "10px"}}>{Number(silBalance).toFixed(3)}</div>
                        </div>
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm" width="22" alt="$GOLD"/>
                            <div style={{marginLeft: "10px"}}>{Number(goldBalance).toFixed(3)}</div>
                        </div>
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" width="22" alt="$OS"/>
                            <div style={{marginLeft: "10px"}}>{Number(osBalance).toFixed(3)}</div>
                        </div>
                    </div>
                </div>

                <div style={{width: "70%"}}>
                    <div style={{textAlign: "left", margin: "50px 0 80px 0", minHeight: "600px", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                        <div style={{fontSize: "16px", letterSpacing: "1px"}} className="bold">Upgradable NFTs</div>
                        {nft !== undefined && nft.length > 0 ?
                            <>
                                {nft[0] !== null ?
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                        {nft.map((item, index) => (
                                            <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}} key={index}>
                                                {Number(String(item.Id).slice(0, 4)) >= 1005 && Number(String(item.Id).slice(0, 4)) <= 1009 && Number(item.Id) % 100000 !== 3000 ?
                                                    <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                        <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                            </div>
                                                            <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                            <div>
                                                                {Number(item.Id) % 100000 <= 900 ? <img src={item.Image} width="120" alt="Can not load metadata." /> : <></>}
                                                                {Number(item.Id) % 100000 >= 1000 ? <img src="https://nftstorage.link/ipfs/bafkreibjpayqduk7ngifqmwfrnzcohy42xtzxgdrl5dqhsrx5rluvnwdfi" width="120" alt="Can not load metadata." />  : <></>}
                                                                <div style={{width: "150px"}} className="emp pixel">
                                                                    {Number(item.Id) % 100000 === 100 ? <>{item.Name} [Lv.1]</> : <></>}
                                                                    {Number(item.Id) % 100000 >= 200 && Number(item.Id) % 100000 <= 1000 ? <>{item.Name.slice(0, -2)}{((Number(item.Id) % 100000) / 100)}]</> : <></>}
                                                                    {Number(item.Id) % 100000 === 1200 ? <>{item.Name.slice(0, -3)}11]</> : <></>}
                                                                    {Number(item.Id) % 100000 === 1400 ? <>{item.Name.slice(0, -3)}12]</> : <></>}
                                                                    {Number(item.Id) % 100000 === 1600 ? <>{item.Name.slice(0, -3)}13]</> : <></>}
                                                                    {Number(item.Id) % 100000 === 1800 ? <>{item.Name.slice(0, -3)}14]</> : <></>}
                                                                    {Number(item.Id) % 100000 === 2000 ? <>{item.Name.slice(0, -3)}15]</> : <></>}
                                                                    {Number(item.Id) % 100000 === 2200 ? <>{item.Name.slice(0, -3)}16]</> : <></>}
                                                                    {Number(item.Id) % 100000 === 2400 ? <>{item.Name.slice(0, -3)}17]</> : <></>}
                                                                    {Number(item.Id) % 100000 === 2600 ? <>{item.Name.slice(0, -3)}18]</> : <></>}
                                                                    {Number(item.Id) % 100000 === 2800 ? <>{item.Name.slice(0, -3)}19]</> : <></>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            <div>
                                                                <div className="pixel">
                                                                    Level&nbsp;
                                                                    {Number(item.Id) % 100000 <= 1000 ? ((Number(item.Id) % 100000) / 100) - 1 : <></>}
                                                                    {Number(item.Id) % 100000 === 1200 ? 10 : <></>}
                                                                    {Number(item.Id) % 100000 === 1400 ? 11 : <></>}
                                                                    {Number(item.Id) % 100000 === 1600 ? 12 : <></>}
                                                                    {Number(item.Id) % 100000 === 1800 ? 13 : <></>}
                                                                    {Number(item.Id) % 100000 === 2000 ? 14 : <></>}
                                                                    {Number(item.Id) % 100000 === 2200 ? 15 : <></>}
                                                                    {Number(item.Id) % 100000 === 2400 ? 16 : <></>}
                                                                    {Number(item.Id) % 100000 === 2600 ? 17 : <></>}
                                                                    {Number(item.Id) % 100000 === 2800 ? 18 : <></>}
                                                                </div>
                                                                <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                            </div>
                                                            <div>
                                                                <div className="pixel">
                                                                    Level&nbsp;
                                                                    {Number(item.Id) % 100000 <= 1000 ? ((Number(item.Id) % 100000) / 100) : <></>}
                                                                    {Number(item.Id) % 100000 === 1200 ? 11 : <></>}
                                                                    {Number(item.Id) % 100000 === 1400 ? 12 : <></>}
                                                                    {Number(item.Id) % 100000 === 1600 ? 13 : <></>}
                                                                    {Number(item.Id) % 100000 === 1800 ? 14 : <></>}
                                                                    {Number(item.Id) % 100000 === 2000 ? 15 : <></>}
                                                                    {Number(item.Id) % 100000 === 2200 ? 16 : <></>}
                                                                    {Number(item.Id) % 100000 === 2400 ? 17 : <></>}
                                                                    {Number(item.Id) % 100000 === 2600 ? 18 : <></>}
                                                                    {Number(item.Id) % 100000 === 2800 ? 19 : <></>}
                                                                </div>
                                                                <div style={{width: "150px"}} className="pixel">
                                                                    {Number(item.Id) % 100000 <= 900 ? item.RewardPerSec + 100 : <></>}
                                                                    {Number(item.Id) % 100000 >= 1000 ? item.RewardPerSec + 200 : <></>}
                                                                    &nbsp;cmpow per sec
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                        <div style={{marginTop: "10px", width: "350px"}}>
                                                            <div className="pixel">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                                Evolution resource
                                                            </div>
                                                            <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                                <img src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="18" alt="$BBQ"/>
                                                                <div style={{margin: "0 5px"}}>
                                                                    {Number(item.Id) % 100000 === 100 ? <>10,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 200 ? <>10,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 300 ? <>20,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 400 ? <>40,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 500 ? <>80,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 600 ? <>160,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 700 ? <>320,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 800 ? <>640,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 900 ? <>1,280,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 1000 ? <>2,560,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 1200 ? <>5,120,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 1400 ? <>10,240,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 1600 ? <>20,480,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 1800 ? <>40,960,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 2000 ? <>81,920,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 2200 ? <>163,840,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 2400 ? <>327,680,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 2600 ? <>655,360,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 2800 ? <>1,310,720,000</> : <></>}
                                                                </div>
                                                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                {Number(item.Id) % 100000 <= 900 ? <img src="https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" height="18" alt="$CU"/> : <></>}
                                                                {Number(item.Id) % 100000 >= 1200 ? <img src="https://nftstorage.link/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde" height="18" alt="$SIL"/> : <></>}
                                                                {Number(item.Id) % 100000 === 1000 ? <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/> : <></>}
                                                                <div style={{margin: "0 5px"}}>
                                                                    {Number(item.Id) % 100000 === 100 ? <>0</> : <></>}
                                                                    {Number(item.Id) % 100000 === 200 ? <>1,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 300 ? <>2,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 400 ? <>4,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 500 ? <>8,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 600 ? <>16,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 700 ? <>32,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 800 ? <>64,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 900 ? <>128,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 1000 ? <>10</> : <></>}
                                                                    {Number(item.Id) % 100000 === 1200 ? <>1,500</> : <></>}
                                                                    {Number(item.Id) % 100000 === 1400 ? <>3,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 1600 ? <>6,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 1800 ? <>12,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 2000 ? <>24,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 2200 ? <>48,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 2400 ? <>96,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 2600 ? <>192,000</> : <></>}
                                                                    {Number(item.Id) % 100000 === 2800 ? <>384,000</> : <></>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                            className="pixel button"
                                                            onClick={() => {
                                                                if (Number(item.Id) % 100000 <= 1000) {
                                                                    evolutionV2Handle(item.Id, (Number(item.Id) % 100000) / 100)
                                                                } else if (Number(item.Id) % 100000 === 1200) {
                                                                    evolutionV2Handle(item.Id, 11)
                                                                } else if (Number(item.Id) % 100000 === 1400) {
                                                                    evolutionV2Handle(item.Id, 12)
                                                                } else if (Number(item.Id) % 100000 === 1600) {
                                                                    evolutionV2Handle(item.Id, 13)
                                                                } else if (Number(item.Id) % 100000 === 1800) {
                                                                    evolutionV2Handle(item.Id, 14)
                                                                } else if (Number(item.Id) % 100000 === 2000) {
                                                                    evolutionV2Handle(item.Id, 15)
                                                                } else if (Number(item.Id) % 100000 === 2200) {
                                                                    evolutionV2Handle(item.Id, 16)
                                                                } else if (Number(item.Id) % 100000 === 2400) {
                                                                    evolutionV2Handle(item.Id, 17)
                                                                } else if (Number(item.Id) % 100000 === 2600) {
                                                                    evolutionV2Handle(item.Id, 18)
                                                                } else if (Number(item.Id) % 100000 === 2800) {
                                                                    evolutionV2Handle(item.Id, 19)
                                                                }
                                                            }}
                                                        >
                                                            UPGRADE
                                                        </div>
                                                    </div> :
                                                    <></>
                                                }
                                                {/*
                                                ░██████╗░█████╗░██████╗░██╗███████╗███╗░░██╗░██████╗ 
                                                ██╔════╝██╔══██╗██╔══██╗██║██╔════╝████╗░██║██╔════╝
                                                ╚█████╗░███████║██████╔╝██║█████╗░░██╔██╗██║╚█████╗░
                                                ░╚═══██╗██╔══██║██╔═══╝░██║██╔══╝░░██║╚████║░╚═══██╗
                                                ██████╔╝██║░░██║██║░░░░░██║███████╗██║░╚███║██████╔╝ 
                                                ╚═════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝╚══════╝╚═╝░░╚══╝╚═════╝░
                                                */}
                                                {(((Number(String(item.Id).slice(0, 7)) >= 1300001 && Number(String(item.Id).slice(0, 7)) <= 1300100) || (Number(String(item.Id).slice(0, 7)) >= 1300101 && Number(String(item.Id).slice(0, 7)) <= 1300200) || (Number(String(item.Id).slice(0, 7)) >= 1300201 && Number(String(item.Id).slice(0, 7)) <= 1300300) || (Number(String(item.Id).slice(0, 7)) >= 1300401 && Number(String(item.Id).slice(0, 7)) <= 1300500)) && Number(item.Id) % 100000 !== 14180) &&
                                                    <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                        <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                            </div>
                                                            <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                            <div>
                                                                {(Number(item.Id) % 100000 !== 1500 && Number(item.Id) % 100000 !== 4500) && <img src={item.Image} width="120" alt="Can not load metadata." />}
                                                                {Number(item.Id) % 100000 === 1500 && <img src="https://bafkreidr4uq5voosuz6v4hqhiempf4a36x5aq6i4uceym2xbje65o5mwia.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />}
                                                                {Number(item.Id) % 100000 === 4500 && <img src="https://nftstorage.link/ipfs/bafybeiew47pd67c3l5whmj6vhzullkqvrrsmtlssarwf5s54tnehejaxdu" width="120" alt="Can not load metadata." />}
                                                                {Number(item.Id) % 100000 === 9500 && <img src="https://nftstorage.link/ipfs/bafkreihvuvksuylcjqb37rsgkr5z2l26iliyestxikmjsq7va6xtnnusxe" width="120" alt="Can not load metadata." />}
                                                                <div style={{width: "150px"}} className="emp pixel">
                                                                    {Number(item.Id) % 100000 === 500 ? 
                                                                        <>{item.Name} [Lv.1]</> :
                                                                        <>
                                                                            {item.Name.slice(0, -3)}
                                                                            {Number(item.Id) % 100000 === 540 && 2}
                                                                            {Number(item.Id) % 100000 === 580 && 3}
                                                                            {Number(item.Id) % 100000 === 660 && 4}
                                                                            {Number(item.Id) % 100000 === 740 && 5}
                                                                            {Number(item.Id) % 100000 === 860 && 6}
                                                                            {Number(item.Id) % 100000 === 980 && 7}
                                                                            {Number(item.Id) % 100000 === 1140 && 8}
                                                                            {Number(item.Id) % 100000 === 1300 && 9}
                                                                            {Number(item.Id) % 100000 === 1500 && 10}
                                                                            {Number(item.Id) % 100000 === 1700 && 11}
                                                                            {Number(item.Id) % 100000 === 1940 && 12}
                                                                            {Number(item.Id) % 100000 === 2180 && 13}
                                                                            {Number(item.Id) % 100000 === 2460 && 14}
                                                                            {Number(item.Id) % 100000 === 2740 && 15}
                                                                            {Number(item.Id) % 100000 === 3060 && 16}
                                                                            {Number(item.Id) % 100000 === 3380 && 17}
                                                                            {Number(item.Id) % 100000 === 3740 && 18}
                                                                            {Number(item.Id) % 100000 === 4100 && 19}
                                                                            {Number(item.Id) % 100000 === 4500 && 20}
                                                                            {Number(item.Id) % 100000 === 4900 && 21}
                                                                            {Number(item.Id) % 100000 === 5340 && 22}
                                                                            {Number(item.Id) % 100000 === 5780 && 23}
                                                                            {Number(item.Id) % 100000 === 6260 && 24}
                                                                            {Number(item.Id) % 100000 === 6740 && 25}
                                                                            {Number(item.Id) % 100000 === 7260 && 26}
                                                                            {Number(item.Id) % 100000 === 7780 && 27}
                                                                            {Number(item.Id) % 100000 === 8340 && 28}
                                                                            {Number(item.Id) % 100000 === 8900 && 29}
                                                                            {Number(item.Id) % 100000 === 9500 && 30}
                                                                            {Number(item.Id) % 100000 === 10100 && 31}
                                                                            {Number(item.Id) % 100000 === 10740 && 32}
                                                                            {Number(item.Id) % 100000 === 11380 && 33}
                                                                            {Number(item.Id) % 100000 === 12060 && 34}
                                                                            {Number(item.Id) % 100000 === 12740 && 35}
                                                                            {Number(item.Id) % 100000 === 13460 && 36}
                                                                            ]
                                                                        </>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            <div>
                                                                <div>
                                                                    Level&nbsp;
                                                                    {Number(item.Id) % 100000 === 500 && 0}
                                                                    {Number(item.Id) % 100000 === 540 && 1}
                                                                    {Number(item.Id) % 100000 === 580 && 2}
                                                                    {Number(item.Id) % 100000 === 660 && 3}
                                                                    {Number(item.Id) % 100000 === 740 && 4}
                                                                    {Number(item.Id) % 100000 === 860 && 5}
                                                                    {Number(item.Id) % 100000 === 980 && 6}
                                                                    {Number(item.Id) % 100000 === 1140 && 7}
                                                                    {Number(item.Id) % 100000 === 1300 && 8}
                                                                    {Number(item.Id) % 100000 === 1500 && 9}
                                                                    {Number(item.Id) % 100000 === 1700 && 10}
                                                                    {Number(item.Id) % 100000 === 1940 && 11}
                                                                    {Number(item.Id) % 100000 === 2180 && 12}
                                                                    {Number(item.Id) % 100000 === 2460 && 13}
                                                                    {Number(item.Id) % 100000 === 2740 && 14}
                                                                    {Number(item.Id) % 100000 === 3060 && 15}
                                                                    {Number(item.Id) % 100000 === 3380 && 16}
                                                                    {Number(item.Id) % 100000 === 3740 && 17}
                                                                    {Number(item.Id) % 100000 === 4100 && 18}
                                                                    {Number(item.Id) % 100000 === 4500 && 19}
                                                                    {Number(item.Id) % 100000 === 4900 && 20}
                                                                    {Number(item.Id) % 100000 === 5340 && 21}
                                                                    {Number(item.Id) % 100000 === 5780 && 22}
                                                                    {Number(item.Id) % 100000 === 6260 && 23}
                                                                    {Number(item.Id) % 100000 === 6740 && 24}
                                                                    {Number(item.Id) % 100000 === 7260 && 25}
                                                                    {Number(item.Id) % 100000 === 7780 && 26}
                                                                    {Number(item.Id) % 100000 === 8340 && 27}
                                                                    {Number(item.Id) % 100000 === 8900 && 28}
                                                                    {Number(item.Id) % 100000 === 9500 && 29}
                                                                    {Number(item.Id) % 100000 === 10100 && 30}
                                                                    {Number(item.Id) % 100000 === 10740 && 31}
                                                                    {Number(item.Id) % 100000 === 11380 && 32}
                                                                    {Number(item.Id) % 100000 === 12060 && 33}
                                                                    {Number(item.Id) % 100000 === 12740 && 34}
                                                                    {Number(item.Id) % 100000 === 13460 && 35}
                                                                </div>
                                                                <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    Level&nbsp;
                                                                    {Number(item.Id) % 100000 === 500 && 1}
                                                                    {Number(item.Id) % 100000 === 540 && 2}
                                                                    {Number(item.Id) % 100000 === 580 && 3}
                                                                    {Number(item.Id) % 100000 === 660 && 4}
                                                                    {Number(item.Id) % 100000 === 740 && 5}
                                                                    {Number(item.Id) % 100000 === 860 && 6}
                                                                    {Number(item.Id) % 100000 === 980 && 7}
                                                                    {Number(item.Id) % 100000 === 1140 && 8}
                                                                    {Number(item.Id) % 100000 === 1300 && 9}
                                                                    {Number(item.Id) % 100000 === 1500 && 10}
                                                                    {Number(item.Id) % 100000 === 1700 && 11}
                                                                    {Number(item.Id) % 100000 === 1940 && 12}
                                                                    {Number(item.Id) % 100000 === 2180 && 13}
                                                                    {Number(item.Id) % 100000 === 2460 && 14}
                                                                    {Number(item.Id) % 100000 === 2740 && 15}
                                                                    {Number(item.Id) % 100000 === 3060 && 16}
                                                                    {Number(item.Id) % 100000 === 3380 && 17}
                                                                    {Number(item.Id) % 100000 === 3740 && 18}
                                                                    {Number(item.Id) % 100000 === 4100 && 19}
                                                                    {Number(item.Id) % 100000 === 4500 && 20}
                                                                    {Number(item.Id) % 100000 === 4900 && 21}
                                                                    {Number(item.Id) % 100000 === 5340 && 22}
                                                                    {Number(item.Id) % 100000 === 5780 && 23}
                                                                    {Number(item.Id) % 100000 === 6260 && 24}
                                                                    {Number(item.Id) % 100000 === 6740 && 25}
                                                                    {Number(item.Id) % 100000 === 7260 && 26}
                                                                    {Number(item.Id) % 100000 === 7780 && 27}
                                                                    {Number(item.Id) % 100000 === 8340 && 28}
                                                                    {Number(item.Id) % 100000 === 8900 && 29}
                                                                    {Number(item.Id) % 100000 === 9500 && 30}
                                                                    {Number(item.Id) % 100000 === 10100 && 31}
                                                                    {Number(item.Id) % 100000 === 10740 && 32}
                                                                    {Number(item.Id) % 100000 === 11380 && 33}
                                                                    {Number(item.Id) % 100000 === 12060 && 34}
                                                                    {Number(item.Id) % 100000 === 12740 && 35}
                                                                    {Number(item.Id) % 100000 === 13460 && 36}
                                                                </div>
                                                                <div style={{width: "150px"}}>
                                                                    {Number(item.Id) % 100000 <= 540 && item.RewardPerSec + 40}
                                                                    {(Number(item.Id) % 100000 === 580 || Number(item.Id) % 100000 === 660) && item.RewardPerSec + 80}
                                                                    {(Number(item.Id) % 100000 === 740 || Number(item.Id) % 100000 === 860) && item.RewardPerSec + 120}
                                                                    {(Number(item.Id) % 100000 === 980 || Number(item.Id) % 100000 === 1140) && item.RewardPerSec + 160}
                                                                    {(Number(item.Id) % 100000 === 1300 || Number(item.Id) % 100000 === 1500) && item.RewardPerSec + 200}
                                                                    {(Number(item.Id) % 100000 === 1700 || Number(item.Id) % 100000 === 1940) && item.RewardPerSec + 240}
                                                                    {(Number(item.Id) % 100000 === 2180 || Number(item.Id) % 100000 === 2460) && item.RewardPerSec + 280}
                                                                    {(Number(item.Id) % 100000 === 2740 || Number(item.Id) % 100000 === 3060) && item.RewardPerSec + 320}
                                                                    {(Number(item.Id) % 100000 === 3380 || Number(item.Id) % 100000 === 3740) && item.RewardPerSec + 360}
                                                                    {(Number(item.Id) % 100000 === 4100 || Number(item.Id) % 100000 === 4500) && item.RewardPerSec + 400}
                                                                    {(Number(item.Id) % 100000 === 4900 || Number(item.Id) % 100000 === 5340) && item.RewardPerSec + 440}
                                                                    {(Number(item.Id) % 100000 === 5780 || Number(item.Id) % 100000 === 6260) && item.RewardPerSec + 480}
                                                                    {(Number(item.Id) % 100000 === 6740 || Number(item.Id) % 100000 === 7260) && item.RewardPerSec + 520}
                                                                    {(Number(item.Id) % 100000 === 7780 || Number(item.Id) % 100000 === 8340) && item.RewardPerSec + 560}
                                                                    {(Number(item.Id) % 100000 === 8900 || Number(item.Id) % 100000 === 9500) && item.RewardPerSec + 600}
                                                                    {(Number(item.Id) % 100000 === 10100 || Number(item.Id) % 100000 === 10740) && item.RewardPerSec + 640}
                                                                    {(Number(item.Id) % 100000 === 11380 || Number(item.Id) % 100000 === 12060) && item.RewardPerSec + 680}
                                                                    {(Number(item.Id) % 100000 === 12740 || Number(item.Id) % 100000 === 13460) && item.RewardPerSec + 720}
                                                                    &nbsp;cmpow per sec
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                        <div style={{marginTop: "10px", width: "350px"}}>
                                                            <div className="pixel">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                                Evolution resource
                                                            </div>
                                                            <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                                <img src="https://nftstorage.link/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu" height="18" alt="$PZA"/>
                                                                <div style={{margin: "0 5px"}}>
                                                                    {Number(item.Id) % 100000 === 500 && 250}
                                                                    {Number(item.Id) % 100000 === 540 && 300}
                                                                    {Number(item.Id) % 100000 === 580 && 360}
                                                                    {Number(item.Id) % 100000 === 660 && 432}
                                                                    {Number(item.Id) % 100000 === 740 && 518}
                                                                    {Number(item.Id) % 100000 === 860 && 622}
                                                                    {Number(item.Id) % 100000 === 980 && 746}
                                                                    {Number(item.Id) % 100000 === 1140 && 895}
                                                                    {Number(item.Id) % 100000 === 1300 && '1,074'}
                                                                    {Number(item.Id) % 100000 === 1500 && '12,890'}
                                                                    {Number(item.Id) % 100000 === 1700 && '1,547'}
                                                                    {Number(item.Id) % 100000 === 1940 && '1,857'}
                                                                    {Number(item.Id) % 100000 === 2180 && '2,229'}
                                                                    {Number(item.Id) % 100000 === 2460 && '2,674'}
                                                                    {Number(item.Id) % 100000 === 2740 && '3,209'}
                                                                    {Number(item.Id) % 100000 === 3060 && '3,851'}
                                                                    {Number(item.Id) % 100000 === 3380 && '4,622'}
                                                                    {Number(item.Id) % 100000 === 3740 && '5,546'}
                                                                    {Number(item.Id) % 100000 === 4100 && '6,655'}
                                                                    {Number(item.Id) % 100000 === 4500 && '79,860'}
                                                                    {Number(item.Id) % 100000 === 4900 && '11,501'}
                                                                    {Number(item.Id) % 100000 === 5340 && '13,801'}
                                                                    {Number(item.Id) % 100000 === 5780 && '16,561'}
                                                                    {Number(item.Id) % 100000 === 6260 && '19,874'}
                                                                    {Number(item.Id) % 100000 === 6740 && '23,849'}
                                                                    {Number(item.Id) % 100000 === 7260 && '28,618'}
                                                                    {Number(item.Id) % 100000 === 7780 && '34,342'}
                                                                    {Number(item.Id) % 100000 === 8340 && '41,211'}
                                                                    {Number(item.Id) % 100000 === 8900 && '49,453'}
                                                                    {Number(item.Id) % 100000 === 9500 && '593,440'}
                                                                    {Number(item.Id) % 100000 === 10100 && '71,212'}
                                                                    {Number(item.Id) % 100000 === 10740 && '85,455'}
                                                                    {Number(item.Id) % 100000 === 11380 && '102,546'}
                                                                    {Number(item.Id) % 100000 === 12060 && '123,055'}
                                                                    {Number(item.Id) % 100000 === 12740 && '147,667'}
                                                                    {Number(item.Id) % 100000 === 13460 && '177,200'}
                                                                </div>
                                                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                {Number(item.Id) % 100000 <= 1300 && <img src="https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" height="18" alt="$CU"/>}
                                                                {(Number(item.Id) % 100000 >= 1700 && Number(item.Id) % 100000 <= 4100) && <img src="https://nftstorage.link/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde" height="18" alt="$SIL"/>}
                                                                {Number(item.Id) % 100000 >= 4900 && <img src="https://nftstorage.link/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm" height="18" alt="$GOLD"/>}
                                                                {(Number(item.Id) % 100000 === 1500 || Number(item.Id) % 100000 === 4500 || Number(item.Id) % 100000 === 9500) && <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>}
                                                                {Number(item.Id) % 100000 >= 10100 && <img src="https://nftstorage.link/ipfs/bafkreibf7vowyqjrcaeyslflrxxchel3b4qdpwxcxb34js2otg35vjkcaa" height="18" alt="$PLAT"/>}
                                                                <div style={{margin: "0 5px"}}>
                                                                    {Number(item.Id) % 100000 === 500 && 0}
                                                                    {Number(item.Id) % 100000 === 540 && 500}
                                                                    {Number(item.Id) % 100000 === 580 && '1,000'}
                                                                    {Number(item.Id) % 100000 === 660 && '2,000'}
                                                                    {Number(item.Id) % 100000 === 740 && '4,000'}
                                                                    {Number(item.Id) % 100000 === 860 && '8,000'}
                                                                    {Number(item.Id) % 100000 === 980 && '16,000'}
                                                                    {Number(item.Id) % 100000 === 1140 && '32,000'}
                                                                    {Number(item.Id) % 100000 === 1300 && '64,000'}
                                                                    {Number(item.Id) % 100000 === 1500 && 50}
                                                                    {Number(item.Id) % 100000 === 1700 && '1,500'}
                                                                    {Number(item.Id) % 100000 === 1940 && '3,000'}
                                                                    {Number(item.Id) % 100000 === 2180 && '6,000'}
                                                                    {Number(item.Id) % 100000 === 2460 && '12,000'}
                                                                    {Number(item.Id) % 100000 === 2740 && '24,000'}
                                                                    {Number(item.Id) % 100000 === 3060 && '48,000'}
                                                                    {Number(item.Id) % 100000 === 3380 && '96,000'}
                                                                    {Number(item.Id) % 100000 === 3740 && '192,000'}
                                                                    {Number(item.Id) % 100000 === 4100 && '384,000'}
                                                                    {Number(item.Id) % 100000 === 4500 && 150}
                                                                    {Number(item.Id) % 100000 === 4900 && '19,200'}
                                                                    {Number(item.Id) % 100000 === 5340 && '28,800'}
                                                                    {Number(item.Id) % 100000 === 5780 && '43,200'}
                                                                    {Number(item.Id) % 100000 === 6260 && '64,800'}
                                                                    {Number(item.Id) % 100000 === 6740 && '97,200'}
                                                                    {Number(item.Id) % 100000 === 7260 && '145,800'}
                                                                    {Number(item.Id) % 100000 === 7780 && '218,700'}
                                                                    {Number(item.Id) % 100000 === 8340 && '328,050'}
                                                                    {Number(item.Id) % 100000 === 8900 && '492,075'}
                                                                    {Number(item.Id) % 100000 === 9500 && 450}
                                                                    {Number(item.Id) % 100000 === 10100 && '240,000'}
                                                                    {Number(item.Id) % 100000 === 10740 && '360,000'}
                                                                    {Number(item.Id) % 100000 === 11380 && '540,000'}
                                                                    {Number(item.Id) % 100000 === 12060 && '810,000'}
                                                                    {Number(item.Id) % 100000 === 12740 && '1,215,000'}
                                                                    {Number(item.Id) % 100000 === 13460 && '1,822,500'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                            className="pixel button"
                                                            onClick={() => {
                                                                let arg = 0
                                                                if (Number(String(item.Id).slice(0, 7)) <= 1300100) {
                                                                    arg = 1000
                                                                } else if (Number(String(item.Id).slice(0, 7)) <= 1300200) {
                                                                    arg = 2000
                                                                } else if (Number(String(item.Id).slice(0, 7)) <= 1300300) {
                                                                    arg = 3000
                                                                } else if (Number(String(item.Id).slice(0, 7)) <= 1300500) {
                                                                    arg = 4000
                                                                }
                                                                let ind = 0
                                                                if (Number(item.Id) % 100000 === 500) {
                                                                    ind = 1
                                                                } else if (Number(item.Id) % 100000 === 540) {
                                                                    ind = 2
                                                                } else if (Number(item.Id) % 100000 === 580) {
                                                                    ind = 3
                                                                } else if (Number(item.Id) % 100000 === 660) {
                                                                    ind = 4
                                                                } else if (Number(item.Id) % 100000 === 740) {
                                                                    ind = 5
                                                                } else if (Number(item.Id) % 100000 === 860) {
                                                                    ind = 6
                                                                } else if (Number(item.Id) % 100000 === 980) {
                                                                    ind = 7
                                                                } else if (Number(item.Id) % 100000 === 1140) {
                                                                    ind = 8
                                                                } else if (Number(item.Id) % 100000 === 1300) {
                                                                    ind = 9
                                                                } else if (Number(item.Id) % 100000 === 1500) {
                                                                    ind = 10
                                                                } else if (Number(item.Id) % 100000 === 1700) {
                                                                    ind = 11
                                                                } else if (Number(item.Id) % 100000 === 1940) {
                                                                    ind = 12
                                                                } else if (Number(item.Id) % 100000 === 2180) {
                                                                    ind = 13
                                                                } else if (Number(item.Id) % 100000 === 2460) {
                                                                    ind = 14
                                                                } else if (Number(item.Id) % 100000 === 2740) {
                                                                    ind = 15
                                                                } else if (Number(item.Id) % 100000 === 3060) {
                                                                    ind = 16
                                                                } else if (Number(item.Id) % 100000 === 3380) {
                                                                    ind = 17
                                                                } else if (Number(item.Id) % 100000 === 3740) {
                                                                    ind = 18
                                                                } else if (Number(item.Id) % 100000 === 4100) {
                                                                    ind = 19
                                                                } else if (Number(item.Id) % 100000 === 4500) {
                                                                    ind = 20
                                                                } else if (Number(item.Id) % 100000 === 4900) {
                                                                    ind = 21
                                                                } else if (Number(item.Id) % 100000 === 5340) {
                                                                    ind = 22
                                                                } else if (Number(item.Id) % 100000 === 5780) {
                                                                    ind = 23
                                                                } else if (Number(item.Id) % 100000 === 6260) {
                                                                    ind = 24
                                                                } else if (Number(item.Id) % 100000 === 6740) {
                                                                    ind = 25
                                                                } else if (Number(item.Id) % 100000 === 7260) {
                                                                    ind = 26
                                                                } else if (Number(item.Id) % 100000 === 7780) {
                                                                    ind = 27
                                                                } else if (Number(item.Id) % 100000 === 8340) {
                                                                    ind = 28
                                                                } else if (Number(item.Id) % 100000 === 8900) {
                                                                    ind = 29
                                                                } else if (Number(item.Id) % 100000 === 9500) {
                                                                    ind = 30
                                                                } else if (Number(item.Id) % 100000 === 10100) {
                                                                    ind = 31
                                                                } else if (Number(item.Id) % 100000 === 10740) {
                                                                    ind = 32
                                                                } else if (Number(item.Id) % 100000 === 11380) {
                                                                    ind = 33
                                                                } else if (Number(item.Id) % 100000 === 12060) {
                                                                    ind = 34
                                                                } else if (Number(item.Id) % 100000 === 12740) {
                                                                    ind = 35
                                                                } else if (Number(item.Id) % 100000 === 13460) {
                                                                    ind = 36
                                                                }
                                                                evolutionV2Handle(item.Id, arg + ind)
                                                            }}
                                                        >
                                                            UPGRADE
                                                        </div>
                                                    </div>
                                                }


                                                {String(item.Id).length === 12 && Number(String(item.Id).slice(0, 4)) <= 1003 && Number(String(item.Id).slice(4, 7)) <= 500 ?
                                                    <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                        <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                            </div>
                                                            <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">
                                                                    {String(item.Id).slice(0, 4) === "1001" ? <>{item.Name} [Lv.1]</> : <></>}
                                                                    {String(item.Id).slice(0, 4) === "1002" ? <>{item.Name.slice(0, -2)}2]</> : <></>}
                                                                    {String(item.Id).slice(0, 4) === "1003" ? <>{item.Name.slice(0, -2)}3]</> : <></>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            <div>
                                                                <div className="pixel">
                                                                    {String(item.Id).slice(0, 4) === "1001" ? <>Level 0</> : <></>}
                                                                    {String(item.Id).slice(0, 4) === "1002" ? <>Level 1</> : <></>}
                                                                    {String(item.Id).slice(0, 4) === "1003" ? <>Level 2</> : <></>}
                                                                </div>
                                                                <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                            </div>
                                                            <div>
                                                                <div className="pixel">
                                                                    {String(item.Id).slice(0, 4) === "1001" ? <>Level 1</> : <></>}
                                                                    {String(item.Id).slice(0, 4) === "1002" ? <>Level 2</> : <></>}
                                                                    {String(item.Id).slice(0, 4) === "1003" ? <>Level 3 [MAX]</> : <></>}
                                                                </div>
                                                                <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 100} cmpow per sec</div>
                                                            </div>
                                                        </div>
                                                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                        <div style={{marginTop: "10px", width: "350px"}}>
                                                            <div className="pixel">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                                Evolution resource
                                                            </div>
                                                            <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                                <img src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="18" alt="$BBQ"/>
                                                                <div style={{margin: "0 5px"}}>
                                                                    {String(item.Id).slice(0, 4) === "1001" ? <>10,000</> : <></>}
                                                                    {String(item.Id).slice(0, 4) === "1002" ? <>15,000</> : <></>}
                                                                    {String(item.Id).slice(0, 4) === "1003" ? <>25,000</> : <></>}
                                                                </div>
                                                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                <div style={{margin: "0 5px"}}>
                                                                    {String(item.Id).slice(0, 4) === "1001" ? <>1</> : <></>}
                                                                    {String(item.Id).slice(0, 4) === "1002" ? <>2</> : <></>}
                                                                    {String(item.Id).slice(0, 4) === "1003" ? <>3</> : <></>}
                                                                </div>
                                                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                <div style={{margin: "0 5px"}}>
                                                                    {String(item.Id).slice(0, 4) === "1001" ? <>10</> : <></>}
                                                                    {String(item.Id).slice(0, 4) === "1002" ? <>20</> : <></>}
                                                                    {String(item.Id).slice(0, 4) === "1003" ? <>30</> : <></>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                            className="pixel button"
                                                            onClick={() => {
                                                                if (Number(item.Id) <= 100110000100) {
                                                                    evolutionHandle(item.Id, 1)
                                                                } else if (Number(item.Id) <= 100120000100) {
                                                                    evolutionHandle(item.Id, 2)
                                                                } else if (Number(item.Id) <= 100130000100) {
                                                                    evolutionHandle(item.Id, 3)
                                                                } else if (Number(item.Id) <= 100140000100) {
                                                                    evolutionHandle(item.Id, 4)
                                                                } else if (Number(item.Id) <= 100150000100) {
                                                                    evolutionHandle(item.Id, 5)

                                                                } else if (Number(item.Id) <= 100210000200) {
                                                                    evolutionHandle(item.Id, 6)
                                                                } else if (Number(item.Id) <= 100220000200) {
                                                                    evolutionHandle(item.Id, 7)
                                                                } else if (Number(item.Id) <= 100230000200) {
                                                                    evolutionHandle(item.Id, 8)
                                                                } else if (Number(item.Id) <= 100240000200) {
                                                                    evolutionHandle(item.Id, 9)
                                                                } else if (Number(item.Id) <= 100250000200) {
                                                                    evolutionHandle(item.Id, 10)

                                                                } else if (Number(item.Id) <= 100310000300) {
                                                                    evolutionHandle(item.Id, 11)
                                                                } else if (Number(item.Id) <= 100320000300) {
                                                                    evolutionHandle(item.Id, 12)
                                                                } else if (Number(item.Id) <= 100330000300) {
                                                                    evolutionHandle(item.Id, 13)
                                                                } else if (Number(item.Id) <= 100340000300) {
                                                                    evolutionHandle(item.Id, 14)
                                                                } else if (Number(item.Id) <= 100350000300) {
                                                                    evolutionHandle(item.Id, 15)
                                                                }
                                                            }}
                                                        >
                                                            UPGRADE
                                                        </div>
                                                    </div> :
                                                    <></>
                                                }

                                                {String(item.Id).length === 12 && Number(String(item.Id).slice(0, 4)) === 1004 && Number(String(item.Id).slice(4, 7)) <= 100 ?
                                                    <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                        <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                            </div>
                                                            <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                            <div>
                                                                <img src="https://nftstorage.link/ipfs/bafkreigeifewiy4kyfle3xi6qsje4kz7mhqvt3xvufv6tes2ocyr6corsq" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">FANCY PEPE JA</div>
                                                            </div>
                                                        </div>
                                                        <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            <div>
                                                                <div className="pixel">Level 3 [MAX]</div>
                                                                <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                            </div>
                                                            <div>
                                                                <div className="pixel">FUSION FORM</div>
                                                                <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 1200} cmpow per sec</div>
                                                            </div>
                                                        </div>
                                                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                        <div style={{marginTop: "10px", width: "350px"}}>
                                                            <div className="pixel">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                                Fusion resource
                                                            </div>
                                                            <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                                <div style={{margin: "0 5px"}}>PEPE JA Vol.1 - 4 [Lv.3]</div>
                                                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                <div style={{margin: "0 5px"}}>15</div>
                                                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                <div style={{margin: "0 5px"}}>150</div>
                                                            </div>
                                                        </div>
                                                        <div style={{margin: "10px 0", width: "350px"}}>
                                                                <div className="emp pixel">
                                                                    <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                    Success rate : 1/2
                                                                </div>
                                                                <div className="pixel">depend on parent blockhash calculation</div>
                                                            </div>
                                                        <div
                                                            style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                            className="pixel button"
                                                            onClick={() => {fusionHandle(item.Id, 1)}}
                                                        >
                                                            UPGRADE
                                                        </div>
                                                    </div> :
                                                    <></>
                                                }
                                            </div>
                                        ))}
                                    </div> :
                                    <>
                                    {address !== undefined ?
                                        <div className="nftCard" style={{justifyContent: "center"}}>
                                            <i style={{fontSize: "150px", marginBottom: "30px"}} className="fas fa-scroll"></i>
                                            <div className="bold">No NFTs to up level.</div>
                                        </div> :
                                        <div className="nftCard" style={{justifyContent: "center"}}>
                                            <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                            <div className="bold">Please connect wallet to view your NFTs.</div>
                                        </div>
                                    }
                                    </>
                                }
                            </> :
                            <div style={{width: "300px", padding: "20px", margin: "20px"}}>
                                <ThreeDots fill="#5f6476" />
                            </div>
                        }


                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                        <div style={{marginTop: "20px", fontSize: "16px", letterSpacing: "1px"}} className="bold">Salon NFTs</div>
                        {salonNft !== undefined && salonNft.length > 0 ?
                            <>
                                {salonNft[0] !== null ?
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                        {salonNft.map((item, index) => (
                                            <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}} key={index}>
                                                {Number(String(item.Id).slice(0, 7)) === 1000000  ?
                                                    <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                        <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                            </div>
                                                            <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                            <div>
                                                                <img src="https://nftstorage.link/ipfs/bafkreif5fecf5rqrlixcxtpzplo7frtftt3yh2cmx6oca4l2jxuryjju2m" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">SAPIENS #01</div>
                                                            </div>
                                                        </div>
                                                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                        <div style={{marginTop: "10px", width: "350px"}}>
                                                            <div className="pixel">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                                Salon resource
                                                            </div>
                                                            <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                                <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                <div style={{margin: "0 5px"}}>10</div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                            className="pixel button"
                                                            onClick={() => {changeHandle(item.Id)}}
                                                        >
                                                            CHANGE
                                                        </div>
                                                    </div> :
                                                    <></>
                                                }
                                            </div>
                                        ))}
                                    </div> :
                                    <>
                                        {address !== undefined ?
                                            <div className="nftCard" style={{justifyContent: "center"}}>
                                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fas fa-scroll"></i>
                                                <div className="bold">No Salon NFTs.</div>
                                            </div> :
                                            <div className="nftCard" style={{justifyContent: "center"}}>
                                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                                <div className="bold">Please connect wallet to view your NFTs.</div>
                                            </div>
                                        }
                                    </>
                                }
                            </> :
                            <div style={{width: "300px", padding: "20px", margin: "20px"}}>
                                <ThreeDots fill="#5f6476" />
                            </div>
                        }

                        
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                        <div style={{marginTop: "20px", fontSize: "16px", letterSpacing: "1px"}} className="bold">Removal Clinic</div>
                        {salonNft !== undefined && salonNft.length > 0 ?
                            <>
                                {Number(String(skinSlot1).slice(0, 1)) !== 0 ?
                                    <>
                                        {Number(String(skinSlot1).slice(0, 8)) === 10000000 ?
                                            <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                    <div>
                                                        <img src="https://nftstorage.link/ipfs/bafkreif5fecf5rqrlixcxtpzplo7frtftt3yh2cmx6oca4l2jxuryjju2m" width="120" alt="Can not load metadata." />
                                                        <div style={{width: "150px"}} className="emp pixel">SAPIENS #01</div>
                                                    </div>
                                                </div>
                                                <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                <div style={{marginTop: "10px", width: "350px"}}>
                                                    <div className="pixel">
                                                        <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                        Removal resource
                                                    </div>
                                                    <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                        <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                        <div style={{margin: "0 5px"}}>10</div>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                    className="pixel button"
                                                    onClick={() => {unchangeHandle(1)}}
                                                >
                                                    UNCHANGE
                                                </div>
                                            </div> :
                                            <></>
                                        }
                                    </> :
                                    <>
                                        {address !== undefined ?
                                            <div className="nftCard" style={{justifyContent: "center"}}>
                                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fas fa-scroll"></i>
                                                <div className="bold">No Salon NFTs to Unchange.</div>
                                            </div> :
                                            <div className="nftCard" style={{justifyContent: "center"}}>
                                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                                <div className="bold">Please connect wallet to view your NFTs.</div>
                                            </div>
                                        }
                                    </>
                                }
                            </> :
                            <div style={{width: "300px", padding: "20px", margin: "20px"}}>
                                <ThreeDots fill="#5f6476" />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default NpcEvolutionary
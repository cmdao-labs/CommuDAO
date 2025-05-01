import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract, sendTransaction } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { ThreeDots } from 'react-loading-icons'

const wood = '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd'
const cu = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'
const sil = '0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f'
const os = '0xAc5299D92373E9352636559cca497d7683A47655'
const cmdaoNft = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const land = '0x90B3a1F21D1C0BE9A8B6a6AA129066951AF63B72'
const cmdaoName = '0x9f3adB20430778f52C2f99c4FBed9637a49509F2'
const slot1 = '0x171b341FD1B8a2aDc1299f34961e19B552238cb5'
const house = '0xCb3AD565b9c08C4340A7Fe857c38595587843139'
const houseStaking = '0xc4dB6374EeCa3743F8044ae995892827B62b14fe'
const transporthub = '0xC673f53b490199AF4BfE17F2d77eBc72Bde3b964'
const weaponDepot = '0xcCbD8B881Dd8e137d41a6A02aBA2Db94f3049B35'
const weaponDepotStaking = '0xeC661f744637778029C1EC61c39976d75Fb080b6'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const CmCityLand = ({ config, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, intrasubModetext, navigate, callMode, erc20Abi, erc721Abi, cmdaoNameABI, slot1ABI, houseABI, delegateOwner01ABI, houseStakingABI, wlMkpABI, transportHubABI, constructionABI, constructionStakingABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const { open } = useAppKit()
    let code = null
    if (intrasubModetext !== undefined && intrasubModetext.slice(0, 1).toUpperCase() === 'Z') {
        code = '26'
    } else if (intrasubModetext !== undefined && intrasubModetext.slice(0, 1).toUpperCase() === 'A') {
        code = '01'
    } else if (intrasubModetext !== undefined && intrasubModetext.slice(0, 1).toUpperCase() === 'B') {
        code = '02'
    } else if (intrasubModetext !== undefined && intrasubModetext.slice(0, 1).toUpperCase() === 'C') {
        code = '03'
    }
    const houseId = intrasubModetext !== undefined ? '100' + code + '0' + intrasubModetext.slice(1, 3) : null
    const [mode, setMode] = React.useState(0)
    const [llAddr, setLlAddr] = React.useState(null)
    const [llName, setLlName] = React.useState('...')
    const [slot1Addr, setSlot1Addr] = React.useState(null)
    const [slot1Owner, setSlot1Owner] = React.useState('...')
    const [slot1Lv, setSlot1Lv] = React.useState(0)
    const [nft, setNft] = React.useState([])
    const [delegateAddr, setDelegateAddr] = React.useState(null)
    const [osPool, setOsPool] = React.useState(null)
    const [allPendingReward, setAllPendingReward] = React.useState(0)
    const [allPow, setAllPow] = React.useState(0)
    const [nftStake, setNftStake] = React.useState([])
    const [wdLv, setWdLv] = React.useState(0)
    const [wdBonus, setWdBonus] = React.useState(0)
    const [osPoolWD, setOsPoolWD] = React.useState(null)
    const [allPendingRewardWD, setAllPendingRewardWD] = React.useState(0)
    const [allPowWD, setAllPowWD] = React.useState(0)
    const [nftStakeWD, setNftStakeWD] = React.useState([])
    const [thubLv, setThubLv] = React.useState(0)

    React.useEffect(() => {        
        window.scrollTo(0, 0)
        const cmdaonftSC = new ethers.Contract(cmdaoNft, erc721Abi, providerJBC)
        
        const thefetch = async () => {
            const data = intrasubModetext !== undefined ? await readContracts(config, {
                contracts: [
                    {
                        address: land,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
                        chainId: 8899
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
                        chainId: 8899
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
                        chainId: 8899
                    },
                    {
                        address: os,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [houseStaking],
                        chainId: 8899
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
                        chainId: 8899
                    },
                    {
                        address: weaponDepot,
                        abi: constructionABI,
                        functionName: 'constructionLevel',
                        args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
                        chainId: 8899
                    },
                    {
                        address: os,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [weaponDepotStaking],
                        chainId: 8899
                    },
                    {
                        address: weaponDepot,
                        abi: constructionABI,
                        functionName: 'landBonus',
                        args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
                        chainId: 8899
                    },
                ],
            }) : [{result: 0, status: "yo"}, {result: '0x0000000000000000000000000000000000000000', status: "yo"}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}]
            if (data[0].result === undefined || intrasubModetext === undefined || (intrasubModetext !== undefined && intrasubModetext.length !== 3)) (
                callMode(null)
            )
            const landOwner = data[0].result
            const slot1owner = data[1].result
            const slot1level = data[2].result
            const ospool = data[3].result
            const thubState = data[4].result
            const wdlevel = data[5].result
            const ospoolWD = data[6].result
            const wdBonus = data[7].result

            const id = data[0].status === 'success' && data[1].status === 'success' ? await readContracts(config, {
                contracts: [
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [landOwner],
                        chainId: 8899
                    },
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [slot1owner],
                        chainId: 8899
                    }
                ],
            }) : [{result: 0, status: "yo"}, {result: 0, status: "yo"}]
            const id0 = id[0].result
            const id1 = id[1].result
            const landlordname = id[0].status === 'success' && id[1].status === 'success' ? await readContracts(config, {
                contracts: [
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [Number(id0)],
                        chainId: 8899
                    },
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [Number(id1)],
                        chainId: 8899
                    }
                ],
            }) : [{result: 0}, {result: 0}]

            let nftstake = []
            let stakeRemoveDup = []
            if (code !== null) {
                const stakeFilter = await cmdaonftSC.filters.Transfer(slot1owner, houseStaking, null)
                const stakeEvent = await cmdaonftSC.queryFilter(stakeFilter, 3700385, "latest")
                const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
                stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            }
            const data0 = code !== null ? await readContracts(config, {
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: houseStaking,
                        abi: houseStakingABI,
                        functionName: 'nftStake',
                        args: [1, String(item)],
                        chainId: 8899
                    }
                ))
            }) : null
            let yournftstake = []
            for (let i = 0; i <= stakeRemoveDup.length - 1 && code !== null; i++) {
                if (data0[i].result[0].toUpperCase() === slot1owner.toUpperCase() && Number(data0[i].result[4]) === Number('100' + code + '0' + intrasubModetext.slice(1, 3))) {
                    yournftstake.push({Id: String(stakeRemoveDup[i])})
                }
            }
            const data1 = code !== null ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: cmdaoNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 8899
                    }
                ))
            }) : null
            const data12 = code !== null ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: houseStaking,
                        abi: houseStakingABI,
                        functionName: 'pendingReward',
                        args: [1, String(item.Id)],
                        chainId: 8899
                    }
                ))
            }) : null
            let _allReward1 = 0
            let _allPow = 0
            for (let i = 0; i <= yournftstake.length - 1; i++) {
                const nftipfs = data1[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    nft = await response.json()
                } catch {}
                _allReward1 += Number(ethers.utils.formatEther(data12[i].result))
                _allPow += Number(String(yournftstake[i].Id).slice(-5))
                nftstake.push({
                    Id: yournftstake[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerBlock: Number(String(yournftstake[i].Id).slice(-5)),
                    isStaked: true,
                    Reward: Number(ethers.utils.formatEther(data12[i].result)),
                })
            }
            if (nftstake.length === 0) { nftstake.push(null) }

            let nftstakeWD = []
            let stakeRemoveDupWD = []
            if (code !== null) {
                const stakeFilterWD = await cmdaonftSC.filters.Transfer(slot1owner, weaponDepotStaking, null)
                const stakeEventWD = await cmdaonftSC.queryFilter(stakeFilterWD, 3659125, "latest")
                const stakeMapWD = await Promise.all(stakeEventWD.map(async (obj) => String(obj.args.tokenId)))
                stakeRemoveDupWD = stakeMapWD.filter((obj, index) => stakeMapWD.indexOf(obj) === index)
            }
            const data0WD = code !== null ? await readContracts(config, {
                contracts: stakeRemoveDupWD.map((item) => (
                    {
                        address: weaponDepotStaking,
                        abi: constructionStakingABI,
                        functionName: 'nftStake',
                        args: [1, String(item)],
                        chainId: 8899
                    }
                ))
            }) : null
            let yournftstakeWD = []
            for (let i = 0; i <= stakeRemoveDupWD.length - 1 && code !== null; i++) {
                if ((data0WD[i].result[0].toUpperCase() === slot1owner.toUpperCase()) && Number(data0WD[i].result[4]) === Number('100' + code + '0' + intrasubModetext.slice(1, 3))) {
                    yournftstakeWD.push({Id: String(stakeRemoveDupWD[i])})
                }
            }
            const data1WD = code !== null ? await readContracts(config, {
                contracts: yournftstakeWD.map((item) => (
                    {
                        address: cmdaoNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 8899
                    }
                ))
            }) : null
            const data12WD = code !== null ? await readContracts(config, {
                contracts: yournftstakeWD.map((item) => (
                    {
                        address: weaponDepotStaking,
                        abi: constructionStakingABI,
                        functionName: 'pendingReward',
                        args: [1, String(item.Id)],
                        chainId: 8899
                    }
                ))
            }) : null

            let _allReward1WD = 0
            let _allPowWD = 0
            for (let i = 0; i <= yournftstakeWD.length - 1; i++) {
                const nftipfs = data1WD[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    nft = await response.json()
                } catch {}
                _allReward1WD += Number(ethers.utils.formatEther(data12WD[i].result))
                _allPowWD += Number(String(yournftstakeWD[i].Id).slice(-5))
                nftstakeWD.push({
                    Id: yournftstakeWD[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerBlock: Number(String(yournftstakeWD[i].Id).slice(-5)),
                    isStaked: true,
                    Reward: Number(ethers.utils.formatEther(data12WD[i].result)),
                })
            }
            if (nftstakeWD.length === 0) { nftstakeWD.push(null) }

            let nfts = []
            let walletRemoveDup = []
            if (code !== null) {
                const walletFilter = await cmdaonftSC.filters.Transfer(null, slot1owner, null)
                const walletEvent = await cmdaonftSC.queryFilter(walletFilter, 335000, "latest")
                const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            }
            const data2 = code !== null ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: cmdaoNft,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 8899
                    }
                ))
            }) : null
            let yournftwallet = []
            for (let i = 0; i <= walletRemoveDup.length - 1 && code !== null; i++) {
                if (data2[i].result.toUpperCase() === slot1owner.toUpperCase()) {
                    yournftwallet.push({Id: String(walletRemoveDup[i])})
                }
            }
            const data3 = code !== null ? await readContracts(config, {
                contracts: yournftwallet.map((item) => (
                    {
                        address: cmdaoNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 8899
                    }
                ))
            }) : null
            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data3[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    nft = await response.json()
                } catch {}
                nfts.push({
                    Col: 1,
                    Id: yournftwallet[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet[i].Id.slice(-5)),
                    isStaked: false
                })
            }
            if (nfts.length === 0) { nfts.push(null) }

            return [
                landOwner, slot1owner, landlordname, slot1level, nfts, ospool, _allReward1, _allPow, nftstake, thubState, 
                wdlevel, ospoolWD, _allReward1WD, _allPowWD, nftstakeWD, wdBonus, 
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
            setLlAddr(result[0])
            setSlot1Addr(result[1])
            result[2][0].status === 'success' ? setLlName(result[2][0].result) : setLlName('Unknown')
            result[2][1].status === 'success' ? setSlot1Owner(result[2][1].result) : setSlot1Owner('Unknown')
            setSlot1Lv(Number(result[3]))
            setNft(result[4])
            setOsPool(ethers.utils.formatEther(String(result[5])))
            setAllPendingReward(result[6])
            setAllPow(result[7])
            setNftStake(result[8])
            setThubLv(Number(result[9][0]))
            setWdLv(Number(result[10]))
            setOsPoolWD(ethers.utils.formatEther(String(result[11])))
            setAllPendingRewardWD(result[12])
            setAllPowWD(result[13])
            setNftStakeWD(result[14])
            setWdBonus(result[15])
        })

    }, [config, address, chain, code, intrasubModetext, txupdate, erc20Abi, erc721Abi, cmdaoNameABI, slot1ABI, houseStakingABI, transportHubABI, constructionABI, constructionStakingABI, callMode])
    
    const upgradeHouseHandle = async (_level) => {
        setisLoading(true)
        try {
            let woodUsage = 0
            let secondUsage = 0
            let secondToken = '0x0000000000000000000000000000000000000000'
            if (_level === 1) {
                woodUsage = 100000000
                secondUsage = 50000
                secondToken = cu
            } else if (_level === 2) {
                woodUsage = 200000000
                secondUsage = 100000
                secondToken = cu
            } else if (_level === 3) {
                woodUsage = 400000000
                secondUsage = 200000
                secondToken = cu
            } else if (_level === 4) {
                woodUsage = 800000000
                secondUsage = 400000
                secondToken = cu
            } else if (_level === 5) {
                woodUsage = 1600000000
                secondUsage = 800000
                secondToken = cu
            } else if (_level === 6) {
                woodUsage = 3200000000
                secondUsage = 100000
                secondToken = sil
            } else if (_level === 7) {
                woodUsage = 6400000000
                secondUsage = 200000
                secondToken = sil
            } else if (_level === 8) {
                woodUsage = 9999000000
                secondUsage = 400000
                secondToken = sil
            } else if (_level === 9) {
                woodUsage = 9999000000
                secondUsage = 800000
                secondToken = sil
            } else if (_level === 10) {
                woodUsage = 9999000000
                secondUsage = 1600000
                secondToken = sil
            }
            const woodAllow = await readContract(config, {
                address: wood,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, house],
            })
            if (Number(ethers.utils.parseEther(woodAllow)) < woodUsage) {
                let { request } = await simulateContract(config, {
                    address: wood,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [house, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            const secondAllow = await readContract(config, {
                address: secondToken,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, house],
            })
            if (Number(ethers.utils.parseEther(secondAllow)) < secondUsage) {
                let { request } = await simulateContract(config, {
                    address: secondToken,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [house, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            if (_level === 1) {
                let { request } = await simulateContract(config, {
                    address: slot1,
                    abi: slot1ABI,
                    functionName: 'delegateOwner',
                    args: [0, address, houseId]
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: house,
                abi: houseABI,
                functionName: 'upgrade',
                args: [_level, houseId]
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

    const registHouseHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: '0x786200541C307B5e6F414193D250752a999375C4',
                abi: delegateOwner01ABI,
                functionName: 'delegateOwnerCall',
                args: [houseId, delegateAddr]
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

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract(config, {
                address: cmdaoNft,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== houseStaking.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: cmdaoNft,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [houseStaking, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }        
            let { request } = await simulateContract(config, {
                address: houseStaking,
                abi: houseStakingABI,
                functionName: 'stake',
                args: [1, _nftid, houseId],
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

    const unstakeNft = async (_nftid, _unstake) => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: houseStaking,
                abi: houseStakingABI,
                functionName: 'unstake',
                args: [1, _nftid, _unstake],
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

    const unstakeNftAll = async () => {
        setisLoading(true)
        try {
            for (let i = 0; i <= nftStake.length - 1; i++) {
                let { request } = await simulateContract(config, {
                    address: houseStaking,
                    abi: houseStakingABI,
                    functionName: 'unstake',
                    args: [1, nftStake[i].Id, false],
                })
                if (i === nftStake.length - 1) {
                    let h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                    setTxupdate(h)
                } else {
                    await writeContract(config, request)
                }
            }
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const upgradeWeaponDepotHandle = async (_level) => {
        setisLoading(true)
        try {
            let woodUsage = 0
            let secondUsage = 0
            let secondToken = '0x0000000000000000000000000000000000000000'
            if (_level === 1) {
                woodUsage = 100000000
                secondUsage = 500000
                secondToken = cu
            }
            const woodAllow = await readContract(config, {
                address: wood,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, weaponDepot],
            })
            if (Number(ethers.utils.parseEther(woodAllow)) < woodUsage) {
                let { request } = await simulateContract(config, {
                    address: wood,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [weaponDepot, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            const secondAllow = await readContract(config, {
                address: secondToken,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, weaponDepot],
            })
            if (Number(ethers.utils.parseEther(secondAllow)) < secondUsage) {
                let { request } = await simulateContract(config, {
                    address: secondToken,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [weaponDepot, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: weaponDepot,
                abi: constructionABI,
                functionName: 'upgrade01',
                args: [_level, houseId]
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

    const upgradeTHubHandle = async (_level) => {
        setisLoading(true)
        try {
            let woodUsage = 0
            let secondUsage = 0
            let secondToken = '0x0000000000000000000000000000000000000000'
            if (_level === 1) {
                woodUsage = 3200000000
                secondUsage = 1600000
                secondToken = cu
            }
            const woodAllow = await readContract(config, {
                address: wood,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, transporthub],
            })
            if (Number(ethers.utils.parseEther(woodAllow)) < woodUsage) {
                let { request } = await simulateContract(config, {
                    address: wood,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [transporthub, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            const secondAllow = await readContract(config, {
                address: secondToken,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, transporthub],
            })
            if (Number(ethers.utils.parseEther(secondAllow)) < secondUsage) {
                let { request } = await simulateContract(config, {
                    address: secondToken,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [transporthub, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: transporthub,
                abi: transportHubABI,
                functionName: 'upgrade01',
                args: [_level, houseId]
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
            let h2 = await sendTransaction(config, {
                chainId: 8899,
                to: '0x336C4EaE525948C8EF79b74b549C048f07639315',
                value: ethers.utils.parseEther('10'),
            })
            await waitForTransactionReceipt(config, { hash: h2 })
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const stakeNftWD = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract(config, {
                address: cmdaoNft,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== houseStaking.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: cmdaoNft,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [weaponDepotStaking, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }        
            let { request } = await simulateContract(config, {
                address: weaponDepotStaking,
                abi: constructionStakingABI,
                functionName: 'stake',
                args: [1, _nftid, houseId],
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

    const unstakeNftWD = async (_nftid, _unstake) => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: weaponDepotStaking,
                abi: constructionStakingABI,
                functionName: 'unstake',
                args: [1, _nftid, _unstake],
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
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div className="SubfieldBanner pixel">
                    <div style={{fontSize: "75px", width: "fit-content"}}>Land {intrasubModetext !== undefined && intrasubModetext.toUpperCase()} of {llName}</div>
                </div>
                <div className="SubfieldBanner">
                    {(code === '01' || houseId === '10026002') && <img src="https://gateway.commudao.xyz/ipfs/bafkreiatzl4wbuoxjjrbeicqgm7xklq532mkqrpxen4bvtbn5q46zyawyy" height="150" alt="LAND.A" />}
                    {(code === '02' || houseId === '10026006' || houseId === '10026010') && <img src="https://gateway.commudao.xyz/ipfs/bafkreidtwbjkybihrt5i2zfy7fx2ixsgjerganenyyxtnidnlih7el7usq" height="150" alt="LAND.B" />}
                    {(code === '03' || houseId === '10026011') && <img src="https://gateway.commudao.xyz/ipfs/bafkreiago24hri42hnmirrohbjxmkwdpl4csybfox3ounsql4by7qu3k6q" height="150" alt="LAND.C" />}
                </div>
            </div>

            {address !== null && chain !== undefined && chain.id !== 8899 ?
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                        <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "fit-content", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">MISMATCH CHAIN!</div>
                        <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to JIBCHAIN.</div>
                        <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => open({ view: 'Networks' })}>SWITCH NETWORK</div>
                        <div className="button" style={{marginTop: "10px", width: "50%", background: "gray"}} onClick={() => {callMode(0); navigate('/');}}>BACK TO HOME</div>
                        </div>
                    </div>
                </div> :
                <>
                    {mode === 0 &&
                        <div style={{background: "rgb(0, 19, 33", width: "100%", margin: "0", minHeight: "inherit", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", overflow: "scroll"}} className="collection noscroll">
                            <div style={{width: "100%", marginBottom: "80px", display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", height: "fit-content", overflow: "scroll"}} className="pixel mainprofile">
                                <div style={{background: "rgb(0, 26, 44)", border: "none", justifyContent: "space-around", padding: "30px", maxWidth: "100%", width: "1140px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                                    <div style={{background: "transparent", padding: "30px", maxWidth: "95%", width: "1000px", height: "fit-content", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                                        <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", width: "350px", height: "500px", display: "flex", flexFlow: "column wrap", justifyContent: "space-around", padding: "50px", border: "none", marginRight: "20px"}} className='nftCard'>
                                            <div style={{width: "320px", textAlign: "left", fontSize: "18px", color: "#fff"}} className="bold" onClick={() => setMode(0)}>{slot1Owner}'s house Lv.{slot1Lv}</div>
                                            <div style={{width: "320px"}}>
                                                {slot1Lv === 0 && <img src="https://gateway.commudao.xyz/ipfs/bafybeielpogfiry6r54yhzalsu2wmrp37oergq7v7r4w2qoljsesy6eoom" style={{filter: "grayscale(1)"}} height="200" alt="HOUSE.LV.1" />}
                                                {(slot1Lv >= 1 && slot1Lv <= 5) && <img src="https://gateway.commudao.xyz/ipfs/bafybeielpogfiry6r54yhzalsu2wmrp37oergq7v7r4w2qoljsesy6eoom" height="200" alt="HOUSE.LV.1" />}
                                                {(slot1Lv >= 6 && slot1Lv <= 10) && <img src="https://gateway.commudao.xyz/ipfs/Qmf7bVQFwz8tQ1eVJBqcMkq3jY4BQvDfdnZgLBY26Fb5RX" height="200" alt="HOUSE.LV.6" />}
                                            </div>
                                            {llAddr !== null && address !== null && (String(llAddr).toUpperCase() === address.toUpperCase() || String(slot1Addr).toUpperCase() === address.toUpperCase()) ?
                                                <div style={{width: "320px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                    <div>
                                                        <div style={{fontSize: "12px"}} className="bold">BUILDING COSTS</div>
                                                        <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "20px", flexWrap: "wrap"}} className="bold">
                                                            <div style={{display: "flex", flexDirection: "row"}}>
                                                                <img src="https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="30px" alt="$WOOD"/>
                                                                <div style={{margin: "0 30px 0 10px"}}>
                                                                    {slot1Lv === 0 && '100M'}
                                                                    {slot1Lv === 1 && '200M'}
                                                                    {slot1Lv === 2 && '400M'}
                                                                    {slot1Lv === 3 && '800M'}
                                                                    {slot1Lv === 4 && '1,600M'}
                                                                    {slot1Lv === 5 && '3,200M'}
                                                                    {slot1Lv === 6 && '6,400M'}
                                                                    {(slot1Lv >= 7 && slot1Lv <= 10) && '9,999M'}
                                                                </div>
                                                            </div>
                                                            <div style={{display: "flex", flexDirection: "row"}}>
                                                                {slot1Lv <= 4 && <img src="https://gateway.commudao.xyz/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" height="30px" alt="$CU"/>}
                                                                {(slot1Lv >= 5 && slot1Lv <= 9) && <img src="https://gateway.commudao.xyz/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde" height="30px" alt="$SIL"/>}
                                                                <div style={{marginLeft: "10px"}}>
                                                                    {slot1Lv === 0 && '50,000'}
                                                                    {slot1Lv === 1 && '100,000'}
                                                                    {slot1Lv === 2 && '200,000'}
                                                                    {slot1Lv === 3 && '400,000'}
                                                                    {slot1Lv === 4 && '800,000'}
                                                                    {slot1Lv === 5 && '100,000'}
                                                                    {slot1Lv === 6 && '200,000'}
                                                                    {slot1Lv === 7 && '400,000'}
                                                                    {slot1Lv === 8 && '800,000'}
                                                                    {slot1Lv === 9 && '1,600,000'}
                                                                    {slot1Lv === 10 && 'TBD'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>                                        
                                                        {(slot1Lv !== 0 && slot1Lv !== 10)  &&
                                                            <div 
                                                                style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "140px", borderRadius: "12px", padding: "12px 20px", marginTop: "20px", color: "rgb(0, 26, 44)"}}
                                                                className="bold button" 
                                                                onClick={() => upgradeHouseHandle(slot1Lv + 1)}
                                                            >
                                                                UPGRADE
                                                            </div>
                                                        }
                                                        {slot1Lv === 0 &&
                                                            <div 
                                                                style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "140px", borderRadius: "12px", padding: "12px 20px", marginTop: "20px", color: "rgb(0, 26, 44)"}}
                                                                className="bold button" 
                                                                onClick={() => upgradeHouseHandle(1)}
                                                            >
                                                                CONSTRUCT
                                                            </div>
                                                        }
                                                        <div style={{width: "95%", marginTop: "20px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                                            <input style={{width: "180px", padding: "10px 20px", marginRight: "10px", fontSize: "10px"}} className="bold" type="string" placeholder="New House Owner Addr" value={delegateAddr} onChange={(event) => {setDelegateAddr(event.target.value)}}></input>
                                                            {nftStake[0] === null ?
                                                                <div style={{display: "flex", justifyContent: "center", width: "140px", borderRadius: "12px", padding: "12px 20px", color: "rgb(0, 26, 44)"}} className="bold button" onClick={registHouseHandle}>DELIGATE</div> :
                                                                <div style={{display: "flex", justifyContent: "center", width: "140px", borderRadius: "12px", padding: "12px 20px", color: "rgb(0, 26, 44)", background: "gray", cursor: "not-allowed", fontSize: "10px"}} className="bold button">UNSTAKE ALL NFT FIRST</div>
                                                            }
                                                        </div>
                                                        {/*Number(houseId) === 10026011 &&
                                                            <div 
                                                                style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", marginTop: "20px", color: "rgb(0, 26, 44)", fontSize: "12px"}}
                                                                className="bold button" 
                                                                onClick={claimLandHandle}
                                                            >
                                                                CLAIM LAND
                                                            </div>
                                                        */}
                                                    </div>
                                                </div> :
                                                <div style={{height: "41px"}}></div>
                                            }
                                        </div>
                                        <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", width: "370px", height: "360px", margin: "20px 0 40px 0", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "1px solid", boxShadow: "inset -2px -2px 0px 0.25px #00000040"}}>
                                            <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                                <div style={{fontSize: "22px", lineHeight: "15px"}}>SLEEP TO EARN</div>
                                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}} className="emp">
                                                    {nftStake[0] !== null ?
                                                        <>
                                                            <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                            <div>On Staking</div>
                                                        </> :
                                                        <>
                                                            <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                            <div>Available for stake</div>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>TOTAL CMPOW PER SEC: <div>{allPow}</div></div>
                                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                                OVERSOUL PENDING
                                                <div style={{display: "flex", flexDirection: "row", color: "#ff007a"}}>
                                                    <img src="https://gateway.commudao.xyz/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="20" alt="$OS"/>
                                                    <div style={{marginLeft: "5px"}}>{allPendingReward.toLocaleString()}</div>
                                                </div>
                                            </div>
                                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                                AVAILABLE OS IN POOL
                                                <div style={{display: "flex", flexDirection: "row"}}>
                                                    <img src="https://gateway.commudao.xyz/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="20" alt="$OS"/>
                                                    <div style={{marginLeft: "5px"}}>{Number(osPool).toFixed(3).toLocaleString()}</div>
                                                </div>
                                            </div>
                                            {address !== null && slot1Addr !== undefined ? 
                                                <>
                                                    {slot1Addr !== null && address.toUpperCase() === slot1Addr.toUpperCase() ?
                                                        <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                                            {nftStake !== null && nftStake[0] !== null ?
                                                                <div style={{alignSelf: "center", background: "#ff007a"}} className="button" onClick={unstakeNftAll}>HARVEST ALL</div> :
                                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST ALL</div>
                                                            }
                                                        </div> :
                                                        <div style={{height: "41px"}}></div>
                                                    }
                                                </> :
                                                <div style={{height: "41px"}}></div>
                                            }
                                        </div>
                                        <div className='slotbox'>
                                            {nft.length > 0 ?
                                                <>
                                                    {slot1Lv >= 1 &&
                                                        <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                                            {nftStake[0] !== null ?
                                                                <>
                                                                    <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center", color: "#fff"}}>{nftStake[0].Name}</div>
                                                                    <img src={nftStake[0].Image} width="200px" alt="Can not load metadata." />
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{nftStake[0].RewardPerBlock} cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStake[0].Reward).toFixed(4)} Pending $OS</div>
                                                                    {address !== null && slot1Addr !== null && slot1Addr !== undefined ?
                                                                        <>
                                                                            {address.toUpperCase() === slot1Addr.toUpperCase() ?
                                                                                <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                                    {nftStake !== null && nftStake[0] !== undefined &&
                                                                                        <>
                                                                                            <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNft(nftStake[0].Id, false)}>HARVEST</div>
                                                                                            <div className="button" onClick={() => unstakeNft(nftStake[0].Id, true)}>HARVEST & UNSTAKE</div>
                                                                                        </>
                                                                                    }
                                                                                </div> :
                                                                                <div style={{height: "105px"}}></div>
                                                                            }
                                                                        </> :
                                                                        <div style={{height: "105px"}}></div>
                                                                    }
                                                                </> :
                                                                <>
                                                                    <div style={{width: "200px", marginBottom: "15px", fontSize: "16px", color: "#fff"}}>Main Char SLOT1</div>
                                                                    <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                                    <div style={{height: "105px"}}></div>
                                                                </>
                                                            }
                                                        </div>
                                                    }
                                                    {slot1Lv >= 2 && 
                                                        <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                                            {nftStake !== null && nftStake[1] !== undefined ?
                                                                <>
                                                                    <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center", color: "#fff"}}>{nftStake[1].Name}</div>
                                                                    <img src={nftStake[1].Image} width="200px" alt="Can not load metadata." />
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{nftStake[1].RewardPerBlock} cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStake[1].Reward).toFixed(4)} Pending $OS</div>
                                                                    {address !== null && slot1Addr !== null && slot1Addr !== undefined ?
                                                                        <>
                                                                            {address.toUpperCase() === slot1Addr.toUpperCase() ?
                                                                                <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                                    {nftStake !== null && nftStake[1] !== undefined &&
                                                                                        <>
                                                                                            <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNft(nftStake[1].Id, false)}>HARVEST</div>
                                                                                            <div className="button" onClick={() => unstakeNft(nftStake[1].Id, true)}>HARVEST & UNSTAKE</div>
                                                                                        </>
                                                                                    }
                                                                                </div> :
                                                                                <div style={{height: "105px"}}></div>
                                                                            }
                                                                        </> :
                                                                        <div style={{height: "105px"}}></div>
                                                                    }
                                                                </> :
                                                                <>
                                                                    <div style={{width: "200px", marginBottom: "15px", fontSize: "16px", color: "#fff"}}>Main Char SLOT2</div>
                                                                    <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                                    <div style={{height: "105px"}}></div>
                                                                </>
                                                            }
                                                        </div>
                                                    }
                                                    {slot1Lv >= 3 && 
                                                        <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                                            {nftStake !== null && nftStake[2] !== undefined ?
                                                                <>
                                                                    <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center", color: "#fff"}}>{nftStake[2].Name}</div>
                                                                    <img src={nftStake[2].Image} width="200px" alt="Can not load metadata." />
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{nftStake[2].RewardPerBlock} cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStake[2].Reward).toFixed(4)} Pending $OS</div>
                                                                    {address !== null && slot1Addr !== null && slot1Addr !== undefined ?
                                                                        <>
                                                                            {address.toUpperCase() === slot1Addr.toUpperCase() ?
                                                                                <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                                    {nftStake !== null && nftStake[2] !== undefined &&
                                                                                        <>
                                                                                            <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNft(nftStake[2].Id, false)}>HARVEST</div>
                                                                                            <div className="button" onClick={() => unstakeNft(nftStake[2].Id, true)}>HARVEST & UNSTAKE</div>
                                                                                        </>
                                                                                    }
                                                                                </div> :
                                                                                <div style={{height: "105px"}}></div>
                                                                            }
                                                                        </> :
                                                                        <div style={{height: "105px"}}></div>
                                                                    }
                                                                </> :
                                                                <>
                                                                    <div style={{width: "200px", marginBottom: "15px", fontSize: "16px", color: "#fff"}}>Main Char SLOT3</div>
                                                                    <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                                    <div style={{height: "105px"}}></div>
                                                                </>
                                                            }
                                                        </div>
                                                    }
                                                    {slot1Lv >= 4 && 
                                                        <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                                            {nftStake !== null && nftStake[3] !== undefined ?
                                                                <>
                                                                    <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center", color: "#fff"}}>{nftStake[3].Name}</div>
                                                                    <img src={nftStake[3].Image} width="200px" alt="Can not load metadata." />
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{nftStake[3].RewardPerBlock} cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStake[3].Reward).toFixed(4)} Pending $OS</div>
                                                                    {address !== null && slot1Addr !== null && slot1Addr !== undefined ?
                                                                        <>
                                                                            {address.toUpperCase() === slot1Addr.toUpperCase() ?
                                                                                <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                                    {nftStake !== null && nftStake[3] !== undefined &&
                                                                                        <>
                                                                                            <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNft(nftStake[3].Id, false)}>HARVEST</div>
                                                                                            <div className="button" onClick={() => unstakeNft(nftStake[3].Id, true)}>HARVEST & UNSTAKE</div>
                                                                                        </>
                                                                                    }
                                                                                </div> :
                                                                                <div style={{height: "105px"}}></div>
                                                                            }
                                                                        </> :
                                                                        <div style={{height: "105px"}}></div>
                                                                    }
                                                                </> :
                                                                <>
                                                                    <div style={{width: "200px", marginBottom: "15px", fontSize: "16px", color: "#fff"}}>Main Char SLOT4</div>
                                                                    <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                                    <div style={{height: "105px"}}></div>
                                                                </>
                                                            }
                                                        </div>
                                                    }
                                                    {slot1Lv >= 5 && 
                                                        <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                                            {nftStake !== null && nftStake[4] !== undefined ?
                                                                <>
                                                                    <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center", color: "#fff"}}>{nftStake[4].Name}</div>
                                                                    <img src={nftStake[4].Image} width="200px" alt="Can not load metadata." />
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{nftStake[4].RewardPerBlock} cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStake[4].Reward).toFixed(4)} Pending $OS</div>
                                                                    {address !== null && slot1Addr !== null && slot1Addr !== undefined ?
                                                                        <>
                                                                            {address.toUpperCase() === slot1Addr.toUpperCase() ?
                                                                                <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                                    {nftStake !== null && nftStake[4] !== undefined &&
                                                                                        <>
                                                                                            <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNft(nftStake[4].Id, false)}>HARVEST</div>
                                                                                            <div className="button" onClick={() => unstakeNft(nftStake[4].Id, true)}>HARVEST & UNSTAKE</div>
                                                                                        </>
                                                                                    }
                                                                                </div> :
                                                                                <div style={{height: "105px"}}></div>
                                                                            }
                                                                        </> :
                                                                        <div style={{height: "105px"}}></div>
                                                                    }
                                                                </> :
                                                                <>
                                                                    <div style={{width: "200px", marginBottom: "15px", fontSize: "16px", color: "#fff"}}>Main Char SLOT5</div>
                                                                    <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                                    <div style={{height: "105px"}}></div>
                                                                </>
                                                            }
                                                        </div>
                                                    }
                                                    {slot1Lv >= 6 && 
                                                        <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                                            {nftStake !== null && nftStake[5] !== undefined ?
                                                                <>
                                                                    <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center", color: "#fff"}}>{nftStake[5].Name}</div>
                                                                    <img src={nftStake[5].Image} width="200px" alt="Can not load metadata." />
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{nftStake[5].RewardPerBlock} cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStake[5].Reward).toFixed(4)} Pending $OS</div>
                                                                    {address !== null && slot1Addr !== null && slot1Addr !== undefined ?
                                                                        <>
                                                                            {address.toUpperCase() === slot1Addr.toUpperCase() ?
                                                                                <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                                    {nftStake !== null && nftStake[5] !== undefined &&
                                                                                        <>
                                                                                            <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNft(nftStake[5].Id, false)}>HARVEST</div>
                                                                                            <div className="button" onClick={() => unstakeNft(nftStake[5].Id, true)}>HARVEST & UNSTAKE</div>
                                                                                        </>
                                                                                    }
                                                                                </div> :
                                                                                <div style={{height: "105px"}}></div>
                                                                            }
                                                                        </> :
                                                                        <div style={{height: "105px"}}></div>
                                                                    }
                                                                </> :
                                                                <>
                                                                    <div style={{width: "200px", marginBottom: "15px", fontSize: "16px", color: "#fff"}}>Main Char SLOT6</div>
                                                                    <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                                    <div style={{height: "105px"}}></div>
                                                                </>
                                                            }
                                                        </div>
                                                    }
                                                    {slot1Lv >= 7 && 
                                                        <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                                            {nftStake !== null && nftStake[6] !== undefined ?
                                                                <>
                                                                    <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center", color: "#fff"}}>{nftStake[6].Name}</div>
                                                                    <img src={nftStake[6].Image} width="200px" alt="Can not load metadata." />
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{nftStake[6].RewardPerBlock} cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStake[6].Reward).toFixed(4)} Pending $OS</div>
                                                                    {address !== null && slot1Addr !== null && slot1Addr !== undefined ?
                                                                        <>
                                                                            {address.toUpperCase() === slot1Addr.toUpperCase() ?
                                                                                <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                                    {nftStake !== null && nftStake[6] !== undefined &&
                                                                                        <>
                                                                                            <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNft(nftStake[6].Id, false)}>HARVEST</div>
                                                                                            <div className="button" onClick={() => unstakeNft(nftStake[6].Id, true)}>HARVEST & UNSTAKE</div>
                                                                                        </>
                                                                                    }
                                                                                </div> :
                                                                                <div style={{height: "105px"}}></div>
                                                                            }
                                                                        </> :
                                                                        <div style={{height: "105px"}}></div>
                                                                    }
                                                                </> :
                                                                <>
                                                                    <div style={{width: "200px", marginBottom: "15px", fontSize: "16px", color: "#fff"}}>Main Char SLOT7</div>
                                                                    <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                                    <div style={{height: "105px"}}></div>
                                                                </>
                                                            }
                                                        </div>
                                                    }
                                                    {slot1Lv >= 8 && 
                                                        <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                                            {nftStake !== null && nftStake[7] !== undefined ?
                                                                <>
                                                                    <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center", color: "#fff"}}>{nftStake[7].Name}</div>
                                                                    <img src={nftStake[7].Image} width="200px" alt="Can not load metadata." />
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{nftStake[7].RewardPerBlock} cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStake[7].Reward).toFixed(4)} Pending $OS</div>
                                                                    {address !== null && slot1Addr !== null && slot1Addr !== undefined ?
                                                                        <>
                                                                            {address.toUpperCase() === slot1Addr.toUpperCase() ?
                                                                                <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                                    {nftStake !== null && nftStake[7] !== undefined &&
                                                                                        <>
                                                                                            <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNft(nftStake[7].Id, false)}>HARVEST</div>
                                                                                            <div className="button" onClick={() => unstakeNft(nftStake[7].Id, true)}>HARVEST & UNSTAKE</div>
                                                                                        </>
                                                                                    }
                                                                                </div> :
                                                                                <div style={{height: "105px"}}></div>
                                                                            }
                                                                        </> :
                                                                        <div style={{height: "105px"}}></div>
                                                                    }
                                                                </> :
                                                                <>
                                                                    <div style={{width: "200px", marginBottom: "15px", fontSize: "16px", color: "#fff"}}>Main Char SLOT8</div>
                                                                    <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                                    <div style={{height: "105px"}}></div>
                                                                </>
                                                            }
                                                        </div>
                                                    }
                                                    {slot1Lv >= 9 && 
                                                        <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                                            {nftStake !== null && nftStake[8] !== undefined ?
                                                                <>
                                                                    <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center", color: "#fff"}}>{nftStake[8].Name}</div>
                                                                    <img src={nftStake[8].Image} width="200px" alt="Can not load metadata." />
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{nftStake[8].RewardPerBlock} cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStake[8].Reward).toFixed(4)} Pending $OS</div>
                                                                    {address !== null && slot1Addr !== null && slot1Addr !== undefined ?
                                                                        <>
                                                                            {address.toUpperCase() === slot1Addr.toUpperCase() ?
                                                                                <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                                    {nftStake !== null && nftStake[8] !== undefined &&
                                                                                        <>
                                                                                            <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNft(nftStake[8].Id, false)}>HARVEST</div>
                                                                                            <div className="button" onClick={() => unstakeNft(nftStake[8].Id, true)}>HARVEST & UNSTAKE</div>
                                                                                        </>
                                                                                    }
                                                                                </div> :
                                                                                <div style={{height: "105px"}}></div>
                                                                            }
                                                                        </> :
                                                                        <div style={{height: "105px"}}></div>
                                                                    }
                                                                </> :
                                                                <>
                                                                    <div style={{width: "200px", marginBottom: "15px", fontSize: "16px", color: "#fff"}}>Main Char SLOT9</div>
                                                                    <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                                    <div style={{height: "105px"}}></div>
                                                                </>
                                                            }
                                                        </div>
                                                    }
                                                    {slot1Lv >= 10 && 
                                                        <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                                            {nftStake !== null && nftStake[9] !== undefined ?
                                                                <>
                                                                    <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center", color: "#fff"}}>{nftStake[9].Name}</div>
                                                                    <img src={nftStake[9].Image} width="200px" alt="Can not load metadata." />
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{nftStake[9].RewardPerBlock} cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStake[9].Reward).toFixed(4)} Pending $OS</div>
                                                                    {address !== null && slot1Addr !== null && slot1Addr !== undefined ?
                                                                        <>
                                                                            {address.toUpperCase() === slot1Addr.toUpperCase() ?
                                                                                <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                                    {nftStake !== null && nftStake[9] !== undefined &&
                                                                                        <>
                                                                                            <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNft(nftStake[9].Id, false)}>HARVEST</div>
                                                                                            <div className="button" onClick={() => unstakeNft(nftStake[9].Id, true)}>HARVEST & UNSTAKE</div>
                                                                                        </>
                                                                                    }
                                                                                </div> :
                                                                                <div style={{height: "105px"}}></div>
                                                                            }
                                                                        </> :
                                                                        <div style={{height: "105px"}}></div>
                                                                    }
                                                                </> :
                                                                <>
                                                                    <div style={{width: "200px", marginBottom: "15px", fontSize: "16px", color: "#fff"}}>Main Char SLOT10</div>
                                                                    <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                                    <div style={{height: "105px"}}></div>
                                                                </>
                                                            }
                                                        </div>
                                                    }
                                                </> :
                                                <div style={{width: "100%", height: "300px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                                    <ThreeDots fill="#5f6476" />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div style={{background: "transparent", padding: "30px", maxWidth: "95%", width: "1000px", height: "fit-content", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                                        <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", width: "350px", height: "500px", display: "flex", flexFlow: "column wrap", justifyContent: "space-around", padding: "50px", border: "none", marginRight: "20px"}} className='nftCard'>
                                            <div style={{width: "320px", textAlign: "left", fontSize: "18px", color: "#fff"}} className="bold" onClick={() => setMode(0)}>{slot1Owner}'s weapon depot Lv.{wdLv}</div>
                                            <div style={{width: "320px"}}>
                                                {true && <img src="https://gateway.commudao.xyz/ipfs/QmcabCcVqCQhcXk19LFueSRDc62Z67aqfArTTWVb8shr7c" style={{filter: "grayscale(1)"}} height="200" alt="WEAPONDEPOT.LV.1" />}
                                            </div>
                                            {llAddr !== null && address !== null && (String(llAddr).toUpperCase() === address.toUpperCase() || String(slot1Addr).toUpperCase() === address.toUpperCase()) &&
                                                <div style={{width: "320px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                    <div>
                                                        <div style={{fontSize: "12px"}} className="bold">BUILDING COSTS</div>
                                                        <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "20px", flexWrap: "wrap"}} className="bold">
                                                            <div style={{display: "flex", flexDirection: "row"}}>
                                                                <img src="https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="30px" alt="$WOOD"/>
                                                                <div style={{margin: "0 30px 0 10px"}}>
                                                                    {wdLv === 0 && '100M'}
                                                                    {wdLv === 1 && 'TBD'}
                                                                </div>
                                                            </div>
                                                            <div style={{display: "flex", flexDirection: "row"}}>
                                                                <img src="https://gateway.commudao.xyz/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" height="30px" alt="$CU"/>
                                                                <div style={{marginLeft: "10px"}}>
                                                                    {wdLv === 0 && '500,000'}
                                                                    {wdLv === 1 && 'TBD'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div style={{marginTop: "20px",fontSize: "12px"}} className="bold">REQUIREMENT</div>
                                                        <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "20px", flexWrap: "wrap"}} className="bold">
                                                            House LV.6
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {wdLv !== 0 &&
                                                            <div 
                                                                style={{/*background: "rgb(0, 227, 180)", */display: "flex", justifyContent: "center", width: "140px", borderRadius: "12px", padding: "12px 20px", marginTop: "20px", color: "rgb(0, 26, 44)", background: "gray", cursor: "not-allowed"}}
                                                                className="bold button" 
                                                            >
                                                                UPGRADE
                                                            </div>
                                                        }                            
                                                        {(slot1Lv >= 6 && wdLv === 0) &&
                                                            <div 
                                                                style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "140px", borderRadius: "12px", padding: "12px 20px", marginTop: "20px", color: "rgb(0, 26, 44)"}}
                                                                className="bold button" 
                                                                onClick={() => upgradeWeaponDepotHandle(1)}
                                                            >
                                                                CONSTRUCT
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", width: "370px", height: "360px", margin: "20px 0 40px 0", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "1px solid", boxShadow: "inset -2px -2px 0px 0.25px #00000040"}}>
                                            <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                                <div style={{fontSize: "22px", lineHeight: "15px"}}>COLLECT TO EARN</div>
                                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}} className="emp">
                                                    {nftStakeWD[0] !== null ?
                                                        <>
                                                            <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                            <div>On Staking</div>
                                                        </> :
                                                        <>
                                                            <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                            <div>Available for stake</div>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>TOTAL CMPOW PER SEC: <div>{Number(allPowWD) * Number(wdBonus)} [land multiplier x{Number(wdBonus)}]</div></div>
                                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                                OVERSOUL PENDING
                                                <div style={{display: "flex", flexDirection: "row", color: "#ff007a"}}>
                                                    <img src="https://gateway.commudao.xyz/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="20" alt="$OS"/>
                                                    <div style={{marginLeft: "5px"}}>{String(Number(allPendingRewardWD) * Number(wdBonus)).toLocaleString()}</div>
                                                </div>
                                            </div>
                                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                                AVAILABLE OS IN POOL
                                                <div style={{display: "flex", flexDirection: "row"}}>
                                                    <img src="https://gateway.commudao.xyz/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="20" alt="$OS"/>
                                                    <div style={{marginLeft: "5px"}}>{Number(osPoolWD).toFixed(3).toLocaleString()}</div>
                                                </div>
                                            </div>
                                            <div style={{height: "41px"}}></div>
                                        </div>
                                        <div className='slotbox noscroll'>
                                            {nft.length > 0 ?
                                                <>
                                                    {wdLv >= 1 &&
                                                        <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                                            {nftStakeWD[0] !== null ?
                                                                <>
                                                                    <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center", color: "#fff"}}>{nftStakeWD[0].Name}</div>
                                                                    <img src={nftStakeWD[0].Image} width="200px" alt="Can not load metadata." />
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStakeWD[0].RewardPerBlock) * Number(wdBonus)} cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(Number(nftStakeWD[0].Reward) * Number(wdBonus)).toFixed(4)} Pending $OS</div>
                                                                    {address !== null && slot1Addr !== null && slot1Addr !== undefined ?
                                                                        <>
                                                                            {address.toUpperCase() === slot1Addr.toUpperCase() ?
                                                                                <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                                    {nftStakeWD !== null && nftStakeWD[0] !== undefined &&
                                                                                        <>
                                                                                            <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNftWD(nftStakeWD[0].Id, false)}>HARVEST</div>
                                                                                            <div className="button" onClick={() => unstakeNftWD(nftStakeWD[0].Id, true)}>HARVEST & UNSTAKE</div>
                                                                                        </>
                                                                                    }
                                                                                </div> :
                                                                                <div style={{height: "105px"}}></div>
                                                                            }
                                                                        </> :
                                                                        <div style={{height: "105px"}}></div>
                                                                    }
                                                                </> :
                                                                <>
                                                                    <div style={{width: "200px", marginBottom: "15px", fontSize: "16px", color: "#fff"}}>Weapon SLOT1</div>
                                                                    <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                                    <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                                    <div style={{height: "105px"}}></div>
                                                                </>
                                                            }
                                                        </div>
                                                    }
                                                </> :
                                                <div style={{width: "100%", height: "300px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                                    <ThreeDots fill="#5f6476" />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div style={{background: "transparent", padding: "30px", maxWidth: "95%", width: "1000px", height: "fit-content", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                                        <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", width: "350px", height: "500px", display: "flex", flexFlow: "column wrap", justifyContent: "space-around", padding: "50px", border: "none", marginRight: "20px"}} className='nftCard'>
                                            <div style={{width: "320px", textAlign: "left", fontSize: "18px", color: "#fff"}} className="bold" onClick={() => setMode(0)}>{slot1Owner}'s transport hub Lv.{thubLv}</div>
                                            <div style={{width: "320px"}}>
                                                {thubLv === 0 && <img src="https://gateway.commudao.xyz/ipfs/QmZMqFMzQwMcSBs7i8eemVRA2TgQ92L3Zh4xgfemAX1SFH" style={{filter: "grayscale(1)"}} height="200" alt="TRANSPORTHUB.LV.1" />}
                                                {thubLv >= 1 && <img src="https://gateway.commudao.xyz/ipfs/QmZMqFMzQwMcSBs7i8eemVRA2TgQ92L3Zh4xgfemAX1SFH" height="200" alt="TRANSPORTHUB.LV.1" />}
                                            </div>
                                            {llAddr !== null && address !== null && (String(llAddr).toUpperCase() === address.toUpperCase() || String(slot1Addr).toUpperCase() === address.toUpperCase()) &&
                                                <div style={{width: "320px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                    <div>
                                                        <div style={{fontSize: "12px"}} className="bold">BUILDING COSTS</div>
                                                        <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "20px", flexWrap: "wrap"}} className="bold">
                                                            <div style={{display: "flex", flexDirection: "row"}}>
                                                                <img src="https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="30px" alt="$WOOD"/>
                                                                <div style={{margin: "0 30px 0 10px"}}>
                                                                    {thubLv === 0 && '3,200M'}
                                                                    {thubLv === 1 && 'TBD'}
                                                                </div>
                                                            </div>
                                                            <div style={{display: "flex", flexDirection: "row"}}>
                                                                <img src="https://gateway.commudao.xyz/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" height="30px" alt="$CU"/>
                                                                <div style={{marginLeft: "10px"}}>
                                                                    {thubLv === 0 && '1.6M'}
                                                                    {thubLv === 1 && 'TBD'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div style={{marginTop: "20px",fontSize: "12px"}} className="bold">REQUIREMENT</div>
                                                        <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "20px", flexWrap: "wrap"}} className="bold">
                                                            House LV.1
                                                        </div>
                                                    </div>
                                                    <div>   
                                                        {thubLv !== 0 &&
                                                            <div 
                                                                style={{/*background: "rgb(0, 227, 180)", */display: "flex", justifyContent: "center", width: "140px", borderRadius: "12px", padding: "12px 20px", marginTop: "20px", color: "rgb(0, 26, 44)", background: "gray", cursor: "not-allowed"}}
                                                                className="bold button" 
                                                            >
                                                                UPGRADE
                                                            </div>
                                                        }                                     
                                                        {(slot1Lv >= 1 && thubLv === 0) &&
                                                            <div 
                                                                style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "140px", borderRadius: "12px", padding: "12px 20px", marginTop: "20px", color: "rgb(0, 26, 44)"}}
                                                                className="bold button" 
                                                                onClick={() => upgradeTHubHandle(1)}
                                                            >
                                                                CONSTRUCT
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {address !== null && slot1Addr !== null && slot1Addr !== undefined &&
                                    <>
                                        {address.toUpperCase() === slot1Addr.toUpperCase() &&
                                            <>
                                                {nft.length > 0 || nftStake > 0 ?
                                                    <div style={{maxWidth: "100%", width: "1650px", marginBottom: "80px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                                        {nft[0] !== null ?
                                                            <>
                                                                {nft.map((item, index) => (
                                                                    <div key={index}>
                                                                        {((String(item.Id).slice(0, 1) === "1" && String(item.Id).length !== 13) || String(item.Id).slice(0, 1) === "7") &&
                                                                            <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "space-around", padding: "20px", margin: "10px"}} className="nftCard">
                                                                                <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                                                                    <img src={item.Image} height="100%" alt="Can not load metadata." />
                                                                                </div>
                                                                                <div className="emp bold">{item.Name}</div>
                                                                                <div className="bold">{item.RewardPerSec} cmpow/block</div>
                                                                                <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                                                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                                                                    <div 
                                                                                        style={{alignSelf: "center"}}
                                                                                        className="pixel button"
                                                                                        onClick={() => {
                                                                                            if (String(item.Id).slice(0, 1) === "1") {
                                                                                                stakeNft(item.Id)
                                                                                            } else if (String(item.Id).slice(0, 1) === "7") {
                                                                                                stakeNftWD(item.Id)
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        STAKE ON {String(item.Id).slice(0, 1) === "1" && 'HOUSE'}{String(item.Id).slice(0, 1) === "7" && 'WEAPON DEPOT'}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                ))}
                                                            </> :
                                                            <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center", padding: "20px", margin: "10px"}} className="nftCard">
                                                                {address !== null ?
                                                                    <>
                                                                        <img src="https://l3img.b-cdn.net/ipfs/QmUmf3MEZg99qqLJ6GsewESVum8sm72gfH3wyiVPZGH6HA" width="150" alt="No_NFTs" />
                                                                        <div style={{marginTop: "30px"}} className="bold">This wallet doesn't have NFTs.</div>
                                                                    </> :
                                                                    <>
                                                                        <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                                                        <div className="bold">Please connect wallet to view your NFTs.</div>
                                                                    </>
                                                                }
                                                            </div>
                                                        }
                                                        {nftStake[0] !== null &&
                                                            <>
                                                                {nftStake.map((item, index) => (
                                                                    <div key={index}>
                                                                        <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "space-around", padding: "20px", margin: "10px"}} className="nftCard">
                                                                            <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                                                                <img src={item.Image} height="100%" alt="Can not load metadata." />
                                                                            </div>
                                                                            <div className="emp bold">{item.Name}</div>
                                                                            <div className="bold">{item.RewardPerBlock} cmpow/block</div>
                                                                            <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                                                            <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                                                                <div 
                                                                                    style={{alignSelf: "center", background: "gray"}}
                                                                                    className="pixel button"
                                                                                    onClick={() => unstakeNft(item.Id, true)}
                                                                                >
                                                                                    UNSTAKE ON {String(item.Id).slice(0, 1) === "1" && 'HOUSE'}{String(item.Id).slice(0, 1) === "7" && 'WEAPON DEPOT'}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </>
                                                        }
                                                        {nftStakeWD[0] !== null &&
                                                            <>
                                                                {nftStakeWD.map((item, index) => (
                                                                    <div key={index}>
                                                                        <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "space-around", padding: "20px", margin: "10px"}} className="nftCard">
                                                                            <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                                                                <img src={item.Image} height="100%" alt="Can not load metadata." />
                                                                            </div>
                                                                            <div className="emp bold">{item.Name}</div>
                                                                            <div className="bold">{Number(item.RewardPerBlock) * Number(wdBonus)} cmpow/block [land multiplier x{Number(wdBonus)}]</div>
                                                                            <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                                                            <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                                                                <div 
                                                                                    style={{alignSelf: "center", background: "gray"}}
                                                                                    className="pixel button"
                                                                                    onClick={() => unstakeNftWD(item.Id, true)}
                                                                                >
                                                                                    UNSTAKE ON {String(item.Id).slice(0, 1) === "1" && 'HOUSE'}{String(item.Id).slice(0, 1) === "7" && 'WEAPON DEPOT'}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </>
                                                        }
                                                    </div> :
                                                    <div style={{width: "1640px", marginBottom: "80px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"}}> 
                                                        <div className="nftCard" style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center"}}>
                                                            <ThreeDots fill="#fff" />
                                                            <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default CmCityLand
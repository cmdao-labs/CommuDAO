import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const taodumNFT = '0x2036186F6d5287FcB05C56C38374AC5236d8A61d'
const taomeme = '0xdbCCc9F8920e7274eeC62e695084D3bCe443c3dd'
const gear = '0x0E2610730A3c42fd721B289BEe092D9AD1C76890'
const taoPFP = '0xB39336b9491547405341eEB8863B020A1302Dd69'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const MechHarvestZone = ({ setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc20ABI, erc721ABI, gearFieldABI, taoPfpABI }) => {
    const { address } = useAccount()

    const [isTransferModal, setIsTransferModal] = React.useState(false)
    const [transferNftid, setTransferNftid] = React.useState(null)
    const [transferName, setTransferName] = React.useState("")
    const [transferTo, setTransferTo] = React.useState("")

    const [nft, setNft] = React.useState([])
    const [allDaily, setAllDaily] = React.useState("0.000")
    const [allReward, setAllReward] = React.useState("0.000")
    const [gearBalance, setGearBalance] = React.useState("0.000")

    const [tmBalance, setTmBalance] = React.useState("0.000")
    const [tmStakedBalance, setTmStakedBalance] = React.useState("0.000")
    const [inputTM, setInputTM] = React.useState('')

    const [gearTokenPending, setGearTokenPending] = React.useState("0.000")

    const [pfpLevel, setPfpLevel] = React.useState(0)

    const transferToHandle = (event) => { setTransferTo(event.target.value) }
    const transferNFT = (_nftid) => {
        setIsTransferModal(true)
        setTransferNftid(_nftid)
        for (let i = 0; i <= nft.length - 1; i++) {
            if (nft[i].Id === Number(_nftid)) {
                setTransferName(nft[i].Name)
            }
        }
    }
    const transferNFTConfirm = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: taodumNFT,
                abi: erc721ABI,
                functionName: 'transferFrom',
                args: [address, transferTo, transferNftid],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        const taodumNFTSC = new ethers.Contract(taodumNFT, erc721ABI, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            let nfts = []
            const stakeFilter = await taodumNFTSC.filters.Transfer(address, gear, null)
            const stakeEvent = await taodumNFTSC.queryFilter(stakeFilter, 2260250, "latest")
            const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
            const stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            const data0 = address !== null && address !== undefined ? await readContracts({
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: gear,
                        abi: gearFieldABI,
                        functionName: 'nftStake',
                        args: [String(item)],
                    }
                ))
            }) : [Array(stakeRemoveDup.length).fill({tokenOwnerOf: ''})]

            let yournftstake = []
            for (let i = 0; i <= stakeRemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data0[i].result[0].toUpperCase() === address.toUpperCase()) {
                    yournftstake.push({Id: String(stakeRemoveDup[i])})
                }
            }

            const data1 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftstake.map((item) => (
                    {
                        address: taodumNFT,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftstake.length).fill('')]

            const data11 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftstake.map((item) => (
                    {
                        address: gear,
                        abi: gearFieldABI,
                        functionName: 'calculateRewards',
                        args: [String(item.Id), address, 1],
                    }
                ))
            }) : [Array(yournftstake.length).fill(0)]

            let _allDaily = 0
            let _allReward = 0
            for (let i = 0; i <= yournftstake.length - 1; i++) {
                const nftipfs = data1[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs)
                    nft = await response.json()
                } catch {}

                let _reward = 0
                if (Number(Number(yournftstake[i].Id) / 1e5).toFixed(0) >= 271) {
                    _reward = 100;
                } else if (Number(Number(yournftstake[i].Id) / 1e5).toFixed(0) >= 146) {
                    _reward = 120;
                } else if (Number(Number(yournftstake[i].Id) / 1e5).toFixed(0) >= 77) {
                    _reward = 150;
                } else if (Number(Number(yournftstake[i].Id) / 1e5).toFixed(0) >= 23) {
                    _reward = 180;
                } else {
                    _reward = 250;
                }

                _allDaily += Number(ethers.utils.formatEther(String(ethers.BigNumber.from(_reward).mul(ethers.BigNumber.from(372756008454)).mul(ethers.BigNumber.from(86400000000)))))
                _allReward += Number(ethers.utils.formatEther(String(data11[i].result)))

                nfts.push({
                    Id: yournftstake[i].Id,
                    Name: nft.name + " [" + yournftstake[i].Id + "]",
                    Image: nft.image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(ethers.utils.formatEther(String(ethers.BigNumber.from(_reward).mul(ethers.BigNumber.from(372756008454)).mul(ethers.BigNumber.from(86400000000))))),
                    isStaked: true,
                    Reward: String(data11[i].result),
                })
            }

            const walletFilter = await taodumNFTSC.filters.Transfer(null, address, null)
            const walletEvent = await taodumNFTSC.queryFilter(walletFilter, 2725554, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: taodumNFT,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                    }
                ))
            }) : [Array(walletRemoveDup.length).fill('')]

            let yournftwallet = []
            for (let i = 0; i <= walletRemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data2[i].result.toUpperCase() === address.toUpperCase()) {
                    yournftwallet.push({Id: String(walletRemoveDup[i])})
                }
            }

            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet.map((item) => (
                    {
                        address: taodumNFT,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet.length).fill('')]

            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data3[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs)
                    nft = await response.json()
                } catch {}

                let _reward = 0
                if (Number(Number(yournftwallet[i].Id) / 1e5).toFixed(0) >= 271) {
                    _reward = 100;
                } else if (Number(Number(yournftwallet[i].Id) / 1e5).toFixed(0) >= 146) {
                    _reward = 120;
                } else if (Number(Number(yournftwallet[i].Id) / 1e5).toFixed(0) >= 77) {
                    _reward = 150;
                } else if (Number(Number(yournftwallet[i].Id) / 1e5).toFixed(0) >= 23) {
                    _reward = 180;
                } else {
                    _reward = 250;
                }

                nfts.push({
                    Id: yournftwallet[i].Id,
                    Name: nft.name + " [" + yournftwallet[i].Id + "]",
                    Image: nft.image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(ethers.utils.formatEther(String(ethers.BigNumber.from(_reward).mul(ethers.BigNumber.from(372756008454)).mul(ethers.BigNumber.from(86400000000))))),
                    isStaked: false,
                    Reward: 0,
                })
            }

            if (nfts.length === 0) { nfts.push(null) }

            const dataToken = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: gear,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: taomeme,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: gear,
                        abi: gearFieldABI,
                        functionName: 'tokenStake',
                        args: [address],
                    },
                    {
                        address: gear,
                        abi: gearFieldABI,
                        functionName: 'calculateRewards',
                        args: [0, address, false],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 1],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 2],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 3],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 4],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 5],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 6],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 7],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 8],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 9],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 10],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 11],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 12],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 13],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 14],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 15],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 16],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 17],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 18],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 19],
                    },
                    {
                        address: taoPFP,
                        abi: taoPfpABI,
                        functionName: 'user',
                        args: [address, 20],
                    },
                ],
            }) : [0, 0, 0, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, ]

            const vaBal = dataToken[0].result
            const tmBal = dataToken[1].result
            const tmStakeBal = dataToken[2].result[0]
            const gearTokenPend = dataToken[3].status === 'success' ? dataToken[3].result : 0

            let PFPlv = 0
            if (dataToken[23].result) {
                PFPlv = 20
            } else if (dataToken[22].result) {
                PFPlv = 19
            } else if (dataToken[21].result) {
                PFPlv = 18
            } else if (dataToken[20].result) {
                PFPlv = 17
            } else if (dataToken[19].result) {
                PFPlv = 16
            } else if (dataToken[18].result) {
                PFPlv = 15
            } else if (dataToken[17].result) {
                PFPlv = 14
            } else if (dataToken[16].result) {
                PFPlv = 13
            } else if (dataToken[15].result) {
                PFPlv = 12
            } else if (dataToken[14].result) {
                PFPlv = 11
            } else if (dataToken[13].result) {
                PFPlv = 10
            } else if (dataToken[12].result) {
                PFPlv = 9
            } else if (dataToken[11].result) {
                PFPlv = 8
            } else if (dataToken[10].result) {
                PFPlv = 7
            } else if (dataToken[9].result) {
                PFPlv = 6
            } else if (dataToken[8].result) {
                PFPlv = 5
            } else if (dataToken[7].result) {
                PFPlv = 4
            } else if (dataToken[6].result) {
                PFPlv = 3
            } else if (dataToken[5].result) {
                PFPlv = 2
            } else if (dataToken[4].result) {
                PFPlv = 1
            }

            let _reward2 = 0
            if (Number(ethers.utils.formatEther(String(tmStakeBal))) > 0 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 800000) {
                _reward2 = 15
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 800000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 900000) {
                _reward2 = 85
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 900000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 1000000) {
                _reward2 = 95
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 1000000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 1200000) {
                _reward2 = 100
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 1200000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 1300000) {
                _reward2 = 105
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 1300000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 1400000) {
                _reward2 = 110
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 1400000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 1500000) {
                _reward2 = 115
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 1500000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 2000000) {
                _reward2 = 120
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 2000000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 2100000) {
                _reward2 = 125
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 2100000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 2200000) {
                _reward2 = 130
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 2200000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 2300000) {
                _reward2 = 135
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 2300000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 3000000) {
                _reward2 = 150
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 3000000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 3100000) {
                _reward2 = 155
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 3100000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 3200000) {
                _reward2 = 160
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 3200000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 3300000) {
                _reward2 = 165
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 3300000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 5000000) {
                _reward2 = 180
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 5000000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 5100000) {
                _reward2 = 185
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 5100000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 5200000) {
                _reward2 = 190
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 5200000 && Number(ethers.utils.formatEther(String(tmStakeBal))) < 5300000) {
                _reward2 = 195
            } else if (Number(ethers.utils.formatEther(String(tmStakeBal))) >= 5300000) {
                _reward2 = 250
            }

            _allDaily += Number(ethers.utils.formatEther(String(ethers.BigNumber.from(_reward2).mul(ethers.BigNumber.from(23148100000)).mul(ethers.BigNumber.from(86400))))) * Number(ethers.utils.formatEther(String(tmStakeBal)))
            _allReward += Number(ethers.utils.formatEther(String(gearTokenPend)))

            return [nfts, _allDaily, _allReward, vaBal, tmBal, tmStakeBal, gearTokenPend, PFPlv, ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            result[0].length > 0 && address !== undefined ? setNft(result[0]) : setNft([null])
            setAllDaily(result[1])
            setAllReward(result[2])
            setGearBalance(ethers.utils.formatEther(String(result[3])))
            setTmBalance(ethers.utils.formatEther(String(result[4])))
            setTmStakedBalance(ethers.utils.formatEther(String(result[5])))
            setGearTokenPending(ethers.utils.formatEther(String(result[6])))
            setPfpLevel(result[7])
        })

    }, [address, txupdate, erc20ABI, erc721ABI, gearFieldABI, taoPfpABI])

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract({
                address: taodumNFT,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== gear.toUpperCase()) {
                const config = await prepareWriteContract({
                    address: taodumNFT,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [gear, _nftid],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }        
            const config2 = await prepareWriteContract({
                address: gear,
                abi: gearFieldABI,
                functionName: 'stake',
                args: [_nftid, 1],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }
    
    const unstakeNft = async (_nftid, _unstake) => {
        setisLoading(true)
        try {
            const config2 = await prepareWriteContract({
                address: gear,
                abi: gearFieldABI,
                functionName: 'unstake',
                args: [_nftid, 1, _unstake],
            })
            const { hash: hash12 } = await writeContract(config2)
            await waitForTransaction({ hash: hash12 })
            setTxupdate(hash12)
        } catch {}
        setisLoading(false)
    }

    const staketoken = async () => {
        setisLoading(true)
        try {
            if (tmStakedBalance > 0) {
                const config0 = await prepareWriteContract({
                    address: gear,
                    abi: gearFieldABI,
                    functionName: 'unstake',
                    args: [0, 0, 0],
                })
                const { hash: hash10 } = await writeContract(config0)
                await waitForTransaction({ hash: hash10 })
            }
            const allowed = await readContract({
                address: taomeme,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, gear],
            })
            if (Number(ethers.utils.parseEther(String(inputTM))) > Number(allowed)) {
                const config = await prepareWriteContract({
                    address: taomeme,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [gear, ethers.constants.MaxUint256],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: gear,
                abi: gearFieldABI,
                functionName: 'stake',
                args: [ethers.utils.parseEther(String(inputTM)), 0],
                gas: 1000000,
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }
    const unstaketoken = async (_unstake) => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: gear,
                abi: gearFieldABI,
                functionName: 'unstake',
                args: [0, 0, _unstake],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const mintPFP = async (_lv) => {
        setisLoading(true)
        try {
            const allowed = await readContract({
                address: taomeme,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, taoPFP],
            })
            if (Number(ethers.utils.parseEther(String(8888))) > Number(allowed)) {
                const config = await prepareWriteContract({
                    address: taomeme,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [taoPFP, ethers.constants.MaxUint256],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: taoPFP,
                abi: taoPfpABI,
                functionName: 'claimDrop',
                args: [_lv],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    return (
        <>
            {isTransferModal ?
                <div className="centermodal">
                    <div className="wrapper">
                        <div className="bold" style={{width: "500px", height: "250px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", fontSize: "40px", letterSpacing: "3px"}}>
                            <div style={{fontSize: "20px"}}>{transferName}</div>
                            <input style={{width: "80%", padding: "10px", fontSize: "20px"}} value={transferTo} onChange={transferToHandle} placeholder="Enter 0x..."></input>
                            <div className="button" style={{width: "50%"}} onClick={transferNFTConfirm}>TRANSFER</div>
                            <div className="button" style={{width: "50%", background: "gray"}} onClick={() => setIsTransferModal(false)}>CLOSE</div>
                        </div>
                    </div>
                </div> :
                <></>
            }
            <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left",  backgroundImage: "url('https://nftstorage.link/ipfs/bafybeidlzwhqtdrt4dnymhtf3v5vbhfwaczn6i3676iqr2aymrwbqbtw4m')", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}}>
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content", padding: "0 10px"}}>Mech Harvest Zone</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake TAODUM / TAOMEME to earn $Gear.</div>
                </div>
                <div style={{margin: "30px 100px"}}>
                    <img src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="150" alt="$GEAR"/>
                </div>
            </div>

            <div style={{margin: "0", paddingTop: "40px", minHeight: "fit-content", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "14px", flexFlow: "row wrap"}} className="collection pixel">
                <div style={{width: "95%", minHeight: "120px", height: "fit-content", margin: "10px", padding: "20px", fontSize: "14px", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}} className="nftCard">
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TAODUM ON WALLET</div>
                        <div style={{fontSize: "24px"}} className="emp">{nft.length > 0 && nft[0] !== null ? nft.length : 0}</div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TOTAL DAILY REWARD</div>
                        <div style={{fontSize: "24px", display: "flex"}} className="emp">
                            {Number(allDaily) > 0 ? Number(allDaily).toLocaleString('en-US', {maximumFractionDigits:3}) : 0}
                            <img style={{marginLeft: "10px"}} src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="26" alt="$GEAR"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                        <div style={{fontSize: "24px", display: "flex"}}>
                            {Number(allReward) > 0 ? Number(allReward).toLocaleString('en-US', {maximumFractionDigits:3}) : 0}
                            <img style={{marginLeft: "10px"}} src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="26" alt="$GEAR"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>GEAR BALANCE</div>
                        <div style={{fontSize: "24px", display: "flex"}}>
                            {Number(gearBalance) > 0 ? Number(gearBalance).toLocaleString('en-US', {maximumFractionDigits:3}) : 0}
                            <img style={{marginLeft: "10px"}} src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="26" alt="$GEAR"/>
                        </div>
                    </div>
                </div>

                <div style={{width: "95%", borderBottom: "1px solid #dddade", margin: "40px 10px 10px 10px"}}></div>
                <div style={{width: "95%", margin: "20px 10px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", textAlign: "left"}} className="bold">TAOMEME STAKING</div>
                <div style={{marginBottom: "80px", width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap"}}>
                    <div className="nftCard" style={{position: "relative", margin: "10px", padding: "30px 20px", justifyContent: "space-around", fontSize: "14px"}}>
                        <div style={{position: "absolute", top: 15, right: 15, padding: "7px 20px", letterSpacing: 1, background: "transparent", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="bold">
                            Multiplier&nbsp; 
                            {Number(tmStakedBalance) === 0 && 'x0.00'}
                            {tmStakedBalance > 0 && tmStakedBalance < 800000 && 'x0.15'}
                            {tmStakedBalance >= 800000 && tmStakedBalance < 900000 && 'x0.85'}
                            {tmStakedBalance >= 900000 && tmStakedBalance < 1000000 && 'x0.95'}
                            {tmStakedBalance >= 1000000 && tmStakedBalance < 1200000 && 'x1.00'}
                            {tmStakedBalance >= 1200000 && tmStakedBalance < 1300000 && 'x1.05'}
                            {tmStakedBalance >= 1300000 && tmStakedBalance < 1400000 && 'x1.10'}
                            {tmStakedBalance >= 1400000 && tmStakedBalance < 1500000 && 'x1.15'}
                            {tmStakedBalance >= 1500000 && tmStakedBalance < 2000000 && 'x1.20'}
                            {tmStakedBalance >= 2000000 && tmStakedBalance < 2100000 && 'x1.25'}
                            {tmStakedBalance >= 2100000 && tmStakedBalance < 2200000 && 'x1.30'}
                            {tmStakedBalance >= 2200000 && tmStakedBalance < 2300000 && 'x1.35'}
                            {tmStakedBalance >= 2300000 && tmStakedBalance < 3000000 && 'x1.50'}
                            {tmStakedBalance >= 3000000 && tmStakedBalance < 3100000 && 'x1.55'}
                            {tmStakedBalance >= 3100000 && tmStakedBalance < 3200000 && 'x1.60'}
                            {tmStakedBalance >= 3200000 && tmStakedBalance < 3300000 && 'x1.65'}
                            {tmStakedBalance >= 3300000 && tmStakedBalance < 5000000 && 'x1.80'}
                            {tmStakedBalance >= 5000000 && tmStakedBalance < 5100000 && 'x1.85'}
                            {tmStakedBalance >= 5100000 && tmStakedBalance < 5200000 && 'x1.90'}
                            {tmStakedBalance >= 5200000 && tmStakedBalance < 5300000 && 'x1.95'}
                            {tmStakedBalance >= 5300000 && 'x2.50'}
                        </div>
                        <div style={{marginTop: "50px", width: "100%", display: "flex", justifyContent: "space-between"}}>
                            <div>Required JTAO for Next Level of Multiplier:</div>
                            <div className="bold">
                                {Number(tmStakedBalance) === 0 && '>0'}
                                {tmStakedBalance > 0 && tmStakedBalance < 800000 && '800,000'}
                                {tmStakedBalance >= 800000 && tmStakedBalance < 900000 && '900,000'}
                                {tmStakedBalance >= 900000 && tmStakedBalance < 1000000 && '1,000,000'}
                                {tmStakedBalance >= 1000000 && tmStakedBalance < 1200000 && '1,200,000'}
                                {tmStakedBalance >= 1200000 && tmStakedBalance < 1300000 && '1,300,000'}
                                {tmStakedBalance >= 1300000 && tmStakedBalance < 1400000 && '1,400,000'}
                                {tmStakedBalance >= 1400000 && tmStakedBalance < 1500000 && '1,500,000'}
                                {tmStakedBalance >= 1500000 && tmStakedBalance < 2000000 && '2,000,000'}
                                {tmStakedBalance >= 2000000 && tmStakedBalance < 2100000 && '2,100,000'}
                                {tmStakedBalance >= 2100000 && tmStakedBalance < 2200000 && '2,200,000'}
                                {tmStakedBalance >= 2200000 && tmStakedBalance < 2300000 && '2,300,000'}
                                {tmStakedBalance >= 2300000 && tmStakedBalance < 3000000 && '3,000,000'}
                                {tmStakedBalance >= 3000000 && tmStakedBalance < 3100000 && '3,100,000'}
                                {tmStakedBalance >= 3100000 && tmStakedBalance < 3200000 && '3,200,000'}
                                {tmStakedBalance >= 3200000 && tmStakedBalance < 3300000 && '3,300,000'}
                                {tmStakedBalance >= 3300000 && tmStakedBalance < 5000000 && '5,000,000'}
                                {tmStakedBalance >= 5000000 && tmStakedBalance < 5100000 && '5,100,000'}
                                {tmStakedBalance >= 5100000 && tmStakedBalance < 5200000 && '5,200,000'}
                                {tmStakedBalance >= 5200000 && tmStakedBalance < 5300000 && '5,300,000'}
                                {tmStakedBalance >= 5300000 && 'MAX'}
                            </div>
                        </div>
                        <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                            <div style={{lineHeight: 1.5, fontSize: "14px", textAlign: "left"}}>
                                Pending Rewards<br></br>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <img src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="12" alt="$GEAR"/>
                                    &nbsp;{Number(gearTokenPending).toLocaleString('en-US', {minimumFractionDigits:0})}
                                </div>
                            </div>
                            {tmStakedBalance !== 0 ?
                                <div style={{lineHeight: 2}} className="button"  onClick={() => unstaketoken(false)}>HARVEST</div> :
                                <div style={{lineHeight: 2, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                            }
                        </div>
                        <div style={{width: "90%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", padding: "15px"}}>
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px", textAlign: "left", fontSize: "14px"}}>
                                <div>$JTAO STAKED</div>
                                <div className="bold">{Number(tmStakedBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                            </div>
                            <div style={{width: "100%", display: "flex", justifyContent: "flex-end", marginBottom: "7.5px"}}>
                                <div style={{letterSpacing: "1px", width: "70px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => unstaketoken(true)}>Unstake</div>
                            </div>
                        </div>
                        <div style={{width: "90%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", padding: "15px"}}>
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px", textAlign: "left", fontSize: "14px"}}>
                                <div>$JTAO BALANCE</div>
                                <div className="bold" style={{cursor: "pointer"}} onClick={() => setInputTM(tmBalance)}>{Number(tmBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                            </div>
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                                <input
                                    placeholder="0.0"
                                    style={{width: "170px", padding: "5px 20px", border: "1px solid #dddade"}}
                                    value={inputTM}
                                    onChange={(event) => setInputTM(event.target.value)}
                                />
                                <div style={{letterSpacing: "1px", width: "50px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={staketoken}>Stake</div>
                            </div>
                        </div>
                    </div>
                    <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "space-around", fontSize: "18px"}}>
                        {pfpLevel === 0 &&
                            <>
                                <div>TAOMEME PFP</div>
                                <div style={{width: "250px", height: "250px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) > 0 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(1)}>UP RARITY & MINT N1 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 1 &&
                            <>
                                <div>TAOMEME PFP N1</div>
                                <img src='https://nftstorage.link/ipfs/bafybeibvvcappbfq4pw7hvtdwsaageoelga5vwpco3qffcrwzzsk2wxoau' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 800000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(2)}>UP RARITY & MINT N2 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 2 &&
                            <>
                                <div>TAOMEME PFP N2</div>
                                <img src='https://bafybeidqmml2tr67q6rp3sfkbc73lwrraljkex7sf3oandu2m4rpusem4m.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 900000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(3)}>UP RARITY & MINT N3 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 3 &&
                            <>
                                <div>TAOMEME PFP N3</div>
                                <img src='https://bafybeicchn4potn36niuoyhhphltmrljtddira3lwypgpszpzfvju3cpd4.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 1000000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(4)}>UP RARITY & MINT N4 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 4 &&
                            <>
                                <div>TAOMEME PFP N4</div>
                                <img src='https://bafybeiaho4pgra7fhociid6zjaavaouctanwf3lxq2ngzujxf4yc2d4yye.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 1200000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(5)}>UP RARITY & MINT R1 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 5 &&
                            <>
                                <div>TAOMEME PFP R1</div>
                                <img src='https://bafybeifyq72iygru2iml2hignbjbhn5ud4hsp2zhtfngmyupu754s7ia6y.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 1300000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(6)}>UP RARITY & MINT R2 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 6 &&
                            <>
                                <div>TAOMEME PFP R2</div>
                                <img src='https://bafybeicrsr44aadklhu4q4gyzwrtlqbu7vlhf7eyrjdjhyxsfofphh6aiy.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 1400000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(7)}>UP RARITY & MINT R3 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 7 &&
                            <>
                                <div>TAOMEME PFP R3</div>
                                <img src='https://bafybeihxvgzhliqnfhppoowu2m4mbb5s52stk52p6hdqawm5ygopxgbmya.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 1500000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(8)}>UP RARITY & MINT R4 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 8 &&
                            <>
                                <div>TAOMEME PFP R4</div>
                                <img src='https://bafybeiaghsurj4l7xankdrvrv2whhhy5xasejzusvemstkcloqqbnpovmu.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 2000000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(9)}>UP RARITY & MINT SR1 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 9 &&
                            <>
                                <div>TAOMEME PFP SR1</div>
                                <img src='https://bafybeicuitq5arbmqr5bf33cdrbupv5ojzjwb7jhrl2r4yooeeuoivveku.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 2100000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(10)}>UP RARITY & MINT SR2 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 10 &&
                            <>
                                <div>TAOMEME PFP SR2</div>
                                <img src='https://bafybeihgnsufjnh75b6iw5cj6xaj5ut6z56l3yjrmfua6ogjywit7le2uq.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 2200000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(11)}>UP RARITY & MINT SR3 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 11 &&
                            <>
                                <div>TAOMEME PFP SR3</div>
                                <img src='https://bafybeidzhdrsohkshimumcmwptuvk6fmow6gp3bzuaz44kyuktb5qurcia.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 2300000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(12)}>UP RARITY & MINT SR4 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 12 &&
                            <>
                                <div>TAOMEME PFP SR4</div>
                                <img src='https://bafybeiagcciesftrj2rkbwyci5m4yaurj6nbtmkfyzkviecarq7f77525q.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 3000000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(13)}>UP RARITY & MINT SSR1 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 13 &&
                            <>
                                <div>TAOMEME PFP SSR1</div>
                                <img src='https://bafybeihhbbdyizbpgnigvzo35asjf56ein5zr4goas2otx3mvmbfec2jzm.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 3100000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(14)}>UP RARITY & MINT SSR2 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 14 &&
                            <>
                                <div>TAOMEME PFP SSR2</div>
                                <img src='https://bafybeifvulnv2zpqnj4bck3svyjxrgxuo5szubtncg7f6efgm6rby2nqfm.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 3200000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(15)}>UP RARITY & MINT SSR3 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 15 &&
                            <>
                                <div>TAOMEME PFP SSR3</div>
                                <img src='https://bafybeicyfvc27ylis55sw7txg2lucthwvetrgeeydok722f7anxajobry4.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 3300000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(16)}>UP RARITY & MINT SSR4 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 16 &&
                            <>
                                <div>TAOMEME PFP SSR4</div>
                                <img src='https://bafybeiafjelnvhz7r3f72xml6jvri3pvhtffrfmyzj5jlq7x5kybxwqohm.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 5000000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(17)}>UP RARITY & MINT UR1 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 17 &&
                            <>
                                <div>TAOMEME PFP UR1</div>
                                <img src='https://bafybeiad3cagzwuu42ugdlhntmnh3kw3fnrpeahwmfn2avt5x2mnkbro4q.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 5100000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(18)}>UP RARITY & MINT UR2 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 18 &&
                            <>
                                <div>TAOMEME PFP UR2</div>
                                <img src='https://bafybeihyiqdlq23yzo4zgqbi3hpvb5iy7yjiezdk2omyonz4p7bkgg27h4.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 5200000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(19)}>UP RARITY & MINT UR3 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 19 &&
                            <>
                                <div>TAOMEME PFP UR3</div>
                                <img src='https://bafybeifttdfppv2cxwdrqve73ls6im7o4rh2utj6uxgvr6pl2w22fsfzti.ipfs.nftstorage.link' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    {Number(tmStakedBalance) >= 5300000 && <div className="button" style={{fontSize: "14px"}} onClick={() => mintPFP(20)}>UP RARITY & MINT UR4 [8,888 JTAO]</div>}
                                </div>
                            </>
                        }
                        {pfpLevel === 20 &&
                            <>
                                <div>TAOMEME PFP UR4</div>
                                <img src='https://nftstorage.link/ipfs/bafybeicrn3zs6lsv63d7voxzwcqayc6mfva6n56rq2kyh3bf6u4le7baem' width="250" alt="Can not load metadata." />
                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    <div className="button" style={{fontSize: "14px", cursor: "not-allowed"}}>MAX</div>
                                </div>
                            </>
                        }
                    </div>
                </div>

                <div style={{width: "95%", borderBottom: "1px solid #dddade", margin: "40px 10px 10px 10px"}}></div>
                <div style={{width: "95%", margin: "20px 10px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", textAlign: "left"}} className="bold">TAODUM STAKING</div>
                <div style={{marginBottom: "80px", width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap"}}>
                    {nft.length > 0 ?
                        <>
                        {nft[0] !== null ?
                            <>
                            {nft.map((item, index) => (
                                <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "space-around", fontSize: "14px"}} key={index}>
                                    <img src={item.Image} width="150" alt="Can not load metadata." />
                                    <div>{item.Name}</div>
                                    <div style={{width: 300, display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                        {item.isStaked ?
                                            <>
                                                <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                                <div style={{color: "black"}}>On Staking</div>
                                            </> :
                                            <>
                                                <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                                <div style={{color: "black"}}>Available for stake</div>
                                            </>
                                        }
                                    </div>
                                    <div>
                                        Earn: {Number(item.RewardPerSec).toLocaleString('en-US', {maximumFractionDigits:3})}
                                        &nbsp;
                                        <img src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="12" alt="$GEAR"/>
                                        &nbsp;GEAR/DAY
                                    </div>
                                    <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                        <div style={{lineHeight: 1.5, fontSize: "14px", textAlign: "left"}}>
                                            Pending Rewards<br></br>
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <img src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="12" alt="$GEAR"/>
                                                &nbsp;{Number(ethers.utils.formatEther(String(item.Reward))).toLocaleString('en-US', {minimumFractionDigits:0})}
                                            </div>
                                        </div>
                                        {item.Reward > 0 ?
                                            <div style={{lineHeight: 2}} className="button" onClick={() => {unstakeNft(item.Id, false)}}>HARVEST</div> :
                                            <div style={{lineHeight: 2, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                                        }
                                    </div>
                                    {item.isStaked ?
                                        <div style={{background: "gray"}} className="button" onClick={() => {unstakeNft(item.Id, true)}}>UNSTAKE</div> :
                                        <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                            <div className="button" onClick={() => {stakeNft(item.Id)}}>STAKE</div>
                                            <div style={{alignSelf: "center", background: "gray"}} className="button" onClick={() => transferNFT(item.Id)}>TRANSFER</div>
                                        </div>
                                    }
                                </div>
                            ))}
                            </> :
                            <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "center"}}>
                                {address !== undefined ?
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
                        </> :
                        <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "center"}}>
                            <ThreeDots fill="#5f6476" />
                            <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default MechHarvestZone
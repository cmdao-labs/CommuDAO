import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract, sendTransaction } from '@wagmi/core'
import { useAccount } from 'wagmi'

import Ammmerchant from  './Mall-Ammy'
import Ammmerchant2 from  './Mall-Jazzi'
import Ammmerchant3 from  './Mall-Degeno'
import Ammmerchant4 from  './Mall-Angelo'
import Ammmerchant5 from  './Mall-AutoTaomi'
const { ethereum } = window

const jusdtToken = "0x24599b658b57f91E7643f4F154B16bcd2884f9ac"
const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const wjbcToken = '0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747'
const jdaoToken = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'
const ctunaLab = "0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0"
const sx31Lab = '0xd431d826d7a4380b9259612176f00528b88840a7'
const swarLab = '0x5e18a8B78d5395371308C54719fead810Ce2aCd2'
const dunAngb = '0x59c1c2f5fa76db933b97b7c54223129e2a398534'
const taomeme = '0xdbCCc9F8920e7274eeC62e695084D3bCe443c3dd'
const iiLab = '0x523AA3aB2371A6360BeC4fEea7bE1293adb32241'
const dunEE = '0xF663c756b6D57724C3B41c8839aB9c7Af83c9751'
const bbqToken = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const pzaLab = '0x09DcdCFc6C48803681a3422997c679E773656763'
const osToken = '0xAc5299D92373E9352636559cca497d7683A47655'
const dunCopper = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'
const silToken = '0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f'
const goldToken = '0x7d5346E33889580528e6F79f48BdEE94D8A9E144'
const platToken = '0x3Bd00B6cd18281E3Ef13Ba348ad2783794dcb2bD'
const dunJasper = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'

const cmdaoMerchant = "0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D"
const cmdaoMerchantV105 = '0x09e6a0A03afa27438c3f507de82b5f6061Ae1643'
const cmdaoMerchantV2 = "0x87BAC0BCBaadF9B7d24385b1AaaEbeDEb60a1A0a"
const cmdaoMerchantKYC = "0xF67761e0E72fea7bD176686a242f1535879be8aB"
const cmdaoGasha02 = '0x87A612709b36b575103C65a90cB3B16Cac2BC898'

const kyc = '0xfB046CF7dBA4519e997f1eF3e634224a9BFf5A2E'

const Mall = ({ setisLoading, txupdate, setTxupdate, kycABI, ctunaLabABI, cmdaoMerchantABI, cmdaoMerchantKYCABI, cmdaoMerchantV2ABI, cmdaoGasha02ABI, ammyABI, ammyStdABI, angeloStdABI, cmdaoAmmNpcABI, erc20ABI }) => {
    const { address } = useAccount()

    const [isWrappedModal, setIsWrappedModal] = React.useState(false)
    const [wrappedValue, setWrappedValue] = React.useState("")

    const [sell1Remain, setSell1Remain] = React.useState(37)
    const [canbuy1, setCanBuy1] = React.useState(false)
    const [sell2Remain, setSell2Remain] = React.useState(22)
    const [canbuy2, setCanBuy2] = React.useState(false)
    const [sell3Remain, setSell3Remain] = React.useState(500)
    const [canbuy3, setCanBuy3] = React.useState(false)
    const [sell4Remain, setSell4Remain] = React.useState(100)
    const [canbuy4, setCanBuy4] = React.useState(false)
    const [sell5Remain, setSell5Remain] = React.useState(100)
    const [canbuy5, setCanBuy5] = React.useState(false)
    const [sell6Remain, setSell6Remain] = React.useState(100)
    const [canbuy6, setCanBuy6] = React.useState(false)
    const [sell7Remain, setSell7Remain] = React.useState(100)
    const [canbuy7, setCanBuy7] = React.useState(false)
    const [sell8Remain, setSell8Remain] = React.useState(333)
    const [canbuy8, setCanBuy8] = React.useState(false)
    const [sell9Remain, setSell9Remain] = React.useState(333)
    const [canbuy9, setCanBuy9] = React.useState(false)
    const [sell10Remain, setSell10Remain] = React.useState(11)
    const [canbuy10, setCanBuy10] = React.useState(false)
    const [sell11Remain, setSell11Remain] = React.useState(11)
    const [canbuy11, setCanBuy11] = React.useState(false)
    const [sell12Remain, setSell12Remain] = React.useState(22)
    const [canbuy12, setCanBuy12] = React.useState(false)
    const [sell13Remain, setSell13Remain] = React.useState(333)
    const [canbuy13, setCanBuy13] = React.useState(false)
    const [sell14Remain, setSell14Remain] = React.useState(100)
    const [canbuy14, setCanBuy14] = React.useState(false)
    const [sell15Remain, setSell15Remain] = React.useState(100)
    const [sell16Remain, setSell16Remain] = React.useState(100)
    const [sell17Remain, setSell17Remain] = React.useState(100)
    const [sell18Remain, setSell18Remain] = React.useState(300)
    const [canbuy18, setCanBuy18] = React.useState(false)
    const [sell19Remain, setSell19Remain] = React.useState(100)
    const [sell20Remain, setSell20Remain] = React.useState(100)
    const [sell21Remain, setSell21Remain] = React.useState(100)
    const [sell22Remain, setSell22Remain] = React.useState(100)
    const [sell23Remain, setSell23Remain] = React.useState(100)
    const [canbuy23, setCanBuy23] = React.useState(false)
    const [sell24Remain, setSell24Remain] = React.useState(250)
    const [sell25Remain, setSell25Remain] = React.useState(250)
    const [sell26Remain, setSell26Remain] = React.useState(250)
    const [sell27Remain, setSell27Remain] = React.useState(250)
    const [sell28Remain, setSell28Remain] = React.useState(250)
    const [sell29Remain, setSell29Remain] = React.useState(250)
    const [sell30Remain, setSell30Remain] = React.useState(250)

    const [roll1Remain, setRoll1Remain] = React.useState(107)
    const [canroll1, setCanRoll1] = React.useState(false)
    const [roll2Remain, setRoll2Remain] = React.useState(256)
    const [roll3Remain, setRoll3Remain] = React.useState(107)
    const [roll4Remain, setRoll4Remain] = React.useState(256)
    const [canroll2, setCanRoll2] = React.useState(false)
    const [roll5Remain, setRoll5Remain] = React.useState(1000)
    const [roll6Remain, setRoll6Remain] = React.useState(256)

    const [ctunaBalance, setCTunaBalance] = React.useState(0)
    const [sx31Balance, setSx31Balance] = React.useState(0)
    const [bbqBalance, setBbqBalance] = React.useState(0)
    const [pzaBalance, setPzaBalance] = React.useState(0)
    const [cuBalance, setCuBalance] = React.useState(0)
    const [silBalance, setSilBalance] = React.useState(0)
    const [goldBalance, setGoldBalance] = React.useState(0)
    const [platBalance, setPlatBalance] = React.useState(0)
    const [jaspBalance, setJaspBalance] = React.useState(0)
    const [osBalance, setOsBalance] = React.useState(0)
    const [jusdtBalance, setJusdtBalance] = React.useState(0)
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [wjbcBalance, setWjbcBalance] = React.useState(0)
    const [swarBalance, setSwarBalance] = React.useState(0)
    const [angbBalance, setAngbBalance] = React.useState(0)
    const [jtaoBalance, setJtaoBalance] = React.useState(0)
    const [iiBalance, setIiBalance] = React.useState(0)
    const [eeBalance, setEeBalance] = React.useState(0)
    const [jdaoBalance, setJdaoBalance] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)

        const thefetch = async () => {
            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: kyc,
                        abi: kycABI,
                        functionName: 'kyc',
                        args: [0, address],
                    },
                    {
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: jusdtToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: ctunaLab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: sx31Lab,
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
                        address: dunCopper,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunJasper,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: pzaLab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: jdaoToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: cmdaoMerchantKYC,
                        abi: cmdaoMerchantKYCABI,
                        functionName: 'bought',
                        args: [address, 1],
                    },
                    {
                        address: osToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: cmdaoMerchantKYC,
                        abi: cmdaoMerchantKYCABI,
                        functionName: 'bought',
                        args: [address, 2],
                    },
                    {
                        address: goldToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: wjbcToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: swarLab,
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
                        address: dunAngb,
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
                        address: iiLab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunEE,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: platToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                ],
            }) : [false, 0, 0, 0, 0, 0, 0, 0, 0, 0, true, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]
            
            const _isKYC = data[0].result
            const cmjBal = data[1].result
            const jusdtBal = data[2].result
            const ctunaBal = data[3].result
            const sx31Bal = data[4].result
            const bbqBal = data[5].result
            const cuBal = data[6].result
            const jaspBal = data[7].result
            const pzaBal = data[8].result
            const jdaoBal = data[9].result
            const isBought5 = data[10].result
            const osBal = data[11].result
            const isBought2 = data[12].result
            const goldBal = data[13].result
            const wjbcBal = data[14].result
            const swarBal = data[15].result
            const silBal = data[16].result
            const angbBal = data[17].result
            const jtaoBal = data[18].result
            const iiBal = data[19].result
            const eeBal = data[20].result
            const platBal = data[21].result

            const data2 = await readContracts({
                contracts: [
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [1],
                    },
                    {
                        address: cmdaoMerchantKYC,
                        abi: cmdaoMerchantKYCABI,
                        functionName: 'sellList',
                        args: [2],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [3],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [4],
                    },
                    {
                        address: cmdaoMerchantKYC,
                        abi: cmdaoMerchantKYCABI,
                        functionName: 'sellList',
                        args: [1],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [5],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [1],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [2],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [3],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [4],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [5],
                    },
                    {
                        address: cmdaoMerchantV2,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [2],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [6],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [7],
                    },
                    {
                        address: cmdaoMerchantV2,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [3],
                    },
                    {
                        address: cmdaoMerchantV2,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [4],
                    },
                    {
                        address: cmdaoMerchantV2,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [5],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [8],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [6],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [9],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [1],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [2],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [3],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [10],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [4],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [5],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [6],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [7],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [11],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [8],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [9],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [10],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [11],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [12],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [13],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [14],
                    },
                ],
            })
            
            const sell1Id = data2[0].result
            const sell2Id = data2[1].result
            const sell3Id = data2[2].result
            const sell4Id = data2[3].result
            const sell5Id = data2[4].result
            const sell6Id = data2[5].result
            const sell7Id = data2[11].result
            const sell8Id = data2[12].result
            const sell9Id = data2[13].result
            const sell10Id = data2[14].result
            const sell11Id = data2[15].result
            const sell12Id = data2[16].result
            const sell13Id = data2[17].result
            const sell14Id = data2[19].result
            const sell15Id = data2[20].result
            const sell16Id = data2[21].result
            const sell17Id = data2[22].result
            const sell18Id = data2[23].result
            const sell19Id = data2[24].result
            const sell20Id = data2[25].result
            const sell21Id = data2[26].result
            const sell22Id = data2[27].result
            const sell23Id = data2[28].result
            const sell24Id = data2[29].result
            const sell25Id = data2[30].result
            const sell26Id = data2[31].result
            const sell27Id = data2[32].result
            const sell28Id = data2[33].result
            const sell29Id = data2[34].result
            const sell30Id = data2[35].result
            const roll1 = data2[6].result
            const roll2 = data2[7].result
            const roll3 = data2[8].result
            const roll4 = data2[9].result
            const roll5 = data2[10].result
            const roll6 = data2[18].result

            const sell1remain = (410003800000 - (Number(sell1Id[2]) - 150)) / 100000
            const _canBuy1 = Number(ethers.utils.formatEther(String(ctunaBal))) >= 2500 ? true : false
            const sell2remain = (720051600000 - (Number(sell2Id[4]) - 250)) / 100000
            const _canBuy2 = _isKYC && !isBought2 && Number(ethers.utils.formatEther(String(bbqBal))) >= 40000 ? true : false
            const sell3remain = (210050100000 - (Number(sell3Id[2]) - 250)) / 100000
            const _canBuy3 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 3 ? true : false
            const sell4remain = (130050100000 - (Number(sell4Id[2]) - 500)) / 100000
            const _canBuy4 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 20 ? true : false
            const sell5remain = (100540100000 - (Number(sell5Id[4]) - 100)) / 100000
            const _canBuy5 = _isKYC && !isBought5 && Number(ethers.utils.formatEther(String(bbqBal))) >= 40000 ? true : false
            const sell6remain = (1000010200000 - (Number(sell6Id[2]) - 100)) / 100000
            const _canBuy6 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 1 ? true : false
            const sell7remain = 101000399 - Number(sell7Id[3])
            const _canBuy7 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 10 ? true : false
            const sell8remain = (102033400000 - (Number(sell8Id[2]) - 8000)) / 100000
            const _canBuy8 = Number(ethers.utils.formatEther(String(jdaoBal))) >= 1000 ? true : false
            const sell9remain = (102066400000 - (Number(sell9Id[2]) - 19000)) / 100000
            const _canBuy9 = Number(ethers.utils.formatUnits(String(jaspBal), "gwei")) >= 100 ? true : false
            const sell10remain = 10001012 - Number(sell10Id[3])
            const _canBuy10 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 150 ? true : false
            const sell11remain = 10002012 - Number(sell11Id[3])
            const _canBuy11 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 90 ? true : false
            const sell12remain = 10003023 - Number(sell12Id[3])
            const _canBuy12 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 60 ? true : false
            const sell13remain = (102100000000 - (Number(sell13Id[2]) - 4500)) / 100000
            const _canBuy13 = Number(ethers.utils.formatEther(String(osBal))) >= 5500 ? true : false
            const sell14remain = (730020000000 - (Number(sell14Id[2]) - 10400)) / 100000
            const _canBuy14 = Number(ethers.utils.formatEther(String(goldBal))) >= 56000 ? true : false
            const sell15remain = (100010100000 - (Number(sell15Id[3]) - 100)) / 100000
            const sell16remain = (700010100000 - (Number(sell16Id[3]) - 250)) / 100000
            const sell17remain = (500010100000 - (Number(sell17Id[3]) - 250)) / 100000

            const sell18remain = (730060100000 - (Number(sell18Id[2]) - 10000)) / 100000
            const _canBuy18 = Number(ethers.utils.formatEther(String(bbqBal))) >= 100000000 ? true : false

            const sell19remain = (300010100000 - (Number(sell19Id[3]) - 250)) / 100000
            const sell20remain = (200010100000 - (Number(sell20Id[3]) - 250)) / 100000
            const sell21remain = (600010100000 - (Number(sell21Id[3]) - 250)) / 100000
            const sell22remain = (400010100000 - (Number(sell22Id[3]) - 250)) / 100000

            const sell23remain = (400040000000 - (Number(sell23Id[2]) - 10900)) / 100000
            const _canBuy23 = Number(ethers.utils.formatEther(String(platBal))) >= 180000 ? true : false

            const sell24remain = (100025100000 - (Number(sell24Id[3]) - 18800)) / 100000
            const sell25remain = (700025100000 - (Number(sell25Id[3]) - 18800)) / 100000
            const sell26remain = (300025100000 - (Number(sell26Id[3]) - 18800)) / 100000
            const sell27remain = (200025100000 - (Number(sell27Id[3]) - 18800)) / 100000
            const sell28remain = (500025100000 - (Number(sell28Id[3]) - 18800)) / 100000
            const sell29remain = (400025100000 - (Number(sell29Id[3]) - 18800)) / 100000
            const sell30remain = (600025100000 - (Number(sell30Id[3]) - 18800)) / 100000

            const roll1remain = Number(roll1[1])
            const roll2remain = Number(roll2[1])
            const roll3remain = Number(roll3[1])
            const roll4remain = Number(roll4[1])
            const roll5remain = Number(roll5[1])
            const roll6remain = Number(roll6[1])

            const _canRoll1 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 15 ? true : false
            const _canRoll2 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 20 ? true : false

            return [
                sell1remain, _canBuy1, sell2remain, _canBuy2, sell3remain, _canBuy3, sell4remain, _canBuy4, sell5remain, _canBuy5, sell6remain, 
                _canBuy6, roll1remain, _canRoll1, roll2remain, roll3remain, roll4remain, roll5remain, _canRoll2, sell7remain, _canBuy7, 
                sell8remain, _canBuy8, sell9remain, _canBuy9, sell10remain, _canBuy10, sell11remain, _canBuy11, sell12remain, _canBuy12, 
                sell13remain, _canBuy13, roll6remain, sell14remain, _canBuy14, sell15remain, sell16remain, sell17remain, sell18remain, _canBuy18, 
                sell19remain, sell20remain, sell21remain, sell22remain, sell23remain, _canBuy23, sell24remain, sell25remain, sell26remain, sell27remain, sell28remain, sell29remain, sell30remain,
                ctunaBal, sx31Bal, jusdtBal, cmjBal, bbqBal, pzaBal, cuBal, jaspBal, osBal, goldBal, wjbcBal, swarBal, silBal, jdaoBal, angbBal, jtaoBal, iiBal, eeBal, platBal,
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
            setSell1Remain(result[0])
            setCanBuy1(result[1])
            setSell2Remain(result[2])
            setCanBuy2(result[3])
            setSell3Remain(result[4])
            setCanBuy3(result[5])
            setSell4Remain(result[6])
            setCanBuy4(result[7])
            setSell5Remain(result[8])
            setCanBuy5(result[9])
            setSell6Remain(result[10])
            setCanBuy6(result[11])
            setSell7Remain(result[19])
            setCanBuy7(result[20])
            setSell8Remain(result[21])
            setCanBuy8(result[22])
            setSell9Remain(result[23])
            setCanBuy9(result[24])
            setSell10Remain(result[25])
            setCanBuy10(result[26])
            setSell11Remain(result[27])
            setCanBuy11(result[28])
            setSell12Remain(result[29])
            setCanBuy12(result[30])
            setSell13Remain(result[31])
            setCanBuy13(result[32])
            setSell14Remain(result[34])
            setCanBuy14(result[35])
            setSell15Remain(result[36])
            setSell16Remain(result[37])
            setSell17Remain(result[38])
            setSell18Remain(result[39])
            setCanBuy18(result[40])
            setSell19Remain(result[41])
            setSell20Remain(result[42])
            setSell21Remain(result[43])
            setSell22Remain(result[44])
            setSell23Remain(result[45])
            setCanBuy23(result[46])
            setSell24Remain(result[47])
            setSell25Remain(result[48])
            setSell26Remain(result[49])
            setSell27Remain(result[50])
            setSell28Remain(result[51])
            setSell29Remain(result[52])
            setSell30Remain(result[53])

            setRoll1Remain(result[12])
            setCanRoll1(result[13])
            setRoll2Remain(result[14])
            setRoll3Remain(result[15])
            setRoll4Remain(result[16])
            setRoll5Remain(result[17])
            setCanRoll2(result[18])
            setRoll6Remain(result[33])

            setCTunaBalance(ethers.utils.formatEther(String(result[54])))
            setSx31Balance(ethers.utils.formatEther(String(result[55])))
            setJusdtBalance(ethers.utils.formatEther(String(result[56])))
            setCmjBalance(ethers.utils.formatEther(String(result[57])))
            setBbqBalance(ethers.utils.formatEther(String(result[58])))
            setPzaBalance(ethers.utils.formatEther(String(result[59])))
            setCuBalance(ethers.utils.formatEther(String(result[60])))
            setJaspBalance(ethers.utils.formatUnits(String(result[61]), "gwei"))
            setOsBalance(ethers.utils.formatEther(String(result[62])))
            setGoldBalance(ethers.utils.formatEther(String(result[63])))
            setWjbcBalance(ethers.utils.formatEther(String(result[64])))
            setSwarBalance(ethers.utils.formatEther(String(result[65])))
            setSilBalance(ethers.utils.formatEther(String(result[66])))
            setJdaoBalance(ethers.utils.formatEther(String(result[67])))
            setAngbBalance(ethers.utils.formatEther(String(result[68])))
            setJtaoBalance(ethers.utils.formatEther(String(result[69])))
            setIiBalance(ethers.utils.formatEther(String(result[70])))
            setEeBalance(ethers.utils.formatEther(String(result[71])))
            setPlatBalance(ethers.utils.formatEther(String(result[72])))
        })

    }, [address, txupdate, kycABI, ctunaLabABI, cmdaoMerchantABI, cmdaoMerchantV2ABI, cmdaoMerchantKYCABI, cmdaoGasha02ABI, erc20ABI])

    const buyHandle = async () => {
        setisLoading(true)
        const ctunaAllow = await readContract({
            address: ctunaLab,
            abi: ctunaLabABI,
            functionName: 'allowance',
            args: [address, cmdaoMerchant],
        })
        if (ctunaAllow < (2500 * 10**18)) {
            try {
                const config = await prepareWriteContract({
                    address: ctunaLab,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [1]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle2 = async () => {
        setisLoading(true)
        try {
            const bbqAllow = await readContract({
                address: bbqToken,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantKYC],
            })
            if (bbqAllow < (40000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: bbqToken,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantKYC, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantKYC,
                abi: cmdaoMerchantKYCABI,
                functionName: 'buy',
                args: [2]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)        
    }

    const buyHandle3 = async (_index) => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (jusdtAllow < (20 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [_index]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle4 = async (_index) => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantV2],
            })
            if (jusdtAllow < (10 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantV2, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantV2,
                abi: cmdaoMerchantV2ABI,
                functionName: 'buy',
                args: [_index]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle10 = async (_index) => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantV2],
            })
            if (jusdtAllow < (150 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantV2, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantV2,
                abi: cmdaoMerchantV2ABI,
                functionName: 'buy',
                args: [_index]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }


    const buyHandle5 = async () => {
        setisLoading(true)
        try {
            const bbqAllow = await readContract({
                address: bbqToken,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantKYC],
            })
            if (bbqAllow < (40000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: bbqToken,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantKYC, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantKYC,
                abi: cmdaoMerchantKYCABI,
                functionName: 'buy',
                args: [1]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle6 = async () => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (jusdtAllow < (49000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [5]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle8 = async () => {
        setisLoading(true)
        try {
            const jdaoAllow = await readContract({
                address: jdaoToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (jdaoAllow < (1000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jdaoToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [6]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle9 = async () => {
        setisLoading(true)
        try {
            const jaspAllow = await readContract({
                address: dunJasper,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (jaspAllow < (100 * 10**9)) {
                const config = await prepareWriteContract({
                    address: dunJasper,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [7]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle13 = async () => {
        setisLoading(true)
        try {
            const osAllow = await readContract({
                address: osToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (osAllow < (5500 * 10**18)) {
                const config = await prepareWriteContract({
                    address: osToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [8]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle14 = async () => {
        setisLoading(true)
        try {
            const goldAllow = await readContract({
                address: goldToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (goldAllow < (56000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: goldToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [9]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle15 = async (_index) => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantV105],
            })
            if (jusdtAllow < (20 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantV105, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantV105,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [_index]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle18 = async () => {
        setisLoading(true)
        try {
            const bbqAllow = await readContract({
                address: bbqToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (bbqAllow < (100000000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: bbqToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [10]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle23 = async () => {
        setisLoading(true)
        try {
            const platAllow = await readContract({
                address: platToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (platAllow < (180000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: platToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [11]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const rollHandle2 = async (_colIndex) => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoGasha02],
            })
            if (jusdtAllow < (15 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoGasha02, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoGasha02,
                abi: cmdaoGasha02ABI,
                functionName: 'roll',
                args: [_colIndex]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    /*const rollHandle3 = async (_colIndex) => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoGasha02],
            })
            if (jusdtAllow < (20 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoGasha02, ethers.utils.parseEther(String(10**8))],
                })
                const { hash0 } = await writeContract(config)
                await waitForTransaction({ hash0, })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoGasha02,
                abi: cmdaoGasha02ABI,
                functionName: 'roll',
                args: [_colIndex]
            })
            const { hash1 } = await writeContract(config2)
            await waitForTransaction({ hash1, })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }*/
    console.log(canroll2, roll5Remain)

    const sendHandle = async () => {
        setisLoading(true)
        try {
            const { hash } = await sendTransaction({
                to: wjbcToken,
            value: wrappedValue !== "" ? ethers.utils.parseEther(wrappedValue) : undefined,
            })
            await waitForTransaction({ hash, })
            setTxupdate(hash)
        } catch {}
        setisLoading(false)
    }

    return (
    <>
        {isWrappedModal ?
            <div style={{zIndex: "999"}} className="centermodal">
                <div className="wrapper">
                    <div className="bold" style={{width: "500px", height: "200px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{width: "80%", fontSize: "12px", textAlign: "left"}}>
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{height: "30px", padding: "0 5px", marginRight: "10px", lineHeight: "32px"}} className="bold">WRAPPED</div>
                                <div style={{width: "fit-content", height: "30px", margin: 0, padding: "5px", border: "1px solid", borderRadius: "10px", fontSize: "12px"}} className="items bold">
                                    <img src="https://nftstorage.link/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" width="20" alt="$WJBC"/>
                                </div>
                            </div>
                            <input style={{marginTop: "10px", width: "90%", padding: "10px"}} className="bold" type="number" min="0" step="0.1" placeholder="Enter $JBC to Wrap" value={wrappedValue} onChange={(event) => setWrappedValue(event.target.value)}></input>
                        </div>
                        <div className="button" style={{width: "50%"}} onClick={sendHandle}>WRAP</div>
                        <div className="button" style={{width: "50%", background: "gray"}} onClick={() => setIsWrappedModal(false)}>CLOSE</div>
                    </div>
                </div>
            </div> :
            <></>
        }
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div style={{fontSize: "75px", width: "fit-content"}} className="pixel">Mall</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px", letterSpacing: "1px"}} className="pixel">Automated Buy & Sell</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="./background/malllogo.png" width="150" alt="Mall_Logo" />
            </div>
        </div>

        <div className="collection">
            <div style={{textAlign: "left", height: "fit-content", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                <div style={{width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Cryptocurrency</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq"
                            width="20"
                            alt="$WJBC"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: wjbcToken,
                                            symbol: 'WJBC',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "10px"}}><div style={{width: "60px", textAlign: "center", fontSize: "16px", padding: "1px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={() => setIsWrappedModal(true)}>WRAP</div> {Number(wjbcBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u"
                            width="20"
                            alt="$CMJ"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: cmjToken,
                                            symbol: 'CMJ',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(cmjBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi"
                            width="20"
                            alt="$JUSDT"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: jusdtToken,
                                            symbol: 'JUSDT',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(jusdtBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img 
                            src="https://nftstorage.link/ipfs/bafkreifydb6vy2dysudcg6x64p42enym3bhfneal62ctf33oapsmk6qjlm"
                            width="20"
                            alt="$JTAO"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: taomeme,
                                            symbol: 'JTAO',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreifydb6vy2dysudcg6x64p42enym3bhfneal62ctf33oapsmk6qjlm',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(jtaoBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                </div>

                <div style={{width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", marginTop: "20px"}} className="bold">CommuDAO Tokens</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq"
                            width="20"
                            alt="$BBQ"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: bbqToken,
                                            symbol: 'BBQ',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(bbqBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu"
                            width="20"
                            alt="$PZA"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: pzaLab,
                                            symbol: 'PZA',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(pzaBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq"
                            width="20"
                            alt="$CU"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: dunCopper,
                                            symbol: 'CU',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(cuBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde"
                            width="20"
                            alt="$SIL"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: silToken,
                                            symbol: 'SIL',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(silBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm"
                            width="20"
                            alt="$GOLD"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: goldToken,
                                            symbol: 'GOLD',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(goldBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreibf7vowyqjrcaeyslflrxxchel3b4qdpwxcxb34js2otg35vjkcaa"
                            width="20"
                            alt="$PLAT"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: platToken,
                                            symbol: 'PLAT',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreibf7vowyqjrcaeyslflrxxchel3b4qdpwxcxb34js2otg35vjkcaa',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(platBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "0 10px 20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy"
                            width="20"
                            alt="$JASP"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: dunJasper,
                                            symbol: 'JASP',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(jaspBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "0 10px 20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e"
                            width="20"
                            alt="$OS"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: osToken,
                                            symbol: 'OS',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(osBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                </div>

                <div style={{width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", marginTop: "20px"}} className="bold">Partner Tokens</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i"
                            width="20"
                            alt="$CTUNA"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: ctunaLab,
                                            symbol: 'CTUNA',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(ctunaBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4"
                            width="20"
                            alt="$SX31"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: sx31Lab,
                                            symbol: 'SX31',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(sx31Balance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreib4zlmwnydgolgzkfldaz2zsxh6pg3k4wemiigura7gbnj7i36ygi"
                            width="20"
                            alt="$SWAR"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: swarLab,
                                            symbol: 'SWAR',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreib4zlmwnydgolgzkfldaz2zsxh6pg3k4wemiigura7gbnj7i36ygi',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(swarBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m"
                            width="20"
                            alt="$ANGB"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: dunAngb,
                                            symbol: 'ANGB',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(angbBalance).toLocaleString('en-US', {maximumFractionDigits:4})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q"
                            width="20"
                            alt="$II"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: iiLab,
                                            symbol: 'TDM - II',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(iiBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://nftstorage.link/ipfs/bafybeihg7schl77eo7b4amo22htmuscipo4dfioxmajxr4feuqloz2dolm"
                            width="20"
                            alt="$EE"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: dunEE,
                                            symbol: 'TDM-EE',
                                            decimals: 18,
                                            image: 'https://nftstorage.link/ipfs/bafybeihg7schl77eo7b4amo22htmuscipo4dfioxmajxr4feuqloz2dolm',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(eeBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                    </div>
                </div>


                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Automated Market Maker</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <Ammmerchant setisLoading={setisLoading} setTxupdate={setTxupdate} ammyABI={ammyABI} ammyStdABI={ammyStdABI} erc20ABI={erc20ABI} ctunaBalance={ctunaBalance} sx31Balance={sx31Balance} bbqBalance={bbqBalance} pzaBalance={pzaBalance} cmjBalance={cmjBalance} />
                    <Ammmerchant2 setisLoading={setisLoading} setTxupdate={setTxupdate} cmdaoAmmNpcABI={cmdaoAmmNpcABI} erc20ABI={erc20ABI} jdaoBalance={jdaoBalance} cuBalance={cuBalance} silBalance={silBalance} goldBalance={goldBalance} jaspBalance={jaspBalance} osBalance={osBalance} cmjBalance={cmjBalance} />
                    <Ammmerchant3 setisLoading={setisLoading} setTxupdate={setTxupdate} ammyStdABI={ammyStdABI} erc20ABI={erc20ABI} cmjBalance={cmjBalance} />
                </div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <Ammmerchant4 setisLoading={setisLoading} setTxupdate={setTxupdate} angeloStdABI={angeloStdABI} cmdaoAmmNpcABI={cmdaoAmmNpcABI} erc20ABI={erc20ABI} angbBalance={angbBalance} swarBalance={swarBalance} wjbcBalance={wjbcBalance} />
                    <Ammmerchant5 setisLoading={setisLoading} setTxupdate={setTxupdate} cmdaoAmmNpcABI={cmdaoAmmNpcABI} erc20ABI={erc20ABI} iiBalance={iiBalance} eeBalance={eeBalance} jtaoBalance={jtaoBalance} />
                </div>

                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Ecosystem NFTs Premium Store</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://nftstorage.link/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Angel Plus - Adventurer Card D +0 Vol.4</div>
                        <video muted loop width="175" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                            <source src="https://nftstorage.link/ipfs/bafybeia2c5qcwshxdqw6gvvezehsnn5r7u5d2oxkduwzydbzxxu3hfzzze" type="video/mp4" />
                        </video>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell7Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>Staking in Fields: Eastern Front</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell7Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle4(2)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>    

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://nftstorage.link/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Angel Plus NFT - Hero (Character)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafybeiafeumwvilddqiakxaabht5bcu2khkeyjr275jtbwyryd6upbh6bm" height="150" alt="AP-HERO"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell15Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>100 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell15Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(1)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://nftstorage.link/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Angel Plus NFT - Claymore (Sword)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreigcv7pn4azsrjkzccyeyq6nkg6sntwnh3czrfth6ubwudo6imuhyu" height="150" alt="AP-CLAYMORE"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell16Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell16Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(2)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://nftstorage.link/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Angel Plus NFT - Shield (Shield)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreihdt2twkixgg27erb5rlawm37v4owvq2j5pq2753tmf55hhgjr7ia" height="150" alt="AP-SHIELD"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell17Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell17Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(3)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://nftstorage.link/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Angel Plus NFT - Full Plate (Armor)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreiehp5d2ccxovqmb7qtriafsnku7xlifr345zlsrmane3fvwoskhle" height="150" alt="AP-FULL-PLATE"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell19Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell19Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(4)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://nftstorage.link/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Angel Plus NFT - Helm (Helmet)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreiepodq6oo7xlme6tjnjus3cberubwu4sfgdvbnou7tdtbrj4hzm2q" height="150" alt="AP-HELM"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell20Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell20Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(5)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div> 
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://nftstorage.link/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Angel Plus NFT - Crusader Boots (Boots)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreialnqwhhuikji7fov3tc73dv6qqb74okxkiihuogk3dekzotg3vni" height="150" alt="AP-CRUSADER-BOOTS"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell21Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell21Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(6)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://nftstorage.link/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Angel Plus NFT - Imperium Ring (Ring)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreiagnfkgkzdazovsfu33d2v22eyotizgy4zg66okkmwwt7unswungi" height="150" alt="AP-IMPERIUM-RING"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell22Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell22Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(7)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://nftstorage.link/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">NARUTA NFT - Naruta (Main Char)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://bafybeih6lcghzq7kygz2uxpksueczcj36xptexylmyum5zwwx265h2222u.ipfs.nftstorage.link/" height="150" alt="NARUTA"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell24Remain}</div>
                                    /250 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>18800 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell24Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(8)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://nftstorage.link/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">NARUTA NFT - TD-88 Blaster (Weapon)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafybeiglw3a5wuszv7zkmfw55e2bcaoxinsjwjinckccg4lxg2juoeegmu" height="150" alt="TD-88-BLASTER"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell25Remain}</div>
                                    /250 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>18800 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell25Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(9)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://nftstorage.link/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">NARUTA NFT - X8 Haptic Bootsuit (Cloth)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafybeih5zbbv5tjdug5qbnzbmusaqwgy3z4ecs3uii7t6g7q7ynhnr3d5q" height="150" alt="X8-HAPTIC-BODYSUIT"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell26Remain}</div>
                                    /250 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>18800 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell26Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(10)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://nftstorage.link/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">NARUTA NFT - Cosmo Crest (Hat)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafybeia3bm6ju5fhokrjnovbgbm3mw422jwxa72bnoo4ihgf2upsfrbmlm" height="150" alt='COSMO-CREST'/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell27Remain}</div>
                                    /250 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>18800 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell27Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(11)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://nftstorage.link/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">NARUTA NFT - Prism Propel Wings (Back)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafybeicfyxqmdjjz3xispk7vil22asr4wnzffxbuh47dy42qofy4zxnfb4" height="150" alt="PRISM-PROPEL-WINGS"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell28Remain}</div>
                                    /250 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>18800 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell28Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(12)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://nftstorage.link/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">NARUTA NFT - Phoenix Phalanx Ring (Accessory)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://bafybeifmkrjl457rtfkve2ktn3ynx4yev5oqygpsvppeo4csm26fqormha.ipfs.nftstorage.link/" height="150" alt="PHOENIX-PHALANX-RING"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell29Remain}</div>
                                    /250 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>18800 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell29Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(13)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://nftstorage.link/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">NARUTA NFT - Galactic Walkers (Shoes)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafybeicmgffdl5eb4op32ck2vvri5f4ruxzxk6nkmu6eqcxabu27glmvmu" height="150" alt="GALACTIC-WALKER"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell30Remain}</div>
                                    /250 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>18800 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell30Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(14)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">CommmuDAO NFTs Premium Store</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Treasure Tide Flintlock</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://bafkreia45343q6jrvbfd6bjwam7de53w7utdth6ljnt2izpia4uthvzfke.ipfs.nftstorage.link" height="150" alt="TT_FLINTLOCK"/>
                        <div style={{alignSelf: "flex-start", height: "200px", fontSize: "15px", marginTop: "10px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll1Remain}</div>
                                    <div>/107 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>N : 250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R : 550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR : 1050 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR : 2550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll1Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(1)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Golden Dragon Armor </div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreibgzv6zcq4yuj2n44dw6o7ydwllepwry5nulqzdx4s2c7poabxwxa" height="150" alt="GDA_GASHA"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", height: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll2Remain}</div>
                                    <div>/256 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>N : 250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R : 550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR : 1050 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR : 2550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>15</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll2Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(2)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>   

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">MVT's Backpack</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreiao65xaujwrqwsdyicyew4gutcsqtwtxmy3fpjudrwnoyf5zq3zey" height="150" alt="MULTIVERSE_BACKPACK"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", height: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll3Remain}</div>
                                    <div>/107 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>N : 250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R : 550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR : 1050 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR : 2550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll3Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(3)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>                 
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Golden Dragon Boots</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreif4fk7tqca2vdovvtwufxyx2snoolbwofvdvjoqi35y6mvaahhkve" height="150" alt="GDB"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", height: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll4Remain}</div>
                                    <div>/256 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>N : 250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R : 550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR : 1050 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR : 2550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>15</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll4Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(4)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Golden Dragon Accessory</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreiem7ixjm7xomcrhfkla73ye7ajah6d7xi7hw6a6seozclccaewipy" height="150" alt="GD_ACC"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", height: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll6Remain}</div>
                                    <div>/256 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>N : 250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R : 550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR : 1050 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR : 2550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>15</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll6Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(6)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">SAPIENS #04</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" height="150" alt="Sapiens"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                <div className="emp">{sell4Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>500 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="$JUSDT"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell4Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle3(4)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Floki's Viking Helmet N</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreiexymrt2jpbbgiwfzsvxjgty5fdd3j5qh3yqqmm7dbzqudkwfcyna" height="150" alt="Floki_Helmet_N"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell3Remain}</div>
                                    /500 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="$JUSDT"/>
                                    <div style={{marginLeft: "7.5px"}}>3</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell3Remain > 0 ?
                                    <>
                                        {canbuy3 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle3(3)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Chō-Senjiryakketsu Vol.1</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreifgwtom3va2wm4wdur4eupbnoxjfvxr3765ebkpisron73ydmq3sa" height="150" alt="CS"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                <div className="emp">{sell6Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>100 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="$JUSDT"/>
                                    <div style={{marginLeft: "7.5px"}}>1</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell6Remain > 0 ?
                                    <>
                                        {canbuy6 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle6}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">CM CITY Title Indeed A Tier</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreiatzl4wbuoxjjrbeicqgm7xklq532mkqrpxen4bvtbn5q46zyawyy" height="150" alt="TI_A_TIER"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                <div className="emp">{sell10Remain}</div>
                                    /11 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>A Tier</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="$JUSDT"/>
                                    <div style={{marginLeft: "7.5px"}}>150</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell10Remain > 0 ?
                                    <>
                                        {canbuy10 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle10(3)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>                    
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">CM CITY Title Indeed B Tier</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreidtwbjkybihrt5i2zfy7fx2ixsgjerganenyyxtnidnlih7el7usq" height="150" alt="TI_B_TIER"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                <div className="emp">{sell11Remain}</div>
                                    /11 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>B Tier</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="$JUSDT"/>
                                    <div style={{marginLeft: "7.5px"}}>90</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell11Remain > 0 ?
                                    <>
                                        {canbuy11 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle10(4)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">CM CITY Title Indeed C Tier</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreiago24hri42hnmirrohbjxmkwdpl4csybfox3ounsql4by7qu3k6q" height="150" alt="TI_C_TIER"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                <div className="emp">{sell12Remain}</div>
                                    /22 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>C Tier</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="$JUSDT"/>
                                    <div style={{marginLeft: "7.5px"}}>60</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell12Remain > 0 ?
                                    <>
                                        {canbuy12 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle10(5)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>
                
                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">CommuDAO NFTs Redemption Store</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll", marginBottom: "40px"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">KYC Shop</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Multiverse Traveller Vol.4</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreigc4ivgjqocp7dh7bh3upl4tidhpe2w76muckmzyvulevbkoxdnce" height="150" alt="MVT"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell5Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>100 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="18" alt="$BBQ"/>
                                    <div style={{marginLeft: "7.5px"}}>40,000</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell5Remain > 0 ?
                                    <>
                                        {canbuy5 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle5}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">NOT ELIGIBLE TO REDEEM</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">KYC Shop</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Novice Sword Vol.2</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://bafkreiha7rbdsni6hvok2rs546zeowge2mwbfh3y75awlqv2u74zorltse.ipfs.nftstorage.link/" height="150" alt="Novice_Sword"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell2Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="18" alt="$BBQ"/>
                                    <div style={{marginLeft: "7.5px"}}>40,000</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell2Remain > 0 ?
                                    <>
                                        {canbuy2 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle2}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">NOT ELIGIBLE TO REDEEM</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">TSW Valentine Ring</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreiacm6fn5rjctuxyiirlmr7awp6ckesgffamingak4pif3kp6vgbri" height="160" alt="valentineringpic"/>
                        <div style={{alignSelf: "flex-start", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell1Remain}</div>
                                    /107 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>150 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i" height="18" alt="$CTUNA"/>
                                    <div style={{marginLeft: "7.5px"}}>2500</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell1Remain > 0 ?
                                    <>
                                        {canbuy1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll", marginBottom: "40px"}} className="noscroll">
                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Prophet of JBC</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreieoamtkrbgj3kd3cqrdcvwzoj7swmwegmoyvcs5gqv22psyzzhvre" height="150" alt="PROPHET-OF-JBC"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell8Remain}</div>
                                    /333 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>8,000 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                    <div style={{marginLeft: "7.5px"}}>1,000</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell8Remain > 0 ?
                                    <>
                                        {canbuy8 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle8}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Supreme God of JBC</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreiayhubngbbxov2lyhxfziy7tr7pvdr5cwbi4fgn6rcdykpgnv3c4a" height="150" alt="SUPREME-GOD-OF-JBC"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell9Remain}</div>
                                    /333 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>19,000 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                    <div style={{marginLeft: "7.5px"}}>100</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell9Remain > 0 ?
                                    <>
                                        {canbuy9 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle9}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">VK, King of Commu</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://bafkreibl25he5u74rw2mi24xhjl4yurmhoe6upn4qcbi5kn75e5uaz2ksa.ipfs.nftstorage.link" height="150" alt="VK"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell13Remain}</div>
                                    /333 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>4,500 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                    <div style={{marginLeft: "7.5px"}}>5,500</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell13Remain > 0 ?
                                    <>
                                        {canbuy13 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle13}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll", marginBottom: "40px"}} className="noscroll">
                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Golden Hour</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreieywimw6rnkhwjckzeuqbbkkbdoy7tqfkv4gwgl36fqupiima65pu" height="150" alt="GOLDEN-HOUR"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell14Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>10,400 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm" height="18" alt="$GOLD"/>
                                    <div style={{marginLeft: "7.5px"}}>56,000</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell14Remain > 0 ?
                                    <>
                                        {canbuy14 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle14}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Chainsaw Pro Max</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreibalc6if2y6qqp3kfxjkciabsdxxxpnx4djt6toap2c3n2bfcnfye" height="150" alt="CHAINSAW-PRO-MAX"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell18Remain}</div>
                                    /300 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>10,000 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="18" alt="$BBQ"/>
                                    <div style={{marginLeft: "7.5px"}}>100M</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell18Remain > 0 ?
                                    <>
                                        {canbuy18 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle18}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Director's Chair</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://nftstorage.link/ipfs/bafkreia33b5b77t6hhmhnvlrnlooplurabhzeeuviv45vm6p4kja3z7dda" height="150" alt="director-s-chair"/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell23Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>10,900 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreibf7vowyqjrcaeyslflrxxchel3b4qdpwxcxb34js2otg35vjkcaa" height="18" alt="$PLAT"/>
                                    <div style={{marginLeft: "7.5px"}}>180,000</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell23Remain > 0 ?
                                    <>
                                        {canbuy23 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle23}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>
                <div style={{height: "40px"}}></div>
            </div>
        </div>
    </>
    )
}

export default Mall
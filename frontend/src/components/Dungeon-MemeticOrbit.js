import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { ThreeDots } from 'react-loading-icons'

const cmdaonft = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const narutanft = '0x5E620D8980335167d9eF36cEf5d9A6Ea6607a8Cb'
const bbnft = '0xc304195Ad2F55810EcD1e63d9D975e29138Dbd4E'
const gasToken = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'
const rewardToken = '0x3Bd00B6cd18281E3Ef13Ba348ad2783794dcb2bD'
const dunMo = '0xD30F5d6ABc3dBd9Df01eC0FE891114914Ee1360A'
const mintStOPT_Router = '0xeFb6F6018F5D6c0D1e58F751a57fa716e72d1182'
const salonRouter = '0x76B6B24BA53042A0e02Cc0e84c875d74EAeFb74a'
const slot1 = '0x171b341FD1B8a2aDc1299f34961e19B552238cb5'
const badgeClaimer = '0x99f4FE6E420B46B7f5DeeEabFDc7604756e093d5' 
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const ss = 3
const isEnd = true

const Memeticorbit = ({ config, intrasubModetext, navigate, callMode, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc721Abi, erc20Abi, dunMoABI, mintStOPTABI, salonABI, slot1ABI, badgeClaimerABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const { open } = useAppKit()
    const [addr, setAddr] = React.useState(address)
    const [isTransferModal, setIsTransferModal] = React.useState(false)
    const [transferNftCol, setTransferNftCol] = React.useState(null)
    const [transferNftid, setTransferNftid] = React.useState(null)
    const [transferName, setTransferName] = React.useState("")
    const [transferTo, setTransferTo] = React.useState(null)
    const [nft, setNft] = React.useState([])
    const [characterSlot, setCharacterSlot] = React.useState(null)
    const [characterSlotLevel, setCharacterSlotLevel] = React.useState(null)
    const [isOp, setIsOp] = React.useState(null)
    const [hatSlot, setHatSlot] = React.useState(null)
    const [hatSlotLevel, setHatSlotLevel] = React.useState(null)
    const [clothSlot, setClothSlot] = React.useState(null)
    const [clothSlotLevel, setClothSlotLevel] = React.useState(null)
    const [accSlot, setAccSlot] = React.useState(null)
    const [accSlotLevel, setAccSlotLevel] = React.useState(null)
    const [backSlot, setBackSlot] = React.useState(null)
    const [backSlotLevel, setBackSlotLevel] = React.useState(null)
    const [shoesSlot, setShoesSlot] = React.useState(null)
    const [shoesSlotLevel, setShoesSlotLevel] = React.useState(null)
    const [weaponSlot, setWeaponSlot] = React.useState(null)
    const [wpSlotLevel, setWpSlotLevel] = React.useState(null)
    const [weaponSlot2, setWeapon2Slot] = React.useState(null)
    const [wpSlot2Level, setWpSlot2Level] = React.useState(null)
    const [accSlot2, setAccSlot2] = React.useState(null)
    const [accSlot2Level, setAccSlot2Level] = React.useState(null)
    const [accSlot3, setAccSlot3] = React.useState(null)
    const [accSlot3Level, setAccSlot3Level] = React.useState(null)
    const [accSlot4, setAccSlot4] = React.useState(null)
    const [accSlot4Level, setAccSlot4Level] = React.useState(null)
    const [accSlot5, setAccSlot5] = React.useState(null)
    const [accSlot5Level, setAccSlot5Level] = React.useState(null)
    const [accSlot6, setAccSlot6] = React.useState(null)
    const [accSlot6Level, setAccSlot6Level] = React.useState(null)
    const [soulSlot, setSoulSlot] = React.useState(null)
    const [soulSlotLevel, setSoulSlotLevel] = React.useState(null)
    const [badgeSlot, setBadgeSlot] = React.useState(null)
    const [badgeSlotLevel, setBadgeSlotLevel] = React.useState(null)
    const [ss1CharacterSlot, setSs1CharacterSlot] = React.useState(null)
    const [ss1CharacterSlotLevel, setSs1CharacterSlotLevel] = React.useState(null)
    const [ss1HatSlot, setSs1HatSlot] = React.useState(null)
    const [ss1HatSlotLevel, setSs1HatSlotLevel] = React.useState(null)
    const [ss1ClothSlot, setSs1ClothSlot] = React.useState(null)
    const [ss1ClothSlotLevel, setSs1ClothSlotLevel] = React.useState(null)
    const [ss1AccSlot, setSs1AccSlot] = React.useState(null)
    const [ss1BackSlot, setSs1BackSlot] = React.useState(null)
    const [ss1BackSlotLevel, setSs1BackSlotLevel] = React.useState(null)
    const [ss1ShoesSlot, setSs1ShoesSlot] = React.useState(null)
    const [ss1ShoesSlotLevel, setSs1ShoesSlotLevel] = React.useState(null)
    const [ss1WeaponSlot, setSs1WeaponSlot] = React.useState(null)
    const [ss1WpSlotLevel, setSs1WpSlotLevel] = React.useState(null)
    const [ss2CharacterSlot, setSs2CharacterSlot] = React.useState(null)
    const [ss2CharacterSlotLevel, setSs2CharacterSlotLevel] = React.useState(null)
    const [ss2HatSlot, setSs2HatSlot] = React.useState(null)
    const [ss2HatSlotLevel, setSs2HatSlotLevel] = React.useState(null)
    const [ss2ClothSlot, setSs2ClothSlot] = React.useState(null)
    const [ss2ClothSlotLevel, setSs2ClothSlotLevel] = React.useState(null)
    const [ss2AccSlot, setSs2AccSlot] = React.useState(null)
    const [ss2AccSlotLevel, setSs2AccSlotLevel] = React.useState(null)
    const [ss2BackSlot, setSs2BackSlot] = React.useState(null)
    const [ss2BackSlotLevel, setSs2BackSlotLevel] = React.useState(null)
    const [ss2ShoesSlot, setSs2ShoesSlot] = React.useState(null)
    const [ss2ShoesSlotLevel, setSs2ShoesSlotLevel] = React.useState(null)
    const [ss2WeaponSlot, setSs2WeaponSlot] = React.useState(null)
    const [ss2WpSlotLevel, setSs2WpSlotLevel] = React.useState(null)
    const [ss3CharacterSlot, setSs3CharacterSlot] = React.useState(null)
    const [ss3CharacterSlotLevel, setSs3CharacterSlotLevel] = React.useState(null)
    const [ss3HatSlot, setSs3HatSlot] = React.useState(null)
    const [ss3HatSlotLevel, setSs3HatSlotLevel] = React.useState(null)
    const [ss3ClothSlot, setSs3ClothSlot] = React.useState(null)
    const [ss3ClothSlotLevel, setSs3ClothSlotLevel] = React.useState(null)
    const [ss3AccSlot, setSs3AccSlot] = React.useState(null)
    const [ss3AccSlotLevel, setSs3AccSlotLevel] = React.useState(null)
    const [ss3BackSlot, setSs3BackSlot] = React.useState(null)
    const [ss3BackSlotLevel, setSs3BackSlotLevel] = React.useState(null)
    const [ss3ShoesSlot, setSs3ShoesSlot] = React.useState(null)
    const [ss3ShoesSlotLevel, setSs3ShoesSlotLevel] = React.useState(null)
    const [ss3WeaponSlot, setSs3WeaponSlot] = React.useState(null)
    const [ss3WpSlotLevel, setSs3WpSlotLevel] = React.useState(null)
    const [allPower, setAllPower] = React.useState(0)
    const [isStakeNow, setIsStakeNow] = React.useState(null)
    const [timeToRunout, setTimeToRunout] = React.useState(null)
    const [isRunout, setIsRunout] = React.useState(false)
    const [rewardPending, setRewardPending] = React.useState(0)
    const [yourSS1CMPOW, setYourSS1CMPOW] = React.useState(0)
    const [yourSS2CMPOW, setYourSS2CMPOW] = React.useState(0)
    const [yourSS3CMPOW, setYourSS3CMPOW] = React.useState(0)
    const [lastedSTOPT, setLastedSTOPT] = React.useState(null)
    const [skinSlot1, setSkinSlot1] = React.useState(null)
    const [isClaimBadge, setIsClaimBadge] = React.useState(false)
    const [isClaimBadge2, setIsClaimBadge2] = React.useState(false)
    const [isClaimBadge3, setIsClaimBadge3] = React.useState(false)
    const [gasBalance, setGasBalance] = React.useState(0)
    const [rewardBalance, setRewardBalance] = React.useState(0)
    const [landBonus, setLandBonus] = React.useState(0)
    const [myhouse, setMyhouse] = React.useState(0)
    console.log(isOp, lastedSTOPT)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        if (intrasubModetext === undefined) {
            navigate('/dungeon/memetic-orbit/' + address)
        } else if (intrasubModetext.length === 42) {
            setAddr(intrasubModetext)
        } else if (address === undefined) {
            navigate('/dungeon/memetic-orbit/null')
        } else {
            navigate('/dungeon/memetic-orbit/' + address)
        }
        const cmdaonftSC = new ethers.Contract(cmdaonft, erc721Abi, providerJBC)
        const narutanftSC = new ethers.Contract(narutanft, erc721Abi, providerJBC)
        const bbnftSC = new ethers.Contract(bbnft, erc721Abi, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            const dataHouse = await readContracts(config, {
                contracts: [
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10026010'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10026002'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001001'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001002'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001003'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001004'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001005'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001006'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001007'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001008'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001009'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001010'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001011'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10026006'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002001'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002002'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002003'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002004'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002005'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002006'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002007'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002008'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002009'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002010'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002011'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10026011'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003001'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003002'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003003'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003004'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003005'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003006'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003007'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003008'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003009'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003010'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003011'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003012'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003013'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003014'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003015'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003016'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003017'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003018'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003019'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003020'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003021'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003022'], chainId: 8899 },                    
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10026010'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10026002'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001001'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001002'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001003'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001004'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001005'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001006'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001007'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001008'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001009'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001010'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001011'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10026006'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002001'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002002'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002003'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002004'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002005'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002006'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002007'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002008'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002009'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002010'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002011'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10026011'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003001'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003002'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003003'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003004'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003005'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003006'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003007'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003008'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003009'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003010'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003011'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003012'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003013'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003014'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003015'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003016'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003017'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003018'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003019'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003020'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003021'], chainId: 8899 },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003022'], chainId: 8899 },
                ],
            }) 
            let house = 0
            let myhouseMul = 0
            for (let i = 0; i <= dataHouse.length - 1 && addr !== null; i++) {
                if (addr.toUpperCase() === dataHouse[1].result.toUpperCase()) {
                    house = 10026002
                    myhouseMul = Number(dataHouse[49].result) * 10
                } else if (addr.toUpperCase() === dataHouse[2].result.toUpperCase()) {
                    house = 10001001
                    myhouseMul = Number(dataHouse[50].result) * 10
                } else if (addr.toUpperCase() === dataHouse[3].result.toUpperCase()) {
                    house = 10001002
                    myhouseMul = Number(dataHouse[51].result) * 10
                } else if (addr.toUpperCase() === dataHouse[4].result.toUpperCase()) {
                    house = 10001003
                    myhouseMul = Number(dataHouse[52].result) * 10
                } else if (addr.toUpperCase() === dataHouse[5].result.toUpperCase()) {
                    house = 10001004
                    myhouseMul = Number(dataHouse[53].result) * 10
                } else if (addr.toUpperCase() === dataHouse[6].result.toUpperCase()) {
                    house = 10001005
                    myhouseMul = Number(dataHouse[54].result) * 10
                } else if (addr.toUpperCase() === dataHouse[7].result.toUpperCase()) {
                    house = 10001006
                    myhouseMul = Number(dataHouse[55].result) * 10
                } else if (addr.toUpperCase() === dataHouse[8].result.toUpperCase()) {
                    house = 10001007
                    myhouseMul = Number(dataHouse[56].result) * 10
                } else if (addr.toUpperCase() === dataHouse[9].result.toUpperCase()) {
                    house = 10001008
                    myhouseMul = Number(dataHouse[57].result) * 10
                } else if (addr.toUpperCase() === dataHouse[10].result.toUpperCase()) {
                    house = 10001009
                    myhouseMul = Number(dataHouse[58].result) * 10
                } else if (addr.toUpperCase() === dataHouse[11].result.toUpperCase()) {
                    house = 10001010
                    myhouseMul = Number(dataHouse[59].result) * 10
                } else if (addr.toUpperCase() === dataHouse[12].result.toUpperCase()) {
                    house = 10001011
                    myhouseMul = Number(dataHouse[60].result) * 10
                } else if (addr.toUpperCase() === dataHouse[13].result.toUpperCase()) {
                    house = 10026006
                    myhouseMul = Number(dataHouse[61].result) * 5
                } else if (addr.toUpperCase() === dataHouse[0].result.toUpperCase()) {
                    house = 10026010
                    myhouseMul = Number(dataHouse[48].result) * 5
                } else if (addr.toUpperCase() === dataHouse[14].result.toUpperCase()) {
                    house = 10002001
                    myhouseMul = Number(dataHouse[62].result) * 5
                } else if (addr.toUpperCase() === dataHouse[15].result.toUpperCase()) {
                    house = 10002002
                    myhouseMul = Number(dataHouse[63].result) * 5
                } else if (addr.toUpperCase() === dataHouse[16].result.toUpperCase()) {
                    house = 10002003
                    myhouseMul = Number(dataHouse[64].result) * 5
                } else if (addr.toUpperCase() === dataHouse[17].result.toUpperCase()) {
                    house = 10002004
                    myhouseMul = Number(dataHouse[65].result) * 5
                } else if (addr.toUpperCase() === dataHouse[18].result.toUpperCase()) {
                    house = 10002005
                    myhouseMul = Number(dataHouse[66].result) * 5
                } else if (addr.toUpperCase() === dataHouse[19].result.toUpperCase()) {
                    house = 10002006
                    myhouseMul = Number(dataHouse[67].result) * 5
                } else if (addr.toUpperCase() === dataHouse[20].result.toUpperCase()) {
                    house = 10002007
                    myhouseMul = Number(dataHouse[68].result) * 5
                } else if (addr.toUpperCase() === dataHouse[21].result.toUpperCase()) {
                    house = 10002008
                    myhouseMul = Number(dataHouse[69].result) * 5
                } else if (addr.toUpperCase() === dataHouse[22].result.toUpperCase()) {
                    house = 10002009
                    myhouseMul = Number(dataHouse[70].result) * 5
                } else if (addr.toUpperCase() === dataHouse[23].result.toUpperCase()) {
                    house = 10002010
                    myhouseMul = Number(dataHouse[71].result) * 5
                } else if (addr.toUpperCase() === dataHouse[24].result.toUpperCase()) {
                    house = 10002011
                    myhouseMul = Number(dataHouse[72].result) * 5
                } else if (addr.toUpperCase() === dataHouse[25].result.toUpperCase()) {
                    house = 10026011
                    myhouseMul = Number(dataHouse[73].result)
                } else if (addr.toUpperCase() === dataHouse[26].result.toUpperCase()) {
                    house = 10003001
                    myhouseMul = Number(dataHouse[74].result)
                } else if (addr.toUpperCase() === dataHouse[27].result.toUpperCase()) {
                    house = 10003002
                    myhouseMul = Number(dataHouse[75].result)
                } else if (addr.toUpperCase() === dataHouse[28].result.toUpperCase()) {
                    house = 10003003
                    myhouseMul = Number(dataHouse[76].result)
                } else if (addr.toUpperCase() === dataHouse[29].result.toUpperCase()) {
                    house = 10003004
                    myhouseMul = Number(dataHouse[77].result)
                } else if (addr.toUpperCase() === dataHouse[30].result.toUpperCase()) {
                    house = 10003005
                    myhouseMul = Number(dataHouse[78].result)
                } else if (addr.toUpperCase() === dataHouse[31].result.toUpperCase()) {
                    house = 10003006
                    myhouseMul = Number(dataHouse[79].result)
                } else if (addr.toUpperCase() === dataHouse[32].result.toUpperCase()) {
                    house = 10003007
                    myhouseMul = Number(dataHouse[80].result)
                } else if (addr.toUpperCase() === dataHouse[33].result.toUpperCase()) {
                    house = 10003008
                    myhouseMul = Number(dataHouse[81].result)
                } else if (addr.toUpperCase() === dataHouse[34].result.toUpperCase()) {
                    house = 10003009
                    myhouseMul = Number(dataHouse[82].result)
                } else if (addr.toUpperCase() === dataHouse[35].result.toUpperCase()) {
                    house = 10003010
                    myhouseMul = Number(dataHouse[83].result)
                } else if (addr.toUpperCase() === dataHouse[36].result.toUpperCase()) {
                    house = 10003011
                    myhouseMul = Number(dataHouse[84].result)
                } else if (addr.toUpperCase() === dataHouse[37].result.toUpperCase()) {
                    house = 10003012
                    myhouseMul = Number(dataHouse[85].result)
                } else if (addr.toUpperCase() === dataHouse[38].result.toUpperCase()) {
                    house = 10003013
                    myhouseMul = Number(dataHouse[86].result)
                } else if (addr.toUpperCase() === dataHouse[39].result.toUpperCase()) {
                    house = 10003014
                    myhouseMul = Number(dataHouse[87].result)
                } else if (addr.toUpperCase() === dataHouse[40].result.toUpperCase()) {
                    house = 10003015
                    myhouseMul = Number(dataHouse[88].result)
                } else if (addr.toUpperCase() === dataHouse[41].result.toUpperCase()) {
                    house = 10003016
                    myhouseMul = Number(dataHouse[89].result)
                } else if (addr.toUpperCase() === dataHouse[42].result.toUpperCase()) {
                    house = 10003017
                    myhouseMul = Number(dataHouse[90].result)
                } else if (addr.toUpperCase() === dataHouse[43].result.toUpperCase()) {
                    house = 10003018
                    myhouseMul = Number(dataHouse[91].result)
                } else if (addr.toUpperCase() === dataHouse[44].result.toUpperCase()) {
                    house = 10003019
                    myhouseMul = Number(dataHouse[92].result)
                } else if (addr.toUpperCase() === dataHouse[45].result.toUpperCase()) {
                    house = 10003020
                    myhouseMul = Number(dataHouse[93].result)
                } else if (addr.toUpperCase() === dataHouse[46].result.toUpperCase()) {
                    house = 10003021
                    myhouseMul = Number(dataHouse[94].result)
                } else if (addr.toUpperCase() === dataHouse[47].result.toUpperCase()) {
                    house = 10003022
                    myhouseMul = Number(dataHouse[95].result)
                }
            }

            const nftEQ = addr !== null ? await readContract(config, {
                address: dunMo,
                abi: dunMoABI,
                functionName: 'nftEquip',
                args: [addr],
                chainId: 8899
            }) : [0, 0, 0, 0, 0, 0, 0]
            const nftEQ2 = addr !== null ? await readContract(config, {
                address: dunMo,
                abi: dunMoABI,
                functionName: 'nftEquip2',
                args: [addr],
                chainId: 8899
            }) : [0, 0, 0, 0, 0, 0, 0, 0]
            /*const nftEQColMul = await readContract(config, {
                address: dunMo,
                abi: dunMoABI,
                functionName: 'nftEquipColMul',
                args: [address],
            })
            const nftEQColMul2 = await readContract(config, {
                address: dunMo,
                abi: dunMoABI,
                functionName: 'nftEQColMul2',
                args: [address],
            })*/
            const nftEQMemeSS1 = addr !== null ? await readContract(config, {
                address: dunMo,
                abi: dunMoABI,
                functionName: 'nftEquipMeme',
                args: [addr, 1],
                chainId: 8899
            }) : [0, 0, 0, 0, 0, 0, 0]
            const nftEQMemeSS2 = addr !== null ? await readContract(config, {
                address: dunMo,
                abi: dunMoABI,
                functionName: 'nftEquipMeme',
                args: [addr, 2],
                chainId: 8899
            }) : [0, 0, 0, 0, 0, 0, 0]
            const nftEQMemeSS3 = addr !== null ? await readContract(config, {
                address: dunMo,
                abi: dunMoABI,
                functionName: 'nftEquipMeme',
                args: [addr, 3],
                chainId: 8899
            }) : [0, 0, 0, 0, 0, 0, 0]

            const data = addr !== null ? await readContracts(config, {
                contracts: [
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[0])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[3])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[4])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[5])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[6])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[2])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[1])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[0])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[1])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[2])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[3])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[4])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[5])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[6])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[7])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS1[0])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS1[1])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS1[2])],
                        chainId: 8899
                    },
                    {
                        address: bbnft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS1[3])],
                        chainId: 8899
                    },
                    {
                        address: narutanft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS1[4])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS1[5])],
                        chainId: 8899
                    },
                    {
                        address: narutanft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS1[6])],
                        chainId: 8899
                    },
                    {
                        address: gasToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [addr],
                        chainId: 8899
                    },
                    {
                        address: rewardToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [addr],
                        chainId: 8899
                    },
                    {
                        address: mintStOPT_Router,
                        abi: mintStOPTABI,
                        functionName: 'userTimeStamp',
                        args: [addr, 2],
                        chainId: 8899
                    },
                    {
                        address: salonRouter,
                        abi: salonABI,
                        functionName: 'skin',
                        args: [addr, 1],
                        chainId: 8899
                    }, 
                    {
                        address: badgeClaimer,
                        abi: badgeClaimerABI,
                        functionName: 'isClaimed',
                        args: [addr, 1],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS2[0])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS2[1])],
                        chainId: 8899
                    },
                    {
                        address: narutanft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS2[2])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS2[3])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS2[4])],
                        chainId: 8899
                    },
                    {
                        address: narutanft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS2[5])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS2[6])],
                        chainId: 8899
                    },
                    {
                        address: badgeClaimer,
                        abi: badgeClaimerABI,
                        functionName: 'isClaimed',
                        args: [addr, 2],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS3[0])],
                        chainId: 8899
                    },
                    {
                        address: narutanft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS3[1])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS3[2])],
                        chainId: 8899
                    },
                    {
                        address: narutanft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS3[3])],
                        chainId: 8899
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS3[4])],
                        chainId: 8899
                    },
                    {
                        address: narutanft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS3[5])],
                        chainId: 8899
                    },
                    {
                        address: narutanft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQMemeSS3[6])],
                        chainId: 8899
                    },
                    {
                        address: badgeClaimer,
                        abi: badgeClaimerABI,
                        functionName: 'isClaimed',
                        args: [addr, 3],
                        chainId: 8899
                    },
                ],
            }) : [
                {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'},
                {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'},
                {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'},
                {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'},
                {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, 
            ]
            const rawPending = addr !== null ? await readContract(config, {
                address: dunMo,
                abi: dunMoABI,
                functionName: 'calculateRewards',
                args: [addr, ss, house],
                account: addr,
                chainId: 8899
            }) : 0
            
            let nfts = []
            let res_main_char = null
            try {
                res_main_char = data[0].status === 'success' ? await fetch(data[0].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_char = res_main_char !== null ? await res_main_char.json() : {image: null, name: null}
            const nftEQ_main_char_Img = nft_main_char.image !== null ? nft_main_char.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_char_Name = nft_main_char.name
            if (res_main_char !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[0]),
                    Name: nftEQ_main_char_Name,
                    Image: nftEQ_main_char_Img,
                    Description: nft_main_char.description,
                    Attribute: nft_main_char.attributes,
                    RewardPerSec: Number(nftEQ[0]) % 100000,
                    isStaked: true,
                    Slot: 1
                })
            }
            let res_main_acc1 = null
            try {
                res_main_acc1 = data[1].status === 'success' ? await fetch(data[1].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_acc = res_main_acc1 !== null ? await res_main_acc1.json() : {image: null, name: null}
            const nftEQ_main_acc_Img = nft_main_acc.image !== null ? nft_main_acc.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_acc_Name = nft_main_acc.name
            if (res_main_acc1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[3]),
                    Name: nftEQ_main_acc_Name,
                    Image: nftEQ_main_acc_Img,
                    Description: nft_main_acc.description,
                    Attribute: nft_main_acc.attributes,
                    RewardPerSec: Number(nftEQ[3]) % 100000,
                    isStaked: true,
                    Slot: 4
                })
            }
            let res_main_back = null
            try {
                res_main_back = data[2].status === 'success' ? await fetch(data[2].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_back = res_main_back !== null ? await res_main_back.json() : {image: null, name: null}
            const nftEQ_main_back_Img = nft_main_back.image !== null ? nft_main_back.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_back_Name = nft_main_back.name
            if (res_main_back !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[4]),
                    Name: nftEQ_main_back_Name,
                    Image: nftEQ_main_back_Img,
                    Description: nft_main_back.description,
                    Attribute: nft_main_back.attributes,
                    RewardPerSec: Number(nftEQ[4]) % 100000,
                    isStaked: true,
                    Slot: 5
                })
            }
            let res_main_shoes = null
            try {
                res_main_shoes = data[3].status === 'success' ? await fetch(data[3].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_shoes = res_main_shoes !== null ? await res_main_shoes.json() : {image: null, name: null}
            const nftEQ_main_shoes_Img = nft_main_shoes.image !== null ? nft_main_shoes.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_shoes_Name = nft_main_shoes.name
            if (res_main_shoes !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[5]),
                    Name: nftEQ_main_shoes_Name,
                    Image: nftEQ_main_shoes_Img,
                    Description: nft_main_shoes.description,
                    Attribute: nft_main_shoes.attributes,
                    RewardPerSec: Number(nftEQ[5]) % 100000,
                    isStaked: true,
                    Slot: 6
                })
            }
            let res_main_wp1 = null
            try {
                res_main_wp1 = data[4].status === 'success' ? await fetch(data[4].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_wp1 = res_main_wp1 !== null ? await res_main_wp1.json() : {image: null, name: null}
            const nftEQ_main_wp1_Img = nft_main_wp1.image !== null ? nft_main_wp1.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_wp1_Name = nft_main_wp1.name
            if (res_main_wp1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[6]),
                    Name: nftEQ_main_wp1_Name,
                    Image: nftEQ_main_wp1_Img,
                    Description: nft_main_wp1.description,
                    Attribute: nft_main_wp1.attributes,
                    RewardPerSec: Number(nftEQ[6]) % 100000,
                    isStaked: true,
                    Slot: 7
                })
            }
            let res_main_cloth = null
            try {
                res_main_cloth = data[5].status === 'success' ? await fetch(data[5].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_cloth = res_main_cloth !== null ? await res_main_cloth.json() : {image: null, name: null}
            const nftEQ_main_cloth_Img = nft_main_cloth.image !== null ? nft_main_cloth.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_cloth_Name = nft_main_cloth.name
            if (res_main_cloth !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[2]),
                    Name: nftEQ_main_cloth_Name,
                    Image: nftEQ_main_cloth_Img,
                    Description: nft_main_cloth.description,
                    Attribute: nft_main_cloth.attributes,
                    RewardPerSec: Number(nftEQ[2]) % 100000,
                    isStaked: true,
                    Slot: 3
                })
            }
            let res_main_hat = null
            try {
                res_main_hat = data[6].status === 'success' ? await fetch(data[6].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_hat = res_main_hat !== null ? await res_main_hat.json() : {image: null, name: null}
            const nftEQ_main_hat_Img = nft_main_hat.image !== null ? nft_main_hat.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_hat_Name = nft_main_hat.name
            if (res_main_hat !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[1]),
                    Name: nftEQ_main_hat_Name,
                    Image: nftEQ_main_hat_Img,
                    Description: nft_main_hat.description,
                    Attribute: nft_main_hat.attributes,
                    RewardPerSec: Number(nftEQ[1]) % 100000,
                    isStaked: true,
                    Slot: 2
                })
            }
            let res_main_wp2 = null
            try {
                res_main_wp2 = data[7].status === 'success' ? await fetch(data[7].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_wp2 = res_main_wp2 !== null ? await res_main_wp2.json() : {image: null, name: null}
            const nftEQ_main_wp2_Img = nft_main_wp2.image !== null ? nft_main_wp2.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_wp2_Name = nft_main_wp2.name
            if (res_main_wp2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[0]),
                    Name: nftEQ_main_wp2_Name,
                    Image: nftEQ_main_wp2_Img,
                    Description: nft_main_wp2.description,
                    Attribute: nft_main_wp2.attributes,
                    RewardPerSec: Number(nftEQ2[0]) % 100000,
                    isStaked: true,
                    Slot: 14
                })
            }
            let res_main_acc2 = null
            try {
                res_main_acc2 = data[8].status === 'success' ? await fetch(data[8].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_acc2 = res_main_acc2 !== null ? await res_main_acc2.json() : {image: null, name: null}
            const nftEQ_main_acc2_Img = nft_main_acc2.image !== null ? nft_main_acc2.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_acc2_Name = nft_main_acc2.name
            if (res_main_acc2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[1]),
                    Name: nftEQ_main_acc2_Name,
                    Image: nftEQ_main_acc2_Img,
                    Description: nft_main_acc2.description,
                    Attribute: nft_main_acc2.attributes,
                    RewardPerSec: Number(nftEQ2[1]) % 100000,
                    isStaked: true,
                    Slot: 9
                })
            }
            let res_main_acc3 = null
            try {
                res_main_acc3 = data[9].status === 'success' ? await fetch(data[9].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_acc3 = res_main_acc3 !== null ? await res_main_acc3.json() : {image: null, name: null}
            const nftEQ_main_acc3_Img = nft_main_acc3.image !== null ? nft_main_acc3.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_acc3_Name = nft_main_acc3.name
            if (res_main_acc3 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[2]),
                    Name: nftEQ_main_acc3_Name,
                    Image: nftEQ_main_acc3_Img,
                    Description: nft_main_acc3.description,
                    Attribute: nft_main_acc3.attributes,
                    RewardPerSec: Number(nftEQ2[2]) % 100000,
                    isStaked: true,
                    Slot: 10
                })
            }
            let res_main_acc4 = null
            try {
                res_main_acc4 = data[10].status === 'success' ? await fetch(data[10].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_acc4 = res_main_acc4 !== null ? await res_main_acc4.json() : {image: null, name: null}
            const nftEQ_main_acc4_Img = nft_main_acc4.image !== null ? nft_main_acc4.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_acc4_Name = nft_main_acc4.name
            if (res_main_acc4 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[3]),
                    Name: nftEQ_main_acc4_Name,
                    Image: nftEQ_main_acc4_Img,
                    Description: nft_main_acc4.description,
                    Attribute: nft_main_acc4.attributes,
                    RewardPerSec: Number(nftEQ2[3]) % 100000,
                    isStaked: true,
                    Slot: 11
                })
            }
            let res_main_acc5 = null
            try {
                res_main_acc5 = data[11].status === 'success' ? await fetch(data[11].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_acc5 = res_main_acc5 !== null ? await res_main_acc5.json() : {image: null, name: null}
            const nftEQ_main_acc5_Img = nft_main_acc5.image !== null ? nft_main_acc5.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_acc5_Name = nft_main_acc5.name
            if (res_main_acc5 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[4]),
                    Name: nftEQ_main_acc5_Name,
                    Image: nftEQ_main_acc5_Img,
                    Description: nft_main_acc5.description,
                    Attribute: nft_main_acc5.attributes,
                    RewardPerSec: Number(nftEQ2[4]) % 100000,
                    isStaked: true,
                    Slot: 12
                })
            }
            let res_main_acc6 = null
            try {
                res_main_acc6 = data[12].status === 'success' ? await fetch(data[12].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_acc6 = res_main_acc6 !== null ? await res_main_acc6.json() : {image: null, name: null}
            const nftEQ_main_acc6_Img = nft_main_acc6.image !== null ? nft_main_acc6.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_acc6_Name = nft_main_acc6.name
            if (res_main_acc6 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[5]),
                    Name: nftEQ_main_acc6_Name,
                    Image: nftEQ_main_acc6_Img,
                    Description: nft_main_acc6.description,
                    Attribute: nft_main_acc6.attributes,
                    RewardPerSec: Number(nftEQ2[5]) % 100000,
                    isStaked: true,
                    Slot: 13
                })
            }
            let res_main_soul = null
            try {
                res_main_soul = data[13].status === 'success' ? await fetch(data[13].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_soul = res_main_soul !== null ? await res_main_soul.json() : {image: null, name: null}
            const nftEQ_main_soul_Img = nft_main_soul.image !== null ? nft_main_soul.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_soul_Name = nft_main_soul.name
            if (res_main_soul !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[6]),
                    Name: nftEQ_main_soul_Name,
                    Image: nftEQ_main_soul_Img,
                    Description: nft_main_soul.description,
                    Attribute: nft_main_soul.attributes,
                    RewardPerSec: Number(nftEQ2[6]) % 100000,
                    isStaked: true,
                    Slot: 15
                })
            }
            let res_main_badge = null
            try {
                res_main_badge = data[14].status === 'success' ? await fetch(data[14].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_badge = res_main_badge !== null ? await res_main_badge.json() : {image: null, name: null}
            const nftEQ_main_badge_Img = nft_main_badge.image !== null ? nft_main_badge.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_badge_Name = nft_main_badge.name
            if (res_main_badge !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[7]),
                    Name: nftEQ_main_badge_Name,
                    Image: nftEQ_main_badge_Img,
                    Description: nft_main_badge.description,
                    Attribute: nft_main_badge.attributes,
                    RewardPerSec: Number(nftEQ2[7]) % 100000,
                    isStaked: true,
                    Slot: 8
                })
            }
            
            let memeSS1cmpow = 0
            let res_meme_char_ss1 = null
            try {
                res_meme_char_ss1 = data[15].status === 'success' ? await fetch(data[15].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_char_ss1 = res_meme_char_ss1 !== null ? await res_meme_char_ss1.json() : {image: null, name: null}
            const nftEQ_meme_char_ss1_Img = nft_meme_char_ss1.image !== null ? nft_meme_char_ss1.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_char_ss1_Name = nft_meme_char_ss1.name
            memeSS1cmpow += res_meme_char_ss1 !== null ? Number(nftEQMemeSS1[0]) % 100000 : 0
            if (res_meme_char_ss1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS1[0]),
                    Name: nftEQ_meme_char_ss1_Name,
                    Image: nftEQ_meme_char_ss1_Img,
                    Description: nft_meme_char_ss1.description,
                    Attribute: nft_meme_char_ss1.attributes,
                    RewardPerSec: Number(nftEQMemeSS1[0]) % 100000,
                    isStaked: true,
                    Slot: 1,
                    Ss: 1
                })
            }
            let res_meme_hat_ss1 = null
            try {
                res_meme_hat_ss1 = data[16].status === 'success' ? await fetch(data[16].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_hat_ss1 = res_meme_hat_ss1 !== null ? await res_meme_hat_ss1.json() : {image: null, name: null}
            const nftEQ_meme_hat_ss1_Img = nft_meme_hat_ss1.image !== null ? nft_meme_hat_ss1.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_hat_ss1_Name = nft_meme_hat_ss1.name
            memeSS1cmpow += res_meme_hat_ss1 !== null ? Number(nftEQMemeSS1[1]) % 100000 : 0
            if (res_meme_hat_ss1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS1[1]),
                    Name: nftEQ_meme_hat_ss1_Name,
                    Image: nftEQ_meme_hat_ss1_Img,
                    Description: nft_meme_hat_ss1.description,
                    Attribute: nft_meme_hat_ss1.attributes,
                    RewardPerSec: Number(nftEQMemeSS1[1]) % 100000,
                    isStaked: true,
                    Slot: 2,
                    Ss: 1
                })
            }
            let res_meme_cloth_ss1 = null
            try {
                res_meme_cloth_ss1 = data[17].status === 'success' ? await fetch(data[17].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_cloth_ss1 = res_meme_cloth_ss1 !== null ? await res_meme_cloth_ss1.json() : {image: null, name: null}
            const nftEQ_meme_cloth_ss1_Img = nft_meme_cloth_ss1.image !== null ? nft_meme_cloth_ss1.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_cloth_ss1_Name = nft_meme_cloth_ss1.name
            memeSS1cmpow += res_meme_cloth_ss1 !== null ? Number(nftEQMemeSS1[2]) % 100000 : 0
            if (res_meme_cloth_ss1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS1[2]),
                    Name: nftEQ_meme_cloth_ss1_Name,
                    Image: nftEQ_meme_cloth_ss1_Img,
                    Description: nft_meme_cloth_ss1.description,
                    Attribute: nft_meme_cloth_ss1.attributes,
                    RewardPerSec: Number(nftEQMemeSS1[2]) % 100000,
                    isStaked: true,
                    Slot: 3,
                    Ss: 1
                })
            }
            let res_meme_acc_ss1 = null
            try {
                res_meme_acc_ss1 = data[18].status === 'success' ? await fetch(data[18].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_acc_ss1 = res_meme_acc_ss1 !== null ? await res_meme_acc_ss1.json() : {image: null, name: null}
            const nftEQ_meme_acc_ss1_Img = nft_meme_acc_ss1.image !== null ? nft_meme_acc_ss1.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            memeSS1cmpow += res_meme_acc_ss1 !== null ? Number(nftEQMemeSS1[3]) % 100000 : 0
            if (res_meme_acc_ss1 !== null) {
                nfts.push({
                    Col: 3,
                    Id: Number(nftEQMemeSS1[3]),
                    Name: nft_meme_acc_ss1.name,
                    Image: nftEQ_meme_acc_ss1_Img,
                    Description: nft_meme_acc_ss1.description,
                    Attribute: nft_meme_acc_ss1.attributes,
                    RewardPerSec: Number(nftEQMemeSS1[3]) % 100000,
                    isStaked: true,
                    Slot: 4,
                    Ss: 1
                })
            }
            let res_meme_back_ss1 = null
            try {
                res_meme_back_ss1 = data[19].status === 'success' ? await fetch(data[19].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_back_ss1 = res_meme_back_ss1 !== null ? await res_meme_back_ss1.json() : {image: null, name: null}
            const nftEQ_meme_back_ss1_Img = nft_meme_back_ss1.image !== null ? nft_meme_back_ss1.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_back_ss1_Name = nft_meme_back_ss1.name
            memeSS1cmpow += res_meme_back_ss1 !== null ? Number(nftEQMemeSS1[4]) % 100000 : 0
            if (res_meme_back_ss1 !== null) {
                nfts.push({
                    Col: 2,
                    Id: Number(nftEQMemeSS1[4]),
                    Name: nftEQ_meme_back_ss1_Name,
                    Image: nftEQ_meme_back_ss1_Img,
                    Description: nft_meme_back_ss1.description,
                    Attribute: nft_meme_back_ss1.attributes,
                    RewardPerSec: Number(nftEQMemeSS1[4]) % 100000,
                    isStaked: true,
                    Slot: 5,
                    Ss: 1
                })
            }
            let res_meme_shoes_ss1 = null
            try {
                res_meme_shoes_ss1 = data[20].status === 'success' ? await fetch(data[20].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_shoes_ss1 = res_meme_shoes_ss1 !== null ? await res_meme_shoes_ss1.json() : {image: null, name: null}
            const nftEQ_meme_shoes_ss1_Img = nft_meme_shoes_ss1.image !== null ? nft_meme_shoes_ss1.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_shoes_ss1_Name = nft_meme_shoes_ss1.name
            memeSS1cmpow += res_meme_back_ss1 !== null ? Number(nftEQMemeSS1[5]) % 100000 : 0
            if (res_meme_back_ss1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS1[5]),
                    Name: nftEQ_meme_shoes_ss1_Name,
                    Image: nftEQ_meme_shoes_ss1_Img,
                    Description: nft_meme_shoes_ss1.description,
                    Attribute: nft_meme_shoes_ss1.attributes,
                    RewardPerSec: Number(nftEQMemeSS1[5]) % 100000,
                    isStaked: true,
                    Slot: 6,
                    Ss: 1
                })
            }
            let res_meme_weapon_ss1 = null
            try {
                res_meme_weapon_ss1 = data[21].status === 'success' ? await fetch(data[21].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_weapon_ss1 = res_meme_weapon_ss1 !== null ? await res_meme_weapon_ss1.json() : {image: null, name: null}
            const nftEQ_meme_weapon_ss1_Img = nft_meme_weapon_ss1.image !== null ? nft_meme_weapon_ss1.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_weapon_ss1_Name = nft_meme_weapon_ss1.name
            memeSS1cmpow += res_meme_weapon_ss1 !== null ? Number(nftEQMemeSS1[6]) % 100000 : 0
            if (res_meme_weapon_ss1 !== null) {
                nfts.push({
                    Col: 2,
                    Id: Number(nftEQMemeSS1[6]),
                    Name: nftEQ_meme_weapon_ss1_Name,
                    Image: nftEQ_meme_weapon_ss1_Img,
                    Description: nft_meme_weapon_ss1.description,
                    Attribute: nft_meme_weapon_ss1.attributes,
                    RewardPerSec: Number(nftEQMemeSS1[6]) % 100000,
                    isStaked: true,
                    Slot: 7,
                    Ss: 1
                })
            }

            let memeSS2cmpow = 0
            let res_meme_char_ss2 = null
            try {
                res_meme_char_ss2 = data[27].status === 'success' ? await fetch(data[27].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_char_ss2 = res_meme_char_ss2 !== null ? await res_meme_char_ss2.json() : {image: null, name: null}
            const nftEQ_meme_char_ss2_Img = nft_meme_char_ss2.image !== null ? nft_meme_char_ss2.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_char_ss2_Name = nft_meme_char_ss2.name
            memeSS2cmpow += res_meme_char_ss2 !== null ? Number(nftEQMemeSS2[0]) % 100000 : 0
            if (res_meme_char_ss2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS2[0]),
                    Name: nftEQ_meme_char_ss2_Name,
                    Image: nftEQ_meme_char_ss2_Img,
                    Description: nft_meme_char_ss2.description,
                    Attribute: nft_meme_char_ss2.attributes,
                    RewardPerSec: Number(nftEQMemeSS2[0]) % 100000,
                    isStaked: true,
                    Slot: 1,
                    Ss: 2
                })
            }
            let res_meme_hat_ss2 = null
            try {
                res_meme_hat_ss2 = data[28].status === 'success' ? await fetch(data[28].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_hat_ss2 = res_meme_hat_ss2 !== null ? await res_meme_hat_ss2.json() : {image: null, name: null}
            const nftEQ_meme_hat_ss2_Img = nft_meme_hat_ss2.image !== null ? nft_meme_hat_ss2.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_hat_ss2_Name = nft_meme_hat_ss2.name
            memeSS2cmpow += res_meme_hat_ss2 !== null ? Number(nftEQMemeSS2[1]) % 100000 : 0
            if (res_meme_hat_ss2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS2[1]),
                    Name: nftEQ_meme_hat_ss2_Name,
                    Image: nftEQ_meme_hat_ss2_Img,
                    Description: nft_meme_hat_ss2.description,
                    Attribute: nft_meme_hat_ss2.attributes,
                    RewardPerSec: Number(nftEQMemeSS2[1]) % 100000,
                    isStaked: true,
                    Slot: 2,
                    Ss: 2
                })
            }
            let res_meme_cloth_ss2 = null
            try {
                res_meme_cloth_ss2 = data[29].status === 'success' ? await fetch(data[29].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_cloth_ss2 = res_meme_cloth_ss2 !== null ? await res_meme_cloth_ss2.json() : {image: null, name: null}
            const nftEQ_meme_cloth_ss2_Img = nft_meme_cloth_ss2.image !== null ? nft_meme_cloth_ss2.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_cloth_ss2_Name = nft_meme_cloth_ss2.name
            memeSS2cmpow += res_meme_cloth_ss2 !== null ? Number(nftEQMemeSS2[2]) % 100000 : 0
            if (res_meme_cloth_ss2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS2[2]),
                    Name: nftEQ_meme_cloth_ss2_Name,
                    Image: nftEQ_meme_cloth_ss2_Img,
                    Description: nft_meme_cloth_ss2.description,
                    Attribute: nft_meme_cloth_ss2.attributes,
                    RewardPerSec: Number(nftEQMemeSS2[2]) % 100000,
                    isStaked: true,
                    Slot: 3,
                    Ss: 2
                })
            }
            let res_meme_acc_ss2 = null
            try {
                res_meme_acc_ss2 = data[30].status === 'success' ? await fetch(data[30].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_acc_ss2 = res_meme_acc_ss2 !== null ? await res_meme_acc_ss2.json() : {image: null, name: null}
            const nftEQ_meme_acc_ss2_Name = nft_meme_acc_ss2.name
            const nftEQ_meme_acc_ss2_Img = nft_meme_acc_ss2.image !== null ? nft_meme_acc_ss2.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            memeSS2cmpow += res_meme_acc_ss2 !== null ? Number(nftEQMemeSS2[3]) % 100000 : 0
            if (res_meme_acc_ss2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS2[3]),
                    Name: nftEQ_meme_acc_ss2_Name,
                    Image: nftEQ_meme_acc_ss2_Img,
                    Description: nft_meme_acc_ss2.description,
                    Attribute: nft_meme_acc_ss2.attributes,
                    RewardPerSec: Number(nftEQMemeSS2[3]) % 100000,
                    isStaked: true,
                    Slot: 4,
                    Ss: 2
                })
            }
            let res_meme_back_ss2 = null
            try {
                res_meme_back_ss2 = data[31].status === 'success' ? await fetch(data[31].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_back_ss2 = res_meme_back_ss2 !== null ? await res_meme_back_ss2.json() : {image: null, name: null}
            const nftEQ_meme_back_ss2_Img = nft_meme_back_ss2.image !== null ? nft_meme_back_ss2.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_back_ss2_Name = nft_meme_back_ss2.name
            memeSS2cmpow += res_meme_back_ss2 !== null ? Number(nftEQMemeSS2[4]) % 100000 : 0
            if (res_meme_back_ss2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS2[4]),
                    Name: nftEQ_meme_back_ss2_Name,
                    Image: nftEQ_meme_back_ss2_Img,
                    Description: nft_meme_back_ss2.description,
                    Attribute: nft_meme_back_ss2.attributes,
                    RewardPerSec: Number(nftEQMemeSS2[4]) % 100000,
                    isStaked: true,
                    Slot: 5,
                    Ss: 2
                })
            }
            let res_meme_shoes_ss2 = null
            try {
                res_meme_shoes_ss2 = data[32].status === 'success' ? await fetch(data[32].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_shoes_ss2 = res_meme_shoes_ss2 !== null ? await res_meme_shoes_ss2.json() : {image: null, name: null}
            const nftEQ_meme_shoes_ss2_Img = nft_meme_shoes_ss2.image !== null ? nft_meme_shoes_ss2.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_shoes_ss2_Name = nft_meme_shoes_ss2.name
            memeSS2cmpow += res_meme_back_ss2 !== null ? Number(nftEQMemeSS2[5]) % 100000 : 0
            if (res_meme_back_ss2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS2[5]),
                    Name: nftEQ_meme_shoes_ss2_Name,
                    Image: nftEQ_meme_shoes_ss2_Img,
                    Description: nft_meme_shoes_ss2.description,
                    Attribute: nft_meme_shoes_ss2.attributes,
                    RewardPerSec: Number(nftEQMemeSS2[5]) % 100000,
                    isStaked: true,
                    Slot: 6,
                    Ss: 2
                })
            }
            let res_meme_weapon_ss2 = null
            try {
                res_meme_weapon_ss2 = data[33].status === 'success' ? await fetch(data[33].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_weapon_ss2 = res_meme_weapon_ss2 !== null ? await res_meme_weapon_ss2.json() : {image: null, name: null}
            const nftEQ_meme_weapon_ss2_Img = nft_meme_weapon_ss2.image !== null ? nft_meme_weapon_ss2.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_weapon_ss2_Name = nft_meme_weapon_ss2.name
            memeSS2cmpow += res_meme_weapon_ss2 !== null ? Number(nftEQMemeSS2[6]) % 100000 : 0
            if (res_meme_weapon_ss2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS2[6]),
                    Name: nftEQ_meme_weapon_ss2_Name,
                    Image: nftEQ_meme_weapon_ss2_Img,
                    Description: nft_meme_weapon_ss2.description,
                    Attribute: nft_meme_weapon_ss2.attributes,
                    RewardPerSec: Number(nftEQMemeSS2[6]) % 100000,
                    isStaked: true,
                    Slot: 7,
                    Ss: 2
                })
            }

            let memeSS3cmpow = 0
            let res_meme_char_ss3 = null
            try {
                res_meme_char_ss3 = data[35].status === 'success' ? await fetch(data[35].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_char_ss3 = res_meme_char_ss3 !== null ? await res_meme_char_ss3.json() : {image: null, name: null}
            const nftEQ_meme_char_ss3_Img = nft_meme_char_ss3.image !== null ? nft_meme_char_ss3.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_char_ss3_Name = nft_meme_char_ss3.name
            memeSS3cmpow += res_meme_char_ss3 !== null ? Number(nftEQMemeSS3[0]) % 100000 : 0
            if (res_meme_char_ss3 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS3[0]),
                    Name: nftEQ_meme_char_ss3_Name,
                    Image: nftEQ_meme_char_ss3_Img,
                    Description: nft_meme_char_ss3.description,
                    Attribute: nft_meme_char_ss3.attributes,
                    RewardPerSec: Number(nftEQMemeSS3[0]) % 100000,
                    isStaked: true,
                    Slot: 1,
                    Ss: 3
                })
            }
            let res_meme_hat_ss3 = null
            try {
                res_meme_hat_ss3 = data[36].status === 'success' ? await fetch(data[36].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_hat_ss3 = res_meme_hat_ss3 !== null ? await res_meme_hat_ss3.json() : {image: null, name: null}
            const nftEQ_meme_hat_ss3_Img = nft_meme_hat_ss3.image !== null ? nft_meme_hat_ss3.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_hat_ss3_Name = nft_meme_hat_ss3.name
            memeSS3cmpow += res_meme_hat_ss3 !== null ? Number(nftEQMemeSS3[1]) % 100000 : 0
            if (res_meme_hat_ss3 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS3[1]),
                    Name: nftEQ_meme_hat_ss3_Name,
                    Image: nftEQ_meme_hat_ss3_Img,
                    Description: nft_meme_hat_ss3.description,
                    Attribute: nft_meme_hat_ss3.attributes,
                    RewardPerSec: Number(nftEQMemeSS3[1]) % 100000,
                    isStaked: true,
                    Slot: 2,
                    Ss: 3
                })
            }
            let res_meme_cloth_ss3 = null
            try {
                res_meme_cloth_ss3 = data[37].status === 'success' ? await fetch(data[37].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_cloth_ss3 = res_meme_cloth_ss3 !== null ? await res_meme_cloth_ss3.json() : {image: null, name: null}
            const nftEQ_meme_cloth_ss3_Img = nft_meme_cloth_ss3.image !== null ? nft_meme_cloth_ss3.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_cloth_ss3_Name = nft_meme_cloth_ss3.name
            memeSS3cmpow += res_meme_cloth_ss3 !== null ? Number(nftEQMemeSS3[2]) % 100000 : 0
            if (res_meme_cloth_ss3 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS3[2]),
                    Name: nftEQ_meme_cloth_ss3_Name,
                    Image: nftEQ_meme_cloth_ss3_Img,
                    Description: nft_meme_cloth_ss3.description,
                    Attribute: nft_meme_cloth_ss3.attributes,
                    RewardPerSec: Number(nftEQMemeSS3[2]) % 100000,
                    isStaked: true,
                    Slot: 3,
                    Ss: 3
                })
            }
            let res_meme_acc_ss3 = null
            try {
                res_meme_acc_ss3 = data[38].status === 'success' ? await fetch(data[38].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_acc_ss3 = res_meme_acc_ss3 !== null ? await res_meme_acc_ss3.json() : {image: null, name: null}
            const nftEQ_meme_acc_ss3_Name = nft_meme_acc_ss3.name
            const nftEQ_meme_acc_ss3_Img = nft_meme_acc_ss3.image !== null ? nft_meme_acc_ss3.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            memeSS3cmpow += res_meme_acc_ss3 !== null ? Number(nftEQMemeSS3[3]) % 100000 : 0
            if (res_meme_acc_ss3 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS3[3]),
                    Name: nftEQ_meme_acc_ss3_Name,
                    Image: nftEQ_meme_acc_ss3_Img,
                    Description: nft_meme_acc_ss3.description,
                    Attribute: nft_meme_acc_ss3.attributes,
                    RewardPerSec: Number(nftEQMemeSS3[3]) % 100000,
                    isStaked: true,
                    Slot: 4,
                    Ss: 3
                })
            }
            let res_meme_back_ss3 = null
            try {
                res_meme_back_ss3 = data[39].status === 'success' ? await fetch(data[39].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_back_ss3 = res_meme_back_ss3 !== null ? await res_meme_back_ss3.json() : {image: null, name: null}
            const nftEQ_meme_back_ss3_Img = nft_meme_back_ss3.image !== null ? nft_meme_back_ss3.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_back_ss3_Name = nft_meme_back_ss3.name
            memeSS3cmpow += res_meme_back_ss3 !== null ? Number(nftEQMemeSS3[4]) % 100000 : 0
            if (res_meme_back_ss3 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS3[4]),
                    Name: nftEQ_meme_back_ss3_Name,
                    Image: nftEQ_meme_back_ss3_Img,
                    Description: nft_meme_back_ss3.description,
                    Attribute: nft_meme_back_ss3.attributes,
                    RewardPerSec: Number(nftEQMemeSS3[4]) % 100000,
                    isStaked: true,
                    Slot: 5,
                    Ss: 3
                })
            }
            let res_meme_shoes_ss3 = null
            try {
                res_meme_shoes_ss3 = data[40].status === 'success' ? await fetch(data[40].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_shoes_ss3 = res_meme_shoes_ss3 !== null ? await res_meme_shoes_ss3.json() : {image: null, name: null}
            const nftEQ_meme_shoes_ss3_Img = nft_meme_shoes_ss3.image !== null ? nft_meme_shoes_ss3.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_shoes_ss3_Name = nft_meme_shoes_ss3.name
            memeSS3cmpow += res_meme_back_ss3 !== null ? Number(nftEQMemeSS3[5]) % 100000 : 0
            if (res_meme_back_ss3 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS3[5]),
                    Name: nftEQ_meme_shoes_ss3_Name,
                    Image: nftEQ_meme_shoes_ss3_Img,
                    Description: nft_meme_shoes_ss3.description,
                    Attribute: nft_meme_shoes_ss3.attributes,
                    RewardPerSec: Number(nftEQMemeSS3[5]) % 100000,
                    isStaked: true,
                    Slot: 6,
                    Ss: 3
                })
            }
            let res_meme_weapon_ss3 = null
            try {
                res_meme_weapon_ss3 = data[41].status === 'success' ? await fetch(data[41].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_meme_weapon_ss3 = res_meme_weapon_ss3 !== null ? await res_meme_weapon_ss3.json() : {image: null, name: null}
            const nftEQ_meme_weapon_ss3_Img = nft_meme_weapon_ss3.image !== null ? nft_meme_weapon_ss3.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_meme_weapon_ss3_Name = nft_meme_weapon_ss3.name
            memeSS3cmpow += res_meme_weapon_ss3 !== null ? Number(nftEQMemeSS3[6]) % 100000 : 0
            if (res_meme_weapon_ss3 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQMemeSS3[6]),
                    Name: nftEQ_meme_weapon_ss3_Name,
                    Image: nftEQ_meme_weapon_ss3_Img,
                    Description: nft_meme_weapon_ss3.description,
                    Attribute: nft_meme_weapon_ss3.attributes,
                    RewardPerSec: Number(nftEQMemeSS3[6]) % 100000,
                    isStaked: true,
                    Slot: 7,
                    Ss: 3
                })
            }

            const nftStatus = addr !== null ? await readContract(config, {
                address: dunMo,
                abi: dunMoABI,
                functionName: 'nftStatus',
                args: [addr],
                chainId: 8899
            }) : [0, 0, 0]

            const allPow = Number(nftStatus[0])
            const refuelAt = Number(nftStatus[1])
            const isStaked = nftStatus[2]

            const gasBal = data[22].result
            const rewardBal = data[23].result
            const stOPTClaim = isStaked ? data[24].result : 0
            const skinslot1 = data[25].result
            const isbadgeclaimed = data[26].result
            const rewardpending = isStaked ? rawPending : 0
            const isbadgeclaimed2 = data[34].result
            const isbadgeclaimed3 = data[42].result
            
            let walletRemoveDup = []
            if (chain !== undefined && chain.id === 8899 && addr !== null) {
                const walletFilter = await cmdaonftSC.filters.Transfer(null, addr, null)
                const walletEvent = await cmdaonftSC.queryFilter(walletFilter, 335000, "latest")
                const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            }
            const data2 = addr !== null ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 8899
                    }
                ))
            }) : null
            let yournftwallet = []
            for (let i = 0; i <= walletRemoveDup.length - 1 && addr !== null; i++) {
                if (data2[i].result.toUpperCase() === addr.toUpperCase()) {
                    yournftwallet.push({Id: String(walletRemoveDup[i])})
                }
            }
            const data3 = addr !== null ? await readContracts(config, {
                contracts: yournftwallet.map((item) => (
                    {
                        address: cmdaonft,
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

            let walletRemoveDup2 = []
            if (chain !== undefined && chain.id === 8899 && addr !== null) {
                const walletFilter2 = await narutanftSC.filters.Transfer(null, addr, null)
                const walletEvent2 = await narutanftSC.queryFilter(walletFilter2, 2852393, "latest")
                const walletMap2 = await Promise.all(walletEvent2.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup2 = walletMap2.filter((obj, index) => walletMap2.indexOf(obj) === index)
            }
            const data4 = addr !== null ? await readContracts(config, {
                contracts: walletRemoveDup2.map((item) => (
                    {
                        address: narutanft,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 8899
                    }
                ))
            }) : null
            let yournftwallet2 = []
            for (let i = 0; i <= walletRemoveDup2.length - 1 && addr !== null; i++) {
                if (data4[i].result.toUpperCase() === addr.toUpperCase()) {
                    yournftwallet2.push({Id: String(walletRemoveDup2[i])})
                }
            }
            const data5 = addr !== null ? await readContracts(config, {
                contracts: yournftwallet2.map((item) => (
                    {
                        address: narutanft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 8899
                    }
                ))
            }) : null
            for (let i = 0; i <= yournftwallet2.length - 1; i++) {
                const nftipfs = data5[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    nft = await response.json()
                } catch {}
                nfts.push({
                    Col: 2,
                    Id: yournftwallet2[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet2[i].Id.slice(-5)),
                    isStaked: false
                })
            }

            let walletRemoveDup3 = []
            if (chain !== undefined && chain.id === 8899 && addr !== null) {
                const walletFilter3 = await bbnftSC.filters.Transfer(null, addr, null)
                const walletEvent3 = await bbnftSC.queryFilter(walletFilter3, 3478177, "latest")
                const walletMap3 = await Promise.all(walletEvent3.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup3 = walletMap3.filter((obj, index) => walletMap3.indexOf(obj) === index)
            }
            const data6 = addr !== null ? await readContracts(config, {
                contracts: walletRemoveDup3.map((item) => (
                    {
                        address: bbnft,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 8899
                    }
                ))
            }) : null
            let yournftwallet3 = []
            for (let i = 0; i <= walletRemoveDup3.length - 1 && addr !== null; i++) {
                if (data6[i].result.toUpperCase() === addr.toUpperCase()) {
                    yournftwallet3.push({Id: String(walletRemoveDup3[i])})
                }
            }
            const data7 = addr !== null ? await readContracts(config, {
                contracts: yournftwallet3.map((item) => (
                    {
                        address: bbnft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 8899
                    }
                ))
            }) : null
            for (let i = 0; i <= yournftwallet3.length - 1; i++) {
                const nftipfs = data7[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    nft = await response.json()
                } catch {}
                nfts.push({
                    Col: 3,
                    Id: yournftwallet3[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet3[i].Id.slice(-5)),
                    isStaked: false
                })
            }
            if (nfts.length === 0) { nfts.push(null) }
            
            return [
                nfts, 
                nftEQ_main_char_Img, nftEQ_main_char_Name, nftEQ_main_acc_Img, nftEQ_main_acc_Name, nftEQ_main_back_Img, nftEQ_main_back_Name, nftEQ_main_shoes_Img, nftEQ_main_shoes_Name, nftEQ_main_wp1_Img, nftEQ_main_wp1_Name, nftEQ_main_cloth_Img, nftEQ_main_cloth_Name, nftEQ_main_hat_Img, nftEQ_main_hat_Name,
                nftEQ_main_wp2_Img, nftEQ_main_wp2_Name, nftEQ_main_acc2_Img, nftEQ_main_acc2_Name, nftEQ_main_acc3_Img, nftEQ_main_acc3_Name, nftEQ_main_acc4_Img, nftEQ_main_acc4_Name, nftEQ_main_acc5_Img, nftEQ_main_acc5_Name, nftEQ_main_acc6_Img, nftEQ_main_acc6_Name, nftEQ_main_soul_Img, nftEQ_main_soul_Name, nftEQ_main_badge_Img, nftEQ_main_badge_Name,
                nftEQ_meme_char_ss1_Img, nftEQ_meme_char_ss1_Name, nftEQ_meme_hat_ss1_Img, nftEQ_meme_hat_ss1_Name, nftEQ_meme_cloth_ss1_Img, nftEQ_meme_cloth_ss1_Name, nftEQ_meme_acc_ss1_Img, nftEQ_meme_back_ss1_Img, nftEQ_meme_back_ss1_Name, nftEQ_meme_shoes_ss1_Img, nftEQ_meme_shoes_ss1_Name, nftEQ_meme_weapon_ss1_Img, nftEQ_meme_weapon_ss1_Name,
                allPow, isStaked, refuelAt, rewardpending, stOPTClaim, gasBal, rewardBal, skinslot1, myhouseMul, house, memeSS1cmpow, isbadgeclaimed,
                nftEQ_meme_char_ss2_Img, nftEQ_meme_char_ss2_Name, nftEQ_meme_hat_ss2_Img, nftEQ_meme_hat_ss2_Name, nftEQ_meme_cloth_ss2_Img, nftEQ_meme_cloth_ss2_Name, nftEQ_meme_acc_ss2_Img, nftEQ_meme_acc_ss2_Name, nftEQ_meme_back_ss2_Img, nftEQ_meme_back_ss2_Name, nftEQ_meme_shoes_ss2_Img, nftEQ_meme_shoes_ss2_Name, nftEQ_meme_weapon_ss2_Img, nftEQ_meme_weapon_ss2_Name, memeSS2cmpow, isbadgeclaimed2,
                nftEQ_meme_char_ss3_Img, nftEQ_meme_char_ss3_Name, nftEQ_meme_hat_ss3_Img, nftEQ_meme_hat_ss3_Name, nftEQ_meme_cloth_ss3_Img, nftEQ_meme_cloth_ss3_Name, nftEQ_meme_acc_ss3_Img, nftEQ_meme_acc_ss3_Name, nftEQ_meme_back_ss3_Img, nftEQ_meme_back_ss3_Name, nftEQ_meme_shoes_ss3_Img, nftEQ_meme_shoes_ss3_Name, nftEQ_meme_weapon_ss3_Img, nftEQ_meme_weapon_ss3_Name, memeSS3cmpow, isbadgeclaimed3,
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
            setNft(result[0])

            setCharacterSlot(result[1])
            if (result[2] !== null && result[2].slice(-1) === "]" && result[2].slice(-3, -2) === ".") {
                setCharacterSlotLevel(result[2].slice(-2, -1))
            } else if (result[2] !== null && result[2].slice(-1) === "]" && result[2].slice(-4, -3) === ".") {
                setCharacterSlotLevel(result[2].slice(-3, -1))
            } else {
                setCharacterSlotLevel(null)
            }
            result[2] !== null && result[2].slice(0, 7) === "SAPIENS" ? setIsOp(true) : setIsOp(false)
            setAccSlot(result[3])
            result[4] !== null && result[4].slice(-2, -1) === "+" ? setAccSlotLevel(result[4].slice(-1)) : setAccSlotLevel(null)
            setBackSlot(result[5])
            result[6] !== null && result[6].slice(-2, -1) === "+" ? setBackSlotLevel(result[6].slice(-1)) : setBackSlotLevel(null)
            setShoesSlot(result[7])
            result[8] !== null && result[8].slice(-2, -1) === "+" ? setShoesSlotLevel(result[8].slice(-1)) : setShoesSlotLevel(null)
            setWeaponSlot(result[9])
            result[10] !== null && result[10].slice(-2, -1) === "+" ? setWpSlotLevel(result[10].slice(-1)) : setWpSlotLevel(null)
            setClothSlot(result[11])
            result[12] !== null && result[12].slice(-2, -1) === "+" ? setClothSlotLevel(result[12].slice(-1)) : setClothSlotLevel(null)
            setHatSlot(result[13])
            result[14] !== null && result[14].slice(-2, -1) === "+" ? setHatSlotLevel(result[14].slice(-1)) : setHatSlotLevel(null)
            setWeapon2Slot(result[15])
            result[16] !== null && result[16].slice(-2, -1) === "+" ? setWpSlot2Level(result[16].slice(-1)) : setWpSlot2Level(null)
            setAccSlot2(result[17])
            result[18] !== null && result[18].slice(-2, -1) === "+" ? setAccSlot2Level(result[18].slice(-1)) : setAccSlot2Level(null)
            setAccSlot3(result[19])
            result[20] !== null && result[20].slice(-2, -1) === "+" ? setAccSlot3Level(result[20].slice(-1)) : setAccSlot3Level(null)
            setAccSlot4(result[21])
            result[22] !== null && result[22].slice(-2, -1) === "+" ? setAccSlot4Level(result[22].slice(-1)) : setAccSlot4Level(null)
            setAccSlot5(result[23])
            result[24] !== null && result[24].slice(-2, -1) === "+" ? setAccSlot5Level(result[24].slice(-1)) : setAccSlot5Level(null)
            setAccSlot6(result[25])
            result[26] !== null && result[26].slice(-2, -1) === "+" ? setAccSlot6Level(result[26].slice(-1)) : setAccSlot6Level(null)
            setSoulSlot(result[27])
            result[28] !== null && result[28].slice(-2, -1) === "+" ? setSoulSlotLevel(result[28].slice(-1)) : setSoulSlotLevel(null)
            setBadgeSlot(result[29])
            result[30] !== null && result[30].slice(-2, -1) === "+" ? setBadgeSlotLevel(result[30].slice(-1)) : setBadgeSlotLevel(null)

            setSs1CharacterSlot(result[31])
            if (result[32] !== null && result[32].slice(-1) === "]" && result[32].slice(-3, -2) === ".") {
                setSs1CharacterSlotLevel(result[32].slice(-2, -1))
            } else if (result[32] !== null && result[32].slice(-1) === "]" && result[32].slice(-4, -3) === ".") {
                setSs1CharacterSlotLevel(result[32].slice(-3, -1))
            } else {
                setSs1CharacterSlotLevel(null)
            }
            setSs1HatSlot(result[33])
            result[34] !== null && result[34].slice(-2, -1) === "+" ? setSs1HatSlotLevel(result[34].slice(-1)) : setSs1HatSlotLevel(null)
            setSs1ClothSlot(result[35])
            result[36] !== null && result[36].slice(-2, -1) === "+" ? setSs1ClothSlotLevel(result[36].slice(-1)) : setSs1ClothSlotLevel(null)
            setSs1AccSlot(result[37])
            setSs1BackSlot(result[38])
            result[39] !== null && result[39].slice(-2, -1) === "+" ? setSs1BackSlotLevel(result[39].slice(-1)) : setSs1BackSlotLevel(null)
            setSs1ShoesSlot(result[40])
            result[41] !== null && result[41].slice(-2, -1) === "+" ? setSs1ShoesSlotLevel(result[41].slice(-1)) : setSs1ShoesSlotLevel(null)
            setSs1WeaponSlot(result[42])
            result[43] !== null && result[43].slice(-2, -1) === "+" ? setSs1WpSlotLevel(result[43].slice(-1)) : setSs1WpSlotLevel(null)
            
            setAllPower(result[44])
            setIsStakeNow(result[45])
            const gasOut = new Date((Number(result[46]) * 1000) + (7 * 86400 * 1000))
            result[46] !== 0 ?
                setTimeToRunout(gasOut.toLocaleString('es-CL')) :
                setTimeToRunout(null)
            result[46] !== 0 && Date.now() - (Number(result[46]) * 1000) > (7 * 86400 * 1000) ? setIsRunout(true) : setIsRunout(false)
            setRewardPending(ethers.utils.formatEther(String(result[47])))

            setLastedSTOPT(Number(result[46]) * 1000 === Number(result[48]) * 1000)
            setGasBalance(ethers.utils.formatEther(String(result[49])))
            setRewardBalance(ethers.utils.formatEther(String(result[50])))
            setSkinSlot1(result[51])
            setLandBonus(result[52])
            setMyhouse(result[53])
            setYourSS1CMPOW(result[54])
            setIsClaimBadge(result[55])

            setSs2CharacterSlot(result[56])
            if (result[57] !== null && result[57].slice(-1) === "]" && result[57].slice(-3, -2) === ".") {
                setSs2CharacterSlotLevel(result[57].slice(-2, -1))
            } else if (result[57] !== null && result[57].slice(-1) === "]" && result[57].slice(-4, -3) === ".") {
                setSs2CharacterSlotLevel(result[57].slice(-3, -1))
            } else {
                setSs2CharacterSlotLevel(null)
            }
            setSs2HatSlot(result[58])
            result[59] !== null && result[59].slice(-2, -1) === "+" ? setSs2HatSlotLevel(result[59].slice(-1)) : setSs2HatSlotLevel(null)
            setSs2ClothSlot(result[60])
            result[61] !== null && result[61].slice(-2, -1) === "+" ? setSs2ClothSlotLevel(result[61].slice(-1)) : setSs2ClothSlotLevel(null)
            setSs2AccSlot(result[62])
            result[63] !== null && result[63].slice(-2, -1) === "+" ? setSs2AccSlotLevel(result[63].slice(-1)) : setSs2AccSlotLevel(null)
            setSs2BackSlot(result[64])
            result[65] !== null && result[65].slice(-2, -1) === "+" ? setSs2BackSlotLevel(result[65].slice(-1)) : setSs2BackSlotLevel(null)
            setSs2ShoesSlot(result[66])
            result[67] !== null && result[67].slice(-2, -1) === "+" ? setSs2ShoesSlotLevel(result[67].slice(-1)) : setSs2ShoesSlotLevel(null)
            setSs2WeaponSlot(result[68])
            result[69] !== null && result[69].slice(-2, -1) === "+" ? setSs2WpSlotLevel(result[69].slice(-1)) : setSs2WpSlotLevel(null)
            setYourSS2CMPOW(result[70])
            setIsClaimBadge2(result[71])

            setSs3CharacterSlot(result[72])
            if (result[73] !== null && result[73].slice(-1) === "]" && result[73].slice(-3, -2) === ".") {
                setSs3CharacterSlotLevel(result[73].slice(-2, -1))
            } else if (result[73] !== null && result[73].slice(-1) === "]" && result[73].slice(-4, -3) === ".") {
                setSs3CharacterSlotLevel(result[73].slice(-3, -1))
            } else {
                setSs3CharacterSlotLevel(null)
            }
            setSs3HatSlot(result[74])
            result[75] !== null && result[75].slice(-2, -1) === "+" ? setSs3HatSlotLevel(result[75].slice(-1)) : setSs3HatSlotLevel(null)
            setSs3ClothSlot(result[76])
            result[77] !== null && result[77].slice(-2, -1) === "+" ? setSs3ClothSlotLevel(result[77].slice(-1)) : setSs3ClothSlotLevel(null)
            setSs3AccSlot(result[78])
            result[79] !== null && result[79].slice(-2, -1) === "+" ? setSs3AccSlotLevel(result[79].slice(-1)) : setSs3AccSlotLevel(null)
            setSs3BackSlot(result[80])
            result[81] !== null && result[81].slice(-2, -1) === "+" ? setSs3BackSlotLevel(result[81].slice(-1)) : setSs3BackSlotLevel(null)
            setSs3ShoesSlot(result[82])
            result[83] !== null && result[83].slice(-2, -1) === "+" ? setSs3ShoesSlotLevel(result[83].slice(-1)) : setSs3ShoesSlotLevel(null)
            setSs3WeaponSlot(result[84])
            result[85] !== null && result[85].slice(-2, -1) === "+" ? setSs3WpSlotLevel(result[85].slice(-1)) : setSs3WpSlotLevel(null)
            setYourSS3CMPOW(result[86])
            setIsClaimBadge3(result[87])
        })

    }, [config, address, addr, intrasubModetext, navigate, chain, txupdate, erc721Abi, erc20Abi, dunMoABI, mintStOPTABI, salonABI, slot1ABI, badgeClaimerABI])

    const transferToHandle = (event) => { setTransferTo(event.target.value) }
    const transferNFT = (_col, _nftid) => {
        setIsTransferModal(true)
        setTransferNftCol(_col)
        setTransferNftid(_nftid)
        for (let i = 0; i <= nft.length - 1; i++) {
            if (nft[i].Id === Number(_nftid)) {
                setTransferName(nft[i].Name)
            }
        }
    }
    const transferNFTConfirm = async () => {
        setisLoading(true)
        let addr = ''
        if (transferNftCol === 1) {
            addr = cmdaonft
        } else if (transferNftCol === 2) {
            addr = narutanft
        } else if (transferNftCol === 3) {
            addr = bbnft
        }
        try {
            let { request } = await simulateContract(config, {
                address: addr,
                abi: erc721Abi,
                functionName: 'transferFrom',
                args: [address, transferTo, transferNftid],
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

    const equipNft = async (_nftCol, _nftid, slot, _isMeme) => {
        setisLoading(true)
        let nftaddr = cmdaonft
        if (_isMeme && (slot === 2 || slot === 4 || slot === 6 || slot === 7)) {
            nftaddr = narutanft
        }
        let colBonus = 0
        if (_nftCol === 1 && (Number(_nftid) >= 710000102550 && Number(_nftid) <= 710010701000)) {
            colBonus = 710
        } else if (_nftCol === 1 && (Number(_nftid) >= 130000100500 && Number(_nftid) <= 130060000000)) {
            colBonus = 130
        } else if (_nftCol === 1 && (Number(_nftid) >= 211000102550 && Number(_nftid) <= 211025601000)) {
            colBonus = 211
        } else if (_nftCol === 1 && (Number(_nftid) >= 310000102550 && Number(_nftid) <= 310010701000)) {
            colBonus = 310
        } else if (_nftCol === 1 && (Number(_nftid) >= 312000102550 && Number(_nftid) <= 312025601000)) {
            colBonus = 312
        } else if (_nftCol === 1 && (Number(_nftid) >= 411000102550 && Number(_nftid) <= 411025601000)) {
            colBonus = 411
        } else if (_nftCol === 1 && (Number(_nftid) >= 511000102550 && Number(_nftid) <= 511010701000)) {
            colBonus = 511
        } else if (_nftCol === 1 && (Number(_nftid) >= 512000102550 && Number(_nftid) <= 512025601000)) {
            colBonus = 512
        } else if (_nftCol === 1 && (Number(_nftid) >= 611000102550 && Number(_nftid) <= 611010701000)) {
            colBonus = 611
        } else if (_nftCol === 1 && (Number(_nftid) >= 612000102550 && Number(_nftid) <= 612025601000)) {
            colBonus = 612
        } else if (_nftCol === 1 && (Number(_nftid) >= 711000102550 && Number(_nftid) <= 711010701000)) {
            colBonus = 711
        } else if (_nftCol === 1 && (Number(_nftid) >= 712000102550 && Number(_nftid) <= 712025601000)) {
            colBonus = 712
        }
        try {
            const nftAllow = await readContract(config, {
                address: nftaddr,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== dunMo.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: nftaddr,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [dunMo, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: dunMo,
                abi: dunMoABI,
                functionName: 'equip',
                args: [_nftid, colBonus, slot, _isMeme, ss],
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

    const unstakeNft = async (_slot, _isMeme, _ss) => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: dunMo,
                abi: dunMoABI,
                functionName: 'unstake',
                args: [_slot, myhouse, _isMeme, _ss],
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

    const refuelStake = async () => {
        setisLoading(true)
        try {
            let gasAddr = ''
            let gasIndex = 0
            if (ss === 3) {
                gasAddr = gasToken
                gasIndex = 3
            }
            const gasAllow = await readContract(config, {
                address: gasAddr,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, dunMo],
            })
            if (Number(ethers.utils.formatEther(gasAllow)) < 10000000) {
                let { request } = await simulateContract(config, {
                    address: gasAddr,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [dunMo, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: dunMo,
                abi: dunMoABI,
                functionName: 'refuel',
                args: [gasIndex, false, myhouse]
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

    const claimBadge = async (_ss) => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: badgeClaimer,
                abi: badgeClaimerABI,
                functionName: 'claimBadge',
                args: [_ss]
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

    /*const mintStOPT = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: mintStOPT_Router,
                abi: mintStOPTABI,
                functionName: 'mintST',
                args: [2]
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }*/

    return (
        <>
            {isTransferModal &&
                <div className="centermodal">
                    <div className="wrapper">
                        <div className="bold" style={{width: "500px", height: "250px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", fontSize: "40px", letterSpacing: "3px"}}>
                            <div style={{fontSize: "20px"}}>{transferName}</div>
                            <input style={{width: "80%", padding: "10px", fontSize: "20px"}} value={transferTo} onChange={transferToHandle} placeholder="Enter 0x..."></input>
                            <div className="button" style={{width: "50%"}} onClick={transferNFTConfirm}>TRANSFER</div>
                            <div className="button" style={{width: "50%", background: "gray"}} onClick={() => setIsTransferModal(false)}>CLOSE</div>
                        </div>
                    </div>
                </div>
            }
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('https://gateway.commudao.xyz/ipfs/QmYeJjdaanuuX27L1RyXLM957MitBQRQ5qr3W4hZJFoGjy')", overflow: "scroll"}}>
                <div className="SubfieldBanner">
                    <div className="pixel" style={{fontSize: "75px", color: "#fff", width: "fit-content"}}>Memetic Orbit</div>
                </div>
                <div className="SubfieldBanner"></div>
            </div>

            {address !== null && chain !== undefined && chain.id !== 8899 ?
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                        <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "fit-content", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">MISMATCH CHAIN!</div>
                        <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to JIBCHAIN L1.</div>
                        <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => open({ view: 'Networks' })}>SWITCH NETWORK</div>
                        <div className="button" style={{marginTop: "10px", width: "50%", background: "gray"}} onClick={() => {callMode(0); navigate('/');}}>BACK TO HOME</div>
                        </div>
                    </div>
                </div> :
                <div style={{background: "#0a090d", margin: "0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                        <div style={{background: "none rgba(255, 255, 255, 0.1)", backdropFilter: "blur(14px)", boxShadow: "none", border: 0, justifyContent: "space-around", padding: "30px", width: "1540px", maxWidth: "90%", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                            <div style={{background: "#2f1a52", color: "#fff", width: "370px", height: "360px", margin: "5px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>L1 STAKING</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", color: "rgb(0, 209, 255)"}}>
                                        {isStakeNow ?
                                            <>
                                            {isRunout ?
                                                <>
                                                    <div style={{backgroundColor: "red", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                    <div>Run Out of Gas</div>
                                                </> :
                                                <>
                                                    <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                    <div>On Staking</div>
                                                </>
                                            }
                                            </> :
                                            <>
                                                {isStakeNow === false &&
                                                    <>
                                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Available for stake</div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                                    {intrasubModetext !== null && intrasubModetext !== undefined && intrasubModetext.length === 42 ?
                                        <><div>ADDRESS</div><div>{intrasubModetext.slice(0, 4) + "..." + intrasubModetext.slice(-4)}</div></> :
                                        <><div>ADDRESS</div><div>-</div></>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                                    TOTAL CMPOW 
                                    <div>{Number(allPower).toLocaleString('en-US', {maximumFractionDigits:0})} [land multiplier x{Number(landBonus)}]</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                                    REWARD BALANCE
                                    {!isEnd ? 
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <img src="https://gateway.commudao.xyz/ipfs/bafkreibf7vowyqjrcaeyslflrxxchel3b4qdpwxcxb34js2otg35vjkcaa" height="20" alt="$PLAT"/>
                                            <div style={{marginLeft: "5px"}}>{Number(rewardBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                        </div> :
                                        <div style={{color: "#5f6476"}}>SS is over</div>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                                    REWARD PENDING
                                    {!isEnd ? 
                                        <div style={{display: "flex", flexDirection: "row", color: timeToRunout !== 0 && timeToRunout !== null  ? "#ff007a" : "#5f6476"}}>
                                            <img src="https://gateway.commudao.xyz/ipfs/bafkreibf7vowyqjrcaeyslflrxxchel3b4qdpwxcxb34js2otg35vjkcaa" height="20" alt="$PLAT"/>
                                            <div style={{marginLeft: "5px"}}>{Number(rewardPending).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                        </div> :
                                        <div style={{color: "#5f6476"}}>SS is over</div>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                                    GAS USAGE
                                    {!isEnd ? 
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            {ss === 3 &&
                                                <>
                                                    <img src="https://gateway.commudao.xyz/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" height="20" alt="$CU"/>
                                                    <div style={{marginLeft: "5px"}}>{Number(gasBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                                </>
                                            }
                                            <div style={{marginLeft: "5px"}}>/10,000,000</div>
                                        </div> :
                                        <div style={{color: "#5f6476"}}>SS is over</div>
                                    }
                                </div>
                                {!isEnd ?
                                    <>
                                        {isStakeNow ?
                                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>GAS RUN OUT AT <div>{timeToRunout}</div></div>
                                            : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>GAS RUN OUT IN <div>7 day</div></div>
                                        }
                                    </> :
                                    <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>GAS RUN OUT AT <div style={{color: "#5f6476"}}>SS is over</div></div>
                                }
                                {address !== null && intrasubModetext !== undefined ?
                                    <>
                                        {address.toUpperCase() === intrasubModetext.toUpperCase() ?
                                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                                {isStakeNow ?
                                                    <>
                                                        <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed", padding: "10px 15px"}} className="button">REFUEL GAS</div>
                                                        <div style={{alignSelf: "center", background: isRunout ? "#67BAA7" : "#ff007a", padding: "10px 15px"}} className="button" onClick={() => unstakeNft(0, false, ss)}>HARVEST & UNSTAKE</div>
                                                    </> :
                                                    <>
                                                        {isStakeNow !== null && (ss === 3 && !isEnd && Number(gasBalance) >= 10000000) ?
                                                            <>
                                                                {allPower !== 0 ?
                                                                    <div style={{alignSelf: "center", padding: "10px 15px"}} className="button" onClick={refuelStake}>REFUEL GAS</div> :
                                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed", padding: "10px 15px"}} className="button">REFUEL GAS</div>
                                                                }
                                                            </> :
                                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed", padding: "10px 15px"}} className="button">REFUEL GAS</div>
                                                        }
                                                        {!isEnd && <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed", padding: "10px 15px"}} className="button">HARVEST & UNSTAKE</div>}
                                                    </>
                                                }
                                            </div> :
                                            <div style={{height: "41px"}}></div>
                                        }
                                    </> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                            <div className='slotbox noscroll'>
                                <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {accSlot !== null ?
                                        <img src={accSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmUCug7hrWCYwLfboWhtNvNAXmrzVfPaptBt2B8htcM7mt" width="100px" alt="Can not load metadata." />
                                    }
                                    {accSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "85px", padding: "2px", fontSize: "25px"}}>+{accSlotLevel}</div>}
                                    {accSlot2 !== null ?
                                        <img src={accSlot2} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmUCug7hrWCYwLfboWhtNvNAXmrzVfPaptBt2B8htcM7mt" width="100px" alt="Can not load metadata." />
                                    }
                                    {accSlot2Level !== null && <div className="slotlevel" style={{position: "absolute", top: "237.5px", padding: "2px", fontSize: "25px"}}>+{accSlot2Level}</div> }
                                    {accSlot3 !== null ?
                                        <img src={accSlot3} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmUCug7hrWCYwLfboWhtNvNAXmrzVfPaptBt2B8htcM7mt" width="100px" alt="Can not load metadata." />
                                    }
                                    {accSlot3Level !== null && <div className="slotlevel" style={{position: "absolute", top: "385px", padding: "2px", fontSize: "25px"}}>+{accSlot3Level}</div>}
                                </div>
                                <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {hatSlot !== null ?
                                        <img src={hatSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmZvuiGgx38WFMGFtcrfU4NHf17Sg5nHRZRDoVsWufZjC9" width="100px" alt="Can not load metadata." />
                                    }
                                    {hatSlotLevel !== null && <div className="slotlevel2" style={{position: "absolute", top: "85px", padding: "2px", fontSize: "25px"}}>+{hatSlotLevel}</div>}
                                    {clothSlot !== null ?
                                        <img src={clothSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmPiUeAzB1tbMCY4eYJ1EFNJfq8NxtgNFMidFi9RymiEjh" width="100px" alt="Can not load metadata." />
                                    }
                                    {clothSlotLevel !== null && <div className="slotlevel2" style={{position: "absolute", top: "237.5px", padding: "2px", fontSize: "25px"}}>+{clothSlotLevel}</div>}
                                    {shoesSlot !== null ?
                                        <img src={shoesSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmeLCpgvRG5AejKn6W1ZtHSMdGmJX14xrpnNYjns1kqQbS" width="100px" alt="Can not load metadata." />
                                    }
                                    {shoesSlotLevel !== null && <div className="slotlevel2" style={{position: "absolute", top: "385px", padding: "2px", fontSize: "25px"}}>+{shoesSlotLevel}</div>}
                                </div>
                                <div style={{position: "relative", width: "300px", height: "450px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                    <div style={{position: "relative", width: "300px", height: "150px", padding: "0 20px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                                        {soulSlot !== null ?
                                            <img src={soulSlot} width="100px" alt="Can not load metadata." /> :
                                            <img src="https://gateway.commudao.xyz/ipfs/QmdSRjFFCUZJiLBxy5JUgVL4vezt4vXnux1JjFbQQgZCpP" width="100px" alt="Can not load metadata." />
                                        }
                                        {soulSlotLevel !== null && <div style={{position: "absolute", top: "90px", right: "200px", padding: "2px", fontSize: "25px"}}>+{soulSlotLevel}</div>}
                                        {badgeSlot !== null ?
                                            <img src={badgeSlot} width="100px" alt="Can not load metadata." /> :
                                            <img src="https://gateway.commudao.xyz/ipfs/QmQG17rt5uiChPpvHwivdZPX5Cm6PhoGyCYNzPyfs3ohT5" width="100px" alt="Can not load metadata." />
                                        }
                                        {badgeSlotLevel !== null && <div style={{position: "absolute", top: "90px", right: "50px", padding: "2px", fontSize: "25px"}}>+{badgeSlotLevel}</div>}
                                    </div>
                                    {nft.length > 0 ?
                                        <>
                                            {characterSlot !== null ?
                                                <>
                                                    {(Number(skinSlot1) === 0 || (characterSlot !== "https://gateway.commudao.xyz/ipfs/bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" && characterSlot !== "https://gateway.commudao.xyz/ipfs/bafkreidr4uq5voosuz6v4hqhiempf4a36x5aq6i4uceym2xbje65o5mwia")) &&
                                                        <img src={characterSlot} width="300px" alt="Can not load metadata." />
                                                    }
                                                    {characterSlot === "https://gateway.commudao.xyz/ipfs/bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" && Number(String(skinSlot1).slice(0, 1)) === 1 &&
                                                        <img src="https://gateway.commudao.xyz/ipfs/bafkreibynd6gqsb7idmhy7xk5qx5cdzmayvns7gfj7dsvpfymg2kjjajtm" width="300px" alt="Can not load metadata." />
                                                    }
                                                    {characterSlot === "https://gateway.commudao.xyz/ipfs/bafkreidr4uq5voosuz6v4hqhiempf4a36x5aq6i4uceym2xbje65o5mwia" && Number(String(skinSlot1).slice(0, 1)) === 1 &&
                                                        <img src="https://gateway.commudao.xyz/ipfs/bafkreif5fecf5rqrlixcxtpzplo7frtftt3yh2cmx6oca4l2jxuryjju2m" width="300px" alt="Can not load metadata." />
                                                    }
                                                </> :
                                                <img src="https://gateway.commudao.xyz/ipfs/Qmdm1Eg3n9aEbJuuYqsMoFex3WUMpHMxnnKmjwjpErCDMC" width="300px" alt="Can not load metadata." />
                                            }
                                        </> :
                                        <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <ThreeDots fill="#5f6476" />
                                        </div>
                                    }
                                    {characterSlotLevel !== null && <div style={{position: "absolute", bottom: "15px", right: "20px", padding: "2px", fontSize: "25px", color: "#000"}}>Lv.{characterSlotLevel}</div>}
                                    {/*isOp && isStakeNow && !lastedSTOPT && isRunout &&
                                        <div style={{position: "absolute", top: "300px", left: 0, border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", borderRadius: 0, background: "rgb(103, 186, 167)"}} className="button" onClick={mintStOPT}>Obtain stOPT <img src="https://gateway.commudao.xyz/ipfs/bafkreibtp4almzmdovhvygxeyykw5fa6pqe76cbdum4quispehlddqgp2e" height="18" alt="$stOPT"/></div>
                                    */}
                                </div>
                                <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {accSlot4 !== null ?
                                        <img src={accSlot4} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmUCug7hrWCYwLfboWhtNvNAXmrzVfPaptBt2B8htcM7mt" width="100px" alt="Can not load metadata." />
                                    }
                                    {accSlot4Level !== null && <div className="slotlevel" style={{position: "absolute", top: "85px", padding: "2px", fontSize: "25px"}}>+{accSlot4Level}</div>}
                                    {backSlot !== null ?
                                        <img src={backSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmeJWEps9kHZbcU3bYqbyUfyc8kWYXS5xBi1dnr8Basvk9" width="100px" alt="Can not load metadata." />
                                    }
                                    {backSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "237.5px", fontSize: "25px"}}>+{backSlotLevel}</div>}
                                    {weaponSlot !== null ?
                                        <img src={weaponSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmWYEwdpNYHCp4EZEJATQue72ndN162VTze9WDxzaLEqk9" width="100px" alt="Can not load metadata." />
                                    }
                                    {wpSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "385px", padding: "2px", fontSize: "25px"}}>+{wpSlotLevel}</div>}
                                </div>
                                <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {accSlot5 !== null ?
                                        <img src={accSlot5} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmUCug7hrWCYwLfboWhtNvNAXmrzVfPaptBt2B8htcM7mt" width="100px" alt="Can not load metadata." />
                                    }
                                    {accSlot5Level !== null && <div className="slotlevel" style={{position: "absolute", top: "85px", padding: "2px", fontSize: "25px"}}>+{accSlot5Level}</div>}
                                    {accSlot6 !== null ?
                                        <img src={accSlot6} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmUCug7hrWCYwLfboWhtNvNAXmrzVfPaptBt2B8htcM7mt" width="100px" alt="Can not load metadata." />
                                    }
                                    {accSlot6Level !== null && <div className="slotlevel" style={{position: "absolute", top: "237.5px", padding: "2px", fontSize: "25px"}}>+{accSlot6Level}</div>}
                                    {weaponSlot2 !== null ?
                                        <img src={weaponSlot2} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmWYEwdpNYHCp4EZEJATQue72ndN162VTze9WDxzaLEqk9" width="100px" alt="Can not load metadata." />
                                    }
                                    {wpSlot2Level !== null && <div className="slotlevel" style={{position: "absolute", top: "385px", padding: "2px", fontSize: "25px"}}>+{wpSlot2Level}</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                        <div style={{background: "none rgba(255, 255, 255, 0.1)", backdropFilter: "blur(14px)", boxShadow: "none", border: 0, justifyContent: "space-around", padding: "30px", width: "1140px", height: "fit-content", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                            <div style={{background: "#2f1a52", color: "#fff", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                    <div style={{fontSize: "22px", lineHeight: "15px"}}>L2 MEME STAKING SS 3<br></br><br></br>Songkran 2024 Flashback: Legends of VK by @whitney9452</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                                    TOTAL CMPOW
                                    <div style={{display: "flex", flexDirection: "row"}}>{yourSS3CMPOW}</div>
                                </div>
                                <div style={{height: "180px", width: "100%", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", textAlign: "center", letterSpacing: 1}} className="bold">
                                    <div style={{width: "100%", textAlign: "left", letterSpacing: 0.5, fontSize: "10px"}} className="light">- Season 3 concludes at 11:59 PM on March 28th.</div>
                                    <div style={{width: "100%", textAlign: "left", letterSpacing: 0.5, fontSize: "10px"}} className="light">- All meme slots must be filled to be eligible for the seasonal badge nft claiming. The season ends in 28 + 7 days.</div>
                                    <div style={{width: "100%", marginBottom: "10px", textAlign: "left", letterSpacing: 0.5, fontSize: "10px"}} className="light">- Warning: due to SC V1 critical bug, Shoes and weapon can't be unstake from L2 please stake with awareness!</div>                            
                                    <img src="https://gateway.commudao.xyz/ipfs/bafkreifvhxrmsfjzwogj4owx62x6zbsywgyjx24cmdtusfjm5svk4hohji" width="100px" alt="Can not load metadata." />
                                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        {(!isClaimBadge3 && ss3AccSlot !== null && ss3BackSlot !== null && ss3CharacterSlot !== null && ss3ClothSlot !== null && ss3HatSlot !== null && ss3ShoesSlot !== null && ss3WeaponSlot !== null) && <div style={{alignSelf: "center", marginTop: "10px", fontSize: "14px"}} className="button" onClick={() => claimBadge(3)}>CLAIM BADGE</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='slotbox noscroll'>
                                <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {ss3HatSlot !== null ?
                                        <img src={ss3HatSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/bafybeihcaime52xjf7b2ysgsfvsrg2jb5bmwa72grvnm5yqimaar44cnv4" width="100px" alt="Can not load metadata." style={{filter: 'grayscale(1)'}} />
                                    }
                                    {ss3HatSlotLevel !== null && <div className="slotlevel2" style={{position: "absolute", top: "85px", padding: "2px", fontSize: "25px"}}>+{ss3HatSlotLevel}</div>}
                                    {ss3ClothSlot !== null ?
                                        <img src={ss3ClothSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/bafkreih5olhdb33tdz7ujof7d4ykjufay7odefvvby47jr62o275cgerta" width="100px" alt="Can not load metadata." style={{filter: 'grayscale(1)'}} />
                                    }
                                    {ss3ClothSlotLevel !== null && <div className="slotlevel2" style={{position: "absolute", top: "237.5px", padding: "2px", fontSize: "25px"}}>+{ss3ClothSlotLevel}</div>}
                                    {ss3ShoesSlot !== null ?
                                        <img src={ss3ShoesSlot} width="100px" alt="" /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/bafybeiajrhbrxzhfkcsb6pazkrvgxamoij3jnlvljggi27wbidavtsbese" width="100px" alt="Can not load metadata." style={{filter: 'grayscale(1)'}} />
                                    }
                                    {ss3ShoesSlotLevel !== null && <div className="slotlevel2" style={{position: "absolute", top: "385px", padding: "2px", fontSize: "25px"}}>+{ss3ShoesSlotLevel}</div>}
                                </div>
                                <div style={{position: "relative", width: "300px", height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                    <div style={{width: "300px", height: "65px"}}></div>
                                    {nft.length > 0 ?
                                        <>
                                            {ss3CharacterSlot !== null ?
                                                <img src={ss3CharacterSlot} width="300px" alt="Can not load metadata." /> :
                                                <img src="https://gateway.commudao.xyz/ipfs/bafkreibl25he5u74rw2mi24xhjl4yurmhoe6upn4qcbi5kn75e5uaz2ksa" width="300px" alt="Can not load metadata." style={{filter: 'grayscale(1)'}} />
                                            }
                                        </> :
                                        <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <ThreeDots fill="#5f6476" />
                                        </div>
                                    }
                                    {ss3CharacterSlotLevel !== null && <div style={{position: "absolute", bottom: "40px", right: "10px", padding: "2px", fontSize: "25px", color: "#000"}}>Lv.{ss3CharacterSlotLevel}</div>}
                                </div>
                                <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {ss3AccSlot !== null ?
                                        <img src={ss3AccSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/bafybeiftowtfdkgeriogbaaoj7dhgnx5hcx2izqla3f4vnwrwtifbu2yoa" width="100px" alt="Can not load metadata." style={{filter: 'grayscale(1)'}} />
                                    }
                                    {ss3AccSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "85px", fontSize: "25px"}}>+{ss3AccSlotLevel}</div>}
                                    {ss3BackSlot !== null ?
                                        <img src={ss3BackSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/bafkreibnpsqclgnzwv6m2lrdu6snkmduuumcdobpllkj7aaoklyvt2hqaa" width="100px" alt="Can not load metadata." style={{filter: 'grayscale(1)'}} />
                                    }
                                    {ss3BackSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "237.5px", fontSize: "25px"}}>+{ss3BackSlotLevel}</div>}
                                    {ss3WeaponSlot !== null ?
                                        <img src={ss3WeaponSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/bafybeihsvjagwtvlduxlca4pkbyafl3wjqlpuur5hijy5apmdn4ldiohtq" width="100px" alt="Can not load metadata." style={{filter: 'grayscale(1)'}} />
                                    }
                                    {ss3WpSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "385px", padding: "2px", fontSize: "25px"}}>+{ss3WpSlotLevel}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                        <div style={{background: "none rgba(255, 255, 255, 0.1)", backdropFilter: "blur(14px)", boxShadow: "none", border: 0, justifyContent: "space-around", padding: "30px", width: "1140px", height: "fit-content", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                            <div style={{background: "#2f1a52", color: "#fff", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                    <div style={{fontSize: "22px", lineHeight: "15px"}}>L2 MEME STAKING SS 2<br></br><br></br>POISEIDON SELECTION</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                                    TOTAL CMPOW
                                    <div style={{display: "flex", flexDirection: "row"}}>{yourSS2CMPOW}</div>
                                </div>
                                <div style={{height: "180px", width: "100%", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", textAlign: "center", letterSpacing: 1}} className="bold">
                                    <div style={{width: "100%", textAlign: "left", letterSpacing: 0.5, fontSize: "10px"}} className="light">- Season 2 concludes at 11:59 PM on October 28th.</div>
                                    <div style={{width: "100%", textAlign: "left", letterSpacing: 0.5, fontSize: "10px"}} className="light">- All meme slots must be filled to be eligible for the seasonal badge nft claiming. The season ends in 28 + 7 days.</div>
                                    <div style={{width: "100%", marginBottom: "10px", textAlign: "left", letterSpacing: 0.5, fontSize: "10px"}} className="light">- Warning: due to SC V1 critical bug, Shoes and weapon can't be unstake from L2 please stake with awareness!</div>                            
                                    <img src="https://gateway.commudao.xyz/ipfs/QmZ9tfCVpoApPyVYuB7b5frTiu6Wc5feFUuderaCKQ6LU7" width="100px" alt="Can not load metadata." />
                                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        {(!isClaimBadge2 && ss2AccSlot !== null && ss2BackSlot !== null && ss2CharacterSlot !== null && ss2ClothSlot !== null && ss2HatSlot !== null && ss2ShoesSlot !== null && ss2WeaponSlot !== null) && <div style={{alignSelf: "center", marginTop: "10px", fontSize: "14px"}} className="button" onClick={() => claimBadge(2)}>CLAIM BADGE</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='slotbox noscroll'>
                                <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {ss2HatSlot !== null ?
                                        <img src={ss2HatSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmcJg97MWcc58JcTU4Z69phZr5iUDRXHc4H6kFKhy8iqL1" width="100px" alt="Can not load metadata." />
                                    }
                                    {ss2HatSlotLevel !== null && <div className="slotlevel2" style={{position: "absolute", top: "85px", padding: "2px", fontSize: "25px"}}>+{ss2HatSlotLevel}</div>}
                                    {ss2ClothSlot !== null ?
                                        <img src={ss2ClothSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmZEch1ACdpn1UdRA91wm7ky2bDH2QJXHg1tPKo683Xyv9" width="100px" alt="Can not load metadata." />
                                    }
                                    {ss2ClothSlotLevel !== null && <div className="slotlevel2" style={{position: "absolute", top: "237.5px", padding: "2px", fontSize: "25px"}}>+{ss2ClothSlotLevel}</div>}
                                    {ss2ShoesSlot !== null ?
                                        <img src={ss2ShoesSlot} width="100px" alt="" /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmQBwQeRGM68cNnFWEQKxEJvxHh8GsXGgw7rze2zDkhq6Q" width="100px" alt="Can not load metadata." />
                                    }
                                    {ss2ShoesSlotLevel !== null && <div className="slotlevel2" style={{position: "absolute", top: "385px", padding: "2px", fontSize: "25px"}}>+{ss2ShoesSlotLevel}</div>}
                                </div>
                                <div style={{position: "relative", width: "300px", height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                    <div style={{width: "300px", height: "65px"}}></div>
                                    {nft.length > 0 ?
                                        <>
                                            {ss2CharacterSlot !== null ?
                                                <img src={ss2CharacterSlot} width="300px" alt="Can not load metadata." /> :
                                                <img src="https://gateway.commudao.xyz/ipfs/QmRTR62zSMJiSYZ4h1HeMrcGJCnmzrphKNgaVRtM1PnxMw" width="300px" alt="Can not load metadata." />
                                            }
                                        </> :
                                        <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <ThreeDots fill="#5f6476" />
                                        </div>
                                    }
                                    {ss2CharacterSlotLevel !== null && <div style={{position: "absolute", bottom: "40px", right: "10px", padding: "2px", fontSize: "25px", color: "#000"}}>Lv.{ss2CharacterSlotLevel}</div>}
                                </div>
                                <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {ss2AccSlot !== null ?
                                        <img src={ss2AccSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmNhfFs1kSzPYMJaYjcdqu44vUrCBQk2uD4DdkFK89KvNH" width="100px" alt="Can not load metadata." />
                                    }
                                    {ss2AccSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "85px", fontSize: "25px"}}>+{ss2AccSlotLevel}</div>}
                                    {ss2BackSlot !== null ?
                                        <img src={ss2BackSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmXfGctM5uGHYU8SMwWa1bUJTosvEBwFzT2gbkhc87yKKj" width="100px" alt="Can not load metadata." />
                                    }
                                    {ss2BackSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "237.5px", fontSize: "25px"}}>+{ss2BackSlotLevel}</div>}
                                    {ss2WeaponSlot !== null ?
                                        <img src={ss2WeaponSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmS2VnY8FGWR5o1rBo8cx74t2s5SYuJE5ufPEvjEeAL1cN" width="100px" alt="Can not load metadata." />
                                    }
                                    {ss2WpSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "385px", padding: "2px", fontSize: "25px"}}>+{ss2WpSlotLevel}</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                        <div style={{background: "none rgba(255, 255, 255, 0.1)", backdropFilter: "blur(14px)", boxShadow: "none", border: 0, justifyContent: "space-around", padding: "30px", width: "1140px", height: "fit-content", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                            <div style={{background: "#2f1a52", color: "#fff", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                    <div style={{fontSize: "22px", lineHeight: "15px"}}>L2 MEME STAKING SS 1<br></br><br></br>D.O.M. THE DOI OLYMPUS MAFIA</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                                    TOTAL CMPOW
                                    <div style={{display: "flex", flexDirection: "row"}}>{yourSS1CMPOW}</div>
                                </div>
                                <div style={{height: "180px", width: "100%", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", textAlign: "center", letterSpacing: 1}} className="bold">
                                    <div style={{width: "100%", textAlign: "left", letterSpacing: 0.5, fontSize: "10px"}} className="light">- Season 1 concludes at 11:59 PM on August 28th.</div>
                                    <div style={{width: "100%", textAlign: "left", letterSpacing: 0.5, fontSize: "10px"}} className="light">- All meme slots must be filled to be eligible for the seasonal badge nft claiming. The season ends in 28 + 7 days.</div>
                                    <div style={{width: "100%", marginBottom: "10px", textAlign: "left", letterSpacing: 0.5, fontSize: "10px"}} className="light">- Warning: due to SC V1 critical bug, Shoes and weapon can't be unstake from L2 please stake with awareness!</div>
                                    <img src="https://gateway.commudao.xyz/ipfs/QmTaAzPsargodLJao3VPqCyGi94FwfSEKQzQjT5WNY5SA3" width="100px" alt="Can not load metadata." />
                                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        {(!isClaimBadge && ss1AccSlot !== null && ss1BackSlot !== null && ss1CharacterSlot !== null && ss1ClothSlot !== null && ss1HatSlot !== null && ss1ShoesSlot !== null && ss1WeaponSlot !== null) && <div style={{alignSelf: "center", marginTop: "10px", fontSize: "14px"}} className="button" onClick={() => claimBadge(1)}>CLAIM BADGE</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='slotbox noscroll'>
                                <div style={{position: "relative", width: "150px", height: "400px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {ss1HatSlot !== null ?
                                        <img src={ss1HatSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmSgooLEbo2MrxT3rNzFKq1fGkweGZJhV2ejPhKpAgoSWr" width="100px" alt="Can not load metadata." />
                                    }
                                    {ss1HatSlotLevel !== null && <div className="slotlevel2" style={{position: "absolute", top: "85px", padding: "2px", fontSize: "25px"}}>+{ss1HatSlotLevel}</div>}
                                    {ss1ClothSlot !== null ?
                                        <img src={ss1ClothSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmPY9gNNpai3UGtx8jSsohn3scvsioJM7AvmQLbFnBjvwq" width="100px" alt="Can not load metadata." />
                                    }
                                    {ss1ClothSlotLevel !== null && <div className="slotlevel2" style={{position: "absolute", top: "237.5px", padding: "2px", fontSize: "25px"}}>+{ss1ClothSlotLevel}</div>}
                                    {ss1ShoesSlot !== null ?
                                        <img src={ss1ShoesSlot} width="100px" alt="" /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmT4aYAh5veaM7fawV4MbufZBGWKFcJ4QmXdzNqmHYMxXk" width="100px" alt="Can not load metadata." />
                                    }
                                    {ss1ShoesSlotLevel !== null && <div className="slotlevel2" style={{position: "absolute", top: "385px", padding: "2px", fontSize: "25px"}}>+{ss1ShoesSlotLevel}</div>}
                                </div>
                                <div style={{position: "relative", width: "300px", height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                    <div style={{width: "300px", height: "65px"}}></div>
                                    {nft.length > 0 ?
                                        <>
                                            {ss1CharacterSlot !== null ?
                                                <img src={ss1CharacterSlot} width="300px" alt="Can not load metadata." /> :
                                                <img src="https://gateway.commudao.xyz/ipfs/QmViHN4xqFWr9x9t4q1QGMNanm3f7u2fBD6PU9x4ZKdyzk" width="300px" alt="Can not load metadata." />
                                            }
                                        </> :
                                        <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <ThreeDots fill="#5f6476" />
                                        </div>
                                    }
                                    {ss1CharacterSlotLevel !== null && <div style={{position: "absolute", bottom: "40px", right: "10px", padding: "2px", fontSize: "25px", color: "#000"}}>Lv.{ss1CharacterSlotLevel}</div>}
                                </div>
                                <div style={{position: "relative", width: "150px", height: "400px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {ss1AccSlot !== null ?
                                        <img src={ss1AccSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmYYCgcgbqdh59kuyuXSxWom7igRYqPnXLY4DNjL3mJpY8" width="100px" alt="Can not load metadata." />
                                    }
                                    {ss1BackSlot !== null ?
                                        <img src={ss1BackSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmRFpQsLUgJPjgXXBeREddUVAEcyJwzqG79VJ7BeYd8LSj" width="100px" alt="Can not load metadata." />
                                    }
                                    {ss1BackSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "237.5px", right: "50px", fontSize: "25px"}}>+{ss1BackSlotLevel}</div> }
                                    {ss1WeaponSlot !== null ?
                                        <img src={ss1WeaponSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmRKTx7BpuUicaecf4bKYSroAvedLGw3mncWAHHSfLszJc" width="100px" alt="Can not load metadata." />
                                    }
                                    {ss1WpSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "385px", right: "50px", padding: "2px", fontSize: "25px"}}>+{ss1WpSlotLevel}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {nft.length > 0 ?
                        <div style={{margin: "40px 0 80px 0", width: "1650px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                            {nft[0] !== null ?
                                <>
                                    {nft.map((item, index) => (
                                        <>
                                            {((item.Col === 1 && Math.floor(Number(item.Id / 100000000000)) <= 8) || 
                                            (//ss === 1 
                                                (item.Col === 2 && 
                                                    (
                                                        (Number(item.Id) >= 700000118800 && Number(item.Id) <= 700025018800) || 
                                                        (Number(item.Id) >= 500000118800 && Number(item.Id) <= 500025018800)
                                                    )
                                                ) || 
                                                (item.Col === 3 && 
                                                    (Number(item.Id) >= 100000001 && Number(item.Id) <= 100001000)
                                                )
                                            ) ||
                                            (//ss === 2  
                                                (item.Col === 2 && 
                                                    (
                                                        (Number(item.Id) >= 300000118800 && Number(item.Id) <= 300025072800) || 
                                                        (Number(item.Id) >= 600000118800 && Number(item.Id) <= 600025072800)
                                                    )
                                                )
                                            ) ||
                                            (//ss === 3
                                                (item.Col === 2 && 
                                                    (
                                                        (Number(item.Id) >= 290000145555 && Number(item.Id) <= 290005545555) || 
                                                        (Number(item.Id) >= 490000145555 && Number(item.Id) <= 490005545555) ||
                                                        (Number(item.Id) >= 690000145555 && Number(item.Id) <= 690005545555) ||
                                                        (Number(item.Id) >= 790000145555 && Number(item.Id) <= 790005545555)
                                                    )
                                                )
                                            )) &&
                                                <div style={{background: "#2f1a52", boxShadow: "none", border: 0, color: "#fff", justifyContent: "space-around", padding: "20px", margin: "10px", height: "500px"}} className="nftCard" key={index}>
                                                    <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                                        <img src={item.Image} height="100%" alt="Can not load metadata." />
                                                    </div>
                                                    <div className="emp bold">{item.Name}</div>
                                                    <div className="bold">
                                                        {item.RewardPerSec}
                                                        &nbsp;
                                                        {(item.Col === 1 && ((Number(item.Id) >= 710000102550 && Number(item.Id) <= 710010701000) || (Number(item.Id) >= 130000100500 && Number(item.Id) <= 130060000000) || (Number(item.Id) >= 310000102550 && Number(item.Id) <= 310010701000) || (Number(item.Id) >= 511000102550 && Number(item.Id) <= 511010701000) || (Number(item.Id) >= 611000102550 && Number(item.Id) <= 611010701000))) && '[x10 bonus]'}
                                                        {(item.Col === 1 && ((Number(item.Id) >= 211000102550 && Number(item.Id) <= 211025601000) || (Number(item.Id) >= 312000102550 && Number(item.Id) <= 312025601000) || (Number(item.Id) >= 411000102550 && Number(item.Id) <= 411025601000) || (Number(item.Id) >= 512000102550 && Number(item.Id) <= 512025601000) || (Number(item.Id) >= 612000102550 && Number(item.Id) <= 612025601000) || (Number(item.Id) >= 711000102550 && Number(item.Id) <= 711010701000))) && '[x9 bonus]'}
                                                        {(item.Col === 1 && ((Number(item.Id) >= 712000102550 && Number(item.Id) <= 712025601000))) && '[x8 bonus]'}
                                                        &nbsp;cmpow
                                                    </div>
                                                    <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                                    {address !== null && intrasubModetext !== undefined ?
                                                        <>
                                                            {address.toUpperCase() === intrasubModetext.toUpperCase() ?
                                                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}}>
                                                                    {item.isStaked ?
                                                                        <>
                                                                            {item.Col === 1 && 
                                                                                <div style={{background: "gray"}} className="pixel button" onClick={() => unstakeNft(item.Slot, false, ss)}>UNEQUIP L1</div>
                                                                            }
                                                                            {item.Ss !== undefined &&
                                                                                <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => unstakeNft(item.Slot, true, item.Ss)}>UNEQUIP L2 SS{item.Ss}</div>
                                                                            }
                                                                        </> :
                                                                        <>
                                                                            {item.Col === 1 && 
                                                                                <>
                                                                                    {((item.Id / 100000000000) | 0) === 1 && 
                                                                                        <>
                                                                                            <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id, 1, false)}>EQUIP L1 MAIN CHAR</div>
                                                                                            <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id, 15, false)}>EQUIP L1 SOUL</div>
                                                                                        </>
                                                                                    }
                                                                                    {((item.Id / 100000000000) | 0) === 2 && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id, 2, false)}>EQUIP L1 HAT</div>}
                                                                                    {((item.Id / 100000000000) | 0) === 3 && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id, 3, false)}>EQUIP L1 CLOTH</div>}
                                                                                    {((item.Id / 100000000000) | 0) === 4 && 
                                                                                        <>
                                                                                            <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id, 4, false)}>EQUIP L1 ACC (1)</div>
                                                                                            <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id, 9, false)}>EQUIP L1 ACC (2)</div>
                                                                                            <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id, 10, false)}>EQUIP L1 ACC (3)</div>
                                                                                            <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id, 11, false)}>EQUIP L1 ACC (4)</div>
                                                                                            <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id, 12, false)}>EQUIP L1 ACC (5)</div>
                                                                                            <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id, 13, false)}>EQUIP L1 ACC (6)</div>
                                                                                        </>
                                                                                    }
                                                                                    {((item.Id / 100000000000) | 0) === 5 && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id, 5, false)}>EQUIP L1 BACK</div>}
                                                                                    {((item.Id / 100000000000) | 0) === 6 && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id, 6, false)}>EQUIP L1 SHOES</div>}
                                                                                    {((item.Id / 100000000000) | 0) === 7 && 
                                                                                        <>
                                                                                            <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id, 7, false)}>EQUIP L1 WEAPON (1)</div>
                                                                                            <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id, 14, false)}>EQUIP L1 WEAPON (2)</div>
                                                                                        </>
                                                                                    }
                                                                                    {((item.Id / 100000000000) | 0) === 8 && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id, 8, false)}>EQUIP L1 BADGE</div>}
                                                                                </>
                                                                            }
                                                                            {(true && ss === 3 && item.Col === 1 && (Number(item.Id) >= 102066704500 && Number(item.Id) <= 102099904500)) && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(0, item.Id, 1, true)}>EQUIP L2 SS3 MAIN CHAR</div>}
                                                                            {(true && ss === 3 && item.Col === 2 && (Number(item.Id) >= 290000145555 && Number(item.Id) <= 290005545555)) && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(0, item.Id, 2, true)}>EQUIP L2 SS3 HAT</div>}
                                                                            {(true && ss === 3 && item.Col === 1 && (Number(item.Id) >= 310000102550 && Number(item.Id) <= 310199999999)) && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(0, item.Id, 3, true)}>EQUIP L2 SS3 CLOTH</div>}
                                                                            {(true && ss === 3 && item.Col === 2 && (Number(item.Id) >= 490000145555 && Number(item.Id) <= 490005545555)) && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(0, item.Id, 4, true)}>EQUIP L2 SS3 ACC</div>}
                                                                            {(true && ss === 3 && item.Col === 1 && (Number(item.Id) >= 511000102550 && Number(item.Id) <= 511099999999)) && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(0, item.Id, 5, true)}>EQUIP L2 SS3 BACK</div>}
                                                                            {(true && ss === 3 && item.Col === 2 && (Number(item.Id) >= 690000145555 && Number(item.Id) <= 690005545555)) && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(0, item.Id, 6, true)}>EQUIP L2 SS3 SHOES</div>}
                                                                            {(true && ss === 3 && item.Col === 2 && (Number(item.Id) >= 790000145555 && Number(item.Id) <= 790005545555)) && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(0, item.Id, 7, true)}>EQUIP L2 SS3 WEAPON</div>}
                                                                            <div style={{alignSelf: "center", background: "gray", marginTop: "5px"}} className="pixel button" onClick={() => transferNFT(item.Col, item.Id)}>TRANSFER</div>
                                                                        </>
                                                                    }
                                                                </div> :
                                                                <div style={{height: "41px"}}></div>
                                                            }
                                                        </> :
                                                        <div style={{height: "41px"}}></div>
                                                    }
                                                </div>
                                            }
                                        </>
                                    ))}
                                </> :
                                <div style={{background: "#2f1a52", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center", padding: "20px", margin: "10px", height: "500px"}} className="nftCard">
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
                        </div> :
                        <div style={{margin: "40px 0 80px 0", width: "1650px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", height: "500px"}}> 
                            <div className="nftCard" style={{background: "#2f1a52", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center"}}>
                                <ThreeDots fill="#fff" />
                                <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Memeticorbit
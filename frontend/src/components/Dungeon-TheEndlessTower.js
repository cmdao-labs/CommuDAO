import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const hrmNft = '0x9cD236a18D1792993beCff9E525902a5B6ef4483'
const engyToken = '0xBF389F85E4F71a78850Cca36c01430bC5b20e802'
const dunGEM = '0x222B20bCBBa261DfaaEEe6395f672F15c4d7e88F'
const providerBBQ = new ethers.getDefaultProvider('https://bbqchain-rpc.commudao.xyz')

const TheEndlessTower = ({ intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, erc721ABI, erc20ABI, dunGEMABI }) => {
    let { address } = useAccount()
    const youraddr = address
    if (intrasubModetext === undefined || intrasubModetext.toUpperCase() === "YOURBAG") {
        navigate('/dungeon/the-endless-tower/' + address)
    } else if (intrasubModetext.length === 42) {
        address = intrasubModetext
    } else if (address === undefined) {
    } else {
        navigate('/dungeon/the-endless-tower/' + address)
    }

    const [isTransferModal, setIsTransferModal] = React.useState(false)
    const [transferNftCol, setTransferNftCol] = React.useState(null)
    const [transferNftid, setTransferNftid] = React.useState(null)
    const [transferName, setTransferName] = React.useState("")
    const [transferTo, setTransferTo] = React.useState(null)

    const [gasselected, setGasselected] = React.useState("ENGY")
    const [gemBalance, setGemBalance] = React.useState(0)
    const [engyBalance, setEngyBalance] = React.useState(0)

    const [nft, setNft] = React.useState([])

    const [charSlot1, setCharSlot1] = React.useState(null)
    const [charSlot1Level, setCharSlot1Level] = React.useState(null)
    const [weaponOneSlot1, setWeaponOneSlot1] = React.useState(null)
    const [weaponOneSlot1Level, setWeaponOneSlot1Level] = React.useState(null)
    const [shieldSlot1, setShieldSlot1] = React.useState(null)
    const [shieldSlot1Level, setShieldSlot1Level] = React.useState(null)
    const [armorSlot1, setArmorSlot1] = React.useState(null)
    const [armorSlot1Level, setArmorSlot1Level] = React.useState(null)
    const [headUpperSlot1, setHeadUpperSlot1] = React.useState(null)
    const [headUpperSlot1Level, setHeadUpperSlot1Level] = React.useState(null)
    const [headMiddleSlot1, setHeadMiddleSlot1] = React.useState(null)
    const [headMiddleSlot1Level, setHeadMiddleSlot1Level] = React.useState(null)
    const [headLowerSlot1, setHeadLowerSlot1] = React.useState(null)
    const [headLowerSlot1Level, setHeadLowerSlot1Level] = React.useState(null)
    const [garmentSlot1, setGarmentSlot1] = React.useState(null)
    const [garmentSlot1Level, setGarmentSlot1Level] = React.useState(null)
    const [footgearSlot1, setFootgearSlot1] = React.useState(null)
    const [footgearSlot1Level, setFootgearSlot1Level] = React.useState(null)
    const [accessorySlot1, setAccessorySlot1] = React.useState(null)
    const [accessorySlot1Level, setAccessorySlot1Level] = React.useState(null)
    const [talismanOneSlot1, setTalismanOneSlot1] = React.useState(null)
    const [talismanOneSlot1Level, setTalismanOneSlot1Level] = React.useState(null)
    const [talismanTwoSlot1, setTalismanTwoSlot1] = React.useState(null)
    const [talismanTwoSlot1Level, setTalismanTwoSlot1Level] = React.useState(null)
    const [wingSlot1, setWingSlot1] = React.useState(null)
    const [wingSlot1Level, setWingSlot1Level] = React.useState(null)
    const [daemonSlot1, setDaemonSlot1] = React.useState(null)
    const [daemonSlot1Level, setDaemonSlot1Level] = React.useState(null)
    const [jewelSlot1, setJewelSlot1] = React.useState(null)
    const [jewelSlot1Level, setJewelSlot1Level] = React.useState(null)
    const [weaponTwoSlot1, setWeaponTwoSlot1] = React.useState(null)
    const [weaponTwoSlot1Level, setWeaponTwoSlot1Level] = React.useState(null)
    const [cardWeaponSlot1, setCardWeaponSlot1] = React.useState(null)
    const [cardWeaponSlot1Level, setCardWeaponSlot1Level] = React.useState(null)
    const [cardShieldSlot1, setCardShieldSlot1] = React.useState(null)
    const [cardShieldSlot1Level, setCardShieldSlot1Level] = React.useState(null)
    const [cardArmorSlot1, setCardArmorSlot1] = React.useState(null)
    const [cardArmorSlot1Level, setCardArmorSlot1Level] = React.useState(null)
    const [cardHeadUpperSlot1, setCardHeadUpperSlot1] = React.useState(null)
    const [cardHeadUpperSlot1Level, setCardHeadUpperSlot1Level] = React.useState(null)
    const [cardHeadMiddleSlot1, setCardHeadMiddleSlot1] = React.useState(null)
    const [cardHeadMiddleSlot1Level, setCardHeadMiddleSlot1Level] = React.useState(null)
    const [cardHeadLowerSlot1, setCardHeadLowerSlot1] = React.useState(null)
    const [cardHeadLowerSlot1Level, setCardHeadLowerSlot1Level] = React.useState(null)
    const [cardGarmentSlot1, setCardGarmentSlot1] = React.useState(null)
    const [cardGarmentSlot1Level, setCardGarmentSlot1Level] = React.useState(null)
    const [cardFootgearSlot1, setCardFootgearSlot1] = React.useState(null)
    const [cardFootgearSlot1Level, setCardFootgearSlot1Level] = React.useState(null)
    const [cardAccessorySlot1, setCardAccessorySlot1] = React.useState(null)
    const [cardAccessorySlot1Level, setCardAccessorySlot1Level] = React.useState(null)
    const [allPowerSlot1, setAllPowerSlot1] = React.useState(0)
    const [isStakeNowSlot1, setIsStakeNowSlot1] = React.useState(null)
    const [timeToRunoutSlot1, setTimeToRunoutSlot1] = React.useState(null)
    const [isRunoutSlot1, setIsRunoutSlot1] = React.useState(false)
    const [gemPendingSlot1, setGemPendingSlot1] = React.useState(0)

    const [charSlot2, setCharSlot2] = React.useState(null)
    const [charSlot2Level, setCharSlot2Level] = React.useState(null)
    const [weaponOneSlot2, setWeaponOneSlot2] = React.useState(null)
    const [weaponOneSlot2Level, setWeaponOneSlot2Level] = React.useState(null)
    const [shieldSlot2, setShieldSlot2] = React.useState(null)
    const [shieldSlot2Level, setShieldSlot2Level] = React.useState(null)
    const [armorSlot2, setArmorSlot2] = React.useState(null)
    const [armorSlot2Level, setArmorSlot2Level] = React.useState(null)
    const [headUpperSlot2, setHeadUpperSlot2] = React.useState(null)
    const [headUpperSlot2Level, setHeadUpperSlot2Level] = React.useState(null)
    const [headMiddleSlot2, setHeadMiddleSlot2] = React.useState(null)
    const [headMiddleSlot2Level, setHeadMiddleSlot2Level] = React.useState(null)
    const [headLowerSlot2, setHeadLowerSlot2] = React.useState(null)
    const [headLowerSlot2Level, setHeadLowerSlot2Level] = React.useState(null)
    const [garmentSlot2, setGarmentSlot2] = React.useState(null)
    const [garmentSlot2Level, setGarmentSlot2Level] = React.useState(null)
    const [footgearSlot2, setFootgearSlot2] = React.useState(null)
    const [footgearSlot2Level, setFootgearSlot2Level] = React.useState(null)
    const [accessorySlot2, setAccessorySlot2] = React.useState(null)
    const [accessorySlot2Level, setAccessorySlot2Level] = React.useState(null)
    const [talismanOneSlot2, setTalismanOneSlot2] = React.useState(null)
    const [talismanOneSlot2Level, setTalismanOneSlot2Level] = React.useState(null)
    const [talismanTwoSlot2, setTalismanTwoSlot2] = React.useState(null)
    const [talismanTwoSlot2Level, setTalismanTwoSlot2Level] = React.useState(null)
    const [wingSlot2, setWingSlot2] = React.useState(null)
    const [wingSlot2Level, setWingSlot2Level] = React.useState(null)
    const [daemonSlot2, setDaemonSlot2] = React.useState(null)
    const [daemonSlot2Level, setDaemonSlot2Level] = React.useState(null)
    const [jewelSlot2, setJewelSlot2] = React.useState(null)
    const [jewelSlot2Level, setJewelSlot2Level] = React.useState(null)
    const [weaponTwoSlot2, setWeaponTwoSlot2] = React.useState(null)
    const [weaponTwoSlot2Level, setWeaponTwoSlot2Level] = React.useState(null)
    const [cardWeaponSlot2, setCardWeaponSlot2] = React.useState(null)
    const [cardWeaponSlot2Level, setCardWeaponSlot2Level] = React.useState(null)
    const [cardShieldSlot2, setCardShieldSlot2] = React.useState(null)
    const [cardShieldSlot2Level, setCardShieldSlot2Level] = React.useState(null)
    const [cardArmorSlot2, setCardArmorSlot2] = React.useState(null)
    const [cardArmorSlot2Level, setCardArmorSlot2Level] = React.useState(null)
    const [cardHeadUpperSlot2, setCardHeadUpperSlot2] = React.useState(null)
    const [cardHeadUpperSlot2Level, setCardHeadUpperSlot2Level] = React.useState(null)
    const [cardHeadMiddleSlot2, setCardHeadMiddleSlot2] = React.useState(null)
    const [cardHeadMiddleSlot2Level, setCardHeadMiddleSlot2Level] = React.useState(null)
    const [cardHeadLowerSlot2, setCardHeadLowerSlot2] = React.useState(null)
    const [cardHeadLowerSlot2Level, setCardHeadLowerSlot2Level] = React.useState(null)
    const [cardGarmentSlot2, setCardGarmentSlot2] = React.useState(null)
    const [cardGarmentSlot2Level, setCardGarmentSlot2Level] = React.useState(null)
    const [cardFootgearSlot2, setCardFootgearSlot2] = React.useState(null)
    const [cardFootgearSlot2Level, setCardFootgearSlot2Level] = React.useState(null)
    const [cardAccessorySlot2, setCardAccessorySlot2] = React.useState(null)
    const [cardAccessorySlot2Level, setCardAccessorySlot2Level] = React.useState(null)
    const [allPowerSlot2, setAllPowerSlot2] = React.useState(0)
    const [isStakeNowSlot2, setIsStakeNowSlot2] = React.useState(null)
    const [timeToRunoutSlot2, setTimeToRunoutSlot2] = React.useState(null)
    const [isRunoutSlot2, setIsRunoutSlot2] = React.useState(false)
    const [gemPendingSlot2, setGemPendingSlot2] = React.useState(0)

    const [charSlot3, setCharSlot3] = React.useState(null)
    const [charSlot3Level, setCharSlot3Level] = React.useState(null)
    const [weaponOneSlot3, setWeaponOneSlot3] = React.useState(null)
    const [weaponOneSlot3Level, setWeaponOneSlot3Level] = React.useState(null)
    const [shieldSlot3, setShieldSlot3] = React.useState(null)
    const [shieldSlot3Level, setShieldSlot3Level] = React.useState(null)
    const [armorSlot3, setArmorSlot3] = React.useState(null)
    const [armorSlot3Level, setArmorSlot3Level] = React.useState(null)
    const [headUpperSlot3, setHeadUpperSlot3] = React.useState(null)
    const [headUpperSlot3Level, setHeadUpperSlot3Level] = React.useState(null)
    const [headMiddleSlot3, setHeadMiddleSlot3] = React.useState(null)
    const [headMiddleSlot3Level, setHeadMiddleSlot3Level] = React.useState(null)
    const [headLowerSlot3, setHeadLowerSlot3] = React.useState(null)
    const [headLowerSlot3Level, setHeadLowerSlot3Level] = React.useState(null)
    const [garmentSlot3, setGarmentSlot3] = React.useState(null)
    const [garmentSlot3Level, setGarmentSlot3Level] = React.useState(null)
    const [footgearSlot3, setFootgearSlot3] = React.useState(null)
    const [footgearSlot3Level, setFootgearSlot3Level] = React.useState(null)
    const [accessorySlot3, setAccessorySlot3] = React.useState(null)
    const [accessorySlot3Level, setAccessorySlot3Level] = React.useState(null)
    const [talismanOneSlot3, setTalismanOneSlot3] = React.useState(null)
    const [talismanOneSlot3Level, setTalismanOneSlot3Level] = React.useState(null)
    const [talismanTwoSlot3, setTalismanTwoSlot3] = React.useState(null)
    const [talismanTwoSlot3Level, setTalismanTwoSlot3Level] = React.useState(null)
    const [wingSlot3, setWingSlot3] = React.useState(null)
    const [wingSlot3Level, setWingSlot3Level] = React.useState(null)
    const [daemonSlot3, setDaemonSlot3] = React.useState(null)
    const [daemonSlot3Level, setDaemonSlot3Level] = React.useState(null)
    const [jewelSlot3, setJewelSlot3] = React.useState(null)
    const [jewelSlot3Level, setJewelSlot3Level] = React.useState(null)
    const [weaponTwoSlot3, setWeaponTwoSlot3] = React.useState(null)
    const [weaponTwoSlot3Level, setWeaponTwoSlot3Level] = React.useState(null)
    const [cardWeaponSlot3, setCardWeaponSlot3] = React.useState(null)
    const [cardWeaponSlot3Level, setCardWeaponSlot3Level] = React.useState(null)
    const [cardShieldSlot3, setCardShieldSlot3] = React.useState(null)
    const [cardShieldSlot3Level, setCardShieldSlot3Level] = React.useState(null)
    const [cardArmorSlot3, setCardArmorSlot3] = React.useState(null)
    const [cardArmorSlot3Level, setCardArmorSlot3Level] = React.useState(null)
    const [cardHeadUpperSlot3, setCardHeadUpperSlot3] = React.useState(null)
    const [cardHeadUpperSlot3Level, setCardHeadUpperSlot3Level] = React.useState(null)
    const [cardHeadMiddleSlot3, setCardHeadMiddleSlot3] = React.useState(null)
    const [cardHeadMiddleSlot3Level, setCardHeadMiddleSlot3Level] = React.useState(null)
    const [cardHeadLowerSlot3, setCardHeadLowerSlot3] = React.useState(null)
    const [cardHeadLowerSlot3Level, setCardHeadLowerSlot3Level] = React.useState(null)
    const [cardGarmentSlot3, setCardGarmentSlot3] = React.useState(null)
    const [cardGarmentSlot3Level, setCardGarmentSlot3Level] = React.useState(null)
    const [cardFootgearSlot3, setCardFootgearSlot3] = React.useState(null)
    const [cardFootgearSlot3Level, setCardFootgearSlot3Level] = React.useState(null)
    const [cardAccessorySlot3, setCardAccessorySlot3] = React.useState(null)
    const [cardAccessorySlot3Level, setCardAccessorySlot3Level] = React.useState(null)
    const [allPowerSlot3, setAllPowerSlot3] = React.useState(0)
    const [isStakeNowSlot3, setIsStakeNowSlot3] = React.useState(null)
    const [timeToRunoutSlot3, setTimeToRunoutSlot3] = React.useState(null)
    const [isRunoutSlot3, setIsRunoutSlot3] = React.useState(false)
    const [gemPendingSlot3, setGemPendingSlot3] = React.useState(0)

    const [charSlot4, setCharSlot4] = React.useState(null)
    const [charSlot4Level, setCharSlot4Level] = React.useState(null)
    const [weaponOneSlot4, setWeaponOneSlot4] = React.useState(null)
    const [weaponOneSlot4Level, setWeaponOneSlot4Level] = React.useState(null)
    const [shieldSlot4, setShieldSlot4] = React.useState(null)
    const [shieldSlot4Level, setShieldSlot4Level] = React.useState(null)
    const [armorSlot4, setArmorSlot4] = React.useState(null)
    const [armorSlot4Level, setArmorSlot4Level] = React.useState(null)
    const [headUpperSlot4, setHeadUpperSlot4] = React.useState(null)
    const [headUpperSlot4Level, setHeadUpperSlot4Level] = React.useState(null)
    const [headMiddleSlot4, setHeadMiddleSlot4] = React.useState(null)
    const [headMiddleSlot4Level, setHeadMiddleSlot4Level] = React.useState(null)
    const [headLowerSlot4, setHeadLowerSlot4] = React.useState(null)
    const [headLowerSlot4Level, setHeadLowerSlot4Level] = React.useState(null)
    const [garmentSlot4, setGarmentSlot4] = React.useState(null)
    const [garmentSlot4Level, setGarmentSlot4Level] = React.useState(null)
    const [footgearSlot4, setFootgearSlot4] = React.useState(null)
    const [footgearSlot4Level, setFootgearSlot4Level] = React.useState(null)
    const [accessorySlot4, setAccessorySlot4] = React.useState(null)
    const [accessorySlot4Level, setAccessorySlot4Level] = React.useState(null)
    const [talismanOneSlot4, setTalismanOneSlot4] = React.useState(null)
    const [talismanOneSlot4Level, setTalismanOneSlot4Level] = React.useState(null)
    const [talismanTwoSlot4, setTalismanTwoSlot4] = React.useState(null)
    const [talismanTwoSlot4Level, setTalismanTwoSlot4Level] = React.useState(null)
    const [wingSlot4, setWingSlot4] = React.useState(null)
    const [wingSlot4Level, setWingSlot4Level] = React.useState(null)
    const [daemonSlot4, setDaemonSlot4] = React.useState(null)
    const [daemonSlot4Level, setDaemonSlot4Level] = React.useState(null)
    const [jewelSlot4, setJewelSlot4] = React.useState(null)
    const [jewelSlot4Level, setJewelSlot4Level] = React.useState(null)
    const [weaponTwoSlot4, setWeaponTwoSlot4] = React.useState(null)
    const [weaponTwoSlot4Level, setWeaponTwoSlot4Level] = React.useState(null)
    const [cardWeaponSlot4, setCardWeaponSlot4] = React.useState(null)
    const [cardWeaponSlot4Level, setCardWeaponSlot4Level] = React.useState(null)
    const [cardShieldSlot4, setCardShieldSlot4] = React.useState(null)
    const [cardShieldSlot4Level, setCardShieldSlot4Level] = React.useState(null)
    const [cardArmorSlot4, setCardArmorSlot4] = React.useState(null)
    const [cardArmorSlot4Level, setCardArmorSlot4Level] = React.useState(null)
    const [cardHeadUpperSlot4, setCardHeadUpperSlot4] = React.useState(null)
    const [cardHeadUpperSlot4Level, setCardHeadUpperSlot4Level] = React.useState(null)
    const [cardHeadMiddleSlot4, setCardHeadMiddleSlot4] = React.useState(null)
    const [cardHeadMiddleSlot4Level, setCardHeadMiddleSlot4Level] = React.useState(null)
    const [cardHeadLowerSlot4, setCardHeadLowerSlot4] = React.useState(null)
    const [cardHeadLowerSlot4Level, setCardHeadLowerSlot4Level] = React.useState(null)
    const [cardGarmentSlot4, setCardGarmentSlot4] = React.useState(null)
    const [cardGarmentSlot4Level, setCardGarmentSlot4Level] = React.useState(null)
    const [cardFootgearSlot4, setCardFootgearSlot4] = React.useState(null)
    const [cardFootgearSlot4Level, setCardFootgearSlot4Level] = React.useState(null)
    const [cardAccessorySlot4, setCardAccessorySlot4] = React.useState(null)
    const [cardAccessorySlot4Level, setCardAccessorySlot4Level] = React.useState(null)
    const [allPowerSlot4, setAllPowerSlot4] = React.useState(0)
    const [isStakeNowSlot4, setIsStakeNowSlot4] = React.useState(null)
    const [timeToRunoutSlot4, setTimeToRunoutSlot4] = React.useState(null)
    const [isRunoutSlot4, setIsRunoutSlot4] = React.useState(false)
    const [gemPendingSlot4, setGemPendingSlot4] = React.useState(0)

    const [charSlot5, setCharSlot5] = React.useState(null)
    const [charSlot5Level, setCharSlot5Level] = React.useState(null)
    const [weaponOneSlot5, setWeaponOneSlot5] = React.useState(null)
    const [weaponOneSlot5Level, setWeaponOneSlot5Level] = React.useState(null)
    const [shieldSlot5, setShieldSlot5] = React.useState(null)
    const [shieldSlot5Level, setShieldSlot5Level] = React.useState(null)
    const [armorSlot5, setArmorSlot5] = React.useState(null)
    const [armorSlot5Level, setArmorSlot5Level] = React.useState(null)
    const [headUpperSlot5, setHeadUpperSlot5] = React.useState(null)
    const [headUpperSlot5Level, setHeadUpperSlot5Level] = React.useState(null)
    const [headMiddleSlot5, setHeadMiddleSlot5] = React.useState(null)
    const [headMiddleSlot5Level, setHeadMiddleSlot5Level] = React.useState(null)
    const [headLowerSlot5, setHeadLowerSlot5] = React.useState(null)
    const [headLowerSlot5Level, setHeadLowerSlot5Level] = React.useState(null)
    const [garmentSlot5, setGarmentSlot5] = React.useState(null)
    const [garmentSlot5Level, setGarmentSlot5Level] = React.useState(null)
    const [footgearSlot5, setFootgearSlot5] = React.useState(null)
    const [footgearSlot5Level, setFootgearSlot5Level] = React.useState(null)
    const [accessorySlot5, setAccessorySlot5] = React.useState(null)
    const [accessorySlot5Level, setAccessorySlot5Level] = React.useState(null)
    const [talismanOneSlot5, setTalismanOneSlot5] = React.useState(null)
    const [talismanOneSlot5Level, setTalismanOneSlot5Level] = React.useState(null)
    const [talismanTwoSlot5, setTalismanTwoSlot5] = React.useState(null)
    const [talismanTwoSlot5Level, setTalismanTwoSlot5Level] = React.useState(null)
    const [wingSlot5, setWingSlot5] = React.useState(null)
    const [wingSlot5Level, setWingSlot5Level] = React.useState(null)
    const [daemonSlot5, setDaemonSlot5] = React.useState(null)
    const [daemonSlot5Level, setDaemonSlot5Level] = React.useState(null)
    const [jewelSlot5, setJewelSlot5] = React.useState(null)
    const [jewelSlot5Level, setJewelSlot5Level] = React.useState(null)
    const [weaponTwoSlot5, setWeaponTwoSlot5] = React.useState(null)
    const [weaponTwoSlot5Level, setWeaponTwoSlot5Level] = React.useState(null)
    const [cardWeaponSlot5, setCardWeaponSlot5] = React.useState(null)
    const [cardWeaponSlot5Level, setCardWeaponSlot5Level] = React.useState(null)
    const [cardShieldSlot5, setCardShieldSlot5] = React.useState(null)
    const [cardShieldSlot5Level, setCardShieldSlot5Level] = React.useState(null)
    const [cardArmorSlot5, setCardArmorSlot5] = React.useState(null)
    const [cardArmorSlot5Level, setCardArmorSlot5Level] = React.useState(null)
    const [cardHeadUpperSlot5, setCardHeadUpperSlot5] = React.useState(null)
    const [cardHeadUpperSlot5Level, setCardHeadUpperSlot5Level] = React.useState(null)
    const [cardHeadMiddleSlot5, setCardHeadMiddleSlot5] = React.useState(null)
    const [cardHeadMiddleSlot5Level, setCardHeadMiddleSlot5Level] = React.useState(null)
    const [cardHeadLowerSlot5, setCardHeadLowerSlot5] = React.useState(null)
    const [cardHeadLowerSlot5Level, setCardHeadLowerSlot5Level] = React.useState(null)
    const [cardGarmentSlot5, setCardGarmentSlot5] = React.useState(null)
    const [cardGarmentSlot5Level, setCardGarmentSlot5Level] = React.useState(null)
    const [cardFootgearSlot5, setCardFootgearSlot5] = React.useState(null)
    const [cardFootgearSlot5Level, setCardFootgearSlot5Level] = React.useState(null)
    const [cardAccessorySlot5, setCardAccessorySlot5] = React.useState(null)
    const [cardAccessorySlot5Level, setCardAccessorySlot5Level] = React.useState(null)
    const [allPowerSlot5, setAllPowerSlot5] = React.useState(0)
    const [isStakeNowSlot5, setIsStakeNowSlot5] = React.useState(null)
    const [timeToRunoutSlot5, setTimeToRunoutSlot5] = React.useState(null)
    const [isRunoutSlot5, setIsRunoutSlot5] = React.useState(false)
    const [gemPendingSlot5, setGemPendingSlot5] = React.useState(0)

    const [charSlot6, setCharSlot6] = React.useState(null)
    const [charSlot6Level, setCharSlot6Level] = React.useState(null)
    const [weaponOneSlot6, setWeaponOneSlot6] = React.useState(null)
    const [weaponOneSlot6Level, setWeaponOneSlot6Level] = React.useState(null)
    const [shieldSlot6, setShieldSlot6] = React.useState(null)
    const [shieldSlot6Level, setShieldSlot6Level] = React.useState(null)
    const [armorSlot6, setArmorSlot6] = React.useState(null)
    const [armorSlot6Level, setArmorSlot6Level] = React.useState(null)
    const [headUpperSlot6, setHeadUpperSlot6] = React.useState(null)
    const [headUpperSlot6Level, setHeadUpperSlot6Level] = React.useState(null)
    const [headMiddleSlot6, setHeadMiddleSlot6] = React.useState(null)
    const [headMiddleSlot6Level, setHeadMiddleSlot6Level] = React.useState(null)
    const [headLowerSlot6, setHeadLowerSlot6] = React.useState(null)
    const [headLowerSlot6Level, setHeadLowerSlot6Level] = React.useState(null)
    const [garmentSlot6, setGarmentSlot6] = React.useState(null)
    const [garmentSlot6Level, setGarmentSlot6Level] = React.useState(null)
    const [footgearSlot6, setFootgearSlot6] = React.useState(null)
    const [footgearSlot6Level, setFootgearSlot6Level] = React.useState(null)
    const [accessorySlot6, setAccessorySlot6] = React.useState(null)
    const [accessorySlot6Level, setAccessorySlot6Level] = React.useState(null)
    const [talismanOneSlot6, setTalismanOneSlot6] = React.useState(null)
    const [talismanOneSlot6Level, setTalismanOneSlot6Level] = React.useState(null)
    const [talismanTwoSlot6, setTalismanTwoSlot6] = React.useState(null)
    const [talismanTwoSlot6Level, setTalismanTwoSlot6Level] = React.useState(null)
    const [wingSlot6, setWingSlot6] = React.useState(null)
    const [wingSlot6Level, setWingSlot6Level] = React.useState(null)
    const [daemonSlot6, setDaemonSlot6] = React.useState(null)
    const [daemonSlot6Level, setDaemonSlot6Level] = React.useState(null)
    const [jewelSlot6, setJewelSlot6] = React.useState(null)
    const [jewelSlot6Level, setJewelSlot6Level] = React.useState(null)
    const [weaponTwoSlot6, setWeaponTwoSlot6] = React.useState(null)
    const [weaponTwoSlot6Level, setWeaponTwoSlot6Level] = React.useState(null)
    const [cardWeaponSlot6, setCardWeaponSlot6] = React.useState(null)
    const [cardWeaponSlot6Level, setCardWeaponSlot6Level] = React.useState(null)
    const [cardShieldSlot6, setCardShieldSlot6] = React.useState(null)
    const [cardShieldSlot6Level, setCardShieldSlot6Level] = React.useState(null)
    const [cardArmorSlot6, setCardArmorSlot6] = React.useState(null)
    const [cardArmorSlot6Level, setCardArmorSlot6Level] = React.useState(null)
    const [cardHeadUpperSlot6, setCardHeadUpperSlot6] = React.useState(null)
    const [cardHeadUpperSlot6Level, setCardHeadUpperSlot6Level] = React.useState(null)
    const [cardHeadMiddleSlot6, setCardHeadMiddleSlot6] = React.useState(null)
    const [cardHeadMiddleSlot6Level, setCardHeadMiddleSlot6Level] = React.useState(null)
    const [cardHeadLowerSlot6, setCardHeadLowerSlot6] = React.useState(null)
    const [cardHeadLowerSlot6Level, setCardHeadLowerSlot6Level] = React.useState(null)
    const [cardGarmentSlot6, setCardGarmentSlot6] = React.useState(null)
    const [cardGarmentSlot6Level, setCardGarmentSlot6Level] = React.useState(null)
    const [cardFootgearSlot6, setCardFootgearSlot6] = React.useState(null)
    const [cardFootgearSlot6Level, setCardFootgearSlot6Level] = React.useState(null)
    const [cardAccessorySlot6, setCardAccessorySlot6] = React.useState(null)
    const [cardAccessorySlot6Level, setCardAccessorySlot6Level] = React.useState(null)
    const [allPowerSlot6, setAllPowerSlot6] = React.useState(0)
    const [isStakeNowSlot6, setIsStakeNowSlot6] = React.useState(null)
    const [timeToRunoutSlot6, setTimeToRunoutSlot6] = React.useState(null)
    const [isRunoutSlot6, setIsRunoutSlot6] = React.useState(false)
    const [gemPendingSlot6, setGemPendingSlot6] = React.useState(0)

    const [charSlot7, setCharSlot7] = React.useState(null)
    const [charSlot7Level, setCharSlot7Level] = React.useState(null)
    const [weaponOneSlot7, setWeaponOneSlot7] = React.useState(null)
    const [weaponOneSlot7Level, setWeaponOneSlot7Level] = React.useState(null)
    const [shieldSlot7, setShieldSlot7] = React.useState(null)
    const [shieldSlot7Level, setShieldSlot7Level] = React.useState(null)
    const [armorSlot7, setArmorSlot7] = React.useState(null)
    const [armorSlot7Level, setArmorSlot7Level] = React.useState(null)
    const [headUpperSlot7, setHeadUpperSlot7] = React.useState(null)
    const [headUpperSlot7Level, setHeadUpperSlot7Level] = React.useState(null)
    const [headMiddleSlot7, setHeadMiddleSlot7] = React.useState(null)
    const [headMiddleSlot7Level, setHeadMiddleSlot7Level] = React.useState(null)
    const [headLowerSlot7, setHeadLowerSlot7] = React.useState(null)
    const [headLowerSlot7Level, setHeadLowerSlot7Level] = React.useState(null)
    const [garmentSlot7, setGarmentSlot7] = React.useState(null)
    const [garmentSlot7Level, setGarmentSlot7Level] = React.useState(null)
    const [footgearSlot7, setFootgearSlot7] = React.useState(null)
    const [footgearSlot7Level, setFootgearSlot7Level] = React.useState(null)
    const [accessorySlot7, setAccessorySlot7] = React.useState(null)
    const [accessorySlot7Level, setAccessorySlot7Level] = React.useState(null)
    const [talismanOneSlot7, setTalismanOneSlot7] = React.useState(null)
    const [talismanOneSlot7Level, setTalismanOneSlot7Level] = React.useState(null)
    const [talismanTwoSlot7, setTalismanTwoSlot7] = React.useState(null)
    const [talismanTwoSlot7Level, setTalismanTwoSlot7Level] = React.useState(null)
    const [wingSlot7, setWingSlot7] = React.useState(null)
    const [wingSlot7Level, setWingSlot7Level] = React.useState(null)
    const [daemonSlot7, setDaemonSlot7] = React.useState(null)
    const [daemonSlot7Level, setDaemonSlot7Level] = React.useState(null)
    const [jewelSlot7, setJewelSlot7] = React.useState(null)
    const [jewelSlot7Level, setJewelSlot7Level] = React.useState(null)
    const [weaponTwoSlot7, setWeaponTwoSlot7] = React.useState(null)
    const [weaponTwoSlot7Level, setWeaponTwoSlot7Level] = React.useState(null)
    const [cardWeaponSlot7, setCardWeaponSlot7] = React.useState(null)
    const [cardWeaponSlot7Level, setCardWeaponSlot7Level] = React.useState(null)
    const [cardShieldSlot7, setCardShieldSlot7] = React.useState(null)
    const [cardShieldSlot7Level, setCardShieldSlot7Level] = React.useState(null)
    const [cardArmorSlot7, setCardArmorSlot7] = React.useState(null)
    const [cardArmorSlot7Level, setCardArmorSlot7Level] = React.useState(null)
    const [cardHeadUpperSlot7, setCardHeadUpperSlot7] = React.useState(null)
    const [cardHeadUpperSlot7Level, setCardHeadUpperSlot7Level] = React.useState(null)
    const [cardHeadMiddleSlot7, setCardHeadMiddleSlot7] = React.useState(null)
    const [cardHeadMiddleSlot7Level, setCardHeadMiddleSlot7Level] = React.useState(null)
    const [cardHeadLowerSlot7, setCardHeadLowerSlot7] = React.useState(null)
    const [cardHeadLowerSlot7Level, setCardHeadLowerSlot7Level] = React.useState(null)
    const [cardGarmentSlot7, setCardGarmentSlot7] = React.useState(null)
    const [cardGarmentSlot7Level, setCardGarmentSlot7Level] = React.useState(null)
    const [cardFootgearSlot7, setCardFootgearSlot7] = React.useState(null)
    const [cardFootgearSlot7Level, setCardFootgearSlot7Level] = React.useState(null)
    const [cardAccessorySlot7, setCardAccessorySlot7] = React.useState(null)
    const [cardAccessorySlot7Level, setCardAccessorySlot7Level] = React.useState(null)
    const [allPowerSlot7, setAllPowerSlot7] = React.useState(0)
    const [isStakeNowSlot7, setIsStakeNowSlot7] = React.useState(null)
    const [timeToRunoutSlot7, setTimeToRunoutSlot7] = React.useState(null)
    const [isRunoutSlot7, setIsRunoutSlot7] = React.useState(false)
    const [gemPendingSlot7, setGemPendingSlot7] = React.useState(0)

    const [charSlot8, setCharSlot8] = React.useState(null)
    const [charSlot8Level, setCharSlot8Level] = React.useState(null)
    const [weaponOneSlot8, setWeaponOneSlot8] = React.useState(null)
    const [weaponOneSlot8Level, setWeaponOneSlot8Level] = React.useState(null)
    const [shieldSlot8, setShieldSlot8] = React.useState(null)
    const [shieldSlot8Level, setShieldSlot8Level] = React.useState(null)
    const [armorSlot8, setArmorSlot8] = React.useState(null)
    const [armorSlot8Level, setArmorSlot8Level] = React.useState(null)
    const [headUpperSlot8, setHeadUpperSlot8] = React.useState(null)
    const [headUpperSlot8Level, setHeadUpperSlot8Level] = React.useState(null)
    const [headMiddleSlot8, setHeadMiddleSlot8] = React.useState(null)
    const [headMiddleSlot8Level, setHeadMiddleSlot8Level] = React.useState(null)
    const [headLowerSlot8, setHeadLowerSlot8] = React.useState(null)
    const [headLowerSlot8Level, setHeadLowerSlot8Level] = React.useState(null)
    const [garmentSlot8, setGarmentSlot8] = React.useState(null)
    const [garmentSlot8Level, setGarmentSlot8Level] = React.useState(null)
    const [footgearSlot8, setFootgearSlot8] = React.useState(null)
    const [footgearSlot8Level, setFootgearSlot8Level] = React.useState(null)
    const [accessorySlot8, setAccessorySlot8] = React.useState(null)
    const [accessorySlot8Level, setAccessorySlot8Level] = React.useState(null)
    const [talismanOneSlot8, setTalismanOneSlot8] = React.useState(null)
    const [talismanOneSlot8Level, setTalismanOneSlot8Level] = React.useState(null)
    const [talismanTwoSlot8, setTalismanTwoSlot8] = React.useState(null)
    const [talismanTwoSlot8Level, setTalismanTwoSlot8Level] = React.useState(null)
    const [wingSlot8, setWingSlot8] = React.useState(null)
    const [wingSlot8Level, setWingSlot8Level] = React.useState(null)
    const [daemonSlot8, setDaemonSlot8] = React.useState(null)
    const [daemonSlot8Level, setDaemonSlot8Level] = React.useState(null)
    const [jewelSlot8, setJewelSlot8] = React.useState(null)
    const [jewelSlot8Level, setJewelSlot8Level] = React.useState(null)
    const [weaponTwoSlot8, setWeaponTwoSlot8] = React.useState(null)
    const [weaponTwoSlot8Level, setWeaponTwoSlot8Level] = React.useState(null)
    const [cardWeaponSlot8, setCardWeaponSlot8] = React.useState(null)
    const [cardWeaponSlot8Level, setCardWeaponSlot8Level] = React.useState(null)
    const [cardShieldSlot8, setCardShieldSlot8] = React.useState(null)
    const [cardShieldSlot8Level, setCardShieldSlot8Level] = React.useState(null)
    const [cardArmorSlot8, setCardArmorSlot8] = React.useState(null)
    const [cardArmorSlot8Level, setCardArmorSlot8Level] = React.useState(null)
    const [cardHeadUpperSlot8, setCardHeadUpperSlot8] = React.useState(null)
    const [cardHeadUpperSlot8Level, setCardHeadUpperSlot8Level] = React.useState(null)
    const [cardHeadMiddleSlot8, setCardHeadMiddleSlot8] = React.useState(null)
    const [cardHeadMiddleSlot8Level, setCardHeadMiddleSlot8Level] = React.useState(null)
    const [cardHeadLowerSlot8, setCardHeadLowerSlot8] = React.useState(null)
    const [cardHeadLowerSlot8Level, setCardHeadLowerSlot8Level] = React.useState(null)
    const [cardGarmentSlot8, setCardGarmentSlot8] = React.useState(null)
    const [cardGarmentSlot8Level, setCardGarmentSlot8Level] = React.useState(null)
    const [cardFootgearSlot8, setCardFootgearSlot8] = React.useState(null)
    const [cardFootgearSlot8Level, setCardFootgearSlot8Level] = React.useState(null)
    const [cardAccessorySlot8, setCardAccessorySlot8] = React.useState(null)
    const [cardAccessorySlot8Level, setCardAccessorySlot8Level] = React.useState(null)
    const [allPowerSlot8, setAllPowerSlot8] = React.useState(0)
    const [isStakeNowSlot8, setIsStakeNowSlot8] = React.useState(null)
    const [timeToRunoutSlot8, setTimeToRunoutSlot8] = React.useState(null)
    const [isRunoutSlot8, setIsRunoutSlot8] = React.useState(false)
    const [gemPendingSlot8, setGemPendingSlot8] = React.useState(0)

    const [charSlot9, setCharSlot9] = React.useState(null)
    const [charSlot9Level, setCharSlot9Level] = React.useState(null)
    const [weaponOneSlot9, setWeaponOneSlot9] = React.useState(null)
    const [weaponOneSlot9Level, setWeaponOneSlot9Level] = React.useState(null)
    const [shieldSlot9, setShieldSlot9] = React.useState(null)
    const [shieldSlot9Level, setShieldSlot9Level] = React.useState(null)
    const [armorSlot9, setArmorSlot9] = React.useState(null)
    const [armorSlot9Level, setArmorSlot9Level] = React.useState(null)
    const [headUpperSlot9, setHeadUpperSlot9] = React.useState(null)
    const [headUpperSlot9Level, setHeadUpperSlot9Level] = React.useState(null)
    const [headMiddleSlot9, setHeadMiddleSlot9] = React.useState(null)
    const [headMiddleSlot9Level, setHeadMiddleSlot9Level] = React.useState(null)
    const [headLowerSlot9, setHeadLowerSlot9] = React.useState(null)
    const [headLowerSlot9Level, setHeadLowerSlot9Level] = React.useState(null)
    const [garmentSlot9, setGarmentSlot9] = React.useState(null)
    const [garmentSlot9Level, setGarmentSlot9Level] = React.useState(null)
    const [footgearSlot9, setFootgearSlot9] = React.useState(null)
    const [footgearSlot9Level, setFootgearSlot9Level] = React.useState(null)
    const [accessorySlot9, setAccessorySlot9] = React.useState(null)
    const [accessorySlot9Level, setAccessorySlot9Level] = React.useState(null)
    const [talismanOneSlot9, setTalismanOneSlot9] = React.useState(null)
    const [talismanOneSlot9Level, setTalismanOneSlot9Level] = React.useState(null)
    const [talismanTwoSlot9, setTalismanTwoSlot9] = React.useState(null)
    const [talismanTwoSlot9Level, setTalismanTwoSlot9Level] = React.useState(null)
    const [wingSlot9, setWingSlot9] = React.useState(null)
    const [wingSlot9Level, setWingSlot9Level] = React.useState(null)
    const [daemonSlot9, setDaemonSlot9] = React.useState(null)
    const [daemonSlot9Level, setDaemonSlot9Level] = React.useState(null)
    const [jewelSlot9, setJewelSlot9] = React.useState(null)
    const [jewelSlot9Level, setJewelSlot9Level] = React.useState(null)
    const [weaponTwoSlot9, setWeaponTwoSlot9] = React.useState(null)
    const [weaponTwoSlot9Level, setWeaponTwoSlot9Level] = React.useState(null)
    const [cardWeaponSlot9, setCardWeaponSlot9] = React.useState(null)
    const [cardWeaponSlot9Level, setCardWeaponSlot9Level] = React.useState(null)
    const [cardShieldSlot9, setCardShieldSlot9] = React.useState(null)
    const [cardShieldSlot9Level, setCardShieldSlot9Level] = React.useState(null)
    const [cardArmorSlot9, setCardArmorSlot9] = React.useState(null)
    const [cardArmorSlot9Level, setCardArmorSlot9Level] = React.useState(null)
    const [cardHeadUpperSlot9, setCardHeadUpperSlot9] = React.useState(null)
    const [cardHeadUpperSlot9Level, setCardHeadUpperSlot9Level] = React.useState(null)
    const [cardHeadMiddleSlot9, setCardHeadMiddleSlot9] = React.useState(null)
    const [cardHeadMiddleSlot9Level, setCardHeadMiddleSlot9Level] = React.useState(null)
    const [cardHeadLowerSlot9, setCardHeadLowerSlot9] = React.useState(null)
    const [cardHeadLowerSlot9Level, setCardHeadLowerSlot9Level] = React.useState(null)
    const [cardGarmentSlot9, setCardGarmentSlot9] = React.useState(null)
    const [cardGarmentSlot9Level, setCardGarmentSlot9Level] = React.useState(null)
    const [cardFootgearSlot9, setCardFootgearSlot9] = React.useState(null)
    const [cardFootgearSlot9Level, setCardFootgearSlot9Level] = React.useState(null)
    const [cardAccessorySlot9, setCardAccessorySlot9] = React.useState(null)
    const [cardAccessorySlot9Level, setCardAccessorySlot9Level] = React.useState(null)
    const [allPowerSlot9, setAllPowerSlot9] = React.useState(0)
    const [isStakeNowSlot9, setIsStakeNowSlot9] = React.useState(null)
    const [timeToRunoutSlot9, setTimeToRunoutSlot9] = React.useState(null)
    const [isRunoutSlot9, setIsRunoutSlot9] = React.useState(false)
    const [gemPendingSlot9, setGemPendingSlot9] = React.useState(0)

    const [charSlot10, setCharSlot10] = React.useState(null)
    const [charSlot10Level, setCharSlot10Level] = React.useState(null)
    const [weaponOneSlot10, setWeaponOneSlot10] = React.useState(null)
    const [weaponOneSlot10Level, setWeaponOneSlot10Level] = React.useState(null)
    const [shieldSlot10, setShieldSlot10] = React.useState(null)
    const [shieldSlot10Level, setShieldSlot10Level] = React.useState(null)
    const [armorSlot10, setArmorSlot10] = React.useState(null)
    const [armorSlot10Level, setArmorSlot10Level] = React.useState(null)
    const [headUpperSlot10, setHeadUpperSlot10] = React.useState(null)
    const [headUpperSlot10Level, setHeadUpperSlot10Level] = React.useState(null)
    const [headMiddleSlot10, setHeadMiddleSlot10] = React.useState(null)
    const [headMiddleSlot10Level, setHeadMiddleSlot10Level] = React.useState(null)
    const [headLowerSlot10, setHeadLowerSlot10] = React.useState(null)
    const [headLowerSlot10Level, setHeadLowerSlot10Level] = React.useState(null)
    const [garmentSlot10, setGarmentSlot10] = React.useState(null)
    const [garmentSlot10Level, setGarmentSlot10Level] = React.useState(null)
    const [footgearSlot10, setFootgearSlot10] = React.useState(null)
    const [footgearSlot10Level, setFootgearSlot10Level] = React.useState(null)
    const [accessorySlot10, setAccessorySlot10] = React.useState(null)
    const [accessorySlot10Level, setAccessorySlot10Level] = React.useState(null)
    const [talismanOneSlot10, setTalismanOneSlot10] = React.useState(null)
    const [talismanOneSlot10Level, setTalismanOneSlot10Level] = React.useState(null)
    const [talismanTwoSlot10, setTalismanTwoSlot10] = React.useState(null)
    const [talismanTwoSlot10Level, setTalismanTwoSlot10Level] = React.useState(null)
    const [wingSlot10, setWingSlot10] = React.useState(null)
    const [wingSlot10Level, setWingSlot10Level] = React.useState(null)
    const [daemonSlot10, setDaemonSlot10] = React.useState(null)
    const [daemonSlot10Level, setDaemonSlot10Level] = React.useState(null)
    const [jewelSlot10, setJewelSlot10] = React.useState(null)
    const [jewelSlot10Level, setJewelSlot10Level] = React.useState(null)
    const [weaponTwoSlot10, setWeaponTwoSlot10] = React.useState(null)
    const [weaponTwoSlot10Level, setWeaponTwoSlot10Level] = React.useState(null)
    const [cardWeaponSlot10, setCardWeaponSlot10] = React.useState(null)
    const [cardWeaponSlot10Level, setCardWeaponSlot10Level] = React.useState(null)
    const [cardShieldSlot10, setCardShieldSlot10] = React.useState(null)
    const [cardShieldSlot10Level, setCardShieldSlot10Level] = React.useState(null)
    const [cardArmorSlot10, setCardArmorSlot10] = React.useState(null)
    const [cardArmorSlot10Level, setCardArmorSlot10Level] = React.useState(null)
    const [cardHeadUpperSlot10, setCardHeadUpperSlot10] = React.useState(null)
    const [cardHeadUpperSlot10Level, setCardHeadUpperSlot10Level] = React.useState(null)
    const [cardHeadMiddleSlot10, setCardHeadMiddleSlot10] = React.useState(null)
    const [cardHeadMiddleSlot10Level, setCardHeadMiddleSlot10Level] = React.useState(null)
    const [cardHeadLowerSlot10, setCardHeadLowerSlot10] = React.useState(null)
    const [cardHeadLowerSlot10Level, setCardHeadLowerSlot10Level] = React.useState(null)
    const [cardGarmentSlot10, setCardGarmentSlot10] = React.useState(null)
    const [cardGarmentSlot10Level, setCardGarmentSlot10Level] = React.useState(null)
    const [cardFootgearSlot10, setCardFootgearSlot10] = React.useState(null)
    const [cardFootgearSlot10Level, setCardFootgearSlot10Level] = React.useState(null)
    const [cardAccessorySlot10, setCardAccessorySlot10] = React.useState(null)
    const [cardAccessorySlot10Level, setCardAccessorySlot10Level] = React.useState(null)
    const [allPowerSlot10, setAllPowerSlot10] = React.useState(0)
    const [isStakeNowSlot10, setIsStakeNowSlot10] = React.useState(null)
    const [timeToRunoutSlot10, setTimeToRunoutSlot10] = React.useState(null)
    const [isRunoutSlot10, setIsRunoutSlot10] = React.useState(false)
    const [gemPendingSlot10, setGemPendingSlot10] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const hrmnftSC = new ethers.Contract(hrmNft, erc721ABI, providerBBQ)
        setNft([])
        
        const thefetch = async () => {
            const nftEQ1_slot1 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip',
                args: [address, 0],
            }) : [0, 0, 0, 0, 0, 0, 0]
            const nftEQ2_slot1 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip2',
                args: [address, 0],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftEQCard_slot1 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquipCard',
                args: [address, 0],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftStatus_slot1 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftStatus',
                args: [address, 0],
            }) : [0, 0, false]
            const data_slot1 = await readContracts({
                contracts: [
                    {
                        address: engyToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunGEM,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunGEM,
                        abi: dunGEMABI,
                        functionName: 'calculateRewards',
                        args: [address, 0],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot1[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot1[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot1[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot1[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot1[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot1[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot1[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot1[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot1[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot1[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot1[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot1[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot1[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot1[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot1[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot1[8])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot1[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot1[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot1[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot1[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot1[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot1[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot1[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot1[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot1[8])],
                    },
                ],
            })
            console.log(data_slot1)
            let nfts = []
            let response0_slot1 = null
            try {
                response0_slot1 = data_slot1[3].status === 'success' ? await fetch(data_slot1[3].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft1 = response0_slot1 !== null ? await response0_slot1.json() : {image: null, name: null}
            const nftEQ_1_Img = nft1.image !== null ? nft1.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_1_Name = nft1.name
            if (response0_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ1_slot1[0]),
                    Name: nftEQ_1_Name,
                    Image: nftEQ_1_Img,
                    Description: nft1.description,
                    Attribute: nft1.attributes,
                    RewardPerSec: Number(nftEQ1_slot1[0]) % 10000000,
                    isStaked: true
                })
            }
            let response1_slot1 = null
            try {
                response1_slot1 = data_slot1[4].status === 'success' ? await fetch(data_slot1[4].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft2 = response1_slot1 !== null ? await response1_slot1.json() : {image: null, name: null}
            const nftEQ_2_Img = nft2.image !== null ? nft2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_2_Name = nft2.name
            if (response1_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ1_slot1[1]),
                    Name: nftEQ_2_Name,
                    Image: nftEQ_2_Img,
                    Description: nft2.description,
                    Attribute: nft2.attributes,
                    RewardPerSec: Number(nftEQ1_slot1[1]) % 10000000,
                    isStaked: true
                })
            }
            let response2_slot1 = null
            try {
                response2_slot1 = data_slot1[5].status === 'success' ? await fetch(data_slot1[5].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft3 = response2_slot1 !== null ? await response2_slot1.json() : {image: null, name: null}
            const nftEQ_3_Img = nft3.image !== null ? nft3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_3_Name = nft3.name
            if (response2_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ1_slot1[2]),
                    Name: nftEQ_3_Name,
                    Image: nftEQ_3_Img,
                    Description: nft3.description,
                    Attribute: nft3.attributes,
                    RewardPerSec: Number(nftEQ1_slot1[2]) % 10000000,
                    isStaked: true
                })
            }
            let response3_slot1 = null
            try {
                response3_slot1 = data_slot1[6].status === 'success' ? await fetch(data_slot1[6].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft4 = response3_slot1 !== null ? await response3_slot1.json() : {image: null, name: null}
            const nftEQ_4_Img = nft4.image !== null ? nft4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_4_Name = nft4.name
            if (response3_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ1_slot1[3]),
                    Name: nftEQ_4_Name,
                    Image: nftEQ_4_Img,
                    Description: nft4.description,
                    Attribute: nft4.attributes,
                    RewardPerSec: Number(nftEQ1_slot1[3]) % 10000000,
                    isStaked: true
                })
            }
            let response4_slot1 = null
            try {
                response4_slot1 = data_slot1[7].status === 'success' ? await fetch(data_slot1[7].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft5 = response4_slot1 !== null ? await response4_slot1.json() : {image: null, name: null}
            const nftEQ_5_Img = nft5.image !== null ? nft5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_5_Name = nft5.name
            if (response4_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ1_slot1[4]),
                    Name: nftEQ_5_Name,
                    Image: nftEQ_5_Img,
                    Description: nft5.description,
                    Attribute: nft5.attributes,
                    RewardPerSec: Number(nftEQ1_slot1[4]) % 10000000,
                    isStaked: true
                })
            }
            let response5_slot1 = null
            try {
                response5_slot1 = data_slot1[8].status === 'success' ? await fetch(data_slot1[8].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft6 = response5_slot1 !== null ? await response5_slot1.json() : {image: null, name: null}
            const nftEQ_6_Img = nft6.image !== null ? nft6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_6_Name = nft6.name
            if (response5_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ1_slot1[5]),
                    Name: nftEQ_6_Name,
                    Image: nftEQ_6_Img,
                    Description: nft6.description,
                    Attribute: nft6.attributes,
                    RewardPerSec: Number(nftEQ1_slot1[5]) % 10000000,
                    isStaked: true
                })
            }
            let response6_slot1 = null
            try {
                response6_slot1 = data_slot1[9].status === 'success' ? await fetch(data_slot1[9].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft7 = response6_slot1 !== null ? await response6_slot1.json() : {image: null, name: null}
            const nftEQ_7_Img = nft7.image !== null ? nft7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_7_Name = nft7.name
            if (response6_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ1_slot1[6]),
                    Name: nftEQ_7_Name,
                    Image: nftEQ_7_Img,
                    Description: nft7.description,
                    Attribute: nft7.attributes,
                    RewardPerSec: Number(nftEQ1_slot1[6]) % 10000000,
                    isStaked: true
                })
            }
            let response7_slot1 = null
            try {
                response7_slot1 = data_slot1[10].status === 'success' ? await fetch(data_slot1[10].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft8 = response7_slot1 !== null ? await response7_slot1.json() : {image: null, name: null}
            const nftEQ_8_Img = nft8.image !== null ? nft8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_8_Name = nft8.name
            if (response7_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ2_slot1[0]),
                    Name: nftEQ_8_Name,
                    Image: nftEQ_8_Img,
                    Description: nft8.description,
                    Attribute: nft8.attributes,
                    RewardPerSec: Number(nftEQ2_slot1[0]) % 10000000,
                    isStaked: true
                })
            }
            let response8_slot1 = null
            try {
                response8_slot1 = data_slot1[11].status === 'success' ? await fetch(data_slot1[11].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft9 = response8_slot1 !== null ? await response8_slot1.json() : {image: null, name: null}
            const nftEQ_9_Img = nft9.image !== null ? nft9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_9_Name = nft9.name
            if (response8_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ2_slot1[1]),
                    Name: nftEQ_9_Name,
                    Image: nftEQ_9_Img,
                    Description: nft9.description,
                    Attribute: nft9.attributes,
                    RewardPerSec: Number(nftEQ2_slot1[1]) % 10000000,
                    isStaked: true
                })
            }
            let response9_slot1 = null
            try {
                response9_slot1 = data_slot1[12].status === 'success' ? await fetch(data_slot1[12].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft10 = response9_slot1 !== null ? await response9_slot1.json() : {image: null, name: null}
            const nftEQ_10_Img = nft10.image !== null ? nft10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_10_Name = nft10.name
            if (response9_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ2_slot1[2]),
                    Name: nftEQ_10_Name,
                    Image: nftEQ_10_Img,
                    Description: nft10.description,
                    Attribute: nft10.attributes,
                    RewardPerSec: Number(nftEQ2_slot1[2]) % 10000000,
                    isStaked: true
                })
            }
            let response10_slot1 = null
            try {
                response10_slot1 = data_slot1[13].status === 'success' ? await fetch(data_slot1[13].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft11 = response10_slot1 !== null ? await response10_slot1.json() : {image: null, name: null}
            const nftEQ_11_Img = nft11.image !== null ? nft11.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_11_Name = nft11.name
            if (response10_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ2_slot1[3]),
                    Name: nftEQ_11_Name,
                    Image: nftEQ_11_Img,
                    Description: nft11.description,
                    Attribute: nft11.attributes,
                    RewardPerSec: Number(nftEQ2_slot1[3]) % 10000000,
                    isStaked: true
                })
            }
            let response11_slot1 = null
            try {
                response11_slot1 = data_slot1[14].status === 'success' ? await fetch(data_slot1[14].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft12 = response11_slot1 !== null ? await response11_slot1.json() : {image: null, name: null}
            const nftEQ_12_Img = nft12.image !== null ? nft12.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_12_Name = nft12.name
            if (response11_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ2_slot1[4]),
                    Name: nftEQ_12_Name,
                    Image: nftEQ_12_Img,
                    Description: nft12.description,
                    Attribute: nft12.attributes,
                    RewardPerSec: Number(nftEQ2_slot1[4]) % 10000000,
                    isStaked: true
                })
            }
            let response12_slot1 = null
            try {
                response12_slot1 = data_slot1[15].status === 'success' ? await fetch(data_slot1[15].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft13 = response12_slot1 !== null ? await response12_slot1.json() : {image: null, name: null}
            const nftEQ_13_Img = nft13.image !== null ? nft13.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_13_Name = nft13.name
            if (response12_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ2_slot1[5]),
                    Name: nftEQ_13_Name,
                    Image: nftEQ_13_Img,
                    Description: nft13.description,
                    Attribute: nft13.attributes,
                    RewardPerSec: Number(nftEQ2_slot1[5]) % 10000000,
                    isStaked: true
                })
            }
            let response13_slot1 = null
            try {
                response13_slot1 = data_slot1[16].status === 'success' ? await fetch(data_slot1[16].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft14 = response13_slot1 !== null ? await response13_slot1.json() : {image: null, name: null}
            const nftEQ_14_Img = nft14.image !== null ? nft14.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_14_Name = nft14.name
            if (response13_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ2_slot1[6]),
                    Name: nftEQ_14_Name,
                    Image: nftEQ_14_Img,
                    Description: nft14.description,
                    Attribute: nft14.attributes,
                    RewardPerSec: Number(nftEQ2_slot1[6]) % 10000000,
                    isStaked: true
                })
            }
            let response14_slot1 = null
            try {
                response14_slot1 = data_slot1[17].status === 'success' ? await fetch(data_slot1[17].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft15 = response14_slot1 !== null ? await response14_slot1.json() : {image: null, name: null}
            const nftEQ_15_Img = nft15.image !== null ? nft15.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_15_Name = nft15.name
            if (response14_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ2_slot1[7]),
                    Name: nftEQ_15_Name,
                    Image: nftEQ_15_Img,
                    Description: nft15.description,
                    Attribute: nft15.attributes,
                    RewardPerSec: Number(nftEQ2_slot1[7]) % 10000000,
                    isStaked: true
                })
            }
            let response15_slot1 = null
            try {
                response15_slot1 = data_slot1[18].status === 'success' ? await fetch(data_slot1[18].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft16 = response15_slot1 !== null ? await response15_slot1.json() : {image: null, name: null}
            const nftEQ_16_Img = nft16.image !== null ? nft16.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_16_Name = nft16.name
            if (response15_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQ2_slot1[8]),
                    Name: nftEQ_16_Name,
                    Image: nftEQ_16_Img,
                    Description: nft16.description,
                    Attribute: nft16.attributes,
                    RewardPerSec: Number(nftEQ2_slot1[8]) % 10000000,
                    isStaked: true
                })
            }
            let response16_slot1 = null
            try {
                response16_slot1 = data_slot1[19].status === 'success' ? await fetch(data_slot1[19].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft17 = response16_slot1 !== null ? await response16_slot1.json() : {image: null, name: null}
            const nftEQ_17_Img = nft17.image !== null ? nft17.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_17_Name = nft17.name
            if (response16_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQCard_slot1[0]),
                    Name: nftEQ_17_Name,
                    Image: nftEQ_17_Img,
                    Description: nft17.description,
                    Attribute: nft17.attributes,
                    RewardPerSec: Number(nftEQCard_slot1[0]) % 10000000,
                    isStaked: true
                })
            }
            let response17_slot1 = null
            try {
                response17_slot1 = data_slot1[20].status === 'success' ? await fetch(data_slot1[20].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft18 = response17_slot1 !== null ? await response17_slot1.json() : {image: null, name: null}
            const nftEQ_18_Img = nft18.image !== null ? nft18.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_18_Name = nft18.name
            if (response17_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQCard_slot1[1]),
                    Name: nftEQ_18_Name,
                    Image: nftEQ_18_Img,
                    Description: nft18.description,
                    Attribute: nft18.attributes,
                    RewardPerSec: Number(nftEQCard_slot1[1]) % 10000000,
                    isStaked: true
                })
            }
            let response18_slot1 = null
            try {
                response18_slot1 = data_slot1[21].status === 'success' ? await fetch(data_slot1[21].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft19 = response18_slot1 !== null ? await response18_slot1.json() : {image: null, name: null}
            const nftEQ_19_Img = nft19.image !== null ? nft19.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_19_Name = nft19.name
            if (response18_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQCard_slot1[2]),
                    Name: nftEQ_19_Name,
                    Image: nftEQ_19_Img,
                    Description: nft19.description,
                    Attribute: nft19.attributes,
                    RewardPerSec: Number(nftEQCard_slot1[2]) % 10000000,
                    isStaked: true
                })
            }
            let response19_slot1 = null
            try {
                response19_slot1 = data_slot1[22].status === 'success' ? await fetch(data_slot1[22].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft20 = response19_slot1 !== null ? await response19_slot1.json() : {image: null, name: null}
            const nftEQ_20_Img = nft20.image !== null ? nft20.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_20_Name = nft20.name
            if (response19_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQCard_slot1[3]),
                    Name: nftEQ_20_Name,
                    Image: nftEQ_20_Img,
                    Description: nft20.description,
                    Attribute: nft20.attributes,
                    RewardPerSec: Number(nftEQCard_slot1[3]) % 10000000,
                    isStaked: true
                })
            }
            let response20_slot1 = null
            try {
                response20_slot1 = data_slot1[23].status === 'success' ? await fetch(data_slot1[23].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft21 = response20_slot1 !== null ? await response20_slot1.json() : {image: null, name: null}
            const nftEQ_21_Img = nft21.image !== null ? nft21.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_21_Name = nft21.name
            if (response20_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQCard_slot1[4]),
                    Name: nftEQ_21_Name,
                    Image: nftEQ_21_Img,
                    Description: nft21.description,
                    Attribute: nft21.attributes,
                    RewardPerSec: Number(nftEQCard_slot1[4]) % 10000000,
                    isStaked: true
                })
            }
            let response21_slot1 = null
            try {
                response21_slot1 = data_slot1[24].status === 'success' ? await fetch(data_slot1[24].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft22 = response21_slot1 !== null ? await response21_slot1.json() : {image: null, name: null}
            const nftEQ_22_Img = nft22.image !== null ? nft22.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_22_Name = nft22.name
            if (response21_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQCard_slot1[5]),
                    Name: nftEQ_22_Name,
                    Image: nftEQ_22_Img,
                    Description: nft22.description,
                    Attribute: nft22.attributes,
                    RewardPerSec: Number(nftEQCard_slot1[5]) % 10000000,
                    isStaked: true
                })
            }
            let response22_slot1 = null
            try {
                response22_slot1 = data_slot1[25].status === 'success' ? await fetch(data_slot1[25].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft23 = response22_slot1 !== null ? await response22_slot1.json() : {image: null, name: null}
            const nftEQ_23_Img = nft23.image !== null ? nft23.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_23_Name = nft23.name
            if (response22_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQCard_slot1[6]),
                    Name: nftEQ_23_Name,
                    Image: nftEQ_23_Img,
                    Description: nft23.description,
                    Attribute: nft23.attributes,
                    RewardPerSec: Number(nftEQCard_slot1[6]) % 10000000,
                    isStaked: true
                })
            }
            let response23_slot1 = null
            try {
                response23_slot1 = data_slot1[26].status === 'success' ? await fetch(data_slot1[26].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft24 = response23_slot1 !== null ? await response23_slot1.json() : {image: null, name: null}
            const nftEQ_24_Img = nft24.image !== null ? nft24.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_24_Name = nft24.name
            if (response23_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQCard_slot1[7]),
                    Name: nftEQ_24_Name,
                    Image: nftEQ_24_Img,
                    Description: nft24.description,
                    Attribute: nft24.attributes,
                    RewardPerSec: Number(nftEQCard_slot1[7]) % 10000000,
                    isStaked: true
                })
            }
            let response24_slot1 = null
            try {
                response24_slot1 = data_slot1[27].status === 'success' ? await fetch(data_slot1[27].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft25 = response24_slot1 !== null ? await response24_slot1.json() : {image: null, name: null}
            const nftEQ_25_Img = nft25.image !== null ? nft25.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_25_Name = nft25.name
            if (response24_slot1 !== null) {
                nfts.push({
                    Slot: 1,
                    Id: Number(nftEQCard_slot1[8]),
                    Name: nftEQ_25_Name,
                    Image: nftEQ_25_Img,
                    Description: nft25.description,
                    Attribute: nft25.attributes,
                    RewardPerSec: Number(nftEQCard_slot1[8]) % 10000000,
                    isStaked: true
                })
            }
            const allPow = Number(nftStatus_slot1[0])
            const isStaked = nftStatus_slot1[2]
            const refuelAt = Number(nftStatus_slot1[1])
            const engyBal = data_slot1[0].result
            const gemBal = data_slot1[1].result
            const rewardPending = isStaked ? data_slot1[2].result : 0

            const nftEQ1_slot2 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip',
                args: [address, 1],
            }) : [0, 0, 0, 0, 0, 0, 0]
            const nftEQ2_slot2 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip2',
                args: [address, 1],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftEQCard_slot2 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquipCard',
                args: [address, 1],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftStatus_slot2 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftStatus',
                args: [address, 1],
            }) : [0, 0, false]
            const data_slot2 = await readContracts({
                contracts: [
                    {
                        address: dunGEM,
                        abi: dunGEMABI,
                        functionName: 'calculateRewards',
                        args: [address, 1],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot2[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot2[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot2[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot2[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot2[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot2[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot2[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot2[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot2[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot2[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot2[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot2[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot2[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot2[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot2[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot2[8])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot2[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot2[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot2[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot2[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot2[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot2[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot2[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot2[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot2[8])],
                    },
                ],
            })
            console.log(data_slot2)
            let response0_slot2 = null
            try {
                response0_slot2 = data_slot2[1].status === 'success' ? await fetch(data_slot2[1].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft1_2 = response0_slot2 !== null ? await response0_slot2.json() : {image: null, name: null}
            const nftEQ_1_2_Img = nft1_2.image !== null ? nft1_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_1_2_Name = nft1_2.name
            if (response0_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ1_slot2[0]),
                    Name: nftEQ_1_2_Name,
                    Image: nftEQ_1_2_Img,
                    Description: nft1_2.description,
                    Attribute: nft1_2.attributes,
                    RewardPerSec: Number(nftEQ1_slot2[0]) % 10000000,
                    isStaked: true
                })
            }
            let response1_slot2 = null
            try {
                response1_slot2 = data_slot2[2].status === 'success' ? await fetch(data_slot2[2].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft2_2 = response1_slot2 !== null ? await response1_slot2.json() : {image: null, name: null}
            const nftEQ_2_2_Img = nft2_2.image !== null ? nft2_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_2_2_Name = nft2_2.name
            if (response1_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ1_slot2[1]),
                    Name: nftEQ_2_2_Name,
                    Image: nftEQ_2_2_Img,
                    Description: nft2_2.description,
                    Attribute: nft2_2.attributes,
                    RewardPerSec: Number(nftEQ1_slot2[1]) % 10000000,
                    isStaked: true
                })
            }
            let response2_slot2 = null
            try {
                response2_slot2 = data_slot2[3].status === 'success' ? await fetch(data_slot2[3].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft3_2 = response2_slot2 !== null ? await response2_slot2.json() : {image: null, name: null}
            const nftEQ_3_2_Img = nft3_2.image !== null ? nft3_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_3_2_Name = nft3_2.name
            if (response2_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ1_slot2[2]),
                    Name: nftEQ_3_2_Name,
                    Image: nftEQ_3_2_Img,
                    Description: nft3_2.description,
                    Attribute: nft3_2.attributes,
                    RewardPerSec: Number(nftEQ1_slot2[2]) % 10000000,
                    isStaked: true
                })
            }
            let response3_slot2 = null
            try {
                response3_slot2 = data_slot2[4].status === 'success' ? await fetch(data_slot2[4].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft4_2 = response3_slot2 !== null ? await response3_slot2.json() : {image: null, name: null}
            const nftEQ_4_2_Img = nft4_2.image !== null ? nft4_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_4_2_Name = nft4_2.name
            if (response3_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ1_slot2[3]),
                    Name: nftEQ_4_2_Name,
                    Image: nftEQ_4_2_Img,
                    Description: nft4_2.description,
                    Attribute: nft4_2.attributes,
                    RewardPerSec: Number(nftEQ1_slot2[3]) % 10000000,
                    isStaked: true
                })
            }
            let response4_slot2 = null
            try {
                response4_slot2 = data_slot2[5].status === 'success' ? await fetch(data_slot2[5].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft5_2 = response4_slot2 !== null ? await response4_slot2.json() : {image: null, name: null}
            const nftEQ_5_2_Img = nft5_2.image !== null ? nft5_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_5_2_Name = nft5_2.name
            if (response4_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ1_slot2[4]),
                    Name: nftEQ_5_2_Name,
                    Image: nftEQ_5_2_Img,
                    Description: nft5_2.description,
                    Attribute: nft5_2.attributes,
                    RewardPerSec: Number(nftEQ1_slot2[4]) % 10000000,
                    isStaked: true
                })
            }
            let response5_slot2 = null
            try {
                response5_slot2 = data_slot2[6].status === 'success' ? await fetch(data_slot2[6].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft6_2 = response5_slot2 !== null ? await response5_slot2.json() : {image: null, name: null}
            const nftEQ_6_2_Img = nft6_2.image !== null ? nft6_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_6_2_Name = nft6_2.name
            if (response5_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ1_slot2[5]),
                    Name: nftEQ_6_2_Name,
                    Image: nftEQ_6_2_Img,
                    Description: nft6_2.description,
                    Attribute: nft6_2.attributes,
                    RewardPerSec: Number(nftEQ1_slot2[5]) % 10000000,
                    isStaked: true
                })
            }
            let response6_slot2 = null
            try {
                response6_slot2 = data_slot2[7].status === 'success' ? await fetch(data_slot2[7].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft7_2 = response6_slot2 !== null ? await response6_slot2.json() : {image: null, name: null}
            const nftEQ_7_2_Img = nft7_2.image !== null ? nft7_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_7_2_Name = nft7_2.name
            if (response6_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ1_slot2[6]),
                    Name: nftEQ_7_2_Name,
                    Image: nftEQ_7_2_Img,
                    Description: nft7_2.description,
                    Attribute: nft7_2.attributes,
                    RewardPerSec: Number(nftEQ1_slot2[6]) % 10000000,
                    isStaked: true
                })
            }
            let response7_slot2 = null
            try {
                response7_slot2 = data_slot2[8].status === 'success' ? await fetch(data_slot2[8].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft8_2 = response7_slot2 !== null ? await response7_slot2.json() : {image: null, name: null}
            const nftEQ_8_2_Img = nft8_2.image !== null ? nft8_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_8_2_Name = nft8_2.name
            if (response7_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ2_slot2[0]),
                    Name: nftEQ_8_2_Name,
                    Image: nftEQ_8_2_Img,
                    Description: nft8_2.description,
                    Attribute: nft8_2.attributes,
                    RewardPerSec: Number(nftEQ2_slot2[0]) % 10000000,
                    isStaked: true
                })
            }
            let response8_slot2 = null
            try {
                response8_slot2 = data_slot2[9].status === 'success' ? await fetch(data_slot2[9].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft9_2 = response8_slot2 !== null ? await response8_slot2.json() : {image: null, name: null}
            const nftEQ_9_2_Img = nft9_2.image !== null ? nft9_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_9_2_Name = nft9_2.name
            if (response8_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ2_slot2[1]),
                    Name: nftEQ_9_2_Name,
                    Image: nftEQ_9_2_Img,
                    Description: nft9_2.description,
                    Attribute: nft9_2.attributes,
                    RewardPerSec: Number(nftEQ2_slot2[1]) % 10000000,
                    isStaked: true
                })
            }
            let response9_slot2 = null
            try {
                response9_slot2 = data_slot2[10].status === 'success' ? await fetch(data_slot2[10].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft10_2 = response9_slot2 !== null ? await response9_slot2.json() : {image: null, name: null}
            const nftEQ_10_2_Img = nft10_2.image !== null ? nft10_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_10_2_Name = nft10_2.name
            if (response9_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ2_slot2[2]),
                    Name: nftEQ_10_2_Name,
                    Image: nftEQ_10_2_Img,
                    Description: nft10_2.description,
                    Attribute: nft10_2.attributes,
                    RewardPerSec: Number(nftEQ2_slot2[2]) % 10000000,
                    isStaked: true
                })
            }
            let response10_slot2 = null
            try {
                response10_slot2 = data_slot2[11].status === 'success' ? await fetch(data_slot2[11].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft11_2 = response10_slot2 !== null ? await response10_slot2.json() : {image: null, name: null}
            const nftEQ_11_2_Img = nft11_2.image !== null ? nft11_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_11_2_Name = nft11_2.name
            if (response10_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ2_slot2[3]),
                    Name: nftEQ_11_2_Name,
                    Image: nftEQ_11_2_Img,
                    Description: nft11_2.description,
                    Attribute: nft11_2.attributes,
                    RewardPerSec: Number(nftEQ2_slot2[3]) % 10000000,
                    isStaked: true
                })
            }
            let response11_slot2 = null
            try {
                response11_slot2 = data_slot2[12].status === 'success' ? await fetch(data_slot2[12].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft12_2 = response11_slot2 !== null ? await response11_slot2.json() : {image: null, name: null}
            const nftEQ_12_2_Img = nft12_2.image !== null ? nft12_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_12_2_Name = nft12_2.name
            if (response11_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ2_slot2[4]),
                    Name: nftEQ_12_2_Name,
                    Image: nftEQ_12_2_Img,
                    Description: nft12_2.description,
                    Attribute: nft12_2.attributes,
                    RewardPerSec: Number(nftEQ2_slot2[4]) % 10000000,
                    isStaked: true
                })
            }
            let response12_slot2 = null
            try {
                response12_slot2 = data_slot2[13].status === 'success' ? await fetch(data_slot2[13].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft13_2 = response12_slot2 !== null ? await response12_slot2.json() : {image: null, name: null}
            const nftEQ_13_2_Img = nft13_2.image !== null ? nft13_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_13_2_Name = nft13_2.name
            if (response12_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ2_slot2[5]),
                    Name: nftEQ_13_2_Name,
                    Image: nftEQ_13_2_Img,
                    Description: nft13_2.description,
                    Attribute: nft13_2.attributes,
                    RewardPerSec: Number(nftEQ2_slot2[5]) % 10000000,
                    isStaked: true
                })
            }
            let response13_slot2 = null
            try {
                response13_slot2 = data_slot2[14].status === 'success' ? await fetch(data_slot2[14].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft14_2 = response13_slot2 !== null ? await response13_slot2.json() : {image: null, name: null}
            const nftEQ_14_2_Img = nft14_2.image !== null ? nft14_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_14_2_Name = nft14_2.name
            if (response13_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ2_slot2[6]),
                    Name: nftEQ_14_2_Name,
                    Image: nftEQ_14_2_Img,
                    Description: nft14_2.description,
                    Attribute: nft14_2.attributes,
                    RewardPerSec: Number(nftEQ2_slot2[6]) % 10000000,
                    isStaked: true
                })
            }
            let response14_slot2 = null
            try {
                response14_slot2 = data_slot2[15].status === 'success' ? await fetch(data_slot2[15].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft15_2 = response14_slot2 !== null ? await response14_slot2.json() : {image: null, name: null}
            const nftEQ_15_2_Img = nft15_2.image !== null ? nft15_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_15_2_Name = nft15_2.name
            if (response14_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ2_slot2[7]),
                    Name: nftEQ_15_2_Name,
                    Image: nftEQ_15_2_Img,
                    Description: nft15_2.description,
                    Attribute: nft15_2.attributes,
                    RewardPerSec: Number(nftEQ2_slot2[7]) % 10000000,
                    isStaked: true
                })
            }
            let response15_slot2 = null
            try {
                response15_slot2 = data_slot2[16].status === 'success' ? await fetch(data_slot2[16].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft16_2 = response15_slot2 !== null ? await response15_slot2.json() : {image: null, name: null}
            const nftEQ_16_2_Img = nft16_2.image !== null ? nft16_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_16_2_Name = nft16_2.name
            if (response15_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQ2_slot2[8]),
                    Name: nftEQ_16_2_Name,
                    Image: nftEQ_16_2_Img,
                    Description: nft16_2.description,
                    Attribute: nft16_2.attributes,
                    RewardPerSec: Number(nftEQ2_slot2[8]) % 10000000,
                    isStaked: true
                })
            }
            let response16_slot2 = null
            try {
                response16_slot2 = data_slot2[17].status === 'success' ? await fetch(data_slot2[17].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft17_2 = response16_slot2 !== null ? await response16_slot2.json() : {image: null, name: null}
            const nftEQ_17_2_Img = nft17_2.image !== null ? nft17_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_17_2_Name = nft17_2.name
            if (response16_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQCard_slot2[0]),
                    Name: nftEQ_17_2_Name,
                    Image: nftEQ_17_2_Img,
                    Description: nft17_2.description,
                    Attribute: nft17_2.attributes,
                    RewardPerSec: Number(nftEQCard_slot2[0]) % 10000000,
                    isStaked: true
                })
            }
            let response17_slot2 = null
            try {
                response17_slot2 = data_slot2[18].status === 'success' ? await fetch(data_slot2[18].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft18_2 = response17_slot2 !== null ? await response17_slot2.json() : {image: null, name: null}
            const nftEQ_18_2_Img = nft18_2.image !== null ? nft18_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_18_2_Name = nft18_2.name
            if (response17_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQCard_slot2[1]),
                    Name: nftEQ_18_2_Name,
                    Image: nftEQ_18_2_Img,
                    Description: nft18_2.description,
                    Attribute: nft18_2.attributes,
                    RewardPerSec: Number(nftEQCard_slot2[1]) % 10000000,
                    isStaked: true
                })
            }
            let response18_slot2 = null
            try {
                response18_slot2 = data_slot2[19].status === 'success' ? await fetch(data_slot2[19].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft19_2 = response18_slot2 !== null ? await response18_slot2.json() : {image: null, name: null}
            const nftEQ_19_2_Img = nft19_2.image !== null ? nft19_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_19_2_Name = nft19_2.name
            if (response18_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQCard_slot2[2]),
                    Name: nftEQ_19_2_Name,
                    Image: nftEQ_19_2_Img,
                    Description: nft19_2.description,
                    Attribute: nft19_2.attributes,
                    RewardPerSec: Number(nftEQCard_slot2[2]) % 10000000,
                    isStaked: true
                })
            }
            let response19_slot2 = null
            try {
                response19_slot2 = data_slot2[20].status === 'success' ? await fetch(data_slot2[20].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft20_2 = response19_slot2 !== null ? await response19_slot2.json() : {image: null, name: null}
            const nftEQ_20_2_Img = nft20_2.image !== null ? nft20_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_20_2_Name = nft20_2.name
            if (response19_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQCard_slot2[3]),
                    Name: nftEQ_20_2_Name,
                    Image: nftEQ_20_2_Img,
                    Description: nft20_2.description,
                    Attribute: nft20_2.attributes,
                    RewardPerSec: Number(nftEQCard_slot2[3]) % 10000000,
                    isStaked: true
                })
            }
            let response20_slot2 = null
            try {
                response20_slot2 = data_slot2[21].status === 'success' ? await fetch(data_slot2[21].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft21_2 = response20_slot2 !== null ? await response20_slot2.json() : {image: null, name: null}
            const nftEQ_21_2_Img = nft21_2.image !== null ? nft21_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_21_2_Name = nft21_2.name
            if (response20_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQCard_slot2[4]),
                    Name: nftEQ_21_2_Name,
                    Image: nftEQ_21_2_Img,
                    Description: nft21_2.description,
                    Attribute: nft21_2.attributes,
                    RewardPerSec: Number(nftEQCard_slot2[4]) % 10000000,
                    isStaked: true
                })
            }
            let response21_slot2 = null
            try {
                response21_slot2 = data_slot2[22].status === 'success' ? await fetch(data_slot2[22].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft22_2 = response21_slot2 !== null ? await response21_slot2.json() : {image: null, name: null}
            const nftEQ_22_2_Img = nft22_2.image !== null ? nft22_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_22_2_Name = nft22_2.name
            if (response21_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQCard_slot2[5]),
                    Name: nftEQ_22_2_Name,
                    Image: nftEQ_22_2_Img,
                    Description: nft22_2.description,
                    Attribute: nft22_2.attributes,
                    RewardPerSec: Number(nftEQCard_slot2[5]) % 10000000,
                    isStaked: true
                })
            }
            let response22_slot2 = null
            try {
                response22_slot2 = data_slot2[23].status === 'success' ? await fetch(data_slot2[23].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft23_2 = response22_slot2 !== null ? await response22_slot2.json() : {image: null, name: null}
            const nftEQ_23_2_Img = nft23_2.image !== null ? nft23_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_23_2_Name = nft23_2.name
            if (response22_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQCard_slot2[6]),
                    Name: nftEQ_23_2_Name,
                    Image: nftEQ_23_2_Img,
                    Description: nft23_2.description,
                    Attribute: nft23_2.attributes,
                    RewardPerSec: Number(nftEQCard_slot2[6]) % 10000000,
                    isStaked: true
                })
            }
            let response23_slot2 = null
            try {
                response23_slot2 = data_slot2[24].status === 'success' ? await fetch(data_slot2[24].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft24_2 = response23_slot2 !== null ? await response23_slot2.json() : {image: null, name: null}
            const nftEQ_24_2_Img = nft24_2.image !== null ? nft24_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_24_2_Name = nft24_2.name
            if (response23_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQCard_slot2[7]),
                    Name: nftEQ_24_2_Name,
                    Image: nftEQ_24_2_Img,
                    Description: nft24_2.description,
                    Attribute: nft24_2.attributes,
                    RewardPerSec: Number(nftEQCard_slot2[7]) % 10000000,
                    isStaked: true
                })
            }
            let response24_slot2 = null
            try {
                response24_slot2 = data_slot2[25].status === 'success' ? await fetch(data_slot2[25].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft25_2 = response24_slot2 !== null ? await response24_slot2.json() : {image: null, name: null}
            const nftEQ_25_2_Img = nft25_2.image !== null ? nft25_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_25_2_Name = nft25_2.name
            if (response24_slot2 !== null) {
                nfts.push({
                    Slot: 2,
                    Id: Number(nftEQCard_slot2[8]),
                    Name: nftEQ_25_2_Name,
                    Image: nftEQ_25_2_Img,
                    Description: nft25_2.description,
                    Attribute: nft25_2.attributes,
                    RewardPerSec: Number(nftEQCard_slot2[8]) % 10000000,
                    isStaked: true
                })
            }
            const allPow2 = Number(nftStatus_slot2[0])
            const isStaked2 = nftStatus_slot2[2]
            const refuelAt2 = Number(nftStatus_slot2[1])
            const rewardPending2 = isStaked2 ? data_slot2[0].result : 0

            const nftEQ1_slot3 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip',
                args: [address, 2],
            }) : [0, 0, 0, 0, 0, 0, 0]
            const nftEQ2_slot3 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip2',
                args: [address, 2],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftEQCard_slot3 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquipCard',
                args: [address, 2],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftStatus_slot3 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftStatus',
                args: [address, 2],
            }) : [0, 0, false]
            const data_slot3 = await readContracts({
                contracts: [
                    {
                        address: dunGEM,
                        abi: dunGEMABI,
                        functionName: 'calculateRewards',
                        args: [address, 2],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot3[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot3[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot3[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot3[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot3[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot3[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot3[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot3[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot3[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot3[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot3[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot3[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot3[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot3[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot3[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot3[8])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot3[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot3[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot3[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot3[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot3[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot3[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot3[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot3[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot3[8])],
                    },
                ],
            })
            console.log(data_slot3)
            let response0_slot3 = null
            try {
                response0_slot3 = data_slot3[1].status === 'success' ? await fetch(data_slot3[1].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft1_3 = response0_slot3 !== null ? await response0_slot3.json() : {image: null, name: null}
            const nftEQ_1_3_Img = nft1_3.image !== null ? nft1_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_1_3_Name = nft1_3.name
            if (response0_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ1_slot3[0]),
                    Name: nftEQ_1_3_Name,
                    Image: nftEQ_1_3_Img,
                    Description: nft1_3.description,
                    Attribute: nft1_3.attributes,
                    RewardPerSec: Number(nftEQ1_slot3[0]) % 10000000,
                    isStaked: true
                })
            }
            let response1_slot3 = null
            try {
                response1_slot3 = data_slot3[2].status === 'success' ? await fetch(data_slot3[2].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft2_3 = response1_slot3 !== null ? await response1_slot3.json() : {image: null, name: null}
            const nftEQ_2_3_Img = nft2_3.image !== null ? nft2_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_2_3_Name = nft2_3.name
            if (response1_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ1_slot3[1]),
                    Name: nftEQ_2_3_Name,
                    Image: nftEQ_2_3_Img,
                    Description: nft2_3.description,
                    Attribute: nft2_3.attributes,
                    RewardPerSec: Number(nftEQ1_slot3[1]) % 10000000,
                    isStaked: true
                })
            }
            let response2_slot3 = null
            try {
                response2_slot3 = data_slot3[3].status === 'success' ? await fetch(data_slot3[3].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft3_3 = response2_slot3 !== null ? await response2_slot3.json() : {image: null, name: null}
            const nftEQ_3_3_Img = nft3_3.image !== null ? nft3_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_3_3_Name = nft3_3.name
            if (response2_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ1_slot3[2]),
                    Name: nftEQ_3_3_Name,
                    Image: nftEQ_3_3_Img,
                    Description: nft3_3.description,
                    Attribute: nft3_3.attributes,
                    RewardPerSec: Number(nftEQ1_slot3[2]) % 10000000,
                    isStaked: true
                })
            }
            let response3_slot3 = null
            try {
                response3_slot3 = data_slot3[4].status === 'success' ? await fetch(data_slot3[4].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft4_3 = response3_slot3 !== null ? await response3_slot3.json() : {image: null, name: null}
            const nftEQ_4_3_Img = nft4_3.image !== null ? nft4_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_4_3_Name = nft4_3.name
            if (response3_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ1_slot3[3]),
                    Name: nftEQ_4_3_Name,
                    Image: nftEQ_4_3_Img,
                    Description: nft4_3.description,
                    Attribute: nft4_3.attributes,
                    RewardPerSec: Number(nftEQ1_slot3[3]) % 10000000,
                    isStaked: true
                })
            }
            let response4_slot3 = null
            try {
                response4_slot3 = data_slot3[5].status === 'success' ? await fetch(data_slot3[5].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft5_3 = response4_slot3 !== null ? await response4_slot3.json() : {image: null, name: null}
            const nftEQ_5_3_Img = nft5_3.image !== null ? nft5_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_5_3_Name = nft5_3.name
            if (response4_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ1_slot3[4]),
                    Name: nftEQ_5_3_Name,
                    Image: nftEQ_5_3_Img,
                    Description: nft5_3.description,
                    Attribute: nft5_3.attributes,
                    RewardPerSec: Number(nftEQ1_slot3[4]) % 10000000,
                    isStaked: true
                })
            }
            let response5_slot3 = null
            try {
                response5_slot3 = data_slot3[6].status === 'success' ? await fetch(data_slot3[6].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft6_3 = response5_slot3 !== null ? await response5_slot3.json() : {image: null, name: null}
            const nftEQ_6_3_Img = nft6_3.image !== null ? nft6_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_6_3_Name = nft6_3.name
            if (response5_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ1_slot3[5]),
                    Name: nftEQ_6_3_Name,
                    Image: nftEQ_6_3_Img,
                    Description: nft6_3.description,
                    Attribute: nft6_3.attributes,
                    RewardPerSec: Number(nftEQ1_slot3[5]) % 10000000,
                    isStaked: true
                })
            }
            let response6_slot3 = null
            try {
                response6_slot3 = data_slot3[7].status === 'success' ? await fetch(data_slot3[7].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft7_3 = response6_slot3 !== null ? await response6_slot3.json() : {image: null, name: null}
            const nftEQ_7_3_Img = nft7_3.image !== null ? nft7_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_7_3_Name = nft7_3.name
            if (response6_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ1_slot3[6]),
                    Name: nftEQ_7_3_Name,
                    Image: nftEQ_7_3_Img,
                    Description: nft7_3.description,
                    Attribute: nft7_3.attributes,
                    RewardPerSec: Number(nftEQ1_slot3[6]) % 10000000,
                    isStaked: true
                })
            }
            let response7_slot3 = null
            try {
                response7_slot3 = data_slot3[8].status === 'success' ? await fetch(data_slot3[8].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft8_3 = response7_slot3 !== null ? await response7_slot3.json() : {image: null, name: null}
            const nftEQ_8_3_Img = nft8_3.image !== null ? nft8_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_8_3_Name = nft8_3.name
            if (response7_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ2_slot3[0]),
                    Name: nftEQ_8_3_Name,
                    Image: nftEQ_8_3_Img,
                    Description: nft8_3.description,
                    Attribute: nft8_3.attributes,
                    RewardPerSec: Number(nftEQ2_slot3[0]) % 10000000,
                    isStaked: true
                })
            }
            let response8_slot3 = null
            try {
                response8_slot3 = data_slot3[9].status === 'success' ? await fetch(data_slot3[9].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft9_3 = response8_slot3 !== null ? await response8_slot3.json() : {image: null, name: null}
            const nftEQ_9_3_Img = nft9_3.image !== null ? nft9_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_9_3_Name = nft9_3.name
            if (response8_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ2_slot3[1]),
                    Name: nftEQ_9_3_Name,
                    Image: nftEQ_9_3_Img,
                    Description: nft9_3.description,
                    Attribute: nft9_3.attributes,
                    RewardPerSec: Number(nftEQ2_slot3[1]) % 10000000,
                    isStaked: true
                })
            }
            let response9_slot3 = null
            try {
                response9_slot3 = data_slot3[10].status === 'success' ? await fetch(data_slot3[10].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft10_3 = response9_slot3 !== null ? await response9_slot3.json() : {image: null, name: null}
            const nftEQ_10_3_Img = nft10_3.image !== null ? nft10_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_10_3_Name = nft10_3.name
            if (response9_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ2_slot3[2]),
                    Name: nftEQ_10_3_Name,
                    Image: nftEQ_10_3_Img,
                    Description: nft10_3.description,
                    Attribute: nft10_3.attributes,
                    RewardPerSec: Number(nftEQ2_slot3[2]) % 10000000,
                    isStaked: true
                })
            }
            let response10_slot3 = null
            try {
                response10_slot3 = data_slot3[11].status === 'success' ? await fetch(data_slot3[11].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft11_3 = response10_slot3 !== null ? await response10_slot3.json() : {image: null, name: null}
            const nftEQ_11_3_Img = nft11_3.image !== null ? nft11_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_11_3_Name = nft11_3.name
            if (response10_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ2_slot3[3]),
                    Name: nftEQ_11_3_Name,
                    Image: nftEQ_11_3_Img,
                    Description: nft11_3.description,
                    Attribute: nft11_3.attributes,
                    RewardPerSec: Number(nftEQ2_slot3[3]) % 10000000,
                    isStaked: true
                })
            }
            let response11_slot3 = null
            try {
                response11_slot3 = data_slot3[12].status === 'success' ? await fetch(data_slot3[12].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft12_3 = response11_slot3 !== null ? await response11_slot3.json() : {image: null, name: null}
            const nftEQ_12_3_Img = nft12_3.image !== null ? nft12_2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_12_3_Name = nft12_3.name
            if (response11_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ2_slot3[4]),
                    Name: nftEQ_12_3_Name,
                    Image: nftEQ_12_3_Img,
                    Description: nft12_3.description,
                    Attribute: nft12_3.attributes,
                    RewardPerSec: Number(nftEQ2_slot3[4]) % 10000000,
                    isStaked: true
                })
            }
            let response12_slot3 = null
            try {
                response12_slot3 = data_slot3[13].status === 'success' ? await fetch(data_slot3[13].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft13_3 = response12_slot3 !== null ? await response12_slot3.json() : {image: null, name: null}
            const nftEQ_13_3_Img = nft13_3.image !== null ? nft13_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_13_3_Name = nft13_3.name
            if (response12_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ2_slot3[5]),
                    Name: nftEQ_13_3_Name,
                    Image: nftEQ_13_3_Img,
                    Description: nft13_3.description,
                    Attribute: nft13_3.attributes,
                    RewardPerSec: Number(nftEQ2_slot3[5]) % 10000000,
                    isStaked: true
                })
            }
            let response13_slot3 = null
            try {
                response13_slot3 = data_slot3[14].status === 'success' ? await fetch(data_slot3[14].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft14_3 = response13_slot3 !== null ? await response13_slot3.json() : {image: null, name: null}
            const nftEQ_14_3_Img = nft14_3.image !== null ? nft14_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_14_3_Name = nft14_3.name
            if (response13_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ2_slot3[6]),
                    Name: nftEQ_14_3_Name,
                    Image: nftEQ_14_3_Img,
                    Description: nft14_3.description,
                    Attribute: nft14_3.attributes,
                    RewardPerSec: Number(nftEQ2_slot3[6]) % 10000000,
                    isStaked: true
                })
            }
            let response14_slot3 = null
            try {
                response14_slot3 = data_slot3[15].status === 'success' ? await fetch(data_slot3[15].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft15_3 = response14_slot3 !== null ? await response14_slot3.json() : {image: null, name: null}
            const nftEQ_15_3_Img = nft15_3.image !== null ? nft15_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_15_3_Name = nft15_3.name
            if (response14_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ2_slot3[7]),
                    Name: nftEQ_15_3_Name,
                    Image: nftEQ_15_3_Img,
                    Description: nft15_3.description,
                    Attribute: nft15_3.attributes,
                    RewardPerSec: Number(nftEQ2_slot3[7]) % 10000000,
                    isStaked: true
                })
            }
            let response15_slot3 = null
            try {
                response15_slot3 = data_slot3[16].status === 'success' ? await fetch(data_slot3[16].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft16_3 = response15_slot3 !== null ? await response15_slot3.json() : {image: null, name: null}
            const nftEQ_16_3_Img = nft16_3.image !== null ? nft16_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_16_3_Name = nft16_3.name
            if (response15_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQ2_slot3[8]),
                    Name: nftEQ_16_3_Name,
                    Image: nftEQ_16_3_Img,
                    Description: nft16_3.description,
                    Attribute: nft16_3.attributes,
                    RewardPerSec: Number(nftEQ2_slot3[8]) % 10000000,
                    isStaked: true
                })
            }
            let response16_slot3 = null
            try {
                response16_slot3 = data_slot3[17].status === 'success' ? await fetch(data_slot3[17].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft17_3 = response16_slot3 !== null ? await response16_slot3.json() : {image: null, name: null}
            const nftEQ_17_3_Img = nft17_3.image !== null ? nft17_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_17_3_Name = nft17_3.name
            if (response16_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQCard_slot3[0]),
                    Name: nftEQ_17_3_Name,
                    Image: nftEQ_17_3_Img,
                    Description: nft17_3.description,
                    Attribute: nft17_3.attributes,
                    RewardPerSec: Number(nftEQCard_slot3[0]) % 10000000,
                    isStaked: true
                })
            }
            let response17_slot3 = null
            try {
                response17_slot3 = data_slot3[18].status === 'success' ? await fetch(data_slot3[18].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft18_3 = response17_slot3 !== null ? await response17_slot3.json() : {image: null, name: null}
            const nftEQ_18_3_Img = nft18_3.image !== null ? nft18_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_18_3_Name = nft18_3.name
            if (response17_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQCard_slot3[1]),
                    Name: nftEQ_18_3_Name,
                    Image: nftEQ_18_3_Img,
                    Description: nft18_3.description,
                    Attribute: nft18_3.attributes,
                    RewardPerSec: Number(nftEQCard_slot3[1]) % 10000000,
                    isStaked: true
                })
            }
            let response18_slot3 = null
            try {
                response18_slot3 = data_slot3[19].status === 'success' ? await fetch(data_slot3[19].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft19_3 = response18_slot3 !== null ? await response18_slot3.json() : {image: null, name: null}
            const nftEQ_19_3_Img = nft19_3.image !== null ? nft19_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_19_3_Name = nft19_3.name
            if (response18_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQCard_slot3[2]),
                    Name: nftEQ_19_3_Name,
                    Image: nftEQ_19_3_Img,
                    Description: nft19_3.description,
                    Attribute: nft19_3.attributes,
                    RewardPerSec: Number(nftEQCard_slot3[2]) % 10000000,
                    isStaked: true
                })
            }
            let response19_slot3 = null
            try {
                response19_slot3 = data_slot3[20].status === 'success' ? await fetch(data_slot3[20].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft20_3 = response19_slot3 !== null ? await response19_slot3.json() : {image: null, name: null}
            const nftEQ_20_3_Img = nft20_3.image !== null ? nft20_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_20_3_Name = nft20_3.name
            if (response19_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQCard_slot3[3]),
                    Name: nftEQ_20_3_Name,
                    Image: nftEQ_20_3_Img,
                    Description: nft20_3.description,
                    Attribute: nft20_3.attributes,
                    RewardPerSec: Number(nftEQCard_slot3[3]) % 10000000,
                    isStaked: true
                })
            }
            let response20_slot3 = null
            try {
                response20_slot3 = data_slot3[21].status === 'success' ? await fetch(data_slot3[21].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft21_3 = response20_slot3 !== null ? await response20_slot3.json() : {image: null, name: null}
            const nftEQ_21_3_Img = nft21_3.image !== null ? nft21_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_21_3_Name = nft21_3.name
            if (response20_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQCard_slot3[4]),
                    Name: nftEQ_21_3_Name,
                    Image: nftEQ_21_3_Img,
                    Description: nft21_3.description,
                    Attribute: nft21_3.attributes,
                    RewardPerSec: Number(nftEQCard_slot3[4]) % 10000000,
                    isStaked: true
                })
            }
            let response21_slot3 = null
            try {
                response21_slot3 = data_slot3[22].status === 'success' ? await fetch(data_slot3[22].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft22_3 = response21_slot3 !== null ? await response21_slot3.json() : {image: null, name: null}
            const nftEQ_22_3_Img = nft22_3.image !== null ? nft22_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_22_3_Name = nft22_3.name
            if (response21_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQCard_slot3[5]),
                    Name: nftEQ_22_3_Name,
                    Image: nftEQ_22_3_Img,
                    Description: nft22_3.description,
                    Attribute: nft22_3.attributes,
                    RewardPerSec: Number(nftEQCard_slot3[5]) % 10000000,
                    isStaked: true
                })
            }
            let response22_slot3 = null
            try {
                response22_slot3 = data_slot3[23].status === 'success' ? await fetch(data_slot3[23].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft23_3 = response22_slot3 !== null ? await response22_slot3.json() : {image: null, name: null}
            const nftEQ_23_3_Img = nft23_3.image !== null ? nft23_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_23_3_Name = nft23_3.name
            if (response22_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQCard_slot3[6]),
                    Name: nftEQ_23_3_Name,
                    Image: nftEQ_23_3_Img,
                    Description: nft23_3.description,
                    Attribute: nft23_3.attributes,
                    RewardPerSec: Number(nftEQCard_slot3[6]) % 10000000,
                    isStaked: true
                })
            }
            let response23_slot3 = null
            try {
                response23_slot3 = data_slot3[24].status === 'success' ? await fetch(data_slot3[24].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft24_3 = response23_slot3 !== null ? await response23_slot3.json() : {image: null, name: null}
            const nftEQ_24_3_Img = nft24_3.image !== null ? nft24_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_24_3_Name = nft24_3.name
            if (response23_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQCard_slot3[7]),
                    Name: nftEQ_24_3_Name,
                    Image: nftEQ_24_3_Img,
                    Description: nft24_3.description,
                    Attribute: nft24_3.attributes,
                    RewardPerSec: Number(nftEQCard_slot3[7]) % 10000000,
                    isStaked: true
                })
            }
            let response24_slot3 = null
            try {
                response24_slot3 = data_slot3[25].status === 'success' ? await fetch(data_slot3[25].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft25_3 = response24_slot3 !== null ? await response24_slot3.json() : {image: null, name: null}
            const nftEQ_25_3_Img = nft25_3.image !== null ? nft25_3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_25_3_Name = nft25_3.name
            if (response24_slot3 !== null) {
                nfts.push({
                    Slot: 3,
                    Id: Number(nftEQCard_slot3[8]),
                    Name: nftEQ_25_3_Name,
                    Image: nftEQ_25_3_Img,
                    Description: nft25_3.description,
                    Attribute: nft25_3.attributes,
                    RewardPerSec: Number(nftEQCard_slot3[8]) % 10000000,
                    isStaked: true
                })
            }
            const allPow3 = Number(nftStatus_slot3[0])
            const isStaked3 = nftStatus_slot3[2]
            const refuelAt3 = Number(nftStatus_slot3[1])
            const rewardPending3 = isStaked3 ? data_slot3[0].result : 0

            const nftEQ1_slot4 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip',
                args: [address, 3],
            }) : [0, 0, 0, 0, 0, 0, 0]
            const nftEQ2_slot4 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip2',
                args: [address, 3],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftEQCard_slot4 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquipCard',
                args: [address, 3],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftStatus_slot4 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftStatus',
                args: [address, 3],
            }) : [0, 0, false]
            const data_slot4 = await readContracts({
                contracts: [
                    {
                        address: dunGEM,
                        abi: dunGEMABI,
                        functionName: 'calculateRewards',
                        args: [address, 3],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot4[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot4[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot4[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot4[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot4[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot4[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot4[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot4[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot4[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot4[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot4[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot4[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot4[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot4[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot4[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot4[8])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot4[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot4[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot4[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot4[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot4[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot4[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot4[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot4[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot4[8])],
                    },
                ],
            })
            console.log(data_slot4)
            let response0_slot4 = null
            try {
                response0_slot4 = data_slot4[1].status === 'success' ? await fetch(data_slot4[1].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft1_4 = response0_slot4 !== null ? await response0_slot4.json() : {image: null, name: null}
            const nftEQ_1_4_Img = nft1_4.image !== null ? nft1_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_1_4_Name = nft1_4.name
            if (response0_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ1_slot4[0]),
                    Name: nftEQ_1_4_Name,
                    Image: nftEQ_1_4_Img,
                    Description: nft1_4.description,
                    Attribute: nft1_4.attributes,
                    RewardPerSec: Number(nftEQ1_slot4[0]) % 10000000,
                    isStaked: true
                })
            }
            let response1_slot4 = null
            try {
                response1_slot4 = data_slot4[2].status === 'success' ? await fetch(data_slot4[2].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft2_4 = response1_slot4 !== null ? await response1_slot4.json() : {image: null, name: null}
            const nftEQ_2_4_Img = nft2_4.image !== null ? nft2_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_2_4_Name = nft2_4.name
            if (response1_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ1_slot4[1]),
                    Name: nftEQ_2_4_Name,
                    Image: nftEQ_2_4_Img,
                    Description: nft2_4.description,
                    Attribute: nft2_4.attributes,
                    RewardPerSec: Number(nftEQ1_slot4[1]) % 10000000,
                    isStaked: true
                })
            }
            let response2_slot4 = null
            try {
                response2_slot4 = data_slot4[3].status === 'success' ? await fetch(data_slot4[3].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft3_4 = response2_slot4 !== null ? await response2_slot4.json() : {image: null, name: null}
            const nftEQ_3_4_Img = nft3_4.image !== null ? nft3_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_3_4_Name = nft3_4.name
            if (response2_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ1_slot4[2]),
                    Name: nftEQ_3_4_Name,
                    Image: nftEQ_3_4_Img,
                    Description: nft3_4.description,
                    Attribute: nft3_4.attributes,
                    RewardPerSec: Number(nftEQ1_slot4[2]) % 10000000,
                    isStaked: true
                })
            }
            let response3_slot4 = null
            try {
                response3_slot4 = data_slot4[4].status === 'success' ? await fetch(data_slot4[4].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft4_4 = response3_slot4 !== null ? await response3_slot4.json() : {image: null, name: null}
            const nftEQ_4_4_Img = nft4_4.image !== null ? nft4_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_4_4_Name = nft4_4.name
            if (response3_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ1_slot4[3]),
                    Name: nftEQ_4_4_Name,
                    Image: nftEQ_4_4_Img,
                    Description: nft4_4.description,
                    Attribute: nft4_4.attributes,
                    RewardPerSec: Number(nftEQ1_slot4[3]) % 10000000,
                    isStaked: true
                })
            }
            let response4_slot4 = null
            try {
                response4_slot4 = data_slot4[5].status === 'success' ? await fetch(data_slot4[5].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft5_4 = response4_slot4 !== null ? await response4_slot4.json() : {image: null, name: null}
            const nftEQ_5_4_Img = nft5_4.image !== null ? nft5_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_5_4_Name = nft5_4.name
            if (response4_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ1_slot4[4]),
                    Name: nftEQ_5_4_Name,
                    Image: nftEQ_5_4_Img,
                    Description: nft5_4.description,
                    Attribute: nft5_4.attributes,
                    RewardPerSec: Number(nftEQ1_slot4[4]) % 10000000,
                    isStaked: true
                })
            }
            let response5_slot4 = null
            try {
                response5_slot4 = data_slot4[6].status === 'success' ? await fetch(data_slot4[6].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft6_4 = response5_slot4 !== null ? await response5_slot4.json() : {image: null, name: null}
            const nftEQ_6_4_Img = nft6_4.image !== null ? nft6_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_6_4_Name = nft6_4.name
            if (response5_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ1_slot4[5]),
                    Name: nftEQ_6_4_Name,
                    Image: nftEQ_6_4_Img,
                    Description: nft6_4.description,
                    Attribute: nft6_4.attributes,
                    RewardPerSec: Number(nftEQ1_slot4[5]) % 10000000,
                    isStaked: true
                })
            }
            let response6_slot4 = null
            try {
                response6_slot4 = data_slot4[7].status === 'success' ? await fetch(data_slot4[7].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft7_4 = response6_slot4 !== null ? await response6_slot4.json() : {image: null, name: null}
            const nftEQ_7_4_Img = nft7_4.image !== null ? nft7_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_7_4_Name = nft7_4.name
            if (response6_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ1_slot4[6]),
                    Name: nftEQ_7_4_Name,
                    Image: nftEQ_7_4_Img,
                    Description: nft7_4.description,
                    Attribute: nft7_4.attributes,
                    RewardPerSec: Number(nftEQ1_slot4[6]) % 10000000,
                    isStaked: true
                })
            }
            let response7_slot4 = null
            try {
                response7_slot4 = data_slot4[8].status === 'success' ? await fetch(data_slot4[8].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft8_4 = response7_slot4 !== null ? await response7_slot4.json() : {image: null, name: null}
            const nftEQ_8_4_Img = nft8_4.image !== null ? nft8_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_8_4_Name = nft8_4.name
            if (response7_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ2_slot4[0]),
                    Name: nftEQ_8_4_Name,
                    Image: nftEQ_8_4_Img,
                    Description: nft8_4.description,
                    Attribute: nft8_4.attributes,
                    RewardPerSec: Number(nftEQ2_slot4[0]) % 10000000,
                    isStaked: true
                })
            }
            let response8_slot4 = null
            try {
                response8_slot4 = data_slot4[9].status === 'success' ? await fetch(data_slot4[9].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft9_4 = response8_slot4 !== null ? await response8_slot4.json() : {image: null, name: null}
            const nftEQ_9_4_Img = nft9_4.image !== null ? nft9_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_9_4_Name = nft9_4.name
            if (response8_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ2_slot4[1]),
                    Name: nftEQ_9_4_Name,
                    Image: nftEQ_9_4_Img,
                    Description: nft9_4.description,
                    Attribute: nft9_4.attributes,
                    RewardPerSec: Number(nftEQ2_slot4[1]) % 10000000,
                    isStaked: true
                })
            }
            let response9_slot4 = null
            try {
                response9_slot4 = data_slot4[10].status === 'success' ? await fetch(data_slot4[10].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft10_4 = response9_slot4 !== null ? await response9_slot4.json() : {image: null, name: null}
            const nftEQ_10_4_Img = nft10_4.image !== null ? nft10_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_10_4_Name = nft10_4.name
            if (response9_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ2_slot4[2]),
                    Name: nftEQ_10_4_Name,
                    Image: nftEQ_10_4_Img,
                    Description: nft10_4.description,
                    Attribute: nft10_4.attributes,
                    RewardPerSec: Number(nftEQ2_slot4[2]) % 10000000,
                    isStaked: true
                })
            }
            let response10_slot4 = null
            try {
                response10_slot4 = data_slot4[11].status === 'success' ? await fetch(data_slot4[11].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft11_4 = response10_slot4 !== null ? await response10_slot4.json() : {image: null, name: null}
            const nftEQ_11_4_Img = nft11_4.image !== null ? nft11_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_11_4_Name = nft11_4.name
            if (response10_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ2_slot4[3]),
                    Name: nftEQ_11_4_Name,
                    Image: nftEQ_11_4_Img,
                    Description: nft11_4.description,
                    Attribute: nft11_4.attributes,
                    RewardPerSec: Number(nftEQ2_slot4[3]) % 10000000,
                    isStaked: true
                })
            }
            let response11_slot4 = null
            try {
                response11_slot4 = data_slot4[12].status === 'success' ? await fetch(data_slot4[12].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft12_4 = response11_slot4 !== null ? await response11_slot4.json() : {image: null, name: null}
            const nftEQ_12_4_Img = nft12_4.image !== null ? nft12_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_12_4_Name = nft12_4.name
            if (response11_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ2_slot4[4]),
                    Name: nftEQ_12_4_Name,
                    Image: nftEQ_12_4_Img,
                    Description: nft12_4.description,
                    Attribute: nft12_4.attributes,
                    RewardPerSec: Number(nftEQ2_slot4[4]) % 10000000,
                    isStaked: true
                })
            }
            let response12_slot4 = null
            try {
                response12_slot4 = data_slot4[13].status === 'success' ? await fetch(data_slot4[13].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft13_4 = response12_slot4 !== null ? await response12_slot4.json() : {image: null, name: null}
            const nftEQ_13_4_Img = nft13_4.image !== null ? nft13_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_13_4_Name = nft13_4.name
            if (response12_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ2_slot4[5]),
                    Name: nftEQ_13_4_Name,
                    Image: nftEQ_13_4_Img,
                    Description: nft13_4.description,
                    Attribute: nft13_4.attributes,
                    RewardPerSec: Number(nftEQ2_slot4[5]) % 10000000,
                    isStaked: true
                })
            }
            let response13_slot4 = null
            try {
                response13_slot4 = data_slot4[14].status === 'success' ? await fetch(data_slot4[14].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft14_4 = response13_slot4 !== null ? await response13_slot4.json() : {image: null, name: null}
            const nftEQ_14_4_Img = nft14_4.image !== null ? nft14_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_14_4_Name = nft14_4.name
            if (response13_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ2_slot4[6]),
                    Name: nftEQ_14_4_Name,
                    Image: nftEQ_14_4_Img,
                    Description: nft14_4.description,
                    Attribute: nft14_4.attributes,
                    RewardPerSec: Number(nftEQ2_slot4[6]) % 10000000,
                    isStaked: true
                })
            }
            let response14_slot4 = null
            try {
                response14_slot4 = data_slot4[15].status === 'success' ? await fetch(data_slot4[15].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft15_4 = response14_slot4 !== null ? await response14_slot4.json() : {image: null, name: null}
            const nftEQ_15_4_Img = nft15_4.image !== null ? nft15_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_15_4_Name = nft15_4.name
            if (response14_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ2_slot4[7]),
                    Name: nftEQ_15_4_Name,
                    Image: nftEQ_15_4_Img,
                    Description: nft15_4.description,
                    Attribute: nft15_4.attributes,
                    RewardPerSec: Number(nftEQ2_slot4[7]) % 10000000,
                    isStaked: true
                })
            }
            let response15_slot4 = null
            try {
                response15_slot4 = data_slot4[16].status === 'success' ? await fetch(data_slot4[16].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft16_4 = response15_slot4 !== null ? await response15_slot4.json() : {image: null, name: null}
            const nftEQ_16_4_Img = nft16_4.image !== null ? nft16_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_16_4_Name = nft16_4.name
            if (response15_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQ2_slot4[8]),
                    Name: nftEQ_16_4_Name,
                    Image: nftEQ_16_4_Img,
                    Description: nft16_4.description,
                    Attribute: nft16_4.attributes,
                    RewardPerSec: Number(nftEQ2_slot4[8]) % 10000000,
                    isStaked: true
                })
            }
            let response16_slot4 = null
            try {
                response16_slot4 = data_slot4[17].status === 'success' ? await fetch(data_slot4[17].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft17_4 = response16_slot4 !== null ? await response16_slot4.json() : {image: null, name: null}
            const nftEQ_17_4_Img = nft17_4.image !== null ? nft17_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_17_4_Name = nft17_4.name
            if (response16_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQCard_slot4[0]),
                    Name: nftEQ_17_4_Name,
                    Image: nftEQ_17_4_Img,
                    Description: nft17_4.description,
                    Attribute: nft17_4.attributes,
                    RewardPerSec: Number(nftEQCard_slot4[0]) % 10000000,
                    isStaked: true
                })
            }
            let response17_slot4 = null
            try {
                response17_slot4 = data_slot4[18].status === 'success' ? await fetch(data_slot4[18].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft18_4 = response17_slot4 !== null ? await response17_slot4.json() : {image: null, name: null}
            const nftEQ_18_4_Img = nft18_4.image !== null ? nft18_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_18_4_Name = nft18_3.name
            if (response17_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQCard_slot4[1]),
                    Name: nftEQ_18_4_Name,
                    Image: nftEQ_18_4_Img,
                    Description: nft18_4.description,
                    Attribute: nft18_4.attributes,
                    RewardPerSec: Number(nftEQCard_slot4[1]) % 10000000,
                    isStaked: true
                })
            }
            let response18_slot4 = null
            try {
                response18_slot4 = data_slot4[19].status === 'success' ? await fetch(data_slot4[19].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft19_4 = response18_slot4 !== null ? await response18_slot4.json() : {image: null, name: null}
            const nftEQ_19_4_Img = nft19_4.image !== null ? nft19_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_19_4_Name = nft19_4.name
            if (response18_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQCard_slot4[2]),
                    Name: nftEQ_19_4_Name,
                    Image: nftEQ_19_4_Img,
                    Description: nft19_4.description,
                    Attribute: nft19_4.attributes,
                    RewardPerSec: Number(nftEQCard_slot4[2]) % 10000000,
                    isStaked: true
                })
            }
            let response19_slot4 = null
            try {
                response19_slot4 = data_slot4[20].status === 'success' ? await fetch(data_slot4[20].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft20_4 = response19_slot4 !== null ? await response19_slot4.json() : {image: null, name: null}
            const nftEQ_20_4_Img = nft20_4.image !== null ? nft20_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_20_4_Name = nft20_4.name
            if (response19_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQCard_slot4[3]),
                    Name: nftEQ_20_4_Name,
                    Image: nftEQ_20_4_Img,
                    Description: nft20_4.description,
                    Attribute: nft20_4.attributes,
                    RewardPerSec: Number(nftEQCard_slot4[3]) % 10000000,
                    isStaked: true
                })
            }
            let response20_slot4 = null
            try {
                response20_slot4 = data_slot4[21].status === 'success' ? await fetch(data_slot4[21].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft21_4 = response20_slot4 !== null ? await response20_slot4.json() : {image: null, name: null}
            const nftEQ_21_4_Img = nft21_4.image !== null ? nft21_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_21_4_Name = nft21_4.name
            if (response20_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQCard_slot4[4]),
                    Name: nftEQ_21_4_Name,
                    Image: nftEQ_21_4_Img,
                    Description: nft21_4.description,
                    Attribute: nft21_4.attributes,
                    RewardPerSec: Number(nftEQCard_slot4[4]) % 10000000,
                    isStaked: true
                })
            }
            let response21_slot4 = null
            try {
                response21_slot4 = data_slot4[22].status === 'success' ? await fetch(data_slot4[22].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft22_4 = response21_slot4 !== null ? await response21_slot4.json() : {image: null, name: null}
            const nftEQ_22_4_Img = nft22_4.image !== null ? nft22_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_22_4_Name = nft22_4.name
            if (response21_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQCard_slot4[5]),
                    Name: nftEQ_22_4_Name,
                    Image: nftEQ_22_4_Img,
                    Description: nft22_4.description,
                    Attribute: nft22_4.attributes,
                    RewardPerSec: Number(nftEQCard_slot4[5]) % 10000000,
                    isStaked: true
                })
            }
            let response22_slot4 = null
            try {
                response22_slot4 = data_slot4[23].status === 'success' ? await fetch(data_slot4[23].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft23_4 = response22_slot4 !== null ? await response22_slot4.json() : {image: null, name: null}
            const nftEQ_23_4_Img = nft23_4.image !== null ? nft23_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_23_4_Name = nft23_4.name
            if (response22_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQCard_slot4[6]),
                    Name: nftEQ_23_4_Name,
                    Image: nftEQ_23_4_Img,
                    Description: nft23_4.description,
                    Attribute: nft23_4.attributes,
                    RewardPerSec: Number(nftEQCard_slot4[6]) % 10000000,
                    isStaked: true
                })
            }
            let response23_slot4 = null
            try {
                response23_slot4 = data_slot4[24].status === 'success' ? await fetch(data_slot4[24].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft24_4 = response23_slot4 !== null ? await response23_slot4.json() : {image: null, name: null}
            const nftEQ_24_4_Img = nft24_4.image !== null ? nft24_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_24_4_Name = nft24_4.name
            if (response23_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQCard_slot4[7]),
                    Name: nftEQ_24_4_Name,
                    Image: nftEQ_24_4_Img,
                    Description: nft24_4.description,
                    Attribute: nft24_4.attributes,
                    RewardPerSec: Number(nftEQCard_slot4[7]) % 10000000,
                    isStaked: true
                })
            }
            let response24_slot4 = null
            try {
                response24_slot4 = data_slot4[25].status === 'success' ? await fetch(data_slot4[25].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft25_4 = response24_slot4 !== null ? await response24_slot4.json() : {image: null, name: null}
            const nftEQ_25_4_Img = nft25_4.image !== null ? nft25_4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_25_4_Name = nft25_4.name
            if (response24_slot4 !== null) {
                nfts.push({
                    Slot: 4,
                    Id: Number(nftEQCard_slot4[8]),
                    Name: nftEQ_25_4_Name,
                    Image: nftEQ_25_4_Img,
                    Description: nft25_4.description,
                    Attribute: nft25_4.attributes,
                    RewardPerSec: Number(nftEQCard_slot4[8]) % 10000000,
                    isStaked: true
                })
            }
            const allPow4 = Number(nftStatus_slot4[0])
            const isStaked4 = nftStatus_slot4[2]
            const refuelAt4 = Number(nftStatus_slot4[1])
            const rewardPending4 = isStaked4 ? data_slot4[0].result : 0

            const nftEQ1_slot5 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip',
                args: [address, 4],
            }) : [0, 0, 0, 0, 0, 0, 0]
            const nftEQ2_slot5 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip2',
                args: [address, 4],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftEQCard_slot5 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquipCard',
                args: [address, 4],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftStatus_slot5 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftStatus',
                args: [address, 4],
            }) : [0, 0, false]
            const data_slot5 = await readContracts({
                contracts: [
                    {
                        address: dunGEM,
                        abi: dunGEMABI,
                        functionName: 'calculateRewards',
                        args: [address, 4],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot5[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot5[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot5[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot5[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot5[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot5[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot5[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot5[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot5[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot5[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot5[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot5[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot5[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot5[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot5[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot5[8])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot5[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot5[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot5[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot5[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot5[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot5[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot5[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot5[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot5[8])],
                    },
                ],
            })
            console.log(data_slot5)
            let response0_slot5 = null
            try {
                response0_slot5 = data_slot5[1].status === 'success' ? await fetch(data_slot5[1].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft1_5 = response0_slot5 !== null ? await response0_slot5.json() : {image: null, name: null}
            const nftEQ_1_5_Img = nft1_5.image !== null ? nft1_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_1_5_Name = nft1_5.name
            if (response0_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ1_slot5[0]),
                    Name: nftEQ_1_5_Name,
                    Image: nftEQ_1_5_Img,
                    Description: nft1_5.description,
                    Attribute: nft1_5.attributes,
                    RewardPerSec: Number(nftEQ1_slot5[0]) % 10000000,
                    isStaked: true
                })
            }
            let response1_slot5 = null
            try {
                response1_slot5 = data_slot5[2].status === 'success' ? await fetch(data_slot5[2].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft2_5 = response1_slot5 !== null ? await response1_slot5.json() : {image: null, name: null}
            const nftEQ_2_5_Img = nft2_5.image !== null ? nft2_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_2_5_Name = nft2_5.name
            if (response1_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ1_slot5[1]),
                    Name: nftEQ_2_5_Name,
                    Image: nftEQ_2_5_Img,
                    Description: nft2_5.description,
                    Attribute: nft2_5.attributes,
                    RewardPerSec: Number(nftEQ1_slot5[1]) % 10000000,
                    isStaked: true
                })
            }
            let response2_slot5 = null
            try {
                response2_slot5 = data_slot5[3].status === 'success' ? await fetch(data_slot5[3].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft3_5 = response2_slot5 !== null ? await response2_slot5.json() : {image: null, name: null}
            const nftEQ_3_5_Img = nft3_5.image !== null ? nft3_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_3_5_Name = nft3_5.name
            if (response2_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ1_slot5[2]),
                    Name: nftEQ_3_5_Name,
                    Image: nftEQ_3_5_Img,
                    Description: nft3_5.description,
                    Attribute: nft3_5.attributes,
                    RewardPerSec: Number(nftEQ1_slot5[2]) % 10000000,
                    isStaked: true
                })
            }
            let response3_slot5 = null
            try {
                response3_slot5 = data_slot5[4].status === 'success' ? await fetch(data_slot5[4].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft4_5 = response3_slot5 !== null ? await response3_slot5.json() : {image: null, name: null}
            const nftEQ_4_5_Img = nft4_5.image !== null ? nft4_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_4_5_Name = nft4_5.name
            if (response3_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ1_slot5[3]),
                    Name: nftEQ_4_5_Name,
                    Image: nftEQ_4_5_Img,
                    Description: nft4_5.description,
                    Attribute: nft4_5.attributes,
                    RewardPerSec: Number(nftEQ1_slot5[3]) % 10000000,
                    isStaked: true
                })
            }
            let response4_slot5 = null
            try {
                response4_slot5 = data_slot5[5].status === 'success' ? await fetch(data_slot5[5].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft5_5 = response4_slot5 !== null ? await response4_slot5.json() : {image: null, name: null}
            const nftEQ_5_5_Img = nft5_5.image !== null ? nft5_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_5_5_Name = nft5_5.name
            if (response4_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ1_slot5[4]),
                    Name: nftEQ_5_5_Name,
                    Image: nftEQ_5_5_Img,
                    Description: nft5_5.description,
                    Attribute: nft5_5.attributes,
                    RewardPerSec: Number(nftEQ1_slot5[4]) % 10000000,
                    isStaked: true
                })
            }
            let response5_slot5 = null
            try {
                response5_slot5 = data_slot5[6].status === 'success' ? await fetch(data_slot5[6].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft6_5 = response5_slot5 !== null ? await response5_slot5.json() : {image: null, name: null}
            const nftEQ_6_5_Img = nft6_5.image !== null ? nft6_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_6_5_Name = nft6_5.name
            if (response5_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ1_slot5[5]),
                    Name: nftEQ_6_5_Name,
                    Image: nftEQ_6_5_Img,
                    Description: nft6_5.description,
                    Attribute: nft6_5.attributes,
                    RewardPerSec: Number(nftEQ1_slot5[5]) % 10000000,
                    isStaked: true
                })
            }
            let response6_slot5 = null
            try {
                response6_slot5 = data_slot5[7].status === 'success' ? await fetch(data_slot5[7].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft7_5 = response6_slot5 !== null ? await response6_slot5.json() : {image: null, name: null}
            const nftEQ_7_5_Img = nft7_5.image !== null ? nft7_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_7_5_Name = nft7_5.name
            if (response6_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ1_slot5[6]),
                    Name: nftEQ_7_5_Name,
                    Image: nftEQ_7_5_Img,
                    Description: nft7_5.description,
                    Attribute: nft7_5.attributes,
                    RewardPerSec: Number(nftEQ1_slot5[6]) % 10000000,
                    isStaked: true
                })
            }
            let response7_slot5 = null
            try {
                response7_slot5 = data_slot5[8].status === 'success' ? await fetch(data_slot5[8].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft8_5 = response7_slot5 !== null ? await response7_slot5.json() : {image: null, name: null}
            const nftEQ_8_5_Img = nft8_5.image !== null ? nft8_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_8_5_Name = nft8_5.name
            if (response7_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ2_slot5[0]),
                    Name: nftEQ_8_5_Name,
                    Image: nftEQ_8_5_Img,
                    Description: nft8_5.description,
                    Attribute: nft8_5.attributes,
                    RewardPerSec: Number(nftEQ2_slot5[0]) % 10000000,
                    isStaked: true
                })
            }
            let response8_slot5 = null
            try {
                response8_slot5 = data_slot5[9].status === 'success' ? await fetch(data_slot5[9].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft9_5 = response8_slot5 !== null ? await response8_slot5.json() : {image: null, name: null}
            const nftEQ_9_5_Img = nft9_5.image !== null ? nft9_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_9_5_Name = nft9_5.name
            if (response8_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ2_slot5[1]),
                    Name: nftEQ_9_5_Name,
                    Image: nftEQ_9_5_Img,
                    Description: nft9_5.description,
                    Attribute: nft9_5.attributes,
                    RewardPerSec: Number(nftEQ2_slot5[1]) % 10000000,
                    isStaked: true
                })
            }
            let response9_slot5 = null
            try {
                response9_slot5 = data_slot5[10].status === 'success' ? await fetch(data_slot5[10].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft10_5 = response9_slot5 !== null ? await response9_slot5.json() : {image: null, name: null}
            const nftEQ_10_5_Img = nft10_5.image !== null ? nft10_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_10_5_Name = nft10_5.name
            if (response9_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ2_slot5[2]),
                    Name: nftEQ_10_5_Name,
                    Image: nftEQ_10_5_Img,
                    Description: nft10_5.description,
                    Attribute: nft10_5.attributes,
                    RewardPerSec: Number(nftEQ2_slot5[2]) % 10000000,
                    isStaked: true
                })
            }
            let response10_slot5 = null
            try {
                response10_slot5 = data_slot5[11].status === 'success' ? await fetch(data_slot5[11].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft11_5 = response10_slot5 !== null ? await response10_slot5.json() : {image: null, name: null}
            const nftEQ_11_5_Img = nft11_5.image !== null ? nft11_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_11_5_Name = nft11_5.name
            if (response10_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ2_slot5[3]),
                    Name: nftEQ_11_5_Name,
                    Image: nftEQ_11_5_Img,
                    Description: nft11_5.description,
                    Attribute: nft11_5.attributes,
                    RewardPerSec: Number(nftEQ2_slot5[3]) % 10000000,
                    isStaked: true
                })
            }
            let response11_slot5 = null
            try {
                response11_slot5 = data_slot5[12].status === 'success' ? await fetch(data_slot5[12].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft12_5 = response11_slot5 !== null ? await response11_slot5.json() : {image: null, name: null}
            const nftEQ_12_5_Img = nft12_5.image !== null ? nft12_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_12_5_Name = nft12_5.name
            if (response11_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ2_slot5[4]),
                    Name: nftEQ_12_5_Name,
                    Image: nftEQ_12_5_Img,
                    Description: nft12_5.description,
                    Attribute: nft12_5.attributes,
                    RewardPerSec: Number(nftEQ2_slot5[4]) % 10000000,
                    isStaked: true
                })
            }
            let response12_slot5 = null
            try {
                response12_slot5 = data_slot5[13].status === 'success' ? await fetch(data_slot5[13].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft13_5 = response12_slot5 !== null ? await response12_slot5.json() : {image: null, name: null}
            const nftEQ_13_5_Img = nft13_5.image !== null ? nft13_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_13_5_Name = nft13_5.name
            if (response12_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ2_slot5[5]),
                    Name: nftEQ_13_5_Name,
                    Image: nftEQ_13_5_Img,
                    Description: nft13_5.description,
                    Attribute: nft13_5.attributes,
                    RewardPerSec: Number(nftEQ2_slot5[5]) % 10000000,
                    isStaked: true
                })
            }
            let response13_slot5 = null
            try {
                response13_slot5 = data_slot5[14].status === 'success' ? await fetch(data_slot5[14].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft14_5 = response13_slot5 !== null ? await response13_slot5.json() : {image: null, name: null}
            const nftEQ_14_5_Img = nft14_5.image !== null ? nft14_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_14_5_Name = nft14_5.name
            if (response13_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ2_slot5[6]),
                    Name: nftEQ_14_5_Name,
                    Image: nftEQ_14_5_Img,
                    Description: nft14_5.description,
                    Attribute: nft14_5.attributes,
                    RewardPerSec: Number(nftEQ2_slot5[6]) % 10000000,
                    isStaked: true
                })
            }
            let response14_slot5 = null
            try {
                response14_slot5 = data_slot5[15].status === 'success' ? await fetch(data_slot5[15].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft15_5 = response14_slot5 !== null ? await response14_slot5.json() : {image: null, name: null}
            const nftEQ_15_5_Img = nft15_5.image !== null ? nft15_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_15_5_Name = nft15_5.name
            if (response14_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ2_slot5[7]),
                    Name: nftEQ_15_5_Name,
                    Image: nftEQ_15_5_Img,
                    Description: nft15_5.description,
                    Attribute: nft15_5.attributes,
                    RewardPerSec: Number(nftEQ2_slot5[7]) % 10000000,
                    isStaked: true
                })
            }
            let response15_slot5 = null
            try {
                response15_slot5 = data_slot5[16].status === 'success' ? await fetch(data_slot5[16].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft16_5 = response15_slot5 !== null ? await response15_slot5.json() : {image: null, name: null}
            const nftEQ_16_5_Img = nft16_5.image !== null ? nft16_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_16_5_Name = nft16_5.name
            if (response15_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQ2_slot5[8]),
                    Name: nftEQ_16_5_Name,
                    Image: nftEQ_16_5_Img,
                    Description: nft16_5.description,
                    Attribute: nft16_5.attributes,
                    RewardPerSec: Number(nftEQ2_slot5[8]) % 10000000,
                    isStaked: true
                })
            }
            let response16_slot5 = null
            try {
                response16_slot5 = data_slot5[17].status === 'success' ? await fetch(data_slot5[17].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft17_5 = response16_slot5 !== null ? await response16_slot5.json() : {image: null, name: null}
            const nftEQ_17_5_Img = nft17_5.image !== null ? nft17_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_17_5_Name = nft17_5.name
            if (response16_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQCard_slot5[0]),
                    Name: nftEQ_17_5_Name,
                    Image: nftEQ_17_5_Img,
                    Description: nft17_5.description,
                    Attribute: nft17_5.attributes,
                    RewardPerSec: Number(nftEQCard_slot5[0]) % 10000000,
                    isStaked: true
                })
            }
            let response17_slot5 = null
            try {
                response17_slot5 = data_slot5[18].status === 'success' ? await fetch(data_slot5[18].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft18_5 = response17_slot5 !== null ? await response17_slot5.json() : {image: null, name: null}
            const nftEQ_18_5_Img = nft18_5.image !== null ? nft18_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_18_5_Name = nft18_5.name
            if (response17_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQCard_slot5[1]),
                    Name: nftEQ_18_5_Name,
                    Image: nftEQ_18_5_Img,
                    Description: nft18_5.description,
                    Attribute: nft18_5.attributes,
                    RewardPerSec: Number(nftEQCard_slot5[1]) % 10000000,
                    isStaked: true
                })
            }
            let response18_slot5 = null
            try {
                response18_slot5 = data_slot5[19].status === 'success' ? await fetch(data_slot5[19].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft19_5 = response18_slot5 !== null ? await response18_slot5.json() : {image: null, name: null}
            const nftEQ_19_5_Img = nft19_5.image !== null ? nft19_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_19_5_Name = nft19_5.name
            if (response18_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQCard_slot5[2]),
                    Name: nftEQ_19_5_Name,
                    Image: nftEQ_19_5_Img,
                    Description: nft19_5.description,
                    Attribute: nft19_5.attributes,
                    RewardPerSec: Number(nftEQCard_slot5[2]) % 10000000,
                    isStaked: true
                })
            }
            let response19_slot5 = null
            try {
                response19_slot5 = data_slot5[20].status === 'success' ? await fetch(data_slot5[20].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft20_5 = response19_slot5 !== null ? await response19_slot5.json() : {image: null, name: null}
            const nftEQ_20_5_Img = nft20_5.image !== null ? nft20_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_20_5_Name = nft20_5.name
            if (response19_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQCard_slot5[3]),
                    Name: nftEQ_20_5_Name,
                    Image: nftEQ_20_5_Img,
                    Description: nft20_5.description,
                    Attribute: nft20_5.attributes,
                    RewardPerSec: Number(nftEQCard_slot5[3]) % 10000000,
                    isStaked: true
                })
            }
            let response20_slot5 = null
            try {
                response20_slot5 = data_slot5[21].status === 'success' ? await fetch(data_slot5[21].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft21_5 = response20_slot5 !== null ? await response20_slot5.json() : {image: null, name: null}
            const nftEQ_21_5_Img = nft21_5.image !== null ? nft21_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_21_5_Name = nft21_5.name
            if (response20_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQCard_slot5[4]),
                    Name: nftEQ_21_5_Name,
                    Image: nftEQ_21_5_Img,
                    Description: nft21_5.description,
                    Attribute: nft21_5.attributes,
                    RewardPerSec: Number(nftEQCard_slot5[4]) % 10000000,
                    isStaked: true
                })
            }
            let response21_slot5 = null
            try {
                response21_slot5 = data_slot5[22].status === 'success' ? await fetch(data_slot5[22].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft22_5 = response21_slot5 !== null ? await response21_slot5.json() : {image: null, name: null}
            const nftEQ_22_5_Img = nft22_5.image !== null ? nft22_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_22_5_Name = nft22_5.name
            if (response21_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQCard_slot5[5]),
                    Name: nftEQ_22_5_Name,
                    Image: nftEQ_22_5_Img,
                    Description: nft22_5.description,
                    Attribute: nft22_5.attributes,
                    RewardPerSec: Number(nftEQCard_slot5[5]) % 10000000,
                    isStaked: true
                })
            }
            let response22_slot5 = null
            try {
                response22_slot5 = data_slot5[23].status === 'success' ? await fetch(data_slot5[23].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft23_5 = response22_slot5 !== null ? await response22_slot5.json() : {image: null, name: null}
            const nftEQ_23_5_Img = nft23_5.image !== null ? nft23_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_23_5_Name = nft23_5.name
            if (response22_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQCard_slot5[6]),
                    Name: nftEQ_23_5_Name,
                    Image: nftEQ_23_5_Img,
                    Description: nft23_5.description,
                    Attribute: nft23_5.attributes,
                    RewardPerSec: Number(nftEQCard_slot5[6]) % 10000000,
                    isStaked: true
                })
            }
            let response23_slot5 = null
            try {
                response23_slot5 = data_slot5[24].status === 'success' ? await fetch(data_slot5[24].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft24_5 = response23_slot5 !== null ? await response23_slot5.json() : {image: null, name: null}
            const nftEQ_24_5_Img = nft24_5.image !== null ? nft24_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_24_5_Name = nft24_5.name
            if (response23_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQCard_slot5[7]),
                    Name: nftEQ_24_5_Name,
                    Image: nftEQ_24_5_Img,
                    Description: nft24_5.description,
                    Attribute: nft24_5.attributes,
                    RewardPerSec: Number(nftEQCard_slot5[7]) % 10000000,
                    isStaked: true
                })
            }
            let response24_slot5 = null
            try {
                response24_slot5 = data_slot5[25].status === 'success' ? await fetch(data_slot5[25].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft25_5 = response24_slot5 !== null ? await response24_slot5.json() : {image: null, name: null}
            const nftEQ_25_5_Img = nft25_5.image !== null ? nft25_5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_25_5_Name = nft25_5.name
            if (response24_slot5 !== null) {
                nfts.push({
                    Slot: 5,
                    Id: Number(nftEQCard_slot5[8]),
                    Name: nftEQ_25_5_Name,
                    Image: nftEQ_25_5_Img,
                    Description: nft25_5.description,
                    Attribute: nft25_5.attributes,
                    RewardPerSec: Number(nftEQCard_slot5[8]) % 10000000,
                    isStaked: true
                })
            }
            const allPow5 = Number(nftStatus_slot5[0])
            const isStaked5 = nftStatus_slot5[2]
            const refuelAt5 = Number(nftStatus_slot5[1])
            const rewardPending5 = isStaked5 ? data_slot5[0].result : 0

            const nftEQ1_slot6 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip',
                args: [address, 5],
            }) : [0, 0, 0, 0, 0, 0, 0]
            const nftEQ2_slot6 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip2',
                args: [address, 5],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftEQCard_slot6 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquipCard',
                args: [address, 5],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftStatus_slot6 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftStatus',
                args: [address, 5],
            }) : [0, 0, false]
            const data_slot6 = await readContracts({
                contracts: [
                    {
                        address: dunGEM,
                        abi: dunGEMABI,
                        functionName: 'calculateRewards',
                        args: [address, 5],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot6[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot6[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot6[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot6[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot6[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot6[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot6[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot6[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot6[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot6[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot6[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot6[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot6[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot6[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot6[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot6[8])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot6[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot6[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot6[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot6[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot6[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot6[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot6[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot6[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot6[8])],
                    },
                ],
            })
            console.log(data_slot6)
            let response0_slot6 = null
            try {
                response0_slot6 = data_slot6[1].status === 'success' ? await fetch(data_slot6[1].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft1_6 = response0_slot6 !== null ? await response0_slot6.json() : {image: null, name: null}
            const nftEQ_1_6_Img = nft1_6.image !== null ? nft1_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_1_6_Name = nft1_6.name
            if (response0_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ1_slot6[0]),
                    Name: nftEQ_1_6_Name,
                    Image: nftEQ_1_6_Img,
                    Description: nft1_6.description,
                    Attribute: nft1_6.attributes,
                    RewardPerSec: Number(nftEQ1_slot6[0]) % 10000000,
                    isStaked: true
                })
            }
            let response1_slot6 = null
            try {
                response1_slot6 = data_slot6[2].status === 'success' ? await fetch(data_slot6[2].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft2_6 = response1_slot6 !== null ? await response1_slot6.json() : {image: null, name: null}
            const nftEQ_2_6_Img = nft2_6.image !== null ? nft2_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_2_6_Name = nft2_6.name
            if (response1_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ1_slot6[1]),
                    Name: nftEQ_2_6_Name,
                    Image: nftEQ_2_6_Img,
                    Description: nft2_6.description,
                    Attribute: nft2_6.attributes,
                    RewardPerSec: Number(nftEQ1_slot6[1]) % 10000000,
                    isStaked: true
                })
            }
            let response2_slot6 = null
            try {
                response2_slot6 = data_slot6[3].status === 'success' ? await fetch(data_slot6[3].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft3_6 = response2_slot6 !== null ? await response2_slot6.json() : {image: null, name: null}
            const nftEQ_3_6_Img = nft3_6.image !== null ? nft3_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_3_6_Name = nft3_6.name
            if (response2_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ1_slot6[2]),
                    Name: nftEQ_3_6_Name,
                    Image: nftEQ_3_6_Img,
                    Description: nft3_6.description,
                    Attribute: nft3_6.attributes,
                    RewardPerSec: Number(nftEQ1_slot6[2]) % 10000000,
                    isStaked: true
                })
            }
            let response3_slot6 = null
            try {
                response3_slot6 = data_slot6[4].status === 'success' ? await fetch(data_slot6[4].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft4_6 = response3_slot6 !== null ? await response3_slot6.json() : {image: null, name: null}
            const nftEQ_4_6_Img = nft4_6.image !== null ? nft4_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_4_6_Name = nft4_6.name
            if (response3_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ1_slot6[3]),
                    Name: nftEQ_4_6_Name,
                    Image: nftEQ_4_6_Img,
                    Description: nft4_6.description,
                    Attribute: nft4_6.attributes,
                    RewardPerSec: Number(nftEQ1_slot6[3]) % 10000000,
                    isStaked: true
                })
            }
            let response4_slot6 = null
            try {
                response4_slot6 = data_slot6[5].status === 'success' ? await fetch(data_slot6[5].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft5_6 = response4_slot6 !== null ? await response4_slot6.json() : {image: null, name: null}
            const nftEQ_5_6_Img = nft5_6.image !== null ? nft5_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_5_6_Name = nft5_6.name
            if (response4_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ1_slot6[4]),
                    Name: nftEQ_5_6_Name,
                    Image: nftEQ_5_6_Img,
                    Description: nft5_6.description,
                    Attribute: nft5_6.attributes,
                    RewardPerSec: Number(nftEQ1_slot6[4]) % 10000000,
                    isStaked: true
                })
            }
            let response5_slot6 = null
            try {
                response5_slot6 = data_slot6[6].status === 'success' ? await fetch(data_slot6[6].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft6_6 = response5_slot6 !== null ? await response5_slot6.json() : {image: null, name: null}
            const nftEQ_6_6_Img = nft6_6.image !== null ? nft6_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_6_6_Name = nft6_6.name
            if (response5_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ1_slot6[5]),
                    Name: nftEQ_6_6_Name,
                    Image: nftEQ_6_6_Img,
                    Description: nft6_6.description,
                    Attribute: nft6_6.attributes,
                    RewardPerSec: Number(nftEQ1_slot6[5]) % 10000000,
                    isStaked: true
                })
            }
            let response6_slot6 = null
            try {
                response6_slot6 = data_slot6[7].status === 'success' ? await fetch(data_slot6[7].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft7_6 = response6_slot6 !== null ? await response6_slot6.json() : {image: null, name: null}
            const nftEQ_7_6_Img = nft7_6.image !== null ? nft7_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_7_6_Name = nft7_6.name
            if (response6_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ1_slot6[6]),
                    Name: nftEQ_7_6_Name,
                    Image: nftEQ_7_6_Img,
                    Description: nft7_6.description,
                    Attribute: nft7_6.attributes,
                    RewardPerSec: Number(nftEQ1_slot6[6]) % 10000000,
                    isStaked: true
                })
            }
            let response7_slot6 = null
            try {
                response7_slot6 = data_slot6[8].status === 'success' ? await fetch(data_slot6[8].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft8_6 = response7_slot6 !== null ? await response7_slot6.json() : {image: null, name: null}
            const nftEQ_8_6_Img = nft8_6.image !== null ? nft8_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_8_6_Name = nft8_6.name
            if (response7_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ2_slot6[0]),
                    Name: nftEQ_8_6_Name,
                    Image: nftEQ_8_6_Img,
                    Description: nft8_6.description,
                    Attribute: nft8_6.attributes,
                    RewardPerSec: Number(nftEQ2_slot6[0]) % 10000000,
                    isStaked: true
                })
            }
            let response8_slot6 = null
            try {
                response8_slot6 = data_slot6[9].status === 'success' ? await fetch(data_slot6[9].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft9_6 = response8_slot6 !== null ? await response8_slot6.json() : {image: null, name: null}
            const nftEQ_9_6_Img = nft9_6.image !== null ? nft9_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_9_6_Name = nft9_6.name
            if (response8_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ2_slot6[1]),
                    Name: nftEQ_9_6_Name,
                    Image: nftEQ_9_6_Img,
                    Description: nft9_6.description,
                    Attribute: nft9_6.attributes,
                    RewardPerSec: Number(nftEQ2_slot6[1]) % 10000000,
                    isStaked: true
                })
            }
            let response9_slot6 = null
            try {
                response9_slot6 = data_slot6[10].status === 'success' ? await fetch(data_slot6[10].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft10_6 = response9_slot6 !== null ? await response9_slot6.json() : {image: null, name: null}
            const nftEQ_10_6_Img = nft10_6.image !== null ? nft10_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_10_6_Name = nft10_6.name
            if (response9_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ2_slot6[2]),
                    Name: nftEQ_10_6_Name,
                    Image: nftEQ_10_6_Img,
                    Description: nft10_6.description,
                    Attribute: nft10_6.attributes,
                    RewardPerSec: Number(nftEQ2_slot6[2]) % 10000000,
                    isStaked: true
                })
            }
            let response10_slot6 = null
            try {
                response10_slot6 = data_slot6[11].status === 'success' ? await fetch(data_slot6[11].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft11_6 = response10_slot6 !== null ? await response10_slot6.json() : {image: null, name: null}
            const nftEQ_11_6_Img = nft11_6.image !== null ? nft11_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_11_6_Name = nft11_6.name
            if (response10_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ2_slot6[3]),
                    Name: nftEQ_11_6_Name,
                    Image: nftEQ_11_6_Img,
                    Description: nft11_6.description,
                    Attribute: nft11_6.attributes,
                    RewardPerSec: Number(nftEQ2_slot6[3]) % 10000000,
                    isStaked: true
                })
            }
            let response11_slot6 = null
            try {
                response11_slot6 = data_slot6[12].status === 'success' ? await fetch(data_slot6[12].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft12_6 = response11_slot6 !== null ? await response11_slot6.json() : {image: null, name: null}
            const nftEQ_12_6_Img = nft12_6.image !== null ? nft12_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_12_6_Name = nft12_6.name
            if (response11_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ2_slot6[4]),
                    Name: nftEQ_12_6_Name,
                    Image: nftEQ_12_6_Img,
                    Description: nft12_6.description,
                    Attribute: nft12_6.attributes,
                    RewardPerSec: Number(nftEQ2_slot6[4]) % 10000000,
                    isStaked: true
                })
            }
            let response12_slot6 = null
            try {
                response12_slot6 = data_slot6[13].status === 'success' ? await fetch(data_slot6[13].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft13_6 = response12_slot6 !== null ? await response12_slot6.json() : {image: null, name: null}
            const nftEQ_13_6_Img = nft13_6.image !== null ? nft13_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_13_6_Name = nft13_6.name
            if (response12_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ2_slot6[5]),
                    Name: nftEQ_13_6_Name,
                    Image: nftEQ_13_6_Img,
                    Description: nft13_6.description,
                    Attribute: nft13_6.attributes,
                    RewardPerSec: Number(nftEQ2_slot6[5]) % 10000000,
                    isStaked: true
                })
            }
            let response13_slot6 = null
            try {
                response13_slot6 = data_slot6[14].status === 'success' ? await fetch(data_slot6[14].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft14_6 = response13_slot6 !== null ? await response13_slot6.json() : {image: null, name: null}
            const nftEQ_14_6_Img = nft14_6.image !== null ? nft14_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_14_6_Name = nft14_6.name
            if (response13_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ2_slot6[6]),
                    Name: nftEQ_14_6_Name,
                    Image: nftEQ_14_6_Img,
                    Description: nft14_6.description,
                    Attribute: nft14_6.attributes,
                    RewardPerSec: Number(nftEQ2_slot6[6]) % 10000000,
                    isStaked: true
                })
            }
            let response14_slot6 = null
            try {
                response14_slot6 = data_slot6[15].status === 'success' ? await fetch(data_slot6[15].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft15_6 = response14_slot6 !== null ? await response14_slot6.json() : {image: null, name: null}
            const nftEQ_15_6_Img = nft15_6.image !== null ? nft15_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_15_6_Name = nft15_6.name
            if (response14_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ2_slot6[7]),
                    Name: nftEQ_15_6_Name,
                    Image: nftEQ_15_6_Img,
                    Description: nft15_6.description,
                    Attribute: nft15_6.attributes,
                    RewardPerSec: Number(nftEQ2_slot6[7]) % 10000000,
                    isStaked: true
                })
            }
            let response15_slot6 = null
            try {
                response15_slot6 = data_slot6[16].status === 'success' ? await fetch(data_slot6[16].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft16_6 = response15_slot6 !== null ? await response15_slot6.json() : {image: null, name: null}
            const nftEQ_16_6_Img = nft16_6.image !== null ? nft16_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_16_6_Name = nft16_6.name
            if (response15_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQ2_slot6[8]),
                    Name: nftEQ_16_6_Name,
                    Image: nftEQ_16_6_Img,
                    Description: nft16_6.description,
                    Attribute: nft16_6.attributes,
                    RewardPerSec: Number(nftEQ2_slot6[8]) % 10000000,
                    isStaked: true
                })
            }
            let response16_slot6 = null
            try {
                response16_slot6 = data_slot6[17].status === 'success' ? await fetch(data_slot6[17].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft17_6 = response16_slot6 !== null ? await response16_slot6.json() : {image: null, name: null}
            const nftEQ_17_6_Img = nft17_6.image !== null ? nft17_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_17_6_Name = nft17_6.name
            if (response16_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQCard_slot6[0]),
                    Name: nftEQ_17_6_Name,
                    Image: nftEQ_17_6_Img,
                    Description: nft17_6.description,
                    Attribute: nft17_6.attributes,
                    RewardPerSec: Number(nftEQCard_slot6[0]) % 10000000,
                    isStaked: true
                })
            }
            let response17_slot6 = null
            try {
                response17_slot6 = data_slot6[18].status === 'success' ? await fetch(data_slot6[18].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft18_6 = response17_slot6 !== null ? await response17_slot6.json() : {image: null, name: null}
            const nftEQ_18_6_Img = nft18_6.image !== null ? nft18_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_18_6_Name = nft18_6.name
            if (response17_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQCard_slot6[1]),
                    Name: nftEQ_18_6_Name,
                    Image: nftEQ_18_6_Img,
                    Description: nft18_6.description,
                    Attribute: nft18_6.attributes,
                    RewardPerSec: Number(nftEQCard_slot6[1]) % 10000000,
                    isStaked: true
                })
            }
            let response18_slot6 = null
            try {
                response18_slot6 = data_slot6[19].status === 'success' ? await fetch(data_slot6[19].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft19_6 = response18_slot6 !== null ? await response18_slot6.json() : {image: null, name: null}
            const nftEQ_19_6_Img = nft19_6.image !== null ? nft19_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_19_6_Name = nft19_6.name
            if (response18_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQCard_slot6[2]),
                    Name: nftEQ_19_6_Name,
                    Image: nftEQ_19_6_Img,
                    Description: nft19_6.description,
                    Attribute: nft19_6.attributes,
                    RewardPerSec: Number(nftEQCard_slot6[2]) % 10000000,
                    isStaked: true
                })
            }
            let response19_slot6 = null
            try {
                response19_slot6 = data_slot6[20].status === 'success' ? await fetch(data_slot6[20].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft20_6 = response19_slot6 !== null ? await response19_slot6.json() : {image: null, name: null}
            const nftEQ_20_6_Img = nft20_6.image !== null ? nft20_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_20_6_Name = nft20_6.name
            if (response19_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQCard_slot6[3]),
                    Name: nftEQ_20_6_Name,
                    Image: nftEQ_20_6_Img,
                    Description: nft20_6.description,
                    Attribute: nft20_6.attributes,
                    RewardPerSec: Number(nftEQCard_slot6[3]) % 10000000,
                    isStaked: true
                })
            }
            let response20_slot6 = null
            try {
                response20_slot6 = data_slot6[21].status === 'success' ? await fetch(data_slot6[21].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft21_6 = response20_slot6 !== null ? await response20_slot6.json() : {image: null, name: null}
            const nftEQ_21_6_Img = nft21_6.image !== null ? nft21_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_21_6_Name = nft21_6.name
            if (response20_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQCard_slot6[4]),
                    Name: nftEQ_21_6_Name,
                    Image: nftEQ_21_6_Img,
                    Description: nft21_6.description,
                    Attribute: nft21_6.attributes,
                    RewardPerSec: Number(nftEQCard_slot6[4]) % 10000000,
                    isStaked: true
                })
            }
            let response21_slot6 = null
            try {
                response21_slot6 = data_slot6[22].status === 'success' ? await fetch(data_slot6[22].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft22_6 = response21_slot6 !== null ? await response21_slot6.json() : {image: null, name: null}
            const nftEQ_22_6_Img = nft22_6.image !== null ? nft22_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_22_6_Name = nft22_6.name
            if (response21_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQCard_slot6[5]),
                    Name: nftEQ_22_6_Name,
                    Image: nftEQ_22_6_Img,
                    Description: nft22_6.description,
                    Attribute: nft22_6.attributes,
                    RewardPerSec: Number(nftEQCard_slot6[5]) % 10000000,
                    isStaked: true
                })
            }
            let response22_slot6 = null
            try {
                response22_slot6 = data_slot6[23].status === 'success' ? await fetch(data_slot6[23].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft23_6 = response22_slot6 !== null ? await response22_slot6.json() : {image: null, name: null}
            const nftEQ_23_6_Img = nft23_6.image !== null ? nft23_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_23_6_Name = nft23_6.name
            if (response22_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQCard_slot6[6]),
                    Name: nftEQ_23_6_Name,
                    Image: nftEQ_23_6_Img,
                    Description: nft23_6.description,
                    Attribute: nft23_6.attributes,
                    RewardPerSec: Number(nftEQCard_slot6[6]) % 10000000,
                    isStaked: true
                })
            }
            let response23_slot6 = null
            try {
                response23_slot6 = data_slot6[24].status === 'success' ? await fetch(data_slot6[24].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft24_6 = response23_slot6 !== null ? await response23_slot6.json() : {image: null, name: null}
            const nftEQ_24_6_Img = nft24_6.image !== null ? nft24_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_24_6_Name = nft24_6.name
            if (response23_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQCard_slot6[7]),
                    Name: nftEQ_24_6_Name,
                    Image: nftEQ_24_6_Img,
                    Description: nft24_6.description,
                    Attribute: nft24_6.attributes,
                    RewardPerSec: Number(nftEQCard_slot6[7]) % 10000000,
                    isStaked: true
                })
            }
            let response24_slot6 = null
            try {
                response24_slot6 = data_slot6[25].status === 'success' ? await fetch(data_slot6[25].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft25_6 = response24_slot6 !== null ? await response24_slot6.json() : {image: null, name: null}
            const nftEQ_25_6_Img = nft25_6.image !== null ? nft25_6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_25_6_Name = nft25_6.name
            if (response24_slot6 !== null) {
                nfts.push({
                    Slot: 6,
                    Id: Number(nftEQCard_slot6[8]),
                    Name: nftEQ_25_6_Name,
                    Image: nftEQ_25_6_Img,
                    Description: nft25_6.description,
                    Attribute: nft25_6.attributes,
                    RewardPerSec: Number(nftEQCard_slot6[8]) % 10000000,
                    isStaked: true
                })
            }
            const allPow6 = Number(nftStatus_slot6[0])
            const isStaked6 = nftStatus_slot6[2]
            const refuelAt6 = Number(nftStatus_slot6[1])
            const rewardPending6 = isStaked6 ? data_slot6[0].result : 0

            const nftEQ1_slot7 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip',
                args: [address, 6],
            }) : [0, 0, 0, 0, 0, 0, 0]
            const nftEQ2_slot7 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip2',
                args: [address, 6],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftEQCard_slot7 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquipCard',
                args: [address, 6],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftStatus_slot7 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftStatus',
                args: [address, 6],
            }) : [0, 0, false]
            const data_slot7 = await readContracts({
                contracts: [
                    {
                        address: dunGEM,
                        abi: dunGEMABI,
                        functionName: 'calculateRewards',
                        args: [address, 6],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot7[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot7[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot7[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot7[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot7[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot7[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot7[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot7[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot7[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot7[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot7[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot7[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot7[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot7[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot7[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot7[8])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot7[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot7[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot7[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot7[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot7[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot7[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot7[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot7[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot7[8])],
                    },
                ],
            })
            console.log(data_slot7)
            let response0_slot7 = null
            try {
                response0_slot7 = data_slot7[1].status === 'success' ? await fetch(data_slot7[1].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft1_7 = response0_slot7 !== null ? await response0_slot7.json() : {image: null, name: null}
            const nftEQ_1_7_Img = nft1_7.image !== null ? nft1_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_1_7_Name = nft1_7.name
            if (response0_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ1_slot7[0]),
                    Name: nftEQ_1_7_Name,
                    Image: nftEQ_1_7_Img,
                    Description: nft1_7.description,
                    Attribute: nft1_7.attributes,
                    RewardPerSec: Number(nftEQ1_slot7[0]) % 10000000,
                    isStaked: true
                })
            }
            let response1_slot7 = null
            try {
                response1_slot7 = data_slot7[2].status === 'success' ? await fetch(data_slot7[2].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft2_7 = response1_slot7 !== null ? await response1_slot7.json() : {image: null, name: null}
            const nftEQ_2_7_Img = nft2_7.image !== null ? nft2_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_2_7_Name = nft2_7.name
            if (response1_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ1_slot7[1]),
                    Name: nftEQ_2_7_Name,
                    Image: nftEQ_2_7_Img,
                    Description: nft2_7.description,
                    Attribute: nft2_7.attributes,
                    RewardPerSec: Number(nftEQ1_slot7[1]) % 10000000,
                    isStaked: true
                })
            }
            let response2_slot7 = null
            try {
                response2_slot7 = data_slot7[3].status === 'success' ? await fetch(data_slot7[3].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft3_7 = response2_slot7 !== null ? await response2_slot7.json() : {image: null, name: null}
            const nftEQ_3_7_Img = nft3_7.image !== null ? nft3_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_3_7_Name = nft3_7.name
            if (response2_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ1_slot7[2]),
                    Name: nftEQ_3_7_Name,
                    Image: nftEQ_3_7_Img,
                    Description: nft3_7.description,
                    Attribute: nft3_7.attributes,
                    RewardPerSec: Number(nftEQ1_slot7[2]) % 10000000,
                    isStaked: true
                })
            }
            let response3_slot7 = null
            try {
                response3_slot7 = data_slot7[4].status === 'success' ? await fetch(data_slot7[4].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft4_7 = response3_slot7 !== null ? await response3_slot7.json() : {image: null, name: null}
            const nftEQ_4_7_Img = nft4_7.image !== null ? nft4_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_4_7_Name = nft4_7.name
            if (response3_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ1_slot7[3]),
                    Name: nftEQ_4_7_Name,
                    Image: nftEQ_4_7_Img,
                    Description: nft4_7.description,
                    Attribute: nft4_7.attributes,
                    RewardPerSec: Number(nftEQ1_slot7[3]) % 10000000,
                    isStaked: true
                })
            }
            let response4_slot7 = null
            try {
                response4_slot7 = data_slot7[5].status === 'success' ? await fetch(data_slot7[5].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft5_7 = response4_slot7 !== null ? await response4_slot7.json() : {image: null, name: null}
            const nftEQ_5_7_Img = nft5_7.image !== null ? nft5_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_5_7_Name = nft5_7.name
            if (response4_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ1_slot7[4]),
                    Name: nftEQ_5_7_Name,
                    Image: nftEQ_5_7_Img,
                    Description: nft5_7.description,
                    Attribute: nft5_7.attributes,
                    RewardPerSec: Number(nftEQ1_slot7[4]) % 10000000,
                    isStaked: true
                })
            }
            let response5_slot7 = null
            try {
                response5_slot7 = data_slot7[6].status === 'success' ? await fetch(data_slot7[6].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft6_7 = response5_slot7 !== null ? await response5_slot7.json() : {image: null, name: null}
            const nftEQ_6_7_Img = nft6_7.image !== null ? nft6_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_6_7_Name = nft6_7.name
            if (response5_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ1_slot7[5]),
                    Name: nftEQ_6_7_Name,
                    Image: nftEQ_6_7_Img,
                    Description: nft6_7.description,
                    Attribute: nft6_7.attributes,
                    RewardPerSec: Number(nftEQ1_slot7[5]) % 10000000,
                    isStaked: true
                })
            }
            let response6_slot7 = null
            try {
                response6_slot7 = data_slot7[7].status === 'success' ? await fetch(data_slot7[7].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft7_7 = response6_slot7 !== null ? await response6_slot7.json() : {image: null, name: null}
            const nftEQ_7_7_Img = nft7_7.image !== null ? nft7_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_7_7_Name = nft7_7.name
            if (response6_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ1_slot7[6]),
                    Name: nftEQ_7_7_Name,
                    Image: nftEQ_7_7_Img,
                    Description: nft7_7.description,
                    Attribute: nft7_7.attributes,
                    RewardPerSec: Number(nftEQ1_slot7[6]) % 10000000,
                    isStaked: true
                })
            }
            let response7_slot7 = null
            try {
                response7_slot7 = data_slot7[8].status === 'success' ? await fetch(data_slot7[8].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft8_7 = response7_slot7 !== null ? await response7_slot7.json() : {image: null, name: null}
            const nftEQ_8_7_Img = nft8_7.image !== null ? nft8_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_8_7_Name = nft8_7.name
            if (response7_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ2_slot7[0]),
                    Name: nftEQ_8_7_Name,
                    Image: nftEQ_8_7_Img,
                    Description: nft8_7.description,
                    Attribute: nft8_7.attributes,
                    RewardPerSec: Number(nftEQ2_slot7[0]) % 10000000,
                    isStaked: true
                })
            }
            let response8_slot7 = null
            try {
                response8_slot7 = data_slot7[9].status === 'success' ? await fetch(data_slot7[9].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft9_7 = response8_slot7 !== null ? await response8_slot7.json() : {image: null, name: null}
            const nftEQ_9_7_Img = nft9_7.image !== null ? nft9_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_9_7_Name = nft9_7.name
            if (response8_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ2_slot7[1]),
                    Name: nftEQ_9_7_Name,
                    Image: nftEQ_9_7_Img,
                    Description: nft9_7.description,
                    Attribute: nft9_7.attributes,
                    RewardPerSec: Number(nftEQ2_slot7[1]) % 10000000,
                    isStaked: true
                })
            }
            let response9_slot7 = null
            try {
                response9_slot7 = data_slot7[10].status === 'success' ? await fetch(data_slot7[10].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft10_7 = response9_slot7 !== null ? await response9_slot7.json() : {image: null, name: null}
            const nftEQ_10_7_Img = nft10_7.image !== null ? nft10_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_10_7_Name = nft10_7.name
            if (response9_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ2_slot7[2]),
                    Name: nftEQ_10_7_Name,
                    Image: nftEQ_10_7_Img,
                    Description: nft10_7.description,
                    Attribute: nft10_7.attributes,
                    RewardPerSec: Number(nftEQ2_slot7[2]) % 10000000,
                    isStaked: true
                })
            }
            let response10_slot7 = null
            try {
                response10_slot7 = data_slot7[11].status === 'success' ? await fetch(data_slot7[11].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft11_7 = response10_slot7 !== null ? await response10_slot7.json() : {image: null, name: null}
            const nftEQ_11_7_Img = nft11_7.image !== null ? nft11_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_11_7_Name = nft11_7.name
            if (response10_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ2_slot7[3]),
                    Name: nftEQ_11_7_Name,
                    Image: nftEQ_11_7_Img,
                    Description: nft11_7.description,
                    Attribute: nft11_7.attributes,
                    RewardPerSec: Number(nftEQ2_slot7[3]) % 10000000,
                    isStaked: true
                })
            }
            let response11_slot7 = null
            try {
                response11_slot7 = data_slot7[12].status === 'success' ? await fetch(data_slot7[12].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft12_7 = response11_slot7 !== null ? await response11_slot7.json() : {image: null, name: null}
            const nftEQ_12_7_Img = nft12_7.image !== null ? nft12_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_12_7_Name = nft12_7.name
            if (response11_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ2_slot7[4]),
                    Name: nftEQ_12_7_Name,
                    Image: nftEQ_12_7_Img,
                    Description: nft12_7.description,
                    Attribute: nft12_7.attributes,
                    RewardPerSec: Number(nftEQ2_slot7[4]) % 10000000,
                    isStaked: true
                })
            }
            let response12_slot7 = null
            try {
                response12_slot7 = data_slot7[13].status === 'success' ? await fetch(data_slot7[13].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft13_7 = response12_slot7 !== null ? await response12_slot7.json() : {image: null, name: null}
            const nftEQ_13_7_Img = nft13_7.image !== null ? nft13_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_13_7_Name = nft13_7.name
            if (response12_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ2_slot7[5]),
                    Name: nftEQ_13_7_Name,
                    Image: nftEQ_13_7_Img,
                    Description: nft13_7.description,
                    Attribute: nft13_7.attributes,
                    RewardPerSec: Number(nftEQ2_slot7[5]) % 10000000,
                    isStaked: true
                })
            }
            let response13_slot7 = null
            try {
                response13_slot7 = data_slot7[14].status === 'success' ? await fetch(data_slot7[14].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft14_7 = response13_slot7 !== null ? await response13_slot7.json() : {image: null, name: null}
            const nftEQ_14_7_Img = nft14_7.image !== null ? nft14_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_14_7_Name = nft14_7.name
            if (response13_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ2_slot7[6]),
                    Name: nftEQ_14_7_Name,
                    Image: nftEQ_14_7_Img,
                    Description: nft14_7.description,
                    Attribute: nft14_7.attributes,
                    RewardPerSec: Number(nftEQ2_slot7[6]) % 10000000,
                    isStaked: true
                })
            }
            let response14_slot7 = null
            try {
                response14_slot7 = data_slot7[15].status === 'success' ? await fetch(data_slot7[15].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft15_7 = response14_slot7 !== null ? await response14_slot7.json() : {image: null, name: null}
            const nftEQ_15_7_Img = nft15_7.image !== null ? nft15_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_15_7_Name = nft15_7.name
            if (response14_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ2_slot7[7]),
                    Name: nftEQ_15_7_Name,
                    Image: nftEQ_15_7_Img,
                    Description: nft15_7.description,
                    Attribute: nft15_7.attributes,
                    RewardPerSec: Number(nftEQ2_slot7[7]) % 10000000,
                    isStaked: true
                })
            }
            let response15_slot7 = null
            try {
                response15_slot7 = data_slot7[16].status === 'success' ? await fetch(data_slot7[16].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft16_7 = response15_slot7 !== null ? await response15_slot7.json() : {image: null, name: null}
            const nftEQ_16_7_Img = nft16_7.image !== null ? nft16_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_16_7_Name = nft16_7.name
            if (response15_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQ2_slot7[8]),
                    Name: nftEQ_16_7_Name,
                    Image: nftEQ_16_7_Img,
                    Description: nft16_7.description,
                    Attribute: nft16_7.attributes,
                    RewardPerSec: Number(nftEQ2_slot7[8]) % 10000000,
                    isStaked: true
                })
            }
            let response16_slot7 = null
            try {
                response16_slot7 = data_slot7[17].status === 'success' ? await fetch(data_slot7[17].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft17_7 = response16_slot7 !== null ? await response16_slot7.json() : {image: null, name: null}
            const nftEQ_17_7_Img = nft17_7.image !== null ? nft17_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_17_7_Name = nft17_7.name
            if (response16_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQCard_slot7[0]),
                    Name: nftEQ_17_7_Name,
                    Image: nftEQ_17_7_Img,
                    Description: nft17_7.description,
                    Attribute: nft17_7.attributes,
                    RewardPerSec: Number(nftEQCard_slot7[0]) % 10000000,
                    isStaked: true
                })
            }
            let response17_slot7 = null
            try {
                response17_slot7 = data_slot7[18].status === 'success' ? await fetch(data_slot7[18].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft18_7 = response17_slot7 !== null ? await response17_slot7.json() : {image: null, name: null}
            const nftEQ_18_7_Img = nft18_7.image !== null ? nft18_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_18_7_Name = nft18_7.name
            if (response17_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQCard_slot7[1]),
                    Name: nftEQ_18_7_Name,
                    Image: nftEQ_18_7_Img,
                    Description: nft18_7.description,
                    Attribute: nft18_7.attributes,
                    RewardPerSec: Number(nftEQCard_slot7[1]) % 10000000,
                    isStaked: true
                })
            }
            let response18_slot7 = null
            try {
                response18_slot7 = data_slot7[19].status === 'success' ? await fetch(data_slot7[19].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft19_7 = response18_slot7 !== null ? await response18_slot7.json() : {image: null, name: null}
            const nftEQ_19_7_Img = nft19_7.image !== null ? nft19_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_19_7_Name = nft19_7.name
            if (response18_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQCard_slot7[2]),
                    Name: nftEQ_19_7_Name,
                    Image: nftEQ_19_7_Img,
                    Description: nft19_7.description,
                    Attribute: nft19_7.attributes,
                    RewardPerSec: Number(nftEQCard_slot7[2]) % 10000000,
                    isStaked: true
                })
            }
            let response19_slot7 = null
            try {
                response19_slot7 = data_slot7[20].status === 'success' ? await fetch(data_slot7[20].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft20_7 = response19_slot7 !== null ? await response19_slot7.json() : {image: null, name: null}
            const nftEQ_20_7_Img = nft20_7.image !== null ? nft20_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_20_7_Name = nft20_7.name
            if (response19_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQCard_slot7[3]),
                    Name: nftEQ_20_7_Name,
                    Image: nftEQ_20_7_Img,
                    Description: nft20_7.description,
                    Attribute: nft20_7.attributes,
                    RewardPerSec: Number(nftEQCard_slot7[3]) % 10000000,
                    isStaked: true
                })
            }
            let response20_slot7 = null
            try {
                response20_slot7 = data_slot7[21].status === 'success' ? await fetch(data_slot7[21].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft21_7 = response20_slot7 !== null ? await response20_slot7.json() : {image: null, name: null}
            const nftEQ_21_7_Img = nft21_7.image !== null ? nft21_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_21_7_Name = nft21_7.name
            if (response20_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQCard_slot7[4]),
                    Name: nftEQ_21_7_Name,
                    Image: nftEQ_21_7_Img,
                    Description: nft21_7.description,
                    Attribute: nft21_7.attributes,
                    RewardPerSec: Number(nftEQCard_slot7[4]) % 10000000,
                    isStaked: true
                })
            }
            let response21_slot7 = null
            try {
                response21_slot7 = data_slot7[22].status === 'success' ? await fetch(data_slot7[22].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft22_7 = response21_slot7 !== null ? await response21_slot7.json() : {image: null, name: null}
            const nftEQ_22_7_Img = nft22_7.image !== null ? nft22_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_22_7_Name = nft22_7.name
            if (response21_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQCard_slot7[5]),
                    Name: nftEQ_22_7_Name,
                    Image: nftEQ_22_7_Img,
                    Description: nft22_7.description,
                    Attribute: nft22_7.attributes,
                    RewardPerSec: Number(nftEQCard_slot7[5]) % 10000000,
                    isStaked: true
                })
            }
            let response22_slot7 = null
            try {
                response22_slot7 = data_slot7[23].status === 'success' ? await fetch(data_slot7[23].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft23_7 = response22_slot7 !== null ? await response22_slot7.json() : {image: null, name: null}
            const nftEQ_23_7_Img = nft23_7.image !== null ? nft23_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_23_7_Name = nft23_7.name
            if (response22_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQCard_slot7[6]),
                    Name: nftEQ_23_7_Name,
                    Image: nftEQ_23_7_Img,
                    Description: nft23_7.description,
                    Attribute: nft23_7.attributes,
                    RewardPerSec: Number(nftEQCard_slot7[6]) % 10000000,
                    isStaked: true
                })
            }
            let response23_slot7 = null
            try {
                response23_slot7 = data_slot7[24].status === 'success' ? await fetch(data_slot7[24].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft24_7 = response23_slot7 !== null ? await response23_slot7.json() : {image: null, name: null}
            const nftEQ_24_7_Img = nft24_7.image !== null ? nft24_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_24_7_Name = nft24_7.name
            if (response23_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQCard_slot7[7]),
                    Name: nftEQ_24_7_Name,
                    Image: nftEQ_24_7_Img,
                    Description: nft24_7.description,
                    Attribute: nft24_7.attributes,
                    RewardPerSec: Number(nftEQCard_slot7[7]) % 10000000,
                    isStaked: true
                })
            }
            let response24_slot7 = null
            try {
                response24_slot7 = data_slot7[25].status === 'success' ? await fetch(data_slot7[25].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft25_7 = response24_slot7 !== null ? await response24_slot7.json() : {image: null, name: null}
            const nftEQ_25_7_Img = nft25_7.image !== null ? nft25_7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_25_7_Name = nft25_7.name
            if (response24_slot7 !== null) {
                nfts.push({
                    Slot: 7,
                    Id: Number(nftEQCard_slot7[8]),
                    Name: nftEQ_25_7_Name,
                    Image: nftEQ_25_7_Img,
                    Description: nft25_7.description,
                    Attribute: nft25_7.attributes,
                    RewardPerSec: Number(nftEQCard_slot7[8]) % 10000000,
                    isStaked: true
                })
            }
            const allPow7 = Number(nftStatus_slot7[0])
            const isStaked7 = nftStatus_slot7[2]
            const refuelAt7 = Number(nftStatus_slot7[1])
            const rewardPending7 = isStaked7 ? data_slot7[0].result : 0

            const nftEQ1_slot8 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip',
                args: [address, 7],
            }) : [0, 0, 0, 0, 0, 0, 0]
            const nftEQ2_slot8 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip2',
                args: [address, 7],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftEQCard_slot8 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquipCard',
                args: [address, 7],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftStatus_slot8 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftStatus',
                args: [address, 7],
            }) : [0, 0, false]
            const data_slot8 = await readContracts({
                contracts: [
                    {
                        address: dunGEM,
                        abi: dunGEMABI,
                        functionName: 'calculateRewards',
                        args: [address, 7],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot8[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot8[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot8[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot8[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot8[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot8[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot8[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot8[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot8[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot8[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot8[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot8[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot8[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot8[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot8[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot8[8])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot8[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot8[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot8[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot8[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot8[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot8[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot8[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot8[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot8[8])],
                    },
                ],
            })
            console.log(data_slot8)
            let response0_slot8 = null
            try {
                response0_slot8 = data_slot8[1].status === 'success' ? await fetch(data_slot8[1].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft1_8 = response0_slot8 !== null ? await response0_slot8.json() : {image: null, name: null}
            const nftEQ_1_8_Img = nft1_8.image !== null ? nft1_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_1_8_Name = nft1_8.name
            if (response0_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ1_slot8[0]),
                    Name: nftEQ_1_8_Name,
                    Image: nftEQ_1_8_Img,
                    Description: nft1_8.description,
                    Attribute: nft1_8.attributes,
                    RewardPerSec: Number(nftEQ1_slot8[0]) % 10000000,
                    isStaked: true
                })
            }
            let response1_slot8 = null
            try {
                response1_slot8 = data_slot8[2].status === 'success' ? await fetch(data_slot8[2].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft2_8 = response1_slot8 !== null ? await response1_slot8.json() : {image: null, name: null}
            const nftEQ_2_8_Img = nft2_8.image !== null ? nft2_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_2_8_Name = nft2_8.name
            if (response1_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ1_slot8[1]),
                    Name: nftEQ_2_8_Name,
                    Image: nftEQ_2_8_Img,
                    Description: nft2_8.description,
                    Attribute: nft2_8.attributes,
                    RewardPerSec: Number(nftEQ1_slot8[1]) % 10000000,
                    isStaked: true
                })
            }
            let response2_slot8 = null
            try {
                response2_slot8 = data_slot8[3].status === 'success' ? await fetch(data_slot8[3].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft3_8 = response2_slot8 !== null ? await response2_slot8.json() : {image: null, name: null}
            const nftEQ_3_8_Img = nft3_8.image !== null ? nft3_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_3_8_Name = nft3_8.name
            if (response2_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ1_slot8[2]),
                    Name: nftEQ_3_8_Name,
                    Image: nftEQ_3_8_Img,
                    Description: nft3_8.description,
                    Attribute: nft3_8.attributes,
                    RewardPerSec: Number(nftEQ1_slot8[2]) % 10000000,
                    isStaked: true
                })
            }
            let response3_slot8 = null
            try {
                response3_slot8 = data_slot8[4].status === 'success' ? await fetch(data_slot8[4].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft4_8 = response3_slot8 !== null ? await response3_slot8.json() : {image: null, name: null}
            const nftEQ_4_8_Img = nft4_8.image !== null ? nft4_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_4_8_Name = nft4_8.name
            if (response3_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ1_slot8[3]),
                    Name: nftEQ_4_8_Name,
                    Image: nftEQ_4_8_Img,
                    Description: nft4_8.description,
                    Attribute: nft4_8.attributes,
                    RewardPerSec: Number(nftEQ1_slot8[3]) % 10000000,
                    isStaked: true
                })
            }
            let response4_slot8 = null
            try {
                response4_slot8 = data_slot8[5].status === 'success' ? await fetch(data_slot8[5].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft5_8 = response4_slot8 !== null ? await response4_slot8.json() : {image: null, name: null}
            const nftEQ_5_8_Img = nft5_8.image !== null ? nft5_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_5_8_Name = nft5_8.name
            if (response4_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ1_slot8[4]),
                    Name: nftEQ_5_8_Name,
                    Image: nftEQ_5_8_Img,
                    Description: nft5_8.description,
                    Attribute: nft5_8.attributes,
                    RewardPerSec: Number(nftEQ1_slot8[4]) % 10000000,
                    isStaked: true
                })
            }
            let response5_slot8 = null
            try {
                response5_slot8 = data_slot8[6].status === 'success' ? await fetch(data_slot8[6].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft6_8 = response5_slot8 !== null ? await response5_slot8.json() : {image: null, name: null}
            const nftEQ_6_8_Img = nft6_8.image !== null ? nft6_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_6_8_Name = nft6_8.name
            if (response5_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ1_slot8[5]),
                    Name: nftEQ_6_8_Name,
                    Image: nftEQ_6_8_Img,
                    Description: nft6_8.description,
                    Attribute: nft6_8.attributes,
                    RewardPerSec: Number(nftEQ1_slot8[5]) % 10000000,
                    isStaked: true
                })
            }
            let response6_slot8 = null
            try {
                response6_slot8 = data_slot8[7].status === 'success' ? await fetch(data_slot8[7].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft7_8 = response6_slot8 !== null ? await response6_slot8.json() : {image: null, name: null}
            const nftEQ_7_8_Img = nft7_8.image !== null ? nft7_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_7_8_Name = nft7_8.name
            if (response6_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ1_slot8[6]),
                    Name: nftEQ_7_8_Name,
                    Image: nftEQ_7_8_Img,
                    Description: nft7_8.description,
                    Attribute: nft7_8.attributes,
                    RewardPerSec: Number(nftEQ1_slot8[6]) % 10000000,
                    isStaked: true
                })
            }
            let response7_slot8 = null
            try {
                response7_slot8 = data_slot8[8].status === 'success' ? await fetch(data_slot8[8].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft8_8 = response7_slot8 !== null ? await response7_slot8.json() : {image: null, name: null}
            const nftEQ_8_8_Img = nft8_8.image !== null ? nft8_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_8_8_Name = nft8_8.name
            if (response7_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ2_slot8[0]),
                    Name: nftEQ_8_8_Name,
                    Image: nftEQ_8_8_Img,
                    Description: nft8_8.description,
                    Attribute: nft8_8.attributes,
                    RewardPerSec: Number(nftEQ2_slot8[0]) % 10000000,
                    isStaked: true
                })
            }
            let response8_slot8 = null
            try {
                response8_slot8 = data_slot8[9].status === 'success' ? await fetch(data_slot8[9].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft9_8 = response8_slot8 !== null ? await response8_slot8.json() : {image: null, name: null}
            const nftEQ_9_8_Img = nft9_8.image !== null ? nft9_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_9_8_Name = nft9_8.name
            if (response8_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ2_slot8[1]),
                    Name: nftEQ_9_8_Name,
                    Image: nftEQ_9_8_Img,
                    Description: nft9_8.description,
                    Attribute: nft9_8.attributes,
                    RewardPerSec: Number(nftEQ2_slot8[1]) % 10000000,
                    isStaked: true
                })
            }
            let response9_slot8 = null
            try {
                response9_slot8 = data_slot8[10].status === 'success' ? await fetch(data_slot8[10].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft10_8 = response9_slot8 !== null ? await response9_slot8.json() : {image: null, name: null}
            const nftEQ_10_8_Img = nft10_8.image !== null ? nft10_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_10_8_Name = nft10_8.name
            if (response9_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ2_slot8[2]),
                    Name: nftEQ_10_8_Name,
                    Image: nftEQ_10_8_Img,
                    Description: nft10_8.description,
                    Attribute: nft10_8.attributes,
                    RewardPerSec: Number(nftEQ2_slot8[2]) % 10000000,
                    isStaked: true
                })
            }
            let response10_slot8 = null
            try {
                response10_slot8 = data_slot8[11].status === 'success' ? await fetch(data_slot8[11].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft11_8 = response10_slot8 !== null ? await response10_slot8.json() : {image: null, name: null}
            const nftEQ_11_8_Img = nft11_8.image !== null ? nft11_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_11_8_Name = nft11_8.name
            if (response10_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ2_slot8[3]),
                    Name: nftEQ_11_8_Name,
                    Image: nftEQ_11_8_Img,
                    Description: nft11_8.description,
                    Attribute: nft11_8.attributes,
                    RewardPerSec: Number(nftEQ2_slot8[3]) % 10000000,
                    isStaked: true
                })
            }
            let response11_slot8 = null
            try {
                response11_slot8 = data_slot8[12].status === 'success' ? await fetch(data_slot8[12].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft12_8 = response11_slot8 !== null ? await response11_slot8.json() : {image: null, name: null}
            const nftEQ_12_8_Img = nft12_8.image !== null ? nft12_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_12_8_Name = nft12_8.name
            if (response11_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ2_slot8[4]),
                    Name: nftEQ_12_8_Name,
                    Image: nftEQ_12_8_Img,
                    Description: nft12_8.description,
                    Attribute: nft12_8.attributes,
                    RewardPerSec: Number(nftEQ2_slot8[4]) % 10000000,
                    isStaked: true
                })
            }
            let response12_slot8 = null
            try {
                response12_slot8 = data_slot8[13].status === 'success' ? await fetch(data_slot8[13].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft13_8 = response12_slot8 !== null ? await response12_slot8.json() : {image: null, name: null}
            const nftEQ_13_8_Img = nft13_8.image !== null ? nft13_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_13_8_Name = nft13_8.name
            if (response12_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ2_slot8[5]),
                    Name: nftEQ_13_8_Name,
                    Image: nftEQ_13_8_Img,
                    Description: nft13_8.description,
                    Attribute: nft13_8.attributes,
                    RewardPerSec: Number(nftEQ2_slot8[5]) % 10000000,
                    isStaked: true
                })
            }
            let response13_slot8 = null
            try {
                response13_slot8 = data_slot8[14].status === 'success' ? await fetch(data_slot8[14].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft14_8 = response13_slot8 !== null ? await response13_slot8.json() : {image: null, name: null}
            const nftEQ_14_8_Img = nft14_8.image !== null ? nft14_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_14_8_Name = nft14_8.name
            if (response13_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ2_slot8[6]),
                    Name: nftEQ_14_8_Name,
                    Image: nftEQ_14_8_Img,
                    Description: nft14_8.description,
                    Attribute: nft14_8.attributes,
                    RewardPerSec: Number(nftEQ2_slot8[6]) % 10000000,
                    isStaked: true
                })
            }
            let response14_slot8 = null
            try {
                response14_slot8 = data_slot8[15].status === 'success' ? await fetch(data_slot8[15].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft15_8 = response14_slot8 !== null ? await response14_slot8.json() : {image: null, name: null}
            const nftEQ_15_8_Img = nft15_8.image !== null ? nft15_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_15_8_Name = nft15_8.name
            if (response14_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ2_slot8[7]),
                    Name: nftEQ_15_8_Name,
                    Image: nftEQ_15_8_Img,
                    Description: nft15_8.description,
                    Attribute: nft15_8.attributes,
                    RewardPerSec: Number(nftEQ2_slot8[7]) % 10000000,
                    isStaked: true
                })
            }
            let response15_slot8 = null
            try {
                response15_slot8 = data_slot8[16].status === 'success' ? await fetch(data_slot8[16].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft16_8 = response15_slot8 !== null ? await response15_slot8.json() : {image: null, name: null}
            const nftEQ_16_8_Img = nft16_8.image !== null ? nft16_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_16_8_Name = nft16_8.name
            if (response15_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQ2_slot8[8]),
                    Name: nftEQ_16_8_Name,
                    Image: nftEQ_16_8_Img,
                    Description: nft16_8.description,
                    Attribute: nft16_8.attributes,
                    RewardPerSec: Number(nftEQ2_slot8[8]) % 10000000,
                    isStaked: true
                })
            }
            let response16_slot8 = null
            try {
                response16_slot8 = data_slot8[17].status === 'success' ? await fetch(data_slot8[17].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft17_8 = response16_slot8 !== null ? await response16_slot8.json() : {image: null, name: null}
            const nftEQ_17_8_Img = nft17_8.image !== null ? nft17_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_17_8_Name = nft17_8.name
            if (response16_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQCard_slot8[0]),
                    Name: nftEQ_17_8_Name,
                    Image: nftEQ_17_8_Img,
                    Description: nft17_8.description,
                    Attribute: nft17_8.attributes,
                    RewardPerSec: Number(nftEQCard_slot8[0]) % 10000000,
                    isStaked: true
                })
            }
            let response17_slot8 = null
            try {
                response17_slot8 = data_slot8[18].status === 'success' ? await fetch(data_slot8[18].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft18_8 = response17_slot8 !== null ? await response17_slot8.json() : {image: null, name: null}
            const nftEQ_18_8_Img = nft18_8.image !== null ? nft18_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_18_8_Name = nft18_8.name
            if (response17_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQCard_slot8[1]),
                    Name: nftEQ_18_8_Name,
                    Image: nftEQ_18_8_Img,
                    Description: nft18_8.description,
                    Attribute: nft18_8.attributes,
                    RewardPerSec: Number(nftEQCard_slot8[1]) % 10000000,
                    isStaked: true
                })
            }
            let response18_slot8 = null
            try {
                response18_slot8 = data_slot8[19].status === 'success' ? await fetch(data_slot8[19].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft19_8 = response18_slot8 !== null ? await response18_slot8.json() : {image: null, name: null}
            const nftEQ_19_8_Img = nft19_8.image !== null ? nft19_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_19_8_Name = nft19_8.name
            if (response18_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQCard_slot8[2]),
                    Name: nftEQ_19_8_Name,
                    Image: nftEQ_19_8_Img,
                    Description: nft19_8.description,
                    Attribute: nft19_8.attributes,
                    RewardPerSec: Number(nftEQCard_slot8[2]) % 10000000,
                    isStaked: true
                })
            }
            let response19_slot8 = null
            try {
                response19_slot8 = data_slot8[20].status === 'success' ? await fetch(data_slot8[20].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft20_8 = response19_slot8 !== null ? await response19_slot8.json() : {image: null, name: null}
            const nftEQ_20_8_Img = nft20_8.image !== null ? nft20_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_20_8_Name = nft20_8.name
            if (response19_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQCard_slot8[3]),
                    Name: nftEQ_20_8_Name,
                    Image: nftEQ_20_8_Img,
                    Description: nft20_8.description,
                    Attribute: nft20_8.attributes,
                    RewardPerSec: Number(nftEQCard_slot8[3]) % 10000000,
                    isStaked: true
                })
            }
            let response20_slot8 = null
            try {
                response20_slot8 = data_slot8[21].status === 'success' ? await fetch(data_slot8[21].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft21_8 = response20_slot8 !== null ? await response20_slot8.json() : {image: null, name: null}
            const nftEQ_21_8_Img = nft21_8.image !== null ? nft21_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_21_8_Name = nft21_8.name
            if (response20_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQCard_slot8[4]),
                    Name: nftEQ_21_8_Name,
                    Image: nftEQ_21_8_Img,
                    Description: nft21_8.description,
                    Attribute: nft21_8.attributes,
                    RewardPerSec: Number(nftEQCard_slot8[4]) % 10000000,
                    isStaked: true
                })
            }
            let response21_slot8 = null
            try {
                response21_slot8 = data_slot8[22].status === 'success' ? await fetch(data_slot8[22].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft22_8 = response21_slot8 !== null ? await response21_slot8.json() : {image: null, name: null}
            const nftEQ_22_8_Img = nft22_8.image !== null ? nft22_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_22_8_Name = nft22_8.name
            if (response21_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQCard_slot8[5]),
                    Name: nftEQ_22_8_Name,
                    Image: nftEQ_22_8_Img,
                    Description: nft22_8.description,
                    Attribute: nft22_8.attributes,
                    RewardPerSec: Number(nftEQCard_slot8[5]) % 10000000,
                    isStaked: true
                })
            }
            let response22_slot8 = null
            try {
                response22_slot8 = data_slot8[23].status === 'success' ? await fetch(data_slot8[23].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft23_8 = response22_slot8 !== null ? await response22_slot8.json() : {image: null, name: null}
            const nftEQ_23_8_Img = nft23_8.image !== null ? nft23_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_23_8_Name = nft23_8.name
            if (response22_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQCard_slot8[6]),
                    Name: nftEQ_23_8_Name,
                    Image: nftEQ_23_8_Img,
                    Description: nft23_8.description,
                    Attribute: nft23_8.attributes,
                    RewardPerSec: Number(nftEQCard_slot8[6]) % 10000000,
                    isStaked: true
                })
            }
            let response23_slot8 = null
            try {
                response23_slot8 = data_slot8[24].status === 'success' ? await fetch(data_slot8[24].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft24_8 = response23_slot8 !== null ? await response23_slot8.json() : {image: null, name: null}
            const nftEQ_24_8_Img = nft24_8.image !== null ? nft24_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_24_8_Name = nft24_8.name
            if (response23_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQCard_slot8[7]),
                    Name: nftEQ_24_8_Name,
                    Image: nftEQ_24_8_Img,
                    Description: nft24_8.description,
                    Attribute: nft24_8.attributes,
                    RewardPerSec: Number(nftEQCard_slot8[7]) % 10000000,
                    isStaked: true
                })
            }
            let response24_slot8 = null
            try {
                response24_slot8 = data_slot8[25].status === 'success' ? await fetch(data_slot8[25].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft25_8 = response24_slot8 !== null ? await response24_slot8.json() : {image: null, name: null}
            const nftEQ_25_8_Img = nft25_8.image !== null ? nft25_8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_25_8_Name = nft25_8.name
            if (response24_slot8 !== null) {
                nfts.push({
                    Slot: 8,
                    Id: Number(nftEQCard_slot8[8]),
                    Name: nftEQ_25_8_Name,
                    Image: nftEQ_25_8_Img,
                    Description: nft25_8.description,
                    Attribute: nft25_8.attributes,
                    RewardPerSec: Number(nftEQCard_slot8[8]) % 10000000,
                    isStaked: true
                })
            }
            const allPow8 = Number(nftStatus_slot8[0])
            const isStaked8 = nftStatus_slot8[2]
            const refuelAt8 = Number(nftStatus_slot8[1])
            const rewardPending8 = isStaked8 ? data_slot8[0].result : 0

            const nftEQ1_slot9 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip',
                args: [address, 8],
            }) : [0, 0, 0, 0, 0, 0, 0]
            const nftEQ2_slot9 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip2',
                args: [address, 8],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftEQCard_slot9 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquipCard',
                args: [address, 8],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftStatus_slot9 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftStatus',
                args: [address, 8],
            }) : [0, 0, false]
            const data_slot9 = await readContracts({
                contracts: [
                    {
                        address: dunGEM,
                        abi: dunGEMABI,
                        functionName: 'calculateRewards',
                        args: [address, 8],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot9[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot9[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot9[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot9[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot9[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot9[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot9[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot9[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot9[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot9[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot9[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot9[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot9[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot9[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot9[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot9[8])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot9[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot9[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot9[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot9[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot9[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot9[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot9[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot9[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot9[8])],
                    },
                ],
            })
            console.log(data_slot9)
            let response0_slot9 = null
            try {
                response0_slot9 = data_slot9[1].status === 'success' ? await fetch(data_slot9[1].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft1_9 = response0_slot9 !== null ? await response0_slot9.json() : {image: null, name: null}
            const nftEQ_1_9_Img = nft1_9.image !== null ? nft1_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_1_9_Name = nft1_9.name
            if (response0_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ1_slot9[0]),
                    Name: nftEQ_1_9_Name,
                    Image: nftEQ_1_9_Img,
                    Description: nft1_9.description,
                    Attribute: nft1_9.attributes,
                    RewardPerSec: Number(nftEQ1_slot9[0]) % 10000000,
                    isStaked: true
                })
            }
            let response1_slot9 = null
            try {
                response1_slot9 = data_slot9[2].status === 'success' ? await fetch(data_slot9[2].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft2_9 = response1_slot9 !== null ? await response1_slot9.json() : {image: null, name: null}
            const nftEQ_2_9_Img = nft2_9.image !== null ? nft2_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_2_9_Name = nft2_9.name
            if (response1_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ1_slot9[1]),
                    Name: nftEQ_2_9_Name,
                    Image: nftEQ_2_9_Img,
                    Description: nft2_9.description,
                    Attribute: nft2_9.attributes,
                    RewardPerSec: Number(nftEQ1_slot9[1]) % 10000000,
                    isStaked: true
                })
            }
            let response2_slot9 = null
            try {
                response2_slot9 = data_slot9[3].status === 'success' ? await fetch(data_slot9[3].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft3_9 = response2_slot9 !== null ? await response2_slot9.json() : {image: null, name: null}
            const nftEQ_3_9_Img = nft3_9.image !== null ? nft3_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_3_9_Name = nft3_9.name
            if (response2_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ1_slot9[2]),
                    Name: nftEQ_3_9_Name,
                    Image: nftEQ_3_9_Img,
                    Description: nft3_9.description,
                    Attribute: nft3_9.attributes,
                    RewardPerSec: Number(nftEQ1_slot9[2]) % 10000000,
                    isStaked: true
                })
            }
            let response3_slot9 = null
            try {
                response3_slot9 = data_slot9[4].status === 'success' ? await fetch(data_slot9[4].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft4_9 = response3_slot9 !== null ? await response3_slot9.json() : {image: null, name: null}
            const nftEQ_4_9_Img = nft4_9.image !== null ? nft4_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_4_9_Name = nft4_9.name
            if (response3_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ1_slot9[3]),
                    Name: nftEQ_4_9_Name,
                    Image: nftEQ_4_9_Img,
                    Description: nft4_9.description,
                    Attribute: nft4_9.attributes,
                    RewardPerSec: Number(nftEQ1_slot9[3]) % 10000000,
                    isStaked: true
                })
            }
            let response4_slot9 = null
            try {
                response4_slot9 = data_slot9[5].status === 'success' ? await fetch(data_slot9[5].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft5_9 = response4_slot9 !== null ? await response4_slot9.json() : {image: null, name: null}
            const nftEQ_5_9_Img = nft5_9.image !== null ? nft5_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_5_9_Name = nft5_9.name
            if (response4_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ1_slot9[4]),
                    Name: nftEQ_5_9_Name,
                    Image: nftEQ_5_9_Img,
                    Description: nft5_9.description,
                    Attribute: nft5_9.attributes,
                    RewardPerSec: Number(nftEQ1_slot9[4]) % 10000000,
                    isStaked: true
                })
            }
            let response5_slot9 = null
            try {
                response5_slot9 = data_slot9[6].status === 'success' ? await fetch(data_slot9[6].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft6_9 = response5_slot9 !== null ? await response5_slot9.json() : {image: null, name: null}
            const nftEQ_6_9_Img = nft6_9.image !== null ? nft6_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_6_9_Name = nft6_9.name
            if (response5_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ1_slot9[5]),
                    Name: nftEQ_6_9_Name,
                    Image: nftEQ_6_9_Img,
                    Description: nft6_9.description,
                    Attribute: nft6_9.attributes,
                    RewardPerSec: Number(nftEQ1_slot9[5]) % 10000000,
                    isStaked: true
                })
            }
            let response6_slot9 = null
            try {
                response6_slot9 = data_slot9[7].status === 'success' ? await fetch(data_slot9[7].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft7_9 = response6_slot9 !== null ? await response6_slot9.json() : {image: null, name: null}
            const nftEQ_7_9_Img = nft7_9.image !== null ? nft7_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_7_9_Name = nft7_9.name
            if (response6_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ1_slot9[6]),
                    Name: nftEQ_7_9_Name,
                    Image: nftEQ_7_9_Img,
                    Description: nft7_9.description,
                    Attribute: nft7_9.attributes,
                    RewardPerSec: Number(nftEQ1_slot9[6]) % 10000000,
                    isStaked: true
                })
            }
            let response7_slot9 = null
            try {
                response7_slot9 = data_slot9[8].status === 'success' ? await fetch(data_slot9[8].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft8_9 = response7_slot9 !== null ? await response7_slot9.json() : {image: null, name: null}
            const nftEQ_8_9_Img = nft8_9.image !== null ? nft8_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_8_9_Name = nft8_9.name
            if (response7_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ2_slot9[0]),
                    Name: nftEQ_8_9_Name,
                    Image: nftEQ_8_9_Img,
                    Description: nft8_9.description,
                    Attribute: nft8_9.attributes,
                    RewardPerSec: Number(nftEQ2_slot9[0]) % 10000000,
                    isStaked: true
                })
            }
            let response8_slot9 = null
            try {
                response8_slot9 = data_slot9[9].status === 'success' ? await fetch(data_slot9[9].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft9_9 = response8_slot9 !== null ? await response8_slot9.json() : {image: null, name: null}
            const nftEQ_9_9_Img = nft9_9.image !== null ? nft9_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_9_9_Name = nft9_9.name
            if (response8_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ2_slot9[1]),
                    Name: nftEQ_9_9_Name,
                    Image: nftEQ_9_9_Img,
                    Description: nft9_9.description,
                    Attribute: nft9_9.attributes,
                    RewardPerSec: Number(nftEQ2_slot9[1]) % 10000000,
                    isStaked: true
                })
            }
            let response9_slot9 = null
            try {
                response9_slot9 = data_slot9[10].status === 'success' ? await fetch(data_slot9[10].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft10_9 = response9_slot9 !== null ? await response9_slot9.json() : {image: null, name: null}
            const nftEQ_10_9_Img = nft10_9.image !== null ? nft10_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_10_9_Name = nft10_9.name
            if (response9_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ2_slot9[2]),
                    Name: nftEQ_10_9_Name,
                    Image: nftEQ_10_9_Img,
                    Description: nft10_9.description,
                    Attribute: nft10_9.attributes,
                    RewardPerSec: Number(nftEQ2_slot9[2]) % 10000000,
                    isStaked: true
                })
            }
            let response10_slot9 = null
            try {
                response10_slot9 = data_slot9[11].status === 'success' ? await fetch(data_slot9[11].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft11_9 = response10_slot9 !== null ? await response10_slot9.json() : {image: null, name: null}
            const nftEQ_11_9_Img = nft11_9.image !== null ? nft11_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_11_9_Name = nft11_9.name
            if (response10_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ2_slot9[3]),
                    Name: nftEQ_11_9_Name,
                    Image: nftEQ_11_9_Img,
                    Description: nft11_9.description,
                    Attribute: nft11_9.attributes,
                    RewardPerSec: Number(nftEQ2_slot9[3]) % 10000000,
                    isStaked: true
                })
            }
            let response11_slot9 = null
            try {
                response11_slot9 = data_slot9[12].status === 'success' ? await fetch(data_slot9[12].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft12_9 = response11_slot9 !== null ? await response11_slot9.json() : {image: null, name: null}
            const nftEQ_12_9_Img = nft12_9.image !== null ? nft12_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_12_9_Name = nft12_9.name
            if (response11_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ2_slot9[4]),
                    Name: nftEQ_12_9_Name,
                    Image: nftEQ_12_9_Img,
                    Description: nft12_9.description,
                    Attribute: nft12_9.attributes,
                    RewardPerSec: Number(nftEQ2_slot9[4]) % 10000000,
                    isStaked: true
                })
            }
            let response12_slot9 = null
            try {
                response12_slot9 = data_slot9[13].status === 'success' ? await fetch(data_slot9[13].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft13_9 = response12_slot9 !== null ? await response12_slot9.json() : {image: null, name: null}
            const nftEQ_13_9_Img = nft13_9.image !== null ? nft13_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_13_9_Name = nft13_9.name
            if (response12_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ2_slot9[5]),
                    Name: nftEQ_13_9_Name,
                    Image: nftEQ_13_9_Img,
                    Description: nft13_9.description,
                    Attribute: nft13_9.attributes,
                    RewardPerSec: Number(nftEQ2_slot9[5]) % 10000000,
                    isStaked: true
                })
            }
            let response13_slot9 = null
            try {
                response13_slot9 = data_slot9[14].status === 'success' ? await fetch(data_slot9[14].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft14_9 = response13_slot9 !== null ? await response13_slot9.json() : {image: null, name: null}
            const nftEQ_14_9_Img = nft14_9.image !== null ? nft14_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_14_9_Name = nft14_9.name
            if (response13_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ2_slot9[6]),
                    Name: nftEQ_14_9_Name,
                    Image: nftEQ_14_9_Img,
                    Description: nft14_9.description,
                    Attribute: nft14_9.attributes,
                    RewardPerSec: Number(nftEQ2_slot9[6]) % 10000000,
                    isStaked: true
                })
            }
            let response14_slot9 = null
            try {
                response14_slot9 = data_slot9[15].status === 'success' ? await fetch(data_slot9[15].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft15_9 = response14_slot9 !== null ? await response14_slot9.json() : {image: null, name: null}
            const nftEQ_15_9_Img = nft15_9.image !== null ? nft15_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_15_9_Name = nft15_9.name
            if (response14_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ2_slot9[7]),
                    Name: nftEQ_15_9_Name,
                    Image: nftEQ_15_9_Img,
                    Description: nft15_9.description,
                    Attribute: nft15_9.attributes,
                    RewardPerSec: Number(nftEQ2_slot9[7]) % 10000000,
                    isStaked: true
                })
            }
            let response15_slot9 = null
            try {
                response15_slot9 = data_slot9[16].status === 'success' ? await fetch(data_slot9[16].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft16_9 = response15_slot9 !== null ? await response15_slot9.json() : {image: null, name: null}
            const nftEQ_16_9_Img = nft16_9.image !== null ? nft16_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_16_9_Name = nft16_9.name
            if (response15_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQ2_slot9[8]),
                    Name: nftEQ_16_9_Name,
                    Image: nftEQ_16_9_Img,
                    Description: nft16_9.description,
                    Attribute: nft16_9.attributes,
                    RewardPerSec: Number(nftEQ2_slot9[8]) % 10000000,
                    isStaked: true
                })
            }
            let response16_slot9 = null
            try {
                response16_slot9 = data_slot9[17].status === 'success' ? await fetch(data_slot9[17].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft17_9 = response16_slot9 !== null ? await response16_slot9.json() : {image: null, name: null}
            const nftEQ_17_9_Img = nft17_9.image !== null ? nft17_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_17_9_Name = nft17_9.name
            if (response16_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQCard_slot9[0]),
                    Name: nftEQ_17_9_Name,
                    Image: nftEQ_17_9_Img,
                    Description: nft17_9.description,
                    Attribute: nft17_9.attributes,
                    RewardPerSec: Number(nftEQCard_slot9[0]) % 10000000,
                    isStaked: true
                })
            }
            let response17_slot9 = null
            try {
                response17_slot9 = data_slot9[18].status === 'success' ? await fetch(data_slot9[18].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft18_9 = response17_slot9 !== null ? await response17_slot9.json() : {image: null, name: null}
            const nftEQ_18_9_Img = nft18_9.image !== null ? nft18_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_18_9_Name = nft18_9.name
            if (response17_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQCard_slot9[1]),
                    Name: nftEQ_18_9_Name,
                    Image: nftEQ_18_9_Img,
                    Description: nft18_9.description,
                    Attribute: nft18_9.attributes,
                    RewardPerSec: Number(nftEQCard_slot9[1]) % 10000000,
                    isStaked: true
                })
            }
            let response18_slot9 = null
            try {
                response18_slot9 = data_slot9[19].status === 'success' ? await fetch(data_slot9[19].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft19_9 = response18_slot9 !== null ? await response18_slot9.json() : {image: null, name: null}
            const nftEQ_19_9_Img = nft19_9.image !== null ? nft19_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_19_9_Name = nft19_9.name
            if (response18_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQCard_slot9[2]),
                    Name: nftEQ_19_9_Name,
                    Image: nftEQ_19_9_Img,
                    Description: nft19_9.description,
                    Attribute: nft19_9.attributes,
                    RewardPerSec: Number(nftEQCard_slot9[2]) % 10000000,
                    isStaked: true
                })
            }
            let response19_slot9 = null
            try {
                response19_slot9 = data_slot9[20].status === 'success' ? await fetch(data_slot9[20].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft20_9 = response19_slot9 !== null ? await response19_slot9.json() : {image: null, name: null}
            const nftEQ_20_9_Img = nft20_9.image !== null ? nft20_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_20_9_Name = nft20_9.name
            if (response19_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQCard_slot9[3]),
                    Name: nftEQ_20_9_Name,
                    Image: nftEQ_20_9_Img,
                    Description: nft20_9.description,
                    Attribute: nft20_9.attributes,
                    RewardPerSec: Number(nftEQCard_slot9[3]) % 10000000,
                    isStaked: true
                })
            }
            let response20_slot9 = null
            try {
                response20_slot9 = data_slot9[21].status === 'success' ? await fetch(data_slot9[21].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft21_9 = response20_slot9 !== null ? await response20_slot9.json() : {image: null, name: null}
            const nftEQ_21_9_Img = nft21_9.image !== null ? nft21_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_21_9_Name = nft21_9.name
            if (response20_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQCard_slot9[4]),
                    Name: nftEQ_21_9_Name,
                    Image: nftEQ_21_9_Img,
                    Description: nft21_9.description,
                    Attribute: nft21_9.attributes,
                    RewardPerSec: Number(nftEQCard_slot9[4]) % 10000000,
                    isStaked: true
                })
            }
            let response21_slot9 = null
            try {
                response21_slot9 = data_slot9[22].status === 'success' ? await fetch(data_slot9[22].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft22_9 = response21_slot9 !== null ? await response21_slot9.json() : {image: null, name: null}
            const nftEQ_22_9_Img = nft22_9.image !== null ? nft22_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_22_9_Name = nft22_9.name
            if (response21_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQCard_slot9[5]),
                    Name: nftEQ_22_9_Name,
                    Image: nftEQ_22_9_Img,
                    Description: nft22_9.description,
                    Attribute: nft22_9.attributes,
                    RewardPerSec: Number(nftEQCard_slot9[5]) % 10000000,
                    isStaked: true
                })
            }
            let response22_slot9 = null
            try {
                response22_slot9 = data_slot9[23].status === 'success' ? await fetch(data_slot9[23].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft23_9 = response22_slot9 !== null ? await response22_slot9.json() : {image: null, name: null}
            const nftEQ_23_9_Img = nft23_9.image !== null ? nft23_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_23_9_Name = nft23_9.name
            if (response22_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQCard_slot9[6]),
                    Name: nftEQ_23_9_Name,
                    Image: nftEQ_23_9_Img,
                    Description: nft23_9.description,
                    Attribute: nft23_9.attributes,
                    RewardPerSec: Number(nftEQCard_slot9[6]) % 10000000,
                    isStaked: true
                })
            }
            let response23_slot9 = null
            try {
                response23_slot9 = data_slot9[24].status === 'success' ? await fetch(data_slot9[24].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft24_9 = response23_slot9 !== null ? await response23_slot9.json() : {image: null, name: null}
            const nftEQ_24_9_Img = nft24_9.image !== null ? nft24_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_24_9_Name = nft24_9.name
            if (response23_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQCard_slot9[7]),
                    Name: nftEQ_24_9_Name,
                    Image: nftEQ_24_9_Img,
                    Description: nft24_9.description,
                    Attribute: nft24_9.attributes,
                    RewardPerSec: Number(nftEQCard_slot9[7]) % 10000000,
                    isStaked: true
                })
            }
            let response24_slot9 = null
            try {
                response24_slot9 = data_slot9[25].status === 'success' ? await fetch(data_slot9[25].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft25_9 = response24_slot9 !== null ? await response24_slot9.json() : {image: null, name: null}
            const nftEQ_25_9_Img = nft25_9.image !== null ? nft25_9.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_25_9_Name = nft25_9.name
            if (response24_slot9 !== null) {
                nfts.push({
                    Slot: 9,
                    Id: Number(nftEQCard_slot9[8]),
                    Name: nftEQ_25_9_Name,
                    Image: nftEQ_25_9_Img,
                    Description: nft25_9.description,
                    Attribute: nft25_9.attributes,
                    RewardPerSec: Number(nftEQCard_slot9[8]) % 10000000,
                    isStaked: true
                })
            }
            const allPow9 = Number(nftStatus_slot9[0])
            const isStaked9 = nftStatus_slot9[2]
            const refuelAt9 = Number(nftStatus_slot9[1])
            const rewardPending9 = isStaked9 ? data_slot9[0].result : 0
            
            const nftEQ1_slot10 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip',
                args: [address, 9],
            }) : [0, 0, 0, 0, 0, 0, 0]
            const nftEQ2_slot10 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquip2',
                args: [address, 9],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftEQCard_slot10 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftEquipCard',
                args: [address, 9],
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
            const nftStatus_slot10 = address !== null && address !== undefined ? await readContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'nftStatus',
                args: [address, 9],
            }) : [0, 0, false]
            const data_slot10 = await readContracts({
                contracts: [
                    {
                        address: dunGEM,
                        abi: dunGEMABI,
                        functionName: 'calculateRewards',
                        args: [address, 9],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot10[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot10[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot10[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot10[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot10[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot10[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ1_slot10[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot10[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot10[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot10[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot10[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot10[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot10[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot10[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot10[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ2_slot10[8])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot10[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot10[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot10[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot10[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot10[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot10[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot10[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot10[7])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQCard_slot10[8])],
                    },
                ],
            })
            console.log(data_slot10)
            let response0_slot10 = null
            try {
                response0_slot10 = data_slot10[1].status === 'success' ? await fetch(data_slot10[1].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft1_10 = response0_slot10 !== null ? await response0_slot10.json() : {image: null, name: null}
            const nftEQ_1_10_Img = nft1_10.image !== null ? nft1_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_1_10_Name = nft1_10.name
            if (response0_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ1_slot10[0]),
                    Name: nftEQ_1_10_Name,
                    Image: nftEQ_1_10_Img,
                    Description: nft1_10.description,
                    Attribute: nft1_10.attributes,
                    RewardPerSec: Number(nftEQ1_slot10[0]) % 10000000,
                    isStaked: true
                })
            }
            let response1_slot10 = null
            try {
                response1_slot10 = data_slot10[2].status === 'success' ? await fetch(data_slot10[2].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft2_10 = response1_slot10 !== null ? await response1_slot10.json() : {image: null, name: null}
            const nftEQ_2_10_Img = nft2_10.image !== null ? nft2_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_2_10_Name = nft2_10.name
            if (response1_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ1_slot10[1]),
                    Name: nftEQ_2_10_Name,
                    Image: nftEQ_2_10_Img,
                    Description: nft2_10.description,
                    Attribute: nft2_10.attributes,
                    RewardPerSec: Number(nftEQ1_slot10[1]) % 10000000,
                    isStaked: true
                })
            }
            let response2_slot10 = null
            try {
                response2_slot10 = data_slot10[3].status === 'success' ? await fetch(data_slot10[3].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft3_10 = response2_slot10 !== null ? await response2_slot10.json() : {image: null, name: null}
            const nftEQ_3_10_Img = nft3_10.image !== null ? nft3_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_3_10_Name = nft3_10.name
            if (response2_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ1_slot10[2]),
                    Name: nftEQ_3_10_Name,
                    Image: nftEQ_3_10_Img,
                    Description: nft3_10.description,
                    Attribute: nft3_10.attributes,
                    RewardPerSec: Number(nftEQ1_slot10[2]) % 10000000,
                    isStaked: true
                })
            }
            let response3_slot10 = null
            try {
                response3_slot10 = data_slot10[4].status === 'success' ? await fetch(data_slot10[4].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft4_10 = response3_slot10 !== null ? await response3_slot10.json() : {image: null, name: null}
            const nftEQ_4_10_Img = nft4_10.image !== null ? nft4_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_4_10_Name = nft4_10.name
            if (response3_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ1_slot10[3]),
                    Name: nftEQ_4_10_Name,
                    Image: nftEQ_4_10_Img,
                    Description: nft4_10.description,
                    Attribute: nft4_10.attributes,
                    RewardPerSec: Number(nftEQ1_slot10[3]) % 10000000,
                    isStaked: true
                })
            }
            let response4_slot10 = null
            try {
                response4_slot10 = data_slot10[5].status === 'success' ? await fetch(data_slot10[5].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft5_10 = response4_slot10 !== null ? await response4_slot10.json() : {image: null, name: null}
            const nftEQ_5_10_Img = nft5_10.image !== null ? nft5_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_5_10_Name = nft5_10.name
            if (response4_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ1_slot10[4]),
                    Name: nftEQ_5_10_Name,
                    Image: nftEQ_5_10_Img,
                    Description: nft5_10.description,
                    Attribute: nft5_10.attributes,
                    RewardPerSec: Number(nftEQ1_slot10[4]) % 10000000,
                    isStaked: true
                })
            }
            let response5_slot10 = null
            try {
                response5_slot10 = data_slot10[6].status === 'success' ? await fetch(data_slot10[6].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft6_10 = response5_slot10 !== null ? await response5_slot10.json() : {image: null, name: null}
            const nftEQ_6_10_Img = nft6_10.image !== null ? nft6_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_6_10_Name = nft6_10.name
            if (response5_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ1_slot10[5]),
                    Name: nftEQ_6_10_Name,
                    Image: nftEQ_6_10_Img,
                    Description: nft6_10.description,
                    Attribute: nft6_10.attributes,
                    RewardPerSec: Number(nftEQ1_slot10[5]) % 10000000,
                    isStaked: true
                })
            }
            let response6_slot10 = null
            try {
                response6_slot10 = data_slot10[7].status === 'success' ? await fetch(data_slot10[7].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft7_10 = response6_slot10 !== null ? await response6_slot10.json() : {image: null, name: null}
            const nftEQ_7_10_Img = nft7_10.image !== null ? nft7_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_7_10_Name = nft7_10.name
            if (response6_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ1_slot10[6]),
                    Name: nftEQ_7_10_Name,
                    Image: nftEQ_7_10_Img,
                    Description: nft7_10.description,
                    Attribute: nft7_10.attributes,
                    RewardPerSec: Number(nftEQ1_slot10[6]) % 10000000,
                    isStaked: true
                })
            }
            let response7_slot10 = null
            try {
                response7_slot10 = data_slot10[8].status === 'success' ? await fetch(data_slot10[8].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft8_10 = response7_slot10 !== null ? await response7_slot10.json() : {image: null, name: null}
            const nftEQ_8_10_Img = nft8_10.image !== null ? nft8_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_8_10_Name = nft8_10.name
            if (response7_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ2_slot10[0]),
                    Name: nftEQ_8_10_Name,
                    Image: nftEQ_8_10_Img,
                    Description: nft8_10.description,
                    Attribute: nft8_10.attributes,
                    RewardPerSec: Number(nftEQ2_slot10[0]) % 10000000,
                    isStaked: true
                })
            }
            let response8_slot10 = null
            try {
                response8_slot10 = data_slot10[9].status === 'success' ? await fetch(data_slot10[9].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft9_10 = response8_slot10 !== null ? await response8_slot10.json() : {image: null, name: null}
            const nftEQ_9_10_Img = nft9_10.image !== null ? nft9_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_9_10_Name = nft9_10.name
            if (response8_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ2_slot10[1]),
                    Name: nftEQ_9_10_Name,
                    Image: nftEQ_9_10_Img,
                    Description: nft9_10.description,
                    Attribute: nft9_10.attributes,
                    RewardPerSec: Number(nftEQ2_slot10[1]) % 10000000,
                    isStaked: true
                })
            }
            let response9_slot10 = null
            try {
                response9_slot10 = data_slot10[10].status === 'success' ? await fetch(data_slot10[10].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft10_10 = response9_slot10 !== null ? await response9_slot10.json() : {image: null, name: null}
            const nftEQ_10_10_Img = nft10_10.image !== null ? nft10_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_10_10_Name = nft10_10.name
            if (response9_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ2_slot10[2]),
                    Name: nftEQ_10_10_Name,
                    Image: nftEQ_10_10_Img,
                    Description: nft10_10.description,
                    Attribute: nft10_10.attributes,
                    RewardPerSec: Number(nftEQ2_slot10[2]) % 10000000,
                    isStaked: true
                })
            }
            let response10_slot10 = null
            try {
                response10_slot10 = data_slot10[11].status === 'success' ? await fetch(data_slot10[11].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft11_10 = response10_slot10 !== null ? await response10_slot10.json() : {image: null, name: null}
            const nftEQ_11_10_Img = nft11_10.image !== null ? nft11_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_11_10_Name = nft11_10.name
            if (response10_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ2_slot10[3]),
                    Name: nftEQ_11_10_Name,
                    Image: nftEQ_11_10_Img,
                    Description: nft11_10.description,
                    Attribute: nft11_10.attributes,
                    RewardPerSec: Number(nftEQ2_slot10[3]) % 10000000,
                    isStaked: true
                })
            }
            let response11_slot10 = null
            try {
                response11_slot10 = data_slot10[12].status === 'success' ? await fetch(data_slot10[12].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft12_10 = response11_slot10 !== null ? await response11_slot10.json() : {image: null, name: null}
            const nftEQ_12_10_Img = nft12_10.image !== null ? nft12_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_12_10_Name = nft12_9.name
            if (response11_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ2_slot10[4]),
                    Name: nftEQ_12_10_Name,
                    Image: nftEQ_12_10_Img,
                    Description: nft12_10.description,
                    Attribute: nft12_10.attributes,
                    RewardPerSec: Number(nftEQ2_slot10[4]) % 10000000,
                    isStaked: true
                })
            }
            let response12_slot10 = null
            try {
                response12_slot10 = data_slot10[13].status === 'success' ? await fetch(data_slot10[13].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft13_10 = response12_slot10 !== null ? await response12_slot10.json() : {image: null, name: null}
            const nftEQ_13_10_Img = nft13_10.image !== null ? nft13_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_13_10_Name = nft13_10.name
            if (response12_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ2_slot10[5]),
                    Name: nftEQ_13_10_Name,
                    Image: nftEQ_13_10_Img,
                    Description: nft13_10.description,
                    Attribute: nft13_10.attributes,
                    RewardPerSec: Number(nftEQ2_slot10[5]) % 10000000,
                    isStaked: true
                })
            }
            let response13_slot10 = null
            try {
                response13_slot10 = data_slot10[14].status === 'success' ? await fetch(data_slot10[14].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft14_10 = response13_slot10 !== null ? await response13_slot10.json() : {image: null, name: null}
            const nftEQ_14_10_Img = nft14_10.image !== null ? nft14_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_14_10_Name = nft14_10.name
            if (response13_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ2_slot10[6]),
                    Name: nftEQ_14_10_Name,
                    Image: nftEQ_14_10_Img,
                    Description: nft14_10.description,
                    Attribute: nft14_10.attributes,
                    RewardPerSec: Number(nftEQ2_slot10[6]) % 10000000,
                    isStaked: true
                })
            }
            let response14_slot10 = null
            try {
                response14_slot10 = data_slot10[15].status === 'success' ? await fetch(data_slot10[15].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft15_10 = response14_slot10 !== null ? await response14_slot10.json() : {image: null, name: null}
            const nftEQ_15_10_Img = nft15_10.image !== null ? nft15_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_15_10_Name = nft15_10.name
            if (response14_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ2_slot10[7]),
                    Name: nftEQ_15_10_Name,
                    Image: nftEQ_15_10_Img,
                    Description: nft15_10.description,
                    Attribute: nft15_10.attributes,
                    RewardPerSec: Number(nftEQ2_slot10[7]) % 10000000,
                    isStaked: true
                })
            }
            let response15_slot10 = null
            try {
                response15_slot10 = data_slot10[16].status === 'success' ? await fetch(data_slot10[16].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft16_10 = response15_slot10 !== null ? await response15_slot10.json() : {image: null, name: null}
            const nftEQ_16_10_Img = nft16_10.image !== null ? nft16_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_16_10_Name = nft16_10.name
            if (response15_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQ2_slot10[8]),
                    Name: nftEQ_16_10_Name,
                    Image: nftEQ_16_10_Img,
                    Description: nft16_10.description,
                    Attribute: nft16_10.attributes,
                    RewardPerSec: Number(nftEQ2_slot10[8]) % 10000000,
                    isStaked: true
                })
            }
            let response16_slot10 = null
            try {
                response16_slot10 = data_slot10[17].status === 'success' ? await fetch(data_slot10[17].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft17_10 = response16_slot10 !== null ? await response16_slot10.json() : {image: null, name: null}
            const nftEQ_17_10_Img = nft17_10.image !== null ? nft17_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_17_10_Name = nft17_10.name
            if (response16_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQCard_slot10[0]),
                    Name: nftEQ_17_10_Name,
                    Image: nftEQ_17_10_Img,
                    Description: nft17_10.description,
                    Attribute: nft17_10.attributes,
                    RewardPerSec: Number(nftEQCard_slot10[0]) % 10000000,
                    isStaked: true
                })
            }
            let response17_slot10 = null
            try {
                response17_slot10 = data_slot10[18].status === 'success' ? await fetch(data_slot10[18].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft18_10 = response17_slot10 !== null ? await response17_slot10.json() : {image: null, name: null}
            const nftEQ_18_10_Img = nft18_10.image !== null ? nft18_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_18_10_Name = nft18_10.name
            if (response17_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQCard_slot10[1]),
                    Name: nftEQ_18_10_Name,
                    Image: nftEQ_18_10_Img,
                    Description: nft18_10.description,
                    Attribute: nft18_10.attributes,
                    RewardPerSec: Number(nftEQCard_slot10[1]) % 10000000,
                    isStaked: true
                })
            }
            let response18_slot10 = null
            try {
                response18_slot10 = data_slot10[19].status === 'success' ? await fetch(data_slot10[19].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft19_10 = response18_slot10 !== null ? await response18_slot10.json() : {image: null, name: null}
            const nftEQ_19_10_Img = nft19_10.image !== null ? nft19_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_19_10_Name = nft19_10.name
            if (response18_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQCard_slot10[2]),
                    Name: nftEQ_19_10_Name,
                    Image: nftEQ_19_10_Img,
                    Description: nft19_10.description,
                    Attribute: nft19_10.attributes,
                    RewardPerSec: Number(nftEQCard_slot10[2]) % 10000000,
                    isStaked: true
                })
            }
            let response19_slot10 = null
            try {
                response19_slot10 = data_slot10[20].status === 'success' ? await fetch(data_slot10[20].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft20_10 = response19_slot10 !== null ? await response19_slot10.json() : {image: null, name: null}
            const nftEQ_20_10_Img = nft20_10.image !== null ? nft20_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_20_10_Name = nft20_10.name
            if (response19_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQCard_slot10[3]),
                    Name: nftEQ_20_10_Name,
                    Image: nftEQ_20_10_Img,
                    Description: nft20_10.description,
                    Attribute: nft20_10.attributes,
                    RewardPerSec: Number(nftEQCard_slot10[3]) % 10000000,
                    isStaked: true
                })
            }
            let response20_slot10 = null
            try {
                response20_slot10 = data_slot10[21].status === 'success' ? await fetch(data_slot10[21].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft21_10 = response20_slot10 !== null ? await response20_slot10.json() : {image: null, name: null}
            const nftEQ_21_10_Img = nft21_10.image !== null ? nft21_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_21_10_Name = nft21_10.name
            if (response20_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQCard_slot10[4]),
                    Name: nftEQ_21_10_Name,
                    Image: nftEQ_21_10_Img,
                    Description: nft21_10.description,
                    Attribute: nft21_10.attributes,
                    RewardPerSec: Number(nftEQCard_slot10[4]) % 10000000,
                    isStaked: true
                })
            }
            let response21_slot10 = null
            try {
                response21_slot10 = data_slot10[22].status === 'success' ? await fetch(data_slot10[22].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft22_10 = response21_slot10 !== null ? await response21_slot10.json() : {image: null, name: null}
            const nftEQ_22_10_Img = nft22_10.image !== null ? nft22_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_22_10_Name = nft22_10.name
            if (response21_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQCard_slot10[5]),
                    Name: nftEQ_22_10_Name,
                    Image: nftEQ_22_10_Img,
                    Description: nft22_10.description,
                    Attribute: nft22_10.attributes,
                    RewardPerSec: Number(nftEQCard_slot10[5]) % 10000000,
                    isStaked: true
                })
            }
            let response22_slot10 = null
            try {
                response22_slot10 = data_slot10[23].status === 'success' ? await fetch(data_slot10[23].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft23_10 = response22_slot10 !== null ? await response22_slot10.json() : {image: null, name: null}
            const nftEQ_23_10_Img = nft23_10.image !== null ? nft23_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_23_10_Name = nft23_10.name
            if (response22_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQCard_slot10[6]),
                    Name: nftEQ_23_10_Name,
                    Image: nftEQ_23_10_Img,
                    Description: nft23_10.description,
                    Attribute: nft23_10.attributes,
                    RewardPerSec: Number(nftEQCard_slot10[6]) % 10000000,
                    isStaked: true
                })
            }
            let response23_slot10 = null
            try {
                response23_slot10 = data_slot10[24].status === 'success' ? await fetch(data_slot10[24].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft24_10 = response23_slot10 !== null ? await response23_slot10.json() : {image: null, name: null}
            const nftEQ_24_10_Img = nft24_10.image !== null ? nft24_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_24_10_Name = nft24_10.name
            if (response23_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQCard_slot10[7]),
                    Name: nftEQ_24_10_Name,
                    Image: nftEQ_24_10_Img,
                    Description: nft24_10.description,
                    Attribute: nft24_10.attributes,
                    RewardPerSec: Number(nftEQCard_slot10[7]) % 10000000,
                    isStaked: true
                })
            }
            let response24_slot10 = null
            try {
                response24_slot10 = data_slot10[25].status === 'success' ? await fetch(data_slot10[25].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft25_10 = response24_slot10 !== null ? await response24_slot10.json() : {image: null, name: null}
            const nftEQ_25_10_Img = nft25_10.image !== null ? nft25_10.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_25_10_Name = nft25_10.name
            if (response24_slot10 !== null) {
                nfts.push({
                    Slot: 10,
                    Id: Number(nftEQCard_slot10[8]),
                    Name: nftEQ_25_10_Name,
                    Image: nftEQ_25_10_Img,
                    Description: nft25_10.description,
                    Attribute: nft25_10.attributes,
                    RewardPerSec: Number(nftEQCard_slot10[8]) % 10000000,
                    isStaked: true
                })
            }
            const allPow10 = Number(nftStatus_slot10[0])
            const isStaked10 = nftStatus_slot10[2]
            const refuelAt10 = Number(nftStatus_slot10[1])
            const rewardPending10 = isStaked9 ? data_slot10[0].result : 0

            const walletFilter = await hrmnftSC.filters.Transfer(null, address, null)
            const walletEvent = await hrmnftSC.queryFilter(walletFilter, 4664954, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: hrmNft,
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
                        address: hrmNft,
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
                    const response = await fetch(nftipfs.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"))
                    nft = await response.json()
                } catch {}

                nfts.push({
                    Slot: 0,
                    Id: yournftwallet[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet[i].Id.slice(-5)),
                    isStaked: false
                })
            }

            if (nfts.length === 0) { nfts.push(null) }
            
            return [
                nfts, engyBal, gemBal,
                nftEQ_1_Img, nftEQ_1_Name, nftEQ_2_Img, nftEQ_2_Name, nftEQ_3_Img, nftEQ_3_Name, nftEQ_4_Img, nftEQ_4_Name, nftEQ_5_Img, nftEQ_5_Name, nftEQ_6_Img, nftEQ_6_Name, nftEQ_7_Img, nftEQ_7_Name, 
                nftEQ_8_Img, nftEQ_8_Name, nftEQ_9_Img, nftEQ_9_Name, nftEQ_10_Img, nftEQ_10_Name, nftEQ_11_Img, nftEQ_11_Name, nftEQ_12_Img, nftEQ_12_Name, nftEQ_13_Img, nftEQ_13_Name, nftEQ_14_Img, nftEQ_14_Name, nftEQ_15_Img, nftEQ_15_Name, nftEQ_16_Img, nftEQ_16_Name,
                nftEQ_17_Img, nftEQ_17_Name, nftEQ_18_Img, nftEQ_18_Name, nftEQ_19_Img, nftEQ_19_Name, nftEQ_20_Img, nftEQ_20_Name, nftEQ_21_Img, nftEQ_21_Name, nftEQ_22_Img, nftEQ_22_Name, nftEQ_23_Img, nftEQ_23_Name, nftEQ_24_Img, nftEQ_24_Name, nftEQ_25_Img, nftEQ_25_Name,
                allPow, isStaked, refuelAt, rewardPending,  
                nftEQ_1_2_Img, nftEQ_1_2_Name, nftEQ_2_2_Img, nftEQ_2_2_Name, nftEQ_3_2_Img, nftEQ_3_2_Name, nftEQ_4_2_Img, nftEQ_4_2_Name, nftEQ_5_2_Img, nftEQ_5_2_Name, nftEQ_6_2_Img, nftEQ_6_2_Name, nftEQ_7_2_Img, nftEQ_7_2_Name, 
                nftEQ_8_2_Img, nftEQ_8_2_Name, nftEQ_9_2_Img, nftEQ_9_2_Name, nftEQ_10_2_Img, nftEQ_10_2_Name, nftEQ_11_2_Img, nftEQ_11_2_Name, nftEQ_12_2_Img, nftEQ_12_2_Name, nftEQ_13_2_Img, nftEQ_13_2_Name, nftEQ_14_2_Img, nftEQ_14_2_Name, nftEQ_15_2_Img, nftEQ_15_2_Name, nftEQ_16_2_Img, nftEQ_16_2_Name,
                nftEQ_17_2_Img, nftEQ_17_2_Name, nftEQ_18_2_Img, nftEQ_18_2_Name, nftEQ_19_2_Img, nftEQ_19_2_Name, nftEQ_20_2_Img, nftEQ_20_2_Name, nftEQ_21_2_Img, nftEQ_21_2_Name, nftEQ_22_2_Img, nftEQ_22_2_Name, nftEQ_23_2_Img, nftEQ_23_2_Name, nftEQ_24_2_Img, nftEQ_24_2_Name, nftEQ_25_2_Img, nftEQ_25_2_Name,
                allPow2, isStaked2, refuelAt2, rewardPending2,  
                nftEQ_1_3_Img, nftEQ_1_3_Name, nftEQ_2_3_Img, nftEQ_2_3_Name, nftEQ_3_3_Img, nftEQ_3_3_Name, nftEQ_4_3_Img, nftEQ_4_3_Name, nftEQ_5_3_Img, nftEQ_5_3_Name, nftEQ_6_3_Img, nftEQ_6_3_Name, nftEQ_7_3_Img, nftEQ_7_3_Name, 
                nftEQ_8_3_Img, nftEQ_8_3_Name, nftEQ_9_3_Img, nftEQ_9_3_Name, nftEQ_10_3_Img, nftEQ_10_3_Name, nftEQ_11_3_Img, nftEQ_11_3_Name, nftEQ_12_3_Img, nftEQ_12_3_Name, nftEQ_13_3_Img, nftEQ_13_3_Name, nftEQ_14_3_Img, nftEQ_14_3_Name, nftEQ_15_3_Img, nftEQ_15_3_Name, nftEQ_16_3_Img, nftEQ_16_3_Name,
                nftEQ_17_3_Img, nftEQ_17_3_Name, nftEQ_18_3_Img, nftEQ_18_3_Name, nftEQ_19_3_Img, nftEQ_19_3_Name, nftEQ_20_3_Img, nftEQ_20_3_Name, nftEQ_21_3_Img, nftEQ_21_3_Name, nftEQ_22_3_Img, nftEQ_22_3_Name, nftEQ_23_3_Img, nftEQ_23_3_Name, nftEQ_24_3_Img, nftEQ_24_3_Name, nftEQ_25_3_Img, nftEQ_25_3_Name,
                allPow3, isStaked3, refuelAt3, rewardPending3,  
                nftEQ_1_4_Img, nftEQ_1_4_Name, nftEQ_2_4_Img, nftEQ_2_4_Name, nftEQ_3_4_Img, nftEQ_3_4_Name, nftEQ_4_4_Img, nftEQ_4_4_Name, nftEQ_5_4_Img, nftEQ_5_4_Name, nftEQ_6_4_Img, nftEQ_6_4_Name, nftEQ_7_4_Img, nftEQ_7_4_Name, 
                nftEQ_8_4_Img, nftEQ_8_4_Name, nftEQ_9_4_Img, nftEQ_9_4_Name, nftEQ_10_4_Img, nftEQ_10_4_Name, nftEQ_11_4_Img, nftEQ_11_4_Name, nftEQ_12_4_Img, nftEQ_12_4_Name, nftEQ_13_4_Img, nftEQ_13_4_Name, nftEQ_14_4_Img, nftEQ_14_4_Name, nftEQ_15_4_Img, nftEQ_15_4_Name, nftEQ_16_4_Img, nftEQ_16_4_Name,
                nftEQ_17_4_Img, nftEQ_17_4_Name, nftEQ_18_4_Img, nftEQ_18_4_Name, nftEQ_19_4_Img, nftEQ_19_4_Name, nftEQ_20_4_Img, nftEQ_20_4_Name, nftEQ_21_4_Img, nftEQ_21_4_Name, nftEQ_22_4_Img, nftEQ_22_4_Name, nftEQ_23_4_Img, nftEQ_23_4_Name, nftEQ_24_4_Img, nftEQ_24_4_Name, nftEQ_25_4_Img, nftEQ_25_4_Name,
                allPow4, isStaked4, refuelAt4, rewardPending4,  
                nftEQ_1_5_Img, nftEQ_1_5_Name, nftEQ_2_5_Img, nftEQ_2_5_Name, nftEQ_3_5_Img, nftEQ_3_5_Name, nftEQ_4_5_Img, nftEQ_4_5_Name, nftEQ_5_5_Img, nftEQ_5_5_Name, nftEQ_6_5_Img, nftEQ_6_5_Name, nftEQ_7_5_Img, nftEQ_7_5_Name, 
                nftEQ_8_5_Img, nftEQ_8_5_Name, nftEQ_9_5_Img, nftEQ_9_5_Name, nftEQ_10_5_Img, nftEQ_10_5_Name, nftEQ_11_5_Img, nftEQ_11_5_Name, nftEQ_12_5_Img, nftEQ_12_5_Name, nftEQ_13_5_Img, nftEQ_13_5_Name, nftEQ_14_5_Img, nftEQ_14_5_Name, nftEQ_15_5_Img, nftEQ_15_5_Name, nftEQ_16_5_Img, nftEQ_16_5_Name,
                nftEQ_17_5_Img, nftEQ_17_5_Name, nftEQ_18_5_Img, nftEQ_18_5_Name, nftEQ_19_5_Img, nftEQ_19_5_Name, nftEQ_20_5_Img, nftEQ_20_5_Name, nftEQ_21_5_Img, nftEQ_21_5_Name, nftEQ_22_5_Img, nftEQ_22_5_Name, nftEQ_23_5_Img, nftEQ_23_5_Name, nftEQ_24_5_Img, nftEQ_24_5_Name, nftEQ_25_5_Img, nftEQ_25_5_Name,
                allPow5, isStaked5, refuelAt5, rewardPending5,  
                nftEQ_1_6_Img, nftEQ_1_6_Name, nftEQ_2_6_Img, nftEQ_2_6_Name, nftEQ_3_6_Img, nftEQ_3_6_Name, nftEQ_4_6_Img, nftEQ_4_6_Name, nftEQ_5_6_Img, nftEQ_5_6_Name, nftEQ_6_6_Img, nftEQ_6_6_Name, nftEQ_7_6_Img, nftEQ_7_6_Name, 
                nftEQ_8_6_Img, nftEQ_8_6_Name, nftEQ_9_6_Img, nftEQ_9_6_Name, nftEQ_10_6_Img, nftEQ_10_6_Name, nftEQ_11_6_Img, nftEQ_11_6_Name, nftEQ_12_6_Img, nftEQ_12_6_Name, nftEQ_13_6_Img, nftEQ_13_6_Name, nftEQ_14_6_Img, nftEQ_14_6_Name, nftEQ_15_6_Img, nftEQ_15_6_Name, nftEQ_16_6_Img, nftEQ_16_6_Name,
                nftEQ_17_6_Img, nftEQ_17_6_Name, nftEQ_18_6_Img, nftEQ_18_6_Name, nftEQ_19_6_Img, nftEQ_19_6_Name, nftEQ_20_6_Img, nftEQ_20_6_Name, nftEQ_21_6_Img, nftEQ_21_6_Name, nftEQ_22_6_Img, nftEQ_22_6_Name, nftEQ_23_6_Img, nftEQ_23_6_Name, nftEQ_24_6_Img, nftEQ_24_6_Name, nftEQ_25_6_Img, nftEQ_25_6_Name,
                allPow6, isStaked6, refuelAt6, rewardPending6,  
                nftEQ_1_7_Img, nftEQ_1_7_Name, nftEQ_2_7_Img, nftEQ_2_7_Name, nftEQ_3_7_Img, nftEQ_3_7_Name, nftEQ_4_7_Img, nftEQ_4_7_Name, nftEQ_5_7_Img, nftEQ_5_7_Name, nftEQ_6_7_Img, nftEQ_6_7_Name, nftEQ_7_7_Img, nftEQ_7_7_Name, 
                nftEQ_8_7_Img, nftEQ_8_7_Name, nftEQ_9_7_Img, nftEQ_9_7_Name, nftEQ_10_7_Img, nftEQ_10_7_Name, nftEQ_11_7_Img, nftEQ_11_7_Name, nftEQ_12_7_Img, nftEQ_12_7_Name, nftEQ_13_7_Img, nftEQ_13_7_Name, nftEQ_14_7_Img, nftEQ_14_7_Name, nftEQ_15_7_Img, nftEQ_15_7_Name, nftEQ_16_7_Img, nftEQ_16_7_Name,
                nftEQ_17_7_Img, nftEQ_17_7_Name, nftEQ_18_7_Img, nftEQ_18_7_Name, nftEQ_19_7_Img, nftEQ_19_7_Name, nftEQ_20_7_Img, nftEQ_20_7_Name, nftEQ_21_7_Img, nftEQ_21_7_Name, nftEQ_22_7_Img, nftEQ_22_7_Name, nftEQ_23_7_Img, nftEQ_23_7_Name, nftEQ_24_7_Img, nftEQ_24_7_Name, nftEQ_25_7_Img, nftEQ_25_7_Name,
                allPow7, isStaked7, refuelAt7, rewardPending7,  
                nftEQ_1_8_Img, nftEQ_1_8_Name, nftEQ_2_8_Img, nftEQ_2_8_Name, nftEQ_3_8_Img, nftEQ_3_8_Name, nftEQ_4_8_Img, nftEQ_4_8_Name, nftEQ_5_8_Img, nftEQ_5_8_Name, nftEQ_6_8_Img, nftEQ_6_8_Name, nftEQ_7_8_Img, nftEQ_7_8_Name, 
                nftEQ_8_8_Img, nftEQ_8_8_Name, nftEQ_9_8_Img, nftEQ_9_8_Name, nftEQ_10_8_Img, nftEQ_10_8_Name, nftEQ_11_8_Img, nftEQ_11_8_Name, nftEQ_12_8_Img, nftEQ_12_8_Name, nftEQ_13_8_Img, nftEQ_13_8_Name, nftEQ_14_8_Img, nftEQ_14_8_Name, nftEQ_15_8_Img, nftEQ_15_8_Name, nftEQ_16_8_Img, nftEQ_16_8_Name,
                nftEQ_17_8_Img, nftEQ_17_8_Name, nftEQ_18_8_Img, nftEQ_18_8_Name, nftEQ_19_8_Img, nftEQ_19_8_Name, nftEQ_20_8_Img, nftEQ_20_8_Name, nftEQ_21_8_Img, nftEQ_21_8_Name, nftEQ_22_8_Img, nftEQ_22_8_Name, nftEQ_23_8_Img, nftEQ_23_8_Name, nftEQ_24_8_Img, nftEQ_24_8_Name, nftEQ_25_8_Img, nftEQ_25_8_Name,
                allPow8, isStaked8, refuelAt8, rewardPending8,  
                nftEQ_1_9_Img, nftEQ_1_9_Name, nftEQ_2_9_Img, nftEQ_2_9_Name, nftEQ_3_9_Img, nftEQ_3_9_Name, nftEQ_4_9_Img, nftEQ_4_9_Name, nftEQ_5_9_Img, nftEQ_5_9_Name, nftEQ_6_9_Img, nftEQ_6_9_Name, nftEQ_7_9_Img, nftEQ_7_9_Name, 
                nftEQ_8_9_Img, nftEQ_8_9_Name, nftEQ_9_9_Img, nftEQ_9_9_Name, nftEQ_10_9_Img, nftEQ_10_9_Name, nftEQ_11_9_Img, nftEQ_11_9_Name, nftEQ_12_9_Img, nftEQ_12_9_Name, nftEQ_13_9_Img, nftEQ_13_9_Name, nftEQ_14_9_Img, nftEQ_14_9_Name, nftEQ_15_9_Img, nftEQ_15_9_Name, nftEQ_16_9_Img, nftEQ_16_9_Name,
                nftEQ_17_9_Img, nftEQ_17_9_Name, nftEQ_18_9_Img, nftEQ_18_9_Name, nftEQ_19_9_Img, nftEQ_19_9_Name, nftEQ_20_9_Img, nftEQ_20_9_Name, nftEQ_21_9_Img, nftEQ_21_9_Name, nftEQ_22_9_Img, nftEQ_22_9_Name, nftEQ_23_9_Img, nftEQ_23_9_Name, nftEQ_24_9_Img, nftEQ_24_9_Name, nftEQ_25_9_Img, nftEQ_25_9_Name,
                allPow9, isStaked9, refuelAt9, rewardPending9,  
                nftEQ_1_10_Img, nftEQ_1_10_Name, nftEQ_2_10_Img, nftEQ_2_10_Name, nftEQ_3_10_Img, nftEQ_3_10_Name, nftEQ_4_10_Img, nftEQ_4_10_Name, nftEQ_5_10_Img, nftEQ_5_10_Name, nftEQ_6_10_Img, nftEQ_6_10_Name, nftEQ_10_10_Img, nftEQ_10_10_Name, 
                nftEQ_8_10_Img, nftEQ_8_10_Name, nftEQ_9_10_Img, nftEQ_9_10_Name, nftEQ_10_10_Img, nftEQ_10_10_Name, nftEQ_11_10_Img, nftEQ_11_10_Name, nftEQ_12_10_Img, nftEQ_12_10_Name, nftEQ_13_10_Img, nftEQ_13_10_Name, nftEQ_14_10_Img, nftEQ_14_10_Name, nftEQ_15_10_Img, nftEQ_15_10_Name, nftEQ_16_10_Img, nftEQ_16_10_Name,
                nftEQ_17_10_Img, nftEQ_17_10_Name, nftEQ_18_10_Img, nftEQ_18_10_Name, nftEQ_19_10_Img, nftEQ_19_10_Name, nftEQ_20_10_Img, nftEQ_20_10_Name, nftEQ_21_10_Img, nftEQ_21_10_Name, nftEQ_22_10_Img, nftEQ_22_10_Name, nftEQ_23_10_Img, nftEQ_23_10_Name, nftEQ_24_10_Img, nftEQ_24_10_Name, nftEQ_25_10_Img, nftEQ_25_10_Name,
                allPow10, isStaked10, refuelAt10, rewardPending10,  
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
            setEngyBalance(ethers.utils.formatEther(String(result[1])))
            setGemBalance(ethers.utils.formatEther(String(result[2])))

            setCharSlot1(result[3])
            result[4] !== null && result[4].slice(-2, -1) === "+" ? setCharSlot1Level(result[4].slice(-1)) : setCharSlot1Level(null)
            setWeaponOneSlot1(result[5])
            result[6] !== null && result[6].slice(-2, -1) === "+" ? setWeaponOneSlot1Level(result[6].slice(-1)) : setWeaponOneSlot1Level(null)
            setShieldSlot1(result[7])
            result[8] !== null && result[8].slice(-2, -1) === "+" ? setShieldSlot1Level(result[8].slice(-1)) : setShieldSlot1Level(null)
            setArmorSlot1(result[9])
            result[10] !== null && result[10].slice(-2, -1) === "+" ? setArmorSlot1Level(result[10].slice(-1)) : setArmorSlot1Level(null)
            setHeadUpperSlot1(result[11])
            result[12] !== null && result[12].slice(-2, -1) === "+" ? setHeadUpperSlot1Level(result[12].slice(-1)) : setHeadUpperSlot1Level(null)
            setHeadMiddleSlot1(result[13])
            result[14] !== null && result[14].slice(-2, -1) === "+" ? setHeadMiddleSlot1Level(result[14].slice(-1)) : setHeadMiddleSlot1Level(null)
            setHeadLowerSlot1(result[15])
            result[16] !== null && result[16].slice(-2, -1) === "+" ? setHeadLowerSlot1Level(result[16].slice(-1)) : setHeadLowerSlot1Level(null)
            setGarmentSlot1(result[17])
            result[18] !== null && result[18].slice(-2, -1) === "+" ? setGarmentSlot1Level(result[18].slice(-1)) : setGarmentSlot1Level(null)
            setFootgearSlot1(result[19])
            result[20] !== null && result[20].slice(-2, -1) === "+" ? setFootgearSlot1Level(result[20].slice(-1)) : setFootgearSlot1Level(null)
            setAccessorySlot1(result[21])
            result[22] !== null && result[22].slice(-2, -1) === "+" ? setAccessorySlot1Level(result[22].slice(-1)) : setAccessorySlot1Level(null)
            setTalismanOneSlot1(result[23])
            result[24] !== null && result[24].slice(-2, -1) === "+" ? setTalismanOneSlot1Level(result[24].slice(-1)) : setTalismanOneSlot1Level(null)
            setTalismanTwoSlot1(result[25])
            result[26] !== null && result[26].slice(-2, -1) === "+" ? setTalismanTwoSlot1Level(result[26].slice(-1)) : setTalismanTwoSlot1Level(null)
            setWingSlot1(result[27])
            result[28] !== null && result[28].slice(-2, -1) === "+" ? setWingSlot1Level(result[28].slice(-1)) : setWingSlot1Level(null)
            setDaemonSlot1(result[29])
            result[30] !== null && result[30].slice(-2, -1) === "+" ? setDaemonSlot1Level(result[30].slice(-1)) : setDaemonSlot1Level(null)
            setJewelSlot1(result[31])
            result[32] !== null && result[32].slice(-2, -1) === "+" ? setJewelSlot1Level(result[32].slice(-1)) : setJewelSlot1Level(null)
            setWeaponTwoSlot1(result[33])
            result[34] !== null && result[34].slice(-2, -1) === "+" ? setWeaponTwoSlot1Level(result[34].slice(-1)) : setWeaponTwoSlot1Level(null)
            setCardWeaponSlot1(result[35])
            result[36] !== null && result[36].slice(-2, -1) === "+" ? setCardWeaponSlot1Level(result[36].slice(-1)) : setCardWeaponSlot1Level(null)
            setCardShieldSlot1(result[37])
            result[38] !== null && result[38].slice(-2, -1) === "+" ? setCardShieldSlot1Level(result[38].slice(-1)) : setCardShieldSlot1Level(null)
            setCardArmorSlot1(result[39])
            result[40] !== null && result[40].slice(-2, -1) === "+" ? setCardArmorSlot1Level(result[40].slice(-1)) : setCardArmorSlot1Level(null)
            setCardHeadUpperSlot1(result[41])
            result[42] !== null && result[42].slice(-2, -1) === "+" ? setCardHeadUpperSlot1Level(result[42].slice(-1)) : setCardHeadUpperSlot1Level(null)
            setCardHeadMiddleSlot1(result[43])
            result[44] !== null && result[44].slice(-2, -1) === "+" ? setCardHeadMiddleSlot1Level(result[44].slice(-1)) : setCardHeadMiddleSlot1Level(null)
            setCardHeadLowerSlot1(result[45])
            result[46] !== null && result[46].slice(-2, -1) === "+" ? setCardHeadLowerSlot1Level(result[46].slice(-1)) : setCardHeadLowerSlot1Level(null)
            setCardGarmentSlot1(result[47])
            result[48] !== null && result[48].slice(-2, -1) === "+" ? setCardGarmentSlot1Level(result[48].slice(-1)) : setCardGarmentSlot1Level(null)
            setCardFootgearSlot1(result[49])
            result[50] !== null && result[50].slice(-2, -1) === "+" ? setCardFootgearSlot1Level(result[50].slice(-1)) : setCardFootgearSlot1Level(null)
            setCardAccessorySlot1(result[51])
            result[52] !== null && result[52].slice(-2, -1) === "+" ? setCardAccessorySlot1Level(result[52].slice(-1)) : setCardAccessorySlot1Level(null)
            setAllPowerSlot1(result[53])
            setIsStakeNowSlot1(result[54])
            const gasOut = new Date((Number(result[55]) * 1000) + (86400 * 1000))
            result[55] !== 0 ? setTimeToRunoutSlot1(gasOut.toLocaleString('es-CL')) : setTimeToRunoutSlot1(null)
            result[55] !== 0 && Date.now() - (Number(result[55]) * 1000) > (86400 * 1000) ? setIsRunoutSlot1(true) : setIsRunoutSlot1(false)
            setGemPendingSlot1(ethers.utils.formatEther(String(result[56])))

            setCharSlot2(result[57])
            result[58] !== null && result[58].slice(-2, -1) === "+" ? setCharSlot2Level(result[58].slice(-1)) : setCharSlot2Level(null)
            setWeaponOneSlot2(result[59])
            result[60] !== null && result[60].slice(-2, -1) === "+" ? setWeaponOneSlot2Level(result[60].slice(-1)) : setWeaponOneSlot2Level(null)
            setShieldSlot2(result[61])
            result[62] !== null && result[62].slice(-2, -1) === "+" ? setShieldSlot2Level(result[62].slice(-1)) : setShieldSlot2Level(null)
            setArmorSlot2(result[63])
            result[64] !== null && result[64].slice(-2, -1) === "+" ? setArmorSlot2Level(result[64].slice(-1)) : setArmorSlot2Level(null)
            setHeadUpperSlot2(result[65])
            result[66] !== null && result[66].slice(-2, -1) === "+" ? setHeadUpperSlot2Level(result[66].slice(-1)) : setHeadUpperSlot2Level(null)
            setHeadMiddleSlot2(result[67])
            result[68] !== null && result[68].slice(-2, -1) === "+" ? setHeadMiddleSlot2Level(result[68].slice(-1)) : setHeadMiddleSlot2Level(null)
            setHeadLowerSlot2(result[69])
            result[70] !== null && result[70].slice(-2, -1) === "+" ? setHeadLowerSlot2Level(result[70].slice(-1)) : setHeadLowerSlot2Level(null)
            setGarmentSlot2(result[71])
            result[72] !== null && result[72].slice(-2, -1) === "+" ? setGarmentSlot2Level(result[72].slice(-1)) : setGarmentSlot2Level(null)
            setFootgearSlot2(result[73])
            result[74] !== null && result[74].slice(-2, -1) === "+" ? setFootgearSlot2Level(result[74].slice(-1)) : setFootgearSlot2Level(null)
            setAccessorySlot2(result[75])
            result[76] !== null && result[76].slice(-2, -1) === "+" ? setAccessorySlot2Level(result[76].slice(-1)) : setAccessorySlot2Level(null)
            setTalismanOneSlot2(result[77])
            result[78] !== null && result[78].slice(-2, -1) === "+" ? setTalismanOneSlot2Level(result[78].slice(-1)) : setTalismanOneSlot2Level(null)
            setTalismanTwoSlot2(result[79])
            result[80] !== null && result[80].slice(-2, -1) === "+" ? setTalismanTwoSlot2Level(result[80].slice(-1)) : setTalismanTwoSlot2Level(null)
            setWingSlot2(result[81])
            result[82] !== null && result[82].slice(-2, -1) === "+" ? setWingSlot2Level(result[82].slice(-1)) : setWingSlot2Level(null)
            setDaemonSlot2(result[83])
            result[84] !== null && result[84].slice(-2, -1) === "+" ? setDaemonSlot2Level(result[84].slice(-1)) : setDaemonSlot2Level(null)
            setJewelSlot2(result[85])
            result[86] !== null && result[86].slice(-2, -1) === "+" ? setJewelSlot2Level(result[86].slice(-1)) : setJewelSlot2Level(null)
            setWeaponTwoSlot2(result[87])
            result[88] !== null && result[88].slice(-2, -1) === "+" ? setWeaponTwoSlot2Level(result[88].slice(-1)) : setWeaponTwoSlot2Level(null)
            setCardWeaponSlot2(result[89])
            result[90] !== null && result[90].slice(-2, -1) === "+" ? setCardWeaponSlot2Level(result[90].slice(-1)) : setCardWeaponSlot2Level(null)
            setCardShieldSlot2(result[91])
            result[92] !== null && result[92].slice(-2, -1) === "+" ? setCardShieldSlot2Level(result[92].slice(-1)) : setCardShieldSlot2Level(null)
            setCardArmorSlot2(result[93])
            result[94] !== null && result[94].slice(-2, -1) === "+" ? setCardArmorSlot2Level(result[94].slice(-1)) : setCardArmorSlot2Level(null)
            setCardHeadUpperSlot2(result[95])
            result[96] !== null && result[96].slice(-2, -1) === "+" ? setCardHeadUpperSlot2Level(result[96].slice(-1)) : setCardHeadUpperSlot2Level(null)
            setCardHeadMiddleSlot2(result[97])
            result[98] !== null && result[98].slice(-2, -1) === "+" ? setCardHeadMiddleSlot2Level(result[98].slice(-1)) : setCardHeadMiddleSlot2Level(null)
            setCardHeadLowerSlot2(result[99])
            result[100] !== null && result[100].slice(-2, -1) === "+" ? setCardHeadLowerSlot2Level(result[100].slice(-1)) : setCardHeadLowerSlot2Level(null)
            setCardGarmentSlot2(result[101])
            result[102] !== null && result[102].slice(-2, -1) === "+" ? setCardGarmentSlot2Level(result[102].slice(-1)) : setCardGarmentSlot2Level(null)
            setCardFootgearSlot2(result[103])
            result[104] !== null && result[104].slice(-2, -1) === "+" ? setCardFootgearSlot2Level(result[104].slice(-1)) : setCardFootgearSlot2Level(null)
            setCardAccessorySlot2(result[105])
            result[106] !== null && result[106].slice(-2, -1) === "+" ? setCardAccessorySlot2Level(result[106].slice(-1)) : setCardAccessorySlot2Level(null)
            setAllPowerSlot2(result[107])
            setIsStakeNowSlot2(result[108])
            const gasOut2 = new Date((Number(result[109]) * 1000) + (86400 * 1000))
            result[109] !== 0 ? setTimeToRunoutSlot2(gasOut2.toLocaleString('es-CL')) : setTimeToRunoutSlot2(null)
            result[109] !== 0 && Date.now() - (Number(result[109]) * 1000) > (86400 * 1000) ? setIsRunoutSlot2(true) : setIsRunoutSlot2(false)
            setGemPendingSlot2(ethers.utils.formatEther(String(result[110])))

            setCharSlot3(result[111])
            result[112] !== null && result[112].slice(-2, -1) === "+" ? setCharSlot3Level(result[112].slice(-1)) : setCharSlot3Level(null)
            setWeaponOneSlot3(result[113])
            result[114] !== null && result[114].slice(-2, -1) === "+" ? setWeaponOneSlot3Level(result[114].slice(-1)) : setWeaponOneSlot3Level(null)
            setShieldSlot3(result[115])
            result[116] !== null && result[116].slice(-2, -1) === "+" ? setShieldSlot3Level(result[116].slice(-1)) : setShieldSlot3Level(null)
            setArmorSlot3(result[117])
            result[118] !== null && result[118].slice(-2, -1) === "+" ? setArmorSlot3Level(result[118].slice(-1)) : setArmorSlot3Level(null)
            setHeadUpperSlot3(result[119])
            result[120] !== null && result[120].slice(-2, -1) === "+" ? setHeadUpperSlot3Level(result[120].slice(-1)) : setHeadUpperSlot3Level(null)
            setHeadMiddleSlot3(result[121])
            result[122] !== null && result[122].slice(-2, -1) === "+" ? setHeadMiddleSlot3Level(result[122].slice(-1)) : setHeadMiddleSlot3Level(null)
            setHeadLowerSlot3(result[123])
            result[124] !== null && result[124].slice(-2, -1) === "+" ? setHeadLowerSlot3Level(result[124].slice(-1)) : setHeadLowerSlot3Level(null)
            setGarmentSlot3(result[125])
            result[126] !== null && result[126].slice(-2, -1) === "+" ? setGarmentSlot3Level(result[126].slice(-1)) : setGarmentSlot3Level(null)
            setFootgearSlot3(result[127])
            result[128] !== null && result[128].slice(-2, -1) === "+" ? setFootgearSlot3Level(result[128].slice(-1)) : setFootgearSlot3Level(null)
            setAccessorySlot3(result[129])
            result[130] !== null && result[130].slice(-2, -1) === "+" ? setAccessorySlot3Level(result[130].slice(-1)) : setAccessorySlot3Level(null)
            setTalismanOneSlot3(result[131])
            result[132] !== null && result[132].slice(-2, -1) === "+" ? setTalismanOneSlot3Level(result[132].slice(-1)) : setTalismanOneSlot3Level(null)
            setTalismanTwoSlot3(result[133])
            result[134] !== null && result[134].slice(-2, -1) === "+" ? setTalismanTwoSlot3Level(result[134].slice(-1)) : setTalismanTwoSlot3Level(null)
            setWingSlot3(result[135])
            result[136] !== null && result[136].slice(-2, -1) === "+" ? setWingSlot3Level(result[136].slice(-1)) : setWingSlot3Level(null)
            setDaemonSlot3(result[137])
            result[138] !== null && result[138].slice(-2, -1) === "+" ? setDaemonSlot3Level(result[138].slice(-1)) : setDaemonSlot3Level(null)
            setJewelSlot3(result[139])
            result[140] !== null && result[140].slice(-2, -1) === "+" ? setJewelSlot3Level(result[140].slice(-1)) : setJewelSlot3Level(null)
            setWeaponTwoSlot3(result[141])
            result[142] !== null && result[142].slice(-2, -1) === "+" ? setWeaponTwoSlot3Level(result[142].slice(-1)) : setWeaponTwoSlot3Level(null)
            setCardWeaponSlot3(result[143])
            result[144] !== null && result[144].slice(-2, -1) === "+" ? setCardWeaponSlot3Level(result[144].slice(-1)) : setCardWeaponSlot3Level(null)
            setCardShieldSlot3(result[145])
            result[146] !== null && result[146].slice(-2, -1) === "+" ? setCardShieldSlot3Level(result[146].slice(-1)) : setCardShieldSlot3Level(null)
            setCardArmorSlot3(result[147])
            result[148] !== null && result[148].slice(-2, -1) === "+" ? setCardArmorSlot3Level(result[148].slice(-1)) : setCardArmorSlot3Level(null)
            setCardHeadUpperSlot3(result[149])
            result[150] !== null && result[150].slice(-2, -1) === "+" ? setCardHeadUpperSlot3Level(result[150].slice(-1)) : setCardHeadUpperSlot3Level(null)
            setCardHeadMiddleSlot3(result[151])
            result[152] !== null && result[152].slice(-2, -1) === "+" ? setCardHeadMiddleSlot3Level(result[152].slice(-1)) : setCardHeadMiddleSlot3Level(null)
            setCardHeadLowerSlot3(result[153])
            result[154] !== null && result[154].slice(-2, -1) === "+" ? setCardHeadLowerSlot3Level(result[154].slice(-1)) : setCardHeadLowerSlot3Level(null)
            setCardGarmentSlot3(result[155])
            result[156] !== null && result[156].slice(-2, -1) === "+" ? setCardGarmentSlot3Level(result[156].slice(-1)) : setCardGarmentSlot3Level(null)
            setCardFootgearSlot3(result[157])
            result[158] !== null && result[158].slice(-2, -1) === "+" ? setCardFootgearSlot3Level(result[158].slice(-1)) : setCardFootgearSlot3Level(null)
            setCardAccessorySlot3(result[159])
            result[160] !== null && result[160].slice(-2, -1) === "+" ? setCardAccessorySlot3Level(result[160].slice(-1)) : setCardAccessorySlot3Level(null)
            setAllPowerSlot3(result[161])
            setIsStakeNowSlot3(result[162])
            const gasOut3 = new Date((Number(result[163]) * 1000) + (86400 * 1000))
            result[163] !== 0 ? setTimeToRunoutSlot3(gasOut3.toLocaleString('es-CL')) : setTimeToRunoutSlot3(null)
            result[163] !== 0 && Date.now() - (Number(result[163]) * 1000) > (86400 * 1000) ? setIsRunoutSlot3(true) : setIsRunoutSlot3(false)
            setGemPendingSlot3(ethers.utils.formatEther(String(result[164])))

            setCharSlot4(result[165])
            result[166] !== null && result[166].slice(-2, -1) === "+" ? setCharSlot4Level(result[166].slice(-1)) : setCharSlot4Level(null)
            setWeaponOneSlot4(result[167])
            result[168] !== null && result[168].slice(-2, -1) === "+" ? setWeaponOneSlot4Level(result[168].slice(-1)) : setWeaponOneSlot4Level(null)
            setShieldSlot4(result[169])
            result[170] !== null && result[170].slice(-2, -1) === "+" ? setShieldSlot4Level(result[170].slice(-1)) : setShieldSlot4Level(null)
            setArmorSlot4(result[171])
            result[172] !== null && result[172].slice(-2, -1) === "+" ? setArmorSlot4Level(result[172].slice(-1)) : setArmorSlot4Level(null)
            setHeadUpperSlot4(result[173])
            result[174] !== null && result[174].slice(-2, -1) === "+" ? setHeadUpperSlot4Level(result[174].slice(-1)) : setHeadUpperSlot4Level(null)
            setHeadMiddleSlot4(result[175])
            result[176] !== null && result[176].slice(-2, -1) === "+" ? setHeadMiddleSlot4Level(result[176].slice(-1)) : setHeadMiddleSlot4Level(null)
            setHeadLowerSlot4(result[177])
            result[178] !== null && result[178].slice(-2, -1) === "+" ? setHeadLowerSlot4Level(result[178].slice(-1)) : setHeadLowerSlot4Level(null)
            setGarmentSlot4(result[179])
            result[180] !== null && result[180].slice(-2, -1) === "+" ? setGarmentSlot4Level(result[180].slice(-1)) : setGarmentSlot4Level(null)
            setFootgearSlot4(result[181])
            result[182] !== null && result[182].slice(-2, -1) === "+" ? setFootgearSlot4Level(result[182].slice(-1)) : setFootgearSlot4Level(null)
            setAccessorySlot4(result[183])
            result[184] !== null && result[184].slice(-2, -1) === "+" ? setAccessorySlot4Level(result[184].slice(-1)) : setAccessorySlot4Level(null)
            setTalismanOneSlot4(result[185])
            result[186] !== null && result[186].slice(-2, -1) === "+" ? setTalismanOneSlot4Level(result[186].slice(-1)) : setTalismanOneSlot4Level(null)
            setTalismanTwoSlot4(result[187])
            result[188] !== null && result[188].slice(-2, -1) === "+" ? setTalismanTwoSlot4Level(result[188].slice(-1)) : setTalismanTwoSlot4Level(null)
            setWingSlot4(result[189])
            result[190] !== null && result[190].slice(-2, -1) === "+" ? setWingSlot4Level(result[190].slice(-1)) : setWingSlot4Level(null)
            setDaemonSlot4(result[191])
            result[192] !== null && result[192].slice(-2, -1) === "+" ? setDaemonSlot4Level(result[192].slice(-1)) : setDaemonSlot4Level(null)
            setJewelSlot4(result[193])
            result[194] !== null && result[194].slice(-2, -1) === "+" ? setJewelSlot4Level(result[194].slice(-1)) : setJewelSlot4Level(null)
            setWeaponTwoSlot4(result[195])
            result[196] !== null && result[196].slice(-2, -1) === "+" ? setWeaponTwoSlot4Level(result[196].slice(-1)) : setWeaponTwoSlot4Level(null)
            setCardWeaponSlot4(result[197])
            result[198] !== null && result[198].slice(-2, -1) === "+" ? setCardWeaponSlot4Level(result[198].slice(-1)) : setCardWeaponSlot4Level(null)
            setCardShieldSlot4(result[199])
            result[200] !== null && result[200].slice(-2, -1) === "+" ? setCardShieldSlot4Level(result[200].slice(-1)) : setCardShieldSlot4Level(null)
            setCardArmorSlot4(result[201])
            result[202] !== null && result[202].slice(-2, -1) === "+" ? setCardArmorSlot4Level(result[202].slice(-1)) : setCardArmorSlot4Level(null)
            setCardHeadUpperSlot4(result[203])
            result[204] !== null && result[204].slice(-2, -1) === "+" ? setCardHeadUpperSlot4Level(result[204].slice(-1)) : setCardHeadUpperSlot4Level(null)
            setCardHeadMiddleSlot4(result[205])
            result[206] !== null && result[206].slice(-2, -1) === "+" ? setCardHeadMiddleSlot4Level(result[206].slice(-1)) : setCardHeadMiddleSlot4Level(null)
            setCardHeadLowerSlot4(result[207])
            result[208] !== null && result[208].slice(-2, -1) === "+" ? setCardHeadLowerSlot4Level(result[208].slice(-1)) : setCardHeadLowerSlot4Level(null)
            setCardGarmentSlot4(result[209])
            result[210] !== null && result[210].slice(-2, -1) === "+" ? setCardGarmentSlot4Level(result[210].slice(-1)) : setCardGarmentSlot4Level(null)
            setCardFootgearSlot4(result[211])
            result[212] !== null && result[212].slice(-2, -1) === "+" ? setCardFootgearSlot4Level(result[212].slice(-1)) : setCardFootgearSlot4Level(null)
            setCardAccessorySlot4(result[213])
            result[214] !== null && result[214].slice(-2, -1) === "+" ? setCardAccessorySlot4Level(result[214].slice(-1)) : setCardAccessorySlot4Level(null)
            setAllPowerSlot4(result[215])
            setIsStakeNowSlot4(result[216])
            const gasOut4 = new Date((Number(result[217]) * 1000) + (86400 * 1000))
            result[217] !== 0 ? setTimeToRunoutSlot4(gasOut4.toLocaleString('es-CL')) : setTimeToRunoutSlot4(null)
            result[217] !== 0 && Date.now() - (Number(result[217]) * 1000) > (86400 * 1000) ? setIsRunoutSlot4(true) : setIsRunoutSlot4(false)
            setGemPendingSlot4(ethers.utils.formatEther(String(result[218])))

            setCharSlot5(result[219])
            result[220] !== null && result[220].slice(-2, -1) === "+" ? setCharSlot5Level(result[220].slice(-1)) : setCharSlot5Level(null)
            setWeaponOneSlot5(result[221])
            result[222] !== null && result[222].slice(-2, -1) === "+" ? setWeaponOneSlot5Level(result[222].slice(-1)) : setWeaponOneSlot5Level(null)
            setShieldSlot5(result[223])
            result[224] !== null && result[224].slice(-2, -1) === "+" ? setShieldSlot5Level(result[224].slice(-1)) : setShieldSlot5Level(null)
            setArmorSlot5(result[225])
            result[226] !== null && result[226].slice(-2, -1) === "+" ? setArmorSlot5Level(result[226].slice(-1)) : setArmorSlot5Level(null)
            setHeadUpperSlot5(result[227])
            result[228] !== null && result[228].slice(-2, -1) === "+" ? setHeadUpperSlot5Level(result[228].slice(-1)) : setHeadUpperSlot5Level(null)
            setHeadMiddleSlot5(result[229])
            result[230] !== null && result[230].slice(-2, -1) === "+" ? setHeadMiddleSlot5Level(result[230].slice(-1)) : setHeadMiddleSlot5Level(null)
            setHeadLowerSlot5(result[231])
            result[232] !== null && result[232].slice(-2, -1) === "+" ? setHeadLowerSlot5Level(result[232].slice(-1)) : setHeadLowerSlot5Level(null)
            setGarmentSlot5(result[233])
            result[234] !== null && result[234].slice(-2, -1) === "+" ? setGarmentSlot5Level(result[234].slice(-1)) : setGarmentSlot5Level(null)
            setFootgearSlot5(result[235])
            result[236] !== null && result[236].slice(-2, -1) === "+" ? setFootgearSlot5Level(result[236].slice(-1)) : setFootgearSlot5Level(null)
            setAccessorySlot5(result[237])
            result[238] !== null && result[238].slice(-2, -1) === "+" ? setAccessorySlot5Level(result[238].slice(-1)) : setAccessorySlot5Level(null)
            setTalismanOneSlot5(result[239])
            result[240] !== null && result[240].slice(-2, -1) === "+" ? setTalismanOneSlot5Level(result[240].slice(-1)) : setTalismanOneSlot5Level(null)
            setTalismanTwoSlot5(result[241])
            result[242] !== null && result[242].slice(-2, -1) === "+" ? setTalismanTwoSlot5Level(result[242].slice(-1)) : setTalismanTwoSlot5Level(null)
            setWingSlot5(result[243])
            result[244] !== null && result[244].slice(-2, -1) === "+" ? setWingSlot5Level(result[244].slice(-1)) : setWingSlot5Level(null)
            setDaemonSlot5(result[245])
            result[246] !== null && result[246].slice(-2, -1) === "+" ? setDaemonSlot5Level(result[246].slice(-1)) : setDaemonSlot5Level(null)
            setJewelSlot5(result[247])
            result[248] !== null && result[248].slice(-2, -1) === "+" ? setJewelSlot5Level(result[248].slice(-1)) : setJewelSlot5Level(null)
            setWeaponTwoSlot5(result[249])
            result[250] !== null && result[250].slice(-2, -1) === "+" ? setWeaponTwoSlot5Level(result[250].slice(-1)) : setWeaponTwoSlot5Level(null)
            setCardWeaponSlot5(result[251])
            result[252] !== null && result[252].slice(-2, -1) === "+" ? setCardWeaponSlot5Level(result[252].slice(-1)) : setCardWeaponSlot5Level(null)
            setCardShieldSlot5(result[253])
            result[254] !== null && result[254].slice(-2, -1) === "+" ? setCardShieldSlot5Level(result[254].slice(-1)) : setCardShieldSlot5Level(null)
            setCardArmorSlot5(result[255])
            result[256] !== null && result[256].slice(-2, -1) === "+" ? setCardArmorSlot5Level(result[256].slice(-1)) : setCardArmorSlot5Level(null)
            setCardHeadUpperSlot5(result[257])
            result[258] !== null && result[258].slice(-2, -1) === "+" ? setCardHeadUpperSlot5Level(result[258].slice(-1)) : setCardHeadUpperSlot5Level(null)
            setCardHeadMiddleSlot5(result[259])
            result[260] !== null && result[260].slice(-2, -1) === "+" ? setCardHeadMiddleSlot5Level(result[260].slice(-1)) : setCardHeadMiddleSlot5Level(null)
            setCardHeadLowerSlot5(result[261])
            result[262] !== null && result[262].slice(-2, -1) === "+" ? setCardHeadLowerSlot5Level(result[262].slice(-1)) : setCardHeadLowerSlot5Level(null)
            setCardGarmentSlot5(result[263])
            result[264] !== null && result[264].slice(-2, -1) === "+" ? setCardGarmentSlot5Level(result[264].slice(-1)) : setCardGarmentSlot5Level(null)
            setCardFootgearSlot5(result[265])
            result[266] !== null && result[266].slice(-2, -1) === "+" ? setCardFootgearSlot5Level(result[266].slice(-1)) : setCardFootgearSlot5Level(null)
            setCardAccessorySlot5(result[267])
            result[268] !== null && result[268].slice(-2, -1) === "+" ? setCardAccessorySlot5Level(result[268].slice(-1)) : setCardAccessorySlot5Level(null)
            setAllPowerSlot5(result[269])
            setIsStakeNowSlot5(result[270])
            const gasOut5 = new Date((Number(result[271]) * 1000) + (86400 * 1000))
            result[271] !== 0 ? setTimeToRunoutSlot5(gasOut5.toLocaleString('es-CL')) : setTimeToRunoutSlot5(null)
            result[271] !== 0 && Date.now() - (Number(result[271]) * 1000) > (86400 * 1000) ? setIsRunoutSlot5(true) : setIsRunoutSlot5(false)
            setGemPendingSlot5(ethers.utils.formatEther(String(result[272])))

            setCharSlot6(result[273])
            result[274] !== null && result[274].slice(-2, -1) === "+" ? setCharSlot6Level(result[274].slice(-1)) : setCharSlot6Level(null)
            setWeaponOneSlot6(result[275])
            result[276] !== null && result[276].slice(-2, -1) === "+" ? setWeaponOneSlot6Level(result[276].slice(-1)) : setWeaponOneSlot6Level(null)
            setShieldSlot6(result[277])
            result[278] !== null && result[278].slice(-2, -1) === "+" ? setShieldSlot6Level(result[278].slice(-1)) : setShieldSlot6Level(null)
            setArmorSlot6(result[279])
            result[280] !== null && result[280].slice(-2, -1) === "+" ? setArmorSlot6Level(result[280].slice(-1)) : setArmorSlot6Level(null)
            setHeadUpperSlot6(result[281])
            result[282] !== null && result[282].slice(-2, -1) === "+" ? setHeadUpperSlot6Level(result[282].slice(-1)) : setHeadUpperSlot6Level(null)
            setHeadMiddleSlot6(result[283])
            result[284] !== null && result[284].slice(-2, -1) === "+" ? setHeadMiddleSlot6Level(result[284].slice(-1)) : setHeadMiddleSlot6Level(null)
            setHeadLowerSlot6(result[285])
            result[286] !== null && result[286].slice(-2, -1) === "+" ? setHeadLowerSlot6Level(result[286].slice(-1)) : setHeadLowerSlot6Level(null)
            setGarmentSlot6(result[287])
            result[288] !== null && result[288].slice(-2, -1) === "+" ? setGarmentSlot6Level(result[288].slice(-1)) : setGarmentSlot6Level(null)
            setFootgearSlot6(result[289])
            result[290] !== null && result[290].slice(-2, -1) === "+" ? setFootgearSlot6Level(result[290].slice(-1)) : setFootgearSlot6Level(null)
            setAccessorySlot6(result[291])
            result[292] !== null && result[292].slice(-2, -1) === "+" ? setAccessorySlot6Level(result[292].slice(-1)) : setAccessorySlot6Level(null)
            setTalismanOneSlot6(result[293])
            result[294] !== null && result[294].slice(-2, -1) === "+" ? setTalismanOneSlot6Level(result[294].slice(-1)) : setTalismanOneSlot6Level(null)
            setTalismanTwoSlot6(result[295])
            result[296] !== null && result[296].slice(-2, -1) === "+" ? setTalismanTwoSlot6Level(result[296].slice(-1)) : setTalismanTwoSlot6Level(null)
            setWingSlot6(result[297])
            result[298] !== null && result[298].slice(-2, -1) === "+" ? setWingSlot6Level(result[298].slice(-1)) : setWingSlot6Level(null)
            setDaemonSlot6(result[299])
            result[300] !== null && result[300].slice(-2, -1) === "+" ? setDaemonSlot6Level(result[300].slice(-1)) : setDaemonSlot6Level(null)
            setJewelSlot6(result[301])
            result[302] !== null && result[302].slice(-2, -1) === "+" ? setJewelSlot6Level(result[302].slice(-1)) : setJewelSlot6Level(null)
            setWeaponTwoSlot6(result[303])
            result[304] !== null && result[304].slice(-2, -1) === "+" ? setWeaponTwoSlot6Level(result[304].slice(-1)) : setWeaponTwoSlot6Level(null)
            setCardWeaponSlot6(result[305])
            result[306] !== null && result[306].slice(-2, -1) === "+" ? setCardWeaponSlot6Level(result[306].slice(-1)) : setCardWeaponSlot6Level(null)
            setCardShieldSlot6(result[307])
            result[308] !== null && result[308].slice(-2, -1) === "+" ? setCardShieldSlot6Level(result[308].slice(-1)) : setCardShieldSlot6Level(null)
            setCardArmorSlot6(result[309])
            result[310] !== null && result[310].slice(-2, -1) === "+" ? setCardArmorSlot6Level(result[310].slice(-1)) : setCardArmorSlot6Level(null)
            setCardHeadUpperSlot6(result[311])
            result[312] !== null && result[312].slice(-2, -1) === "+" ? setCardHeadUpperSlot6Level(result[312].slice(-1)) : setCardHeadUpperSlot6Level(null)
            setCardHeadMiddleSlot6(result[313])
            result[314] !== null && result[314].slice(-2, -1) === "+" ? setCardHeadMiddleSlot6Level(result[314].slice(-1)) : setCardHeadMiddleSlot6Level(null)
            setCardHeadLowerSlot6(result[315])
            result[316] !== null && result[316].slice(-2, -1) === "+" ? setCardHeadLowerSlot6Level(result[316].slice(-1)) : setCardHeadLowerSlot6Level(null)
            setCardGarmentSlot6(result[317])
            result[318] !== null && result[318].slice(-2, -1) === "+" ? setCardGarmentSlot6Level(result[318].slice(-1)) : setCardGarmentSlot6Level(null)
            setCardFootgearSlot6(result[319])
            result[320] !== null && result[320].slice(-2, -1) === "+" ? setCardFootgearSlot6Level(result[320].slice(-1)) : setCardFootgearSlot6Level(null)
            setCardAccessorySlot6(result[321])
            result[322] !== null && result[322].slice(-2, -1) === "+" ? setCardAccessorySlot6Level(result[322].slice(-1)) : setCardAccessorySlot6Level(null)
            setAllPowerSlot6(result[323])
            setIsStakeNowSlot6(result[324])
            const gasOut6 = new Date((Number(result[325]) * 1000) + (86400 * 1000))
            result[325] !== 0 ? setTimeToRunoutSlot6(gasOut6.toLocaleString('es-CL')) : setTimeToRunoutSlot6(null)
            result[325] !== 0 && Date.now() - (Number(result[325]) * 1000) > (86400 * 1000) ? setIsRunoutSlot6(true) : setIsRunoutSlot6(false)
            setGemPendingSlot6(ethers.utils.formatEther(String(result[326])))

            setCharSlot7(result[327])
            result[328] !== null && result[328].slice(-2, -1) === "+" ? setCharSlot7Level(result[328].slice(-1)) : setCharSlot7Level(null)
            setWeaponOneSlot7(result[329])
            result[330] !== null && result[330].slice(-2, -1) === "+" ? setWeaponOneSlot7Level(result[330].slice(-1)) : setWeaponOneSlot7Level(null)
            setShieldSlot7(result[331])
            result[332] !== null && result[332].slice(-2, -1) === "+" ? setShieldSlot7Level(result[332].slice(-1)) : setShieldSlot7Level(null)
            setArmorSlot7(result[333])
            result[334] !== null && result[334].slice(-2, -1) === "+" ? setArmorSlot7Level(result[334].slice(-1)) : setArmorSlot7Level(null)
            setHeadUpperSlot7(result[335])
            result[336] !== null && result[336].slice(-2, -1) === "+" ? setHeadUpperSlot7Level(result[336].slice(-1)) : setHeadUpperSlot7Level(null)
            setHeadMiddleSlot7(result[337])
            result[338] !== null && result[338].slice(-2, -1) === "+" ? setHeadMiddleSlot7Level(result[338].slice(-1)) : setHeadMiddleSlot7Level(null)
            setHeadLowerSlot7(result[339])
            result[340] !== null && result[340].slice(-2, -1) === "+" ? setHeadLowerSlot7Level(result[340].slice(-1)) : setHeadLowerSlot7Level(null)
            setGarmentSlot7(result[341])
            result[342] !== null && result[342].slice(-2, -1) === "+" ? setGarmentSlot7Level(result[342].slice(-1)) : setGarmentSlot7Level(null)
            setFootgearSlot7(result[343])
            result[344] !== null && result[344].slice(-2, -1) === "+" ? setFootgearSlot7Level(result[344].slice(-1)) : setFootgearSlot7Level(null)
            setAccessorySlot7(result[345])
            result[346] !== null && result[346].slice(-2, -1) === "+" ? setAccessorySlot7Level(result[346].slice(-1)) : setAccessorySlot7Level(null)
            setTalismanOneSlot7(result[347])
            result[348] !== null && result[348].slice(-2, -1) === "+" ? setTalismanOneSlot7Level(result[348].slice(-1)) : setTalismanOneSlot7Level(null)
            setTalismanTwoSlot7(result[349])
            result[350] !== null && result[350].slice(-2, -1) === "+" ? setTalismanTwoSlot7Level(result[350].slice(-1)) : setTalismanTwoSlot7Level(null)
            setWingSlot7(result[351])
            result[352] !== null && result[352].slice(-2, -1) === "+" ? setWingSlot7Level(result[352].slice(-1)) : setWingSlot7Level(null)
            setDaemonSlot7(result[353])
            result[354] !== null && result[354].slice(-2, -1) === "+" ? setDaemonSlot7Level(result[354].slice(-1)) : setDaemonSlot7Level(null)
            setJewelSlot7(result[355])
            result[356] !== null && result[356].slice(-2, -1) === "+" ? setJewelSlot7Level(result[356].slice(-1)) : setJewelSlot7Level(null)
            setWeaponTwoSlot7(result[357])
            result[358] !== null && result[358].slice(-2, -1) === "+" ? setWeaponTwoSlot7Level(result[358].slice(-1)) : setWeaponTwoSlot7Level(null)
            setCardWeaponSlot7(result[359])
            result[360] !== null && result[360].slice(-2, -1) === "+" ? setCardWeaponSlot7Level(result[360].slice(-1)) : setCardWeaponSlot7Level(null)
            setCardShieldSlot7(result[361])
            result[362] !== null && result[362].slice(-2, -1) === "+" ? setCardShieldSlot7Level(result[362].slice(-1)) : setCardShieldSlot7Level(null)
            setCardArmorSlot7(result[363])
            result[364] !== null && result[364].slice(-2, -1) === "+" ? setCardArmorSlot7Level(result[364].slice(-1)) : setCardArmorSlot7Level(null)
            setCardHeadUpperSlot7(result[365])
            result[366] !== null && result[366].slice(-2, -1) === "+" ? setCardHeadUpperSlot7Level(result[366].slice(-1)) : setCardHeadUpperSlot7Level(null)
            setCardHeadMiddleSlot7(result[367])
            result[368] !== null && result[368].slice(-2, -1) === "+" ? setCardHeadMiddleSlot7Level(result[368].slice(-1)) : setCardHeadMiddleSlot7Level(null)
            setCardHeadLowerSlot7(result[369])
            result[370] !== null && result[370].slice(-2, -1) === "+" ? setCardHeadLowerSlot7Level(result[370].slice(-1)) : setCardHeadLowerSlot7Level(null)
            setCardGarmentSlot7(result[371])
            result[372] !== null && result[372].slice(-2, -1) === "+" ? setCardGarmentSlot7Level(result[372].slice(-1)) : setCardGarmentSlot7Level(null)
            setCardFootgearSlot7(result[373])
            result[374] !== null && result[374].slice(-2, -1) === "+" ? setCardFootgearSlot7Level(result[374].slice(-1)) : setCardFootgearSlot7Level(null)
            setCardAccessorySlot7(result[375])
            result[376] !== null && result[376].slice(-2, -1) === "+" ? setCardAccessorySlot7Level(result[376].slice(-1)) : setCardAccessorySlot7Level(null)
            setAllPowerSlot7(result[377])
            setIsStakeNowSlot7(result[378])
            const gasOut7 = new Date((Number(result[379]) * 1000) + (86400 * 1000))
            result[379] !== 0 ? setTimeToRunoutSlot7(gasOut7.toLocaleString('es-CL')) : setTimeToRunoutSlot7(null)
            result[379] !== 0 && Date.now() - (Number(result[379]) * 1000) > (86400 * 1000) ? setIsRunoutSlot7(true) : setIsRunoutSlot7(false)
            setGemPendingSlot7(ethers.utils.formatEther(String(result[380])))

            setCharSlot8(result[381])
            result[382] !== null && result[382].slice(-2, -1) === "+" ? setCharSlot8Level(result[382].slice(-1)) : setCharSlot8Level(null)
            setWeaponOneSlot8(result[383])
            result[384] !== null && result[384].slice(-2, -1) === "+" ? setWeaponOneSlot8Level(result[384].slice(-1)) : setWeaponOneSlot8Level(null)
            setShieldSlot8(result[385])
            result[386] !== null && result[386].slice(-2, -1) === "+" ? setShieldSlot8Level(result[386].slice(-1)) : setShieldSlot8Level(null)
            setArmorSlot8(result[387])
            result[388] !== null && result[388].slice(-2, -1) === "+" ? setArmorSlot8Level(result[388].slice(-1)) : setArmorSlot8Level(null)
            setHeadUpperSlot8(result[389])
            result[390] !== null && result[390].slice(-2, -1) === "+" ? setHeadUpperSlot8Level(result[390].slice(-1)) : setHeadUpperSlot8Level(null)
            setHeadMiddleSlot8(result[391])
            result[392] !== null && result[392].slice(-2, -1) === "+" ? setHeadMiddleSlot8Level(result[392].slice(-1)) : setHeadMiddleSlot8Level(null)
            setHeadLowerSlot8(result[393])
            result[394] !== null && result[394].slice(-2, -1) === "+" ? setHeadLowerSlot8Level(result[394].slice(-1)) : setHeadLowerSlot8Level(null)
            setGarmentSlot8(result[395])
            result[396] !== null && result[396].slice(-2, -1) === "+" ? setGarmentSlot8Level(result[396].slice(-1)) : setGarmentSlot8Level(null)
            setFootgearSlot8(result[397])
            result[398] !== null && result[398].slice(-2, -1) === "+" ? setFootgearSlot8Level(result[398].slice(-1)) : setFootgearSlot8Level(null)
            setAccessorySlot8(result[399])
            result[400] !== null && result[400].slice(-2, -1) === "+" ? setAccessorySlot8Level(result[400].slice(-1)) : setAccessorySlot8Level(null)
            setTalismanOneSlot8(result[401])
            result[402] !== null && result[402].slice(-2, -1) === "+" ? setTalismanOneSlot8Level(result[402].slice(-1)) : setTalismanOneSlot8Level(null)
            setTalismanTwoSlot8(result[403])
            result[404] !== null && result[404].slice(-2, -1) === "+" ? setTalismanTwoSlot8Level(result[404].slice(-1)) : setTalismanTwoSlot8Level(null)
            setWingSlot8(result[405])
            result[406] !== null && result[406].slice(-2, -1) === "+" ? setWingSlot8Level(result[406].slice(-1)) : setWingSlot8Level(null)
            setDaemonSlot8(result[407])
            result[408] !== null && result[408].slice(-2, -1) === "+" ? setDaemonSlot8Level(result[408].slice(-1)) : setDaemonSlot8Level(null)
            setJewelSlot8(result[409])
            result[410] !== null && result[410].slice(-2, -1) === "+" ? setJewelSlot8Level(result[410].slice(-1)) : setJewelSlot8Level(null)
            setWeaponTwoSlot8(result[411])
            result[412] !== null && result[412].slice(-2, -1) === "+" ? setWeaponTwoSlot8Level(result[412].slice(-1)) : setWeaponTwoSlot8Level(null)
            setCardWeaponSlot8(result[413])
            result[414] !== null && result[414].slice(-2, -1) === "+" ? setCardWeaponSlot8Level(result[414].slice(-1)) : setCardWeaponSlot8Level(null)
            setCardShieldSlot8(result[415])
            result[416] !== null && result[416].slice(-2, -1) === "+" ? setCardShieldSlot8Level(result[416].slice(-1)) : setCardShieldSlot8Level(null)
            setCardArmorSlot8(result[417])
            result[418] !== null && result[418].slice(-2, -1) === "+" ? setCardArmorSlot8Level(result[418].slice(-1)) : setCardArmorSlot8Level(null)
            setCardHeadUpperSlot8(result[419])
            result[420] !== null && result[420].slice(-2, -1) === "+" ? setCardHeadUpperSlot8Level(result[420].slice(-1)) : setCardHeadUpperSlot8Level(null)
            setCardHeadMiddleSlot8(result[421])
            result[422] !== null && result[422].slice(-2, -1) === "+" ? setCardHeadMiddleSlot8Level(result[422].slice(-1)) : setCardHeadMiddleSlot8Level(null)
            setCardHeadLowerSlot8(result[423])
            result[424] !== null && result[424].slice(-2, -1) === "+" ? setCardHeadLowerSlot8Level(result[424].slice(-1)) : setCardHeadLowerSlot8Level(null)
            setCardGarmentSlot8(result[425])
            result[426] !== null && result[426].slice(-2, -1) === "+" ? setCardGarmentSlot8Level(result[426].slice(-1)) : setCardGarmentSlot8Level(null)
            setCardFootgearSlot8(result[427])
            result[428] !== null && result[428].slice(-2, -1) === "+" ? setCardFootgearSlot8Level(result[428].slice(-1)) : setCardFootgearSlot8Level(null)
            setCardAccessorySlot8(result[429])
            result[430] !== null && result[430].slice(-2, -1) === "+" ? setCardAccessorySlot8Level(result[430].slice(-1)) : setCardAccessorySlot8Level(null)
            setAllPowerSlot8(result[431])
            setIsStakeNowSlot8(result[432])
            const gasOut8 = new Date((Number(result[433]) * 1000) + (86400 * 1000))
            result[433] !== 0 ? setTimeToRunoutSlot8(gasOut8.toLocaleString('es-CL')) : setTimeToRunoutSlot8(null)
            result[433] !== 0 && Date.now() - (Number(result[433]) * 1000) > (86400 * 1000) ? setIsRunoutSlot8(true) : setIsRunoutSlot8(false)
            setGemPendingSlot8(ethers.utils.formatEther(String(result[434])))

            setCharSlot9(result[435])
            result[436] !== null && result[436].slice(-2, -1) === "+" ? setCharSlot9Level(result[436].slice(-1)) : setCharSlot9Level(null)
            setWeaponOneSlot9(result[437])
            result[438] !== null && result[438].slice(-2, -1) === "+" ? setWeaponOneSlot9Level(result[438].slice(-1)) : setWeaponOneSlot9Level(null)
            setShieldSlot9(result[439])
            result[440] !== null && result[440].slice(-2, -1) === "+" ? setShieldSlot9Level(result[440].slice(-1)) : setShieldSlot9Level(null)
            setArmorSlot9(result[441])
            result[442] !== null && result[442].slice(-2, -1) === "+" ? setArmorSlot9Level(result[442].slice(-1)) : setArmorSlot9Level(null)
            setHeadUpperSlot9(result[443])
            result[444] !== null && result[444].slice(-2, -1) === "+" ? setHeadUpperSlot9Level(result[444].slice(-1)) : setHeadUpperSlot9Level(null)
            setHeadMiddleSlot9(result[445])
            result[446] !== null && result[446].slice(-2, -1) === "+" ? setHeadMiddleSlot9Level(result[446].slice(-1)) : setHeadMiddleSlot9Level(null)
            setHeadLowerSlot9(result[447])
            result[448] !== null && result[448].slice(-2, -1) === "+" ? setHeadLowerSlot9Level(result[448].slice(-1)) : setHeadLowerSlot9Level(null)
            setGarmentSlot9(result[449])
            result[450] !== null && result[450].slice(-2, -1) === "+" ? setGarmentSlot9Level(result[450].slice(-1)) : setGarmentSlot9Level(null)
            setFootgearSlot9(result[451])
            result[452] !== null && result[452].slice(-2, -1) === "+" ? setFootgearSlot9Level(result[452].slice(-1)) : setFootgearSlot9Level(null)
            setAccessorySlot9(result[453])
            result[454] !== null && result[454].slice(-2, -1) === "+" ? setAccessorySlot9Level(result[454].slice(-1)) : setAccessorySlot9Level(null)
            setTalismanOneSlot9(result[455])
            result[456] !== null && result[456].slice(-2, -1) === "+" ? setTalismanOneSlot9Level(result[456].slice(-1)) : setTalismanOneSlot9Level(null)
            setTalismanTwoSlot9(result[457])
            result[458] !== null && result[458].slice(-2, -1) === "+" ? setTalismanTwoSlot9Level(result[458].slice(-1)) : setTalismanTwoSlot9Level(null)
            setWingSlot9(result[459])
            result[460] !== null && result[460].slice(-2, -1) === "+" ? setWingSlot9Level(result[460].slice(-1)) : setWingSlot9Level(null)
            setDaemonSlot9(result[461])
            result[462] !== null && result[462].slice(-2, -1) === "+" ? setDaemonSlot9Level(result[462].slice(-1)) : setDaemonSlot9Level(null)
            setJewelSlot9(result[463])
            result[464] !== null && result[464].slice(-2, -1) === "+" ? setJewelSlot9Level(result[464].slice(-1)) : setJewelSlot9Level(null)
            setWeaponTwoSlot9(result[465])
            result[466] !== null && result[466].slice(-2, -1) === "+" ? setWeaponTwoSlot9Level(result[466].slice(-1)) : setWeaponTwoSlot9Level(null)
            setCardWeaponSlot9(result[467])
            result[468] !== null && result[468].slice(-2, -1) === "+" ? setCardWeaponSlot9Level(result[468].slice(-1)) : setCardWeaponSlot9Level(null)
            setCardShieldSlot9(result[469])
            result[470] !== null && result[470].slice(-2, -1) === "+" ? setCardShieldSlot9Level(result[470].slice(-1)) : setCardShieldSlot9Level(null)
            setCardArmorSlot9(result[471])
            result[472] !== null && result[472].slice(-2, -1) === "+" ? setCardArmorSlot9Level(result[472].slice(-1)) : setCardArmorSlot9Level(null)
            setCardHeadUpperSlot9(result[473])
            result[474] !== null && result[474].slice(-2, -1) === "+" ? setCardHeadUpperSlot9Level(result[474].slice(-1)) : setCardHeadUpperSlot9Level(null)
            setCardHeadMiddleSlot9(result[475])
            result[476] !== null && result[476].slice(-2, -1) === "+" ? setCardHeadMiddleSlot9Level(result[476].slice(-1)) : setCardHeadMiddleSlot9Level(null)
            setCardHeadLowerSlot9(result[477])
            result[478] !== null && result[478].slice(-2, -1) === "+" ? setCardHeadLowerSlot9Level(result[478].slice(-1)) : setCardHeadLowerSlot9Level(null)
            setCardGarmentSlot9(result[479])
            result[480] !== null && result[480].slice(-2, -1) === "+" ? setCardGarmentSlot9Level(result[480].slice(-1)) : setCardGarmentSlot9Level(null)
            setCardFootgearSlot9(result[481])
            result[482] !== null && result[482].slice(-2, -1) === "+" ? setCardFootgearSlot9Level(result[482].slice(-1)) : setCardFootgearSlot9Level(null)
            setCardAccessorySlot9(result[483])
            result[484] !== null && result[484].slice(-2, -1) === "+" ? setCardAccessorySlot9Level(result[484].slice(-1)) : setCardAccessorySlot9Level(null)
            setAllPowerSlot9(result[485])
            setIsStakeNowSlot9(result[486])
            const gasOut9 = new Date((Number(result[487]) * 1000) + (86400 * 1000))
            result[487] !== 0 ? setTimeToRunoutSlot9(gasOut9.toLocaleString('es-CL')) : setTimeToRunoutSlot9(null)
            result[487] !== 0 && Date.now() - (Number(result[487]) * 1000) > (86400 * 1000) ? setIsRunoutSlot9(true) : setIsRunoutSlot9(false)
            setGemPendingSlot9(ethers.utils.formatEther(String(result[488])))

            setCharSlot10(result[489])
            result[490] !== null && result[490].slice(-2, -1) === "+" ? setCharSlot10Level(result[490].slice(-1)) : setCharSlot10Level(null)
            setWeaponOneSlot10(result[491])
            result[492] !== null && result[492].slice(-2, -1) === "+" ? setWeaponOneSlot10Level(result[492].slice(-1)) : setWeaponOneSlot10Level(null)
            setShieldSlot10(result[493])
            result[494] !== null && result[494].slice(-2, -1) === "+" ? setShieldSlot10Level(result[494].slice(-1)) : setShieldSlot10Level(null)
            setArmorSlot10(result[495])
            result[496] !== null && result[496].slice(-2, -1) === "+" ? setArmorSlot10Level(result[496].slice(-1)) : setArmorSlot10Level(null)
            setHeadUpperSlot10(result[497])
            result[498] !== null && result[498].slice(-2, -1) === "+" ? setHeadUpperSlot10Level(result[498].slice(-1)) : setHeadUpperSlot10Level(null)
            setHeadMiddleSlot10(result[499])
            result[500] !== null && result[500].slice(-2, -1) === "+" ? setHeadMiddleSlot10Level(result[500].slice(-1)) : setHeadMiddleSlot10Level(null)
            setHeadLowerSlot10(result[501])
            result[502] !== null && result[502].slice(-2, -1) === "+" ? setHeadLowerSlot10Level(result[502].slice(-1)) : setHeadLowerSlot10Level(null)
            setGarmentSlot10(result[503])
            result[504] !== null && result[504].slice(-2, -1) === "+" ? setGarmentSlot10Level(result[504].slice(-1)) : setGarmentSlot10Level(null)
            setFootgearSlot10(result[505])
            result[506] !== null && result[506].slice(-2, -1) === "+" ? setFootgearSlot10Level(result[506].slice(-1)) : setFootgearSlot10Level(null)
            setAccessorySlot10(result[507])
            result[508] !== null && result[508].slice(-2, -1) === "+" ? setAccessorySlot10Level(result[508].slice(-1)) : setAccessorySlot10Level(null)
            setTalismanOneSlot10(result[509])
            result[510] !== null && result[510].slice(-2, -1) === "+" ? setTalismanOneSlot10Level(result[510].slice(-1)) : setTalismanOneSlot10Level(null)
            setTalismanTwoSlot10(result[511])
            result[512] !== null && result[512].slice(-2, -1) === "+" ? setTalismanTwoSlot10Level(result[512].slice(-1)) : setTalismanTwoSlot10Level(null)
            setWingSlot10(result[513])
            result[514] !== null && result[514].slice(-2, -1) === "+" ? setWingSlot10Level(result[514].slice(-1)) : setWingSlot10Level(null)
            setDaemonSlot10(result[515])
            result[516] !== null && result[516].slice(-2, -1) === "+" ? setDaemonSlot10Level(result[516].slice(-1)) : setDaemonSlot10Level(null)
            setJewelSlot10(result[517])
            result[518] !== null && result[518].slice(-2, -1) === "+" ? setJewelSlot10Level(result[518].slice(-1)) : setJewelSlot10Level(null)
            setWeaponTwoSlot10(result[519])
            result[520] !== null && result[520].slice(-2, -1) === "+" ? setWeaponTwoSlot10Level(result[520].slice(-1)) : setWeaponTwoSlot10Level(null)
            setCardWeaponSlot10(result[521])
            result[522] !== null && result[522].slice(-2, -1) === "+" ? setCardWeaponSlot10Level(result[522].slice(-1)) : setCardWeaponSlot10Level(null)
            setCardShieldSlot10(result[523])
            result[524] !== null && result[524].slice(-2, -1) === "+" ? setCardShieldSlot10Level(result[524].slice(-1)) : setCardShieldSlot10Level(null)
            setCardArmorSlot10(result[525])
            result[526] !== null && result[526].slice(-2, -1) === "+" ? setCardArmorSlot10Level(result[526].slice(-1)) : setCardArmorSlot10Level(null)
            setCardHeadUpperSlot10(result[527])
            result[528] !== null && result[528].slice(-2, -1) === "+" ? setCardHeadUpperSlot10Level(result[528].slice(-1)) : setCardHeadUpperSlot10Level(null)
            setCardHeadMiddleSlot10(result[529])
            result[530] !== null && result[530].slice(-2, -1) === "+" ? setCardHeadMiddleSlot10Level(result[530].slice(-1)) : setCardHeadMiddleSlot10Level(null)
            setCardHeadLowerSlot10(result[531])
            result[532] !== null && result[532].slice(-2, -1) === "+" ? setCardHeadLowerSlot10Level(result[532].slice(-1)) : setCardHeadLowerSlot10Level(null)
            setCardGarmentSlot10(result[533])
            result[534] !== null && result[534].slice(-2, -1) === "+" ? setCardGarmentSlot10Level(result[534].slice(-1)) : setCardGarmentSlot10Level(null)
            setCardFootgearSlot10(result[535])
            result[536] !== null && result[536].slice(-2, -1) === "+" ? setCardFootgearSlot10Level(result[536].slice(-1)) : setCardFootgearSlot10Level(null)
            setCardAccessorySlot10(result[537])
            result[538] !== null && result[538].slice(-2, -1) === "+" ? setCardAccessorySlot10Level(result[538].slice(-1)) : setCardAccessorySlot10Level(null)
            setAllPowerSlot10(result[539])
            setIsStakeNowSlot10(result[540])
            const gasOut10 = new Date((Number(result[541]) * 1000) + (86400 * 1000))
            result[541] !== 0 ? setTimeToRunoutSlot10(gasOut10.toLocaleString('es-CL')) : setTimeToRunoutSlot10(null)
            result[541] !== 0 && Date.now() - (Number(result[541]) * 1000) > (86400 * 1000) ? setIsRunoutSlot10(true) : setIsRunoutSlot10(false)
            setGemPendingSlot10(ethers.utils.formatEther(String(result[542])))
        })
    }, [address, txupdate, erc721ABI, erc20ABI, dunGEMABI])

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
            addr = hrmNft
        }
        try {
            const config = await prepareWriteContract({
                address: addr,
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

    const equipNft = async (_slot, _nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract({
                address: hrmNft,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== dunGEM.toUpperCase()) {
                const config = await prepareWriteContract({
                    address: hrmNft,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [dunGEM, _nftid],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'equip',
                args: [_slot, _nftid],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {console.log(e)}
        setisLoading(false)
    }

    const unstakeNft = async (_slot2, _slot) => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'unstake',
                args: [_slot2, _slot],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {console.log(e)}
        setisLoading(false)
    }

    const refuelStake = async (_slot) => {
        setisLoading(true)
        let gasAddr = ''
        let gasIndex = 0
        if (gasselected === "ENGY") {
            gasAddr = engyToken
            gasIndex = 1
        }
        try {
            const gasAllow = await readContract({
                address: gasAddr,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, dunGEM],
            })
            if (gasAllow < (2 * 10**17)) {
                const config = await prepareWriteContract({
                    address: gasAddr,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [dunGEM, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: dunGEM,
                abi: dunGEMABI,
                functionName: 'refuel',
                args: [_slot, gasIndex]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

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
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmd5r9efGEgrBPRd7UxkGuR4HcTSt3afGeDEa8suEHpoy2')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "75px", color: "#fff", width: "fit-content"}}>The Endless Tower</div>
                <div style={{fontSize: "17px", color: "#fff", width: "fit-content", marginTop: "30px"}} className="pixel">Exploring exotic cave to collect a rare token, $GEMSTONE.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" width="150" alt="$GEM" />
            </div>
        </div>
    
        <div style={{margin: "0", padding: "75px 0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                <div style={{background: "rgb(230, 250, 54)", border: "none", justifyContent: "space-around", padding: "30px", width: "1560px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "column", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                    <div style={{marginTop: "40px", display: "flex", flexFlow: "column wrap"}}>
                        {/*
                        ░██████╗██╗░░░░░░█████╗░████████╗░░███╗░░
                        ██╔════╝██║░░░░░██╔══██╗╚══██╔══╝░████║░░
                        ╚█████╗░██║░░░░░██║░░██║░░░██║░░░██╔██║░░
                        ░╚═══██╗██║░░░░░██║░░██║░░░██║░░░╚═╝██║░░
                        ██████╔╝███████╗╚█████╔╝░░░██║░░░███████╗
                        ╚═════╝░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝
                        */}
                        <div style={{display: "flex"}}>
                            <div style={{background: "rgb(194, 155, 231)", color: "#fff", position: "relative", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>SLOT 1 STAKING</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        {isStakeNowSlot1 ?
                                            <>
                                                {isRunoutSlot1 ?
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
                                                {!isStakeNowSlot1 &&
                                                    <>
                                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Available for stake</div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    {address !== undefined ?
                                        <>ADDRESS <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></> :
                                        <>ADDRESS <div>-</div></>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    TOTAL POWER PER SEC
                                    <div>{Number(allPowerSlot1).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE BALANCE
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE PENDING
                                    <div style={{display: "flex", flexDirection: "row", color: timeToRunoutSlot1 !== 0 && timeToRunoutSlot1 !== null  ? "#ff007a" : "#5f6476"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemPendingSlot1).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GAS USAGE
                                    <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="ENGY">$ENGY</option>
                                    </select>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        {gasselected === "ENGY" &&
                                            <>
                                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYyCnpA39K7F7iu9BR9YdPJTfXfzzFVhQuu4RT1y7XffB" height="20" alt="$ENGY"/>
                                                <div style={{marginLeft: "5px"}}>{Number(engyBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                            </>
                                        }
                                        <div style={{marginLeft: "5px"}}>/24</div>
                                    </div>
                                </div>
                                {isStakeNowSlot1 ?
                                    <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT AT <div>{timeToRunoutSlot1}</div></div>
                                    : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT IN <div>1 day</div></div>
                                }
                                {address !== undefined && address === youraddr ?
                                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        {isStakeNowSlot1 ?
                                            <>
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                <div style={{alignSelf: "center", background: isRunoutSlot1 ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                            </> :
                                            <>
                                                {isStakeNowSlot1 !== null && ((gasselected === "ENGY" && Number(engyBalance) >= 24)) ?
                                                    <>
                                                        {allPowerSlot1 !== 0 ?
                                                            <div style={{alignSelf: "center"}} className="button" onClick={refuelStake(0)}>REFUEL GAS</div> :
                                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                        }
                                                    </> :
                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                }
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                            </>
                                        }
                                    </div> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot1 !== null ?
                                    <img src={cardWeaponSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlot1Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlot1Level}</div>}
                                {jewelSlot1 !== null ?
                                    <img src={jewelSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlot1Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlot1Level}</div>}
                                {cardShieldSlot1 !== null ?
                                    <img src={cardShieldSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlot1Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlot1Level}</div>}
                                {daemonSlot1 !== null ?
                                    <img src={daemonSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlot1Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlot1Level}</div>}
                                {cardAccessorySlot1 !== null ?
                                    <img src={cardAccessorySlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlot1Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlot1Level}</div>}
                                {talismanTwoSlot1 !== null ?
                                    <img src={talismanTwoSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlot1Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlot1Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot1 !== null ?
                                    <img src={weaponOneSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlot1Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlot1Level}</div>}
                                {weaponTwoSlot1 !== null ?
                                    <img src={weaponTwoSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlot1Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlot1Level}</div>}
                                {shieldSlot1 !== null ?
                                    <img src={shieldSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlot1Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlot1Level}</div>}
                                {wingSlot1 !== null ?
                                    <img src={wingSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlot1Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlot1Level}</div>}
                                {accessorySlot1 !== null ?
                                    <img src={accessorySlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlot1Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlot1Level}</div>}
                                {talismanOneSlot1 !== null ?
                                    <img src={talismanOneSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlot1Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlot1Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 1</div>
                                {nft.length > 0 ?
                                    <>
                                        {charSlot1 !== null ?
                                            <img src={charSlot1} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {charSlot1Level !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{charSlot1Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot1 !== null ?
                                    <img src={headUpperSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlot1Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlot1Level}</div>}
                                {headMiddleSlot1 !== null ?
                                    <img src={headMiddleSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlot1Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlot1Level}</div>}
                                {headLowerSlot1 !== null ?
                                    <img src={headLowerSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlot1Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlot1Level}</div>}
                                {armorSlot1 !== null ?
                                    <img src={armorSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlot1Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlot1Level}</div>}
                                {garmentSlot1 !== null ?
                                    <img src={garmentSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlot1Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlot1Level}</div>}
                                {footgearSlot1 !== null ?
                                    <img src={footgearSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlot1Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlot1Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot1 !== null ?
                                    <img src={cardHeadUpperSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlot1Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlot1Level}</div>}
                                {cardHeadMiddleSlot1 !== null ?
                                    <img src={cardHeadMiddleSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlot1Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlot1Level}</div>}
                                {cardHeadLowerSlot1 !== null ?
                                    <img src={cardHeadLowerSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlot1Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlot1Level}</div>}
                                {cardArmorSlot1 !== null ?
                                    <img src={cardArmorSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlot1Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlot1Level}</div>}
                                {cardGarmentSlot1 !== null ?
                                    <img src={cardGarmentSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlot1Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlot1Level}</div>}
                                {cardFootgearSlot1 !== null ?
                                    <img src={cardFootgearSlot1} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlot1Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlot1Level}</div>}
                            </div>
                        </div>
                        {/*
                        ░██████╗██╗░░░░░░█████╗░████████╗██████╗░
                        ██╔════╝██║░░░░░██╔══██╗╚══██╔══╝╚════██╗
                        ╚█████╗░██║░░░░░██║░░██║░░░██║░░░░░███╔═╝
                        ░╚═══██╗██║░░░░░██║░░██║░░░██║░░░██╔══╝░░
                        ██████╔╝███████╗╚█████╔╝░░░██║░░░███████╗
                        ╚═════╝░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝
                        */}
                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{background: "rgb(194, 155, 231)", color: "#fff", position: "relative", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>SLOT 2 STAKING</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        {isStakeNowSlot2 ?
                                            <>
                                                {isRunoutSlot2 ?
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
                                                {!isStakeNowSlot2 &&
                                                    <>
                                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Available for stake</div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    {address !== undefined ?
                                        <>ADDRESS <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></> :
                                        <>ADDRESS <div>-</div></>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    TOTAL POWER PER SEC
                                    <div>{Number(allPowerSlot2).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE BALANCE
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE PENDING
                                    <div style={{display: "flex", flexDirection: "row", color: timeToRunoutSlot2 !== 0 && timeToRunoutSlot2 !== null  ? "#ff007a" : "#5f6476"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemPendingSlot2).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GAS USAGE
                                    <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="ENGY">$ENGY</option>
                                    </select>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        {gasselected === "ENGY" &&
                                            <>
                                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYyCnpA39K7F7iu9BR9YdPJTfXfzzFVhQuu4RT1y7XffB" height="20" alt="$ENGY"/>
                                                <div style={{marginLeft: "5px"}}>{Number(engyBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                            </>
                                        }
                                        <div style={{marginLeft: "5px"}}>/24</div>
                                    </div>
                                </div>
                                {isStakeNowSlot2 ?
                                    <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT AT <div>{timeToRunoutSlot2}</div></div>
                                    : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT IN <div>1 day</div></div>
                                }
                                {address !== undefined && address === youraddr ?
                                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        {isStakeNowSlot2 ?
                                            <>
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                <div style={{alignSelf: "center", background: isRunoutSlot2 ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                            </> :
                                            <>
                                                {isStakeNowSlot2 !== null && ((gasselected === "ENGY" && Number(engyBalance) >= 24)) ?
                                                    <>
                                                        {allPowerSlot2 !== 0 ?
                                                            <div style={{alignSelf: "center"}} className="button" onClick={refuelStake(1)}>REFUEL GAS</div> :
                                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                        }
                                                    </> :
                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                }
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                            </>
                                        }
                                    </div> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot2 !== null ?
                                    <img src={cardWeaponSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlot2Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlot2Level}</div>}
                                {jewelSlot2 !== null ?
                                    <img src={jewelSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlot2Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlot2Level}</div>}
                                {cardShieldSlot2 !== null ?
                                    <img src={cardShieldSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlot2Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlot2Level}</div>}
                                {daemonSlot2 !== null ?
                                    <img src={daemonSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlot2Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlot2Level}</div>}
                                {cardAccessorySlot2 !== null ?
                                    <img src={cardAccessorySlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlot2Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlot2Level}</div>}
                                {talismanTwoSlot2 !== null ?
                                    <img src={talismanTwoSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlot2Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlot2Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot2 !== null ?
                                    <img src={weaponOneSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlot2Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlot2Level}</div>}
                                {weaponTwoSlot2 !== null ?
                                    <img src={weaponTwoSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlot2Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlot2Level}</div>}
                                {shieldSlot2 !== null ?
                                    <img src={shieldSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlot2Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlot2Level}</div>}
                                {wingSlot2 !== null ?
                                    <img src={wingSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlot2Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlot2Level}</div>}
                                {accessorySlot2 !== null ?
                                    <img src={accessorySlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlot2Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlot2Level}</div>}
                                {talismanOneSlot2 !== null ?
                                    <img src={talismanOneSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlot2Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlot2Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 2</div>
                                {nft.length > 0 ?
                                    <>
                                        {charSlot2 !== null ?
                                            <img src={charSlot2} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {charSlot2Level !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{charSlot2Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot2 !== null ?
                                    <img src={headUpperSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlot2Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlot2Level}</div>}
                                {headMiddleSlot2 !== null ?
                                    <img src={headMiddleSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlot2Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlot2Level}</div>}
                                {headLowerSlot2 !== null ?
                                    <img src={headLowerSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlot2Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlot2Level}</div>}
                                {armorSlot2 !== null ?
                                    <img src={armorSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlot2Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlot2Level}</div>}
                                {garmentSlot2 !== null ?
                                    <img src={garmentSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlot2Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlot2Level}</div>}
                                {footgearSlot2 !== null ?
                                    <img src={footgearSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlot2Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlot2Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot2 !== null ?
                                    <img src={cardHeadUpperSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlot2Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlot2Level}</div>}
                                {cardHeadMiddleSlot2 !== null ?
                                    <img src={cardHeadMiddleSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlot2Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlot2Level}</div>}
                                {cardHeadLowerSlot2 !== null ?
                                    <img src={cardHeadLowerSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlot2Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlot2Level}</div>}
                                {cardArmorSlot2 !== null ?
                                    <img src={cardArmorSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlot2Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlot2Level}</div>}
                                {cardGarmentSlot2 !== null ?
                                    <img src={cardGarmentSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlot2Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlot2Level}</div>}
                                {cardFootgearSlot2 !== null ?
                                    <img src={cardFootgearSlot2} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlot2Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlot2Level}</div>}
                            </div>
                        </div>
                        {/*
                        ░██████╗██╗░░░░░░█████╗░████████╗██████╗░
                        ██╔════╝██║░░░░░██╔══██╗╚══██╔══╝╚════██╗
                        ╚█████╗░██║░░░░░██║░░██║░░░██║░░░░█████╔╝
                        ░╚═══██╗██║░░░░░██║░░██║░░░██║░░░░╚═══██╗
                        ██████╔╝███████╗╚█████╔╝░░░██║░░░██████╔╝
                        ╚═════╝░╚══════╝░╚════╝░░░░╚═╝░░░╚═════╝░
                        */}
                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{background: "rgb(194, 155, 231)", color: "#fff", position: "relative", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>SLOT 3 STAKING</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        {isStakeNowSlot3 ?
                                            <>
                                                {isRunoutSlot3 ?
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
                                                {!isStakeNowSlot3 &&
                                                    <>
                                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Available for stake</div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    {address !== undefined ?
                                        <>ADDRESS <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></> :
                                        <>ADDRESS <div>-</div></>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    TOTAL POWER PER SEC
                                    <div>{Number(allPowerSlot3).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE BALANCE
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE PENDING
                                    <div style={{display: "flex", flexDirection: "row", color: timeToRunoutSlot3 !== 0 && timeToRunoutSlot3 !== null  ? "#ff007a" : "#5f6476"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemPendingSlot3).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GAS USAGE
                                    <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="ENGY">$ENGY</option>
                                    </select>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        {gasselected === "ENGY" &&
                                            <>
                                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYyCnpA39K7F7iu9BR9YdPJTfXfzzFVhQuu4RT1y7XffB" height="20" alt="$ENGY"/>
                                                <div style={{marginLeft: "5px"}}>{Number(engyBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                            </>
                                        }
                                        <div style={{marginLeft: "5px"}}>/24</div>
                                    </div>
                                </div>
                                {isStakeNowSlot3 ?
                                    <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT AT <div>{timeToRunoutSlot3}</div></div>
                                    : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT IN <div>1 day</div></div>
                                }
                                {address !== undefined && address === youraddr ?
                                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        {isStakeNowSlot3 ?
                                            <>
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                <div style={{alignSelf: "center", background: isRunoutSlot3 ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                            </> :
                                            <>
                                                {isStakeNowSlot3 !== null && ((gasselected === "ENGY" && Number(engyBalance) >= 24)) ?
                                                    <>
                                                        {allPowerSlot3 !== 0 ?
                                                            <div style={{alignSelf: "center"}} className="button" onClick={refuelStake(2)}>REFUEL GAS</div> :
                                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                        }
                                                    </> :
                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                }
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                            </>
                                        }
                                    </div> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot3 !== null ?
                                    <img src={cardWeaponSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlot3Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlot3Level}</div>}
                                {jewelSlot3 !== null ?
                                    <img src={jewelSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlot3Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlot3Level}</div>}
                                {cardShieldSlot3 !== null ?
                                    <img src={cardShieldSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlot3Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlot3Level}</div>}
                                {daemonSlot3 !== null ?
                                    <img src={daemonSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlot3Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlot3Level}</div>}
                                {cardAccessorySlot3 !== null ?
                                    <img src={cardAccessorySlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlot3Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlot3Level}</div>}
                                {talismanTwoSlot3 !== null ?
                                    <img src={talismanTwoSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlot3Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlot3Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot3 !== null ?
                                    <img src={weaponOneSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlot3Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlot3Level}</div>}
                                {weaponTwoSlot3 !== null ?
                                    <img src={weaponTwoSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlot3Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlot3Level}</div>}
                                {shieldSlot3 !== null ?
                                    <img src={shieldSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlot3Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlot3Level}</div>}
                                {wingSlot3 !== null ?
                                    <img src={wingSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlot3Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlot3Level}</div>}
                                {accessorySlot3 !== null ?
                                    <img src={accessorySlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlot3Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlot3Level}</div>}
                                {talismanOneSlot3 !== null ?
                                    <img src={talismanOneSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlot3Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlot3Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 3</div>
                                {nft.length > 0 ?
                                    <>
                                        {charSlot3 !== null ?
                                            <img src={charSlot3} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {charSlot3Level !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{charSlot3Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot3 !== null ?
                                    <img src={headUpperSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlot3Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlot3Level}</div>}
                                {headMiddleSlot3 !== null ?
                                    <img src={headMiddleSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlot3Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlot3Level}</div>}
                                {headLowerSlot3 !== null ?
                                    <img src={headLowerSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlot3Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlot3Level}</div>}
                                {armorSlot3 !== null ?
                                    <img src={armorSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlot3Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlot3Level}</div>}
                                {garmentSlot3 !== null ?
                                    <img src={garmentSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlot3Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlot3Level}</div>}
                                {footgearSlot3 !== null ?
                                    <img src={footgearSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlot3Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlot3Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot3 !== null ?
                                    <img src={cardHeadUpperSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlot3Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlot3Level}</div>}
                                {cardHeadMiddleSlot3 !== null ?
                                    <img src={cardHeadMiddleSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlot3Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlot3Level}</div>}
                                {cardHeadLowerSlot3 !== null ?
                                    <img src={cardHeadLowerSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlot3Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlot3Level}</div>}
                                {cardArmorSlot3 !== null ?
                                    <img src={cardArmorSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlot3Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlot3Level}</div>}
                                {cardGarmentSlot3 !== null ?
                                    <img src={cardGarmentSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlot3Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlot3Level}</div>}
                                {cardFootgearSlot3 !== null ?
                                    <img src={cardFootgearSlot3} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlot3Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlot3Level}</div>}
                            </div>
                        </div>
                        {/*
                        ░██████╗██╗░░░░░░█████╗░████████╗░░██╗██╗
                        ██╔════╝██║░░░░░██╔══██╗╚══██╔══╝░██╔╝██║
                        ╚█████╗░██║░░░░░██║░░██║░░░██║░░░██╔╝░██║
                        ░╚═══██╗██║░░░░░██║░░██║░░░██║░░░███████║
                        ██████╔╝███████╗╚█████╔╝░░░██║░░░╚════██║
                        ╚═════╝░╚══════╝░╚════╝░░░░╚═╝░░░░░░░░╚═╝
                        */}
                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{background: "rgb(194, 155, 231)", color: "#fff", position: "relative", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>SLOT 4 STAKING</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        {isStakeNowSlot4 ?
                                            <>
                                                {isRunoutSlot4 ?
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
                                                {!isStakeNowSlot4 &&
                                                    <>
                                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Available for stake</div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    {address !== undefined ?
                                        <>ADDRESS <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></> :
                                        <>ADDRESS <div>-</div></>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    TOTAL POWER PER SEC
                                    <div>{Number(allPowerSlot4).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE BALANCE
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE PENDING
                                    <div style={{display: "flex", flexDirection: "row", color: timeToRunoutSlot4 !== 0 && timeToRunoutSlot4 !== null  ? "#ff007a" : "#5f6476"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemPendingSlot4).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GAS USAGE
                                    <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="ENGY">$ENGY</option>
                                    </select>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        {gasselected === "ENGY" &&
                                            <>
                                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYyCnpA39K7F7iu9BR9YdPJTfXfzzFVhQuu4RT1y7XffB" height="20" alt="$ENGY"/>
                                                <div style={{marginLeft: "5px"}}>{Number(engyBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                            </>
                                        }
                                        <div style={{marginLeft: "5px"}}>/24</div>
                                    </div>
                                </div>
                                {isStakeNowSlot4 ?
                                    <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT AT <div>{timeToRunoutSlot4}</div></div>
                                    : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT IN <div>1 day</div></div>
                                }
                                {address !== undefined && address === youraddr ?
                                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        {isStakeNowSlot4 ?
                                            <>
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                <div style={{alignSelf: "center", background: isRunoutSlot4 ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                            </> :
                                            <>
                                                {isStakeNowSlot4 !== null && ((gasselected === "ENGY" && Number(engyBalance) >= 24)) ?
                                                    <>
                                                        {allPowerSlot4 !== 0 ?
                                                            <div style={{alignSelf: "center"}} className="button" onClick={refuelStake(3)}>REFUEL GAS</div> :
                                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                        }
                                                    </> :
                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                }
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                            </>
                                        }
                                    </div> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot4 !== null ?
                                    <img src={cardWeaponSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlot4Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlot4Level}</div>}
                                {jewelSlot4 !== null ?
                                    <img src={jewelSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlot4Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlot4Level}</div>}
                                {cardShieldSlot4 !== null ?
                                    <img src={cardShieldSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlot4Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlot4Level}</div>}
                                {daemonSlot4 !== null ?
                                    <img src={daemonSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlot4Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlot4Level}</div>}
                                {cardAccessorySlot4 !== null ?
                                    <img src={cardAccessorySlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlot4Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlot4Level}</div>}
                                {talismanTwoSlot4 !== null ?
                                    <img src={talismanTwoSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlot4Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlot4Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot4 !== null ?
                                    <img src={weaponOneSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlot4Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlot4Level}</div>}
                                {weaponTwoSlot4 !== null ?
                                    <img src={weaponTwoSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlot4Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlot4Level}</div>}
                                {shieldSlot4 !== null ?
                                    <img src={shieldSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlot4Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlot4Level}</div>}
                                {wingSlot4 !== null ?
                                    <img src={wingSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlot4Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlot4Level}</div>}
                                {accessorySlot4 !== null ?
                                    <img src={accessorySlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlot4Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlot4Level}</div>}
                                {talismanOneSlot4 !== null ?
                                    <img src={talismanOneSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlot4Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlot4Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 4</div>
                                {nft.length > 0 ?
                                    <>
                                        {charSlot4 !== null ?
                                            <img src={charSlot4} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {charSlot4Level !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{charSlot4Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot4 !== null ?
                                    <img src={headUpperSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlot4Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlot4Level}</div>}
                                {headMiddleSlot4 !== null ?
                                    <img src={headMiddleSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlot4Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlot4Level}</div>}
                                {headLowerSlot4 !== null ?
                                    <img src={headLowerSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlot4Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlot4Level}</div>}
                                {armorSlot4 !== null ?
                                    <img src={armorSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlot4Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlot4Level}</div>}
                                {garmentSlot4 !== null ?
                                    <img src={garmentSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlot4Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlot4Level}</div>}
                                {footgearSlot4 !== null ?
                                    <img src={footgearSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlot4Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlot4Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot4 !== null ?
                                    <img src={cardHeadUpperSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlot4Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlot4Level}</div>}
                                {cardHeadMiddleSlot4 !== null ?
                                    <img src={cardHeadMiddleSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlot4Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlot4Level}</div>}
                                {cardHeadLowerSlot4 !== null ?
                                    <img src={cardHeadLowerSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlot4Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlot4Level}</div>}
                                {cardArmorSlot4 !== null ?
                                    <img src={cardArmorSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlot4Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlot4Level}</div>}
                                {cardGarmentSlot4 !== null ?
                                    <img src={cardGarmentSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlot4Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlot4Level}</div>}
                                {cardFootgearSlot4 !== null ?
                                    <img src={cardFootgearSlot4} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlot4Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlot4Level}</div>}
                            </div>
                        </div>
                        {/*
                        ░██████╗██╗░░░░░░█████╗░████████╗███████╗
                        ██╔════╝██║░░░░░██╔══██╗╚══██╔══╝██╔════╝
                        ╚█████╗░██║░░░░░██║░░██║░░░██║░░░██████╗░
                        ░╚═══██╗██║░░░░░██║░░██║░░░██║░░░╚════██╗
                        ██████╔╝███████╗╚█████╔╝░░░██║░░░██████╔╝
                        ╚═════╝░╚══════╝░╚════╝░░░░╚═╝░░░╚═════╝░
                        */}
                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{background: "rgb(194, 155, 231)", color: "#fff", position: "relative", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>SLOT 5 STAKING</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        {isStakeNowSlot5 ?
                                            <>
                                                {isRunoutSlot5 ?
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
                                                {!isStakeNowSlot5 &&
                                                    <>
                                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Available for stake</div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    {address !== undefined ?
                                        <>ADDRESS <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></> :
                                        <>ADDRESS <div>-</div></>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    TOTAL POWER PER SEC
                                    <div>{Number(allPowerSlot5).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE BALANCE
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE PENDING
                                    <div style={{display: "flex", flexDirection: "row", color: timeToRunoutSlot5 !== 0 && timeToRunoutSlot5 !== null  ? "#ff007a" : "#5f6476"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemPendingSlot5).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GAS USAGE
                                    <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="ENGY">$ENGY</option>
                                    </select>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        {gasselected === "ENGY" &&
                                            <>
                                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYyCnpA39K7F7iu9BR9YdPJTfXfzzFVhQuu4RT1y7XffB" height="20" alt="$ENGY"/>
                                                <div style={{marginLeft: "5px"}}>{Number(engyBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                            </>
                                        }
                                        <div style={{marginLeft: "5px"}}>/24</div>
                                    </div>
                                </div>
                                {isStakeNowSlot5 ?
                                    <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT AT <div>{timeToRunoutSlot5}</div></div>
                                    : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT IN <div>1 day</div></div>
                                }
                                {address !== undefined && address === youraddr ?
                                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        {isStakeNowSlot5 ?
                                            <>
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                <div style={{alignSelf: "center", background: isRunoutSlot5 ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                            </> :
                                            <>
                                                {isStakeNowSlot5 !== null && ((gasselected === "ENGY" && Number(engyBalance) >= 24)) ?
                                                    <>
                                                        {allPowerSlot5 !== 0 ?
                                                            <div style={{alignSelf: "center"}} className="button" onClick={refuelStake(4)}>REFUEL GAS</div> :
                                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                        }
                                                    </> :
                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                }
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                            </>
                                        }
                                    </div> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot5 !== null ?
                                    <img src={cardWeaponSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlot5Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlot5Level}</div>}
                                {jewelSlot5 !== null ?
                                    <img src={jewelSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlot5Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlot5Level}</div>}
                                {cardShieldSlot5 !== null ?
                                    <img src={cardShieldSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlot5Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlot5Level}</div>}
                                {daemonSlot5 !== null ?
                                    <img src={daemonSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlot5Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlot5Level}</div>}
                                {cardAccessorySlot5 !== null ?
                                    <img src={cardAccessorySlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlot5Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlot5Level}</div>}
                                {talismanTwoSlot5 !== null ?
                                    <img src={talismanTwoSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlot5Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlot5Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot5 !== null ?
                                    <img src={weaponOneSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlot5Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlot5Level}</div>}
                                {weaponTwoSlot5 !== null ?
                                    <img src={weaponTwoSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlot5Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlot5Level}</div>}
                                {shieldSlot5 !== null ?
                                    <img src={shieldSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlot5Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlot5Level}</div>}
                                {wingSlot5 !== null ?
                                    <img src={wingSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlot5Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlot5Level}</div>}
                                {accessorySlot5 !== null ?
                                    <img src={accessorySlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlot5Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlot5Level}</div>}
                                {talismanOneSlot5 !== null ?
                                    <img src={talismanOneSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlot5Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlot5Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 5</div>
                                {nft.length > 0 ?
                                    <>
                                        {charSlot5 !== null ?
                                            <img src={charSlot5} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {charSlot5Level !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{charSlot5Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot5 !== null ?
                                    <img src={headUpperSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlot5Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlot5Level}</div>}
                                {headMiddleSlot5 !== null ?
                                    <img src={headMiddleSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlot5Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlot5Level}</div>}
                                {headLowerSlot5 !== null ?
                                    <img src={headLowerSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlot5Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlot5Level}</div>}
                                {armorSlot5 !== null ?
                                    <img src={armorSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlot5Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlot5Level}</div>}
                                {garmentSlot5 !== null ?
                                    <img src={garmentSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlot5Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlot5Level}</div>}
                                {footgearSlot5 !== null ?
                                    <img src={footgearSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlot5Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlot5Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot5 !== null ?
                                    <img src={cardHeadUpperSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlot5Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlot5Level}</div>}
                                {cardHeadMiddleSlot5 !== null ?
                                    <img src={cardHeadMiddleSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlot5Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlot5Level}</div>}
                                {cardHeadLowerSlot5 !== null ?
                                    <img src={cardHeadLowerSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlot5Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlot5Level}</div>}
                                {cardArmorSlot5 !== null ?
                                    <img src={cardArmorSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlot5Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlot5Level}</div>}
                                {cardGarmentSlot5 !== null ?
                                    <img src={cardGarmentSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlot5Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlot5Level}</div>}
                                {cardFootgearSlot5 !== null ?
                                    <img src={cardFootgearSlot5} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlot5Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlot5Level}</div>}
                            </div>
                        </div>
                        {/*
                        ░██████╗██╗░░░░░░█████╗░████████╗░█████╗░
                        ██╔════╝██║░░░░░██╔══██╗╚══██╔══╝██╔═══╝░
                        ╚█████╗░██║░░░░░██║░░██║░░░██║░░░██████╗░
                        ░╚═══██╗██║░░░░░██║░░██║░░░██║░░░██╔══██╗
                        ██████╔╝███████╗╚█████╔╝░░░██║░░░╚█████╔╝
                        ╚═════╝░╚══════╝░╚════╝░░░░╚═╝░░░░╚════╝░
                        */}
                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{background: "rgb(194, 155, 231)", color: "#fff", position: "relative", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>SLOT 6 STAKING</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        {isStakeNowSlot6 ?
                                            <>
                                                {isRunoutSlot6 ?
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
                                                {!isStakeNowSlot6 &&
                                                    <>
                                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Available for stake</div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    {address !== undefined ?
                                        <>ADDRESS <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></> :
                                        <>ADDRESS <div>-</div></>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    TOTAL POWER PER SEC
                                    <div>{Number(allPowerSlot6).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE BALANCE
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE PENDING
                                    <div style={{display: "flex", flexDirection: "row", color: timeToRunoutSlot6 !== 0 && timeToRunoutSlot6 !== null  ? "#ff007a" : "#5f6476"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemPendingSlot6).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GAS USAGE
                                    <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="ENGY">$ENGY</option>
                                    </select>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        {gasselected === "ENGY" &&
                                            <>
                                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYyCnpA39K7F7iu9BR9YdPJTfXfzzFVhQuu4RT1y7XffB" height="20" alt="$ENGY"/>
                                                <div style={{marginLeft: "5px"}}>{Number(engyBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                            </>
                                        }
                                        <div style={{marginLeft: "5px"}}>/24</div>
                                    </div>
                                </div>
                                {isStakeNowSlot6 ?
                                    <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT AT <div>{timeToRunoutSlot6}</div></div>
                                    : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT IN <div>1 day</div></div>
                                }
                                {address !== undefined && address === youraddr ?
                                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        {isStakeNowSlot6 ?
                                            <>
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                <div style={{alignSelf: "center", background: isRunoutSlot6 ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                            </> :
                                            <>
                                                {isStakeNowSlot6 !== null && ((gasselected === "ENGY" && Number(engyBalance) >= 24)) ?
                                                    <>
                                                        {allPowerSlot6 !== 0 ?
                                                            <div style={{alignSelf: "center"}} className="button" onClick={refuelStake(5)}>REFUEL GAS</div> :
                                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                        }
                                                    </> :
                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                }
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                            </>
                                        }
                                    </div> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot6 !== null ?
                                    <img src={cardWeaponSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlot6Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlot6Level}</div>}
                                {jewelSlot6 !== null ?
                                    <img src={jewelSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlot6Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlot6Level}</div>}
                                {cardShieldSlot6 !== null ?
                                    <img src={cardShieldSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlot6Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlot6Level}</div>}
                                {daemonSlot6 !== null ?
                                    <img src={daemonSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlot6Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlot6Level}</div>}
                                {cardAccessorySlot6 !== null ?
                                    <img src={cardAccessorySlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlot6Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlot6Level}</div>}
                                {talismanTwoSlot6 !== null ?
                                    <img src={talismanTwoSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlot6Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlot6Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot6 !== null ?
                                    <img src={weaponOneSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlot6Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlot6Level}</div>}
                                {weaponTwoSlot6 !== null ?
                                    <img src={weaponTwoSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlot6Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlot6Level}</div>}
                                {shieldSlot6 !== null ?
                                    <img src={shieldSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlot6Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlot6Level}</div>}
                                {wingSlot6 !== null ?
                                    <img src={wingSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlot6Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlot6Level}</div>}
                                {accessorySlot6 !== null ?
                                    <img src={accessorySlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlot6Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlot6Level}</div>}
                                {talismanOneSlot6 !== null ?
                                    <img src={talismanOneSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlot6Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlot6Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 6</div>
                                {nft.length > 0 ?
                                    <>
                                        {charSlot6 !== null ?
                                            <img src={charSlot6} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {charSlot6Level !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{charSlot6Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot6 !== null ?
                                    <img src={headUpperSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlot6Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlot6Level}</div>}
                                {headMiddleSlot6 !== null ?
                                    <img src={headMiddleSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlot6Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlot6Level}</div>}
                                {headLowerSlot6 !== null ?
                                    <img src={headLowerSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlot6Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlot6Level}</div>}
                                {armorSlot6 !== null ?
                                    <img src={armorSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlot6Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlot6Level}</div>}
                                {garmentSlot6 !== null ?
                                    <img src={garmentSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlot6Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlot6Level}</div>}
                                {footgearSlot6 !== null ?
                                    <img src={footgearSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlot6Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlot6Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot6 !== null ?
                                    <img src={cardHeadUpperSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlot6Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlot6Level}</div>}
                                {cardHeadMiddleSlot6 !== null ?
                                    <img src={cardHeadMiddleSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlot6Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlot6Level}</div>}
                                {cardHeadLowerSlot6 !== null ?
                                    <img src={cardHeadLowerSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlot6Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlot6Level}</div>}
                                {cardArmorSlot6 !== null ?
                                    <img src={cardArmorSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlot6Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlot6Level}</div>}
                                {cardGarmentSlot6 !== null ?
                                    <img src={cardGarmentSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlot6Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlot6Level}</div>}
                                {cardFootgearSlot6 !== null ?
                                    <img src={cardFootgearSlot6} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlot6Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlot6Level}</div>}
                            </div>
                        </div>
                        {/*
                        ░██████╗██╗░░░░░░█████╗░████████╗███████╗
                        ██╔════╝██║░░░░░██╔══██╗╚══██╔══╝╚════██║
                        ╚█████╗░██║░░░░░██║░░██║░░░██║░░░░░░░██╔╝
                        ░╚═══██╗██║░░░░░██║░░██║░░░██║░░░░░░██╔╝░
                        ██████╔╝███████╗╚█████╔╝░░░██║░░░░░██╔╝░░
                        ╚═════╝░╚══════╝░╚════╝░░░░╚═╝░░░░░╚═╝░░░
                        */}
                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{background: "rgb(194, 155, 231)", color: "#fff", position: "relative", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>SLOT 7 STAKING</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        {isStakeNowSlot7 ?
                                            <>
                                                {isRunoutSlot7 ?
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
                                                {!isStakeNowSlot7 &&
                                                    <>
                                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Available for stake</div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    {address !== undefined ?
                                        <>ADDRESS <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></> :
                                        <>ADDRESS <div>-</div></>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    TOTAL POWER PER SEC
                                    <div>{Number(allPowerSlot7).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE BALANCE
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE PENDING
                                    <div style={{display: "flex", flexDirection: "row", color: timeToRunoutSlot7 !== 0 && timeToRunoutSlot7 !== null  ? "#ff007a" : "#5f6476"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemPendingSlot7).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GAS USAGE
                                    <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="ENGY">$ENGY</option>
                                    </select>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        {gasselected === "ENGY" &&
                                            <>
                                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYyCnpA39K7F7iu9BR9YdPJTfXfzzFVhQuu4RT1y7XffB" height="20" alt="$ENGY"/>
                                                <div style={{marginLeft: "5px"}}>{Number(engyBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                            </>
                                        }
                                        <div style={{marginLeft: "5px"}}>/24</div>
                                    </div>
                                </div>
                                {isStakeNowSlot7 ?
                                    <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT AT <div>{timeToRunoutSlot7}</div></div>
                                    : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT IN <div>1 day</div></div>
                                }
                                {address !== undefined && address === youraddr ?
                                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        {isStakeNowSlot7 ?
                                            <>
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                <div style={{alignSelf: "center", background: isRunoutSlot7 ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                            </> :
                                            <>
                                                {isStakeNowSlot7 !== null && ((gasselected === "ENGY" && Number(engyBalance) >= 24)) ?
                                                    <>
                                                        {allPowerSlot7 !== 0 ?
                                                            <div style={{alignSelf: "center"}} className="button" onClick={refuelStake(6)}>REFUEL GAS</div> :
                                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                        }
                                                    </> :
                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                }
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                            </>
                                        }
                                    </div> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot7 !== null ?
                                    <img src={cardWeaponSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlot7Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlot7Level}</div>}
                                {jewelSlot7 !== null ?
                                    <img src={jewelSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlot7Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlot7Level}</div>}
                                {cardShieldSlot7 !== null ?
                                    <img src={cardShieldSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlot7Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlot7Level}</div>}
                                {daemonSlot7 !== null ?
                                    <img src={daemonSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlot7Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlot7Level}</div>}
                                {cardAccessorySlot7 !== null ?
                                    <img src={cardAccessorySlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlot7Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlot7Level}</div>}
                                {talismanTwoSlot7 !== null ?
                                    <img src={talismanTwoSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlot7Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlot7Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot7 !== null ?
                                    <img src={weaponOneSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlot7Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlot7Level}</div>}
                                {weaponTwoSlot7 !== null ?
                                    <img src={weaponTwoSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlot7Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlot7Level}</div>}
                                {shieldSlot7 !== null ?
                                    <img src={shieldSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlot7Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlot7Level}</div>}
                                {wingSlot7 !== null ?
                                    <img src={wingSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlot7Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlot7Level}</div>}
                                {accessorySlot7 !== null ?
                                    <img src={accessorySlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlot7Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlot7Level}</div>}
                                {talismanOneSlot7 !== null ?
                                    <img src={talismanOneSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlot7Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlot7Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 7</div>
                                {nft.length > 0 ?
                                    <>
                                        {charSlot7 !== null ?
                                            <img src={charSlot7} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {charSlot7Level !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{charSlot7Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot7 !== null ?
                                    <img src={headUpperSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlot7Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlot7Level}</div>}
                                {headMiddleSlot7 !== null ?
                                    <img src={headMiddleSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlot7Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlot7Level}</div>}
                                {headLowerSlot7 !== null ?
                                    <img src={headLowerSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlot7Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlot7Level}</div>}
                                {armorSlot7 !== null ?
                                    <img src={armorSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlot7Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlot7Level}</div>}
                                {garmentSlot7 !== null ?
                                    <img src={garmentSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlot7Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlot7Level}</div>}
                                {footgearSlot7 !== null ?
                                    <img src={footgearSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlot7Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlot7Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot7 !== null ?
                                    <img src={cardHeadUpperSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlot7Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlot7Level}</div>}
                                {cardHeadMiddleSlot7 !== null ?
                                    <img src={cardHeadMiddleSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlot7Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlot7Level}</div>}
                                {cardHeadLowerSlot7 !== null ?
                                    <img src={cardHeadLowerSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlot7Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlot7Level}</div>}
                                {cardArmorSlot7 !== null ?
                                    <img src={cardArmorSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlot7Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlot7Level}</div>}
                                {cardGarmentSlot7 !== null ?
                                    <img src={cardGarmentSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlot7Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlot7Level}</div>}
                                {cardFootgearSlot7 !== null ?
                                    <img src={cardFootgearSlot7} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlot7Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlot7Level}</div>}
                            </div>
                        </div>
                        {/*
                        ░██████╗██╗░░░░░░█████╗░████████╗░█████╗░
                        ██╔════╝██║░░░░░██╔══██╗╚══██╔══╝██╔══██╗
                        ╚█████╗░██║░░░░░██║░░██║░░░██║░░░╚█████╔╝
                        ░╚═══██╗██║░░░░░██║░░██║░░░██║░░░██╔══██╗
                        ██████╔╝███████╗╚█████╔╝░░░██║░░░╚█████╔╝
                        ╚═════╝░╚══════╝░╚════╝░░░░╚═╝░░░░╚════╝░
                        */}
                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{background: "rgb(194, 155, 231)", color: "#fff", position: "relative", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>SLOT 8 STAKING</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        {isStakeNowSlot8 ?
                                            <>
                                                {isRunoutSlot8 ?
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
                                                {!isStakeNowSlot8 &&
                                                    <>
                                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Available for stake</div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    {address !== undefined ?
                                        <>ADDRESS <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></> :
                                        <>ADDRESS <div>-</div></>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    TOTAL POWER PER SEC
                                    <div>{Number(allPowerSlot8).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE BALANCE
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE PENDING
                                    <div style={{display: "flex", flexDirection: "row", color: timeToRunoutSlot8 !== 0 && timeToRunoutSlot8 !== null  ? "#ff007a" : "#5f6476"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemPendingSlot8).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GAS USAGE
                                    <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="ENGY">$ENGY</option>
                                    </select>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        {gasselected === "ENGY" &&
                                            <>
                                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYyCnpA39K7F7iu9BR9YdPJTfXfzzFVhQuu4RT1y7XffB" height="20" alt="$ENGY"/>
                                                <div style={{marginLeft: "5px"}}>{Number(engyBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                            </>
                                        }
                                        <div style={{marginLeft: "5px"}}>/24</div>
                                    </div>
                                </div>
                                {isStakeNowSlot8 ?
                                    <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT AT <div>{timeToRunoutSlot8}</div></div>
                                    : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT IN <div>1 day</div></div>
                                }
                                {address !== undefined && address === youraddr ?
                                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        {isStakeNowSlot8 ?
                                            <>
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                <div style={{alignSelf: "center", background: isRunoutSlot8 ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                            </> :
                                            <>
                                                {isStakeNowSlot8 !== null && ((gasselected === "ENGY" && Number(engyBalance) >= 24)) ?
                                                    <>
                                                        {allPowerSlot8 !== 0 ?
                                                            <div style={{alignSelf: "center"}} className="button" onClick={refuelStake(7)}>REFUEL GAS</div> :
                                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                        }
                                                    </> :
                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                }
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                            </>
                                        }
                                    </div> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot8 !== null ?
                                    <img src={cardWeaponSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlot8Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlot8Level}</div>}
                                {jewelSlot8 !== null ?
                                    <img src={jewelSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlot8Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlot8Level}</div>}
                                {cardShieldSlot8 !== null ?
                                    <img src={cardShieldSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlot8Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlot8Level}</div>}
                                {daemonSlot8 !== null ?
                                    <img src={daemonSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlot8Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlot8Level}</div>}
                                {cardAccessorySlot8 !== null ?
                                    <img src={cardAccessorySlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlot8Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlot8Level}</div>}
                                {talismanTwoSlot8 !== null ?
                                    <img src={talismanTwoSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlot8Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlot8Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot8 !== null ?
                                    <img src={weaponOneSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlot8Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlot8Level}</div>}
                                {weaponTwoSlot8 !== null ?
                                    <img src={weaponTwoSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlot8Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlot8Level}</div>}
                                {shieldSlot8 !== null ?
                                    <img src={shieldSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlot8Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlot8Level}</div>}
                                {wingSlot8 !== null ?
                                    <img src={wingSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlot8Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlot8Level}</div>}
                                {accessorySlot8 !== null ?
                                    <img src={accessorySlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlot8Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlot8Level}</div>}
                                {talismanOneSlot8 !== null ?
                                    <img src={talismanOneSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlot8Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlot8Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 8</div>
                                {nft.length > 0 ?
                                    <>
                                        {charSlot8 !== null ?
                                            <img src={charSlot8} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {charSlot8Level !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{charSlot8Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot8 !== null ?
                                    <img src={headUpperSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlot8Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlot8Level}</div>}
                                {headMiddleSlot8 !== null ?
                                    <img src={headMiddleSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlot8Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlot8Level}</div>}
                                {headLowerSlot8 !== null ?
                                    <img src={headLowerSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlot8Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlot8Level}</div>}
                                {armorSlot8 !== null ?
                                    <img src={armorSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlot8Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlot8Level}</div>}
                                {garmentSlot8 !== null ?
                                    <img src={garmentSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlot8Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlot8Level}</div>}
                                {footgearSlot8 !== null ?
                                    <img src={footgearSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlot8Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlot8Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot8 !== null ?
                                    <img src={cardHeadUpperSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlot8Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlot8Level}</div>}
                                {cardHeadMiddleSlot8 !== null ?
                                    <img src={cardHeadMiddleSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlot8Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlot8Level}</div>}
                                {cardHeadLowerSlot8 !== null ?
                                    <img src={cardHeadLowerSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlot8Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlot8Level}</div>}
                                {cardArmorSlot8 !== null ?
                                    <img src={cardArmorSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlot8Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlot8Level}</div>}
                                {cardGarmentSlot8 !== null ?
                                    <img src={cardGarmentSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlot8Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlot8Level}</div>}
                                {cardFootgearSlot8 !== null ?
                                    <img src={cardFootgearSlot8} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlot8Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlot8Level}</div>}
                            </div>
                        </div>
                        {/*
                        ░██████╗██╗░░░░░░█████╗░████████╗░█████╗░
                        ██╔════╝██║░░░░░██╔══██╗╚══██╔══╝██╔══██╗
                        ╚█████╗░██║░░░░░██║░░██║░░░██║░░░╚██████║
                        ░╚═══██╗██║░░░░░██║░░██║░░░██║░░░░╚═══██║
                        ██████╔╝███████╗╚█████╔╝░░░██║░░░░█████╔╝
                        ╚═════╝░╚══════╝░╚════╝░░░░╚═╝░░░░╚════╝░
                        */}
                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{background: "rgb(194, 155, 231)", color: "#fff", position: "relative", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>SLOT 9 STAKING</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        {isStakeNowSlot9 ?
                                            <>
                                                {isRunoutSlot9 ?
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
                                                {!isStakeNowSlot9 &&
                                                    <>
                                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Available for stake</div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    {address !== undefined ?
                                        <>ADDRESS <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></> :
                                        <>ADDRESS <div>-</div></>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    TOTAL POWER PER SEC
                                    <div>{Number(allPowerSlot9).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE BALANCE
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE PENDING
                                    <div style={{display: "flex", flexDirection: "row", color: timeToRunoutSlot9 !== 0 && timeToRunoutSlot9 !== null  ? "#ff007a" : "#5f6476"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemPendingSlot9).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GAS USAGE
                                    <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="ENGY">$ENGY</option>
                                    </select>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        {gasselected === "ENGY" &&
                                            <>
                                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYyCnpA39K7F7iu9BR9YdPJTfXfzzFVhQuu4RT1y7XffB" height="20" alt="$ENGY"/>
                                                <div style={{marginLeft: "5px"}}>{Number(engyBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                            </>
                                        }
                                        <div style={{marginLeft: "5px"}}>/24</div>
                                    </div>
                                </div>
                                {isStakeNowSlot9 ?
                                    <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT AT <div>{timeToRunoutSlot9}</div></div>
                                    : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT IN <div>1 day</div></div>
                                }
                                {address !== undefined && address === youraddr ?
                                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        {isStakeNowSlot9 ?
                                            <>
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                <div style={{alignSelf: "center", background: isRunoutSlot9 ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                            </> :
                                            <>
                                                {isStakeNowSlot9 !== null && ((gasselected === "ENGY" && Number(engyBalance) >= 24)) ?
                                                    <>
                                                        {allPowerSlot9 !== 0 ?
                                                            <div style={{alignSelf: "center"}} className="button" onClick={refuelStake(8)}>REFUEL GAS</div> :
                                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                        }
                                                    </> :
                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                }
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                            </>
                                        }
                                    </div> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot9 !== null ?
                                    <img src={cardWeaponSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlot9Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlot9Level}</div>}
                                {jewelSlot9 !== null ?
                                    <img src={jewelSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlot9Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlot9Level}</div>}
                                {cardShieldSlot9 !== null ?
                                    <img src={cardShieldSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlot9Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlot9Level}</div>}
                                {daemonSlot9 !== null ?
                                    <img src={daemonSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlot9Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlot9Level}</div>}
                                {cardAccessorySlot9 !== null ?
                                    <img src={cardAccessorySlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlot9Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlot9Level}</div>}
                                {talismanTwoSlot9 !== null ?
                                    <img src={talismanTwoSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlot9Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlot9Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot9 !== null ?
                                    <img src={weaponOneSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlot9Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlot9Level}</div>}
                                {weaponTwoSlot9 !== null ?
                                    <img src={weaponTwoSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlot9Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlot9Level}</div>}
                                {shieldSlot9 !== null ?
                                    <img src={shieldSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlot9Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlot9Level}</div>}
                                {wingSlot9 !== null ?
                                    <img src={wingSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlot9Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlot9Level}</div>}
                                {accessorySlot9 !== null ?
                                    <img src={accessorySlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlot9Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlot9Level}</div>}
                                {talismanOneSlot9 !== null ?
                                    <img src={talismanOneSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlot9Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlot9Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 9</div>
                                {nft.length > 0 ?
                                    <>
                                        {charSlot9 !== null ?
                                            <img src={charSlot9} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {charSlot9Level !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{charSlot9Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot9 !== null ?
                                    <img src={headUpperSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlot9Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlot9Level}</div>}
                                {headMiddleSlot9 !== null ?
                                    <img src={headMiddleSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlot9Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlot9Level}</div>}
                                {headLowerSlot9 !== null ?
                                    <img src={headLowerSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlot9Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlot9Level}</div>}
                                {armorSlot9 !== null ?
                                    <img src={armorSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlot9Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlot9Level}</div>}
                                {garmentSlot9 !== null ?
                                    <img src={garmentSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlot9Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlot9Level}</div>}
                                {footgearSlot9 !== null ?
                                    <img src={footgearSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlot9Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlot9Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot9 !== null ?
                                    <img src={cardHeadUpperSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlot9Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlot9Level}</div>}
                                {cardHeadMiddleSlot9 !== null ?
                                    <img src={cardHeadMiddleSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlot9Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlot9Level}</div>}
                                {cardHeadLowerSlot9 !== null ?
                                    <img src={cardHeadLowerSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlot9Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlot9Level}</div>}
                                {cardArmorSlot9 !== null ?
                                    <img src={cardArmorSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlot9Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlot9Level}</div>}
                                {cardGarmentSlot9 !== null ?
                                    <img src={cardGarmentSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlot9Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlot9Level}</div>}
                                {cardFootgearSlot9 !== null ?
                                    <img src={cardFootgearSlot9} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlot9Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlot9Level}</div>}
                            </div>
                        </div>
                        {/*
                        ░██████╗██╗░░░░░░█████╗░████████╗██╗░░██╗
                        ██╔════╝██║░░░░░██╔══██╗╚══██╔══╝╚██╗██╔╝
                        ╚█████╗░██║░░░░░██║░░██║░░░██║░░░░╚███╔╝░
                        ░╚═══██╗██║░░░░░██║░░██║░░░██║░░░░██╔██╗░
                        ██████╔╝███████╗╚█████╔╝░░░██║░░░██╔╝╚██╗
                        ╚═════╝░╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░░╚═╝
                        */}
                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{background: "rgb(194, 155, 231)", color: "#fff", position: "relative", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>SLOT X STAKING</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        {isStakeNowSlot10 ?
                                            <>
                                                {isRunoutSlot10 ?
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
                                                {!isStakeNowSlot10 &&
                                                    <>
                                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Available for stake</div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    {address !== undefined ?
                                        <>ADDRESS <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></> :
                                        <>ADDRESS <div>-</div></>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    TOTAL POWER PER SEC
                                    <div>{Number(allPowerSlot10).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE BALANCE
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GEMSTONE PENDING
                                    <div style={{display: "flex", flexDirection: "row", color: timeToRunoutSlot10 !== 0 && timeToRunoutSlot10 !== null  ? "#ff007a" : "#5f6476"}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" height="20" alt="$GEM"/>
                                        <div style={{marginLeft: "5px"}}>{Number(gemPendingSlot10).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GAS USAGE
                                    <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="ENGY">$ENGY</option>
                                    </select>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        {gasselected === "ENGY" &&
                                            <>
                                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYyCnpA39K7F7iu9BR9YdPJTfXfzzFVhQuu4RT1y7XffB" height="20" alt="$ENGY"/>
                                                <div style={{marginLeft: "5px"}}>{Number(engyBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                            </>
                                        }
                                        <div style={{marginLeft: "5px"}}>/24</div>
                                    </div>
                                </div>
                                {isStakeNowSlot10 ?
                                    <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT AT <div>{timeToRunoutSlot10}</div></div>
                                    : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT IN <div>1 day</div></div>
                                }
                                {address !== undefined && address === youraddr ?
                                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        {isStakeNowSlot10 ?
                                            <>
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                <div style={{alignSelf: "center", background: isRunoutSlot10 ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                            </> :
                                            <>
                                                {isStakeNowSlot10 !== null && ((gasselected === "ENGY" && Number(engyBalance) >= 24)) ?
                                                    <>
                                                        {allPowerSlot10 !== 0 ?
                                                            <div style={{alignSelf: "center"}} className="button" onClick={refuelStake(9)}>REFUEL GAS</div> :
                                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                        }
                                                    </> :
                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                }
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                            </>
                                        }
                                    </div> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot10 !== null ?
                                    <img src={cardWeaponSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlot10Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlot10Level}</div>}
                                {jewelSlot10 !== null ?
                                    <img src={jewelSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlot10Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlot10Level}</div>}
                                {cardShieldSlot10 !== null ?
                                    <img src={cardShieldSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlot10Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlot10Level}</div>}
                                {daemonSlot10 !== null ?
                                    <img src={daemonSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlot10Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlot10Level}</div>}
                                {cardAccessorySlot10 !== null ?
                                    <img src={cardAccessorySlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlot10Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlot10Level}</div>}
                                {talismanTwoSlot10 !== null ?
                                    <img src={talismanTwoSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlot10Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlot10Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot10 !== null ?
                                    <img src={weaponOneSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlot10Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlot10Level}</div>}
                                {weaponTwoSlot10 !== null ?
                                    <img src={weaponTwoSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlot10Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlot10Level}</div>}
                                {shieldSlot10 !== null ?
                                    <img src={shieldSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlot10Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlot10Level}</div>}
                                {wingSlot10 !== null ?
                                    <img src={wingSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlot10Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlot10Level}</div>}
                                {accessorySlot10 !== null ?
                                    <img src={accessorySlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlot10Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlot10Level}</div>}
                                {talismanOneSlot10 !== null ?
                                    <img src={talismanOneSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlot10Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlot10Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot X</div>
                                {nft.length > 0 ?
                                    <>
                                        {charSlot10 !== null ?
                                            <img src={charSlot10} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {charSlot10Level !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{charSlot10Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot10 !== null ?
                                    <img src={headUpperSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlot10Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlot10Level}</div>}
                                {headMiddleSlot10 !== null ?
                                    <img src={headMiddleSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlot10Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlot10Level}</div>}
                                {headLowerSlot10 !== null ?
                                    <img src={headLowerSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlot10Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlot10Level}</div>}
                                {armorSlot10 !== null ?
                                    <img src={armorSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlot10Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlot10Level}</div>}
                                {garmentSlot10 !== null ?
                                    <img src={garmentSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlot10Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlot10Level}</div>}
                                {footgearSlot10 !== null ?
                                    <img src={footgearSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlot10Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlot10Level}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot10 !== null ?
                                    <img src={cardHeadUpperSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlot10Level !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlot10Level}</div>}
                                {cardHeadMiddleSlot10 !== null ?
                                    <img src={cardHeadMiddleSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlot10Level !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlot10Level}</div>}
                                {cardHeadLowerSlot10 !== null ?
                                    <img src={cardHeadLowerSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlot10Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlot10Level}</div>}
                                {cardArmorSlot10 !== null ?
                                    <img src={cardArmorSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlot10Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlot10Level}</div>}
                                {cardGarmentSlot10 !== null ?
                                    <img src={cardGarmentSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlot10Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlot10Level}</div>}
                                {cardFootgearSlot10 !== null ?
                                    <img src={cardFootgearSlot10} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlot10Level !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlot10Level}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {nft.length > 0 ?
                <div style={{width: "1650px", marginBottom: "80px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    {nft[0] !== null ?
                        <>
                        {nft.map((item, index) => (
                            <div style={{background: "rgb(230, 250, 54)", border: 0, justifyContent: "space-around", padding: "20px", margin: "10px", minHeight: "400px"}} className="nftCard" key={index}>
                                <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                    <img src={item.Image} height="100%" alt="Can not load metadata." />
                                </div>
                                <div className="emp bold">{item.Name}</div>
                                <div className="bold">{item.RewardPerSec} power per sec</div>
                                <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                {address === youraddr ?
                                    <div style={{width: "80%", display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                                        {item.isStaked ?
                                            <>
                                                <div style={{background: "gray"}} className="pixel button" onClick={() => unstakeNft((item.Slot, item.Id / 100000000000) | 0)}>UNEQUIP SLOT {item.Slot}</div>
                                            </> :
                                            <>
                                                <div style={{marginTop: "5px", alignSelf: "center", background: "gray"}} className="pixel button" onClick={() => transferNFT(item.Col, item.Id)}>TRANSFER</div>
                                                {!isStakeNowSlot1 && <div style={{marginTop: "5px", alignSelf: "center"}} className="pixel button" onClick={() => equipNft(0, item.Id)}>EQUIP SLOT 1</div>}
                                                {!isStakeNowSlot2 && <div style={{marginTop: "5px", alignSelf: "center"}} className="pixel button" onClick={() => equipNft(1, item.Id)}>EQUIP SLOT 2</div>}
                                                {!isStakeNowSlot3 && <div style={{marginTop: "5px", alignSelf: "center"}} className="pixel button" onClick={() => equipNft(2, item.Id)}>EQUIP SLOT 3</div>}
                                                {!isStakeNowSlot4 && <div style={{marginTop: "5px", alignSelf: "center"}} className="pixel button" onClick={() => equipNft(3, item.Id)}>EQUIP SLOT 4</div>}
                                                {!isStakeNowSlot5 && <div style={{marginTop: "5px", alignSelf: "center"}} className="pixel button" onClick={() => equipNft(4, item.Id)}>EQUIP SLOT 5</div>}
                                                {!isStakeNowSlot6 && <div style={{marginTop: "5px", alignSelf: "center"}} className="pixel button" onClick={() => equipNft(5, item.Id)}>EQUIP SLOT 6</div>}
                                                {!isStakeNowSlot7 && <div style={{marginTop: "5px", alignSelf: "center"}} className="pixel button" onClick={() => equipNft(6, item.Id)}>EQUIP SLOT 7</div>}
                                                {!isStakeNowSlot8 && <div style={{marginTop: "5px", alignSelf: "center"}} className="pixel button" onClick={() => equipNft(7, item.Id)}>EQUIP SLOT 8</div>}
                                                {!isStakeNowSlot9 && <div style={{marginTop: "5px", alignSelf: "center"}} className="pixel button" onClick={() => equipNft(8, item.Id)}>EQUIP SLOT 9</div>}
                                                {!isStakeNowSlot10 && <div style={{marginTop: "5px", alignSelf: "center"}} className="pixel button" onClick={() => equipNft(9, item.Id)}>EQUIP SLOT X</div>}
                                            </>
                                        }
                                    </div> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                        ))}
                        </> :
                        <div style={{background: "rgb(230, 250, 54)", border: 0, justifyContent: "center", padding: "20px", margin: "10px"}} className="nftCard">
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
                </div> :
                <div style={{width: "1640px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"}}> 
                    <div className="nftCard" style={{background: "rgb(230, 250, 54)", boxShadow: "none", border: 0, justifyContent: "center"}}>
                        <ThreeDots fill="#5f6476" />
                        <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                    </div>
                </div>
            }
        </div>
    </>
    )
}

export default TheEndlessTower
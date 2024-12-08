import React, { Suspense } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Headbar from './Headbar'
import Home from './Home'

import { erc20Abi, erc721Abi } from 'viem'
import msgABI from './jsons/msgABI.json'
import pve01ABI from './jsons/pve01ABI.json'
import aurora721ABI from './jsons/aurora721ABI.json'
import tunaFieldABI from './jsons/tunaFieldABI.json'
import woodFieldABI from './jsons/woodFieldABI.json'
import thlFieldABI from './jsons/thlFieldABI.json'
import gearFieldABI from './jsons/gearFieldABI.json'
import fieldEfABI from './jsons/fieldEfABI.json'
import fieldDjABI from './jsons/fieldDJABI.json'
import cmdoiFieldABI from './jsons/cmdoiFieldABI.json'
import taoPfpABI from './jsons/taoPfpABI.json'
import cmdsV2ABI from './jsons/cmdsV2ABI.json'
import salmFieldABI from './jsons/salmFieldABI.json'
import stakerMachineABI from './jsons/stakerMachineABI.json'
import diamonLpABI from './jsons/diamonlpABI.json'
import farmCmosABI from './jsons/farmcmosABI.json'
import fieldWoodBBQABI from './jsons/fieldWoodBBQABI.json'
import missionWoodABI from './jsons/missionWoodABI.json'
import statCMDRewardABI from './jsons/statCMDRewardABI.json'
import baseCMDClaimerABI from './jsons/baseCMDClaimerABI.json'
import kycABI from './jsons/kycABI.json'
import ctunaLabABI from './jsons/ctunaLabABI.json'
import sx31LabABI from './jsons/sx31LabABI.json'
import bbqLab01ABI from './jsons/bbqLab01ABI.json'
import pzaLabABI from './jsons/pzaLabABI.json'
import cmdao20lab01ABI from './jsons/cmdao20lab01ABI.json'
import dunJasperABI from './jsons/dunJasperABI.json'
import dunJasperL2ABI from './jsons/dunJasperL2ABI.json'
import dunCopperABI from './jsons/dunCopperABI.json'
import mintStOPTABI from './jsons/mintStOPTABI.json'
import ubbqABI from './jsons/ubbqABI.json'
import dunAngbABI from './jsons/dunAngbABI.json'
import dunEEABI from './jsons/dunEEABI.json'
import uiiABI from './jsons/uiiABI.json'
import uswarABI from './jsons/uswarABI.json'
import dunGEMABI from './jsons/dunGEMABI.json'
import dunMoABI from './jsons/dunMoABI.json'
import badgeClaimerABI from './jsons/badgeClaimerABI.json'
import nftSlotABI from './jsons/nftSlotABI.json'
import partyABI from './jsons/partyABI.json'
import missionCMDBaseABI from './jsons/missionCMDBaseABI.json'
import multichainSlotABI from './jsons/multichainSlotABI.json'
import dunATVABI from './jsons/dunATVABI.json'
import cmdaoMerchantABI from './jsons/cmdaoMerchantABI.json'
import cmdaoMerchantV2ABI from './jsons/cmdaoMerchantV2ABI.json'
import cmdaoMerchantKYCABI from './jsons/cmdaoMerchantKYCABI.json'
import cmdaoMerchantWLABI from './jsons/cmdaoMerchantWLABI.json'
import cmdaoGasha02ABI from './jsons/cmdaoGasha02ABI.json'
import cmdaoMkpABI from './jsons/cmdaoMkpABI.json'
import wlMkpABI from './jsons/wlMkpABI.json'
import ammyStdABI from './jsons/ammyStdABI.json'
import angeloStdABI from './jsons/angeloStdABI.json'
import cmdaoAmmNpcABI from './jsons/cmdaoAmmNpcABI.json'
import wjbcABI from './jsons/wjbcABI.json'
import presaleABI from './jsons/presaleABI.json'
import redeemTokenABI from './jsons/redeemTokenABI.json'
import enchantNABI from './jsons/enchantNABI.json'
import enchantRABI from './jsons/enchantRABI.json'
import uniEnchanterABI from './jsons/uniEnchanterABI.json'
import acUpgradeABI from './jsons/acUpgradeABI.json'
import osABI from './jsons/osABI.json'
import evolutionaryABI from './jsons/evolutionaryABI.json'
import fusionABI from './jsons/fusionABI.json'
import salonABI from './jsons/salonABI.json'
import starterCMDSABI from './jsons/starterCMDSABI.json'
import uplevelCMDSABI from './jsons/uplevelCMDSABI.json'
import cmcityPointsABI from './jsons/cmcityPointsABI.json'
import sx31voteABI from './jsons/sx31voteABI.json'
import faucetABI from './jsons/faucetABI.json'
import cmdaoNameABI from './jsons/cmdaoNameABI.json'
import pvp01ABI from './jsons/pvp01ABI.json'
import quest01ABI from './jsons/quest01ABI.json'
import questAmbassABI from './jsons/questAmbassABI.json'
import enderPotteryABI from './jsons/enderPotteryABI.json'
import slot1ABI from './jsons/slot1ABI.json'
import delegateOwner01ABI from './jsons/delegateOwner01ABI.json'
import houseABI from './jsons/houseABI.json'
import houseStakingABI from './jsons/houseStakingABI.json'
import transportHubABI from './jsons/transportHubABI.json'
import transportHub2ABI from './jsons/transportHub2ABI.json'
import sourceThubABI from './jsons/sourceThubABI.json'
import constructionABI from './jsons/constructionABI.json'
import constructionStakingABI from './jsons/constructionStakingABI.json'
import questBBQABI from './jsons/questBBQABI.json'
import dumpster1ABI from './jsons/dumpster1ABI.json'
import dumpster2ABI from './jsons/dumpster2ABI.json'
import exchangeABI from './jsons/exchangeABI.json'
import exchangeJulpABI from './jsons/exchangeJulpABI.json'
import swapABI from './jsons/swapcallABI.json'
import swapJulpABI from './jsons/swapcallJulpABI.json'
import farmJdaoABI from './jsons/masterchefJdaoABI.json'
import bkcOracleABI from './jsons/bkcOracleABI.json'
import tbridgeNFTABI from './jsons/tbridgeNFTABI.json'
import nativeBridgeABI from './jsons/nativeBridgeABI.json'
import uniTokensBridgeABI from './jsons/uniTokensBridgeABI.json'
import uniNftBridgeABI from './jsons/uniNftBridgeABI.json'
import multichainMallABI from './jsons/multichainMallABI.json'
import veloPoolABI from './jsons/veloPoolABI.json'
import velodromeRouterABI from './jsons/velodromeRouterABI.json'
import velodromeCallerABI from './jsons/velodromeCallerABI.json'
import stcmdABI from './jsons/stcmdABI.json'

import { WagmiProvider } from 'wagmi'
import { optimism, bsc, jbc } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { defineChain } from '@reown/appkit/networks';

const v = '0.5.2'

const Fields = React.lazy(() => import('./Fields'))
const AncientForrest = React.lazy(() => import('./Fields-AncientForrest'))
const TunaLake = React.lazy(() => import('./Fields-TunaLake'))
const OldWarehouse = React.lazy(() => import('./Fields-OldWarehouse'))
const TheHeavenLand = React.lazy(() => import('./Fields-TheHeavenLand'))
const EasternFront = React.lazy(() => import('./Fields-EasternFront'))
const MechHarvestZone = React.lazy(() => import('./Fields-MechHarvestZone'))
const DjMining = React.lazy(() => import('./Fields-DjMining'))
const CommuDOIField = React.lazy(() => import('./Fields-CommuDOI'))
const BKCFields = React.lazy(() => import('./BKC-Fields'))
const BadMuseum = React.lazy(() => import('./BKC-Fields-BadMuseum'))
const FraserRiver = React.lazy(() => import('./BKC-Fields-FraserRiver'))
const BBQFields = React.lazy(() => import('./BBQ-Fields'))
const BBQAncientForrest = React.lazy(() => import('./BBQ-Fields-AncientForrest'))
const OPFields = React.lazy(() => import('./OP-Fields'))
const Labs = React.lazy(() => import('./Labs'))
const BKCLabs = React.lazy(() => import('./BKC-Labs'))
const BBQLabs = React.lazy(() => import('./BBQ-Labs'))
const OPLabs = React.lazy(() => import('./OP-Labs'))
const Dungeon = React.lazy(() => import('./Dungeon'))
const Coppermine = React.lazy(() => import('./Dungeon-CopperMine'))
const Jaspercave = React.lazy(() => import('./Dungeon-JasperCave'))
const Memeticorbit = React.lazy(() => import('./Dungeon-MemeticOrbit'))
const Npcblacksmith = React.lazy(() => import('./Dungeon-Blacksmith'))
const NpcEvolutionary = React.lazy(() => import('./Dungeon-Evolutionary'))
const Daemonworld = React.lazy(() => import('./Dungeon-DaemonWorld'))
const ApInn = React.lazy(() => import('./Dungeon-ApInn'))
const CrypticCogs = React.lazy(() => import('./Dungeon-CrypticCogs'))
const TdmRoboticsInc = React.lazy(() => import('./Dungeon-TdmRoboticsInc.js'))
const BBQDungeon = React.lazy(() => import('./BBQ-Dungeon'))
const TheEndlessTower = React.lazy(() => import('./Dungeon-TheEndlessTower.js'))
const OPDungeon = React.lazy(() => import('./OP-Dungeon'))
const AbandonedTempleVault = React.lazy(() => import('./OP-Dungeon-AbandonedTempleVault.js'))
const Guild = React.lazy(() => import('./Guild'))
const Community = React.lazy(() => import('./Community'))
const CmCityLand = React.lazy(() => import('./Community-CmCityLand'))
const CmCityCenter = React.lazy(() => import('./Community-CmCityCenter'))
const QuesterOasis = React.lazy(() => import('./Community-QuesterOasis.tsx'))
const DungeonArena = React.lazy(() => import('./Community-DungeonArena'))
const DumpsterHill = React.lazy(() => import('./Community-DumpsterHill'))
const BigBroAnalytica = React.lazy(() => import('./Community-BigBroAnalytica.tsx'))
const Mall = React.lazy(() => import('./Mall'))
const OPMall = React.lazy(() => import('./OP-Mall'))
const Mkp = React.lazy(() => import('./Mkp.tsx'))
const GameSwap = React.lazy(() => import('./GameSwap'))
const BKCGameSwap = React.lazy(() => import('./BKC-GameSwap'))
const OpGameSwap = React.lazy(() => import('./OP-GameSwap'))
const TBridge = React.lazy(() => import('./tBridge'))

const bkc = defineChain({
    id: 96,
    caipNetworkId: 'eip155:96',
    chainNamespace: 'eip155',
    name: 'Bitkub Chain',
    nativeCurrency: {
      decimals: 18,
      name: 'Bitkub',
      symbol: 'KUB',
    },
    rpcUrls: {
      default: {
        http: ['https://rpc.bitkubchain.io'],
        webSocket: ['https://rpc.bitkubchain.io'],
      },
    },
    blockExplorers: {
      default: { name: 'Bkcscan', url: 'https://www.bkcscan.com' },
    },
})

const bbqchain = defineChain({
    id: 190,
    caipNetworkId: 'eip155:190',
    chainNamespace: 'eip155',
    name: 'CMDAO BBQ Chain',
    nativeCurrency: {
      decimals: 18,
      name: 'CMD',
      symbol: 'CMD',
    },
    rpcUrls: {
      default: {
        http: ['https://bbqchain-rpc.commudao.xyz'],
        webSocket: ['https://bbqchain-rpc.commudao.xyz'],
      },
    },
    blockExplorers: {
      default: { name: 'CMDAO BBQ Chain Explorer', url: 'https://bbqchain-exp.commudao.xyz' },
    },
})

const projectId = '7bc383f9e6957c93f54da557603631b4'
const queryClient = new QueryClient()

const wagmiAdapter = new WagmiAdapter({
    networks: [jbc, bkc, bbqchain, optimism, bsc],
    projectId,
    ssr: true
})

createAppKit({
    adapters: [wagmiAdapter],
    networks: [jbc, bkc, bbqchain, optimism, bsc],
    projectId,
    themeMode: 'light',
    themeVariables: {
        '--w3m-accent': '#ff007a',
        '--w3m-font-family': 'Inter',
        '--w3m-font-size-master': '8px',
        '--w3m-z-index': 1000, 
    },
    chainImages: {
        56: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibujxj6b6i3n4xtdywo3dp33hhdf6yilwkx42cmm4goxpduy5mvte?img-width=100&img-height=100',
        96: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreien2xny3ki3a4qqfem74vvucreppp6rpe7biozr4jiaom7shmv47a?img-width=100&img-height=100',
        8899: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreihdmsnmmzhepcfxuvoflht2iqv5w73hg5kbgrc33jrhk7il5ddpgu?img-width=100&img-height=100',
        190: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibohxkmaxa3h2pln37pasuppobhqoilncvtxnk7k7oaid7fqyg5ce?img-width=100&img-height=100',
        10: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreid53xlgsjlqosyyyxzbozfavoi2f4i6vnqxjwdxq32y7jsly3ckly?img-width=100&img-height=100',
    },
    features: {
        analytics: true,
    }
})

const Main = () => {    
    const navigate = useNavigate()
    const { modeText, subModeText, intrasubModetext } = useParams()
    let preset = 0
    if (modeText !== undefined) {
        if (modeText.toUpperCase() === "FIELDS") {
            if (subModeText !== undefined) {
                if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "TUNA-LAKE") {
                    preset = 11
                    document.title = "Tuna Lake | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "OLD-WAREHOUSE") {
                    preset = 12
                    document.title = "Old Warehouse | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "ANCIENT-FOREST") {
                    preset = 13
                    document.title = "Ancient Forest | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "THE-HEAVEN-LAND") {
                    preset = 17
                    document.title = "The Heaven Land | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "EASTERN-FRONT") {
                    preset = 19
                    document.title = "Eastern Front | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "MECH-HARVEST-ZONE") {
                    preset = 100
                    document.title = "Mech Harvest Zone | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "DOIJIB-MINING") {
                    preset = 101
                    document.title = "DOIJIB Mining | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "COMMUDOI") {
                    preset = 102
                    document.title = "CommuDOI | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "BKC") {
                    preset = 14
                    document.title = "Fields [BKC] | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "BKC-BAD-MUSEUM") {
                    preset = 15
                    document.title = "Bad Museum [BKC] | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "BKC-FRASER-RIVER") {
                    preset = 16
                    document.title = "Fraser River [BKC] | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "BBQCHAIN") {
                    preset = 10000
                    document.title = "Fields [BBQ Chain] | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "ANCIENT-FOREST-BBQCHAIN") {
                    preset = 10001
                    document.title = "Ancient Forest [BBQ Chain] | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "OP") {
                    preset = 11000
                    document.title = "Fields [OP] | CommuDAO"
                }
            } else {
                preset = 1
                document.title = "Fields | CommuDAO"
            }
        } else if (modeText.toUpperCase() === "LABS") {
            if (subModeText !== undefined) {
                if (modeText.toUpperCase() === "LABS" && subModeText.toUpperCase() === "BKC") {
                    preset = 200
                    document.title = "Labs [BKC] | CommuDAO"
                } else if (modeText.toUpperCase() === "LABS" && subModeText.toUpperCase() === "BBQCHAIN") {
                    preset = 20000
                    document.title = "Labs [BBQ Chain] | CommuDAO"
                } else if (modeText.toUpperCase() === "LABS" && subModeText.toUpperCase() === "OP") {
                    preset = 21000
                    document.title = "Labs [OP] | CommuDAO"
                }
            } else {
                preset = 2
                document.title = "Labs | CommuDAO"
            }
        } else if (modeText.toUpperCase() === "DUNGEON") {
            if (subModeText !== undefined) {
                if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "JASPER-CAVE") {
                    preset = 31
                    document.title = "Jasper Cave | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "COPPER-MINE") {
                    preset = 33
                    document.title = "Copper Mine | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "MEMETIC-ORBIT") {
                    preset = 39
                    document.title = "Memetic Orbit | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "BLACKSMITH-HOUSE") {
                    preset = 32
                    document.title = "Blacksmith House | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "EVOLUTIONARY-PLANET") {
                    preset = 34
                    document.title = "Evotionary Planet | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "DAEMON-WORLD") {
                    preset = 35
                    document.title = "Daemon World | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "CRYPTIC-COGS") {
                    preset = 36
                    document.title = "Cryptic Cogs | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "AP-INN") {
                    preset = 37
                    document.title = "AP INN | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "TDM-ROBOTICS-INC") {
                    preset = 38
                    document.title = "TDM Robotics Inc. | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "BBQCHAIN") {
                    preset = 30000
                    document.title = "Dungeon [BBQ Chain] | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "THE-ENDLESS-TOWER") {
                    preset = 30001
                    document.title = "The Endless Tower | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "OP") {
                    preset = 31000
                    document.title = "Dungeon [OP] | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "ABANDONED-TEMPLE-VAULT") {
                    preset = 31001
                    document.title = "Abandoned Temple Vault | CommuDAO"
                }
            } else {
                preset = 3
                document.title = "Dungeon | CommuDAO"
            }
        } else if (modeText.toUpperCase() === "COMMUNITY") {
            if (subModeText !== undefined) {
                if (modeText.toUpperCase() === "COMMUNITY" && subModeText.toUpperCase() === "CMCITY-CITYCENTER") {
                    preset = 41
                    document.title = "CM City - City Center | CommuDAO"
                } else if (modeText.toUpperCase() === "COMMUNITY" && subModeText.toUpperCase() === "DUNGEON-ARENA") {
                    preset = 42
                    document.title = "Dungeon Arena | CommuDAO"
                } else if (modeText.toUpperCase() === "COMMUNITY" && subModeText.toUpperCase() === "DUMPSTER-HILL") {
                    preset = 43
                    document.title = "Dumpster Hill | CommuDAO"
                } else if (modeText.toUpperCase() === "COMMUNITY" && subModeText.toUpperCase() === "QUESTER-OASIS") {
                    preset = 44
                    document.title = "Quester Oasis | CommuDAO"
                } else if (modeText.toUpperCase() === "COMMUNITY" && subModeText.toUpperCase() === "CM-CITY") {
                    preset = 45
                    document.title = "CM CITY LAND | CommuDAO"
                } else if (modeText.toUpperCase() === "COMMUNITY" && subModeText.toUpperCase() === "BIGBRO-ANALYTICA") {
                    preset = 46
                    document.title = "BIG BRO ANALYTICA | CommuDAO"
                }
            } else {
                preset = 4
                document.title = "Community | CommuDAO"
            }
        } else if (modeText.toUpperCase() === "MALL") {
            if (subModeText !== undefined) {
                if (modeText.toUpperCase() === "MALL" && subModeText.toUpperCase() === "OP") {
                    preset = 52
                    document.title = "Mall [OP] | CommuDAO"
                }
            } else {
                preset = 5
                document.title = "Mall | CommuDAO"
            }
        } else if (modeText.toUpperCase() === "MARKETPLACE") {
            preset = 6
            document.title = "Marketplace | CommuDAO"
        } else if (modeText.toUpperCase() === "GAMESWAP") {
            if (subModeText !== undefined) {
                if (modeText.toUpperCase() === "GAMESWAP" && subModeText.toUpperCase() === "BKC") {
                    preset = 700
                    document.title = "Gameswap [BKC] | CommuDAO"
                } else if (modeText.toUpperCase() === "GAMESWAP" && subModeText.toUpperCase() === "OP") {
                    preset = 701
                    document.title = "Gameswap [OP] | CommuDAO"
                }
            } else {
                preset = 7
                document.title = "GameSwap | CommuDAO"
            }
        } else if (modeText.toUpperCase() === "TBRIDGE") {
            preset = 8
            document.title = "tBridge | CommuDAO"
        } else if (modeText.toUpperCase() === "GUILD") {
            if (subModeText !== undefined) {
                if (modeText.toUpperCase() === "GUILD" && subModeText.toUpperCase() === "PROFILE") {
                    preset = 9
                    document.title = "Guild | CommuDAO"
                }
            }
        } else {
            preset = null
            document.title = "404 | CommuDAO"
        }
    } else {
        document.title = "CommuDAO | Multiverse of crypto community"
    }

    const [mode, setMode] = React.useState(preset) 
    const callMode = (_mode) => { setMode(_mode) }

    const [isLoading, setisLoading] = React.useState(false)
    const [isError, setisError] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState('')
    const [txupdate, setTxupdate] = React.useState(null)

    return (
        <>
            {isLoading &&
                <div className="centermodal">
                    <div className="wrapper">
                    </div>
                </div>
            }
            {isError &&
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                    <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", maxWidth: "70%", height: "300px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{width: "90%", textAlign: "left", fontSize: "24px"}} className="emp">ERROR! [{'beta ' + v}]</div>
                        <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px", height: "350px", overflow: "hidden", textOverflow: "ellipsis"}}>{errMsg}</div>
                        <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => setisError(false)}>CLOSE</div>
                    </div>
                    </div>
                </div>
            }
            <WagmiProvider config={wagmiAdapter.wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    <Headbar config={wagmiAdapter.wagmiConfig} callMode={callMode} navigate={navigate} txupdate={txupdate} erc20Abi={erc20Abi} />
                    {mode === 0 && <Home callMode={callMode} navigate={navigate} />}
                    <Suspense fallback={<div style={{minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}} className="collection"></div>}>
                        {mode === 1 && <Fields callMode={callMode} navigate={navigate} />}
                        {mode === 11 && <TunaLake config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} callMode={callMode} navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} aurora721ABI={aurora721ABI} tunaFieldABI={tunaFieldABI} />}
                        {mode === 12 && <OldWarehouse config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} callMode={callMode} navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} aurora721ABI={aurora721ABI} tunaFieldABI={tunaFieldABI} />}
                        {mode === 13 && <AncientForrest config={wagmiAdapter.wagmiConfig} callMode={callMode} navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} aurora721ABI={aurora721ABI} starterCMDSABI={starterCMDSABI} uplevelCMDSABI={uplevelCMDSABI} woodFieldABI={woodFieldABI} msgABI={msgABI} cmdaoNameABI={cmdaoNameABI} pve01ABI={pve01ABI} erc20Abi={erc20Abi} />}
                        {mode === 17 && <TheHeavenLand config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} erc721Abi={erc721Abi} thlFieldABI={thlFieldABI} />}
                        {mode === 19 && <EasternFront config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} erc721Abi={erc721Abi} fieldEfABI={fieldEfABI} />}
                        {mode === 100 && <MechHarvestZone config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} erc721Abi={erc721Abi} gearFieldABI={gearFieldABI} taoPfpABI={taoPfpABI} />}
                        {mode === 101 && <DjMining config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} erc721Abi={erc721Abi} fieldDjABI={fieldDjABI} />}
                        {mode === 102 && <CommuDOIField config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} erc721Abi={erc721Abi} cmdoiFieldABI={cmdoiFieldABI} />}
                        {mode === 14 && <BKCFields callMode={callMode} navigate={navigate} />}
                        {mode === 15 && <BadMuseum config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} tunaFieldABI={tunaFieldABI} erc20Abi={erc20Abi} />}
                        {mode === 16 && <FraserRiver config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} erc721Abi={erc721Abi} salmFieldABI={salmFieldABI} />}
                        {mode === 10000 && <BBQFields callMode={callMode} navigate={navigate} />}
                        {mode === 10001  && <BBQAncientForrest config={wagmiAdapter.wagmiConfig} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} cmdsV2ABI={cmdsV2ABI} uplevelCMDSABI={uplevelCMDSABI} fieldWoodBBQABI={fieldWoodBBQABI} partyABI={partyABI} missionCMDBaseABI={missionCMDBaseABI} missionWoodABI={missionWoodABI} />}
                        {mode === 11000 && <OPFields />}
                        {mode === 2 && <Labs config={wagmiAdapter.wagmiConfig} callMode={callMode} navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} ctunaLabABI={ctunaLabABI} sx31LabABI={sx31LabABI} bbqLab01ABI={bbqLab01ABI} pzaLabABI={pzaLabABI} cmdao20lab01ABI={cmdao20lab01ABI} erc20Abi={erc20Abi} kycABI={kycABI} />}
                        {mode === 200 && <BKCLabs config={wagmiAdapter.wagmiConfig} callMode={callMode} navigate={navigate} setisLoading={setisLoading} setTxupdate={setTxupdate} txupdate={txupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} stakerMachineABI={stakerMachineABI} redeemTokenABI={redeemTokenABI} cmdaoMerchantABI={cmdaoMerchantABI} />}
                        {mode === 20000 && <BBQLabs config={wagmiAdapter.wagmiConfig} callMode={callMode} navigate={navigate} setisLoading={setisLoading} setTxupdate={setTxupdate} txupdate={txupdate} setisError={setisError} setErrMsg={setErrMsg} bbqLab01ABI={bbqLab01ABI} erc20Abi={erc20Abi} transportHubABI={transportHubABI} transportHub2ABI={transportHub2ABI} houseStakingABI={houseStakingABI} slot1ABI={slot1ABI} erc721Abi={erc721Abi} sourceThubABI={sourceThubABI} pzaLabABI={pzaLabABI} />}
                        {mode === 21000 && <OPLabs />}
                        {mode === 3 && <Dungeon callMode={callMode} navigate={navigate} />}
                        {mode === 33 && <Coppermine config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} erc20Abi={erc20Abi} dunCopperABI={dunCopperABI} mintStOPTABI={mintStOPTABI} salonABI={salonABI} ubbqABI={ubbqABI} />}
                        {mode === 31 && <Jaspercave config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} erc20Abi={erc20Abi} dunJasperABI={dunJasperABI} dunJasperL2ABI={dunJasperL2ABI} mintStOPTABI={mintStOPTABI} salonABI={salonABI} ubbqABI={ubbqABI} />}
                        {mode === 39 && <Memeticorbit config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} erc20Abi={erc20Abi} dunMoABI={dunMoABI} mintStOPTABI={mintStOPTABI} salonABI={salonABI} slot1ABI={slot1ABI} badgeClaimerABI={badgeClaimerABI} />}
                        {mode === 32 && <Npcblacksmith config={wagmiAdapter.wagmiConfig} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} enchantNABI={enchantNABI} enchantRABI={enchantRABI} osABI={osABI} erc721Abi={erc721Abi} erc20Abi={erc20Abi} questAmbassABI={questAmbassABI} cmdaoNameABI={cmdaoNameABI} />}
                        {mode === 34 && <NpcEvolutionary config={wagmiAdapter.wagmiConfig} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} evolutionaryABI={evolutionaryABI} fusionABI={fusionABI} salonABI={salonABI} erc721Abi={erc721Abi} erc20Abi={erc20Abi} />}
                        {mode === 35 && <Daemonworld config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} erc20Abi={erc20Abi} dunAngbABI={dunAngbABI} uswarABI={uswarABI} />}
                        {mode === 36 && <CrypticCogs config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} erc20Abi={erc20Abi} dunEEABI={dunEEABI} taoPfpABI={taoPfpABI} uiiABI={uiiABI} />}
                        {mode === 37 && <ApInn config={wagmiAdapter.wagmiConfig} setisLoading={setisLoading} navigate={navigate} callMode={callMode} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} acUpgradeABI={acUpgradeABI} uniEnchanterABI={uniEnchanterABI} erc721Abi={erc721Abi} erc20Abi={erc20Abi} questAmbassABI={questAmbassABI} cmdaoNameABI={cmdaoNameABI} dunAngbABI={dunAngbABI} />}
                        {mode === 38 && <TdmRoboticsInc config={wagmiAdapter.wagmiConfig} setisLoading={setisLoading} navigate={navigate} callMode={callMode} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} uniEnchanterABI={uniEnchanterABI} erc721Abi={erc721Abi} erc20Abi={erc20Abi} questAmbassABI={questAmbassABI} cmdaoNameABI={cmdaoNameABI} dunEEABI={dunEEABI} />}
                        {mode === 30000 && <BBQDungeon callMode={callMode} navigate={navigate} />}
                        {mode === 30001 && <TheEndlessTower config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} erc20Abi={erc20Abi} dunGEMABI={dunGEMABI} />}
                        {mode === 31000 && <OPDungeon callMode={callMode} navigate={navigate} />}
                        {mode === 31001 && <AbandonedTempleVault config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} navigate={navigate} callMode={callMode} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} erc20Abi={erc20Abi} nftSlotABI={nftSlotABI} multichainSlotABI={multichainSlotABI} dunATVABI={dunATVABI} />}
                        {mode === 4 && <Community config={wagmiAdapter.wagmiConfig} callMode={callMode} navigate={navigate} erc721Abi={erc721Abi} cmdaoNameABI={cmdaoNameABI} slot1ABI={slot1ABI} />}
                        {mode === 41 && <CmCityCenter config={wagmiAdapter.wagmiConfig} callMode={callMode} navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} cmcityPointsABI={cmcityPointsABI} sx31voteABI={sx31voteABI} faucetABI={faucetABI} cmdaoNameABI={cmdaoNameABI} />}
                        {mode === 42 && <DungeonArena config={wagmiAdapter.wagmiConfig} setisLoading={setisLoading} callMode={callMode} navigate={navigate} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} erc721Abi={erc721Abi} questAmbassABI={questAmbassABI} dunJasperABI={dunJasperABI} pvp01ABI={pvp01ABI} salonABI={salonABI} />}
                        {mode === 43 && <DumpsterHill config={wagmiAdapter.wagmiConfig} setisLoading={setisLoading} callMode={callMode} navigate={navigate} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} erc721Abi={erc721Abi} dumpster1ABI={dumpster1ABI} dumpster2ABI={dumpster2ABI} />}
                        {mode === 44 && <QuesterOasis config={wagmiAdapter.wagmiConfig} setisLoading={setisLoading} callMode={callMode} navigate={navigate} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} kycABI={kycABI} quest01ABI={quest01ABI} pvp01ABI={pvp01ABI} questBBQABI={questBBQABI} questAmbassABI={questAmbassABI} bbqLab01ABI={bbqLab01ABI} enderPotteryABI={enderPotteryABI} dunCopperABI={dunCopperABI} dunJasperABI={dunJasperABI} dunMoABI={dunMoABI} cmdaoNameABI={cmdaoNameABI} houseStakingABI={houseStakingABI} slot1ABI={slot1ABI} erc721Abi={erc721Abi} constructionStakingABI={constructionStakingABI} />}
                        {mode === 45 && <CmCityLand config={wagmiAdapter.wagmiConfig} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} intrasubModetext={intrasubModetext} navigate={navigate} callMode={callMode} erc20Abi={erc20Abi} erc721Abi={erc721Abi} cmdaoNameABI={cmdaoNameABI} slot1ABI={slot1ABI} houseABI={houseABI} houseStakingABI={houseStakingABI} delegateOwner01ABI={delegateOwner01ABI} wlMkpABI={wlMkpABI} transportHubABI={transportHubABI} constructionABI={constructionABI} constructionStakingABI={constructionStakingABI} />}
                        {mode === 46 && <BigBroAnalytica config={wagmiAdapter.wagmiConfig} erc20Abi={erc20Abi} />}
                        {mode === 5 && <Mall config={wagmiAdapter.wagmiConfig} setisLoading={setisLoading} callMode={callMode} navigate={navigate} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} kycABI={kycABI} ctunaLabABI={ctunaLabABI} cmdaoMerchantABI={cmdaoMerchantABI} cmdaoMerchantV2ABI={cmdaoMerchantV2ABI} cmdaoMerchantKYCABI={cmdaoMerchantKYCABI} cmdaoMerchantWLABI={cmdaoMerchantWLABI} cmdaoGasha02ABI={cmdaoGasha02ABI} ammyStdABI={ammyStdABI} angeloStdABI={angeloStdABI} cmdaoAmmNpcABI={cmdaoAmmNpcABI} erc20Abi={erc20Abi} wjbcABI={wjbcABI} presaleABI={presaleABI} />}
                        {mode === 52 && <OPMall config={wagmiAdapter.wagmiConfig} setisLoading={setisLoading} callMode={callMode} navigate={navigate} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} cmdaoAmmNpcABI={cmdaoAmmNpcABI} erc20Abi={erc20Abi} erc721Abi={erc721Abi} uniNftBridgeABI={uniNftBridgeABI} multichainMallABI={multichainMallABI} />}
                        {mode === 6 && <Mkp config={wagmiAdapter.wagmiConfig} subModeText={subModeText} callMode={callMode} navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} erc20Abi={erc20Abi} aurora721ABI={aurora721ABI} cmdaoMkpABI={cmdaoMkpABI} houseStakingABI={houseStakingABI} />}
                        {mode === 7 && <GameSwap config={wagmiAdapter.wagmiConfig} setisLoading={setisLoading} callMode={callMode} navigate={navigate} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} exchangeABI={exchangeABI} exchangeJulpABI={exchangeJulpABI} farmJdaoABI={farmJdaoABI} swapABI={swapABI} swapJulpABI={swapJulpABI} bkcOracleABI={bkcOracleABI} cmdaoAmmNpcABI={cmdaoAmmNpcABI} />}
                        {mode === 700 && <BKCGameSwap config={wagmiAdapter.wagmiConfig} setisLoading={setisLoading} callMode={callMode} navigate={navigate} setTxupdate={setTxupdate} txupdate={txupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} diamonLpABI={diamonLpABI} farmCmosABI={farmCmosABI} bkcOracleABI={bkcOracleABI} />}
                        {mode === 701 && <OpGameSwap config={wagmiAdapter.wagmiConfig} setisLoading={setisLoading} callMode={callMode} navigate={navigate} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} veloPoolABI={veloPoolABI} velodromeRouterABI={velodromeRouterABI} velodromeCallerABI={velodromeCallerABI} bkcOracleABI={bkcOracleABI} stcmdABI={stcmdABI} />}
                        {mode === 8 && <TBridge config={wagmiAdapter.wagmiConfig} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20Abi={erc20Abi} erc721Abi={erc721Abi} tbridgeNFTABI={tbridgeNFTABI} nativeBridgeABI={nativeBridgeABI} uniTokensBridgeABI={uniTokensBridgeABI} uniNftBridgeABI={uniNftBridgeABI} />}
                        {mode === 9 && <Guild config={wagmiAdapter.wagmiConfig} intrasubModetext={intrasubModetext} callMode={callMode} navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} erc20Abi={erc20Abi} nftSlotABI={nftSlotABI} partyABI={partyABI} missionCMDBaseABI={missionCMDBaseABI} statCMDRewardABI={statCMDRewardABI} baseCMDClaimerABI={baseCMDClaimerABI} />}
                    </Suspense>
                    {mode === null &&
                        <div style={{minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}} className="collection">
                            <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-database"></i>
                            <div className="emp bold">404 not found!</div>
                        </div>
                    }
                </QueryClientProvider>
            </WagmiProvider>                
            <footer style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", background: "#fff"}}>
                <div className="inFooterLeft">
                    <div style={{marginBottom: "10px"}}>{'CommuDAO. alpha ' + v}</div>
                    <a style={{marginBottom: "10px", color: "#000", textDecoration: "none"}} href="https://docs.commudao.xyz" target="_blank" rel="noreferrer">Docs</a>
                    <a style={{color: "#000", textDecoration: "none"}} href="https://github.com/coshi-labs/CommuDAO" target="_blank" rel="noreferrer">Github</a>
                </div>
                <div className="inFooterRight">
                <a style={{marginBottom: "10px", color: "#000", textDecoration: "none"}} href="https://vote.commudao.xyz" target="_blank" rel="noreferrer">Governance on Snapshot</a>
                    <a style={{marginBottom: "10px", color: "#000", textDecoration: "none"}} href="https://zealy.io/c/commudao/questboard" target="_blank" rel="noreferrer">Quests on Zealy</a>
                    <a style={{color: "#000", textDecoration: "none"}} href="https://discord.gg/k92ReT5EYy" target="_blank" rel="noreferrer">Discord</a>
                </div>
            </footer>
        </>
    )
}

export default Main
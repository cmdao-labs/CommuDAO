const BKCFields = ({ callMode, navigate }) => {
    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div style={{fontSize: "65px", width: "fit-content"}} className="pixel">Fields</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}} className="pixel">Stake NFTs to earn resources.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="../background/fieldlogo.png" width="150" alt="Fields_Logo" />
            </div>
        </div>

        <div style={{width: "95%", justifyContent: "flex-start", flexWrap: "nowrap", overflow: "scroll"}} className="collection noscroll">
            <div className="nftCard" style={{justifyContent: "center", margin: "20px"}}>
                <img src="https://cloudflare-ipfs.com/ipfs/bafybeih6l2qo7pi2iulbi26wovgaq4dbilhncoyzweapznqzhbfqzgf7ji" height="230" alt="Field_BadMuseum" />
                <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                    <div className="pixel">
                        <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>
                        Eligible NFT Collection
                    </div>
                    <div className="emp pixel bold">Bad Kub Generative Art</div>
                </div>
                <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                    <div className="pixel">
                        <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>
                        Earn
                    </div>
                    <div className="emp pixel"><img src="https://cloudflare-ipfs.com/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm" style={{marginRight: "5px"}} width="12" alt="$BST"/>BST</div>
                </div>
                <div style={{width: "200px", margin: "40px 100px 0 0", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(15); navigate('/fields/bkc-bad-museum');}}>Go to Bad Musuem</div>
            </div>
            <div className="nftCard" style={{justifyContent: "center", margin: "20px"}}>
                <img src="https://cloudflare-ipfs.com/ipfs/bafybeieu6tyeea3bgzvvcxrylckaf674lqplpioghqvi2hudtfe4ux2fty" height="230" alt="Field_FraserRiver" />
                <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                    <div className="pixel">
                        <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>
                        Eligible NFT Collection
                    </div>
                    <div className="emp pixel">Cat Meaw NFT</div>
                </div>
                <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                    <div className="pixel">
                        <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>
                        Earn
                    </div>
                    <div style={{display: "flex", flexDirection: "row"}} className="emp pixel">
                        <img src="https://cloudflare-ipfs.com/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34" width="12" alt="$SALM"/>
                        <div style={{margin: "0 5px"}}>SALMON &</div>
                        <img src="https://cloudflare-ipfs.com/ipfs/bafkreiaayvrql643lox66vkdfv6uzaoq2c5aa5mq3jjp3c7v4asaxvvzla" width="16" alt="$CMM"/>
                        <div style={{marginLeft: "5px"}}>CMM</div>
                    </div>
                </div>
                <div style={{width: "200px", margin: "40px 100px 0 0", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(16); navigate('/fields/bkc-fraser-river');}}>Go to Fraser River</div>
            </div>
        </div>
    </>
    )
}

export default BKCFields
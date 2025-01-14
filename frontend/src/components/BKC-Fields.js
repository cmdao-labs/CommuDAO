import React from 'react'

const BKCFields = ({ callMode, navigate }) => {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div className="SubfieldBanner">
                    <div style={{fontSize: "65px", width: "fit-content"}} className="pixel">Fields</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}} className="pixel">Stake NFTs to earn resources.</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="../background/fieldlogo.png" width="150" alt="Fields_Logo" />
                </div>
            </div>

            <div style={{width: "92.5%", borderBottom: "1px solid #dddade", marginTop: "60px"}}></div>
            <div style={{width: "95%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", textAlign: "left"}} className="bold">Partner Fields</div>
            <div style={{width: "95%", minHeight: 0,  marginBottom: "80px", justifyContent: "flex-start", flexWrap: "nowrap", overflow: "scroll"}} className="collection noscroll">
                <div className="nftCard" style={{justifyContent: "center", margin: "10px", position: "relative", borderRadius: "5px", boxShadow: "none", border: "none", background: "rgba(0,0,0,.05)", fontSize: "12px"}}>
                    <div style={{position: "absolute", top: -25, right: -15, padding: "7.5px 20px", width: "150px", background: "rgb(255, 255, 255, 0.5)", letterSpacing: 1, border: "1px outset", display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <div style={{height: "30px"}}></div>
                        <div className='light'>BADKUB LAUNCHPAD</div>
                    </div>
                    <img src="https://gateway.commudao.xyz/ipfs/bafybeih6l2qo7pi2iulbi26wovgaq4dbilhncoyzweapznqzhbfqzgf7ji" height="230" alt="Field_BadMuseum" />
                    <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div className="light">
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>
                            Eligible NFTs
                        </div>
                        <div style={{color: "#000", borderBottom: "1px dashed"}} className="pixel">Bad Kub Generative Art</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div className="light">
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>
                            Earn
                        </div>
                        <div style={{color: "#000", borderBottom: "1px dashed"}} className="pixel">
                            <img src="https://gateway.commudao.xyz/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm" style={{marginRight: "5px"}} width="12" alt="$BST"/>
                        </div>
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0 40px",border: "1px dashed #4637a9", justifyContent: "center"}} className="pixel hashtag" onClick={() => {callMode(15); navigate('/fields/bkc-bad-museum');}}>Go to Bad Musuem</div>
                </div>
                <div className="nftCard" style={{justifyContent: "center", margin: "10px", position: "relative", borderRadius: "5px", boxShadow: "none", border: "none", background: "rgba(0,0,0,.05)", fontSize: "12px"}}>
                    <div style={{position: "absolute", top: -25, right: -15, padding: "7.5px 20px", width: "150px", background: "rgb(255, 255, 255, 0.5)", letterSpacing: 1, border: "1px outset", display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <img src="https://gateway.commudao.xyz/ipfs/bafybeifgqrnqujzsozg56l4wfvqwxgf72kgjjwtwq6aedeywwfmvlg7on4" width="30px" alt="CM" />
                        <div className='light' style={{marginLeft: "10px"}}>CM Digital</div>
                    </div>
                    <img src="https://gateway.commudao.xyz/ipfs/bafybeieu6tyeea3bgzvvcxrylckaf674lqplpioghqvi2hudtfe4ux2fty" height="230" alt="Field_FraserRiver" />
                    <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div className="light">
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>
                            Eligible NFTs
                        </div>
                        <div style={{color: "#000", borderBottom: "1px dashed"}} className="pixel">Cat Meaw And Friends</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div className="light">
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>
                            Earn
                        </div>
                        <div style={{color: "#000", borderBottom: "1px dashed", display: "flex", flexDirection: "row"}} className="pixel">
                            <img src="https://gateway.commudao.xyz/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34" width="12" alt="$SALM"/>
                            &nbsp;+&nbsp;
                            <img src="https://gateway.commudao.xyz/ipfs/bafkreiaayvrql643lox66vkdfv6uzaoq2c5aa5mq3jjp3c7v4asaxvvzla" width="16" alt="$CMM"/>
                        </div>
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0 40px", border: "1px dashed #4637a9", justifyContent: "center"}} className="pixel hashtag" onClick={() => {callMode(16); navigate('/fields/bkc-fraser-river');}}>Go to Fraser River</div>
                </div>
            </div>
        </>
    )
}

export default BKCFields
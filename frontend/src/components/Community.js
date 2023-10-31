const Community = ({ callMode, navigate }) => {
    return (
    <>
        <div className="fieldBanner" style={{background: "#2b2268", borderBottom: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}} className="pixel">
                <div style={{fontSize: "75px", width: "fit-content"}}>Community</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}}>Build our decentralized community with DAO token.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="../background/commulogo.png" width="150" alt="Community_Logo" />
            </div>
        </div>

        <div style={{background: "rgb(0, 19, 33)", margin: "0", padding: "75px 0", minHeight: "inherit"}} className="collection pixel">
            <div style={{width: "1216px", maxWidth: "78%", marginBottom: "30px", textAlign: "left", fontSize: "22.5px", color: "#fff"}}>CM CITY - Urban District</div>
            <div style={{padding: 0, borderRadius: 0, border: "none", background: "transparent", boxShadow: "none", width: "1216px", maxWidth: "78%", height: "1216px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                <div id="tile1" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile2" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile3" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(41); navigate('/community/cmcity-citycenter');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeidtpeph5ix5phlf2et2i665lesc76pidjxiazlamumn6ncidpumle" width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>City Center</div>
                </div>
                <div id="tile4" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile5" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile6" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile7" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile8" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile9" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile10" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile11" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile12" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile13" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile14" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile15" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile16" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile17" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile18" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile19" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile20" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile21" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile22" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile23" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile24" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile25" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile26" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile27" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile28" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile29" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile30" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile31" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile32" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile33" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile34" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile35" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile36" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile37" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile38" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile39" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile40" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile41" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile42" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile43" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile44" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(44); navigate('/community/quester-oasis');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeib2y7ckngdnsilvvgdix65v3l3bfejwc7zf4g5l46rsr7cgpalghy" width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Quester Oasis</div>
                </div>
                <div id="tile45" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile46" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile47" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile48" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile49" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile50" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile51" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile52" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile53" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(42); navigate('/community/dungeon-arena');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibbhvrdk32e6locxnyi2twe7wmryouulbl6ehvprtzqtum24kxvae" width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Dungeon Arena</div>
                </div>
                <div id="tile54" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile55" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile56" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile57" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile58" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile59" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Reserved Land</div>
                </div>
                <div id="tile60" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile61" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile62" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile63" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(43); navigate('/community/dumpster-hill');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeia7e5mzmszg7heigxfzthkmhnnk555hw35jygufvpomiolp5lab3i" width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Dumpster Hill</div>
                </div>
                <div id="tile64" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Community
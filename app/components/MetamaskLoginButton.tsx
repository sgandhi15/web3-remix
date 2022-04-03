import { ethers } from "ethers";

import { useEffect, useState } from "react";
import { useMetamask } from "~/context/metamask/MetamaskProvider";

declare let window: any;

export function MetamaskLoginButton() {
  const { dispatch } = useMetamask();

  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    if (typeof window.ethereum === "undefined") {
      window.alert("Metamask is not available");
    }
  });

  async function onClick() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const account = await signer.getAddress();

    setBalance(
      ethers.utils.formatEther(await provider.getBalance("ricmoo.eth"))
    );
    dispatch({ type: "LOGIN", payload: { account, signer, provider } });
  }

  const transaction = async (account: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
      await signer.sendTransaction({
        to: account,
        value: ethers.utils.parseEther("0"),
      });
    } catch (error: any) {
      if (error.code === 4001) alert(error.message);
      else console.error(error.message);
    }
  };

  return (
    <>
      <button onClick={onClick}>Click Me</button>

      <button
        onClick={() =>
          transaction("0xe0f169006426142972f1a5C2b2B1fB15211D53a1")
        }
      >
        Transaction
      </button>
      <h1>{balance}</h1>
    </>
  );
}

// const networkData: any = MarketplaceData.networks[networkId];
// if (networkData) {
//   const marketplace = new web3.eth.Contract(
//     MarketplaceData.abi,
//     networkData.address
//   );
//   setMarketplace(marketplace);

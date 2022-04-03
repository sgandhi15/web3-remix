import { MetamaskLoginButton } from "~/components/MetamaskLoginButton";
import { MetamaskProvider } from "~/context/metamask/MetamaskProvider";

export default function Index() {
  return (
    <>
      <MetamaskProvider>
        <MetamaskLoginButton />
      </MetamaskProvider>
    </>
  );
}

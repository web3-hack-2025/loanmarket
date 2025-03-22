import { Link } from "react-router-dom";
import WalletBouncer from "./web3/wallet-bouncer";

export function MobileHeader() {
  return (
    <WalletBouncer>
      {({ connected }: { connected: boolean }) => 
        connected ? (
          <div className="max-md:block hidden p-4 border-b">
            <Link to="/" className="text-white font-bold">Loan Market</Link>
          </div>
        ) : null
      }
    </WalletBouncer>
  );
}

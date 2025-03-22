import React from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

export default function WalletBouncer({ children }: { children: React.ReactNode }) {

    const account = useAccount();
    const navigate = useNavigate();


    if (!account || account.status === "disconnected") {
        navigate("/");
    }

    return (<>
        {children}
    </>);
}
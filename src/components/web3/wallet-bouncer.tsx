import React from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

interface WalletBouncerProps {
    children: React.ReactNode | ((props: { connected: boolean }) => React.ReactNode);
}

export default function WalletBouncer({ children }: WalletBouncerProps) {
    const account = useAccount();
    const navigate = useNavigate();
    const isConnected = account && account.status === "connected";

    // If children is a function, call it with the connected status
    if (typeof children === "function") {
        return <>{children({ connected: isConnected })}</>;
    }

    // Otherwise, redirect if not connected
    if (!isConnected) {
        navigate("/");
        return null;
    }

    return <>{children}</>;
}
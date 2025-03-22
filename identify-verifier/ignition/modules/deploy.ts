import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LoanOfferModule = buildModule("LoanOfferModule", (m) => {

  const LoanOffer = m.contract("LoanOffer", []);
  const TransferFunds = m.contract("TransferFunds",[])

  return { LoanOffer,TransferFunds };
});

export default LoanOfferModule;
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LoanOfferModule = buildModule("LoanOfferModule", (m) => {

  const LoanOffer = m.contract("LoanOffer", []);

  return { LoanOffer };
});

export default LoanOfferModule;
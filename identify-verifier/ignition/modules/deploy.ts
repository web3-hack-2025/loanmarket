import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SignatureStoreModule = buildModule("SignatureStoreModule", (m) => {

  const SignatureStore = m.contract("SignatureStore", ["0xc0ffee254729296a45a3885639AC7E10F9d54979"]);

  return { SignatureStore };
});

export default SignatureStoreModule;
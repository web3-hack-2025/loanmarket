import { expect } from "chai";
import { } from "@nomicfoundation/hardhat-chai-matchers"
import hre from 'hardhat'
import { Contract, BigNumberish, BytesLike } from 'ethers'
import { LoanOffer } from "../typechain-types/contracts/Verification.sol/LoanOffer"
import { TransferFunds } from "../typechain-types/contracts/Verification.sol/TransferFunds"
import * as assert from 'assert';

describe("LoanOffer", function () {
  let loanOfferContract: LoanOffer;
  let transferFundsContract: TransferFunds;
  let user1: any, user2: any;
  let bank1: any, bank2: any, bank3: any;

    beforeEach(async function () {
        // await hre.network.provider.send("hardhat_reset");
        [user1, user2] = await hre.ethers.getSigners();
        [bank1, bank2, bank3] = await hre.ethers.getSigners();

        const TransferFunds = await hre.ethers.getContractFactory("TransferFunds");
        transferFundsContract = (await TransferFunds.deploy({})) as TransferFunds;
        await transferFundsContract.waitForDeployment();
        
        const LoanOffer = await hre.ethers.getContractFactory("LoanOffer");
        
        loanOfferContract = (await LoanOffer.deploy({
        })) as LoanOffer;
        loanOfferContract.setTransferFundsContract(transferFundsContract.getAddress());
        await loanOfferContract.waitForDeployment();
    });

    it("Should allow a user to add themselves to system", async function () {
        await expect(loanOfferContract.connect(user1).addUserToSystem())
        .to.emit(loanOfferContract, "UserAdded")
        .withArgs(user1.address, 32);
        try
        {
            await loanOfferContract.connect(user1).addUserToSystem();
            assert.fail("Should Throw")
        }
        catch (err)
        {
            // assert.equal(err.message, 'User already registered')
        }
        await expect(loanOfferContract.connect(user2).addUserToSystem())
        .to.emit(loanOfferContract, "UserAdded")
        .withArgs(user2.address, 32);

    });

    it("Should allow a bank to be added to the system", async function() 
    {
        const { ethers } = require("ethers");

        // Generate random wallet (private and public key)
        const walletASB = ethers.Wallet.createRandom();
        const walletANZ = ethers.Wallet.createRandom();

        // Output the private and public keys
        console.log("Private Key:", walletANZ.privateKey);
        console.log("Public Key:", walletANZ.publicKey);
        await expect(loanOfferContract.connect(bank1).addLoanProviderToSystem("ASB", walletASB.publicKey))
        .to.emit(loanOfferContract, "PublicKeyRegistered")
        .withArgs(bank1.address, walletASB.publicKey);

        try
        {
            await loanOfferContract.connect(bank1).addLoanProviderToSystem("ASB", walletASB.publicKey);
            assert.fail("Should Throw")
        }
        catch (err)
        {
            // assert.equal(err.message, 'User already registered')
        }

        await expect(loanOfferContract.connect(bank2).addLoanProviderToSystem("ANZ", walletANZ.publicKey))
        .to.emit(loanOfferContract, "PublicKeyRegistered")
        .withArgs(bank2.address, walletANZ.publicKey);
    });

    it("Should allow a bank to make an offer to an existing user.", async function() 
    {
        const { ethers } = require("ethers");

        // Generate random wallet (private and public key)
        const walletASB = ethers.Wallet.createRandom();
        const walletANZ = ethers.Wallet.createRandom();
        await loanOfferContract.connect(bank1).addLoanProviderToSystem("ASB", walletASB.publicKey);
        await loanOfferContract.connect(bank2).addLoanProviderToSystem("ANZ", walletANZ.publicKey);
        await loanOfferContract.connect(user1).addUserToSystem();
        await loanOfferContract.connect(user2).addUserToSystem();
        let expiryDateUnixSeconds: number = Date.now() + 1000 * 180;

        const nonce: BigNumberish = 12345;
        const offerHash = hre.ethers.solidityPacked(
            ["string", "uint256", "address", "uint256", "uint256"],
            ["ASB", 1000000000000, user1.address, expiryDateUnixSeconds, nonce]
        );
        
        // Sign the offer hash
        const signature = await walletASB.signMessage(hre.ethers.getBytes(offerHash));
        try
        {
            const etherAmount = hre.ethers.parseEther("0.000001");
            await expect(loanOfferContract.connect(user1).acceptOffer("ASB", 1000000000000, user1.address, expiryDateUnixSeconds, 
                nonce,
                signature,{value: etherAmount}))
                .to.emit(transferFundsContract, "Received")
                .withArgs(loanOfferContract.getAddress(), 1000000000000)
                .to.emit(loanOfferContract, "SignerAddressProduced")
                .withArgs(bank1.address, walletASB.publicKey);;
        }
        catch(err)
        {
            assert.fail(err);
        }   
        try
        {
            await loanOfferContract.connect(bank3).acceptOffer("TSB", 1000000, user1.address, expiryDateUnixSeconds, 
        "0x8c793150f8099458424bb7fd0c0b673d779b1772d1772a9054bb68fdcf6551dc",
        "0x2c6406d3b32c2e55d6366b7f7cced0b1c3433a4bfb7b2fa58da66d49f6c3c0cd5e8b6151057c9477a4c3c05408b9e730bb37dbbb456dd10c120f9c5c6a9380d601");
        assert.fail("Should Throw as this bank is not registered");
        }
        catch(err)
        {
        }   
    }); 

});

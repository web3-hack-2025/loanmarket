import { expect } from "chai";
import { } from "@nomicfoundation/hardhat-chai-matchers"
import hre from 'hardhat'
import { Contract, BigNumberish, BytesLike } from 'ethers'
import { LoanOffer } from "../typechain-types/contracts/Verification.sol/LoanOffer"
import * as assert from 'assert';

describe("LoanOffer", function () {
  let contract: LoanOffer;
  let user1: any, user2: any;
  let bank1: any, bank2: any, bank3: any;

    beforeEach(async function () {
        [user1, user2] = await hre.ethers.getSigners();
        [bank1, bank2, bank3] = await hre.ethers.getSigners();

        const LoanOffer = await hre.ethers.getContractFactory("LoanOffer");
        contract = (await LoanOffer.deploy({
        })) as LoanOffer;
        await contract.waitForDeployment();
    });

    it("Should allow a user to add themselves to system", async function () {
        await expect(contract.connect(user1).addUserToSystem())
        .to.emit(contract, "UserAdded")
        .withArgs(user1.address, 32);
        try
        {
            await contract.connect(user1).addUserToSystem();
            assert.fail("Should Throw")
        }
        catch (err)
        {
            // assert.equal(err.message, 'User already registered')
        }
        await expect(contract.connect(user2).addUserToSystem())
        .to.emit(contract, "UserAdded")
        .withArgs(user2.address, 32);

    });

    const publicASBKey = "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const publicANZKey = "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
    it("Should allow a bank to be added to the system", async function() 
    {
        await expect(contract.connect(bank1).addLoanProviderToSystem("ASB", publicASBKey))
        .to.emit(contract, "PublicKeyRegistered")
        .withArgs(bank1.address, publicASBKey);

        try
        {
            await contract.connect(bank1).addLoanProviderToSystem("ASB", publicASBKey);
            assert.fail("Should Throw")
        }
        catch (err)
        {
            // assert.equal(err.message, 'User already registered')
        }

        await expect(contract.connect(bank2).addLoanProviderToSystem("ANZ", publicANZKey))
        .to.emit(contract, "PublicKeyRegistered")
        .withArgs(bank2.address, publicANZKey);
    });

    it("Should allow a bank to make an offer to an existing user.", async function() 
    {
        await contract.connect(bank1).addLoanProviderToSystem("ASB", publicASBKey);
        await contract.connect(bank2).addLoanProviderToSystem("ANZ", publicANZKey);
        await contract.connect(user1).addUserToSystem();
        await contract.connect(user2).addUserToSystem();
        let expiryDateUnixSeconds: number = Date.now() + 1000 * 180;

        const nonce: BigNumberish = 12345;
        const offerHash = hre.ethers.solidityPacked(
            ["string", "uint256", "address", "uint256", "uint256"],
            ["ASB", 1000000, user1.address, expiryDateUnixSeconds, nonce]
        );
        
        // Sign the offer hash
        const privateKey = "0xcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"; 
        const wallet = new hre.ethers.Wallet(privateKey);
        const signature = await wallet.signMessage(hre.ethers.getBytes(offerHash));
        try
        {
            await contract.connect(bank1).makeOffer("ASB", 1000000, user1.address, expiryDateUnixSeconds, 
                nonce,
                signature);
        }
        catch(err)
        {
            assert.fail(err);
        }   
        try
        {
            await contract.connect(bank3).makeOffer("TSB", 1000000, user1.address, expiryDateUnixSeconds, 
        "0x8c793150f8099458424bb7fd0c0b673d779b1772d1772a9054bb68fdcf6551dc",
        "0x2c6406d3b32c2e55d6366b7f7cced0b1c3433a4bfb7b2fa58da66d49f6c3c0cd5e8b6151057c9477a4c3c05408b9e730bb37dbbb456dd10c120f9c5c6a9380d601");
        assert.fail("Should Throw as this bank is not registered");
        }
        catch(err)
        {
        }   
    }); 

});

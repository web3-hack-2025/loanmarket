import { expect } from "chai";
import { } from "@nomicfoundation/hardhat-chai-matchers"
import hre from 'hardhat'
import { Contract } from 'ethers'
import { LoanOffer } from "../typechain-types/contracts/Verification.sol/LoanOffer"
import * as assert from 'assert';

describe("LoanOffer", function () {
  let contract: LoanOffer;
  let owner: any, user1: any, user2: any;

  beforeEach(async function () {
    [owner, user1, user2] = await hre.ethers.getSigners();

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
  });

});

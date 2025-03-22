// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

/**
 * @title DigitalSignatureWhitelist
 * @notice Validates whitelisted addresses using digital signatures
 */
contract LoanOffer is Ownable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    uint256 public constant UNCLAIMED_OFFER_NONCE = 32;

    struct Offer {
        string loanProvider;
        uint256 borrowAmount;
        address targetAddr;
        uint256 expiryUnix;
        uint256 nonce;
    }
    
    struct User
    {
        address walletAddress;
        uint256 nonce;
    }

    struct Lender
    {
        string name;
        bytes32 publicKey;
    }

    mapping(address => User) public users;
    mapping(address => Offer[]) public unclaimedOffers;
    mapping(address => Lender) public lenders;

    event PublicKeyRegistered(address provider, bytes32 publicKey);
    /// @notice Address used to validate whitelisted addresses

    constructor() Ownable(msg.sender) {

    }

    function addUserToSystem() public
    {
        require(users[msg.sender].nonce == UNCLAIMED_OFFER_NONCE, "User already registered");

        users[msg.sender].walletAddress = msg.sender;
        users[msg.sender].nonce = UNCLAIMED_OFFER_NONCE;
    }


    function addLoanProviderToSystem(string memory loanProvider, bytes32 key) public
    {
        Lender memory newLender = Lender({
            name: loanProvider,
            publicKey: key
        });

        require(lenders[msg.sender].publicKey == bytes32(0), "Public key already registered");
        lenders[msg.sender] = newLender;
        emit PublicKeyRegistered(msg.sender, key);
    }

    function getOffers() public view returns (Offer[] memory)
    {
        require(users[msg.sender].nonce != UNCLAIMED_OFFER_NONCE , "Offer has been claimed or user not registered");

        // Return the matching offers
        return unclaimedOffers[msg.sender];
    }

    function makeOffer(        
        string memory loanProvider,
        uint256 borrowAmount,
        address targetAddr,
        uint256 expiryUnix,
        uint256 nonce,
        bytes memory signature
        ) public
    {

        bytes32 offerHash = keccak256(
            abi.encodePacked(loanProvider, borrowAmount, targetAddr, expiryUnix, nonce)
        );

        // Recover the signer from the signature
        address signer = recoverSigner(offerHash, signature);

        // Ensure the signer matches the registered address
        require(lenders[signer].publicKey != bytes32(0), "Signer not registered");
        require(signer == msg.sender, "Signature does not match sender");

        Offer memory offer = Offer({
            loanProvider: loanProvider,
            borrowAmount: borrowAmount,
            targetAddr: targetAddr,
            expiryUnix: expiryUnix,
            nonce: nonce
        });   

        // Store the verified offer
        unclaimedOffers[signer].push(offer);
        
    }

    function recoverSigner(bytes32 hash, bytes memory signature) private pure returns (address) {
        require(signature.length == 65, "Invalid signature length");

        bytes32 r;
        bytes32 s;
        uint8 v;

        // Extract the signature parameters
        assembly {
            r := mload(add(signature, 0x20))
            s := mload(add(signature, 0x40))
            v := byte(0, mload(add(signature, 0x60)))
        }

        // Adjust `v` for Ethereum
        if (v < 27) {
            v += 27;
        }

        require(v == 27 || v == 28, "Invalid v value");

        // Recover the address from the signature
        return ecrecover(hash, v, r, s);
    }

    /**
     * @notice Verify signature
     * @param signature digital signature to verify
     */
    // function verifyAddressSigner(
    //     bytes memory signature
    // ) private view returns (bool) {
    //     bytes32 messageHash = keccak256(abi.encodePacked(msg.sender));
    //     return
    //         signerAddress ==
    //         messageHash.toEthSignedMessageHash().recover(signature);
    // }

    /**
     * @notice Validates if user can access a feature using a digital signature
     * @param signature digital signature to validate
     */
    // function validateAccess(bytes memory signature) external view {
        // require(verifyAddressSigner(signature), "Computer says no.");
    // }
}
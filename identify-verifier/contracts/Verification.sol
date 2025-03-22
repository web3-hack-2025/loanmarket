// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

/**
 * @title DigitalSignatureWhitelist
 * @notice Validates whitelisted addresses using digital signatures
 */
contract SignatureStore is Ownable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    struct Signature {
        bytes32 r;
        bytes32 s;
        uint8 v;
    }

    mapping (address => Signature) private signatures;

    /// @notice Address used to validate whitelisted addresses
    address private signerAddress;

    constructor(address _signerAddress) Ownable(msg.sender) {
        signerAddress = _signerAddress;
    }

    function saveSignature(Signature memory signature) external
    {
        signatures[signerAddress] = signature;
    }

    /**
     * @notice Verify signature
     * @param signature digital signature to verify
     */
    function verifyAddressSigner(
        bytes memory signature
    ) private view returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(msg.sender));
        return
            signerAddress ==
            messageHash.toEthSignedMessageHash().recover(signature);
    }

    /**
     * @notice Validates if user can access a feature using a digital signature
     * @param signature digital signature to validate
     */
    function validateAccess(bytes memory signature) external view {
        require(verifyAddressSigner(signature), "Computer says no.");
    }
}
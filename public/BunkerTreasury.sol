// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title BunkerTreasury
/// @notice Holds the 1.5% buy and 1.5% sell fees from BunkerCurve.
///         One payee, set at deploy, never changed. withdraw() sends the
///         balance to that payee. This is an operator fee. It is not a
///         buyback, not a payment to Starknet, and not STRK.
contract BunkerTreasury {
    address public immutable payee;

    event Withdraw(address indexed to, uint256 amount);

    constructor(address payee_) {
        require(payee_ != address(0), "payee");
        payee = payee_;
    }

    receive() external payable {}

    function withdraw() external {
        require(msg.sender == payee, "payee");
        uint256 amount = address(this).balance;
        require(amount > 0, "empty");
        (bool ok, ) = payee.call{value: amount}("");
        require(ok, "send");
        emit Withdraw(payee, amount);
    }
}

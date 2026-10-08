// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Paxband
/// @notice A token. Not PAXG. Not Paxos. Not a Long vault share.
///         Supply stays at zero. This draft is not a sale and not a deployment.
contract Paxband {
    string public constant name = "Paxband";
    string public constant symbol = "PAXBAND";
    uint8 public constant decimals = 18;

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);

    function deposit(uint256) external pure {
        revert("Paxband does not take USDG");
    }

    function redeem(uint256) external pure {
        revert("Paxband is not a share");
    }

    function mint(address, uint256) external pure {
        revert("Supply stays at zero until the market is opened on purpose");
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        if (allowed != type(uint256).max) {
            require(allowed >= amount, "allowance");
            allowance[from][msg.sender] = allowed - amount;
        }
        _transfer(from, to, amount);
        return true;
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(to != address(0), "to");
        uint256 bal = balanceOf[from];
        require(bal >= amount, "balance");
        unchecked {
            balanceOf[from] = bal - amount;
            balanceOf[to] += amount;
        }
        emit Transfer(from, to, amount);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title PaxbandCurve
/// @notice Constant-product curve. The opening price matches a pool that
///         already holds 1 ETH and 1_000_000_000 tokens. That 1 ETH is virtual:
///         it is not deposited, and it cannot be withdrawn. Only ETH paid in
///         by buyers sits in the contract, and sellers can take that back.
///         Not STRK. Not PAXG. Not Paxos. No fee, no owner, no hidden mint.
contract PaxbandCurve {
    string public constant name = "Paxband";
    string public constant symbol = "PAXBAND";
    uint8 public constant decimals = 18;

    uint256 public constant VIRTUAL_ETH = 1 ether;
    uint256 public constant VIRTUAL_TOKENS = 1_000_000_000 ether;

    uint256 public totalSupply;
    uint256 public tokensSold;
    uint256 public realEth;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);
    event Buy(address indexed buyer, uint256 ethIn, uint256 tokensOut, uint256 realEth, uint256 tokensSold);
    event Sell(address indexed seller, uint256 tokensIn, uint256 ethOut, uint256 realEth, uint256 tokensSold);

    function ethReserve() public view returns (uint256) {
        return VIRTUAL_ETH + realEth;
    }

    function tokenReserve() public view returns (uint256) {
        return VIRTUAL_TOKENS - tokensSold;
    }

    /// @notice Wei of ETH for one whole token, at the current point on the curve.
    function price() public view returns (uint256) {
        return ethReserve() * 1 ether / tokenReserve();
    }

    /// @notice Tokens a buy of `ethIn` would mint. Rounds down.
    function quoteBuy(uint256 ethIn) public view returns (uint256) {
        if (ethIn == 0) return 0;
        uint256 reserveTokens = tokenReserve();
        return reserveTokens * ethIn / (ethReserve() + ethIn);
    }

    /// @notice ETH a sale of `tokensIn` would return. Rounds down.
    function quoteSell(uint256 tokensIn) public view returns (uint256) {
        if (tokensIn == 0 || tokensIn > tokensSold) return 0;
        return ethReserve() * tokensIn / (tokenReserve() + tokensIn);
    }

    function buy() external payable returns (uint256 tokensOut) {
        require(msg.value > 0, "no eth");
        tokensOut = quoteBuy(msg.value);
        require(tokensOut > 0, "dust");
        realEth += msg.value;
        tokensSold += tokensOut;
        _mint(msg.sender, tokensOut);
        emit Buy(msg.sender, msg.value, tokensOut, realEth, tokensSold);
    }

    function sell(uint256 tokensIn) external returns (uint256 ethOut) {
        require(tokensIn > 0 && tokensIn <= tokensSold, "amount");
        require(balanceOf[msg.sender] >= tokensIn, "balance");
        ethOut = quoteSell(tokensIn);
        require(ethOut > 0 && ethOut <= realEth, "eth");
        tokensSold -= tokensIn;
        realEth -= ethOut;
        _burn(msg.sender, tokensIn);
        (bool ok, ) = msg.sender.call{value: ethOut}("");
        require(ok, "send");
        emit Sell(msg.sender, tokensIn, ethOut, realEth, tokensSold);
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

    receive() external payable {
        revert("use buy()");
    }

    function _mint(address to, uint256 amount) internal {
        require(to != address(0), "to");
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    function _burn(address from, uint256 amount) internal {
        balanceOf[from] -= amount;
        totalSupply -= amount;
        emit Transfer(from, address(0), amount);
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(to != address(0), "to");
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
    }
}

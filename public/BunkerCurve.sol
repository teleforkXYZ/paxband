// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title BunkerCurve
/// @notice BUNKER / ETH. Token name is Bunker Mode. A Robinhood-chain curve about a public post, not a Starknet product.
///         Starknet wrote that they are considering becoming an L1, aiming to be the first
///         fully quantum-resistant network, with 2027 as the target.
///         Subject: https://x.com/Starknet/status/2108113391525204034
///         The opening price matches a pool that already holds 1 ETH and 1_000_000_000 tokens.
///         That 1 ETH is virtual: it is not deposited, and it cannot be withdrawn.
///         Only ETH paid in by buyers sits in the contract, and sellers can take that back.
///         Not STRK. Not Starknet. Not StarkWare. No fee, no owner, no hidden mint.
contract BunkerCurve {
    string public constant name = "Bunker Mode";
    string public constant symbol = "BUNKER";
    uint8 public constant decimals = 18;

    string public constant pair = "BUNKER/ETH";
    string public constant about =
        "A curve on Robinhood Chain. Starknet said they are considering an L1, aiming to be the first fully quantum-resistant network, target 2027. This token is not that network and not STRK.";
    string public constant subject = "https://x.com/Starknet/status/2108113391525204034";

    uint256 public constant FEE_BPS = 150;
    uint256 public constant BPS = 10_000;
    address public immutable treasury;

    uint256 public constant VIRTUAL_ETH = 1 ether;
    uint256 public constant VIRTUAL_TOKENS = 1_000_000_000 ether;

    uint256 public totalSupply;
    uint256 public tokensSold;
    uint256 public realEth;
    uint256 private entered;

    constructor(address treasury_) {
        require(treasury_ != address(0) && treasury_ != address(this), "treasury");
        treasury = treasury_;
    }

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

    /// @notice ETH the curve would release, before the 1.5% fee.
    function quoteSell(uint256 tokensIn) public view returns (uint256) {
        if (tokensIn == 0 || tokensIn > tokensSold) return 0;
        return ethReserve() * tokensIn / (tokenReserve() + tokensIn);
    }

    function buy() external payable returns (uint256 tokensOut) {
        require(entered == 0, "reenter");
        entered = 1;
        require(msg.value > 0, "no eth");
        uint256 fee = msg.value * FEE_BPS / BPS;
        uint256 ethIn = msg.value - fee;
        tokensOut = quoteBuy(ethIn);
        require(tokensOut > 0, "dust");
        realEth += ethIn;
        tokensSold += tokensOut;
        _mint(msg.sender, tokensOut);
        _take(fee);
        emit Buy(msg.sender, msg.value, tokensOut, realEth, tokensSold);
        entered = 0;
    }

    function sell(uint256 tokensIn) external returns (uint256 ethOut) {
        require(entered == 0, "reenter");
        entered = 1;
        require(tokensIn > 0 && tokensIn <= tokensSold, "amount");
        require(balanceOf[msg.sender] >= tokensIn, "balance");
        uint256 gross = quoteSell(tokensIn);
        uint256 fee = gross * FEE_BPS / BPS;
        ethOut = gross - fee;
        require(ethOut > 0 && gross <= realEth, "eth");
        tokensSold -= tokensIn;
        realEth -= gross;
        _burn(msg.sender, tokensIn);
        _take(fee);
        (bool ok, ) = msg.sender.call{value: ethOut}("");
        require(ok, "send");
        emit Sell(msg.sender, tokensIn, ethOut, realEth, tokensSold);
        entered = 0;
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


    /// @notice The mark, stored in the contract. data URI, PNG.
    function image() public pure returns (string memory) {
        return "data:image/png;base64,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";
    }

    receive() external payable {
        revert("use buy()");
    }

    function _take(uint256 fee) internal {
        if (fee == 0) return;
        (bool ok, ) = treasury.call{value: fee}("");
        require(ok, "fee");
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

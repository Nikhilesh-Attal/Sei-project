// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SeiFun is ERC20 {
    constructor(uint256 initialSupply, string memory name_, string memory symbol_) ERC20( name_, symbol_) {

        _mint(address(this), initialSupply);
    }

    function decimals() public view override virtual returns (uint8) {
        return 18;
    }
}

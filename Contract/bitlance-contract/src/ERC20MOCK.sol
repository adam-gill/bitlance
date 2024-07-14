// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDCMOCK is ERC20 {
    
    constructor()ERC20("USDC","USDC"){
        
    }

    function mint(address _addr,uint256 amount)public{
        _mint(_addr,amount *10**18);

    }

    

}
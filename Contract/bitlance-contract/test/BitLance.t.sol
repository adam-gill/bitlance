// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Test, console} from "forge-std/Test.sol";

import {BITLANCE}  from "../src/BITLANCE.sol";

contract BITLANCETEST is Test{
BITLANCE public bitlance;
address public tokenA = address(1);
address public tokenB = address(2);
//  function addToken(address _addr)public onlyManager{
//         allowedTokens[_addr] = true;

//     }

function setUp()public{
    bitlance = new BITLANCE();
    vm.label(tokenA, "tokenA");
    vm.label(tokenB, "tokenB");
    bitlance.addToken(tokenA);

   

}

/****
 * @dev BITLANCEMANAGEMENT CONTRACT
 * 1. check if an address token is allowed
 * 2. check if an address is not allowed
 */
function test_checkIfTokenIsAllowed()public view{
   bool isAllowed =  bitlance.allowedTokens(tokenA);
     assertEq(isAllowed, true);
}

function test_checkIfTokenIsNotAllowed()public view{
   bool isAllowed =  bitlance.allowedTokens(tokenB);
     assertEq(isAllowed, false);
}



}

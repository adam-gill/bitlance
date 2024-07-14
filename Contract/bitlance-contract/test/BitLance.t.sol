// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Test, console} from "forge-std/Test.sol";

import {BITLANCE}  from "../src/BITLANCE.sol";

contract BITLANCETEST is Test{
BITLANCE public bitlance;

function setUp()public{
    bitlance = new BITLANCE();

}

function test_true()public{
    assertEq(1,1);
}


}

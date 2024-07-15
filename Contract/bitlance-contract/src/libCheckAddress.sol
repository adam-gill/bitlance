// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

library ArrayForAddress {

    function isAddressAvailable(address[] memory freelancers, address _freelancer) internal pure returns (bool) {
        for (uint256 i = 0; i < freelancers.length; i++) {
            if (freelancers[i] == _freelancer) {
                return true;
            }
        }
        return false;
    }
}

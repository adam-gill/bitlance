// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

library ArrayForAddress {

 /**
     * Checks if a specific address is present in an array of addresses.
     * freelancers: The array of addresses to search.
     * _freelancer: The address being examined to determine if it exists within the array.
     * Returns true if the address is found in the array, otherwise returns false.
     */

    function isAddressAvailable(address[] memory freelancers, address _freelancer) public pure returns (bool) {
        for (uint256 i = 0; i < freelancers.length; i++) {
            if (freelancers[i] == _freelancer) {
                return true;
            }
        }
        return false;
    }
}

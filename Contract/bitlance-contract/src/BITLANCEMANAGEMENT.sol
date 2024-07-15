// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;


contract BITLANCEMANAGEMENT{

    //mapping check if is manager

    mapping(address => bool) public isManager;

    //stable address coins allowed

     mapping(address => bool) public allowedTokens;

    constructor(){
        isManager[msg.sender] = true;
    }


//modifier

modifier onlyManager(){
    require(isManager[msg.sender],"only Manager");

    _;
}
modifier onlyAllowedTokens(address _token){
    require(allowedTokens[_token],"token Not Allowed");

    _;
}

/**
     * Adds a new manager.
     * _addr: The address to be added as a manager.
     * This function sets the given address as a manager. Only callable by current managers.
     */

    function addManager(address _addr)public onlyManager{
        isManager[_addr] = true;

    }

/**
     * Adds a new token to the allowed tokens list.
     * _addr: The address of the token to be allowed.
     * This function adds the given token address to the list of allowed tokens. Only callable by current managers.
     */
     function addToken(address _addr)public onlyManager{
        allowedTokens[_addr] = true;

    }
}

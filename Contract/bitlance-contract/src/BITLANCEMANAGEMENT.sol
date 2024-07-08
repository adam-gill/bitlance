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

    function addManager(address _addr)public onlyManager{
        isManager[_addr] = true;

    }

     function addToken(address _addr)public onlyManager{
        allowedTokens[_addr] = true;

    }
}

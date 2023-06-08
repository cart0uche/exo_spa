//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// We import this library to be able to use console.log
import "hardhat/console.sol";


// This is the main building block for smart contracts.
contract SPA {

    event AnimalCreated(uint i);
    event AnimalRemoved(uint i);
    event AnimalAdopted(address addr, uint i);

    struct Animal{
        string race;
        uint size;
        uint age;
        bool isAdopted;
        bool exist;
    }
   
    Animal[] public animals;

    mapping(address=>Animal) owners;
    

    function addAnimal(string calldata race, uint size, uint age) external{
        Animal memory a = Animal(race, size, age, false, true);
        animals.push(a);
        emit AnimalCreated(animals.length-1);
    }

    function removeAnimal(uint i) external {
        require (i<=animals.length -1, "unkown animal");
        require (animals[i].exist == true, "Animal alreadu removed");

        animals[i].exist = false;
        emit AnimalRemoved(animals.length-1);
    }

    function updateAnimal(uint i, string calldata race, uint size, uint age) external {
        require (i<=animals.length -1, "unkown animal");
        require (animals[i].exist == true, "Animal dont exist");

        animals[i].race = race;
        animals[i].size = size;
        animals[i].age = age;
    }

    function adoptAnimal(address addr, uint i)  external{
        require (i<=animals.length -1, "unkown animal");
        require (animals[i].exist == true, "Animal dont exist");
        require (animals[i].isAdopted == false, "Animal already adopted");

        owners[addr] = animals[i];
        animals[i].isAdopted = true;
        emit AnimalAdopted(addr,animals.length-1);
    }
/*
    function abandonAnimal(address addr, uint i)  external{
        require (i<=animals.length -1, "unkown animal");
        require (animals[i].exist == true, "Animal dont exist");
        require (animals[i].isAdopted == true, "Animal is not adopted");

        owners[addr] = Animal("", 0, 0, false, false);
        animals[i].isAdopted = false;
    }
*/
}

const { expect } = require("chai");
const { ethers } = require("hardhat");
const BN = require("bn.js");

describe("Adding Animal", function () {
   beforeEach(async function () {
      [owner] = await ethers.getSigners();
      SPA_Factory = await ethers.getContractFactory("SPA");
      SPA = await SPA_Factory.deploy();
   });

   it("emit event when adding animal", async function () {
      await expect(await SPA.addAnimal("dog", 80, 4))
         .to.emit(SPA, "AnimalCreated")
         .withArgs(0);
   });

   it("get Animal information", async function () {
      await SPA.addAnimal("dog", 80, 4);

      let animal = await SPA.animals(0);
      expect(animal.race).to.be.equal("dog");
      expect(animal.size).to.be.equal(new BN(80));
      expect(animal.age).to.be.equal(new BN(4));
      expect(animal.isAdopted).to.be.false;
      expect(animal.exist).to.be.true;
   });
});

describe("Remove Animal", function () {
   beforeEach(async function () {
      [owner] = await ethers.getSigners();
      SPA_Factory = await ethers.getContractFactory("SPA");
      SPA = await SPA_Factory.deploy();
      await SPA.addAnimal("dog", 80, 4);
   });

   it("emit event when remove animal", async function () {
      await expect(await SPA.removeAnimal(0))
         .to.emit(SPA, "AnimalRemoved")
         .withArgs(0);
   });

   it("should revert event remove unknown animal", async function () {
      await expect(await SPA.removeAnimal(0))
         .to.emit(SPA, "AnimalRemoved")
         .withArgs(0);

      await expect(SPA.removeAnimal(1)).to.be.revertedWith("unkown animal");
   });
});

describe("Adopt Animal", function () {
   beforeEach(async function () {
      [owner, account1] = await ethers.getSigners();
      SPA_Factory = await ethers.getContractFactory("SPA");
      SPA = await SPA_Factory.deploy();
      await SPA.addAnimal("dog", 80, 4);
   });

   it("emit event when adopt animal", async function () {
      await expect(await SPA.adoptAnimal(account1.address, 0))
         .to.emit(SPA, "AnimalAdopted")
         .withArgs(account1.address, 0);
   });

   it("should revert adopt unknown animal", async function () {
      await expect(SPA.adoptAnimal(account1.address, 1)).to.be.revertedWith(
         "unkown animal"
      );
   });
});

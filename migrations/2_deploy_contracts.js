var AshokaCoin = artifacts.require("./AshokaCoin.sol");

module.exports = function (deployer) {
  const initialSupply = 1000000; // Replace with your desired initial supply
  deployer.deploy(AshokaCoin, initialSupply);
};

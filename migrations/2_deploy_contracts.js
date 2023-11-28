var AshokaToken = artifacts.require("./AshokaToken.sol");

module.exports = function(deployer) {
  deployer.deploy(AshokaToken);
};
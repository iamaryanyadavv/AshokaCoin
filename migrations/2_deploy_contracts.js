var AshokaCoin = artifacts.require("./AshokaCoin.sol");

module.exports = function (deployer) {
  deployer.deploy(AshokaCoin);
};

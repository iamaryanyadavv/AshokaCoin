var AshokaCoin = artifacts.require("./AshokaCoin.sol");
var AshokaCoinSale = artifacts.require("./AshokaCoinSale.sol");

module.exports = function (deployer) {
  const initialSupply = 1000000; // Replace with your desired initial supply

  deployer.deploy(AshokaCoin, initialSupply).then(function () {
    return deployer.deploy(AshokaCoinSale, AshokaCoin.address);
  });
};

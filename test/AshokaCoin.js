var AshokaCoin = artifacts.require("./AshokaCoin.sol");

contract("AshokaCoin", function (accounts) {
  var tokenInstance;
  it("Initializes the contract with the correct values", function () {
    return AshokaCoin.deployed()
      .then(function (instance) {
        tokenInstance = instance;
        return tokenInstance.name();
      })
      .then(function (name) {
        assert.equal(name, "AshokaCoin", "has the correct name");
      });
  });

  it("allocates the total supply upon deployment", function () {
    return AshokaCoin.deployed()
      .then(function (instance) {
        tokenInstance = instance;
        return tokenInstance.totalSupply();
      })
      .then(function (totalSupply) {
        assert.equal(
          totalSupply.toNumber(),
          1000000,
          "sets the total supply to 1,000,000"
        );
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then(function (adminBalance) {
        assert.equal(
          adminBalance.toNumber(),
          1000000,
          "it allocated the initial supply to the admin accoint"
        );
      });
  });
});

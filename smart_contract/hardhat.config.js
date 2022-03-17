// https://eth-ropsten.alchemyapi.io/v2/ihi7OjG_J2FobFKAP-fr0iNTv-CDskQs

require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/ihi7OjG_J2FobFKAP-fr0iNTv-CDskQs',
      accounts: ['bad09e5b8cd50b7f4e3b4c827f19edfadf8e53bb6e687efa3fb2b5e6a4b29d80']
    }
  }
}
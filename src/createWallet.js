//Hello devs :)
//importing dependencies
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//defining the network
//bitcoin - main network - mainnet
//testnet - test network - tesnet
const network = bitcoin.networks.testnet

//HD wallet derivation
const path = `m/49'/1'/0'/0` 

//Creating the mnemonic for the seed (password)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Creating the HD wallet root
let root = bip32.fromSeed(seed, network)

//Creating account - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Created wallet")
console.log("Address: ", btcAddress)
console.log("Private key:", node.toWIF())
console.log("Seed:", mnemonic)
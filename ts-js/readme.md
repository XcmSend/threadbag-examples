# Javascript and Typescript examples    


### Run:   
```shell
npm install
$ npm run start

> scenario_signer@1.0.0 start
> ts-node src/sign_mempool.ts

Starting 
fetching transactions for scenario id:  DkaN7anZz
Got response:  [
  {
    chain: 'polkadot',
    amount: '10000000000',
    txType: 'xTransfer',
    Date: '2024-04-30T13:58:33.075819513Z',
    tx: '0xfc04630903000100a10f0300010100c63c1fb2c2d4a97b9aa07b951159b273e0d6a740914f71c074a93499d10e3e450304000000000700e40b54020000000000'
  }
]
Got hex encoded tx:  0xfc04630903000100a10f0300010100c63c1fb2c2d4a97b9aa07b951159b273e0d6a740914f71c074a93499d10e3e450304000000000700e40b54020000000000
decoding tx...
tx human:  {
  isSigned: false,
  method: {
    args: {
      dest: [Object],
      beneficiary: [Object],
      assets: [Object],
      fee_asset_item: '0',
      weight_limit: 'Unlimited'
    },
    method: 'limitedTeleportAssets',
    section: 'xcmPallet'
  }
}
Destination parachain:  1,000
Destination account:  0xc63c1fb2c2d4a97b9aa07b951159b273e0d6a740914f71c074a93499d10e3e45
Asset Amount:  10,000,000,000
verifying that its one dot
one dot verified amount
verifying dest chain is assethub 
dest chain is assethub 
transaction checks are ok
Signing and Broadcasting tx 
signature:  Uint8Array(64) [
  210, 206, 122, 136, 182,  29,  40, 142, 210, 105, 138,
  195,  76, 146, 187,  92, 215, 143, 213,  83, 126,  60,
    0,  79, 113,  32, 198,  13,  23, 186, 170,  37, 135,
  138, 126,  24, 131, 222,   0, 134,  53,  42, 206, 167,
   32,  44,  41, 158,  57, 115, 188,  59, 170, 216, 154,
   87, 186,  29, 211, 195,  65,  37,  33, 134
]
Finished
```



#### Bagpipe scenario:  
<insert screenshot>

Link:

Scenario id:  


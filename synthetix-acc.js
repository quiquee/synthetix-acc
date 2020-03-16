// Etherscan API Documentation
// https://sebs.github.io/etherscan-api/

var addr = '0xe69c9cD0b1653d47f0106d444923031A798ab4C7' ;
var api = require('etherscan-api').init('C6344EGJQ7HIY4HRHZZE72M2YBAVX8A3526T7EXE');
var balance = api.account.balance(addr);
balance.then(function(balanceData){
  console.log(balanceData.result/10e18);
});

var txlist=api.account.txlist(addr,9450733, 'latest', 1, 100, 'asc');
txlist.then(function(txlistData){
  // console.log(txlistData.result);
  var snxAddr='0xc011a72400e58ecd99ee497cf89e3775d4bd732f';

  for (var tx of txlistData.result) {

    if (tx.to == snxAddr) {
      var res = api.proxy.eth_getTransactionByHash(tx.hash);
      res.then(function(txData){
        console.log(tx.hash , " -> ", txData);
      })
    }
  }
})

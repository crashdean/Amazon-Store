var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3307
  port: 3307,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "amazon_storeDB"
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
  start();
});
function start() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function (err, results) {
    //   console.log(results)
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "itemId",
          type: "list",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_id);
              // console.log(choiceArray);
            }
            return choiceArray;
          },
          message: "What product ID would you like to buy?",
        },
        {
          name: "stockQuantity",
          type: "input",
          message: "How many units of the product would you like to buy?",
        }


      ])
      .then(function (answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === answer.itemId) {
            chosenItem = results[i];
            console.log(chosenItem);

            // purchaseItem();
          }   
        }
        if (chosenItem.stock_quantity > answer.stockQuantity) {
          console.log("You purchase was sucsessful!");
        }
      });
  }
  )
}

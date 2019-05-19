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
  inquirer
    .prompt({
      name: "purchaseItem",
      type: "list",
      message: "Would you like to [Purchase] an product or [Exit] from the store?",
      choices: ["Purchase", "EXIT"]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.purchaseItem === "Purchase") {
        purchase();
      }
      else {
        connection.end();
      }
    });
}

function purchase() {
  // query the mysql data base for products
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    var listItems;
    for (var i = 0; i < results.length; i++) {
      if (results[i]) {
        listItems = results[i];
        console.log(listItems);
      }
    }
    // Ask the user to choose an item to purchase
    inquirer
      .prompt([
        {
          name: "itemId",
          type: "list",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_id);
            }
            return choiceArray;
          },
          message: "What product ID would you like to buy?",
          // Ask th euser to choose an amount to purchase
        },
        {
          name: "stockQuantity",
          type: "input",
          message: "How many units of the product would you like to buy?",
        }
      ])

      // Here we run through the results from the data base to compare it with the item selected
      .then(function (answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === answer.itemId) {
            chosenItem = results[i];
            console.log(chosenItem);
          }
        }
        // Determine if quantity on hand is enough for purchase
        // Determine if there is enough of the product to purchase.
        // Update the stock quantity in the mysql data base
        // Display the cost of the items selected
        if (chosenItem.stock_quantity > answer.stockQuantity) {
          var updatedQuantity = chosenItem.stock_quantity - parseInt(answer.stockQuantity);
          var updateCost = chosenItem.price * parseInt(answer.stockQuantity);
          console.log("Updated stock quantity is " + updatedQuantity);
          console.log("Your purchase of " + answer.stockQuantity + " " + chosenItem.product_name + " was sucsessful!");
          console.log("Your cost is $" + answer.stockQuantity * chosenItem.price + " for your " + chosenItem.product_name);
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: updatedQuantity
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function (error) {
              if (error) throw err;
              start()
            })
        }
        else {
          console.log("There wasn't enough quantity in stock for your purchase");
        }
      }
      )
  }
  )
}

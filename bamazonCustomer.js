//connection to the mysql database
var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "13Icancode!!!",
    database: "bamazon"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();

});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(
                `${res[i].item_id} | ${res[i].product_name} | ${res[i].price} `
            )
        }
        console.log("------------------------");
        connection.end();
        userPrompt();
    });
}

function userPrompt() {
    inquirer.prompt([
        {
            name: "purchaseItem",
            type: "input",
            message: "Type in the id of the item you would like to purchase.",
        },
        {
            name: "purchaseQuantity",
            type: "input",
            message: "How many units would you like to purchase?"
        }

    ])
};
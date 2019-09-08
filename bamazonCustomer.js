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

//function to display inventory once connected is made
function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(
                `${res[i].item_id} | ${res[i].product_name} | ${res[i].price} `
            )
        }
        console.log("------------------------");
        //connection.end();
        //console.log(JSON.stringify(res));
        userPrompt(res);
    });
}

//function to prompt user as to what they would like to purchase
function userPrompt(results) {
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
        .then(function (answer) {
            //  console.log(JSON.stringify(answer));

            for (var i = 0; i < results.length; i++) {
                if (answer.purchaseItem.toString() === results[i].item_id.toString()) {
                    if (results[i].stock_quantity >= answer.purchaseQuantity) {

                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: results[i].stock_quantity - answer.purchaseQuantity
                                },
                                {
                                    item_id: answer.purchaseItem
                                }
                            ],
                            function (err) {
                                if (err) throw err;
                                console.log(
                                    `Thank you for your order. You will be billed for ${}`
                                );
                            }
                        )

                    }
                    else {

                        console.log("Sorry, not enough inventory, try again");
                        connection.end();
                    }

                }

            };
        })

};






#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


let userIdNumber:number = Math.floor(10000 + Math.random() * 90000);

let userBalance:number = 0;
let answer = await inquirer.prompt(
    [
        {
            name:"students",
            type:"input",
            message:"Enter Student Name:",
            validate: function (value){
                if (value.trim() !== ""){
                    return true;
                }
                return "Please Enter a Valid value";
            },
        },
        {
            name:"coures",
            type:"list",
            message:"Select the Course:",
            choices:["HTML","CSS","TypeScript","JavaScript","Python","C++"]
        }
    ]
);

let coursesFees: {[key:string]:number} ={
    "HTML":5000,
    "CSS":4000,
    "TypeScript":9000,
    "JavaScript":9000,
    "Python":10000,
    "C++":9000
};

console.log(`\nCourse Fees:${coursesFees[answer.coures]}\n`);
console.log(`\nBalance: ${userBalance}\n`);


let paymentType = await inquirer.prompt(
    [
        {
            name:"payment",
            type:"list",
            message:"Select Payment Method",
            choices:["Bank Transfer","EasyPaisa","JazzCAsh"]
        },
        {
            name:"amount",
            type:"input",
            message:"Transfer Money",
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please Enter a valid value.";
            },
        }
]);

console.log(chalk.yellow(`\nYou Select Payment Method:${chalk.green(paymentType.payment)}\n`));
const  tutionFee = coursesFees[answer.coures] ;
const paymentAmount = parseFloat(paymentType.amount)

if(tutionFee === paymentAmount) {
    console.log(chalk.yellow(`\ncongratulations, You have Successfully Enrolled in ${chalk.green(answer.coures)}\n`));
    
    let ans = await inquirer.prompt([
        {
           name:"Select",
           type:"list",
           message:"What would you like to do next?",
           choices:["View Status","Exit"]
        }   
    ])
    if ( ans.Select === "View Status"){
        console.log("\n ******STATUS******\n");
        console.log(chalk.green(`Student Name: ${chalk.yellow(answer.students)}`));
        console.log(chalk.green(`Student ID: ${chalk.yellow(userIdNumber)}`));
        console.log(chalk.green(`Courses: ${chalk.yellow(answer.coures)}`));
        console.log(chalk.green(`Tution Fees Paid: ${chalk.yellow(paymentAmount)}`));
        console.log(chalk.green(`Balance: ${chalk.yellow(userBalance += paymentAmount)}`));

    } else {
       console.log(chalk.red("\nExiting Student Managemant System\n"));
    }

} else {
    console.log(chalk.red("Invalid Amount due to course"));
    
}






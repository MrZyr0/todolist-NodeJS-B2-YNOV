const readline = require('readline')

const db = require('./db')



function askUser() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    return new Promise ((resolve, reject) => {
        rl.question('What do you want to do ? ', (answer) => {
            rl.close()
            resolve(answer)
        })
    })
}


const runActivity = (choice) => new Promise((resolve, reject) => {
    switch (choice) {
        case 'help':
            displayHelp()
        break

        case 'todo':
            displayTodoTasks()
        break
    
        case 'inprogress':
            displayInprogressTasks()
        break

        case 'done':
            displayDoneTasks()
        break

        case 'clearDone':
            clearDoneTasks()
        break

        case 'exit':
            resolve()
        
        default:
            throw('An error has occured. Please check your input and retry :')
    }
    resolve()
})


const displayTodoTasks = () => new Promise((resolve, reject) => {
    console.log('\nToday you have to :')
    db.todo.forEach(element => {
        console.log(`- ${element.name}`)
    })
    console.log()
    resolve()
})


const displayInprogressTasks = () => new Promise((resolve, reject) => {
    console.log('\nYou have already started :')
    db.inprogress.forEach(element => {
        console.log(`- ${element.name}`)
    })
    console.log()
    resolve()
})


const displayDoneTasks = () => new Promise((resolve, reject) => {
    console.log('\nYou have already done :')
    db.done.forEach(element => {
        console.log(`- ${element.name}`)
    })
    console.log()
    resolve()
})


const clearDoneTasks = () => new Promise((resolve, reject) => {
    console.log('\nCleaning done tasks...')
    for (let index = 0; index < db.done.length; index++) { delete db.done[index] }
    console.log('Cleaning complete !\n')
    resolve()
})


const displayHelp = () => new Promise((resolve, reject) => {
    console.log('\n -------- HELP -------- ')
    console.log('todo - view todo list')
    console.log('inprogress - view list of inprogress things')
    console.log('done - view done things')
    console.log('clearDone - clear all done things')
    console.log('exit - quit the program')
    console.log('help - display this help')
    console.log(' -------- HELP -------- \n')

    resolve()
})


async function start() {
    let userChoice
    
    while (userChoice != 'exit') {
        userChoice = await askUser()
        try {
            await runActivity(userChoice)
        } catch (e) {
            console.log(e)
        }
    }

    console.log('\n\n# PROGRAM EXITED #\n')
}


start()

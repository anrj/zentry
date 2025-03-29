// import psList from "ps-list";
// import { exec } from "child_process";
// import inquirer from "inquirer";

// const blocked = ["steam.exe"];

// const listItems = (items) => {
//     const questions = [{
//         type: 'checkbox',
//         name: 'blocked',
//         message: 'Choose Apps to block: ',
//         choices: items
//     }]

//     inquirer.prompt(questions).then(answers => {
//         console.log(answers.blocked)
//     })
// }

// const getProcesses = async () => {
//     const processes = await psList();

//     let parentIDs = [];
//     let parentNames = [];

//     for (let i = 0; i < processes.length; i++) {
//         let process = processes[i];

//         if (parentIDs.includes(process.ppid) || parentNames.includes(process.name.split('.')[0])) continue;
//         parentIDs.push(process.pid);
//         parentNames.push(process.name.split('.')[0]);
//     }

//     return parentNames
// };

// const blockProcesses = async (blocked) => {
//     const processes = await psList();

//     processes.forEach((process) => {
//         if (blocked.includes(process.name.toLowerCase())) {
//             console.log(`Blocking: ${process.name}`);

//             exec(`taskkill /PID ${process.pid} /F`, (err) => {
//                 if (err) {
//                     console.error(`Error killing process: ${err}`);
//                 } else {
//                     console.log(`Successfully blocked: ${process.name}`);
//                 }
//             });
//         }
//     });
// }

// console.log(getProcesses())
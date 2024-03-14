import inquirer from 'inquirer';
import { getDistroID } from './distro_utils';


async function main(){
    console.log(await getDistroID())
    const preferedIDE = await inquirer.prompt([
        {
            type: "list",
            name: "Select your prefered IDE",
            choices: ["VS Code", "Android Studio"]
        }
    ])
}

main()

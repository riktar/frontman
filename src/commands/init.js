const { Command, flags } = require("@oclif/command");
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const ora = require("ora");
const inquirer = require("inquirer");
const npm = require("npm-commands");
const {
  write,
  isEmpty,
  emptyDir,
  isValidPackageName,
  toValidPackageName,
} = require("../utils/fns");

class InitCommand extends Command {
  async run() {
    const { flags } = this.parse(InitCommand);
    const cwd = process.cwd();
    let overwrite = false;

    // get project name
    const name =
      flags.name ||
      (
        await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Project name:",
            default: "frontman-project",
            validate: (val) => !!val
          },
        ])
      )["name"];

    // define if targetDir is empty and overwrite
    let targetDir = name;
    try {
      if (fs.existsSync(targetDir) || !isEmpty(targetDir)) {
        overwrite =
          flags.framework ||
          (
            await inquirer.prompt([
              {
                type: "confirm",
                name: "overwrite",
                message: `Target directory "${targetDir}" is not empty. Remove existing files and continue?`,
              },
            ])
          )["overwrite"];
        if (overwrite == false) {
          this.log(`${chalk.red("✖")} Operation cancelled`);
          this.exit();
        }
      }
    } catch (e) {
      if (e.message === "EEXIT: 0") {
        this.exit();
      }
    }

    // get the framework
    const framework =
      flags.framework ||
      (
        await inquirer.prompt([
          {
            type: "list",
            name: "framework",
            message: "Select a Framwork",
            choices: [{ name: "React", value: "react" }],
          },
        ])
      )["framework"];

    //get the template
    const template =
      flags.template ||
      (
        await inquirer.prompt([
          {
            type: "list",
            name: "template",
            message: "Select a Template",
            choices: [
              {
                name: `${chalk.bold.yellow(
                  "Default App"
                )} - SPA using Vite, Tailwind, React Router and MobX State Tree`,
                value: "spa-base",
              },
            ],
          },
        ])
      )["template"];

    // define the root path
    const root = path.join(cwd, targetDir);

    // clean destination folder
    if (overwrite) {
      emptyDir(targetDir);
    } else if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }

    // define template folder path
    const templateDir = path.join(
      __dirname,
      `../framework/${framework}/template/${template}`
    );

    // start!
    this.log();
    const spinner = ora(`Scaffolding project in ${chalk.cyan(root)}`).start();

    // copy folder from template path to destination path
    const files = fs.readdirSync(templateDir);
    for (const file of files.filter((f) => f !== "package.json")) {
      write(root, file, templateDir);
    }

    // create package.json
    const pkg = fs.existsSync(path.join(templateDir, `package.json`))
      ? require(path.join(templateDir, `package.json`))
      : false;
    if (pkg) {
      pkg.name = isValidPackageName(targetDir)
        ? targetDir
        : toValidPackageName(targetDir);
      write(root, "package.json", null, JSON.stringify(pkg, null, 2));
    }
    spinner.stopAndPersist({
      symbol: chalk.green("✔"),
      text: `Scaffolding project in ${chalk.cyan(root)}`,
    });

    // installing dependencies
    this.log();
    spinner.stopAndPersist({
      symbol: chalk.yellow("..."),
      text: `Installing dependencies`,
    });

    // launch npm i
    npm().cwd(path.relative(cwd, root)).install();

    // finish!
    spinner.stopAndPersist({
      symbol: chalk.green("✔"),
      text: `Installing dependencies`,
    });

    this.log(`\n${chalk.green("ALL DONE!")} Now run:\n`);
    if (root !== cwd) {
      console.log(`  ${chalk.yellow(`cd ${path.relative(cwd, root)}`)}`);
    }
    this.log();
    this.log(`and read the ${chalk.cyan("README.md")} file!`);
    this.log();
  }
}

InitCommand.description = `Init a new project
Create a new project using a scaffolding
`;

InitCommand.flags = {
  name: flags.string({ char: "n", description: "name of project" }),
  framework: flags.string({ char: "f", description: "framework of project" }),
  template: flags.string({
    char: "t",
    description: "specific template of project",
  }),
};

module.exports = InitCommand;

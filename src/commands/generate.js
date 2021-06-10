const { Command, flags } = require("@oclif/command");
const fs = require("fs");
const chalk = require("chalk");
const ora = require("ora");
const inquirer = require("inquirer");
const path = require("path");
const { capitalizeFirstLetter, toValidPackageName } = require("../utils/fns");
const { generateComponent, generatePage, generateRoute } = require("../utils/generate.utils");

class GenerateCommand extends Command {
  async run() {
    const { args, flags } = this.parse(GenerateCommand);
    const res = fs.existsSync(path.join(process.cwd(), "frontman.config.js"));
    if (!res) {
      this.log(`${chalk.red("✖")} frontman.config.js not found`);
      this.exit();
    }
    // init config
    const config = require(path.join(process.cwd(), "frontman.config.js"));
    const { framework } = config;
    const { type } = args;
    const capType = capitalizeFirstLetter(type)

    // get name
    const name =
      flags.name ||
      (
        await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Component name:",
            default: `Frontman${capType}`,
            validate: (val) => !!val
          },
        ])
      )["name"];

      // template dir
    const templateDir = path.join(
      __dirname,
      `../framework/${framework}/hbs-templates`
    );

    switch (type) {
      case "component":
        generateComponent(name, config, templateDir);
        break;
      case "page":
        generatePage(name, config, templateDir);
        const route = (
          await inquirer.prompt([
            {
              type: "input",
              name: "route",
              message: "Insert the route (start with /):",
              default: `/${toValidPackageName(name)}`,
              validate: (val) => !!val && val[0] === '/'
              
            },
          ])
        )["route"];
        generateRoute(name, route, config, templateDir)
        break;
      default:
        this.log(`${chalk.red("✖")} type not valid`);
        this.exit();
    }

    this.log(`${chalk.green("DONE!")}`);
  }
}

GenerateCommand.description = `Generate a new element for your app
...
Generate a component or a page by command line
`;

GenerateCommand.args = [
  {
    name: "type",
    description: "type of element to generate",
    required: true,
    options: ["component", "page"],
  },
];

GenerateCommand.flags = {
  name: flags.string({ char: "n", description: "name of project" }),
};

module.exports = GenerateCommand;

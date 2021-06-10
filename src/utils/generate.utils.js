const handlebars = require("handlebars");
const ora = require("ora");
const path = require("path");
const { read, write, toValidPackageName } = require("../utils/fns");
const fs = require("fs");

handlebars.registerHelper("json", function (context) {
  return JSON.stringify(context);
});

const generateComponent = (name, config, templateDir) => {
  const spinner = ora(`Scaffolding ${name}`).start();
  // prepare path
  const componentsDir = path.join(process.cwd(), config.path.components);
  const destinationDir = path.join(componentsDir, name);
  // get component
  const templateComponent = read(
    path.join(templateDir, "component", `component.hbs`)
  );
  const compiledComponent = handlebars.compile(templateComponent);
  // get style
  const templateStyles = read(
    path.join(templateDir, "component", `styles.module.hbs`)
  );
  const compiledStyles = handlebars.compile(templateStyles);

  // write file
  fs.mkdirSync(destinationDir, { recursive: true });
  write(destinationDir, `index.jsx`, null, compiledComponent({ name }));
  write(destinationDir, "styles.module.css", null, compiledStyles({ name }));
  spinner.succeed();
};

const generatePage = (name, config, templateDir) => {
  const spinner = ora(`Scaffolding ${name}`).start();
  // prepare path
  const pageDir = path.join(process.cwd(), config.path.pages);
  const destinationDir = path.join(pageDir, name);
  const templatePage = read(path.join(templateDir, "page", `page.hbs`));
  const compiledPage = handlebars.compile(templatePage);

  // get style
  const templatePageStyles = read(
    path.join(templateDir, "page", `styles.module.hbs`)
  );
  const compiledPageStyles = handlebars.compile(templatePageStyles);

  // write file
  fs.mkdirSync(destinationDir, { recursive: true });
  write(destinationDir, `index.jsx`, null, compiledPage({ name }));
  write(
    destinationDir,
    "styles.module.css",
    null,
    compiledPageStyles({ name })
  );
  spinner.succeed();
};

const generateRoute = (name, route, config, templateDir) => {
  const spinner = ora(`Scaffolding route ${route}`).start();
  // prepare path
  const routerDir = path.join(process.cwd(), config.path.router);
  const routes = require(path.join(routerDir, "router.json"));

  // add route
  if (routes.find((x) => x.props.path === route)) {
    spinner.fail("Route already exists! SKIP!");
    return false;
  }
  routes.splice(routes.length - 1, 0, {
    key: name,
    props: {
      path: route,
    },
  });

  //rewrite json
  write(routerDir, "router.json", null, JSON.stringify(routes));

  // get router
  const templateRouter = read(path.join(templateDir, "page", `router.hbs`));
  const compiledRouter = handlebars.compile(templateRouter);

  write(routerDir, `router.jsx`, null, compiledRouter({ routes }));
  spinner.succeed();
};

module.exports = { generateComponent, generatePage, generateRoute };

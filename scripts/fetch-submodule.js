const { exit } = require("process");
const shell = require("shelljs");

if (!shell.which("git")) {
  shell.echo("Sorry, this script requires git");
  shell.exit(1);
}

shell.exec("git submodule init && git submodule update");
console.log("finished");
exit();

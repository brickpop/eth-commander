#!/usr/bin/env node

const path = require("path");
const { startGeth } = require("./geth.js");

require("yargs")
  .usage("$0 [command] (options)")
  .command({
    command: "geth",
    describe: "Start a local ethereum node (RPC + CORS)",
    builder: function(yargs) {
      return yargs
        .option("local", {
          alias: "l",
          default: true,
          type: "boolean",
          describe: "Make the node local"
        })
        .option("console", {
          alias: "c",
          default: true,
          type: "boolean",
          describe: "Show the geth console"
        })
        .option("clean", {
          default: false,
          type: "boolean",
          describe: "Clean the geth data when done (local only)"
        });
    },
    handler: runGeth
  })
  .command({
    command: "ide",
    describe: "Launch Remix IDE and local geth node",
    builder: function(yargs) {
      return yargs
        .option("local", {
          alias: "l",
          default: true,
          type: "boolean",
          describe: "Make the node local"
        })
        .option("console", {
          alias: "c",
          default: true,
          type: "boolean",
          describe: "Show the geth console"
        })
        .option("clean", {
          default: false,
          type: "boolean",
          describe: "Clean the geth data when done (local only)"
        });
    },
    handler: runIDE
  })
  .command({
    command: "dev",
    describe:
      "Open a web with web3 injected and start geth node (local by default)",
    builder: function(yargs) {
      return yargs.option("local", {
        alias: "l",
        default: true,
        type: "boolean",
        describe: "Run a local ethereum node"
      });
    },
    handler: runDev
  })
  .command({
    command: "build [files...]",
    describe: "Compile the given files",
    builder: function(yargs) {
      return yargs.option("output", {
        alias: "o",
        type: "string",
        default: ".",
        describe: "Output folder"
      });
    },
    handler: runBuild
  })
  .command({
    command: "watch [files...]",
    describe: "Compile and rebuild if changed",
    builder: function(yargs) {
      return yargs.option("output", {
        alias: "o",
        type: "string",
        default: ".",
        describe: "Output folder"
      });
    },
    handler: runWatch
  })
  .command({
    command:
      "deploy [contract-name] [code-file] [abi-file] [contract-parameters]",
    describe: "Deploy a contract and display the address",
    handler: runBuild
  })
  .command({
    command: "run",
    describe: "Run a transaction on a given contract",
    handler: runTransaction
  })
  .demandCommand()
  .help().argv;

// handlers
function runGeth(argv) {
  startGeth(argv.local, argv.console, argv.clean);
}

function runIDE(argv) {
  console.log("Launching Remix IDE...");
  require("open")(path.join(__dirname, "..", "remix", "index.html"));

  startGeth(argv.local, argv.console, argv.clean);
}

function runWatch(argv) {
  console.log("WATCH", argv);
}

function runDev(argv) {
  console.log("DEV", argv);
}

function runBuild(argv) {
  console.log("BUILD", argv);
}

function runTransaction(argv) {
  console.log("RUN", argv);
}

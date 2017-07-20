#!/usr/bin/env node

require("yargs")
  .usage("$0 [command] (options)")
  .command({
    command: "geth",
    describe: "Start a local ethereum node (RPC + CORS)",
    builder: function(yargs) {
      return yargs.option("local", {
        alias: "l",
        default: true,
        type: "boolean",
        describe: "Run a local ethereum node"
      });
    },
    handler: runGeth
  })
  .command({
    command: "ide",
    describe: "Launch Remix IDE and local geth node",
    builder: function(yargs) {
      return yargs.option("local", {
        alias: "l",
        default: true,
        type: "boolean",
        describe: "Run a local ethereum node"
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
    handler: runIDE
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
  console.log("GETH", argv);
}

function runIDE(argv) {
  console.log("IDE", argv);
}

function runWatch(argv) {
  console.log("WATCH", argv);
}

function runBuild(argv) {
  console.log("BUILD", argv);
}

function runTransaction(argv) {
  console.log("RUN", argv);
}

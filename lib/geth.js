const shell = require("shelljs");
const fs = require("fs");
const path = require("path");
const { asyncSpawn } = require("./util.js");

// State Variables

var baseFolder, genesisFile;
switch (process.platform) {
  case "darwin":
  case "linux":
  case "sunos":
  case "freebsd":
    baseFolder = process.env.HOME;
    break;
  case "win32":
    baseFolder = process.env.APPDATA;
    break;
  default:
    shell.echo("Unsupported platform");
    process.exit(1);
}
baseFolder = path.join(baseFolder, "geth-temp");
genesisFile = path.join(__dirname, "genesis.json");

// Routines

async function startGeth(localNode, showConsole, autoClean) {
  try {
    if (localNode) {
      if (!fs.existsSync(path.join(baseFolder, "geth"))) {
        await initLocalGeth();
      }

      const gethParameters = [
        "--datadir=" + baseFolder,
        "--rpc",
        "--rpcaddr=0.0.0.0",
        // "--rpcport",
        // "8545"
        "--rpccorsdomain",
        "*",
        // '--mine',
        // '--unlock="0 1"',
        // '--verbosity=5',
        "--maxpeers=0",
        "--minerthreads=2",
        "--networkid=12345",
        "--nodiscover"
      ];
      if (showConsole) gethParameters.push("console");

      shell.echo("Starting local geth...");
      await asyncSpawn("geth", gethParameters);
      shell.echo("Done");
    } else {
      const gethParameters = [
        "--rpc",
        "--rpcaddr=0.0.0.0",
        "--rpcport",
        "8545",
        "--rpccorsdomain",
        "*"
      ];
      if (showConsole) gethParameters.push("console");

      shell.echo("Starting geth...");
      await asyncSpawn("geth", gethParameters);
      shell.echo("Done");
    }
    if (localNode && autoClean) await cleanDataDir();
  } catch (err) {
    console.log("Geth ERROR:", err);
  }
}

async function initLocalGeth() {
  shell.echo("Running geth init...");

  await asyncSpawn("geth", ["--datadir", baseFolder, "init", genesisFile]);
  await asyncSpawn("geth", [
    "--datadir",
    baseFolder,
    "--password",
    path.join(process.cwd(), "lib", "local-geth-password"),
    "account",
    "new"
  ]);

  shell.echo("Done\n");
}

async function cleanDataDir() {
  shell.echo(`Cleaning geth data (${baseFolder})`);
  shell.rm("-Rf", baseFolder);
}

module.exports = {
  startGeth,
  initLocalGeth
};

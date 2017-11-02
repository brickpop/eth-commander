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

async function startGeth(localNode, testNet, showConsole, autoClean) {
  try {
    if (localNode) {
      if (!fs.existsSync(path.join(baseFolder, "geth"))) {
        await initLocalGeth();
      }

      let gethParameters = [
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
      let gethParameters = [
        "--rpc",
        "--rpcaddr=0.0.0.0",
        "--rpcport",
        "8545",
        "--rpccorsdomain",
        "*"
      ];
      if (testNet) {
        gethParameters = gethParameters.concat([
          "--testnet",
          "--syncmode",
          "fast",
          // --rpc
          "--rpcapi",
          "db,eth,net,web3,personal",
          "--cache=1024",
          // --rpcport
          // 8545
          // --rpcaddr
          // 127.0.0.1
          // --rpccorsdomain
          // "*"
          "--bootnodes",
          "enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303,enode://6ce05930c72abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303"
        ]);
      }
      if (showConsole) gethParameters.push("console");

      shell.echo(`Starting geth (${testNet ? "Ropsten" : "Main network"})`);
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

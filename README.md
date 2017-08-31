Ethereum Blockchain Commander
---

This project is a work in progress

## Usage 
### Geth
Use `ec` to init and start a `geth` node

```
ec geth
```

This will create a local `geth` node with an initial account (if needed). To unlock this account, use `test` as a password.

### Development with Remix
You can launch the Remix IDE on top of a local `geth` node by running:

```
geth ide
```

A browser will open. From the "Account" dropdown in Remix, choose "Web3 provider" and enter the URL of your RPC node.

Same as above, this will create an initial account with `test` as a password.

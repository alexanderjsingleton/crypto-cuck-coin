const sha256 = require('js-sha256');

// Define the Block Class
class Block {
  constructor(index, data, previousHash) {
    this.index = index;
    this.timestamp = new Date();
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.generateHash();

  }

  generateHash() {
    return sha256.hex(`${this.index}${this.timestamp}${this.data}${this.previousHash}`);
  }
}

// Create genesis block
function createGenesisBlock() {
  return new Block(0, 'Genesis Block', '0');
}

// Create all other blocks
function createNextBlock(previousBlock, data=null) {
  const index = previousBlock.index + 1;
  const previousHash = previousBlock.hash;
  return new Block(index, data, previousHash);
}

// Demo
// Create the Blockchain
const blockchain = [createGenesisBlock()];
let previousBlock = blockchain[0];

for (let i=0; i<20; i++) {
  const block = createNextBlock(previousBlock);
  blockchain.push(block);
  previousBlock = block;

  console.log(`Block #${block.index} has been added to the blockchain!.`);
  console.log(`Hash: ${block.hash}\n`);
}
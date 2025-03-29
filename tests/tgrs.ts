import GrsP2P, { PeerOptions } from "../src";
import { NetAddress } from "../src/messages/address";
import Message from "../src/messages/message";

(async () => {
  const options: PeerOptions = {
    ticker: "tGRS",
    node: `108.61.99.169`,
    DEBUG_LOG: true,
    mempoolTxs: true,
    user_agent: "/GroestlCoin P2P/"
  };
  const peer = new GrsP2P(options);

  peer.timeoutConnect=60000
  peer.once("connected", () => {
    console.log(`Connected event!`);
  });

  peer.on("tx_mempool", ({ tx }) => {
    console.log(`Received mempool tx`, tx);
  });
  peer.on(
    "tx_block",
    ({
      blockHash,
      header,
      started,
      finished,
      height,
      blockSize,
      txCount,
      txs,
    }) => {
      console.log(`Received ${txs.length} block txs`);
    }
  );
  peer.on("error_message", ({ error, buffer, magic, extmsg }) => {
    try {
      const message = Message.read({ buffer, magic, extmsg });
      // const { command, payload, end, needed } = message;
      console.error(`ERROR MESSAGE`, message, error);
    } catch (err) {
      console.error(`ERROR MESSAGE: Message parse error`, error, err);
    }
  });
  peer.on("block_chunk", (obj) => {
    console.log(`Received block chunk`, obj);
  });
  peer.on("headers", (obj) => {
    // console.log(`Received headers`, obj);
  });
  peer.on("addr", ({ addrs }: { addrs: NetAddress[] }) => {
    addrs.map((addr) => console.log(addr));
  });
  peer.on("disconnected", ({ disconnects }) => {
    console.log(`Disconnected to peer`);
  });
    console.log(peer)

  await peer.connect();

  console.log(`Connected`);
  const delay = await peer.ping();
  console.log(`Peer responded in ${delay} ms`);

  await new Promise((r) => setTimeout(r, 1000 * 3));
  console.log(`Getting peers of peers`);
  
  let addrs = await peer.getAddr();
  // console.log(addrs);

  const headers = await peer.getHeaders({});
  console.log(`Headers`, headers);

  // peer.fetchMempoolTxs((txids) => txids); // Return filtered txids to download mempool txs
  // peer.fetchNewBlocks((hashes) => hashes); // Return filtered block hashes to download new blocks

  // await new Promise((r) => setTimeout(r, 1000 * 3));
  console.log(`Getting block...`);
  let blockInfo = await peer.getBlock(
    "00000035e3ef8add5a9ae7ea5cbee151321e2a8bb9a449c85cea6f3151d0d414"
  );
  console.log(blockInfo);
  

  await peer.disconnect();
  process.exit(0);
})();

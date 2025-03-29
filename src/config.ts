const MAGIC_NUMS: { [key: string]: Buffer } = {

  GRS: Buffer.from("f9beb4d4","hex"),
  t4GRS: Buffer.from("0b110907","hex"),
  sGRS: Buffer.from("6f892b8f","hex"),
  rGRS: Buffer.from("fabfb5da","hex"),

  DEFAULT: Buffer.from("f9beb4d4", "hex"),
} as const;

const PORTS: { [ticker: string]: number } = {
  GRS:1331,
  t4GRS:17777,
  rGRS:18888,
  sGRS:31331,
  DEFAULT:1331,

} as const;

const VERSIONS: { [ticker: string]: number } = {
  GRS: 70016,
  t4GRS: 70016,
  rGRS: 70016,
  sGRS: 70016,
  DEFAULT: 70016,
} as const;

const SEGWIT: { [ticker: string]: boolean } = {
  GRS: true,
  t4GRS: true,
  rGRS: true,
  sGRS: true,
  DEFAULT: true,
} as const;

const USER_AGENTS: { [ticker: string]: string } = {
  GRS: "/GroestlCoin P2P/",
  t4GRS: "/GroestlCoin P2P/",
  rGRS: "/GroestlCoin P2P/",
  sGRS: "/GroestlCoin P2P/",
  DEFAULT: "/GroestlCoin P2P/",
} as const;

const MAX_PER_MSG = 50000 as const;

export { MAGIC_NUMS, VERSIONS, USER_AGENTS, SEGWIT, MAX_PER_MSG };

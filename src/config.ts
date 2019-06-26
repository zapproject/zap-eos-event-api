const config = {
  actions: [
    "addendpoint", "newprovider", "bond", "unbond",
    "estimate", "query", "cancelquery", "respond",
    "subscribe", "unsubscribe"
  ],
  baseKeepTime: 180,
  contract: "zapcoretest1",
  mongoUrl: "mongodb://172.17.0.2:27017",
  netUrl: "http://jungle2.cryptolions.io:80"
 // netUrl: "http://127.0.0.1:8888"
};

export default config;

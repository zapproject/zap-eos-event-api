const config = {
  actions: [
    "addendpoint", "newprovider", "bond", "unbond",
    "estimate", "query", "cancelquery", "respond",
    "subscribe", "unsubscribe"
  ],
  baseKeepTime: 180,
  contract: "zap.main",
  mongoUrl: "mongodb://172.17.0.2:27017",
  netUrl: "http://127.0.0.1:8888"
};

export default config;

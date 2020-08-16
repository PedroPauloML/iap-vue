// import stocks_data from "@/data/stocks";

export default {
  state: {
    funds: 10000,
    stocks: [],
  },
  mutations: {
    buyStocks(state, { stockId, stockPrice, quantity }) {
      const record = state.stocks.find((element) => element.id == stockId);

      if (record) {
        record.quantity += quantity;
      } else {
        state.stocks.push({
          id: stockId,
          price: stockPrice,
          quantity: quantity,
        });
      }
      state.funds -= stockPrice * quantity;
    },
    sellStock(state, { stockId, stockPrice, quantity }) {
      const record = state.stocks.find((element) => element.id == stockId);

      if (record.quantity > quantity) {
        record.quantity -= quantity;
      } else {
        state.stocks.splice(state.stocks.indexOf(record), 1);
      }

      state.funds += stockPrice * quantity;
    },
    setPortfolio(state, portfolio) {
      state.funds = portfolio.funds;
      state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
    },
  },
  actions: {
    sellStock({ commit }, order) {
      commit("sellStock", order);
    },
  },
  getters: {
    stockPortfolio(state, getters) {
      return state.stocks.map((stock) => {
        const record = getters.stocks.find((element) => element.id == stock.id);
        return {
          id: stock.id,
          quantity: stock.quantity,
          name: record.name,
          price: record.price,
        };
      });
    },
    funds(state) {
      return state.funds;
    },
  },
};

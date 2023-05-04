const axios = require('axios').default

const PAGINATED_AMOUNT = 100

const getTotalBrc20Numbers = async (address) => {
  try {
    const url = `https://unisat.io/brc20-api-v2/address/${address}/brc20/summary?start=0&limit=1`
    const res = await axios.get(url)
    if (res.data.msg === 'ok') return res.data.data.total
    return false
  } catch (error) {
    return false
  }
}

const getOwnedSymbols = async (address) => {
  const ownedSymbols = []
  const totalNumber = await getTotalBrc20Numbers(address)
  if (totalNumber === 0) return false
  let start = 0
  const limit = PAGINATED_AMOUNT
  while (1) {
    try {
      const url = `https://unisat.io/brc20-api-v2/address/${address}/brc20/summary?start=${start}&limit=${limit}`
      const res = await axios.get(url)
      for (const brc20sData of res.data.data.detail) {
        ownedSymbols.push(brc20sData.ticker)
      }
      if (res.data.data.detail.length === 0) return ownedSymbols
      start += limit
    } catch (error) {
      return ownedSymbols
    }
  }
}

module.exports = getOwnedSymbols

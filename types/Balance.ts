export default  interface Balance {
    usdt: number,
    usd: number,
    mel: number,
    bonus: number,
}
export default  interface Transactions {
    uid: string,
    amount: number,
    date: string,
    type: string,
}
export default  interface HistoryIn {
    uid: string,
    amount: number,
    created_at: string,
    type: string,
    status: string,
    wallet: string,
}
export default  interface HistoryOut {
    uid: string,
    amount: number,
    created_at: string,
    merchant: string,
    status: string,
    merchant_wallet: string,
}
export default  interface BreakevenItem {
    order: number,
    user_name: string,
    amount: number,
    ready: number,
}
export type Breakeven = BreakevenItem[];

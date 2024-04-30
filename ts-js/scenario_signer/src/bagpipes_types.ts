// threadbag response types


export interface MempoolItem {
    chain: string;
    amount: string;
    txType: string;
    Date: string;
    tx: string;
}

export interface TxMempoolResponse {
    mempool: MempoolItem[];
}

import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { MempoolItem, TxMempoolResponse } from "./bagpipes_types";
import axios, { AxiosResponse } from 'axios';
import * as assert from "assert";

// change it to whatever chain you want
const polkadot_ws = "wss://rpc.ibp.network/polkadot";

// threadbag endpoint
const base = "http://localhost:8081";

// get the account
function get_account(){
    const senderPrivateKey = "";//change me
    const keyring = new Keyring({ type: 'sr25519' }); // substrate ss58 accountid32
	const account = keyring.addFromUri('add seed here');
    return account; 
}


export async function get_api() {

	const provider = new WsProvider(polkadot_ws); // set as polkadot's ws endpoint
	const api = await ApiPromise.create({
		provider: provider, noInitWarn: true
	});

	return api;
}

// take a hex encoded tx, sign it
async function string_tx_sign(tx_raw: string): Promise<SubmittableExtrinsic> {
    const api = await get_api(); // polkadot
  //  const ac = await get_account();
    const decodedTx = api.registry.createType('Extrinsic', tx_raw) as SubmittableExtrinsic;
    //    const k = get_account(); //keyring
   // const signedTx = decodedTx.signAndSend(ac);
    return decodedTx;//signedTx;
}


// fetch transaction list from threadbag
async function fetchTxMempool(scenarioId: string): Promise<MempoolItem[]> {
    try {
        const response: AxiosResponse<TxMempoolResponse> = await axios.post(`${base}/scenario/tx`, {
            id: scenarioId
        });
        return response.data.mempool;
    } catch (error) {
        console.error('Error fetching threadbag transaction mempool:', error);
        throw error;
    }
}



async function main(){
    console.log(`Starting `);
    
    // change me
    const scenario_id = "DkaN7anZz"; // one dot from polkadot 2 assethub
    
    console.log(`fetching transactions for scenario id: `, scenario_id);

    const tx_list = await fetchTxMempool(scenario_id);
    const raw_tx = tx_list[0].tx;
    console.log(`Got response: `, tx_list);
    console.log(`Got hex encoded tx: `, raw_tx); // take the first tx as a test
    console.log(`decoding tx...`);
    // decode the xcm tx and validate args
    const l = await string_tx_sign(raw_tx);
    const decodedentry: any = l.toHuman();
    console.log(`tx human: `, l.toHuman());
    // todo: verify that this is 1000 and add more verifications
    const dest_paraid = decodedentry.method.args.dest.V3.interior.X1.Parachain;
    console.log(`Destination parachain: `, dest_paraid);
    console.log(`Destination account: `, decodedentry.method.args.beneficiary.V3.interior.X1.AccountId32.id);
    //console.log(`Asset: `, decodedentry.method.args.assets.V3[0].id);
    const fun_amount = decodedentry.method.args.assets.V3[0].fun.Fungible;
    console.log(`Asset Amount: `, fun_amount);
    console.log(`verifying that its one dot`);
    assert.strictEqual(fun_amount, "10,000,000,000"); // one dot with tokendecimals == 1e10
    console.log(`one dot verified amount`);
    console.log(`verifying dest chain is assethub `);
    assert.strictEqual(dest_paraid, "1,000"); // one dot with tokendecimals == 1e10
    console.log(`dest chain is assethub `);

    console.log(`transaction checks are ok`);


    console.log(`Signing and Broadcasting tx `);
    const sender = get_account();
    const signature = sender.sign(l.toHex());
    console.log('signature: ', signature);
   // l.addSignature(signature, l);
    /* 
fetchTxMempool(base, scenarioId)
    .then(data => {
        console.log('Transaction mempool:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    })
*/

    console.log(`Finished`);
}



main().finally();
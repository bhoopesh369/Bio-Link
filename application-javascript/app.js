/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../test-application/javascript/CAUtil.js');
const { buildCCPHosp1, buildCCPHosp2, buildWallet } = require('../test-application/javascript/AppUtil.js');

const channelName = 'channel1';
const chaincodeName = 'healthcare';
const mspOrg1 = 'medicalprovider1';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

const connectToNetwork = async (id, hospitalId) => {

	try {

		let ccp;
		if (hospitalId === 'medicalprovider1') {
			ccp = await buildCCPHosp1();
		}
		else if (hospitalId === 'medicalprovider2') {
			ccp = buildCCPHosp2();
		}

		const caClient = buildCAClient(FabricCAServices, ccp, `ca.${hospitalId}`);

		const wallet = await buildWallet(Wallets, walletPath);

		const userExists = await wallet.get(id);
		if (!userExists) {
			console.log(`An identity for the user ${id} does not exist in the wallet`);
			console.log('Run the registerUser.js application before retrying');
			return;
		}

		const gateway = new Gateway();

		await gateway.connect(ccp, {
			wallet,
			identity: id,
			discovery: { enabled: true, asLocalhost: true }
		});

		const network = await gateway.getNetwork(channelName);

		const contract = network.getContract(chaincodeName);

		const networkObj = {
			contract: contract,
			network: network,
			gateway: gateway
		};

		console.log('Connected to mychannel. Ready to interact with the network');

		return networkObj;

	} catch (error) {
		console.error(`Error processing transaction. ${error}`);
		console.log(error.stack);
	}
};

const registerUser = async (username, hospitalId) => {

	try {
		let ccp;
		if (hospitalId === 'medicalprovider1') {
			ccp = await buildCCPHosp1();
		}
		else if (hospitalId === 'medicalprovider2') {
			ccp = buildCCPHosp2();
		}

		const caClient = buildCAClient(FabricCAServices, ccp, `ca.${hospitalId}`);

		const wallet = await buildWallet(Wallets, walletPath);

		await registerAndEnrollUser(caClient, wallet, mspOrg1, username, '');

		console.log("User registration/ENROLLED successfully");

		return { message: "User registration/ENROLLED successfully" };

	} catch (error) {

		console.error(`Failed to register user ${error}`);
		return { error: `Failed to register user ${error}` };
	}
};






// pre-requisites:
// - fabric-sample two organization test-network setup with two peers, ordering service,
//   and 2 certificate authorities
//         ===> from directory /fabric-samples/test-network
//         ./network.sh up createChannel -ca
// - Use any of the asset-transfer-basic chaincodes deployed on the channel "mychannel"
//   with the chaincode name of "basic". The following deploy command will package,
//   install, approve, and commit the javascript chaincode, all the actions it takes
//   to deploy a chaincode to a channel.
//         ===> from directory /fabric-samples/test-network
//         ./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript/ -ccl javascript
// - Be sure that node.js is installed
//         ===> from directory /fabric-samples/asset-transfer-basic/application-javascript
//         node -v
// - npm installed code dependencies
//         ===> from directory /fabric-samples/asset-transfer-basic/application-javascript
//         npm install
// - to run this test application
//         ===> from directory /fabric-samples/asset-transfer-basic/application-javascript
//         node app.js

// NOTE: If you see  kind an error like these:
/*
	2020-08-07T20:23:17.590Z - error: [DiscoveryService]: send[mychannel] - Channel:mychannel received discovery error:access denied
	******** FAILED to run the application: Error: DiscoveryService: mychannel error: access denied
	
   OR
	
   Failed to register user : Error: fabric-ca request register failed with errors [[ { code: 20, message: 'Authentication failure' } ]]
   ******** FAILED to run the application: Error: Identity not found in wallet: appUser
*/
// Delete the /fabric-samples/asset-transfer-basic/application-javascript/wallet directory
// and retry this application.
//
// The certificate authority must have been restarted and the saved certificates for the
// admin and application user are not valid. Deleting the wallet store will force these to be reset
// with the new certificate authority.
//

/**
 *  A test application to show basic queries operations with any of the asset-transfer-basic chaincodes
 *   -- How to submit a transaction
 *   -- How to query and check the results
 *
 * To see the SDK workings, try setting the logging to show on the console before running
 *        export HFC_LOGGING='{"debug":"console"}'
 */
// async function main() {
// 	try {
// 		// build an in memory object with the network configuration (also known as a connection profile)
// 		const ccp = await buildCCPOrg1();

// 		console.log(ccp, "hif rom ehre")

// 		console.log("buildCCPOrg1 done")

// 		// build an instance of the fabric ca services client based on
// 		// the information in the network configuration
// 		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.medicalprovider1');

// 		console.log('ommala')

// 		// setup the wallet to hold the credentials of the application user
// 		const wallet = await buildWallet(Wallets, walletPath);

// 		console.log('wallet done')

// 		// in a real application this would be done on an administrative flow, and only once
// 		await enrollAdmin(caClient, wallet, mspOrg1);

// 		// in a real application this would be done only when a new user was required to be added
// 		// and would be part of an administrative flow
// 		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

// 		// Create a new gateway instance for interacting with the fabric network.
// 		// In a real application this would be done as the backend server session is setup for
// 		// a user that has been verified.
// 		const gateway = new Gateway();

// 		try {
// 			// setup the gateway instance
// 			// The user will now be able to create connections to the fabric network and be able to
// 			// submit transactions and query. All transactions submitted by this gateway will be
// 			// signed by this user using the credentials stored in the wallet.

// 			console.log('Establishing connection to the network');

// 			await gateway.connect(ccp, {
// 				wallet,
// 				identity: org1UserId,
// 				discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
// 			});

// 			console.log("hi")

// 			// Build a network instance based on the channel where the smart contract is deployed
// 			const network = await gateway.getNetwork(channelName);

// 			// Get the contract from the network.
// 			const contract = network.getContract(chaincodeName);

// 			// Initialize a set of asset data on the channel using the chaincode 'InitLedger' function.
// 			// This type of transaction would only be run once by an application the first time it was started after it
// 			// deployed the first time. Any updates to the chaincode deployed later would likely not need to run
// 			// an "init" type function.
// 			console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
// 			await contract.submitTransaction('InitLedger');
// 			console.log('*** Result: committed');

// 			// Let's try a query type operation (function).
// 			// This will be sent to just one peer and the results will be shown.
// 			console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
// 			let result = await contract.evaluateTransaction('GetAllAssets');
// 			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

// 			// Now let's try to submit a transaction.
// 			// This will be sent to both peers and if both peers endorse the transaction, the endorsed proposal will be sent
// 			// to the orderer to be committed by each of the peer's to the channel ledger.
// 			console.log('\n--> Submit Transaction: CreateAsset, creates new asset with ID, color, owner, size, and appraisedValue arguments');
// 			result = await contract.submitTransaction('CreateAsset', 'asset13', 'yellow', '5', 'Tom', '1300');
// 			// The "submitTransaction" returns the value generated by the chaincode. Notice how we normally do not
// 			// look at this value as the chaincodes are not returning a value. So for demonstration purposes we
// 			// have the javascript version of the chaincode return a value on the function 'CreateAsset'.
// 			// This value will be the same as the 'ReadAsset' results for the newly created asset.
// 			// The other chaincode versions could be updated to also return a value.
// 			// Having the chaincode return a value after after doing a create or update could avoid the application
// 			// from making an "evaluateTransaction" call to get information on the asset added by the chaincode
// 			// during the create or update.
// 			console.log(`*** Result committed: ${prettyJSONString(result.toString())}`);

// 			console.log('\n--> Evaluate Transaction: ReadAsset, function returns an asset with a given assetID');
// 			result = await contract.evaluateTransaction('ReadAsset', 'asset13');
// 			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

// 			console.log('\n--> Evaluate Transaction: AssetExists, function returns "true" if an asset with given assetID exist');
// 			result = await contract.evaluateTransaction('AssetExists', 'asset1');
// 			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

// 			console.log('\n--> Submit Transaction: UpdateAsset asset1, change the appraisedValue to 350');
// 			await contract.submitTransaction('UpdateAsset', 'asset1', 'blue', '5', 'Tomoko', '350');
// 			console.log('*** Result: committed');

// 			console.log('\n--> Evaluate Transaction: ReadAsset, function returns "asset1" attributes');
// 			result = await contract.evaluateTransaction('ReadAsset', 'asset1');
// 			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

// 			try {
// 				// How about we try a transactions where the executing chaincode throws an error
// 				// Notice how the submitTransaction will throw an error containing the error thrown by the chaincode
// 				console.log('\n--> Submit Transaction: UpdateAsset asset70, asset70 does not exist and should return an error');
// 				await contract.submitTransaction('UpdateAsset', 'asset70', 'blue', '5', 'Tomoko', '300');
// 				console.log('******** FAILED to return an error');
// 			} catch (error) {
// 				console.log(`*** Successfully caught the error: \n    ${error}`);
// 			}

// 			console.log('\n--> Submit Transaction: TransferAsset asset1, transfer to new owner of Tom');
// 			await contract.submitTransaction('TransferAsset', 'asset1', 'Tom');
// 			console.log('*** Result: committed');

// 			console.log('\n--> Evaluate Transaction: ReadAsset, function returns "asset1" attributes');
// 			result = await contract.evaluateTransaction('ReadAsset', 'asset1');
// 			console.log(`*** Result: ${prettyJSONString(result.toString())}`);
// 		} finally {
// 			// Disconnect from the gateway when the application is closing
// 			// This will close all connections to the network
// 			gateway.disconnect();
// 		}
// 	} catch (error) {
// 		console.error(`******** FAILED to run the application: ${error}`);
// 	}
// }

// main();

module.exports = { connectToNetwork, registerUser };
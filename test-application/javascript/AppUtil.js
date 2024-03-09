/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const fs = require('fs');
const path = require('path');

// exports.buildCCPOrg1 = async () => {
// 	// load the common connection configuration file
// 	const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'medicalprovider1', 'connection-medicalprovider1.json');
// 	const fileExists = fs.existsSync(ccpPath);
// 	if (!fileExists) {
// 		throw new Error(`no such file or directory: ${ccpPath}`);
// 	}

// 	let finalData;

//     fs.readFileSync(ccpPath, 'utf8', (err, data) => {
// 		if (err) {
// 		  console.error(`Error reading the file: ${err}`);
// 		  return;
// 		}
	  
// 		// Parse the JSON data
// 		try {
// 		  finalData = JSON.parse(data);
// 		  console.log(finalData);
// 		  return finalData;
		  
// 		} catch (jsonError) {
// 			console.error(`Error parsing JSON: ${jsonError}`);
// 		  return undefined;
// 		}
// 	});

// 	return undefined;
// };

const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

exports.buildCCPOrg1 = async () => {
  const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'medicalprovider1', 'connection-medicalprovider1.json');
  const fileExists = fs.existsSync(ccpPath);

  if (!fileExists) {
    throw new Error(`no such file or directory: ${ccpPath}`);
  }

  try {
    const data = await readFileAsync(ccpPath, 'utf8');
    const finalData = JSON.parse(data);
    return finalData;
  } catch (error) {
    console.error(`Error reading/parsing the file: ${error}`);
    return undefined;
  }
}

exports.buildCCPOrg2 = () => {
	// load the common connection configuration file
	const ccpPath = path.resolve(__dirname, '..', '..', 'test-network',
		'organizations', 'peerOrganizations', 'medicalprovider2', 'connection-medicalprovider2.json');
	const fileExists = fs.existsSync(ccpPath);
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`);
	}
	const contents = fs.readFileSync(ccpPath, 'utf8');

	// build a JSON object from the file contents
	const ccp = JSON.parse(contents);

	console.log(`Loaded the network configuration located at ${ccpPath}`);
	return ccp;
};

exports.buildWallet = async (Wallets, walletPath) => {
	// Create a new  wallet : Note that wallet is for managing identities.
	let wallet;
	if (walletPath) {
		wallet = await Wallets.newFileSystemWallet(walletPath);
		console.log(`Built a file system wallet at ${walletPath}`);
	} else {
		wallet = await Wallets.newInMemoryWallet();
		console.log('Built an in memory wallet');
	}

	return wallet;
};

exports.prettyJSONString = (inputString) => {
	if (inputString) {
		return JSON.stringify(JSON.parse(inputString), null, 2);
	}
	else {
		return inputString;
	}
}

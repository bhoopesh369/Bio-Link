const { exec } = require('child_process');

const router = require('express').Router();

// Creating Network With admin user
router.post("/create", (req, res) => {

    const org = req.body.org;
    const userName = req.body.userName;
    const password = req.body.password;

    const command = `cd ../test-network && ./bc-network.sh network create --org ${org} --admin-user ${userName} --admin-pwd ${password}`

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error creating network");
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.status(200).send("Network created");
    });
});

// Creating Channel
router.post("/channel", (req, res) => {

    const org = req.body.org;
    const channelName = req.body.channelName;

    const command = `cd ../test-network && ./bc-network.sh channel create --channel-name ${channelName} --org-creator ${org}`

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error creating channel");
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.status(200).send("Channel created");
    });

});

// Creating Organization
router.post("/organization", (req, res) => {
    
    const org = req.body.org;
    const userName = req.body.userName;
    const password = req.body.password;
    const channelName = req.body.channelName;

    const command = `cd ../test-network && ./bc-network.sh network add-org --org ${org} --admin-user ${userName} --admin-pwd ${password} --channel-name ${channelName}`

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error creating organization");
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.status(200).send("Organization created");
    });
    
});

// Joining Organization to Channel
router.post("/join", (req, res) => {
    const org1 = req.body.org1;
    const org2 = req.body.org2;
    const channelName = req.body.channelName;

    const command = `cd ../test-network && ./bc-network.sh channel join --channel-name ${channelName} --org ${org1} --org ${org2}`

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error joining organization to channel");
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.status(200).send("Organization joined to channel");
    });
});

// Creating Organization's Users
router.post("/create-users", (req, res) => {
    const org = req.body.org;
    const userName = req.body.userName;
    const password = req.body.password;
    const role = req.body.role;

    const command = `cd ../test-network && ./bc-network.sh user create --user-name ${userName} --user-pwd ${password} --user-role ${role} --org ${org}`

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error creating user");
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.status(200).send("User created");
    });
});

// Deploying Chaincode
router.post("/deploy", (req, res) => {
    const ccName = req.body.ccName;
    const ccPath = req.body.ccPath;
    const ccVersion = req.body.ccVersion;
    const ccSequence = req.body.ccSequence;
    const channelName = req.body.channelName;
    const org1 = req.body.org1;
    const org2 = req.body.org2;

    const command = `cd ../test-network && ./bc-network.sh chaincode deploy-org --cc-name ${ccName} --cc-path ${ccPath} --cc-version ${ccVersion} --cc-sequence ${ccSequence} --channel-name ${channelName} --org ${org1} --org ${org2}`

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error deploying chaincode");
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.status(200).send("Chaincode deployed");
    });
});

// Invoking Chaincode Functions
// Create Medical Record
router.post("/invoke-create", (req, res) => {
    const ccName = req.body.ccName;
    const ccArgs = req.body.ccArgs; // exaple of ccArgs : '{"Args":["HealthCenter:CreateEmr","{\"patientId\":\"pa1\",\"patientName\":\"patient01\",\"patientBirthdate\":\"10-03\"}"]}'
    const userName = req.body.userName;
    const org = req.body.org;
    const channelName = req.body.channelName;

    const command = `cd ../test-network && ./bc-network.sh chaincode invoke --cc-name ${ccName} --cc-args ${ccArgs} --user-name ${userName} --org ${org} --channel-name ${channelName}`

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error invoking chaincode");
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.status(200).send("Chaincode invoked");
    });
});

// Invoke Read
router.post("/invoke-read", (req, res) => {
    const ccName = req.body.ccName;
    const ccArgs = req.body.ccArgs; // exaple of ccArgs : '{"Args":["Physician:ReadEmr","EMR_ID"]}'
    const userName = req.body.userName;
    const org = req.body.org;
    const channelName = req.body.channelName;

    const command = `cd ../test-network && ./bc-network.sh chaincode invoke --cc-name ${ccName} --cc-args ${ccArgs} --user-name ${userName} --org ${org} --channel-name ${channelName}`

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error invoking chaincode");
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.status(200).send("Chaincode invoked");
    });
});

// Add note EMR
router.post("/invoke-add-note", (req, res) => {
    const ccName = req.body.ccName;
    const ccArgs = req.body.ccArgs; // exaple of ccArgs : '{"Args":["Physician:AddEmrNote","{\"patientId\":\"pa1\",\"area\":\"Traumatology\",\"vitalSigns\":\"Poor\",\"diagnosis\":\"Fracture\",\"medication\":\"Painkillers\"}"]}'
    const userName = req.body.userName;
    const org = req.body.org;
    const channelName = req.body.channelName;

    const command = `cd ../test-network && ./bc-network.sh chaincode invoke --cc-name ${ccName} --cc-args ${ccArgs} --user-name ${userName} --org ${org} --channel-name ${channelName}`

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error invoking chaincode");
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.status(200).send("Chaincode invoked");
    });
});

// #### Download EMR
router.post("/invoke-download", (req, res) => {
    const ccName = req.body.ccName;
    const ccArgs = req.body.ccArgs; // exaple of ccArgs : '{"Args":["Patient:GetOwnEmr"]}'
    const userName = req.body.userName;
    const org = req.body.org;
    const channelName = req.body.channelName;

    const command = `cd ../test-network && ./bc-network.sh chaincode invoke --cc-name ${ccName} --cc-args ${ccArgs} --user-name ${userName} --org ${org} --channel-name ${channelName}`

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error invoking chaincode");
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.status(200).send("Chaincode invoked");
    });
});

// Autorize EMR Sharing
router.post("/invoke-authorize-sharing", (req, res) => {
    const ccName = req.body.ccName;
    const ccArgs = req.body.ccArgs; // exaple of ccArgs : '{"Args":["HealthCenter:AuthorizeEmrReading","medicalprovider2","EMR_ID"]}'
    const userName = req.body.userName;
    const org = req.body.org;
    const channelName = req.body.channelName;

    const command = `cd ../test-network && ./bc-network.sh chaincode invoke --cc-name ${ccName} --cc-args ${ccArgs} --user-name ${userName} --org ${org} --channel-name ${channelName}`

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error invoking chaincode");
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.status(200).send("Chaincode invoked");
    });
});


// Approve EMR Sharing
router.post("/invoke-approve-sharing", (req, res) => {
    const ccName = req.body.ccName;
    const ccArgs = req.body.ccArgs; // exaple of ccArgs : '{"Args":["Patient:ApproveEmrSharing","medicalprovider2"]}'
    const userName = req.body.userName;
    const org = req.body.org;
    const channelName = req.body.channelName;

    const command = `cd ../test-network && ./bc-network.sh chaincode invoke --cc-name ${ccName} --cc-args ${ccArgs} --user-name ${userName} --org ${org} --channel-name ${channelName}`

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error invoking chaincode");
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.status(200).send("Chaincode invoked");
    });
});

// Get shared EMR
router.post("/invoke-get-shared-emr", (req, res) => {
    const ccName = req.body.ccName;
    const ccArgs = req.body.ccArgs; // exaple of ccArgs : '{"Args":["Physician:GetSharedEmr","medicalprovider1","pa1"]}'
    const userName = req.body.userName;
    const org = req.body.org;
    const channelName = req.body.channelName;

    const command = `cd ../test-network && ./bc-network.sh chaincode invoke --cc-name ${ccName} --cc-args ${ccArgs} --user-name ${userName} --org ${org} --channel-name ${channelName}`

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error invoking chaincode");
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.status(200).send("Chaincode invoked");
    });
});


module.exports = router;

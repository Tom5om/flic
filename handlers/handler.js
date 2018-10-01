'use strict';

const axios             = require('axios');
const _                 = require('lodash');
const AWS               = require('aws-sdk');

const dynamoDb          = new AWS.DynamoDB.DocumentClient();

const sendSlackMessage = async (msg) => {
    return await axios.post(process.env.OUTPUT_ENDPOINT, {"text": msg});
};


module.exports.randomperson = async (event, context, callback) => {

    if (event.body) {

        const inputBody = _.isObject(event.body) ? event.body : JSON.parse(event.body);

        if (inputBody.clickType === "click") {

            const endpointOutput = await axios.get(process.env.INPUT_ENDPOINT);

            let randomItem = _.sample(endpointOutput.data);

            /*const params = {
                TableName: process.env.DYNAMODB_TABLE,
                Item: {
                    id: uuid.v1(),
                    text: data.text,
                    checked: false,
                    createdAt: timestamp,
                    updatedAt: timestamp,
                },
            };

            dynamoDb.put(params, (error, data) => {
                // Set response headers to enable CORS (Cross-Origin Resource Sharing)
                const headers = {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true
                };

                // Return status code 500 on error
                if (error) {
                    const response = {
                        statusCode: 500,
                        headers: headers,
                        body: JSON.stringify({ status: false })
                    };
                    callback(null, response);
                    return;
                }
            });*/

            let result = await sendSlackMessage("You didn't choose the button, the button chose you! " + randomItem + " congratulations you are a winner.");

        }
        else if (inputBody.clickType === "doubleclick") {

        }
        else {
            let result = await sendSlackMessage('Click event was not click or double click');

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Testing the execution of my serverless!',
                    input: event
                })
            };
        }
    } else {

        let result = await sendSlackMessage('No body info, just sending test message');
    }


    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Testing the execution of my serverless!',
            input: event
        })
    };

};

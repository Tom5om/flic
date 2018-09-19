'use strict';

const axios             = require('axios');
const _                 = require('lodash');

const url = 'https://hooks.slack.com/services/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';


const sendSlackMessage = async (msg) => {
    return await axios.post(url, {"text": msg});
};


module.exports.hello = async (event, context, callback) => {

    if (event.body) {
        const body = JSON.parse(event.body);

        if (body.clickType === "click") {

            const people = await axios.get('http://local.deployment.4mation.com.au/staff');

            let normalPerson = _.sample(people);

            let result = await sendSlackMessage("You didn't choose the button, the button chose you! " + normalPerson.first_name + " " + normalPerson.last_name + " congratulations you are a winner.");

        }
        else if (body.clickType === "doubleclick") {

        }
        else {
            let result = await sendSlackMessage('TEST MESSAGE');

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Testing the execution of my serverless!',
                    input: event,
                }),
            };
        }
    }

    let result = await sendSlackMessage('TEST MESSAGE');

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Testing the execution of my serverless!',
            input: event,
        }),
    };

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

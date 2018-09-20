'use strict';

// const axios             = require('axios');
// const _                 = require('lodash');


module.exports.getPeople = async (event, context, callback) => {

    return {
        statusCode: 200,
        body: JSON.stringify([
            "Tom Somerville",
            "Cassie Moore"
        ])
    };

};

const INFO_PREFIX  = '[INFO] ';
const ERROR_PREFIX = '[ERROR] ';

const REQUEST_RECIEVED_MSG = INFO_PREFIX + 'Request received at ';

function logRequest(endpoint, request) {
    console.log(REQUEST_RECIEVED_MSG + endpoint);
    console.log(" + Request params:");
    for (const [key, value] of Object.entries(request.query)) {
        console.log(` + + ${key}: ${value}`);
    }
}

function logMissingParams() {
    console.warn(ERROR_PREFIX + "Request was missing required params\n");
}

function logInvalidKey() {
    console.warn(ERROR_PREFIX + "Request had incorrect API key\n");
}

function logServerIssue(searchEngine) {
    console.error(ERROR_PREFIX + "Request could not be processed by " + searchEngine + "\n");
}

exports.logRequest = logRequest;
exports.logMissingParams = logMissingParams;
exports.logInvalidKey = logInvalidKey;
exports.logServerIssue = logServerIssue;
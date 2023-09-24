const INFO_PREFIX  = '[INFO] ';
const ERROR_PREFIX = '[ERROR] ';

const REQUEST_RECIEVED_MSG = INFO_PREFIX + 'Request received at ';

function logRequest(endpoint) {
    console.log(REQUEST_RECIEVED_MSG + endpoint);
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
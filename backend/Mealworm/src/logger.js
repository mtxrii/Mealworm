const INFO_PREFIX  = '[INFO] ';
const ERROR_PREFIX = '[ERROR] ';

const REQUEST_RECIEVED_MSG = INFO_PREFIX + 'Request received at ';

function logRequest(endpoint) {
    console.log(REQUEST_RECIEVED_MSG + endpoint);
}

exports.logRequest = logRequest;
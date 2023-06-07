/**
 * Create an empty session for analytics usage, uses default/empty values
 * @returns {JSONObject} JSON object representing current session
 */
function getEmptySession() {
    const emptySessionJSON = {
        "status": 0,
        "exitPage": "",
        "errors": [],
        "timeOnPage": {
            "landing": 0,
            "skymap": 0,
            "explanation": 0,
            "response": 0,
            "thankYou": 0
        },
        "categorySelected": "",
        "clicks": [],
        "starSelected": 0
    }
    
    return emptySessionJSON;
}

/**
 * Get the current session. If no current session exists, creates an empty session and returns it
 * @returns {JSONObject} JSON object representing current session
 */
function getSession() {
    let sessionObj = localStorage.getItem("session");
    if (sessionObj === null) {
        sessionObj = getEmptySession();
    } else {
        sessionObj = JSON.parse(sessionObj);
    }
    return sessionObj
}

/**
 * Writes a session to local storage
 * @param {JSONObject} sessionJSON session object to be written
 */
function writeSession(sessionJSON) {
    const sessionString = JSON.stringify(sessionJSON);
    localStorage.setItem("session", sessionString);
}

/**
 * Set the current session to empty
 */
function setEmptySession() {
    let session = getEmptySession();
    writeSession(session);
}

/**
 * Set the status of the session to either 0=success, or 1=error/exit
 * @param {number} status status code to be entered
 */
function setSessionStatus(status) {
    let session = getSession();
    session.status = status;
    writeSession(session);
}

/**
 * Set the exit page name
 * @param {string} pageName page name to be written
 */
function setSessionExit(pageName) {
    let session = getSession();
    session.exitPage = pageName;
    writeSession(session);
}

/**
 * Add an error to current session
 * @param {string} pageName page name that the error occured on
 * @param {string} name top level name of error
 * @param {string} message error message
 * @param {string} stack string representation of the stack trace at error
 */
function addSessionError(pageName, name, message, stack) {
    let session = getSession();
    session.errors.push({"page": pageName, "name": name, "message": message, "stack": stack});
    writeSession(session);
}

/**
 * Add to current time on page, by a specified amount
 * @param {string} pageName page name to add time to
 * @param {number} time amount of time to increment by
 */
function addSessionPageTime(pageName, time) {
    let session = getSession();
    session.timeOnPage[pageName] += time;
    writeSession(session);
}

/**
 * Change the category selected of the current session
 * @param {string} category category name to set to
 */
function addSessionCategorySelected(category) {
    let session = getSession();
    session.categorySelected = category
    writeSession(session);
}

/**
 * Add a mouse click event to the sessions click history
 * @param {Array} click coordinates of downclick and upclick, in nested length 2 arrays
 */
function addSessionClick(click) {
    let session = getSession();
    session.clicks.push(click);
    writeSession(session);
}

/**
 * Increment the starselected for the session
 */
function sessionStarSelectedInc() {
    let session = getSession();
    session.starSelected += 1;
    writeSession(session);
}

export { setEmptySession, setSessionStatus, setSessionExit, addSessionError, addSessionPageTime, 
addSessionCategorySelected, addSessionClick, sessionStarSelectedInc }
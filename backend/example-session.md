# Example Session Object

Sessions are stored as json files

    {
        "status": 0,
        "exitPage": "response",
        "errors": [
            {
                "page": "landing",
                "name": "type of error occured",
                "message": "error message",
                "stack": "stack trace"
            },
            {
                "page": "skymap",
                "name": "type of error occured",
                "message": "error message",
                "stack": "stack trace"
            }
        ],
        "timeOnPage": {
            "landing": 10,
            "skymap": 15,
            "explanation": 4,
            "response": 8,
            "thankYou": 4
        },
        "categorySelected": "health",
        "clicks": [
            [[340,720], [342,719]],
            [[200,560], [198,562]]
        ],
        "starSelected": 2
    }

## status

This value is 0 on a successful session, and 1 if there was an error or early exit

## exitPage

If status is 1, this contains the page upon which the exit occured

## errors

Array containing objects that represent individual errors that occured during execution

## timeOnPage

Amount of time spent on each page

## categorySelected

Category selected by user for session

## clicks

Array of click coordinate events on the skymap. The click down and click up location is stored, which allows us to differentiate between a seleciton and a drag.

## starSelected

Tells how many star select events occured.

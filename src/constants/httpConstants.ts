/*
There was no mention of having to add constants, but I did so as I think
it was mentioned that it is good practice.
*/

export const HTTP_STATUS = {
    // Success responses
    OK: 200,
    CREATED: 201,

    // Client error responses
    BAD_REQUEST: 400,
    NOT_FOUND: 404,

    // Server error responses
    INTERNAL_SERVER_ERROR: 500,
} as const;

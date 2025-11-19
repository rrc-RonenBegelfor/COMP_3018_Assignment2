import helmet from "helmet";


export const helmetConfig = helmet({
    /* https://stackoverflow.com/questions/60706823/what-modules-of-helmet-should-i-use-in-my-rest-api
    *  The creator kind of created this reply, so I just used what made sense from the suggestions and compared with notes.
    */
    noSniff: true,

    hidePoweredBy: true,

    referrerPolicy: { policy: "no-referrer" },

});
const config = require( './config/app' );

if ( config.env === 'production' ) {
    require( 'newrelic' );
}

const express = require( 'express' );
const apiMiddleware = require( 'node-mw-api-prodest' ).middleware;

let app = express();

app.use( apiMiddleware( {
    compress: true,
    cors: true,
    authentication: {
        jwtPublicKey: config.jwtPublicKey
    }
}) );

// load our routes
require( './routes/lines' )( app );
require( './routes/schedule' )( app );
require( './routes/route' )( app );

app.use( apiMiddleware( {
    error: {
        notFound: true,
        debug: config.env === 'development'
    }
}) );

let pathApp = express();

const path = config.path;
pathApp.use( path, app );

module.exports = pathApp;

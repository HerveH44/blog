const express       = require( 'express' );
const path          = require( 'path' );
const favicon       = require( 'serve-favicon' );
const logger        = require( 'morgan' );
const cookieParser  = require( 'cookie-parser' );
const bodyParser    = require( 'body-parser' );
const mongoose      = require( 'mongoose' );
const passport      = require( 'passport' );
const LocalStrategy = require( 'passport-local' ).Strategy;
const config        = require( './config/config' );
const dbName        = 'blog';
// const url           = `mongodb://localhost:27017/${dbName}`;
const url           = `mongodb://herveh:E054377F@ds157439.mlab.com:57439/heroku_sknvf3cs/`;

mongoose.connect( url );
let db = mongoose.connection;

db.on( 'error', console.error.bind( console, 'connection error:' ) );
db.once( 'open', function() {
    // we're connected!
    console.log( `Connected correctly to mongodb: ${dbName}` );
} );

const app = express();

app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
    extended: false
} ) );
app.use( cookieParser() );
// app.use(favicon(path.join(__dirname, 'public', 'favicons.ico')));

// passport config
let User = require( './models/users.model' );
app.use( passport.initialize() );
passport.use( new LocalStrategy( User.authenticate() ) );
passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );

app.use( express.static( path.join( __dirname, 'public' ) ) );

// Routes
const articleRouter = require( './routes/articles.route' );
const imageRouter = require( './routes/images.route' );
const userRouter = require( './routes/users.route' );

app.use( '/articles', articleRouter );
app.use( '/images', imageRouter );
app.use( '/users', userRouter );


// catch 404 and forward to error handler
app.use( function( req, res, next ) {
    let err = new Error( 'Not Found' );
    err.status = 404;
    next( err );
} );

// error handler
app.use( function( err, req, res, next ) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

    // render the error page
    res.status( err.status || 500 );
    res.end( 'error' );
} );

module.exports = app;
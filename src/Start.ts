import * as fs from "fs";
import * as express from "express";
import createHttpError = require("http-errors");
var path = require('path');
const bodyParser = require('body-parser');

let app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw())

app.post('/', (req, res, next) => { console.info('!!!!!!!!!!!!!');
    let userID = req.body.userID;
    let profile = req.body.profile;
    let actProfile = req.body.profile2;

    console.info(req.body.userID);
    res.render('summary', { title: 'ok', summary: { userID: userID } });

    if (userID && profile) {
        fs.writeFileSync('./UserProfiles/' + userID + '.txt', profile + '\n' + actProfile);
    }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createHttpError(404));
});

// error handler
app.use(function(err: any, req: any, res: any, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

let http = require('http').Server(app);

http.listen(8999, () => {
    console.info('listening on *: ' + 8999);
});
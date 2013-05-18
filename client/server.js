var port = process.env.PORT || 3000,
    express = require('express'),
    app = express();

app.use(express.logger());
app.use(express.compress());
app.use(express.methodOverride());
app.use(express.bodyParser());

app.use(express.static(__dirname));

app.listen(port);
console.log('\t :: Express :: Listening on port ' + port);
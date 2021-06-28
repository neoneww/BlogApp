const express = require('express');
const articleRouter = require('./routes/articles');
const mongoose = require('mongoose');
const Article = require('./models/article');
const methodOverride = require('method-override');
const app = express();
mongoose.Promise = global.Promise;

mongoose
	.connect(
		'PROCESS.ENV.VAR',
		{ useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, usecreateIndexes: true }
	)
	.then(() => {
		console.log('Database Connected');
	})
	.catch((err) => {
		console.log(err);
		console.log('Database Connection Failed');
	});

//this will convert all of our ejs code to html
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))

// this means at /article we will use article.js route
app.use('/articles', articleRouter);

const date = new Date();

app.get('/', async (req, res) => {
	const articles = await Article.find().sort({ createdAt: 'desc' });
	//this will look into our views folder and we can also pass object and get acess to it in our index file
	res.render('articles/index', { articles: articles });
});

app.listen(5050, (req, res) => {
	console.log('server started');
});

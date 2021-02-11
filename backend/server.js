const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.port | 5000;

app.use(cors());
app.use(express.json());

const materialsRouter = require('./routes/materialsRouter');
const quotesRouter = require('./routes/quotesRouter');

app.use('/materials', materialsRouter);
app.use('/quotes', quotesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})


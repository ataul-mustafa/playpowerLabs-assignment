const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

app.get('/health', (req, res)=>{
  res.status(200).json({status: 'active', message: "Server working finely"})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

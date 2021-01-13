const express = require('express')
const bodyParser = require('body-parser')
const controller = require('./transform.contr')
const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(function(err, req, res, next) {
    if (err && err.name == 'PayloadTooLargeError') {
      return res.status(500).send('Input Payload size exceeded!. ');      
    } else {
      next(err);
    }
});

app.post('/transformData', (req, res) => {
    console.log("req.body",req.body)

    try {
        if(Object.keys(req.body).length != 0  && req.body != undefined && req.body != {}){
            let resp = controller.transformData(res, req.body)
            res.status(200).send(resp)
        }else{
            res.status(400).send("Please provide the input payload")
        }
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
})

 app.listen(8081, () => {    
    console.log(`Server running on port 8081`)
});
module.exports = app;
let express = require("express");
let app = express();
const fs = require("fs");
app.use(express.text());

app.post("/", function(req, res){
console.log(req.body);
fs.appendFileSync("statistics.txt", req.body + "\n");
res.send("OK");
});

app.listen(3000, function(){
console.log("Example is running on port 3000");
});
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_CONNECT,{
    useNewUrlParser: true,useUnifiedTopology: true , useCreateIndex:true,useFindAndModify:false
})
.then(()=>console.log("connection database"))
.catch(()=>console.log("not connection database"))
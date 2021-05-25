const mongoose=require('mongoose')

 mongoose.connect('mongodb://localhost/OyeBusy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
    console.log('db connection successful')
}).catch(()=>{
    console.log('db conn unsuccessful')
})
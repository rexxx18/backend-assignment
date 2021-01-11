const http=require('http');
const mongoose=require('mongoose');
const {parse}=require('querystring');

const mongodb=require('mongodb')
const BOOKS =require('./models/data');





let connectionString='mongodb://localhost:27017/books';


mongoose.connect(connectionString,{useNewUrlParser:true, useUnifiedTopology: true})
.then(()=>{
    console.log("mongodb connected")})
    .catch((err)=>{
        console.log("error occured");
    })


const server=http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    

    //the first Get method where we get all the data present in the database.




    if(req.url==='/' && req.method==='GET'){

        res.writeHead(200,{'Content-Type':'application/json'});
        const data=BOOKS.find({}).then(data=>{
            console.log(data);
           
            res.end(JSON.stringify(data));
        }).catch(err=>{
            console.log("1")
            console.log("error");
        })
       
    }


    //The FIRST POST method which is used to get the respective book from the database
   else if(req.url==="/api/get/query"  && req.method==="POST"){

    const FORM_URLENCODED='application/x-www-form-urlencoded';
    const FORM='application/json'

   
    if(req.headers['content-type']===FORM || req.headers['content-type']===FORM_URLENCODED){

        let body='';

        req.on('data',chunk=>{
            body=body+chunk.toString();
        })

        req.on('end',()=>{
            body=JSON.parse(body);
            const data=BOOKS.find(body).then((data)=>{
                console.log(data);
                res.end(JSON.stringify(data));
            }).catch(error=>console.log("error"));

        })


    }
            
   }

//The second POST method in ehich we create a new item in the database

    else if(req.url==='/api/post'&& req.method==='POST'){

        const FORM_URLENCODED='application/x-www-form-urlencoded';
        const FORM='application/json'
    
       
        if(req.headers['content-type']===FORM || req.headers['content-type']===FORM_URLENCODED){
            let body='';
    
    
            req.on('data',chunk=>{
                body=body+chunk.toString();
            })


           
    
            req.on('end',async ()=>{
                
                body=JSON.parse(body);
                const data=BOOKS.findOne({"title":body.title}).then((data)=>{

                    if(data!==null){
                    res.writeHead(200);
                    res.end("already Exists");
                    }
                    else if(!body.author){

                        res.writeHead(404);
                        res.end("not a valid format")
                        return;

                    }

                    else if(!body.isbn){

                        res.writeHead(404);
                        res.end("not a valid format")
                        return;

                    }
                    else if(!body.title){

                        res.writeHead(404);
                        res.end("not a valid format")
                        return;

                    }
                   
                 else{
                    const newbook=new BOOKS({
                        author:body.author,
                        title:body.title,
                        ISBN:body.isbn,
                        releaseDate:body.date,
    
                    })
                    const create= newbook.save().then((data)=>{
                        res.writeHead(200);
                        res.end(JSON.stringify(data));
                    }).catch(err=>{
                        console.log("error");
                    });
                   
                 }
                    
                }).catch(err=>console.log("error"));

               
    
            })


            


        }

       
      }



      //The FiRST DELETE API CREATED




      else if(req.url==='/api/delete' && req.method==='DELETE'){

        const FORM_URLENCODED='application/x-www-form-urlencoded';
        const FORM='application/json'
    
       
        if(req.headers['content-type']===FORM || req.headers['content-type']===FORM_URLENCODED){
            let body='';

            req.on('data',chunk=>{
                body=body+chunk;
            })
            req.on('end',async ()=>{
                body=JSON.parse(body);
                const data=BOOKS.deleteMany(body).then(data=>{
                    console.log(data);
                    if(data===null || data===undefined){
                        throw error;
                        return;

                    }
                    res.writeHead(200);
                    res.end(JSON.stringify(data))
                }).catch(err=>{
                    res.writeHead(404);
                    res.end(JSON.stringify({message:"No such data"}))
                    console.log("error")
                })
            })

      }


      

      }





    

    else if(req.url==='/api/update' && req.method==='PUT'){
        console.log("Hi")
        let body='';
        req.on('data',chunk=>{
            body=body+chunk.toString();

        })


        req.on('end',()=>{
            body=JSON.parse(body)
            console.log(body)
            const title=body.title;
            const see=BOOKS.findOne(body).then(dat=>{
                
               
               
                    const data=BOOKS.updateOne(body).then(data=>{
                        res.writeHead(200);
                       
                        res.end(JSON.stringify(data));
                    }).catch(err=>{
                        console.log("error")
                    })
                
            }).catch(error=>{
                res.writeHead(404);
                console.log("error1");
                res.end("Uffff");
            })
            
        })

    }
    
    else{

        res.writeHead(404,{'Content-Type':'application/json'});
        res.end(JSON.stringify({messsage:"galat Route"}))

    }
})


const PORT =process.env.PORT || 2003;

server.listen(PORT,()=>{
    console.log("server Listening On Port");
    
})



//Functions

module.exports=server;

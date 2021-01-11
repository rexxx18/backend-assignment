const chai=require('chai');
const chaihttp=require('chai-http');
const server=require('../index.js');



//Assertion Style

chai.should();
chai.use(chaihttp);
///Testing the  Get API


describe('Tester',()=>{

    //GET API
    describe('GET TESTER',()=>{


        it("it should get all the tasks",(done)=>{

            chai.request(server).get('/')
            .end((error,response)=>{
                response.should.have.status(200);
                response.should.be.a('object');
                
               

                done();

            });


        })


        it("In case of mistaken route",(done)=>{
            chai.request(server).get('/task').end((error,response)=>{
                response.should.have.status(404);
                done();
            })
        })

    })


    //Post API TASKS

    describe('all The POST APIs',()=>{
        it('the first POST API TO CREATE A NEW ELEMENT',(done)=>{

            let body={
                author:'kalyan',
                title:'Kalyan Jwellers Motivation',
                isbn:'1234567'
            }
            body=JSON.stringify(body);
            chai.request(server).post('/api/post').send(body).end((err,response)=>{

                response.should.have.status(200);
                response.should.be.a('object');
                done();

            })


        })

       

            it('In case The item is already present',(done)=>{
                let body={
                    author:'kalyan',
                    title:'Kalyan Jwellers Motivation',
                    isbn:'1234567'
                }
                body=JSON.stringify(body);

                chai.request(server).post('/api/post').send(body).end((err,response)=>{
                    response.should.have.status(200);
                    
                    done();
                    
                })
            })

        it("In case The item is ill formated",(done)=>{
            let body={
               
                title:'bhogobanm',
                isbn:'123456791011'
            }

            body=JSON.stringify(body);

            chai.request(server).post('/api/post').send(body).end((err,response)=>{
                response.should.have.status(404);
               
                done();
            })

        })

        
    })

    //Delete API test



    describe('DELETE API TESTER',()=>{
        it('In case The deleted item is present',(done)=>{
            let body={
                author:'kalyan',
                title:'Kalyan Jwellers Motivation',
                isbn:'1234567'
            }

            chai.request(server).del('/api/delete').send(body).end((error,response)=>{
                response.should.have.status(200);
                done();
            })
        })


        it('In case The deleted item is not present',(done)=>{
            let body={
                author:"tghy",
                title:"bhagu"
               
                
            }
            body=JSON.stringify(body);
            chai.request(server).del('/api/delete').send(body).end((error,response)=>{
                response.should.have.status(200);
                done();
            })
        })
    })


    ///testing The update API

    describe('The UPDATE TESTER',()=>{
        it('TESTER FOR UPDATE',(done)=>{

         let body={  author:'Rip R',
                title:"the heavens",
                isbn:'1234567910223344'
        }

        body=JSON.stringify(body);
        chai.request(server).put('/api/update').send(body).end((error,response)=>{
                response.should.have.status('200');
                done();
        })

        })
    })











})
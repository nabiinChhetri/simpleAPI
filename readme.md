Simple User Registration / Login API using Nodejs, Express, Mongoose. It can be used as boilerplate for starting any application.
Before Starting you should have installed Node.js, npm and express in our system. If not installed 
1) Node.js : Install the latest verion of Node.js from the official site https://nodejs.org/en/ and npm(node package module) comes with Node.js
2) Install Express Globally in your system , run below command in your command terminal ( you can run this from any path in command terminal)
             npm install -g express-generator@4
3) Install Nodemon
4) Install MongoDB

Now how to initiate the project using express generator

Step 1 > Go to the path where you want to start your project from command terminal. Now after you are in the directory where you are going to start the project run below command in your terminal
       ##  express <project-folder-name>
    after running this terminal you also need to
       ##  npm install
    in your terminal. Now it creates project folder and you will see sub folders like bin, public, routes, views and files like app.js and package.json

Step 2 > Listening to server using config file.
     Now make a folder named config and inside config folder make a file named index.js
     Inside config.js lets configure port and host :

        module.exports.app={
            port : 2001,
            host : '127.0.0.1
        }

Step 3 > Now lets move to app.js here we have to require or import config folder that we created just:
            var config = require('./config');
        Now lets make server listen to port:

            app.listen(config.app.port,function(err,done) {
            if (err) {
                console.log("Error in creating server at port", config.app.port);
            }else {
                console.log("Succesfully server connected at port >>", config.app.port);
            }
            })

            **You can remove all the console when project is complete

        Now to test whether connection between server and app is succesful, goto your package.json file and 
            modify "start" in "scripts" as follow:

            "scripts": {
                "start": "nodemon app.js"
            }

            for this you need to have nodemon installed in your system.
        
        Now in terminal run following command
            ### npm start 
            it will console.log you whether server is connected or not 

Step 4 > Installing and configuring Database
        For this we need to have mongoDB installed in our system.
        Install Mongoose
        ### npm install mongoose

        Now lets go to our config.js file and configure database there too and your final codes in config.js till now should look as follow =>

        module.exports.app = {
        port : 2001,
        host :'127.0.0.1',
        jwtSecret :'itsreallysecret'

        };
        module.exports.mongodb ={
        mongoHost : '127.0.0.1',
        dbUrl : 'mongodb://127.0.0.1:27017',
        dbName : 'dbBasics'
        } ;


        Create db.js file in root folder. Inside db.js =>

        var mongoose = require('mongoose');

        module.exports = function (config) {
        mongoose.connect(config.mongodb.dbUrl + '/'+config.mongodb.dbName);
        mongoose.connection.on('error',function(err) {
        console.log("Error in connecting database", err);
        })
        mongoose.connection.once('open',function(err) {
                console.log('successfully connected to database');
        })
        };

        Run Mongod and mongo respectively

Step 5 > Making Schemas for user since most application has user signup and login process.
        Make folder named "models" in your root project folder. Since you are going to make user schema, make user.js file and your codes in user.js should be as follow =>

        var mongoose = require('mongoose');
        var Schema = mongoose.Schema;

        var userSchema = new Schema({
        firstName: String,
        lastName: {
            type: String
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        address :{
            type : String
        },
        phoneNumber :{
            type : Number
        },
        username : {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        }
        },{
        timestamps : true
        });
        
        var userModel = mongoose.model('user',userSchema);
        module.exports = userModel;

Step 6 > After making user schema we have to now create controller for the user in Route folder.
        In route folder make user.js file and perform http verbs as in  user.js file.

        router.get('/',function(req,res,next){
            //code
        })

        //get by id
        router.get('/:id',function(req,res,next){
            //code
        })

        router.post('/',function(req,res,next){
            //code
        })

        //update by id
        router.put('/:id',function(req,res,next){
            //code
        })

        //delete by id
        router.delete('/:id',function(req,res,next){
            //code
        })

For password hashing i have used password-hash
    to install npm-install-password
    and follow the docs from here https://www.npmjs.com/package/password-hash
    and relate with my code 

For authentication i have used jwt(jsonwebtoken)
    to install npm install jsonwebtoken
    and follow the docs from here https://www.npmjs.com/package/jsonwebtoken
    and relate with my code

You will need postman to check this api
follow this link to create collection of all the necessary request


I will be updating this readme file more readable and more descriptive soon




         




const fs = require('fs');
var koa = require('koa');
const Router=require('koa-router');

const bodyParser=require('koa-parser');
var app = new koa();
const port=3000;
var credentials = { name: 'testUser', pass: 'password1234' };
var auth = require('koa-basic-auth');
const router=new Router();
const koaBody = require('koa-body');

app.use(bodyParser());


//challenge Part-1 to display: hello world for route /
router.get('/',(ctx)=>{
    ctx.body = `hello world!.`;
});


//challenge Part-2 /math route to get input from the user
 
router.get('/math', async (ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(`./index.html`);
});
router.post('/post', ctx=>{
    let p=(ctx.request.body);
    var res=0;
    let one=parseInt(p.ip1);
    let two=parseInt(p.ip2);
    let op=p.op;
    console.log(p);
    if(isNaN(one) ||  isNaN(two)){
        ctx.body="Please provide a value in each of the fields!";
    }
    else{
    switch(op){
        case "+" :  res=one+two;
                    //console.log( res);
                    break;
    
        case "-" : 
                    res=(one-two);
                    //console.log( res);
                    
                    break;
                   
       case "*" :  res=one*two;
                    //console.log( res);
                    break;
                     
        case "/" :  res=one/two;
                    //console.log( res);
                    break;
                    
                }
                
    ctx.body=` The result from your performed operation is : ${res}`;
}
})

//challenge Part-3 /auth route to authenticate user 
router.get('/auth', auth(credentials) , async (ctx) =>{
    
    ctx.body = 'You have access to the protected area.';
    
 });
 

app.use(function *(next){
    try {
       yield next;
    } catch (err) {
       if (401 == err.status) {
          this.status = 401;
          this.set('WWW-Authenticate', 'Basic');
          this.body = 'You have no access here';
       } else {
          throw err;
       }
    }
 });

app.use(router.routes());
app.listen(port, function(){
    console.log(`Server is listening on port http://localhost:${port}`);
})

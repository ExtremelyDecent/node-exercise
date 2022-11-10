const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(text, output){
    if(output){
        fs.writeFile(output,text,'utf8', function(e){
            if (e){
                
                console.error(`Error writing file ${output}: ${e}`);
                process.exit(1);
            }
        });
    }
    else{
        console.log(text);
    }
}

function cat(path){
    fs.readFile(path, 'utf8', function(e, data){
        if(e){
            
            
            console.error(`Error reading file at ${path}: ${e}`);
            process.exit(1);
        }
        else{
            console.log(data)
        }
    });
}



async function webCat(url){
    try{
        let res = await axios.get(url);
        handleOutput(res.data, output);
    }
    catch(e){
        console.error(`Error fetching ${url}: ${e}`);
        process.exit(1);
    }
}
let path;
let output;
if (process.argv[2]=== '--out'){
    output = process.argv[3];
    path = process.argv[4];
}
else{
    path = process.argv[2];
}

if (path.slice(0,4)==='http'){
    webCat(path,output);
}
else{
    cat(path,output);
}
const fs = require('fs');
const process = require('process');

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

cat(process.argv[2]);
const fs = require('fs').promises;
const path = require('path');

const deleFile = async (fileName)=>{
    try{
        const directoryPath = path.resolve(__dirname,'../public/uploads/')
        await fs.unlink(directoryPath + '/' + fileName);
        return 1;
    }catch(err){
        return 0;
    }
}

module.exports = {
    deleFile
}



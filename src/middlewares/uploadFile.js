const multer = require('multer');

const uploadFileFn = require('../config/upload.js');

const hanldeErrorOfFile = (upload,req,res,next,fieldNameFiles)=>{
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if(err.code === 'LIMIT_FILE_SIZE'){
                return res.status(400).json({
                    message: 'file size too big'
                })
            }else if(err.code === 'LIMIT_UNEXPECTED_FILE'){
                // handle fieldNameError
                if(!fieldNameFiles.hasOwnProperty(err.field))
                {   
                    return res.status(400).json({
                        message: `file has fieldNameError: ${err.field}`
                    })
                }else{
                    // handle manyFile
                    if(err.field === 'image'){
                        return res.status(400).json({
                            message: `file image has one file`
                        })
                    }
                    if(err.field === 'avatars'){
                        return res.status(400).json({
                            message: `file avatars has two file`
                        })
                    }
                }
            }
            return res.status(409).json({
                message: 'info conflict'
            })
        } else if (err) {
            if(err.code === 400){
                return res.status(400).json({
                    message: err.message
                })
            }
            return res.status(500).json({
                message: 'error server !!'
            })
        }
        next()
    })
}

const uploadFileSingle = (singleFile)=>{
    const upload = uploadFileFn().single(singleFile.image);
    return (req,res,next)=>{
        hanldeErrorOfFile(upload,req,res,next,singleFile);
    }
}

const uploadFileMultiple = (multipleFile,manyFile = 1)=>{
    const upload = uploadFileFn().array(multipleFile.avatars,manyFile)
    return (req,res,next)=>{
        hanldeErrorOfFile(upload,req,res,next,multipleFile);
    }
}

const uploadFileOneAndMore = (oneOrMultipleFile)=>{
    const upload = uploadFileFn().fields([{ name: oneOrMultipleFile.image, maxCount: 1 }, { name: oneOrMultipleFile.avatars , maxCount: 2 }])
    return (req,res,next)=>{
        hanldeErrorOfFile(upload,req,res,next,oneOrMultipleFile);
    }
}

module.exports = {
    uploadFileSingle,
    uploadFileMultiple,
    uploadFileOneAndMore
}

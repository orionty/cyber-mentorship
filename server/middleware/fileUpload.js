import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        if(file.fieldname=="CV"){
            cb(null, "./uploads/CV")
        }
        else if(file.fieldname=="Cover_Letter"){
            cb(null,"./uploads/Cover_Letter")
        }
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({storage})
export const uploadMultiple = upload.fields([{name:"CV", maxCount:1},{name:"Cover_Letter",maxCount:1}])
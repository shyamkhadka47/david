
import fs from "fs";
export const deleteimage=async(filepath, filename)=>{
    try {
        await fs.promises.unlink(`${filepath}/${filename}`)
    } catch (error) {
        console.log(error)
    }
}
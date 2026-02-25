import {mongoose} from "mongoose"

export async function connection(url){
    await mongoose.connect(url)
}

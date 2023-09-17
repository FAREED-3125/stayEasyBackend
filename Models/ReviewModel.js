const mongoose  =require('mongoose');
const {Schema} = mongoose;

const ReviewSchema = new Schema({
   name: {
            type: String,
            required: true
        },
    review: {
        type: String,
        required: true
    },
    happy: {
        type: Boolean,
        default: false
    },
    unhappy: {
        type: Boolean,
        default: false
    },
    rating:{
        type: Number,
        required: true
    }
}  ,{
    timestamps: true
} 
)

ReviewSchema.statics.createReview = async function(body) {
    const review = await this.create(body);
    if(!review) throw Error("Creation failed.");

    return review;
}

ReviewSchema.statics.deleteReview = async function(id){
    const review = await this.findByIdAndDelete({'_id': id});
    if(!review) throw Error("Delete failed.");

    return review;
}
ReviewSchema.statics.manyReview = async function(ids,query){
    const review = await this.find({'_id': {
        $in: ids
    }}).sort({'_id': -1}).limit(query.limit);
    if(!review) throw Error("Delete failed.")

    return review;
}

const Review =  mongoose.model('review',ReviewSchema);

module.exports = Review;

    
     
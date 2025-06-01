import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.error('MongoDB connection error:', err));


const userSchema = mongoose.Schema({
    user: String,
    email: String,
    username: String
});

export default mongoose.model('User', userSchema);//Exporting model as EJS
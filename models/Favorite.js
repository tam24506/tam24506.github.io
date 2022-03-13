const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let favoriteSchema = new Schema({
    playlistId: {
        type: String
    },
    playlistTitle: {
        type: String
    },
    userEmail: {
        type: String
    },
    language: {
        type: String
    }
}, {
    collection: 'favorites'
})

module.exports = mongoose.model('Favorite', favoriteSchema);

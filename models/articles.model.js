var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    titre: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    disable: {
      type: Boolean,
      default: false
    },
    date: {
        type: Date,
        default: new Date()
    },
    slug: String,
    image: String
}, {
    timestamps: true
});

function slugify(text) {

  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}

// Generate the slug
articleSchema.pre('save', function (next) {
  this.slug = slugify(this.titre);
  next();
});

articleSchema.virtual('url').get(function() {
  var date = moment(this.date),
      formatted = date.format('YYYY[/]MM[/]');

  // formatted results in the format '2012/10/'

  return formatted + this.slug;
});

// Récupérer également les champs virtuels dans les requêtes clientes
articleSchema.set('toObject', { virtuals: true });
articleSchema.set('toJSON', { virtuals: true });

// the schema is useless so far
// we need to create a model using it
var Articles = mongoose.model('Article', articleSchema);

// make this available to our Node applications
module.exports = Articles;

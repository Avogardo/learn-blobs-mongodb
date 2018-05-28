FS.debug = true;

var eventPhotosStore = new FS.Store.FileSystem('eventPhotos', {
  path: '~/uploads/full'
});

eventPhotos = new FS.Collection('eventPhotos', {
  stores: [eventPhotosStore]
});
eventPhotos.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  download: function () {
    return true;
  }
});

events = new Meteor.Collection('events');

export { eventPhotos };
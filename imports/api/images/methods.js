FS.debug = true;

const eventPhotosStore = new FS.Store.FileSystem('eventPhotos', {
  path: '~/uploads'
});

const eventPhotos = new FS.Collection('eventPhotos', {
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

const events = new Meteor.Collection('events');

export { eventPhotos, events };

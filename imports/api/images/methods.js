FS.debug = true;

var eventPhotosStore = new FS.Store.FileSystem('eventPhotos', {
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

const showCollections = () => {
  const photos = events.find();
  console.log(photos);
  console.log(photos.fetch());

  const photos1 = eventPhotos.find();
  console.log(photos1);
  console.log(photos1.fetch());

  console.log(eventPhotosStore);
};

export { eventPhotos, events, eventPhotosStore, showCollections };

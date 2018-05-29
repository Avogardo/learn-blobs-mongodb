import { HTTP } from 'meteor/http'

// FS.debug = true;

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

const testMethod = url => {
  HTTP.get(url, (err,result) => {
    // this will be async obviously
    if (err) console.log(err);
    else {
      const content = result.content; // the contents of the file
      // now do something with it
      console.log(content);
    }
  });
};

const events = new Meteor.Collection('events');

export { eventPhotos, events, testMethod };

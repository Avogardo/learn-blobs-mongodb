import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import { HTTP } from 'meteor/http'
import { eventPhotos, events, testMethod } from '../api/images';
 
class App extends Component {
  renderTasks(images, events) {
    if (images.length) {
      testMethod(images[0].url({brokenIsFine: true}));
      HTTP.get(images[0].url({brokenIsFine: true}), (err,result) => {
        // this will be async obviously
        if (err) console.log(err);
        else {
          const content = result.content; // the contents of the file
          // now do something with it
          console.log(content);
        }
      });

      return images.map((image, index) => {
        console.log(image.url({brokenIsFine: true}));
        return <img
          key={`image${index}`}
          src={image.url({brokenIsFine: true})}
        />
      });
    }
  }

  onChange(files) {
    const file = files[0];
    console.log(files);
    const fileOb = eventPhotos.insert(file, (err) => {
      if (err) {
        console.log(err)
      }
    });
    console.log('Upload result: ', fileOb);
    events.insert({
      name: 'event',
      file: fileOb
    });
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Import files</h1>
        </header>
 
        <input type="file" onChange={(e) => this.onChange(e.target.files)} />

        <ul>
          {this.renderTasks(this.props.photos, this.props.events)}
        </ul>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    photos: eventPhotos.find({}).fetch(),
    events: events.find({}).fetch(),
  };
}, App);


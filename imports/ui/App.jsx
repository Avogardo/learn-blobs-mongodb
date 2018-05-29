import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import { eventPhotos, events } from '../api/images';
 
class App extends Component {
  renderTasks(images) {
    if (images.length) {
      console.log(images[0]);

      const url = images[0].url({brokenIsFine: true});
      console.log(url);

      return images.map((image, index) =>
        <img
          key={`image${index}`}
          src={image.url({brokenIsFine: true})}
        />
      );
    }
  }

  onChange(files) {
    const file = files[0];
    const fileObj = eventPhotos.insert(file, (err) => {
      console.log(err);
    });
    console.log('Upload result: ', fileObj);
    events.insert({
      name: 'event',
      file: fileObj
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
          {this.renderTasks(this.props.photos)}
        </ul>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    photos: eventPhotos.find({}).fetch(),
  };
}, App);

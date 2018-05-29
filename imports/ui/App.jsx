import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import { eventPhotos, events, eventPhotosStore, showCollections } from '../api/images';
 
import Task from './Task.jsx';
 
class App extends Component {
  getTasks() {
    return [
      { _id: 1, text: 'This is task 1' },
      { _id: 2, text: 'This is task 2' },
      { _id: 3, text: 'This is task 3' },
    ];
  }
 
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
    // return this.getTasks().map((task) => (
    //   <Task key={task._id} task={task} />
    // ));
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

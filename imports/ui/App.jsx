import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { eventPhotos, events } from '../api/images';

class App extends Component {
  renderTasks(images, events) {
    if (events.length) {
      return events.map((event, index) => {
        const blob = new Blob( [event.file], { type: "image/jpeg" } );
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL( blob );
        return <img
        style={{width: '400px'}}
          key={`photo${index}`}
          src={imageUrl}
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

    const reader = new FileReader(); //create a reader according to HTML5 File API

    reader.onload = event => {
      const buffer = new Uint8Array(reader.result); // convert to binary
      events.insert({
        name: 'event',
        file: buffer
      });
    };

    reader.readAsArrayBuffer(file); //read the file as arraybuffer
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


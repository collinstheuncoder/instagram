import React, { Component } from 'react';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';

class FileDrop extends Component {
  constructor() {
    super()
    this.state = {
      files: []
    }
  }

  onDrop(files) {
    this.setState({files});
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ))

    return (
      <section>
        <Dropzone
          onDrop={this.onDrop.bind(this)}
          onFileDialogCancel={this.onCancel.bind(this)}
        >
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
                <p>Drop files here, or click to select files</p>
            </div>
          )}
        </Dropzone>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </section>
    );
  }
}

export default FileDrop;


//class FileDrop extends Component {
//  onDrop = (acceptedFiles, rejectedFiles) => {
//    console.log(acceptedFiles);    
//    console.log(rejectedFiles);
//  };
//
//  render() {
//    return (
//      <Dropzone onDrop={this.onDrop}>
//        {({ getRootProps, getInputProps, isDragActive }) => {
//          return (
//            <div
//              {...getRootProps()}
//              className={classNames('dropzone', {
//                'dropzone--isActive': isDragActive,
//              })}
//            >
//              <input {...getInputProps()} />
//              {isDragActive ? (
//                <p>Drop image or video file(s) here...</p>
//              ) : (
//                <p>
//                  Try dropping some files here, or click to select files to
//                  upload.
//                </p>
//              )}
//            </div>
//          );
//        }}
//      </Dropzone>
//    );
//  }
//}
//
//export default FileDrop;

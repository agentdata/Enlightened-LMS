import React from 'react';
import { Card, Button } from '@material-ui/core';

export default class FileUploader extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedFile: []
        }

        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onClickHandler = this.onClickHandler.bind(this)
    }

    onChangeHandler = event => {

        const input = document.querySelector('input');
        const files = input.files;

        if (files.length !== 0) {

            for (const file of files) {
                if (this.validFileType(file)) {
                    this.setState({
                        //selectedFile: URL.createObjectURL(file),
                        selectedFile: file,
                        loaded: 0
                    });
                }
                else {
                    alert('File type not supported. Please update your selection.');
                }
            }
        }
    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        this.props.updateFileCallback(this.state.selectedFile)
    }

    // convert to valid img data
    validFileType(file) {
        return this.props.validFileTypes.includes(file.type);
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div>
                <Card style={{display: 'flex', flexFlow: 'wrap', justifyContent: 'center', alignContent: 'center'}}>
                    <Button>
                        <input type="file" name={this.props.name} accept={this.props.uploadTypes} onChange={this.onChangeHandler} />
                    </Button>
                    <Button onClick={this.onClickHandler}>
                        Upload
                    </Button>
                </Card>
            </div>
        )
    }


}
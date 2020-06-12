import React from 'react';
import { Card, Button } from '@material-ui/core';

export default class FileUploader extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedFile: null
        }

        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onClickHandler = this.onClickHandler.bind(this)
    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        })
    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
    }

    render() {
        return (
            <div>
                <Card>
                    <label>Upload {this.props.uploadType}</label>
                    <Button>
                    <input type="file" name="file" onChange={this.onChangeHandler} multiple=""/>
                    </Button>
                    <Button onClick={this.onClickHandler}>
                        Upload
                    </Button>
                </Card>
            </div>
        )
    }


}
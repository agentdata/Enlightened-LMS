import React from 'react';
import { Container, Card, CardContent, Typography } from '@material-ui/core';

export default class Account extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <Container >
                <Card style={{padding: 10}}>
                    <CardContent>
                        <Typography variant="h3">
                            Account Details
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        );
    }
}
import React from 'react';
import { Container, Card, CardContent, Typography, List, ListItem } from '@material-ui/core';

export default class Account extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            account: {
                currentBalance: '',
                totalCreditHours: 0,
            },
            error: null
        };

        this.getUserAccountInfo = this.getUserAccountInfo.bind(this);
        this.setUserAccountInfo = this.setUserAccountInfo.bind(this);
    }

    getUserAccountInfo() {
        var statusCode;
        const headers = new Headers();
        headers.append('Authorization', 'Bearer '+sessionStorage.getItem("token"));
        headers.append('Access-Control-Allow-Origin','*');
        headers.append('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
        const init = {
            method: 'GET',
            headers
        };

        fetch('https://cooliocoders.ddns.net/api/user/account', init)
        .then( async(res) => {
            statusCode = res.status;
            const data = await res.json();

            return this.setState({
                account: {
                    currentBalance: data["currentBalance"],
                    totalCreditHours: data["totalCreditHours"]
                }
            })
        })
        .catch((e) => {
            console.warn("There was an error fetching account details: ", e)

            this.setState({
                error: 'There was an error retrieving user details.'
            })
        });
    }

    setUserAccountInfo() {
        // set fields, update on backend thru API call
    }

    render() {
        const { account } = this.state;
        const { currentBalance, totalCreditHours } = this.state.account;

        return (
            <Container >
                <Card style={{padding: 10}}>
                    <CardContent>
                        <Typography variant="h3">
                            Account Details
                        </Typography>
                        { account ? (
                            <List>
                                <ListItem>
                                    <Typography variant="h5">Current balance: {currentBalance}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant="h5">
                                        Total credit hours: { totalCreditHours }
                                    </Typography>
                                </ListItem>
                            </List>
                            ) : <Typography variant="h5">No Info to display!</Typography>
                        }
                    </CardContent>
                </Card>
            </Container>
        );
    }
}
import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Container, Card, CardContent, Typography, 
    List, ListItem, Button, TextField } from '@material-ui/core';

const styles = theme => ({
    payBtn: {
        backgroundColor: "#efefef",
        marginTop: "10px",
        padding: "5px",
        paddingRight: "20px",
        paddingLeft: "20px",
        border: "1px solid black",
        // margin: "auto"
    }
})

class Account extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            account: {
                currentBalance: '',
                totalCreditHours: 0,
            },
            payment: {
                fullName: '',
                cardField1: '',
                cardField2: '',
                cardField3: '',
                cardField4: '',
                cardNo: [],
            },
            error: null,
            showPaymentForm: false
        };

        this.getUserAccountInfo = this.getUserAccountInfo.bind(this);
        this.setUserAccountInfo = this.setUserAccountInfo.bind(this);
        
        this.payButtonPressed = this.payButtonPressed.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCardInput1Change = this.handleCardInput1Change.bind(this);
        this.handleCvvChange = this.handleCvvChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
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

        fetch('https://cooliocoders.ddns.net/api/balance/amount', init)
        .then( async(res) => {
            statusCode = res.status;
            const data = await res.json();

            return this.setState({
                account: {
                    currentBalance: data["balance"],
                    totalCreditHours: data["totalCredits"]
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

    payButtonPressed = () => {
        // display payment fields, allow user to make payment
        this.setState(prevState => ({
            showPaymentForm: !prevState.showPaymentForm
        }))
    }

    handleNameChange = () => {

    }

    handleCardInput1Change = () => {

    }

    handleCvvChange = () => {

    }

    handleAmountChange = () => {

    }

    render() {
        const { classes } = this.props;
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
                        <Button className={classes.payBtn} onClick={this.payButtonPressed}>{this.state.showPaymentForm ? "Cancel" : "Pay balance"}</Button>
                                </ListItem>
                                {this.state.showPaymentForm && 
                                    <ListItem>
                                        <Card>
                                            <CardContent>
                                                <TextField 
                                                label="Full Name"
                                                id="fullName"
                                                required
                                                onChange={this.handleNameChange}
                                                >
                                                </TextField>
                                                <TextField
                                                label="Card Number"
                                                id="cardField1"
                                                required
                                                onChange={this.handleCardInput1Change}
                                                >
                                                </TextField>
                                                <TextField
                                                label="CVV"
                                                id="cvv"
                                                required
                                                onChange={this.handleCvvChange}
                                                >
                                                </TextField>
                                                <TextField
                                                label="Amount"
                                                id="amount"
                                                required
                                                onChange={this.handleAmountChange}
                                                >
                                                </TextField>
                                            </CardContent>
                                        </Card> 
                                    </ListItem>
                                }
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

export default withStyles(styles)(Account);
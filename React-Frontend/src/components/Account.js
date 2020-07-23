import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Container, Card, CardContent, Typography, 
    List, ListItem, Button, TextField } from '@material-ui/core';
import http from '../api/http';
import httpStripe from '../api/https-stripe';

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
                totalCreditHours: 0,
                balanceDetails: [{
                    user: {},
                    balance: 0,
                    paid: false,
                    year: 0,
                    semester: null
                }]
            },
            payment: {
                fullName: '',
                cardNo: '',
                expiryDate: '',
                cvv: '',
                amount: ''
            },
            cardError: '',
            nameError: '',
            expiryError: '',
            cvvError: '',
            amountError: '',
            error: null,
            showPaymentForm: false
        };

        this.getUserAccountInfo = this.getUserAccountInfo.bind(this);
        // this.setUserAccountInfo = this.setUserAccountInfo.bind(this);
        
        this.payButtonPressed = this.payButtonPressed.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCardChange = this.handleCardChange.bind(this);
        this.handleCvvChange = this.handleCvvChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validateCardNo = this.validateCardNo.bind(this);
        this.validateExpiry = this.validateExpiry.bind(this);
        this.validateCvv = this.validateCvv.bind(this);
        this.validateAmount = this.validateAmount.bind(this);
        this.newPayment = this.newPayment.bind(this);
    }

    getUserAccountInfo() {
        http.getCurrentAccountBalance()
        .then( async(res) => {
            const data = await res.json();
            if(res.status === 200 && data["message"] === "Successfully retrieved balance"){
                console.log(data)
                return this.setState({
                    account: {
                        balanceDetails: data["balance"],
                        totalCreditHours: data["totalCredits"]
                    }
                })
            }
        })
        .catch((e) => {
            console.warn("There was an error fetching account details: ", e)

            this.setState({
                error: 'There was an error retrieving user details.'
            })
        });
    }

    payButtonPressed = () => {
        // toggle display payment fields, allow user to make payment
        this.setState(prevState => ({
            showPaymentForm: !prevState.showPaymentForm,
            payment: {
                fullName: '',
                cardNo: '',
                expiryDate: '',
                cvv: '',
                amount: ''
            },
            nameError: '',
            cardError: '',
            expiryError: '',
            cvvError: '',
            amountError: '',
        }))
    }

    newPayment(payment) {

        // TODO: subtract payment from balance, update account on backend

        // TODO: send payment to stripe / backend

        httpStripe.createNewPaymentIntent(`amount=${this.state.payment.amount}&currency=usd`)
        .then( async (response) => {
            let data = await response.json()
            if (response.status === 200) {
                console.log("Successfully created payment intent.")
                console.log(data)

            }
        } )
        .catch((e) => {
            console.warn("Error creating payment intent: ", e)
        })

        // httpStripe.createNewPaymentMethod()


        // Update on front end
        this.getUserAccountInfo()
    }

    handleNameChange = ({ target }) => {
        this.setState({
            payment: { ...this.state.payment, fullName: target.value }
        })
    }

    handleCardChange = ({ target }) => {
        this.setState({
            payment: { ...this.state.payment, cardNo: target.value }
        })
    }

    handleExpiryChange = ({ target }) => {
        this.setState({
            payment: { ...this.state.payment, expiryDate: target.value }
        })
    }

    handleCvvChange = ({ target }) => {
        this.setState({
            payment: { ...this.state.payment, cvv: target.value }
        })
    }

    handleAmountChange = ({ target }) => {
        this.setState({
            payment: { ...this.state.payment, amount: target.value }
        })
    }

    validateName = () => {
        if (this.state.payment.fullName === "") {
            this.setState({nameError: "Required"})
        } else {
            this.setState({nameError: ""})
        }
    }

    validateCardNo = () => {
        if (this.state.payment.cardNo === "") {
            this.setState({cardError: "Required"})
        } else if (!/\b\d{16}\b$/.test(this.state.payment.cardNo)) {
            this.setState({cardError: "16 digit string only"})
        } else {
            this.setState({cardError: ""})
        }
    }

    validateExpiry = () => {
        if (this.state.payment.expiryDate === "") {
            this.setState({expiryError: "Required"})
        } else if (!/([0][1-9]|[1][0-2])(\/|-)\d{2}$/.test(this.state.payment.expiryDate)) {
            this.setState({expiryError: "Proper MM/YY only"})
        } else {
            this.setState({expiryError: ""})
        }
    }

    validateCvv = () => {
        if (this.state.payment.cvv === "") {
            this.setState({cvvError: "Required"})
        } else if (!/\b\d{3}\b$/.test(this.state.payment.cvv)) {
            this.setState({cvvError: "3 digit string only"})
        } else {
            this.setState({cvvError: ""})
        }
    }

    validateAmount = () => {
        if (this.state.payment.amount === "") {
            this.setState({amountError: "Required"})
        } else if (!/^[0-9]+\.?[0-9]?[0-9]?$/.test(this.state.payment.amount)) {
            this.setState({amountError: "digit string only, max 2 decimal places"})
        } else if (this.state.payment.amount > this.state.account.currentBalance) {
            this.setState({amountError: "Exceeds account balance"})
        } else {
            this.setState({amountError: ""})
        }
    }

    checkErrors = () => {

        // this.validateName()
        // this.validateCardNo()
        // this.validateExpiry()
        // this.validateCvv()
        // this.validateAmount()

        // no errors
        // if (this.state.payment.nameError === "" &&
        // this.state.payment.cardError === "" &&
        // this.state.payment.expiryError === "" &&
        // this.state.payment.cvvError === "" &&
        // this.state.payment.amountError === "") {
            this.newPayment(this.state.payment); 
        // }       
    }

    componentDidMount() {
        this.getUserAccountInfo();
    }

    render() {
        const { classes } = this.props;
        const { totalCreditHours } = this.state.account;

        return (
            <Container >
                <Card style={{padding: 10}}>
                    <CardContent>
                        <Typography variant="h3">
                            Account Details
                        </Typography>
                        { this.state ? (
                            <List>
                                <ListItem>
                                    <Typography variant="h5">Current balance: { this.state.account.balanceDetails.balance }</Typography>
                        <Button className={classes.payBtn} onClick={this.payButtonPressed}>{this.state.showPaymentForm ? "Cancel" : "Pay balance"}</Button>
                                </ListItem>
                                {this.state.showPaymentForm && 
                                    <ListItem>
                                        <Card>
                                            <CardContent>
                                                <TextField
                                                error={this.state.nameError}
                                                label="Full Name"
                                                id="fullName"
                                                helperText={ this.state.nameError === '' ? "Full name on credit card" : this.state.nameError }
                                                required
                                                onChange={this.handleNameChange}
                                                onBlur={this.validateName}
                                                >
                                                </TextField>
                                                <TextField
                                                error={this.state.cardError}
                                                label="Card Number"
                                                id="cardNo"
                                                helperText={ this.state.cardError }
                                                required
                                                inputProps = {{ maxLength: 16 }}
                                                onChange={this.handleCardChange}
                                                onBlur={this.validateCardNo}
                                                >
                                                </TextField>
                                                <TextField
                                                error={this.state.expiryError}
                                                label="Expiry Date"
                                                id="expiryDate"
                                                helperText={ this.state.expiryError === '' ? "Date of expiration" : this.state.expiryError }
                                                required
                                                inputProps = {{ maxLength: 16 }}
                                                onChange={this.handleExpiryChange}
                                                onBlur={this.validateExpiry}
                                                >
                                                </TextField>
                                                <TextField
                                                error={this.state.cvvError}
                                                label="CVV"
                                                id="cvv"
                                                helperText={ this.state.cvvError === '' ? "3-digit security code" : this.state.cvvError }
                                                required
                                                onChange={this.handleCvvChange}
                                                onBlur={this.validateCvv}
                                                >
                                                </TextField>
                                                <TextField
                                                error={this.state.amountError}
                                                label="Amount"
                                                id="amount"
                                                helperText={ this.state.amountError === '' ? "US dollar amount" : this.state.amountError }
                                                required
                                                onChange={this.handleAmountChange}
                                                onBlur={this.validateAmount}
                                                >
                                                </TextField>
                                                <Button className={classes.payBtn} onClick={this.checkErrors}>Submit payment</Button>
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
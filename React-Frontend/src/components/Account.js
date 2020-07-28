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
                expiryMonth: '',
                expiryYear: '',
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
                // TODO: Add expiry month & expiry year fields, parse from expiry date
                expiryMonth: '',
                expiryYear: '',
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

    createNewPaymentMethod() {
        // ------- CREATE NEW PAYMENT METHOD -------- complete from client with public key
        httpStripe.createNewPaymentMethod(
            `type=card&card[number]=${this.state.payment.cardNo}&card[exp_month]=${this.state.payment.expiryMonth}&card[exp_year]=${this.state.payment.expiryYear}&card[cvc]=${this.state.payment.cvv}`)
        .then( async (response) => {
            const data = await response.json();
            if (response.status === 200 ) {
                this.submitPayment(data["id"])
            }
        })
        .catch((e) => {
            console.warn("Error creating payment method: ", e)
        });
    }

    submitPayment(paymentMethodId){
        // let amountInCents = parseDouble()*100
        // ------- CREATE PAYMENT INTENT ------------ complete from backend with Secrete key
        http.processPayment(JSON.stringify({"amount" : this.state.payment.amount, "payment_method": paymentMethodId}))
        .then( async (response) => {
            const data = await response.json();
            if (response.status === 200 && data["message"] === "Payment processed successfully.") {
                //backend will log this transaction if it was successful and upate the balance due.
                
                // Update on front end (probably change this so the info is returned 
                // in the pay endpoint if the payment was successful instead of making another api call)
                this.payButtonPressed();
                this.getUserAccountInfo();
            }
        } )
        .catch((e) => {
            console.warn("Error creating payment intent: ", e);
        });
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
            payment: { 
                ...this.state.payment,
                expiryDate: target.value,
                expiryMonth: target.value.substring(0,2),
                expiryYear: target.value.substring(3,5),  }
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
            return false
        } else {
            this.setState({nameError: ""})
            return true
        }
    }

    validateCardNo = () => {
        if (this.state.payment.cardNo === "") {
            this.setState({cardError: "Required"})
            return false
        } else if (!/\b\d{16}\b$/.test(this.state.payment.cardNo)) {
            this.setState({cardError: "16 digit string only"})
            return false
        } else {
            this.setState({cardError: ""})
            return true
        }
    }

    validateExpiry = () => {
        if (this.state.payment.expiryDate === "") {
            this.setState({expiryError: "Required"})
            return false
        } else if (!/([0][1-9]|[1][0-2])(\/|-)\d{2}$/.test(this.state.payment.expiryDate)) {
            this.setState({expiryError: "Proper MM/YY only"})
            return false
        } else {
            this.setState({expiryError: ""})
            return true
            
        }
    }

    validateCvv = () => {
        if (this.state.payment.cvv === "") {
            this.setState({cvvError: "Required"})
            return false
        } else if (!/\b\d{3}\b$/.test(this.state.payment.cvv)) {
            this.setState({cvvError: "3 digit string only"})
            return false
        } else {
            this.setState({cvvError: ""})
            return true
        }
    }

    validateAmount = () => {
        if (this.state.payment.amount === "") {
            this.setState({amountError: "Required"})
            return false
        } else if (!/^[0-9]+\.?[0-9]?[0-9]?$/.test(this.state.payment.amount)) {
            this.setState({amountError: "digit string only, max 2 decimal places"})
            return false
        } else if (this.state.payment.amount > this.state.account.currentBalance) {
            this.setState({amountError: "Exceeds account balance"})
            return false
        } else {
            this.setState({amountError: ""})
            return true
        }
    }

    checkErrors = () => {
        if (this.validateName() &&
            this.validateCardNo() &&
            this.validateExpiry() &&
            this.validateCvv() &&
            this.validateAmount()) {
            this.createNewPaymentMethod()
        }       
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
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h5">
                                            Current balance: { this.state.account.balanceDetails.balance }
                                            </Typography>
                                            <br />
                                            <Button className={classes.payBtn} onClick={this.payButtonPressed}>{this.state.showPaymentForm ? "Cancel" : "Pay balance"}</Button>

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

                                        </CardContent>
                                    </Card>
                                    
                                    
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

export default withStyles(styles)(Account);
import { Row, Button, Card, CardHeader, FormGroup, Form, Input, Container, Col } from "reactstrap";
import Header from "components/Headers/Header.js";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Rootservice from "components/service/Rootservice";
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
const ReportsChart = () => {
    const [message, setMessage] = useState('');
    const [bankAccount, setBankAccount] = useState('SBI Bank');
    const [accountNumber, setAccountNumber] = useState('');
    const [history, setHistory] = useState([])
    const [amount, setAmount] = useState('');
    const [account, setAccountType] = useState('Saving Account');

    const handleChangeBankAccount = async (e) => {
        const selectedBankAccount = e.target.value;
        setAccountType(selectedBankAccount);
        try {
            Rootservice.getTransaction({ bankAccount,selectedBankAccount }).then((response) => {
                setAccountNumber(response.data.accountNumber);
                setBankAccount(response.data.bankAccount);
                setAmount(response.data.amount)
                setMessage('')
            }).catch((error) => {
                console.log(error)
            })

        } catch (error) {
            setMessage('Account Not Found for this User')
            setAccountNumber('')
            setAmount('')
            setHistory([])
            console.error('Error fetching account number:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            Rootservice.getTransactionHistory({ bankAccount , account}).then((res) => {
                const hist = res.data
                setHistory(hist)
                setAccountNumber('');
                setAmount('')
                notify();
            }).catch((error) => {
                setMessage(error.response.data.message)
                console.log(error)
            })

        } catch (error) {
            console.error('Error Getting Transaction History:', error);
            setMessage('Error: Please try again later');
        }
    };
    const notify = () => toast.success('Get Reports Chat Successfully!');

    const categoryTotals = history.reduce((totals, transaction) => {
        const category = transaction.category;
        const amount = transaction.amount;
        const transactionType = transaction.transactionType.toLowerCase();

        if (!totals[category]) {
          totals[category] = {
            credit: 0,
            debit: 0
          };
        }

        if (transactionType === 'credit') {
          totals[category].credit += amount;
        } else {
          totals[category].debit += amount;
        }

        return totals;
      }, {});


      const chartLabels = Object.keys(categoryTotals);
      const creditData = chartLabels.map(category => categoryTotals[category].credit);
      const debitData = chartLabels.map(category => categoryTotals[category].debit);

      const data = {
        labels: chartLabels,
        datasets: [
          {
            label: 'Credit Amount',
            backgroundColor: 'green',
            borderColor: 'green',
            borderWidth: 1,
            hoverBackgroundColor: 'green',
            hoverBorderColor: 'green',
            data: creditData,
          },
          {
            label: 'Debit Amount',
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 1,
            hoverBackgroundColor: 'red',
            hoverBorderColor: 'red',
            data: debitData,
          },
        ],
      };

      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Col className="order-xl-1" xl="8">
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Form onSubmit={handleSubmit}>
                                <h6 className="heading-small text-muted mb-4">
                                    Bank Accounts Information
                                </h6>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-username"
                                                >
                                                    Bank Account
                                                </label>
                                                <select
                                                    className="form-control"
                                                    id="input-bankaccount"
                                                    disabled
                                                    value={bankAccount}
                                                    onChange={(e) => setBankAccount(e.target.value)}>
                                                    <option value="SBI Bank">SBI Bank</option>


                                                </select>
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        Account Type
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        id="input-account"
                                                        value={account}

                                                             onChange={handleChangeBankAccount}>
                                                        <option value="Saving Account">Saving Account</option>
                                                        <option value="Current Account">Current Account</option>
                                                    </select>
                                                </FormGroup>
                                            </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-email"
                                                >
                                                    Account Number
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-accountNumber"
                                                    placeholder="Account Number"
                                                    type="number"
                                                    disabled
                                                    value={accountNumber}
                                                    onChange={(e) =>
                                                        setAccountNumber(e.target.value)
                                                    }
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-email"
                                                >
                                                    Account Balance
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-accountBalance"
                                                    placeholder="Account Balance"
                                                    type="number"
                                                    value={amount}
                                                    disabled
                                                    onChange={(e) =>
                                                        setAmount(e.target.value)
                                                    }
                                                    required
                                                />
                                                {message && (
                                                    <small className="text-danger">{message}</small>
                                                )}
                                            </FormGroup>
                                        </Col>
                                        <Col className="text-center" xs="12">
                                            <Button
                                                className="btn btn-sm btn-primary"
                                                type="submit"
                                            >
                                                Reports Chat
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </CardHeader>
                    </Card>
                </Col>
                <br></br>
                <Col className="order-xl-1" xl="8">
                <Bar  data={data} options={options} />
                </Col>
            </Container>
        </>
    )
}
export default ReportsChart;

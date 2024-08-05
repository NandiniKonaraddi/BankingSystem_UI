import { Table, Row, Button, Card, CardHeader, FormGroup, Form, Input, Container, Col } from "reactstrap";
import Header from "components/Headers/Header.js";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Rootservice from "components/service/Rootservice";
const TransactionHistory = () => {
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
            Rootservice.getTransaction({ bankAccount, selectedBankAccount }).then((response) => {
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
            Rootservice.getTransactionHistory({ bankAccount,account }).then((res) => {
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
    const notify = () => toast.success('Get Transaction History Successfully!');
    const downloadPDF = () => {
        const input = document.getElementById('transaction-table');

        html2canvas(input, { scrollY: -window.scrollY, scale: 2 })
            .then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgWidth = pdf.internal.pageSize.width;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let position = 10;
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                pdf.save('transaction-history.pdf');
            })
            .catch((error) => {
                console.error('Error generating PDF:', error);
            });
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
                                                Transaction History
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </CardHeader>
                    </Card>
                </Col>
                <br></br>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <span className="mb-0">Transaction Details</span>
                            <Button style={{ position: "relative", left: "800px" }}
                                className="btn btn-sm btn-primary"
                                onClick={downloadPDF}
                            >
                                Download as PDF
                            </Button>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive id="transaction-table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Bank Account</th>
                                    <th scope="col">Transaction Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map(transaction => (
                                    <tr key={transaction._id}>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.description}</td>
                                        <td>{transaction.category}</td>
                                        <td>{transaction.bankAccount}</td>
                                        <td> <span className={transaction.transactionType === 'Credit' ? 'text-success' : 'text-danger'}>
                                            {transaction.transactionType}
                                        </span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </div>

            </Container>
        </>
    )
}
export default TransactionHistory;

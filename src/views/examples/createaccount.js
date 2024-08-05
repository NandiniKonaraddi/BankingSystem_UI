import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, DropdownItem } from "reactstrap";
import axios from 'axios';
import UserHeader from "components/Headers/UserHeader.js";
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rootservice from "components/service/Rootservice";
const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [Error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male');
    const [panCardNumber, setPanCardNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [Save, setSave] = useState('Create Account');
    const [account, setAccountType] = useState('Saving Account');
    const [bankAccount, setBankAccount] = useState('SBI Bank');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Save === 'Create Account') {
            const formData = { firstName, lastName, mobileNumber, age, gender, panCardNumber, accountNumber, account, bankAccount, address, city, country, postalCode };
            try {
                const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
                formData.username = username.username
                formData.accountNumber = randomNumber
                Rootservice.createaccount(formData).then(async (response) => {
                    if (response.data) {
                        setFirstName('');
                        setLastName('');
                        setAddress('');
                        setCity('');
                        setCountry('');
                        setPostalCode('');
                        setMobileNumber('');
                        setAge('');
                        setPanCardNumber('');
                        setAccountNumber('');
                        setError('')
                        notify();
                        details();
                    }
                }).catch((error) => {
                    setError(error.response?.data?.message || 'Server error');
                    console.log(error)
                })

            } catch (error) {
                console.error('Error:', error);
                setError(error.response?.data?.message || 'Server error');
            }
        } else {
            const formData = { firstName, lastName, mobileNumber, age, gender, panCardNumber, accountNumber, account, bankAccount, address, city, country, postalCode };
            try {
                Rootservice.getaccountupdate(formData).then(async (response) => {
                    if (response.data) {
                        setFirstName('');
                        setLastName('');
                        setAddress('');
                        setCity('');
                        setCountry('');
                        setPostalCode('');
                        setMobileNumber('');
                        setAge('');
                        setPanCardNumber('');
                        setAccountNumber('');
                        setError('')
                        notify();
                        details();
                    }
                }).catch((error) => {
                    setError(error.response?.data?.message || 'Server error');
                    console.log(error)
                })

            } catch (error) {
                console.error('Error:', error);
                setError(error.response?.data?.message || 'Server error');
            }
        }
    };
    const notify = () => toast.success('Profile updated successfully!');
    const notifydelete = () => toast.success('Account Deleted Successfully!');

    const details = async () => {
        const value = { username: username.username }
        Rootservice.getaccount(value).then((res) => {
            const userProfile = res.data;
            setProfile(userProfile);

        }).catch((error) => {
            console.log(error)
        })
    }
    const [Profile, setProfile] = useState([])
    useEffect(() => {
        const getTokenFromLocalStorage = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setUsername(jwtDecode(token));
                const payload = jwtDecode(token)
                const value = { username: payload.username }
                Rootservice.getaccount(value).then(async (res) => {
                    const userProfile = res.data;
                    setProfile(userProfile);
                }).catch((error) => {
                    console.log(error)
                })
            } else {
                console.log('Token not found in localStorage');
            }
        };
        getTokenFromLocalStorage();
    }, []);

    const CreateNewAccount = () => {
        setFirstName('');
        setLastName('');
        setAddress('');
        setCity('');
        setCountry('');
        setPostalCode('');
        setMobileNumber('');
        setAge('');
        setPanCardNumber('');
        setAccountNumber('');
        setAccountType('Saving Account');
        setBankAccount('SBI Bank');
        setSave('Create Account')
        setError('')
    }
    const handleClick = async (value) => {
        await axios.post('http://localhost:3050/update-account/get-accountdetails', { accountNumber: value }, {
        }).then((res) => {
            const accountdetails = res.data;
            setFirstName(accountdetails.firstName);
            setLastName(accountdetails.lastName);
            setAddress(accountdetails.address);
            setCity(accountdetails.city);
            setCountry(accountdetails.country);
            setPostalCode(accountdetails.postalCode);
            setMobileNumber(accountdetails.mobileNumber);
            setAge(accountdetails.age);
            setGender(accountdetails.gender);
            setPanCardNumber(accountdetails.panCardNumber);
            setAccountNumber(accountdetails.accountNumber);
            setAccountType(accountdetails.account);
            setBankAccount(accountdetails.bankAccount);
            setSave('Update Account');
        }).catch((error) => {
            console.log(error)
        })
    }
    const toggleEditMode = async () => {
        const value = { accountNumber: accountNumber }
        await axios.post('http://localhost:3050/update-account/get-accountdelete', value, {
        }).then((res) => {
            setFirstName('');
            setLastName('');
            setAddress('');
            setCity('');
            setCountry('');
            setPostalCode('');
            setMobileNumber('');
            setAge('');
            setPanCardNumber('');
            setAccountNumber('');
            setError('')
            details();
            notifydelete();
            setSave('Create Account');
        }).catch((error) => {
            console.log(error)
        })


    };
    return (
        <>
            <UserHeader />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <img
                                                alt="..."
                                                className="rounded-circle"
                                                src="https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"
                                            />
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between">
                                    <Button
                                        className="mr-4"
                                        color="info"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                        size="sm"
                                    >
                                        Connect
                                    </Button>
                                    <Button
                                        className="float-right"
                                        color="default"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                        size="sm"
                                    >
                                        Message
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody className="pt-0 pt-md-4">

                                <div className="text-center">
                                    <h3>
                                        Hello {username.username}
                                        <span className="font-weight-light"></span>
                                    </h3>

                                    <hr className="my-4" />
                                    <h4 style={{ textDecoration: "underline" }}> List Of Bank Accounts</h4>
                                    <div>
                                        {Profile.map((x, index) => (
                                            <p key={index} style={{ color: "blue", cursor: "pointer" }} onClick={() => handleClick(x.accountNumber)}>{x.bankAccount} -{x.account}-{x.accountNumber}</p>
                                        ))}
                                    </div>
                                    <small style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }} onClick={CreateNewAccount}>Create new account</small>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Account Details</h3>

                                    </Col>

                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={toggleEditMode}
                                            size="sm"
                                        >
                                            Delete Account
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
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
                                                        onChange={(e) => setAccountType(e.target.value)}>
                                                        <option value="Saving Account">Saving Account</option>
                                                        <option value="Current Account">Current Account</option>
                                                    </select>
                                                </FormGroup>
                                            </Col>
                                        </Row>


                                    </div>
                                    <hr className="my-4" />
                                    <h6 className="heading-small text-muted mb-4">
                                        User information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-username"
                                                    >
                                                        Username
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue="lucky.jesse"
                                                        id="input-username"
                                                        placeholder="Username"
                                                        type="text"
                                                        value={username.username}
                                                        style={{ cursor: 'not-allowed' }}
                                                        disabled
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        Email address
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-email"
                                                        placeholder="jesse@example.com"
                                                        type="email"
                                                        style={{ cursor: 'not-allowed' }}
                                                        value={username.email}
                                                        disabled
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        First name
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue="Lucky"
                                                        id="input-first-name"
                                                        placeholder="First name"
                                                        type="text"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}

                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        Last name
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue="Jesse"
                                                        id="input-last-name"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        placeholder="Last name"
                                                        type="text"

                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-mobile-number"
                                                    >
                                                        Mobile Number
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"

                                                        id="input-mobile-number"
                                                        placeholder="+91"
                                                        type="number"
                                                        value={mobileNumber}
                                                        onChange={(e) => setMobileNumber(e.target.value)}

                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-age"
                                                    >
                                                        Age
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue="26"
                                                        id="input-age"
                                                        value={age}
                                                        onChange={(e) => setAge(e.target.value)}
                                                        placeholder="Age"
                                                        type="number"

                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-gender"
                                                    >
                                                        Gender
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        id="input-gender"
                                                        value={gender}
                                                        onChange={(e) => setGender(e.target.value)}

                                                    >
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </select>

                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-pan"
                                                    >
                                                        PAN Card Number
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue="26"
                                                        id="input-pan"
                                                        value={panCardNumber}
                                                        onChange={(e) => setPanCardNumber(e.target.value)}
                                                        placeholder="KOBPK267N"
                                                        type="text"

                                                    />

                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />

                                    <h6 className="heading-small text-muted mb-4">
                                        Address information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-address"
                                                    >
                                                        Address
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                        id="input-address"
                                                        placeholder="Home Address"
                                                        type="text"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}

                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-city"
                                                    >
                                                        City
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue="New York"
                                                        id="input-city"
                                                        placeholder="City"
                                                        type="text"
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}

                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-country"
                                                    >
                                                        Country
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue="United States"
                                                        id="input-country"
                                                        placeholder="Country"
                                                        type="text"
                                                        value={country}
                                                        onChange={(e) => setCountry(e.target.value)}

                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-country"
                                                    >
                                                        Postal code
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-postal-code"
                                                        placeholder="Postal code"
                                                        type="number"
                                                        value={postalCode}
                                                        onChange={(e) => setPostalCode(e.target.value)}

                                                    />
                                                    {Error && (
                                                        <small className="text-danger">{Error}</small>
                                                    )}
                                                </FormGroup>

                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />

                                    <Row>
                                        <div className="text-center" xs="4">
                                            <Button className="mt-4 mr-2" color="primary" type="submit">
                                                {Save}
                                            </Button>
                                        </div>

                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default CreateAccount;
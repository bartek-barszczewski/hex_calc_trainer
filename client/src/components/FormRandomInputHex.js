import React from "react";
import InputHex from "./InputHex";
import {settings, subtractHexNumbers, addHexNumbers} from "./utils/settings";
import axios from "axios";
import "./../style/main.css";
import Button from "react-bootstrap/Button";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";

const FormRandomInputHex = () => {
    const [hexLength, setHexLength] = React.useState(settings.START_LENGTH_HEX);
    const [min, setMin] = React.useState(Math.pow(settings.BASE, hexLength));
    const [max, setMax] = React.useState(Math.pow(settings.BASE, hexLength + 1));
    const [counter, setCounter] = React.useState(settings.START_COUNTER);
    const [operationIndex, setOperationIndex] = React.useState(0);
    const [operation, setOperation] = React.useState(settings.OPERATION_ARRAY[operationIndex]);
    const [hexadecimalNumbers, setHexadecimalNumbers] = React.useState({hex1: "0", hex2: "0"});
    const [result, setResult] = React.useState("");

    React.useEffect(() => {
        setCounter((prev) => prev);

        setOperation(() => settings.OPERATION_ARRAY[operationIndex]);

        setMin(() => Math.pow(settings.BASE, hexLength));

        setMax(() => Math.pow(settings.BASE, hexLength + 1));

        setOperationIndex(
            () => Math.floor(Math.random() * (settings.INDEX_MAX - settings.INDEX_MIN)) + settings.INDEX_MIN
        );
    }, [hexLength, min, max, counter, operationIndex, operation, hexadecimalNumbers]);

    const handleHexNumbers = (hexNum, hexKeyName) => {
        setHexadecimalNumbers((prev) => ({
            ...prev,
            [hexKeyName]: hexNum,
        }));
    };

    const changeHexLength = (e) => {
        setHexLength(() => {
            let lengthHexNumber = Number(e.target.value);

            if (!lengthHexNumber) {
                return 0;
            }

            return Number(lengthHexNumber);
        });
    };

    const sendToApi = () => {
        axios
        .post(
            "/api/calculate/hexadecimal",
            {
                firstHex: hexadecimalNumbers.hex1.toString(16),
                secondHex: hexadecimalNumbers.hex2.toString(16),
                operation: operation,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
        .then((response) => {
            const result = response.data;
            setResult(result?.result_hex);
        })
        .catch((err) => console.log(err.response.data));
    };

    const setNewHexNumbers = () => {
        setCounter((prev) => prev + 1);
        setResult("");
    };

    return (
        <ThemeProvider breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
            <Container fluid>
                <Container></Container>
                <Container
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <h2 className="py-5">Hexadecimal Calculation Trainer</h2>
                    <p className="cite mt-3">
                        <i>
                            Yes, that's asking a lot. But I ask you now, as I will ask you again on this journey, do you
                            wanna hack assembly … or do you just wanna fool around? It takes practice to learn the
                            piano, and it takes practice to drive the core skills of assembly language programming down
                            into your synapses where they belong.
                        </i>
                    </p>
                    <h5 className="py-3">Jeff Duntemann, x64 Assembly Language Step-by-Step Programming with Linux®</h5>

                    <Stack
                        direction="horizontal"
                        style={{
                            height: "50vh",
                            backgroundColor: "black",
                            borderRadius: "1rem",
                            padding: "3rem",
                            border: "1px solid #999",
                        }}
                    >
                        <Col
                            md="6"
                            style={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Row
                                style={{
                                    width: "100%",
                                    justifyContent: "start",
                                }}
                            >
                                <Stack
                                    style={{
                                        width: "100%",
                                        justifyContent: "start",
                                    }}
                                >
                                    <p> 0x{hexadecimalNumbers.hex1.toString(16)} </p>
                                    <p>
                                        0x{hexadecimalNumbers.hex2.toString(16)} <span>&nbsp; {operation} </span>
                                    </p>
                                    <hr />
                                    <p>{result.indexOf(".") != -1 ? result : `0x${result}`}</p>
                                </Stack>
                            </Row>
                        </Col>
                        <Col
                            style={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                gap: "1rem",
                            }}
                            md="6"
                        >
                            <InputHex
                                min={min}
                                max={max}
                                counter={counter}
                                onHexNumberChange={(hex) => handleHexNumbers(hex, "hex1")}
                            />
                            <InputHex
                                min={min}
                                max={max}
                                counter={counter}
                                onHexNumberChange={(hex) => handleHexNumbers(hex, "hex2")}
                            />
                            <Form
                                style={{
                                    width: "21rem",
                                    display: "flex",
                                    gap: "1rem",
                                }}
                            >
                                <Form.Control value={"10^"} style={{width: "5rem"}} />
                                <Form.Control
                                    style={{widht: "15rem"}}
                                    className="input"
                                    type="text"
                                    value={hexLength}
                                    onInput={changeHexLength}
                                />
                            </Form>
                            <Row
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <Stack direction="horizontal" gap={3}>
                                    <Button variant="flat" size="xxl" type="button" onClick={setNewHexNumbers}>
                                        NEW
                                    </Button>
                                    <Button onClick={sendToApi} variant="flat" size="xxl">
                                        SHOW ANSWER
                                    </Button>
                                </Stack>
                            </Row>
                        </Col>
                    </Stack>
                </Container>
            </Container>
        </ThemeProvider>
    );
};

export default FormRandomInputHex;

import React from "react";
import InputHex from "./InputHex";
import {settings} from "./utils/settings";
import axios from "axios";
import "./../style/main.css";
import Button from "react-bootstrap/Button";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Description from "./Description";

const FormRandomInputHex = () => {
    const [hexLength, setHexLength] = React.useState(settings.START_LENGTH_HEX);
    const [min, setMin] = React.useState(Math.pow(settings.BASE, hexLength));
    const [max, setMax] = React.useState(Math.pow(settings.BASE, hexLength));
    const [counter, setCounter] = React.useState(settings.START_COUNTER);
    const [operationIndex, setOperationIndex] = React.useState(0);
    const [operation, setOperation] = React.useState(settings.OPERATION_ARRAY[operationIndex]);
    const [hexadecimalNumbers, setHexadecimalNumbers] = React.useState({hex1: "0", hex2: "0"});
    const [result, setResult] = React.useState("");
    const [errorTooLarge, setErrorToLarge] = React.useState(null);
    const [columnsToFillForHex1, setColumnsToFillForHex1] = React.useState([]);
    const [columnsToFillForHex2, setColumnsToFillForHex2] = React.useState([]);

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
        setErrorToLarge(null);

        setHexLength(() => {
            let lengthHexNumber = Number(e.target.value);

            if (!lengthHexNumber) {
                return 0;
            }

            return Number(lengthHexNumber);
        });

        setResult("");
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
            const result = response.data.result_hex;
            setResult(result);

            const hex1 = hexadecimalNumbers.hex1.toString(16).split("");
            const hex2 = hexadecimalNumbers.hex2.toString(16).split("");
            const hexResult = result.indexOf("0x") === -1 ? result.split("") : result.replace("0x", "").split("");

            const amountColumnsToFillHex1 = hexResult.length - hex1.length;
            const amountColumnsToFillHex2 = hexResult.length - hex2.length;

            setColumnsToFillForHex1(Array(amountColumnsToFillHex1).fill(<td></td>));
            setColumnsToFillForHex2(Array(amountColumnsToFillHex2).fill(<td></td>));
        })
        .catch((err) => {
            setErrorToLarge(err.response.data.error);
            setCounter((prev) => prev + 1);
            setHexLength(settings.START_LENGTH_HEX);
            setResult("");
        });
    };

    const setNewHexNumbers = () => {
        setCounter((prev) => prev + 1);
        setResult("");
        setErrorToLarge(null);
        setColumnsToFillForHex1([]);
        setColumnsToFillForHex2([]);
    };

    const hex1 = hexadecimalNumbers.hex1.toString(16).split("");
    const hex2 = hexadecimalNumbers.hex2.toString(16).split("");
    const hexResult = result && result.indexOf("0x") === -1 ? result.split("") : result.replace("0x", "").split("");

    const hex1Columns = hex1.map((hex, index) => {
        return <td key={`${index}_hex_1`}>{hex}</td>;
    });

    const hex2Columns = hex2.map((hex, index) => {
        return <td key={`${index}_hex_2`}>{hex}</td>;
    });

    const hexResultColumns = hexResult.map((hex, index) => {
        return <td key={`${index}_hex_result`}>{hex}</td>;
    });

    return (
        <ThemeProvider breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
            <Container fluid>
                <Container></Container>
                <Container className="trainer_main_container">
                    <Description />

                    <Stack direction="horizontal" className="stack_calculator">
                        <Col md="6" className="col_calculation_results">
                            <Row className="justify_row">
                                <Stack className="justify_stack">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th colspan="16"> Operation: [{operation}]</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {columnsToFillForHex1}
                                                {hex1Columns}
                                            </tr>
                                            <tr>
                                                {columnsToFillForHex2}
                                                {hex2Columns}
                                            </tr>
                                            <tr className="border_for_row">{hexResultColumns}</tr>
                                        </tbody>
                                    </table>
                                </Stack>
                            </Row>
                        </Col>

                        <Col className="col_to_generate_hex_numbers" md="6">
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

                            <Form className="form_ten_power_to">
                                <Form.Control value={"10^"} className="input_basis_of_power" readOnly />
                                <Form.Control type="text" value={hexLength} onInput={changeHexLength} md={12} />
                            </Form>

                            <Row className="row_button_stack">
                                <Stack direction="horizontal" gap={3} md={12}>
                                    <Button variant="flat" size="xxl" type="button" onClick={setNewHexNumbers}>
                                        NEW
                                    </Button>
                                    <Button onClick={sendToApi} variant="flat" size="xxl">
                                        SHOW ANSWER
                                    </Button>
                                </Stack>
                                {errorTooLarge && <p className="error">* {errorTooLarge}</p>}
                            </Row>
                        </Col>
                    </Stack>
                </Container>
            </Container>
        </ThemeProvider>
    );
};

export default FormRandomInputHex;

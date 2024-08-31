import React from "react";
import InputHex from "./InputHex";
import {settings, subtractHexNumbers, addHexNumbers} from "./utils/settings";
import axios from "axios";

const FormRandomInputHex = () => {
    const [hexLength, setHexLength] = React.useState(settings.START_LENGTH_HEX);
    const [min, setMin] = React.useState(Math.pow(settings.BASE, hexLength));
    const [max, setMax] = React.useState(Math.pow(settings.BASE, hexLength + 1) - 1);
    const [counter, setCounter] = React.useState(settings.START_COUNTER);
    const [operationIndex, setOperationIndex] = React.useState(0);
    const [operation, setOperation] = React.useState(settings.OPERATION_ARRAY[operationIndex]);
    const [hexadecimalNumbers, setHexadecimalNumbers] = React.useState({hex1: "0", hex2: "0"});
    const [result, setResult] = React.useState("");

    React.useEffect(() => {
        setCounter((prev) => prev);

        setOperation(() => settings.OPERATION_ARRAY[operationIndex]);

        setMin(() => Math.pow(settings.BASE, hexLength));

        setMax(() => Math.pow(settings.BASE, hexLength + 1) - 1);

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
        <div>
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

            <p> {operation} </p>
            <input type="text" value={hexLength} onInput={changeHexLength} />
            <button type="button" onClick={setNewHexNumbers}>
                GET NEW HEX
            </button>
            <button type="button" onClick={sendToApi}>
                SEND{" "}
            </button>
            <dev>
                <div>
                    <p> {hexadecimalNumbers.hex1} </p>
                    <p> {hexadecimalNumbers.hex2} </p>
                    <span> {operation} </span>
                </div>
                <p>{result}</p>
            </dev>
        </div>
    );
};

export default FormRandomInputHex;

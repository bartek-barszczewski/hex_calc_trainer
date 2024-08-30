import React from "react";
import InputHex from "./InputHex";
import {settings} from "./utils/settings";

export const FormRandomInputHex = () => {
    const [hexLength, setHexLength] = React.useState(settings.START_LENGTH_HEX);
    const [min, setMin] = React.useState(Math.pow(settings.BASE, hexLength));
    const [max, setMax] = React.useState(Math.pow(settings.BASE, hexLength + 1) - 1);
    const [counter, setCounter] = React.useState(settings.START_COUNTER);
    const [operationIndex, setOperationIndex] = React.useState(0);
    const [operation, setOperation] = React.useState(settings.OPERATION_ARRAY[operationIndex]);
    const [calculationResult, setCalculationResult] = React.useState(operationIndex);

    React.useEffect(() => {
        setCounter((prev) => prev);

        setOperation(() => {
            return settings.OPERATION_ARRAY[operationIndex];
        });

        setMin(() => {
            return Math.pow(settings.BASE, hexLength);
        });

        setMax(() => {
            return Math.pow(settings.BASE, hexLength + 1) - 1;
        });

        setOperationIndex(() => {
            return Math.floor(Math.random() * (settings.INDEX_MAX - settings.INDEX_MIN)) + settings.INDEX_MIN;
        });

        setCalculationResult((prev) => {
            const runSpecific = {
                "+": function () {
                    return "Run add";
                },
                "-": function () {
                    return "Run sb";
                },
                "*": function () {
                    return "Run mul";
                },
                "/": function () {
                    return "Run div";
                },
            };

            return runSpecific[operation]();
        });
    }, [hexLength, min, max, counter, operationIndex, operation, calculationResult]);

    const changeHexLength = (e) => {
        setHexLength(() => {
            let lengthHexNumber = Number(e.target.value);

            if (!lengthHexNumber) {
                return 0;
            }

            return Number(lengthHexNumber);
        });
    };

    const countHexNumbers = () => {
        setCalculationResult((prev) => {
            const runSpecific = {
                "+": function () {
                    return "Run add";
                },
                "-": function () {
                    return "Run sb";
                },
                "*": function () {
                    return "Run mul";
                },
                "/": function () {
                    return "Run div";
                },
            };

            return runSpecific[operation]();
        });
    };

    const randNextHexNumber = () => {
        setCounter((prev) => prev + 1);
    };

    const handleGenerator = () => {
        randNextHexNumber();
        countHexNumbers();
    };

    return (
        <div>
            <InputHex min={min} max={max} counter={counter} />
            <InputHex min={min} max={max} counter={counter} />
            <p> {operation} </p>
            <input type="text" value={hexLength} onInput={changeHexLength} />
            <button onClick={handleGenerator}> GENERATE </button>
            <p>{calculationResult}</p>
        </div>
    );
};

export default FormRandomInputHex;

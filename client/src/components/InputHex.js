// InputHex.js
import React from "react";

const InputHex = (props) => {
    const [hexNumber, setHexNumber] = React.useState(0);

    React.useEffect(() => {
        const hex = Math.floor(Math.random() * (Number(props.max) - Number(props.min) + 1)) + Number(props.min);
        setHexNumber(hex);

        props.onHexNumberChange(hex);
    }, [props.min, props.max, props.counter]);

    return (
        <div>
            <input type="text" value={`0x${hexNumber.toString(16)}`} readOnly />
        </div>
    );
};

export default InputHex;

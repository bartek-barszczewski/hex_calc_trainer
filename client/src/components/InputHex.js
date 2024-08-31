// InputHex.js
import React from "react";
import Form from "react-bootstrap/Form";

const InputHex = (props) => {
    const [hexNumber, setHexNumber] = React.useState(0);

    React.useEffect(() => {
        const hex = Math.floor(Math.random() * (Number(props.max - 1) - Number(props.min))) + Number(props.min);
        setHexNumber(hex);

        props.onHexNumberChange(hex);
    }, [props.min, props.max, props.counter]);

    return (
        <Form
            style={{
                width: "100%",
            }}
        >
            <Form.Control type="text" value={`0x${hexNumber.toString(16)}`} readOnly />
        </Form>
    );
};

export default InputHex;

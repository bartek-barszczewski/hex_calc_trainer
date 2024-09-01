// InputHex.js
import React from "react";
import Form from "react-bootstrap/Form";
import "../style/main.css";

const InputHex = (props) => {
    const [hexNumber, setHexNumber] = React.useState(0);

    React.useEffect(() => {
        const hex = Math.floor(Math.random() * (Number(props.max - 1) - Number(props.min))) + Number(props.min);
        setHexNumber(hex);
        props.onHexNumberChange(hex);
    }, [props.min, props.max, props.counter]);

    return (
        <Form className="form_random_number">
            <Form.Control type="text" value={`0x${hexNumber.toString(16)}`} readOnly />
        </Form>
    );
};

export default InputHex;

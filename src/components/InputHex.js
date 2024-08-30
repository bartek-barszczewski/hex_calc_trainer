import React from "react";

const InputHex = (props) => {
    const [hexNumber, setHexNumber] = React.useState(
        Math.floor(Math.random() * (props.max - props.min + 1)) + props.min
    );

    React.useEffect(() => {
        setHexNumber((prevState) => {
            const hexNumber =
                Math.floor(Math.random() * (Number(props.max) - Number(props.min) + 1)) + Number(props.min);
            return hexNumber.toString(16);
        });
    }, [props.min, props.max, props.counter]);

    return (
        <div>
            <input type="text" value={hexNumber} readOnly />
        </div>
    );
};

export default InputHex;

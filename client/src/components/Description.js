import BugIcon from "./utils/bugIcon";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

const Description = () => {
    return (
        <Stack className="stack_description">
            <h1 style={{textAlign: "center"}}>Hexadecimal Calculation Trainer</h1>
            <BugIcon />
            <h3 className="pt-4 pb-2">What if I told you...</h3>
            <p className="cite mt-3">
                <i>
                    Consistently practicing hexadecimal math will make you more comfortable with assembly language, as
                    it improves your ability to work with numbers in a way that is essential for effective programming
                    at the hardware level.
                </i>
            </p>

            <a href="#practice" className="button_go_to_train">
                <Button variant="flat" size="xxl" type="button">
                    GO HEX PRACTICE
                </Button>
            </a>
        </Stack>
    );
};
export default Description;

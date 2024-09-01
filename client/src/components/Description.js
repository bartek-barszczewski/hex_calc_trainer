import BugIcon from "./utils/bugIcon";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

const Description = () => {
    return (
        <Stack className="stack_description">
            <h1 style={{textAlign: "center"}}>Hexadecimal Calculation Trainer</h1>
            <BugIcon />
            <p className="cite mt-3">
                <i>
                    "...Yes, that's asking a lot. But I ask you now, as I will ask you again on this journey, do you
                    wanna hack assembly … or do you just wanna fool around? It takes practice to learn the piano, and it
                    takes practice to drive the core skills of assembly language programming down into your synapses
                    where they belong."
                </i>
            </p>
            <h4 className="pt-1 pb-5">Jeff Duntemann, x64 Assembly Language Step-by-Step Programming with Linux®</h4>

            <a href="#practice" className="button_go_to_train">
                <Button variant="flat" size="xxl" type="button">
                    GO HEX PRACTICE
                </Button>
            </a>
        </Stack>
    );
};
export default Description;

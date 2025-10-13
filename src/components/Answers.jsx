import { useEffect, useState } from "react"
import { checkHeading, replaceHeading } from "../helper";

const Answers = ({ ans, totalAnswer, index, type }) => {
    const [heading, setHeading] = useState(false);
    const [answer, setAnswer] = useState(ans);

    useEffect(() => {
        if (checkHeading(ans)) {
            setHeading(true);
            setAnswer(replaceHeading(ans));
        }
    }, []);
    return (
        <>
            {
                index === 0 && totalAnswer > 1 ? <span className="pt-2 text-xl block text-white">{answer}</span>
                    : heading ? <span className="pt-2 text-lg block text-white">{answer}</span> :
                        <span className={type === 'q' ? "pl-1" : "pl-5"}>{answer}</span>
            }
        </>
    )
}
export default Answers

import Answers from "./Answers";

const QuestionAnswer = ({ item, index }) => {
    return (
        <div key={index + Math.random()} className={item.type === 'q' ? 'flex justify-end' : ''}>
            {item.type === 'q' ?
                <li key={index + Math.random()} className='text-right p-1 border-8 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit '>
                    <Answers ans={item.text} totalAnswer={1} index={index} type={item.type} />
                </li>
                : item.text.map((ansItem, ansIndex) => {
                    return <li key={ansIndex + Math.random()} className='text-left p-1'><Answers ans={ansItem} totalAnswer={item.length} index={ansIndex} type={item.type} /></li>
                })
            }
        </div>
    );
};
export default QuestionAnswer;
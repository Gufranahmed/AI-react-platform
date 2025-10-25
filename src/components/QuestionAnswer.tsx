import React from "react";
import Answers from "./Answers";
import { useTheme } from './ThemeContext';

interface QuestionAnswerProps {
  item: {
    type: string;
    text: string | string[];
    length?: number;
  };
  index: number;
}

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({ item, index }) => {
  const { theme } = useTheme();
  return (
    <div className={item.type === 'q' ? 'flex justify-end' : ''}>
      {item.type === 'q' ?
        <li className={`text-right p-1 border-8 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit ${theme === 'light' ? 'bg-gray-200 border-gray-200 text-black' : 'bg-zinc-700 border-zinc-700 text-white'}`}>
          <Answers ans={item.text as string} totalAnswer={1} index={index} type={item.type} />
        </li>
        : Array.isArray(item.text) && item.text.map((ansItem, ansIndex) => (
          <li key={ansIndex} className={`text-left p-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
            <Answers ans={ansItem} totalAnswer={item.length || 1} index={ansIndex} type={item.type} />
          </li>
        ))
      }
    </div>
  );
};
export default QuestionAnswer;

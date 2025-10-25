import React, { useEffect, useRef, useState } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import './App.css';
import { fetchAnswer } from './helper';
import RecentSearch from './components/RecentSearch';
import QuestionAnswer from './components/QuestionAnswer';

interface AnswerItem {
  type: string;
  text: string | string[];
}

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<AnswerItem[]>([]);
  const [history, setHistory] = useState<string[]>(JSON.parse(localStorage.getItem("history") || '[]'));
  const [searchHistory, setSearchHistory] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const askquestion = async () => {
    if (!question && !searchHistory) return;
    setLoader(true);
    const response = await fetchAnswer(question, setHistory, searchHistory);
    setAnswer([...answer, { type: 'q', text: question ? question : searchHistory }, { type: 'a', text: response }]);
    setQuestion("");

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 500);
    setLoader(false);
  };
  const isEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      askquestion();
    }
  };
  useEffect(() => {
    askquestion();
  }, [searchHistory]);

  return (
    <div className={`grid grid-cols-5 h-screen text-center ${theme}-theme`}>
      <RecentSearch history={history} setSearchHistory={setSearchHistory} setHistory={setHistory} />
      <div className="col-span-4 p-10">
        <div className="flex justify-end mb-4">
          <button onClick={toggleTheme} className="px-4 py-2 rounded bg-zinc-700 text-white hover:bg-zinc-600">
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
        <h1 className='text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'>
          Hello user, How can I help you today?
        </h1>
        {loader && (
          <div className="flex justify-center items-center mb-4">
            <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-2 text-white">Loading...</span>
          </div>
        )}
        <div ref={scrollRef} className="container h-130 overflow-scroll scrollbar-hide">
          <div className='text-zinc-300'>
            <ul>
              {
                answer && answer.map((item, index) => {
                  return (
                   <QuestionAnswer item={item} key={index} index={index} />
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div className={`w-1/2 p-1 pr-5 m-auto rounded-2xl border flex h-16 items-center ${theme === 'light' ? 'bg-gray-100 border-gray-300 text-black' : 'bg-zinc-800 border-zinc-700 text-white'}`}> 
          <input
            className={`w-full h-full p-3 outline-none rounded-3xl border ${theme === 'light' ? 'bg-white text-black border-gray-300 placeholder-gray-500' : 'bg-zinc-900 text-white border-zinc-700 placeholder-zinc-400'}`}
            value={question}
            onKeyDown={isEnterKey}
            onChange={(event) => setQuestion(event.target.value)}
            type="text"
            placeholder='Type your message here...'
          />
          <button
            className={`ml-4 px-4 py-2 rounded-3xl m-auto ${theme === 'light' ? 'bg-gray-300 hover:bg-gray-400 text-black' : 'bg-zinc-700 hover:bg-zinc-600 text-white'}`}
            onClick={askquestion}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
export default App;

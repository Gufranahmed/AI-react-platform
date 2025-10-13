import { useEffect, useRef, useState } from 'react';
import './App.css'
import { fetchAnswer } from './helper';
import RecentSearch from './components/RecentSearch';
import QuestionAnswer from './components/QuestionAnswer';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([]);
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("history")));
  const [searchHistory, setSearchHistory] = useState("");
  const scrollRef = useRef();
  const [loader, setLoader] = useState(false);

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
  }
  const isEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      askquestion();
    }
  }
  useEffect(() => {
    askquestion();
  }, [searchHistory]);

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <RecentSearch history={history} setSearchHistory={setSearchHistory} setHistory={setHistory} />
      <div className="col-span-4 p-10 bg-zinc-900">
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
        <div className=' w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-700 flex h-16'>
          <input className='w-full h-full p-3 outline-none' value={question} onKeyDown={isEnterKey} onChange={(event) => setQuestion(event.target.value)} type="text" placeholder='Type your message here...' />
          <button className='bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-3xl m-auto' onClick={askquestion}>Send</button>
        </div>

      </div>
    </div>
  )
}
export default App

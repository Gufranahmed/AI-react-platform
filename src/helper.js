import { URL } from "./constants";

export const fetchAnswer = async (question,setHistory,searchHistory) => {
  if (question) {
    if (localStorage.getItem("history")) {
      let history = JSON.parse(localStorage.getItem("history"));
      history = [question, ...history]
      localStorage.setItem("history", JSON.stringify(history));
      setHistory(history);
    } else {
      localStorage.setItem("history", JSON.stringify([question]));
      setHistory([question]);
    }
  }
  const payload = question  ? question : searchHistory;
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": "AIzaSyD_qISOvdQnm7E9h3jmrLS-GxbP9GLjdVA"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: payload
            }
          ]
        }
      ]
    })
  });
  const data = await response.json();
  let dataString = data.candidates[0].content.parts[0].text;
  dataString = dataString.split("* ")
  dataString = dataString.map((item) => {
    return item.replace(/\n/g, "").trim();
  });
  return dataString;
}

export function checkHeading(string) {
  return /^(\*{2})(.*)\*$/.test(string)
}
export function replaceHeading(string) {
  return string.replace(/^(\*{2})|(\*)$/g, "");
}

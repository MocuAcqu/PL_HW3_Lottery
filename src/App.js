import React, { useState, useEffect } from "react";
import ProgressBar from "./tools/ProgressBar";
import ParallaxEffect from "./tools/ParallaxEffect";
import "./App.css";

function App() {
  const [prizes, setPrizes] = useState("");
  const [names, setNames] = useState("");
  const [progress, setProgress] = useState(0);
  const [prizeCount, setPrizeCount] = useState(0);
  const [nameCount, setNameCount] = useState(0);
  const [winners, setWinners] = useState([]);

  const quotes = [
    "Keep going, you're doing great!",
    "Success is not final; failure is not fatal.",
    "Dream big and dare to fail.",
    "Stay positive, work hard, make it happen.",
    "Believe you can and you're halfway there.",
  ];

  // 更新進度條
  useEffect(() => {
    const prizeProgress = prizeCount > 0 ? 50 : 0;
    const nameProgress = nameCount > 0 ? 50 : 0;
    setProgress(prizeProgress + nameProgress);
  }, [prizeCount, nameCount]);

  // 處理清除資料
  const handleClear = () => {
    setPrizes("");
    setNames("");
    setPrizeCount(0);
    setNameCount(0);
    setWinners([]);
  };

  // 開始抽獎
  const handleDraw = () => {
    if (progress < 100) {
      alert("請確保已填寫所有欄位！");
      return;
    }

    const prizeList = prizes
      .trim()
      .split("\n")
      .map((line) => line.split(",").map((item) => item.trim()));

    const participantList = names
      .trim()
      .split("\n")
      .map((name) => name.trim());

    const results = [];
    for (const [prizeName, quantity] of prizeList) {
      const prizeQuantity = parseInt(quantity, 10);
      const selectedWinners = [];
      for (let i = 0; i < prizeQuantity; i++) {
        if (participantList.length === 0) break;
        const randomIndex = Math.floor(Math.random() * participantList.length);
        selectedWinners.push(participantList.splice(randomIndex, 1)[0]);
      }
      results.push({
        prize: prizeName,
        winners: selectedWinners,
      });
    }

    setWinners(results);

    // 當抽獎結束後，滾動到結果區域
    window.scrollTo({
      top: document.querySelector(".results").offsetTop,
      behavior: "smooth",
    });
  };

  const updatePrizeCount = (value) => {
    const prizeLines = value.trim().split("\n").filter((line) => line);
    let count = 0;
    prizeLines.forEach((line) => {
      const parts = line.split(",");
      if (parts.length === 2) {
        const quantity = parseInt(parts[1].trim(), 10);
        if (!isNaN(quantity)) count += quantity;
      }
    });
    setPrizeCount(count);
  };

  const updateNameCount = (value) => {
    const nameLines = value.trim().split("\n").filter((line) => line);
    setNameCount(nameLines.length);
  };

  return (
    <div className="App">
      <ParallaxEffect />
      <h1>抽獎工具</h1>
      <ProgressBar progress={progress} />
      <div className="input-section-container">
        <div className="input-section">
          <h3>獎項內容</h3>
          <textarea
            value={prizes}
            onChange={(e) => {
              setPrizes(e.target.value);
              updatePrizeCount(e.target.value);
            }}
            placeholder="每行輸入: 獎品名稱,數量，例如：行李箱,2"
          />
          <p>總獎項數量: {prizeCount}</p>
        </div>

        <div className="input-section">
          <h3>抽獎名單</h3>
          <textarea
            value={names}
            onChange={(e) => {
              setNames(e.target.value);
              updateNameCount(e.target.value);
            }}
            placeholder="每行輸入參加者名稱"
          />
          <p>參加人數: {nameCount}</p>
        </div>
      </div>

      <div className="buttons">
        <button onClick={handleClear}>清除資料</button>
        <button onClick={handleDraw} disabled={progress < 100}>
          開始抽獎
        </button>
      </div>

      <div className="results">
        <h3>中獎名單</h3>
        {winners.map((result, index) => (
          <div key={index} className="result-box">
            <h3>{result.prize}</h3>
            <p>中獎者: {result.winners.join(", ")}</p>
            <p>勵志名言: {quotes[Math.floor(Math.random() * quotes.length)]}</p>
          </div>
        ))}
      </div>
      <ParallaxEffect />

    </div>
  );
}

export default App;

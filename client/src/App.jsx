import { useState } from "react";
import axios from "axios";

const moves = ["U", "U'", "D", "D'", "L", "L'", "R", "R'", "F", "F'", "B", "B'"];
const cubeFaces = ["U", "L", "F", "R", "B", "D"];
const defaultColorMap = {
  U: "white",
  L: "orange",
  F: "green",
  R: "red",
  B: "blue",
  D: "yellow",
};

function App() {
  const [scramble, setScramble] = useState([]);
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cube, setCube] = useState(
    Object.fromEntries(cubeFaces.map((f) => [f, Array(9).fill(defaultColorMap[f])]))
  );

  const generateRandomScramble = () => {
    const randomMoves = Array.from({ length: 20 }, () =>
      moves[Math.floor(Math.random() * moves.length)]
    );
    setScramble(randomMoves);
    setSolution("");
  };

  const handleAddMove = (move) => setScramble((prev) => [...prev, move]);

  const handleClear = () => {
    setScramble([]);
    setSolution("");
    setError("");
    setCube(
      Object.fromEntries(cubeFaces.map((f) => [f, Array(9).fill(defaultColorMap[f])]))
    );
  };

  // ✅ Rewritten Solve Logic with Transition Animation
  const handleSolve = async () => {
    if (scramble.length === 0) {
      setError("Please add some moves first.");
      return;
    }

    setLoading(true);
    setError("");
    setSolution("");

    try {
      const res = await axios.post("http://localhost:5000/solve", {
        scramble: scramble.join(" "),
      });

      setSolution(res.data.solution);

      // ✅ Show scrambled state immediately
      if (res.data.scrambled_cube) {
        setCube(res.data.scrambled_cube);
      }

      // ✅ Animate to solved state after delay
      if (res.data.solved_cube) {
        setTimeout(() => {
          setCube(res.data.solved_cube);
        }, 1000); // Delay in ms
      }

    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong");
    }

    setLoading(false);
  };

  const colorClass = {
    white: "bg-white",
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-400",
    orange: "bg-orange-500",
  };

  const renderCubeFace = (face, label) => (
    <div className="text-center" key={label}>
      <p className="text-sm font-semibold mb-1">{label}</p>
      <div className="grid grid-cols-3 gap-1">
        {(cube[face] || []).map((color, idx) => (
          <div
            key={`${label}-${idx}`}
            className={`cube-tile w-8 h-8 sm:w-10 sm:h-10 border border-gray-400 ${colorClass[color] || "bg-gray-200"}`}
          ></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white p-6 font-sans">
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between mb-6 rounded-xl">
        <div className="text-xl font-bold text-indigo-700">🧊 Rubik's Cube Solver</div>
        <div className="text-sm text-gray-500 italic">Visual & Animated 3x3 Cube Algorithm</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
          <h2 className="text-lg font-semibold text-indigo-700 mb-4">Cube State</h2>
          <div className="grid grid-cols-3 gap-4 text-xs">
            {cubeFaces.map((face) => renderCubeFace(face, face))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Cube Controls</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={generateRandomScramble}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
            >
              🔀 Scramble
            </button>
            <button
              onClick={handleSolve}
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700"
            >
              ⚡ Solve
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-400 text-white px-4 py-2 rounded-md shadow hover:bg-gray-500"
            >
              🔁 Reset
            </button>
          </div>

          {scramble.length > 0 && (
            <p className="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-3 rounded-md mb-2 text-sm">
              🔧 <strong>Scramble:</strong>{" "}
              <span className="font-mono break-words">{scramble.join(" ")}</span>
            </p>
          )}
          {solution && (
            <p className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded-md text-sm">
              ✅ <strong>Solution:</strong>{" "}
              <span className="font-mono break-words">{solution}</span>
            </p>
          )}
          {error && (
            <p className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md text-sm">
              ⚠️ {error}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white mt-10 p-6 rounded-xl shadow-md max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Manual Moves</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center text-sm">
          {moves.map((move, idx) => (
            <button
              key={idx}
              onClick={() => handleAddMove(move)}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-mono px-3 py-1 rounded-lg"
            >
              {move}
            </button>
          ))}
        </div>
      </div>

      <footer className="mt-12 text-center text-sm text-gray-400">Made with ❤️ using React + Flask</footer>
    </div>
  );
}

export default App;

import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showTable, setShowTable] = useState(false);

  const modThree = (input) => {
    const transitions = {
      S0: { 0: "S0", 1: "S1" },
      S1: { 0: "S2", 1: "S0" },
      S2: { 0: "S1", 1: "S2" },
    };
    const outputValue = { S0: 0, S1: 1, S2: 2 };

    if (!/^[01]+$/.test(input)) {
      throw new Error("Input must be a binary string (0s and 1s only)");
    }

    let initialState = "S0";
    for (const bit of input) {
      initialState = transitions[initialState][bit];
    }
    return outputValue[initialState];
  };

  const tests = [
    { input: "1101", expected: 1 },
    { input: "1110", expected: 2 },
    { input: "1111", expected: 0 },
    { input: "110", expected: 0 },
    { input: "1010", expected: 1 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    try {
      const output = modThree(input);
      setResult(output);
      setShowTable(true);
    } catch (err) {
      setError(err.message);
      setShowTable(false);
    }
  };

  // Determine greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl mx-4 sm:mx-6 md:mx-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          {getGreeting()}, Jacqui
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center mb-6 italic">
          David Osunkeye - Full Stack Dev II
        </p>
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a binary string (e.g., 1101)"
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm sm:text-base"
            >
              Calculate
            </button>
          </div>
          {result !== null && !error && (
            <p className="mt-2 text-green-600 font-semibold text-sm sm:text-base">
              Result: {result}
            </p>
          )}
          {error && (
            <p className="mt-2 text-red-600 font-semibold text-sm sm:text-base">
              {error}
            </p>
          )}
        </form>

        {/* Test Results Table */}
        {showTable && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm md:text-base text-black">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Test #</th>
                  <th className="p-2 border">Input</th>
                  <th className="p-2 border">Expected</th>
                  <th className="p-2 border">Result</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test, index) => {
                  let result;
                  try {
                    result = modThree(test.input);
                  } catch (err) {
                    result = "ERROR";
                  }
                  const passed = result === test.expected;
                  return (
                    <tr key={index} className="text-center hover:bg-gray-50">
                      <td className="p-2 border">{index + 1}</td>
                      <td className="p-2 border">{test.input}</td>
                      <td className="p-2 border">{test.expected}</td>
                      <td className="p-2 border">{result}</td>
                      <td
                        className={`p-2 border ${
                          passed ? "text-green-800" : "text-red-800"
                        }`}
                      >
                        {passed ? "PASSED" : "FAILED"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
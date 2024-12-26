import React, { useState } from 'react';
import './App.css';
import StartPage from './components/StartPage/StartPage';
import MainPage from './components/MainPage/MainPage';

function App() {
	const [started, setStarted] = useState(false);

	const handleStart = () => {
		setStarted(true);
	};

	return (
		<div className="App">
			{!started ? (
				<StartPage onStart={handleStart} />
			) : (
				<MainPage />
			)}
		</div>
	);
}

export default App;



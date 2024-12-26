import React, { useState, useEffect } from 'react';
import './StartPage.css';

const StartPage = ({ onStart }) => {
	const [isStarting, setIsStarting] = useState(false);

	useEffect(() => {
		// Add viewport meta tag with landscape orientation
		const viewportMeta = document.createElement('meta');
		viewportMeta.name = 'viewport';
		viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, orientation=landscape';
		document.getElementsByTagName('head')[0].appendChild(viewportMeta);

		// Force landscape orientation
		const lockOrientation = async () => {
			try {
				if (window.screen?.orientation && window.screen.orientation.lock) {
					await window.screen.orientation.lock('landscape');
				}
			} catch (error) {
				console.log('Orientation lock failed:', error);
			}
		};
		lockOrientation();

		// Handle orientation change
		const handleOrientationChange = () => {
			if (window.orientation === 0 || window.orientation === 180) {
				// Show a message or handle portrait mode
				alert('Please rotate your device to landscape mode for the best experience');
			}
		};
		window.addEventListener('orientationchange', handleOrientationChange);

		// Cleanup function
		return () => {
			const meta = document.querySelector('meta[name="viewport"]');
			if (meta) {
				meta.remove();
			}
			window.removeEventListener('orientationchange', handleOrientationChange);
			if (window.screen?.orientation && window.screen.orientation.unlock) {
				window.screen.orientation.unlock();
			}
		};
	}, []);

	const handleStart = () => {
		setIsStarting(true);
		setTimeout(() => {
			onStart();
		}, 2000);
	};

	return (
		<div className={`start-overlay ${isStarting ? 'starting' : ''}`}>
			<div className="scan-lines"></div>
			<div className="start-content">
				<h1 className="neon-text">Welcome to RomCE</h1>
				<button className="start-button" onClick={handleStart}>
					Press Start
				</button>
			</div>
			<div className="power-on-effect"></div>
		</div>
	);
};

export default StartPage;

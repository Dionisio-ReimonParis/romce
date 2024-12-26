import React, { useEffect, useState } from 'react';
import { FaGamepad, FaDesktop, FaPlaystation, FaXbox, FaSteam, FaTwitch } from 'react-icons/fa';
import './MainPage.css';

const MainPage = () => {
	// Add useEffect for viewport meta tag and orientation handling
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

	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [icons, setIcons] = useState([]);
	const [audio] = useState(() => {
		const audioElement = new Audio('/Romce the Gamer Boy.mp4');
		audioElement.loop = true;
		return audioElement;
	});

	const handleClick = () => {
		window.open('https://www.facebook.com/canete.romceangelo', '_blank');
	};

	const images = [
		'/pic1.png',
		'/pic2.png',
		'/pic3.png',
		'/pic4.png',
		'/pic5.png',
		'/pic6.png',
		'/pic7.png',
		'/pic8.png',
		'/pic9.png',
		'/pic10.png'
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => 
				prevIndex === images.length - 1 ? 0 : prevIndex + 1
			);
		}, 5000); // Change image every 5 seconds

		return () => clearInterval(interval);
	}, [images.length]);

	useEffect(() => {
		const iconComponents = [FaGamepad, FaDesktop];
		
		// Create a grid system for better distribution
		const gridCols = 5;
		const gridRows = 4;
		const cellWidth = window.innerWidth / gridCols;
		const cellHeight = window.innerHeight / gridRows;

		const newIcons = Array.from({ length: 20 }, (_, i) => {
			const gridX = i % gridCols;
			const gridY = Math.floor(i / gridCols);

			const padding = 50;
			const startX = (gridX * cellWidth) + padding + (Math.random() * (cellWidth - 2 * padding));
			const startY = (gridY * cellHeight) + padding + (Math.random() * (cellHeight - 2 * padding));

			let endGridX, endGridY;
			do {
				endGridX = Math.floor(Math.random() * gridCols);
				endGridY = Math.floor(Math.random() * gridRows);
			} while (endGridX === gridX && endGridY === gridY);

			const endX = (endGridX * cellWidth) + padding + (Math.random() * (cellWidth - 2 * padding));
			const endY = (endGridY * cellHeight) + padding + (Math.random() * (cellHeight - 2 * padding));

			return {
				id: i,
				Icon: iconComponents[Math.floor(Math.random() * iconComponents.length)],
				startX,
				startY,
				endX,
				endY,
				size: 2 + Math.random() * 3,
				duration: 15 + Math.random() * 25,
				rotate: Math.random() * 360
			};
		});
		setIcons(newIcons);

		// Start playing audio with proper error handling
		const playAudio = async () => {
			try {
				await audio.play();
			} catch (error) {
				console.log("Audio playback failed:", error);
			}
		};
		playAudio();

		// Cleanup function
		return () => {
			audio.pause();
			audio.currentTime = 0;
		};
	}, [audio]);

	return (
		<div className="gaming-container fade-in">
			<div className="vertical-neon-left"></div>
			<div className="vertical-neon-right"></div>
			<div className="side-decoration left">
				<FaPlaystation className="side-icon" />
				<div className="neon-bar" />
				<FaSteam className="side-icon" />
				<div className="neon-bar" />
				<FaGamepad className="side-icon" />
			</div>

			<div className="image-container">
				{images.map((src, index) => (
					<div
						key={src}
						className={`slideshow-image ${index === currentImageIndex ? 'active' : ''}`}
						onClick={handleClick}
					>
						<img src={src} alt={`Slide ${index + 1}`} />
					</div>
				))}
			</div>
			<h1 className="neon-text" onClick={handleClick}>Romce</h1>

			<div className="side-decoration right">
				<FaTwitch className="side-icon" />
				<div className="neon-bar" />
				<FaXbox className="side-icon" />
				<div className="neon-bar" />
				<FaDesktop className="side-icon" />
			</div>

			<div className="floating-icons">
				{icons.map(({ id, Icon, startX, startY, endX, endY, size, duration, rotate }) => (
					<div
						key={id}
						className="icon-wrapper"
						style={{
							'--start-x': `${startX}px`,
							'--start-y': `${startY}px`,
							'--end-x': `${endX}px`,
							'--end-y': `${endY}px`,
							'--size': size,
							'--duration': `${duration}s`,
							'--rotate': `${rotate}deg`
						}}
					>
						<Icon className="floating-icon" />
					</div>
				))}
			</div>
		</div>
	);
};

export default MainPage;

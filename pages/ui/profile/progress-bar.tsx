import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  progress: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const [progressPercent, setProgressPercent] = useState<number>(0)

  const getProgressColor = (progress: number): string => {
    if (progress < 25) {
      return '#f87171';  // If progress is less than 25%, set color to red
    } else if (progress < 50) {
      return '#ffb84d';  // If progress is less than 50%, set color to orange
    } else if (progress < 75) {
      return '#ffff66';  // If progress is less than 75%, set color to yellow
    } else {
      return '#66ff66';  // If progress is 75% or more, set color to green
    }
  };

  // Using React.CSSProperties for typing the style object
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '80%',
    height: '5px',
    backgroundColor: '#e0e0df',
    borderRadius: '5px',
    overflow: 'hidden',
  };

  const barStyle: React.CSSProperties = {
    height: '100%',
    backgroundColor: getProgressColor(Number(progress)),
    transition: 'width 0.5s ease-out',
    width: `${progressPercent}%`,
  };

  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev <= Number(progress)) {
          clearInterval(interval); // Stop the interval once progress reaches 100%
          return Number(progress);
        }
        return prev + 5; // Adjust this number for speed of progress
      });
    }, 500); // Update the progress every 500ms

    return () => clearInterval(interval);
  }, [])

  return (
    <div style={containerStyle}>
      <div style={barStyle}></div>
    </div>
  );
};

export default ProgressBar;

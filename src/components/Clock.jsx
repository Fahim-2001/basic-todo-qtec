import { useEffect, useState } from "react";

export const Clock = () => {
  const date = new Date();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString();
  return (
    <div className="flex justify-between mt-2 mb-4">
      <p>Date: {date.toLocaleDateString()}</p>
      <p>Time: {formattedTime}</p>
    </div>
  );
};

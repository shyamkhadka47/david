import React from 'react';
import { useCheckLocalColor } from '../../hooks/useCheckLocalColor';

const Dashboard: React.FC = () => {
  const [time, setTime] = React.useState(new Date());
  const { color } = useCheckLocalColor();

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[5rem] mt-[20%]">
        <div className="flex items-center justify-center gap-4">
          <h1
            className={`text-[50px] font-bold text-center ${
              color === 'dark' ? 'text-green-500' : 'text-green-900'
            } `}
          >
            Hello Admin{' '}
          </h1>
          <p
            className={`text-[50px] text-green-500 font-bold underline underline-offset-8 ${
              color === 'dark' ? 'text-green-500' : 'text-green-900'
            }`}
          >
            {new Date().toDateString()}
          </p>
        </div>
        <p
          className={`text-[50px] text-green-500 font-bold underline underline-offset-8 ${
            color === 'dark' ? 'text-green-500' : 'text-green-900'
          }`}
        >
          {time.toLocaleTimeString()}
        </p>
      </div>
    </>
  );
};

export default Dashboard;

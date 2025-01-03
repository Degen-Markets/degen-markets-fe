interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative w-full h-8 bg-black flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 flex">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="flex-1"
            style={{
              backgroundColor: `rgba(255, 0, 0, ${1 - index * 0.1})`,
            }}
          />
        ))}
      </div>

      {/* Progress indicator */}
      <div
        className="absolute h-full bg-success"
        style={{ width: `${progress}%` }}
      />

      {/* Overlay text */}
      <div className="absolute inset-0 flex justify-between items-center px-4 text-xs text-white">
        <span>0%</span>
        <span>6M</span>
        <span>0M</span>
        <span>18M</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default ProgressBar;

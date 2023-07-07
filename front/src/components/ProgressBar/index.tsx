/* eslint-disable react/no-unknown-property */
interface ProgressBarProps {
  progress: number;
  bgColor: string;
}

export function ProgressBar({ progress, bgColor }: ProgressBarProps) {
  return (
    <div
      className="h-[10px] w-full rounded-[10px]"
      style={{ backgroundColor: progress == 0 ? 'grey' : 'green' }}
    >
      <div
        role="progressbar"
        aria-label="Progresso de hábitor completados nesse dia"
        areia-aria-valuenow={progress}
        className="h-[10px] rounded-[10px]"
        style={{
          width: `${progress}%`,
          backgroundColor: bgColor
        }}
      ></div>
    </div>
  );
}

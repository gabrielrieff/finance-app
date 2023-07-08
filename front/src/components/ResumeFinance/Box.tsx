interface boxValuesProps {
  title: string;
  value: string;
  color: string;
  showValue: boolean;
}

export function BoxValeus({ title, value, color, showValue }: boxValuesProps) {
  return (
    <div className="w-full py-[10px] px-[5px] rounded-[5px] bg-[#fdffe5] flex flex-col items-center gap-[15px] shadow-lg">
      <span className="font-semibold">{title}</span>
      <strong className="font-bold text-[24px]" style={{ color: color }}>
        R$ {!showValue ? value : '****'}
      </strong>
    </div>
  );
}

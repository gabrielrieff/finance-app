import Link from 'next/link';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

export function LinkHome() {
  return (
    <Link
      href={'/dashboard'}
      className="flex items-center font-bold font text-[20px]"
    >
      <RiMoneyDollarCircleFill
        size={40}
        className="text-white"
        style={{ marginRight: '5px' }}
      />
      <span className="text-white">dev</span>
      <span className="text-black">.</span>
      <span className="text-white">finance</span>
      <span className="text-black">$$</span>
    </Link>
  );
}

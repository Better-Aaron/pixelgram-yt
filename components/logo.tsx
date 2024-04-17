import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { SwitchCamera } from 'lucide-react';
import { calSans } from '@/app/fonts';
export const Logo = () => {
  return (
    <Link
      href={'/dashboard'}
      className={buttonVariants({
        className:
          'navLink !mb-10 hidden md:flex lg:!p-0 lg:hover:bg-transparent',
        variant: 'ghost',
        size: 'lg',
      })}
    >
      <SwitchCamera className="h-6 w-6 shrink-0 lg:hidden" />
      <p
        className={`hidden text-xl font-semibold lg:block ${calSans.className}`}
      >
        Pixelgram
      </p>
    </Link>
  );
};

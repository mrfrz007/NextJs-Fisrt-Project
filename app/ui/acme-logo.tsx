import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import { lusitana } from './fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <BuildingStorefrontIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="pl-2 text-[44px]">Sayed</p>
    </div>
  );
}

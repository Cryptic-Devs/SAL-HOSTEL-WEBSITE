import { Facebook, Instagram, InstagramIcon, Twitter, TwitterIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-[rgba(69,62,62,1)] rounded py-10 text-white">
      <Image
        src="/logo.webp"
        alt="logo"
        width={200}
        height={150}
      />
      <nav>
        <div className="grid grid-flow-col gap-6 mb-4">
          <Link href="/">
            <div className="p-2 bg-red-500">
              <Facebook color="white" />
            </div>
          </Link>
          <Link href="/">
            <div className="p-2 bg-red-500">
              <Twitter color="white" />
            </div>
          </Link>
          <Link href="/">
            <div className="p-2 bg-red-500">
              <Instagram color="white" />
            </div>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <p className="font-semibold text-lg">+233 54 4762 415</p>
          <p className="font-semibold text-lg">obuasihostels@gmail.com</p>
          <p className="font-semibold text-lg">Digital Address AO-104-6116</p>
        </div>
      </nav>
      <div className="w-full border-1"></div>
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by SAL HOSTEL</p>
      </aside>
    </footer>
  );
}
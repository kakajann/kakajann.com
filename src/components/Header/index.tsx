import { appLinks } from "@/lib/constants";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed w-full z-10">
      <div className="container flex items-center justify-between h-20">
        <Link href="/">
          <h2 className="text-2xl font-bold">Kakajan Dörtguly</h2>
        </Link>
        <div className="flex items-center space-x-6">
          {appLinks.map((item) => (
            <Link key={item.path} href={item.path}>
              <span className="text-lg font-light">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;

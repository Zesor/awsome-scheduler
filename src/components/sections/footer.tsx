import { Icons } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import Image from "next/image";
import favicon from "@/app/favicon-32x32.png";

export function Footer() {
  return (
    <footer className="flex flex-col gap-y-5 rounded-lg p-5 container max-w-[var(--container-max-width)] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Image src={favicon} alt="Logo" className="h-5 w-5" />
          <h2 className="text-lg font-bold text-foreground">
            {siteConfig.name}
          </h2>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-y-5 md:flex-row md:items-center">
        <ul className="flex flex-col gap-x-5 gap-y-2 text-muted-foreground md:flex-row md:items-center">
          {siteConfig.footer.links.map((link, index) => (
            <li
              key={index}
              className="text-[15px]/normal font-medium text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4"
            >
              <a href={link.url}>{link.text}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between text-sm font-medium tracking-tight text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}.{" "}
            {siteConfig.footer.bottomText}
          </p>
        </div>
      </div>
    </footer>
  );
}

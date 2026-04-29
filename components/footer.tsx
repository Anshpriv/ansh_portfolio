'use client';

import Image from "next/image";
import Link from "next/link";
import { FaLocationArrow, FaWhatsapp, FaEnvelope } from "react-icons/fa6";

import { MagicButton } from "@/components/ui/magic-button";
import { links } from "@/config";
import { socialMedia } from "@/data";

export const Footer = () => {
  return (
    <footer id="contact" className="mb-[100px] w-full pb-10 md:mb-auto">
      <div className="absolute -bottom-72 left-0 min-h-96 w-full pointer-events-none">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          className="h-full w-full opacity-50"
          width={1260}
          height={863}
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-4xl lg:max-w-[45vw] font-bold text-center">
          Feel free to contact me if anything&apos;s up! You can text me directly on WhatsApp or drop me an email, so we can discuss it right away.
        </h1>

        <div className="flex flex-col md:flex-row gap-4 md:mt-10">
          <Link
            href="https://wa.me/919226139414"
            target="_blank"
            rel="noreferrer noopener"
          >
            <MagicButton
              title="Text me on WhatsApp"
              icon={<FaWhatsapp />}
              position="right"
              asChild
            />
          </Link>

          <Link
            href="mailto:thakareansh3@gmail.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            <MagicButton
              title="Send an Email for Catching up"
              icon={<FaEnvelope />}
              position="right"
              asChild
            />
          </Link>
        </div>
      </div>

      <div className="relative z-[999] mt-16 flex flex-col items-center justify-center md:flex-row">

        <div className="flex items-center gap-6 md:gap-3">
          {socialMedia.map((profile) => (
            <Link
              key={profile.name}
              href={profile.link}
              target="_blank"
              rel="noreferrer noopener"
              className="saturate-180 flex size-10 items-center justify-center rounded-lg border border-black-300 bg-black-200 bg-opacity-75 backdrop-blur-lg backdrop-filter"
              title={profile.name}
            >
              <Image
                src={profile.img}
                alt={`profile-${profile.name}`}
                width={20}
                height={20}
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

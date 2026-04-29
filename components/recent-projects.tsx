import Image from "next/image";
import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";

import { projects } from "@/data";

import { PinContainer } from "./ui/3d-pin";

export const RecentProjects = () => {
  return (
    <section id="projects" className="py-20">
      <h1 className="heading">RECENT PROJECTS
        {" "}
        <span className="text-purple"></span>
      </h1>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-24 gap-y-8 p-4">
        {projects.map(
          ({ id, des, iconLists, img, link, sourceCode, title }) => (
            <div
              key={id}
              className="flex h-[28rem] w-[90vw] items-center justify-center sm:h-[32rem] sm:w-[570px]"
            >
              <PinContainer title="Visit" href={link}>
                <div className="flex flex-col p-6 sm:p-8 w-[80vw] sm:w-[500px] h-[22rem] sm:h-[26rem] justify-between bg-[#13162d] rounded-3xl border border-white/20 shadow-2xl">
                  <div className="overflow-hidden">
                    <h1 className="text-2xl font-bold md:text-3xl text-white mb-4">
                      {title}
                    </h1>

                    <p className="text-base font-normal lg:text-lg text-[#c1c2d3] leading-relaxed">
                      {des}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center">
                      {iconLists.map((icon, i) => (
                        <div
                          key={icon}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.2] bg-black lg:h-12 lg:w-12"
                          style={{
                            transform: `translateX(-${5 * i * 2}px)`,
                          }}
                        >
                          <Image
                            height={40}
                            width={40}
                            src={icon}
                            alt={icon}
                            className="p-2 invert"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center">
                      <Link
                        href={sourceCode}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex text-base text-purple font-semibold md:text-lg"
                      >
                        View
                      </Link>

                      <FaLocationArrow className="ms-3 size-5" color="#5ce1e6" />
                    </div>
                  </div>
                </div>
              </PinContainer>
            </div>
          )
        )}
      </div>
    </section>
  );
};

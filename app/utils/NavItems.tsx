import Link from "next/link";
import React from "react";

export const NavItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

export const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      {!isMobile ? (
        <div className="hidden md:flex">
          {NavItemsData.map((item, index) => (
            <Link href={`${item.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-[400]`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="md:hidden mt-5">
          <div className="w-full text-center py-6">
            {NavItemsData.map((item, index) => (
              <Link href={`${item.url}`} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  } text-[18px] block py-3 font-[400]`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

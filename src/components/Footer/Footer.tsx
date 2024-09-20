import React from "react";
import Logo from "/public/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";



type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-gray-bg-2">
      <div className="mx-[3rem] py-[4rem]">
        <div className="flex items-start border-b border-b-black pb-8">
          <div className="mr-auto">
            <Image src={Logo} alt="logo" className="w-[8rem]" />
          </div>
          <ul className="flex gap-12 text-black-3 text-[0.88rem]">
            <li>
              <Link href={"/"}>Get started</Link>
            </li>
            <li>
              <Link href={"/"}>Testimonial</Link>
            </li>
            <li>
              <Link href={"/faq"}>FAQ</Link>
            </li>
            <li>
              <Link href={"/"}>Contact</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center text-[0.88rem] text-black-3 pt-[3rem]">
          <p className="mr-8 ">
            © 2024 Nollywood Filmmaker. All rights reserved.
          </p>
          <ul className="flex items-center  gap-8 mr-auto">
            <li className="underline">
              <Link href={"/"}>Privacy Policy</Link>
            </li>
            <li className="underline">
              <Link href={"/"}>Terms of Service</Link>
            </li>
            <li className="underline">
              <Link href={"/"}>Cookies Settings</Link>
            </li>
          </ul>
          <ul className="flex gap-3 items-center text-[1.3rem]">
            <li>
              <FaFacebook />
            </li>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaXTwitter />
            </li>
            <li>
                <FaLinkedin />
            </li>
            <li>
                <FaYoutube />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

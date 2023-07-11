"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import aws from "../../assets/image/backgroundIcon/aws.svg";
import docker from "../../assets/image/backgroundIcon/docker.svg";
import github from "../../assets/image/backgroundIcon/github.svg";
import kotlin from "../../assets/image/backgroundIcon/kotlin.svg";
import linux from "../../assets/image/backgroundIcon/linux.svg";
import mysql from "../../assets/image/backgroundIcon/mysql.svg";
import nodejs from "../../assets/image/backgroundIcon/nodejs.svg";
import npm from "../../assets/image/backgroundIcon/npm.svg";
import python from "../../assets/image/backgroundIcon/python.svg";
import rasberry from "../../assets/image/backgroundIcon/raspberry-pi.svg";
import react from "../../assets/image/backgroundIcon/react.svg";
import redux from "../../assets/image/backgroundIcon/redux.svg";
import swift from "../../assets/image/backgroundIcon/swift.svg";
import vue from "../../assets/image/backgroundIcon/vuejs.svg";

const logoClass = `layer absolute object-cover`;

const logos = [
  {
    src: aws,
    alt: "aws logo",
    w: 60,
    h: 60,
    speed: "5",
    class: `${logoClass} top-[87%] left-[5%]`,
  },
  {
    src: docker,
    alt: "docker logo",
    w: 80,
    h: 80,
    speed: "-1",
    class: `${logoClass} top-[10%] left-[94%]`,
  },
  {
    src: github,
    alt: "github logo",
    w: 70,
    h: 70,
    speed: "2",
    class: `${logoClass} top-[30%] left-[80%]`,
  },
  {
    src: kotlin,
    alt: "kotlin logo",
    w: 40,
    h: 40,
    speed: "-2",
    class: `${logoClass} top-[10%] left-[50%]`,
  },
  {
    src: linux,
    alt: "linux logo",
    w: 50,
    h: 50,
    speed: "3",
    class: `${logoClass} top-[50%] left-[50%]`,
  },
  {
    src: mysql,
    alt: "mysql logo",
    w: 80,
    h: 80,
    speed: "1",
    class: `${logoClass} top-[85%] left-[90%]`,
  },
  {
    src: nodejs,
    alt: "nodejs logo",
    w: 50,
    h: 50,
    speed: "2",
    class: `${logoClass} top-[30%] left-[35%]`,
  },
  {
    src: npm,
    alt: "npm logo",
    w: 80,
    h: 80,
    speed: "1",
    class: `${logoClass} top-[15%] left-[70%]`,
  },
  {
    src: python,
    alt: "python logo",
    w: 80,
    h: 80,
    speed: "-2",
    class: `${logoClass} top-[80%] left-[30%]`,
  },
  {
    src: rasberry,
    alt: "rasberry logo",
    w: 50,
    h: 50,
    speed: "4",
    class: `${logoClass} top-[95%] left-[70%]`,
  },
  {
    src: react,
    alt: "react logo",
    w: 80,
    h: 80,
    speed: "-2",
    class: `${logoClass} top-[20%] left-[5%]`,
  },
  {
    src: redux,
    alt: "redux logo",
    w: 50,
    h: 50,
    speed: "5",
    class: `${logoClass} top-[60%] left-[90%]`,
  },
  {
    src: swift,
    alt: "swift logo",
    w: 60,
    h: 60,
    speed: "-2",
    class: `${logoClass} top-[6%] left-[20%]`,
  },
  {
    src: vue,
    alt: "vue logo",
    w: 60,
    h: 60,
    speed: "3",
    class: `${logoClass} top-[50%] left-0`,
  },
];

const parallax = (e: MouseEvent) => {
  document.querySelectorAll<HTMLElement>(".layer").forEach((layer) => {
    const speed = Number(layer.getAttribute("data-speed"));
    if (!speed) return;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;

    layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
};

const Background = () => {
  useEffect(() => {
    if (!window) return;
    window.addEventListener("mousemove", parallax);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex justify-center items-center z-0 opacity-50">
      {logos.map((logo, index) => {
        return (
          <Image
            key={index}
            src={logo.src}
            alt={logo.alt}
            width={logo.w}
            height={logo.h}
            className={logo.class}
            data-speed={logo.speed}
          />
        );
      })}
    </section>
  );
};

export default Background;

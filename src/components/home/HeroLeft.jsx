"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroLeft() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >

      {/* Badge */}
      <motion.span
        variants={itemVariants}
        className="
          inline-block
          mt-4 sm:mt-6 lg:mt-0
          mb-5 sm:mb-6
          text-sm sm:text-base
          font-semibold
          text-[#2563EB]
          tracking-wide
        "
      >
        Trusted by thousands of users
      </motion.span>

      {/* Heading */}
      <motion.h1
        variants={itemVariants}
        className="
          text-3xl
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
          font-extrabold
          text-black
          leading-tight
          mb-5 sm:mb-6
        "
      >
        Welcome to VK
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="
          text-base
          sm:text-lg
          text-gray-600
          max-w-xl
          mb-8 sm:mb-10
        "
      >
        Your trusted platform for learning and growth. Join thousands of users
        already on their journey to success and unlock your full potential.
      </motion.p>

      {/* Buttons */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12 sm:mb-14">
        <Link href="/phone/enter-phone?purpose=REGISTER">
          <motion.button
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.99 }}
            className="
              relative
              overflow-hidden
              bg-gradient-to-r
              from-[#1E40E6]
              to-[#3B82F6]
              text-white
              px-6 sm:px-7
              py-2.5 sm:py-3
              rounded-xl
              font-semibold
              shadow-[0_10px_30px_rgba(30,64,230,0.35)]
              transition-all
              duration-300
              ease-out
              hover:shadow-[0_16px_40px_rgba(30,64,230,0.55)]
              hover:from-[#1D4ED8]
              hover:to-[#60A5FA]
            "
          >
            Get Started
          </motion.button>
        </Link>

        <motion.a
          href="/home#why-choose-vk"
          whileHover={{ y: -4, scale: 1.03 }}
          whileTap={{ scale: 0.99 }}
          className="
            inline-flex
            items-center
            bg-white/90
            text-black
            px-6 sm:px-7
            py-2.5 sm:py-3
            rounded-xl
            font-semibold
            border
            border-blue-200
            backdrop-blur-sm
            shadow-[0_8px_24px_rgba(37,99,235,0.12)]
            transition-all
            duration-300
            ease-out
            hover:bg-white
            hover:border-blue-400
            hover:text-[#1D4ED8]
            hover:shadow-[0_14px_34px_rgba(37,99,235,0.28)]
          "
        >
          Learn More
        </motion.a>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap gap-8 sm:gap-10 items-center"
      >
        <motion.div whileHover={{ y: -3 }}>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-black">
            50K+
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Active Users
          </p>
        </motion.div>

        <div className="hidden sm:block h-12 w-px bg-gray-300" />

        <motion.div whileHover={{ y: -3 }}>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-black">
            4.9/5
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            User Rating
          </p>
        </motion.div>

        <div className="hidden sm:block h-12 w-px bg-gray-300" />

        <motion.div whileHover={{ y: -3 }}>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-black">
            100%
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Satisfaction
          </p>
        </motion.div>
      </motion.div>

    </motion.div>
  );
}

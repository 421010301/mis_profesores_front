"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Input from "@/components/input";

type Message = { sender: "user" | "bot"; text: string };

export default function Page() {
  const [movedUp, setMovedUp] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const imageVariants = {
    initial: { opacity: 0, top: "25%", y: "-50%" },
    centered: { opacity: 1, top: "25%", y: "-50%" },
    top: { opacity: 1, top: "-10px", y: 0 },
  };

  const btnVariants = {
    initial: { opacity: 0, top: "55%", y: "-50%" },
    centered: { opacity: 1, top: "55%", y: "-50%" },
    down: { opacity: 1, top: "90%", y: "-50%" },
  };

  const chatVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    // Si es el primer mensaje, hacemos aparecer el chat
    if (!movedUp) setMovedUp(true);

    // Añadir mensaje de usuario
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");

    // Simular respuesta del bot
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "¡Entendido! Aquí tienes la información que pediste…",
        },
      ]);
    }, 500);
  };

  return (
    <div className="position-relative vh-100 overflow-hidden">
      {/* Logo */}
      <motion.div
        className="position-absolute start-50 translate-middle-x"
        variants={imageVariants}
        initial="initial"
        animate={movedUp ? "top" : "centered"}
        transition={{ duration: 1 }}
      >
        <Image
          src="/misprofesores.png"
          alt="Logo"
          width={358}
          height={152}
          className="img-fluid z-3"
        />
      </motion.div>

      {/* Chat */}
      <AnimatePresence>
        {movedUp && (
          <motion.div
            className="container vh-100 position-absolute start-50 translate-middle-x scrollbar"
            style={{ transform: "translateX(-50%)", marginTop: "125px" }}
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div
              className="d-flex flex-column h-100 p-3"
              style={{ overflowY: "auto" }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`d-flex mb-3 ${
                    msg.sender === "user" ? "justify-content-end" : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-pill ${
                      msg.sender === "user" ? "bubble-user" : "bubble-bot"
                    }`}
                    style={{ maxWidth: "70%" }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input / Botón */}
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <AnimatePresence>
          {!movedUp && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="fw-normal text-muted gradient-text fw-bold px-3 position-absolute"
            >
              ¿Qué te gustaría saber sobre tus profesores?
            </motion.h2>
          )}
        </AnimatePresence>

        <motion.form
          onSubmit={handleSend}
          className="position-absolute start-50 translate-middle-x"
          variants={btnVariants}
          initial="initial"
          animate={movedUp ? "down" : "centered"}
          transition={{ duration: 1 }}
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={{ container: "w-500px" }}
            placeholder="Escribe aquí tu pregunta"
          />
        </motion.form>
      </div>
    </div>
  );
}

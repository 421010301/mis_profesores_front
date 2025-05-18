"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Input from "@/components/input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Button from "@/components/button";

type Message = { sender: "user" | "bot"; text: string };
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const [movedUp, setMovedUp] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // ← estado de carga

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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    if (!movedUp) setMovedUp(true);

    // 1) Añadimos el mensaje del usuario a la UI
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsLoading(true); // ← activamos carga

    // 2) Mandamos al backend
    try {
      const res = await fetch(`${API_URL}/consulta-genai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation_id: conversationId,
          messages: [{ role: "user", content: text }],
        }),
      });
      const { conversation_id, respuesta } = await res.json();

      // 3) Guardamos (o actualizamos) el conversation_id
      setConversationId(conversation_id);

      // 4) Añadimos la respuesta del bot a la UI
      setMessages((prev) => [...prev, { sender: "bot", text: respuesta }]);
    } catch (err) {
      console.error("Error llamando al API:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Lo siento, hubo un error al conectar con el servidor.",
        },
      ]);
    } finally {
      setIsLoading(false); // ← desactivamos carga
    }
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
            style={{
              transform: "translateX(-50%)",
              marginTop: "125px",
            }}
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Mensajes */}
            <div
              className="d-flex flex-column p-3"
              style={{ overflowY: "auto", maxHeight: "80vh" }}
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
                      msg.sender === "user" ? "bg-dark px-3" : "bubble-bot"
                    }`}
                    style={{ maxWidth: "70%" }}
                  >
                    {msg.sender === "bot" ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      msg.text
                    )}
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
          className="position-absolute start-50 translate-middle-x d-flex"
          variants={btnVariants}
          initial="initial"
          animate={movedUp ? "down" : "centered"}
          transition={{ duration: 1 }}
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={{ container: "w-250px w-md-700px" }}
            placeholder="Escribe aquí tu pregunta"
            disabled={isLoading} // ← deshabilitado si carga
          />
          <div>
            <Button
              type="submit"
              className="ms-2 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                <i className="bi bi-send"></i>
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

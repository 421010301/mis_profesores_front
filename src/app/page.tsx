'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Input from '@/components/input';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Button from '@/components/button';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const [movedUp, setMovedUp] = useState(false);
  const [messages, setMessages] = useState<
    { sender: 'user' | 'assistant'; text: string }[]
  >([]);
  const [inputValue, setInputValue] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const imageVariants = {
    initial: { opacity: 0, top: '25%', y: '-50%' },
    centered: { opacity: 1, top: '25%', y: '-50%' },
    top: { opacity: 1, top: '-10px', y: 0 },
  };

  const btnVariants = {
    initial: { opacity: 0, top: '55%', y: '-50%' },
    centered: { opacity: 1, top: '55%', y: '-50%' },
    down: { opacity: 1, top: '90%', y: '-50%' },
  };

  const chatVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    if (!movedUp) setMovedUp(true);
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const body = {
        mensaje: text,
        conversation_id: conversationId,
      };

      const res = await fetch(`${API_URL}/api/consulta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.status === 'varios_resultados') {
        const opciones = data.opciones
          .map(
            (p: { nombre: string; departamento: string }) =>
              `- ${p.nombre} (${p.departamento})`
          )
          .join('\n');
        setMessages((prev) => [
          ...prev,
          {
            sender: 'assistant',
            text: `Se encontraron varios profesores:\n${opciones}\nPor favor, especifica mejor.`,
          },
        ]);
      } else if (data.resumen) {
        setConversationId(data.conversation_id);
        setMessages((prev) => [
          ...prev,
          { sender: 'assistant', text: data.resumen },
        ]);
      } else if (data.respuesta) {
        setMessages((prev) => [
          ...prev,
          { sender: 'assistant', text: data.respuesta },
        ]);
      } else {
        throw new Error('Respuesta inesperada del servidor');
      }
    } catch (err) {
      console.error('Error llamando al API:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: 'Lo siento, hubo un error al conectar con el servidor.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='position-relative vh-100 overflow-hidden'>
      <motion.div
        className='position-absolute start-50 translate-middle-x'
        variants={imageVariants}
        initial='initial'
        animate={movedUp ? 'top' : 'centered'}
        transition={{ duration: 1 }}
      >
        <Image
          src='/misprofesores.png'
          alt='Logo'
          width={358}
          height={152}
          className='img-fluid z-3'
        />
      </motion.div>

      <AnimatePresence>
        {movedUp && (
          <motion.div
            className='container vh-100 position-absolute start-50 translate-middle-x scrollbar'
            style={{ transform: 'translateX(-50%)', marginTop: '125px' }}
            variants={chatVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            <div
              className='d-flex flex-column p-3'
              style={{ overflowY: 'auto', maxHeight: '80vh' }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`d-flex mb-3 ${
                    msg.sender === 'user' ? 'justify-content-end' : ''
                  }`}
                >
                  <div
                    className={`p-2 rounded-pill ${
                      msg.sender === 'user' ? 'bg-dark px-3' : 'bubble-bot'
                    }`}
                    style={{ maxWidth: '70%' }}
                  >
                    {msg.sender === 'assistant' ? (
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

      <div className='d-flex flex-column justify-content-center align-items-center vh-100 text-center'>
        <AnimatePresence>
          {!movedUp && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className='fw-normal text-muted gradient-text fw-bold px-3 position-absolute'
            >
              Comienza con el nombre de tu profesor
            </motion.h2>
          )}
        </AnimatePresence>

        <motion.form
          onSubmit={handleSend}
          className='position-absolute start-50 translate-middle-x d-flex'
          variants={btnVariants}
          initial='initial'
          animate={movedUp ? 'down' : 'centered'}
          transition={{ duration: 1 }}
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={{ container: 'w-250px w-md-700px' }}
            placeholder='Escribe aquí tu pregunta'
            disabled={isLoading}
          />
          <div>
            <Button
              type='submit'
              className='ms-2 text-white'
              disabled={isLoading}
            >
              {isLoading ? (
                <span
                  className='spinner-border spinner-border-sm'
                  role='status'
                  aria-hidden='true'
                ></span>
              ) : (
                <i className='bi bi-send'></i>
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

'use client';

import { useReducer, useCallback, useEffect, useState } from 'react';
import { Message, ChatState, ChatAction, ElementItem } from '../types/chat';
import { sendChatMessage } from '../lib/api';
import { getSessionId, clearSession } from '../lib/session';

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: [],
        error: null,
      };
    default:
      return state;
  }
}

export function useChat() {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || !sessionId) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };

      dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const response = await sendChatMessage({
          session_id: sessionId,
          message: content.trim(),
          user_id: 1,
        });

        if (response.status === 'error') {
          dispatch({ type: 'SET_ERROR', payload: 'Failed to get response' });
          return;
        }

        let assistantContent = '';
        let elements: ElementItem[] | undefined;

        if (response.results.type === 'text' && response.results.text?.content) {
          assistantContent = response.results.text.content;
        } else if (response.results.type === 'element' && response.results.element) {
          elements = response.results.element;
          assistantContent = '';
        } else {
          assistantContent = 'Received an unknown response format.';
        }

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: assistantContent,
          timestamp: new Date(),
          elements,
        };

        dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
      } catch (error) {
        console.error('Send message error:', error);
        dispatch({
          type: 'SET_ERROR',
          payload: 'Failed to send message. Please try again.',
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [sessionId]
  );

  const startNewConversation = useCallback(() => {
    const newSessionId = clearSession();
    setSessionId(newSessionId);
    dispatch({ type: 'CLEAR_MESSAGES' });
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sessionId,
    sendMessage,
    startNewConversation,
  };
}

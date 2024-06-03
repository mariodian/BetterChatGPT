import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '@store/store';

import { ChatInterface, MessageInterface } from '@type/chat';
import { _defaultSystemMessage } from '@constants/chat';

const ClearChat = React.memo(() => {
  const { t } = useTranslation();

  const setChats = useStore((state) => state.setChats);
  const currentChatIndex = useStore((state) => state.currentChatIndex);

  const clearChat = () => {
    const chats = JSON.parse(
      JSON.stringify(useStore.getState().chats)
    );
    const updatedChats: ChatInterface[] = chats;
    const systemMessage = updatedChats[currentChatIndex].messages
      .filter((message: MessageInterface) => message.role === 'system')
      .map((message: MessageInterface) => message.content).shift()
      || useStore.getState().defaultSystemMessage;
    updatedChats[currentChatIndex].messages = [{ role: 'system', content: systemMessage }];
    setChats(updatedChats);
  };

  return (
    <button
      className='btn btn-neutral flex gap-1'
      aria-label={t('clearThisConversation') as string}
      onClick={clearChat}
    >
      {t('resetThisConversation')}
    </button>
  );
});

export default ClearChat;

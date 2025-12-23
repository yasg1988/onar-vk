import { useState, useRef, useEffect } from 'react'
import { UserInfo } from '@vkontakte/vk-bridge'
import {
  PanelHeader,
  PanelHeaderButton,
  Group,
  WriteBar,
  WriteBarIcon,
  Div,
  Spinner
} from '@vkontakte/vkui'
import { Icon28SettingsOutline } from '@vkontakte/icons'
import { Message, UserProfile, CATEGORIES } from '../types'
import { sendMessage } from '../api'
import { MessageBubble } from '../components/MessageBubble'

interface ChatProps {
  vkUser: UserInfo | null
  userProfile: UserProfile | null
  onResetProfile: () => void
}

export function Chat({ vkUser, userProfile, onResetProfile }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messages.length === 0 && userProfile) {
      const categoryLabel = CATEGORIES[userProfile.category].label.toLowerCase()
      const welcome: Message = {
        id: 'welcome',
        text: `Здравствуйте! Я Онар, виртуальный консультант по мерам социальной поддержки.\n\nВы указали, что вы ${categoryLabel} из района ${userProfile.district}.\n\nЗадайте ваш вопрос, и я постараюсь помочь.`,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages([welcome])
    }
  }, [userProfile])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!inputText.trim() || isLoading || !userProfile) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      const response = await sendMessage({
        message: userMessage.text,
        userId: vkUser?.id.toString() || 'anonymous',
        userProfile
      })

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Failed to send message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Произошла ошибка. Попробуйте позже или позвоните на горячую линию: 8(8362) 21-00-89',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <PanelHeader
        before={
          <PanelHeaderButton onClick={onResetProfile}>
            <Icon28SettingsOutline />
          </PanelHeaderButton>
        }
      >
        Онар
      </PanelHeader>

      <Group style={{ minHeight: 'calc(100vh - 140px)', paddingBottom: 60 }}>
        <Div>
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <Div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Spinner size="s" />
            </Div>
          )}
          <div ref={messagesEndRef} />
        </Div>
      </Group>

      <WriteBar
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
        placeholder="Задайте вопрос..."
        after={
          <WriteBarIcon
            mode="send"
            disabled={!inputText.trim() || isLoading}
            onClick={handleSend}
          />
        }
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0
        }}
      />
    </>
  )
}

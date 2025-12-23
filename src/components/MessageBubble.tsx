import { Div, Text } from '@vkontakte/vkui'
import { Message } from '../types'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user'

  return (
    <Div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 8
      }}
    >
      <div
        style={{
          maxWidth: '80%',
          padding: '10px 14px',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          backgroundColor: isUser 
            ? 'var(--vkui--color_accent_blue)' 
            : 'var(--vkui--color_background_secondary)',
          color: isUser 
            ? 'white' 
            : 'var(--vkui--color_text_primary)'
        }}
      >
        <Text weight="3" style={{ whiteSpace: 'pre-wrap' }}>
          {message.text}
        </Text>
      </div>
    </Div>
  )
}
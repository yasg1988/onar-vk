import { useState } from 'react'
import { UserInfo } from '@vkontakte/vk-bridge'
import {
  PanelHeader,
  Group,
  FormItem,
  Select,
  Button,
  Div,
  Title,
  Text,
  Avatar,
  Spacing
} from '@vkontakte/vkui'
import { UserProfile, CATEGORIES, DISTRICTS } from '../types'

interface OnboardingProps {
  vkUser: UserInfo | null
  onComplete: (profile: UserProfile) => void
}

export function Onboarding({ vkUser, onComplete }: OnboardingProps) {
  const [category, setCategory] = useState<'svo_participant' | 'family_member' | ''>('')
  const [subcategory, setSubcategory] = useState('')
  const [district, setDistrict] = useState('')

  const handleSubmit = () => {
    if (category && subcategory && district) {
      onComplete({
        category: category as 'svo_participant' | 'family_member',
        subcategory,
        district
      })
    }
  }

  const subcategories = category ? CATEGORIES[category].subcategories : []

  return (
    <>
      <PanelHeader>Онар</PanelHeader>
      
      <Group>
        <Div style={{ textAlign: 'center' }}>
          {vkUser && (
            <>
              <Avatar size={72} src={vkUser.photo_100} />
              <Spacing size={12} />
            </>
          )}
          <Title level="2" weight="2">
            {vkUser ? `${vkUser.first_name}, добро пожаловать!` : 'Добро пожаловать!'}
          </Title>
          <Spacing size={8} />
          <Text weight="3" style={{ color: 'var(--vkui--color_text_secondary)' }}>
            Я помогу разобраться с мерами поддержки участников СВО и их семей в Республике Марий Эл
          </Text>
        </Div>
      </Group>

      <Group header={<Title level="3" weight="3" style={{ padding: '0 16px' }}>Расскажите о себе</Title>}>
        <FormItem top="Ваша категория">
          <Select
            placeholder="Выберите категорию"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as 'svo_participant' | 'family_member')
              setSubcategory('')
            }}
            options={[
              { value: 'svo_participant', label: CATEGORIES.svo_participant.label },
              { value: 'family_member', label: CATEGORIES.family_member.label }
            ]}
          />
        </FormItem>

        {category && (
          <FormItem top="Уточните">
            <Select
              placeholder="Выберите..."
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              options={subcategories.map(s => ({ value: s.id, label: s.label }))}
            />
          </FormItem>
        )}

        <FormItem top="Район проживания">
          <Select
            placeholder="Выберите район"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            options={DISTRICTS.map(d => ({ value: d, label: d }))}
          />
        </FormItem>

        <Div>
          <Button
            size="l"
            stretched
            disabled={!category || !subcategory || !district}
            onClick={handleSubmit}
          >
            Начать
          </Button>
        </Div>
      </Group>
    </>
  )
}
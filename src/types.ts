export interface UserProfile {
  category: 'svo_participant' | 'family_member'
  subcategory: string
  district: string
}

export interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export const CATEGORIES = {
  svo_participant: {
    label: 'Участник СВО',
    subcategories: [
      { id: 'mobilized', label: 'Мобилизованный' },
      { id: 'contract', label: 'Контрактник' },
      { id: 'volunteer', label: 'Доброволец' },
      { id: 'military_staff', label: 'Военнослужащий/сотрудник силовых структур' }
    ]
  },
  family_member: {
    label: 'Член семьи участника СВО',
    subcategories: [
      { id: 'spouse', label: 'Супруг/супруга' },
      { id: 'child', label: 'Ребенок' },
      { id: 'parent', label: 'Родитель' },
      { id: 'widow', label: 'Вдова/вдовец' }
    ]
  }
}

export const DISTRICTS = [
  'г. Йошкар-Ола',
  'г. Волжск',
  'г. Козьмодемьянск',
  'Волжский район',
  'Горномарийский район',
  'Звениговский район',
  'Килемарский район',
  'Куженерский район',
  'Мари-Турекский район',
  'Медведевский район',
  'Моркинский район',
  'Новоторъяльский район',
  'Оршанский район',
  'Параньгинский район',
  'Сернурский район',
  'Советский район',
  'Юринский район'
]
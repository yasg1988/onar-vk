import { useState, useEffect } from 'react'
import vkBridge, { UserInfo } from '@vkontakte/vk-bridge'
import { View, Panel, SplitLayout, SplitCol } from '@vkontakte/vkui'
import { Onboarding } from './panels/Onboarding'
import { Chat } from './panels/Chat'
import { UserProfile } from './types'

export default function App() {
  const [activePanel, setActivePanel] = useState('onboarding')
  const [vkUser, setVkUser] = useState<UserInfo | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await vkBridge.send('VKWebAppGetUserInfo')
        setVkUser(user)
        
        const saved = localStorage.getItem('onar_profile')
        if (saved) {
          setUserProfile(JSON.parse(saved))
          setActivePanel('chat')
        }
      } catch (error) {
        console.error('Failed to get user info:', error)
      }
    }
    fetchUser()
  }, [])

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile)
    localStorage.setItem('onar_profile', JSON.stringify(profile))
    setActivePanel('chat')
  }

  const handleResetProfile = () => {
    localStorage.removeItem('onar_profile')
    setUserProfile(null)
    setActivePanel('onboarding')
  }

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Panel id="onboarding">
            <Onboarding 
              vkUser={vkUser} 
              onComplete={handleOnboardingComplete} 
            />
          </Panel>
          <Panel id="chat">
            <Chat 
              vkUser={vkUser} 
              userProfile={userProfile} 
              onResetProfile={handleResetProfile}
            />
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  )
}
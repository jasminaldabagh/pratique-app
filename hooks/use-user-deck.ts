"use client"

import { useState, useEffect, useCallback } from 'react'
import { verbs, getStarterVerbs } from '@/data/verbs'
import { words, getStarterWords } from '@/data/words'

const STORAGE_KEY = 'pratique_state'

export interface UserState {
  hasLaunched: boolean
  activeVerbIds: number[]
  activeWordIds: (number | string)[]
  shakyVerbIds: number[]
  shakyWordIds: (number | string)[]
}

const initialState: UserState = {
  hasLaunched: false,
  activeVerbIds: [],
  activeWordIds: [],
  shakyVerbIds: [],
  shakyWordIds: [],
}

function getStoredState(): UserState {
  if (typeof window === 'undefined') return initialState
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to parse stored state:', e)
  }
  return initialState
}

function saveState(state: UserState) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function useUserDeck() {
  const [state, setState] = useState<UserState>(initialState)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = getStoredState()
    
    if (!stored.hasLaunched) {
      // First launch - seed with starter pack
      const starterVerbIds = getStarterVerbs().map(v => v.id)
      const starterWordIds = getStarterWords().map(w => w.id) as (number | string)[]
      
      const newState: UserState = {
        hasLaunched: true,
        activeVerbIds: starterVerbIds,
        activeWordIds: starterWordIds,
        shakyVerbIds: [],
        shakyWordIds: [],
      }
      
      setState(newState)
      saveState(newState)
    } else {
      setState(stored)
    }
    
    setIsLoaded(true)
  }, [])

  // Get active verbs
  const activeVerbs = verbs.filter(v => state.activeVerbIds.includes(v.id))
  
  // Get active words
  const activeWords = words.filter(w => state.activeWordIds.includes(w.id))

  // Toggle verb in active deck
  const toggleVerb = useCallback((verbId: number) => {
    setState(prev => {
      const newIds = prev.activeVerbIds.includes(verbId)
        ? prev.activeVerbIds.filter(id => id !== verbId)
        : [...prev.activeVerbIds, verbId]
      
      const newState = { ...prev, activeVerbIds: newIds }
      saveState(newState)
      return newState
    })
  }, [])

  // Toggle word in active deck
  const toggleWord = useCallback((wordId: number | string) => {
    setState(prev => {
      const newIds = prev.activeWordIds.includes(wordId)
        ? prev.activeWordIds.filter(id => id !== wordId)
        : [...prev.activeWordIds, wordId]
      
      const newState = { ...prev, activeWordIds: newIds }
      saveState(newState)
      return newState
    })
  }, [])

  // Toggle shaky status for verb
  const toggleShakyVerb = useCallback((verbId: number) => {
    setState(prev => {
      const newIds = prev.shakyVerbIds.includes(verbId)
        ? prev.shakyVerbIds.filter(id => id !== verbId)
        : [...prev.shakyVerbIds, verbId]
      
      const newState = { ...prev, shakyVerbIds: newIds }
      saveState(newState)
      return newState
    })
  }, [])

  // Toggle shaky status for word
  const toggleShakyWord = useCallback((wordId: number | string) => {
    setState(prev => {
      const newIds = prev.shakyWordIds.includes(wordId)
        ? prev.shakyWordIds.filter(id => id !== wordId)
        : [...prev.shakyWordIds, wordId]
      
      const newState = { ...prev, shakyWordIds: newIds }
      saveState(newState)
      return newState
    })
  }, [])

  // Check if verb is shaky
  const isVerbShaky = useCallback((verbId: number) => {
    return state.shakyVerbIds.includes(verbId)
  }, [state.shakyVerbIds])

  // Check if word is shaky
  const isWordShaky = useCallback((wordId: number | string) => {
    return state.shakyWordIds.includes(wordId)
  }, [state.shakyWordIds])

  // Check if verb is active
  const isVerbActive = useCallback((verbId: number) => {
    return state.activeVerbIds.includes(verbId)
  }, [state.activeVerbIds])

  // Check if word is active
  const isWordActive = useCallback((wordId: number | string) => {
    return state.activeWordIds.includes(wordId)
  }, [state.activeWordIds])

  return {
    state,
    isLoaded,
    activeVerbs,
    activeWords,
    toggleVerb,
    toggleWord,
    toggleShakyVerb,
    toggleShakyWord,
    isVerbShaky,
    isWordShaky,
    isVerbActive,
    isWordActive,
    shakyVerbIds: state.shakyVerbIds,
    shakyWordIds: state.shakyWordIds,
  }
}

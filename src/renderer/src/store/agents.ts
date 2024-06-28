import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDefaultAgent } from '@renderer/services/agent'
import { Agent } from '@renderer/types'

export interface AgentsState {
  agents: Agent[]
}

const initialState: AgentsState = {
  agents: [getDefaultAgent()]
}

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    addAgent: (state, action: PayloadAction<Agent>) => {
      state.agents.push(action.payload)
    },
    removeAgent: (state, action: PayloadAction<{ id: string }>) => {
      state.agents = state.agents.filter((c) => c.id !== action.payload.id)
    },
    updateAgent: (state, action: PayloadAction<Agent>) => {
      state.agents = state.agents.map((c) => (c.id === action.payload.id ? action.payload : c))
    },
    addConversationToAgent: (state, action: PayloadAction<{ agentId: string; conversationId: string }>) => {
      state.agents = state.agents.map((c) =>
        c.id === action.payload.agentId
          ? {
              ...c,
              conversations: [...c.conversations, action.payload.conversationId]
            }
          : c
      )
    },
    removeConversationFromAgent: (state, action: PayloadAction<{ agentId: string; conversationId: string }>) => {
      state.agents = state.agents.map((c) =>
        c.id === action.payload.agentId
          ? {
              ...c,
              conversations: c.conversations.filter((id) => id !== action.payload.conversationId)
            }
          : c
      )
    }
  }
})

export const { addAgent, removeAgent, updateAgent, addConversationToAgent, removeConversationFromAgent } =
  agentsSlice.actions

export default agentsSlice.reducer

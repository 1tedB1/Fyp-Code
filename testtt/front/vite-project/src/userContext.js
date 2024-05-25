const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated : false
}

export const userContext = createContext(initialState)

export const userContextProvider = ({children}) => {
    
}

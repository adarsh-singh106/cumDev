import { createContext, useContext, useReducer } from "react";

// 1. Setup the initial state (The default data)
const initialState = {
    posts: [
        {
            id: 1,
            title: "My First Post",
            image: '/output_swapped_0.jpg',
            content: "This is Me When I am not Angry"
        },
        {
            id: 2,
            title: "Discover Yourself",
            image: '/13366235_001_6bc9.jpg',
            content: "I am not beautiful, Beautiful is ME"
        },
        {
            id: 3,
            title: "My News Channel",
            image: '/Rick.png',
            content: "Breaking News! Just kidding the Poop is AI!"
        }
    ]
};

// 2. The Reducer (The Logic Center)
// This function listens for "actions" and updates the state accordingly.
const blogReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state, // Keep existing data
                posts: [...state.posts, action.payload] // Add the new post to the list
            };
        case 'DELETE_POST':
            return {
                ...state,
                // Filter out the post that matches the ID sent in the payload
                posts: state.posts.filter((post) => post.id !== action.payload)
            };
        default:
            return state;
    }
};

// 3. Create the Context (The Container)
const BlogContext = createContext();

// 4. Create the Provider (The Wrapper Component)
// Note: Component names MUST start with a Capital Letter (BlogProvider)
export const BlogProvider = ({ children }) => { // Note: 'children' must be lowercase
    
    // Initialize the reducer
    const [state, dispatch] = useReducer(blogReducer, initialState);

    return (
        // We pass 'state' (data) and 'dispatch' (tool to change data) to the whole app
        <BlogContext.Provider value={{ state, dispatch }}>
            {children} 
        </BlogContext.Provider>
    );
};

// 5. Custom Hook (The Shortcut)
// This makes it easy to access the data in any other component
export const useBlog = () => {
    const context = useContext(BlogContext);
    
    // Safety check: Ensure this hook is used inside the Provider
    if (!context) {
        throw new Error("useBlog must be used within a BlogProvider");
    }
    
    return context;
};
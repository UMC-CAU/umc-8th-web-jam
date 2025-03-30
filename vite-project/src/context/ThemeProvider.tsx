import { ReactElement, useContext } from "react";
import { createContext, PropsWithChildren, useState } from "react";

export enum THEME {
    LIGHT = 'LIGHT',
    DARK = 'DARK'
}

type TTheme = THEME.DARK | THEME.LIGHT;

interface IThemeContext {
    theme: THEME.DARK | THEME.LIGHT;
    toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) : ReactElement => {
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

    const toggleTheme = () : void => {
        setTheme((prevTheme) : THEME =>
            prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () : IThemeContext => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used witin a ThemeProvider');
    }

    return context;
}
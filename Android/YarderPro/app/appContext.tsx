import React, { createContext, useState, useContext } from 'react';

// Define the context type
interface AppContextType {
    deflectionData: {
        sGround: string;
        sMid: string;
        towerH: string;
        length: string;
        result: string;
        isGroundDegrees: boolean,
        isMidDegrees: boolean,
        isTowerMetric: boolean,
        isLengthMetric: boolean
    };
    setDeflectionData: React.Dispatch<React.SetStateAction<{
        sGround: string;
        sMid: string;
        towerH: string;
        length: string;
        result: string;
        isGroundDegrees: boolean,
        isMidDegrees: boolean,
        isTowerMetric: boolean,
        isLengthMetric: boolean
    }>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [deflectionData, setDeflectionData] = useState({
        sGround: '',
        sMid: '',
        towerH: '',
        length: '',
        result: '',
        isGroundDegrees: false,
        isMidDegrees: false,
        isTowerMetric: false,
        isLengthMetric: false
    });

    return (
        <AppContext.Provider value={{ deflectionData, setDeflectionData }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

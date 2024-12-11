import React, { createContext, useState, useContext } from 'react';

// Define the context
interface AppContextType {
    deflectionData: {
        sGround: string;
        sMid: string;
        towerH: string;
        length: string;
        result: string;
        isGroundDegrees: boolean;
        isMidDegrees: boolean;
        isTowerMetric: boolean;
        isLengthMetric: boolean;
    };
    setDeflectionData: React.Dispatch<React.SetStateAction<{
        sGround: string;
        sMid: string;
        towerH: string;
        length: string;
        result: string;
        isGroundDegrees: boolean;
        isMidDegrees: boolean;
        isTowerMetric: boolean;
        isLengthMetric: boolean;
    }>>;
    tensionData: {
        lSpan: string;
        pLoad: string;
        yMid: string;
        qWeight: string;
        result: string;
        isqWeightMetric: boolean;
        isyMidMetric: boolean;
        islSpanMetric: boolean;
        ispLoadMetric: boolean;
    };
    setTensionData: React.Dispatch<React.SetStateAction<{
        lSpan: string;
        pLoad: string;
        yMid: string;
        qWeight: string;
        result: string;
        isqWeightMetric: boolean;
        isyMidMetric: boolean;
        islSpanMetric: boolean;
        ispLoadMetric: boolean;
    }>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State for deflection data
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

    // State for tension data
    const [tensionData, setTensionData] = useState({
        lSpan: '',
        pLoad: '',
        yMid: '',
        qWeight: '',
        result: '',
        isqWeightMetric: false,
        isyMidMetric: false,
        islSpanMetric: false,
        ispLoadMetric: false
    });

    return (
        <AppContext.Provider value={{ deflectionData, setDeflectionData, tensionData, setTensionData }}>
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

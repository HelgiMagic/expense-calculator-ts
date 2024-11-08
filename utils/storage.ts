const storageUtil = {
    save: (key: string, data: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage', error);
        }
    },
    load: (key: string) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading from localStorage', error);
            return null;
        }
    },
};

export default storageUtil;

export const storage = {
    setItem: (key: string, value: any) => {localStorage.setItem(key, JSON.stringify(value))},
    getItem: (key: string) => {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key) as string)
        }
    },
}
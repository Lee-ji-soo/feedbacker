import { useState } from 'react';

const useInput = (initialData) => {
    const [data, setData] = useState(initialData);

    const onInput = (e) => {
        const { target: { value } } = e;
        setData(value);
    }

    return [data, onInput, setData]
}

export { useInput };

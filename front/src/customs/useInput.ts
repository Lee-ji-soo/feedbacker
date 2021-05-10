import React, { useState } from 'react';

type onChangeType = (e:React.ChangeEvent<HTMLInputElement>) => void;

const useInput = (initialData = "") => {
    const [data, setData] = useState(initialData);

    const onInput = (e) => {
        const { target: { value } } = e;
        setData(value);
    }
    return [data, onInput, setData] as [string, onChangeType, typeof setData]
}

export { useInput };
